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

## PDF のテキスト化（#211）

`info_urls` に PDF が登録されている場合、`fetchPage()` は `unpdf`（pdf.js ベース）でテキストを抽出してから LLM に渡す。
これまでは PDF のバイナリを HTML として文字列化しており、意味のない文字列がプロンプトに入っていた。

- 判定は Content-Type や拡張子ではなく先頭の `%PDF-` で行う（`.pdf` の URL でもリンク切れで HTML が返ることがあるため）
- チェックサムは抽出したテキストに対して計算する。導入直後の初回実行では、PDF の URL は「変更あり」として再抽出される
- テキストが `SPARSE_PDF_CHARS`（300字）未満の PDF は画像中心とみなし、PR 本文の「テキストの少ないPDF」に出す
- テキストが全く取れない PDF（画像のみ）は失敗として「PDFにテキストなし（画像のみ）」に分類する。OCR はしない
- 要項が HTML でも公開されていれば、`info_urls` はそちらに替えるのがよい

## ページテキストの総量予算（#210）

抽出プロンプトに入れるページテキストは、**1大会あたり合計 20,000字**（`DEFAULT_TEXT_BUDGET`）に収める（`allocateTextBudget()`）。
短いページは全文を入れ、残りの予算を長いページに均等に配分する。予算を超えて切り詰めたページは PR 本文の「テキストを切り詰めたページ」に出る。

以前はページごとに先頭3,000字で切っており、長い要項ページの後半（参加費・制限時間等）が常に欠けていた。
値は `eval-models.js --budgets` で比較して決めた（6大会・採点131項目、Sonnet 5.5、2026-11-08）。

| 方式 | 一致/採点 | 平均時間 | 入力トークン |
|---|---|---|---|
| 3,000字/ページ（従来） | 57/131 | 10.9s | 61,675 |
| 総量10,000字 | 61/131 | 10.9s | 61,739 |
| **総量20,000字（採用）** | **62/131** | 10.2s | 70,802 |
| 総量30,000字 | 61/131 | 11.3s | 74,135 |

再評価する場合:

```bash
node tools/crawl/eval-models.js --races <id,...> --models claude-sonnet-5-5 --budgets 3000p,10000,20000,30000
```

## URL失効の検知と再発見（#208）

`info_urls` が失効していると、その大会の情報が取れないまま失敗に埋もれる。失効は他の失敗と分け、PR 本文の「URL失効」に大会別に出す。

| エラー | 失効とみなす条件 |
|---|---|
| HTTP 404 / 410 | 1回で失効 |
| HTTP 5xx | **3回連続**（`EXPIRE_AFTER_5XX`）で失効。1回だけなら一時障害とみなす |
| タイムアウト・証明書エラー・403 等 | 失効扱いにしない（URL 自体の問題ではない） |

- 連続失敗回数は `tools/crawl/checksums.json` の各 URL に `fail_count` / `last_error` として記録する（成功すると消える。`--dry-run` では記録しない）
- 大会の**全 URL が失効**している場合は「要対応」として先頭に出す。あわせて `official_url`（トップページ）を取得し、要項・エントリー・アクセス等のリンクを候補として表示する（`findRelinkCandidates()`）
- `info_urls` は自動で置き換えない。候補を見て人が登録し直す

## お知らせの同梱（#201）

PR を作る実行では、`src/data/announcements.json` にお知らせを1件追記してクロール PR に同梱する（`tools/crawl/announcement.js`）。
マージ → D1 反映 → デプロイの順で、データの反映と同時に公開される。PR 本文の「お知らせ（同梱）」で文面を確認できる。

- **LLM は使わない**。diff と更新後の race JSON から決定的に組み立てる（事実誤認を混ぜないため）
- 新規掲載: 次年度ファイル（`new_editions`）と探索で追加した大会。更新: LLM 抽出で JSON を更新した大会（開催済みは対象外）
- 一覧は開催日順に「大会名（M/D・都道府県＋市区町村）」。欠けている要素は省き、21大会目以降は件数だけ書く
- 主な更新内容は diff の項目を利用者向けの話題（エントリー期間・参加賞・関門等）にまとめ、多い順に最大6件。説明文・タグライン・モチーフは話題にしない
- `slug` は `YYYY-MM-DD-race-data-update`（JST）。同日に複数回実行した場合は `-2`, `-3` …
- 文面を直したい場合は PR ブランチ上で `announcements.json` を編集する
