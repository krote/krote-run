import { sqliteTable, text, integer, real, index } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

// ==================
// races
// ==================

export const races = sqliteTable("races", {
  id:                    text("id").primaryKey(),
  name_ja:               text("name_ja").notNull(),
  name_en:               text("name_en").notNull(),
  series_id:             text("series_id").references(() => race_series.id), // シリーズFK
  full_name_ja:          text("full_name_ja"),             // 回次・年号入り正式名称（任意）
  full_name_en:          text("full_name_en"),
  edition:               integer("edition"),               // 開催回次（任意）
  date:                  text("date").notNull(),           // "YYYY-MM-DD"
  prefecture:            text("prefecture").notNull(),     // JIS コード e.g. "13"
  city_ja:               text("city_ja").notNull(),
  city_en:               text("city_en").notNull(),
  description_ja:        text("description_ja").notNull().default(""),
  description_en:        text("description_en").notNull().default(""),
  official_url:          text("official_url").notNull().default(""),
  entry_fee:             integer("entry_fee"),             // null = カテゴリ別
  entry_fee_by_category: integer("entry_fee_by_category", { mode: "boolean" }).notNull().default(false),
  entry_capacity:        integer("entry_capacity").notNull().default(0),
  entry_start_date:      text("entry_start_date"),
  entry_end_date:        text("entry_end_date"),
  reception_type:        text("reception_type").notNull().default("race_day"),
  reception_note_ja:     text("reception_note_ja").notNull().default(""),
  reception_note_en:     text("reception_note_en").notNull().default(""),
  tags:                  text("tags").notNull().default("[]"),         // JSON: string[]
  course_gpx_file:       text("course_gpx_file"),
  // course_info フラット化
  course_max_elevation_m:  real("course_max_elevation_m").notNull().default(0),
  course_min_elevation_m:  real("course_min_elevation_m").notNull().default(0),
  course_elevation_diff_m: real("course_elevation_diff_m").notNull().default(0),
  course_surface:          text("course_surface").notNull().default("road"),
  course_certification:    text("course_certification").notNull().default("[]"), // JSON: string[]
  course_highlights_ja:    text("course_highlights_ja").notNull().default(""),
  course_highlights_en:    text("course_highlights_en").notNull().default(""),
  course_notes_ja:         text("course_notes_ja"),
  course_notes_en:         text("course_notes_en"),
  created_at:            text("created_at").notNull(),
  updated_at:            text("updated_at").notNull(),
}, (t) => [
  index("races_date_idx").on(t.date),
  index("races_prefecture_idx").on(t.prefecture),
]);

// ==================
// race_categories
// ==================

export const race_categories = sqliteTable("race_categories", {
  id:                integer("id").primaryKey({ autoIncrement: true }),
  race_id:           text("race_id").notNull().references(() => races.id, { onDelete: "cascade" }),
  distance_type:     text("distance_type").notNull(),
  distance_km:       real("distance_km").notNull(),
  time_limit_minutes:integer("time_limit_minutes").notNull().default(0),
  start_time:        text("start_time").notNull().default(""),
  capacity:          integer("capacity").notNull().default(0),
  entry_fee:         integer("entry_fee"),
  entry_fee_u25:     integer("entry_fee_u25"),
  name_ja:           text("name_ja"),
  name_en:           text("name_en"),
  description_ja:    text("description_ja"),
  description_en:    text("description_en"),
  waves:             text("waves").notNull().default("[]"), // JSON: Wave[]
  sort_order:        integer("sort_order").notNull().default(0),
}, (t) => [
  index("race_categories_race_id_idx").on(t.race_id),
]);

// ==================
// aid_stations
// ==================

