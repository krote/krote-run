# 更新履歴

作業完了時に追記してください。形式: `## YYYY-MM-DD タイトル`

---

## 2026-03-21 コースプロフィール機能（GPX→地図+高低差チャート）

- `scripts/gpx-to-profile.js` を新規作成: `public/gpx/*.gpx` を読み込み、累積距離・獲得標高を計算して `public/course-profiles/*.json` に出力。標高が GPX にない場合は国土地理院 標高 API から取得
- `public/gpx/nagano-marathon-2026.gpx` を新規作成（長野マラソン 概略ルート 45ウェイポイント）
- `src/components/course/CourseProfileSection.tsx` を新規作成: クライアントで `/course-profiles/{raceId}.json` を fetch し、`CourseMapLoader`（Leaflet地図）と `ElevationChartLoader`（Recharts高低差チャート）を描画
- `src/app/[locale]/races/[id]/page.tsx`: コースセクションに `CourseProfileSection` を追加（`race.course_gpx_file` が設定されている場合のみ表示）
- `package.json` に `course:generate` スクリプトを追加
- `CLAUDE.md` に `course:generate` コマンドを追記

## 2026-03-20 lintエラー対応

- `eslint.config.mjs` に `.open-next/**`・`.wrangler/**`・`scripts/**` を `globalIgnores` に追加（ビルド成果物・Node.js CJSスクリプトを除外）
- `src/app/[locale]/calendar/page.tsx`: 未使用の `formatDate` インポートを削除
- `src/components/access/AccessChecker.tsx`: 未使用の `locale` state を削除

## 2026-03-20 スキーマドキュメント整備

- `docs/schema.md` を新規作成（全テーブルのカラム定義・インデックス一覧・マイグレーション履歴）
- `docs/er-diagram.drawio` に `race_series`・`race_results` テーブルを追加し、1:1リレーション線を追加
- `CLAUDE.md` にスキーマ変更時の手順（`schema.md` と `er-diagram.drawio` の更新）を追記

## 2026-03-20 CLAUDE.md を日本語化

- `CLAUDE.md` の全文を日本語に書き換え（内容は維持）

## 2026-03-20 全52大会JSONを最新型定義に正規化

- `scripts/normalize-race-json.js` を新規作成
- 全52件のJSONファイルに対して実行し、`result`・`entry_fee_by_category`・`course_info.notes_ja/en`・カテゴリサブフィールドを補完、キー順序を型定義に合わせて整列
- `scripts/generate-seed-races.js` を更新（`race_results` テーブルへの INSERT 対応）
- `migrations/seed-races-all.sql` を再生成（50件）

## 2026-03-20 レースシリーズ・結果機能の追加

- `src/lib/db/schema.ts` に `race_series`・`race_results` テーブルを追加
- `migrations/0002_race_series_results.sql` を作成・適用（ローカル）
- `scripts/generate-seed-series.js` を新規作成、`migrations/seed-series.sql` を生成・適用（ローカル）
- `src/lib/data.ts` に `toSeriesId()`・`getSeriesById()`・`getSeriesRaces()` を追加
- `src/lib/types.ts` に `RaceSeries`・`RaceResult` 型を追加、`Race` に `result` フィールド追加
- `src/app/[locale]/races/[id]/page.tsx` にシリーズ過去大会・レース結果セクションを追加

## 2026-03-20 参加賞フィルター多重選択対応 / デザイン統一

- `src/lib/types.ts`: `GiftCategoryId` に `certificate` を追加、`RaceFilter.giftCategory` を `giftCategories: GiftCategoryId[]`（配列）に変更
- `src/lib/utils.ts`: `filterRaces()` を OR 条件の複数選択に対応
- `src/components/races/RaceFilter.tsx`: 月フィルター・参加賞カテゴリ複数選択に対応したデザインへ全面刷新
- `src/components/races/RaceList.tsx`: マガジン / エクスペリエンス表示切り替えを追加
- `src/app/[locale]/races/page.tsx`: エディトリアルヘッダーを追加、`giftCategories` を取得して `RaceList` に渡す
- `src/app/[locale]/races/[id]/page.tsx`: Travel Magazine デザインへ全面刷新、チェックポイント・エイドステーション・近隣スポット・天気履歴セクションを追加

## 2026-03-23 管理ツール（Admin UI）作成

- `tools/admin-server.js`: Node.js HTTPサーバー（ポート4000）
  - `GET /api/races` — 大会一覧
  - `GET/PUT /api/races/:id` — JSON読み書き
  - `POST /api/translate` — Claude API で日本語→英語翻訳
  - `POST /api/upload/:id` — 画像アップロード（`public/images/races/`）
- `tools/admin/index.html` / `style.css` / `app.js`: 管理UI
  - 左ペイン: 大会一覧＋検索、右ペイン: 編集フォーム
  - 翻訳ボタン（名前・説明文・受付メモの英語フィールド）
  - カテゴリの追加／削除、タグのチェックボックス選択
  - アイキャッチ画像アップロード＆プレビュー
  - Ctrl/Cmd+S で保存、未保存時の離脱警告
- `package.json`: `"admin": "node tools/admin-server.js"` 追加
- `.env.local` 新規作成（`ANTHROPIC_API_KEY` を設定）

## 2026-03-23 レースカード情報・操作の見直し

- `src/components/races/RaceCard.tsx`:
  - 画像エリアを 150px に戻す
  - カード全体を `<Link>` でラップ（クリックで詳細ページへ）、「詳細を見る」ボタンを廃止
  - 距離：全カテゴリを長い順にカンマ区切りで表示
  - エントリー期間（開始〜終了）を表示
  - 制限時間・定員を削除
  - 開催地を都道府県＋市区町村で表示
  - ホバーアニメーション（浮き上がり・画像ズーム）を削除

## 2026-03-23 デザイン全面刷新（ヒーロー・レースカード）

- `src/app/[locale]/layout.tsx`: Montserrat フォント追加（数字専用）
- `src/app/globals.css`: `--font-number` トークン追加
- `src/app/[locale]/page.tsx`: ヒーローをフルワイド・センタリングに刷新、右側コラージュを廃止、アンビエントライトグラデーション、ステータス行を追加
- `src/components/races/RaceCard.tsx`: 全面リデザイン（200px画像エリア、ID連動グラデーション6色、ホバーアニメーション、ステータスバッジ4種、数字をMontserrat、タグ表示）
- `src/components/home/HomeRaceSection.tsx`: カード間余白 gap-5 → gap-8
- `src/components/races/RaceList.tsx`: カード間余白 gap-5 → gap-8

## 2026-03-23 About・プライバシーポリシーページ作成

- `src/app/[locale]/about/page.tsx` を新規作成（サイト説明・掲載大会・免責事項、ja/en対応）
- `src/app/[locale]/privacy/page.tsx` を新規作成（GA4・アフィリエイト・第三者提供・Cookie、ja/en対応）
- `src/components/layout/Footer.tsx`: Infoセクションに `/about`・`/privacy` リンクを追加
- `src/messages/ja.json` / `en.json`: `about`・`privacy` フッターラベルを追加

## 2026-03-23 SEO / OGP / JSON-LD 実装

- `src/app/[locale]/races/[id]/page.tsx`:
  - `generateMetadata` を拡充（title・description・alternates・openGraph・twitter）
  - `SportsEvent` JSON-LD（`application/ld+json`）をページに埋め込み
- `src/app/[locale]/races/page.tsx`:
  - `generateMetadata` に description・alternates・openGraph・twitter を追加
- `src/app/[locale]/layout.tsx`:
  - `metadataBase: https://hashiru.run` を設定済み（サイト名変更時に追加）

## 2026-03-23 Google Analytics 4 導入

- `src/app/[locale]/layout.tsx`: `next/script` で GA4 スクリプト（`G-9975BX8LXR`）を `afterInteractive` で追加

## 2026-03-23 サイト名を HASHIRU に変更

- `src/messages/ja.json` / `en.json`: `siteName` を `HASHIRU`、`siteDescription` を更新
- `src/components/layout/Header.tsx`: ロゴ表記を `HASHIRU JAPAN` に変更
- `src/components/layout/Footer.tsx`: ブランド名・コピーライト表記を `HASHIRU` に変更
- `src/app/[locale]/layout.tsx`: `metadataBase` に `https://hashiru.run` を設定

## 2026-03-23 タグフィルターUI追加

- `src/components/races/RaceList.tsx`: `availableTags` を全レースのタグから `useMemo` で生成し、`RaceFilter` に渡すように変更
- `src/components/races/RaceFilter.tsx`: `availableTags: string[]` プロップを追加、タグ複数選択UI（ピル形式、AND条件）を「参加賞・完走証」と「都道府県」の間に追加

## 2026-03-23 管理ツール（Admin UI）作成

- `tools/admin-server.js`: Node.js HTTPサーバー（ポート4000）
  - `GET /api/races` — 大会一覧
  - `GET/PUT /api/races/:id` — JSON読み書き
  - `POST /api/translate` — Claude API（claude-haiku-4-5-20251001）で日本語→英語翻訳
  - `POST /api/upload/:id` — 画像アップロード（`public/images/races/`）、Base64形式
- `tools/admin/index.html` / `style.css` / `app.js`: 管理UI
  - 左ペイン: 大会一覧＋検索、右ペイン: 編集フォーム
  - 翻訳ボタン（名前・説明文・受付メモの英語フィールド）
  - カテゴリの追加／削除、タグのチェックボックス選択
  - アイキャッチ画像アップロード＆プレビュー
  - Ctrl/Cmd+S で保存、未保存時の離脱警告
