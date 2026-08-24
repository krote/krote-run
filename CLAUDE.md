# CLAUDE.md

このファイルはリポジトリ内でのClaude Code (claude.ai/code) の作業を補助するためのガイダンスです。

## コミュニケーション
- 日本語で応答する（コード・変数名は英語）
- 体言止め・短文で応答。敬語不要
- クッション言葉・ぼかし表現を使わない
- 複雑なタスクでは実装前に計画を提示し、承認後に着手する
- 技術的正確さは維持。省略するのは装飾のみ

# Git規約
- Conventional Commits形式、本文は日本語（例: `feat: ユーザー認証にOAuth2を追加`）
- 確認なしに自動コミット・自動pushしない
- 実装はブランチを作成して行い、PRをユーザに提出。レビュー後にマージする
- 実装時はTDDスキルに基づき実装を進めるものとする

## TDD
- 実装前に必ずテストを書き、Red を確認してから実装を始める
- `src/` のテスト: `vitest`（`src/**/__tests__/` または同階層の `*.test.ts`）
- `tools/` のテスト: `tools/admin-server.test.js`（Node.js built-in test runner）
- テストなしで実装ファイルを作成・編集しない

## コマンド

```bash
# 開発（Cloudflare ランタイム経由でローカルD1に接続）
pnpm run dev                     # localhost:3000 で Next.js 開発サーバーを起動

# ビルド
pnpm run build                   # next build --webpack（TurbopackはCloudflare Workers非対応のため使用不可）
pnpm run cf:build                # OpenNext Cloudflare ビルド（デプロイ用）

# Lint
pnpm run lint

# データベース
pnpm run db:generate             # スキーマ変更後にDrizzleマイグレーションを生成
pnpm run db:migrate:local        # ローカルD1にマイグレーションを適用
pnpm run db:migrate:remote       # リモートのCloudflare D1にマイグレーションを適用
pnpm run db:seed:local           # マスターデータ（prefectures, gift_categories）をシード
pnpm run db:seed-races:local     # レースデータ（seed-races-all.sql）をシード
pnpm run course:generate         # public/gpx/*.gpx → public/course-profiles/*.json を生成（引数でrace-id指定可）
pnpm run db:studio               # Drizzle Studio GUI を起動

# Cloudflare プレビュー / デプロイ
pnpm run cf:preview              # ビルド + wrangler pages dev（localhost:8788）
pnpm run cf:deploy               # ビルド + wrangler pages deploy（本番: main扱い）
pnpm run cf:deploy:stg           # ビルド + wrangler pages deploy --branch=staging（stg環境）

# stg環境（Cloudflare Pages Preview + 専用D1/R2）
pnpm run db:migrate:stg          # stg用D1（krote-run-stg-db）にマイグレーションを適用
pnpm run db:seed:stg             # stg用D1にマスターデータをシード
pnpm run db:seed-races:stg       # stg用D1にレースデータをシード
```

> **Windowsの注意**: Node.js コマンドはPowerShell経由で実行する必要があります。bashから呼び出す場合は `powershell -Command "Set-Location 'C:\Dev\krote-run'; pnpm run build"` を使用してください。

> **wrangler コマンドの注意**: `wrangler d1 execute` を直接実行する場合、`%USERPROFILE%` などの Windows 環境変数は bash から渡すと展開されません。**必ず `pnpm run` スクリプト経由で実行してください**（package.json のスクリプトは cmd.exe で解釈されるため環境変数が正しく展開されます）。直接 wrangler コマンドを使う場合はパスをハードコードしてください（例: `C:\Users\krote\.wrangler\states\krote-run`）。

> `pnpm run dev` は `next.config.ts` の `initOpenNextCloudflareForDev()` を通じてローカルD1に接続します。ローカルDBは `.wrangler/state/` に保存されます。

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

### ⚠️ middleware.ts に関する重要な制約

**`src/middleware.ts` を `src/proxy.ts` にリネームしてはいけない。**

Next.js 16 は `middleware.ts` を非推奨とし `proxy.ts` への移行を推奨しているが、`proxy.ts` は **Node.js ランタイム固定**（`export const runtime = 'edge'` すら記述不可）のため `opennextjs-cloudflare` と根本的に非互換。

```
# proxy.ts にするとこのエラーでcf:buildが失敗する
ERROR Node.js middleware is not currently supported. Consider switching to Edge Middleware.
```

`opennextjs-cloudflare` が `proxy.ts` に対応するまでは `middleware.ts` を維持すること。Next.js のビルド警告（`⚠ The "middleware" file convention is deprecated`）は承知の上で無視する。

