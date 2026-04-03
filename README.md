# KroteRun — Japan Marathon Portal

全国のマラソン大会情報を一箇所で確認できるポータルサイト。国内ランナーと海外からの遠征ランナーの両方を対象とし、大会を探す→準備する→遠征を楽しむまでをワンストップでサポートする。

## 技術スタック

| カテゴリ | 技術 |
|---|---|
| フレームワーク | [Next.js](https://nextjs.org/) 16 (App Router) |
| 言語 | TypeScript |
| スタイリング | [Tailwind CSS](https://tailwindcss.com/) v4（CSS-first `@theme` 設定） |
| 国際化 | [next-intl](https://next-intl-docs.vercel.app/) v4（日本語・英語、`/ja/...` `/en/...`） |
| データベース | [Cloudflare D1](https://developers.cloudflare.com/d1/)（SQLite） |
| ORM | [Drizzle ORM](https://orm.drizzle.team/) |
| 地図 | [Leaflet](https://leafletjs.com/) + [react-leaflet](https://react-leaflet.js.org/) |
| グラフ | [Recharts](https://recharts.org/)（高低差チャート・気象データ） |
| ホスティング | [Cloudflare Pages](https://pages.cloudflare.com/) + [OpenNext](https://opennext.js.org/) |

## セットアップ

```bash
npm install

# ローカルD1データベースにマイグレーション + シードデータを適用
npm run db:migrate:local
npm run db:seed:local
npm run db:seed-races:local
```

### 開発サーバー

通常の Next.js 開発サーバー（D1 + Cloudflare ランタイム接続あり）:

```bash
npm run dev
```

Cloudflare Workers プレビュー（本番環境に近い動作確認）:

```bash
npm run cf:preview
```

ブラウザで [http://localhost:3000](http://localhost:3000)（dev）または [http://localhost:8788](http://localhost:8788)（cf:preview）を開くと `/ja` にリダイレクトされます。

> **Note**: `npm run dev` で Cloudflare D1 を利用するには `next.config.ts` に `initOpenNextCloudflareForDev()` が必要です（設定済み）。ローカルDBは `.wrangler/state/` を参照します。

## ディレクトリ構成

```
src/
├── app/
│   ├── layout.tsx                  # ルートレイアウト（最小限）
│   ├── page.tsx                    # / → /ja リダイレクト
│   └── [locale]/
│       ├── layout.tsx              # ロケール共通レイアウト（フォント・Header・Footer）
│       ├── page.tsx                # ホームページ（Travel Magazine スタイル）
│       ├── races/
│       │   ├── page.tsx            # 大会一覧（フィルター + Magazine/Experience 切替）
│       │   └── [id]/page.tsx       # 大会詳細
│       ├── calendar/page.tsx       # 大会カレンダー
│       └── settings/page.tsx       # 設定
├── components/
│   ├── layout/                     # Header（JA/EN切替）, Footer
│   ├── home/
│   │   └── HomeRaceSection.tsx     # トップページ大会セクション（Magazine/Experience トグル）
│   ├── races/
│   │   ├── RaceCard.tsx            # Magazine スタイルカード
│   │   ├── RaceCardExp.tsx         # Experience スタイルカード
│   │   ├── RaceFilter.tsx          # 絞り込みサイドバー（月・距離・参加賞・都道府県）
│   │   └── RaceList.tsx            # 一覧 + フィルター統合（Client Component）
│   ├── course/
│   │   ├── CourseMap.tsx           # Leaflet インタラクティブ地図
│   │   ├── CourseMapLoader.tsx     # SSR無効ローダー
│   │   ├── ElevationChart.tsx      # Recharts 高低差チャート
│   │   └── ElevationChartLoader.tsx
│   └── __tests__/                  # コンポーネントテスト（Vitest + Testing Library）
│       ├── RaceCard.test.tsx
│       ├── RaceFilter.test.tsx
│       └── RaceList.test.tsx
├── i18n/
│   ├── routing.ts                  # ロケールルーティング設定
│   ├── navigation.ts               # ナビゲーションヘルパー
│   └── request.ts                  # サーバーサイドリクエスト設定
├── lib/
│   ├── types.ts                    # TypeScript 型定義（Race, RaceFilter 等）
│   ├── data.ts                     # D1 データ取得関数
│   ├── utils.ts                    # フィルター・フォーマット ユーティリティ
│   ├── db/
│   │   ├── schema.ts               # Drizzle ORM スキーマ定義
│   │   └── client.ts               # D1 クライアント初期化
│   └── __tests__/                  # ユーティリティ関数ユニットテスト（Vitest）
│       ├── utils.filter.test.ts
│       ├── utils.filter-state.test.ts
│       ├── utils.format.test.ts
│       ├── utils.status.test.ts
│       └── fixtures.ts
├── messages/
│   ├── ja.json                     # 日本語翻訳
│   └── en.json                     # 英語翻訳
└── data/
    ├── races/                      # 大会 JSON ファイル（52大会 / 2026シーズン）
    ├── prefectures.json            # 都道府県マスタ
    └── gift-categories.json        # 参加賞カテゴリマスタ
migrations/
├── 0000_bored_crusher_hogan.sql    # 初期スキーマ（全テーブル作成）
├── 0001_nullable_entry_dates.sql   # entry_start/end_date を NULL 許容に変更
├── 0002_race_series_results.sql    # シリーズ結果テーブル追加
├── 0003_race_full_name_edition.sql # 正式名称・開催回次カラム追加
├── 0004_races_series_id.sql        # シリーズID カラム追加
├── 0005_race_entry_periods.sql     # 複数エントリー期間テーブル追加
├── seed.sql                        # 都道府県・参加賞カテゴリ マスタデータ
└── seed-races-all.sql              # 52大会の全データ
tools/
├── admin-server.js                 # 管理ツールサーバー（port 4000）
├── admin-server.test.js            # 管理ツールのユニット・統合テスト（node:test）
└── admin/                          # 管理ツールUI（HTML/CSS/JS）
    ├── index.html
    ├── app.js
    └── style.css
.github/
└── workflows/
    └── test.yml                    # CI: push/PR 時にテスト + lint を自動実行
```

## デザインシステム

Travel Magazine スタイルのインターナショナル向けデザイン。Playfair Display（セリフ体）と DM Sans（サンセリフ体）を組み合わせ、バーミリオンレッドをアクセントカラーとする。

### デザイントークン（`src/app/globals.css` `@theme` ブロック）

| トークン | 値 | 用途 |
|---|---|---|
| `--color-primary` | `#c0392b` | バーミリオンレッド、CTAボタン、アクセント |
| `--color-primary-dark` | `#9a2d20` | ホバー状態 |
| `--color-ink` | `#1a1714` | 見出し・濃いテキスト |
| `--color-ink2` | `#3d3830` | 本文テキスト |
| `--color-mid` | `#7a7060` | ラベル・補足情報 |
| `--color-light` | `#b0a898` | プレースホルダー・薄いテキスト |
| `--color-cream` | `#faf8f4` | 背景・カード |
| `--color-border` | `#e4dfd8` | ボーダー・区切り線 |
| `--font-serif` | Playfair Display | 見出し・タイトル |
| `--font-sans` | DM Sans + Noto Sans JP | 本文・UI |

### カードスタイル

大会カードは2種類を用意し、一覧ページ・トップページでトグル切替可能。

| スタイル | コンポーネント | 特徴 |
|---|---|---|
| Magazine | `RaceCard.tsx` | イタリック引用風 tagline、距離・制限時間・定員のスタッツ行 |
| Experience | `RaceCardExp.tsx` | 説明文のオーバーレイ、✓ ハイライトリスト |

## データベース

Cloudflare D1（SQLite）を使用。全 52 大会（2026 シーズン）のデータを投入済み。

| テーブル | 内容 |
|---|---|
| `races` | 大会基本情報（名称・日付・都道府県・説明・エントリー情報等） |
| `race_categories` | カテゴリ別距離・制限時間・スタート時刻・参加費（ウェーブスタート対応） |
| `race_entry_periods` | 複数エントリー期間（先行・一般等）と期間別参加費 |
| `aid_stations` | エイドステーション（距離・提供内容・注目エイドフラグ） |
| `checkpoints` | 関門情報（距離・閉鎖時刻） |
| `access_points` | 最寄り駅・アクセス方法（緯度経度付き） |
| `nearby_spots` | 周辺スポット（観光地・温泉・グルメ・宿泊） |
| `weather_history` | 過去の気象データ（平均・最高・最低気温、湿度、降水量） |
| `participation_gifts` | 参加賞情報 |
| `gift_categories` | 参加賞カテゴリマスタ（メダル・Tシャツ・完走証 等 9種） |
| `prefectures` | 都道府県マスタ（47件） |

### マイグレーション

```bash
# スキーマ変更後にマイグレーションファイルを生成
npm run db:generate

# ローカルDBへ適用
npm run db:migrate:local

# リモートDBへ適用
npm run db:migrate:remote
```

## 管理ツール

`tools/admin-server.js` はスタンドアロンの管理ツールサーバーです。Next.js とは独立して動作し、大会JSONファイルの編集・画像管理・データ整備状況の確認ができます。

```bash
npm run admin
# → http://localhost:4000
```

### 機能

| タブ | 機能 |
|---|---|
| 大会一覧 | JSONファイルの編集・保存・削除。未整備フィールドのバッジ表示（高優先:オレンジ / 中優先:グレー） |
| 更新チェック | Bedrock（Claude）で公式サイトから情報を自動抽出し、登録済みデータとの差分を確認・適用 |
| データチェック | 全大会のフィールド整備状況をテーブルで一覧表示。✗ をクリックで編集画面に直接遷移 |

### 未整備フィールドの判定基準

| 優先度 | フィールド | 判定条件 |
|---|---|---|
| 高 | エントリー期間 | `entry_periods` が空 かつ `entry_start_date` が null |
| 高 | 参加費 | カテゴリ別・統一どちらも未設定 |
| 高 | 公式URL | null または空文字 |
| 中 | 定員 | 0 または null |
| 中 | 制限時間 | いずれかのカテゴリが 0 または null |
| 中 | 説明文 | `description_ja` が空文字 |

### 管理ツールのテスト

```bash
npm run test:admin
```

`node:test`（Node.js 組み込み）による `getMissingFields()` ユニットテスト + HTTP統合テスト（計28件）。

## テスト

### アプリケーションテスト（Vitest）

```bash
npm test           # 全テストを実行
npm run test:watch # ウォッチモード
npm run test:coverage
```

| テストファイル | 対象 | テスト数 |
|---|---|---|
| `utils.filter.test.ts` | `filterRaces()` / `sortRacesByDate()` | 19 |
| `utils.filter-state.test.ts` | `defaultFilter` / `isDefaultFilter` / `isFilterEmpty` / `getMainCategory` | 14 |
| `utils.format.test.ts` | 日付・距離・参加費フォーマット関数 | 複数 |
| `utils.status.test.ts` | `getRaceStatus()` | 15 |
| `RaceCard.test.tsx` | RaceCard コンポーネント | 複数 |
| `RaceFilter.test.tsx` | RaceFilter コンポーネント | 複数 |
| `RaceList.test.tsx` | RaceList コンポーネント | 複数 |

### CI（GitHub Actions）

`main` へのpush・PRで自動的にテスト + lint を実行（`.github/workflows/test.yml`）。

## 主要機能（実装済み）

| 機能 | 詳細 |
|---|---|
| 大会一覧 | 52大会を一覧表示。Magazine / Experience の2スタイルで閲覧可能 |
| 絞り込みフィルター | 開催月・距離カテゴリ・参加賞（OR複数選択）・都道府県・テキスト検索 |
| 大会詳細 | コース情報・関門・エイドステーション・エントリー・アクセス・参加賞・周辺スポット・気象データを表示 |
| 複数エントリー期間 | 先行・一般・追加募集など複数の申込期間と期間別参加費を表示 |
| エントリー未発表表示 | エントリー情報が未発表の場合に「エントリー未発表」を明示表示 |
| 大会カレンダー | 月別の開催カレンダー |
| 多言語対応 | 日本語 / 英語（Header の JA/EN ピルボタンで切替） |
| レスポンシブ対応 | モバイル〜デスクトップ対応 |

## 今後の実装予定

| 機能 | 概要 |
|---|---|
| コースプロフィール | GPX → 標高API → 静的JSON 生成パイプライン、Leaflet地図 + Recharts高低差チャート表示 |
| 当日到着可否判定 | 乗換案内API（NAVITIME等）を用いた最寄り駅→会場の到達可否 |
| ユーザー設定（localStorage） | 最寄り駅保存・お気に入り大会登録 |
| SEO / OGP 強化 | Event Schema（構造化データ）・各ページOGP |
| /about ページ | サイト概要・データ掲載方針 |

## デプロイ

```bash
# 1. OpenNext Cloudflare ビルド
npm run cf:build

# 2. Cloudflare Pages へデプロイ
npm run cf:deploy
```

### 初回デプロイ時

```bash
# リモートDBへマイグレーション + シードデータを適用
npm run db:migrate:remote
npm run db:seed:remote
```

## ライセンス

MIT
