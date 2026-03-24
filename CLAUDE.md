# CLAUDE.md

このファイルはリポジトリ内でのClaude Code (claude.ai/code) の作業を補助するためのガイダンスです。

## コミュニケーション
- 日本語で応答する（コード・変数名は英語）
- 簡潔に回答し、自明な説明は省略する
- 複雑なタスクでは実装前に計画を提示し、承認後に着手する

# Git規約
- Conventional Commits形式、本文は日本語（例: `feat: ユーザー認証にOAuth2を追加`）
- 確認なしに自動コミット・自動pushしない

## コマンド

```bash
# 開発（Cloudflare ランタイム経由でローカルD1に接続）
npm run dev                      # localhost:3000 で Next.js 開発サーバーを起動

# ビルド
npm run build                    # next build --webpack（TurbopackはCloudflare Workers非対応のため使用不可）
npm run cf:build                 # OpenNext Cloudflare ビルド（デプロイ用）

# Lint
npm run lint

# データベース
npm run db:generate              # スキーマ変更後にDrizzleマイグレーションを生成
npm run db:migrate:local         # ローカルD1にマイグレーションを適用
npm run db:migrate:remote        # リモートのCloudflare D1にマイグレーションを適用
npm run db:seed:local            # マスターデータ（prefectures, gift_categories）をシード
npm run db:seed-races:local      # レースデータ（seed-races.sql）をシード
npm run course:generate          # public/gpx/*.gpx → public/course-profiles/*.json を生成（引数でrace-id指定可）
npm run db:studio                # Drizzle Studio GUI を起動

# Cloudflare プレビュー / デプロイ
npm run cf:preview               # ビルド + wrangler pages dev（localhost:8788）
npm run cf:deploy                # ビルド + wrangler pages deploy
```

> **Windowsの注意**: Node.js コマンドはPowerShell経由で実行する必要があります。bashから呼び出す場合は `powershell -Command "Set-Location 'C:\Dev\krote-run'; npm run build"` を使用してください。

> `npm run dev` は `next.config.ts` の `initOpenNextCloudflareForDev()` を通じてローカルD1に接続します。ローカルDBは `.wrangler/state/` に保存されます。

## アーキテクチャ

### ランタイム & ホスティング
- **Cloudflare Pages + OpenNext** — サーバーサイドのコードはすべてCloudflare Workersランタイム上で動作し、Node.jsでは動きません。D1バインディング（`env.DB`）へのアクセスには `getCloudflareContext()` を使用します。
- **APIルートなし** — データはServer Componentから `src/lib/data.ts` を経由してサーバーサイドで取得します。

### i18nルーティング
- **next-intl v4**、ロケールは `['ja', 'en']`、デフォルトは `ja`。
- すべてのページは `src/app/[locale]/` 以下に配置します。ルートの `app/layout.tsx` はパススルーで、実際のHTML/bodyは `src/app/[locale]/layout.tsx` に記述します。
- `params` から取得した `locale` は `Locale` 型にキャストしてください: `const locale = rawLocale as Locale`。
- ロケール対応のナビゲーションには `next/navigation` ではなく `@/i18n/navigation` の `Link` と `redirect` を使用します。
- `Header.tsx` の言語切り替えは next-intl の `<Link locale="en">` / `<Link locale="ja">` を使用します。

### データフロー
```
Cloudflare D1 (SQLite)
  ↓ Drizzle ORM (src/lib/db/schema.ts)
  ↓ getDatabase() → drizzle(env.DB) via getCloudflareContext()
  ↓ データアクセス関数 (src/lib/data.ts)
  ↓ Server Components (page.tsx)
  ↓ Client Components (RaceList, HomeRaceSection, RaceFilter) がpropsとしてデータを受け取る
```

- `getRaces()` はレース・カテゴリ・参加賞を一括取得します（3クエリのバッチ）。エイドステーション・関門・アクセス・近隣スポット・天気は **`getRaceById()` のみで取得** し、一覧クエリを高速に保ちます。
- フィルタリング・ソートはすべて `src/lib/utils.ts` の `filterRaces()` / `sortRacesByDate()` でクライアントサイドで行います。

### スタイリング
- **Tailwind CSS v4** — CSSファースト構成。カスタマイズは `tailwind.config.ts` ではなく `src/app/globals.css` の `@theme` ブロックで行います。
- デザイントークン: `--color-primary`（#c0392b バーミリオン）、`--color-ink`、`--color-cream`、`--color-border` など。
- フォントは `next/font/google` 経由でCSSカスタムプロパティとして `[locale]/layout.tsx` に注入: `--font-playfair`（セリフ見出し）、`--font-dm-sans`（サンスセリフUI）、`--font-noto-sans-jp`（日本語）。
- TailwindクラスにマップされていないトークンをJSXで使う場合は任意値ではなく `style={{ color: 'var(--color-ink)' }}` を使用します。

### ClientコンポーネントとServerコンポーネント
- ページファイル（`page.tsx`）はServer Component — ここでデータを取得しpropsとして渡します。
- インタラクティブなコンポーネント（`RaceList`、`HomeRaceSection`、フィルター系）はClient Component（`'use client'`）です。
- **Leaflet / react-leaflet は `dynamic(() => import(...), { ssr: false })` でロードする必要があります** — 既存の `CourseMapLoader.tsx` / `ElevationChartLoader.tsx` のラッパーパターンを踏襲してください。

### レースカードのバリアント
ホームページとレース一覧で切り替え可能な2種類のカードスタイルがあります:
- `RaceCard.tsx` — 「マガジン」スタイル（セリフタイトル、イタリックタグライン、統計行）
- `RaceCardExp.tsx` — 「エクスペリエンス」スタイル（画像上にオーバーレイで説明、✓ハイライトリスト）

### レースデータ
- 正規データ: `src/data/races/*.json`（レース1件につき1ファイル、2026年大会約52件）。
- JSONファイルは `migrations/seed-races-all.sql`（`scripts/generate-seed-races.js` で生成）経由でD1にシードします。
- 新しいレースを追加する場合: JSONを作成 → シードスクリプトを実行 → DBに適用。
- `nearby_spots.type` は列挙型ではなく日本語文字列（`'観光地' | '温泉' | 'グルメ' | '宿泊'`）で保存されます。

### 主要型: RaceFilter
`src/lib/types.ts` の `RaceFilter` の定義:
- `giftCategories: GiftCategoryId[]` — OR条件の複数選択（単一値ではなく配列）
- フィルタリングロジックは `src/lib/utils.ts` の `filterRaces()` に実装

## 作業ログの記録

作業が完了したら **必ず `docs/update-history.md` に追記**してください。

- 形式: `## YYYY-MM-DD タイトル`（日付は作業日、タイトルは変更内容を端的に表す）
- 内容: 変更したファイル・追加した機能・修正した問題を箇条書きで記載
- ファイルの先頭ではなく**末尾に追記**する（古い履歴を上、新しい履歴を下に積み上げる）

## スキーマ変更時の手順

`src/lib/db/schema.ts` を変更した場合、**必ず以下も合わせて更新**してください。

1. **`docs/schema.md` を更新** — 変更したテーブルのカラム定義・備考・インデックス一覧、およびマイグレーション履歴テーブルに新しいエントリを追記する
2. **`docs/er-diagram.drawio` を更新** — 新規テーブルや外部キーの追加・削除を draw.io ファイルに反映する（ASCII図ではなく drawio が正）
3. **マイグレーションファイルを生成** — `npm run db:generate` でDrizzleマイグレーションSQLを生成する
4. **ローカルDBに適用** — `npm run db:migrate:local` でローカルD1に反映して動作確認する
