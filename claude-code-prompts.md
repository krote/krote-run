# マラソンポータルサイト — Claude Code 開発プロンプト集

## 概要

このドキュメントは、マラソンポータルサイトをClaude Codeで段階的に構築するためのプロンプト集です。
各プロンプトは依存関係を考慮した順序で並べており、上から順に実行することで動作するサイトが完成します。

**前提条件**
- Node.js 20以上がインストール済み
- GitHubリポジトリ（`krote-run`）を作成済み
- 要件定義書（`krote-run-requirements.md`）を参照可能な状態

---

## Phase 0: プロジェクト初期セットアップ

### Prompt 0-1: プロジェクト作成

```
マラソンポータルサイトのNext.jsプロジェクトを作成してください。

技術スタック:
- Next.js (App Router) + TypeScript
- Tailwind CSS
- next-intl（多言語対応: 日本語・英語）
- Leaflet + react-leaflet（地図表示）
- Recharts（グラフ描画）

プロジェクト名: krote-run

以下の初期セットアップを行ってください:
1. `npx create-next-app@latest krote-run` でプロジェクト作成（TypeScript, Tailwind CSS, App Router, src/ディレクトリ使用）
2. 必要なパッケージのインストール（next-intl, leaflet, react-leaflet, recharts, @types/leaflet）
3. next-intlの基本設定（日本語デフォルト、英語対応。/ja/... と /en/... のルーティング）
4. Tailwind CSSのカスタムテーマ設定（後述のデザイントークン）
5. .gitignore, README.md の整備

デザイントークン（tailwind.config.ts に追加）:
- プライマリカラー: #2563eb（青系）
- アクセントカラー: #dc2626（赤系）
- フォント: Noto Sans JP（日本語）, Inter（英語）をGoogle Fontsから読み込み

ディレクトリ構成:
```
src/
├── app/
│   └── [locale]/
│       ├── layout.tsx
│       ├── page.tsx
│       ├── races/
│       │   ├── page.tsx（大会一覧）
│       │   └── [id]/
│       │       └── page.tsx（大会詳細）
│       ├── calendar/
│       │   └── page.tsx
│       └── settings/
│           └── page.tsx
├── components/
│   ├── layout/（Header, Footer）
│   ├── races/（RaceCard, RaceFilter, RaceList）
│   ├── course/（CourseMap, ElevationChart）
│   ├── access/（AccessChecker）
│   └── ui/（共通UIコンポーネント）
├── lib/
│   ├── data.ts（JSONデータ読み込み）
│   ├── types.ts（TypeScript型定義）
│   └── utils.ts
├── messages/
│   ├── ja.json
│   └── en.json
└── data/
    ├── races/（大会JSONファイル）
    ├── gpx/（GPXファイル）
    ├── course-profiles/（ビルド時生成）
    ├── gift-categories.json
    └── prefectures.json
```
```

### Prompt 0-2: TypeScript型定義

