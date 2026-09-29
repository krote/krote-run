# クロールのデータ品質ルール

`pnpm run crawl` は公式サイトから抽出した内容を `src/data/races/*.json` に書き込む。
何も検査せずに書き込むと、レビューで一度指摘した種類の問題が何度でも混入する。

そこで**適用前に検査し、ルールに反する更新は JSON に書かない**仕組みにしている。

## 仕組み

```
クロール → LLM抽出 → 【検査ゲート】→ JSON更新 → 【実行後チェック】→ PR作成
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
