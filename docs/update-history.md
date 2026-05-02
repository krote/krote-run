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