**`runtime` の値は `'edge'` ではなく `'experimental-edge'` にすること**（2026-08-23 Next.js 16.2.10で確認）。`'edge'` のままだと `next build`（＝`cf:build`/`cf:deploy`）が次のエラーで失敗する:
```
Error: Page /src/middleware provided runtime 'edge', the edge runtime for rendering is currently experimental. Use runtime 'experimental-edge' instead.
```
なお `pnpm run dev` では `experimental-edge` でも `initOpenNextCloudflareForDev()` 経由の実行時に `ReferenceError: self is not defined` が出ることがある。これはNext.js 16の新Proxyアーキテクチャと`@opennextjs/cloudflare`の互換性問題（[cloudflare/workers-sdk#13755](https://github.com/cloudflare/workers-sdk/issues/13755)、未解決）が原因で、`cf:build`/本番・stgデプロイには影響しない（実際にstg環境で動作確認済み）。`next dev` でmypage等が500になる場合はこれが原因と考えてよい。

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

### レースデータ品質ルール（JSON作成・更新時に必ず守ること）

これらはCodeRabbitで繰り返し指摘されるルール。クロール結果を取り込む際も同様に適用する。

1. **`entry_periods[].label_ja` / `label_en` は空文字禁止**
   - 区分名が不明な場合のデフォルト: `"label_ja": "一般エントリー"`, `"label_en": "General Entry"`

2. **`course_info.certification` の値は大文字統一**
   - 正: `"JAAF"`, `"WA"`, `"AIMS"`, `"WMM"`
   - 誤: `"jaaf"`, `"aims"` など小文字は不可

3. **`entry_periods[].start_date` は null 禁止**
   - `start_date` が不明な場合はトップレベルの `entry_start_date` と同じ日付を使用する
   - `end_date` は null 可（終了日未定の場合）

4. **`entry_start_date` はすべての `entry_periods[].start_date` の中で最も早い日付に合わせる**
   - 例: ONE TOKYOプレミアムが 2026-07-31 開始なら `entry_start_date: "2026-07-31"`

5. **レースJSON変更後は必ずシードを再生成**
   ```bash
   node scripts/generate-seed-races.js
   ```

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
3. **マイグレーションファイルを生成** — `pnpm run db:generate` でDrizzleマイグレーションSQLを生成する
4. **生成されたSQLを確認** — 新テーブル追加のはずなのに既存テーブルの `CREATE TABLE` が含まれている場合は Drizzle のスナップショット（`migrations/meta/`）がズレているサイン。その場合は生成ファイルを手動で差分のみに修正する
5. **ローカルDBに適用** — `pnpm run db:migrate:local` でローカルD1に反映して動作確認する
6. **動作確認** — `pnpm run dev` でエラーが出ないことを確認してからPRを出す

### マイグレーション適用時の注意

- **一時SQLファイルは `migrations/` に置かない** — wrangler が自動認識して管理対象になってしまう。回避用の一時SQLは `scripts/` 以下に置くこと
- **リモート適用は `pnpm run db:migrate:remote`** — 累積マイグレーション等でエラーになる場合は `wrangler d1 execute --remote --file=...` で直接実行し、`d1_migrations` テーブルに手動でレコードを INSERT して適用済みとしてマークする
- **新規D1データベースに対して `wrangler d1 migrations apply` を素朴に実行しない**（2026-08-23 stg環境構築時に遭遇）: `migrations/` 内の全SQLファイル（`seed-*.sql` も含む）をファイル名のアルファベット順で実行するため、番号の重複や過去の手動INSERTで管理してきた実際の適用順とズレて `table already exists` 等で失敗する。新規DBを本番と同じスキーマにする場合は次の手順を使う:
  1. `wrangler d1 export krote-run-db --remote --no-data --output=<path>` で本番のスキーマのみエクスポート
  2. `wrangler d1 execute <新DB名> --remote --file=<path>` でスキーマを投入
  3. 本番の `d1_migrations` テーブルの内容（`SELECT name FROM d1_migrations ORDER BY id`）をそのまま新DBの `d1_migrations` にINSERTし、「全マイグレーション適用済み」の状態に揃える（以降の `migrations apply` が正しく差分だけを検知するようになる）

### stg環境

Cloudflare Pages の Preview 環境を使い、本番と別のD1/R2で動作確認する。

- Pagesプロジェクト `krote-run` はGit連携なし（`wrangler pages deploy` をCLIから直接実行）。過去のデプロイは全て `main` ブランチ扱い＝Production
- `pnpm run cf:deploy:stg` は `--branch=staging` を明示することでPreview扱いになり、`staging.krote-run.pages.dev` にデプロイされる
- `wrangler.jsonc` の `env.preview` セクションでstg専用のD1（`krote-run-stg-db`）・R2（`krote-run-assets-stg`）にバインドしている（本番の `d1_databases`/`r2_buckets` とは完全に別リソース。Cloudflare Pagesの `env.<ENVIRONMENT>` は `production`/`preview` の2つのみ）
- 無料枠（Workers 100,000リクエスト/日、D1 読み取り5,000,000行/日・書き込み100,000行/日、ストレージ5GB）は**アカウント単位で本番と共有**。stgとprdでリソースを分けても枠は増えない点に注意

### seed-races の更新フロー

レースJSONを追加・変更した場合:

```bash
node scripts/generate-seed-races.js   # seed-races-all.sql を再生成
pnpm run db:seed-races:local          # ローカルに反映（seed-races-all.sql を使用）
```
