# クロールのデータ品質ルール

`pnpm run crawl` は公式サイトから抽出した内容を `src/data/races/*.json` に書き込む。
何も検査せずに書き込むと、レビューで一度指摘した種類の問題が何度でも混入する。

そこで**適用前に検査し、ルールに反する更新は JSON に書かない**仕組みにしている。

## 実行前チェック

クロールは作業ツリーの race JSON を基準に差分を作り、最後に `main` から PR ブランチを切る。
別ブランチ・古い `main`・未コミット変更がある状態で実行すると、PR に意図しない変更が混入するため、
`--dry-run` 以外では開始前に `runPreflight()`（`tools/crawl/pr.js`）で以下を検査し、満たさなければ中断する。

| 条件 | 満たさない場合の対処 |
|---|---|
| 現在のブランチが `main` | `git switch main` |
| `main` が `origin/main` と一致（`git fetch` 後に比較） | `git pull --ff-only`、未 push のコミットは整理 |
| `COMMIT_PATHS` 配下に未コミット変更・未追跡ファイルがない | コミットするか破棄 |

`git fetch` に失敗した場合も、`main` の鮮度を確認できないため中断する。回避フラグは用意していない。

## 仕組み

```
【実行前チェック】→ クロール → LLM抽出 → 【検査ゲート】→ JSON更新 → 【実行後チェック】→ PR作成
                        ↑ ルール違反はここで落とす        ↑ 全体の健全性を確認しPR本文に記載
```

| 段階 | 実装 | 役割 |
|---|---|---|
| 検査ゲート | `tools/crawl/gate.js` の `screenExtraction()` | 抽出結果のうち**新たな違反を生むフィールドだけ**を保留する。既存データの違反は無関係な更新をブロックしない |
| 実行後チェック | `scripts/validate-races.js` の `validateRace()` を全ファイルに実行 | 残っている問題をルール別に集計し、PR 本文の「チェック結果」に出す |
| レポート | `tools/crawl/report.js` | 変更内容（大会 × 項目 × 変更前後）と失敗・保留の分析を Markdown 化 |

保留された更新は PR 本文の「検査で保留した更新」に、大会名・項目・ルール名・理由つきで並ぶ。
内容を見て正しいと判断できる場合は、手作業で JSON を直す。

## レビューで指摘を受けたら

**同じ指摘を二度受けないために、指摘はルールにする。**

1. `scripts/validate-races.js` の `validateRace()` にルールを追加する
   - `rule`（スネークケースの識別子）、`level`（`error` / `warning`）、`message`（何がどう問題か）を返す
   - データの誤りは `error`、埋まっていれば良いが必須でないものは `warning`
2. `scripts/validate-races.test.js` にテストを追加する（違反を検出すること・正常データで誤検知しないこと）
3. 下の表に1行足す

これで、以後そのパターンは検査ゲートで止まり、JSON に入らなくなる。

## ルール一覧

| ルール | レベル | 内容 | 追加のきっかけ |
|---|---|---|---|
| `entry_period_label_empty` | error | `entry_periods[].label_ja` / `label_en` が空文字 | CodeRabbit の繰り返し指摘 |
| `certification_case` | error | `course_info.certification` が小文字（`JAAF` / `WA` / `AIMS` / `WMM` に統一） | CodeRabbit の繰り返し指摘 |
| `entry_period_start_date_null` | error | `entry_periods[].start_date` が null | CodeRabbit の繰り返し指摘 |
| `entry_start_date_mismatch` | error | `entry_start_date` が最も早い `entry_periods[].start_date` と食い違う | CodeRabbit の繰り返し指摘 |
| `reception_type_mismatch` | warning | `reception_note_ja` の記述と `reception_type` が食い違う | 受付情報の追加時 |
| `coords_out_of_japan` | error | `start_lat` / `start_lng` が日本の範囲外 | ジオコーディング導入時 |
| `entry_fee_missing` | warning | 参加費が `entry_fee`・`categories[].entry_fee`・`entry_periods[].entry_fee` のどこにも無い | Search Console の `offers.price` 欠落指摘（#186） |

## 欠落データの補完（強制抽出）

チェックサムが一致するページは抽出をスキップするため、一度取りこぼした項目は
公式サイトが更新されるまで埋まらない。そこで以下が欠けている大会に限り、
ページが無変更でも抽出にかける（`getForcedExtractionReasons()`）。開催済みの大会は対象外。

- 会場情報（`venue_name_ja` と `venue_address` が両方空）
- 参加費（どのフィールドにも無い）
- 説明文（`description_ja` または `description_en` が空）
- エントリー開始日（`entry_start_date` も `entry_periods[].start_date` も無い）

## 中間証明書の補完（#209）

サーバーが中間証明書を送ってこないサイトは、ブラウザでは開けても Node の `fetch` では
`fetch failed (UNABLE_TO_VERIFY_LEAF_SIGNATURE)` で失敗する（ブラウザは AIA で補完するが Node はしない）。
PR 本文の失敗分析では「証明書エラー」として他の失敗と分けて表示する。

不足している中間 CA 証明書を `tools/crawl/extra-ca.pem` に置き、`index.js` / `eval-models.js` は
`NODE_EXTRA_CA_CERTS` にこのファイルを指定して自分を起動し直す（`tools/crawl/extra-ca.js`）。
**証明書検証の無効化（`NODE_TLS_REJECT_UNAUTHORIZED=0`）は使わない。**

証明書エラーが出たサイトを追加する手順:

```bash
# 1. サイト証明書の発行元（AIA の CA Issuers URL）を確認
echo | openssl s_client -connect <host>:443 -servername <host> 2>/dev/null | openssl x509 -noout -ext authorityInfoAccess
# 2. 中間証明書を取得して PEM に変換
curl -sS -o ca.crt <CA Issuers の URL>
openssl x509 -inform DER -in ca.crt -out ca.pem
# 3. システムのルート証明書でチェーンが通ることを確認（OK になること）
echo | openssl s_client -connect <host>:443 -servername <host> 2>/dev/null | openssl x509 > leaf.pem
openssl verify -untrusted ca.pem leaf.pem
```

確認できたら、出典 URL・SHA-256 フィンガープリント・期限・対象サイトをコメントに書いて `extra-ca.pem` に追記する。
期限切れの証明書は削除する。独自の PEM を使いたい場合は `NODE_EXTRA_CA_CERTS` を自分で指定して実行すれば、再起動はしない
（`CRAWL_NO_EXTRA_CA=1` で補完自体を無効化できる）。
