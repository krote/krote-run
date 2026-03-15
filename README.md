# KroteRun - マラソン大会ポータルサイト

全国のマラソン大会情報を一箇所で確認できるポータルサイト。

## 技術スタック

| カテゴリ | 技術 |
|---|---|
| フレームワーク | [Next.js](https://nextjs.org/) 16 (App Router) |
| 言語 | TypeScript |
| スタイリング | [Tailwind CSS](https://tailwindcss.com/) v4 |
| 国際化 | [next-intl](https://next-intl-docs.vercel.app/) v4（日本語・英語） |
| データベース | [Cloudflare D1](https://developers.cloudflare.com/d1/)（SQLite） |
| ORM | [Drizzle ORM](https://orm.drizzle.team/) |
| 地図 | [Leaflet](https://leafletjs.com/) + [react-leaflet](https://react-leaflet.js.org/) |
| グラフ | [Recharts](https://recharts.org/) |
| ホスティング | [Cloudflare Pages](https://pages.cloudflare.com/) + [OpenNext](https://opennext.js.org/) |

## セットアップ

```bash
# パッケージのインストール
npm install

# ローカルD1データベースにマイグレーションを適用
npm run db:migrate:local

# ローカルD1データベースにシードデータを投入
npm run db:seed:local
```

### 開発サーバー

通常の Next.js 開発サーバー（D1 非接続）:

```bash
npm run dev
```

Cloudflare Workers ランタイム（D1 接続あり）:

```bash
npm run cf:preview
```

ブラウザで [http://localhost:8788](http://localhost:8788) を開くと日本語ページ (`/ja`) にリダイレクトされます。

## ディレクトリ構成

```
src/
├── app/
│   ├── layout.tsx              # ルートレイアウト（最小限）
│   ├── page.tsx                # / → /ja リダイレクト
│   └── [locale]/
│       ├── layout.tsx          # ロケール共通レイアウト（Header/Footer）
│       ├── page.tsx            # ホームページ
│       ├── races/
│       │   ├── page.tsx        # 大会一覧
│       │   └── [id]/page.tsx   # 大会詳細
│       ├── calendar/page.tsx   # 大会カレンダー
│       └── settings/page.tsx   # 設定
├── components/
│   ├── layout/                 # Header, Footer
│   ├── races/                  # RaceCard, RaceFilter, RaceList
│   ├── course/                 # CourseMap (Leaflet), ElevationChart (Recharts)
│   ├── access/                 # AccessChecker
│   └── ui/                     # 共通UIコンポーネント
├── i18n/
│   ├── routing.ts              # ロケールルーティング設定
│   ├── navigation.ts           # ナビゲーションヘルパー
│   └── request.ts              # サーバーサイドリクエスト設定
├── lib/
│   ├── types.ts                # TypeScript型定義
│   ├── data.ts                 # D1データ取得関数
│   ├── utils.ts                # ユーティリティ関数
│   └── db/
│       ├── schema.ts           # Drizzle ORMスキーマ定義
│       └── client.ts           # D1クライアント初期化
├── messages/
│   ├── ja.json                 # 日本語翻訳
│   └── en.json                 # 英語翻訳
└── middleware.ts               # next-intl ロケールルーティング
migrations/
├── 0000_bored_crusher_hogan.sql  # テーブル作成マイグレーション
└── seed.sql                      # シードデータ
```

## 多言語対応

- デフォルトロケール: `ja`（日本語）
- 対応ロケール: `ja`, `en`
- URL構成: `/ja/...`, `/en/...`

ルーティングは `src/middleware.ts` と `next-intl` が自動処理します。

## データベース

Cloudflare D1（SQLite）を使用。主なテーブル:

| テーブル | 内容 |
|---|---|
| `races` | 大会基本情報 |
| `race_categories` | カテゴリ別距離・制限時間・参加費 |
| `aid_stations` | エイドステーション |
| `checkpoints` | 関門情報 |
| `access_points` | 最寄り駅・アクセス |
| `nearby_spots` | 周辺スポット |
| `weather_history` | 過去の気象データ |
| `participation_gifts` | 参加賞 |
| `prefectures` | 都道府県マスタ |
| `gift_categories` | 参加賞カテゴリマスタ |

### マイグレーション

```bash
# ローカルDBへ適用
npm run db:migrate:local

# リモートDBへ適用
npm run db:migrate:remote

# スキーマ変更後にマイグレーションファイルを生成
npm run db:generate
```

## デプロイ

Cloudflare Pages へのデプロイは以下の手順で行います。

```bash
# 1. デプロイ用ビルドを作成（OpenNext + Webpack）
# 注意: Turbopackは Cloudflare Workers と非互換のため Webpack を使用

# 2. デプロイ用ディレクトリを準備（assets統合 + _routes.json生成）
powershell -ExecutionPolicy Bypass -File prepare-deploy.ps1

# 3. Cloudflare Pagesへデプロイ
npx wrangler pages deploy .open-next/dist --project-name=krote-run

# または一括実行
npm run cf:build && powershell -ExecutionPolicy Bypass -File prepare-deploy.ps1 && npx wrangler pages deploy .open-next/dist --project-name=krote-run
```

### 初回デプロイ時の追加作業

```bash
# リモートDBへマイグレーションを適用
npm run db:migrate:remote

# リモートDBへシードデータを投入
npm run db:seed:remote
```

## デザイントークン

| トークン | 値 |
|---|---|
| プライマリカラー | `#2563eb` (`--color-primary`) |
| アクセントカラー | `#dc2626` (`--color-accent`) |
| 日本語フォント | Noto Sans JP |
| 英語フォント | Inter |

Tailwind CSS v4 の `@theme` ブロックで定義（`src/app/globals.css`）。

## ライセンス

MIT
