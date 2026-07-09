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
| motif | text | YES | — | デザインモチーフ語（英字）。例: `"SAKURA"` |
| motif_color | text | YES | — | モチーフカラー（CSS値）。例: `"#c0392b"` |
| motif_romaji | text | YES | — | モチーフのローマ字表記。例: `"Sakura"` |
| tagline_ja | text | YES | — | カードに表示する短いキャッチフレーズ（日本語） |
| tagline_en | text | YES | — | カードに表示する短いキャッチフレーズ（英語） |
| hero_image_url | text | YES | — | ヒーロー画像パス。例: `/images/races/nagano-marathon-2026-hero.jpg` |
| hero_caption_ja | text | YES | — | ヒーロー画像キャプション（日本語） |
| hero_caption_en | text | YES | — | ヒーロー画像キャプション（英語） |
| venue_name_ja | text | YES | — | スタート地点名称（例: `"神戸市役所前"`）。Issue #80 |
| venue_name_en | text | YES | — | |
| venue_address | text | YES | — | ジオコーディング・経路検索の宛先。Issue #80 |
| start_lat | real | YES | — | スタート地点緯度。Issue #80 |
| start_lng | real | YES | — | スタート地点経度。Issue #80 |
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
| walk_minutes | integer | YES | — | 駅から会場までの徒歩分数。Issue #80 |
| is_primary | integer(bool) | NO | `false` | 代表最寄駅フラグ（前泊判定・旅程で使用）。Issue #80 |
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

### completion_gifts

| カラム | 型 | NULL | デフォルト | 備考 |
|---|---|---|---|---|
| id | integer | NO | autoincrement | PK |
| race_id | text | NO | — | FK → races.id（CASCADE） |
| gift_categories | text | NO | `"[]"` | JSON: `GiftCategoryId[]` |
| description_ja | text | NO | `""` | |
| description_en | text | NO | `""` | |
| image | text | YES | — | |
| sort_order | integer | NO | `0` | |

> `participation_gifts` と同構造。`medal` など完走者のみ受け取れる賞を格納する。

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
| avg_time | text | YES | — | 平均フィニッシュタイム。例: `"4:42:18"` |

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
| user_gear | user_gear_user_id_idx | user_id |
| user_race_gear | user_race_gear_user_race_id_idx | user_race_id |
| user_race_gear | user_race_gear_unique_idx（unique） | user_race_id, gear_id |
| user_race_results | user_race_results_user_race_id_idx | user_race_id |

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
| gear_is_public | integer(bool) | NO | 装備リストを公開するかどうか（デフォルト false）。Issue #120 |
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

## race_gallery テーブル

大会の見どころ画像ギャラリー。

| カラム | 型 | NULL | デフォルト | 備考 |
|---|---|---|---|---|
| id | integer | NO | autoincrement | PK |
| race_id | text | NO | — | FK → races.id（CASCADE） |
| src | text | NO | — | 画像パス or URL |
| caption_ja | text | YES | — | |
| caption_en | text | YES | — | |
| sort_order | integer | NO | `0` | |

---

## race_voices テーブル

参加者の声（前回の様子セクション）。

| カラム | 型 | NULL | デフォルト | 備考 |
|---|---|---|---|---|
| id | integer | NO | autoincrement | PK |
| race_id | text | NO | — | FK → races.id（CASCADE） |
| quote_ja | text | NO | — | 引用テキスト（日本語） |
| quote_en | text | YES | — | 引用テキスト（英語）。未設定時は quote_ja にフォールバック |
| author | text | YES | — | 発言者名（例: `"40代男性"`） |
| sort_order | integer | NO | `0` | |

---

## race_time_buckets テーブル

フィニッシャーのタイム分布（棒グラフ表示用）。

| カラム | 型 | NULL | デフォルト | 備考 |
|---|---|---|---|---|
| id | integer | NO | autoincrement | PK |
| race_id | text | NO | — | FK → races.id（CASCADE） |
| bucket | text | NO | — | タイム帯ラベル（例: `"3:30–4:00"`） |
| pct | real | NO | — | 割合 (0–100) |
| sort_order | integer | NO | `0` | |

---

## race_course_highlights テーブル

コース上の見どころポイント。

| カラム | 型 | NULL | デフォルト | 備考 |
|---|---|---|---|---|
| id | integer | NO | autoincrement | PK |
| race_id | text | NO | — | FK → races.id（CASCADE） |
| category_id | integer | YES | — | FK → race_categories.id（CASCADE） |
| km | real | YES | — | 地点（km） |
| name_ja | text | NO | — | スポット名（日本語） |
| name_en | text | YES | — | スポット名（英語） |
| note_ja | text | YES | — | 説明（日本語） |
| note_en | text | YES | — | 説明（英語） |
| sort_order | integer | NO | `0` | |

---

## user_gear テーブル

ユーザーが所持するギア（シューズ・ウェア・栄養補給品など）のマスター。

