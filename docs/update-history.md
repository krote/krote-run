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