export const aid_stations = sqliteTable("aid_stations", {
  id:            integer("id").primaryKey({ autoIncrement: true }),
  race_id:       text("race_id").notNull().references(() => races.id, { onDelete: "cascade" }),
  distance_km:   real("distance_km").notNull(),
  offerings_ja:  text("offerings_ja").notNull().default(""),
  offerings_en:  text("offerings_en").notNull().default(""),
  is_featured:   integer("is_featured", { mode: "boolean" }).notNull().default(false),
}, (t) => [
  index("aid_stations_race_id_idx").on(t.race_id),
]);

// ==================
// checkpoints
// ==================

export const checkpoints = sqliteTable("checkpoints", {
  id:           integer("id").primaryKey({ autoIncrement: true }),
  race_id:      text("race_id").notNull().references(() => races.id, { onDelete: "cascade" }),
  distance_km:  real("distance_km").notNull(),
  closing_time: text("closing_time").notNull(),
}, (t) => [
  index("checkpoints_race_id_idx").on(t.race_id),
]);

// ==================
// access_points
// ==================

export const access_points = sqliteTable("access_points", {
  id:                    integer("id").primaryKey({ autoIncrement: true }),
  race_id:               text("race_id").notNull().references(() => races.id, { onDelete: "cascade" }),
  station_name_ja:       text("station_name_ja").notNull(),
  station_name_en:       text("station_name_en").notNull().default(""),
  station_code:          text("station_code").notNull().default(""),
  transport_to_venue_ja: text("transport_to_venue_ja").notNull().default(""),
  transport_to_venue_en: text("transport_to_venue_en").notNull().default(""),
  latitude:              real("latitude").notNull().default(0),
  longitude:             real("longitude").notNull().default(0),
  sort_order:            integer("sort_order").notNull().default(0),
}, (t) => [
  index("access_points_race_id_idx").on(t.race_id),
]);

// ==================
// nearby_spots
// ==================

export const nearby_spots = sqliteTable("nearby_spots", {
  id:                   integer("id").primaryKey({ autoIncrement: true }),
  race_id:              text("race_id").notNull().references(() => races.id, { onDelete: "cascade" }),
  type:                 text("type").notNull(),
  name_ja:              text("name_ja").notNull(),
  name_en:              text("name_en").notNull().default(""),
  description_ja:       text("description_ja").notNull().default(""),
  description_en:       text("description_en").notNull().default(""),
  distance_from_venue:  text("distance_from_venue").notNull().default(""),
  url:                  text("url"),
  latitude:             real("latitude").notNull().default(0),
  longitude:            real("longitude").notNull().default(0),
}, (t) => [
  index("nearby_spots_race_id_idx").on(t.race_id),
]);

// ==================
// weather_history
// ==================

export const weather_history = sqliteTable("weather_history", {
  id:               integer("id").primaryKey({ autoIncrement: true }),
  race_id:          text("race_id").notNull().references(() => races.id, { onDelete: "cascade" }),
  year:             integer("year").notNull(),
  avg_temp:         real("avg_temp").notNull().default(0),
  max_temp:         real("max_temp").notNull().default(0),
  min_temp:         real("min_temp").notNull().default(0),
  humidity_pct:     real("humidity_pct").notNull().default(0),
  precipitation_mm: real("precipitation_mm").notNull().default(0),
  wind_speed_ms:    real("wind_speed_ms").notNull().default(0),
}, (t) => [
  index("weather_history_race_id_idx").on(t.race_id),
]);

// ==================
// participation_gifts
// ==================

export const participation_gifts = sqliteTable("participation_gifts", {
  id:              integer("id").primaryKey({ autoIncrement: true }),
  race_id:         text("race_id").notNull().references(() => races.id, { onDelete: "cascade" }),
  gift_categories: text("gift_categories").notNull().default("[]"), // JSON: GiftCategoryId[]
  description_ja:  text("description_ja").notNull().default(""),
  description_en:  text("description_en").notNull().default(""),
  image:           text("image"),
  sort_order:      integer("sort_order").notNull().default(0),
}, (t) => [
  index("participation_gifts_race_id_idx").on(t.race_id),
]);