| カラム | 型 | NULL | デフォルト | 備考 |
|---|---|---|---|---|
| id | text | NO | — | PK（UUID） |
| user_id | text | NO | — | FK → user.id（CASCADE） |
| category | text | NO | — | `GearCategory`（shoes / tops / bottoms 等 12種） |
| brand | text | NO | `""` | ブランド名 |
| name | text | NO | — | 商品名 |
| amazon_url | text | YES | — | Amazon商品URL |
| asin | text | YES | — | Amazon ASIN |
| usage_tag | text | NO | — | `race` / `training` / `both` |
| memo | text | NO | `""` | メモ |
| is_retired | integer(bool) | NO | `false` | 引退フラグ |
| created_at | text | NO | — | ISO8601 |
| updated_at | text | NO | — | ISO8601 |

---

## user_race_gear テーブル

ユーザーの大会登録（user_races）に紐付くギアリスト。

| カラム | 型 | NULL | デフォルト | 備考 |
|---|---|---|---|---|
| id | integer | NO | autoincrement | PK |
| user_race_id | text | NO | — | FK → user_races.id（CASCADE） |
| gear_id | text | NO | — | FK → user_gear.id（CASCADE） |
| quantity | integer | NO | `1` | 持参予定数量 |
| used | integer(bool) | YES | — | NULL=未記録 / true=使用 / false=未使用 |
| used_quantity | integer | YES | — | 実際に使用した数量 |
| note | text | NO | `""` | メモ |
| sort_order | integer | NO | `0` | 表示順 |

**備考**
- `(user_race_id, gear_id)` に unique 制約あり（同一大会に同じギアを重複登録不可）

---

## user_race_results テーブル

ユーザーの大会結果（自己記録）。user_races と 1:1 対応。

| カラム | 型 | NULL | デフォルト | 備考 |
|---|---|---|---|---|
| id | text | NO | — | PK（UUID） |
| user_race_id | text | NO | — | FK → user_races.id（CASCADE）。UNIQUE |
| category_id | integer | YES | — | FK → race_categories.id（SET NULL）。参加カテゴリ |
| status | text | NO | — | `finished` / `dnf` / `dns` |
| finish_time_sec | integer | YES | — | フィニッシュタイム（秒）。DNF/DNS 時は null |
| note | text | NO | `""` | 振り返りメモ |
| created_at | text | NO | — | ISO8601 |
| updated_at | text | NO | — | ISO8601 |

---

## reception_sessions テーブル

受付セッション（Issue #85）。1大会が複数日程の受付を持つ場合に対応。
`reception_type` が `both` や `race_day` の場合に大会当日の session を持つ。

| カラム | 型 | NULL | デフォルト | 備考 |
|---|---|---|---|---|
| id | integer | NO | AUTOINCREMENT | PK |
| race_id | text | NO | — | FK → races.id（CASCADE） |
| date | text | NO | — | YYYY-MM-DD。大会当日と同日なら当日受付 |
| open_time | text | YES | — | HH:MM（不明なら NULL） |
| close_time | text | YES | — | HH:MM（不明なら NULL） |
| location_ja | text | NO | `""` | 受付場所名称（日本語） |
| location_en | text | NO | `""` | 受付場所名称（英語） |
| note_ja | text | NO | `""` | 注記（日本語） |
| note_en | text | NO | `""` | 注記（英語） |
| sort_order | integer | NO | 0 | 表示順 |

**インデックス**:
- `reception_sessions_race_id_idx` (race_id)
- `reception_sessions_race_id_date_uidx` (race_id, date) — UNIQUE（同一大会の同日受付重複を防止）

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
| `migrations/0008_phase2_motif_hero.sql` | races に motif/motif_color/motif_romaji/tagline_ja/tagline_en/hero_image_url/hero_caption_ja/hero_caption_en を追加、race_results に avg_time を追加（Issue #42 Design Phase 2） |
| `migrations/0009_phase3_gallery_voices.sql` | race_gallery / race_voices / race_time_buckets / race_course_highlights テーブルを追加（Issue #43 Design Phase 3） |
| `migrations/0008_stormy_reavers.sql` | race_voices に quote_en カラムを追加（英語対応） |
| `migrations/0007_yielding_obadiah_stane.sql` | race_course_highlights に category_id カラムを追加（FK ON DELETE 句なし ← 0010 で修正） |
| `migrations/0010_fix_course_highlights_fk.sql` | race_course_highlights.category_id FK を ON DELETE CASCADE に修正（schema.ts との整合） |
| `migrations/0009_shallow_captain_stacy.sql` | completion_gifts テーブルを追加（Issue #73）。medal 等の完走賞を participation_gifts から分離 |
| `migrations/0010_loving_mister_fear.sql` | race_entry_periods.end_date の NOT NULL 制約を削除（終了日未定のエントリー期間を許容） |
| `migrations/0011_parallel_winter_soldier.sql` | races に venue_name_ja/venue_name_en/venue_address/start_lat/start_lng を追加。access_points に walk_minutes/is_primary を追加（Issue #80） |
| `migrations/0012_fearless_sleeper.sql` | access_points に partial unique index を追加（race_id + is_primary=1 の組み合わせを一意制約）（Issue #80） |
| `migrations/0013_old_rick_jones.sql` | user_gear / user_race_gear / user_race_results テーブルを追加。user_races に gear_is_public カラムを追加（Issue #120） |
| `migrations/0014_lowly_mentallo.sql` | reception_sessions テーブルを追加（Issue #85）。受付セッションの構造化対応 |
| `migrations/0015_simple_agent_zero.sql` | reception_sessions に (race_id, date) の UNIQUE インデックスを追加（同日受付重複防止） |