```
krote-run プロジェクトの TypeScript 型定義を作成してください。
ファイルパス: src/lib/types.ts

以下のデータモデルに基づいて型を定義してください。

Race（大会）:
- id: string
- name_ja, name_en: string
- date: string (ISO format)
- prefecture: string（都道府県コード）
- city_ja, city_en: string
- description_ja, description_en: string
- official_url: string
- entry_fee: number | null（全カテゴリ共通の場合。カテゴリ別はnull）
- entry_fee_by_category: boolean
- entry_capacity: number
- entry_start_date, entry_end_date: string
- reception_type: 'pre_day' | 'race_day' | 'both' | 'pre_mail' | 'none'
- reception_note_ja, reception_note_en: string
- tags: string[]
- course_gpx_file: string | null
- course_info: CourseInfo
- categories: RaceCategory[]
- aid_stations: AidStation[]
- checkpoints: Checkpoint[]
- access_points: AccessPoint[]
- nearby_spots: NearbySpot[]
- weather_history: WeatherHistory[]
- participation_gifts: ParticipationGift[]
- created_at, updated_at: string

RaceCategory:
- distance_type: 'full' | 'half' | '10k' | '5k' | 'ultra' | 'other'
- distance_km: number
- time_limit_minutes: number
- start_time: string
- capacity: number
- entry_fee: number | null
- entry_fee_u25: number | null
- name_ja, name_en: string | null
- description_ja, description_en: string | null
- waves: Wave[] | null

Wave:
- wave: string
- start_time: string
- end_time: string

CourseInfo:
- max_elevation_m, min_elevation_m, elevation_diff_m: number
- surface: 'road' | 'trail' | 'mixed'
- certification: string[]
- highlights_ja, highlights_en: string
- notes_ja, notes_en: string | null

AidStation:
- distance_km: number
- offerings_ja, offerings_en: string
- is_featured: boolean

Checkpoint:
- distance_km: number
- closing_time: string

AccessPoint:
- station_name_ja, station_name_en: string
- station_code: string
- transport_to_venue_ja, transport_to_venue_en: string
- latitude, longitude: number

NearbySpot:
- type: '観光地' | '温泉' | 'グルメ' | '宿泊'
- name_ja, name_en: string
- description_ja, description_en: string
- distance_from_venue: string
- url: string | null
- latitude, longitude: number

WeatherHistory:
- year: number
- avg_temp, max_temp, min_temp: number
- humidity_pct: number
- precipitation_mm: number
- wind_speed_ms: number

ParticipationGift:
- gift_categories: GiftCategoryId[]
- description_ja, description_en: string
- image: string | null

GiftCategoryId: 'medal' | 'tshirt' | 'towel' | 'local_product' | 'food' | 'goods' | 'coupon' | 'other'

GiftCategory:
- id: GiftCategoryId
- name_ja, name_en: string
- icon: string

CourseProfile（ビルド時自動生成）:
- race_id: string
- distance_km: number
- total_elevation_gain_m, total_elevation_loss_m: number
- points: CoursePoint[]

CoursePoint:
- lat, lng, ele: number
- dist_km: number

UserSetting（localStorage用）:
- home_station_name: string
- home_station_code: string
- preferred_language: 'ja' | 'en'
- favorite_race_ids: string[]

検索フィルタの型も定義してください:
RaceFilter:
- month: number | null
- prefecture: string | null
- distanceType: string | null
- giftCategory: GiftCategoryId | null
- timeLimitMin: number | null
- tags: string[]
- searchText: string
```

---

## Phase 1: データ層とマスタデータ

### Prompt 1-1: マスタデータ作成

```
以下のマスタデータJSONファイルを作成してください。

1. src/data/gift-categories.json
参加賞カテゴリのマスタデータ。以下の8カテゴリ:
- medal: メダル/Finisher Medal, アイコン🏅
- tshirt: Tシャツ/T-Shirt, アイコン👕
- towel: タオル/Towel, アイコン🧣
- local_product: 物産品/Local Product, アイコン🎁
- food: 食品/Food, アイコン🍙
- goods: グッズ/Goods, アイコン🎒
- coupon: クーポン/Coupon, アイコン🎫
- other: その他/Other, アイコン📦

2. src/data/prefectures.json
47都道府県のマスタデータ。各項目:
- code: "01"〜"47"
- name_ja: "北海道"〜"沖縄県"
- name_en: "Hokkaido"〜"Okinawa"
- region_ja: "北海道", "東北", "関東", "中部", "近畿", "中国", "四国", "九州・沖縄"
- region_en: 対応する英語名
```

### Prompt 1-2: サンプル大会データ配置

```
以下の2つのサンプル大会データJSONファイルを src/data/races/ に配置してください。

（ここに nagano-marathon-2026.json と challenge-fuji5lakes-2026.json の内容を貼り付け）

また、src/lib/data.ts にデータ読み込みユーティリティを実装してください:
- getAllRaces(): Race[] — 全大会データをJSONから読み込み、日付順にソート
- getRaceById(id: string): Race | null — ID指定で1大会取得
- getGiftCategories(): GiftCategory[] — 参加賞カテゴリマスタ取得
- getPrefectures(): Prefecture[] — 都道府県マスタ取得
- filterRaces(races: Race[], filter: RaceFilter): Race[] — フィルタリング関数

Next.jsのSSGでビルド時にJSONを読み込む想定です。fsモジュールでファイルを読み込んでください。
```

