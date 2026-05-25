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
| グラフ | [Recharts](https://recharts.org/)（高低差チャート） |
| ホスティング | [Cloudflare Pages](https://pages.cloudflare.com/) + [OpenNext](https://opennext.js.org/) |

## セットアップ

```bash
pnpm install

# ローカルD1データベースにマイグレーション + シードデータを適用
pnpm run db:migrate:local
pnpm run db:seed:local
pnpm run db:seed-races:local
```

### 開発サーバー

通常の Next.js 開発サーバー（D1 + Cloudflare ランタイム接続あり）:

```bash
pnpm run dev
```

Cloudflare Workers プレビュー（本番環境に近い動作確認）:

```bash
pnpm run cf:preview
```

ブラウザで [http://localhost:3000](http://localhost:3000)（dev）または [http://localhost:8788](http://localhost:8788)（cf:preview）を開くと `/ja` にリダイレクトされます。

> **Note**: `pnpm run dev` で Cloudflare D1 を利用するには `next.config.ts` に `initOpenNextCloudflareForDev()` が必要です（設定済み）。ローカルDBは `.wrangler/state/` を参照します。

## ディレクトリ構成

```
src/
├── app/
│   ├── layout.tsx                  # ルートレイアウト（最小限）
│   ├── page.tsx                    # / → /ja リダイレクト
│   ├── api/                        # APIルート（認証・レース・ユーザー）
│   └── [locale]/
│       ├── layout.tsx              # ロケール共通レイアウト（フォント・Header・Footer）
│       ├── page.tsx                # ホームページ
│       ├── races/
│       │   ├── page.tsx            # 大会一覧（フィルター + Magazine/Experience 切替）
│       │   └── [id]/page.tsx       # 大会詳細
│       ├── admin/                  # 管理画面（大会追加・削除）
│       ├── calendar/page.tsx       # 大会カレンダー
│       ├── mypage/page.tsx         # マイページ
│       ├── contact/page.tsx        # お問い合わせ
│       ├── guide/page.tsx          # 利用ガイド
│       ├── about/page.tsx          # サイト概要
│       └── terms/ cookie-policy/ privacy/
├── components/
│   ├── layout/                     # Header（JA/EN切替）, Footer
│   ├── races/
│   │   ├── RaceCard.tsx            # Magazine スタイルカード
│   │   ├── RaceCardExp.tsx         # Experience スタイルカード
│   │   ├── RaceFilter.tsx          # 絞り込みサイドバー
│   │   └── RaceList.tsx            # 一覧 + フィルター統合（Client Component）
│   ├── course/
│   │   ├── CourseMap.tsx           # Leaflet インタラクティブ地図
│   │   ├── CourseMapLoader.tsx     # SSR無効ローダー
│   │   ├── CourseProfileSection.tsx # 地図 + 高低差チャート統合セクション
│   │   ├── ElevationChart.tsx      # Recharts 高低差チャート
│   │   └── ElevationChartLoader.tsx
│   ├── contact/                    # お問い合わせフォーム
│   ├── mypage/                     # マイページコンポーネント
│   └── analytics/                  # Cookie同意バナー
├── i18n/                           # next-intl 設定
├── lib/
│   ├── types.ts                    # TypeScript 型定義（Race, RaceFilter 等）
│   ├── data.ts                     # D1 データ取得関数
│   ├── utils.ts                    # フィルター・フォーマット ユーティリティ
│   ├── auth.ts                     # 認証（Better Auth）
│   └── db/
│       ├── schema.ts               # Drizzle ORM スキーマ定義
│       └── client.ts               # D1 クライアント初期化
├── messages/
│   ├── ja.json                     # 日本語翻訳
│   └── en.json                     # 英語翻訳
└── data/
    ├── races/                      # 大会 JSON ファイル（74大会）
    ├── prefectures.json            # 都道府県マスタ
    └── gift-categories.json        # 参加賞カテゴリマスタ
migrations/
├── 0000〜0005_*.sql                # スキーママイグレーション
├── seed.sql                        # 都道府県・参加賞カテゴリ マスタデータ
├── seed-races-all.sql              # 全大会データ（generate-seed-races.js で生成）
└── seed-series.sql                 # レースシリーズデータ
public/
├── gpx/                            # コースGPX / KMLファイル
├── course-profiles/                # 生成済みコースプロフィールJSON
└── images/races/                   # 大会アイキャッチ画像
scripts/
├── gpx-to-profile.js               # GPX/KML → コースプロフィールJSON 生成
├── generate-seed-races.js          # races/*.json → seed-races-all.sql 生成
├── normalize-race-json.js          # JSONフォーマット正規化
└── cf-prepare.js                   # Cloudflare Pages デプロイ前準備
tools/
├── admin-server.js                 # 管理ツールサーバー（port 4000）
├── admin-server.test.js            # 管理ツールテスト（node:test）
├── admin/                          # 管理ツールUI（HTML/CSS/JS）
├── crawl/
│   ├── index.js                    # 更新チェッククローラー
│   ├── index.test.js               # クローラーテスト
│   ├── extractor.js                # claude -p による情報抽出
│   ├── extractor.test.js           # 抽出テスト
│   └── checksums.json              # チェックサム保存（自動生成）
└── hooks/
    └── pre-pr.js                   # PR作成前テスト実行フック
.github/workflows/test.yml          # CI: push/PR 時にテスト + lint を自動実行
```

## デザインシステム

Travel Magazine スタイルのインターナショナル向けデザイン。Playfair Display（セリフ体）と DM Sans（サンセリフ体）を組み合わせ、バーミリオンレッドをアクセントカラーとする。

### デザイントークン（`src/app/globals.css` `@theme` ブロック）

| トークン | 値 | 用途 |
|---|---|---|
| `--color-primary` | `#c0392b` | バーミリオンレッド、CTAボタン、アクセント |
| `--color-ink` | `#1a1714` | 見出し・濃いテキスト |
| `--color-mid` | `#7a7060` | ラベル・補足情報 |
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

Cloudflare D1（SQLite）を使用。74大会のデータを投入済み。

| テーブル | 内容 |
|---|---|
| `races` | 大会基本情報（名称・日付・都道府県・説明・エントリー情報等） |
| `race_categories` | カテゴリ別距離・制限時間・スタート時刻・参加費 |
| `race_entry_periods` | 複数エントリー期間と期間別参加費 |
| `aid_stations` | エイドステーション |
| `checkpoints` | 関門情報 |
| `access_points` | 最寄り駅・アクセス方法 |
| `nearby_spots` | 周辺スポット（観光地・温泉・グルメ・宿泊） |
| `weather_history` | 過去の気象データ |
| `participation_gifts` | 参加賞情報 |
| `gift_categories` | 参加賞カテゴリマスタ |
| `prefectures` | 都道府県マスタ（47件） |

### マイグレーション

```bash
pnpm run db:generate         # スキーマ変更後にマイグレーションファイルを生成
pnpm run db:migrate:local    # ローカルDBへ適用
pnpm run db:migrate:remote   # リモートDBへ適用
```

## コースプロフィール

GPX / KML ファイルからコースの地図・高低差チャートを生成する。

### 手順

1. GPXまたはKMLファイルを `public/gpx/` に配置（ファイル名はレースIDに合わせる例: `nagano-marathon-2026.gpx`）
2. 大会JSONの `course_gpx_file` フィールドにファイル名を設定
3. コースプロフィールJSONを生成:

```bash
pnpm run course:generate                      # 未生成のファイルのみ処理
pnpm run course:generate nagano-marathon-2026 # 特定レースを強制再処理
```

生成された `public/course-profiles/{race-id}.json` は大会詳細ページで自動的に読み込まれる。

- GPXファイルに標高データがない場合は国土地理院標高APIから自動取得
- GPX / KML 両形式に対応

## レースデータの更新

```bash
# races/*.json を編集後
node scripts/generate-seed-races.js   # seed-races-all.sql を再生成
pnpm run db:seed-races:local          # ローカルDBに反映
pnpm run db:seed-races:remote         # リモートDBに反映
```

## 管理ツール

`tools/admin-server.js` はスタンドアロンの管理ツールサーバー。Next.js とは独立して動作し、大会JSONファイルの編集・画像管理・データ整備状況の確認ができる。

```bash
pnpm run admin
# → http://localhost:4000
```

| タブ | 機能 |
|---|---|
| 大会一覧 | JSONファイルの編集・保存・削除。未整備フィールドのバッジ表示 |
| 更新チェック | 公式サイトから情報を自動抽出し、登録済みデータとの差分を確認・適用 |
| データチェック | 全大会のフィールド整備状況をテーブルで一覧表示 |

大会ごとに「情報取得URL」（大会要項・エントリーページなど最大5件）を登録すると、クローラーがそのページを優先的に参照する。

### 自動更新クローラー

```bash
pnpm run crawl:dry   # 変更検知のみ（ファイル更新なし）
pnpm run crawl       # 変更検知 + claude -p で情報抽出 + race JSON 自動更新
```

動作フロー:
1. 各レースの `info_urls`（未設定時は `official_url`）をフェッチ
2. `tools/crawl/checksums.json` と比較して変更を検知
3. 変更があったページを `claude -p` に渡して構造化抽出
4. 差分があるフィールドのみ race JSON を更新

```bash
pnpm run test:admin   # 管理ツールのテストを実行
pnpm run test:tools   # tools/ 配下の全テストを実行（admin + crawl）
```

## テスト

```bash
pnpm test               # 全テストを実行
pnpm run test:watch     # ウォッチモード
pnpm run test:coverage  # カバレッジ付き
```

CI（GitHub Actions）では `main` へのpush・PRで自動的にテスト + lint を実行（`.github/workflows/test.yml`）。

## 主要機能

| 機能 | 詳細 |
|---|---|
| 大会一覧 | 74大会を一覧表示。Magazine / Experience の2スタイルで閲覧可能 |
| 絞り込みフィルター | 開催月・距離カテゴリ・参加賞（OR複数選択）・都道府県・テキスト検索 |
| 大会詳細 | コース・関門・エイドステーション・エントリー・受付情報・アクセス・参加賞・周辺スポット・気象データ |
| コースプロフィール | Leaflet インタラクティブ地図 + Recharts 高低差チャート（GPX/KML対応） |
| 複数エントリー期間 | 先行・一般・追加募集など複数の申込期間と期間別参加費 |
| 多言語対応 | 日本語 / 英語（Header の JA/EN ボタンで切替） |
| 大会カレンダー | 月別の開催カレンダー |
| マイページ | 参加予定・完走済み大会の管理 |
| お問い合わせ | Resend 経由のメール送信フォーム |
| レスポンシブ対応 | モバイル〜デスクトップ対応 |

## 今後の実装予定

| 機能 | 概要 |
|---|---|
| 当日到着可否判定 | 乗換案内APIを用いた最寄り駅→会場の到達可否 |
| SEO / OGP 強化 | Event Schema（構造化データ）・各ページOGP |
| コースプロフィール拡充 | より多くの大会にGPX/KMLを整備 |

## デプロイ

```bash
pnpm run cf:deploy  # ビルド + Cloudflare Pages へデプロイ
```

### 初回デプロイ時

```bash
pnpm run db:migrate:remote    # リモートDBへマイグレーション適用
pnpm run db:seed:remote       # マスタデータのシード
pnpm run db:seed-races:remote # 大会データのシード
```

## ライセンス

MIT
