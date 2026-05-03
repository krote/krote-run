# データベーススキーマ

Cloudflare D1（SQLite互換）。ORM は Drizzle。スキーマ定義: `src/lib/db/schema.ts`

---

## ER図

ER図は `docs/er-diagram.drawio` で管理しています。[draw.io](https://app.diagrams.net/) または VS Code の Draw.io 拡張機能で開いてください。

> **スキーマ変更時は `er-diagram.drawio` も更新してください。**

---

## テーブル詳細

### races

| カラム | 型 | NULL | デフォルト | 備考 |
|---|---|---|---|---|
| id | text | NO | — | PK。例: `nagano-marathon-2026` |
| series_id | text | YES | — | FK → race_series.id。末尾の `-YYYY` を除いた値 |
| name_ja | text | NO | — | シリーズ名（年度をまたいで変わらない名称）|
| name_en | text | NO | — | |
| full_name_ja | text | YES | — | 回次・年号入り正式名称。例: `第51回東京マラソン2026` |
| full_name_en | text | YES | — | |
| edition | integer | YES | — | 開催回次。例: `51` |
| date | text | NO | — | `YYYY-MM-DD`。インデックスあり |
| prefecture | text | NO | — | JIS都道府県コード（例: `"13"`）。インデックスあり |
| city_ja | text | NO | — | |
| city_en | text | NO | — | |
| description_ja | text | NO | `""` | |
| description_en | text | NO | `""` | |
| official_url | text | NO | `""` | |
| entry_fee | integer | YES | — | null = カテゴリ別料金 |
| entry_fee_by_category | integer(bool) | NO | `false` | |
| entry_capacity | integer | NO | `0` | |
| entry_start_date | text | YES | — | `YYYY-MM-DD` |
| entry_end_date | text | YES | — | `YYYY-MM-DD` |
| entry_closed | integer(bool) | NO | `false` | 定員到達等で受付終了フラグ。`true` のとき日付に関わらず `entry_closed` 扱い |
| reception_type | text | NO | `"race_day"` | `race_day` / `none` / `pre_only` 等 |
| reception_note_ja | text | NO | `""` | |
| reception_note_en | text | NO | `""` | |
| tags | text | NO | `"[]"` | JSON: `string[]` |
| course_gpx_file | text | YES | — | |
| course_max_elevation_m | real | NO | `0` | |
| course_min_elevation_m | real | NO | `0` | |
| course_elevation_diff_m | real | NO | `0` | |
| course_surface | text | NO | `"road"` | `road` / `trail` / `mixed` 等 |
| course_certification | text | NO | `"[]"` | JSON: `string[]`（例: `["JAAF","AIMS"]`） |
| course_highlights_ja | text | NO | `""` | |
| course_highlights_en | text | NO | `""` | |
| course_notes_ja | text | YES | — | |
| course_notes_en | text | YES | — | |
| created_at | text | NO | — | ISO 8601 |
| updated_at | text | NO | — | ISO 8601 |

---

### race_categories

| カラム | 型 | NULL | デフォルト | 備考 |
|---|---|---|---|---|
| id | integer | NO | autoincrement | PK |
| race_id | text | NO | — | FK → races.id（CASCADE） |
| distance_type | text | NO | — | `full` / `half` / `10k` 等 |
| distance_km | real | NO | — | |
| time_limit_minutes | integer | NO | `0` | |
| start_time | text | NO | `""` | `HH:MM` |
| capacity | integer | NO | `0` | |
| entry_fee | integer | YES | — | null = 親レースと同じ |
| entry_fee_u25 | integer | YES | — | 25歳以下割引料金 |
| name_ja | text | YES | — | |
| name_en | text | YES | — | |
| description_ja | text | YES | — | |
| description_en | text | YES | — | |
| eligibility_ja | text | YES | — | 参加資格（例: `"20歳以上の男女"`） |
| eligibility_en | text | YES | — | |
| course_gpx_file | text | YES | — | カテゴリ別GPXファイル名（例: `"nagano-marathon-2026-full.gpx"`） |
| waves | text | NO | `"[]"` | JSON: `Wave[]` |
| sort_order | integer | NO | `0` | |

---

### aid_stations

| カラム | 型 | NULL | デフォルト | 備考 |
|---|---|---|---|---|
| id | integer | NO | autoincrement | PK |
| race_id | text | NO | — | FK → races.id（CASCADE） |
| distance_km | real | NO | — | |
| offerings_ja | text | NO | `""` | |
| offerings_en | text | NO | `""` | |
| is_featured | integer(bool) | NO | `false` | 注目エイドかどうか |

---

### checkpoints

| カラム | 型 | NULL | デフォルト | 備考 |
|---|---|---|---|---|
| id | integer | NO | autoincrement | PK |
| race_id | text | NO | — | FK → races.id（CASCADE） |
| distance_km | real | NO | — | |
| closing_time | text | NO | — | `HH:MM` |

---

### access_points

| カラム | 型 | NULL | デフォルト | 備考 |
|---|---|---|---|---|
| id | integer | NO | autoincrement | PK |
| race_id | text | NO | — | FK → races.id（CASCADE） |
| station_name_ja | text | NO | — | |
| station_name_en | text | NO | `""` | |
| station_code | text | NO | `""` | |
| transport_to_venue_ja | text | NO | `""` | |
| transport_to_venue_en | text | NO | `""` | |
| latitude | real | NO | `0` | |
| longitude | real | NO | `0` | |
| sort_order | integer | NO | `0` | |

---

### nearby_spots

| カラム | 型 | NULL | デフォルト | 備考 |
|---|---|---|---|---|
| id | integer | NO | autoincrement | PK |
| race_id | text | NO | — | FK → races.id（CASCADE） |
| type | text | NO | — | `観光地` / `温泉` / `グルメ` / `宿泊`（日本語文字列） |
| name_ja | text | NO | — | |
| name_en | text | NO | `""` | |
| description_ja | text | NO | `""` | |
| description_en | text | NO | `""` | |
| distance_from_venue | text | NO | `""` | |
| url | text | YES | — | |
| latitude | real | NO | `0` | |
| longitude | real | NO | `0` | |

---

### weather_history

| カラム | 型 | NULL | デフォルト | 備考 |
|---|---|---|---|---|
| id | integer | NO | autoincrement | PK |
| race_id | text | NO | — | FK → races.id（CASCADE） |
| year | integer | NO | — | |
| avg_temp | real | NO | `0` | ℃ |
| max_temp | real | NO | `0` | ℃ |
| min_temp | real | NO | `0` | ℃ |
| humidity_pct | real | NO | `0` | % |
| precipitation_mm | real | NO | `0` | mm |
| wind_speed_ms | real | NO | `0` | m/s |

---

### participation_gifts

| カラム | 型 | NULL | デフォルト | 備考 |
|---|---|---|---|---|
| id | integer | NO | autoincrement | PK |
| race_id | text | NO | — | FK → races.id（CASCADE） |
| gift_categories | text | NO | `"[]"` | JSON: `GiftCategoryId[]` |
| description_ja | text | NO | `""` | |
| description_en | text | NO | `""` | |
| image | text | YES | — | |
| sort_order | integer | NO | `0` | |

---

### race_series

| カラム | 型 | NULL | デフォルト | 備考 |
|---|---|---|---|---|
| id | text | NO | — | PK。例: `nagano-marathon` |
| name_ja | text | NO | — | 例: `長野マラソン` |
| name_en | text | NO | — | 例: `Nagano Marathon` |
| first_held_year | integer | YES | — | 初開催年 |
| website_url | text | YES | — | |

> シリーズIDは `races.id` の末尾 `-YYYY` を除去して導出（外部キー列なし）。
> `getSeriesRaces()` は `races.id LIKE 'seriesId-%'` でLIKEクエリを使用。

---

### race_results

| カラム | 型 | NULL | デフォルト | 備考 |
|---|---|---|---|---|
| id | integer | NO | autoincrement | PK |
| race_id | text | NO | — | FK → races.id（CASCADE） |
| participants_count | integer | YES | — | |
| finishers_count | integer | YES | — | |
| finisher_rate_pct | real | YES | — | % |
| weather_condition_ja | text | NO | `""` | |
| weather_condition_en | text | NO | `""` | |
| temperature_c | real | YES | — | 平均気温 ℃ |
| max_temp_c | real | YES | — | 最高気温 ℃ |
| min_temp_c | real | YES | — | 最低気温 ℃ |
| wind_speed_ms | real | YES | — | m/s |
| humidity_pct | real | YES | — | % |
| notes_ja | text | YES | — | |
| notes_en | text | YES | — | |

---

### gift_categories（マスター）

| カラム | 型 | NULL | 備考 |
|---|---|---|---|
| id | text | NO | PK。例: `medal` / `tshirt` / `certificate` 等 |
| name_ja | text | NO | |
| name_en | text | NO | |
| icon | text | NO | 絵文字 |

---

### prefectures（マスター）

| カラム | 型 | NULL | 備考 |
|---|---|---|---|
| code | text | NO | PK。JISコード（例: `"13"`） |
| name | text | NO | 都道府県名（日本語） |
| name_en | text | NO | |
| region | text | NO | 地方名（日本語） |
| region_en | text | NO | |
| lat | real | NO | 代表座標（緯度） |
| lng | real | NO | 代表座標（経度） |

---

---

### race_entry_links

| カラム | 型 | NULL | デフォルト | 備考 |
|---|---|---|---|---|
| id | integer | NO | autoincrement | PK |
| race_id | text | NO | — | FK → races.id（CASCADE） |
| site_name | text | NO | — | "RUNNET", "SPORT ENTRY" 等 |
| url | text | NO | — | |
| sort_order | integer | NO | `0` | |

---

## インデックス一覧

| テーブル | インデックス名 | カラム |
|---|---|---|
| races | races_date_idx | date |
| races | races_prefecture_idx | prefecture |
| race_categories | race_categories_race_id_idx | race_id |
| race_entry_links | race_entry_links_race_id_idx | race_id |
| aid_stations | aid_stations_race_id_idx | race_id |
| checkpoints | checkpoints_race_id_idx | race_id |
| access_points | access_points_race_id_idx | race_id |
| nearby_spots | nearby_spots_race_id_idx | race_id |
| weather_history | weather_history_race_id_idx | race_id |
| participation_gifts | participation_gifts_race_id_idx | race_id |
| race_results | race_results_race_id_idx | race_id |
| user_races | user_races_user_id_idx | user_id |
| user_races | user_races_race_id_idx | race_id |
| user_races | user_races_user_race_idx | user_id, race_id |

---

## user_races テーブル

ユーザーと大会の登録情報（参加予定・エントリー期間別リマインド）を管理する。

| カラム | 型 | NULL | 備考 |
|---|---|---|---|
| id | text | NO | PK（UUID） |
| user_id | text | NO | FK → user.id（CASCADE） |
| race_id | text | NO | FK → races.id（CASCADE） |
| is_planning | integer(boolean) | NO | 参加予定フラグ |
| planning_category_id | integer | YES | FK → race_categories.id（SET NULL）。参加予定カテゴリ |
| entry_reminder_period_ids | text | NO | エントリーリマインド対象の entry_period id 一覧（JSON: number[]、デフォルト "[]"） |
| created_at | text | NO | ISO8601 |
| updated_at | text | NO | ISO8601 |

**備考**
- `is_planning` と `entry_reminder_period_ids` はそれぞれ独立して設定可能
- カテゴリが1種のみの大会では `planning_category_id` は自動的にそのカテゴリに設定
- カテゴリが複数の場合はドロップダウンで選択
- `entry_reminder_period_ids` は `race_entry_periods.id` の配列。エントリー期間ごとに個別に ON/OFF 可能
- カレンダー連携は Google Calendar URL スキームで行う（OAuth 不要）。登録時に新タブで GCal イベント作成画面を開く

---

## contact_submissions テーブル

お問い合わせ送信データを保存する。

| カラム | 型 | NULL | デフォルト | 備考 |
|---|---|---|---|---|
| id | integer | NO | autoincrement | PK |
| name | text | NO | — | 送信者名 |
| email | text | NO | — | 送信者メールアドレス |
| category | text | NO | — | `race_error` / `race_suggestion` / `site_bug` / `other` |
| message | text | NO | — | 本文（10〜5000文字） |
| user_id | text | YES | — | FK → user.id（SET NULL）。ログイン済みユーザーのみ |
| status | text | NO | `"pending"` | `pending` / `in_progress` / `resolved` |
| created_at | text | NO | — | ISO8601 |

**インデックス**
- `contact_submissions_status_idx` → status
- `contact_submissions_created_at_idx` → created_at

---

## マイグレーション履歴

| ファイル | 内容 |
|---|---|
| `migrations/0000_initial.sql` | 初期スキーマ（races, categories, aid_stations, checkpoints, access_points, nearby_spots, weather_history, participation_gifts, gift_categories, prefectures） |
| `migrations/0001_entry_dates_nullable.sql` | entry_start_date / entry_end_date を NULL 許容に変更 |
| `migrations/0002_race_series_results.sql` | race_series / race_results テーブルを追加 |
| `migrations/0003_race_full_name_edition.sql` | races に full_name_ja / full_name_en / edition カラムを追加 |
| `migrations/0002_lyrical_korath.sql` | user_races テーブルを追加（Phase 2: 参加予定・受付開始前日リマインド） |
| `migrations/0003_sloppy_jack_power.sql` | user_races に planning_category_id / entry_reminder_period_ids を追加、entry_reminder / gcal_entry_event_id を削除 |
| `migrations/0004_complex_justin_hammer.sql` | user_races から gcal_race_event_id / gcal_entry_event_ids を削除 |
| `migrations/0005_boring_corsair.sql` | contact_submissions テーブルを追加 |
| `migrations/0006_entry_info.sql` | races に entry_closed、race_categories に eligibility_ja/en、race_entry_links テーブルを追加（Issue #37） |
| `migrations/0007_category_gpx.sql` | race_categories に course_gpx_file カラムを追加 |