---

## Phase 2: レイアウトと共通コンポーネント

### Prompt 2-1: レイアウト・ヘッダー・フッター

```
サイト全体のレイアウトを実装してください。

src/app/[locale]/layout.tsx:
- next-intlのプロバイダー設定
- Google Fonts読み込み（Noto Sans JP + 英語用フォント）
- メタデータ設定（OGP含む）

src/components/layout/Header.tsx:
- ロゴ: 「RaceMap.jp」（仮称。🏃アイコン付き）
- ナビゲーション: 大会を探す, カレンダー
- 言語切替: JA / EN
- 最寄り駅設定ボタン
- レスポンシブ対応（モバイルはハンバーガーメニュー）
- 背景白、ボーダーボトム、スクロール時にshadow付与

src/components/layout/Footer.tsx:
- サイト概要
- リンク: About, プライバシーポリシー
- 言語切替
- コピーライト

デザイントーン:
- じゃらん・一休のような旅行体験サイトの雰囲気
- クリーンで余白を大切にしたデザイン
- ヘッダーは白背景、フッターはダークグレー
```

### Prompt 2-2: トップページ（ヒーローセクション + 大会一覧導線）

```
トップページ src/app/[locale]/page.tsx を実装してください。

構成:
1. ヒーローセクション
   - グラデーション背景（青〜藍）
   - キャッチコピー:「あなたの次のレースを見つけよう」
   - サブコピー:「全国のマラソン大会から、コース・参加賞・アクセスまで徹底比較」
   - 検索バー（テキスト入力 + 検索ボタン。白背景、角丸、シャドウ）
   - 検索実行で /races?q=xxx にリダイレクト

2. 注目の大会セクション（横スクロールのカードカルーセル）
   - サンプルデータから3件表示
   - RaceCardコンポーネント（次のPromptで作成）を使用

3. 特徴セクション
   - 3カラムで特徴を紹介:
     - 「コースを比較」高低差チャートで大会のコースを一目で比較
     - 「当日アクセス判定」最寄り駅からスタートに間に合うか即座にチェック
     - 「参加賞で選ぶ」メダル、タオル、ご当地品...参加賞から大会を探せる

next-intlで日本語/英語を切り替えられるようにしてください。
```

---

## Phase 3: 大会一覧ページ

### Prompt 3-1: 大会カードコンポーネント

```
大会カードコンポーネント src/components/races/RaceCard.tsx を実装してください。

Props: { race: Race, locale: 'ja' | 'en' }

カードのデザイン:
- 角丸2xl、白背景、ボーダー、ホバーでシャドウ拡大＋少し浮き上がる
- 上部: ヒーロー画像エリア（h-48）
  - 大会ごとのテーマカラーでグラデーション背景（将来的に写真に置換）
  - 背景に高低差のシルエットをSVGで薄く描画
  - 左上: 日付バッジ（白背景、月＋日を大きく表示）
  - 右上: 距離バッジ（半透明白背景、「フル 42.195km」など）
  - 下部: グラデーションオーバーレイの上に大会名＋開催地
- 下部: 情報エリア（p-5）
  - タグ（pill型、グレー背景）
  - 3カラム: 制限時間 / 高低差 / 気温目安
  - 下部: 参加賞アイコン一覧（左）+ 参加費（右）

クリックで /races/[id] に遷移。
Next.jsのLinkコンポーネントを使用。
```

### Prompt 3-2: フィルタコンポーネント

