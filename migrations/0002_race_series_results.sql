-- race_series: シリーズ（年をまたぐ大会の共通情報）
CREATE TABLE IF NOT EXISTS `race_series` (
  `id`              TEXT PRIMARY KEY,
  `name_ja`         TEXT NOT NULL,
  `name_en`         TEXT NOT NULL,
  `first_held_year` INTEGER,
  `website_url`     TEXT
);

-- race_results: 各年の大会実績（参加者数・完走者数・当日天気等）
CREATE TABLE IF NOT EXISTS `race_results` (
  `id`                   INTEGER PRIMARY KEY AUTOINCREMENT,
  `race_id`              TEXT NOT NULL REFERENCES `races`(`id`) ON DELETE CASCADE,
  `participants_count`   INTEGER,
  `finishers_count`      INTEGER,
  `finisher_rate_pct`    REAL,
  `weather_condition_ja` TEXT NOT NULL DEFAULT '',
  `weather_condition_en` TEXT NOT NULL DEFAULT '',
  `temperature_c`        REAL,
  `max_temp_c`           REAL,
  `min_temp_c`           REAL,
  `wind_speed_ms`        REAL,
  `humidity_pct`         REAL,
  `notes_ja`             TEXT,
  `notes_en`             TEXT
);

CREATE INDEX IF NOT EXISTS `race_results_race_id_idx` ON `race_results`(`race_id`);