- `package.json`: `"admin": "node tools/admin-server.js"` 追加
- `.env.local` 新規作成（`ANTHROPIC_API_KEY` を設定）
- `src/components/races/RaceCard.tsx`: `public/images/races/{id}.jpg` が存在する場合に実画像を表示（onErrorでグラデーションにフォールバック）

## 2026-03-24 管理ツール：参加費・定員をカテゴリ別管理に変更

- `tools/admin/index.html`: エントリー情報セクションから「参加費」「定員」フィールドを削除
- `tools/admin/style.css`: カテゴリ行のグリッドを 6列 → 7列に拡張（参加費列を追加）
- `tools/admin/app.js`:
  - カテゴリ行に「参加費 (円)」「定員」入力欄を追加（種別・距離の右隣に配置）
  - `buildRaceData()`: 各カテゴリから `entry_fee` / `capacity` を読み取るよう変更。race レベルの `entry_fee` を null・`entry_fee_by_category` を true に設定
  - `populateForm()`: 不要になった `entry_fee` / `entry_capacity` の setVal 呼び出しを削除

## 2026-03-24 管理ツール：公式サイトプレビュー・正式名称表示

- `tools/admin/index.html`: 右側に公式サイト iframe パネル（`.preview-pane`）を追加。トップバーに「🌐 公式サイト」トグルボタンを追加
- `tools/admin/style.css`: 3ペインレイアウト対応（sidebar / editor / preview-pane）、`.preview-pane` / `.preview-topbar` / `.preview-iframe` のスタイルを追加
- `tools/admin/app.js`:
  - サイドバーの大会名表示を `full_name_ja ?? name_ja` に変更
  - 大会選択時に公式サイト URL を iframe に読み込む `updatePreview()` を実装
  - 「🌐 公式サイト」ボタンで iframe パネルのトグル表示
  - `↗ 開く` ボタンで新しいタブに公式サイトを開く
  - `full_name_ja / full_name_en` が未入力の場合、`name_ja / name_en` を初期値として設定
- `tools/admin-server.js`: 大会一覧 API のレスポンスに `full_name_ja` を追加

## 2026-03-23 正式名称・回次フィールド追加

- `src/lib/types.ts`: `Race` に `full_name_ja / full_name_en / edition` フィールドを追加（すべて NULL 許容）
- `src/lib/db/schema.ts`: `races` テーブルに同3カラムを追加
- `migrations/0003_race_full_name_edition.sql`: ALTER TABLE マイグレーション作成・ローカル適用
- `src/data/races/*.json`（53件）: 全JSONに `full_name_ja / full_name_en / edition` フィールドを追加（値は null）
- `src/lib/data.ts`: `buildRace()` のマッピングに新フィールドを追加
- `src/app/[locale]/races/[id]/page.tsx`: 詳細ページのH1を `full_name` 優先表示に変更。`full_name` がある場合はシリーズ名をサブテキストで表示
- `tools/admin/index.html`: 基本情報セクションに「正式名称（日本語/英語）」「開催回次」フォームフィールドを追加
- `tools/admin/app.js`: `populateForm` / `buildRaceData` に新フィールドのread/write処理を追加
- `docs/schema.md`: races テーブルの定義・マイグレーション履歴を更新

## 2026-03-20 CLAUDE.md 作成 / README 更新

- `/init` スキルで `CLAUDE.md` を新規作成（コマンド・アーキテクチャ・i18n・データフロー・スタイリング等を記載）
- `README.md` を現在の構成（52大会・新デザイン・フィルター機能・シリーズ/結果モデル）に合わせて全面刷新

## 2026-03-24 カレンダーに申し込み期間を表示

- `src/app/[locale]/calendar/page.tsx`: 申込開始日・申込締切日もカレンダーに表示するよう実装。イベントを `CalendarEvent`（race / entry_start / entry_end）に統一し、各日付セルに色分けバッジを表示（赤: 大会当日、緑: 申込開始、オレンジ: 申込締切）。1セルあたり最大3件表示、超過分は "+N件" で省略。カレンダー下部に凡例を追加
- `src/messages/ja.json`: `calendar` 名前空間に `raceDay`・`entryStart`・`entryEnd`・`legend` キーを追加
- `src/messages/en.json`: 同上（英語訳）

## 2026-03-25 カレンダーの申込期間を帯表示に変更

- `src/app/[locale]/calendar/page.tsx`: 申込期間を帯（バンド）形式で表示するよう改修。セルの水平パディングを帯ゾーンから除去し、開始日は左角丸＋ラベル、終了日は右角丸＋ラベル、中間日は全幅グリーン帯（ラベルなし）、週をまたぐ場合は日曜セルで大会名を再表示
- `src/messages/ja.json` / `en.json`: 凡例キーを `entryPeriod` に更新

## 2026-03-25 管理ツール：公式サイト更新チェック機能

- `src/lib/db/schema.ts`: `races` テーブルに `series_id TEXT FK→race_series.id` を追加
- `migrations/0004_races_series_id.sql`: `series_id` 追加マイグレーション（既存データは SUBSTR(id,1,LENGTH(id)-5) で自動埋め）
- `src/lib/data.ts`: `getSeriesRaces()` の LIKE クエリを `eq(series_id)` に変更、不要な `like` import を削除
- `package.json`: `@aws-sdk/client-bedrock-runtime` を追加（Bedrock経由でClaude呼び出し）
- `tools/admin-server.js`:
  - `GET /api/series` — JSONファイルからシリーズ一覧（最新大会情報付き）を返す
  - `POST /api/series-check` — 公式URL を fetch → 開催概要リンクを自動探索 → BedrockでJSON抽出 → DB差分を返す
  - `POST /api/series-apply` — `mode: update` で既存JSON上書き / `mode: new` で新規JSONを作成
  - AWS Bedrock (claude-3-5-haiku) による HTML→構造化データ抽出（開催日・申込期間・参加費・定員）
- `tools/admin/index.html`: 「更新チェック」タブ・シリーズリスト・差分レビューパネルを追加
- `tools/admin/style.css`: タブ・シリーズリスト・差分テーブル・ステータスバッジ等のスタイルを追加
- `tools/admin/app.js`: タブ切り替え・シリーズ一覧読み込み・チェック実行・差分レンダリング・適用ロジックを追加
- `docs/schema.md`: races テーブルに `series_id` カラムを追記

## 2026-03-25 管理画面（大会追加・削除）を追加

- `src/lib/data.ts`: `getAllSeries()`・`getAllPrefectures()`・`getAdminRaces()` を追加
- `src/lib/admin-actions.ts`: Server Actions `createRace`・`deleteRace` を新規作成。既存シリーズへの大会追加・新シリーズ作成の両フローに対応
- `src/app/[locale]/admin/page.tsx`: 管理ダッシュボード（大会一覧＋削除ボタン・年度グループ）
- `src/app/[locale]/admin/DeleteRaceButton.tsx`: 削除確認ダイアログ付きClient Component
- `src/app/[locale]/admin/races/new/page.tsx`: 新規大会追加ページ
- `src/app/[locale]/admin/races/new/RaceForm.tsx`: フォームClient Component（シリーズ選択・基本情報・エントリー情報・カテゴリ追加/削除）

## 2026-03-28 ネットワークドライブ対応（wrangler ローカル状態をローカルドライブに移行）