```
大会フィルタコンポーネント src/components/races/RaceFilter.tsx を実装してください。

Props: { filter: RaceFilter, onFilterChange: (filter: RaceFilter) => void }

フィルタ項目:
1. テキスト検索（大会名、エリア）
2. 距離フィルタ（pill型ボタン: すべて / フル / ハーフ / 10K / ウルトラ）
3. 参加賞カテゴリフィルタ（pill型ボタン: すべて / 🏅メダル / 👕Tシャツ / 🧣タオル / 🎁物産品 / 🍙食品）
4. エリアフィルタ（ドロップダウン: 地方 → 都道府県）
5. 開催月フィルタ（1月〜12月のボタン群）
6. 制限時間フィルタ（スライダー or ドロップダウン: 5時間以上 / 6時間以上 / 7時間以上）

デザイン:
- 選択中のフィルタはプライマリカラー（青）のpill
- 未選択はグレーボーダーの白pill
- コンパクトに配置、モバイルではアコーディオン展開
```

### Prompt 3-3: 大会一覧ページ

```
大会一覧ページ src/app/[locale]/races/page.tsx を実装してください。

このページはSSGで生成し、フィルタリングはクライアントサイドで行います。

構成:
1. RaceFilterコンポーネント（上部）
2. 結果件数表示 + ソート選択（開催日順 / 人気順 / 参加費安い順）
3. RaceCardのグリッド表示
   - PC: 3カラム
   - タブレット: 2カラム
   - モバイル: 1カラム

データ取得:
- generateStaticParams は不要（一覧ページは1つ）
- ビルド時にgetAllRaces()で全データ取得
- クライアントサイドでuseStateのフィルタ状態に基づきfilterRaces()で絞り込み

URLクエリパラメータとフィルタ状態を同期:
- ?q=長野&distance=full&gift=medal のようなURLでフィルタを共有可能に
- useSearchParamsで読み取り、フィルタ変更時にURLを更新
```

---

## Phase 4: 大会詳細ページ

### Prompt 4-1: 大会詳細ページ（基本構成）

```
大会詳細ページ src/app/[locale]/races/[id]/page.tsx を実装してください。

SSGで各大会の静的ページを生成:
- generateStaticParams: getAllRaces()のIDリストを返す
- generateMetadata: 大会名でOGP生成

ページ構成:

1. ヒーローセクション（h-80）
   - 大会テーマカラーのグラデーション（将来的に写真）
   - 戻るボタン（← 一覧に戻る）
   - 距離バッジ + 開催日
   - 大会名（h1、白、大きめ）
   - 英語名 + 開催地

2. クイックスタッツバー（白背景、sticky不要）
   - 制限時間 / 定員 / 参加費 / 高低差
   - お気に入りボタン（♡）

3. タブナビゲーション（sticky top-0, 白背景）
   タブ: コース / エイド / 参加賞 / アクセス / 気象 / 周辺スポット

4. タブコンテンツエリア（max-w-4xl mx-auto）
   各タブの中身は次のPromptで個別に実装

タブの切り替えはクライアントサイドのuseState。
URLのハッシュ (#course, #aid 等) とタブ状態を同期。
```

### Prompt 4-2: コースタブ（地図 + 高低差チャート）

```
コースタブのコンポーネントを実装してください。

src/components/course/CourseMap.tsx:
- react-leafletを使用
- OpenStreetMapのタイルを表示
- 将来的にGPXのポリラインを描画する想定（現時点はスタート/ゴール地点のマーカーのみ）
- SSRを無効にする（dynamic importでssr: false）

src/components/course/ElevationChart.tsx:
- Rechartsを使用
- AreaChartで高低差プロフィールを描画
- 横軸: 距離(km)、縦軸: 標高(m)
- マウスホバーでツールチップ（距離、標高を表示）
- 大会のテーマカラーでグラデーション塗りつぶし
- 将来的にCourseProfileデータから描画する想定（現時点はcourse_infoの高低差からモックデータ生成）

コースタブの構成:
1. コースマップ（CourseMap、h-64）
2. 高低差チャート（ElevationChart、h-32）
3. コースの特徴テキスト（course_info.highlights_ja/en）
4. 注意事項（course_info.notes_ja/en がある場合）
5. 公認情報（course_info.certification）
```

### Prompt 4-3: エイドステーションタブ