// ==================
// race_series (シリーズマスタ)
// ==================

export const race_series = sqliteTable("race_series", {
  id:              text("id").primaryKey(),          // e.g. "nagano-marathon"
  name_ja:         text("name_ja").notNull(),         // "長野マラソン"
  name_en:         text("name_en").notNull(),         // "Nagano Marathon"
  first_held_year: integer("first_held_year"),        // 初開催年
  website_url:     text("website_url"),
});

// ==================
// race_results (各年の実績)
// ==================

export const race_results = sqliteTable("race_results", {
  id:                   integer("id").primaryKey({ autoIncrement: true }),
  race_id:              text("race_id").notNull().references(() => races.id, { onDelete: "cascade" }),
  participants_count:   integer("participants_count"),
  finishers_count:      integer("finishers_count"),
  finisher_rate_pct:    real("finisher_rate_pct"),
  weather_condition_ja: text("weather_condition_ja").notNull().default(""),
  weather_condition_en: text("weather_condition_en").notNull().default(""),
  temperature_c:        real("temperature_c"),
  max_temp_c:           real("max_temp_c"),
  min_temp_c:           real("min_temp_c"),
  wind_speed_ms:        real("wind_speed_ms"),
  humidity_pct:         real("humidity_pct"),
  notes_ja:             text("notes_ja"),
  notes_en:             text("notes_en"),
}, (t) => [
  index("race_results_race_id_idx").on(t.race_id),
]);

// ==================
// gift_categories (マスターデータ)
// ==================

export const gift_categories = sqliteTable("gift_categories", {
  id:      text("id").primaryKey(),
  name_ja: text("name_ja").notNull(),
  name_en: text("name_en").notNull(),
  icon:    text("icon").notNull(),
});

// ==================
// prefectures (マスターデータ)
// ==================

export const prefectures = sqliteTable("prefectures", {
  code:      text("code").primaryKey(),
  name:      text("name").notNull(),
  name_en:   text("name_en").notNull(),
  region:    text("region").notNull(),
  region_en: text("region_en").notNull(),
  lat:       real("lat").notNull(),
  lng:       real("lng").notNull(),
});

// ==================
// Relations
// ==================

export const racesRelations = relations(races, ({ many, one }) => ({
  categories:          many(race_categories),
  aid_stations:        many(aid_stations),
  checkpoints:         many(checkpoints),
  access_points:       many(access_points),
  nearby_spots:        many(nearby_spots),
  weather_history:     many(weather_history),
  participation_gifts: many(participation_gifts),
  result:              one(race_results, { fields: [races.id], references: [race_results.race_id] }),
}));

export const raceResultsRelations = relations(race_results, ({ one }) => ({
  race: one(races, { fields: [race_results.race_id], references: [races.id] }),
}));

export const raceCategoriesRelations = relations(race_categories, ({ one }) => ({
  race: one(races, { fields: [race_categories.race_id], references: [races.id] }),
}));

export const aidStationsRelations = relations(aid_stations, ({ one }) => ({
  race: one(races, { fields: [aid_stations.race_id], references: [races.id] }),
}));

export const checkpointsRelations = relations(checkpoints, ({ one }) => ({
  race: one(races, { fields: [checkpoints.race_id], references: [races.id] }),
}));

export const accessPointsRelations = relations(access_points, ({ one }) => ({
  race: one(races, { fields: [access_points.race_id], references: [races.id] }),
}));

export const nearbySpotRelations = relations(nearby_spots, ({ one }) => ({
  race: one(races, { fields: [nearby_spots.race_id], references: [races.id] }),
}));

export const weatherHistoryRelations = relations(weather_history, ({ one }) => ({
  race: one(races, { fields: [weather_history.race_id], references: [races.id] }),
}));

export const participationGiftsRelations = relations(participation_gifts, ({ one }) => ({
  race: one(races, { fields: [participation_gifts.race_id], references: [races.id] }),
}));