- `next.config.ts`: `initOpenNextCloudflareForDev` に `persist: { path: join(homedir(), '.wrangler', 'states', 'krote-run', 'v3') }` を追加（SMB ネットワークドライブ上の SQLite WAL モード問題を回避）
- `package.json`: ローカル DB 操作スクリプト（`db:migrate:local`, `db:seed:local`, `db:seed-races:local`, `db:series:local`）に `--persist-to %USERPROFILE%/.wrangler/states/krote-run` を追加
- `CLAUDE.md`: Windows コマンド例のパスを `C:\Dev\krote-run` → `g:\Dev\krote-run` に更新
- ローカル D1 データを `C:\Users\krote\.wrangler\states\krote-run\v3\` に再マイグレーション・シード適用

## 2026-03-29 プロジェクトフォルダをCドライブに移動

- 作業フォルダを `G:\Dev\krote-run`（ネットワークドライブ）から `C:\Dev\krote-run`（ローカルドライブ）に移動
- `CLAUDE.md`: Windows コマンド例のパスを `g:\Dev\krote-run` → `C:\Dev\krote-run` に修正

## 2026-03-29 大会データ追加・修正（Runnet週間エントリー開始大会より）

- 新規追加（4件）:
  - `src/data/races/ichinoseki-half-marathon-2026.json`: 第45回一関国際ハーフマラソン（岩手、9/27）
  - `src/data/races/akita-nairiku-ultra-2026.json`: 北緯40°秋田内陸リゾートカップ100キロ（秋田、9/27）
  - `src/data/races/asahikawa-half-marathon-2026.json`: 旭川ハーフマラソン第18回（北海道、9/27）
  - `src/data/races/higashinipon-half-marathon-2026.json`: 第10回東日本ハーフマラソン（神奈川、10/4）
- 修正（2件）:
  - `hokkaido-marathon-2026.json`: 制限時間を300分→360分（6時間）に修正
  - `tazawako-marathon-2026.json`: 20km制限時間0→180分、10km制限時間0→120分に修正、誤ったGPXファイル参照を削除
- 参照元: https://runnet.jp/runtes/guide/weekly/260327.html および各大会公式サイト

## 2026-03-30 大会データ追加（公式サイトより5件）

- 新規追加（5件）:
  - `src/data/races/chiba-aqualine-marathon-2026.json`: ちばアクアラインマラソン2026（千葉、11/8、フル+ハーフ）
  - `src/data/races/tomisato-suikaroad-2026.json`: 第43回富里スイカロードレース大会（千葉、6/14、10km+7km）
  - `src/data/races/okushinano100-2026.json`: 奥信濃100トレイルランニングレース2026（長野、6/5-7、100km/50km/25km/8km）
  - `src/data/races/osj-ontake100-2026.json`: OSJ ONTAKE100 2026（長野、7/18-19、100マイル+100K）
  - `src/data/races/higashine-sakuranbo-marathon-2026.json`: さくらんぼマラソン大会2026（山形、6/7、ハーフ+10km+5km）
- 参照元: 各大会公式サイト

## 2026-03-31 大会一覧：ステータスフィルタ追加・デフォルト開催済み非表示

- `src/lib/types.ts`: `RaceStatus` 型（`open_entry` / `entry_not_open` / `entry_closed` / `past`）を追加。`RaceFilter` に `statuses: RaceStatus[]` フィールドを追加
- `src/lib/utils.ts`:
  - `getRaceStatus(race)` を追加（今日の日付と比較してステータスを判定）
  - `defaultFilter()` を追加（`statuses: ['open_entry', 'entry_not_open', 'entry_closed']` — 開催済み非表示がデフォルト）
  - `isDefaultFilter()` を追加（デフォルト状態との比較用）
  - `filterRaces()` にステータスフィルタロジックを追加
  - ソートは開催日昇順（`sortRacesByDate` 既存のまま維持）
- `src/components/races/RaceFilter.tsx`: フィルターパネル先頭にステータス選択ピル（受付中・受付前・受付終了・開催済み）を追加。クリアボタンは `defaultFilter()` へリセット
- `src/components/races/RaceList.tsx`: 初期フィルタを `emptyFilter()` → `defaultFilter()` に変更

## 2026-03-30 ホーム画面リニューアル（Hero縮小・3セクション化）

- `src/app/[locale]/page.tsx`:
  - Hero セクションの高さを縮小（min-h 560px→240px、py-16→py-10、H1フォントサイズ縮小）
  - statsRow（ハードコード数字）・MetaBar を削除
  - subtitle のハードコード件数（"52大会・47都道府県"）を汎用テキストに変更
  - 「近日開催」「エントリー受付中」「まもなく受付開始」の3グループをフェッチして `HomeSections` に渡す
- `src/components/home/HomeSections.tsx` を新規作成:
  - 3セクション共通のマガジン/体験トグルを上部に配置
  - 各セクションが空の場合は非表示
  - 受付中は緑、まもなく受付開始は青のアクセントカラー
- `src/lib/data.ts`:
  - `getOpenEntryRaces(limit)` を追加（entry_start_date ≤ 今日 ≤ entry_end_date、締切順）
  - `getSoonOpeningEntryRaces(limit)` を追加（今日〜30日以内にエントリー開始）
  - drizzle-orm の `lte`, `and`, `isNotNull` をインポートに追加
- `src/messages/ja.json` / `en.json`: subtitle・sections キーを更新・追加

## 2026-03-31 Issue #1: 複数エントリー期間対応

- `src/lib/db/schema.ts`: `race_entry_periods` テーブルを追加（nullable `category_id` でレース全体 or 種目別対応）、relations を更新
- `migrations/0005_race_entry_periods.sql`: Drizzle マイグレーションファイルを追加
- `src/lib/types.ts`: `EntryPeriod` インターフェースを追加、`Race` に `entry_periods: EntryPeriod[]` フィールドを追加
- `src/lib/data.ts`: 全クエリ関数で `race_entry_periods` を一括取得。`getOpenEntryRaces`/`getSoonOpeningEntryRaces` を EXISTS サブクエリに変更
- `src/lib/utils.ts`: `getRaceStatus()` が `entry_periods` を優先使用し、旧フィールドにフォールバック
- `src/data/races/*.json` (62件): `entry_periods` 配列を追加（既存の `entry_start_date`/`entry_end_date` から変換）
- `scripts/add-entry-periods.js`: 一括 JSON 変換スクリプトを追加
- `src/app/[locale]/calendar/page.tsx`: `EntryBand` に `period: EntryPeriod` を追加、各エントリー期間を個別の帯として表示
- `src/app/[locale]/races/[id]/page.tsx`: エントリー期間セクションを更新。複数期間の場合はテーブル表示
- `src/components/races/RaceCard.tsx`: `entry_periods` を使用したステータス計算・期間表示に更新（複数期間は「他N件」表示）
- `src/components/races/RaceCardExp.tsx`: `entry_periods` を使用したステータス計算に更新
- `src/app/[locale]/admin/races/new/RaceForm.tsx`: 複数エントリー期間の動的 UI を追加（追加・削除ボタン付き）
- `src/lib/admin-actions.ts`: `race_entry_periods` テーブルへの保存処理を追加

## 2026-04-02 エントリー未発表表示対応・画像フォールバック改善

- `src/components/races/RaceCard.tsx`: 未発表表示を `useTranslations('races.detail')` 経由の i18n に変更。画像を `opacity-0` で初期化し `onLoad` で表示切替（壊れたアイコン防止）
- `src/components/races/RaceCardExp.tsx`: エントリー期間・日程が未設定かつ開催前の大会に「未発表」ハイライトを追加
- `src/messages/ja.json` / `en.json`: `races.detail.unpublished` キーを追加（「未発表」/「TBA」）
- `migrations/seed-races-all.sql`: 60件分を再生成（entry_periods 含む）

## 2026-04-02 Phase 1 自動テスト導入（ユーティリティ関数）

- `vitest` + `@vitest/coverage-v8` をインストール
- `vitest.config.ts` を作成（`@/` エイリアス、node 環境、coverage 設定）
- `package.json` に `test` / `test:watch` / `test:coverage` スクリプトを追加
- `src/lib/__tests__/fixtures.ts`: テスト用 makeRace / makeCategory / makeEntryPeriod ファクトリ
- `src/lib/__tests__/utils.format.test.ts`: 日付・距離・金額フォーマット系（24テスト）
- `src/lib/__tests__/utils.status.test.ts`: getRaceStatus（vi.setSystemTime で日付固定）（15テスト）
- `src/lib/__tests__/utils.filter.test.ts`: filterRaces / sortRacesByDate（19テスト）
- `src/lib/__tests__/utils.filter-state.test.ts`: defaultFilter / isDefaultFilter / isFilterEmpty / getMainCategory（14テスト）
- `.github/workflows/test.yml`: push / PR 時に自動テスト + lint を実行
- 合計 72テスト、全パス

## 2026-04-03 管理ツールに未整備フィールド可視化機能を追加

- `tools/admin-server.js`: `getMissingFields()` 純粋関数を追加（高優先3項目・中優先3項目を判定）、`/api/races` レスポンスに `missingCount: {high, medium}` を追加、`/api/completeness` エンドポイント新設（全大会の未整備フィールド詳細を返す）
- `tools/admin/index.html`: サイドバータブに「データチェック」ボタンを追加、`#data-check-list`・`#data-check-area` のHTML追加
- `tools/admin/app.js`: サイドバーの大会リストに未整備バッジ（高:N/中:N）を表示、`switchTab()` に `'data-check'` ケース追加、`loadDataCheck()` / `renderDcTable()` 関数を実装（年フィルタ・問題なし非表示・✗クリックで編集タブへ遷移）
- `tools/admin/style.css`: `.missing-badge` / `.missing-high` / `.missing-medium` バッジスタイル、`.data-check-area` / `.dc-table` / `.dc-ok` / `.dc-ng` テーブルスタイルを追加

## 2026-04-03 管理ツールのテスト追加・エラーハンドリング改善

- `tools/admin-server.js`: `require.main === module` で起動を条件分岐し、`module.exports = { getMissingFields }` でテスト用エクスポートを追加
- `tools/admin/app.js`: `loadDataCheck()` の fetch 後に `res.ok` チェックを追加（旧サーバー稼働時に "Unexpected token 'N'" が出る問題を修正し、「サーバーを再起動してください」と案内）
- `tools/admin-server.test.js`: Node.js 組み込み `node:test` による `getMissingFields` ユニットテスト（23件）+ HTTP統合テスト（4件）を新規作成（計28テスト全パス）
- `package.json`: `"test:admin": "node --test tools/admin-server.test.js"` スクリプト追加


## 2026-04-04 大会詳細ページにパンくずナビゲーション追加

- `src/app/[locale]/races/[id]/page.tsx`: ヒーロー上部の「← 大会一覧」ボタンをパンくずリストに置き換え（ホーム › 大会一覧 › 大会名）
- `src/messages/ja.json`, `src/messages/en.json`: `races.detail.breadcrumb.home` / `races.detail.breadcrumb.races` キーを追加
- パンくず「大会一覧」部分は既存の `BackButton` を流用（同一オリジンからの遷移時は `router.back()`、直リンク・外部からは `/races` へフォールバック）

## 2026-04-11 参加予定カテゴリ選択・エントリー期間別リマインド・ボタンUI改善

- `src/lib/types.ts`: `RaceCategory` に `id: number` フィールドを追加
- `src/lib/data.ts`: `rowToCategory` に `id` を追加
- `src/lib/db/schema.ts`: `user_races` テーブルを変更 — `entry_reminder`/`gcal_entry_event_id` を削除し、`planning_category_id`（FK to race_categories）・`entry_reminder_period_ids`（JSON: number[]）・`gcal_entry_event_ids`（JSON: {[periodId]: eventId}）を追加
- `migrations/0003_sloppy_jack_power.sql`: 上記スキーマ変更のマイグレーションSQL（手動修正）
- `src/app/api/races/index/route.ts`: `categories` 情報を含むレスポンスに拡張（マイページ表示用）
- `src/app/api/user/races/[raceId]/route.ts`: 新スキーマに対応 — カテゴリ選択保存、複数エントリー期間リマインド追加/削除、GCalイベント管理
- `src/components/races/RaceRegistrationButtons.tsx`: 全面改修 — カテゴリ複数時ドロップダウン選択、エントリー期間別リマインドドロップダウン、ダーク背景対応の白アウトラインボタンに視認性改善
- `src/components/mypage/UserRaceList.tsx`: 参加予定カテゴリ名・距離バッジを表示、リマインド件数表示
- `src/app/[locale]/races/[id]/page.tsx`: `RaceRegistrationButtons` に `categories` と `entryPeriods`（今日以降のみ）を渡すよう更新
- `src/components/__tests__/RaceRegistrationButtons.test.tsx`: 新 Props 構造に対応したテストに更新
- `src/components/__tests__/Header.test.tsx`: マイページがnav+ドロップダウンの両方に表示される状況に対応

## 2026-04-11 Google Calendar連携: リフレッシュトークン対応

- `src/lib/auth.ts`: Google OAuth に `accessType: 'offline'` を追加（初回ログイン時にリフレッシュトークンを取得）
- `src/app/api/user/races/[raceId]/route.ts`: `getGoogleAccessToken()` にトークン自動更新ロジックを追加 — `accessTokenExpiresAt` が30秒以内に切れる場合はリフレッシュトークンで更新し、DBの `accessToken`/`accessTokenExpiresAt` を上書き保存

## 2026-04-11 Google Calendar連携をURLスキーム方式に変更

- `src/lib/auth.ts`: Google OAuth スコープから `calendar.events` を削除し、基本スコープ（openid/email/profile）のみに戻す
- `src/app/api/user/races/[raceId]/route.ts`: GCal API ロジックを完全削除 — DB更新（is_planning, planning_category_id, entry_reminder_period_ids）のみのシンプルな実装に
- `src/lib/db/schema.ts`: `user_races` から `gcal_race_event_id`・`gcal_entry_event_ids` カラムを削除
- `migrations/0004_complex_justin_hammer.sql`: 上記カラム削除のマイグレーションSQL
- `src/components/races/RaceRegistrationButtons.tsx`: Google Calendar URLスキーム（`calendar.google.com/calendar/render?action=TEMPLATE`）を使った実装に変更。登録時に新タブでGCalイベント作成画面を開く。解除時はカレンダーから手動削除するよう案内テキストを表示
- `src/lib/gcal.ts`: 削除（GCal API連携廃止）
- `src/lib/__tests__/gcal.test.ts`: 削除（同上）
- `src/lib/__tests__/auth.test.ts`: calendar.events スコープのアサーションを削除し、基本スコープの確認に更新

## 2026-04-13 管理ツール DB即時投入機能追加（Issue #16）

- `tools/admin-server.js`
  - `syncLocalDb()`: `seed-races.sql` → `seed-races-all.sql` に修正
  - `syncLocalDb()` / `syncRemoteDb()`: `exec` パラメータを注入可能にしてテスト容易性を向上
  - `syncRemoteDb()` 関数を新規追加（`wrangler d1 execute --remote`）
  - `POST /api/sync-remote` エンドポイントを追加
  - `module.exports` に `syncLocalDb` / `syncRemoteDb` を追加
- `tools/admin/index.html`: 「☁ リモートDB登録」ボタン（`btn-sync-remote`）を追加
- `tools/admin/app.js`: `syncRemoteDb()` 関数を追加（確認ダイアログ・ステータス表示付き）
- `tools/admin/style.css`: `.btn-warning` スタイルを追加
- `tools/admin-server.test.js`: `syncLocalDb` / `syncRemoteDb` のユニットテストを追加（9件）

## 2026-04-14 カレンダー本日ハイライトのJST対応（Issue #11）

- `src/lib/utils.ts`: `getTodayJST()` 関数を追加（`Asia/Tokyo` タイムゾーンで YYYY-MM-DD を返す）
- `src/app/[locale]/calendar/page.tsx`: `isToday` 判定を `new Date()` の UTC 基準から `getTodayJST()` によるJST基準に変更
- `src/lib/__tests__/utils.date.test.ts`: `getTodayJST` のユニットテストを追加（UTC/JSTまたがり・年またぎを含む5件）

## 2026-04-15 静的コンテンツページの追加（Issue #22）

- `src/app/[locale]/terms/page.tsx`: 利用規約ページを追加（ja/en対応）
- `src/app/[locale]/guide/page.tsx`: 初めての方へページを追加（ログインのメリット含む、ja/en対応）
- `src/components/layout/Footer.tsx`: 「初めての方へ」「利用規約」リンクを追加
- `src/messages/ja.json`, `src/messages/en.json`: footer に `guide` / `terms` キーを追加
- `src/app/[locale]/terms/__tests__/page.test.ts`: generateMetadata テスト追加（4件）
- `src/app/[locale]/guide/__tests__/page.test.ts`: generateMetadata テスト追加（4件）

## 2026-04-15 管理ツールに周辺スポット編集機能を追加（Issue #19）

- `tools/admin/app.js`: `renderNearbySpots` / `addNearbySpotRow` / `collectNearbySpots` を追加。`populateForm` と `buildRaceData` に連携を追加
- `tools/admin/index.html`: 周辺スポットセクション（`#nearby-spots-container`）を追加
- `tools/admin/style.css`: `.nearby-spot-row` / `.nearby-spot-fields` スタイルを追加
- `tools/admin-server.js`: `getMissingFields()` に nearby_spots チェック（0件 → medium）を追加
- `tools/admin-server.test.js`: nearby_spots の getMissingFields テストを追加（3件）

## 2026-04-16 Cookie同意バナーとCookieポリシーページを追加（Issue #25）

- `src/components/analytics/CookieConsentBanner.tsx`: 新規作成。localStorage + gtag Consent Mode v2 連携バナー（同意/拒否）
- `src/app/[locale]/cookie-policy/page.tsx`: 新規作成。Cookieポリシー静的ページ（ja/en両対応）
- `src/app/[locale]/layout.tsx`: consent default（全denied）をGA4より先に設定。CookieConsentBanner を組み込み
- `src/messages/ja.json` / `src/messages/en.json`: `cookieConsent` / `cookiePolicy` ネームスペースを追加

## 2026-04-17 説明欄の改行表示を修正（Issue #29）

- `src/app/[locale]/races/[id]/page.tsx`: 概要・参加賞・周辺スポットの description に `whitespace-pre-line` を追加し、テキスト中の `\n` を改行として描画

## 2026-04-16 お問い合わせフォーム実装（Issue #24）

- `src/lib/db/schema.ts`: `contact_submissions` テーブルを追加（id, name, email, category, message, user_id, status, created_at）
- `migrations/0005_boring_corsair.sql`: 上記テーブルのDrizzleマイグレーションを生成
- `migrations/meta/0004_snapshot.json`: スナップショット衝突（prevId重複）を修正
- `src/lib/contact-actions.ts`: Server Action `submitContact` を新規作成。バリデーション・D1保存・Resend通知（APIキー未設定時はスキップ）
- `src/components/contact/ContactForm.tsx`: お問い合わせフォームのClient Component（useActionState使用）
- `src/components/contact/ContactFormWrapper.tsx`: useSession()でログイン情報を取得しContactFormに渡すラッパー
- `src/app/[locale]/contact/page.tsx`: `/contact` ページを新規作成
- `src/messages/ja.json` / `src/messages/en.json`: `contact` ネームスペース、`nav.contact` キーを追加
- `src/components/layout/Footer.tsx`: フッターのInfoセクションにお問い合わせリンクを追加
- `docs/schema.md`: contact_submissions テーブルの定義・マイグレーション履歴を追記
- `package.json`: `resend` パッケージを追加（メール通知用）

## 2026-05-01 サイトマップ追加（Issue #23）

- `src/app/sitemap.ts`: `/sitemap.xml` を自動生成（Next.js MetadataRoute API）。静的9ページ × ja/en + 全大会 × ja/en を出力。`force-dynamic` でD1取得に対応
- `src/app/[locale]/sitemap/page.tsx`: HTMLサイトマップページ新規作成（メインページ・サービス情報・全大会の3セクション）
- `src/components/layout/Footer.tsx`: サービス情報セクションにサイトマップリンクを追加
- `src/messages/ja.json` / `en.json`: `sitemap` 翻訳キー、フッター `sitemap` キーを追加

## 2026-05-02 カテゴリ別GPXファイル・地図拡大ボタン・参加資格テキストエリア化

- `migrations/0007_category_gpx.sql`: `race_categories.course_gpx_file` カラム追加
- `src/lib/db/schema.ts`: `race_categories` に `course_gpx_file` 追加
- `src/lib/types.ts`: `RaceCategory.course_gpx_file` 追加
- `src/lib/data.ts`: `rowToCategory` に `course_gpx_file` 追加
- `src/lib/__tests__/fixtures.ts`: `makeCategory` に `course_gpx_file: null` 追加
- `scripts/generate-seed-races.js`: categories INSERT に `course_gpx_file` 追加
- `src/components/course/CourseProfileSection.tsx`: prop を `raceId` → `profileKey` に変更（拡張子自動除去）
- `src/components/course/CourseMap.tsx`: 拡大/縮小トグルボタンを追加（`invalidateSize` 対応）
- `tools/admin/app.js`: カテゴリ行に GPX ファイル名入力フィールド追加、参加資格フィールドをテキストエリア化
- `src/app/[locale]/races/[id]/page.tsx`: カテゴリ別マップ表示（カテゴリ名を見出しに）、フォールバックとしてレース単位GPXを維持

## 2026-05-02 エントリー情報拡張（Issue #37）

- `migrations/0006_entry_info.sql`: DBマイグレーション追加（entry_closed、eligibility、race_entry_links）
- `src/lib/db/schema.ts`: `races.entry_closed`、`race_categories.eligibility_ja/en`、`race_entry_links` テーブルを追加
- `src/lib/types.ts`: `Race.entry_closed`、`Race.entry_links`、`RaceCategory.eligibility_ja/en`、`EntryLink` 型を追加
- `src/lib/data.ts`: `rowToCategory` に eligibility 追加、`rowToEntryLink`/`EntryLinkRow` 追加、`assembleRace` と `getRaceById` を更新
- `src/lib/utils.ts`: `getRaceStatus` で `entry_closed` フラグを優先判定するよう変更
- `src/lib/__tests__/fixtures.ts`: `makeRace`/`makeCategory`/`makeEntryLink` に新フィールドを追加
- `src/lib/__tests__/utils.status.test.ts`: `entry_closed` 判定のテストを追加（4件）
- `scripts/generate-seed-races.js`: `entry_closed`、`eligibility_ja/en`、`entry_links` をシードSQLに反映
- `tools/admin/index.html`: エントリー情報セクションに受付終了チェックボックス・エントリーリンク追加、カテゴリに参加資格フィールド追加
- `tools/admin/app.js`: `renderEntryLinks`/`addEntryLinkRow`/`collectEntryLinks` 追加、`populateForm`・`addCategoryRow`・`collectData` を更新
- `src/app/[locale]/races/[id]/page.tsx`: entry_closed バッジ表示、エントリーリンクボタン、カテゴリ参加資格表示を追加
- `docs/schema.md`: race_entry_links テーブル、entry_closed、eligibility を追記

## 2026-05-03 デザインリフレッシュ Phase 1（藍×生成り）

- `src/app/globals.css`: カラーパレットを藍（#1d4373）×生成り（#f7f2e7）に全面刷新。`--color-primary` を朱→藍に変更し、`--color-shu` / `--color-asagi` を追加
- `src/app/[locale]/layout.tsx`: `Playfair_Display` を `Noto_Serif_JP` に置換（`--font-noto-serif-jp` として注入）
- `src/components/layout/Header.tsx`: 走 HASHIRU ロゴ（セリフ+藍）、アクティブリンク下線、モノスペースJA/ENスイッチャー、ダークインクログインボタンに刷新
- `src/app/[locale]/page.tsx`: Hero を3カラムグリッド（英文h1＋CTA / 走カナロゴ / 統計）に再設計。WhySectionを濃墨背景＋漢字2×2グリッドに刷新
- `src/components/home/HomeSections.tsx`: OpenSection（受付中カード）・SoonSection（OPENS日リスト）・VisitorBand・UpcomingSection の4セクション構成に全面再設計
- `src/components/races/RaceCard.tsx`: 藍ストライプ背景＋季節タブ（春夏秋冬）＋ステータスバッジ＋Noto Serif タイトル＋Distance/Entry フッターのカードデザインに刷新
- `src/components/races/RaceCardExp.tsx`: 新パレット（藍）に合わせてカラートークンを更新
- `src/app/[locale]/races/page.tsx`: ページヘッダーをダーク背景から生成りの編集スタイルに変更

## 2026-05-04 デザインリフレッシュPhase2 スキーマ拡張（Issue #42）

- `src/lib/db/schema.ts`: `races` テーブルに `motif`/`motif_color`/`motif_romaji`/`tagline_ja`/`tagline_en`/`hero_image_url`/`hero_caption_ja`/`hero_caption_en` を追加、`race_results` テーブルに `avg_time` を追加
- `migrations/0008_phase2_motif_hero.sql`: Phase 2 スキーマ変更用マイグレーションを手動作成
- `src/lib/types.ts`: `Race` インターフェースに Phase 2 フィールドを追加、`RaceResult` に `avg_time` を追加
- `src/lib/data.ts`: `rowToResult` / `assembleRace` に Phase 2 フィールドのマッピングを追加
- `src/data/races/*.json`（78件）: Phase 2 フィールド（null）を全ファイルに追加
- `scripts/generate-seed-races.js`: `races` / `race_results` の INSERT 文に Phase 2 カラムを追加
- `migrations/seed-races-all.sql`: シードスクリプトを再生成
- `src/lib/__tests__/fixtures.ts`: `makeRace()` に Phase 2 フィールドを追加
- `tools/admin/index.html`: ビジュアルセクション（motif/tagline/hero_image 入力フォーム）を追加
- `tools/admin/app.js`: `populateForm()` / `buildJson()` に Phase 2 フィールドの読み書きを追加
- `docs/schema.md`: Phase 2 カラム定義とマイグレーション履歴を更新

## 2026-05-04 詳細ページPhase3 ギャラリー・参加者の声対応（Issue #43）

- `src/lib/db/schema.ts`: `race_gallery` / `race_voices` / `race_time_buckets` / `race_course_highlights` テーブルを追加、リレーション定義
- `migrations/0009_phase3_gallery_voices.sql`: Phase 3 テーブル追加用マイグレーションを手動作成
- `src/lib/types.ts`: `RaceGallery` / `RaceVoice` / `RaceTimeBucket` / `RaceCourseHighlight` インターフェースを追加、`Race` に配列フィールドを追加
- `src/lib/data.ts`: `getRaceById()` に4テーブルのクエリ・マッピングを追加、`assembleRace()` に引数追加
- `src/lib/__tests__/fixtures.ts`: `makeRace()` に4配列フィールドを追加、`makeGallery()` / `makeVoice()` / `makeTimeBucket()` / `makeCourseHighlight()` ファクトリを追加
- `scripts/generate-seed-races.js`: 4テーブルの DELETE/INSERT 処理を追加
- `tools/admin/index.html` / `tools/admin/app.js`: ギャラリー・参加者の声・タイム分布・コース見どころセクションを追加
- `src/components/races/detail/DetailHeader.tsx`: ヒーロービジュアル（motif カラー背景・ヒーロー画像・タグライン）コンポーネント（TDD）
- `src/components/races/detail/AnchorBar.tsx`: sticky セクションナビバーコンポーネント（TDD）
- `src/components/races/detail/OverviewSection.tsx`: 概要・タグ表示コンポーネント（TDD）
- `src/components/races/detail/EntrySection.tsx`: エントリー情報コンポーネント（TDD）
- `src/components/races/detail/LastEditionSection.tsx`: 前回大会実績コンポーネント（TDD）
- `src/components/races/detail/GallerySection.tsx`: ギャラリー・参加者の声コンポーネント（TDD）
- `src/app/[locale]/races/[id]/page.tsx`: 新コンポーネントで詳細ページを再構成

## 2026-05-05 カレンダーページPhase4 強化（Issue #44）

- `src/components/calendar/ControlBar.tsx`: STATUS/REGION フィルター UI（TDD）
- `src/components/calendar/HoverCard.tsx`: ホバー時ミニカード（TDD）
- `src/components/calendar/MonthGrid.tsx`: 月送りグリッド Client Component（TDD）
- `src/components/calendar/YearTimeline.tsx`: SVG ベース年間タイムライン（TDD）
- `src/components/calendar/CalendarView.tsx`: ビュー切替・フィルター統合ラッパー（TDD）
- `src/app/[locale]/calendar/page.tsx`: CalendarView で再構成、デザイントークン統一

## 2026-05-05 Phase 2/3 フィールドのデータ充填（Issue #49）

- `src/data/races/*.json`（77件）: Phase 2/3 フィールドを一括設定
  - `gallery` / `voices` / `time_buckets` / `course_highlights` を空配列としてフィールド追加
  - `motif` / `motif_color` / `motif_romaji` を各大会の特徴・地域から設定（全77件）
  - `tagline_ja` / `tagline_en` を各大会のキャッチコピーとして設定（全77件）
  - `course_highlights` を既存の `course_info.highlights_ja/en` から構造化（61件）
- `scripts/add-phase3-fields.js`: Phase 3 空配列フィールドを一括追加するスクリプト
- `scripts/set-motif-data.js`: motif/tagline データを全件に適用するスクリプト
- `scripts/build-course-highlights.js`: course_info から course_highlights を構造化するスクリプト
- `migrations/seed-races-all.sql`: シードSQL再生成（新フィールド反映）

## 2026-05-07 course_highlights をカテゴリ付随に変更・詳細ページデザイン刷新

- `src/lib/db/schema.ts`: `race_course_highlights.km` を nullable 化、`category_id` FK (nullable) 追加
- `src/lib/types.ts`: `RaceCourseHighlight` に `category_id` 追加・`km` nullable 化、`RaceCategory` に `course_highlights` 追加、`Race` から `course_highlights` 削除
- `src/lib/data.ts`: highlights をカテゴリ別に振り分けるロジックを追加
- `migrations/0006_high_mole_man.sql`: km nullable 化のテーブル再構築マイグレーション（手動修正）
- `migrations/0007_yielding_obadiah_stane.sql`: category_id カラム追加
- `scripts/generate-seed-races.js`: カテゴリレベルの course_highlights INSERT 追加、レースレベルも category_id=NULL で対応
- `migrations/seed-races-all.sql`: シードSQL再生成
- `src/components/races/detail/DetailHeader.tsx`: 詳細ページヘッダー全面刷新（モチーフバッジ・版次表示・メタ行）
- `src/app/[locale]/races/[id]/page.tsx`: セクション番号化（01–10）、コース地図とハイライト横並びレイアウト
- `src/components/course/CourseProfileSection.tsx`: sidebarContent prop 追加
- `src/components/races/RaceBreadcrumb.tsx`: 背景変更後の文字色修正
- `src/components/races/RaceRegistrationButtons.tsx`: クリーム背景向け色修正
- `src/lib/__tests__/fixtures.ts`: makeRace・makeCategory・makeCourseHighlight を新スキーマに合わせて更新

## 2026-05-09 i18n対応・VisitorBand・訪日ランナーガイドページ追加

- `src/messages/ja.json`: `home.hero`（findRaces・tagline・captionRaces）、`home.meta`（entryOpenLabel）、`home.sections`（openHeading・openHeadingEm・entryOpen・deadline・soonHeading・soonHeadingEm・soonHeadingSuffix・visitorBody・visitorCTA）、`home.why.body` を追加
- `src/messages/en.json`: 上記キーの英語訳を追加
- `src/app/[locale]/page.tsx`: CaptionBar・HeroSection統計・CTAボタン・タグライン・WhySectionの本文をすべて翻訳キー化
- `src/components/home/HomeSections.tsx`: OpenSection見出し・バッジ・締切ラベル、SoonSection見出し、VisitorBand本文・CTAをすべて翻訳キー化；VisitorBandリンク先を `/guide` → `/visitor` に変更
- `src/app/[locale]/visitor/page.tsx`: 訪日ランナー向けガイドページを新規作成（日英両対応）。5セクション構成（エントリー・前日受付・アクセス宿泊・当日の流れ・キーワード集）、注意書きを各所に配置
- `src/components/calendar/__tests__/YearTimeline.test.tsx`: `month` プロップ追加・ウィンドウロジックのテストを拡充
- `src/components/races/detail/__tests__/EntrySection.test.tsx`: `id="entry"` 移動に伴うテスト修正

## 2026-05-10 レースデータ追加・詳細ページにリザルトセクション追加

- `src/data/races/kasama-togeinosato-half-2025-2025.json`: かさま陶芸の里ハーフマラソン2025 新規追加（time_buckets・参加賞・近隣スポット含む）
- `src/data/races/mito-komon-manyu-marathon-2026.json`: course_highlights をカテゴリ付随に整理、course_gpx_file 追加
- `src/data/races/okushinano100-2026.json`: 4種目のカテゴリ詳細（資格・GPX・name_ja）・エントリーリンク・entry_fee null 修正
- `public/gpx/kasama-togeinosato-half-2025-2025.gpx` 他6件: GPXファイル追加
- `public/course-profiles/kasama-togeinosato-half-2025-2025.json` 他5件: コースプロファイルJSON追加
- `src/app/[locale]/races/[id]/page.tsx`: ナビゲーションに access/gifts/nearby/result タブを条件付きで追加；タイム分布バーチャート（time_buckets）セクションを追加
- `migrations/seed-races-all.sql`: 上記データを反映して再生成

## 2026-05-10 大会詳細ページ英語対応（未翻訳セクション修正）

- `src/lib/db/schema.ts`: `race_voices` に `quote_en` カラム追加
- `src/lib/types.ts`: `RaceVoice` に `quote_en: string | null` を追加
- `src/lib/data.ts`: `rowToVoice` に `quote_en` を追加
- `src/components/races/detail/GallerySection.tsx`: voices の引用文を locale 対応（`quote_en ?? quote_ja`）
- `src/components/races/RaceRegistrationButtons.tsx`: `locale` prop 追加、全 UI テキスト（参加予定・受付開始リマインド・登録解除・Googleカレンダー注記・ period ラベル）を英語対応
- `src/app/[locale]/races/[id]/page.tsx`: `RaceRegistrationButtons` に `locale` prop を渡すよう修正
- `src/lib/__tests__/fixtures.ts`: `makeVoice` に `quote_en: null` を追加
- `migrations/0008_stormy_reavers.sql`: `race_voices.quote_en` 追加マイグレーション（ローカル適用済み）
- `docs/schema.md`: `race_voices` テーブルに `quote_en` 行とマイグレーション履歴を追記

## 2026-05-10 カレンダーページに距離カテゴリフィルターを追加

- `src/components/calendar/ControlBar.tsx`: `DistanceFilter` 型・距離オプション定義・距離フィルターボタン行を追加
- `src/components/calendar/CalendarView.tsx`: `distance` state・距離によるフィルタリングロジック・ControlBar への props 追加

## 2026-05-13 本番サイトのアンカーバー欠落を修正（cf:deploy漏れ対応）

- **原因調査**: 本番サイト（hashiru.run）で参加賞・近隣情報のアンカーバーが表示されない問題を調査
- `scripts/generate-seed-races.js`: `last_insert_rowid()` を subquery に変更（FK constraint エラー修正）
- `migrations/seed-races-all.sql`: 上記修正後に再生成
- **根本原因**: Production deploy が commit `f462f2b` で止まっており、`c968458`（アンカーバー追加コミット）より前のコードが本番に配置されていた
- `npm run cf:deploy` を実行し commit `3b534af` を本番にデプロイ（deployment: `b820855f`）


## 2026-05-14 テスト追加: Issue #57〜#61

- `src/lib/__tests__/fixtures.ts`: `makeParticipationGift` ファクトリを追加
- `src/lib/__tests__/utils.filter.test.ts`: `filterRaces` の `giftCategories` フィルター（OR条件・複数gifts・除外）テストを追加（closes #57）
- `src/lib/__tests__/utils.format.test.ts`: `getCategoryLabel` / `getRaceName` / `getRaceCity` / `getRaceDescription` / `filterToSearchParams` / `searchParamsToFilter` のテストを追加（closes #58）
- `src/app/api/user/races/__tests__/route.test.ts`: `GET /api/user/races` の認証チェック・一覧取得テストを追加（closes #59）
- `src/app/api/user/races/[raceId]/__tests__/route.test.ts`: `GET/PATCH/DELETE /api/user/races/[raceId]` の upsert ロジック・parseIds・DELETE テストを追加（closes #59）
- `src/components/mypage/__tests__/UserRaceList.test.tsx`: セッション状態・データ表示・getCatLabel・raceMap フォールバックのテストを追加（closes #60）
- `src/components/races/__tests__/RaceBreadcrumb.test.tsx`: from props のバリアント・aria-label・router.back() のテストを追加（closes #61）

## 2026-05-16 FK修正・シード修正・新レース追加

### FK制約修正
- `migrations/0010_fix_course_highlights_fk.sql`: `race_course_highlights.category_id → race_categories.id` の FK を ON DELETE CASCADE に修正（`0007_yielding_obadiah_stane.sql` で ON DELETE 句が欠落していた schema.ts との不整合を解消）

### シード生成スクリプト修正 (`scripts/generate-seed-races.js`)
- 子テーブルの DELETE を `INSERT OR REPLACE INTO races` より**先に**実行するよう順序変更（race_course_highlights の NO ACTION FK によるカスケード削除エラーを回避）
- カテゴリレベルの `race_course_highlights` INSERT で `last_insert_rowid()` → サブクエリ `(SELECT id FROM race_categories WHERE race_id=... AND distance_type=... ORDER BY id DESC LIMIT 1)` に変更（複数ハイライト挿入時に `last_insert_rowid()` が上書きされ FK 違反になる問題を修正）

### 新レース追加
- `src/data/races/sapporo-marathon-2026.json`: 札幌マラソン 2026 を追加
- `src/data/races/tokyo-legacy-half-2026.json`: 東京レガシーハーフマラソン 2026 を追加（既存ファイル）
- `migrations/seed-races-all.sql`: 上記2件を含む 78 件分を再生成

### ドキュメント更新
- `docs/schema.md`: `race_course_highlights` テーブルに `category_id` カラムを追記、マイグレーション履歴に `0010` を追加
- `docs/er-diagram.drawio`: 全テーブル・全カラム・全FK関係を反映して全面再作成（旧版は多数のテーブル・カラムが欠落していた）

## 2026-05-16 パッケージマネージャーを npm → pnpm に移行

- `package-lock.json` を削除し `pnpm-lock.yaml` を生成（pnpm v11.1.2 / corepack 経由）
- `package.json`: `packageManager` フィールドに `pnpm@11.1.2` を追加
- `package.json`: `pnpm.onlyBuiltDependencies` で native addon のビルドスクリプトを許可（@parcel/watcher, @swc/core, better-sqlite3, esbuild, sharp, unrs-resolver, workerd）
- `package.json`: `db:series:local/remote` / `cf:build/preview/deploy` の `npm run` を `pnpm run` に変更
- `.npmrc` を新規作成（`shamefully-hoist=false`, `strict-peer-dependencies=false`）
- `CLAUDE.md`: 全コマンド例を `npm run` → `pnpm run` に更新

## 2026-05-24 大会情報の自動更新チェック機能を追加

### 管理ツール拡張
- `tools/admin/index.html`: 基本情報セクションに「情報取得URL」フィールドを追加（最大5件、ラベル付き）
- `tools/admin/app.js`: `renderInfoUrls` / `addInfoUrlRow` / `collectInfoUrls` を追加。`populateForm` と `buildRaceData` に統合
- `tools/admin-server.js`: `selectInfoSources()` を追加（`info_urls` 登録済みの場合は自動リンク探索より優先）。`fetchOfficialContent` に `infoUrls` 引数を追加し `/api/series-check` で読み込み

### 自動更新クローラー（新規）
- `tools/crawl/index.js`: チェックサムによる変更検知クローラー。`info_urls` 優先・`official_url` フォールバック。`--dry-run` オプション対応
- `tools/crawl/extractor.js`: `claude -p` を使って変更ページから大会情報を構造化抽出し race JSON を自動更新

### テスト
- `tools/admin-server.test.js`: `selectInfoSources` のユニットテスト5件を追加
- `tools/crawl/index.test.js`: `computeHash` / `hasChanged` / `buildUrlsToCheck` のユニットテスト13件
- `tools/crawl/extractor.test.js`: `buildExtractionPrompt` / `parseClaudeResponse` / `buildDiff` のユニットテスト17件

### CI・開発環境
- `.claude/settings.json`: PR作成前テスト自動実行フック（`PreToolUse` on Bash）を追加
- `tools/hooks/pre-pr.js`: `gh pr` コマンド検知 → vitest + node --test を実行してブロック
- `package.json`: `crawl` / `crawl:dry` / `test:tools` コマンドを追加
- `CLAUDE.md`: TDDルール（Red→Green順序・テストファイル置き場）を補強

### ドキュメント
- `README.md`: `tools/` ディレクトリ構成・クローラー使い方を更新

## 2026-06-07 管理ツール項目見直し (issue #73)

### バグ修正
- `tools/admin/app.js`: `bindEvents()` のセレクターを `.form-body` 内に限定し、サイドバー検索・データチェックフィルター操作で「未保存」ポップアップが誤表示される問題を修正

### 機能追加
- `tools/admin/index.html`: 「完走賞」セクションを「参加賞」の直後に追加
- `tools/admin/app.js`: `renderCompletionGifts` / `addCompletionGiftRow` / `collectCompletionGifts` を追加

### 機能削除
- `tools/admin/index.html`: 「コース」セクション（GPXファイル名フィールド）を削除（カテゴリ別GPXに統一）
- `tools/admin/app.js`: エントリー期間の「参加費（円）」フィールドを削除（カテゴリ別参加費に統一）

### データ移行
- `scripts/migrate-medal-gifts.js`: メダル移行スクリプトを追加
- `src/data/races/*.json`: 51件の `participation_gifts` からメダルを `completion_gifts` に移行
- `migrations/seed-races-all.sql`: 移行後のJSONから再生成

### 完走賞フルスタック対応（CodeRabbit対応）
- `src/lib/types.ts`: `CompletionGift` 型エイリアス追加、`Race` に `completion_gifts` フィールド追加
- `src/lib/db/schema.ts`: `completion_gifts` テーブル追加（`participation_gifts` と同構造）
- `migrations/0009_shallow_captain_stacy.sql`: `completion_gifts` テーブルのマイグレーション生成・適用
- `src/lib/data.ts`: 全クエリ関数に `completion_gifts` 取得・組み立てを追加
- `src/lib/utils.ts`: `filterRaces()` の `giftCategories` フィルタを `completion_gifts` も含めて検索するよう修正
- `src/app/[locale]/races/[id]/page.tsx`: 「参加賞・完走賞」セクションに `completion_gifts` 表示を追加
- `scripts/generate-seed-races.js`: `completion_gifts` のSQL生成を追加
- `migrations/seed-races-all.sql`: `completion_gifts` データを含めて再生成・ローカルDB適用
- `docs/schema.md`: `completion_gifts` テーブル定義・マイグレーション履歴を追記
- `scripts/migrate-medal-gifts.js`: `image: null` → `gift.image ?? null` バグ修正（CodeRabbit指摘）
- `src/lib/__tests__/fixtures.ts`: `makeCompletionGift` ファクトリ追加、`makeRace` に `completion_gifts: []` 追加
- `src/lib/__tests__/utils.filter.test.ts`: `completion_gifts` を含む `giftCategories` フィルタのテスト追加

## 2026-06-09 クロールツール拡張と自動クロール結果反映（PR #75）

### クロールツール拡張
- `tools/crawl/extractor.js`: `DIFF_FIELDS` を5フィールドから15フィールドに拡張（course_info, entry_periods, participation_gifts, completion_gifts, nearby_spots, motif/tagline等）
- `tools/crawl/extractor.js`: `buildDiff` を object/array 型対応（JSON.stringify比較）
- `tools/crawl/extractor.js`: `buildExtractionPrompt` に構造データの現在値・出力スキーマ例を追加
- `tools/crawl/index.js`: 複合フィールドのログ出力を件数表示に改善
- `tools/crawl/extractor.test.js`: 複合フィールド対応のテストを追加（計29テスト）

### 2026-06-08 自動クロール結果反映（12レース更新）
- `src/data/races/fujisan-marathon-2026.json`: entry_periods追加（5種）、completion_gifts修正
- `src/data/races/fukuchiyama-marathon-2026.json`: entry_periods更新
- `src/data/races/fukuoka-marathon-2026.json`: entry_periods更新
- `src/data/races/aomori-sakura-marathon-2026.json`: certification, completion_gifts更新
- `src/data/races/iwate-morioka-city-marathon-2026.json`: certification, course_info更新
- `src/data/races/mito-komon-manyu-marathon-2026.json`: certification更新
- `src/data/races/naha-marathon-2026.json`: certification, completion_gifts更新
- `src/data/races/nara-marathon-2026.json`: entry_periods, completion_gifts更新
- `src/data/races/osaka-yodo-river-citizens-marathon-2026.json`: certification更新
- `src/data/races/sapporo-marathon-2026.json`: entry_periods, certification更新
- `src/data/races/shonan-international-marathon-2026.json`: entry_periods更新
- `src/data/races/toyama-marathon-2026.json`: certification更新
- `tools/crawl/checksums.json`: チェックサム更新

### CodeRabbitレビュー対応
- `src/data/races/aomori-sakura-marathon-2026.json`, `iwate-morioka-city-marathon-2026.json`, `mito-komon-manyu-marathon-2026.json`: certification を `"jaaf"` → `"JAAF"` に大文字統一
- `src/data/races/shonan-international-marathon-2026.json`: entry_periods label_en `"General Entry"` → `"First Round Entry"`（一次募集の正確な翻訳）
- `migrations/seed-races-all.sql`: 上記修正を反映して再生成

## 2026-06-12 race_entry_periods.end_date を NULL 許容に変更

- `src/lib/db/schema.ts`: `race_entry_periods.end_date` から `.notNull()` を削除（終了日未定のエントリー期間を許容）
- `migrations/0010_loving_mister_fear.sql`: テーブル再作成によるマイグレーション生成
- `docs/schema.md`: マイグレーション履歴に追記
- ローカル・リモートDBへのマイグレーション適用・シード再適用完了


## 2026-07-06 クロール処理拡張・データ品質lint・GitHub Actions定期実行（Issue #81）

- `scripts/validate-races.js`: データ品質チェック（6ルール: label空文字禁止・certification大文字統一・start_date null禁止・entry_start_date整合・reception矛盾検知・座標日本国内チェック）
- `scripts/validate-races.test.js`: 32テスト
- `scripts/geocode-venues.js`: 国土地理院 API で venue_address → 座標取得（prefecture bounding box 検証付き・冪等設計）
- `scripts/geocode-venues.test.js`: 18テスト
- `tools/crawl/extractor.js`: DIFF_FIELDS に venue_name_ja/en / venue_address / access_points / reception_type / reception_note_ja/en を追加。callClaudeP を async + Messages API フォールバック対応
- `tools/crawl/extractor.test.js`: 新フィールド・API フォールバックの 17テスト追加（計 67件）
- `tools/crawl/index.js`: discoverInfoLinks() 追加（アクセス・受付ページリンクの自動発見）。--no-cli フラグ対応
- `tools/crawl/index.test.js`: discoverInfoLinks の 10テスト追加（計 29件）
- `.github/workflows/crawl.yml`: 週次 cron + workflow_dispatch → crawl → geocode → validate → 差分PR自動作成
- `package.json`: validate:races / geocode:venues / geocode:venues:dry スクリプト追加
- 既存17ファイルのデータ品質修正（entry_periods label空文字・certification小文字・entry_start_date不整合）

## 2026-07-06 装備管理テーブル追加（Issue #120）

- `src/lib/db/schema.ts`: `user_gear` / `user_race_gear` / `user_race_results` テーブルを追加。`user_races` に `gear_is_public` カラムを追加。各テーブルの Relations を追加
- `migrations/0013_old_rick_jones.sql`: Drizzle生成マイグレーション。ローカルD1に適用済み
- `src/lib/types.ts`: `GEAR_CATEGORIES`（12種）/ `GEAR_USAGE_TAGS`（3値）/ `RACE_RESULT_STATUSES`（3値）定数と `UserGear` / `UserRaceGear` / `UserRaceResult` 型を追加
- `src/lib/__tests__/gear-types.test.ts`: 型・定数のユニットテスト9件（全Pass）
- `docs/schema.md`: 新テーブル定義・マイグレーション履歴・インデックス一覧を更新

## 2026-07-05 会場・アクセスデータ基盤の整備（Issue #80）

- `src/lib/db/schema.ts`: `races` に `venue_name_ja` / `venue_name_en` / `venue_address` / `start_lat` / `start_lng` を追加。`access_points` に `walk_minutes` / `is_primary` を追加
- `migrations/0011_parallel_winter_soldier.sql`: Drizzle生成マイグレーション。ローカルD1に適用済み
- `src/lib/types.ts`: `Race` / `AccessPoint` 型に新フィールドを追加
- `src/lib/__tests__/fixtures.ts`: `makeRace` / `makeAccessPoint` に新フィールドを追加
- `src/lib/data.ts`: `rowToRace` / `rowToAccessPoint` に新フィールドを追加
- `scripts/add-venue-fields.js`: 全89 JSONに新フィールド（null）を一括追加するスクリプトを新規作成・実行済み
- `scripts/generate-seed-races.js`: races INSERT と access_points INSERT に新カラムを追加
- `migrations/seed-races-all.sql`: シード再生成済み。ローカルD1に適用済み
- `tools/admin-server.js`: `getMissingFields` に venue_address / start_coords / access_point_primary のチェックを追加。新規レーステンプレートに venue フィールドを追加
- `tools/admin-server.test.js`: 会場住所・座標・代表最寄駅チェックのテストを追加（53テスト全Pass）
- `docs/schema.md`: races / access_points テーブル定義とマイグレーション履歴を更新


## 2026-07-07 Issue #85 コア実装（reception_sessions + reception.ts ヘルパー）

- `src/lib/types.ts`: `ReceptionSession` 型を追加。`Race` に `reception_sessions: ReceptionSession[]` を追加
- `src/lib/reception.ts`: 新設。`canReceiveOnRaceDay` / `getRaceDayReceptionClose` / `getArrivalDeadline` ヘルパーを実装
- `src/lib/__tests__/reception.test.ts`: 新設。5系統17テスト全Pass
- `src/lib/__tests__/fixtures.ts`: `makeReceptionSession` ファクトリを追加。`makeRace` に `reception_sessions: []` を追加
- `src/lib/db/schema.ts`: `reception_sessions` テーブルを追加。`racesRelations` に `reception_sessions` を追加
- `migrations/0014_lowly_mentallo.sql`: 生成済み。ローカルD1に適用済み
- `src/lib/data.ts`: `rowToReceptionSession` 追加。`assembleRace` / `getRaces` / `getRaceById` で reception_sessions を取得
- `scripts/generate-seed-races.js`: reception_sessions の DELETE / INSERT を追加
- `migrations/seed-races-all.sql`: シード再生成済み。ローカルD1に適用済み
- `docs/schema.md`: reception_sessions テーブル定義・インデックス・マイグレーション履歴を追記

## 2026-07-08 日帰り検索UIを削除（データ層は保持）

APIの調査中にGoogle Routes API v2がTRANSITモードで日本に非対応であることが判明。
代替API選定まで日帰り検索機能（UI）を一時削除。travel_timesデータ層・scriptsは保持。

- `src/lib/types.ts`: `RaceFilter.dayTrip` フィールドを削除
- `src/lib/utils.ts`: `filterRaces` の `travelSettings` パラメータ・dayTripロジック削除。`defaultFilter`/`emptyFilter`/`isDefaultFilter`/`isFilterEmpty` から dayTrip 削除。URLパラメータ `daytrip` 削除。`TravelSettings`/`calcDayTripStatus` import 削除
- `src/components/races/RaceFilter.tsx`: `travelSettings` prop・日帰りトグルセクションを削除
- `src/components/races/RaceList.tsx`: `useTravelSettings` hook・travelSettings 関連を削除
- `src/components/races/RaceCard.tsx`: `travelSettings` prop・dayTripStatusバッジを削除
- `src/components/races/RaceCardExp.tsx`: 同上
- `src/app/[locale]/mypage/page.tsx`: 日帰り判定設定セクション・関連importを削除
- `src/lib/hooks/useTravelSettings.ts`: 削除（不要になったため）
- `src/lib/__tests__/utils.filter.test.ts`: dayTripフィルタテスト・関連importを削除
- `src/lib/__tests__/utils.filter-state.test.ts`: dayTrip関連テストを削除

## 2026-07-10 PR #129 CodeRabbitレビュー対応（reception_sessions）

- `src/lib/reception.ts`: `fromMinutes` の負値バグ修正（深夜スタート大会で `-1:-10` が返る問題）→ 24時間正規化。`findRaceDaySession` ヘルパー抽出（重複ロジック解消）
- `src/lib/data.ts`: `rowToReceptionSession` の冗長な `?? null` を削除
- `src/lib/db/schema.ts`: `reception_sessions` に `(race_id, date)` UNIQUE インデックスを追加
- `src/lib/__tests__/reception.test.ts`: 負値ケース（00:20スタート → 23:50）テストを追加（計22テスト）
- `migrations/0016_silky_shaman.sql`: UNIQUE インデックス作成マイグレーション（`IF NOT EXISTS` でローカルDB二重適用を回避）
- `docs/schema.md`: 0015_puzzling_wasp（race_travel_times）・0016_silky_shaman のマイグレーション履歴を追記

## 2026-07-11 テスト容易性リファクタリング（Issue #88）

- `src/lib/data-mappers.ts` 新設：`parseJson` / `toSeriesId` / `rowTo*` 15種 / `assembleRace` を DB 非依存純粋関数として分離。単体テスト可能に
- `assembleRace` の引数を 16 個の位置引数 → `RaceRelatedRows` オブジェクトに変更（型安全性・可読性向上）
- `src/lib/data.ts`：クエリ発行 + data-mappers 呼び出しのみに縮小
- `src/lib/utils/` ディレクトリ分割（`date.ts` / `format.ts` / `race.ts` / `filter.ts`）。`utils.ts` はバレル re-export（既存 import パス無変更）
- `src/lib/__tests__/data-mappers.test.ts`：特性化テスト 29 件追加（計 408 テスト全通過）

## 2026-07-11 セキュリティ強化（Issue #86）

- 依存パッケージ更新: next 16.1.6→16.2.10、drizzle-orm 0.44.7→0.45.2、better-auth 1.6.2→1.6.23、@opennextjs/cloudflare 1.7.0→1.20.1
- `src/proxy.ts`：`middleware.ts` → `proxy.ts` に改名（Next.js 16.2 廃止対応）
- `src/lib/auth.ts`：本番環境で BETTER_AUTH_SECRET 未設定時に即時 throw（fail-hard）
- `public/_headers`：Cloudflare Pages セキュリティヘッダー追加（HSTS、X-Frame-Options、CSP-Report-Only 等）
- `src/lib/contact-actions.ts`：スパム対策3層（honeypot・送信時間チェック・IP レート制限）追加。x-forwarded-for をカンマ区切りパースして最初のIPのみ使用
- `src/components/contact/ContactForm.tsx`：honeypot フィールドと form_loaded_at 追加
- `src/lib/db/schema.ts`：contact_submissions に ip_address・user_agent カラムとインデックスを追加
- `migrations/0017_perfect_boomer.sql`：ip_address・user_agent・インデックスのマイグレーション
- `src/app/[locale]/races/[id]/page.tsx`：JSON-LD の `<` を `\u003c` にエスケープ（XSS 対策）
- `tools/admin-server.js`：アップロード ID 正規化・拡張子許可リスト・パストラバーサル検証追加
- `.github/workflows/test.yml`：SHA ピン留め・permissions: contents: read・persist-credentials: false・セキュリティ監査ステップ追加
- `wrangler` を dependencies → devDependencies に移動（CLIツールのため）

## 2026-07-12 テストカバレッジ拡充（Issue #87）

- `src/app/api/races/index/__tests__/route.test.ts`：GET /api/races/index のユニットテスト5件追加
- `src/app/__tests__/sitemap.test.ts`：sitemap() のユニットテスト7件追加（静的ページ・レースURL・priority・alternates 検証）
- `vitest.config.ts`：coverage.include を `src/lib/**/*.ts` / `src/app/**/*.{ts,tsx}` に拡張
- `src/test-setup.ts`：window.open スタブ追加（jsdom 環境の警告抑制）

## 2026-07-13 マイギアCRUD API実装（Issue #122）

- `src/lib/gear-validation.ts`：validateCreateBody / validateUpdateBody を実装（バリデーション純関数）
  - category（GEAR_CATEGORIES）・name（1〜200文字）・brand（max 200）・memo（max 1000）・usage_tag（GEAR_USAGE_TAGS）のバリデーション
  - amazon_url 指定時は extractAsin でASIN抽出、非AmazonドメインやASIN不正は400
- `src/app/api/user/gear/route.ts`：GET（一覧・?categoryフィルタ）/ POST（登録・201）
- `src/app/api/user/gear/[gearId]/route.ts`：PATCH（部分更新）/ DELETE（物理削除・FK cascade）
  - 他人のギアは存在を秘匿（404）
- `src/lib/__tests__/gear-validation.test.ts`：バリデーション関数の単体テスト 47件
- `src/app/api/user/gear/__tests__/route.test.ts`：GET/POST APIテスト
- `src/app/api/user/gear/[gearId]/__tests__/route.test.ts`：PATCH/DELETE APIテスト
- 全体テスト 550件パス

## 2026-07-13 マイギア管理UIの実装（Issue #123）

- `src/messages/ja.json` / `en.json`：`gear` 名前空間を追加（カテゴリ・用途タグ・フォーム文言・削除確認文言など35キー）
- `src/components/mypage/GearList.tsx`：マイギア管理 Client Component を新規作成
  - カテゴリ別グルーピング表示
  - 用途タグバッジ（レース用/練習用/兼用）
  - Amazonリンク（buildAmazonUrl 経由、rel="sponsored noopener noreferrer"）
  - 引退ギアはデフォルト非表示、トグルで展開
  - 追加・編集フォーム（インラインモーダル）
  - 引退/復帰トグル（即時PATCH）
  - 削除確認ダイアログ（過去レース記録削除の旨を警告）
- `src/app/[locale]/mypage/page.tsx`：マイギアセクションを追加（ログイン時のみ）
- `src/components/mypage/__tests__/GearList.test.tsx`：コンポーネントテスト18件追加
- 全体テスト568件パス