```
エイドステーションタブのコンポーネントを実装してください。

src/components/races/AidStationList.tsx:
Props: { aidStations: AidStation[], totalDistanceKm: number, themeColor: string, locale: 'ja' | 'en' }

デザイン:
- 各エイドを距離順にリスト表示
- 左: 距離表示（XXkm、太字）
- 中央: 距離に応じたプログレスバー（テーマカラー）
- 右: 提供内容テキスト
- is_featured=true のエイドは★マーク付きでハイライト（特徴的なご当地エイド）
- 関門情報（checkpoints）も距離と照合して⏰アイコンで表示
```

### Prompt 4-4: 参加賞タブ

```
参加賞タブのコンポーネントを実装してください。

src/components/races/ParticipationGiftDisplay.tsx:
Props: { gifts: ParticipationGift[], locale: 'ja' | 'en' }

デザイン:
- gift_categoriesをアイコン付きカードでグリッド表示（3カラム）
- 各カード: アイコン（大きめ）+ カテゴリ名
- 下部に説明テキスト（description_ja/en）
- 画像がある場合は表示
```

### Prompt 4-5: アクセスタブ（当日到着チェッカー）

```
アクセスタブのコンポーネントを実装してください。

src/components/access/AccessChecker.tsx:
Props: { accessPoints: AccessPoint[], raceDate: string, startTime: string, locale: 'ja' | 'en' }

機能:
- 最寄り駅の入力フィールド
- 「チェック」ボタン
- 結果表示エリア（間に合う/間に合わない、出発時刻、到着時刻、所要時間、乗換回数）

※初期実装では経路検索APIは接続せず、モックレスポンスを返す。
将来的にNAVITIME API等と接続する想定で、インターフェースを設計:
- src/lib/route-search.ts に searchRoute(from: string, to: string, arriveBy: string): Promise<RouteResult> の型定義とモック実装を用意

localStorageから最寄り駅を読み込み、入力フィールドに初期値として設定。
「この駅を保存」ボタンでlocalStorageに保存。

src/components/access/AccessPointList.tsx:
- 各アクセスポイントをリスト表示（🚃/🚶アイコン + 駅名 + 会場への行き方）
```

### Prompt 4-6: 気象データタブ

```
気象データタブのコンポーネントを実装してください。

src/components/races/WeatherHistoryChart.tsx:
Props: { weatherHistory: WeatherHistory[], locale: 'ja' | 'en' }

デザイン:
- 過去の年ごとに横1行で表示
- 左: 年（太字、グレー）
- 中央: 最低気温〜最高気温をバーチャート（青→赤のグラデーション）で可視化
- 右: 最低気温、最高気温、降水量をテキスト表示
- 下部に「出典：気象庁」表記

Rechartsを使ったグラフ表示（BarChart or カスタム）も検討。
シンプルで見やすいことを優先。
```

### Prompt 4-7: 周辺スポットタブ

```
周辺スポットタブのコンポーネントを実装してください。

src/components/races/NearbySpotList.tsx:
Props: { spots: NearbySpot[], locale: 'ja' | 'en' }

デザイン:
- スポットタイプ別の色分けカード:
  - 観光地: アンバー系（bg-amber-50, border-amber-200）
  - 温泉: ローズ系（bg-rose-50, border-rose-200）
  - グルメ: オレンジ系（bg-orange-50, border-orange-200）
  - 宿泊: ブルー系（bg-blue-50, border-blue-200）
- 各カード: アイコン + タイプラベル + スポット名 + 説明 + 会場からの距離
- 2カラムグリッド（モバイルは1カラム）
- 将来的に地図上にもプロットする想定（Leafletマーカー）
```

---

## Phase 5: 多言語対応

### Prompt 5-1: 翻訳ファイルとi18n対応

