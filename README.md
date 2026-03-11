# KroteRun - マラソン大会ポータルサイト

全国のマラソン大会情報を一箇所で確認できるポータルサイト。

## 技術スタック

| カテゴリ | 技術 |
|---|---|
| フレームワーク | [Next.js](https://nextjs.org/) 16+ (App Router) |
| 言語 | TypeScript |
| スタイリング | [Tailwind CSS](https://tailwindcss.com/) v4 |
| 国際化 | [next-intl](https://next-intl-docs.vercel.app/) v4（日本語・英語） |
| 地図 | [Leaflet](https://leafletjs.com/) + [react-leaflet](https://react-leaflet.js.org/) |
| グラフ | [Recharts](https://recharts.org/) |

## セットアップ

```bash
# パッケージのインストール
npm install

# 開発サーバー起動
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開くと日本語ページ (`/ja`) にリダイレクトされます。

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
│   ├── data.ts                 # データ読み込み関数
│   └── utils.ts                # ユーティリティ関数
├── messages/
│   ├── ja.json                 # 日本語翻訳
│   └── en.json                 # 英語翻訳
└── data/
    ├── races/                  # 大会JSONファイル（index.json + {id}.json）
    ├── gpx/                    # GPXファイル
    ├── course-profiles/        # コースプロファイル（ビルド時生成）
    ├── prefectures.json        # 都道府県マスタ（47都道府県）
    └── gift-categories.json    # 参加賞カテゴリマスタ
```

## 多言語対応

- デフォルトロケール: `ja`（日本語）
- 対応ロケール: `ja`, `en`
- URL構成: `/ja/...`, `/en/...`

ルーティングは `middleware.ts` と `next-intl` が自動処理します。

## 大会データの追加

大会データは `src/data/races/` 以下のJSONファイルで管理します。

### 大会JSONの形式

```json
{
  "id": "tokyo-marathon-2026",
  "name": "東京マラソン2026",
  "nameEn": "Tokyo Marathon 2026",
  "date": "2026-03-01",
  "prefecture": "東京都",
  "prefectureCode": "13",
  "city": "千代田区",
  "distances": [
    {
      "category": "フルマラソン",
      "categoryEn": "Full Marathon",
      "distanceKm": 42.195,
      "cutoffTime": "07:00:00",
      "fee": 21600
    }
  ],
  "level": "intermediate",
  "terrain": "road",
  "tags": ["メジャー大会", "世界大会"],
  "access": {
    "nearestStation": "新宿駅",
    "walkingMinutes": 5,
    "parkingAvailable": false
  }
}
```

大会を追加したら `src/data/races/index.json` に追加してください。

## デザイントークン

| トークン | 値 |
|---|---|
| プライマリカラー | `#2563eb` (`--color-primary`) |
| アクセントカラー | `#dc2626` (`--color-accent`) |
| 日本語フォント | Noto Sans JP |
| 英語フォント | Inter |

Tailwind CSS v4 の `@theme` ブロックで定義（`src/app/globals.css`）。

## ビルド

```bash
npm run build
npm run start
```

## ライセンス

MIT