```
多言語対応を完成させてください。

src/messages/ja.json と src/messages/en.json に以下のキーを定義:

common:
  site_name, search, filter, back_to_list, favorite, settings

home:
  hero_title, hero_subtitle, search_placeholder, featured_races,
  feature_course_title, feature_course_desc,
  feature_access_title, feature_access_desc,
  feature_gift_title, feature_gift_desc

races:
  page_title, results_count, sort_by, sort_date, sort_popular, sort_price,
  distance_all, distance_full, distance_half, distance_10k, distance_ultra,
  gift_all,
  time_limit, elevation_diff, temperature, entry_fee, capacity

detail:
  tab_course, tab_aid, tab_gift, tab_access, tab_weather, tab_spots,
  course_profile, course_features, course_notes, certification,
  aid_stations, featured_aid,
  gifts,
  access_checker_title, access_checker_desc, access_checker_placeholder,
  access_checker_button, access_ok, access_ng, departure, arrival, duration,
  save_station,
  weather_title, weather_source,
  spots_title

filters:
  area_all, month_filter, time_limit_filter

各コンポーネントで useTranslations() を使って文言を取得するようにリファクタリングしてください。
大会データ自体の多言語対応は、locale に応じて name_ja/name_en を切り替える
ヘルパー関数 getLocalizedField(obj, field, locale) を src/lib/utils.ts に実装してください。
```

---

## Phase 6: ユーザー設定とlocalStorage

### Prompt 6-1: ユーザー設定（最寄り駅・お気に入り）

```
ユーザー設定のlocalStorage管理を実装してください。

src/lib/user-settings.ts:
- getUserSettings(): UserSetting — localStorageから設定を読み込み
- saveHomeStation(name: string, code: string): void — 最寄り駅を保存
- toggleFavoriteRace(raceId: string): void — お気に入りをトグル
- isFavoriteRace(raceId: string): boolean — お気に入り判定
- setPreferredLanguage(lang: 'ja' | 'en'): void

src/app/[locale]/settings/page.tsx:
- 最寄り駅の設定フォーム
- 現在のお気に入り大会一覧
- 言語設定

注意: SSRではlocalStorageにアクセスできないため、
useEffectでクライアントサイドでのみ読み込む設計にしてください。
カスタムフック useUserSettings() を作成して各コンポーネントから利用。
```

---

## Phase 7: SEO・パフォーマンス最適化

### Prompt 7-1: SEOとメタデータ

```
SEO最適化を実装してください。

1. 各ページのメタデータ設定（generateMetadata）:
   - トップ: サイト名 + 説明
   - 大会一覧: 「全国のマラソン大会一覧」
   - 大会詳細: 「{大会名} - コース・参加賞・アクセス情報」
   - OGP画像（og:image）は将来的に動的生成を検討

2. 構造化データ（JSON-LD）:
   - 大会詳細ページに Event Schema を埋め込み
   - name, startDate, location, url, description を含める

3. sitemap.xml の自動生成:
   - src/app/sitemap.ts で全大会ページのURLを出力

4. robots.txt:
   - src/app/robots.ts

5. パフォーマンス:
   - 画像の最適化（next/image使用）
   - Leafletの遅延読み込み（dynamic import）
   - フォントのpreload
```

---

## 実行順序の目安

| Phase | 目安時間 | 依存関係 |
|-------|---------|---------|
| 0: セットアップ | 30分 | なし |
| 1: データ層 | 20分 | Phase 0 |
| 2: レイアウト | 30分 | Phase 0 |
| 3: 大会一覧 | 45分 | Phase 1, 2 |
| 4: 大会詳細 | 60分 | Phase 1, 2, 3 |
| 5: 多言語対応 | 30分 | Phase 2, 3, 4 |
| 6: ユーザー設定 | 20分 | Phase 4 |
| 7: SEO | 20分 | Phase 3, 4 |

---

## 補足: Claude Codeの利用Tips

- 各Promptはそのままコピー＆ペーストで使えるように設計しています
- エラーが出た場合は「エラーを修正してください」と続けてください
- 大きなPromptは分割して実行した方が精度が高くなります
- 「現在の src/components/ のディレクトリ構造を見せて」と聞くと、進捗確認ができます
- 動作確認は `npm run dev` で開発サーバーを起動してブラウザで確認してください
