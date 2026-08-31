-- 自動生成: generate-seed-races.js
-- 生成日時: 2026-08-31T14:54:37.731Z
-- 対象ファイル数: 125 件（既存 2 件はskip）

-- ==================
-- オホーツク網走マラソン (abashiri-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'abashiri-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'abashiri-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'abashiri-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'abashiri-marathon-2026';
DELETE FROM access_points WHERE race_id = 'abashiri-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'abashiri-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'abashiri-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'abashiri-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'abashiri-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'abashiri-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'abashiri-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'abashiri-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'abashiri-marathon-2026';
DELETE FROM race_results WHERE race_id = 'abashiri-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'abashiri-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'abashiri-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'abashiri-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'abashiri-marathon-2026',
  'オホーツク網走マラソン',
  'Okhotsk Abashiri Marathon',
  '2026-09-27',
  '01',
  '北海道網走市',
  'Abashiri, Hokkaido',
  '',
  '',
  'https://www.abashiri-marathon.jp/',
  12000,
  1,
  3000,
  '2026-04-01',
  '2026-07-16',
  0,
  'pre_mail',
  '一般エントリーはナンバーカードセット一式を大会2週間前を目安に事前発送。海外エントリーのみ前日（9月26日13:00～17:00）に受付。',
  'General entries receive their bib number set by mail about two weeks before the event. Only overseas entries check in the day before (Sep 26, 13:00-17:00).',
  '[]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  'オホーツク海を望む絶景コース。能取岬の断崖ギリギリを走る区間や能取湖畔、フィニッシュ地点の大曲湖畔園地のひまわり畑が見どころ。',
  'A scenic course along the Sea of Okhotsk, running along the cliffs of Notoro Cape and beside Lake Notoro, finishing amid the sunflower fields of Ohmagari Lakeside Park.',
  '関門：能取岬14.4km地点2時間20分、レイクサイドパークのとろ29km地点4時間25分、オホーツクサイクリングロード入口35km地点5時間20分（制限時間6時間30分）。',
  'Cutoffs: Notoro Cape (14.4km) 2h20m, Lakeside Park Notoro (29km) 4h25m, Okhotsk Cycling Road entrance (35km) 5h20m (overall time limit 6h30m).',
  '流氷',
  '#bfdbfe',
  'Ryuhyo',
  '流氷の大地を駆け抜ける春の42km',
  'Run through the land of drift ice in spring',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '2026-03-29T11:38:18.538Z',
  '2026-08-24T16:08:58.721Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('abashiri-marathon-2026', 'full', 42.195, 390, '08:45', 2600, 12000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('abashiri-marathon-2026', '["goods"]', 'YAMAtune製オリジナルソックス、ランニンググローブ、おもてなしブース飲食券', '', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('abashiri-marathon-2026', '["medal"]', 'YAMAtune製オリジナルソックス、ランニンググローブ、おもてなしブース飲食券', '', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('abashiri-marathon-2026', NULL, '一般エントリー', 'General Entry', '2026-04-01', '2026-07-16', 12000, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('abashiri-marathon-2026', NULL, 'ふるさと寄附エントリー（マラソンの部）', 'Furusato Donation Entry (Marathon)', '2026-04-01', '2026-05-31', 45000, 1);

-- ==================
-- あいの土山マラソン (ainotuchiyama-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'ainotuchiyama-2026';
DELETE FROM race_categories WHERE race_id = 'ainotuchiyama-2026';
DELETE FROM aid_stations WHERE race_id = 'ainotuchiyama-2026';
DELETE FROM checkpoints WHERE race_id = 'ainotuchiyama-2026';
DELETE FROM access_points WHERE race_id = 'ainotuchiyama-2026';
DELETE FROM nearby_spots WHERE race_id = 'ainotuchiyama-2026';
DELETE FROM weather_history WHERE race_id = 'ainotuchiyama-2026';
DELETE FROM participation_gifts WHERE race_id = 'ainotuchiyama-2026';
DELETE FROM completion_gifts WHERE race_id = 'ainotuchiyama-2026';
DELETE FROM race_entry_links WHERE race_id = 'ainotuchiyama-2026';
DELETE FROM race_entry_periods WHERE race_id = 'ainotuchiyama-2026';
DELETE FROM reception_sessions WHERE race_id = 'ainotuchiyama-2026';
DELETE FROM race_travel_times WHERE race_id = 'ainotuchiyama-2026';
DELETE FROM race_results WHERE race_id = 'ainotuchiyama-2026';
DELETE FROM race_gallery WHERE race_id = 'ainotuchiyama-2026';
DELETE FROM race_voices WHERE race_id = 'ainotuchiyama-2026';
DELETE FROM race_time_buckets WHERE race_id = 'ainotuchiyama-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'ainotuchiyama-2026',
  'あいの土山マラソン',
  'Aino Tsuchiyama Marathon',
  '2026-11-01',
  '25',
  '甲賀市土山町',
  'Tsuchiyama, Koka',
  '滋賀県甲賀市土山町で開催されるマラソン大会。日本陸連公認のフルマラソンをはじめ、ハーフマラソン、キッズ2.195kmの3種目を実施。旧東海道の宿場町として知られる土山を舞台に、自然豊かな甲賀の山々を望みながら走る。',
  'A marathon event held in Tsuchiyama, Koka City, Shiga Prefecture. Featuring a JAAF-certified full marathon, half marathon, and a Kids 2.195km category. Runners race through Tsuchiyama, a historic post town on the old Tokaido highway, with views of the lush mountains of Koka.',
  'https://www.ac-koka.jp/marathon/index.html',
  7000,
  1,
  4000,
  '2026-06-14',
  '2026-08-10',
  0,
  'pre_mail',
  'マラソン・ハーフマラソンは当日受付なし。アスリートビブスは事前に郵送。キッズ2.195は当日8:00〜10:00に出場承諾書と引き換えでビブスを受け取り',
  'No same-day reception for marathon/half marathon; bibs are mailed in advance. Kids 2.195km bibs distributed 8:00-10:00 on race day in exchange for the participation consent form',
  '["日本陸連公認","ファミリー"]',
  NULL,
  0,
  0,
  0,
  'road',
  '["JAAF"]',
  '旧東海道土山宿、甲賀の山々',
  'Tsuchiyama-juku post town on the old Tokaido, Koka mountains',
  '2026年度より給水所の位置が一部変更。追加：4.3km（青土）・7.5km（横谷林道）・13.8km（展望広場）。廃止：6.7km（エコーバレー往路）・13.6km（エコーバレー復路）・34.3km（野上野）',
  'Aid station locations partially changed for 2026. Added: 4.3km (Aodo), 7.5km (Yokotani Rindo), 13.8km (Observation Plaza). Removed: 6.7km (Echo Valley outbound), 13.6km (Echo Valley return), 34.3km (Nogamino)',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '土山体育施設',
  'Tsuchiyama Athletic Facilities',
  '滋賀県甲賀市土山町北土山414-2',
  NULL,
  NULL,
  '2026-08-03T14:37:07.156Z',
  '2026-08-24T16:10:27.473Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('ainotuchiyama-2026', 'full', 42.195, 300, '10:30', 0, 7000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('ainotuchiyama-2026', 'half', 21.0975, 180, '10:30', 0, 7000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 1);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('ainotuchiyama-2026', 'other', 2.195, 0, '', 100, 1000, NULL, 'キッズ2.195km（小学5・6年生）', 'Kids 2.195km (5th & 6th graders)', NULL, NULL, NULL, NULL, NULL, '[]', 2);
INSERT OR REPLACE INTO aid_stations (race_id, distance_km, offerings_ja, offerings_en, is_featured) VALUES
  ('ainotuchiyama-2026', 4.3, '水、スポーツドリンク', 'Water, sports drink', 0);
INSERT OR REPLACE INTO aid_stations (race_id, distance_km, offerings_ja, offerings_en, is_featured) VALUES
  ('ainotuchiyama-2026', 7.5, '水、スポーツドリンク', 'Water, sports drink', 0);
INSERT OR REPLACE INTO aid_stations (race_id, distance_km, offerings_ja, offerings_en, is_featured) VALUES
  ('ainotuchiyama-2026', 13.8, '水、スポーツドリンク', 'Water, sports drink', 0);
INSERT OR REPLACE INTO checkpoints (race_id, distance_km, closing_time) VALUES
  ('ainotuchiyama-2026', 15.8, '12:45');
INSERT OR REPLACE INTO checkpoints (race_id, distance_km, closing_time) VALUES
  ('ainotuchiyama-2026', 25.6, '13:33');
INSERT OR REPLACE INTO checkpoints (race_id, distance_km, closing_time) VALUES
  ('ainotuchiyama-2026', 40.2, '15:17');
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  ('ainotuchiyama-2026', '貴生川駅', 'Kibukawa Station', '', 'バスで約35分、土山中学校バス停または田村神社バス停下車、徒歩5分', 'Approx. 35 min by bus, alight at Tsuchiyama Junior High School or Tamura Shrine stop, then 5 min walk', 0, 0, 5, 1, 0);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  ('ainotuchiyama-2026', '亀山駅', 'Kameyama Station', '', '大会当日運行の無料マラソンバスで約40分、会場着', 'Approx. 40 min by free race-day shuttle bus directly to venue', 0, 0, 0, 0, 1);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('ainotuchiyama-2026', '["tshirt"]', 'オリジナルTシャツ（マラソン・ハーフマラソン参加者）', 'Original T-shirt (marathon and half marathon participants)', NULL, 0);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('ainotuchiyama-2026', '["other"]', '缶バッジ（ジュニアチャレンジ参加者）', 'Can badge (Junior Challenge participants)', NULL, 1);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('ainotuchiyama-2026', NULL, '一般エントリー', 'General Entry', '2026-06-14', '2026-08-10', 7000, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('ainotuchiyama-2026', NULL, 'キッズ2.195', 'Kids 2.195km', '2026-06-14', '2026-08-10', 1000, 1);

-- ==================
-- 東京・赤羽ハーフマラソン (akabane-half-marathon-2027)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'akabane-half-marathon-2027';
DELETE FROM race_categories WHERE race_id = 'akabane-half-marathon-2027';
DELETE FROM aid_stations WHERE race_id = 'akabane-half-marathon-2027';
DELETE FROM checkpoints WHERE race_id = 'akabane-half-marathon-2027';
DELETE FROM access_points WHERE race_id = 'akabane-half-marathon-2027';
DELETE FROM nearby_spots WHERE race_id = 'akabane-half-marathon-2027';
DELETE FROM weather_history WHERE race_id = 'akabane-half-marathon-2027';
DELETE FROM participation_gifts WHERE race_id = 'akabane-half-marathon-2027';
DELETE FROM completion_gifts WHERE race_id = 'akabane-half-marathon-2027';
DELETE FROM race_entry_links WHERE race_id = 'akabane-half-marathon-2027';
DELETE FROM race_entry_periods WHERE race_id = 'akabane-half-marathon-2027';
DELETE FROM reception_sessions WHERE race_id = 'akabane-half-marathon-2027';
DELETE FROM race_travel_times WHERE race_id = 'akabane-half-marathon-2027';
DELETE FROM race_results WHERE race_id = 'akabane-half-marathon-2027';
DELETE FROM race_gallery WHERE race_id = 'akabane-half-marathon-2027';
DELETE FROM race_voices WHERE race_id = 'akabane-half-marathon-2027';
DELETE FROM race_time_buckets WHERE race_id = 'akabane-half-marathon-2027';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'akabane-half-marathon-2027',
  '東京・赤羽ハーフマラソン',
  'Tokyo Akabane Half Marathon',
  '2027-01-17',
  '13',
  '北区',
  'Kita City',
  '東京都北区赤羽の荒川河川敷を走る、日本陸連公認のフラットなハーフマラソン。ナンバーカード・計測チップは事前郵送され、当日受付は不要。',
  'A JAAF-certified, flat half marathon along the Arakawa riverbed in Akabane, Kita City, Tokyo. Race bibs and timing chips are mailed in advance, so no day-of check-in is required.',
  'https://akabane-hm.tokyo/',
  NULL,
  1,
  0,
  '2026-08-21',
  '2026-11-23',
  0,
  'pre_mail',
  'ナンバーカード・計測チップは大会前に自宅へ郵送。当日受付は不要',
  'Race bibs and timing chips are mailed to participants before the event; no day-of check-in required',
  '["フラットコース"]',
  NULL,
  0,
  0,
  0,
  'road',
  '["JAAF"]',
  '荒川河川敷を走るフラットな日本陸連公認コース。見通しの良い一本道で、自己ベスト更新を狙うランナーに人気',
  'A flat, JAAF-certified course along the Arakawa riverbed. The long, straight, unobstructed route makes it popular among runners chasing a personal best.',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '荒川河川敷を駆ける、自己ベスト更新のフラットコース',
  'Chase a personal best on the flat Arakawa riverside course',
  NULL,
  NULL,
  NULL,
  '新荒川大橋区営野球場',
  'Shin-Arakawa Ohashi Ward Baseball Ground',
  NULL,
  NULL,
  NULL,
  '2026-08-31T00:00:00Z',
  '2026-08-31T00:00:00Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('akabane-half-marathon-2027', 'half', 21.0975, 140, '10:50', 0, NULL, NULL, 'ハーフマラソン', 'Half Marathon', '参加費 5,700円〜6,200円（申込時期により変動）', 'Entry fee: ¥5,700-¥6,200 (varies by registration timing)', NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('akabane-half-marathon-2027', '10k', 10, 70, '09:20', 0, NULL, NULL, '10km', '10km', '参加費 3,800円〜5,000円（申込時期により変動）', 'Entry fee: ¥3,800-¥5,000 (varies by registration timing)', NULL, NULL, NULL, '[]', 1);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('akabane-half-marathon-2027', 'other', 3, 0, '11:10', 0, NULL, NULL, '3km', '3km', '参加費 2,700円〜3,800円（申込時期により変動）。時間制限なし', 'Entry fee: ¥2,700-¥3,800 (varies by registration timing). No time limit.', NULL, NULL, NULL, '[]', 2);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('akabane-half-marathon-2027', 'other', 2, 0, '09:25', 0, NULL, NULL, '2km（親子ラン）', '2km (Parent-Child Run)', '参加費 2,500円〜4,000円（申込時期により変動）。時間制限なし', 'Entry fee: ¥2,500-¥4,000 (varies by registration timing). No time limit.', NULL, NULL, NULL, '[]', 3);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('akabane-half-marathon-2027', '["goods"]', '大会オリジナルグッズ（親子ランは2名分）', 'Original event goods (2 sets for parent-child pairs)', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('akabane-half-marathon-2027', '["certificate"]', '完走証（ダウンロード形式。当日発行・後日郵送なし）', 'Finisher certificate (download only; not issued on-site or mailed)', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('akabane-half-marathon-2027', NULL, '一般エントリー', 'General Entry', '2026-08-21', '2026-11-23', NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('akabane-half-marathon-2027', NULL, NULL, '荒川河川敷のフラットコース', 'Flat course along the Arakawa riverbed', NULL, NULL, 0);

-- ==================
-- 北緯40°秋田内陸リゾートカップ100キロチャレンジマラソン (akita-nairiku-ultra-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'akita-nairiku-ultra-2026';
DELETE FROM race_categories WHERE race_id = 'akita-nairiku-ultra-2026';
DELETE FROM aid_stations WHERE race_id = 'akita-nairiku-ultra-2026';
DELETE FROM checkpoints WHERE race_id = 'akita-nairiku-ultra-2026';
DELETE FROM access_points WHERE race_id = 'akita-nairiku-ultra-2026';
DELETE FROM nearby_spots WHERE race_id = 'akita-nairiku-ultra-2026';
DELETE FROM weather_history WHERE race_id = 'akita-nairiku-ultra-2026';
DELETE FROM participation_gifts WHERE race_id = 'akita-nairiku-ultra-2026';
DELETE FROM completion_gifts WHERE race_id = 'akita-nairiku-ultra-2026';
DELETE FROM race_entry_links WHERE race_id = 'akita-nairiku-ultra-2026';
DELETE FROM race_entry_periods WHERE race_id = 'akita-nairiku-ultra-2026';
DELETE FROM reception_sessions WHERE race_id = 'akita-nairiku-ultra-2026';
DELETE FROM race_travel_times WHERE race_id = 'akita-nairiku-ultra-2026';
DELETE FROM race_results WHERE race_id = 'akita-nairiku-ultra-2026';
DELETE FROM race_gallery WHERE race_id = 'akita-nairiku-ultra-2026';
DELETE FROM race_voices WHERE race_id = 'akita-nairiku-ultra-2026';
DELETE FROM race_time_buckets WHERE race_id = 'akita-nairiku-ultra-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'akita-nairiku-ultra-2026',
  '北緯40°秋田内陸リゾートカップ100キロチャレンジマラソン',
  'Latitude 40° Akita Nairiku Resort Cup 100km Challenge Marathon',
  '2026-09-27',
  '05',
  '秋田県仙北市・北秋田市',
  'Senboku City / Kitaakita City, Akita',
  '秋田内陸縦貫鉄道沿いを走るウルトラマラソン。最大高低差531mのアップダウンあるコースを100km・70km・50kmの3種目で競う。きりたんぽなど秋田の郷土料理がふるまわれるエイドステーションが名物。',
  'An ultra marathon along the Akita Nairiku Railway line. Three distances (100km, 70km, 50km) through a course with 531m elevation difference. Famous for aid stations serving local Akita cuisine including kiritanpo.',
  'https://www.kumagera.ne.jp/a100km/',
  22000,
  1,
  1050,
  '2026-04-01',
  '2026-06-30',
  0,
  'pre_day',
  '',
  '',
  '["ウルトラマラソン","アップダウン多い","ご当地エイド","ご当地グルメ","初ウルトラおすすめ","温泉"]',
  NULL,
  0,
  0,
  531,
  'road',
  '[]',
  '秋田内陸縦貫鉄道沿い、田沢湖高原、最大高低差531m',
  'Along Akita Nairiku Railway, Tazawako Highland, 531m elevation difference',
  'きりたんぽ等ご当地グルメのエイドあり。',
  'Aid stations featuring local cuisine including kiritanpo.',
  '紅葉',
  '#d4631a',
  'Koyo',
  '秋田内陸の紅葉の回廊を走る100km',
  'A 100km journey through autumn foliage corridors',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '2026-03-29T00:00:00Z',
  '2026-05-25T10:40:47.866Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('akita-nairiku-ultra-2026', 'ultra', 100, 780, '05:00', 650, 22000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('akita-nairiku-ultra-2026', 'ultra', 70, 570, '06:00', 150, 19000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 1);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('akita-nairiku-ultra-2026', 'other', 50, 420, '07:00', 250, 18000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 2);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('akita-nairiku-ultra-2026', NULL, '一般エントリー', 'General Entry', '2026-04-01', '2026-06-30', NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('akita-nairiku-ultra-2026', NULL, NULL, '秋田内陸縦貫鉄道沿い', 'Along Akita Nairiku Railway', NULL, NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('akita-nairiku-ultra-2026', NULL, NULL, '田沢湖高原', 'Tazawako Highland', NULL, NULL, 1);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('akita-nairiku-ultra-2026', NULL, NULL, '最大高低差531m', '531m elevation difference', NULL, NULL, 2);

-- ==================
-- 天草マラソン大会 (amakusa-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'amakusa-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'amakusa-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'amakusa-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'amakusa-marathon-2026';
DELETE FROM access_points WHERE race_id = 'amakusa-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'amakusa-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'amakusa-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'amakusa-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'amakusa-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'amakusa-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'amakusa-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'amakusa-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'amakusa-marathon-2026';
DELETE FROM race_results WHERE race_id = 'amakusa-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'amakusa-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'amakusa-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'amakusa-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'amakusa-marathon-2026',
  '天草マラソン大会',
  'Amakusa Marathon',
  '2026-11-15',
  '43',
  '天草市',
  'Amakusa City',
  '熊本県天草市で開催されるハーフマラソン・5km・3kmの大会。ハーフマラソンには団体戦部門もある。',
  'A half marathon, 5km, and 3km event held in Amakusa City, Kumamoto Prefecture. The half marathon also has a team competition division.',
  'https://ama-spo.net/marathon/',
  NULL,
  1,
  2800,
  '2026-07-06',
  '2026-09-11',
  0,
  'race_day',
  '',
  '',
  '["団体戦"]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  '',
  '',
  NULL,
  NULL,
  '天草五橋',
  '#0e7490',
  'Amakusa Gokyo',
  '橋と海に抱かれた天草の島々を駆ける',
  'Run through the islands of Amakusa, embraced by bridges and sea',
  NULL,
  NULL,
  NULL,
  'あましんスタジアム',
  'Amashin Stadium',
  '熊本県天草市東町3番地（天草市民センター内）',
  NULL,
  NULL,
  '2026-08-31T23:51:21.157Z',
  '2026-08-31T23:51:21.157Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('amakusa-marathon-2026', 'half', 21.0975, 210, '', 2000, 6000, NULL, 'ハーフマラソン', 'Half Marathon', 'スタート地点閉鎖9時5分、折返し関門10時50分（制限時間3時間30分）', 'Start line closes at 9:05, turnaround checkpoint closes at 10:50 (3h30m time limit)', NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('amakusa-marathon-2026', 'half', 21.0975, 210, '', 0, 6000, NULL, 'ハーフマラソン団体戦', 'Half Marathon Team Competition', '3〜6人でチーム編成。上位3人の合計タイムで順位を競う（定員はハーフマラソン個人の部と併算・計2,000人）', 'Teams of 3-6 members; ranked by the combined time of the top 3 finishers (capacity shared with the individual half marathon, 2,000 total)', NULL, NULL, NULL, '[]', 1);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('amakusa-marathon-2026', '5k', 5, 0, '', 400, 3000, NULL, '5km', '5km', '小中高生で参加賞なしを選択の場合は1,000円', '1,000 yen for elementary/junior high/high school students who opt out of the participation gift', NULL, NULL, NULL, '[]', 2);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('amakusa-marathon-2026', 'other', 3, 0, '', 400, 3000, NULL, '3km', '3km', '小中高生で参加賞なしを選択の場合は1,000円', '1,000 yen for elementary/junior high/high school students who opt out of the participation gift', NULL, NULL, NULL, '[]', 3);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('amakusa-marathon-2026', '["local_product"]', '地元特産品、サービス券（予定）', 'Local specialty products, service vouchers (planned)', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('amakusa-marathon-2026', NULL, '一般エントリー', 'General Entry', '2026-07-06', '2026-09-11', NULL, 0);

-- ==================
-- あおもり桜マラソン (aomori-sakura-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'aomori-sakura-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'aomori-sakura-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'aomori-sakura-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'aomori-sakura-marathon-2026';
DELETE FROM access_points WHERE race_id = 'aomori-sakura-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'aomori-sakura-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'aomori-sakura-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'aomori-sakura-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'aomori-sakura-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'aomori-sakura-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'aomori-sakura-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'aomori-sakura-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'aomori-sakura-marathon-2026';
DELETE FROM race_results WHERE race_id = 'aomori-sakura-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'aomori-sakura-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'aomori-sakura-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'aomori-sakura-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'aomori-sakura-marathon-2026',
  'あおもり桜マラソン',
  'Aomori Sakura Marathon',
  '2026-04-19',
  '02',
  '青森市',
  'Aomori City',
  '桜の季節に開催される青森のフルマラソン。八甲田山や陸奥湾を望むコース。',
  'A full marathon in Aomori during cherry blossom season. Course with views of Mt. Hakkoda and Mutsu Bay.',
  'https://aomori-sakuramarathon.com',
  7000,
  1,
  5500,
  '2025-11-01',
  '2026-01-30',
  0,
  'pre_mail',
  'アスリートビブスは参加記念品等とあわせて4月6日頃までに事前郵送される（当日受付なし）。届かない場合は4月13日までに事務局へ連絡すれば大会当日に総合案内所で発行。日本国外在住者へは4月18日または19日に会場で手渡し。',
  'Athlete bibs are mailed in advance by around April 6, along with participation gifts (no race-day registration). If not received, contact the office by April 13 for issuance at the information desk on race day. Overseas residents receive their bibs at the venue on April 18 or 19.',
  '["景色が良い","桜"]',
  NULL,
  0,
  0,
  0,
  'road',
  '["JAAF"]',
  '八甲田山、陸奥湾、桜並木',
  'Mt. Hakkoda, Mutsu Bay, cherry blossom trees',
  NULL,
  NULL,
  '桜',
  '#f9c1cc',
  'Sakura',
  '桜前線に乗って、青森を走る',
  'Run through Aomori on the cherry blossom front',
  NULL,
  NULL,
  NULL,
  '野木和公園',
  'Nogiwa Park',
  '青森県青森市羽白字野木和58',
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-08-24T16:21:38.825Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('aomori-sakura-marathon-2026', 'full', 42.195, 330, '08:50', 2400, 7000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('aomori-sakura-marathon-2026', 'half', 21.09, 180, '09:40', 1500, 5000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 1);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('aomori-sakura-marathon-2026', '10k', 10, 80, '09:10', 1600, 3000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 2);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('aomori-sakura-marathon-2026', '観光地', '弘前城・弘前公園', 'Hirosaki Castle & Park', '日本屈指の桜の名所。4月下旬は桜まつりの時期と重なる可能性あり。', 'One of Japan''s top cherry blossom spots. Late April may coincide with the cherry blossom festival.', '青森市から車約1時間', NULL, 40.6072, 140.4639);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('aomori-sakura-marathon-2026', '["tshirt"]', '参加記念Tシャツ', 'Commemorative T-shirt', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('aomori-sakura-marathon-2026', '["towel"]', 'フィニッシャーズタオル', 'Finisher''s towel', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('aomori-sakura-marathon-2026', NULL, '一般エントリー', 'General Entry', '2025-11-01', '2026-01-30', NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('aomori-sakura-marathon-2026', NULL, NULL, '八甲田山', 'Mt. Hakkoda', NULL, NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('aomori-sakura-marathon-2026', NULL, NULL, '陸奥湾', 'Mutsu Bay', NULL, NULL, 1);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('aomori-sakura-marathon-2026', NULL, NULL, '桜並木', 'cherry blossom trees', NULL, NULL, 2);

-- ==================
-- 青島太平洋マラソン (aoshima-taiheyo-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'aoshima-taiheyo-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'aoshima-taiheyo-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'aoshima-taiheyo-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'aoshima-taiheyo-marathon-2026';
DELETE FROM access_points WHERE race_id = 'aoshima-taiheyo-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'aoshima-taiheyo-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'aoshima-taiheyo-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'aoshima-taiheyo-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'aoshima-taiheyo-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'aoshima-taiheyo-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'aoshima-taiheyo-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'aoshima-taiheyo-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'aoshima-taiheyo-marathon-2026';
DELETE FROM race_results WHERE race_id = 'aoshima-taiheyo-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'aoshima-taiheyo-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'aoshima-taiheyo-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'aoshima-taiheyo-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'aoshima-taiheyo-marathon-2026',
  '青島太平洋マラソン',
  'Aotai',
  '2026-12-13',
  '45',
  '',
  '',
  '',
  '',
  'https://www.aotai.gr.jp/',
  NULL,
  1,
  0,
  NULL,
  NULL,
  0,
  'pre_day',
  '',
  '',
  '[]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  '',
  '',
  '',
  '',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '2026-06-12T13:47:30.815Z',
  '2026-06-12T13:47:30.815Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;

-- ==================
-- 旭川ハーフマラソン (asahikawa-half-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'asahikawa-half-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'asahikawa-half-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'asahikawa-half-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'asahikawa-half-marathon-2026';
DELETE FROM access_points WHERE race_id = 'asahikawa-half-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'asahikawa-half-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'asahikawa-half-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'asahikawa-half-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'asahikawa-half-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'asahikawa-half-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'asahikawa-half-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'asahikawa-half-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'asahikawa-half-marathon-2026';
DELETE FROM race_results WHERE race_id = 'asahikawa-half-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'asahikawa-half-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'asahikawa-half-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'asahikawa-half-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'asahikawa-half-marathon-2026',
  '旭川ハーフマラソン',
  'Asahikawa Half Marathon',
  '2026-09-27',
  '01',
  '旭川市',
  'Asahikawa City, Hokkaido',
  '北海道第2の都市・旭川で開催されるハーフマラソン。忠別川沿いの自然豊かなコースを走る。旭川ならではのグルメ提供や託児サービスもあり、ファミリーでも楽しめる大会。',
  'A half marathon held in Asahikawa, Hokkaido''s second largest city. Run along the scenic Chubetsu River. Features local Asahikawa cuisine and childcare services, welcoming families.',
  'https://www.asahikawa-half-marathon.jp/',
  6500,
  1,
  2500,
  '2026-04-01',
  '2026-07-26',
  0,
  'pre_day',
  '託児サービスあり',
  'Childcare service available',
  '["北海道","景色が良い","ご当地グルメ","初心者おすすめ"]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  '忠別川沿い',
  'Along Chubetsu River',
  '',
  '',
  '大雪山',
  '#dbeafe',
  'Taisetsuzan',
  '大雪山を仰ぎながら旭川の街を駆ける',
  'Run through Asahikawa with Mt. Taisetsu in view',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '2026-03-29T00:00:00Z',
  '2026-05-25T01:17:00.049Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('asahikawa-half-marathon-2026', 'half', 21.0975, 180, '08:30', 2500, 6500, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('asahikawa-half-marathon-2026', '10k', 10, 0, '08:50', 1000, 4500, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 1);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('asahikawa-half-marathon-2026', NULL, '一般エントリー', 'General Entry', '2026-04-01', '2026-07-26', NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('asahikawa-half-marathon-2026', NULL, NULL, '忠別川沿い', 'Along Chubetsu River', NULL, NULL, 0);

-- ==================
-- 坂東市将門ハーフマラソン (bando-masakado-half-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'bando-masakado-half-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'bando-masakado-half-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'bando-masakado-half-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'bando-masakado-half-marathon-2026';
DELETE FROM access_points WHERE race_id = 'bando-masakado-half-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'bando-masakado-half-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'bando-masakado-half-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'bando-masakado-half-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'bando-masakado-half-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'bando-masakado-half-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'bando-masakado-half-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'bando-masakado-half-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'bando-masakado-half-marathon-2026';
DELETE FROM race_results WHERE race_id = 'bando-masakado-half-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'bando-masakado-half-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'bando-masakado-half-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'bando-masakado-half-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'bando-masakado-half-marathon-2026',
  '坂東市将門ハーフマラソン',
  'Bando Masakado Half Marathon',
  '2026-11-08',
  '08',
  '坂東市',
  'Bando City',
  '平将門ゆかりの地、坂東市を舞台に開催されるハーフマラソン。ハーフ・10km・5kmを実施。',
  'A half marathon held in Bando City, a place associated with the historical figure Taira no Masakado. Half marathon, 10km, and 5km distances.',
  'http://www.masakadomarathon.jp/',
  5000,
  1,
  5100,
  '2026-07-01',
  '2026-08-31',
  0,
  'pre_mail',
  '当日受付はなし。ゼッケン・参加賞は10月下旬から11月上旬に事前発送される。',
  'No same-day reception; bib numbers and participation gifts are shipped in advance from late October to early November.',
  '[]',
  NULL,
  0,
  0,
  0,
  'road',
  '["JAAF"]',
  '',
  '',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '坂東市八坂総合公園陸上競技場',
  'Bando City Yasaka General Park Athletics Stadium',
  '茨城県坂東市岩井3086',
  NULL,
  NULL,
  '2026-08-25T00:00:00Z',
  '2026-08-24T16:23:11.997Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('bando-masakado-half-marathon-2026', 'half', 21.0975, 150, '10:00', 3100, 5000, NULL, NULL, NULL, '2時間30分以内で完走できる方が対象', 'For runners able to finish within 2 hours 30 minutes', NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('bando-masakado-half-marathon-2026', '10k', 10, 0, '10:10', 1000, 4500, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 1);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('bando-masakado-half-marathon-2026', '5k', 5, 0, '10:20', 1000, 4000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 2);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  ('bando-masakado-half-marathon-2026', '守谷駅', 'Moriya Station', '', '大会専用直通バス（有料・往復1,500円）', 'Event shuttle bus (fee, round trip 1,500 yen)', 0, 0, 0, 1, 0);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  ('bando-masakado-half-marathon-2026', '愛宕駅', 'Atago Station', '', '路線バス（茨城急行バス）約40分', 'Local bus (Ibaraki Kyuko Bus) approx. 40 min', 0, 0, 0, 0, 1);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('bando-masakado-half-marathon-2026', '宿泊', '旅館あづま', 'Ryokan Azuma', '会場周辺の宿泊施設', 'Lodging near the venue', '', NULL, 0, 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('bando-masakado-half-marathon-2026', '宿泊', 'さつき旅館', 'Satsuki Ryokan', '会場周辺の宿泊施設', 'Lodging near the venue', '', NULL, 0, 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('bando-masakado-half-marathon-2026', '宿泊', 'グリーンコア坂東', 'Green Core Bando', '会場周辺の宿泊施設', 'Lodging near the venue', '', NULL, 0, 0);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('bando-masakado-half-marathon-2026', '["tshirt"]', '参加者全員に大会オリジナルTシャツを贈呈', 'Original event T-shirt for all participants', NULL, 0);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('bando-masakado-half-marathon-2026', '["local_product"]', '当日参加者に坂東市特産野菜を贈呈', 'Local specialty vegetables for same-day participants', NULL, 1);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('bando-masakado-half-marathon-2026', NULL, 'ハーフの部', 'Half Marathon', '2026-07-01', '2026-08-31', 5000, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('bando-masakado-half-marathon-2026', NULL, '10kmの部', '10km', '2026-07-01', '2026-08-31', 4500, 1);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('bando-masakado-half-marathon-2026', NULL, '5kmの部', '5km', '2026-07-01', '2026-08-31', 4000, 2);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('bando-masakado-half-marathon-2026', NULL, '中学生の部', 'Junior High School', '2026-07-01', '2026-08-31', 1000, 3);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('bando-masakado-half-marathon-2026', NULL, '小学5・6年生の部（3km）', 'Elementary 5th-6th Grade (3km)', '2026-07-01', '2026-08-31', NULL, 4);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('bando-masakado-half-marathon-2026', NULL, '小学3・4年生の部（1km）', 'Elementary 3rd-4th Grade (1km)', '2026-07-01', '2026-08-31', NULL, 5);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('bando-masakado-half-marathon-2026', NULL, '親子ペアの部', 'Parent-Child Pair', '2026-07-01', '2026-08-31', 2000, 6);

-- ==================
-- 別府大分毎日マラソン (beppu-oita-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'beppu-oita-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'beppu-oita-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'beppu-oita-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'beppu-oita-marathon-2026';
DELETE FROM access_points WHERE race_id = 'beppu-oita-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'beppu-oita-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'beppu-oita-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'beppu-oita-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'beppu-oita-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'beppu-oita-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'beppu-oita-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'beppu-oita-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'beppu-oita-marathon-2026';
DELETE FROM race_results WHERE race_id = 'beppu-oita-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'beppu-oita-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'beppu-oita-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'beppu-oita-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'beppu-oita-marathon-2026',
  '別府大分毎日マラソン',
  'Beppu-Oita Mainichi Marathon',
  '2026-02-01',
  '44',
  '大分市・別府市',
  'Oita & Beppu City',
  '大分県で開催される歴史あるエリートマラソン。MGCシリーズG1大会。別府温泉から大分を結ぶ海岸沿いの高速コース。',
  'A prestigious elite marathon in Oita Prefecture. MGC Series G1 event. A fast coastal course connecting Beppu Onsen to Oita.',
  'https://www.betsudai.com',
  15000,
  1,
  4000,
  '2025-08-29',
  '2025-09-11',
  0,
  'pre_day',
  '',
  '',
  '["エリート大会","フラット","日本陸連公認","温泉","記録狙い"]',
  NULL,
  0,
  0,
  0,
  'road',
  '["JAAF"]',
  '別府温泉街、別大国道の海岸線',
  'Beppu hot spring town, Betsudai coastal road',
  NULL,
  NULL,
  '温泉',
  '#fed7aa',
  'Onsen',
  '湯けむりの街から、大分へ。歴史ある42.195km',
  'From the city of hot springs to Oita — a storied 42.195km',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-05-25T01:17:05.123Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('beppu-oita-marathon-2026', 'full', 42.195, 0, '12:00', 4000, 15000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('beppu-oita-marathon-2026', '温泉', '別府温泉', 'Beppu Onsen', '日本一の湧出量を誇る温泉地。地獄めぐりが有名。レース後に様々な泉質の温泉を楽しめる。', 'Japan''s top hot spring area by water output. Famous for ''Hell Tours''. Enjoy various hot spring types after the race.', 'スタート地点付近', NULL, 33.2847, 131.5006);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('beppu-oita-marathon-2026', 'グルメ', '別府冷麺・とり天', 'Beppu Cold Noodles & Chicken Tempura', '別府のご当地グルメ。冷麺ととり天は名物。', 'Beppu''s local specialties. Cold noodles and chicken tempura.', '別府市内', NULL, 33.2847, 131.5006);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('beppu-oita-marathon-2026', '["tshirt"]', '大会Tシャツ', 'Race T-shirt', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('beppu-oita-marathon-2026', NULL, '一般エントリー', 'General Entry', '2025-08-29', '2025-09-11', NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('beppu-oita-marathon-2026', NULL, NULL, '別府温泉街', 'Beppu hot spring town', NULL, NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('beppu-oita-marathon-2026', NULL, NULL, '別大国道の海岸線', 'Betsudai coastal road', NULL, NULL, 1);

-- ==================
-- 別府大分毎日マラソン (beppu-oita-marathon-2027)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'beppu-oita-marathon-2027';
DELETE FROM race_categories WHERE race_id = 'beppu-oita-marathon-2027';
DELETE FROM aid_stations WHERE race_id = 'beppu-oita-marathon-2027';
DELETE FROM checkpoints WHERE race_id = 'beppu-oita-marathon-2027';
DELETE FROM access_points WHERE race_id = 'beppu-oita-marathon-2027';
DELETE FROM nearby_spots WHERE race_id = 'beppu-oita-marathon-2027';
DELETE FROM weather_history WHERE race_id = 'beppu-oita-marathon-2027';
DELETE FROM participation_gifts WHERE race_id = 'beppu-oita-marathon-2027';
DELETE FROM completion_gifts WHERE race_id = 'beppu-oita-marathon-2027';
DELETE FROM race_entry_links WHERE race_id = 'beppu-oita-marathon-2027';
DELETE FROM race_entry_periods WHERE race_id = 'beppu-oita-marathon-2027';
DELETE FROM reception_sessions WHERE race_id = 'beppu-oita-marathon-2027';
DELETE FROM race_travel_times WHERE race_id = 'beppu-oita-marathon-2027';
DELETE FROM race_results WHERE race_id = 'beppu-oita-marathon-2027';
DELETE FROM race_gallery WHERE race_id = 'beppu-oita-marathon-2027';
DELETE FROM race_voices WHERE race_id = 'beppu-oita-marathon-2027';
DELETE FROM race_time_buckets WHERE race_id = 'beppu-oita-marathon-2027';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'beppu-oita-marathon-2027',
  '別府大分毎日マラソン',
  'Beppu-Oita Mainichi Marathon',
  '2027-02-07',
  '44',
  '大分市・別府市',
  'Oita & Beppu City',
  '大分県で開催される歴史あるエリートマラソン。MGCシリーズG1大会。別府温泉から大分を結ぶ海岸沿いの高速コース。',
  'A prestigious elite marathon in Oita Prefecture. MGC Series G1 event. A fast coastal course connecting Beppu Onsen to Oita.',
  'https://www.betsudai.com',
  18000,
  1,
  4000,
  '2026-08-28',
  '2026-12-07',
  0,
  'pre_day',
  '2027年2月6日（土）13:00〜18:00、別府国際コンベンションセンター（B-con Plaza、大分県別府市山の手町12-1）にて競技者受付。時間外・代理受付は不可。',
  'Athlete reception: Feb 6, 2027 (Sat) 13:00-18:00 at Beppu International Convention Center (B-con Plaza). No reception outside these hours; proxy reception not allowed.',
  '["エリート大会","フラット","日本陸連公認","温泉","記録狙い"]',
  NULL,
  0,
  0,
  0,
  'road',
  '["JAAF","WA","AIMS"]',
  '別府温泉街、別大国道の海岸線',
  'Beppu hot spring town, Betsudai coastal road',
  NULL,
  NULL,
  '温泉',
  '#fed7aa',
  'Onsen',
  '湯けむりの街から、大分へ。歴史ある42.195km',
  'From the city of hot springs to Oita — a storied 42.195km',
  NULL,
  NULL,
  NULL,
  'うみたまご前（高崎山）',
  'Umitamago / Takasakiyama',
  NULL,
  NULL,
  NULL,
  '2026-08-24T15:45:47.419Z',
  '2026-08-31T13:23:27.845Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('beppu-oita-marathon-2027', 'full', 42.195, 0, '12:00', 4000, 18000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  ('beppu-oita-marathon-2027', 'JR大分駅', 'JR Oita Station', '', '専用シャトルバス', 'Dedicated shuttle bus', 0, 0, NULL, 1, 0);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  ('beppu-oita-marathon-2027', '別府市・北浜駐車場', 'Beppu Kitahama Parking', '', '専用シャトルバス', 'Dedicated shuttle bus', 0, 0, NULL, 0, 1);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('beppu-oita-marathon-2027', '温泉', '別府温泉', 'Beppu Onsen', '日本一の湧出量を誇る温泉地。地獄めぐりが有名。レース後に様々な泉質の温泉を楽しめる。', 'Japan''s top hot spring area by water output. Famous for ''Hell Tours''. Enjoy various hot spring types after the race.', 'スタート地点付近', NULL, 33.2847, 131.5006);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('beppu-oita-marathon-2027', 'グルメ', '別府冷麺・とり天', 'Beppu Cold Noodles & Chicken Tempura', '別府のご当地グルメ。冷麺ととり天は名物。', 'Beppu''s local specialties. Cold noodles and chicken tempura.', '別府市内', NULL, 33.2847, 131.5006);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('beppu-oita-marathon-2027', '["tshirt"]', '大会Tシャツ', 'Race T-shirt', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('beppu-oita-marathon-2027', NULL, 'カテゴリー1', 'Category 1', '2026-08-28', '2026-12-07', 18000, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('beppu-oita-marathon-2027', NULL, 'カテゴリー2〜4', 'Category 2-4', '2026-08-28', '2026-09-10', 18000, 1);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('beppu-oita-marathon-2027', NULL, NULL, '別府温泉街', 'Beppu hot spring town', NULL, NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('beppu-oita-marathon-2027', NULL, NULL, '別大国道の海岸線', 'Betsudai coastal road', NULL, NULL, 1);

-- ==================
-- びわ湖マラソン (biwako-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'biwako-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'biwako-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'biwako-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'biwako-marathon-2026';
DELETE FROM access_points WHERE race_id = 'biwako-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'biwako-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'biwako-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'biwako-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'biwako-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'biwako-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'biwako-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'biwako-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'biwako-marathon-2026';
DELETE FROM race_results WHERE race_id = 'biwako-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'biwako-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'biwako-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'biwako-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'biwako-marathon-2026',
  'びわ湖マラソン',
  'Biwako Marathon',
  '2026-03-08',
  '25',
  '大津市',
  'Otsu City',
  '日本最大の湖・琵琶湖畔を走るフルマラソン。湖と比叡山の絶景を楽しめるフラットなコース。',
  'A full marathon along Lake Biwa, Japan''s largest lake. A flat course with views of the lake and Mt. Hiei.',
  'https://biwako-marathon.com',
  15000,
  0,
  7000,
  '2025-08-01',
  '2025-10-31',
  0,
  'pre_mail',
  '',
  '',
  '["フラット","景色が良い","湖畔"]',
  NULL,
  0,
  0,
  0,
  'road',
  '["JAAF"]',
  '琵琶湖畔、比叡山',
  'Lake Biwa shore, Mt. Hiei',
  NULL,
  NULL,
  '琵琶湖',
  '#93c5fd',
  'Biwako',
  '日本最大の湖を舞台に、水の都を走る',
  'Run along Japan''s largest lake',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-03-15T00:00:00Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('biwako-marathon-2026', 'full', 42.195, 360, '08:20', 7000, 15000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('biwako-marathon-2026', '観光地', '琵琶湖', 'Lake Biwa', '日本最大の湖。コース全体で湖畔を走る。水面に映る比叡山の景色が美しい。', 'Japan''s largest lake. The entire course runs along the lakeshore. Beautiful views of Mt. Hiei reflected on the water.', 'コース上', NULL, 35.3506, 136.0689);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('biwako-marathon-2026', '温泉', 'おごと温泉', 'Ogoto Onsen', '琵琶湖西岸の温泉地。コース付近。レース後のリカバリーに便利。', 'Hot spring town on the west shore of Lake Biwa. Near the course. Convenient for post-race recovery.', 'コース付近', NULL, 35.1167, 135.8833);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('biwako-marathon-2026', NULL, '一般エントリー', 'General Entry', '2025-08-01', '2025-10-31', NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('biwako-marathon-2026', NULL, NULL, '琵琶湖畔', 'Lake Biwa shore', NULL, NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('biwako-marathon-2026', NULL, NULL, '比叡山', 'Mt. Hiei', NULL, NULL, 1);

-- ==================
-- びわ湖マラソン (biwako-marathon-2027)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'biwako-marathon-2027';
DELETE FROM race_categories WHERE race_id = 'biwako-marathon-2027';
DELETE FROM aid_stations WHERE race_id = 'biwako-marathon-2027';
DELETE FROM checkpoints WHERE race_id = 'biwako-marathon-2027';
DELETE FROM access_points WHERE race_id = 'biwako-marathon-2027';
DELETE FROM nearby_spots WHERE race_id = 'biwako-marathon-2027';
DELETE FROM weather_history WHERE race_id = 'biwako-marathon-2027';
DELETE FROM participation_gifts WHERE race_id = 'biwako-marathon-2027';
DELETE FROM completion_gifts WHERE race_id = 'biwako-marathon-2027';
DELETE FROM race_entry_links WHERE race_id = 'biwako-marathon-2027';
DELETE FROM race_entry_periods WHERE race_id = 'biwako-marathon-2027';
DELETE FROM reception_sessions WHERE race_id = 'biwako-marathon-2027';
DELETE FROM race_travel_times WHERE race_id = 'biwako-marathon-2027';
DELETE FROM race_results WHERE race_id = 'biwako-marathon-2027';
DELETE FROM race_gallery WHERE race_id = 'biwako-marathon-2027';
DELETE FROM race_voices WHERE race_id = 'biwako-marathon-2027';
DELETE FROM race_time_buckets WHERE race_id = 'biwako-marathon-2027';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'biwako-marathon-2027',
  'びわ湖マラソン',
  'Biwako Marathon',
  '2027-03-14',
  '25',
  '大津市',
  'Otsu City',
  '日本最大の湖・琵琶湖畔を走るフルマラソン。湖と比叡山の絶景を楽しめるフラットなコース。',
  'A full marathon along Lake Biwa, Japan''s largest lake. A flat course with views of the lake and Mt. Hiei.',
  'https://biwako-marathon.com',
  15000,
  0,
  8000,
  '2026-08-03',
  '2026-10-30',
  0,
  'pre_mail',
  'アスリートビブス（ゼッケン）、計測チップ、参加賞等を事前に郵送。大会前日・当日の受付なし。',
  'Bib, timing chip, and participation gift will be mailed in advance. No race-day or day-before pick-up.',
  '["フラット","景色が良い","湖畔"]',
  NULL,
  0,
  0,
  0,
  'road',
  '["JAAF","WA"]',
  '琵琶湖畔、比叡山',
  'Lake Biwa shore, Mt. Hiei',
  NULL,
  NULL,
  '琵琶湖',
  '#93c5fd',
  'Biwako',
  '日本最大の湖を舞台に、水の都を走る',
  'Run along Japan''s largest lake',
  NULL,
  NULL,
  NULL,
  '皇子山陸上競技場',
  'Ojiyama Stadium',
  NULL,
  NULL,
  NULL,
  '2026-07-27T14:07:25.820Z',
  '2026-07-27T14:07:25.820Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('biwako-marathon-2027', 'full', 42.195, 360, '08:20', 7000, 15000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  ('biwako-marathon-2027', '京阪大津京駅', 'Keihan Otsu-kyo Station', '', '徒歩3分', '3 min walk', 0, 0, 3, 1, 0);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  ('biwako-marathon-2027', '大津京駅（JR湖西線）', 'Otsu-kyo Station (JR Kosei Line)', '', '徒歩6分', '6 min walk', 0, 0, 6, 0, 1);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  ('biwako-marathon-2027', '大津駅（JR琵琶湖線）', 'Otsu Station (JR Biwako Line)', '', '徒歩35分', '35 min walk', 0, 0, 35, 0, 2);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('biwako-marathon-2027', '観光地', '琵琶湖', 'Lake Biwa', '日本最大の湖。コース全体で湖畔を走る。水面に映る比叡山の景色が美しい。', 'Japan''s largest lake. The entire course runs along the lakeshore. Beautiful views of Mt. Hiei reflected on the water.', 'コース上', NULL, 35.3506, 136.0689);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('biwako-marathon-2027', '温泉', 'おごと温泉', 'Ogoto Onsen', '琵琶湖西岸の温泉地。コース付近。レース後のリカバリーに便利。', 'Hot spring town on the west shore of Lake Biwa. Near the course. Convenient for post-race recovery.', 'コース付近', NULL, 35.1167, 135.8833);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('biwako-marathon-2027', '["tshirt"]', 'Tシャツ・ロングTシャツ・ランニンググローブのいずれか1つ', 'Choice of one: T-shirt, long-sleeve T-shirt, or running gloves', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('biwako-marathon-2027', '["medal"]', '完走メダル', 'Finisher medal', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('biwako-marathon-2027', '["towel"]', '完走タオル', 'Finisher towel', NULL, 1);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('biwako-marathon-2027', NULL, '一般エントリー', 'General Entry', '2026-08-03', '2026-10-30', 15000, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('biwako-marathon-2027', NULL, NULL, '琵琶湖畔', 'Lake Biwa shore', NULL, NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('biwako-marathon-2027', NULL, NULL, '比叡山', 'Mt. Hiei', NULL, NULL, 1);

-- ==================
-- ちばアクアラインマラソン (chiba-aqualine-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'chiba-aqualine-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'chiba-aqualine-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'chiba-aqualine-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'chiba-aqualine-marathon-2026';
DELETE FROM access_points WHERE race_id = 'chiba-aqualine-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'chiba-aqualine-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'chiba-aqualine-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'chiba-aqualine-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'chiba-aqualine-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'chiba-aqualine-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'chiba-aqualine-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'chiba-aqualine-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'chiba-aqualine-marathon-2026';
DELETE FROM race_results WHERE race_id = 'chiba-aqualine-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'chiba-aqualine-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'chiba-aqualine-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'chiba-aqualine-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'chiba-aqualine-marathon-2026',
  'ちばアクアラインマラソン',
  'Chiba Aqualine Marathon',
  '2026-11-08',
  '12',
  '木更津市・袖ケ浦市',
  'Kisarazu City / Sodegaura City, Chiba',
  '東京湾アクアライン（木更津金田IC〜海ほたる）を往復走行する国内唯一の大会。海抜40.85mの橋梁から見渡す東京湾の絶景が最大の魅力。後半は袖ケ浦の田園地帯を走る。強風時は短縮コースに変更される場合あり。',
  'Japan''s only marathon traversing the Tokyo Bay Aqualine. Run across the iconic bridge with panoramic views of Tokyo Bay at 40.85m elevation. The course continues through Sodegaura''s farmlands. May switch to a shortened course in strong winds.',
  'https://chiba-aqualine-marathon.com/',
  16500,
  1,
  12000,
  '2026-03-22',
  '2026-04-12',
  0,
  'pre_mail',
  '一般枠：3/22〜4/12。アスリート・学生・女性・海外枠：3/22〜5/7。レイトエントリー枠：5/31〜6/8。システム利用料別途。',
  'General entry: Mar 22 - Apr 12. Athlete/Student/Women/Overseas entries: Mar 22 - May 7. Late entry: May 31 - Jun 8. System fee applies separately.',
  '["大規模","日本陸連公認","景色が良い","橋","海沿い"]',
  NULL,
  40.85,
  0,
  40.85,
  'road',
  '["JAAF"]',
  '東京湾アクアライン、海ほたる、袖ケ浦の田園地帯',
  'Tokyo Bay Aqualine, Umihotaru PA, Sodegaura farmlands',
  '強風時は短縮コース（マラソン→31.4km、ハーフ→10.3km）に変更。給水16箇所、給食15箇所、関門9箇所。',
  'May be shortened to 31.4km / 10.3km in strong winds. 16 water stations, 15 food stations, 9 checkpoints.',
  '海',
  '#0ea5e9',
  'Umi',
  '東京湾アクアラインを渡る、世界唯一のコース',
  'The world-unique course crossing Tokyo Bay Aqua-Line',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '2026-03-30T00:00:00Z',
  '2026-06-22T14:59:41.999Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('chiba-aqualine-marathon-2026', 'full', 42.195, 375, '09:45', 12000, 16500, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('chiba-aqualine-marathon-2026', 'half', 21.0975, 205, '09:45', 5000, 13500, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 1);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('chiba-aqualine-marathon-2026', '["tshirt"]', '参加賞Tシャツ、完走メダル', '', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('chiba-aqualine-marathon-2026', '["medal"]', '参加賞Tシャツ、完走メダル', '', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('chiba-aqualine-marathon-2026', NULL, '一般エントリー', 'General Entry', '2026-03-22', '2026-04-12', 16500, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('chiba-aqualine-marathon-2026', NULL, 'レイトエントリー', 'Late Entry', '2026-05-31', '2026-06-08', 16500, 1);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('chiba-aqualine-marathon-2026', NULL, NULL, '東京湾アクアライン', 'Tokyo Bay Aqualine', NULL, NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('chiba-aqualine-marathon-2026', NULL, NULL, '海ほたる', 'Umihotaru PA', NULL, NULL, 1);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('chiba-aqualine-marathon-2026', NULL, NULL, '袖ケ浦の田園地帯', 'Sodegaura farmlands', NULL, NULL, 2);

-- ==================
-- 愛媛マラソン (ehime-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'ehime-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'ehime-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'ehime-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'ehime-marathon-2026';
DELETE FROM access_points WHERE race_id = 'ehime-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'ehime-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'ehime-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'ehime-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'ehime-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'ehime-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'ehime-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'ehime-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'ehime-marathon-2026';
DELETE FROM race_results WHERE race_id = 'ehime-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'ehime-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'ehime-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'ehime-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'ehime-marathon-2026',
  '愛媛マラソン',
  'Ehime Marathon',
  '2026-02-01',
  '38',
  '松山市',
  'Matsuyama City',
  '愛媛県松山市で開催されるフルマラソン。松山城や道後温泉など、歴史ある街並みを走る。レース後は道後温泉でリカバリー。',
  'A full marathon in Matsuyama, Ehime. Run through historic streets past Matsuyama Castle and Dogo Onsen. Recover at Dogo Onsen after the race.',
  'https://ehimemarathon.jp',
  0,
  1,
  10000,
  '2025-08-01',
  '2025-08-19',
  0,
  'pre_day',
  '',
  '',
  '["城下町","景色が良い","温泉"]',
  NULL,
  0,
  0,
  0,
  'road',
  '["JAAF"]',
  '松山城、道後温泉',
  'Matsuyama Castle, Dogo Onsen',
  NULL,
  NULL,
  'みかん',
  '#f97316',
  'Mikan',
  '蜜柑の香り漂う、瀬戸内の道を走る',
  'Run through the Seto Inland citrus country',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-05-25T01:17:59.684Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('ehime-marathon-2026', 'full', 42.195, 360, '10:00', 10000, 12900, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('ehime-marathon-2026', '温泉', '道後温泉', 'Dogo Onsen', '日本最古の温泉の一つ。フィニッシュ地点から近く、レース後のリカバリーに最適。夏目漱石の「坊ちゃん」の舞台としても有名。', 'One of Japan''s oldest hot springs. Close to the finish and perfect for post-race recovery. Famous as the setting of Natsume Soseki''s ''Botchan''.', 'フィニッシュ付近', NULL, 33.8492, 132.7867);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('ehime-marathon-2026', '観光地', '松山城', 'Matsuyama Castle', '現存12天守の一つ。コース上から望める。ロープウェイで天守閣へ。', 'One of Japan''s 12 surviving original castle keeps. Visible from the course. Ropeway access to the keep.', 'コース付近', NULL, 33.8456, 132.7656);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('ehime-marathon-2026', '["tshirt","towel"]', '大会オリジナルTシャツ、完走メダル、今治タオル（完走者）', 'Official race T-shirt, Finisher medal, Imabari towel (finishers)', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('ehime-marathon-2026', '["medal"]', '大会オリジナルTシャツ、完走メダル、今治タオル（完走者）', 'Official race T-shirt, Finisher medal, Imabari towel (finishers)', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('ehime-marathon-2026', NULL, '一般エントリー', 'General Entry', '2025-08-01', '2025-08-19', NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('ehime-marathon-2026', NULL, NULL, '松山城', 'Matsuyama Castle', NULL, NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('ehime-marathon-2026', NULL, NULL, '道後温泉', 'Dogo Onsen', NULL, NULL, 1);

-- ==================
-- 愛媛マラソン (ehime-marathon-2027)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'ehime-marathon-2027';
DELETE FROM race_categories WHERE race_id = 'ehime-marathon-2027';
DELETE FROM aid_stations WHERE race_id = 'ehime-marathon-2027';
DELETE FROM checkpoints WHERE race_id = 'ehime-marathon-2027';
DELETE FROM access_points WHERE race_id = 'ehime-marathon-2027';
DELETE FROM nearby_spots WHERE race_id = 'ehime-marathon-2027';
DELETE FROM weather_history WHERE race_id = 'ehime-marathon-2027';
DELETE FROM participation_gifts WHERE race_id = 'ehime-marathon-2027';
DELETE FROM completion_gifts WHERE race_id = 'ehime-marathon-2027';
DELETE FROM race_entry_links WHERE race_id = 'ehime-marathon-2027';
DELETE FROM race_entry_periods WHERE race_id = 'ehime-marathon-2027';
DELETE FROM reception_sessions WHERE race_id = 'ehime-marathon-2027';
DELETE FROM race_travel_times WHERE race_id = 'ehime-marathon-2027';
DELETE FROM race_results WHERE race_id = 'ehime-marathon-2027';
DELETE FROM race_gallery WHERE race_id = 'ehime-marathon-2027';
DELETE FROM race_voices WHERE race_id = 'ehime-marathon-2027';
DELETE FROM race_time_buckets WHERE race_id = 'ehime-marathon-2027';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'ehime-marathon-2027',
  '愛媛マラソン',
  'Ehime Marathon',
  '2027-02-07',
  '38',
  '松山市',
  'Matsuyama City',
  '愛媛県松山市で開催されるフルマラソン。松山城や道後温泉など、歴史ある街並みを走る。レース後は道後温泉でリカバリー。',
  'A full marathon in Matsuyama, Ehime. Run through historic streets past Matsuyama Castle and Dogo Onsen. Recover at Dogo Onsen after the race.',
  'https://ehimemarathon.jp',
  12900,
  1,
  10000,
  '2026-07-13',
  '2026-07-31',
  0,
  'both',
  '2027年2月6日（土）13:00〜18:00、2月7日（日）7:30〜9:00に城山公園にて受付。アスリートビブス引換QRコード（参加票）の提示が必要（本人来場のみ、代理受付不可）。',
  'Reception at Shiroyama Park on Sat, Feb 6, 2027 (13:00-18:00) and Sun, Feb 7, 2027 (7:30-9:00). Athlete bib exchange QR code (entry pass) required; participants must attend in person (no proxy).',
  '["城下町","景色が良い","温泉"]',
  NULL,
  0,
  0,
  0,
  'road',
  '["JAAF","WA","AIMS"]',
  '松山城、道後温泉',
  'Matsuyama Castle, Dogo Onsen',
  NULL,
  NULL,
  'みかん',
  '#f97316',
  'Mikan',
  '蜜柑の香り漂う、瀬戸内の道を走る',
  'Run through the Seto Inland citrus country',
  NULL,
  NULL,
  NULL,
  '城山公園',
  'Shiroyama Park',
  '愛媛県松山市堀之内',
  NULL,
  NULL,
  '2026-06-27T00:00:00Z',
  '2026-08-24T16:11:44.326Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('ehime-marathon-2027', 'full', 42.195, 360, '10:00', 10000, 12900, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  ('ehime-marathon-2027', 'JR松山駅', 'JR Matsuyama Station', '', '徒歩約15分', 'About 15 min walk', 0, 0, 15, 1, 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('ehime-marathon-2027', '温泉', '道後温泉', 'Dogo Onsen', '日本最古の温泉の一つ。フィニッシュ地点から近く、レース後のリカバリーに最適。夏目漱石の「坊ちゃん」の舞台としても有名。', 'One of Japan''s oldest hot springs. Close to the finish and perfect for post-race recovery. Famous as the setting of Natsume Soseki''s ''Botchan''.', 'フィニッシュ付近', NULL, 33.8492, 132.7867);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('ehime-marathon-2027', '観光地', '松山城', 'Matsuyama Castle', '現存12天守の一つ。コース上から望める。ロープウェイで天守閣へ。', 'One of Japan''s 12 surviving original castle keeps. Visible from the course. Ropeway access to the keep.', 'コース付近', NULL, 33.8456, 132.7656);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('ehime-marathon-2027', '["tshirt"]', '大会オリジナルTシャツ', 'Official race T-shirt', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('ehime-marathon-2027', '["medal","towel"]', '完走メダル、今治タオル（完走者）', 'Finisher medal, Imabari towel (finishers)', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('ehime-marathon-2027', NULL, 'アスリートエントリー', 'Athlete Entry', '2026-07-13', '2026-07-31', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('ehime-marathon-2027', NULL, 'ネットタイムアスリートエントリー', 'Net Time Athlete Entry', '2026-07-13', '2026-07-31', NULL, 1);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('ehime-marathon-2027', NULL, 'ランナーボランティア参加者エントリー', 'Runner Volunteer Entry', '2026-07-13', '2026-07-31', NULL, 2);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('ehime-marathon-2027', NULL, '一般エントリー', 'General Entry', '2026-08-03', '2026-08-20', NULL, 3);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('ehime-marathon-2027', NULL, 'ふるさと納税枠', 'Furusato Nozei Entry', '2026-08-03', '2026-09-14', 50000, 4);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('ehime-marathon-2027', NULL, NULL, '松山城', 'Matsuyama Castle', NULL, NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('ehime-marathon-2027', NULL, NULL, '道後温泉', 'Dogo Onsen', NULL, NULL, 1);

-- ==================
-- フードバレーとかちマラソン (foodvalley-tokachi-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'foodvalley-tokachi-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'foodvalley-tokachi-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'foodvalley-tokachi-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'foodvalley-tokachi-marathon-2026';
DELETE FROM access_points WHERE race_id = 'foodvalley-tokachi-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'foodvalley-tokachi-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'foodvalley-tokachi-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'foodvalley-tokachi-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'foodvalley-tokachi-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'foodvalley-tokachi-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'foodvalley-tokachi-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'foodvalley-tokachi-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'foodvalley-tokachi-marathon-2026';
DELETE FROM race_results WHERE race_id = 'foodvalley-tokachi-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'foodvalley-tokachi-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'foodvalley-tokachi-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'foodvalley-tokachi-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'foodvalley-tokachi-marathon-2026',
  'フードバレーとかちマラソン',
  'Food Valley Tokachi Marathon',
  '2026-10-25',
  '01',
  '帯広市',
  'Obihiro City',
  '北海道シーズン最後を飾るハーフマラソン。参加者全員に十勝の味覚を楽しめる「まんぷくクーポン」が贈られる。',
  'The last half marathon of Hokkaido''s road race season. All finishers receive a food coupon to enjoy Tokachi''s local cuisine.',
  'https://www.foodvalley-marathon.com/',
  6500,
  1,
  4000,
  '2026-06-22',
  '2026-09-06',
  0,
  'pre_mail',
  'アスリートビブス・計測チップ等は10月中旬頃までに事前送付される。当日忘れた場合はゴール会場の総合窓口で再発行可（ナンバーカード1,000円、計測チップ2,000円）。',
  'Athlete bibs and timing chips are mailed in advance by mid-October. Reissue available at the finish venue reception desk if forgotten (bib: ¥1,000, chip: ¥2,000).',
  '[]',
  NULL,
  0,
  0,
  0,
  'road',
  '["JAAF"]',
  '遠くに日高山脈を望みながら帯広市街地中心部を走る、タイムが出やすい平坦なコース',
  '',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '北海道シーズン最後を飾る、十勝の味覚めぐりハーフ',
  'Hokkaido''s season-closing half marathon through Tokachi''s food culture',
  NULL,
  NULL,
  NULL,
  '帯広市',
  'Obihiro City',
  '北海道帯広市西2条南8丁目',
  NULL,
  NULL,
  '2026-08-25T00:00:00Z',
  '2026-08-31T13:24:16.479Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('foodvalley-tokachi-marathon-2026', 'half', 21.1, 180, '08:30', 4000, 6500, 5900, 'ハーフマラソン', 'Half Marathon', '高校生5,900円', 'High school student: ¥5,900', NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('foodvalley-tokachi-marathon-2026', '5k', 5, 50, '', 0, 3950, 1900, '5km', '5km', '中学生1,900円', 'Junior high school student: ¥1,900', NULL, NULL, NULL, '[]', 1);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('foodvalley-tokachi-marathon-2026', 'other', 2.5, 30, '', 0, 2950, 1900, '2.5km', '2.5km', '一般・高校生2,950円、中学生1,900円、小学生1,200円', 'General/high school: ¥2,950, Middle school: ¥1,900, Elementary school: ¥1,200', NULL, NULL, NULL, '[]', 2);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  ('foodvalley-tokachi-marathon-2026', '帯広駅', 'Obihiro Station', '', '徒歩約10分', 'About 10 min walk', 0, 0, 10, 1, 0);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('foodvalley-tokachi-marathon-2026', '[]', '参加賞、大会オリジナルタオル、会場内の飲食・物販ブースで使用できる食券（550円分）', 'Finisher gift, original towel, and food voucher (¥550) usable at venue food stalls', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('foodvalley-tokachi-marathon-2026', NULL, '一般エントリー', 'General Entry', '2026-06-22', '2026-09-06', NULL, 0);

-- ==================
-- 富士登山競走 (fuji-mountain-race-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'fuji-mountain-race-2026';
DELETE FROM race_categories WHERE race_id = 'fuji-mountain-race-2026';
DELETE FROM aid_stations WHERE race_id = 'fuji-mountain-race-2026';
DELETE FROM checkpoints WHERE race_id = 'fuji-mountain-race-2026';
DELETE FROM access_points WHERE race_id = 'fuji-mountain-race-2026';
DELETE FROM nearby_spots WHERE race_id = 'fuji-mountain-race-2026';
DELETE FROM weather_history WHERE race_id = 'fuji-mountain-race-2026';
DELETE FROM participation_gifts WHERE race_id = 'fuji-mountain-race-2026';
DELETE FROM completion_gifts WHERE race_id = 'fuji-mountain-race-2026';
DELETE FROM race_entry_links WHERE race_id = 'fuji-mountain-race-2026';
DELETE FROM race_entry_periods WHERE race_id = 'fuji-mountain-race-2026';
DELETE FROM reception_sessions WHERE race_id = 'fuji-mountain-race-2026';
DELETE FROM race_travel_times WHERE race_id = 'fuji-mountain-race-2026';
DELETE FROM race_results WHERE race_id = 'fuji-mountain-race-2026';
DELETE FROM race_gallery WHERE race_id = 'fuji-mountain-race-2026';
DELETE FROM race_voices WHERE race_id = 'fuji-mountain-race-2026';
DELETE FROM race_time_buckets WHERE race_id = 'fuji-mountain-race-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'fuji-mountain-race-2026',
  '富士登山競走',
  'FUJI MOUNTAIN RACE',
  '2026-07-24',
  '19',
  '富士吉田市',
  'Fujiyoshida City',
  '',
  '',
  'https://fujimountainrace.city.fujiyoshida.yamanashi.jp/',
  NULL,
  1,
  0,
  '2026-03-28',
  '2026-04-06',
  1,
  'pre_mail',
  '受付不要。事前発送とする。
申込後の住所変更、その他の変更事項については、必ず事務局へ連絡すること。
大会当日、ナンバーカード、計測用RSタグを忘れると出走できなくなるので、注意すること。
（やむを得ず、当日再発行の場合は、別途再発行手数料を徴収する）',
  'No on-site registration is required. All materials will be sent in advance.
Please be sure to contact the organizing committee regarding any changes to your address or other details after registration.
Please note that if you forget your race number or timing chip on the day of the event, you will not be able to participate.
(If reissuance is unavoidably necessary on the day of the event, a separate reissuance fee will be charged.)',
  '[]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  '',
  '',
  '',
  '',
  '霊峰',
  '#4b5563',
  'Reiho',
  'この山の頂には過酷に挑む価値がある',
  'The summit of this mountain is well worth the challenge',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '2026-04-28T16:44:56.479Z',
  '2026-04-28T16:44:56.479Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('fuji-mountain-race-2026', 'other', 21, 260, '07:00', 1770, 18000, NULL, '山頂コース', NULL, NULL, NULL, '第76回大会、第77回大会、第78回大会のいずれかにおいて五合目関門（五合目ゴール）通過時間が2時間20分以内の実績のある者。又は、第2回富士山クライムランにおいて五合目ゴール時間が2時間以内の実績がある者とする。 過去(第76回、第77回、第78回)の大会の記録についてはこちらからご確認ください。 第2回富士山クライムランの記録についてはこちらからご確認ください。', 'Participants must have completed the 5th Station checkpoint (5th Station finish) in 2 hours and 20 minutes or less in either the 76th, 77th, or 78th edition of the race. Alternatively, participants must have completed the 5th Station finish in 2 hours or less in the 2nd Mount Fuji Climb Run. Please click here to view records from past editions (76th, 77th, and 78th). Please click here to view records from the 2nd Mt. Fuji Climb Run.  Translated with DeepL.com (free version)', 'fuji-mountain-race-2026.gpx', '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('fuji-mountain-race-2026', 'other', 15, 210, '08:30', 1521, 14000, NULL, '五合目コース', NULL, NULL, NULL, NULL, NULL, 'fuji-mountain-race-2026-5gome', '[]', 1);
INSERT OR REPLACE INTO race_entry_links (race_id, site_name, url, sort_order) VALUES
  ('fuji-mountain-race-2026', 'RUNNET', 'https://runnet.jp/parts/2026/386774/entry.html', 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('fuji-mountain-race-2026', NULL, '一般エントリー', 'General Entry', '2026-03-28', '2026-04-06', NULL, 0);

-- ==================
-- 富士山マラソン (fujisan-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'fujisan-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'fujisan-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'fujisan-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'fujisan-marathon-2026';
DELETE FROM access_points WHERE race_id = 'fujisan-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'fujisan-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'fujisan-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'fujisan-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'fujisan-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'fujisan-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'fujisan-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'fujisan-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'fujisan-marathon-2026';
DELETE FROM race_results WHERE race_id = 'fujisan-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'fujisan-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'fujisan-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'fujisan-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'fujisan-marathon-2026',
  '富士山マラソン',
  'Mt. Fuji Marathon',
  '2026-12-13',
  '19',
  '富士河口湖町',
  'Fujikawaguchiko Town',
  '河口湖・西湖を走るフルマラソン。紅葉の富士山を望む絶景コース。制限時間6時間。',
  'A full marathon around Lake Kawaguchi and Lake Saiko. Spectacular autumn views of Mt. Fuji. 6-hour time limit.',
  'https://mtfujimarathon.com/',
  NULL,
  1,
  0,
  '2026-04-20',
  '2026-08-31',
  0,
  'pre_day',
  '',
  '',
  '["富士山","景色が良い","湖畔","紅葉"]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  '河口湖、西湖、紅葉の富士山',
  'Lake Kawaguchi, Lake Saiko, Mt. Fuji with autumn foliage',
  NULL,
  NULL,
  '富士山',
  '#2a4fa3',
  'Fujisan',
  '霊峰富士を望みながら駆ける、絶景のコース',
  'Run with Japan''s sacred peak as your guide',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-08-24T16:25:12.506Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('fujisan-marathon-2026', 'full', 42.195, 360, '09:00', 0, 12900, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'fujisan-marathon-2026.kml', '[]', 0);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  ('fujisan-marathon-2026', '河口湖駅', 'Kawaguchiko Station', '', '徒歩7分', '7 min walk', 0, 0, 7, 1, 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('fujisan-marathon-2026', '温泉', '河口湖温泉', 'Lake Kawaguchi Onsen', '河口湖畔の温泉。富士山を望む露天風呂が魅力。レース後に最適。', 'Hot springs on the shore of Lake Kawaguchi. Open-air baths with Mt. Fuji views.', '会場付近', NULL, 35.51, 138.75);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('fujisan-marathon-2026', '["tshirt"]', '大会Tシャツ', 'Race T-shirt', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('fujisan-marathon-2026', '["medal","towel"]', '完走メダル、フィニッシャータオル', 'Finisher medal, Finisher towel', NULL, 0);
INSERT OR REPLACE INTO race_entry_links (race_id, site_name, url, sort_order) VALUES
  ('fujisan-marathon-2026', 'RUNNET', 'https://runnet.jp/parts/2026/392477/entry2.html', 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('fujisan-marathon-2026', NULL, '富士河口湖町民限定エントリー', 'Fujikawaguchiko Residents Entry', '2026-04-20', '2026-07-31', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('fujisan-marathon-2026', NULL, 'アーリーエントリー（国内在住者）', 'Early Entry (Japanese Residents)', '2026-04-20', '2026-05-04', NULL, 1);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('fujisan-marathon-2026', NULL, '一般エントリー（国内在住者）', 'General Entry (Japanese Residents)', '2026-05-07', '2026-08-31', 12900, 2);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('fujisan-marathon-2026', NULL, '海外在住者ツアーエントリー', 'Tour Package for International Residents', '2026-05-07', NULL, NULL, 3);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('fujisan-marathon-2026', NULL, '外国人居住者エントリー', 'International Residents Entry', '2026-06-01', NULL, NULL, 4);

-- ==================
-- 福知山マラソン (fukuchiyama-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'fukuchiyama-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'fukuchiyama-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'fukuchiyama-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'fukuchiyama-marathon-2026';
DELETE FROM access_points WHERE race_id = 'fukuchiyama-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'fukuchiyama-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'fukuchiyama-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'fukuchiyama-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'fukuchiyama-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'fukuchiyama-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'fukuchiyama-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'fukuchiyama-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'fukuchiyama-marathon-2026';
DELETE FROM race_results WHERE race_id = 'fukuchiyama-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'fukuchiyama-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'fukuchiyama-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'fukuchiyama-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'fukuchiyama-marathon-2026',
  '福知山マラソン',
  'Fukuchiyama Marathon',
  '2026-11-22',
  '26',
  '福知山市',
  'Fukuchiyama City',
  '京都府福知山市で開催される歴史あるフルマラソン。由良川沿いの起伏あるコースが特徴で、ランナーの実力が試される大会として知られる。三段池扶桑化学工業アリーナ西側をスタート・ゴールとする。',
  'A historic full marathon held in Fukuchiyama City, Kyoto Prefecture. Known for its challenging course along the Yura River with rolling hills. Starts and finishes at the west side of Sandaike Fusokagaku Arena.',
  'https://fukuchiyama-marathon.com/',
  10000,
  1,
  6000,
  '2026-05-01',
  '2026-05-31',
  0,
  'both',
  '参加賞受付：大会前日13:00〜17:00、当日7:00〜大会終了',
  'Race pack pickup: Day before 13:00-17:00, Race day 7:00 until event ends',
  '["歴史ある大会"]',
  NULL,
  0,
  0,
  0,
  'road',
  '["JAAF"]',
  '由良川沿い、福知山城周辺',
  'Along Yura River, near Fukuchiyama Castle',
  NULL,
  NULL,
  '福知山城',
  '#78350f',
  'Fukuchiyama-jo',
  '城下町・福知山の歴史街道を駆け抜ける',
  'Run through the historic castle town of Fukuchiyama',
  NULL,
  NULL,
  NULL,
  '三段池扶桑化学工業アリーナ',
  'Sandanike Fuso Kagaku Kogyo Arena',
  NULL,
  NULL,
  NULL,
  '2026-04-30T00:00:00Z',
  '2026-08-24T16:26:12.525Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('fukuchiyama-marathon-2026', 'full', 42.195, 360, '', 5400, 11000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  ('fukuchiyama-marathon-2026', 'JR福知山駅', 'JR Fukuchiyama Station', '', '無料シャトルバスを利用', 'Free shuttle bus', 0, 0, NULL, 1, 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('fukuchiyama-marathon-2026', '観光地', '福知山城', 'Fukuchiyama Castle', '明智光秀が築いた城。天守からは福知山市街と由良川を一望できる。', 'Castle built by Akechi Mitsuhide. The tower offers a panoramic view of Fukuchiyama and the Yura River.', '福知山市中心部', NULL, 35.3014, 135.1183);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('fukuchiyama-marathon-2026', '温泉', '天の湯', 'Ame no Yu Hot Spring', '福知山市内の温泉施設。レース後のリカバリーに利用できる。', 'Hot spring facility in Fukuchiyama. Available for post-race recovery.', '福知山市内', NULL, 35.295, 135.12);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('fukuchiyama-marathon-2026', '["tshirt"]', '完走メダル、大会オリジナルTシャツ（レイト・直前申込を除く）', 'Finisher medal, Official race T-shirt (excluding late/last-minute entries)', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('fukuchiyama-marathon-2026', '["medal"]', '完走メダル、大会オリジナルTシャツ（レイト・直前申込を除く）', 'Finisher medal, Official race T-shirt (excluding late/last-minute entries)', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('fukuchiyama-marathon-2026', NULL, '先行エントリー', 'Early Bird', '2026-05-01', '2026-05-31', 10000, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('fukuchiyama-marathon-2026', NULL, '一般', 'General', '2026-06-01', '2026-09-20', 11000, 1);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('fukuchiyama-marathon-2026', NULL, '直前（参加賞なし）', 'Last-minute (no participation gift)', '2026-11-01', '2026-11-15', 11000, 2);

-- ==================
-- ふくい桜マラソン (fukui-sakura-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'fukui-sakura-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'fukui-sakura-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'fukui-sakura-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'fukui-sakura-marathon-2026';
DELETE FROM access_points WHERE race_id = 'fukui-sakura-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'fukui-sakura-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'fukui-sakura-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'fukui-sakura-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'fukui-sakura-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'fukui-sakura-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'fukui-sakura-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'fukui-sakura-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'fukui-sakura-marathon-2026';
DELETE FROM race_results WHERE race_id = 'fukui-sakura-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'fukui-sakura-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'fukui-sakura-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'fukui-sakura-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'fukui-sakura-marathon-2026',
  'ふくい桜マラソン',
  'Fukui Sakura Marathon',
  '2026-03-29',
  '18',
  '福井市',
  'Fukui City',
  '2024年に始まった福井県のフルマラソン。桜並木と恐竜博物館で知られる福井を走る。制限時間7時間。',
  'Fukui Prefecture''s marathon started in 2024. Run through Fukui known for cherry blossoms and the Dinosaur Museum. 7-hour time limit.',
  'https://www.fukui-sakura-marathon.jp',
  14000,
  1,
  13200,
  '2025-09-25',
  '2025-11-10',
  0,
  'pre_day',
  '',
  '',
  '["初心者おすすめ","桜"]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  '桜並木、足羽川',
  'Cherry blossom trees, Asuwa River',
  NULL,
  NULL,
  '桜',
  '#f9c1cc',
  'Sakura',
  '福井の桜回廊を巡る、春の42km',
  'A spring 42km through Fukui''s cherry blossom corridors',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-05-25T01:18:51.816Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('fukui-sakura-marathon-2026', 'full', 42.195, 420, '08:30', 13200, 14000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('fukui-sakura-marathon-2026', '5k', 5, 0, '09:15', 1300, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 1);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('fukui-sakura-marathon-2026', 'other', 1.5, 0, '09:30', 500, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 2);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('fukui-sakura-marathon-2026', '観光地', '永平寺', 'Eiheiji Temple', '曹洞宗の大本山。荘厳な修行道場。福井市から車約30分。', 'The head temple of Soto Zen. A solemn training monastery. About 30 min by car from Fukui city.', '福井市から車約30分', NULL, 36.0833, 136.35);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('fukui-sakura-marathon-2026', 'グルメ', '越前おろしそば', 'Echizen Oroshi Soba', '大根おろしとだしで食べる福井名物のそば。レース後のエネルギー補給に。', 'Fukui''s specialty soba with grated radish and broth. For post-race energy.', '福井市内', NULL, 36.0652, 136.2199);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('fukui-sakura-marathon-2026', '["tshirt","towel"]', '大会Tシャツ、完走メダル、フィニッシャータオル', 'Race T-shirt, Finisher medal, Finisher towel', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('fukui-sakura-marathon-2026', '["medal"]', '大会Tシャツ、完走メダル、フィニッシャータオル', 'Race T-shirt, Finisher medal, Finisher towel', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('fukui-sakura-marathon-2026', NULL, '一般エントリー', 'General Entry', '2025-09-25', '2025-11-10', NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('fukui-sakura-marathon-2026', NULL, NULL, '桜並木', 'Cherry blossom trees', NULL, NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('fukui-sakura-marathon-2026', NULL, NULL, '足羽川', 'Asuwa River', NULL, NULL, 1);

-- ==================
-- ふくい桜マラソン (fukui-sakura-marathon-2027)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'fukui-sakura-marathon-2027';
DELETE FROM race_categories WHERE race_id = 'fukui-sakura-marathon-2027';
DELETE FROM aid_stations WHERE race_id = 'fukui-sakura-marathon-2027';
DELETE FROM checkpoints WHERE race_id = 'fukui-sakura-marathon-2027';
DELETE FROM access_points WHERE race_id = 'fukui-sakura-marathon-2027';
DELETE FROM nearby_spots WHERE race_id = 'fukui-sakura-marathon-2027';
DELETE FROM weather_history WHERE race_id = 'fukui-sakura-marathon-2027';
DELETE FROM participation_gifts WHERE race_id = 'fukui-sakura-marathon-2027';
DELETE FROM completion_gifts WHERE race_id = 'fukui-sakura-marathon-2027';
DELETE FROM race_entry_links WHERE race_id = 'fukui-sakura-marathon-2027';
DELETE FROM race_entry_periods WHERE race_id = 'fukui-sakura-marathon-2027';
DELETE FROM reception_sessions WHERE race_id = 'fukui-sakura-marathon-2027';
DELETE FROM race_travel_times WHERE race_id = 'fukui-sakura-marathon-2027';
DELETE FROM race_results WHERE race_id = 'fukui-sakura-marathon-2027';
DELETE FROM race_gallery WHERE race_id = 'fukui-sakura-marathon-2027';
DELETE FROM race_voices WHERE race_id = 'fukui-sakura-marathon-2027';
DELETE FROM race_time_buckets WHERE race_id = 'fukui-sakura-marathon-2027';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'fukui-sakura-marathon-2027',
  'ふくい桜マラソン',
  'Fukui Sakura Marathon',
  '2027-03-28',
  '18',
  '福井市',
  'Fukui City',
  '2024年に始まった福井県のフルマラソン。桜並木と恐竜博物館で知られる福井を走る。制限時間7時間。',
  'Fukui Prefecture''s marathon started in 2024. Run through Fukui known for cherry blossoms and the Dinosaur Museum. 7-hour time limit.',
  'https://www.fukui-sakura-marathon.jp',
  14000,
  1,
  13200,
  '2026-09-20',
  '2026-11-09',
  0,
  'pre_mail',
  '',
  '',
  '["初心者おすすめ","桜"]',
  NULL,
  0,
  0,
  15,
  'road',
  '["JAAF","AIMS"]',
  'さくら通り、新九頭竜橋、丸岡城周辺',
  'Sakura-dori Ave, Shin-Kuzuryu Bridge, Marukoka Castle area',
  '高低差15mのフラットなコース',
  'Flat course with 15m elevation difference',
  '桜',
  '#f9c1cc',
  'Sakura',
  '福井の桜回廊を巡る、春の42km',
  'A spring 42km through Fukui''s cherry blossom corridors',
  NULL,
  NULL,
  NULL,
  '大名町交差点付近',
  'Near Daimyocho Intersection',
  '福井県福井市大名町（福井駅から徒歩約7分）',
  NULL,
  NULL,
  '2026-08-25T00:00:00Z',
  '2026-08-31T13:25:38.211Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('fukui-sakura-marathon-2027', 'full', 42.195, 420, '08:30', 13200, 14000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('fukui-sakura-marathon-2027', '5k', 5, 45, '09:15', 1300, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 1);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('fukui-sakura-marathon-2027', 'other', 1.5, 30, '09:30', 500, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 2);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('fukui-sakura-marathon-2027', '観光地', '永平寺', 'Eiheiji Temple', '曹洞宗の大本山。荘厳な修行道場。福井市から車約30分。', 'The head temple of Soto Zen. A solemn training monastery. About 30 min by car from Fukui city.', '福井市から車約30分', NULL, 36.0833, 136.35);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('fukui-sakura-marathon-2027', 'グルメ', '越前おろしそば', 'Echizen Oroshi Soba', '大根おろしとだしで食べる福井名物のそば。レース後のエネルギー補給に。', 'Fukui''s specialty soba with grated radish and broth. For post-race energy.', '福井市内', NULL, 36.0652, 136.2199);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('fukui-sakura-marathon-2027', '["tshirt","towel"]', '大会Tシャツ、完走メダル、フィニッシャータオル', 'Race T-shirt, Finisher medal, Finisher towel', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('fukui-sakura-marathon-2027', '["medal"]', '大会Tシャツ、完走メダル、フィニッシャータオル', 'Race T-shirt, Finisher medal, Finisher towel', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('fukui-sakura-marathon-2027', NULL, '県民先行エントリー', 'Fukui Resident Priority Entry', '2026-09-20', '2026-09-24', 14000, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('fukui-sakura-marathon-2027', NULL, 'グループ割エントリー', 'Group Discount Entry', '2026-09-20', '2026-09-24', 12000, 1);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('fukui-sakura-marathon-2027', NULL, '一般エントリー', 'General Entry', '2026-09-26', '2026-11-09', 14000, 2);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('fukui-sakura-marathon-2027', NULL, NULL, 'さくら通り', 'Sakura-dori Avenue', NULL, NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('fukui-sakura-marathon-2027', NULL, NULL, '新九頭竜橋', 'Shin-Kuzuryu Bridge', NULL, NULL, 1);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('fukui-sakura-marathon-2027', NULL, NULL, '丸岡城周辺', 'Marukoka Castle area', NULL, NULL, 2);

-- ==================
-- 福岡国際マラソン (fukuoka-international-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'fukuoka-international-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'fukuoka-international-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'fukuoka-international-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'fukuoka-international-marathon-2026';
DELETE FROM access_points WHERE race_id = 'fukuoka-international-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'fukuoka-international-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'fukuoka-international-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'fukuoka-international-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'fukuoka-international-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'fukuoka-international-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'fukuoka-international-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'fukuoka-international-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'fukuoka-international-marathon-2026';
DELETE FROM race_results WHERE race_id = 'fukuoka-international-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'fukuoka-international-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'fukuoka-international-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'fukuoka-international-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'fukuoka-international-marathon-2026',
  '福岡国際マラソン',
  'Fukuoka International Marathon',
  '2026-12-06',
  '40',
  '福岡市',
  'Fukuoka City',
  '歴史ある国際マラソン大会。2022年に一度終了したが復活。エリートランナー向け。MGCシリーズG1大会。',
  'A historic international marathon. Once ended in 2022 but revived. For elite runners. MGC Series G1 event.',
  'https://www.fukuoka-international-marathon.jp/',
  0,
  1,
  0,
  NULL,
  '2026-09-11',
  0,
  'pre_day',
  '',
  '',
  '["エリート大会","日本陸連公認","歴史ある大会"]',
  NULL,
  0,
  0,
  0,
  'road',
  '["JAAF"]',
  '平和台陸上競技場、大濠公園、海の中道方面',
  'Heiwadai Athletics Stadium, Ohori Park, Uminonakamichi area',
  NULL,
  NULL,
  '博多',
  '#1e3a5f',
  'Hakata',
  '国際都市・福岡が誇る、世界へ続く道',
  'A world-class course in the international city of Fukuoka',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-08-24T16:26:22.276Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('fukuoka-international-marathon-2026', 'full', 42.195, 155, '12:10', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('fukuoka-international-marathon-2026', 'グルメ', '博多ラーメン・もつ鍋', 'Hakata Ramen & Motsunabe', '福岡を代表するグルメ。中洲や天神の屋台街で楽しめる。', 'Fukuoka''s iconic dishes. Enjoy at street stalls in Nakasu and Tenjin.', '天神・中洲エリア', NULL, 33.5917, 130.4017);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('fukuoka-international-marathon-2026', '["tshirt"]', '大会Tシャツ', 'Race T-shirt', NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('fukuoka-international-marathon-2026', NULL, NULL, '平和台陸上競技場', 'Heiwadai Athletics Stadium', NULL, NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('fukuoka-international-marathon-2026', NULL, NULL, '大濠公園', 'Ohori Park', NULL, NULL, 1);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('fukuoka-international-marathon-2026', NULL, NULL, '海の中道方面', 'Uminonakamichi area', NULL, NULL, 2);

-- ==================
-- 福岡マラソン (fukuoka-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'fukuoka-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'fukuoka-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'fukuoka-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'fukuoka-marathon-2026';
DELETE FROM access_points WHERE race_id = 'fukuoka-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'fukuoka-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'fukuoka-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'fukuoka-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'fukuoka-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'fukuoka-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'fukuoka-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'fukuoka-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'fukuoka-marathon-2026';
DELETE FROM race_results WHERE race_id = 'fukuoka-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'fukuoka-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'fukuoka-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'fukuoka-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'fukuoka-marathon-2026',
  '福岡マラソン',
  'Fukuoka Marathon',
  '2026-11-08',
  '40',
  '福岡市',
  'Fukuoka City',
  '福岡市の中心部・天神をスタートし、糸島市までを走るフルマラソン。博多湾や玄界灘を望む海沿いのコースが続き、九州の大自然と都市の景観を同時に楽しめる。',
  'A full marathon starting from Tenjin in central Fukuoka and finishing in Itoshima City. The course runs along the coast with views of Hakata Bay and the Genkai Sea.',
  'https://www.f-marathon.jp/',
  16000,
  1,
  15020,
  '2026-04-20',
  '2026-05-20',
  0,
  'pre_day',
  '',
  '',
  '["海沿い"]',
  NULL,
  0,
  0,
  0,
  'road',
  '["JAAF"]',
  '天神スタート、博多湾沿い、玄界灘、糸島フィニッシュ',
  'Tenjin start, Hakata Bay coastline, Genkai Sea, Itoshima finish',
  NULL,
  NULL,
  '博多湾',
  '#0284c7',
  'Hakata-wan',
  '博多の海沿いを走る、秋の風物詩',
  'Run along Hakata Bay in autumn',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '2026-04-30T00:00:00Z',
  '2026-08-31T13:26:34.332Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('fukuoka-marathon-2026', 'full', 42.195, 420, '08:20', 13000, 16000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('fukuoka-marathon-2026', (SELECT id FROM race_categories WHERE race_id = 'fukuoka-marathon-2026' AND distance_type = 'full' ORDER BY id DESC LIMIT 1), 5, 'シーサイドももち', NULL, '福岡タワーやみずほPayPayドーム福岡など、福岡を代表する観光スポットが並ぶシーサイドももち地区では、近代的できれいな街並みが楽しめます。かつての百道（ももち）の海岸が漫画『サザエさん』発案の地であることから、地元市民の声を受けて、2012年5月に「サザエさん通り」が誕生しました。', NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('fukuoka-marathon-2026', (SELECT id FROM race_categories WHERE race_id = 'fukuoka-marathon-2026' AND distance_type = 'full' ORDER BY id DESC LIMIT 1), 11, '生の松原・長垂海岸', NULL, '白砂青松百選の生の松原は、元寇防塁があることでも有名です。美しい松林を抜けるとコース右手に博多湾が広がり、四季折々の花が咲く能古島が一望できます。', NULL, 1);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('fukuoka-marathon-2026', (SELECT id FROM race_categories WHERE race_id = 'fukuoka-marathon-2026' AND distance_type = 'full' ORDER BY id DESC LIMIT 1), 20, '九州大学伊都キャンパス', NULL, '2018年に移転が完了した九州大学伊都キャンパスは、みずほPayPayドーム福岡約40個分の広さを誇り、その雄大さは圧巻です。キャンパスの入口に向かう緩やかな坂道は、コース前半の山場になるでしょう。ここは、沿道の声援を力にして乗り切りましょう！', NULL, 2);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('fukuoka-marathon-2026', (SELECT id FROM race_categories WHERE race_id = 'fukuoka-marathon-2026' AND distance_type = 'full' ORDER BY id DESC LIMIT 1), 29, '海づり公園', NULL, '福岡市西区の今津・北崎エリアは、海づり公園のほかにカフェやお食事処、牡蠣小屋があり、週末には多くの人が訪れます。博多湾に目を向けると、遠くには福岡タワーや金印で有名な志賀島が望めます', NULL, 3);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('fukuoka-marathon-2026', (SELECT id FROM race_categories WHERE race_id = 'fukuoka-marathon-2026' AND distance_type = 'full' ORDER BY id DESC LIMIT 1), 35, '二見ヶ浦', NULL, 'コース後半の高低差25mの山場を過ぎると、玄界灘の美しい海岸線が見えてきます。渚百選・夕陽百選の一つである二見ヶ浦は、福岡市と糸島市の境にある観光スポットで、付近はおしゃれな飲食店が並び、親子連れやカップル、また多くの観光客で賑わいます。', NULL, 4);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('fukuoka-marathon-2026', '観光地', '天神・博多エリア', 'Tenjin & Hakata Area', 'スタート地点の天神は福岡最大の繁華街。大会前後のショッピング・グルメに便利。', 'Tenjin, the start point, is Fukuoka''s largest shopping district. Convenient for pre/post-race dining and shopping.', 'スタート地点', NULL, 33.5904, 130.399);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('fukuoka-marathon-2026', 'グルメ', '糸島グルメ', 'Itoshima Gourmet', 'フィニッシュ地点の糸島は新鮮な海産物とカフェが人気のエリア。完走後に楽しめる。', 'Itoshima, the finish area, is popular for fresh seafood and cafes. Enjoy after completing the race.', 'フィニッシュ地点周辺', NULL, 33.5563, 130.1968);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('fukuoka-marathon-2026', '温泉', '二丈温泉きららの湯', 'Nijo Onsen Kirara no Yu', '糸島・二丈エリアの温泉施設。コース沿いでレース後のリカバリーに最適。', 'Hot spring facility in the Itoshima/Nijo area. Ideal for post-race recovery near the course.', '糸島市内', NULL, 33.54, 130.16);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('fukuoka-marathon-2026', '["tshirt"]', '大会オリジナルTシャツ（有償・希望者のみ）', 'Official race T-shirt (paid, optional)', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('fukuoka-marathon-2026', '["medal","towel"]', '完走メダル、スポーツタオル（マラソンの部のみ）', 'Finisher medal, sports towel (marathon only)', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('fukuoka-marathon-2026', NULL, '一般エントリー', 'General Entry', '2026-04-20', '2026-05-20', 16000, 0);

-- ==================
-- ぐんまマラソン (gunma-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'gunma-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'gunma-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'gunma-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'gunma-marathon-2026';
DELETE FROM access_points WHERE race_id = 'gunma-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'gunma-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'gunma-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'gunma-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'gunma-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'gunma-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'gunma-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'gunma-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'gunma-marathon-2026';
DELETE FROM race_results WHERE race_id = 'gunma-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'gunma-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'gunma-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'gunma-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'gunma-marathon-2026',
  'ぐんまマラソン',
  'Gunma Marathon',
  '2026-11-03',
  '10',
  '前橋市〜高崎市',
  'Maebashi to Takasaki',
  '群馬県の前橋市と高崎市を結ぶフルマラソン。赤城山や榛名山を望みながら走る。ニューイヤー駅伝のコースも一部走れる。',
  'A marathon connecting Maebashi and Takasaki in Gunma. Run with views of Mt. Akagi and Mt. Haruna. Part of the course overlaps with the New Year Ekiden.',
  'https://www.g-marathon.com/',
  13500,
  1,
  5500,
  '2026-04-09',
  '2026-08-17',
  0,
  'pre_mail',
  '参加者には、アスリートビブス、計測チップ、参加マニュアル等を申込時の住所に事前に発送します（10月下旬発送予定）。大会前日・当日の受付は行いません。

エントリー締切後の住所変更は、郵便局にて転送手続きをお願いします。
計測チップは、アスリートビブスに貼り付けてあります。外さずに参加してください。なお、詳細につきましてはアスリートビブスが入ったビニール袋同封の案内をご覧ください。
大会にエントリー後、出場できなくなった場合のご連絡は不要です。参加賞の受取方法は「参加マニュアル」をご参照ください。',
  'Participants will receive their athlete bibs, timing chips, and participation manuals in advance at the address provided during registration (scheduled for late October). There will be no registration on the day before or the day of the event.

For address changes after the entry deadline, please arrange for mail forwarding at the post office.

The timing chip is attached to the athlete bib. Please do not remove it during the event. For further details, please refer to the instructions enclosed in the plastic bag containing the athlete bib.

If you are unable to participate after registering, you do not need to contact us. Please refer to the "Participation Manual" for instructions on how to receive your participation prize.',
  '["景色が良い"]',
  NULL,
  0,
  0,
  63,
  'road',
  '["JAAF"]',
  '赤城山、榛名山、利根川、正田醤油スタジアム群馬',
  'Mt. Akagi, Mt. Haruna, Tone River, Shoda Shoyu Stadium Gunma',
  NULL,
  NULL,
  '赤城山',
  '#166534',
  'Akagi-san',
  '赤城を仰ぎ、前橋の大地を駆ける',
  'Run across Maebashi plain with Mt. Akagi in view',
  NULL,
  NULL,
  NULL,
  '正田醤油スタジアム群馬',
  'Shoda Shoyu Stadium Gunma',
  NULL,
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-07-31T14:28:47.306Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('gunma-marathon-2026', 'full', 42.195, 360, '08:55', 5500, 13500, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('gunma-marathon-2026', '10k', 10, 90, '10:00', 4000, 6500, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 1);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  ('gunma-marathon-2026', '前橋駅', 'Maebashi Station', '', '無料シャトルバス利用（5〜10分間隔）', 'Free shuttle bus (every 5–10 min)', 0, 0, 0, 1, 0);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  ('gunma-marathon-2026', '新前橋駅', 'Shin-Maebashi Station', '', '無料シャトルバス利用（5〜10分間隔）', 'Free shuttle bus (every 5–10 min)', 0, 0, 0, 0, 1);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  ('gunma-marathon-2026', '高崎駅', 'Takasaki Station', '', '無料シャトルバス利用（5〜10分間隔）', 'Free shuttle bus (every 5–10 min)', 0, 0, 0, 0, 2);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('gunma-marathon-2026', '温泉', '伊香保温泉', 'Ikaho Onsen', '石段街で有名な群馬の温泉地。黄金の湯と白銀の湯の2種。前橋から車約40分。', 'Famous for its stone steps. Two types of springs: Golden and Silver. About 40 min by car from Maebashi.', '前橋市から車約40分', 'https://www.ikaho-kankou.com/', 36.4886, 138.9311);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('gunma-marathon-2026', '観光地', '富岡製糸工場', 'Tomioka Silk Mill', '明治5年（1872）に明治政府が設立した官営の器械製糸場です。民営化後も一貫して製糸を行い、製糸技術開発の最先端として国内養蚕・製糸業を世界一の水準に牽引しました。また、田島家、高山社、荒船風穴などと連携して、蚕の優良品種の開発と普及を主導しました。和洋技術を混交した工場建築の代表であり、長さ100ｍを超える木骨煉瓦造の2棟の置繭所や繰糸所など、主要な施設が創業当時のまま、ほぼ完全に残されています。', 'This was a government-run mechanical silk mill established by the Meiji government in 1872. Even after its privatization, it continued to produce silk and, as a leader in silk-reeling technology development, propelled Japan’s sericulture and silk-reeling industries to the world’s highest standards. Furthermore, in collaboration with the Tajima family, the Takayama Society, and the Arafune Wind Cave, it led the development and dissemination of superior silkworm breeds. It is a prime example of factory architecture blending Japanese and Western styles, and major facilities—including two wooden-framed brick cocoon storage buildings and a reeling workshop, each over 100 meters long—remain almost entirely intact as they were at the time of the factory’s founding.

Translated with DeepL.com (free version)', '', 'https://worldheritage.pref.gunma.jp/whc/', 36.2551968, 138.8850047);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('gunma-marathon-2026', '["tshirt"]', '大会Tシャツ（ミントブルー基調、ぐんまちゃんデザイン）', 'Race T-shirt (mint blue, Gunma-chan design)', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('gunma-marathon-2026', '["towel"]', 'フルマラソン完走記念タオル（スポーツタオル、ミントブルー基調）', 'Full marathon finisher towel (sports towel, mint blue design)', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('gunma-marathon-2026', NULL, 'フルマラソン', 'Full Marathon', '2026-04-09', '2026-05-13', 13500, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('gunma-marathon-2026', NULL, 'ジョギング（10km）', 'Jogging (10km)', '2026-04-09', '2026-08-17', 6500, 1);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('gunma-marathon-2026', NULL, NULL, '赤城山', 'Mt. Akagi', NULL, NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('gunma-marathon-2026', NULL, NULL, '榛名山', 'Mt. Haruna', NULL, NULL, 1);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('gunma-marathon-2026', NULL, NULL, '利根川', 'Tone River', NULL, NULL, 2);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('gunma-marathon-2026', NULL, NULL, '正田醤油スタジアム群馬', 'Shoda Shoyu Stadium Gunma', NULL, NULL, 3);

-- ==================
-- 浜松シティマラソン (hamamatsu-city-marathon-2027)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'hamamatsu-city-marathon-2027';
DELETE FROM race_categories WHERE race_id = 'hamamatsu-city-marathon-2027';
DELETE FROM aid_stations WHERE race_id = 'hamamatsu-city-marathon-2027';
DELETE FROM checkpoints WHERE race_id = 'hamamatsu-city-marathon-2027';
DELETE FROM access_points WHERE race_id = 'hamamatsu-city-marathon-2027';
DELETE FROM nearby_spots WHERE race_id = 'hamamatsu-city-marathon-2027';
DELETE FROM weather_history WHERE race_id = 'hamamatsu-city-marathon-2027';
DELETE FROM participation_gifts WHERE race_id = 'hamamatsu-city-marathon-2027';
DELETE FROM completion_gifts WHERE race_id = 'hamamatsu-city-marathon-2027';
DELETE FROM race_entry_links WHERE race_id = 'hamamatsu-city-marathon-2027';
DELETE FROM race_entry_periods WHERE race_id = 'hamamatsu-city-marathon-2027';
DELETE FROM reception_sessions WHERE race_id = 'hamamatsu-city-marathon-2027';
DELETE FROM race_travel_times WHERE race_id = 'hamamatsu-city-marathon-2027';
DELETE FROM race_results WHERE race_id = 'hamamatsu-city-marathon-2027';
DELETE FROM race_gallery WHERE race_id = 'hamamatsu-city-marathon-2027';
DELETE FROM race_voices WHERE race_id = 'hamamatsu-city-marathon-2027';
DELETE FROM race_time_buckets WHERE race_id = 'hamamatsu-city-marathon-2027';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'hamamatsu-city-marathon-2027',
  '浜松シティマラソン',
  'Hamamatsu City Marathon',
  '2027-02-14',
  '22',
  '浜松市',
  'Hamamatsu City',
  '浜松市役所と四ツ池公園を会場に開催される市民マラソン。ハーフマラソン（日本陸連公認）、5km、1.5km（小学生・ファミリー）の3種目を実施する。',
  'A citizens'' marathon held at Hamamatsu City Hall and Yotsuike Park, featuring a JAAF-certified half marathon along with 5km and 1.5km (elementary school / family) events.',
  'https://www.hamamatsu-city-marathon.com/',
  NULL,
  1,
  8500,
  '2026-09-01',
  '2026-11-15',
  0,
  'none',
  '',
  '',
  '["日本陸連公認"]',
  NULL,
  0,
  0,
  0,
  'road',
  '["JAAF"]',
  'ハーフマラソンは浜松市役所南側をスタートし四ツ池公園陸上競技場がフィニッシュ。5km・1.5kmは四ツ池公園陸上競技場発着。ハーフマラソン参加者の荷物は市役所会場から四ツ池公園会場へ輸送される。',
  'The half marathon starts near Hamamatsu City Hall and finishes at Yotsuike Park Athletic Stadium. The 5km and 1.5km events start and finish at Yotsuike Park. Baggage for half marathon runners is transported from the City Hall venue to the Yotsuike Park venue.',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '浜松市役所（ハーフマラソン）／四ツ池公園陸上競技場（5km・1.5km）',
  'Hamamatsu City Hall (Half Marathon) / Yotsuike Park Athletic Stadium (5km, 1.5km)',
  NULL,
  NULL,
  NULL,
  '2026-08-31T13:29:34.000Z',
  '2026-08-31T13:29:34.000Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('hamamatsu-city-marathon-2027', 'half', 21.0975, 150, '09:00', 5000, 7500, NULL, 'ハーフマラソン', 'Half Marathon', '高校生以上。日本陸連公認コース。', 'High school age and above. JAAF-certified course.', NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('hamamatsu-city-marathon-2027', '5k', 5, 40, '', 1500, NULL, NULL, '5kmの部', '5K', '中学生以上。参加費は年代区分により2,500円～4,000円。', 'Junior high school age and above. Entry fee ranges from 2,500 to 4,000 yen depending on age category.', NULL, NULL, NULL, '[]', 1);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('hamamatsu-city-marathon-2027', 'other', 1.5, 15, '', 2000, NULL, NULL, '1.5kmの部（小学生・ファミリー）', '1.5K (Elementary School / Family)', '小学生の部（小学3～6年、参加費2,000円、制限時間10分）とファミリーの部（2～4名、参加費4,500円～、制限時間15分）を設定。', 'Includes an Elementary School division (grades 3–6, 2,000 yen, 10-minute limit) and a Family division (2–4 members, from 4,500 yen, 15-minute limit).', NULL, NULL, NULL, '[]', 2);
INSERT OR REPLACE INTO aid_stations (race_id, distance_km, offerings_ja, offerings_en, is_featured) VALUES
  ('hamamatsu-city-marathon-2027', 5, '水、スポーツドリンク', 'Water, sports drink', 0);
INSERT OR REPLACE INTO aid_stations (race_id, distance_km, offerings_ja, offerings_en, is_featured) VALUES
  ('hamamatsu-city-marathon-2027', 8.2, '水、スポーツドリンク', 'Water, sports drink', 0);
INSERT OR REPLACE INTO aid_stations (race_id, distance_km, offerings_ja, offerings_en, is_featured) VALUES
  ('hamamatsu-city-marathon-2027', 12.5, '水、スポーツドリンク、給食', 'Water, sports drink, food', 1);
INSERT OR REPLACE INTO aid_stations (race_id, distance_km, offerings_ja, offerings_en, is_featured) VALUES
  ('hamamatsu-city-marathon-2027', 14.5, '水、スポーツドリンク', 'Water, sports drink', 0);
INSERT OR REPLACE INTO aid_stations (race_id, distance_km, offerings_ja, offerings_en, is_featured) VALUES
  ('hamamatsu-city-marathon-2027', 19, '水、スポーツドリンク', 'Water, sports drink', 0);
INSERT OR REPLACE INTO checkpoints (race_id, distance_km, closing_time) VALUES
  ('hamamatsu-city-marathon-2027', 13.6, '10:35');
INSERT OR REPLACE INTO checkpoints (race_id, distance_km, closing_time) VALUES
  ('hamamatsu-city-marathon-2027', 19, '11:10');
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('hamamatsu-city-marathon-2027', '["tshirt"]', '浜松シティマラソンオリジナルTシャツ（前面プリント、サイズ130・150・XS～XLの7種類）', 'Original Hamamatsu City Marathon T-shirt (front print, 7 sizes from 130/150 to XS–XL)', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('hamamatsu-city-marathon-2027', NULL, '一般エントリー', 'General Entry', '2026-09-01', '2026-11-15', NULL, 0);

-- ==================
-- さくらんぼマラソン大会 (higashine-sakuranbo-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'higashine-sakuranbo-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'higashine-sakuranbo-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'higashine-sakuranbo-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'higashine-sakuranbo-marathon-2026';
DELETE FROM access_points WHERE race_id = 'higashine-sakuranbo-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'higashine-sakuranbo-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'higashine-sakuranbo-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'higashine-sakuranbo-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'higashine-sakuranbo-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'higashine-sakuranbo-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'higashine-sakuranbo-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'higashine-sakuranbo-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'higashine-sakuranbo-marathon-2026';
DELETE FROM race_results WHERE race_id = 'higashine-sakuranbo-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'higashine-sakuranbo-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'higashine-sakuranbo-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'higashine-sakuranbo-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'higashine-sakuranbo-marathon-2026',
  'さくらんぼマラソン大会',
  'Sakuranbo Marathon',
  '2026-06-07',
  '06',
  '山形県東根市',
  'Higashine City, Yamagata',
  'さくらんぼの名産地・山形県東根市で毎年6月に開催される大会。陸上自衛隊神町駐屯地をスタート・フィニッシュ地点とし、フルーツラインの周回コースを走る。ハーフマラソン・10km・5kmの3種目。さくらんぼの季節に合わせた地域密着型のレース。',
  'A popular race held every June in Higashine City, Yamagata, famous for its cherries. The course starts and finishes at JGSDF Kanomachi Garrison and loops around the Fruit Line road. Three distances: half marathon, 10km, and 5km.',
  'https://www.sakuranbo-m.jp/',
  6000,
  1,
  10000,
  '2026-02-01',
  '2026-03-31',
  0,
  'pre_day',
  'エントリー期間：2026年2月1日〜3月31日。',
  'Entry period: Feb 1 – Mar 31, 2026.',
  '["ご当地グルメ","初心者おすすめ","夏マラソン","景色が良い"]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  'フルーツライン、神町駐屯地周辺',
  'Fruit Line road, Kanomachi Garrison area',
  'スタート・フィニッシュ：陸上自衛隊神町駐屯地。',
  'Start/Finish: JGSDF Kanomachi Garrison.',
  'さくらんぼ',
  '#dc2626',
  'Sakuranbo',
  'さくらんぼの里・東根で走る、甘い42km',
  'Run 42km in Japan''s cherry capital',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '2026-03-30T00:00:00Z',
  '2026-05-27T14:55:48.396Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('higashine-sakuranbo-marathon-2026', 'half', 21.0975, 170, '08:40', 5500, 6000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('higashine-sakuranbo-marathon-2026', '10k', 10, 95, '09:15', 2000, 6000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 1);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('higashine-sakuranbo-marathon-2026', 'other', 5, 50, '08:05', 1500, 5500, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 2);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('higashine-sakuranbo-marathon-2026', '["tshirt","local_product","food"]', 'さくらんぼ「佐藤錦」、山形県産米おにぎり、大会記念Ｔシャツ、冷凍フルーツ（予定）', '', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('higashine-sakuranbo-marathon-2026', NULL, '一般エントリー', 'General Entry', '2026-02-01', '2026-03-31', NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('higashine-sakuranbo-marathon-2026', NULL, NULL, 'フルーツライン', 'Fruit Line road', NULL, NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('higashine-sakuranbo-marathon-2026', NULL, NULL, '神町駐屯地周辺', 'Kanomachi Garrison area', NULL, NULL, 1);

-- ==================
-- 東日本ハーフマラソン (higashinipon-half-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'higashinipon-half-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'higashinipon-half-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'higashinipon-half-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'higashinipon-half-marathon-2026';
DELETE FROM access_points WHERE race_id = 'higashinipon-half-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'higashinipon-half-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'higashinipon-half-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'higashinipon-half-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'higashinipon-half-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'higashinipon-half-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'higashinipon-half-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'higashinipon-half-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'higashinipon-half-marathon-2026';
DELETE FROM race_results WHERE race_id = 'higashinipon-half-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'higashinipon-half-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'higashinipon-half-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'higashinipon-half-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'higashinipon-half-marathon-2026',
  '東日本ハーフマラソン',
  'East Japan Half Marathon',
  '2026-10-04',
  '14',
  '神奈川県相模原市',
  'Sagamihara City, Kanagawa',
  '米陸軍相模総合補給廠（相模デポ）内で開催される個性的なハーフマラソン。アメリカンムードあふれる広大な施設内のフラット周回コースを走り、アメリカンフードが提供される。ハーフ・8km・駅伝の3種目。',
  'A unique half marathon held inside the US Army Sagami General Depot. Run on a flat lap course within the expansive American-styled facility, with American food provided. Three events: half marathon, 8km, and ekiden relay.',
  'https://www.runningkanagawa.com/race-half/',
  0,
  1,
  0,
  '2026-04-01',
  '2026-08-17',
  0,
  'pre_day',
  '',
  '',
  '["フラット","初心者おすすめ","観光","大規模"]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  '在日米陸軍相模総合補給廠内、フラット周回コース',
  'Inside US Army Sagami General Depot, flat lap course',
  'アメリカンフード提供。',
  'American food provided.',
  '宇宙',
  '#f9c1cc',
  'Uchu',
  '重力の先へ。Plus Ultra.',
  'Beyond gravity. Plus Ultra.',
  NULL,
  NULL,
  NULL,
  '相模原総合補給廠（米陸軍相模補給廠）',
  'US Army Sagami General Depot',
  '神奈川県相模原市中央区',
  NULL,
  NULL,
  '2026-03-29T00:00:00Z',
  '2026-08-31T13:27:30.974Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('higashinipon-half-marathon-2026', 'half', 21.0975, 180, '09:00', 4000, 5500, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('higashinipon-half-marathon-2026', 'other', 8, 70, '09:30', 1000, 3500, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 1);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  ('higashinipon-half-marathon-2026', '相模原駅', 'Sagamihara Station', '', '徒歩圏内', 'Within walking distance', 0, 0, NULL, 1, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('higashinipon-half-marathon-2026', NULL, '一般エントリー', 'General Entry', '2026-04-01', '2026-08-17', NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('higashinipon-half-marathon-2026', NULL, NULL, '在日米陸軍相模総合補給廠内', 'Inside US Army Sagami General Depot', NULL, NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('higashinipon-half-marathon-2026', NULL, NULL, 'フラット周回コース', 'flat lap course', NULL, NULL, 1);

-- ==================
-- 世界遺産姫路城マラソン (himeji-castle-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'himeji-castle-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'himeji-castle-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'himeji-castle-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'himeji-castle-marathon-2026';
DELETE FROM access_points WHERE race_id = 'himeji-castle-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'himeji-castle-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'himeji-castle-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'himeji-castle-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'himeji-castle-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'himeji-castle-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'himeji-castle-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'himeji-castle-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'himeji-castle-marathon-2026';
DELETE FROM race_results WHERE race_id = 'himeji-castle-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'himeji-castle-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'himeji-castle-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'himeji-castle-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'himeji-castle-marathon-2026',
  '世界遺産姫路城マラソン',
  'World Heritage Himeji Castle Marathon',
  '2026-02-22',
  '28',
  '姫路市',
  'Himeji City',
  '世界遺産・姫路城を望みながら走るフルマラソン。2027年は開催休止予定のため、次回参加機会は要確認。',
  'A full marathon with views of World Heritage Himeji Castle. Note: 2027 edition is planned to be suspended.',
  'https://www.himeji-marathon.jp',
  13000,
  0,
  9000,
  '2025-08-04',
  '2025-10-31',
  0,
  'pre_day',
  '',
  '',
  '["世界遺産","城下町","景色が良い"]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  '姫路城',
  'Himeji Castle',
  NULL,
  NULL,
  '姫路城',
  '#f8fafc',
  'Himeji-jo',
  '世界遺産・白鷺城を眺めながら走る42.195km',
  'Run beneath the White Heron Castle, a World Heritage Site',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-03-15T00:00:00Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('himeji-castle-marathon-2026', 'full', 42.195, 360, '', 9000, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('himeji-castle-marathon-2026', '観光地', '姫路城', 'Himeji Castle', '世界遺産・国宝の白鷺城。日本で最も美しい城の一つ。コース上から望める。', 'A World Heritage and National Treasure. One of Japan''s most beautiful castles. Visible from the course.', 'コース上', NULL, 34.8394, 134.6939);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('himeji-castle-marathon-2026', '["tshirt","towel"]', '大会Tシャツ、完走メダル、フィニッシャータオル', 'Race T-shirt, Finisher medal, Finisher towel', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('himeji-castle-marathon-2026', '["medal"]', '大会Tシャツ、完走メダル、フィニッシャータオル', 'Race T-shirt, Finisher medal, Finisher towel', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('himeji-castle-marathon-2026', NULL, '一般エントリー', 'General Entry', '2025-08-04', '2025-10-31', NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('himeji-castle-marathon-2026', NULL, NULL, '姫路城', 'Himeji Castle', NULL, NULL, 0);

-- ==================
-- ひたちシーサイドマラソン (hitachi-seaside-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'hitachi-seaside-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'hitachi-seaside-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'hitachi-seaside-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'hitachi-seaside-marathon-2026';
DELETE FROM access_points WHERE race_id = 'hitachi-seaside-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'hitachi-seaside-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'hitachi-seaside-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'hitachi-seaside-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'hitachi-seaside-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'hitachi-seaside-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'hitachi-seaside-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'hitachi-seaside-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'hitachi-seaside-marathon-2026';
DELETE FROM race_results WHERE race_id = 'hitachi-seaside-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'hitachi-seaside-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'hitachi-seaside-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'hitachi-seaside-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'hitachi-seaside-marathon-2026',
  'ひたちシーサイドマラソン',
  'Hitachi Sea Side Marathon',
  '2026-11-15',
  '08',
  '茨城県日立市東成沢町2-15-1',
  '2-15-1 Higashinari-cho, Hitachi, Ibaraki Prefecture',
  '太平洋を望む日立シーサイドロードは、まるで海の上を走るような解放感を体感できます。
コース中盤に位置する河原子海岸沿いでは、海を間近に感じながら走ることができます。
景色と潮風が背中を押し、走る喜びを存分に味わえます。',
  'The Hitachi Seaside Road, overlooking the Pacific Ocean, offers a sense of freedom as if you were running right on the water.
Along the Kawaragi Coast, located in the middle of the course, you can run while feeling the ocean up close.
With the scenery and the sea breeze pushing you forward, you can fully savor the joy of running.',
  'https://hitachi-marathon.jp',
  NULL,
  1,
  0,
  '2026-04-13',
  '2026-08-31',
  0,
  'pre_mail',
  '大会当日の受付はありません。10月末（予定）にアスリートビブス・ランナーズチップ等を郵送いたしますので、忘れずにお持ちください',
  'There will be no on-site registration on the day of the event. We will mail your race bibs, timing chips, and other items by the end of October (tentative), so please be sure to bring them with you.',
  '[]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  '太平洋を望む日立シーサイドロードを走る非日常の絶景コース。河原子海岸沿いで海を間近に感じながら走れる。アップダウンのある走りごたえのあるコースで、マラソンシーズン初戦の脚試しに最適。',
  'A spectacular course along Hitachi Seaside Road overlooking the Pacific Ocean. Runners can feel the ocean up close along Kawarago Beach. A challenging course with hills, ideal as a season opener.',
  '',
  '',
  'コキア',
  '#dc2626',
  'Kochiya',
  '海浜公園のコキアが彩る、ひたちの秋',
  'Run through Hitachi Seaside Park''s autumn kochia fields',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '2026-04-11T14:28:19.021Z',
  '2026-07-27T14:10:45.345Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('hitachi-seaside-marathon-2026', 'full', 42.195, 360, '10:00', 6000, 10000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('hitachi-seaside-marathon-2026', '["tshirt"]', '参加賞（ロングTシャツ）', 'Participation gift (Long T-shirt)', NULL, 0);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('hitachi-seaside-marathon-2026', '["towel"]', '出走特典（タオル）', 'Running benefit (Towel)', NULL, 1);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('hitachi-seaside-marathon-2026', '["medal"]', '完走賞（完走メダル）', 'Finisher award (Finisher medal)', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('hitachi-seaside-marathon-2026', NULL, '一般エントリー', 'General Entry', '2026-04-13', '2026-08-31', 10000, 0);

-- ==================
-- 防府読売マラソン (hofu-yomiuri-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'hofu-yomiuri-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'hofu-yomiuri-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'hofu-yomiuri-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'hofu-yomiuri-marathon-2026';
DELETE FROM access_points WHERE race_id = 'hofu-yomiuri-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'hofu-yomiuri-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'hofu-yomiuri-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'hofu-yomiuri-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'hofu-yomiuri-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'hofu-yomiuri-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'hofu-yomiuri-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'hofu-yomiuri-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'hofu-yomiuri-marathon-2026';
DELETE FROM race_results WHERE race_id = 'hofu-yomiuri-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'hofu-yomiuri-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'hofu-yomiuri-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'hofu-yomiuri-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'hofu-yomiuri-marathon-2026',
  '防府読売マラソン',
  'Hofu Yomiuri Marathon',
  '2026-12-06',
  '35',
  '防府市',
  'Hofu City',
  '山口県防府市で開催されるエリート志向のフルマラソン。制限時間4時間で走力が求められる。MGCシリーズG1大会。',
  'An elite-oriented full marathon in Hofu, Yamaguchi. The 4-hour time limit demands strong running ability. MGC Series G1 event.',
  'https://hofu-yomiuri.jp/',
  13000,
  1,
  3500,
  '2026-06-22',
  '2026-07-06',
  0,
  'pre_mail',
  '11月下旬にアスリートビブス・計測チップを事前郵送',
  'Athlete bibs and timing chips mailed in advance in late November',
  '["エリート大会","日本陸連公認","記録狙い"]',
  NULL,
  0,
  0,
  0,
  'road',
  '["JAAF","AIMS"]',
  '防府天満宮付近',
  'Near Hofu Tenmangu Shrine',
  '制限時間4時間。サブ4の走力が必要。',
  '4-hour time limit. Sub-4 running ability required.',
  '防府天満宮',
  '#92400e',
  'Hofu-Tenmangu',
  '日本最古の天満宮の参道を巡る歴史ある大会',
  'Race through the grounds of Japan''s oldest Tenmangu shrine',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-07-27T14:11:03.160Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('hofu-yomiuri-marathon-2026', 'full', 42.195, 240, '12:03', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('hofu-yomiuri-marathon-2026', '観光地', '防府天満宮', 'Hofu Tenmangu', '日本三大天神の一つ。学問の神様・菅原道真を祀る。コース付近。', 'One of Japan''s three great Tenmangu shrines. Enshrines Sugawara no Michizane, deity of learning.', 'コース付近', NULL, 34.0478, 131.5711);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('hofu-yomiuri-marathon-2026', '["medal"]', '完走メダル', 'Finisher medal', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('hofu-yomiuri-marathon-2026', NULL, '一般（山口県民枠含む）', 'General Entry (incl. Yamaguchi residents)', '2026-06-22', '2026-07-06', 13000, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('hofu-yomiuri-marathon-2026', NULL, 'エリート（男子・女子）', 'Elite (Men / Women)', '2026-06-22', '2026-09-30', 13000, 1);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('hofu-yomiuri-marathon-2026', NULL, 'ふるさと納税枠', 'Furusato Nozei Quota', '2026-06-22', '2026-07-10', 13000, 2);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('hofu-yomiuri-marathon-2026', NULL, '幸せます防府枠', 'Shiawase-masu Hofu Quota', '2026-06-22', '2026-07-06', 13000, 3);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('hofu-yomiuri-marathon-2026', NULL, NULL, '防府天満宮付近', 'Near Hofu Tenmangu Shrine', NULL, NULL, 0);

-- ==================
-- 北海道マラソン (hokkaido-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'hokkaido-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'hokkaido-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'hokkaido-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'hokkaido-marathon-2026';
DELETE FROM access_points WHERE race_id = 'hokkaido-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'hokkaido-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'hokkaido-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'hokkaido-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'hokkaido-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'hokkaido-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'hokkaido-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'hokkaido-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'hokkaido-marathon-2026';
DELETE FROM race_results WHERE race_id = 'hokkaido-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'hokkaido-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'hokkaido-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'hokkaido-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'hokkaido-marathon-2026',
  '北海道マラソン',
  'Hokkaido Marathon',
  '2026-08-30',
  '01',
  '札幌市',
  'Sapporo City',
  '夏に開催される日本唯一の大規模フルマラソン。札幌の市街地と北海道大学キャンパス内を走る。MGCシリーズG2大会。',
  'Japan''s only large-scale summer full marathon. Run through Sapporo''s city center and Hokkaido University campus. MGC Series G2 event.',
  'https://hokkaido-marathon.com',
  16500,
  1,
  20000,
  '2026-03-29',
  '2026-04-24',
  0,
  'pre_day',
  '',
  '',
  '["北海道","夏マラソン","大規模","日本陸連公認"]',
  NULL,
  0,
  0,
  0,
  'road',
  '["JAAF","WA","AIMS"]',
  '大通公園、北海道大学、北海道庁赤れんが庁舎、豊平川',
  'Odori Park, Hokkaido University, Hokkaido Government Red Brick Office, Toyohira River',
  '夏開催のため暑さ対策が必須。制限時間6時間。',
  'Summer heat countermeasures essential. 6-hour time limit.',
  'ライラック',
  '#8b5cf6',
  'Rairakku',
  'ライラック香る大通公園から、北の大地を走る',
  'From the lilac-scented Odori Park across Hokkaido',
  NULL,
  NULL,
  NULL,
  '大通公園（大通西4丁目）',
  'Odori Park (Odori West 4-chome)',
  '北海道札幌市中央区大通西4丁目',
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-07-31T14:29:42.206Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('hokkaido-marathon-2026', 'full', 42.195, 360, '08:30', 20000, 16500, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('hokkaido-marathon-2026', '観光地', '大通公園', 'Odori Park', 'スタート・フィニッシュ地点。札幌を代表する都市公園。大会当日は大きな声援で包まれる。', 'Start/Finish area. Sapporo''s iconic urban park. Filled with cheers on race day.', 'スタート・フィニッシュ地点', NULL, 43.0589, 141.3476);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('hokkaido-marathon-2026', 'グルメ', '札幌ラーメン横丁', 'Sapporo Ramen Yokocho', '味噌ラーメンの聖地。レース後のエネルギー補給に最適。', 'The holy ground of miso ramen. Perfect for post-race energy replenishment.', 'すすきの付近', NULL, 43.0537, 141.3525);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('hokkaido-marathon-2026', '温泉', '定山渓温泉', 'Jozankei Onsen', '札幌の奥座敷と呼ばれる温泉地。レース翌日の観光に。札幌中心部からバスで約60分。', 'Known as Sapporo''s inner parlor. For sightseeing the day after. About 60 min by bus from central Sapporo.', '札幌中心部からバス約60分', NULL, 42.9694, 141.1667);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('hokkaido-marathon-2026', '["tshirt"]', '大会オリジナルTシャツ', 'Official race T-shirt', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('hokkaido-marathon-2026', '["medal"]', '完走メダル', 'Finisher medal', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('hokkaido-marathon-2026', NULL, '一般エントリー', 'General Entry', '2026-03-29', '2026-04-24', 16500, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('hokkaido-marathon-2026', NULL, NULL, '大通公園', 'Odori Park', NULL, NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('hokkaido-marathon-2026', NULL, NULL, '北海道大学', 'Hokkaido University', NULL, NULL, 1);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('hokkaido-marathon-2026', NULL, NULL, '豊平川', 'Toyohira River', NULL, NULL, 2);

-- ==================
-- いぶすき菜の花マラソン (ibusuki-nanohana-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'ibusuki-nanohana-2026';
DELETE FROM race_categories WHERE race_id = 'ibusuki-nanohana-2026';
DELETE FROM aid_stations WHERE race_id = 'ibusuki-nanohana-2026';
DELETE FROM checkpoints WHERE race_id = 'ibusuki-nanohana-2026';
DELETE FROM access_points WHERE race_id = 'ibusuki-nanohana-2026';
DELETE FROM nearby_spots WHERE race_id = 'ibusuki-nanohana-2026';
DELETE FROM weather_history WHERE race_id = 'ibusuki-nanohana-2026';
DELETE FROM participation_gifts WHERE race_id = 'ibusuki-nanohana-2026';
DELETE FROM completion_gifts WHERE race_id = 'ibusuki-nanohana-2026';
DELETE FROM race_entry_links WHERE race_id = 'ibusuki-nanohana-2026';
DELETE FROM race_entry_periods WHERE race_id = 'ibusuki-nanohana-2026';
DELETE FROM reception_sessions WHERE race_id = 'ibusuki-nanohana-2026';
DELETE FROM race_travel_times WHERE race_id = 'ibusuki-nanohana-2026';
DELETE FROM race_results WHERE race_id = 'ibusuki-nanohana-2026';
DELETE FROM race_gallery WHERE race_id = 'ibusuki-nanohana-2026';
DELETE FROM race_voices WHERE race_id = 'ibusuki-nanohana-2026';
DELETE FROM race_time_buckets WHERE race_id = 'ibusuki-nanohana-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'ibusuki-nanohana-2026',
  'いぶすき菜の花マラソン',
  'Ibusuki Nanohana Marathon',
  '2026-01-11',
  '46',
  '指宿市',
  'Ibusuki City',
  '南国の指宿を舞台に、菜の花が咲き誇る温暖な1月に開催されるフルマラソン。開聞岳や錦江湾の絶景を楽しみながら走れる。レース後は砂むし温泉が楽しめる。',
  'A full marathon held in warm January in Ibusuki, surrounded by blooming canola flowers. Enjoy views of Mt. Kaimon and Kinko Bay. Sand steam baths available after the race.',
  'https://ibusuki-nanohana.com',
  10000,
  1,
  10000,
  '2025-08-01',
  '2025-10-19',
  0,
  'race_day',
  'アスリートビブスは事前郵送。記念品引換は前日・当日に総合体育館にて。',
  'Bibs mailed in advance. Gift exchange at gymnasium the day before and on race day.',
  '["ご当地エイド充実","初心者おすすめ","日本陸連公認","景色が良い","温暖","温泉"]',
  NULL,
  0,
  0,
  0,
  'road',
  '["JAAF"]',
  '開聞岳、錦江湾、菜の花ロード',
  'Mt. Kaimon, Kinko Bay, canola flower road',
  NULL,
  NULL,
  '菜の花',
  '#eab308',
  'Nanohana',
  '黄金色の菜の花畑と薩摩の海を巡る42km',
  'Run through golden rapeseed fields along the Satsuma sea',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-05-30T06:35:12.039Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('ibusuki-nanohana-2026', 'full', 42.195, 480, '09:00', 10000, 10000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO aid_stations (race_id, distance_km, offerings_ja, offerings_en, is_featured) VALUES
  ('ibusuki-nanohana-2026', 7, '水、スポーツドリンク、さつまいも', 'Water, sports drink, sweet potato', 1);
INSERT OR REPLACE INTO aid_stations (race_id, distance_km, offerings_ja, offerings_en, is_featured) VALUES
  ('ibusuki-nanohana-2026', 14, '水、スポーツドリンク、菜の花漬け', 'Water, sports drink, pickled canola flowers', 1);
INSERT OR REPLACE INTO aid_stations (race_id, distance_km, offerings_ja, offerings_en, is_featured) VALUES
  ('ibusuki-nanohana-2026', 21, '水、スポーツドリンク、ぜんざい、ふかし芋', 'Water, sports drink, sweet red bean soup, steamed sweet potato', 1);
INSERT OR REPLACE INTO aid_stations (race_id, distance_km, offerings_ja, offerings_en, is_featured) VALUES
  ('ibusuki-nanohana-2026', 28, '水、スポーツドリンク、茶ぶし', 'Water, sports drink, tea-steamed rice cake', 1);
INSERT OR REPLACE INTO aid_stations (race_id, distance_km, offerings_ja, offerings_en, is_featured) VALUES
  ('ibusuki-nanohana-2026', 35, '水、スポーツドリンク', 'Water, sports drink', 0);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  ('ibusuki-nanohana-2026', '指宿駅', 'Ibusuki Station', 'ibusuki', 'JR指宿駅から徒歩約15分', 'About 15 min walk from JR Ibusuki Station', 31.2544, 130.6556, NULL, 1, 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('ibusuki-nanohana-2026', '温泉', '砂むし温泉', 'Sand Steam Bath (Sunamushi Onsen)', '指宿名物の砂蒸し温泉。海岸の天然砂の中に埋まって温まる独特の体験。レース後のリカバリーに最適。', 'Ibusuki''s famous sand steam bath. A unique experience of being buried in naturally heated sand on the beach. Perfect for post-race recovery.', '指宿市内', NULL, 31.2283, 130.6367);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('ibusuki-nanohana-2026', '["tshirt"]', '大会記念品（参加者全員）', 'Commemorative gift (all participants)', NULL, 0);

-- ==================
-- 一関国際ハーフマラソン (ichinoseki-half-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'ichinoseki-half-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'ichinoseki-half-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'ichinoseki-half-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'ichinoseki-half-marathon-2026';
DELETE FROM access_points WHERE race_id = 'ichinoseki-half-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'ichinoseki-half-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'ichinoseki-half-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'ichinoseki-half-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'ichinoseki-half-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'ichinoseki-half-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'ichinoseki-half-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'ichinoseki-half-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'ichinoseki-half-marathon-2026';
DELETE FROM race_results WHERE race_id = 'ichinoseki-half-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'ichinoseki-half-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'ichinoseki-half-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'ichinoseki-half-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'ichinoseki-half-marathon-2026',
  '一関国際ハーフマラソン',
  'Ichinoseki International Half Marathon',
  '2026-09-27',
  '03',
  '岩手県一関市',
  'Ichinoseki City, Iwate',
  '最大高低差わずか15mのフラットコースを誇る一関国際ハーフマラソン。日本陸連公認の高速コースで、賞金レースとしても知られる。みちのく選手権も同時開催。優秀成績者にはホノルルマラソン派遣の特典あり。',
  'A flat course with only 15m elevation difference, the Ichinoseki International Half Marathon is a JAAF-certified fast course with prize money. Held simultaneously with the Michinoku Championship. Top finishers receive an invitation to the Honolulu Marathon.',
  'https://ichinoseki-half.jp/',
  6000,
  1,
  2500,
  '2026-04-01',
  '2026-07-10',
  0,
  'pre_mail',
  'アスリートビブス・計測用タグは参加者全員に事前郵送。当日の受付は行わない。再発行は会場にて1,000円。',
  'Athlete bibs and timing chips are mailed to all participants in advance. No on-site reception on race day. Reissuance fee: 1,000 yen at venue.',
  '["フラット","日本陸連公認","記録狙い","歴史ある大会"]',
  NULL,
  0,
  0,
  15,
  'road',
  '["JAAF"]',
  '最大高低差15mのフラットコース',
  'Flat course with only 15m elevation difference',
  '賞金あり。ホノルルマラソン派遣特典あり。',
  'Prize money available. Invitation to Honolulu Marathon for top finishers.',
  '厳美渓',
  '#065f46',
  'Genbikei',
  '厳美渓の渓谷美を感じながら走る一関ハーフ',
  'Run through the scenic Genbikei gorge in Ichinoseki',
  NULL,
  NULL,
  NULL,
  '一関ヒロセユードーム',
  'Ichinoseki Hirose U-Dome',
  '岩手県一関市狐禅寺字石ノ瀬25-3',
  NULL,
  NULL,
  '2026-03-29T00:00:00Z',
  '2026-07-27T14:13:53.576Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('ichinoseki-half-marathon-2026', 'half', 21.0975, 170, '09:00', 2000, 6000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('ichinoseki-half-marathon-2026', '10k', 10, 85, '09:00', 500, 6000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 1);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('ichinoseki-half-marathon-2026', NULL, '一般エントリー（RUNNET）', 'General Entry (RUNNET)', '2026-04-01', '2026-07-10', 6000, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('ichinoseki-half-marathon-2026', NULL, '一般エントリー（振替用紙・窓口）', 'General Entry (Paper / In-person)', '2026-04-01', '2026-06-30', 6000, 1);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('ichinoseki-half-marathon-2026', NULL, NULL, '最大高低差15mのフラットコース', 'Flat course with only 15m elevation difference', NULL, NULL, 0);

-- ==================
-- 忍者の里伊賀上野シティマラソン (igaueno-city-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'igaueno-city-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'igaueno-city-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'igaueno-city-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'igaueno-city-marathon-2026';
DELETE FROM access_points WHERE race_id = 'igaueno-city-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'igaueno-city-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'igaueno-city-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'igaueno-city-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'igaueno-city-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'igaueno-city-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'igaueno-city-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'igaueno-city-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'igaueno-city-marathon-2026';
DELETE FROM race_results WHERE race_id = 'igaueno-city-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'igaueno-city-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'igaueno-city-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'igaueno-city-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'igaueno-city-marathon-2026',
  '忍者の里伊賀上野シティマラソン',
  'Ninja no Sato Igaueno City Marathon',
  '2026-11-29',
  '24',
  '伊賀市',
  'Iga City',
  '忍者の里として知られる伊賀市の城下町を駆け抜けるマラソン大会。ハーフ・クォーターマラソン・5km・ジョギングを実施。',
  'A race running through the castle town of Iga City, known as the home of the ninja. Features half marathon, quarter marathon, 5km, and jogging categories.',
  'https://igauenocity-marathon.net/',
  5000,
  1,
  1000,
  '2026-07-01',
  '2026-09-11',
  0,
  'race_day',
  '',
  '',
  '[]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  '忍者の里、城下町',
  'Ninja heritage, castle town',
  NULL,
  NULL,
  '忍者',
  '#1e293b',
  'Ninja',
  '忍者の里、伊賀の城下町を駆け抜ける',
  'Run through the castle town of Iga, home of the ninja',
  NULL,
  NULL,
  NULL,
  '伊賀市立上野西小学校',
  'Iga City Ueno-Nishi Elementary School',
  NULL,
  NULL,
  NULL,
  '2026-08-25T00:00:00Z',
  '2026-08-31T13:28:35.599Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('igaueno-city-marathon-2026', 'half', 21.0975, 140, '', 1000, 5000, NULL, 'ハーフマラソン', 'Half Marathon', '高校生以上', 'High school age and above', NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('igaueno-city-marathon-2026', 'other', 10.5, 70, '', 1000, 4500, NULL, 'クォーターマラソン', 'Quarter Marathon', '高校生以上', 'High school age and above', NULL, NULL, NULL, '[]', 1);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('igaueno-city-marathon-2026', '5k', 5, 40, '', 500, 3500, NULL, '5km', '5km', '高校生以上', 'High school age and above', NULL, NULL, NULL, '[]', 2);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('igaueno-city-marathon-2026', 'other', 2.7, 30, '', 300, 2500, NULL, 'ジョギング（一般）', 'Jogging (General)', NULL, NULL, NULL, NULL, NULL, '[]', 3);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('igaueno-city-marathon-2026', 'other', 2.7, 30, '', 300, 2000, NULL, 'ジョギング（小中学生）', 'Jogging (Elementary & Junior High)', NULL, NULL, NULL, NULL, NULL, '[]', 4);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('igaueno-city-marathon-2026', '["towel"]', '忍者デザインの特別仕様タオル', 'Special ninja-design towel', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('igaueno-city-marathon-2026', '["certificate"]', 'Web完走証（完走者全員、大会当日から30日間ダウンロード可）', 'Web finisher certificate for all finishers (downloadable for 30 days from race day)', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('igaueno-city-marathon-2026', NULL, 'ランネット（インターネット）', 'RUNNET (Online)', '2026-07-01', '2026-09-11', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('igaueno-city-marathon-2026', NULL, '伊賀市ふるさと納税', 'Iga City Furusato Nozei (Hometown Tax)', '2026-07-01', '2026-08-31', NULL, 1);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('igaueno-city-marathon-2026', NULL, '郵便振替・実行委員会事務局持参', 'Postal Transfer / In-person at Committee Office', '2026-07-01', '2026-09-11', NULL, 2);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('igaueno-city-marathon-2026', NULL, NULL, '伊賀上野城下町', 'Igaueno castle town', NULL, NULL, 0);

-- ==================
-- 神々の島 壱岐ウルトラマラソン (iki-ultra-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'iki-ultra-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'iki-ultra-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'iki-ultra-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'iki-ultra-marathon-2026';
DELETE FROM access_points WHERE race_id = 'iki-ultra-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'iki-ultra-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'iki-ultra-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'iki-ultra-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'iki-ultra-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'iki-ultra-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'iki-ultra-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'iki-ultra-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'iki-ultra-marathon-2026';
DELETE FROM race_results WHERE race_id = 'iki-ultra-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'iki-ultra-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'iki-ultra-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'iki-ultra-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'iki-ultra-marathon-2026',
  '神々の島 壱岐ウルトラマラソン',
  'IKI ULTRA MARATHON',
  '2026-10-17',
  '42',
  '長崎県壱岐市',
  'Iki City, Nagasaki Prefecture',
  '壱岐市が誇る歴史、文化、自然、パワースポット、グルメなどの多くの「しまの宝」を全国各地のウルトラマラソン愛好家に体感いただき、広く壱岐市の魅力をアピールするとともに、市民一体のおもてなしにより新しい交流のストーリーが育まれ、壱岐市の地域振興に寄与することを目的に開催します',
  'The event is held with the aim of allowing ultramarathon enthusiasts from all over Japan to experience the many "treasures of the island" that Iki City boasts, such as its history, culture, nature, power spots, and gourmet food, and to widely promote the charm of Iki City. It also aims to foster new stories of exchange through the hospitality of the citizens and contribute to the regional development of Iki City.',
  'https://iki-ultra.jp/',
  NULL,
  1,
  1000,
  '2026-04-10',
  '2026-07-17',
  0,
  'pre_mail',
  'ゼッケン・計測タグ・参加賞等を事前発送します。前日受付は行いません',
  'Race bibs, timing tags, and participation prizes will be sent out in advance. There will be no registration the day before the event.',
  '["ウルトラマラソン"]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  '',
  '',
  '',
  '',
  '壱岐の海',
  '#0891b2',
  'Iki-no-Umi',
  '玄界灘に浮かぶ神秘の島・壱岐を一周する',
  'Circle the mystical island of Iki in the Genkai Sea',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '2026-04-05T08:19:26.353Z',
  '2026-05-30T06:35:34.537Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('iki-ultra-marathon-2026', 'ultra', 100, 840, '05:00', 1000, 20000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('iki-ultra-marathon-2026', 'ultra', 50, 480, '10:30', 1000, 15000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 1);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('iki-ultra-marathon-2026', '["tshirt"]', 'オリジナルTシャツ', '', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('iki-ultra-marathon-2026', NULL, '一般', 'General Entry', '2026-04-10', '2026-07-17', NULL, 0);

-- ==================
-- 中日三重お伊勢さんマラソン (ise-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'ise-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'ise-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'ise-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'ise-marathon-2026';
DELETE FROM access_points WHERE race_id = 'ise-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'ise-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'ise-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'ise-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'ise-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'ise-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'ise-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'ise-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'ise-marathon-2026';
DELETE FROM race_results WHERE race_id = 'ise-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'ise-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'ise-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'ise-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'ise-marathon-2026',
  '中日三重お伊勢さんマラソン',
  'Chunichi Mie Ise Marathon',
  '2026-12-06',
  '24',
  '伊勢市',
  'Ise City',
  '三重県営サンアリーナ発着で開催される2日制の大会。12月5日にウォーク・バリアフリーラン、12月6日にハーフマラソン・5kmを実施。ハーフマラソンは日本陸連公認コースで、三重交通Gスポーツの杜 伊勢陸上競技場のトラックを走る区間がある。',
  'A two-day event based at Mie Prefectural Sun Arena: a walk and barrier-free run on December 5, followed by a JAAF-certified half marathon and 5K on December 6. The half marathon course includes a lap on the track at Mie Kotsu G Sports no Mori Ise.',
  'https://www.city.ise.mie.jp/marathon/',
  NULL,
  1,
  11080,
  '2026-07-01',
  '2026-09-07',
  0,
  'none',
  'SDGs推進の一環として、ランニング参加者への参加案内書類の郵送を中止（Web案内等に移行）。',
  'As part of SDGs efforts, physical mailing of participant guides to running entrants has been discontinued in favor of online guidance.',
  '["日本陸連公認","ゲストランナー","大規模"]',
  NULL,
  0,
  0,
  0,
  'road',
  '["JAAF"]',
  '三重県営サンアリーナを発着し、朝熊東IC・伊勢IC・おはらい町・宇治橋前などを経由。2025年大会よりハーフマラソンで三重交通Gスポーツの杜 伊勢陸上競技場のトラックを実際に走れる。メインスタンドの大型スクリーンや地元中学校の吹奏楽応援も予定。',
  'Starts and finishes at Mie Prefectural Sun Arena, passing Asama-higashi IC, Ise IC, Oharai-machi, and the approach to Uji Bridge. Since 2025, the half marathon route includes a lap on the actual track at Mie Kotsu G Sports no Mori Ise, with a large screen and brass band cheering from a local junior high school planned at the main stand.',
  '12月5日はウォーク・バリアフリーランのみ開催。ランニング（ハーフ・5km）は12月6日。',
  'December 5 is Walk and Barrier-Free Run only; the running events (Half Marathon, 5K) are held on December 6.',
  '赤福餅',
  '#c0392b',
  'Akafuku Mochi',
  'お伊勢さんの杜を駆け抜ける、日本一の呼び声高いマラソン',
  'Run through the sacred groves of Ise, a marathon acclaimed as Japan''s best',
  NULL,
  NULL,
  NULL,
  '三重県営サンアリーナ',
  'Mie Prefectural Sun Arena',
  NULL,
  NULL,
  NULL,
  '2026-08-31T13:29:34.000Z',
  '2026-08-31T13:29:34.000Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('ise-marathon-2026', 'half', 21.0975, 160, '09:00', 5500, 6000, NULL, 'ハーフマラソン', 'Half Marathon', '制限時間2時間40分。日本陸連公認コース。駐車整理料別途1,000円。', 'Time limit 2h40m. JAAF-certified course. Parking fee of 1,000 yen charged separately.', NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('ise-marathon-2026', '5k', 5, 50, '09:10', 2500, 4500, NULL, '5km', '5K', '制限時間50分。駐車整理料別途1,000円。', 'Time limit 50 minutes. Parking fee of 1,000 yen charged separately.', NULL, NULL, NULL, '[]', 1);
INSERT OR REPLACE INTO aid_stations (race_id, distance_km, offerings_ja, offerings_en, is_featured) VALUES
  ('ise-marathon-2026', 4.1, '給水（イオン伊勢店前）', 'Water station (in front of AEON Ise)', 0);
INSERT OR REPLACE INTO aid_stations (race_id, distance_km, offerings_ja, offerings_en, is_featured) VALUES
  ('ise-marathon-2026', 6.8, '給水（三重交通Gスポーツの杜 伊勢陸上競技場）', 'Water station (Mie Kotsu G Sports no Mori Ise Athletic Stadium)', 0);
INSERT OR REPLACE INTO aid_stations (race_id, distance_km, offerings_ja, offerings_en, is_featured) VALUES
  ('ise-marathon-2026', 12.9, '給水（ダイムスタジアム伊勢）', 'Water station (Daim Stadium Ise)', 0);
INSERT OR REPLACE INTO aid_stations (race_id, distance_km, offerings_ja, offerings_en, is_featured) VALUES
  ('ise-marathon-2026', 18.9, '給水（朝熊東IC）', 'Water station (Asama-higashi IC)', 0);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('ise-marathon-2026', '["towel","coupon","goods","food"]', 'スポーツタオル、お伊勢さんチケット（500円分、12/5・6限定利用）、エコバッグ、赤福餅（2個入）、アクエリアス（500ml）をゴールで配布', 'Distributed at the finish: a sports towel, an Ise Tourist Voucher worth 500 yen (usable Dec 5–6 only), an eco bag, Akafuku mochi (2 pieces), and a 500ml Aquarius drink', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('ise-marathon-2026', NULL, '伊勢市民先行申込', 'Ise Resident Priority Entry', '2026-07-01', '2026-07-06', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('ise-marathon-2026', NULL, '一般エントリー', 'General Entry', '2026-07-08', '2026-09-07', NULL, 1);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('ise-marathon-2026', NULL, NULL, 'おはらい町・宇治橋前', 'Oharai-machi / Uji Bridge', NULL, NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('ise-marathon-2026', NULL, NULL, '三重交通Gスポーツの杜 伊勢陸上競技場トラック', 'Mie Kotsu G Sports no Mori Ise track', NULL, NULL, 1);

-- ==================
-- 伊勢崎シティマラソン (isesaki-city-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'isesaki-city-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'isesaki-city-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'isesaki-city-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'isesaki-city-marathon-2026';
DELETE FROM access_points WHERE race_id = 'isesaki-city-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'isesaki-city-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'isesaki-city-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'isesaki-city-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'isesaki-city-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'isesaki-city-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'isesaki-city-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'isesaki-city-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'isesaki-city-marathon-2026';
DELETE FROM race_results WHERE race_id = 'isesaki-city-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'isesaki-city-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'isesaki-city-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'isesaki-city-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'isesaki-city-marathon-2026',
  '伊勢崎シティマラソン',
  'Isesaki City Marathon',
  '2026-12-06',
  '10',
  '伊勢崎市',
  'Isesaki City',
  '群馬県伊勢崎市の華蔵寺公園運動施設で開催されるマラソン大会。陸上競技場発着の周回コースでハーフマラソン・10km・5km・1.5kmを実施。',
  'Held at Kezoji Park Sports Facility in Isesaki, Gunma. A loop course starting and finishing at the athletics stadium, featuring half marathon, 10km, 5km, and 1.5km races.',
  'https://sports-isesaki.jp/citymarathon.html',
  3500,
  1,
  2000,
  '2026-09-01',
  '2026-10-01',
  0,
  'pre_mail',
  'ナンバーカード（計測用タグ付）は大会プログラム等とともに11月中旬頃、登録住所へ郵送予定。大会2週間前までに届かない場合は実行委員会事務局へ連絡。紛失時は当日会場のトラブルコーナーで再発行可（手数料2,000円）。',
  'Bib numbers (with timing tag) are mailed with the race program to the registered address around mid-November. Contact the organizing committee if not received two weeks before the race. Reissue is available at the trouble corner on race day for a 2,000 yen fee.',
  '[]',
  NULL,
  0,
  0,
  0,
  'road',
  '["JAAF"]',
  '伊勢崎市華蔵寺公園運動施設の陸上競技場をスタート・フィニッシュとする周回コース。ハーフマラソンはトラックと場外コースを組み合わせた2周回。',
  'A loop course starting and finishing at the athletics stadium in Kezoji Park. The half marathon combines the track and an out-of-stadium loop, run twice.',
  'JAAF公認はハーフマラソン・10kmコースのみ（5km・1.5kmは対象外）',
  'JAAF certification applies only to the half marathon and 10km courses (not the 5km or 1.5km).',
  NULL,
  NULL,
  NULL,
  '群馬・伊勢崎、華蔵寺公園を駆けるファミリーマラソン',
  'A family-friendly marathon through Kezoji Park in Isesaki, Gunma',
  NULL,
  NULL,
  NULL,
  '伊勢崎市華蔵寺公園運動施設',
  'Kezoji Park Sports Facility',
  NULL,
  NULL,
  NULL,
  '2026-08-31T00:00:00Z',
  '2026-08-31T00:00:00Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('isesaki-city-marathon-2026', 'half', 21.0975, 0, '09:00', 700, 3500, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('isesaki-city-marathon-2026', '10k', 10, 0, '09:15', 700, 3000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 1);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('isesaki-city-marathon-2026', '5k', 5, 0, '09:25', 400, 2500, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 2);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('isesaki-city-marathon-2026', 'other', 1.5, 0, '08:30', 200, 500, NULL, '1.5kmコース', '1.5km Course', NULL, NULL, NULL, NULL, NULL, '[]', 3);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('isesaki-city-marathon-2026', '["other"]', '参加者全員に参加賞。各部門1〜6位に賞状、1〜3位に記念品。ラッキー賞も多数用意。', 'Participation gift for all entrants. Certificates for 1st-6th place and commemorative items for 1st-3rd place in each category, plus various lucky draw prizes.', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('isesaki-city-marathon-2026', '["certificate"]', 'WEB完走証（記録証）を大会ホームページからダウンロード可能', 'Downloadable WEB finisher certificate (results record) available from the official website', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('isesaki-city-marathon-2026', NULL, '一般エントリー', 'General Entry', '2026-09-01', '2026-10-01', NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('isesaki-city-marathon-2026', NULL, NULL, '華蔵寺公園運動施設', 'Kezoji Park Sports Facility', NULL, NULL, 0);

-- ==================
-- 石岡つくばねハーフマラソン (ishioka-tsukubane-half-marathon-2027)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'ishioka-tsukubane-half-marathon-2027';
DELETE FROM race_categories WHERE race_id = 'ishioka-tsukubane-half-marathon-2027';
DELETE FROM aid_stations WHERE race_id = 'ishioka-tsukubane-half-marathon-2027';
DELETE FROM checkpoints WHERE race_id = 'ishioka-tsukubane-half-marathon-2027';
DELETE FROM access_points WHERE race_id = 'ishioka-tsukubane-half-marathon-2027';
DELETE FROM nearby_spots WHERE race_id = 'ishioka-tsukubane-half-marathon-2027';
DELETE FROM weather_history WHERE race_id = 'ishioka-tsukubane-half-marathon-2027';
DELETE FROM participation_gifts WHERE race_id = 'ishioka-tsukubane-half-marathon-2027';
DELETE FROM completion_gifts WHERE race_id = 'ishioka-tsukubane-half-marathon-2027';
DELETE FROM race_entry_links WHERE race_id = 'ishioka-tsukubane-half-marathon-2027';
DELETE FROM race_entry_periods WHERE race_id = 'ishioka-tsukubane-half-marathon-2027';
DELETE FROM reception_sessions WHERE race_id = 'ishioka-tsukubane-half-marathon-2027';
DELETE FROM race_travel_times WHERE race_id = 'ishioka-tsukubane-half-marathon-2027';
DELETE FROM race_results WHERE race_id = 'ishioka-tsukubane-half-marathon-2027';
DELETE FROM race_gallery WHERE race_id = 'ishioka-tsukubane-half-marathon-2027';
DELETE FROM race_voices WHERE race_id = 'ishioka-tsukubane-half-marathon-2027';
DELETE FROM race_time_buckets WHERE race_id = 'ishioka-tsukubane-half-marathon-2027';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'ishioka-tsukubane-half-marathon-2027',
  '石岡つくばねハーフマラソン',
  'Ishioka Tsukubane Half Marathon',
  '2027-02-14',
  '08',
  '石岡市',
  'Ishioka City',
  '茨城県石岡市で開催されるハーフマラソン。筑波山系「つくばね」の自然を感じられるコースが特徴。',
  'A half marathon held in Ishioka, Ibaraki, running a course that showcases the natural scenery of the Tsukubane area of the Mt. Tsukuba range.',
  'https://ishioka-half.com/',
  NULL,
  1,
  5200,
  '2026-09-01',
  '2026-11-30',
  0,
  'pre_mail',
  'ビブス（ゼッケン）は主催者側で事前に用意し郵送',
  'Race bibs are prepared and mailed to participants in advance by the organizer',
  '["ふるさと納税エントリー対応"]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  '筑波山系「つくばね」の自然を感じられるコース',
  'A course that lets runners experience the natural beauty of the Tsukubane area of the Mt. Tsukuba range',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '筑波山麓・つくばねの自然を駆ける',
  'Run through the natural beauty of Tsukubane at the foot of Mt. Tsukuba',
  NULL,
  NULL,
  NULL,
  'いしおかイベント広場',
  'Ishioka Event Plaza',
  '茨城県石岡市若宮3丁目1-1',
  NULL,
  NULL,
  '2026-08-31T00:00:00Z',
  '2026-08-31T00:00:00Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('ishioka-tsukubane-half-marathon-2027', 'half', 21.0975, 180, '09:30', 3000, 6000, NULL, 'ハーフマラソン', 'Half Marathon', NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('ishioka-tsukubane-half-marathon-2027', 'other', 3, 30, '10:15', 1000, 3000, NULL, '一般3kmの部', 'General 3km', NULL, NULL, NULL, NULL, NULL, '[]', 1);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('ishioka-tsukubane-half-marathon-2027', 'other', 3, 30, '10:30', 500, 1000, NULL, '中学生3kmの部', 'Junior High School 3km', NULL, NULL, NULL, NULL, NULL, '[]', 2);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('ishioka-tsukubane-half-marathon-2027', 'other', 2.2, 25, '10:50', 500, 1000, NULL, '小学生2.2kmの部', 'Elementary School 2.2km', NULL, NULL, NULL, NULL, NULL, '[]', 3);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('ishioka-tsukubane-half-marathon-2027', 'other', 2.2, 25, '10:55', 200, 2000, NULL, '親子2.2kmの部', 'Parent-Child 2.2km', NULL, NULL, NULL, NULL, NULL, '[]', 4);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('ishioka-tsukubane-half-marathon-2027', '["tshirt"]', '参加賞Tシャツ（ハーフマラソンのみ）', 'Participation T-shirt (half marathon only)', NULL, 0);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('ishioka-tsukubane-half-marathon-2027', '["towel"]', '参加賞ハンドタオル（ハーフマラソン以外の種目）', 'Participation hand towel (all events except the half marathon)', NULL, 1);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('ishioka-tsukubane-half-marathon-2027', NULL, '一般エントリー', 'General Entry', '2026-09-01', '2026-11-30', NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('ishioka-tsukubane-half-marathon-2027', NULL, NULL, 'つくばねの自然', 'The natural scenery of Tsukubane', NULL, NULL, 0);

-- ==================
-- 板橋Cityマラソン (itabashi-city-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'itabashi-city-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'itabashi-city-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'itabashi-city-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'itabashi-city-marathon-2026';
DELETE FROM access_points WHERE race_id = 'itabashi-city-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'itabashi-city-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'itabashi-city-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'itabashi-city-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'itabashi-city-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'itabashi-city-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'itabashi-city-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'itabashi-city-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'itabashi-city-marathon-2026';
DELETE FROM race_results WHERE race_id = 'itabashi-city-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'itabashi-city-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'itabashi-city-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'itabashi-city-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'itabashi-city-marathon-2026',
  '板橋Cityマラソン',
  'Itabashi City Marathon',
  '2026-03-15',
  '13',
  '板橋区',
  'Itabashi Ward',
  '荒川河川敷を走るフラットなフルマラソン。記録を狙いやすいコースとして人気。制限時間7時間で初心者にも優しい。',
  'A flat full marathon along the Arakawa River. Popular for record attempts. 7-hour time limit is beginner-friendly.',
  'https://i-c-m.jp',
  11550,
  1,
  10000,
  '2025-08-01',
  '2025-11-24',
  0,
  'pre_day',
  '',
  '',
  '["フラット","初心者おすすめ","記録狙い"]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  '荒川河川敷',
  'Arakawa Riverbank',
  NULL,
  NULL,
  '荒川',
  '#6b7280',
  'Arakawa',
  '荒川河川敷を駆ける、春の板橋シティマラソン',
  'Run the Arakawa riverside in spring',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-05-30T06:35:40.462Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('itabashi-city-marathon-2026', 'full', 42.195, 420, '09:00', 10000, 11550, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('itabashi-city-marathon-2026', '5k', 5, 60, '', 1000, 3000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 1);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('itabashi-city-marathon-2026', '観光地', '荒川河川敷', 'Arakawa Riverbank', 'フラットな河川敷コース。記録を狙うランナーに人気の定番コース。', 'A flat riverbank course. A classic course popular with runners aiming for personal records.', 'コース上', NULL, 35.7917, 139.675);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('itabashi-city-marathon-2026', '["tshirt"]', '大会Tシャツ、完走メダル', 'Race T-shirt, Finisher medal', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('itabashi-city-marathon-2026', '["medal"]', '大会Tシャツ、完走メダル', 'Race T-shirt, Finisher medal', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('itabashi-city-marathon-2026', NULL, '一般エントリー', 'General Entry', '2025-08-01', '2025-11-24', NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('itabashi-city-marathon-2026', NULL, NULL, '荒川河川敷', 'Arakawa Riverbank', NULL, NULL, 0);

-- ==================
-- 板橋Cityマラソン (itabashi-city-marathon-2027)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'itabashi-city-marathon-2027';
DELETE FROM race_categories WHERE race_id = 'itabashi-city-marathon-2027';
DELETE FROM aid_stations WHERE race_id = 'itabashi-city-marathon-2027';
DELETE FROM checkpoints WHERE race_id = 'itabashi-city-marathon-2027';
DELETE FROM access_points WHERE race_id = 'itabashi-city-marathon-2027';
DELETE FROM nearby_spots WHERE race_id = 'itabashi-city-marathon-2027';
DELETE FROM weather_history WHERE race_id = 'itabashi-city-marathon-2027';
DELETE FROM participation_gifts WHERE race_id = 'itabashi-city-marathon-2027';
DELETE FROM completion_gifts WHERE race_id = 'itabashi-city-marathon-2027';
DELETE FROM race_entry_links WHERE race_id = 'itabashi-city-marathon-2027';
DELETE FROM race_entry_periods WHERE race_id = 'itabashi-city-marathon-2027';
DELETE FROM reception_sessions WHERE race_id = 'itabashi-city-marathon-2027';
DELETE FROM race_travel_times WHERE race_id = 'itabashi-city-marathon-2027';
DELETE FROM race_results WHERE race_id = 'itabashi-city-marathon-2027';
DELETE FROM race_gallery WHERE race_id = 'itabashi-city-marathon-2027';
DELETE FROM race_voices WHERE race_id = 'itabashi-city-marathon-2027';
DELETE FROM race_time_buckets WHERE race_id = 'itabashi-city-marathon-2027';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'itabashi-city-marathon-2027',
  '板橋Cityマラソン',
  'Itabashi City Marathon',
  '2027-03-21',
  '13',
  '板橋区',
  'Itabashi Ward',
  '荒川河川敷を走るフラットなフルマラソン。記録を狙いやすいコースとして人気。制限時間7時間で初心者にも優しい。',
  'A flat full marathon along the Arakawa River. Popular for record attempts. 7-hour time limit is beginner-friendly.',
  'https://i-c-m.jp',
  11550,
  1,
  10000,
  '2026-09-01',
  '2026-12-04',
  0,
  'pre_mail',
  'アスリートビブス・記録計測用チップ等を大会前（2027年3月上旬予定）に事前郵送するため、当日受付はなし。',
  'Bibs and timing chips are mailed in advance (early March 2027); there is no on-site reception on race day.',
  '["フラット","初心者おすすめ","記録狙い"]',
  NULL,
  0,
  0,
  0,
  'road',
  '["JAAF","WA"]',
  '荒川河川敷',
  'Arakawa Riverbank',
  NULL,
  NULL,
  '荒川',
  '#6b7280',
  'Arakawa',
  '荒川河川敷を駆ける、春の板橋シティマラソン',
  'Run the Arakawa riverside in spring',
  NULL,
  NULL,
  NULL,
  '荒川戸田橋野球場',
  'Arakawa Todabashi Baseball Stadium',
  '東京都板橋区舟渡3-20先',
  NULL,
  NULL,
  '2026-08-24T16:12:57.026Z',
  '2026-08-24T16:12:57.026Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('itabashi-city-marathon-2027', 'full', 42.195, 420, '09:00', 10000, 11550, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('itabashi-city-marathon-2027', '5k', 5, 60, '', 1000, 3000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 1);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  ('itabashi-city-marathon-2027', '浮間舟渡駅', 'Ukima-Funado Station', '', '徒歩15分', '15 min walk', 0, 0, 15, 1, 0);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  ('itabashi-city-marathon-2027', '蓮根駅', 'Hasune Station', '', '徒歩15分', '15 min walk', 0, 0, 15, 0, 1);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  ('itabashi-city-marathon-2027', '舟渡小学校（バス停）', 'Funado Elementary School (bus stop)', '', '徒歩5分', '5 min walk', 0, 0, 5, 0, 2);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('itabashi-city-marathon-2027', '観光地', '荒川河川敷', 'Arakawa Riverbank', 'フラットな河川敷コース。記録を狙うランナーに人気の定番コース。', 'A flat riverbank course. A classic course popular with runners aiming for personal records.', 'コース上', NULL, 35.7917, 139.675);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('itabashi-city-marathon-2027', '宿泊', '板橋センターホテル', 'Itabashi Center Hotel', '会場周辺の宿泊施設。', 'Accommodation near the venue.', '近隣', NULL, 0, 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('itabashi-city-marathon-2027', '宿泊', '東横INN埼玉戸田公園駅西口', 'Toyoko Inn Saitama Toda-koen Station West Exit', '会場周辺の宿泊施設。', 'Accommodation near the venue.', '近隣', NULL, 0, 0);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('itabashi-city-marathon-2027', '["tshirt"]', '大会Tシャツ、完走メダル', 'Race T-shirt, Finisher medal', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('itabashi-city-marathon-2027', '["medal"]', '大会Tシャツ、完走メダル', 'Race T-shirt, Finisher medal', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('itabashi-city-marathon-2027', NULL, 'マラソン 一般枠', 'Marathon General Entry', '2026-09-01', '2026-12-04', 11550, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('itabashi-city-marathon-2027', NULL, 'マラソン プレミアムエントリー', 'Marathon Premium Entry', '2026-09-01', '2026-12-04', 33000, 1);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('itabashi-city-marathon-2027', NULL, '5km 一般の部', '5km General', '2026-09-01', '2026-12-04', 3000, 2);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('itabashi-city-marathon-2027', NULL, '5km 高校生の部', '5km High School', '2026-09-01', '2026-12-04', 2000, 3);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('itabashi-city-marathon-2027', NULL, 'ジュニア(3km)', 'Junior (3km)', '2026-09-01', '2026-12-04', 1000, 4);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('itabashi-city-marathon-2027', NULL, 'ファミリーラン(1km)', 'Family Run (1km)', '2026-09-01', '2026-12-04', 1000, 5);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('itabashi-city-marathon-2027', NULL, '車いす(1km)', 'Wheelchair (1km)', '2026-09-01', '2026-12-04', 0, 6);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('itabashi-city-marathon-2027', NULL, NULL, '荒川河川敷', 'Arakawa Riverbank', NULL, NULL, 0);

-- ==================
-- いわきサンシャインマラソン (iwaki-sunshine-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'iwaki-sunshine-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'iwaki-sunshine-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'iwaki-sunshine-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'iwaki-sunshine-marathon-2026';
DELETE FROM access_points WHERE race_id = 'iwaki-sunshine-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'iwaki-sunshine-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'iwaki-sunshine-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'iwaki-sunshine-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'iwaki-sunshine-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'iwaki-sunshine-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'iwaki-sunshine-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'iwaki-sunshine-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'iwaki-sunshine-marathon-2026';
DELETE FROM race_results WHERE race_id = 'iwaki-sunshine-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'iwaki-sunshine-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'iwaki-sunshine-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'iwaki-sunshine-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'iwaki-sunshine-marathon-2026',
  'いわきサンシャインマラソン',
  'Iwaki Sunshine Marathon',
  '2026-02-22',
  '07',
  'いわき市',
  'Iwaki City',
  '福島県いわき市で開催されるフルマラソン。太平洋に面した海岸コース。いわきの復興と元気を発信する大会。',
  'A full marathon in Iwaki City, Fukushima, along the Pacific coast. A race promoting Iwaki''s recovery and vitality.',
  'https://iwaki-marathon.jp',
  9000,
  1,
  8000,
  '2025-09-12',
  '2025-10-15',
  0,
  'pre_day',
  '',
  '',
  '["海沿い"]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  '太平洋沿岸',
  'Pacific coastline',
  NULL,
  NULL,
  '太平洋',
  '#0369a1',
  'Taiheiyo',
  '太平洋の輝きとともに、いわきの海岸を走る',
  'Run along Iwaki''s Pacific coast in sunshine',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-05-30T06:35:45.814Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('iwaki-sunshine-marathon-2026', 'full', 42.195, 360, '', 5000, 9000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('iwaki-sunshine-marathon-2026', '10k', 10, 0, '', 900, 4500, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 1);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('iwaki-sunshine-marathon-2026', '5k', 5, 0, '', 500, 4500, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 2);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('iwaki-sunshine-marathon-2026', 'other', 2, 0, '', 400, 1500, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 3);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('iwaki-sunshine-marathon-2026', '温泉', 'いわき湯本温泉', 'Iwaki Yumoto Onsen', 'いわき市の歴史ある温泉地。レース後のリカバリーに。', 'A historic hot spring in Iwaki. For post-race recovery.', 'いわき市内', NULL, 36.9744, 140.8456);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('iwaki-sunshine-marathon-2026', '["tshirt"]', '大会Tシャツ、完走メダル', 'Race T-shirt, Finisher medal', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('iwaki-sunshine-marathon-2026', '["medal"]', '大会Tシャツ、完走メダル', 'Race T-shirt, Finisher medal', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('iwaki-sunshine-marathon-2026', NULL, '一般エントリー', 'General Entry', '2025-09-12', '2025-10-15', NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('iwaki-sunshine-marathon-2026', NULL, NULL, '太平洋沿岸', 'Pacific coastline', NULL, NULL, 0);

-- ==================
-- いわきサンシャインマラソン (iwaki-sunshine-marathon-2027)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'iwaki-sunshine-marathon-2027';
DELETE FROM race_categories WHERE race_id = 'iwaki-sunshine-marathon-2027';
DELETE FROM aid_stations WHERE race_id = 'iwaki-sunshine-marathon-2027';
DELETE FROM checkpoints WHERE race_id = 'iwaki-sunshine-marathon-2027';
DELETE FROM access_points WHERE race_id = 'iwaki-sunshine-marathon-2027';
DELETE FROM nearby_spots WHERE race_id = 'iwaki-sunshine-marathon-2027';
DELETE FROM weather_history WHERE race_id = 'iwaki-sunshine-marathon-2027';
DELETE FROM participation_gifts WHERE race_id = 'iwaki-sunshine-marathon-2027';
DELETE FROM completion_gifts WHERE race_id = 'iwaki-sunshine-marathon-2027';
DELETE FROM race_entry_links WHERE race_id = 'iwaki-sunshine-marathon-2027';
DELETE FROM race_entry_periods WHERE race_id = 'iwaki-sunshine-marathon-2027';
DELETE FROM reception_sessions WHERE race_id = 'iwaki-sunshine-marathon-2027';
DELETE FROM race_travel_times WHERE race_id = 'iwaki-sunshine-marathon-2027';
DELETE FROM race_results WHERE race_id = 'iwaki-sunshine-marathon-2027';
DELETE FROM race_gallery WHERE race_id = 'iwaki-sunshine-marathon-2027';
DELETE FROM race_voices WHERE race_id = 'iwaki-sunshine-marathon-2027';
DELETE FROM race_time_buckets WHERE race_id = 'iwaki-sunshine-marathon-2027';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'iwaki-sunshine-marathon-2027',
  'いわきサンシャインマラソン',
  'Iwaki Sunshine Marathon',
  '2027-02-28',
  '07',
  'いわき市',
  'Iwaki City',
  '福島県いわき市で開催されるフルマラソン。太平洋に面した海岸コース。いわきの復興と元気を発信する大会。',
  'A full marathon in Iwaki City, Fukushima, along the Pacific coast. A race promoting Iwaki''s recovery and vitality.',
  'https://iwaki-marathon.jp',
  9000,
  1,
  8000,
  '2026-09-11',
  '2026-10-15',
  0,
  'pre_day',
  '',
  '',
  '["海沿い"]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  '太平洋沿岸',
  'Pacific coastline',
  NULL,
  NULL,
  '太平洋',
  '#0369a1',
  'Taiheiyo',
  '太平洋の輝きとともに、いわきの海岸を走る',
  'Run along Iwaki''s Pacific coast in sunshine',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '2026-06-24T00:00:00Z',
  '2026-06-22T15:02:41.436Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('iwaki-sunshine-marathon-2027', 'full', 42.195, 360, '', 5000, 9000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('iwaki-sunshine-marathon-2027', '10k', 10, 0, '', 900, 4500, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 1);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('iwaki-sunshine-marathon-2027', '5k', 5, 0, '', 500, 4500, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 2);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('iwaki-sunshine-marathon-2027', 'other', 2, 0, '', 400, 1500, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 3);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('iwaki-sunshine-marathon-2027', '温泉', 'いわき湯本温泉', 'Iwaki Yumoto Onsen', 'いわき市の歴史ある温泉地。レース後のリカバリーに。', 'A historic hot spring in Iwaki. For post-race recovery.', 'いわき市内', NULL, 36.9744, 140.8456);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('iwaki-sunshine-marathon-2027', '["tshirt"]', '大会Tシャツ', 'Race T-shirt', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('iwaki-sunshine-marathon-2027', '["medal"]', '完走メダル', 'Finisher medal', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('iwaki-sunshine-marathon-2027', NULL, '一般エントリー', 'General Entry', '2026-09-11', '2026-10-15', NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('iwaki-sunshine-marathon-2027', NULL, NULL, '太平洋沿岸', 'Pacific coastline', NULL, NULL, 0);

-- ==================
-- いわて盛岡シティマラソン (iwate-morioka-city-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'iwate-morioka-city-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'iwate-morioka-city-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'iwate-morioka-city-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'iwate-morioka-city-marathon-2026';
DELETE FROM access_points WHERE race_id = 'iwate-morioka-city-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'iwate-morioka-city-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'iwate-morioka-city-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'iwate-morioka-city-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'iwate-morioka-city-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'iwate-morioka-city-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'iwate-morioka-city-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'iwate-morioka-city-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'iwate-morioka-city-marathon-2026';
DELETE FROM race_results WHERE race_id = 'iwate-morioka-city-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'iwate-morioka-city-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'iwate-morioka-city-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'iwate-morioka-city-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'iwate-morioka-city-marathon-2026',
  'いわて盛岡シティマラソン',
  'Iwate Morioka City Marathon',
  '2026-10-04',
  '03',
  '岩手県盛岡市永井７地割16-2',
  '16-2 Nagai 7-chome, Morioka City, Iwate Prefecture',
  '特徴1「盛岡」ならではのエイドステーション
エイドステーションでは、テレビやRUNNET大会レポなどで度々取り上げられている、話題の盛岡銘菓やわんこそばなどを多数提供予定です！ 盛岡の味を堪能しながら、完走を目指しましょう。

特徴2いわて盛岡を満喫できるコース！！
盛岡城跡公園、赤レンガ館、盛岡八幡宮など盛岡の歴史を感じられます。
フルマラソン、ペアランのフィニッシュは、きたぎんボールパーク野球場内。
秋の爽やかな盛岡路を満喫しましょう！

特徴3市民のあたたかい応援
コースの一部が市街地となっているため、多くの市民が沿道応援をします。
さらに「さんさ踊り」の太鼓や吹奏楽、地元中学生の応援団がエールを送ります。

特徴4フルマラソン完走賞は、南部鉄器製完走メダルとフィニッシャータオル！！',
  'Feature 1: Aid Stations Unique to Morioka
At the aid stations, we plan to offer a wide variety of popular Morioka specialties—such as the famous local sweets and wanko soba—which have frequently been featured on TV and in RUNNET event reports! Enjoy the flavors of Morioka as you strive to finish the race.

Feature 2: A Course That Lets You Fully Enjoy Iwate and Morioka!!
Experience Morioka’s history at sites such as Morioka Castle Ruins Park, the Red Brick Hall, and Morioka Hachimangu Shrine.
The finish line for the full marathon and the pair run is located inside Kitagin Ballpark.
Enjoy the refreshing autumn roads of Morioka!

Feature 3: Warm Cheers from the Locals
Since part of the course runs through the city center, many residents will be cheering you on along the route.
Plus, you’ll be greeted by the drums and brass bands of the “Sansa Odori” dance, as well as cheers from local junior high school cheerleading squads.

Feature 4: Full Marathon Finisher Awards Include a Nanbu Ironware Finisher Medal and a Finisher Towel!!

Translated with DeepL.com (free version)',
  'https://iwate-morioka-city-marathon.jp/',
  12000,
  1,
  6000,
  '2026-04-01',
  '2026-08-03',
  0,
  'pre_day',
  '前日の2026年10月3日（土）10時から18時まできたぎんボールパーク（盛岡市永井７地割16番地２）で参加者受付を行います。受付時にアスリートビブス、計測チップ及び参加案内等をお渡しします。なお、再発行や大会当日の受付は行いません。
+600円で事前送付とすることが出来る',
  'Registration will take place on the day before the event, Saturday, October 3, 2026, from 10:00 AM to 6:00 PM at Tagin Ball Park (16-2 Nagai 7-chigari, Morioka City). At registration, you will receive your race bib, timing chip, and participant guide. Please note that we will not issue replacements or accept registrations on the day of the event.
You can have these items mailed to you in advance for an additional 600 yen.

Translated with DeepL.com (free version)',
  '[]',
  NULL,
  0,
  0,
  0,
  'road',
  '["JAAF"]',
  'きたぎんボールパーク発着。岩手山、鮭が遡る川、城跡・城下町の古きよき街並の中心市街地と新市街地を走るコース',
  'Start and finish at Kitagin Ballpark. A course through Morioka''s historic castle town streets, riverside scenery with salmon runs, and new city developments beneath Mt. Iwate.',
  '',
  '',
  '岩手山',
  '#374151',
  'Iwate-san',
  '南部片富士・岩手山を望み、盛岡の街を駆ける',
  'Run through Morioka with Mt. Iwate towering above',
  NULL,
  NULL,
  NULL,
  'きたぎんボールパーク',
  'Kitagin Ballpark',
  '岩手県盛岡市永井7地割16番地2',
  NULL,
  NULL,
  '2026-04-16T15:23:52.019Z',
  '2026-07-27T14:14:28.754Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('iwate-morioka-city-marathon-2026', 'full', 42.195, 360, '09:00', 6000, 12000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('iwate-morioka-city-marathon-2026', '["towel","medal"]', 'フィニッシャータオル、南部鉄器製完走メダル', 'Finisher towel, Nanbu ironware finisher medal', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('iwate-morioka-city-marathon-2026', NULL, '一般エントリー（前日受付）', 'General Entry (On-site Pickup)', '2026-04-01', '2026-08-03', 12000, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('iwate-morioka-city-marathon-2026', NULL, '一般エントリー（事前送付）', 'General Entry (Pre-delivery +¥600)', '2026-04-01', '2026-07-20', 12600, 1);

-- ==================
-- いわて奥州きらめきマラソン (iwate-oshu-kirameki-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'iwate-oshu-kirameki-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'iwate-oshu-kirameki-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'iwate-oshu-kirameki-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'iwate-oshu-kirameki-marathon-2026';
DELETE FROM access_points WHERE race_id = 'iwate-oshu-kirameki-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'iwate-oshu-kirameki-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'iwate-oshu-kirameki-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'iwate-oshu-kirameki-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'iwate-oshu-kirameki-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'iwate-oshu-kirameki-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'iwate-oshu-kirameki-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'iwate-oshu-kirameki-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'iwate-oshu-kirameki-marathon-2026';
DELETE FROM race_results WHERE race_id = 'iwate-oshu-kirameki-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'iwate-oshu-kirameki-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'iwate-oshu-kirameki-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'iwate-oshu-kirameki-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'iwate-oshu-kirameki-marathon-2026',
  'いわて奥州きらめきマラソン',
  'Iwate Oshu Kirameki Marathon',
  '2026-05-17',
  '03',
  '奥州市',
  'Oshu City',
  '岩手県奥州市で開催。奥州の自然と歴史を感じながら走るフルマラソン。',
  'A full marathon in Oshu City, Iwate, running through the nature and history of the region.',
  'https://oshukirameki.jp',
  10000,
  1,
  3000,
  '2025-11-28',
  '2026-02-28',
  0,
  'pre_day',
  '',
  '',
  '[]',
  NULL,
  0,
  0,
  0,
  'road',
  '["JAAF"]',
  '',
  '',
  NULL,
  NULL,
  '平泉',
  '#854d0e',
  'Hiraizumi',
  '世界遺産・平泉の黄金文化を感じながら走る',
  'Run through Hiraizumi, the Golden City of World Heritage',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-06-22T15:03:07.746Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('iwate-oshu-kirameki-marathon-2026', 'full', 42.195, 360, '08:30', 3000, 10000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('iwate-oshu-kirameki-marathon-2026', '10k', 10, 90, '08:45', 1000, 3000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 1);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('iwate-oshu-kirameki-marathon-2026', '観光地', '中尊寺金色堂', 'Chusonji Konjikido', '世界遺産・平泉。奥州藤原氏の栄華を伝える。奥州市から車約30分。', 'World Heritage Hiraizumi. Tells of the glory of the Oshu Fujiwara clan. About 30 min by car from Oshu.', '奥州市から車約30分', NULL, 39, 141.1);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('iwate-oshu-kirameki-marathon-2026', '["tshirt"]', '大会Tシャツ、完走メダル', 'Race T-shirt, Finisher medal', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('iwate-oshu-kirameki-marathon-2026', '["medal"]', '大会Tシャツ、完走メダル', 'Race T-shirt, Finisher medal', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('iwate-oshu-kirameki-marathon-2026', NULL, '一般エントリー', 'General Entry', '2025-11-28', '2026-02-28', NULL, 0);

-- ==================
-- 伊豆大島マラソン (izu-oshima-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'izu-oshima-2026';
DELETE FROM race_categories WHERE race_id = 'izu-oshima-2026';
DELETE FROM aid_stations WHERE race_id = 'izu-oshima-2026';
DELETE FROM checkpoints WHERE race_id = 'izu-oshima-2026';
DELETE FROM access_points WHERE race_id = 'izu-oshima-2026';
DELETE FROM nearby_spots WHERE race_id = 'izu-oshima-2026';
DELETE FROM weather_history WHERE race_id = 'izu-oshima-2026';
DELETE FROM participation_gifts WHERE race_id = 'izu-oshima-2026';
DELETE FROM completion_gifts WHERE race_id = 'izu-oshima-2026';
DELETE FROM race_entry_links WHERE race_id = 'izu-oshima-2026';
DELETE FROM race_entry_periods WHERE race_id = 'izu-oshima-2026';
DELETE FROM reception_sessions WHERE race_id = 'izu-oshima-2026';
DELETE FROM race_travel_times WHERE race_id = 'izu-oshima-2026';
DELETE FROM race_results WHERE race_id = 'izu-oshima-2026';
DELETE FROM race_gallery WHERE race_id = 'izu-oshima-2026';
DELETE FROM race_voices WHERE race_id = 'izu-oshima-2026';
DELETE FROM race_time_buckets WHERE race_id = 'izu-oshima-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'izu-oshima-2026',
  '伊豆大島マラソン',
  'Izu-Oshima-Marathon',
  '2026-12-05',
  '13',
  '伊豆大島（東京都大島町）',
  '',
  '絶景の海沿い　緑深い椿のトンネル　三原山裏砂漠沿い

三原山を仰ぐ醍醐味のあるアップダウンなど、変化に富んだハードな挑戦コースを走る「伊豆大島マラソン」!
16回目となる今大会も、豊かな大自然のなか初心者からベテランランナーまで、島民の声援を受けて楽しく島ランしよう!
海風！山風！最大標高差365m！に、伊豆大島からの挑戦状です！',
  'Stunning coastal views, lush camellia tunnels, and the desert landscape behind Mt. Mihara
The “Izu Oshima Marathon” takes you on a challenging, varied course featuring thrilling ups and downs as you gaze up at Mt. Mihara!
Now in its 16th year, this event invites everyone—from beginners to seasoned runners—to enjoy a fun run around the island amidst rich natural scenery, cheered on by the islanders!
Sea breezes! Mountain breezes! A maximum elevation gain of 365 meters! This is Izu Oshima’s challenge to you!

Translated with DeepL.com (free version)',
  'https://www.shining-foundation.org/izu-oshima-run',
  9400,
  1,
  750,
  '2026-06-06',
  '2026-11-15',
  0,
  'both',
  '■大会会場での受付方法：大会の1週間前までに参加案内書（封筒）を本人宛に郵送します。
12/4（金）
14:00　前日受付開始（元町港船客待合所）
16:30　前日受付終了
※前日の受付は空いていてスムーズに受付ができます。

12/5（土）
  6:00　開場、当日受付開始（元町港船客待合所）',
  '■Registration at the Event Venue: A participation guide (in an envelope) will be mailed to you personally at least one week before the event.
Fri, Dec 4
2:00 PM: Pre-event registration begins (Motomachi Port Passenger Waiting Hall)
4:30 PM: Pre-event registration ends
*The pre-event registration area is less crowded, so the process will be smooth.

December 5 (Sat)
  6:00 AM: Doors open; on-site registration begins (Motomachi Port Passenger Waiting Hall)

Translated with DeepL.com (free version)',
  '[]',
  NULL,
  0,
  0,
  365,
  'road',
  '[]',
  '海沿い、椿のトンネル、三原山',
  'Coastal road, camellia tunnel, Mt. Mihara',
  NULL,
  NULL,
  '三原山',
  NULL,
  'Mt.MIHARA',
  '初心者からベテランランナーまでハードな挑戦コース',
  NULL,
  NULL,
  NULL,
  NULL,
  '元町港船客待合所',
  'Motomachi Port Passenger Waiting Hall',
  '東京都大島町元町',
  NULL,
  NULL,
  '2026-06-06T08:43:10.814Z',
  '2026-08-24T16:28:34.477Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('izu-oshima-2026', 'full', 42.195, 420, '08:00', 750, 9400, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'izu-oshima-2026.gpx', '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('izu-oshima-2026', 'half', 21.0975, 180, '08:20', 0, 7400, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 1);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('izu-oshima-2026', '10k', 10, 100, '09:00', 0, 5400, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 2);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  ('izu-oshima-2026', '元町港', 'Motomachi Port', '', '下船後、桟橋を歩いてすぐ（会場）', 'Short walk from the pier after disembarking (venue)', 0, 0, 0, 1, 0);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  ('izu-oshima-2026', '岡田港', 'Okada Port', '', '路線バスで約17分（370円）またはタクシー', 'About 17 min by local bus (JPY 370) or taxi', 0, 0, 0, 0, 1);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('izu-oshima-2026', '温泉', '浜の湯', 'Hamanoyu', '海を一望できる絶景露天温泉。大会参加者は入浴券が無料サービスされる（水着着用）', 'Open-air hot spring with ocean views; free admission ticket for participants (swimwear required)', '徒歩4分', 'http://www.izu-oshima.or.jp/work/look/hamanoyu.html', 0, 0);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('izu-oshima-2026', '["coupon"]', 'フィニッシュ時、島民ブースで使える金券プレゼント', 'Voucher usable at resident booths upon finishing', NULL, 0);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('izu-oshima-2026', '["food"]', 'フィニッシュ時、大島名物あったか「あら汁」の無料サービス', 'Free serving of Oshima''s famous warm fish soup (arajiru) at the finish', NULL, 1);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('izu-oshima-2026', '["medal"]', 'オリジナル完走メダル', '', NULL, 0);
INSERT OR REPLACE INTO race_entry_links (race_id, site_name, url, sort_order) VALUES
  ('izu-oshima-2026', 'RUNNET', 'https://runnet.jp/entry/runtes/user/pc/competitionDetailAction.do?raceId=392378&div=1', 0);
INSERT OR REPLACE INTO race_entry_links (race_id, site_name, url, sort_order) VALUES
  ('izu-oshima-2026', 'SPORT ENTRY', 'https://www.sportsentry.ne.jp/event/t/105839', 1);
INSERT OR REPLACE INTO race_entry_links (race_id, site_name, url, sort_order) VALUES
  ('izu-oshima-2026', 'LAWSON SPORTS', 'https://do.l-tike.com/app/dss/race/detail?acd=nemqQ8yPKR7', 2);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('izu-oshima-2026', NULL, 'フルマラソン', 'Full Marathon', '2026-06-06', '2026-11-15', 9400, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('izu-oshima-2026', NULL, 'ハーフマラソン', 'Half Marathon', '2026-06-06', '2026-11-15', 7400, 1);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('izu-oshima-2026', NULL, '10km', '10km', '2026-06-06', '2026-11-15', 5400, 2);

-- ==================
-- かがわマラソン (kagawa-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'kagawa-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'kagawa-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'kagawa-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'kagawa-marathon-2026';
DELETE FROM access_points WHERE race_id = 'kagawa-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'kagawa-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'kagawa-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'kagawa-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'kagawa-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'kagawa-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'kagawa-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'kagawa-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'kagawa-marathon-2026';
DELETE FROM race_results WHERE race_id = 'kagawa-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'kagawa-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'kagawa-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'kagawa-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'kagawa-marathon-2026',
  'かがわマラソン',
  'Kagawa Marathon',
  '2026-03-15',
  '37',
  '高松市',
  'Takamatsu City',
  '2026年が第1回大会の新しいフルマラソン。香川県の瀬戸内海沿いを走る。うどん県ならではのエイドに期待。',
  'A brand new marathon with its first edition in 2026. Run along the Seto Inland Sea in Kagawa, the udon prefecture.',
  'https://kagawa-marathon.com',
  0,
  1,
  10000,
  '2025-10-06',
  '2025-11-24',
  0,
  'pre_day',
  '',
  '',
  '["ご当地エイド","海沿い","第1回大会"]',
  NULL,
  0,
  0,
  0,
  'road',
  '["JAAF"]',
  '瀬戸内海、島々、栗林公園、里山、讃岐平野',
  'Seto Inland Sea, islands, Ritsurin Garden, satoyama, Sanuki Plain',
  NULL,
  NULL,
  '瀬戸内海',
  '#0284c7',
  'Setonaikai',
  '瀬戸内の穏やかな海を見渡しながら走る42km',
  'Run along the serene shores of the Seto Inland Sea',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-06-27T13:29:44.929Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('kagawa-marathon-2026', 'full', 42.195, 360, '10:00', 10000, 14000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kagawa-marathon-2026', 'グルメ', '讃岐うどん', 'Sanuki Udon', '香川を代表するご当地グルメ。コシの強い麺とシンプルなだしが特徴。市内に多数の名店。', 'Kagawa''s signature dish. Characterized by chewy noodles and simple broth. Many famous shops in the city.', '高松市内各所', NULL, 34.3403, 134.0472);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kagawa-marathon-2026', '観光地', '栗林公園', 'Ritsurin Garden', '国の特別名勝。日本を代表する回遊式大名庭園。', 'A Special Place of Scenic Beauty. One of Japan''s finest strolling gardens.', '高松市内', NULL, 34.3289, 134.0467);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('kagawa-marathon-2026', '["tshirt"]', 'オリジナルTシャツと記念品', 'Original T-shirt and commemorative item', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('kagawa-marathon-2026', '["medal","towel"]', '完走メダルとフィニッシャータオル', 'Finisher medal and finisher towel', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('kagawa-marathon-2026', NULL, '一般エントリー', 'General Entry', '2025-10-06', '2025-11-24', NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('kagawa-marathon-2026', NULL, NULL, '瀬戸内海', 'Seto Inland Sea', NULL, NULL, 0);

-- ==================
-- かがわマラソン (kagawa-marathon-2027)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'kagawa-marathon-2027';
DELETE FROM race_categories WHERE race_id = 'kagawa-marathon-2027';
DELETE FROM aid_stations WHERE race_id = 'kagawa-marathon-2027';
DELETE FROM checkpoints WHERE race_id = 'kagawa-marathon-2027';
DELETE FROM access_points WHERE race_id = 'kagawa-marathon-2027';
DELETE FROM nearby_spots WHERE race_id = 'kagawa-marathon-2027';
DELETE FROM weather_history WHERE race_id = 'kagawa-marathon-2027';
DELETE FROM participation_gifts WHERE race_id = 'kagawa-marathon-2027';
DELETE FROM completion_gifts WHERE race_id = 'kagawa-marathon-2027';
DELETE FROM race_entry_links WHERE race_id = 'kagawa-marathon-2027';
DELETE FROM race_entry_periods WHERE race_id = 'kagawa-marathon-2027';
DELETE FROM reception_sessions WHERE race_id = 'kagawa-marathon-2027';
DELETE FROM race_travel_times WHERE race_id = 'kagawa-marathon-2027';
DELETE FROM race_results WHERE race_id = 'kagawa-marathon-2027';
DELETE FROM race_gallery WHERE race_id = 'kagawa-marathon-2027';
DELETE FROM race_voices WHERE race_id = 'kagawa-marathon-2027';
DELETE FROM race_time_buckets WHERE race_id = 'kagawa-marathon-2027';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'kagawa-marathon-2027',
  'かがわマラソン',
  'Kagawa Marathon',
  '2027-03-21',
  '37',
  '高松市',
  'Takamatsu City',
  '2026年が第1回大会の新しいフルマラソン。香川県の瀬戸内海沿いを走る。うどん県ならではのエイドに期待。',
  'A brand new marathon with its first edition in 2026. Run along the Seto Inland Sea in Kagawa, the udon prefecture.',
  'https://kagawa-marathon.com',
  14000,
  1,
  11000,
  NULL,
  NULL,
  0,
  'pre_day',
  '2027年3月20日（土）10:00～19:00 会場：あなぶきアリーナ香川。大会当日（3月21日）の受付は行いません。高松ファンラン（約3km・約1km）の受付はありません（アスリートビブス等は事前送付）。',
  'Reception: Saturday, March 20, 2027, 10:00-19:00 at Anabuki Arena Kagawa. No reception on race day (March 21). No reception for Takamatsu Fun Run (approx. 3km/1km); bibs will be sent in advance.',
  '["ご当地エイド","海沿い","第1回大会"]',
  NULL,
  0,
  0,
  0,
  'road',
  '["JAAF"]',
  '瀬戸内海、島々、栗林公園、里山、讃岐平野',
  'Seto Inland Sea, islands, Ritsurin Garden, satoyama, Sanuki Plain',
  NULL,
  NULL,
  '瀬戸内海',
  '#0284c7',
  'Setonaikai',
  '瀬戸内の穏やかな海を見渡しながら走る42km',
  'Run along the serene shores of the Seto Inland Sea',
  NULL,
  NULL,
  NULL,
  'あなぶきアリーナ香川',
  'Anabuki Arena Kagawa',
  '香川県高松市サンポート',
  NULL,
  NULL,
  '2026-07-27T14:15:58.429Z',
  '2026-08-24T16:28:54.592Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('kagawa-marathon-2027', 'full', 42.195, 360, '10:00', 10000, 14000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  ('kagawa-marathon-2027', 'JR高松駅', 'JR Takamatsu Station', '', '徒歩約4分（300m）', 'approx. 4 min walk (300m)', 0, 0, 4, 1, 0);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  ('kagawa-marathon-2027', 'ことでん高松築港駅', 'Kotoden Takamatsu-Chikkō Station', '', '徒歩約4分（320m）', 'approx. 4 min walk (320m)', 0, 0, 4, 0, 1);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kagawa-marathon-2027', 'グルメ', '讃岐うどん', 'Sanuki Udon', '香川を代表するご当地グルメ。コシの強い麺とシンプルなだしが特徴。市内に多数の名店。', 'Kagawa''s signature dish. Characterized by chewy noodles and simple broth. Many famous shops in the city.', '高松市内各所', NULL, 34.3403, 134.0472);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kagawa-marathon-2027', '観光地', '栗林公園', 'Ritsurin Garden', '国の特別名勝。日本を代表する回遊式大名庭園。', 'A Special Place of Scenic Beauty. One of Japan''s finest strolling gardens.', '高松市内', NULL, 34.3289, 134.0467);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('kagawa-marathon-2027', '["tshirt"]', 'オリジナルTシャツと記念品', 'Original T-shirt and commemorative item', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('kagawa-marathon-2027', '["medal","towel"]', '完走メダルとフィニッシャータオル', 'Finisher medal and finisher towel', NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('kagawa-marathon-2027', NULL, NULL, '瀬戸内海', 'Seto Inland Sea', NULL, NULL, 0);

-- ==================
-- 鹿児島マラソン (kagoshima-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'kagoshima-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'kagoshima-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'kagoshima-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'kagoshima-marathon-2026';
DELETE FROM access_points WHERE race_id = 'kagoshima-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'kagoshima-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'kagoshima-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'kagoshima-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'kagoshima-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'kagoshima-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'kagoshima-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'kagoshima-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'kagoshima-marathon-2026';
DELETE FROM race_results WHERE race_id = 'kagoshima-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'kagoshima-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'kagoshima-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'kagoshima-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'kagoshima-marathon-2026',
  '鹿児島マラソン',
  'Kagoshima Marathon',
  '2026-03-01',
  '46',
  '鹿児島市',
  'Kagoshima City',
  '桜島を望みながら走るフルマラソン。錦江湾沿いの雄大な景色が魅力。',
  'A full marathon with views of Sakurajima volcano. Features magnificent scenery along Kinko Bay.',
  'https://www.kagoshima-marathon.jp',
  14000,
  1,
  10000,
  '2025-08-08',
  '2025-11-16',
  0,
  'pre_mail',
  'アスリートビブスは事前郵送。参加賞は2月28日（土）・3月1日（日）に受け取り可能（二次元コードメールを使用）。',
  'Athlete bibs sent by mail in advance. Participation gifts available for pickup on Feb 28 (Sat) and Mar 1 (Sun) via QR code email.',
  '["景色が良い","火山"]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  '桜島、錦江湾',
  'Sakurajima, Kinko Bay',
  NULL,
  NULL,
  '桜島',
  '#991b1b',
  'Sakura-jima',
  '活火山・桜島を望む、薩摩の海岸を走る',
  'Run along Kagoshima Bay with the volcanic Sakurajima in view',
  NULL,
  NULL,
  NULL,
  '中央公園（おもてなし広場）',
  'Chuo Park (Omotenashi Hiroba)',
  '鹿児島市山下町4-1',
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-07-27T14:16:44.298Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('kagoshima-marathon-2026', 'full', 42.195, 420, '08:30', 10000, 14000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kagoshima-marathon-2026', '観光地', '桜島', 'Sakurajima', 'コース上から望める活火山。フェリーで15分。溶岩原や展望台からの眺望が圧巻。', 'An active volcano visible from the course. 15 min by ferry. Lava fields and observation decks.', '鹿児島港からフェリー15分', NULL, 31.5856, 130.6569);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kagoshima-marathon-2026', '温泉', '指宿温泉', 'Ibusuki Onsen', '砂むし温泉で有名。鹿児島市から特急で約1時間。レース翌日の遠足に。', 'Famous for sand steam baths. About 1 hour by express from Kagoshima. Day trip the day after.', '鹿児島市から特急約1時間', NULL, 31.25, 130.65);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('kagoshima-marathon-2026', '["tshirt"]', '大会Tシャツ、完走メダル', 'Race T-shirt, Finisher medal', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('kagoshima-marathon-2026', '["medal"]', '大会Tシャツ、完走メダル', 'Race T-shirt, Finisher medal', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('kagoshima-marathon-2026', NULL, '一般エントリー', 'General Entry', '2025-08-08', '2025-11-16', NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('kagoshima-marathon-2026', NULL, NULL, '桜島', 'Sakurajima', NULL, NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('kagoshima-marathon-2026', NULL, NULL, '錦江湾', 'Kinko Bay', NULL, NULL, 1);

-- ==================
-- 鹿児島マラソン (kagoshima-marathon-2027)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'kagoshima-marathon-2027';
DELETE FROM race_categories WHERE race_id = 'kagoshima-marathon-2027';
DELETE FROM aid_stations WHERE race_id = 'kagoshima-marathon-2027';
DELETE FROM checkpoints WHERE race_id = 'kagoshima-marathon-2027';
DELETE FROM access_points WHERE race_id = 'kagoshima-marathon-2027';
DELETE FROM nearby_spots WHERE race_id = 'kagoshima-marathon-2027';
DELETE FROM weather_history WHERE race_id = 'kagoshima-marathon-2027';
DELETE FROM participation_gifts WHERE race_id = 'kagoshima-marathon-2027';
DELETE FROM completion_gifts WHERE race_id = 'kagoshima-marathon-2027';
DELETE FROM race_entry_links WHERE race_id = 'kagoshima-marathon-2027';
DELETE FROM race_entry_periods WHERE race_id = 'kagoshima-marathon-2027';
DELETE FROM reception_sessions WHERE race_id = 'kagoshima-marathon-2027';
DELETE FROM race_travel_times WHERE race_id = 'kagoshima-marathon-2027';
DELETE FROM race_results WHERE race_id = 'kagoshima-marathon-2027';
DELETE FROM race_gallery WHERE race_id = 'kagoshima-marathon-2027';
DELETE FROM race_voices WHERE race_id = 'kagoshima-marathon-2027';
DELETE FROM race_time_buckets WHERE race_id = 'kagoshima-marathon-2027';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'kagoshima-marathon-2027',
  '鹿児島マラソン',
  'Kagoshima Marathon',
  '2027-03-07',
  '46',
  '鹿児島市',
  'Kagoshima City',
  '桜島を望みながら走るフルマラソン。錦江湾沿いの雄大な景色が魅力。2027年大会は西郷隆盛生誕200年・没後150年のカウントダウン記念大会として開催。',
  'A full marathon with views of Sakurajima volcano. Features magnificent scenery along Kinko Bay. The 2027 edition commemorates the 200th anniversary of Saigo Takamori''s birth and 150th anniversary of his death.',
  'https://www.kagoshima-marathon.jp/',
  15000,
  1,
  10000,
  '2026-08-07',
  '2026-10-31',
  0,
  'pre_mail',
  'アスリートビブスは事前郵送。参加賞は記念Tシャツ・記念メダル・クーポン（500円分）から2つ選択。',
  'Athlete bibs sent by mail in advance. Choose 2 of: commemorative T-shirt, medal, or a ¥500 coupon.',
  '["景色が良い","火山"]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  '桜島、錦江湾',
  'Sakurajima, Kinko Bay',
  NULL,
  NULL,
  '桜島',
  '#991b1b',
  'Sakura-jima',
  '活火山・桜島を望む、薩摩の海岸を走る',
  'Run along Kagoshima Bay with the volcanic Sakurajima in view',
  NULL,
  NULL,
  NULL,
  '中央公園（おもてなし広場）',
  'Chuo Park (Omotenashi Hiroba)',
  '鹿児島市山下町4-1',
  NULL,
  NULL,
  '2026-08-25T00:00:00Z',
  '2026-08-25T00:00:00Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('kagoshima-marathon-2027', 'full', 42.195, 420, '08:30', 10000, 15000, NULL, 'マラソン', 'Marathon', '2008年4月1日以前生まれ。8月31日までの早割は1,000円割引', 'Born on or before Apr 1, 2008. Early-bird discount of ¥1,000 available until Aug 31', NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('kagoshima-marathon-2027', 'other', 8.9, 90, '', 3000, 6000, NULL, 'ファンラン', 'Fun Run', '中学生以上', 'Junior high school age and above', NULL, NULL, NULL, '[]', 1);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kagoshima-marathon-2027', '観光地', '桜島', 'Sakurajima', 'コース上から望める活火山。フェリーで15分。溶岩原や展望台からの眺望が圧巻。', 'An active volcano visible from the course. 15 min by ferry. Lava fields and observation decks.', '鹿児島港からフェリー15分', NULL, 31.5856, 130.6569);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kagoshima-marathon-2027', '温泉', '指宿温泉', 'Ibusuki Onsen', '砂むし温泉で有名。鹿児島市から特急で約1時間。レース翌日の遠足に。', 'Famous for sand steam baths. About 1 hour by express from Kagoshima. Day trip the day after.', '鹿児島市から特急約1時間', NULL, 31.25, 130.65);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('kagoshima-marathon-2027', '["tshirt"]', '大会Tシャツ、完走メダル', 'Race T-shirt, Finisher medal', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('kagoshima-marathon-2027', '["medal"]', '大会Tシャツ、完走メダル', 'Race T-shirt, Finisher medal', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('kagoshima-marathon-2027', NULL, '一般エントリー', 'General Entry', '2026-08-07', '2026-10-31', NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('kagoshima-marathon-2027', NULL, NULL, '桜島', 'Sakurajima', NULL, NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('kagoshima-marathon-2027', NULL, NULL, '錦江湾', 'Kinko Bay', NULL, NULL, 1);

-- ==================
-- 下関海響マラソン (kaikyo-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'kaikyo-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'kaikyo-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'kaikyo-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'kaikyo-marathon-2026';
DELETE FROM access_points WHERE race_id = 'kaikyo-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'kaikyo-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'kaikyo-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'kaikyo-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'kaikyo-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'kaikyo-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'kaikyo-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'kaikyo-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'kaikyo-marathon-2026';
DELETE FROM race_results WHERE race_id = 'kaikyo-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'kaikyo-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'kaikyo-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'kaikyo-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'kaikyo-marathon-2026',
  '下関海響マラソン',
  'Kaikyo Marathon Shimonoseki',
  '2026-11-01',
  '35',
  '下関市',
  'Shimonoseki City',
  '関門海峡を望む下関で開催されるフルマラソン。海峡沿いの爽快なコースを走り、関門大橋や巌流島など絶景スポットを楽しめる。フグの街・下関ならではのエイドも人気。',
  'A full marathon in Shimonoseki overlooking the Kanmon Strait. Enjoy scenic views of the Kanmon Bridge and Ganryujima Island. The city''s famous fugu (blowfish) appears as a unique aid station treat.',
  'https://kaikyomarathon.jp/',
  12000,
  1,
  10000,
  '2026-05-15',
  '2026-07-12',
  0,
  'pre_mail',
  'アスリートビブス（ナンバーカード）・計測チップ・参加賞・大会プログラム・参加案内等を10月上旬に郵送',
  'Athlete bibs, timing chip, participation gift, race program, and entry guide will be mailed in early October',
  '["海峡","絶景","ご当地エイド充実","観光"]',
  NULL,
  0,
  0,
  0,
  'road',
  '["JAAF"]',
  '関門海峡、関門大橋、巌流島',
  'Kanmon Strait, Kanmon Bridge, Ganryujima Island',
  NULL,
  NULL,
  '関門海峡',
  '#1e40af',
  'Kanmon-Kaikyo',
  '本州と九州をつなぐ、関門海峡を渡る',
  'Cross the Kanmon Strait connecting Honshu and Kyushu',
  NULL,
  NULL,
  NULL,
  '海峡メッセ下関',
  'Kaikyo Messe Shimonoseki',
  NULL,
  NULL,
  NULL,
  '2026-04-30T00:00:00Z',
  '2026-08-31T13:30:21.913Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('kaikyo-marathon-2026', 'full', 42.195, 360, '', 10000, 12000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kaikyo-marathon-2026', '観光地', '海峡メッセ下関', 'Kaikyo Messe Shimonoseki', 'スタート・フィニッシュ地点。隣接するオーヴィジョン海峡ゆめ広場も見どころ。', 'Start and finish venue, adjacent to the Ovision Kaikyo Yume Plaza.', 'スタート・フィニッシュ地点', NULL, 0, 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kaikyo-marathon-2026', '観光地', '赤間神宮', 'Akama Shrine', '平清盛の孫・安徳帝を祀る神社。コース沿いに位置する。', 'Shrine dedicated to Emperor Antoku, grandson of Taira no Kiyomori, located along the course.', 'コース沿い', NULL, 0, 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kaikyo-marathon-2026', '観光地', '串崎城跡', 'Kushizaki Castle Ruins', '天守台から折り返し地点を望むことができる城跡。', 'Castle ruins where the keep platform overlooks the course turnaround point.', 'コース沿い', NULL, 0, 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kaikyo-marathon-2026', '観光地', 'みもすそ川公園', 'Mimosusogawa Park', '源義経・平知盛像がある公園。コース沿いに位置する。', 'Park featuring statues of Minamoto no Yoshitsune and Taira no Tomomori, located along the course.', 'コース沿い', NULL, 0, 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kaikyo-marathon-2026', '観光地', '唐戸市場', 'Karato Market', '新鮮な海産物が揃う市場。ふぐやかまぼこなど下関名物を堪能できる。', 'A market with fresh seafood. Enjoy Shimonoseki specialties like fugu and kamaboko.', '下関市中心部', NULL, 33.9533, 130.9408);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kaikyo-marathon-2026', 'グルメ', 'カモンワーフ', 'Kamon Wharf', 'グルメやお土産が揃うシーサイドモール。コース沿いに位置する。', 'Seaside mall with local food and souvenirs, located along the course.', 'コース沿い', NULL, 0, 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kaikyo-marathon-2026', '観光地', '海響館', 'Kaikyokan Aquarium', 'フグの展示種類数が世界一を誇る水族館。', 'Aquarium boasting the world''s largest number of pufferfish species on display.', 'コース周辺', NULL, 0, 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kaikyo-marathon-2026', '観光地', '関門海峡（巌流島）', 'Ganryujima Island', '宮本武蔵と佐々木小次郎の決闘の地として有名な島。フェリーで渡れる。', 'Famous as the site of the duel between Miyamoto Musashi and Sasaki Kojiro. Accessible by ferry.', '関門海峡内', NULL, 33.9397, 130.9228);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kaikyo-marathon-2026', 'グルメ', '南風泊市場', 'Haetomari Market', '全国で唯一のふく（ふぐ）専門の卸売市場。', 'Japan''s only wholesale market specializing in fugu (pufferfish).', 'コース周辺', NULL, 0, 0);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('kaikyo-marathon-2026', '["tshirt"]', '完走メダル、大会オリジナルTシャツ', 'Finisher medal, Official race T-shirt', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('kaikyo-marathon-2026', '["medal"]', '完走メダル、大会オリジナルTシャツ', 'Finisher medal, Official race T-shirt', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('kaikyo-marathon-2026', NULL, '一般エントリー', 'General Entry', '2026-05-15', '2026-07-12', 12000, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('kaikyo-marathon-2026', NULL, NULL, '関門海峡', 'Kanmon Strait', NULL, NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('kaikyo-marathon-2026', NULL, NULL, '関門大橋', 'Kanmon Bridge', NULL, NULL, 1);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('kaikyo-marathon-2026', NULL, NULL, '巌流島', 'Ganryujima Island', NULL, NULL, 2);

-- ==================
-- 京都亀岡ハーフマラソン (kameoka-half-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'kameoka-half-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'kameoka-half-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'kameoka-half-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'kameoka-half-marathon-2026';
DELETE FROM access_points WHERE race_id = 'kameoka-half-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'kameoka-half-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'kameoka-half-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'kameoka-half-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'kameoka-half-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'kameoka-half-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'kameoka-half-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'kameoka-half-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'kameoka-half-marathon-2026';
DELETE FROM race_results WHERE race_id = 'kameoka-half-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'kameoka-half-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'kameoka-half-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'kameoka-half-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'kameoka-half-marathon-2026',
  '京都亀岡ハーフマラソン',
  'Kyoto Kameoka Half Marathon',
  '2026-12-13',
  '26',
  '亀岡市',
  'Kameoka City',
  '亀岡運動公園競技場発着で行われるハーフマラソン。好アクセスで自己ベストを狙いやすいコースが特徴。',
  'A half marathon starting and finishing at Kameoka Sports Park Stadium, known for its accessible, PB-friendly course.',
  'https://kameoka-half-marathon.jp/',
  6000,
  1,
  4500,
  '2026-07-01',
  '2026-09-20',
  0,
  'both',
  '参加賞・プログラムは大会前日13:00〜17:00、当日7:00〜14:00に亀岡運動公園体育館前で配布（参加賞引換券が必要）。',
  'Participation gifts and program are handed out at Kameoka Sports Park Gymnasium from 13:00-17:00 the day before the race and 7:00-14:00 on race day (exchange voucher required).',
  '[]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  '自己ベストを狙いやすいコース',
  'PB-friendly course',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '好アクセス×自己ベストを狙いやすいコース',
  'Great access, PB-friendly course',
  NULL,
  NULL,
  NULL,
  '亀岡運動公園競技場',
  'Kameoka Sports Park Stadium',
  NULL,
  NULL,
  NULL,
  '2026-08-25T00:00:00Z',
  '2026-08-31T13:30:35.844Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('kameoka-half-marathon-2026', 'half', 21.0975, 160, '09:45', 3500, 6000, NULL, 'ハーフマラソン', 'Half Marathon', '15歳以上（中学生除く）、制限時間2時間40分', 'Age 15+ (excluding junior high school students), time limit 2h40m', NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('kameoka-half-marathon-2026', '5k', 5, 0, '', 0, 2500, 1500, '5kmロードレース', '5km Road Race', '中学生1,500円', 'Junior high school student: ¥1,500', NULL, NULL, NULL, '[]', 1);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('kameoka-half-marathon-2026', 'other', 3, 0, '', 0, 2500, 1500, '3kmロードレース', '3km Road Race', '中学生・小学生1,500円', 'Junior high & elementary school student: ¥1,500', NULL, NULL, NULL, '[]', 2);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  ('kameoka-half-marathon-2026', 'JR亀岡駅', 'JR Kameoka Station', '', '無料シャトルバスを利用', 'Free shuttle bus available', 0, 0, NULL, 1, 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kameoka-half-marathon-2026', '温泉', '湯の花温泉', 'Yunohana Onsen', '京の奥座敷と呼ばれる名湯。神経痛、冷え症、疲労回復などに効用があるとされ、戦国時代には武将が刀傷を癒したという伝説も残る。', 'A renowned hot spring known as "Kyoto''s inner retreat," said to ease neuralgia, cold sensitivity, and fatigue.', '徒歩圏内', NULL, 0, 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kameoka-half-marathon-2026', '観光地', '嵯峨野トロッコ列車', 'Sagano Romantic Train', '清流と峡谷を望む観光列車。保津川渓谷の四季折々の絶景を楽しめる。', 'A scenic sightseeing train overlooking the Hozugawa River gorge.', '亀岡市内', NULL, 0, 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kameoka-half-marathon-2026', '観光地', '保津川下り', 'Hozugawa River Boat Ride', '江戸時代から続く舟下り。亀岡から京都嵐山まで船頭のガイドで下る約2時間のコース。', 'A boat trip dating back to the Edo period, running from Kameoka to Arashiyama in Kyoto.', '亀岡市内', NULL, 0, 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kameoka-half-marathon-2026', '観光地', '丹波亀山城跡と城下町', 'Tanba Kameyama Castle Ruins', '明智光秀ゆかりの城跡。築100年を超える建物が残る城下町。', 'The ruins of a castle associated with Akechi Mitsuhide, surrounded by a townscape with buildings over 100 years old.', '亀岡市内', NULL, 0, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('kameoka-half-marathon-2026', '["other"]', 'ハーフマラソン完走者に、ランナーズチップと交換で完走記念品を贈呈', 'Half marathon finishers receive a finisher gift in exchange for their runner''s chip', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('kameoka-half-marathon-2026', NULL, '一般エントリー', 'General Entry', '2026-07-01', '2026-09-20', NULL, 0);

-- ==================
-- 金沢マラソン (kanazawa-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'kanazawa-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'kanazawa-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'kanazawa-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'kanazawa-marathon-2026';
DELETE FROM access_points WHERE race_id = 'kanazawa-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'kanazawa-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'kanazawa-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'kanazawa-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'kanazawa-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'kanazawa-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'kanazawa-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'kanazawa-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'kanazawa-marathon-2026';
DELETE FROM race_results WHERE race_id = 'kanazawa-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'kanazawa-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'kanazawa-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'kanazawa-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'kanazawa-marathon-2026',
  '金沢マラソン',
  'Kanazawa Marathon',
  '2026-10-25',
  '17',
  '金沢市',
  'Kanazawa City',
  '加賀百万石の城下町・金沢を走るフルマラソン。兼六園や金沢城など歴史的名所を巡るコース。ご当地グルメのエイドが充実。',
  'A full marathon through Kanazawa, the historic castle town. The course passes Kenroku-en Garden, Kanazawa Castle, and more. Known for excellent local food at aid stations.',
  'https://www.kanazawa-marathon.jp',
  14000,
  1,
  15000,
  '2026-04-10',
  '2026-05-20',
  0,
  'pre_day',
  'ランナー受付：10月23日(金) 13:30～20:30、10月24日(土) 9:30～19:30。大会当日の受付は行いません。代理受付不可。',
  'Runner check-in: Oct 23 (Fri) 13:30–20:30, Oct 24 (Sat) 9:30–19:30. No race-day check-in. No proxy check-in.',
  '["ご当地エイド充実","城下町","景色が良い","観光"]',
  NULL,
  0,
  0,
  0,
  'road',
  '["JAAF","WA","AIMS"]',
  '兼六園、金沢城、ひがし茶屋街付近',
  'Kenroku-en Garden, Kanazawa Castle, Higashi Chaya District area',
  NULL,
  NULL,
  '兼六園',
  '#14532d',
  'Kenroku-en',
  '加賀百万石の城下町・金沢を駆ける',
  'Run through Kanazawa, the castle town of one million koku',
  NULL,
  NULL,
  NULL,
  '石川県西部緑地公園（産業展示館4号館前）',
  'Ishikawa Prefecture Seibu Green Park (in front of Industrial Exhibition Hall Bldg. 4)',
  NULL,
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-07-31T14:32:03.226Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('kanazawa-marathon-2026', 'full', 42.195, 420, '08:30', 15000, 14000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  ('kanazawa-marathon-2026', '金沢駅', 'Kanazawa Station', '', '徒歩約20分（スタート会場）／シャトルバス有料（スタート会場行き）・無料（フィニッシュ会場行き）', 'Approx. 20 min walk to start venue / Paid shuttle bus to start venue / Free shuttle bus to finish venue', 0, 0, 20, 1, 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kanazawa-marathon-2026', '観光地', '兼六園', 'Kenroku-en Garden', '日本三名園の一つ。コース上から望める。秋の紅葉が美しい。', 'One of Japan''s three most beautiful gardens. Visible from the course. Beautiful autumn foliage.', 'コース付近', NULL, 36.5625, 136.6625);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kanazawa-marathon-2026', 'グルメ', '近江町市場', 'Omicho Market', '金沢の台所。新鮮な海鮮が楽しめる。レース後の食べ歩きに最適。', 'Kanazawa''s kitchen. Enjoy fresh seafood. Perfect for post-race food tours.', '金沢市中心部', NULL, 36.5719, 136.6563);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kanazawa-marathon-2026', '温泉', '金沢駅周辺の温泉施設', 'Hot spring facilities near Kanazawa Station', '金沢駅周辺には日帰り温泉施設あり。レース後のリカバリーに。', 'Day-trip hot spring facilities available near Kanazawa Station. For post-race recovery.', '金沢駅周辺', NULL, 36.5781, 136.6486);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('kanazawa-marathon-2026', '["tshirt","local_product"]', '大会オリジナルTシャツ、完走メダル、地元特産品', 'Official race T-shirt, Finisher medal, Local specialty products', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('kanazawa-marathon-2026', '["medal"]', '大会オリジナルTシャツ、完走メダル、地元特産品', 'Official race T-shirt, Finisher medal, Local specialty products', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('kanazawa-marathon-2026', NULL, '一般エントリー', 'General Entry', '2026-04-10', '2026-05-20', 14000, 0);

-- ==================
-- かさま陶芸の里ハーフマラソン (kasama-togeinosato-half-2025-2025)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'kasama-togeinosato-half-2025-2025';
DELETE FROM race_categories WHERE race_id = 'kasama-togeinosato-half-2025-2025';
DELETE FROM aid_stations WHERE race_id = 'kasama-togeinosato-half-2025-2025';
DELETE FROM checkpoints WHERE race_id = 'kasama-togeinosato-half-2025-2025';
DELETE FROM access_points WHERE race_id = 'kasama-togeinosato-half-2025-2025';
DELETE FROM nearby_spots WHERE race_id = 'kasama-togeinosato-half-2025-2025';
DELETE FROM weather_history WHERE race_id = 'kasama-togeinosato-half-2025-2025';
DELETE FROM participation_gifts WHERE race_id = 'kasama-togeinosato-half-2025-2025';
DELETE FROM completion_gifts WHERE race_id = 'kasama-togeinosato-half-2025-2025';
DELETE FROM race_entry_links WHERE race_id = 'kasama-togeinosato-half-2025-2025';
DELETE FROM race_entry_periods WHERE race_id = 'kasama-togeinosato-half-2025-2025';
DELETE FROM reception_sessions WHERE race_id = 'kasama-togeinosato-half-2025-2025';
DELETE FROM race_travel_times WHERE race_id = 'kasama-togeinosato-half-2025-2025';
DELETE FROM race_results WHERE race_id = 'kasama-togeinosato-half-2025-2025';
DELETE FROM race_gallery WHERE race_id = 'kasama-togeinosato-half-2025-2025';
DELETE FROM race_voices WHERE race_id = 'kasama-togeinosato-half-2025-2025';
DELETE FROM race_time_buckets WHERE race_id = 'kasama-togeinosato-half-2025-2025';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'kasama-togeinosato-half-2025-2025',
  'かさま陶芸の里ハーフマラソン',
  'Kasama Pottery Village Half Marathon',
  '2025-12-21',
  '08',
  '笠間市笠間2345番地',
  '2345 Kasama, Kasama City, Ibaraki Prefecture',
  '',
  '',
  'https://www.kasa-mara.jp/',
  5000,
  1,
  2000,
  '2025-08-11',
  '2025-10-24',
  0,
  'pre_mail',
  '',
  '',
  '[]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  '',
  '',
  '',
  '',
  '笠間焼',
  '#7b7878',
  'KASAMA-YAKI',
  'アップダウンが自慢の大会となります。日本全国の「ガチランナー」の皆さん、エントリーお待ちしております',
  'This race is known for its challenging terrain. We look forward to your entries, serious runners from all over Japan!',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '2026-05-09T14:16:13.893Z',
  '2026-05-30T06:37:00.046Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('kasama-togeinosato-half-2025-2025', 'half', 21.0975, 150, '10:00', 2000, 5000, NULL, NULL, NULL, NULL, NULL, '18歳以上（高校生を除く）で健康に異常がなく２時間30分以内で完走できる方。なお、安全管理運営上、車いすやベビーカーを使用しての参加はできません。

視覚障害の方への伴走者は、同種目に選手として参加することはできません。また、伴走者は、伴走と表示したゼッケンを持参してください。

年齢起算は、大会日現在とします。', NULL, 'kasama-togeinosato-half-2025-2025', '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kasama-togeinosato-half-2025-2025', '観光地', '笠間稲荷神社', 'Kasama Inari Shrine', '651年創建と伝わる1360年以上の歴史を持つ日本三大稲荷のひとつです。宇迦之御魂神（うかのみたまのかみ）を祀り、五穀豊穣、商売繁盛、殖産興業の守護神として全国から参拝者が訪れます', 'Founded in 651, it is one of Japan’s Three Great Inari Shrines, boasting a history of over 1,360 years. Dedicated to the deity Ukanomitama-no-kami, it attracts visitors from across the country as a guardian deity of bountiful harvests, prosperous business, and industrial development.', '', 'https://www.ibarakiguide.jp/spot.php?mode=detail&code=738', 0, 0);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('kasama-togeinosato-half-2025-2025', '["local_product","food"]', '毎年好評をいただいている「笠間焼」と古くから名物として親しまれている「いなり寿司」を今年もご用意します', '', NULL, 0);
INSERT OR REPLACE INTO race_entry_links (race_id, site_name, url, sort_order) VALUES
  ('kasama-togeinosato-half-2025-2025', 'RUNNET', 'https://runnet.jp/parts/2025/377734/entry.html', 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('kasama-togeinosato-half-2025-2025', NULL, '一般エントリー', 'General Entry', '2025-08-11', '2025-10-24', NULL, 0);
INSERT OR REPLACE INTO race_time_buckets (race_id, bucket, pct, sort_order) VALUES
  ('kasama-togeinosato-half-2025-2025', '1:00-1:15', 1.6, 0);
INSERT OR REPLACE INTO race_time_buckets (race_id, bucket, pct, sort_order) VALUES
  ('kasama-togeinosato-half-2025-2025', '1:15-1:30', 10.5, 1);
INSERT OR REPLACE INTO race_time_buckets (race_id, bucket, pct, sort_order) VALUES
  ('kasama-togeinosato-half-2025-2025', '1:30-1:45', 22.3, 2);
INSERT OR REPLACE INTO race_time_buckets (race_id, bucket, pct, sort_order) VALUES
  ('kasama-togeinosato-half-2025-2025', '1:45-2:00', 27, 3);
INSERT OR REPLACE INTO race_time_buckets (race_id, bucket, pct, sort_order) VALUES
  ('kasama-togeinosato-half-2025-2025', '2:00-2:15', 22.3, 4);
INSERT OR REPLACE INTO race_time_buckets (race_id, bucket, pct, sort_order) VALUES
  ('kasama-togeinosato-half-2025-2025', '2:15-2:30', 13.9, 5);
INSERT OR REPLACE INTO race_time_buckets (race_id, bucket, pct, sort_order) VALUES
  ('kasama-togeinosato-half-2025-2025', '2:30-2:45', 2.4, 6);

-- ==================
-- かさま陶芸の里ハーフマラソン (kasama-togeinosato-half-2025-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'kasama-togeinosato-half-2025-2026';
DELETE FROM race_categories WHERE race_id = 'kasama-togeinosato-half-2025-2026';
DELETE FROM aid_stations WHERE race_id = 'kasama-togeinosato-half-2025-2026';
DELETE FROM checkpoints WHERE race_id = 'kasama-togeinosato-half-2025-2026';
DELETE FROM access_points WHERE race_id = 'kasama-togeinosato-half-2025-2026';
DELETE FROM nearby_spots WHERE race_id = 'kasama-togeinosato-half-2025-2026';
DELETE FROM weather_history WHERE race_id = 'kasama-togeinosato-half-2025-2026';
DELETE FROM participation_gifts WHERE race_id = 'kasama-togeinosato-half-2025-2026';
DELETE FROM completion_gifts WHERE race_id = 'kasama-togeinosato-half-2025-2026';
DELETE FROM race_entry_links WHERE race_id = 'kasama-togeinosato-half-2025-2026';
DELETE FROM race_entry_periods WHERE race_id = 'kasama-togeinosato-half-2025-2026';
DELETE FROM reception_sessions WHERE race_id = 'kasama-togeinosato-half-2025-2026';
DELETE FROM race_travel_times WHERE race_id = 'kasama-togeinosato-half-2025-2026';
DELETE FROM race_results WHERE race_id = 'kasama-togeinosato-half-2025-2026';
DELETE FROM race_gallery WHERE race_id = 'kasama-togeinosato-half-2025-2026';
DELETE FROM race_voices WHERE race_id = 'kasama-togeinosato-half-2025-2026';
DELETE FROM race_time_buckets WHERE race_id = 'kasama-togeinosato-half-2025-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'kasama-togeinosato-half-2025-2026',
  'かさま陶芸の里ハーフマラソン',
  'Kasama Pottery Village Half Marathon',
  '2026-12-20',
  '08',
  '笠間市',
  'Kasama City',
  '',
  '',
  'https://www.kasa-mara.jp/',
  5000,
  1,
  2000,
  '2026-08-10',
  '2026-10-16',
  0,
  'pre_mail',
  '受付 午前7:30〜9:30。ナンバーカード・計測用チップ・参加賞引換券は事前郵送。当日忘れた場合は再交付受付（手数料2,000円）',
  'Reception 7:30–9:30 AM. Race bib, timing chip, and gift voucher are mailed in advance. Same-day reissue available at HQ (¥2,000 fee).',
  '[]',
  NULL,
  0,
  0,
  0,
  'road',
  '["JAAF"]',
  '',
  '',
  '',
  '',
  '笠間焼',
  '#7b7878',
  'KASAMA-YAKI',
  'アップダウンが自慢の大会となります。日本全国の「ガチランナー」の皆さん、エントリーお待ちしております',
  'This race is known for its challenging terrain. We look forward to your entries, serious runners from all over Japan!',
  NULL,
  NULL,
  NULL,
  '笠間芸術の森公園',
  'Kasama Art Forest Park',
  '茨城県笠間市笠間2345番地',
  NULL,
  NULL,
  '2026-07-27T14:17:55.973Z',
  '2026-07-27T14:17:55.973Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('kasama-togeinosato-half-2025-2026', 'half', 21.0975, 150, '10:00', 2000, 5000, NULL, NULL, NULL, NULL, NULL, '18歳以上（高校生を除く）で健康に異常がなく２時間30分以内で完走できる方。なお、安全管理運営上、車いすやベビーカーを使用しての参加はできません。

視覚障害の方への伴走者は、同種目に選手として参加することはできません。また、伴走者は、伴走と表示したゼッケンを持参してください。

年齢起算は、大会日現在とします。', NULL, 'kasama-togeinosato-half-2025-2025', '[]', 0);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  ('kasama-togeinosato-half-2025-2026', '笠間駅', 'Kasama Station', '', 'タクシーで約10分。無料シャトルバスあり', 'Approx. 10 min by taxi. Free shuttle bus available.', 0, 0, NULL, 1, 0);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  ('kasama-togeinosato-half-2025-2026', '友部駅', 'Tomobe Station', '', 'タクシーで約20分。無料シャトルバスあり', 'Approx. 20 min by taxi. Free shuttle bus available.', 0, 0, NULL, 0, 1);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kasama-togeinosato-half-2025-2026', '観光地', '笠間稲荷神社', 'Kasama Inari Shrine', '651年創建と伝わる1360年以上の歴史を持つ日本三大稲荷のひとつです。宇迦之御魂神（うかのみたまのかみ）を祀り、五穀豊穣、商売繁盛、殖産興業の守護神として全国から参拝者が訪れます', 'Founded in 651, it is one of Japan’s Three Great Inari Shrines, boasting a history of over 1,360 years. Dedicated to the deity Ukanomitama-no-kami, it attracts visitors from across the country as a guardian deity of bountiful harvests, prosperous business, and industrial development.', '', 'https://www.ibarakiguide.jp/spot.php?mode=detail&code=738', 0, 0);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('kasama-togeinosato-half-2025-2026', '["local_product","food"]', '毎年好評をいただいている「笠間焼」と古くから名物として親しまれている「いなり寿司」を今年もご用意します', '', NULL, 0);
INSERT OR REPLACE INTO race_entry_links (race_id, site_name, url, sort_order) VALUES
  ('kasama-togeinosato-half-2025-2026', 'RUNNET', 'https://runnet.jp/parts/2025/377734/entry.html', 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('kasama-togeinosato-half-2025-2026', NULL, '一般エントリー', 'General Entry', '2026-08-10', '2026-10-16', 5000, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('kasama-togeinosato-half-2025-2026', NULL, 'ふるさと納税枠', 'Hometown Tax Donation Entry', '2026-08-10', '2026-10-09', NULL, 1);

-- ==================
-- かすみがうらマラソン (kasumigaura-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'kasumigaura-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'kasumigaura-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'kasumigaura-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'kasumigaura-marathon-2026';
DELETE FROM access_points WHERE race_id = 'kasumigaura-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'kasumigaura-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'kasumigaura-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'kasumigaura-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'kasumigaura-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'kasumigaura-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'kasumigaura-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'kasumigaura-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'kasumigaura-marathon-2026';
DELETE FROM race_results WHERE race_id = 'kasumigaura-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'kasumigaura-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'kasumigaura-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'kasumigaura-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'kasumigaura-marathon-2026',
  'かすみがうらマラソン',
  'Kasumigaura Marathon',
  '2026-04-19',
  '08',
  '土浦市',
  'Tsuchiura City',
  '霞ヶ浦湖畔を走るフルマラソン。平坦なコースで記録を狙いやすい。',
  'A full marathon along the shore of Lake Kasumigaura. A flat course ideal for personal records.',
  'https://www.kasumigaura-marathon.jp',
  12000,
  1,
  20000,
  '2025-12-01',
  '2026-01-25',
  0,
  'pre_mail',
  '',
  '',
  '["フラット","湖畔","記録狙い"]',
  NULL,
  0,
  0,
  0,
  'road',
  '["JAAF","WA"]',
  '霞ヶ浦湖畔',
  'Lake Kasumigaura shore',
  NULL,
  NULL,
  '霞ヶ浦',
  '#7dd3fc',
  'Kasumigaura',
  '日本第2位の湖・霞ヶ浦のほとりを走る',
  'Run along the shores of Lake Kasumigaura, Japan''s 2nd largest lake',
  NULL,
  NULL,
  NULL,
  '川口運動公園J:COMフィールド土浦',
  'Kawaguchi Sports Park J:COM Field Tsuchiura',
  '茨城県土浦市川口2丁目12-75',
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-08-31T13:32:03.663Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('kasumigaura-marathon-2026', 'full', 42.195, 360, '09:45', 14000, 12000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('kasumigaura-marathon-2026', 'other', 16, 0, '09:20', 5000, 9000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 1);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('kasumigaura-marathon-2026', '5k', 5, 0, '10:30', 1000, 6000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 2);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  ('kasumigaura-marathon-2026', '土浦駅', 'Tsuchiura Station', '', '徒歩約5分', 'About 5 min walk', 0, 0, 5, 1, 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kasumigaura-marathon-2026', '観光地', '霞ヶ浦', 'Lake Kasumigaura', '日本第2位の面積を持つ湖。コースで湖畔を走る。広大な水面は壮観。', 'Japan''s second largest lake. Run along the lakeshore. The vast water surface is spectacular.', 'コース上', NULL, 36.0333, 140.3333);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('kasumigaura-marathon-2026', '["tshirt"]', '大会Tシャツ、完走メダル', 'Race T-shirt, Finisher medal', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('kasumigaura-marathon-2026', '["medal"]', '大会Tシャツ、完走メダル', 'Race T-shirt, Finisher medal', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('kasumigaura-marathon-2026', NULL, '一般エントリー', 'General Entry', '2025-12-01', '2026-01-25', NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('kasumigaura-marathon-2026', NULL, NULL, '霞ヶ浦湖畔', 'Lake Kasumigaura shore', NULL, NULL, 0);

-- ==================
-- 勝田全国マラソン (katsuta-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'katsuta-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'katsuta-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'katsuta-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'katsuta-marathon-2026';
DELETE FROM access_points WHERE race_id = 'katsuta-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'katsuta-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'katsuta-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'katsuta-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'katsuta-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'katsuta-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'katsuta-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'katsuta-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'katsuta-marathon-2026';
DELETE FROM race_results WHERE race_id = 'katsuta-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'katsuta-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'katsuta-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'katsuta-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'katsuta-marathon-2026',
  '勝田全国マラソン',
  'Katsuta National Marathon',
  '2026-01-25',
  '08',
  'ひたちなか市',
  'Hitachinaka City',
  '茨城県ひたちなか市で開催される歴史ある市民マラソン。1953年からの長い歴史を持つ伝統大会。',
  'A historic citizens'' marathon held in Hitachinaka City, Ibaraki. A traditional race with a long history since 1953.',
  'https://katsutamarathon.jp',
  8000,
  1,
  12000,
  '2025-09-26',
  '2025-10-31',
  0,
  'none',
  '事前郵送。大会当日の受付なし。',
  'Pre-mailed. No on-site registration on race day.',
  '["コスパが良い","日本陸連公認","歴史ある大会","記録狙い"]',
  NULL,
  0,
  0,
  0,
  'road',
  '["JAAF"]',
  '',
  '',
  NULL,
  NULL,
  '百里',
  '#4b5563',
  'Hyakuri',
  '常陸の大地を駆け抜ける、勝田全国マラソン',
  'Run across the Hitachi plains at Katsuta',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-05-30T06:37:19.558Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('katsuta-marathon-2026', 'full', 42.195, 360, '10:30', 0, 8000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('katsuta-marathon-2026', '10k', 10, 0, '', 0, 5000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 1);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  ('katsuta-marathon-2026', '勝田駅', 'Katsuta Station', 'katsuta', 'JR勝田駅東口から徒歩約10分。無料シャトルバスあり。', 'About 10 min walk from JR Katsuta Station East Exit. Free shuttle bus available.', 36.3933, 140.4756, NULL, 1, 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('katsuta-marathon-2026', '観光地', '国営ひたち海浜公園', 'Hitachi Seaside Park', 'ネモフィラやコキアで有名な広大な公園。ひたちなか市のシンボル。', 'A vast park famous for nemophila and kochia. Symbol of Hitachinaka City.', 'ひたちなか市内', NULL, 36.3958, 140.5917);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('katsuta-marathon-2026', '["tshirt"]', '大会オリジナルTシャツ', 'Official race T-shirt', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('katsuta-marathon-2026', NULL, '一般エントリー', 'General Entry', '2025-09-26', '2025-10-31', NULL, 0);

-- ==================
-- 勝田全国マラソン (katsuta-marathon-2027)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'katsuta-marathon-2027';
DELETE FROM race_categories WHERE race_id = 'katsuta-marathon-2027';
DELETE FROM aid_stations WHERE race_id = 'katsuta-marathon-2027';
DELETE FROM checkpoints WHERE race_id = 'katsuta-marathon-2027';
DELETE FROM access_points WHERE race_id = 'katsuta-marathon-2027';
DELETE FROM nearby_spots WHERE race_id = 'katsuta-marathon-2027';
DELETE FROM weather_history WHERE race_id = 'katsuta-marathon-2027';
DELETE FROM participation_gifts WHERE race_id = 'katsuta-marathon-2027';
DELETE FROM completion_gifts WHERE race_id = 'katsuta-marathon-2027';
DELETE FROM race_entry_links WHERE race_id = 'katsuta-marathon-2027';
DELETE FROM race_entry_periods WHERE race_id = 'katsuta-marathon-2027';
DELETE FROM reception_sessions WHERE race_id = 'katsuta-marathon-2027';
DELETE FROM race_travel_times WHERE race_id = 'katsuta-marathon-2027';
DELETE FROM race_results WHERE race_id = 'katsuta-marathon-2027';
DELETE FROM race_gallery WHERE race_id = 'katsuta-marathon-2027';
DELETE FROM race_voices WHERE race_id = 'katsuta-marathon-2027';
DELETE FROM race_time_buckets WHERE race_id = 'katsuta-marathon-2027';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'katsuta-marathon-2027',
  '勝田全国マラソン',
  'Katsuta National Marathon',
  '2027-01-31',
  '08',
  'ひたちなか市',
  'Hitachinaka City',
  '茨城県ひたちなか市で開催される歴史ある市民マラソン。1953年からの長い歴史を持つ伝統大会。',
  'A historic citizens'' marathon held in Hitachinaka City, Ibaraki. A traditional race with a long history since 1953.',
  'https://katsutamarathon.jp',
  9000,
  1,
  12000,
  '2026-09-11',
  '2026-10-31',
  0,
  'pre_mail',
  '事前郵送。大会当日の受付なし。',
  'Pre-mailed. No on-site registration on race day.',
  '["コスパが良い","日本陸連公認","歴史ある大会","記録狙い"]',
  NULL,
  0,
  0,
  0,
  'road',
  '["JAAF"]',
  '',
  '',
  NULL,
  NULL,
  '百里',
  '#4b5563',
  'Hyakuri',
  '常陸の大地を駆け抜ける、勝田全国マラソン',
  'Run across the Hitachi plains at Katsuta',
  NULL,
  NULL,
  NULL,
  '石川運動ひろば',
  'Ishikawa Undo Hiroba',
  '茨城県ひたちなか市石川町地内',
  NULL,
  NULL,
  '2026-08-31T13:33:14.228Z',
  '2026-08-31T13:33:14.228Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('katsuta-marathon-2027', 'full', 42.195, 360, '10:30', 0, 8000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('katsuta-marathon-2027', '10k', 10, 0, '', 0, 5000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 1);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  ('katsuta-marathon-2027', '勝田駅', 'Katsuta Station', 'katsuta', 'JR勝田駅東口から徒歩約10分。無料シャトルバスあり。', 'About 10 min walk from JR Katsuta Station East Exit. Free shuttle bus available.', 36.3933, 140.4756, 10, 1, 0);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  ('katsuta-marathon-2027', '工機前駅', 'Kokimae Station', '', 'ひたちなか海浜鉄道工機前駅より石川運動ひろばまで徒歩6分。', 'About 6 min walk from Kokimae Station (Hitachinaka Seaside Railway) to Ishikawa Undo Hiroba.', 0, 0, 6, 0, 1);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('katsuta-marathon-2027', '観光地', '国営ひたち海浜公園', 'Hitachi Seaside Park', 'ネモフィラやコキアで有名な広大な公園。ひたちなか市のシンボル。', 'A vast park famous for nemophila and kochia. Symbol of Hitachinaka City.', 'ひたちなか市内', NULL, 36.3958, 140.5917);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('katsuta-marathon-2027', '["tshirt"]', '大会オリジナルTシャツ', 'Official race T-shirt', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('katsuta-marathon-2027', NULL, '先行申込み（ひたちなか市・東海村民対象）', 'Early Entry (Hitachinaka/Tokai Residents Only)', '2026-09-11', '2026-09-23', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('katsuta-marathon-2027', NULL, '一般エントリー', 'General Entry', '2026-09-25', '2026-10-31', NULL, 1);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('katsuta-marathon-2027', NULL, 'ふるさと納税エントリー', 'Furusato Nozei (Hometown Tax) Entry', '2026-09-11', '2026-10-14', NULL, 2);

-- ==================
-- 川口マラソン (kawaguchi-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'kawaguchi-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'kawaguchi-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'kawaguchi-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'kawaguchi-marathon-2026';
DELETE FROM access_points WHERE race_id = 'kawaguchi-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'kawaguchi-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'kawaguchi-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'kawaguchi-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'kawaguchi-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'kawaguchi-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'kawaguchi-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'kawaguchi-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'kawaguchi-marathon-2026';
DELETE FROM race_results WHERE race_id = 'kawaguchi-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'kawaguchi-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'kawaguchi-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'kawaguchi-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'kawaguchi-marathon-2026',
  '川口マラソン',
  'Kawaguchi Marathon',
  '2026-12-06',
  '11',
  '川口市',
  'Kawaguchi City',
  '埼玉県川口市の青木町公園総合運動場を発着点に市内を走るマラソン大会。ハーフマラソン・10km・3km等の部門がある。',
  'Held in Kawaguchi, Saitama, starting and finishing at Aoki-cho Park Sports Ground. Features half marathon, 10km, and 3km divisions among others.',
  'https://kawaspo.jp/',
  5500,
  1,
  4000,
  '2026-08-18',
  '2026-09-18',
  0,
  'pre_mail',
  'ゼッケン・計測チップ等は11月下旬頃、登録住所へ郵送予定。大会当日は必ずゼッケン・計測チップを持参すること。',
  'Bib numbers and timing chips are mailed to the registered address around late November. Participants must bring their bib and timing chip on race day.',
  '[]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  '青木町公園総合運動場の陸上競技場を発着点に川口市内を巡るコース。',
  'A course through Kawaguchi city starting and finishing at the Aoki-cho Park Sports Ground athletics stadium.',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '埼玉・川口、青木町公園を発着する師走のシティマラソン',
  'A December city marathon starting and finishing at Aoki-cho Park in Kawaguchi, Saitama',
  NULL,
  NULL,
  NULL,
  '青木町公園総合運動場',
  'Aoki-cho Park Sports Ground',
  '埼玉県川口市西青木4-8-1',
  NULL,
  NULL,
  '2026-08-31T00:00:00Z',
  '2026-08-31T00:00:00Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('kawaguchi-marathon-2026', 'half', 21.0975, 0, '08:30', 2000, 5500, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('kawaguchi-marathon-2026', '10k', 10, 0, '08:45', 2000, 5000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 1);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('kawaguchi-marathon-2026', 'other', 3, 0, '08:50', 0, 4000, NULL, '3kmコース', '3km Course', '定員なし', 'No capacity limit', NULL, NULL, NULL, '[]', 2);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('kawaguchi-marathon-2026', '["tshirt"]', 'オリジナルTシャツ（全参加者）', 'Original T-shirt (all participants)', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('kawaguchi-marathon-2026', '["other"]', 'ドリンク（完走者）', 'Drink (finishers)', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('kawaguchi-marathon-2026', '["certificate"]', 'WEB完走証', 'Web finisher certificate', NULL, 1);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('kawaguchi-marathon-2026', NULL, '市民優先申込', 'Kawaguchi Resident Priority Entry', '2026-08-18', '2026-08-25', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('kawaguchi-marathon-2026', NULL, '一般申込', 'General Entry', '2026-09-01', '2026-09-18', NULL, 1);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('kawaguchi-marathon-2026', NULL, NULL, '青木町公園総合運動場', 'Aoki-cho Park Sports Ground', NULL, NULL, 0);

-- ==================
-- かわさき多摩川マラソン (kawasaki-tamagawa-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'kawasaki-tamagawa-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'kawasaki-tamagawa-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'kawasaki-tamagawa-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'kawasaki-tamagawa-marathon-2026';
DELETE FROM access_points WHERE race_id = 'kawasaki-tamagawa-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'kawasaki-tamagawa-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'kawasaki-tamagawa-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'kawasaki-tamagawa-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'kawasaki-tamagawa-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'kawasaki-tamagawa-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'kawasaki-tamagawa-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'kawasaki-tamagawa-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'kawasaki-tamagawa-marathon-2026';
DELETE FROM race_results WHERE race_id = 'kawasaki-tamagawa-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'kawasaki-tamagawa-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'kawasaki-tamagawa-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'kawasaki-tamagawa-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'kawasaki-tamagawa-marathon-2026',
  'かわさき多摩川マラソン',
  'Kawasaki Tamagawa Marathon',
  '2026-11-15',
  '14',
  '川崎市',
  'Kawasaki City',
  'Uvanceとどろきスタジアム by Fujitsu（等々力陸上競技場）発着で多摩川沿いを走る大会。車いすランやペアランニングなど誰もが楽しめるインクルーシブな種目が特徴。',
  'A race starting and finishing at Todoroki Athletics Stadium, running along the Tama River. Features inclusive categories including wheelchair racing and pair running.',
  'https://tamagawa-run.jp/marathon/',
  5750,
  1,
  3500,
  '2026-07-15',
  '2026-08-31',
  0,
  'race_day',
  '',
  '',
  '[]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  '多摩川沿い',
  'Along the Tama River',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '多摩川沿いを走る、誰もが楽しめるインクルーシブな大会',
  'An inclusive race along the Tama River for everyone',
  NULL,
  NULL,
  NULL,
  'Uvanceとどろきスタジアム by Fujitsu（等々力陸上競技場）',
  'Todoroki Athletics Stadium',
  NULL,
  NULL,
  NULL,
  '2026-08-25T00:00:00Z',
  '2026-08-25T00:00:00Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('kawasaki-tamagawa-marathon-2026', 'half', 21.097, 168, '', 3500, 5750, NULL, 'ハーフマラソン', 'Half Marathon', NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('kawasaki-tamagawa-marathon-2026', '10k', 10, 80, '', 2500, 5250, 3250, '10km', '10km', '高校生3,250円', 'High school student: ¥3,250', NULL, NULL, NULL, '[]', 1);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('kawasaki-tamagawa-marathon-2026', 'other', 3, 0, '', 500, 3750, 3250, '3km', '3km', '高校生3,250円、小中学生2,750円', 'High school ¥3,250 / elementary & junior high ¥2,750', NULL, NULL, NULL, '[]', 2);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('kawasaki-tamagawa-marathon-2026', '["tshirt"]', '大会記念Tシャツ', 'Commemorative race T-shirt', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('kawasaki-tamagawa-marathon-2026', NULL, '一般エントリー', 'General Entry', '2026-07-15', '2026-08-31', NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('kawasaki-tamagawa-marathon-2026', NULL, NULL, '多摩川', 'Tama River', NULL, NULL, 0);

-- ==================
-- 北九州マラソン (kitakyushu-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'kitakyushu-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'kitakyushu-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'kitakyushu-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'kitakyushu-marathon-2026';
DELETE FROM access_points WHERE race_id = 'kitakyushu-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'kitakyushu-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'kitakyushu-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'kitakyushu-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'kitakyushu-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'kitakyushu-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'kitakyushu-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'kitakyushu-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'kitakyushu-marathon-2026';
DELETE FROM race_results WHERE race_id = 'kitakyushu-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'kitakyushu-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'kitakyushu-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'kitakyushu-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'kitakyushu-marathon-2026',
  '北九州マラソン',
  'Kitakyushu Marathon',
  '2026-02-15',
  '40',
  '北九州市',
  'Kitakyushu City',
  '福岡県北九州市で開催されるフルマラソン。小倉の市街地と関門海峡を望むコース。',
  'A full marathon in Kitakyushu, Fukuoka. Course features Kokura city center and views of the Kanmon Strait.',
  'https://kitakyushu-marathon.jp',
  14500,
  1,
  10800,
  '2025-08-08',
  '2025-09-25',
  0,
  'pre_day',
  '',
  '',
  '["景色が良い"]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  '小倉市街地、関門海峡',
  'Kokura city center, Kanmon Strait',
  NULL,
  NULL,
  '洞海湾',
  '#1d4ed8',
  'Dokai-wan',
  '北九州の海と工場夜景の街を走る',
  'Run through Kitakyushu''s industrial waterfront',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-05-30T06:37:31.465Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('kitakyushu-marathon-2026', 'full', 42.195, 360, '09:00', 10800, 14500, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('kitakyushu-marathon-2026', 'half', 20.7, 180, '09:00', 250, 13500, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 1);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kitakyushu-marathon-2026', '観光地', '門司港レトロ', 'Mojiko Retro', '大正ロマンの雰囲気が残る港町。焼きカレーが名物。', 'A port town with Taisho-era atmosphere. Famous for baked curry.', '小倉から電車約15分', NULL, 33.95, 130.9611);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('kitakyushu-marathon-2026', '["tshirt","towel"]', '大会Tシャツ、完走メダル、フィニッシャータオル', 'Race T-shirt, Finisher medal, Finisher towel', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('kitakyushu-marathon-2026', '["medal"]', '大会Tシャツ、完走メダル、フィニッシャータオル', 'Race T-shirt, Finisher medal, Finisher towel', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('kitakyushu-marathon-2026', NULL, '一般エントリー', 'General Entry', '2025-08-08', '2025-09-25', NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('kitakyushu-marathon-2026', NULL, NULL, '小倉市街地', 'Kokura city center', NULL, NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('kitakyushu-marathon-2026', NULL, NULL, '関門海峡', 'Kanmon Strait', NULL, NULL, 1);

-- ==================
-- KIX泉州国際マラソン (kix-senshu-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'kix-senshu-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'kix-senshu-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'kix-senshu-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'kix-senshu-marathon-2026';
DELETE FROM access_points WHERE race_id = 'kix-senshu-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'kix-senshu-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'kix-senshu-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'kix-senshu-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'kix-senshu-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'kix-senshu-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'kix-senshu-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'kix-senshu-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'kix-senshu-marathon-2026';
DELETE FROM race_results WHERE race_id = 'kix-senshu-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'kix-senshu-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'kix-senshu-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'kix-senshu-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'kix-senshu-marathon-2026',
  'KIX泉州国際マラソン',
  'KIX Senshu International Marathon',
  '2026-02-08',
  '27',
  '堺市〜泉佐野市',
  'Sakai to Izumisano',
  '大阪南部の泉州地域を走るフルマラソン。関西国際空港連絡橋付近をコースに含む。',
  'A full marathon through the Senshu area of southern Osaka, with parts of the course near the Kansai International Airport bridge.',
  'http://www.senshu-marathon.jp',
  5000,
  1,
  700,
  '2025-10-10',
  '2025-11-30',
  0,
  'pre_day',
  '',
  '',
  '["フラット","記録狙い"]',
  NULL,
  0,
  0,
  0,
  'road',
  '["JAAF"]',
  '泉州の海岸沿い',
  'Senshu coastline',
  NULL,
  NULL,
  '大阪湾',
  '#0ea5e9',
  'Osaka-wan',
  '関西国際空港を望む、泉州の海岸を駆ける',
  'Run the Senshu coast with Kansai International Airport in view',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-05-30T06:37:37.791Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('kix-senshu-marathon-2026', 'full', 42.195, 420, '10:30', 700, 5000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('kix-senshu-marathon-2026', 'half', 21.0975, 180, '', 300, 4000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 1);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kix-senshu-marathon-2026', '観光地', '岸和田城', 'Kishiwada Castle', 'だんじり祭りで有名な岸和田の城。コース付近。', 'The castle in Kishiwada, famous for the Danjiri Festival. Near the course.', 'コース付近', NULL, 34.4608, 135.3706);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('kix-senshu-marathon-2026', NULL, '一般エントリー', 'General Entry', '2025-10-10', '2025-11-30', NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('kix-senshu-marathon-2026', NULL, NULL, '泉州の海岸沿い', 'Senshu coastline', NULL, NULL, 0);

-- ==================
-- 神戸マラソン (kobe-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'kobe-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'kobe-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'kobe-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'kobe-marathon-2026';
DELETE FROM access_points WHERE race_id = 'kobe-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'kobe-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'kobe-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'kobe-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'kobe-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'kobe-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'kobe-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'kobe-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'kobe-marathon-2026';
DELETE FROM race_results WHERE race_id = 'kobe-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'kobe-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'kobe-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'kobe-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'kobe-marathon-2026',
  '神戸マラソン',
  'Kobe Marathon',
  '2026-11-15',
  '28',
  '神戸市',
  'Kobe City',
  '神戸の港町を走る大規模フルマラソン。明石海峡大橋の折り返しが見どころ。「感謝と友情」がテーマ。',
  'A large-scale marathon through the port city of Kobe. The turnaround point near Akashi Kaikyo Bridge is a highlight. Theme: Gratitude and Friendship.',
  'https://www.kobe-marathon.net',
  18000,
  1,
  20000,
  '2026-04-17',
  '2026-06-01',
  0,
  'pre_day',
  '日時
2026年11月13日（金曜）　13：00～20：00（最終入場）
2026年11月14日（土曜）　10：00～19：00（最終入場）　
場所
神戸国際展示場１号館１階（ＥＸＰＯ会場）
上記時間帯のみとし、大会当日（11月15日）の受付は行わない。ただし、神戸マラソン応援ランナー枠は当日受付可。
伴走者も上記日時に受付を行う。
本人確認を行うので必ず本人確認書類（原本）を持参すること（代理人不可）。
障がい者は、身体障害者手帳等（原本）を持参すること
リレーランの受付は必ず出走者２人が揃って行うこと。どちらか１人での受付、個別の受付、代理受付はできない。',
  'Date and Time
November 13, 2026 (Friday) 13:00-20:00 (Last entry)
November 14, 2026 (Saturday) 10:00-19:00 (Last entry)
Location
Kobe International Exhibition Hall 1st Floor (EXPO venue)
Registration will only be accepted during the above times; registration will not be available on the day of the race (November 15). However, registration for the Kobe Marathon support runner category will be available on the day.
Accompanying runners must also register at the above times.
Identity verification will be required, so please be sure to bring your identification document (original) (no proxy registration).
Persons with disabilities must bring their disability certificate (original).
For relay runs, both runners must register together. Registration by one person, individual registration, or proxy registration is not permitted.',
  '["大規模","日本陸連公認","景色が良い","海沿い"]',
  NULL,
  0,
  0,
  10,
  'road',
  '["JAAF","WA","AIMS"]',
  '明石海峡大橋、明石市大蔵海岸、メリケンパーク、ハーバーランド',
  'Akashi Kaikyo Bridge, Akashi Ohama Beach, Meriken Park, Harborland',
  NULL,
  NULL,
  '異人館',
  '#b91c1c',
  'Ijin-kan',
  '港町・神戸の異国情緒あふれる街を走る',
  'Run through the exotic port city of Kobe',
  NULL,
  NULL,
  NULL,
  '神戸市役所前',
  'Kobe City Hall',
  '兵庫県神戸市中央区加納町6-5-1',
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-08-24T16:31:09.438Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('kobe-marathon-2026', 'full', 42.195, 420, '09:00', 20000, 18000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kobe-marathon-2026', '観光地', '明石海峡大橋', 'Akashi Kaikyo Bridge', 'コースの折り返し地点付近。世界最長の吊り橋を間近に見ながら走れる。', 'Near the turnaround point. Run with views of the world''s longest suspension bridge.', 'コース上', NULL, 34.6167, 135.0222);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kobe-marathon-2026', '温泉', '有馬温泉', 'Arima Onsen', '日本三大古湯の一つ。神戸市街からバスで約30分。金泉・銀泉が楽しめる。レース翌日に最適。', 'One of Japan''s three oldest hot springs. About 30 min by bus from Kobe city. Enjoy gold and silver springs. Perfect for the day after the race.', '神戸市街からバス約30分', NULL, 34.7978, 135.2475);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kobe-marathon-2026', 'グルメ', '神戸牛', 'Kobe Beef', '世界的に有名なブランド和牛。レース後のご褒美に。三宮・元町エリアに名店多数。', 'World-famous premium wagyu beef. A reward after the race. Many restaurants in Sannomiya-Motomachi area.', '三宮・元町エリア', NULL, 34.6913, 135.1956);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('kobe-marathon-2026', '["tshirt","towel"]', '大会オリジナルTシャツ、完走メダル、フィニッシャータオル', 'Official race T-shirt, Finisher medal, Finisher towel', NULL, 0);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('kobe-marathon-2026', '["medal"]', '大会オリジナルTシャツ、完走メダル、フィニッシャータオル', 'Official race T-shirt, Finisher medal, Finisher towel', NULL, 1);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('kobe-marathon-2026', '["medal"]', '大会オリジナルTシャツ、完走メダル、フィニッシャータオル', 'Official race T-shirt, Finisher medal, Finisher towel', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('kobe-marathon-2026', NULL, '一般エントリー', 'General Entry', '2026-04-17', '2026-06-01', 18000, 0);

-- ==================
-- 高知龍馬マラソン (kochi-ryoma-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'kochi-ryoma-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'kochi-ryoma-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'kochi-ryoma-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'kochi-ryoma-marathon-2026';
DELETE FROM access_points WHERE race_id = 'kochi-ryoma-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'kochi-ryoma-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'kochi-ryoma-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'kochi-ryoma-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'kochi-ryoma-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'kochi-ryoma-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'kochi-ryoma-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'kochi-ryoma-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'kochi-ryoma-marathon-2026';
DELETE FROM race_results WHERE race_id = 'kochi-ryoma-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'kochi-ryoma-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'kochi-ryoma-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'kochi-ryoma-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'kochi-ryoma-marathon-2026',
  '高知龍馬マラソン',
  'Kochi Ryoma Marathon',
  '2026-02-15',
  '39',
  '高知市',
  'Kochi City',
  '坂本龍馬ゆかりの高知で開催されるフルマラソン。太平洋を望む雄大なコースが魅力。制限時間7時間で初心者にも優しい。',
  'A full marathon in Kochi, the home of Sakamoto Ryoma. Features a magnificent course overlooking the Pacific Ocean. 7-hour time limit is beginner-friendly.',
  'https://ryoma-marathon.jp',
  13000,
  1,
  10000,
  '2025-08-01',
  '2025-10-31',
  0,
  'pre_day',
  '',
  '',
  '["初心者おすすめ","景色が良い","海沿い"]',
  NULL,
  0,
  0,
  0,
  'road',
  '["JAAF"]',
  '太平洋、浦戸大橋、桂浜方面',
  'Pacific Ocean, Urado Bridge, Katsurahama area',
  NULL,
  NULL,
  '坂本龍馬',
  '#1a3a1a',
  'Ryoma',
  '龍馬の志を胸に、土佐の大地を駆け抜ける',
  'Run the Tosa plains with the spirit of Ryoma',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-05-30T06:37:49.063Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('kochi-ryoma-marathon-2026', 'full', 42.195, 420, '09:00', 10000, 13000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kochi-ryoma-marathon-2026', '観光地', '桂浜', 'Katsurahama Beach', '坂本龍馬像がある高知を代表する景勝地。太平洋の荒波が美しい。', 'A scenic spot representing Kochi with a statue of Sakamoto Ryoma. Beautiful Pacific waves.', '高知市から車約30分', NULL, 33.4997, 133.575);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kochi-ryoma-marathon-2026', 'グルメ', 'カツオのたたき', 'Katsuo no Tataki', '高知を代表するグルメ。藁焼きで仕上げた鰹のたたきは絶品。ひろめ市場で気軽に楽しめる。', 'Kochi''s signature dish. Straw-grilled bonito tataki is exquisite. Enjoy casually at Hirome Market.', '高知市内', NULL, 33.5589, 133.5311);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('kochi-ryoma-marathon-2026', '["tshirt"]', '大会Tシャツ、完走メダル', 'Race T-shirt, Finisher medal', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('kochi-ryoma-marathon-2026', '["medal"]', '大会Tシャツ、完走メダル', 'Race T-shirt, Finisher medal', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('kochi-ryoma-marathon-2026', NULL, '一般エントリー', 'General Entry', '2025-08-01', '2025-10-31', NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('kochi-ryoma-marathon-2026', NULL, NULL, '太平洋', 'Pacific Ocean', NULL, NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('kochi-ryoma-marathon-2026', NULL, NULL, '浦戸大橋', 'Urado Bridge', NULL, NULL, 1);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('kochi-ryoma-marathon-2026', NULL, NULL, '桂浜方面', 'Katsurahama area', NULL, NULL, 2);

-- ==================
-- 高知龍馬マラソン (kochi-ryoma-marathon-2027)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'kochi-ryoma-marathon-2027';
DELETE FROM race_categories WHERE race_id = 'kochi-ryoma-marathon-2027';
DELETE FROM aid_stations WHERE race_id = 'kochi-ryoma-marathon-2027';
DELETE FROM checkpoints WHERE race_id = 'kochi-ryoma-marathon-2027';
DELETE FROM access_points WHERE race_id = 'kochi-ryoma-marathon-2027';
DELETE FROM nearby_spots WHERE race_id = 'kochi-ryoma-marathon-2027';
DELETE FROM weather_history WHERE race_id = 'kochi-ryoma-marathon-2027';
DELETE FROM participation_gifts WHERE race_id = 'kochi-ryoma-marathon-2027';
DELETE FROM completion_gifts WHERE race_id = 'kochi-ryoma-marathon-2027';
DELETE FROM race_entry_links WHERE race_id = 'kochi-ryoma-marathon-2027';
DELETE FROM race_entry_periods WHERE race_id = 'kochi-ryoma-marathon-2027';
DELETE FROM reception_sessions WHERE race_id = 'kochi-ryoma-marathon-2027';
DELETE FROM race_travel_times WHERE race_id = 'kochi-ryoma-marathon-2027';
DELETE FROM race_results WHERE race_id = 'kochi-ryoma-marathon-2027';
DELETE FROM race_gallery WHERE race_id = 'kochi-ryoma-marathon-2027';
DELETE FROM race_voices WHERE race_id = 'kochi-ryoma-marathon-2027';
DELETE FROM race_time_buckets WHERE race_id = 'kochi-ryoma-marathon-2027';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'kochi-ryoma-marathon-2027',
  '高知龍馬マラソン',
  'Kochi Ryoma Marathon',
  '2027-02-21',
  '39',
  '高知市',
  'Kochi City',
  '坂本龍馬ゆかりの高知で開催されるフルマラソン。太平洋を望む雄大なコースが魅力。制限時間7時間で初心者にも優しい。',
  'A full marathon in Kochi, the home of Sakamoto Ryoma. Features a magnificent course overlooking the Pacific Ocean. 7-hour time limit is beginner-friendly.',
  'https://ryoma-marathon.jp',
  13000,
  1,
  10000,
  '2026-08-01',
  '2026-10-31',
  0,
  'pre_day',
  '',
  '',
  '["初心者おすすめ","景色が良い","海沿い"]',
  NULL,
  0,
  0,
  0,
  'road',
  '["JAAF","WA"]',
  '太平洋、浦戸大橋、桂浜方面',
  'Pacific Ocean, Urado Bridge, Katsurahama area',
  NULL,
  NULL,
  '坂本龍馬',
  '#1a3a1a',
  'Ryoma',
  '龍馬の志を胸に、土佐の大地を駆け抜ける',
  'Run the Tosa plains with the spirit of Ryoma',
  NULL,
  NULL,
  NULL,
  '高知県庁前（スタート）／高知県立春野総合運動公園（フィニッシュ）',
  'Kochi Prefectural Office (Start) / Haruno Sogo Undo Koen (Finish)',
  '高知県高知市丸ノ内1-2-20',
  NULL,
  NULL,
  '2026-06-29T14:13:35.752Z',
  '2026-07-31T14:32:35.280Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('kochi-ryoma-marathon-2027', 'full', 42.195, 420, '09:00', 10000, 13000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  ('kochi-ryoma-marathon-2027', '高知駅', 'Kochi Station', '', '徒歩約15分（高知県庁スタート地点）', '15 min walk to start (Kochi Prefectural Office)', 0, 0, 15, 1, 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kochi-ryoma-marathon-2027', '観光地', '桂浜', 'Katsurahama Beach', '坂本龍馬像がある高知を代表する景勝地。太平洋の荒波が美しい。', 'A scenic spot representing Kochi with a statue of Sakamoto Ryoma. Beautiful Pacific waves.', '高知市から車約30分', NULL, 33.4997, 133.575);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kochi-ryoma-marathon-2027', 'グルメ', 'カツオのたたき', 'Katsuo no Tataki', '高知を代表するグルメ。藁焼きで仕上げた鰹のたたきは絶品。ひろめ市場で気軽に楽しめる。', 'Kochi''s signature dish. Straw-grilled bonito tataki is exquisite. Enjoy casually at Hirome Market.', '高知市内', NULL, 33.5589, 133.5311);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('kochi-ryoma-marathon-2027', '["tshirt"]', '大会Tシャツ、完走メダル', 'Race T-shirt, Finisher medal', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('kochi-ryoma-marathon-2027', '["medal"]', '完走メダル', 'Finisher medal', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('kochi-ryoma-marathon-2027', NULL, '一般エントリー', 'General Entry', '2026-08-01', '2026-10-31', 13000, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('kochi-ryoma-marathon-2027', NULL, '新宿シティ連携協定枠', 'Shinjuku City Partnership Entry', '2026-08-22', '2026-10-20', 26000, 1);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('kochi-ryoma-marathon-2027', NULL, NULL, '太平洋', 'Pacific Ocean', NULL, NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('kochi-ryoma-marathon-2027', NULL, NULL, '浦戸大橋', 'Urado Bridge', NULL, NULL, 1);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('kochi-ryoma-marathon-2027', NULL, NULL, '桂浜方面', 'Katsurahama area', NULL, NULL, 2);

-- ==================
-- 熊本城マラソン (kumamoto-castle-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'kumamoto-castle-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'kumamoto-castle-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'kumamoto-castle-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'kumamoto-castle-marathon-2026';
DELETE FROM access_points WHERE race_id = 'kumamoto-castle-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'kumamoto-castle-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'kumamoto-castle-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'kumamoto-castle-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'kumamoto-castle-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'kumamoto-castle-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'kumamoto-castle-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'kumamoto-castle-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'kumamoto-castle-marathon-2026';
DELETE FROM race_results WHERE race_id = 'kumamoto-castle-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'kumamoto-castle-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'kumamoto-castle-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'kumamoto-castle-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'kumamoto-castle-marathon-2026',
  '熊本城マラソン',
  'Kumamoto Castle Marathon',
  '2026-02-15',
  '43',
  '熊本市',
  'Kumamoto City',
  '熊本城を発着点とするフルマラソン。復興のシンボル・熊本城を目指してゴールする感動のフィニッシュ。',
  'A full marathon starting and finishing at Kumamoto Castle, the symbol of the city''s recovery.',
  'https://kumamotojyo-marathon.jp',
  13750,
  1,
  13000,
  '2025-07-29',
  '2025-09-24',
  0,
  'pre_day',
  '',
  '',
  '["城下町","景色が良い"]',
  NULL,
  0,
  0,
  0,
  'road',
  '["JAAF"]',
  '熊本城',
  'Kumamoto Castle',
  NULL,
  NULL,
  '熊本城',
  '#1c1917',
  'Kumamoto-jo',
  '不落の名城・熊本城をめぐる感動の42km',
  '42km around the legendary Kumamoto Castle',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-05-30T06:37:58.617Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('kumamoto-castle-marathon-2026', 'full', 42.195, 420, '09:00', 13000, 13750, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kumamoto-castle-marathon-2026', '観光地', '熊本城', 'Kumamoto Castle', '日本三名城の一つ。震災復興のシンボル。ゴール地点から近い。', 'One of Japan''s three famous castles. Symbol of earthquake recovery. Close to the finish.', 'ゴール付近', NULL, 32.806, 130.7058);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kumamoto-castle-marathon-2026', 'グルメ', '馬刺し・太平燕', 'Horse Sashimi & Taipien', '熊本を代表するグルメ。馬刺しと太平燕（春雨スープ）はぜひ試したい。', 'Kumamoto''s signature dishes. Horse sashimi and taipien (glass noodle soup) are must-tries.', '熊本市内', NULL, 32.8032, 130.7079);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('kumamoto-castle-marathon-2026', '["tshirt"]', '大会Tシャツ、完走メダル', 'Race T-shirt, Finisher medal', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('kumamoto-castle-marathon-2026', '["medal"]', '大会Tシャツ、完走メダル', 'Race T-shirt, Finisher medal', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('kumamoto-castle-marathon-2026', NULL, '一般エントリー', 'General Entry', '2025-07-29', '2025-09-24', NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('kumamoto-castle-marathon-2026', NULL, NULL, '熊本城', 'Kumamoto Castle', NULL, NULL, 0);

-- ==================
-- 熊本城マラソン (kumamoto-castle-marathon-2027)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'kumamoto-castle-marathon-2027';
DELETE FROM race_categories WHERE race_id = 'kumamoto-castle-marathon-2027';
DELETE FROM aid_stations WHERE race_id = 'kumamoto-castle-marathon-2027';
DELETE FROM checkpoints WHERE race_id = 'kumamoto-castle-marathon-2027';
DELETE FROM access_points WHERE race_id = 'kumamoto-castle-marathon-2027';
DELETE FROM nearby_spots WHERE race_id = 'kumamoto-castle-marathon-2027';
DELETE FROM weather_history WHERE race_id = 'kumamoto-castle-marathon-2027';
DELETE FROM participation_gifts WHERE race_id = 'kumamoto-castle-marathon-2027';
DELETE FROM completion_gifts WHERE race_id = 'kumamoto-castle-marathon-2027';
DELETE FROM race_entry_links WHERE race_id = 'kumamoto-castle-marathon-2027';
DELETE FROM race_entry_periods WHERE race_id = 'kumamoto-castle-marathon-2027';
DELETE FROM reception_sessions WHERE race_id = 'kumamoto-castle-marathon-2027';
DELETE FROM race_travel_times WHERE race_id = 'kumamoto-castle-marathon-2027';
DELETE FROM race_results WHERE race_id = 'kumamoto-castle-marathon-2027';
DELETE FROM race_gallery WHERE race_id = 'kumamoto-castle-marathon-2027';
DELETE FROM race_voices WHERE race_id = 'kumamoto-castle-marathon-2027';
DELETE FROM race_time_buckets WHERE race_id = 'kumamoto-castle-marathon-2027';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'kumamoto-castle-marathon-2027',
  '熊本城マラソン',
  'Kumamoto Castle Marathon',
  '2027-02-21',
  '43',
  '熊本市',
  'Kumamoto City',
  '熊本城を発着点とするフルマラソン。復興のシンボル・熊本城を目指してゴールする感動のフィニッシュ。',
  'A full marathon starting and finishing at Kumamoto Castle, the symbol of the city''s recovery.',
  'https://kumamotojyo-marathon.jp',
  13750,
  1,
  13000,
  '2026-07-28',
  '2026-09-24',
  0,
  'pre_day',
  '2027年2月19日（金）12:00〜20:00、2月20日（土）10:00〜20:00。当日受付なし。顔認証システム導入。本人のみ受付可（代理不可）。',
  'February 19, 2027 (Fri) 12:00–20:00, February 20, 2027 (Sat) 10:00–20:00. No race-day reception. Face recognition system in use. Participant must present in person (no proxy).',
  '["城下町","景色が良い"]',
  NULL,
  0,
  0,
  0,
  'road',
  '["JAAF"]',
  '熊本城',
  'Kumamoto Castle',
  NULL,
  NULL,
  '熊本城',
  '#1c1917',
  'Kumamoto-jo',
  '不落の名城・熊本城をめぐる感動の42km',
  '42km around the legendary Kumamoto Castle',
  NULL,
  NULL,
  NULL,
  '花畑広場（くまもと街なか広場）',
  'Hanabata Plaza (Kumamoto City Center Square)',
  '熊本市中央区花畑町',
  NULL,
  NULL,
  '2026-07-27T14:20:33.431Z',
  '2026-07-27T14:20:33.431Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('kumamoto-castle-marathon-2027', 'full', 42.195, 420, '09:00', 13000, 13750, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kumamoto-castle-marathon-2027', '観光地', '熊本城', 'Kumamoto Castle', '日本三名城の一つ。震災復興のシンボル。ゴール地点から近い。', 'One of Japan''s three famous castles. Symbol of earthquake recovery. Close to the finish.', 'ゴール付近', NULL, 32.806, 130.7058);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kumamoto-castle-marathon-2027', 'グルメ', '馬刺し・太平燕', 'Horse Sashimi & Taipien', '熊本を代表するグルメ。馬刺しと太平燕（春雨スープ）はぜひ試したい。', 'Kumamoto''s signature dishes. Horse sashimi and taipien (glass noodle soup) are must-tries.', '熊本市内', NULL, 32.8032, 130.7079);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('kumamoto-castle-marathon-2027', '["tshirt"]', '大会Tシャツ', 'Race T-shirt', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('kumamoto-castle-marathon-2027', '["medal"]', '完走メダル', 'Finisher medal', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('kumamoto-castle-marathon-2027', NULL, '一般エントリー', 'General Entry', '2026-07-28', '2026-09-24', 13750, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('kumamoto-castle-marathon-2027', NULL, NULL, '熊本城', 'Kumamoto Castle', NULL, NULL, 0);

-- ==================
-- 京都マラソン (kyoto-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'kyoto-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'kyoto-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'kyoto-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'kyoto-marathon-2026';
DELETE FROM access_points WHERE race_id = 'kyoto-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'kyoto-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'kyoto-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'kyoto-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'kyoto-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'kyoto-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'kyoto-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'kyoto-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'kyoto-marathon-2026';
DELETE FROM race_results WHERE race_id = 'kyoto-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'kyoto-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'kyoto-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'kyoto-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'kyoto-marathon-2026',
  '京都マラソン',
  'Kyoto Marathon',
  '2026-02-15',
  '26',
  '京都市',
  'Kyoto City',
  '古都京都を舞台にしたフルマラソン。世界遺産の社寺を巡りながら走る。嵐山、金閣寺、銀閣寺、平安神宮などの名所がコース上に。',
  'A full marathon through the ancient capital Kyoto. Run past World Heritage temples and shrines including Arashiyama, Kinkaku-ji, Ginkaku-ji, and Heian Shrine.',
  'https://kyoto-marathon.com',
  0,
  1,
  16000,
  '2025-07-17',
  '2025-09-22',
  0,
  'pre_day',
  '',
  '',
  '["世界遺産","景色が良い","観光"]',
  NULL,
  0,
  0,
  0,
  'road',
  '["JAAF"]',
  '嵐山、金閣寺付近、今出川通、銀閣寺付近、平安神宮',
  'Arashiyama, near Kinkaku-ji, Imadegawa-dori, near Ginkaku-ji, Heian Shrine',
  NULL,
  NULL,
  '大文字山',
  '#7f1d1d',
  'Daimonji-yama',
  '千年の古都・京都の世界遺産をめぐる',
  'Run through Kyoto''s thousand years of world heritage',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-05-30T06:38:04.533Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('kyoto-marathon-2026', 'full', 42.195, 360, '08:55', 16000, 18500, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kyoto-marathon-2026', '観光地', '金閣寺', 'Kinkaku-ji', 'コース付近を通過する世界遺産。金色に輝く舎利殿が有名。', 'A World Heritage site near the course. Famous for its golden pavilion.', 'コース付近', NULL, 35.0394, 135.7292);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kyoto-marathon-2026', '観光地', '嵐山', 'Arashiyama', 'スタート地点付近。渡月橋や竹林の小径で知られる京都屈指の景勝地。', 'Near the start. Known for Togetsukyo Bridge and the bamboo grove.', 'スタート付近', NULL, 35.0116, 135.6681);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kyoto-marathon-2026', '温泉', 'さがの温泉 天山の湯', 'Sagano Onsen Tenzan no Yu', '嵐山エリアの天然温泉。レース後のリカバリーに。', 'Natural hot spring in the Arashiyama area. For post-race recovery.', '嵐山エリア', NULL, 35.0167, 135.6833);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('kyoto-marathon-2026', '["tshirt"]', '大会オリジナルTシャツ、完走メダル', 'Official race T-shirt, Finisher medal', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('kyoto-marathon-2026', '["medal"]', '大会オリジナルTシャツ、完走メダル', 'Official race T-shirt, Finisher medal', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('kyoto-marathon-2026', NULL, '一般エントリー', 'General Entry', '2025-07-17', '2025-09-22', NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('kyoto-marathon-2026', NULL, NULL, '嵐山', 'Arashiyama', NULL, NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('kyoto-marathon-2026', NULL, NULL, '金閣寺付近', 'near Kinkaku-ji', NULL, NULL, 1);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('kyoto-marathon-2026', NULL, NULL, '今出川通', 'Imadegawa-dori', NULL, NULL, 2);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('kyoto-marathon-2026', NULL, NULL, '銀閣寺付近', 'near Ginkaku-ji', NULL, NULL, 3);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('kyoto-marathon-2026', NULL, NULL, '平安神宮', 'Heian Shrine', NULL, NULL, 4);

-- ==================
-- 京都マラソン (kyoto-marathon-2027)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'kyoto-marathon-2027';
DELETE FROM race_categories WHERE race_id = 'kyoto-marathon-2027';
DELETE FROM aid_stations WHERE race_id = 'kyoto-marathon-2027';
DELETE FROM checkpoints WHERE race_id = 'kyoto-marathon-2027';
DELETE FROM access_points WHERE race_id = 'kyoto-marathon-2027';
DELETE FROM nearby_spots WHERE race_id = 'kyoto-marathon-2027';
DELETE FROM weather_history WHERE race_id = 'kyoto-marathon-2027';
DELETE FROM participation_gifts WHERE race_id = 'kyoto-marathon-2027';
DELETE FROM completion_gifts WHERE race_id = 'kyoto-marathon-2027';
DELETE FROM race_entry_links WHERE race_id = 'kyoto-marathon-2027';
DELETE FROM race_entry_periods WHERE race_id = 'kyoto-marathon-2027';
DELETE FROM reception_sessions WHERE race_id = 'kyoto-marathon-2027';
DELETE FROM race_travel_times WHERE race_id = 'kyoto-marathon-2027';
DELETE FROM race_results WHERE race_id = 'kyoto-marathon-2027';
DELETE FROM race_gallery WHERE race_id = 'kyoto-marathon-2027';
DELETE FROM race_voices WHERE race_id = 'kyoto-marathon-2027';
DELETE FROM race_time_buckets WHERE race_id = 'kyoto-marathon-2027';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'kyoto-marathon-2027',
  '京都マラソン',
  'Kyoto Marathon',
  '2027-02-21',
  '26',
  '京都市',
  'Kyoto City',
  '古都京都を舞台にしたフルマラソン。世界遺産の社寺を巡りながら走る。嵐山、金閣寺、銀閣寺、平安神宮などの名所がコース上に。',
  'A full marathon through the ancient capital Kyoto. Run past World Heritage temples and shrines including Arashiyama, Kinkaku-ji, Ginkaku-ji, and Heian Shrine.',
  'https://kyoto-marathon.com',
  18500,
  1,
  16000,
  '2026-07-17',
  '2026-09-22',
  0,
  'pre_day',
  '',
  '',
  '["世界遺産","景色が良い","観光"]',
  NULL,
  0,
  0,
  0,
  'road',
  '["JAAF","WA","AIMS"]',
  '嵐山・渡月橋、嵯峨野・広沢池、仁和寺、龍安寺、金閣寺、上賀茂神社、下鴨神社、銀閣寺、平安神宮（7つの世界文化遺産付近を通過）',
  'Arashiyama/Togetsukyo Bridge, Sagano/Hirosawa Pond, Ninna-ji, Ryoan-ji, Kinkaku-ji, Kamigamo Shrine, Shimogamo Shrine, Ginkaku-ji, Heian Shrine (near 7 World Heritage sites)',
  NULL,
  NULL,
  '大文字山',
  '#7f1d1d',
  'Daimonji-yama',
  '千年の古都・京都の世界遺産をめぐる',
  'Run through Kyoto''s thousand years of world heritage',
  NULL,
  NULL,
  NULL,
  'たけびしスタジアム京都（西京極総合運動公園内）',
  'Takebishi Stadium Kyoto (Nishikyogoku Sports Park)',
  NULL,
  NULL,
  NULL,
  '2026-06-24T00:00:00Z',
  '2026-08-24T16:31:50.212Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('kyoto-marathon-2027', 'full', 42.195, 360, '08:55', 16000, 18500, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kyoto-marathon-2027', '観光地', '金閣寺', 'Kinkaku-ji', 'コース付近を通過する世界遺産。金色に輝く舎利殿が有名。', 'A World Heritage site near the course. Famous for its golden pavilion.', 'コース付近', NULL, 35.0394, 135.7292);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kyoto-marathon-2027', '観光地', '嵐山', 'Arashiyama', 'スタート地点付近。渡月橋や竹林の小径で知られる京都屈指の景勝地。', 'Near the start. Known for Togetsukyo Bridge and the bamboo grove.', 'スタート付近', NULL, 35.0116, 135.6681);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kyoto-marathon-2027', '温泉', 'さがの温泉 天山の湯', 'Sagano Onsen Tenzan no Yu', '嵐山エリアの天然温泉。レース後のリカバリーに。', 'Natural hot spring in the Arashiyama area. For post-race recovery.', '嵐山エリア', NULL, 35.0167, 135.6833);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('kyoto-marathon-2027', '["tshirt"]', '大会オリジナルTシャツ', 'Official race T-shirt', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('kyoto-marathon-2027', '["medal"]', '完走メダル', 'Finisher medal', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('kyoto-marathon-2027', NULL, '一般エントリー', 'General Entry', '2026-07-17', '2026-09-22', NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('kyoto-marathon-2027', NULL, NULL, '嵐山', 'Arashiyama', NULL, NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('kyoto-marathon-2027', NULL, NULL, '金閣寺付近', 'near Kinkaku-ji', NULL, NULL, 1);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('kyoto-marathon-2027', NULL, NULL, '今出川通', 'Imadegawa-dori', NULL, NULL, 2);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('kyoto-marathon-2027', NULL, NULL, '銀閣寺付近', 'near Ginkaku-ji', NULL, NULL, 3);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('kyoto-marathon-2027', NULL, NULL, '平安神宮', 'Heian Shrine', NULL, NULL, 4);

-- ==================
-- 真駒内マラソン (makomanai-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'makomanai-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'makomanai-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'makomanai-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'makomanai-marathon-2026';
DELETE FROM access_points WHERE race_id = 'makomanai-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'makomanai-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'makomanai-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'makomanai-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'makomanai-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'makomanai-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'makomanai-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'makomanai-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'makomanai-marathon-2026';
DELETE FROM race_results WHERE race_id = 'makomanai-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'makomanai-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'makomanai-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'makomanai-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'makomanai-marathon-2026',
  '真駒内マラソン',
  'Makomanai Marathon',
  '2026-11-08',
  '01',
  '札幌市南区',
  'Sapporo City, Minami Ward',
  '北海道札幌市南区の真駒内公園周辺で開催されるマラソン大会。真駒内セキスイハイムスタジアムを発着点に、豊平川河川敷沿いを周回するコース。',
  'Held around Makomanai Park in Minami Ward, Sapporo, Hokkaido. Starts and finishes at Makomanai Sekisui Heim Stadium, looping along the Toyohira riverside.',
  'https://sakumara.jp/',
  7000,
  1,
  2000,
  '2026-07-18',
  '2026-10-06',
  0,
  'race_day',
  'ナンバーカードの受け取りは大会当日、真駒内セキスイハイムスタジアムにて実施。WEB引換証（RUN PASSPORT）を使用し、10月下旬にランネット登録アドレスへメール通知が届く。事前郵送は行われない。',
  'Bib pickup is on race day only, at Makomanai Sekisui Heim Stadium. A web exchange voucher (RUN PASSPORT) is used, with notification emailed via RUNNET in late October. No advance mailing.',
  '[]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  '真駒内セキスイハイムスタジアムをスタート・フィニッシュに、豊平川河川敷沿いを周回するコース。フルマラソンは1周10kmのコースを4周し、公園内の2.195kmを加えて42.195kmとなる。',
  'Starts and finishes at Makomanai Sekisui Heim Stadium, looping along the Toyohira riverside. The full marathon covers four 10km loops plus an additional 2.195km segment within the park.',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '札幌・真駒内公園を駆け抜ける、豊平川河畔のマラソン',
  'Race through Makomanai Park along the Toyohira riverside in Sapporo',
  NULL,
  NULL,
  NULL,
  '真駒内セキスイハイムスタジアム',
  'Makomanai Sekisui Heim Stadium',
  '北海道札幌市南区真駒内公園3-1',
  NULL,
  NULL,
  '2026-08-31T00:00:00Z',
  '2026-08-31T00:00:00Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('makomanai-marathon-2026', 'full', 42.195, 900, '', 1300, 7000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('makomanai-marathon-2026', '10k', 10, 90, '', 500, 4000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 1);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('makomanai-marathon-2026', 'other', 2.8, 0, '', 200, 2000, NULL, '2.8kmファンラン', '2.8km Fun Run', '制限時間なし', 'No time limit', NULL, NULL, NULL, '[]', 2);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('makomanai-marathon-2026', '["tshirt"]', 'オリジナルTシャツ（フルマラソン部門）', 'Original T-shirt (Full Marathon category)', NULL, 0);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('makomanai-marathon-2026', '["other"]', 'ドリンク（2.8kmファンラン部門）', 'Drink (2.8km Fun Run category)', NULL, 1);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('makomanai-marathon-2026', NULL, '1次エントリー', 'First-Round Entry', '2026-07-18', '2026-08-29', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('makomanai-marathon-2026', NULL, '2次エントリー', 'Second-Round Entry', '2026-08-31', '2026-10-06', NULL, 1);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('makomanai-marathon-2026', NULL, NULL, '豊平川河川敷', 'Toyohira River embankment', NULL, NULL, 0);

-- ==================
-- みえ松阪マラソン (mie-matsusaka-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'mie-matsusaka-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'mie-matsusaka-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'mie-matsusaka-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'mie-matsusaka-marathon-2026';
DELETE FROM access_points WHERE race_id = 'mie-matsusaka-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'mie-matsusaka-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'mie-matsusaka-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'mie-matsusaka-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'mie-matsusaka-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'mie-matsusaka-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'mie-matsusaka-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'mie-matsusaka-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'mie-matsusaka-marathon-2026';
DELETE FROM race_results WHERE race_id = 'mie-matsusaka-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'mie-matsusaka-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'mie-matsusaka-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'mie-matsusaka-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'mie-matsusaka-marathon-2026',
  'みえ松阪マラソン',
  'Mie Matsusaka Marathon',
  '2026-12-20',
  '24',
  '松阪市',
  'Matsusaka City',
  '三重県松阪市で開催。松阪牛の産地を走るフルマラソン。ご当地グルメのエイドが期待される。',
  'Held in Matsusaka, Mie, home of the famous Matsusaka beef. Expect local gourmet food at aid stations.',
  'https://mie-matsusaka-marathon.jp',
  12900,
  1,
  10000,
  '2026-05-24',
  '2026-07-31',
  0,
  'pre_mail',
  '12月上旬頃、登録住所へ大会プログラム・ビブス（ナンバーカード）・記録計測用チップ等を発送予定（健康ウオークの部を除く）',
  'Race program, bib (race number), timing chip, etc. will be mailed to your registered address in early December (excluding Health Walk participants)',
  '["ご当地グルメ"]',
  NULL,
  0,
  0,
  0,
  'road',
  '["JAAF"]',
  '松阪の城下町・伊勢街道沿いの豪商のまちを走るコース。32km地点のトンネル内にプロジェクションマッピングあり',
  'Run through Matsusaka castle town and the historic merchant district along the Ise-kaido road. Projection mapping in the tunnel at km 32.',
  NULL,
  NULL,
  '松阪牛',
  '#7f1d1d',
  'Matsusaka-gyu',
  '松阪牛の里・松阪を走る、美食ランナーの聖地',
  'Run through Matsusaka, home of Japan''s finest beef',
  NULL,
  NULL,
  NULL,
  'クラギ文化ホール前',
  'Kuragi Culture Hall (Front)',
  NULL,
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-08-24T16:32:37.389Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('mie-matsusaka-marathon-2026', 'full', 42.195, 0, '', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('mie-matsusaka-marathon-2026', 'グルメ', '松阪牛', 'Matsusaka Beef', '日本三大和牛の一つ。レース後のご褒美に。', 'One of Japan''s three premium wagyu. A reward after the race.', '松阪市内', NULL, 34.5778, 136.5312);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('mie-matsusaka-marathon-2026', '["tshirt","local_product"]', '大会Tシャツ、松阪横丁チケット（フィニッシュ会場で使用可）', 'Race T-shirt, Matsusaka Yokocho ticket (usable at finish venue)', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('mie-matsusaka-marathon-2026', '["medal"]', '完走メダル', 'Finisher medal', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('mie-matsusaka-marathon-2026', NULL, '三重県民先行エントリー', 'Mie Residents Priority Entry', '2026-05-24', '2026-05-31', 12900, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('mie-matsusaka-marathon-2026', NULL, '宿泊付きエントリー', 'Entry with Accommodation', '2026-05-24', '2026-05-31', 12900, 1);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('mie-matsusaka-marathon-2026', NULL, 'ふるさと納税エントリー', 'Hometown Tax Entry', '2026-05-24', '2026-07-24', 44000, 2);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('mie-matsusaka-marathon-2026', NULL, '一般エントリー', 'General Entry', '2026-06-01', '2026-07-31', 12900, 3);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('mie-matsusaka-marathon-2026', NULL, '健康ウオークの部エントリー', 'Health Walk Entry', '2026-06-01', '2026-09-30', NULL, 4);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('mie-matsusaka-marathon-2026', NULL, NULL, '松阪の城下町', 'Matsusaka castle town', NULL, NULL, 0);

-- ==================
-- みのかもハーフマラソン (minokamo-half-marathon-2027)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'minokamo-half-marathon-2027';
DELETE FROM race_categories WHERE race_id = 'minokamo-half-marathon-2027';
DELETE FROM aid_stations WHERE race_id = 'minokamo-half-marathon-2027';
DELETE FROM checkpoints WHERE race_id = 'minokamo-half-marathon-2027';
DELETE FROM access_points WHERE race_id = 'minokamo-half-marathon-2027';
DELETE FROM nearby_spots WHERE race_id = 'minokamo-half-marathon-2027';
DELETE FROM weather_history WHERE race_id = 'minokamo-half-marathon-2027';
DELETE FROM participation_gifts WHERE race_id = 'minokamo-half-marathon-2027';
DELETE FROM completion_gifts WHERE race_id = 'minokamo-half-marathon-2027';
DELETE FROM race_entry_links WHERE race_id = 'minokamo-half-marathon-2027';
DELETE FROM race_entry_periods WHERE race_id = 'minokamo-half-marathon-2027';
DELETE FROM reception_sessions WHERE race_id = 'minokamo-half-marathon-2027';
DELETE FROM race_travel_times WHERE race_id = 'minokamo-half-marathon-2027';
DELETE FROM race_results WHERE race_id = 'minokamo-half-marathon-2027';
DELETE FROM race_gallery WHERE race_id = 'minokamo-half-marathon-2027';
DELETE FROM race_voices WHERE race_id = 'minokamo-half-marathon-2027';
DELETE FROM race_time_buckets WHERE race_id = 'minokamo-half-marathon-2027';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'minokamo-half-marathon-2027',
  'みのかもハーフマラソン',
  'Minokamo Half Marathon',
  '2027-01-10',
  '21',
  '美濃加茂市',
  'Minokamo City',
  '岐阜県美濃加茂市のぎふ清流里山公園を舞台に開催されるハーフマラソン。里山の景観の中を走るコースが特徴で、名物「かも丸鍋」がランナー全員に振る舞われる。',
  'A half marathon held at Gifu Seiryu Satoyama Park in Minokamo, Gifu, running through scenic satoyama (rural hillside) landscapes. All runners receive a bowl of the local specialty "Kamo-maru Nabe" hot pot.',
  'https://minokamo-halfmarathon.net/',
  NULL,
  1,
  3000,
  '2026-09-01',
  '2026-10-31',
  0,
  'race_day',
  '大会当日午前7時〜8時（8時30分終了）に受付',
  'Same-day check-in from 7:00-8:00 AM (closes 8:30 AM)',
  '["里山コース"]',
  NULL,
  0,
  0,
  100,
  'road',
  '[]',
  '美濃加茂市北部の里山を疾走する「山紫水明」のコース。3〜7km地点は下り、7〜9km・14〜15km・18km〜ゴールにそれぞれ上り坂があり、高低差は約100m',
  'A scenic course through the satoyama hills of northern Minokamo. The route descends from km 3-7, then climbs at km 7-9, km 14-15, and km 18 to the finish, with roughly 100m of elevation change overall.',
  NULL,
  NULL,
  'かも丸鍋',
  '#b45309',
  'Kamo-maru Nabe',
  '里山を駆け抜け、かも丸鍋で締めくくる',
  'Run the satoyama hills, finish with Kamo-maru Nabe',
  NULL,
  NULL,
  NULL,
  'ぎふ清流里山公園',
  'Gifu Seiryu Satoyama Park',
  '岐阜県美濃加茂市山之上町2292-1',
  NULL,
  NULL,
  '2026-08-31T00:00:00Z',
  '2026-08-31T00:00:00Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('minokamo-half-marathon-2027', 'half', 21.0975, 150, '', 0, NULL, NULL, 'ハーフマラソンの部', 'Half Marathon', NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('minokamo-half-marathon-2027', '10k', 10, 0, '', 0, NULL, NULL, '10kmの部', '10km', NULL, NULL, NULL, NULL, NULL, '[]', 1);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('minokamo-half-marathon-2027', 'other', 3, 0, '', 0, NULL, NULL, '3kmの部', '3km', NULL, NULL, NULL, NULL, NULL, '[]', 2);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('minokamo-half-marathon-2027', 'other', 2, 0, '', 0, NULL, NULL, '2kmの部', '2km', NULL, NULL, NULL, NULL, NULL, '[]', 3);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('minokamo-half-marathon-2027', '["food"]', 'ランナー全員に美濃加茂名物「かも丸鍋」を提供予定', 'All runners receive a bowl of Kamo-maru Nabe, a Minokamo specialty hot pot dish', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('minokamo-half-marathon-2027', '["certificate"]', '記録証（計測種目のみ）', 'Finisher time certificate (timed events only)', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('minokamo-half-marathon-2027', NULL, '一般エントリー', 'General Entry', '2026-09-01', '2026-10-31', NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('minokamo-half-marathon-2027', NULL, NULL, 'ぎふ清流里山公園の里山コース', 'Satoyama course through Gifu Seiryu Satoyama Park', NULL, NULL, 0);

-- ==================
-- 水戸黄門漫遊マラソン (mito-komon-manyu-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'mito-komon-manyu-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'mito-komon-manyu-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'mito-komon-manyu-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'mito-komon-manyu-marathon-2026';
DELETE FROM access_points WHERE race_id = 'mito-komon-manyu-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'mito-komon-manyu-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'mito-komon-manyu-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'mito-komon-manyu-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'mito-komon-manyu-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'mito-komon-manyu-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'mito-komon-manyu-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'mito-komon-manyu-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'mito-komon-manyu-marathon-2026';
DELETE FROM race_results WHERE race_id = 'mito-komon-manyu-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'mito-komon-manyu-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'mito-komon-manyu-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'mito-komon-manyu-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'mito-komon-manyu-marathon-2026',
  '水戸黄門漫遊マラソン',
  'Mito Komon Manyu Marathon',
  '2026-10-25',
  '08',
  '水戸市',
  'Mito City',
  '茨城県水戸市で開催。偕楽園や千波湖など水戸の名所を巡るコース。',
  'Held in Mito City, Ibaraki. Course visits Kairakuen Garden, Lake Senba, and other Mito landmarks.',
  'https://www.mitokomon-manyu-marathon.com',
  10000,
  1,
  10000,
  '2026-04-16',
  '2026-06-30',
  1,
  'pre_mail',
  '',
  '',
  '["景色が良い","観光"]',
  NULL,
  0,
  0,
  0,
  'road',
  '["JAAF","WA"]',
  '偕楽園、千波湖',
  'Kairakuen Garden, Lake Senba',
  NULL,
  NULL,
  '水戸黄門',
  '#1c1917',
  'Mito-Komon',
  '助さん格さんも驚く、水戸を駆ける42km',
  'Run through Mito as legends of the Komon await',
  NULL,
  NULL,
  NULL,
  '茨城県三の丸庁舎広場',
  'Ibaraki Prefectural Sanno-maru Building Square',
  '茨城県水戸市三の丸1丁目',
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-08-31T13:34:28.564Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('mito-komon-manyu-marathon-2026', 'full', 42.195, 360, '', 10000, 10000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'mito-komon-manyu-marathon-2026', '[]', 0);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  ('mito-komon-manyu-marathon-2026', '水戸駅', 'Mito Station', '', '徒歩約5分', 'approx. 5 min walk', 0, 0, 5, 1, 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('mito-komon-manyu-marathon-2026', '観光地', '偕楽園', 'Kairakuen Garden', '日本三名園の一つ。2〜3月は梅まつりで有名。コース上から望める。', 'One of Japan''s three most beautiful gardens. Famous for plum blossom festival in Feb-Mar.', 'コース付近', NULL, 36.3811, 140.4511);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('mito-komon-manyu-marathon-2026', '["tshirt"]', '参加賞Tシャツ（アンドエスティプロデュース、事前発送）。水戸の歴史と誇りを大胆なタイポグラフィに落とし込んだデザイン。MITOの「O」に水戸芸術館の塔を象徴的に配し、朝焼けのようなイエローで走る高揚感を表現。', 'Race T-shirt (produced by &ST, pre-mailed). Bold typography design reflecting Mito''s history and pride, symbolically placing the Art Tower Mito in the ''O'' of MITO, with a sunrise-yellow color expressing the excitement of running.', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('mito-komon-manyu-marathon-2026', '["medal"]', '完走記念メダル（水戸黄門の印籠デザイン・水戸市の木「梅」と吉祥文様「青海波」の柄入り）', 'Finisher medal (Mito Komon inro design with plum blossom and seigaiha wave pattern)', NULL, 0);
INSERT OR REPLACE INTO race_entry_links (race_id, site_name, url, sort_order) VALUES
  ('mito-komon-manyu-marathon-2026', 'RUNNET', 'https://runnet.jp/entry/runtes/user/pc/competitionDetailAction.do?raceId=387694&div=1', 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('mito-komon-manyu-marathon-2026', NULL, '水戸市民先行枠', 'Mito Citizens Priority Entry', '2026-04-16', '2026-04-22', 10000, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('mito-komon-manyu-marathon-2026', NULL, '一般枠', 'General Entry', '2026-04-24', '2026-06-30', 10000, 1);

-- ==================
-- 富士山クライムラン (mtfuji-climb-run-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'mtfuji-climb-run-2026';
DELETE FROM race_categories WHERE race_id = 'mtfuji-climb-run-2026';
DELETE FROM aid_stations WHERE race_id = 'mtfuji-climb-run-2026';
DELETE FROM checkpoints WHERE race_id = 'mtfuji-climb-run-2026';
DELETE FROM access_points WHERE race_id = 'mtfuji-climb-run-2026';
DELETE FROM nearby_spots WHERE race_id = 'mtfuji-climb-run-2026';
DELETE FROM weather_history WHERE race_id = 'mtfuji-climb-run-2026';
DELETE FROM participation_gifts WHERE race_id = 'mtfuji-climb-run-2026';
DELETE FROM completion_gifts WHERE race_id = 'mtfuji-climb-run-2026';
DELETE FROM race_entry_links WHERE race_id = 'mtfuji-climb-run-2026';
DELETE FROM race_entry_periods WHERE race_id = 'mtfuji-climb-run-2026';
DELETE FROM reception_sessions WHERE race_id = 'mtfuji-climb-run-2026';
DELETE FROM race_travel_times WHERE race_id = 'mtfuji-climb-run-2026';
DELETE FROM race_results WHERE race_id = 'mtfuji-climb-run-2026';
DELETE FROM race_gallery WHERE race_id = 'mtfuji-climb-run-2026';
DELETE FROM race_voices WHERE race_id = 'mtfuji-climb-run-2026';
DELETE FROM race_time_buckets WHERE race_id = 'mtfuji-climb-run-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'mtfuji-climb-run-2026',
  '富士山クライムラン',
  'Mt.FUJI CLIMB RUN',
  '2026-09-13',
  '19',
  '富士北麓公園富士山GXスタジアム～吉田口登山道～五合目に至る約12km',
  'Approximately 12 km from Fuji North Foot Park’s Mt. Fuji GX Stadium to the 5th Station via the Yoshida Trail',
  'コースは人気上昇中の富士吉田登山道
平安時代から多くの修験者が富士登山に利用した歴史ある登山道。
江戸時代には多くの茶屋も並び活況を呈したそう。 近年、外国人登山客がこの登山道の魅力を数多く発信しており、日本人の間でも人気が上昇中。
樹林帯が続くトレイルを進む気持ちよさは格別です。

1時間50分以内の完走で「富士登山競走山頂コース」挑戦資格ゲット！
※2027年7月大会
1時間50分以内（ネットタイム）で完走された方は、2027年7月開催の「第80回富士登山競走 山頂コース」への出場資格を獲得することができます。',
  'The course follows the increasingly popular Fujiyoshida Trail.
This historic trail has been used by many ascetic practitioners to climb Mount Fuji since the Heian period.
It is said to have been bustling with numerous teahouses lining the path during the Edo period. In recent years, foreign hikers have been sharing the trail’s appeal, and its popularity is on the rise among Japanese people as well.
The feeling of walking along this trail through continuous woodlands is truly exceptional.

Finish in 1 hour and 50 minutes or less to qualify for the “Fuji Mountain Race Summit Course”!
*July 2027 Event
Participants who finish within 1 hour and 50 minutes (net time) will qualify to compete in the “80th Fuji Mountain Race Summit Course” to be held in July 2027.

Translated with DeepL.com (free version)',
  'https://mtfujiclimbrun.com/',
  15000,
  1,
  2000,
  '2026-04-24',
  '2026-07-31',
  0,
  'both',
  '9月12日（土）（大会前日）13:00～18:00　場所：富士北麓公園 富士山GXスタジアム
9月13日（日）（大会当日）6:30～各ウェーブのスタート時間の30分前まで　場所：富士北麓公園 富士山GXスタジアム',
  'Saturday, September 12 (pre-race day): 1:00 PM – 6:00 PM / Venue: Fuji Hokuroku Park Fujisan GX Stadium
Sunday, September 13 (race day): 6:30 AM – 30 minutes before the start time of each wave / Venue: Fuji Hokuroku Park Fujisan GX Stadium',
  '[]',
  'mtfuji-climb-run-2026.kml',
  0,
  0,
  1200,
  'trail',
  '[]',
  '富士北麓公園 富士山GXスタジアムをスタートし、吉田口登山道を経て五合目フィニッシュまで約12km・標高差約1,200m。補助具（ストック・杖等）使用禁止。関門：馬返し12:12、三合目12:34、ゴール制限13:00。',
  'Approx. 12km from Fuji Hokuroku Park Fujisan GX Stadium via the Yoshida Trail to the 5th station finish, with approx. 1,200m elevation gain. Poles and walking sticks are prohibited. Cutoffs: Umagaeshi 12:12, 3rd station 12:34, finish 13:00.',
  '給水所は計4箇所（スタート前、約3.7km地点、約7.4km地点、約9.5km地点）に設置。約7.4km・9.5km地点では塩タブレットやようかんも提供。仮設トイレは約3.7km地点（中の茶屋）に3基、約7.4km地点（馬返し）に3基、約9.5km地点（三合目）に1基。コース上にキロ表示はなし。フィニッシュ（吉田口五合目）から富士スバルライン五合目のシャトルバス乗車場所までは徒歩約2.4km。記録証はWEB記録証のみで、紙での当日配布・後日郵送はなし。足場の悪い登山道のため伴走者を伴う参加は不可。',
  'Four aid stations are set up along the course (before the start, and at approx. 3.7km, 7.4km, and 9.5km), with salt tablets and yokan also offered at the 7.4km and 9.5km stations. Portable toilets are located at approx. 3.7km (Naka-no-chaya, 3 units), 7.4km (Umagaeshi, 3 units), and 9.5km (3rd station, 1 unit). There are no kilometer markers on the course. From the finish (Yoshida Trail 5th station) it is about a 2.4km walk to the shuttle bus pickup point at the Fuji Subaru Line 5th station. Only a web-based finisher certificate is available — no paper certificate is distributed on the day or mailed later. Runners requiring a pacer/companion cannot participate due to narrow, steep terrain on the trail.',
  '富士山頂',
  '#1e3a8a',
  'Fujisan-cho',
  '霊峰富士の頂へ、山岳レースの最高峰',
  'Climb to the summit of Mt. Fuji — the ultimate trail race',
  NULL,
  NULL,
  NULL,
  '富士北麓公園 富士山GXスタジアム',
  'Fuji Hokuroku Park Fujisan GX Stadium',
  NULL,
  NULL,
  NULL,
  '2026-04-28T13:53:53.451Z',
  '2026-08-31T13:35:01.898Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('mtfuji-climb-run-2026', 'other', 12, 180, '09:00', 2000, 15000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  ('mtfuji-climb-run-2026', '富士山駅（富士急行線）', 'Fujisan Station (Fujikyu Railway)', '', 'タクシーで10〜15分。大会当日（9/13）は無料シャトルバス運行（富士山駅発7:30・8:00・8:30）', '10-15 min by taxi. Free shuttle bus on race day (Sep 13) departs Fujisan Station at 7:30, 8:00, and 8:30 AM', 0, 0, 0, 1, 0);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('mtfuji-climb-run-2026', '["goods"]', 'オリジナルソフトカップ', 'Original Soft Cup', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('mtfuji-climb-run-2026', NULL, '一般エントリー', 'General Entry', '2026-04-24', '2026-07-31', 15000, 0);

-- ==================
-- 妙高トレイル (myoko-trail-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'myoko-trail-2026';
DELETE FROM race_categories WHERE race_id = 'myoko-trail-2026';
DELETE FROM aid_stations WHERE race_id = 'myoko-trail-2026';
DELETE FROM checkpoints WHERE race_id = 'myoko-trail-2026';
DELETE FROM access_points WHERE race_id = 'myoko-trail-2026';
DELETE FROM nearby_spots WHERE race_id = 'myoko-trail-2026';
DELETE FROM weather_history WHERE race_id = 'myoko-trail-2026';
DELETE FROM participation_gifts WHERE race_id = 'myoko-trail-2026';
DELETE FROM completion_gifts WHERE race_id = 'myoko-trail-2026';
DELETE FROM race_entry_links WHERE race_id = 'myoko-trail-2026';
DELETE FROM race_entry_periods WHERE race_id = 'myoko-trail-2026';
DELETE FROM reception_sessions WHERE race_id = 'myoko-trail-2026';
DELETE FROM race_travel_times WHERE race_id = 'myoko-trail-2026';
DELETE FROM race_results WHERE race_id = 'myoko-trail-2026';
DELETE FROM race_gallery WHERE race_id = 'myoko-trail-2026';
DELETE FROM race_voices WHERE race_id = 'myoko-trail-2026';
DELETE FROM race_time_buckets WHERE race_id = 'myoko-trail-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'myoko-trail-2026',
  '妙高トレイル',
  'Myoko Trail',
  '2026-09-20',
  '15',
  '妙高市',
  'Myoko City',
  '世界的トレイルランニングシリーズ「ゴールデントレイルワールドシリーズ」の日本初開催大会。妙高杉ノ原スキー場・池ノ平スキー場を舞台に、妙高山麓の急峻な登り下りが連続するコースを走る。',
  'The Japan debut of the Golden Trail World Series, held at Myoko Sugonohara and Ikenotaira ski resorts. The course features consecutive steep climbs and descents on the slopes of Mt. Myoko.',
  'https://www.nature-scene.net/gtws/',
  18000,
  1,
  1200,
  '2026-04-12',
  '2026-08-03',
  0,
  'race_day',
  '',
  '',
  '[]',
  NULL,
  0,
  0,
  1935,
  'trail',
  '[]',
  '妙高山麓、急峻な登り下りが連続するコース',
  'Consecutive steep climbs and descents on the slopes of Mt. Myoko',
  'GTWSレース（23.5km）は9月20日、公開レース（11km/5km）は9月19日開催',
  'The GTWS race (23.5km) is held on Sep 20; the open races (11km/5km) are held on Sep 19',
  '妙高山',
  '#0f766e',
  'Myoko-san',
  '世界を転戦するゴールデントレイル、日本初上陸',
  'The Golden Trail World Series makes its Japan debut',
  NULL,
  NULL,
  NULL,
  '妙高杉ノ原スキー場',
  'Myoko Sugonohara Ski Resort',
  '新潟県妙高市',
  NULL,
  NULL,
  '2026-08-25T00:00:00Z',
  '2026-08-31T13:35:24.613Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('myoko-trail-2026', 'other', 23.5, 300, '13:00', 500, 18000, 13000, 'GTWSレース', 'GTWS Race', '獲得標高約1,935m。16歳以上。男性制限時間4時間40分・女性5時間', '~1,935m elevation gain. Age 16+. Time limit: 4h40m (male) / 5h (female)', NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('myoko-trail-2026', 'other', 11, 0, '13:00', 400, NULL, NULL, '妙高トレイル11km', 'Myoko Trail 11km', '中学生以上', 'Junior high school age and above', NULL, NULL, NULL, '[]', 1);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('myoko-trail-2026', '5k', 5, 0, '14:00', 300, NULL, NULL, '妙高トレイル5km', 'Myoko Trail 5km', '中学生以上', 'Junior high school age and above', NULL, NULL, NULL, '[]', 2);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('myoko-trail-2026', NULL, '一般エントリー', 'General Entry', '2026-04-12', '2026-08-03', 18000, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('myoko-trail-2026', NULL, NULL, '妙高山', 'Mt. Myoko', NULL, NULL, 0);

-- ==================
-- 長井マラソン (nagai-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'nagai-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'nagai-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'nagai-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'nagai-marathon-2026';
DELETE FROM access_points WHERE race_id = 'nagai-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'nagai-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'nagai-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'nagai-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'nagai-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'nagai-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'nagai-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'nagai-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'nagai-marathon-2026';
DELETE FROM race_results WHERE race_id = 'nagai-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'nagai-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'nagai-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'nagai-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'nagai-marathon-2026',
  '長井マラソン',
  'Nagai Marathon',
  '2026-10-18',
  '06',
  '長井市置賜生涯学習プラザ',
  '',
  '',
  '',
  'https://nagai-marathon.jp/',
  NULL,
  1,
  0,
  '2026-05-14',
  '2026-08-18',
  0,
  'pre_mail',
  '',
  '',
  '[]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  '',
  '',
  '',
  '',
  '芋煮',
  NULL,
  'IMONI',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '2026-05-20T14:02:09.788Z',
  '2026-05-20T14:02:09.788Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('nagai-marathon-2026', 'full', 42.195, 330, '09:25', 0, 10000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('nagai-marathon-2026', 'half', 21.0975, 150, '09:25', 0, 5000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 1);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('nagai-marathon-2026', '["tshirt","towel"]', '●大会記念Ｔシャツ
●フィニッシャーズタオル
　フルマラソン・ハーフマラソンを時間内に完走した方
●完走記録証（WEB交付）
●山形芋煮のふるまい  など', '', NULL, 0);
INSERT OR REPLACE INTO race_entry_links (race_id, site_name, url, sort_order) VALUES
  ('nagai-marathon-2026', 'RUNNET', 'https://runnet.jp/entry/runtes/user/pc/competitionDetailAction.do?raceId=387699&div=1&tabFlg=1#tab', 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('nagai-marathon-2026', NULL, '一般エントリー', 'General Entry', '2026-05-14', '2026-08-18', NULL, 0);

-- ==================
-- 第28回 長野マラソン (nagano-marathon-2027)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'nagano-marathon-2027';
DELETE FROM race_categories WHERE race_id = 'nagano-marathon-2027';
DELETE FROM aid_stations WHERE race_id = 'nagano-marathon-2027';
DELETE FROM checkpoints WHERE race_id = 'nagano-marathon-2027';
DELETE FROM access_points WHERE race_id = 'nagano-marathon-2027';
DELETE FROM nearby_spots WHERE race_id = 'nagano-marathon-2027';
DELETE FROM weather_history WHERE race_id = 'nagano-marathon-2027';
DELETE FROM participation_gifts WHERE race_id = 'nagano-marathon-2027';
DELETE FROM completion_gifts WHERE race_id = 'nagano-marathon-2027';
DELETE FROM race_entry_links WHERE race_id = 'nagano-marathon-2027';
DELETE FROM race_entry_periods WHERE race_id = 'nagano-marathon-2027';
DELETE FROM reception_sessions WHERE race_id = 'nagano-marathon-2027';
DELETE FROM race_travel_times WHERE race_id = 'nagano-marathon-2027';
DELETE FROM race_results WHERE race_id = 'nagano-marathon-2027';
DELETE FROM race_gallery WHERE race_id = 'nagano-marathon-2027';
DELETE FROM race_voices WHERE race_id = 'nagano-marathon-2027';
DELETE FROM race_time_buckets WHERE race_id = 'nagano-marathon-2027';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'nagano-marathon-2027',
  '第28回 長野マラソン',
  '28th Nagano Marathon',
  '2027-04-18',
  '20',
  '長野市',
  'Nagano City',
  '1998年長野冬季オリンピックの理念を継承し、1999年に初開催された歴史ある市民マラソン大会。エムウェーブ、ホワイトリング、ビッグハットなどのオリンピック施設を巡りながら、春の信濃路を駆け抜ける42.195km。日本陸連公認・AIMS公認コース。AbbottWMMワンダ・エイジグループワールドランキング予選大会。',
  'A historic citizens'' marathon inheriting the spirit of the 1998 Nagano Winter Olympics, first held in 1999. The 42.195km course passes through Olympic venues including M-Wave, White Ring, and Big Hat, running through the scenic spring landscape of Shinano. JAAF and AIMS certified course. AbbottWMM Wanda Age Group World Rankings qualifying event.',
  'https://www.naganomarathon.gr.jp/',
  14300,
  1,
  10000,
  '2026-09-05',
  '2026-11-01',
  0,
  'none',
  '前日受付なし。アスリートビブス・参加賞は大会2週間〜10日前に事前郵送',
  'No on-site registration. Athlete bibs and participation gifts are mailed 10-14 days before the event.',
  '["AIMS公認","オリンピック施設","フラット","日本陸連公認","景色が良い","記録狙い"]',
  'nagano-marathon-2026.gpx',
  383,
  340,
  43,
  'road',
  '["JAAF","AIMS"]',
  '善光寺表参道、エムウェーブ（2026年は工事のためコース変更あり）、ビッグハット、五輪大橋、ホワイトリング、長野オリンピックスタジアム（フィニッシュ）',
  'Zenkoji approach road, M-Wave (course change in 2026 due to construction), Big Hat, Olympic Bridge, White Ring, Nagano Olympic Stadium (finish)',
  NULL,
  NULL,
  '善光寺',
  '#78350f',
  'Zenko-ji',
  '長野オリンピックの遺産を巡る、信濃の春',
  'Run through Nagano''s Olympic legacy in spring Shinano',
  NULL,
  NULL,
  NULL,
  '長野運動公園',
  'Nagano Athletic Park',
  '長野県長野市吉田',
  NULL,
  NULL,
  '2026-08-31T13:36:05.739Z',
  '2026-08-31T13:36:05.739Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('nagano-marathon-2027', 'full', 42.195, 300, '08:30', 10000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO aid_stations (race_id, distance_km, offerings_ja, offerings_en, is_featured) VALUES
  ('nagano-marathon-2027', 5, '水、スポーツドリンク', 'Water, sports drink', 0);
INSERT OR REPLACE INTO aid_stations (race_id, distance_km, offerings_ja, offerings_en, is_featured) VALUES
  ('nagano-marathon-2027', 10, '水、スポーツドリンク、バナナ', 'Water, sports drink, banana', 0);
INSERT OR REPLACE INTO aid_stations (race_id, distance_km, offerings_ja, offerings_en, is_featured) VALUES
  ('nagano-marathon-2027', 15, '水、スポーツドリンク', 'Water, sports drink', 0);
INSERT OR REPLACE INTO aid_stations (race_id, distance_km, offerings_ja, offerings_en, is_featured) VALUES
  ('nagano-marathon-2027', 20, '水、スポーツドリンク、バナナ、おにぎり', 'Water, sports drink, banana, rice ball', 0);
INSERT OR REPLACE INTO aid_stations (race_id, distance_km, offerings_ja, offerings_en, is_featured) VALUES
  ('nagano-marathon-2027', 25, '水、スポーツドリンク', 'Water, sports drink', 0);
INSERT OR REPLACE INTO aid_stations (race_id, distance_km, offerings_ja, offerings_en, is_featured) VALUES
  ('nagano-marathon-2027', 30, '水、スポーツドリンク、バナナ、チョコレート', 'Water, sports drink, banana, chocolate', 0);
INSERT OR REPLACE INTO aid_stations (race_id, distance_km, offerings_ja, offerings_en, is_featured) VALUES
  ('nagano-marathon-2027', 35, '水、スポーツドリンク', 'Water, sports drink', 0);
INSERT OR REPLACE INTO aid_stations (race_id, distance_km, offerings_ja, offerings_en, is_featured) VALUES
  ('nagano-marathon-2027', 40, '水、スポーツドリンク', 'Water, sports drink', 0);
INSERT OR REPLACE INTO checkpoints (race_id, distance_km, closing_time) VALUES
  ('nagano-marathon-2027', 5.8, '09:21');
INSERT OR REPLACE INTO checkpoints (race_id, distance_km, closing_time) VALUES
  ('nagano-marathon-2027', 10.4, '09:53');
INSERT OR REPLACE INTO checkpoints (race_id, distance_km, closing_time) VALUES
  ('nagano-marathon-2027', 14.7, '10:22');
INSERT OR REPLACE INTO checkpoints (race_id, distance_km, closing_time) VALUES
  ('nagano-marathon-2027', 19.3, '10:54');
INSERT OR REPLACE INTO checkpoints (race_id, distance_km, closing_time) VALUES
  ('nagano-marathon-2027', 24.6, '11:31');
INSERT OR REPLACE INTO checkpoints (race_id, distance_km, closing_time) VALUES
  ('nagano-marathon-2027', 29.2, '12:03');
INSERT OR REPLACE INTO checkpoints (race_id, distance_km, closing_time) VALUES
  ('nagano-marathon-2027', 34.2, '12:37');
INSERT OR REPLACE INTO checkpoints (race_id, distance_km, closing_time) VALUES
  ('nagano-marathon-2027', 39.3, '13:12');
INSERT OR REPLACE INTO checkpoints (race_id, distance_km, closing_time) VALUES
  ('nagano-marathon-2027', 41.1, '13:24');
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  ('nagano-marathon-2027', '長野駅', 'Nagano Station', 'nagano', '長野駅東口からスタート会場（長野運動公園）までシャトルバスで約15分。または北長野駅から徒歩約15分。', 'Shuttle bus from Nagano Station East Exit to the start venue (Nagano Athletic Park), approx. 15 min. Or 15 min walk from Kita-Nagano Station.', 36.6433, 138.1889, NULL, 0, 0);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  ('nagano-marathon-2027', '北長野駅', 'Kita-Nagano Station', 'kita-nagano', '徒歩約15分でスタート会場（長野運動公園）に到着', 'Approx. 15 min walk to the start venue (Nagano Athletic Park)', 36.6586, 138.1932, NULL, 0, 1);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('nagano-marathon-2027', '観光地', '善光寺', 'Zenkoji Temple', '約1400年の歴史を持つ長野市を代表する寺院。コース上でも善光寺表参道を通過する。前泊して朝のお朝事（あさじ）に参加するランナーも多い。', 'A historic temple with approximately 1,400 years of history, representing Nagano City. The course passes through the Zenkoji approach road. Many runners who stay the night before participate in the early morning ceremony (Asaji).', 'スタート会場から約3km', 'https://www.zenkoji.jp/', 36.6613, 138.1861);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('nagano-marathon-2027', '温泉', '裾花峡天然温泉 うるおい館', 'Susobanakyo Onsen Uruoikan', '長野市街地から近い天然温泉施設。レース後のリカバリーに最適。露天風呂から渓谷の景色を楽しめる。', 'A natural hot spring facility close to Nagano city center. Perfect for post-race recovery. Enjoy views of the gorge from the outdoor bath.', '長野駅から車で約10分', NULL, 36.647, 138.16);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('nagano-marathon-2027', '温泉', '湯田中渋温泉郷', 'Yudanaka-Shibu Onsen', '長野駅から長野電鉄で約50分。歴史ある温泉街で、地獄谷野猿公苑（スノーモンキー）へのアクセス拠点でもある。レース翌日の観光に最適。', 'About 50 min from Nagano Station by Nagano Electric Railway. A historic hot spring town and gateway to Jigokudani Monkey Park (Snow Monkeys). Perfect for sightseeing the day after the race.', '長野駅から電車で約50分', NULL, 36.7444, 138.4219);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('nagano-marathon-2027', 'グルメ', '戸隠そば', 'Togakushi Soba', '長野を代表するグルメ。戸隠地区には多くのそば店が並ぶ。レース前のカーボローディングにもおすすめ。', 'A signature dish of Nagano. The Togakushi area is lined with soba noodle shops. Also recommended for carbo-loading before the race.', '長野市街地から車で約30分', NULL, 36.75, 138.07);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('nagano-marathon-2027', '観光地', '長野オリンピックミュージアム', 'Nagano Olympic Museum', '1998年長野冬季オリンピックの記録と記憶を展示する博物館。コースのゴール地点であるオリンピックスタジアムに隣接。', 'A museum exhibiting records and memories of the 1998 Nagano Winter Olympics. Adjacent to the Olympic Stadium, which is the finish point of the course.', 'フィニッシュ会場に隣接', NULL, 36.5982, 138.1814);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('nagano-marathon-2027', '["tshirt"]', '大会オリジナルTシャツ', 'Official race T-shirt', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('nagano-marathon-2027', '["towel","medal"]', 'フィニッシャータオル・完走メダル', 'Finisher towel and finisher medal', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('nagano-marathon-2027', NULL, '出走権付き宿泊パック', 'Entry with Accommodation Package', '2026-09-05', '2026-09-11', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('nagano-marathon-2027', NULL, '一般エントリー', 'General Entry', '2026-09-12', '2026-11-01', 14300, 1);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('nagano-marathon-2027', NULL, NULL, '善光寺表参道', 'Zenkoji approach road', NULL, NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('nagano-marathon-2027', NULL, NULL, 'エムウェーブ（2026年は工事のためコース変更あり）', 'M-Wave (course change in 2026 due to construction)', NULL, NULL, 1);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('nagano-marathon-2027', NULL, NULL, 'ビッグハット', 'Big Hat', NULL, NULL, 2);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('nagano-marathon-2027', NULL, NULL, '五輪大橋', 'Olympic Bridge', NULL, NULL, 3);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('nagano-marathon-2027', NULL, NULL, 'ホワイトリング', 'White Ring', NULL, NULL, 4);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('nagano-marathon-2027', NULL, NULL, '長野オリンピックスタジアム（フィニッシュ）', 'Nagano Olympic Stadium (finish)', NULL, NULL, 5);

-- ==================
-- 長崎ミュージックフェスマラソン (nagasaki-musicfes-marathon-2027)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'nagasaki-musicfes-marathon-2027';
DELETE FROM race_categories WHERE race_id = 'nagasaki-musicfes-marathon-2027';
DELETE FROM aid_stations WHERE race_id = 'nagasaki-musicfes-marathon-2027';
DELETE FROM checkpoints WHERE race_id = 'nagasaki-musicfes-marathon-2027';
DELETE FROM access_points WHERE race_id = 'nagasaki-musicfes-marathon-2027';
DELETE FROM nearby_spots WHERE race_id = 'nagasaki-musicfes-marathon-2027';
DELETE FROM weather_history WHERE race_id = 'nagasaki-musicfes-marathon-2027';
DELETE FROM participation_gifts WHERE race_id = 'nagasaki-musicfes-marathon-2027';
DELETE FROM completion_gifts WHERE race_id = 'nagasaki-musicfes-marathon-2027';
DELETE FROM race_entry_links WHERE race_id = 'nagasaki-musicfes-marathon-2027';
DELETE FROM race_entry_periods WHERE race_id = 'nagasaki-musicfes-marathon-2027';
DELETE FROM reception_sessions WHERE race_id = 'nagasaki-musicfes-marathon-2027';
DELETE FROM race_travel_times WHERE race_id = 'nagasaki-musicfes-marathon-2027';
DELETE FROM race_results WHERE race_id = 'nagasaki-musicfes-marathon-2027';
DELETE FROM race_gallery WHERE race_id = 'nagasaki-musicfes-marathon-2027';
DELETE FROM race_voices WHERE race_id = 'nagasaki-musicfes-marathon-2027';
DELETE FROM race_time_buckets WHERE race_id = 'nagasaki-musicfes-marathon-2027';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'nagasaki-musicfes-marathon-2027',
  '長崎ミュージックフェスマラソン',
  'Nagasaki Music Fes Marathon',
  '2027-01-31',
  '42',
  '諫早市',
  'Isahaya City',
  '「ランニングと音楽が紡ぐ、平和でかけがえのない一日」をコンセプトに開催される新設のフルマラソン。東京マラソン財団のプロデュースを受け、県内初の日本陸連公認フルマラソン大会を目標とする。',
  'A newly established full marathon under the concept ''A peaceful, irreplaceable day woven by running and music,'' produced with support from the Tokyo Marathon Foundation, aiming to be the prefecture''s first JAAF-certified full marathon.',
  'https://mf42195nagasaki.jp/',
  15000,
  1,
  10000,
  '2026-06-12',
  '2026-08-31',
  0,
  'pre_day',
  '受付日時：2027年1月30日(土)9:00〜20:00、受付会場：諫早市中央体育館(内村記念アリーナ)。アスリートビブス・計測チップ等を受け取る。大会当日(1月31日)の受付は行わない。',
  'Reception: January 30, 2027 (Sat) 9:00-20:00 at Isahaya City Central Gymnasium (Uchimura Memorial Arena), where athlete bibs and timing chips will be distributed. No reception will be held on race day (January 31).',
  '[]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  'トランスコスモススタジアム長崎を発着に、諫早湾干拓堤防道路の直線約7kmの海上区間を含む起伏の少ないコース。諫早平野や干拓地など長崎県特有の自然を望みながら走り、ゴール手前のアエル中央商店街では音楽と地域の応援でラストスパートを迎える。',
  'Starting and finishing at Trans Cosmos Stadium Nagasaki, the flat course includes an approximately 7km straight stretch along the Isahaya Bay reclamation seawall road, with views of the Isahaya plain and reclaimed land. Near the finish, runners pass through the Ael central shopping district for a music-fueled final push.',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'ランニングと音楽が紡ぐ、平和でかけがえのない一日',
  'A peaceful, irreplaceable day woven by running and music',
  NULL,
  NULL,
  NULL,
  'トランスコスモススタジアム長崎',
  'Trans Cosmos Stadium Nagasaki',
  NULL,
  NULL,
  NULL,
  '2026-08-25T00:00:00Z',
  '2026-08-31T13:36:45.940Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('nagasaki-musicfes-marathon-2027', 'full', 42.195, 0, '', 10000, 15000, NULL, 'マラソン（一般枠）', 'Marathon (General)', '海外在住者28,000円。ほかに長崎県民枠・ふるさと納税枠・ツアー枠・チャリティー枠あり', 'Overseas residents: ¥28,000. Additional frameworks: Nagasaki resident, furusato tax, tour, and charity entries', NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('nagasaki-musicfes-marathon-2027', 'other', 5.1, 0, '', 1000, 5500, 3500, 'ファンラン', 'Fun Run', '高校生3,500円', 'High school student: ¥3,500', NULL, NULL, NULL, '[]', 1);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('nagasaki-musicfes-marathon-2027', NULL, 'マラソン', 'Marathon', '2026-06-12', '2026-08-31', 15000, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('nagasaki-musicfes-marathon-2027', NULL, 'ファンラン', 'Fun Run', '2026-06-12', '2026-10-16', 5500, 1);

-- ==================
-- 名古屋ウィメンズマラソン (nagoya-womens-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'nagoya-womens-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'nagoya-womens-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'nagoya-womens-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'nagoya-womens-marathon-2026';
DELETE FROM access_points WHERE race_id = 'nagoya-womens-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'nagoya-womens-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'nagoya-womens-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'nagoya-womens-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'nagoya-womens-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'nagoya-womens-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'nagoya-womens-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'nagoya-womens-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'nagoya-womens-marathon-2026';
DELETE FROM race_results WHERE race_id = 'nagoya-womens-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'nagoya-womens-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'nagoya-womens-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'nagoya-womens-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'nagoya-womens-marathon-2026',
  '名古屋ウィメンズマラソン',
  'Nagoya Women''s Marathon',
  '2026-03-08',
  '23',
  '名古屋市',
  'Nagoya City',
  '世界最大の女性限定マラソン。完走者全員にティファニーのオリジナルペンダントが贈られる。MGCシリーズ女子G1大会。',
  'The world''s largest women-only marathon. All finishers receive an original Tiffany pendant. MGC Series Women''s G1 event.',
  'https://womens-marathon.nagoya',
  18000,
  0,
  22000,
  '2025-07-02',
  NULL,
  0,
  'pre_day',
  '',
  '',
  '["女性限定","大規模","日本陸連公認"]',
  NULL,
  0,
  0,
  0,
  'road',
  '["JAAF"]',
  '名古屋ドーム（バンテリンドーム ナゴヤ）、名古屋城付近',
  'Nagoya Dome (Vantelin Dome Nagoya), near Nagoya Castle',
  NULL,
  NULL,
  '名古屋城',
  '#c2410c',
  'Nagoya-jo',
  '女性ランナーの憧れ、名古屋の街を駆ける42km',
  'The women''s marathon destination — run through Nagoya',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-05-30T06:39:00.304Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('nagoya-womens-marathon-2026', 'full', 42.195, 420, '09:10', 20000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('nagoya-womens-marathon-2026', '観光地', '名古屋城', 'Nagoya Castle', '金のシャチホコで有名な名古屋のシンボル。コース上から望める。', 'Nagoya''s symbol, famous for its golden shachihoko (dolphin-like ornaments). Visible from the course.', 'コース付近', NULL, 35.1856, 136.8992);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('nagoya-womens-marathon-2026', 'グルメ', '名古屋めし', 'Nagoya Meshi', '味噌カツ、ひつまぶし、手羽先など名古屋名物が充実。レース後のご褒美に。', 'Miso katsu, hitsumabushi, chicken wings and more Nagoya specialties. A reward after the race.', '名古屋市内', NULL, 35.1709, 136.8815);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('nagoya-womens-marathon-2026', '["goods"]', 'ティファニー オリジナルペンダント（完走者全員）', 'Tiffany original pendant (all finishers)', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('nagoya-womens-marathon-2026', '["medal"]', 'ティファニー オリジナルペンダント（完走者全員）', 'Tiffany original pendant (all finishers)', NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('nagoya-womens-marathon-2026', NULL, NULL, '名古屋ドーム（バンテリンドーム ナゴヤ）', 'Nagoya Dome (Vantelin Dome Nagoya)', NULL, NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('nagoya-womens-marathon-2026', NULL, NULL, '名古屋城付近', 'near Nagoya Castle', NULL, NULL, 1);

-- ==================
-- 名古屋ウィメンズマラソン (nagoya-womens-marathon-2027)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'nagoya-womens-marathon-2027';
DELETE FROM race_categories WHERE race_id = 'nagoya-womens-marathon-2027';
DELETE FROM aid_stations WHERE race_id = 'nagoya-womens-marathon-2027';
DELETE FROM checkpoints WHERE race_id = 'nagoya-womens-marathon-2027';
DELETE FROM access_points WHERE race_id = 'nagoya-womens-marathon-2027';
DELETE FROM nearby_spots WHERE race_id = 'nagoya-womens-marathon-2027';
DELETE FROM weather_history WHERE race_id = 'nagoya-womens-marathon-2027';
DELETE FROM participation_gifts WHERE race_id = 'nagoya-womens-marathon-2027';
DELETE FROM completion_gifts WHERE race_id = 'nagoya-womens-marathon-2027';
DELETE FROM race_entry_links WHERE race_id = 'nagoya-womens-marathon-2027';
DELETE FROM race_entry_periods WHERE race_id = 'nagoya-womens-marathon-2027';
DELETE FROM reception_sessions WHERE race_id = 'nagoya-womens-marathon-2027';
DELETE FROM race_travel_times WHERE race_id = 'nagoya-womens-marathon-2027';
DELETE FROM race_results WHERE race_id = 'nagoya-womens-marathon-2027';
DELETE FROM race_gallery WHERE race_id = 'nagoya-womens-marathon-2027';
DELETE FROM race_voices WHERE race_id = 'nagoya-womens-marathon-2027';
DELETE FROM race_time_buckets WHERE race_id = 'nagoya-womens-marathon-2027';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'nagoya-womens-marathon-2027',
  '名古屋ウィメンズマラソン',
  'Nagoya Women''s Marathon',
  '2027-03-14',
  '23',
  '名古屋市',
  'Nagoya City',
  '世界最大の女性限定マラソン。完走者全員にティファニーのオリジナルペンダントが贈られる。MGCシリーズ女子G1大会。',
  'The world''s largest women-only marathon. All finishers receive an original Tiffany pendant. MGC Series Women''s G1 event.',
  'https://womens-marathon.nagoya',
  19000,
  0,
  23000,
  '2026-07-03',
  '2026-09-24',
  0,
  'pre_day',
  '',
  '',
  '["女性限定","大規模","日本陸連公認"]',
  NULL,
  0,
  0,
  0,
  'road',
  '["JAAF"]',
  '名古屋ドーム（バンテリンドーム ナゴヤ）、名古屋城付近',
  'Nagoya Dome (Vantelin Dome Nagoya), near Nagoya Castle',
  NULL,
  NULL,
  '名古屋城',
  '#c2410c',
  'Nagoya-jo',
  '女性ランナーの憧れ、名古屋の街を駆ける42km',
  'The women''s marathon destination — run through Nagoya',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '2026-08-31T13:37:53.674Z',
  '2026-08-31T13:37:53.674Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('nagoya-womens-marathon-2027', 'full', 42.195, 420, '09:10', 20000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('nagoya-womens-marathon-2027', '観光地', '名古屋城', 'Nagoya Castle', '金のシャチホコで有名な名古屋のシンボル。コース上から望める。', 'Nagoya''s symbol, famous for its golden shachihoko (dolphin-like ornaments). Visible from the course.', 'コース付近', NULL, 35.1856, 136.8992);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('nagoya-womens-marathon-2027', 'グルメ', '名古屋めし', 'Nagoya Meshi', '味噌カツ、ひつまぶし、手羽先など名古屋名物が充実。レース後のご褒美に。', 'Miso katsu, hitsumabushi, chicken wings and more Nagoya specialties. A reward after the race.', '名古屋市内', NULL, 35.1709, 136.8815);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('nagoya-womens-marathon-2027', '["goods"]', 'ティファニー オリジナルペンダント（完走者全員）', 'Tiffany original pendant (all finishers)', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('nagoya-womens-marathon-2027', '["medal"]', 'ティファニー オリジナルペンダント（完走者全員）', 'Tiffany original pendant (all finishers)', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('nagoya-womens-marathon-2027', NULL, 'チャレンジエントリー（NB GO WOMEN）', 'Challenge Entry (NB GO WOMEN)', '2026-07-03', '2026-07-12', 18000, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('nagoya-womens-marathon-2027', NULL, 'チャレンジエントリー（第1弾）', 'Challenge Entry (1st)', '2026-07-17', '2026-08-03', 18000, 1);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('nagoya-womens-marathon-2027', NULL, 'チャレンジエントリー（第2弾）', 'Challenge Entry (2nd)', '2026-08-06', '2026-08-31', 18000, 2);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('nagoya-womens-marathon-2027', NULL, 'U-30グループチャレンジ', 'U-30 Group Challenge', '2026-09-04', '2026-09-10', 9500, 3);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('nagoya-womens-marathon-2027', NULL, 'トラベルプランエントリー（第1弾）', 'Travel Plan Entry (1st)', '2026-08-10', '2026-08-24', 18000, 4);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('nagoya-womens-marathon-2027', NULL, 'トラベルプランエントリー（第2弾）', 'Travel Plan Entry (2nd)', '2026-08-25', '2026-09-06', 18000, 5);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('nagoya-womens-marathon-2027', NULL, 'チャリティーエントリー', 'Charity Entry', '2026-09-07', '2026-09-09', 23000, 6);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('nagoya-womens-marathon-2027', NULL, 'ハートサポートエントリー', 'Heart Support Entry', '2026-09-08', '2026-09-10', 18000, 7);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('nagoya-womens-marathon-2027', NULL, '一般エントリー', 'General Entry', '2026-09-17', '2026-09-24', 19000, 8);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('nagoya-womens-marathon-2027', NULL, 'エリートエントリー', 'Elite Entry', '2026-12-01', NULL, 19000, 9);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('nagoya-womens-marathon-2027', NULL, '海外エントリー（アーリー）', 'Overseas Entry (Early)', '2026-08-11', '2026-08-24', 24000, 10);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('nagoya-womens-marathon-2027', NULL, '海外エントリー（通常）', 'Overseas Entry (Regular)', '2026-08-25', '2026-09-23', 25000, 11);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('nagoya-womens-marathon-2027', NULL, NULL, '名古屋ドーム（バンテリンドーム ナゴヤ）', 'Nagoya Dome (Vantelin Dome Nagoya)', NULL, NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('nagoya-womens-marathon-2027', NULL, NULL, '名古屋城付近', 'near Nagoya Castle', NULL, NULL, 1);

-- ==================
-- NAHAマラソン (naha-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'naha-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'naha-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'naha-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'naha-marathon-2026';
DELETE FROM access_points WHERE race_id = 'naha-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'naha-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'naha-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'naha-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'naha-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'naha-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'naha-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'naha-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'naha-marathon-2026';
DELETE FROM race_results WHERE race_id = 'naha-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'naha-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'naha-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'naha-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'naha-marathon-2026',
  'NAHAマラソン',
  'NAHA Marathon',
  '2026-12-06',
  '47',
  '那覇市',
  'Naha City',
  '沖縄・那覇で開催される日本最南端の大規模フルマラソン。南国の温暖な気候で走れる12月の人気大会。制限時間6時間15分。',
  'Japan''s southernmost large-scale full marathon in Naha, Okinawa. A popular December race in the subtropical climate. 6 hour 15 min time limit.',
  'https://www.naha-marathon.jp',
  11000,
  1,
  30000,
  NULL,
  NULL,
  0,
  'both',
  '前日受付：12月5日（土）10:00〜20:00、県立武道館アリーナ棟。当日受付：6:00〜スタートまで、県立武道館',
  'Pre-race reception: Dec 5 (Sat) 10:00–20:00, Kenritsu Budokan Arena. Race-day reception: 6:00 until start, Kenritsu Budokan',
  '["大規模","沖縄","温暖"]',
  NULL,
  0,
  0,
  0,
  'road',
  '["JAAF"]',
  '平和祈念公園、那覇市街、沖縄南部の風景',
  'Peace Memorial Park, Naha city, Southern Okinawa scenery',
  NULL,
  NULL,
  'ハイビスカス',
  '#dc2626',
  'Haibisukasu',
  '南国の陽光と笑顔溢れる、那覇の42km',
  'Run through tropical Naha with sunshine and smiles',
  NULL,
  NULL,
  NULL,
  '奥武山陸上競技場',
  'Ounoyama Athletic Stadium',
  NULL,
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-07-27T14:24:47.686Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('naha-marathon-2026', 'full', 42.195, 375, '09:00', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  ('naha-marathon-2026', '奥武山公園駅', 'Onoyama Park Station', '', '徒歩約1分', 'approx. 1 min walk', 0, 0, 1, 1, 0);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  ('naha-marathon-2026', '壺川駅', 'Tsubogawa Station', '', '徒歩約1分', 'approx. 1 min walk', 0, 0, 1, 0, 1);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  ('naha-marathon-2026', '旭橋駅（那覇バスターミナル）', 'Asahibashi Station (Naha Bus Terminal)', '', '徒歩約10分', 'approx. 10 min walk', 0, 0, 10, 0, 2);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('naha-marathon-2026', '観光地', '首里城', 'Shuri Castle', '琉球王国の歴史を伝える世界遺産。復元工事が進む。コースからも比較的近い。', 'A World Heritage site conveying the history of the Ryukyu Kingdom. Restoration work in progress.', '那覇市街から車で約15分', NULL, 26.217, 127.7195);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('naha-marathon-2026', 'グルメ', '沖縄そば', 'Okinawa Soba', '沖縄を代表するご当地グルメ。あっさりとしたスープと太麺が特徴。レース後のエネルギー補給に。', 'Okinawa''s signature local dish. Characterized by light broth and thick noodles. Perfect for post-race energy.', '那覇市内各所', NULL, 26.3344, 127.7679);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('naha-marathon-2026', '["tshirt"]', '記念Tシャツ、アスリートビブス', 'Commemorative T-shirt, Athlete bib', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('naha-marathon-2026', '["medal"]', '完走記念メダル、完走証', 'Finisher medal, Finisher certificate', NULL, 0);

-- ==================
-- 奈良マラソン (nara-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'nara-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'nara-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'nara-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'nara-marathon-2026';
DELETE FROM access_points WHERE race_id = 'nara-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'nara-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'nara-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'nara-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'nara-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'nara-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'nara-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'nara-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'nara-marathon-2026';
DELETE FROM race_results WHERE race_id = 'nara-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'nara-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'nara-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'nara-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'nara-marathon-2026',
  '奈良マラソン',
  'Nara Marathon',
  '2026-12-13',
  '29',
  '奈良市',
  'Nara City',
  '世界遺産の古都・奈良を走るフルマラソン。東大寺、春日大社などの名所を巡る。アップダウンが多いが、運営の評価が非常に高い人気大会。',
  'A full marathon through the ancient World Heritage city of Nara. Pass Todai-ji, Kasuga Shrine, and more. Hilly course but highly rated operations.',
  'https://www.nara-marathon.jp',
  15000,
  0,
  11750,
  '2026-05-27',
  '2026-07-09',
  0,
  'pre_day',
  'ランナー受付は12月12日（土）10:00〜20:00のみ。受付をしないと出走できない。参加者認証コードを事前に準備して来場すること。',
  'Runner check-in is on Saturday, December 12 only (10:00–20:00). You cannot participate without completing check-in. Bring your participant authentication code.',
  '["世界遺産","観光","アップダウン多い","景色が良い"]',
  NULL,
  0,
  0,
  0,
  'road',
  '["JAAF"]',
  '東大寺、春日大社、平城宮跡、奈良公園',
  'Todai-ji, Kasuga Shrine, Heijo Palace ruins, Nara Park',
  'アップダウンが多い。坂道対策が必要。',
  'Many hills. Hill training recommended.',
  '奈良の鹿',
  '#92400e',
  'Nara-no-Shika',
  '奈良の鹿と世界遺産が待つ、古都の42km',
  'Run through the ancient capital of Nara alongside sacred deer',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-07-27T14:25:12.645Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('nara-marathon-2026', 'full', 42.195, 360, '', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('nara-marathon-2026', '観光地', '東大寺（大仏殿）', 'Todai-ji (Great Buddha Hall)', '世界最大級の木造建築物。コース上で大仏殿を望みながら走れる。鹿がコースを横切ることも。', 'One of the world''s largest wooden structures. Run with views of the Great Buddha Hall. Deer may cross the course.', 'コース上', NULL, 34.689, 135.8398);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('nara-marathon-2026', '温泉', 'ゆららの湯 奈良店', 'Yurara no Yu Nara', '奈良市内の日帰り温泉施設。レース後のリカバリーに便利。', 'A day-trip hot spring facility in Nara city. Convenient for post-race recovery.', '奈良市内', NULL, 34.6851, 135.8048);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('nara-marathon-2026', '["tshirt","socks"]', 'Tシャツ、ランニングソックス（2種類から選択）', 'T-shirt, Running socks (choose from 2 items)', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('nara-marathon-2026', '["medal"]', '完走メダル', 'Finisher medal', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('nara-marathon-2026', NULL, '奈良県民枠（マラソン種目のみ）', 'Nara Residents Only (Marathon)', '2026-05-27', '2026-06-04', 15000, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('nara-marathon-2026', NULL, '一般枠', 'General Entry', '2026-06-05', '2026-07-09', 15000, 1);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('nara-marathon-2026', NULL, NULL, '東大寺', 'Todai-ji', NULL, NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('nara-marathon-2026', NULL, NULL, '春日大社', 'Kasuga Shrine', NULL, NULL, 1);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('nara-marathon-2026', NULL, NULL, '平城宮跡', 'Heijo Palace ruins', NULL, NULL, 2);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('nara-marathon-2026', NULL, NULL, '奈良公園', 'Nara Park', NULL, NULL, 3);

-- ==================
-- 新潟シティマラソン (niigata-city-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'niigata-city-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'niigata-city-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'niigata-city-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'niigata-city-marathon-2026';
DELETE FROM access_points WHERE race_id = 'niigata-city-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'niigata-city-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'niigata-city-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'niigata-city-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'niigata-city-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'niigata-city-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'niigata-city-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'niigata-city-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'niigata-city-marathon-2026';
DELETE FROM race_results WHERE race_id = 'niigata-city-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'niigata-city-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'niigata-city-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'niigata-city-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'niigata-city-marathon-2026',
  '新潟シティマラソン',
  'NIIGATA CITY MARATHON',
  '2026-10-11',
  '15',
  '新潟県新潟市',
  'Niigata City, Niigata Prefecture',
  '',
  '',
  'https://runfes-niigata.com/',
  NULL,
  1,
  0,
  '2026-04-08',
  '2026-06-30',
  0,
  'pre_day',
  '',
  '',
  '[]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  '',
  '',
  '',
  '',
  '信濃川',
  '#0369a1',
  'Shinano-gawa',
  '日本一の大河・信濃川が流れる、米どころを走る',
  'Run along the Shinano River, Japan''s longest',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '2026-04-05T07:57:29.198Z',
  '2026-08-31T13:38:26.544Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('niigata-city-marathon-2026', 'full', 42.195, 420, '08:30', 9000, 12500, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('niigata-city-marathon-2026', '["bag","cap"]', '新潟が誇るアウトドアメーカー「キャプテンスタッグ」製の大会オリジナルグッズ2種類の中からお好きなグッズをお選びください。
A. オリジナルサコッシュ（幅25cm×高さ20cm、カラー：ブラック）
B. オリジナルランニングキャップ', 'Choose one of two original goods made by Niigata outdoor brand CAPTAIN STAG: A. Original sacoche (W25cm×H20cm, black), B. Original running cap', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('niigata-city-marathon-2026', '["towel","food"]', 'フィニッシャータオル 及び ジャンボおにぎり または パックごはん', 'Finisher towel and jumbo onigiri or packed rice', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('niigata-city-marathon-2026', NULL, '一般枠', 'General Entry', '2026-04-08', '2026-06-30', 12500, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('niigata-city-marathon-2026', NULL, 'ファンラン', 'Fun Run', '2026-04-08', '2026-05-19', NULL, 1);

-- ==================
-- にしおマラソン (nishio-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'nishio-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'nishio-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'nishio-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'nishio-marathon-2026';
DELETE FROM access_points WHERE race_id = 'nishio-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'nishio-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'nishio-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'nishio-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'nishio-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'nishio-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'nishio-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'nishio-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'nishio-marathon-2026';
DELETE FROM race_results WHERE race_id = 'nishio-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'nishio-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'nishio-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'nishio-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'nishio-marathon-2026',
  'にしおマラソン',
  'Nishio Marathon',
  '2026-01-18',
  '23',
  '西尾市',
  'Nishio City',
  '愛知県西尾市で開催されるフルマラソン。抹茶の産地として知られる西尾の街を駆け抜ける。',
  'A full marathon held in Nishio City, Aichi, known as a major matcha tea production area.',
  'https://nishio-marathon.jp',
  0,
  1,
  0,
  NULL,
  NULL,
  0,
  'pre_day',
  '',
  '',
  '[]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  '',
  '',
  NULL,
  NULL,
  '抹茶',
  '#4d7c0f',
  'Matcha',
  '日本有数の抹茶の産地・西尾を巡る42km',
  'Run through Nishio, one of Japan''s top matcha-producing cities',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-03-15T00:00:00Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('nishio-marathon-2026', 'full', 42.195, 390, '09:00', 6000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('nishio-marathon-2026', 'グルメ', '西尾の抹茶スイーツ', 'Nishio Matcha Sweets', '日本有数の抹茶産地・西尾ならではの抹茶グルメが充実。', 'Nishio, one of Japan''s top matcha producing areas, offers rich matcha cuisine.', '西尾市内', NULL, 34.8667, 137.0667);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('nishio-marathon-2026', '["tshirt","local_product"]', '大会Tシャツ、抹茶関連の特産品', 'Race T-shirt, Matcha-related local products', NULL, 0);

-- ==================
-- 青梅マラソン (ohme-marathon-2027)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'ohme-marathon-2027';
DELETE FROM race_categories WHERE race_id = 'ohme-marathon-2027';
DELETE FROM aid_stations WHERE race_id = 'ohme-marathon-2027';
DELETE FROM checkpoints WHERE race_id = 'ohme-marathon-2027';
DELETE FROM access_points WHERE race_id = 'ohme-marathon-2027';
DELETE FROM nearby_spots WHERE race_id = 'ohme-marathon-2027';
DELETE FROM weather_history WHERE race_id = 'ohme-marathon-2027';
DELETE FROM participation_gifts WHERE race_id = 'ohme-marathon-2027';
DELETE FROM completion_gifts WHERE race_id = 'ohme-marathon-2027';
DELETE FROM race_entry_links WHERE race_id = 'ohme-marathon-2027';
DELETE FROM race_entry_periods WHERE race_id = 'ohme-marathon-2027';
DELETE FROM reception_sessions WHERE race_id = 'ohme-marathon-2027';
DELETE FROM race_travel_times WHERE race_id = 'ohme-marathon-2027';
DELETE FROM race_results WHERE race_id = 'ohme-marathon-2027';
DELETE FROM race_gallery WHERE race_id = 'ohme-marathon-2027';
DELETE FROM race_voices WHERE race_id = 'ohme-marathon-2027';
DELETE FROM race_time_buckets WHERE race_id = 'ohme-marathon-2027';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'ohme-marathon-2027',
  '青梅マラソン',
  'Ohme Marathon',
  '2027-02-21',
  '13',
  '青梅市',
  'Ome City',
  '東京都青梅市で開催される日本陸上競技連盟公認の30km・10kmロードレース。半世紀以上続く歴史ある市民マラソン（2027年で第59回）。',
  'JAAF-certified 30km and 10km road race held in Ome City, Tokyo. A historic citizen marathon spanning over half a century, reaching its 59th edition in 2027.',
  'https://www.ohme-marathon.jp/',
  12000,
  1,
  16500,
  '2026-08-01',
  '2026-11-03',
  0,
  'race_day',
  '',
  '',
  '["東京","歴史ある大会"]',
  NULL,
  0,
  0,
  0,
  'road',
  '["JAAF"]',
  '奥多摩の玄関口・青梅市街を走る30km・10kmの2部構成。両コースとも日本陸上競技連盟公認',
  'Two-category race (30km/10km) through Ome City, gateway to the Okutama mountains. Both courses are JAAF-certified.',
  NULL,
  NULL,
  '梅',
  '#be123c',
  'Ume',
  '奥多摩の玄関口を駆ける、日本最古級の市民ロードレース',
  'Race through the gateway to Okutama in one of Japan''s oldest citizen road races',
  NULL,
  NULL,
  NULL,
  '住友金属鉱山アリーナ青梅（30kmフィニッシュ）',
  'Sumitomo Metal Mining Arena Ome (30km Finish)',
  NULL,
  NULL,
  NULL,
  '2026-08-31T14:52:20.077Z',
  '2026-08-31T14:52:20.077Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('ohme-marathon-2027', 'other', 30, 240, '11:30', 12500, 12000, NULL, '30kmの部', '30km Race', '満18歳以上対象。男女別・年代別（40歳未満／40歳代／50歳代／60歳以上）カテゴリーで表彰', 'For ages 18 and above. Awards by gender and age group (under 40 / 40s / 50s / 60+).', '満18歳以上', 'Age 18 and above', NULL, '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('ohme-marathon-2027', '10k', 10, 80, '09:30', 4000, 6000, NULL, '10kmの部', '10km Race', '高校生から70歳以上まで対象。高校生の参加費は3,000円', 'For high school students through ages 70+. High school entry fee is ¥3,000.', '高校生以上', 'High school age and above', NULL, '[]', 1);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('ohme-marathon-2027', NULL, '青梅市民優先枠', 'Ome Resident Priority Entry', '2026-08-01', '2026-08-12', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('ohme-marathon-2027', NULL, 'チャリティープレミアム枠', 'Charity Premium Entry', '2026-08-01', '2026-11-03', NULL, 1);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('ohme-marathon-2027', NULL, 'ふるさと納税枠', 'Hometown Tax Entry', '2026-08-01', '2026-11-03', NULL, 2);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('ohme-marathon-2027', NULL, '一般エントリー', 'General Entry', '2026-08-15', '2026-11-03', NULL, 3);

-- ==================
-- 大田原マラソン (ohtawara-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'ohtawara-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'ohtawara-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'ohtawara-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'ohtawara-marathon-2026';
DELETE FROM access_points WHERE race_id = 'ohtawara-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'ohtawara-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'ohtawara-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'ohtawara-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'ohtawara-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'ohtawara-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'ohtawara-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'ohtawara-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'ohtawara-marathon-2026';
DELETE FROM race_results WHERE race_id = 'ohtawara-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'ohtawara-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'ohtawara-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'ohtawara-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'ohtawara-marathon-2026',
  '大田原マラソン',
  'Ohtawara Marathon',
  '2026-11-23',
  '09',
  'DI STADIUM（美原公園陸上競技場）',
  '',
  '',
  '',
  'https://www.ohtawara-marathon.com/',
  NULL,
  1,
  4000,
  '2026-06-06',
  '2026-08-17',
  0,
  'pre_mail',
  '当日受付の必要はありません。
事前に送付（申込時の住所）するアスリートビブス、計測チップを装着し、号砲時刻20分前までにスタート地点に整列してください。',
  '',
  '[]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  '',
  '',
  '',
  '',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '2026-06-08T14:04:29.954Z',
  '2026-08-24T16:36:49.451Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('ohtawara-marathon-2026', NULL, 'マラソンの部エントリー', 'Marathon Entry', '2026-06-06', '2026-07-07', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('ohtawara-marathon-2026', NULL, '10kmの部エントリー', '10km Entry', '2026-06-06', '2026-08-17', NULL, 1);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('ohtawara-marathon-2026', NULL, 'ふるさと納税エントリー', 'Furusato Nozei Entry', '2026-06-06', '2026-08-08', NULL, 2);

-- ==================
-- おかやまマラソン (okayama-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'okayama-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'okayama-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'okayama-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'okayama-marathon-2026';
DELETE FROM access_points WHERE race_id = 'okayama-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'okayama-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'okayama-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'okayama-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'okayama-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'okayama-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'okayama-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'okayama-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'okayama-marathon-2026';
DELETE FROM race_results WHERE race_id = 'okayama-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'okayama-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'okayama-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'okayama-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'okayama-marathon-2026',
  'おかやまマラソン',
  'Okayama Marathon',
  '2026-11-08',
  '33',
  '岡山市',
  'Okayama City',
  '岡山城や後楽園を巡る岡山のフルマラソン。',
  'A full marathon in Okayama passing Okayama Castle and Korakuen Garden.',
  'https://www.okayamamarathon.jp',
  14000,
  1,
  15000,
  '2026-04-08',
  '2026-06-23',
  0,
  'pre_day',
  'LAWSON DO! SPORTS(ウェブ)
Loppi端末(ローソン・ミニストップ店頭)',
  '',
  '["城下町","観光"]',
  NULL,
  0,
  0,
  0,
  'road',
  '["JAAF"]',
  '岡山城、後楽園',
  'Okayama Castle, Korakuen Garden',
  NULL,
  NULL,
  '桃',
  '#f9a8d4',
  'Momo',
  '桃太郎の里・岡山を、晴れの国で走る',
  'Run through Okayama, the sunny land of Momotaro',
  NULL,
  NULL,
  NULL,
  '岡山県総合グラウンド',
  'Okayama Prefectural General Ground',
  '岡山県岡山市北区いずみ町2-1-1',
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-08-24T16:14:48.368Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('okayama-marathon-2026', 'full', 42.195, 360, '', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  ('okayama-marathon-2026', '岡山駅', 'Okayama Station', '', '西口から北へ約1.5km、徒歩約20分', 'About 1.5km north of the West Exit, approx. 20 min walk', 0, 0, 20, 1, 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('okayama-marathon-2026', '観光地', '後楽園', 'Korakuen Garden', '日本三名園の一つ。岡山城とセットで訪れたい。', 'One of Japan''s three most beautiful gardens. Visit together with Okayama Castle.', 'コース付近', NULL, 34.6694, 133.9356);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('okayama-marathon-2026', '["tshirt"]', '大会Tシャツ、完走メダル', 'Race T-shirt, Finisher medal', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('okayama-marathon-2026', '["medal"]', '大会Tシャツ、完走メダル', 'Race T-shirt, Finisher medal', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('okayama-marathon-2026', NULL, '岡山市民県民優先枠', 'Okayama Resident Priority Entry', '2026-04-08', '2026-04-15', 14000, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('okayama-marathon-2026', NULL, '一般枠', 'General Entry', '2026-04-16', '2026-05-18', 14000, 1);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('okayama-marathon-2026', NULL, 'ふるさと納税枠', 'Furusato Nozei Entry', '2026-04-17', '2026-06-23', 14000, 2);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('okayama-marathon-2026', NULL, NULL, '岡山城', 'Okayama Castle', NULL, NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('okayama-marathon-2026', NULL, NULL, '後楽園', 'Korakuen Garden', NULL, NULL, 1);

-- ==================
-- おきなわマラソン (okinawa-marathon-2027)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'okinawa-marathon-2027';
DELETE FROM race_categories WHERE race_id = 'okinawa-marathon-2027';
DELETE FROM aid_stations WHERE race_id = 'okinawa-marathon-2027';
DELETE FROM checkpoints WHERE race_id = 'okinawa-marathon-2027';
DELETE FROM access_points WHERE race_id = 'okinawa-marathon-2027';
DELETE FROM nearby_spots WHERE race_id = 'okinawa-marathon-2027';
DELETE FROM weather_history WHERE race_id = 'okinawa-marathon-2027';
DELETE FROM participation_gifts WHERE race_id = 'okinawa-marathon-2027';
DELETE FROM completion_gifts WHERE race_id = 'okinawa-marathon-2027';
DELETE FROM race_entry_links WHERE race_id = 'okinawa-marathon-2027';
DELETE FROM race_entry_periods WHERE race_id = 'okinawa-marathon-2027';
DELETE FROM reception_sessions WHERE race_id = 'okinawa-marathon-2027';
DELETE FROM race_travel_times WHERE race_id = 'okinawa-marathon-2027';
DELETE FROM race_results WHERE race_id = 'okinawa-marathon-2027';
DELETE FROM race_gallery WHERE race_id = 'okinawa-marathon-2027';
DELETE FROM race_voices WHERE race_id = 'okinawa-marathon-2027';
DELETE FROM race_time_buckets WHERE race_id = 'okinawa-marathon-2027';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'okinawa-marathon-2027',
  'おきなわマラソン',
  'Okinawa Marathon',
  '2027-02-21',
  '47',
  '沖縄市',
  'Okinawa City',
  '沖縄県沖縄市の沖縄県総合運動公園を発着点とするフルマラソン・10kmロードレース。日本陸上競技連盟公認コース。制限時間6時間15分。雨天決行。',
  'Full marathon and 10km road race starting and finishing at Okinawa Prefectural General Sports Park in Okinawa City. JAAF-certified course with a 6 hour 15 minute time limit. Held rain or shine.',
  'https://okinawa-marathon.com/',
  10000,
  1,
  16500,
  '2026-08-01',
  '2026-12-13',
  0,
  'pre_day',
  '10月31日までのエントリー者はスポーツデポ3店舗（1月29日〜2月14日）または大会前日受付（2月20日）でゼッケンを受け取り。有料500円で大会2〜3週間前の事前発送も選択可。11月1日以降のエントリー者・海外参加者は2月20日（土）9:00〜18:00の指定会場でのみ受け取り可。',
  'Entrants who registered by Oct 31 can pick up their bib at 3 Sports Depo stores (Jan 29 - Feb 14) or at pre-race reception on Feb 20. Optional paid (¥500) mail delivery 2-3 weeks before the race is also available. Entrants from Nov 1 onward and overseas participants can only pick up bibs at the designated venue on Feb 20 (Sat) 9:00-18:00.',
  '["沖縄","南国"]',
  NULL,
  0,
  0,
  0,
  'road',
  '["JAAF"]',
  '沖縄市の沖縄県総合運動公園を発着点とするコース。日本陸上競技連盟公認',
  'Course starts and finishes at Okinawa Prefectural General Sports Park in Okinawa City. JAAF-certified.',
  '前日の2月20日には別イベント「おきなわミニマラソン」（4.2195km）も開催される（本データの categories には含めていない）',
  'A separate "Okinawa Mini Marathon" (4.2195km) is also held the day before, Feb 20 (not included in this entry''s categories).',
  'シーサー',
  '#c2410c',
  'Shisa',
  '常夏の沖縄を駆け抜ける、太陽と海のフルマラソン',
  'Run across subtropical Okinawa under the sun and sea breeze',
  NULL,
  NULL,
  NULL,
  '沖縄県総合運動公園',
  'Okinawa Prefectural General Sports Park',
  '沖縄県沖縄市比屋根',
  NULL,
  NULL,
  '2026-08-31T14:52:20.077Z',
  '2026-08-31T14:52:20.077Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('okinawa-marathon-2027', 'full', 42.195, 375, '09:00', 13500, 10000, NULL, 'フルマラソン', 'Full Marathon', '一般10,000円（〜64歳）、高校生・65歳以上8,000円', 'General ¥10,000 (up to age 64); ¥8,000 for high school students and ages 65+', NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('okinawa-marathon-2027', '10k', 10, 80, '09:40', 3000, 6500, NULL, '10kmロードレース', '10km Road Race', '一般6,500円、高校生4,500円', 'General ¥6,500; ¥4,500 for high school students', NULL, NULL, NULL, '[]', 1);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('okinawa-marathon-2027', NULL, '一般エントリー（インターネット）', 'General Entry (Online)', '2026-08-01', '2026-12-13', 10000, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('okinawa-marathon-2027', NULL, 'ふるさと納税エントリー', 'Hometown Tax Entry', '2026-08-10', '2026-09-30', NULL, 1);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('okinawa-marathon-2027', NULL, '窓口受付エントリー', 'Counter Registration', '2026-08-01', '2026-11-27', NULL, 2);

-- ==================
-- 奥信濃100トレイルランニングレース (okushinano100-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'okushinano100-2026';
DELETE FROM race_categories WHERE race_id = 'okushinano100-2026';
DELETE FROM aid_stations WHERE race_id = 'okushinano100-2026';
DELETE FROM checkpoints WHERE race_id = 'okushinano100-2026';
DELETE FROM access_points WHERE race_id = 'okushinano100-2026';
DELETE FROM nearby_spots WHERE race_id = 'okushinano100-2026';
DELETE FROM weather_history WHERE race_id = 'okushinano100-2026';
DELETE FROM participation_gifts WHERE race_id = 'okushinano100-2026';
DELETE FROM completion_gifts WHERE race_id = 'okushinano100-2026';
DELETE FROM race_entry_links WHERE race_id = 'okushinano100-2026';
DELETE FROM race_entry_periods WHERE race_id = 'okushinano100-2026';
DELETE FROM reception_sessions WHERE race_id = 'okushinano100-2026';
DELETE FROM race_travel_times WHERE race_id = 'okushinano100-2026';
DELETE FROM race_results WHERE race_id = 'okushinano100-2026';
DELETE FROM race_gallery WHERE race_id = 'okushinano100-2026';
DELETE FROM race_voices WHERE race_id = 'okushinano100-2026';
DELETE FROM race_time_buckets WHERE race_id = 'okushinano100-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'okushinano100-2026',
  '奥信濃100トレイルランニングレース',
  'Okushinano 100 Trail Running Race',
  '2026-06-05',
  '20',
  '長野県飯山市・木島平村ほか',
  'Iiyama City / Kijimadaira Village, Nagano',
  '長野県奥信濃の豊かな自然の中を走るトレイルランニングレース。「たくさんの方に奥信濃の幸せなトレイルランニングを楽しんでほしい。トレイルランニングと奥信濃が100年続くように」という願いを込めた大会。100km・50km・25km・8kmの4種目。スタートはSBCホテル前（旧木島平スキー場）。',
  'A trail running race through the lush natural landscape of Okushinano in Nagano Prefecture. Four distances: 100km, 50km, 25km, and 8km. Start at the former Kijimadaira Ski Resort (SBC Hotel).',
  'https://okushinano100.com/',
  27500,
  1,
  700,
  '2025-12-14',
  '2026-05-10',
  0,
  'pre_day',
  '100km・50km：2025年12月14日〜2026年2月28日。25km・8km：2025年12月14日〜2026年5月10日。学割あり。',
  '100km/50km: Dec 14, 2025 – Feb 28, 2026. 25km/8km: Dec 14, 2025 – May 10, 2026. Student discounts available.',
  '["アップダウン多い","アルプス","ウルトラマラソン","初ウルトラおすすめ","景色が良い"]',
  NULL,
  0,
  0,
  4800,
  'trail',
  '[]',
  '奥信濃の山岳トレイル、木島平村〜飯山市周辺',
  'Mountain trails of Okushinano, Kijimadaira to Iiyama area',
  '3日間開催（6/5〜6/7）。登山道整備活動も実施。ITRA 4ポイント付与、Western States100 2026予選レース。',
  '3-day event (Jun 5–7). Trail maintenance activities also conducted. ITRA 4 points, Western States100 2026 Qualifying race.',
  '北アルプス',
  '#1e40af',
  'Kita-Arupusu',
  '北アルプスの麓・奥信濃を走る100km',
  '100km through the foothills of the Northern Alps',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '2026-03-30T00:00:00Z',
  '2026-06-29T14:15:52.190Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('okushinano100-2026', 'ultra', 100, 1260, '05:00', 700, 31000, NULL, NULL, NULL, NULL, NULL, '・各種目の規定年齢に達している方（100km／50km…18歳以上、25km…高校生以上、8km…中学生以上）※未成年者は保護者の承認が必要
・コースを迷うことなく制限時間内に完走できる自信がある方
　100km　21時間（※7箇所関門時間あり）
　50km　10時間30分（※3箇所関門時間あり）
　25km　5時間30分（※1箇所関門時間あり）
　8km　2時間（※関門時間なし）
・山のルール・マナーを遵守できる方', '・Participants must meet the age requirements for each event (100km/50km: 18 years or older; 25km: high school students or older; 8km: middle school students or older). *Minors must have parental consent.
・Participants who are confident they can complete the course without getting lost and within the time limit
　100km: 21 hours (*7 checkpoints with time limits)
　50km: 10 hours 30 minutes (*3 checkpoints with time limits)
　25km: 5 hours 30 minutes (*1 checkpoint with a time limit)
　8km: 2 hours (*No checkpoints with time limits)
・Participants who can adhere to mountain rules and etiquette


Translated with DeepL.com (free version)', 'okushinano100-2026', '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('okushinano100-2026', 'other', 50, 630, '11:30', 400, 15500, NULL, '50km', NULL, NULL, NULL, NULL, NULL, 'okushinano50-2026.gpx', '[]', 1);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('okushinano100-2026', 'other', 25, 420, '07:00', 300, 9900, NULL, '25km', NULL, NULL, NULL, NULL, NULL, 'okushinano25-2026.gpx', '[]', 2);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('okushinano100-2026', 'other', 8, 120, '07:30', 300, 5000, NULL, '8km', NULL, NULL, NULL, NULL, NULL, 'okushinano8-2026.gpx', '[]', 3);
INSERT OR REPLACE INTO race_entry_links (race_id, site_name, url, sort_order) VALUES
  ('okushinano100-2026', 'SPORT ENTRY', 'https://www.sportsentry.ne.jp/event/t/103253', 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('okushinano100-2026', NULL, '100km', '100km', '2025-12-14', '2026-02-28', 27500, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('okushinano100-2026', NULL, '50km', '50km', '2025-12-14', '2026-02-28', 13200, 1);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('okushinano100-2026', NULL, '25km', '25km', '2025-12-14', '2026-05-10', 8800, 2);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('okushinano100-2026', NULL, '8km', '8km', '2025-12-14', '2026-05-10', 0, 3);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('okushinano100-2026', NULL, 'キッズ（小学生・未就学児）', 'Kids (Elementary & Preschool)', '2025-12-14', '2026-05-10', 2200, 4);

-- ==================
-- 大阪マラソン (osaka-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'osaka-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'osaka-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'osaka-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'osaka-marathon-2026';
DELETE FROM access_points WHERE race_id = 'osaka-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'osaka-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'osaka-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'osaka-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'osaka-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'osaka-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'osaka-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'osaka-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'osaka-marathon-2026';
DELETE FROM race_results WHERE race_id = 'osaka-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'osaka-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'osaka-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'osaka-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'osaka-marathon-2026',
  '大阪マラソン',
  'Osaka Marathon',
  '2026-02-22',
  '27',
  '大阪市',
  'Osaka City',
  '大阪の名所を巡る大規模都市型マラソン。大阪城、通天閣、御堂筋などを走る。MGCシリーズG1大会。制限時間7時間。',
  'A large-scale urban marathon touring Osaka''s landmarks including Osaka Castle, Tsutenkaku, and Midosuji. MGC Series G1 event. 7-hour time limit.',
  'https://www.osaka-marathon.com',
  NULL,
  0,
  34000,
  '2025-07-30',
  '2025-08-29',
  0,
  'pre_day',
  'EXPO会場にて前日受付',
  'Pre-race registration at EXPO venue',
  '["大規模","初心者おすすめ","観光","日本陸連公認"]',
  NULL,
  0,
  0,
  0,
  'road',
  '["JAAF"]',
  '大阪城、御堂筋、通天閣、中之島',
  'Osaka Castle, Midosuji, Tsutenkaku, Nakanoshima',
  NULL,
  NULL,
  '大阪城',
  '#92400e',
  'Osaka-jo',
  '笑いと活気溢れる、天下の台所・大阪を走る',
  'Run through Osaka, the nation''s kitchen of energy',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-05-30T06:40:23.729Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('osaka-marathon-2026', 'full', 42.195, 420, '09:15', 31970, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('osaka-marathon-2026', '観光地', '大阪城', 'Osaka Castle', 'コース上を通過する大阪のシンボル。天守閣からの眺望は壮観。', 'The symbol of Osaka on the course. The view from the castle tower is magnificent.', 'コース上（約8km地点）', NULL, 35.6586, 135.5261);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('osaka-marathon-2026', 'グルメ', '道頓堀', 'Dotonbori', '大阪グルメの中心地。たこ焼き、お好み焼きなど大阪名物が集結。レース後の食べ歩きに最適。', 'The heart of Osaka''s food culture. Takoyaki, okonomiyaki, and more. Perfect for post-race food tours.', 'コース付近', NULL, 35.6595, 135.5023);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('osaka-marathon-2026', '温泉', 'スパワールド世界の大温泉', 'Spa World', '通天閣近くの大型温泉施設。レース後のリカバリーに。コースの近くにあり便利。', 'A large hot spring facility near Tsutenkaku. Convenient for post-race recovery, located near the course.', '通天閣付近', NULL, 34.6522, 135.5064);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('osaka-marathon-2026', '["tshirt","towel"]', '参加記念Tシャツ、完走メダル、フィニッシャータオル', 'Commemorative T-shirt, Finisher medal, Finisher towel', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('osaka-marathon-2026', '["medal"]', '参加記念Tシャツ、完走メダル、フィニッシャータオル', 'Commemorative T-shirt, Finisher medal, Finisher towel', NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('osaka-marathon-2026', NULL, NULL, '大阪城', 'Osaka Castle', NULL, NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('osaka-marathon-2026', NULL, NULL, '御堂筋', 'Midosuji', NULL, NULL, 1);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('osaka-marathon-2026', NULL, NULL, '通天閣', 'Tsutenkaku', NULL, NULL, 2);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('osaka-marathon-2026', NULL, NULL, '中之島', 'Nakanoshima', NULL, NULL, 3);

-- ==================
-- 大阪・淀川市民マラソン (osaka-yodo-river-citizens-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'osaka-yodo-river-citizens-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'osaka-yodo-river-citizens-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'osaka-yodo-river-citizens-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'osaka-yodo-river-citizens-marathon-2026';
DELETE FROM access_points WHERE race_id = 'osaka-yodo-river-citizens-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'osaka-yodo-river-citizens-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'osaka-yodo-river-citizens-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'osaka-yodo-river-citizens-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'osaka-yodo-river-citizens-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'osaka-yodo-river-citizens-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'osaka-yodo-river-citizens-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'osaka-yodo-river-citizens-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'osaka-yodo-river-citizens-marathon-2026';
DELETE FROM race_results WHERE race_id = 'osaka-yodo-river-citizens-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'osaka-yodo-river-citizens-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'osaka-yodo-river-citizens-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'osaka-yodo-river-citizens-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'osaka-yodo-river-citizens-marathon-2026',
  '大阪・淀川市民マラソン',
  'Osaka Yodo-River Citizens Marathon',
  '2026-11-01',
  '27',
  '大阪府大阪市旭区太子橋３丁目１６−１６',
  '16-16, 3-chome, Taishibashi, Asahi Ward, Osaka City, Osaka Prefecture',
  '大阪・淀川市民マラソンは、市民の参加および完走する事に意義を求め、市民自らがつくりあげる市民参加型のマラソン大会として1997年にスタートしました。
このマラソンは老若男女を問わず、勝つ事、速く走る事を主目的とせず、誰もが気軽に楽しめるマラソンで、日本で初めての市民による手作りの市民マラソンであると同時に、河川敷のみを走る日本で最初のマラソンでもあります。

コースである淀川河川公園を走る事により淀川流域の自然環境を見直し、ランナーの健康と走る環境を考えたエコマラソンを目指しています。
人間・環境・淀川…など、従来のマラソンにはあまりなかったキーワードを元に開催される、当マラソン大会を楽しんで頂ける事をスタッフ一同心より願っております。',
  'The Osaka Yodogawa Citizens’ Marathon began in 1997 as a community-driven event created by the citizens themselves, with the primary purpose of encouraging public participation and the joy of finishing the race.
This marathon is open to people of all ages and genders; it does not prioritize winning or running fast, but rather aims to be an event that anyone can enjoy casually. It is not only Japan’s first citizen-organized, community-driven marathon but also the first marathon in Japan to run exclusively along the riverbank.

By running through the Yodogawa River Park, which serves as the course, we aim to raise awareness of the natural environment of the Yodogawa River basin and create an eco-marathon that prioritizes both runners’ health and the running environment.
Based on themes such as “people,” “environment,” and “the Yodogawa River”—concepts rarely emphasized in traditional marathons—the entire staff sincerely hopes you will enjoy this event.',
  'https://www.osaka42195.com/',
  NULL,
  1,
  0,
  '2026-04-17',
  '2026-09-27',
  0,
  'pre_mail',
  '日本国内在住の方（RUNNET／ローソン DO! SPORTS）には、アスリートビブス・参加賞引換券等をお申し込み時の住所へ事前送付。海外在住の方（Run Japan）への事前送付はなし。大会当日、各種目スタート1時間前までに会場内の赤いテント「HELP DESK」でアスリートビブス等を受け取り。',
  'Domestic entrants (RUNNET / LAWSON DO! SPORTS) will receive their athlete bib and participation gift voucher by mail in advance. Overseas entrants (Run Japan) will not receive advance mailing; please collect your bib etc. at the red "HELP DESK" tent on-site by one hour before your event''s start time on race day.',
  '[]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  '淀川河川公園の河川敷のみを走るフラットコース。通常は通行できない淀川大堰を渡れる特徴がある。フルマラソン9:00・ハーフマラソン8:30・10km 13:00スタート。給水所7地点、救護所4地点設置。',
  'A flat course running entirely along the Yodo River riverbank park. Runners can cross the Yodo River Weir, normally closed to the public. Full marathon starts at 9:00, half at 8:30, 10km at 13:00. 7 water stations and 4 first-aid stations.',
  '救護所設置予定地点：スタート・ゴール地点、赤川地区、西中島地区、塚本地区。',
  'Planned first-aid station locations: Start/Finish area, Akagawa district, Nishinakajima district, and Tsukamoto district.',
  '淀川',
  '#0284c7',
  'Yodogawa',
  '淀川の流れに沿って、大阪の街を走る',
  'Run along the Yodo River through Osaka',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '2026-04-11T14:42:59.225Z',
  '2026-08-24T16:37:37.008Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('osaka-yodo-river-citizens-marathon-2026', 'full', 42.195, 480, '09:00', 4000, 9800, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('osaka-yodo-river-citizens-marathon-2026', 'half', 21, 240, '08:30', 4000, 8300, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 1);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('osaka-yodo-river-citizens-marathon-2026', '10k', 10, 120, '13:00', 2000, 4900, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 2);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('osaka-yodo-river-citizens-marathon-2026', '["tshirt","towel"]', '【フル・ハーフ】
参加賞：Ｔシャツ（フリーサイズ）
完走証：タオル
【10km】
参加賞：タオル', '[Full / Half]
Participation gift: T-shirt (free size)
Finisher certificate: Towel
[10km]
Participation gift: Towel', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('osaka-yodo-river-citizens-marathon-2026', NULL, '一般エントリー', 'General Entry', '2026-04-17', '2026-09-27', NULL, 0);

-- ==================
-- OSJ ONTAKE100 (osj-ontake100-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'osj-ontake100-2026';
DELETE FROM race_categories WHERE race_id = 'osj-ontake100-2026';
DELETE FROM aid_stations WHERE race_id = 'osj-ontake100-2026';
DELETE FROM checkpoints WHERE race_id = 'osj-ontake100-2026';
DELETE FROM access_points WHERE race_id = 'osj-ontake100-2026';
DELETE FROM nearby_spots WHERE race_id = 'osj-ontake100-2026';
DELETE FROM weather_history WHERE race_id = 'osj-ontake100-2026';
DELETE FROM participation_gifts WHERE race_id = 'osj-ontake100-2026';
DELETE FROM completion_gifts WHERE race_id = 'osj-ontake100-2026';
DELETE FROM race_entry_links WHERE race_id = 'osj-ontake100-2026';
DELETE FROM race_entry_periods WHERE race_id = 'osj-ontake100-2026';
DELETE FROM reception_sessions WHERE race_id = 'osj-ontake100-2026';
DELETE FROM race_travel_times WHERE race_id = 'osj-ontake100-2026';
DELETE FROM race_results WHERE race_id = 'osj-ontake100-2026';
DELETE FROM race_gallery WHERE race_id = 'osj-ontake100-2026';
DELETE FROM race_voices WHERE race_id = 'osj-ontake100-2026';
DELETE FROM race_time_buckets WHERE race_id = 'osj-ontake100-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'osj-ontake100-2026',
  'OSJ ONTAKE100',
  'OSJ ONTAKE100',
  '2026-07-18',
  '20',
  '長野県木曽郡王滝村',
  'Otaki Village, Kiso District, Nagano',
  '御嶽山（標高3,067m）麓の通常立入禁止の国有林を特別開放して行われる夜間スタートのロングレース。100Kと100マイルの2種目。深い森と御嶽山の雄大な景色の中を走る。「フィニッシュの感動は格別」と称されるOSJが誇るロングレースシリーズの一戦。',
  'A night-start long race through special-access national forest at the foot of Mt. Ontake (3,067m). Two distances: 100K and 100 Miles. Run through deep forest with majestic views of Mt. Ontake. Part of OSJ''s premier long-race series, renowned for an exceptional finish experience.',
  'https://www.outdoorsportsjapan.com/trail/ontake100/',
  19000,
  1,
  1400,
  '2025-11-14',
  '2026-06-14',
  0,
  'pre_day',
  '選手受付：7月18日(土) 13:00〜19:00（松原スポーツ公園）',
  'Athlete check-in: Jul 18 (Sat) 13:00–19:00 (Matsubara Sports Park)',
  '["ウルトラマラソン","アップダウン多い","景色が良い","歴史ある大会","火山"]',
  NULL,
  0,
  0,
  0,
  'trail',
  '[]',
  '御嶽山麓国有林、特別開放区域',
  'National forest at Mt. Ontake base, specially opened restricted area',
  '100マイル：7/18(土)20:00スタート。100K：7/19(日)0:00スタート。',
  '100 Mile: Jul 18 (Sat) 20:00 start. 100K: Jul 19 (Sun) 00:00 start.',
  '御嶽山',
  '#1c1917',
  'Ontake-san',
  '霊峰・御嶽山の麓を巡る、100kmの山岳路',
  '100km through the sacred slopes of Mt. Ontake',
  NULL,
  NULL,
  NULL,
  '松原スポーツ公園',
  'Matsubara Sports Park',
  '長野県木曽郡王滝村',
  NULL,
  NULL,
  '2026-03-30T00:00:00Z',
  '2026-07-27T14:29:48.574Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('osj-ontake100-2026', 'ultra', 163, 1440, '20:00', 200, 21000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('osj-ontake100-2026', 'ultra', 109, 1200, '00:00', 1200, 19000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 1);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  ('osj-ontake100-2026', '木曽福島駅', 'Kiso-Fukushima Station', '', '無料シャトルバスで約40分', 'Free shuttle bus, approx. 40 min', 0, 0, NULL, 1, 0);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('osj-ontake100-2026', '["tshirt"]', 'オリジナルTシャツ（有料オプション、+1,500円）', 'Original T-shirt (paid option, +¥1,500)', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('osj-ontake100-2026', NULL, '一般エントリー', 'General Entry', '2025-11-14', '2025-12-12', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('osj-ontake100-2026', NULL, 'OSJ ONTAKE50ロング完走者エントリー', 'OSJ ONTAKE50 Long Finisher Entry', '2025-11-14', '2025-12-31', NULL, 1);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('osj-ontake100-2026', NULL, 'パワースポーツ感謝祭枠', 'Power Sports Festival Entry', '2025-12-18', '2025-12-20', NULL, 2);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('osj-ontake100-2026', NULL, '追加エントリー', 'Additional Entry', '2026-02-01', '2026-06-14', NULL, 3);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('osj-ontake100-2026', NULL, NULL, '御嶽山麓国有林', 'National forest at Mt. Ontake base', NULL, NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('osj-ontake100-2026', NULL, NULL, '特別開放区域', 'specially opened restricted area', NULL, NULL, 1);

-- ==================
-- 佐渡トキマラソン (sado-toki-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'sado-toki-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'sado-toki-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'sado-toki-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'sado-toki-marathon-2026';
DELETE FROM access_points WHERE race_id = 'sado-toki-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'sado-toki-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'sado-toki-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'sado-toki-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'sado-toki-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'sado-toki-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'sado-toki-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'sado-toki-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'sado-toki-marathon-2026';
DELETE FROM race_results WHERE race_id = 'sado-toki-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'sado-toki-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'sado-toki-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'sado-toki-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'sado-toki-marathon-2026',
  '佐渡トキマラソン',
  'Sado Toki Marathon',
  '2026-04-26',
  '15',
  '佐渡市',
  'Sado City',
  '佐渡島で開催されるフルマラソン。自然豊かな離島を走る。トキをモチーフにした大会。',
  'A full marathon on Sado Island. Run through the nature-rich island. The race features the crested ibis (toki) as its motif.',
  'https://www.scsf.jp/marathon/index.html',
  NULL,
  1,
  0,
  '2025-12-01',
  '2026-03-22',
  0,
  'pre_mail',
  '',
  '',
  '["景色が良い","離島"]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  '佐渡島の自然',
  'Nature of Sado Island',
  NULL,
  NULL,
  '朱鷺',
  '#fb7185',
  'Toki',
  '朱鷺舞う離島・佐渡で走る、自然豊かな42km',
  'Run the island of Sado where the endangered crested ibis soars',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-03-15T00:00:00Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('sado-toki-marathon-2026', 'full', 42.195, 0, '', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('sado-toki-marathon-2026', '観光地', '佐渡金山', 'Sado Kinzan Gold Mine', '世界遺産登録された佐渡金山。江戸時代の金採掘の歴史を学べる。', 'The World Heritage Sado Gold Mine. Learn about Edo-period gold mining history.', '佐渡島内', NULL, 38.0667, 138.2333);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('sado-toki-marathon-2026', '観光地', 'トキの森公園', 'Toki no Mori Park', '国の特別天然記念物トキを間近で観察できる施設。大会のモチーフであるトキに会える。', 'A facility to observe the crested ibis, a national special natural monument, up close.', '佐渡島内', NULL, 38.0333, 138.3667);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('sado-toki-marathon-2026', '["tshirt","local_product"]', '大会Tシャツ、完走メダル、佐渡の特産品', 'Race T-shirt, Finisher medal, Sado Island local products', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('sado-toki-marathon-2026', '["medal"]', '大会Tシャツ、完走メダル、佐渡の特産品', 'Race T-shirt, Finisher medal, Sado Island local products', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('sado-toki-marathon-2026', NULL, '一般エントリー', 'General Entry', '2025-12-01', '2026-03-22', NULL, 0);

-- ==================
-- さが桜マラソン (saga-sakura-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'saga-sakura-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'saga-sakura-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'saga-sakura-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'saga-sakura-marathon-2026';
DELETE FROM access_points WHERE race_id = 'saga-sakura-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'saga-sakura-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'saga-sakura-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'saga-sakura-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'saga-sakura-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'saga-sakura-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'saga-sakura-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'saga-sakura-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'saga-sakura-marathon-2026';
DELETE FROM race_results WHERE race_id = 'saga-sakura-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'saga-sakura-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'saga-sakura-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'saga-sakura-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'saga-sakura-marathon-2026',
  'さが桜マラソン',
  'Saga Sakura Marathon',
  '2026-03-22',
  '41',
  '佐賀市',
  'Saga City',
  '桜の季節に開催される佐賀のフルマラソン。佐賀平野を駆け抜ける。',
  'A full marathon in Saga during cherry blossom season. Run across the Saga Plain.',
  'https://sagasakura-marathon.jp',
  14500,
  0,
  8500,
  '2025-10-01',
  '2025-10-21',
  0,
  'race_day',
  '',
  '',
  '["桜"]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  '桜並木、佐賀平野',
  'Cherry blossom trees, Saga Plain',
  NULL,
  NULL,
  '桜',
  '#f9c1cc',
  'Sakura',
  '佐賀城址の桜を愛でながら走る、春の42km',
  'Run beneath cherry blossoms at Saga Castle in spring',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-05-30T06:40:53.342Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('saga-sakura-marathon-2026', 'full', 42.195, 0, '', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('saga-sakura-marathon-2026', '観光地', '吉野ヶ里遺跡', 'Yoshinogari Ruins', '弥生時代の大規模環濠集落遺跡。国の特別史跡。佐賀市から近い。', 'A large-scale Yayoi period moated settlement. National Special Historic Site. Close to Saga city.', '佐賀市から車約20分', NULL, 33.3167, 130.3833);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('saga-sakura-marathon-2026', '["tshirt"]', '大会Tシャツ、完走メダル', 'Race T-shirt, Finisher medal', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('saga-sakura-marathon-2026', '["medal"]', '大会Tシャツ、完走メダル', 'Race T-shirt, Finisher medal', NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('saga-sakura-marathon-2026', NULL, NULL, '桜並木', 'Cherry blossom trees', NULL, NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('saga-sakura-marathon-2026', NULL, NULL, '佐賀平野', 'Saga Plain', NULL, NULL, 1);

-- ==================
-- さが桜マラソン (saga-sakura-marathon-2027)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'saga-sakura-marathon-2027';
DELETE FROM race_categories WHERE race_id = 'saga-sakura-marathon-2027';
DELETE FROM aid_stations WHERE race_id = 'saga-sakura-marathon-2027';
DELETE FROM checkpoints WHERE race_id = 'saga-sakura-marathon-2027';
DELETE FROM access_points WHERE race_id = 'saga-sakura-marathon-2027';
DELETE FROM nearby_spots WHERE race_id = 'saga-sakura-marathon-2027';
DELETE FROM weather_history WHERE race_id = 'saga-sakura-marathon-2027';
DELETE FROM participation_gifts WHERE race_id = 'saga-sakura-marathon-2027';
DELETE FROM completion_gifts WHERE race_id = 'saga-sakura-marathon-2027';
DELETE FROM race_entry_links WHERE race_id = 'saga-sakura-marathon-2027';
DELETE FROM race_entry_periods WHERE race_id = 'saga-sakura-marathon-2027';
DELETE FROM reception_sessions WHERE race_id = 'saga-sakura-marathon-2027';
DELETE FROM race_travel_times WHERE race_id = 'saga-sakura-marathon-2027';
DELETE FROM race_results WHERE race_id = 'saga-sakura-marathon-2027';
DELETE FROM race_gallery WHERE race_id = 'saga-sakura-marathon-2027';
DELETE FROM race_voices WHERE race_id = 'saga-sakura-marathon-2027';
DELETE FROM race_time_buckets WHERE race_id = 'saga-sakura-marathon-2027';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'saga-sakura-marathon-2027',
  'さが桜マラソン',
  'Saga Sakura Marathon',
  '2027-03-21',
  '41',
  '佐賀市',
  'Saga City',
  '桜の季節に開催される佐賀のフルマラソン。佐賀平野を駆け抜ける。',
  'A full marathon in Saga during cherry blossom season. Run across the Saga Plain.',
  'https://sagasakura-marathon.jp',
  14500,
  0,
  8500,
  '2026-10-01',
  '2026-10-21',
  0,
  'pre_mail',
  '会場での選手受付はありません（海外在住者を除く）。アスリートビブス・計測チップ・参加賞Tシャツ等を事前に発送します（2027年2月下旬予定、ファンランは計測チップなし）。エントリー時の住所に発送するため、エントリー後の住所変更は必ずエントリーセンターへご連絡ください。当日アスリートビブス・計測チップを忘れると出走できません（ヘルプデスクにて有料で再発行可能）。',
  'No on-site runner reception (except overseas residents). Athlete bibs, timing chips, and participation gift T-shirts etc. will be shipped in advance (planned late Feb 2027; Fun Run entrants receive no timing chip). Items are shipped to your entry address, so any address change after entry must be reported to the Entry Center. Forgetting your bib/chip on race day means you cannot start (paid re-issue available at the help desk).',
  '["桜"]',
  NULL,
  0,
  0,
  10,
  'road',
  '["JAAF"]',
  '桜並木、佐賀平野',
  'Cherry blossom trees, Saga Plain',
  NULL,
  NULL,
  '桜',
  '#f9c1cc',
  'Sakura',
  '佐賀城址の桜を愛でながら走る、春の42km',
  'Run beneath cherry blossoms at Saga Castle in spring',
  NULL,
  NULL,
  NULL,
  'SAGAサンライズパーク',
  'SAGA Sunrise Park',
  NULL,
  NULL,
  NULL,
  '2026-08-24T16:15:46.106Z',
  '2026-08-24T16:38:10.166Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('saga-sakura-marathon-2027', 'full', 42.195, 390, '09:00', 8500, 14500, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('saga-sakura-marathon-2027', '10k', 10, 0, '', 1500, 6000, NULL, 'ファンラン', 'Fun Run', NULL, NULL, NULL, NULL, NULL, '[]', 1);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('saga-sakura-marathon-2027', 'other', 1.5, 0, '', 120, NULL, NULL, '親子ペアラン', 'Parent-Child Pair Run', '中学生以下とその保護者がペアで参加。定員60組120名予定。', 'For pairs of a middle-school-age or younger child and their guardian. Capacity: approx. 60 pairs (120 people).', NULL, NULL, NULL, '[]', 2);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('saga-sakura-marathon-2027', '観光地', '吉野ヶ里遺跡', 'Yoshinogari Ruins', '弥生時代の大規模環濠集落遺跡。国の特別史跡。佐賀市から近い。', 'A large-scale Yayoi period moated settlement. National Special Historic Site. Close to Saga city.', '佐賀市から車約20分', NULL, 33.3167, 130.3833);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('saga-sakura-marathon-2027', '["tshirt"]', '大会オリジナルTシャツ（選択制）', 'Original event T-shirt (selectable)', NULL, 0);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('saga-sakura-marathon-2027', '["local_product"]', '特産品：新撰佐賀のり焼きのり6枚（選択制）', 'Local specialty: Saga roasted nori seaweed, 6 sheets (selectable)', NULL, 1);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('saga-sakura-marathon-2027', '["medal"]', '完走メダル', 'Finisher medal', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('saga-sakura-marathon-2027', NULL, 'マラソン', 'Marathon', '2026-10-01', '2026-10-21', 14500, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('saga-sakura-marathon-2027', NULL, 'ファンラン', 'Fun Run', '2026-10-01', '2026-10-21', 6000, 1);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('saga-sakura-marathon-2027', NULL, NULL, '桜並木', 'Cherry blossom trees', NULL, NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('saga-sakura-marathon-2027', NULL, NULL, '佐賀平野', 'Saga Plain', NULL, NULL, 1);

-- ==================
-- さいたまマラソン (saitama-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'saitama-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'saitama-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'saitama-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'saitama-marathon-2026';
DELETE FROM access_points WHERE race_id = 'saitama-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'saitama-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'saitama-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'saitama-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'saitama-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'saitama-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'saitama-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'saitama-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'saitama-marathon-2026';
DELETE FROM race_results WHERE race_id = 'saitama-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'saitama-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'saitama-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'saitama-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'saitama-marathon-2026',
  'さいたまマラソン',
  'Saitama Marathon',
  '2026-02-08',
  '11',
  'さいたま市',
  'Saitama City',
  'さいたま市で開催されるフルマラソン。2026年大会は積雪のため中止。',
  'A full marathon in Saitama City. The 2026 edition was cancelled due to heavy snow.',
  'https://saitama-marathon.jp',
  0,
  1,
  0,
  NULL,
  NULL,
  0,
  'pre_day',
  '',
  '',
  '["中止（2026年大会）"]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  '',
  '',
  '2026年大会は積雪のため中止',
  '2026 edition cancelled due to heavy snow',
  '荒川',
  '#0369a1',
  'Arakawa',
  '荒川の雄大な流れとともに走る、さいたまの42km',
  'Run along the vast Arakawa River through Saitama',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-03-15T00:00:00Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('saitama-marathon-2026', 'full', 42.195, 360, '', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('saitama-marathon-2026', '観光地', '氷川神社', 'Hikawa Shrine', '武蔵国一宮。2km以上の参道は日本一の長さ。大宮の象徴。', 'The first shrine of Musashi Province. Its 2km+ approach is the longest in Japan.', '大宮エリア', NULL, 35.9069, 139.6286);

-- ==================
-- さいたまマラソン (saitama-marathon-2027)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'saitama-marathon-2027';
DELETE FROM race_categories WHERE race_id = 'saitama-marathon-2027';
DELETE FROM aid_stations WHERE race_id = 'saitama-marathon-2027';
DELETE FROM checkpoints WHERE race_id = 'saitama-marathon-2027';
DELETE FROM access_points WHERE race_id = 'saitama-marathon-2027';
DELETE FROM nearby_spots WHERE race_id = 'saitama-marathon-2027';
DELETE FROM weather_history WHERE race_id = 'saitama-marathon-2027';
DELETE FROM participation_gifts WHERE race_id = 'saitama-marathon-2027';
DELETE FROM completion_gifts WHERE race_id = 'saitama-marathon-2027';
DELETE FROM race_entry_links WHERE race_id = 'saitama-marathon-2027';
DELETE FROM race_entry_periods WHERE race_id = 'saitama-marathon-2027';
DELETE FROM reception_sessions WHERE race_id = 'saitama-marathon-2027';
DELETE FROM race_travel_times WHERE race_id = 'saitama-marathon-2027';
DELETE FROM race_results WHERE race_id = 'saitama-marathon-2027';
DELETE FROM race_gallery WHERE race_id = 'saitama-marathon-2027';
DELETE FROM race_voices WHERE race_id = 'saitama-marathon-2027';
DELETE FROM race_time_buckets WHERE race_id = 'saitama-marathon-2027';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'saitama-marathon-2027',
  'さいたまマラソン',
  'Saitama Marathon',
  '2027-02-14',
  '11',
  'さいたま市',
  'Saitama City',
  'さいたま市で開催されるフルマラソン。荒川沿いのフラットなコース。',
  'A full marathon in Saitama City along the flat Arakawa River course.',
  'https://saitama-marathon.jp',
  15000,
  1,
  14000,
  '2026-07-01',
  NULL,
  0,
  'pre_day',
  '',
  '',
  '[]',
  NULL,
  0,
  0,
  0,
  'road',
  '["JAAF"]',
  '',
  '',
  NULL,
  NULL,
  '荒川',
  '#0369a1',
  'Arakawa',
  '荒川の雄大な流れとともに走る、さいたまの42km',
  'Run along the vast Arakawa River through Saitama',
  NULL,
  NULL,
  NULL,
  'GMOアリーナさいたま（さいたまスーパーアリーナ）',
  'GMO Arena Saitama (Saitama Super Arena)',
  NULL,
  NULL,
  NULL,
  '2026-06-27T00:00:00Z',
  '2026-08-24T16:39:03.577Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('saitama-marathon-2027', 'full', 42.195, 360, '', 14000, 15000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('saitama-marathon-2027', '観光地', '氷川神社', 'Hikawa Shrine', '武蔵国一宮。2km以上の参道は日本一の長さ。大宮の象徴。', 'The first shrine of Musashi Province. Its 2km+ approach is the longest in Japan.', '大宮エリア', NULL, 35.9069, 139.6286);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('saitama-marathon-2027', NULL, '優先エントリー（さいたま市民・越谷市民／2026大会参加者）', 'Priority Entry', '2026-07-01', '2026-07-13', 15000, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('saitama-marathon-2027', NULL, '一般エントリー', 'General Entry', '2026-07-15', NULL, 15000, 1);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('saitama-marathon-2027', NULL, '8kmの部エントリー', '8km Race Entry', '2026-07-15', NULL, 4400, 2);

-- ==================
-- 坂井市古城マラソン (sakai-kojo-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'sakai-kojo-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'sakai-kojo-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'sakai-kojo-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'sakai-kojo-marathon-2026';
DELETE FROM access_points WHERE race_id = 'sakai-kojo-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'sakai-kojo-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'sakai-kojo-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'sakai-kojo-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'sakai-kojo-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'sakai-kojo-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'sakai-kojo-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'sakai-kojo-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'sakai-kojo-marathon-2026';
DELETE FROM race_results WHERE race_id = 'sakai-kojo-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'sakai-kojo-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'sakai-kojo-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'sakai-kojo-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'sakai-kojo-marathon-2026',
  '坂井市古城マラソン',
  'Sakai Kojo Marathon',
  '2026-11-08',
  '18',
  '坂井市',
  'Sakai City',
  '福井県坂井市の丸岡体育館周辺を発着とするマラソン大会。ハーフ・10km・5km・3km・2kmなど幅広い種目を設定。テーマは「城下走愛」。ゲストランナーに野口みずき、AYAを迎える。',
  'A marathon event based around Maruoka Gymnasium in Sakai, Fukui, offering a wide range of distances from half marathon down to 2km. Themed ''Jokasoai'' (castle-town running love), with guest runners Mizuki Noguchi and AYA.',
  'https://www.s-taikyo.jp/marathon.html',
  NULL,
  1,
  0,
  '2026-07-24',
  '2026-09-11',
  0,
  'pre_mail',
  'ナンバーカード（ビブス）は事前郵送。当日受付なし。',
  'Bib numbers are mailed in advance; there is no same-day registration.',
  '["フラット","ゲストランナー"]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  '「城下走愛」をテーマに、丸岡城下町周辺を巡るコース。高低差が少なく走りやすいコース設計で、初心者からベテランランナーまで対応。',
  'Themed ''Jokasoai,'' the course winds through the Maruoka castle-town area. Designed with minimal elevation change, suitable for both beginners and experienced runners.',
  'ニコニコランニング（記録計測なし、参加費1,000円）も併催。',
  'A non-competitive ''Niko-Niko Running'' fun run (no time recording, 1,000 yen entry) is also held alongside the main events.',
  NULL,
  NULL,
  NULL,
  '城下走愛',
  'Jokasoai: castle-town running love',
  NULL,
  NULL,
  NULL,
  '丸岡体育館',
  'Maruoka Gymnasium',
  NULL,
  NULL,
  NULL,
  '2026-08-31T13:29:34.000Z',
  '2026-08-31T13:29:34.000Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('sakai-kojo-marathon-2026', 'half', 21.0975, 150, '08:30', 0, 3000, NULL, 'ハーフマラソン', 'Half Marathon', 'ゴール制限時刻11:00（8:30スタート）。', 'Finish cutoff 11:00 AM (8:30 AM start).', NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('sakai-kojo-marathon-2026', '10k', 10, 0, '', 0, 3000, NULL, '10km', '10K', '高校生以上男女。ゲストランナー野口みずき参加予定。', 'High school age and above. Guest runner Mizuki Noguchi is scheduled to participate.', NULL, NULL, NULL, '[]', 1);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('sakai-kojo-marathon-2026', '5k', 5, 0, '', 0, 2500, NULL, '5km', '5K', '高校生以上男女他。ゲストランナーAYA参加予定。', 'High school age and above. Guest runner AYA is scheduled to participate.', NULL, NULL, NULL, '[]', 2);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('sakai-kojo-marathon-2026', 'other', 3, 0, '', 0, 2500, NULL, '3km', '3K', '一般男女・中学生。', 'Adults and junior high school students.', NULL, NULL, NULL, '[]', 3);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('sakai-kojo-marathon-2026', 'other', 2.26, 0, '', 0, 2500, NULL, '2kmの部', '2K', '小学生他。実距離2.26km（第14回大会より変更）。', 'Elementary school students and others. Actual distance is 2.26km (changed from the 14th edition).', NULL, NULL, NULL, '[]', 4);
INSERT OR REPLACE INTO checkpoints (race_id, distance_km, closing_time) VALUES
  ('sakai-kojo-marathon-2026', 18.1, '10:40');
INSERT OR REPLACE INTO checkpoints (race_id, distance_km, closing_time) VALUES
  ('sakai-kojo-marathon-2026', 21.0975, '11:00');
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('sakai-kojo-marathon-2026', '["goods"]', '一般の部は選べる参加賞（今治製スポーツタオル／スポーツリュック／ランドリーリュック／ウォータープルーフバッグ）＋ドリンク。小中学生は別柄のスポーツタオル。', 'Adult entrants choose from a participation gift (Imabari sports towel / sports backpack / laundry backpack / waterproof bag) plus a drink. Elementary/junior high students receive a different sports towel.', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('sakai-kojo-marathon-2026', '["certificate"]', '完走者全員にWEB完走記録証', 'All finishers receive a web-based finisher certificate', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('sakai-kojo-marathon-2026', NULL, '一般エントリー', 'General Entry', '2026-07-24', '2026-09-11', NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('sakai-kojo-marathon-2026', NULL, NULL, '丸岡城下町', 'Maruoka castle town', NULL, NULL, 0);

-- ==================
-- 札幌マラソン (sapporo-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'sapporo-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'sapporo-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'sapporo-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'sapporo-marathon-2026';
DELETE FROM access_points WHERE race_id = 'sapporo-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'sapporo-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'sapporo-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'sapporo-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'sapporo-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'sapporo-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'sapporo-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'sapporo-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'sapporo-marathon-2026';
DELETE FROM race_results WHERE race_id = 'sapporo-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'sapporo-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'sapporo-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'sapporo-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'sapporo-marathon-2026',
  '札幌マラソン',
  'Sapporo　Marathon',
  '2026-10-04',
  '01',
  '札幌市南区真駒内公園3番1号',
  '',
  '',
  '',
  'https://satumara.sapporo-sport.jp/index.html',
  8000,
  1,
  8000,
  '2026-05-15',
  '2026-07-11',
  0,
  'pre_mail',
  '',
  '',
  '[]',
  NULL,
  0,
  0,
  0,
  'road',
  '["JAAF"]',
  'ハーフマラソン・10kmは日本陸上競技連盟公認コース。豊平川沿いの河川敷や市街地を走る平坦なコース。真駒内セキスイハイムスタジアムをスタート・フィニッシュ地点とする。',
  'Half marathon and 10km courses are certified by the Japan Association of Athletics Federations (JAAF). Flat course along the Toyohira River and city streets, starting and finishing at Makomanai Sekisui Heim Stadium.',
  'ハーフマラソン・10km種目はマイボトル・マイカップ必携（給水はセルフ形式）。',
  'My bottle or my cup is required for half marathon and 10km participants (self-service hydration stations).',
  '時計台',
  NULL,
  'NEW CLASSIC',
  'その一歩から、また始まる。',
  'It all starts with that first step.',
  NULL,
  NULL,
  NULL,
  '真駒内セキスイハイムスタジアム',
  'Makomanai Sekisui Heim Stadium',
  '札幌市南区真駒内公園3番1号',
  NULL,
  NULL,
  '2026-05-15T14:40:14.753Z',
  '2026-07-31T14:36:22.238Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('sapporo-marathon-2026', 'half', 21.0975, 0, '09:20', 8000, 8000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('sapporo-marathon-2026', '10k', 10, 0, '09:00', 4000, 5000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 1);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('sapporo-marathon-2026', '["tshirt"]', 'オリジナルTシャツ
https://satumara.sapporo-sport.jp/prizes.html', '', NULL, 0);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('sapporo-marathon-2026', '["other"]', 'マイボトル・マイカップ（ソフトフラスク400ml／ソフトカップ200ml）希望者に事前配布。ハーフマラソン参加者はソフトフラスク＋ソフトカップ、10km参加者はソフトカップ。', 'My bottle / my cup (soft flask 400ml or soft cup 200ml), distributed in advance upon request. Half marathon: soft flask + soft cup; 10km: soft cup only.', NULL, 1);
INSERT OR REPLACE INTO race_entry_links (race_id, site_name, url, sort_order) VALUES
  ('sapporo-marathon-2026', 'RUNNET', 'https://satumara.sapporo-sport.jp/images/entry/runnet.svg', 0);
INSERT OR REPLACE INTO race_entry_links (race_id, site_name, url, sort_order) VALUES
  ('sapporo-marathon-2026', 'SPORT ENTRY', 'https://www.sportsentry.ne.jp/event/t/105098', 1);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('sapporo-marathon-2026', NULL, 'JPHS優先エントリー', 'JPHS Priority Entry', '2026-05-15', '2026-05-22', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('sapporo-marathon-2026', NULL, 'スペシャルエントリーデイ', 'Special Entry Day', '2026-05-22', '2026-05-22', NULL, 1);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('sapporo-marathon-2026', NULL, '一般エントリー', 'General Entry', '2026-05-23', '2026-07-11', 8000, 2);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('sapporo-marathon-2026', NULL, 'ふるさと納税枠（ハーフマラソンのみ）', 'Hometown Tax Donation Entry (Half Marathon only)', '2026-05-23', '2026-06-28', NULL, 3);

-- ==================
-- 志賀高原100 (shiga-kogen100-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'shiga-kogen100-2026';
DELETE FROM race_categories WHERE race_id = 'shiga-kogen100-2026';
DELETE FROM aid_stations WHERE race_id = 'shiga-kogen100-2026';
DELETE FROM checkpoints WHERE race_id = 'shiga-kogen100-2026';
DELETE FROM access_points WHERE race_id = 'shiga-kogen100-2026';
DELETE FROM nearby_spots WHERE race_id = 'shiga-kogen100-2026';
DELETE FROM weather_history WHERE race_id = 'shiga-kogen100-2026';
DELETE FROM participation_gifts WHERE race_id = 'shiga-kogen100-2026';
DELETE FROM completion_gifts WHERE race_id = 'shiga-kogen100-2026';
DELETE FROM race_entry_links WHERE race_id = 'shiga-kogen100-2026';
DELETE FROM race_entry_periods WHERE race_id = 'shiga-kogen100-2026';
DELETE FROM reception_sessions WHERE race_id = 'shiga-kogen100-2026';
DELETE FROM race_travel_times WHERE race_id = 'shiga-kogen100-2026';
DELETE FROM race_results WHERE race_id = 'shiga-kogen100-2026';
DELETE FROM race_gallery WHERE race_id = 'shiga-kogen100-2026';
DELETE FROM race_voices WHERE race_id = 'shiga-kogen100-2026';
DELETE FROM race_time_buckets WHERE race_id = 'shiga-kogen100-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'shiga-kogen100-2026',
  '志賀高原100',
  'SHIGA KOGEN 100',
  '2026-08-28',
  '20',
  '長野県下高井郡山ノ内町',
  'Yamanouchi Town, Shimotakai District, Nagano Prefecture',
  '日本有数の国立公園でありユネスコエコパークに認定されている志賀高原で新たに100kmのトレイルランニングレースが開催されます。

2022年まで「志賀高原マウンテントレイル」として開催されていたレースが2023年、従来の40kmのコースに新たな100kmのコースを加えた「志賀高原100」として生まれ変わることとなりました。
夏でも涼しい志賀高原はロングレースに最適の場所であり、ここでしかみることのできないダイナミックな絶景が広がっています。
コースも走り易くビギナー向けの設定ととなっておりますので、それぞれのレベルに応じた楽しみ方が出来ることでしょう。
この夏は是非、志賀高原で最高の”非日常”をお楽しみください',
  '',
  'https://www.nature-scene.net/shiga100',
  NULL,
  1,
  700,
  '2026-04-05',
  '2026-07-27',
  0,
  'pre_day',
  '100kmは前日（8月28日・金曜日）に受付・必携装備品チェックあり。参加通知書（はがき）は開催1週間前までに郵送。',
  '100km check-in is on the eve of the race (Friday, August 28) with mandatory gear inspection. Participation card mailed approximately one week before the event.',
  '["ウルトラマラソン","初ウルトラおすすめ","景色が良い"]',
  NULL,
  0,
  0,
  0,
  'trail',
  '[]',
  '',
  '',
  '',
  '',
  '高原',
  '#166534',
  'Kogen',
  '志賀高原の雄大な自然の中を走る100kmトレイル',
  '100km trail through the majestic nature of Shiga Kogen',
  NULL,
  NULL,
  NULL,
  '志賀高原 サンバレー',
  'Shiga Kogen Sun Valley',
  '長野県下高井郡山ノ内町平穏7149',
  NULL,
  NULL,
  '2026-04-05T06:01:54.559Z',
  '2026-07-27T14:32:24.164Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('shiga-kogen100-2026', 'ultra', 100, 1560, '04:30', 700, 28000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('shiga-kogen100-2026', 'other', 40, 630, '06:30', 400, 9900, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 1);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('shiga-kogen100-2026', 'other', 18, 390, '10:00', 200, 7500, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 2);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  ('shiga-kogen100-2026', '長野駅', 'Nagano Station', '', '長電バス急行「志賀高原線」で一の瀬バス停下車、または大会送迎シャトルバス利用', 'Take Nagaden Bus express Shiga Kogen Line to Ichinose bus stop, or use event shuttle bus from Nagano Station', 0, 0, 0, 1, 0);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('shiga-kogen100-2026', '["tshirt"]', '大会オリジナルTシャツ', 'Original event T-shirt', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('shiga-kogen100-2026', NULL, '100km 一般', '100km General', '2026-04-05', '2026-07-27', 28000, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('shiga-kogen100-2026', NULL, '100km 登山道整備参加', '100km Trail Maintenance', '2026-04-05', '2026-07-27', 27500, 1);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('shiga-kogen100-2026', NULL, '40km 一般', '40km General', '2026-04-05', '2026-07-27', 9900, 2);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('shiga-kogen100-2026', NULL, '40km 登山道整備参加', '40km Trail Maintenance', '2026-04-05', '2026-07-27', 9400, 3);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('shiga-kogen100-2026', NULL, '18km', '18km', '2026-04-05', '2026-07-27', 7500, 4);

-- ==================
-- しまだ大井川マラソン (shimada-oigawa-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'shimada-oigawa-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'shimada-oigawa-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'shimada-oigawa-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'shimada-oigawa-marathon-2026';
DELETE FROM access_points WHERE race_id = 'shimada-oigawa-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'shimada-oigawa-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'shimada-oigawa-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'shimada-oigawa-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'shimada-oigawa-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'shimada-oigawa-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'shimada-oigawa-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'shimada-oigawa-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'shimada-oigawa-marathon-2026';
DELETE FROM race_results WHERE race_id = 'shimada-oigawa-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'shimada-oigawa-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'shimada-oigawa-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'shimada-oigawa-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'shimada-oigawa-marathon-2026',
  'しまだ大井川マラソン',
  'SHIMADA OIGAWA MARATHON',
  '2026-10-25',
  '22',
  '',
  '',
  '『箱根八里は馬でも越すが、越すに越されぬ…』とうたわれた大河「大井川」。
その大河に整備された、全国初のマラソン専用コース「リバティ」を舞台に、
長距離陸上競技の合宿のメッカである静岡県島田市でフルマラソン大会を開催しております。 制限時間は７時間と初心者にも安心の設定。女性ランナーやゆっくりランナーも全員笑顔でフィニッシュ目指しましょう！',
  'The Oi River, a mighty waterway celebrated in the saying, “Even a horse can cross the eight-ri stretch of Hakone, but this river cannot be crossed…”
Set against the backdrop of “Liberty”—Japan’s first dedicated marathon course, built along this great river—
we host a full marathon in Shimada City, Shizuoka Prefecture, a mecca for long-distance track and field training camps. With a 7-hour time limit, the race is designed to be accessible even for beginners. Let’s all aim to cross the finish line with a smile, whether you’re a female runner or someone taking it easy!

Translated with DeepL.com (free version)',
  'https://www.shimada-marathon.jp/',
  NULL,
  1,
  0,
  '2026-05-01',
  '2026-06-30',
  0,
  'pre_mail',
  '',
  '',
  '[]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  '',
  '',
  '',
  '',
  '大井川',
  '#15803d',
  'Oi-gawa',
  '南アルプスから流れる大井川沿いを走る42km',
  'Run along the Oi River flowing down from the Southern Alps',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '2026-04-25T04:12:54.667Z',
  '2026-04-25T04:12:54.667Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('shimada-oigawa-marathon-2026', 'full', 42.195, 420, '09:00', 6000, 10000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('shimada-oigawa-marathon-2026', '10k', 10, 90, '10:30', 1500, 5000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 1);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('shimada-oigawa-marathon-2026', '["tshirt","local_product"]', '大会オリジナルTシャツ・島田のお茶', '', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('shimada-oigawa-marathon-2026', NULL, '一般エントリー', 'General Entry', '2026-05-01', '2026-06-30', NULL, 0);

-- ==================
-- 下諏訪御柱街道トレイル (shimosuwa-onbashira-trail-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'shimosuwa-onbashira-trail-2026';
DELETE FROM race_categories WHERE race_id = 'shimosuwa-onbashira-trail-2026';
DELETE FROM aid_stations WHERE race_id = 'shimosuwa-onbashira-trail-2026';
DELETE FROM checkpoints WHERE race_id = 'shimosuwa-onbashira-trail-2026';
DELETE FROM access_points WHERE race_id = 'shimosuwa-onbashira-trail-2026';
DELETE FROM nearby_spots WHERE race_id = 'shimosuwa-onbashira-trail-2026';
DELETE FROM weather_history WHERE race_id = 'shimosuwa-onbashira-trail-2026';
DELETE FROM participation_gifts WHERE race_id = 'shimosuwa-onbashira-trail-2026';
DELETE FROM completion_gifts WHERE race_id = 'shimosuwa-onbashira-trail-2026';
DELETE FROM race_entry_links WHERE race_id = 'shimosuwa-onbashira-trail-2026';
DELETE FROM race_entry_periods WHERE race_id = 'shimosuwa-onbashira-trail-2026';
DELETE FROM reception_sessions WHERE race_id = 'shimosuwa-onbashira-trail-2026';
DELETE FROM race_travel_times WHERE race_id = 'shimosuwa-onbashira-trail-2026';
DELETE FROM race_results WHERE race_id = 'shimosuwa-onbashira-trail-2026';
DELETE FROM race_gallery WHERE race_id = 'shimosuwa-onbashira-trail-2026';
DELETE FROM race_voices WHERE race_id = 'shimosuwa-onbashira-trail-2026';
DELETE FROM race_time_buckets WHERE race_id = 'shimosuwa-onbashira-trail-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'shimosuwa-onbashira-trail-2026',
  '下諏訪御柱街道トレイル',
  'Shimosuwa Onbashira Kaido Trail',
  '2026-10-03',
  '20',
  '下諏訪町',
  'Shimosuwa Town',
  '長野県下諏訪町で開催されるトレイルランニング大会。ロング43km・ショート14.5kmの2部門があり、御柱街道や八島湿原など自然保護に配慮したコースを走る。',
  'A trail running event in Shimosuwa, Nagano, with Long (43km) and Short (14.5km) courses that pass through the Onbashira-kaido road and Yashima Marsh, run with careful attention to nature conservation.',
  'https://www.nature-scene.net/shimosuwa/',
  NULL,
  1,
  900,
  '2026-05-17',
  '2026-09-01',
  0,
  'race_day',
  'ロングは6:00～7:00、ショートは7:00～8:00に当日受付（会場で受付・スタート）',
  'Same-day check-in only: Long course 6:00–7:00 AM, Short course 7:00–8:00 AM.',
  '["トレイルラン","自然保護"]',
  NULL,
  0,
  0,
  2300,
  'trail',
  '[]',
  '諏訪大社下社秋宮周辺をスタートし、御柱街道や八島湿原を経由するトレイルコース。ロングは累積標高2,300m・エイド3箇所、ショートは累積標高550m・エイド1箇所。',
  'A trail course starting near Suwa Taisha Shimosha Akimiya shrine, passing through the Onbashira-kaido road and Yashima Marsh. Long course: ~2,300m elevation gain, 3 aid stations. Short course: ~550m elevation gain, 1 aid station.',
  '八島湿原区間は歩行区間に指定されており、試走時も含めて走行不可。',
  'The Yashima Marsh section is designated as a walking-only zone; running is prohibited there, even during course recon.',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '諏訪大社下社秋宮周辺',
  'Near Suwa Taisha Shimosha Akimiya',
  NULL,
  NULL,
  NULL,
  '2026-08-31T13:29:34.000Z',
  '2026-08-31T13:29:34.000Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('shimosuwa-onbashira-trail-2026', 'ultra', 43, 0, '07:30', 600, 11800, NULL, 'ロング43km', 'Long 43km', '18歳以上。累積標高2,300m、エイド3箇所。参加費はエコ割適用で10,300円。', 'Age 18+. ~2,300m elevation gain, 3 aid stations. Eco discount rate: 10,300 yen.', NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('shimosuwa-onbashira-trail-2026', 'other', 14.5, 0, '08:30', 300, 8500, NULL, 'ショート14.5km', 'Short 14.5km', '中学生以上。累積標高550m、エイド1箇所。参加費はエコ割適用で7,000円。', 'Junior high school age and above. ~550m elevation gain, 1 aid station. Eco discount rate: 7,000 yen.', NULL, NULL, NULL, '[]', 1);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('shimosuwa-onbashira-trail-2026', NULL, '一般エントリー', 'General Entry', '2026-05-17', '2026-09-01', NULL, 0);

-- ==================
-- 信越五岳トレイルランニングレース (shinetsu5mountains-trail-100-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'shinetsu5mountains-trail-100-2026';
DELETE FROM race_categories WHERE race_id = 'shinetsu5mountains-trail-100-2026';
DELETE FROM aid_stations WHERE race_id = 'shinetsu5mountains-trail-100-2026';
DELETE FROM checkpoints WHERE race_id = 'shinetsu5mountains-trail-100-2026';
DELETE FROM access_points WHERE race_id = 'shinetsu5mountains-trail-100-2026';
DELETE FROM nearby_spots WHERE race_id = 'shinetsu5mountains-trail-100-2026';
DELETE FROM weather_history WHERE race_id = 'shinetsu5mountains-trail-100-2026';
DELETE FROM participation_gifts WHERE race_id = 'shinetsu5mountains-trail-100-2026';
DELETE FROM completion_gifts WHERE race_id = 'shinetsu5mountains-trail-100-2026';
DELETE FROM race_entry_links WHERE race_id = 'shinetsu5mountains-trail-100-2026';
DELETE FROM race_entry_periods WHERE race_id = 'shinetsu5mountains-trail-100-2026';
DELETE FROM reception_sessions WHERE race_id = 'shinetsu5mountains-trail-100-2026';
DELETE FROM race_travel_times WHERE race_id = 'shinetsu5mountains-trail-100-2026';
DELETE FROM race_results WHERE race_id = 'shinetsu5mountains-trail-100-2026';
DELETE FROM race_gallery WHERE race_id = 'shinetsu5mountains-trail-100-2026';
DELETE FROM race_voices WHERE race_id = 'shinetsu5mountains-trail-100-2026';
DELETE FROM race_time_buckets WHERE race_id = 'shinetsu5mountains-trail-100-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'shinetsu5mountains-trail-100-2026',
  '信越五岳トレイルランニングレース',
  'SHINETSU FIVE MOUNTAINS TRAIL 100mile/110km',
  '2026-09-21',
  '15',
  '信越高原（新潟県妙高市、長野県長野市、信濃町、飯綱町、飯山市）',
  'Shin''etsu Plateau (Myoko City, Niigata Prefecture; Nagano City, Shinano Town, Iizuna Town, Iiyama City, Nagano Prefecture)',
  'トレイルランナー石川弘樹氏がプロデュースした、信越五岳を結ぶ全長160kmにも及ぶ山岳エリアと信越高原の各地域を繋いだ壮大なコース設定。
家族や友人が選手にサポートを提供できるアシスタントポイントの設置、夜間走行となる選手の安全に配慮したぺーサ1名の同行を許可する区間の設定など、選手はじめ、沢山の人々がトレイルランニングの魅力を味わえるレーススタイル',
  '',
  'https://sfmt100.com',
  35000,
  1,
  1300,
  '2026-04-08',
  '2026-04-15',
  0,
  'pre_day',
  '',
  '',
  '["ウルトラマラソン"]',
  NULL,
  0,
  0,
  0,
  'trail',
  '[]',
  '100mile：エイドステーション9カ所、アシスタントポイント7カ所（赤池・大橋林道を除く）、ドロップバッグポイントはアパリゾート上越妙高（53km地点）と黒姫（99km地点）。110km：エイドステーション6カ所、アシスタントポイント4カ所（熊坂・大橋林道を除く）、ドロップバッグポイントは笹ヶ峰グリーンハウス（60km地点）。コースには矢印表示・注意表示・マーカーテープ・フラッシュライト等を設置し、誘導員・警備員を配置。トイレ・救護所は各エイドステーションに設置。',
  '',
  '',
  '',
  '信越五岳',
  '#065f46',
  'Shin-etsu-Gogaku',
  '信越の五つの山を巡る、100マイルの挑戦',
  'A 100-mile challenge through five peaks of the Shin-Etsu mountains',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '2026-04-05T07:49:25.657Z',
  '2026-08-24T16:39:38.579Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('shinetsu5mountains-trail-100-2026', 'ultra', 163, 1980, '18:30', 600, 47000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('shinetsu5mountains-trail-100-2026', 'ultra', 112, 1320, '05:30', 700, 35000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 1);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('shinetsu5mountains-trail-100-2026', '["tshirt","food","goods"]', 'パタゴニア製大会記念Tシャツ （キャプリーン･クール･デイリー・シャツ）
あおばずんだ本舗 ずんだだんご
マッハコーヒー コーヒーバッグ
ハニーアクション　トレイルピーナッツ
快腸走　スタンバイ・リロード
MAGMA アスリートバーリィ
ANDO_塩入り

各種目完走者には完走証（名前、タイムを彫った木製楯）を贈呈し、加えて100mile完走者には記念バックルを贈呈します。', '', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('shinetsu5mountains-trail-100-2026', NULL, '一般エントリー', 'General Entry', '2026-04-08', '2026-04-15', NULL, 0);

-- ==================
-- 静岡マラソン (shizuoka-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'shizuoka-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'shizuoka-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'shizuoka-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'shizuoka-marathon-2026';
DELETE FROM access_points WHERE race_id = 'shizuoka-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'shizuoka-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'shizuoka-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'shizuoka-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'shizuoka-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'shizuoka-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'shizuoka-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'shizuoka-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'shizuoka-marathon-2026';
DELETE FROM race_results WHERE race_id = 'shizuoka-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'shizuoka-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'shizuoka-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'shizuoka-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'shizuoka-marathon-2026',
  '静岡マラソン',
  'Shizuoka Marathon',
  '2026-03-08',
  '22',
  '静岡市',
  'Shizuoka City',
  '駿河湾沿いを走るフルマラソン。富士山と駿河湾の眺望を楽しめるコース。',
  'A full marathon along Suruga Bay. Enjoy views of Mt. Fuji and Suruga Bay.',
  'https://www.shizuoka-marathon.com',
  NULL,
  1,
  0,
  NULL,
  NULL,
  0,
  'pre_day',
  '',
  '',
  '["富士山","景色が良い","海沿い"]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  '駿河湾、富士山',
  'Suruga Bay, Mt. Fuji',
  NULL,
  NULL,
  '富士山',
  '#2a4fa3',
  'Fujisan',
  '富士山を正面に望む、海岸線の42km',
  'Run the coastline with Mt. Fuji straight ahead',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-03-15T00:00:00Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('shizuoka-marathon-2026', 'full', 42.195, 0, '', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('shizuoka-marathon-2026', '観光地', '三保松原', 'Miho no Matsubara', '世界遺産「富士山」の構成資産。松林越しの富士山の眺望が美しい。', 'Part of the World Heritage ''Mt. Fuji''. Beautiful views of Mt. Fuji through pine groves.', '静岡市内から車約30分', NULL, 35.0136, 138.5167);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('shizuoka-marathon-2026', '["tshirt"]', '大会Tシャツ、完走メダル', 'Race T-shirt, Finisher medal', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('shizuoka-marathon-2026', '["medal"]', '大会Tシャツ、完走メダル', 'Race T-shirt, Finisher medal', NULL, 0);

-- ==================
-- 湘南国際マラソン (shonan-international-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'shonan-international-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'shonan-international-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'shonan-international-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'shonan-international-marathon-2026';
DELETE FROM access_points WHERE race_id = 'shonan-international-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'shonan-international-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'shonan-international-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'shonan-international-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'shonan-international-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'shonan-international-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'shonan-international-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'shonan-international-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'shonan-international-marathon-2026';
DELETE FROM race_results WHERE race_id = 'shonan-international-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'shonan-international-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'shonan-international-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'shonan-international-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'shonan-international-marathon-2026',
  '湘南国際マラソン',
  'Shonan International Marathon',
  '2026-12-06',
  '14',
  '大磯町〜江の島',
  'Oiso to Enoshima',
  '湘南の海岸線を走るフルマラソン。江の島と富士山を望みながら走れる人気大会。マイボトル・マイカップ必携。',
  'A full marathon along the Shonan coast. A popular race with views of Enoshima and Mt. Fuji. Must carry your own bottle/cup.',
  'https://www.shonan-kokusai.jp',
  NULL,
  1,
  0,
  '2026-04-04',
  '2026-09-09',
  0,
  'pre_mail',
  '計測タグは、ナンバーカードとともに事前に参加者へ発送します（事前のランナー受付はありません）。',
  'Timing tags will be sent to participants in advance along with their race numbers (there is no pre-race runner registration).',
  '["富士山","景色が良い","海沿い"]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  '湘南海岸、江の島、富士山',
  'Shonan coast, Enoshima, Mt. Fuji',
  'マイボトル・マイカップ必携。紙コップでの給水なし。',
  'Must carry your own bottle/cup. No paper cup water service.',
  '湘南の海',
  '#0ea5e9',
  'Shonan-no-Umi',
  '湘南の海風を感じながら走る、江ノ島から湘南へ',
  'Run the Shonan coast from Enoshima with ocean breezes',
  NULL,
  NULL,
  NULL,
  '大磯プリンスホテル',
  'Oiso Prince Hotel',
  NULL,
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-08-24T16:16:36.520Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('shonan-international-marathon-2026', 'full', 42.195, 345, '', 19500, 16000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('shonan-international-marathon-2026', '10k', 10, 0, '', 4800, 8500, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 1);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  ('shonan-international-marathon-2026', '大磯駅', 'Oiso Station', '', '大会当日は無料シャトルバスを運行', 'Free shuttle bus available on race day', 0, 0, NULL, 1, 0);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  ('shonan-international-marathon-2026', '二宮駅', 'Ninomiya Station', '', '大会当日は無料シャトルバスを運行', 'Free shuttle bus available on race day', 0, 0, NULL, 0, 1);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('shonan-international-marathon-2026', '観光地', '江の島', 'Enoshima', 'コースの折り返し地点付近。湘南のシンボル。しらす丼やサザエが名物。', 'Near the turnaround point. Symbol of Shonan. Famous for shirasu bowl and turban shell.', 'コース折り返し付近', NULL, 35.2994, 139.4806);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('shonan-international-marathon-2026', '["tshirt"]', 'THE NORTH FACE 大会オリジナルTシャツ（ショートスリーブ／スリーブレス選択）', 'THE NORTH FACE original T-shirt (short sleeve or sleeveless)', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('shonan-international-marathon-2026', '["medal"]', '完走メダル', 'Finisher medal', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('shonan-international-marathon-2026', NULL, '一般エントリー', 'General Entry', '2026-04-04', '2026-09-09', 16000, 0);

-- ==================
-- そうじゃ吉備路マラソン (soja-kibiji-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'soja-kibiji-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'soja-kibiji-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'soja-kibiji-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'soja-kibiji-marathon-2026';
DELETE FROM access_points WHERE race_id = 'soja-kibiji-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'soja-kibiji-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'soja-kibiji-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'soja-kibiji-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'soja-kibiji-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'soja-kibiji-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'soja-kibiji-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'soja-kibiji-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'soja-kibiji-marathon-2026';
DELETE FROM race_results WHERE race_id = 'soja-kibiji-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'soja-kibiji-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'soja-kibiji-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'soja-kibiji-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'soja-kibiji-marathon-2026',
  'そうじゃ吉備路マラソン',
  'Soja Kibiji Marathon',
  '2026-02-22',
  '33',
  '総社市',
  'Soja City',
  '岡山県総社市で開催。吉備路の歴史ある風景の中を走るマラソン。五重塔や古墳群を眺めながら走れる。',
  'Held in Soja City, Okayama. Run through the historic Kibiji landscape, passing a five-story pagoda and ancient burial mounds.',
  'https://soja-kibijimarathon.jp',
  9100,
  1,
  15000,
  '2025-10-01',
  '2026-01-03',
  0,
  'pre_mail',
  'すべての種目でナンバーカードを事前に発送させていただきます。
そのため受付はございません。',
  'Number cards for all events will be sent out in advance.

Therefore, there is no registration required.',
  '["景色が良い","歴史"]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  '備中国分寺五重塔、古墳群、吉備路',
  'Bitchu Kokubunji five-story pagoda, burial mounds, Kibiji',
  NULL,
  NULL,
  '吉備路',
  '#854d0e',
  'Kibiji',
  '吉備路の古代ロマンを感じながら走る42km',
  'Run the ancient Kibiji road through Soja''s historic landscape',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-05-30T06:42:39.583Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('soja-kibiji-marathon-2026', 'full', 42.195, 360, '09:20', 2000, 9100, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('soja-kibiji-marathon-2026', '観光地', '備中国分寺五重塔', 'Bitchu Kokubunji Five-Story Pagoda', '吉備路のシンボル。コース上から望める。田園風景の中に立つ姿が美しい。', 'Symbol of Kibiji. Visible from the course. Beautiful standing among rice paddies.', 'コース上', NULL, 34.65, 133.7833);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('soja-kibiji-marathon-2026', '["tshirt"]', '大会Tシャツ、完走メダル', 'Race T-shirt, Finisher medal', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('soja-kibiji-marathon-2026', '["medal"]', '大会Tシャツ、完走メダル', 'Race T-shirt, Finisher medal', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('soja-kibiji-marathon-2026', NULL, '一般エントリー', 'General Entry', '2025-10-01', '2026-01-03', 9100, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('soja-kibiji-marathon-2026', NULL, NULL, '備中国分寺五重塔', 'Bitchu Kokubunji five-story pagoda', NULL, NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('soja-kibiji-marathon-2026', NULL, NULL, '古墳群', 'burial mounds', NULL, NULL, 1);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('soja-kibiji-marathon-2026', NULL, NULL, '吉備路', 'Kibiji', NULL, NULL, 2);

-- ==================
-- そうじゃ吉備路マラソン (soja-kibiji-marathon-2027)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'soja-kibiji-marathon-2027';
DELETE FROM race_categories WHERE race_id = 'soja-kibiji-marathon-2027';
DELETE FROM aid_stations WHERE race_id = 'soja-kibiji-marathon-2027';
DELETE FROM checkpoints WHERE race_id = 'soja-kibiji-marathon-2027';
DELETE FROM access_points WHERE race_id = 'soja-kibiji-marathon-2027';
DELETE FROM nearby_spots WHERE race_id = 'soja-kibiji-marathon-2027';
DELETE FROM weather_history WHERE race_id = 'soja-kibiji-marathon-2027';
DELETE FROM participation_gifts WHERE race_id = 'soja-kibiji-marathon-2027';
DELETE FROM completion_gifts WHERE race_id = 'soja-kibiji-marathon-2027';
DELETE FROM race_entry_links WHERE race_id = 'soja-kibiji-marathon-2027';
DELETE FROM race_entry_periods WHERE race_id = 'soja-kibiji-marathon-2027';
DELETE FROM reception_sessions WHERE race_id = 'soja-kibiji-marathon-2027';
DELETE FROM race_travel_times WHERE race_id = 'soja-kibiji-marathon-2027';
DELETE FROM race_results WHERE race_id = 'soja-kibiji-marathon-2027';
DELETE FROM race_gallery WHERE race_id = 'soja-kibiji-marathon-2027';
DELETE FROM race_voices WHERE race_id = 'soja-kibiji-marathon-2027';
DELETE FROM race_time_buckets WHERE race_id = 'soja-kibiji-marathon-2027';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'soja-kibiji-marathon-2027',
  'そうじゃ吉備路マラソン',
  'Soja Kibiji Marathon',
  '2027-02-28',
  '33',
  '総社市',
  'Soja City',
  '岡山県総社市で開催。吉備路の歴史ある風景の中を走るマラソン。五重塔や古墳群を眺めながら走れる。',
  'Held in Soja City, Okayama. Run through the historic Kibiji landscape, passing a five-story pagoda and ancient burial mounds.',
  'https://soja-kibijimarathon.jp',
  9100,
  1,
  15000,
  NULL,
  NULL,
  0,
  'pre_mail',
  'すべての種目でナンバーカードを事前に発送させていただきます。
そのため受付はございません。',
  'Number cards for all events will be sent out in advance.

Therefore, there is no registration required.',
  '["景色が良い","歴史"]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  '備中国分寺五重塔、古墳群、吉備路',
  'Bitchu Kokubunji five-story pagoda, burial mounds, Kibiji',
  NULL,
  NULL,
  '吉備路',
  '#854d0e',
  'Kibiji',
  '吉備路の古代ロマンを感じながら走る42km',
  'Run the ancient Kibiji road through Soja''s historic landscape',
  NULL,
  NULL,
  NULL,
  '総社商工会館東交差点（発着）・総社市スポーツセンター',
  'Soja Chamber of Commerce East Intersection (Start/Finish) / Soja Sports Center',
  '岡山県総社市',
  NULL,
  NULL,
  '2026-07-27T14:33:45.113Z',
  '2026-07-27T14:33:45.113Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('soja-kibiji-marathon-2027', 'full', 42.195, 360, '09:20', 2000, 9100, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  ('soja-kibiji-marathon-2027', '総社駅', 'Soja Station', '', '徒歩約20分', 'approx. 20 min walk', 0, 0, 20, 1, 0);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  ('soja-kibiji-marathon-2027', '東総社駅', 'Higashi-Soja Station', '', '徒歩約20分', 'approx. 20 min walk', 0, 0, 20, 0, 1);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('soja-kibiji-marathon-2027', '観光地', '備中国分寺五重塔', 'Bitchu Kokubunji Five-Story Pagoda', '吉備路のシンボル。コース上から望める。田園風景の中に立つ姿が美しい。', 'Symbol of Kibiji. Visible from the course. Beautiful standing among rice paddies.', 'コース上', NULL, 34.65, 133.7833);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('soja-kibiji-marathon-2027', '["tshirt"]', '大会Tシャツ', 'Race T-shirt', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('soja-kibiji-marathon-2027', '["medal"]', '完走メダル', 'Finisher medal', NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('soja-kibiji-marathon-2027', NULL, NULL, '備中国分寺五重塔', 'Bitchu Kokubunji five-story pagoda', NULL, NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('soja-kibiji-marathon-2027', NULL, NULL, '古墳群', 'burial mounds', NULL, NULL, 1);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('soja-kibiji-marathon-2027', NULL, NULL, '吉備路', 'Kibiji', NULL, NULL, 2);

-- ==================
-- 丹波篠山ABCマラソン (tamba-sasayama-abc-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'tamba-sasayama-abc-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'tamba-sasayama-abc-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'tamba-sasayama-abc-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'tamba-sasayama-abc-marathon-2026';
DELETE FROM access_points WHERE race_id = 'tamba-sasayama-abc-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'tamba-sasayama-abc-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'tamba-sasayama-abc-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'tamba-sasayama-abc-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'tamba-sasayama-abc-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'tamba-sasayama-abc-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'tamba-sasayama-abc-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'tamba-sasayama-abc-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'tamba-sasayama-abc-marathon-2026';
DELETE FROM race_results WHERE race_id = 'tamba-sasayama-abc-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'tamba-sasayama-abc-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'tamba-sasayama-abc-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'tamba-sasayama-abc-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'tamba-sasayama-abc-marathon-2026',
  '丹波篠山ABCマラソン',
  'Tamba-Sasayama ABC Marathon',
  '2026-03-01',
  '28',
  '丹波篠山市',
  'Tamba-Sasayama City',
  '兵庫県丹波篠山で開催。城下町の風情と田園風景の中を走る。制限時間5時間30分。',
  'Held in Tamba-Sasayama, Hyogo. Run through a castle town atmosphere and rural landscapes. 5.5-hour time limit.',
  'https://tambasasayama-abc-marathon.jp',
  10000,
  0,
  8000,
  '2025-10-01',
  '2026-01-31',
  0,
  'race_day',
  '',
  '',
  '["城下町"]',
  NULL,
  0,
  0,
  0,
  'road',
  '["JAAF"]',
  '篠山城跡、田園風景',
  'Sasayama Castle ruins, rural landscape',
  NULL,
  NULL,
  '城下町',
  '#1c1917',
  'Jokamachi',
  '丹波篠山・城下町の風情漂う黒豆の里を走る',
  'Run through the castle town of Tamba Sasayama, home of black soybeans',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-05-30T06:42:47.716Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('tamba-sasayama-abc-marathon-2026', 'full', 42.195, 330, '', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('tamba-sasayama-abc-marathon-2026', 'グルメ', '丹波篠山の黒豆・ぼたん鍋', 'Tamba-Sasayama Black Beans & Botan Nabe', '丹波の黒豆と猪肉のぼたん鍋が名物。秋〜冬が旬。', 'Famous for Tamba black beans and boar meat hot pot. Best in autumn-winter.', '篠山市内', NULL, 35.0764, 135.2203);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('tamba-sasayama-abc-marathon-2026', '["tshirt","local_product"]', '大会Tシャツ、丹波の特産品', 'Race T-shirt, Tamba local products', NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('tamba-sasayama-abc-marathon-2026', NULL, NULL, '篠山城跡', 'Sasayama Castle ruins', NULL, NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('tamba-sasayama-abc-marathon-2026', NULL, NULL, '田園風景', 'rural landscape', NULL, NULL, 1);

-- ==================
-- 館山若潮マラソン (tateyama-wakashio-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'tateyama-wakashio-2026';
DELETE FROM race_categories WHERE race_id = 'tateyama-wakashio-2026';
DELETE FROM aid_stations WHERE race_id = 'tateyama-wakashio-2026';
DELETE FROM checkpoints WHERE race_id = 'tateyama-wakashio-2026';
DELETE FROM access_points WHERE race_id = 'tateyama-wakashio-2026';
DELETE FROM nearby_spots WHERE race_id = 'tateyama-wakashio-2026';
DELETE FROM weather_history WHERE race_id = 'tateyama-wakashio-2026';
DELETE FROM participation_gifts WHERE race_id = 'tateyama-wakashio-2026';
DELETE FROM completion_gifts WHERE race_id = 'tateyama-wakashio-2026';
DELETE FROM race_entry_links WHERE race_id = 'tateyama-wakashio-2026';
DELETE FROM race_entry_periods WHERE race_id = 'tateyama-wakashio-2026';
DELETE FROM reception_sessions WHERE race_id = 'tateyama-wakashio-2026';
DELETE FROM race_travel_times WHERE race_id = 'tateyama-wakashio-2026';
DELETE FROM race_results WHERE race_id = 'tateyama-wakashio-2026';
DELETE FROM race_gallery WHERE race_id = 'tateyama-wakashio-2026';
DELETE FROM race_voices WHERE race_id = 'tateyama-wakashio-2026';
DELETE FROM race_time_buckets WHERE race_id = 'tateyama-wakashio-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'tateyama-wakashio-2026',
  '館山若潮マラソン',
  'Tateyama Wakashio Marathon',
  '2026-01-25',
  '12',
  '館山市',
  'Tateyama City',
  '千葉県館山市の海沿いを走るフルマラソン。温暖な房総の海を眺めながら走れる冬の人気大会。',
  'A full marathon along the coast of Tateyama, Chiba. A popular winter race with views of the warm Boso coast.',
  'https://tateyama-wakasio.jp',
  9000,
  0,
  5000,
  '2025-09-14',
  '2025-11-13',
  0,
  'race_day',
  '',
  '',
  '["景色が良い","海沿い","アップダウン多い"]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  '房総の海岸線',
  'Boso coastline',
  NULL,
  NULL,
  '若潮',
  '#0369a1',
  'Wakashio',
  '太平洋に面した館山の若潮を感じながら走る',
  'Run Tateyama''s Pacific coast on the fresh tides of spring',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-05-30T06:42:59.250Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('tateyama-wakashio-2026', 'full', 42.195, 360, '', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('tateyama-wakashio-2026', '観光地', '館山城', 'Tateyama Castle', '城山公園内の城。館山市街と東京湾を一望できる。', 'A castle in Shiroyama Park with views of Tateyama city and Tokyo Bay.', '会場付近', NULL, 34.9956, 139.8622);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('tateyama-wakashio-2026', 'グルメ', '房総の海鮮', 'Boso Seafood', '新鮮な海鮮が楽しめる。特に寿司や刺身がおすすめ。', 'Fresh seafood. Sushi and sashimi are especially recommended.', '館山市内', NULL, 34.9997, 139.8697);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('tateyama-wakashio-2026', '["tshirt"]', '大会Tシャツ、完走メダル', 'Race T-shirt, Finisher medal', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('tateyama-wakashio-2026', '["medal"]', '大会Tシャツ、完走メダル', 'Race T-shirt, Finisher medal', NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('tateyama-wakashio-2026', NULL, NULL, '房総の海岸線', 'Boso coastline', NULL, NULL, 0);

-- ==================
-- 館山若潮マラソン (tateyama-wakashio-2027)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'tateyama-wakashio-2027';
DELETE FROM race_categories WHERE race_id = 'tateyama-wakashio-2027';
DELETE FROM aid_stations WHERE race_id = 'tateyama-wakashio-2027';
DELETE FROM checkpoints WHERE race_id = 'tateyama-wakashio-2027';
DELETE FROM access_points WHERE race_id = 'tateyama-wakashio-2027';
DELETE FROM nearby_spots WHERE race_id = 'tateyama-wakashio-2027';
DELETE FROM weather_history WHERE race_id = 'tateyama-wakashio-2027';
DELETE FROM participation_gifts WHERE race_id = 'tateyama-wakashio-2027';
DELETE FROM completion_gifts WHERE race_id = 'tateyama-wakashio-2027';
DELETE FROM race_entry_links WHERE race_id = 'tateyama-wakashio-2027';
DELETE FROM race_entry_periods WHERE race_id = 'tateyama-wakashio-2027';
DELETE FROM reception_sessions WHERE race_id = 'tateyama-wakashio-2027';
DELETE FROM race_travel_times WHERE race_id = 'tateyama-wakashio-2027';
DELETE FROM race_results WHERE race_id = 'tateyama-wakashio-2027';
DELETE FROM race_gallery WHERE race_id = 'tateyama-wakashio-2027';
DELETE FROM race_voices WHERE race_id = 'tateyama-wakashio-2027';
DELETE FROM race_time_buckets WHERE race_id = 'tateyama-wakashio-2027';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'tateyama-wakashio-2027',
  '館山若潮マラソン',
  'Tateyama Wakashio Marathon',
  '2027-01-31',
  '12',
  '館山市',
  'Tateyama City',
  '千葉県館山市の海沿いを走るフルマラソン。温暖な房総の海を眺めながら走れる冬の人気大会。',
  'A full marathon along the coast of Tateyama, Chiba. A popular winter race with views of the warm Boso coast.',
  'https://tateyama-wakasio.jp',
  9000,
  0,
  5000,
  '2026-08-18',
  '2026-10-17',
  0,
  'pre_mail',
  '全ての参加者へアスリートビブス（ゼッケン）を事前送付するため、当日受付はなし',
  'Athlete bibs are mailed to all participants in advance; there is no race-day reception',
  '["景色が良い","海沿い","アップダウン多い"]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  '房総の海岸線',
  'Boso coastline',
  NULL,
  NULL,
  '若潮',
  '#0369a1',
  'Wakashio',
  '太平洋に面した館山の若潮を感じながら走る',
  'Run Tateyama''s Pacific coast on the fresh tides of spring',
  NULL,
  NULL,
  NULL,
  '福原有信グラウンド館山（館山市営市民運動場）',
  'Fukuhara Yushin Ground Tateyama (Tateyama Municipal Citizens'' Athletic Field)',
  '千葉県館山市正木4304-2',
  NULL,
  NULL,
  '2026-08-24T16:18:08.658Z',
  '2026-08-24T16:18:08.658Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('tateyama-wakashio-2027', 'full', 42.195, 360, '10:00', 5000, 9000, NULL, NULL, NULL, '市民先行エントリーは8,000円', 'Resident priority entry: ¥8,000', NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('tateyama-wakashio-2027', '10k', 10, 90, '10:50', 2000, 5000, NULL, NULL, NULL, '市民先行エントリーは4,000円', 'Resident priority entry: ¥4,000', NULL, NULL, NULL, '[]', 1);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('tateyama-wakashio-2027', 'other', 2, 20, '11:00', 400, 4000, NULL, 'ファンラン', 'Fun Run', '定員400組。市民先行エントリーは3,000円', 'Capacity: 400 groups. Resident priority entry: ¥3,000', NULL, NULL, NULL, '[]', 2);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  ('tateyama-wakashio-2027', '館山駅', 'Tateyama Station', '', '西口よりシャトルバス利用', 'Shuttle bus from West Exit', 0, 0, NULL, 1, 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('tateyama-wakashio-2027', '観光地', '館山城', 'Tateyama Castle', '城山公園内の城。館山市街と東京湾を一望できる。', 'A castle in Shiroyama Park with views of Tateyama city and Tokyo Bay.', '会場付近', NULL, 34.9956, 139.8622);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('tateyama-wakashio-2027', 'グルメ', '房総の海鮮', 'Boso Seafood', '新鮮な海鮮が楽しめる。特に寿司や刺身がおすすめ。', 'Fresh seafood. Sushi and sashimi are especially recommended.', '館山市内', NULL, 34.9997, 139.8697);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('tateyama-wakashio-2027', '["towel","goods"]', 'オリジナルタオル（ファンランの部は1組1枚）、資生堂ジャパン（株）提供の参加賞（ファンランの部は1組1袋）', 'Original towel (one per group for Fun Run), participation gift provided by Shiseido Japan Co., Ltd. (one bag per group for Fun Run)', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('tateyama-wakashio-2027', '["medal"]', 'オリジナルメダル（ファンランの部は1組1個）', 'Original medal (one per group for Fun Run)', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('tateyama-wakashio-2027', NULL, '市民先行エントリー', 'Resident Priority Entry', '2026-08-18', '2026-08-31', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('tateyama-wakashio-2027', NULL, '一般エントリー', 'General Entry', '2026-09-01', '2026-10-17', NULL, 1);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('tateyama-wakashio-2027', NULL, 'ふるさと納税エントリー', 'Furusato Nozei (Hometown Tax) Entry', '2026-09-01', '2026-10-02', NULL, 2);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('tateyama-wakashio-2027', NULL, NULL, '房総の海岸線', 'Boso coastline', NULL, NULL, 0);

-- ==================
-- 田沢湖マラソン (tazawako-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'tazawako-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'tazawako-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'tazawako-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'tazawako-marathon-2026';
DELETE FROM access_points WHERE race_id = 'tazawako-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'tazawako-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'tazawako-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'tazawako-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'tazawako-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'tazawako-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'tazawako-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'tazawako-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'tazawako-marathon-2026';
DELETE FROM race_results WHERE race_id = 'tazawako-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'tazawako-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'tazawako-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'tazawako-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'tazawako-marathon-2026',
  '田沢湖マラソン',
  'TAZAWAKO MARATHON',
  '2026-09-20',
  '05',
  '秋田県仙北市',
  '',
  '笑顔も深さも日本一！！～田沢湖ブルーを駆けぬけろ～
田沢湖マラソンは、1986年、県内初のフルマラソン大会として始まりました。 全国のフルマラソン大会の中でも開催時期が早いことで愛好者からの人気が高く、近年では国内外から3,000人前後が出場しています。 国内でも屈指の難コースといわれる日本一深い神秘の田沢湖を周回することで、国内外に仙北市の魅力を発信し、交流人口の増加を図りたいと考えています。',
  '',
  'https://tazawako-marathon.com/',
  10000,
  1,
  5550,
  '2026-04-01',
  '2026-05-27',
  0,
  'pre_mail',
  '',
  '',
  '[]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  '',
  '',
  '',
  '',
  '田沢湖',
  '#1e40af',
  'Tazawako',
  '日本最深の湖・田沢湖を一望しながら走る',
  'Run overlooking Lake Tazawa, Japan''s deepest lake',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '2026-03-29T11:30:29.091Z',
  '2026-08-24T16:41:07.705Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('tazawako-marathon-2026', 'full', 42.195, 360, '08:30', 1600, 10000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('tazawako-marathon-2026', 'other', 20, 180, '09:00', 2000, 8000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 1);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('tazawako-marathon-2026', '10k', 10, 120, '09:00', 1600, 6000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 2);
INSERT OR REPLACE INTO race_entry_links (race_id, site_name, url, sort_order) VALUES
  ('tazawako-marathon-2026', 'RUNNET', 'https://runnet.jp/entry/runtes/user/pc/competitionDetailAction.do?raceId=388457&div=1', 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('tazawako-marathon-2026', NULL, 'フルマラソン', 'Full Marathon', '2026-04-01', '2026-05-27', 10000, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('tazawako-marathon-2026', NULL, '20kmマラソン', '20km Marathon', '2026-04-01', '2026-05-27', 8000, 1);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('tazawako-marathon-2026', NULL, '10kmマラソン', '10km Marathon', '2026-04-01', '2026-05-27', 6000, 2);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('tazawako-marathon-2026', NULL, '3kmペアマラソン', '3km Pair Marathon', '2026-04-01', '2026-05-27', 5000, 3);

-- ==================
-- 当別スウェーデンマラソン (tobetsu-sweden-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'tobetsu-sweden-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'tobetsu-sweden-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'tobetsu-sweden-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'tobetsu-sweden-marathon-2026';
DELETE FROM access_points WHERE race_id = 'tobetsu-sweden-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'tobetsu-sweden-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'tobetsu-sweden-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'tobetsu-sweden-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'tobetsu-sweden-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'tobetsu-sweden-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'tobetsu-sweden-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'tobetsu-sweden-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'tobetsu-sweden-marathon-2026';
DELETE FROM race_results WHERE race_id = 'tobetsu-sweden-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'tobetsu-sweden-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'tobetsu-sweden-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'tobetsu-sweden-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'tobetsu-sweden-marathon-2026',
  '当別スウェーデンマラソン',
  'Tobetsu Sweden Marathon',
  '2026-10-18',
  '01',
  '石狩郡当別町',
  'Tobetsu, Ishikari District',
  '北欧の街並みが広がるスウェーデンヒルズを駆け抜けるマラソン大会（2018年開始、2026年で第7回）。ハーフマラソンとスウェーデンヒルズコース（11.9km）を実施。',
  'A race running through the Nordic-style townscape of Sweden Hills, first held in 2018 (7th edition in 2026), featuring a half marathon and an 11.9km Sweden Hills course.',
  'https://www.tobetsu-sweden-marathon.com/',
  7000,
  1,
  2300,
  '2026-07-03',
  '2026-09-03',
  0,
  'pre_mail',
  'ゼッケンは大会開催の2週間前を目途に事前発送されます。',
  'Race bibs are shipped in advance, approximately two weeks before the event.',
  '[]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  'スウェーデンヒルズ（北欧の街並み）',
  'Sweden Hills (Nordic-style townscape)',
  NULL,
  NULL,
  'スウェーデンヒルズ',
  '#2563eb',
  'Sweden Hills',
  '北欧の街並みを駆け抜ける、北海道発の新大会',
  'A new Hokkaido race through a Nordic-style town',
  NULL,
  NULL,
  NULL,
  'スウェーデンヒルズ',
  'Sweden Hills',
  NULL,
  NULL,
  NULL,
  '2026-08-25T00:00:00Z',
  '2026-08-24T16:41:57.446Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('tobetsu-sweden-marathon-2026', 'half', 21.1, 0, '', 2300, 7000, NULL, 'ハーフマラソン', 'Half Marathon', '当別町民は6,000円', 'Tobetsu resident discount: ¥6,000', NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('tobetsu-sweden-marathon-2026', 'other', 11.9, 0, '', 2300, 5000, NULL, 'スウェーデンヒルズコース', 'Sweden Hills Course', NULL, NULL, NULL, NULL, NULL, '[]', 1);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('tobetsu-sweden-marathon-2026', 'other', 2.2, 0, '', 0, 2500, NULL, 'ファンラン（ソロ）', 'Fun Run (Solo)', NULL, NULL, NULL, NULL, NULL, '[]', 2);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('tobetsu-sweden-marathon-2026', 'other', 2.2, 0, '', 0, 3500, NULL, 'ファンラン（ペア）', 'Fun Run (Pair)', '2人1組でエントリー', 'Entry as a pair of two', NULL, NULL, NULL, '[]', 3);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  ('tobetsu-sweden-marathon-2026', 'JRロイズタウン駅', 'JR Roystown Station', '', '無料シャトルバス利用（運行時間7:00～9:00）', 'Free shuttle bus (operating 7:00-9:00)', 0, 0, 0, 1, 0);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('tobetsu-sweden-marathon-2026', '["coupon"]', '当別町地域クーポン券1000円分（ハーフ・11.9kmの部）', 'Tobetsu local coupon worth 1,000 yen (Half Marathon and 11.9km categories)', NULL, 0);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('tobetsu-sweden-marathon-2026', '["coupon"]', '当別町地域クーポン券500円分（ファンランの部）', 'Tobetsu local coupon worth 500 yen (Fun Run categories)', NULL, 1);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('tobetsu-sweden-marathon-2026', NULL, '一般エントリー', 'General Entry', '2026-07-03', '2026-09-03', NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('tobetsu-sweden-marathon-2026', NULL, NULL, 'スウェーデンヒルズ', 'Sweden Hills', NULL, NULL, 0);

-- ==================
-- とくしまマラソン (tokushima-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'tokushima-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'tokushima-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'tokushima-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'tokushima-marathon-2026';
DELETE FROM access_points WHERE race_id = 'tokushima-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'tokushima-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'tokushima-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'tokushima-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'tokushima-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'tokushima-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'tokushima-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'tokushima-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'tokushima-marathon-2026';
DELETE FROM race_results WHERE race_id = 'tokushima-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'tokushima-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'tokushima-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'tokushima-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'tokushima-marathon-2026',
  'とくしまマラソン',
  'Tokushima Marathon',
  '2026-03-22',
  '36',
  '徳島市',
  'Tokushima City',
  '吉野川沿いを走る徳島のフルマラソン。阿波踊りの街を駆け抜ける。',
  'A full marathon along the Yoshino River in Tokushima, the city of Awa Odori dance.',
  'https://www.tokushima-marathon.jp',
  11000,
  0,
  0,
  '2025-09-30',
  '2025-12-31',
  0,
  'race_day',
  '',
  '',
  '[]',
  NULL,
  0,
  0,
  0,
  'road',
  '["JAAF","AIMS","WA"]',
  '吉野川、眉山、吉野川に架かる橋群（吉野川大橋・吉野川橋・西条大橋等）',
  'Yoshino River, Mt. Bizan, bridges over the Yoshino River (Yoshinogawa Ohashi, Yoshinogawa Bridge, Saijo Ohashi, etc.)',
  '制限時間7時間。今大会よりウェーブスタートを廃止。',
  'Time limit: 7 hours. Wave start has been discontinued for this event.',
  '阿波おどり',
  '#ea580c',
  'Awa-Odori',
  '踊る阿呆に走る阿呆！阿波の国を駆け抜ける',
  'Run the land of Awa dance — the spirit of Tokushima',
  NULL,
  NULL,
  NULL,
  'ワークスタッフ陸上競技場（徳島市陸上競技場）',
  'Workstaff Athletics Stadium (Tokushima City Athletics Stadium)',
  NULL,
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-08-24T16:43:11.778Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('tokushima-marathon-2026', 'full', 42.195, 0, '', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('tokushima-marathon-2026', '観光地', '鳴門の渦潮', 'Naruto Whirlpools', '世界三大潮流の一つ。大鳴門橋の遊歩道から渦潮を観察できる。', 'One of the world''s three great tidal currents. Observe whirlpools from the Onaruto Bridge walkway.', '徳島市から車約1時間', NULL, 34.2333, 134.6333);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('tokushima-marathon-2026', '["tshirt"]', '大会Tシャツ、完走メダル', 'Race T-shirt, Finisher medal', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('tokushima-marathon-2026', '["medal"]', '大会Tシャツ、完走メダル', 'Race T-shirt, Finisher medal', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('tokushima-marathon-2026', NULL, 'マラソン', 'Marathon', '2025-09-30', '2025-12-31', 11000, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('tokushima-marathon-2026', NULL, 'チャレンジラン', 'Challenge Run', '2025-09-30', '2025-11-30', 0, 1);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('tokushima-marathon-2026', NULL, NULL, '吉野川', 'Yoshino River', NULL, NULL, 0);

-- ==================
-- 東京レガシーハーフマラソン (tokyo-legacy-half-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'tokyo-legacy-half-2026';
DELETE FROM race_categories WHERE race_id = 'tokyo-legacy-half-2026';
DELETE FROM aid_stations WHERE race_id = 'tokyo-legacy-half-2026';
DELETE FROM checkpoints WHERE race_id = 'tokyo-legacy-half-2026';
DELETE FROM access_points WHERE race_id = 'tokyo-legacy-half-2026';
DELETE FROM nearby_spots WHERE race_id = 'tokyo-legacy-half-2026';
DELETE FROM weather_history WHERE race_id = 'tokyo-legacy-half-2026';
DELETE FROM participation_gifts WHERE race_id = 'tokyo-legacy-half-2026';
DELETE FROM completion_gifts WHERE race_id = 'tokyo-legacy-half-2026';
DELETE FROM race_entry_links WHERE race_id = 'tokyo-legacy-half-2026';
DELETE FROM race_entry_periods WHERE race_id = 'tokyo-legacy-half-2026';
DELETE FROM reception_sessions WHERE race_id = 'tokyo-legacy-half-2026';
DELETE FROM race_travel_times WHERE race_id = 'tokyo-legacy-half-2026';
DELETE FROM race_results WHERE race_id = 'tokyo-legacy-half-2026';
DELETE FROM race_gallery WHERE race_id = 'tokyo-legacy-half-2026';
DELETE FROM race_voices WHERE race_id = 'tokyo-legacy-half-2026';
DELETE FROM race_time_buckets WHERE race_id = 'tokyo-legacy-half-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'tokyo-legacy-half-2026',
  '東京レガシーハーフマラソン',
  'Tokyo Legacy Half ',
  '2026-10-18',
  '13',
  '新宿区霞ヶ丘町',
  'Kasumigaoka-cho, Shinjuku Ward',
  '',
  '',
  'https://legacyhalf.tokyo/',
  NULL,
  1,
  0,
  '2026-05-18',
  '2026-05-25',
  0,
  'pre_day',
  '期間
2026年10月16日(金)　11時00分～20時30分
2026年10月17日(土)　10時00分～19時30分
※ 上記受付期間内に、必ずランナー本人が受付を行ってください。
※ 大会当日【10月18日(日)】は、ランナー受付を行いません。
会場
MUFGスタジアム(国立競技場)：東京都新宿区霞ヶ丘町10-1',
  'Dates and Times
Friday, October 16, 2026: 11:00 AM – 8:30 PM
Saturday, October 17, 2026: 10:00 AM – 7:30 PM
* Runners must check in in person during the above registration period.
* There will be no runner registration on the day of the event [Sunday, October 18].
Venue
MUFG Stadium (National Stadium): 10-1 Kasumigaoka-cho, Shinjuku-ku, Tokyo',
  '[]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  '',
  '',
  '',
  '',
  '遺産',
  '#F8F8FF',
  'Legacy',
  '感動や文化を次世代へ引き継ぐ',
  'Passing on inspiration and culture to the next generation',
  NULL,
  NULL,
  NULL,
  'MUFGスタジアム（国立競技場）',
  'MUFG Stadium (National Stadium)',
  '東京都新宿区霞ヶ丘町10-1',
  NULL,
  NULL,
  '2026-05-14T14:47:07.523Z',
  '2026-07-27T14:34:07.789Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('tokyo-legacy-half-2026', 'half', 21.0975, 180, '08:05', 18000, 13200, NULL, NULL, NULL, NULL, NULL, '大会当日満18歳以上で以下の条件にあてはまる者で、主催者が出場を認めた者。
※主催者が実施するイベント等による出走権付与者を含みます。
一般の部：2時間40分以内に完走できる男子・女子・ノンバイナリー。
障がい者の部：2時間40分以内に完走できる男子・女子・ノンバイナリー。
※ 障がいのある方で単独走行が困難な方はガイドランナーを1名つけることができます。(盲導犬等の伴走は不可とします。)
障がい者(車いす)の部：レース仕様車でハーフマラソンを1時間40分以内に完走できる男子・女子・ノンバイナリー。
学生チームの部：2時間40分以内に完走できる学生(国内のみ)。
※ 1チーム7名～10名とします。
※ ランナー受付時に学生証の提示が必須となります。
※ 障がいのある方で単独走行が困難な方はガイドランナーを1名つけることができます。(盲導犬等の伴走は不可とします。)
準エリートの部
国内
2026年度日本陸上競技連盟登録競技者である男子・女子。
2024年5月1日から2026年4月30日までの公認記録またはワールドアスレティックスラベルロードレース公式記録で下記参加基準に達する男子・女子。
　　男子：ハーフマラソン1時間14分00秒以内
　　女子：ハーフマラソン1時間40分00秒以内
海外
2024年5月1日から2026年4月30日までのワールドアスレティックスラベルロードレース公式記録で下記参加基準に達する男子・女子。
　　男子：ハーフマラソン1時間14分00秒以内
　　女子：ハーフマラソン1時間40分00秒以内
※ 障がいのある方で単独走行が困難な方はガイドランナーを1名つけることができます。(盲導犬等の伴走は不可とします。)
エリートの部
2026年度日本陸上競技連盟登録競技者で、別途定める参加基準に達する男子・女子。
招待選手(主催者または日本陸上競技連盟が推薦する国内・海外の男子・女子)。
パラアスリートの部
2026年度日本パラスポーツ協会に加盟するパラ陸上競技団体登録競技者で、大会当日までに有効な競技クラスを有し、別途定める参加基準に達する男子・女子。
招待選手(主催者または日本パラスポーツ協会に加盟するパラ陸上競技団体が推薦する国内・海外の男子・女子)。
実施クラス：
①視覚障がいT11/T12、上肢障がいT45/T46、車いすT53/T54
②上記以外でIPC(国際パラリンピック委員会)のカテゴリーにあるすべてのクラス', 'Participants must be at least 18 years of age on the day of the event, meet the following criteria, and have been approved by the organizers.
*This includes individuals who have been granted entry through events organized by the organizers.
General Division: Men, women, and non-binary individuals capable of completing the race within 2 hours and 40 minutes.
Disabled Division: Men, women, and non-binary individuals capable of completing the race within 2 hours and 40 minutes.
* Participants with disabilities who have difficulty running independently may be accompanied by one guide runner. (Assistance from guide dogs or similar animals is not permitted.)
Disabled (Wheelchair) Division: Men, women, and non-binary individuals who can complete the half marathon in a race-spec wheelchair within 1 hour and 40 minutes.
Student Team Division: Students (domestic only) who can complete the race within 2 hours and 40 minutes.
* Teams must consist of 7 to 10 members.
* A student ID must be presented at runner registration.
* Participants with disabilities who have difficulty running independently may be accompanied by one guide runner. (Guide dogs and other assistance animals are not permitted.)
Semi-Elite Division* Participants with disabilities who have difficulty running independently may be accompanied by one guide runner. (Guide dogs and other assistance animals are not permitted.)
Domestic
Men and women registered with the Japan Association of Athletics Federations for the 2026 season.
Men and women who meet the following participation criteria based on certified records or official World Athletics Label Road Race records from May 1, 2024, to April 30, 2026.
　　Men: Half marathon in 1 hour 14 minutes 00 seconds or less
　　Women: Half marathon in 1 hour 40 minutes 00 seconds or less
International
Men and women who meet the following participation standards based on official World Athletics Label Road Race records from May 1, 2024, to April 30, 2026.
　　Men: Half marathon in 1 hour 14 minutes 00 seconds or faster
　　Women: Half marathon in 1 hour 40 minutes 00 seconds or faster
Elite Division
Men and women who are registered athletes with the Japan Association of Athletics Federations for the 2026 season and meet the separately specified participation criteria.
Invited Athletes (men and women from Japan and overseas recommended by the organizer or the Japan Association of Athletics Federations).
Para-Athletes Division
Men and women who are registered athletes with a para-athletics organization affiliated with the Japan Para Sports Association for the 2026 season, hold a valid competition class by the day of the event, and meet the separately specified participation criteria.
Invited Athletes (men and women from Japan and overseas recommended by the organizer or a para-athletics organization affiliated with the Japan Para Sports Association).
Competition Classes:
① Visual Impairment T11/T12, Upper Limb Impairment T45/T46, Wheelchair T53/T54
② All classes falling under the IPC (International Paralympic Committee) categories other than those listed above

Translated with DeepL.com (free version)', NULL, '[]', 0);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('tokyo-legacy-half-2026', '["goods"]', '', '', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('tokyo-legacy-half-2026', '["medal"]', '', '', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('tokyo-legacy-half-2026', NULL, 'ジャパンプレミアハーフ優先エントリー', 'General Entry', '2026-05-18', '2026-05-25', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('tokyo-legacy-half-2026', NULL, '一般エントリー', 'General Entry', '2026-05-26', '2026-06-09', NULL, 1);

-- ==================
-- 東京マラソン (tokyo-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'tokyo-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'tokyo-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'tokyo-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'tokyo-marathon-2026';
DELETE FROM access_points WHERE race_id = 'tokyo-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'tokyo-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'tokyo-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'tokyo-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'tokyo-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'tokyo-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'tokyo-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'tokyo-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'tokyo-marathon-2026';
DELETE FROM race_results WHERE race_id = 'tokyo-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'tokyo-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'tokyo-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'tokyo-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'tokyo-marathon-2026',
  '東京マラソン',
  'Tokyo Marathon',
  '2026-03-01',
  '13',
  '新宿区〜千代田区',
  'Shinjuku to Chiyoda',
  '日本最大規模の市民マラソン。東京都庁をスタートし、皇居、浅草、銀座など東京の名所を巡り東京駅前でフィニッシュ。ワールドマラソンメジャーズの一つ。',
  'Japan''s largest citizens'' marathon. Starting from Tokyo Metropolitan Government, passing the Imperial Palace, Asakusa, Ginza, finishing at Tokyo Station. One of the World Marathon Majors.',
  'https://www.marathon.tokyo',
  NULL,
  1,
  38500,
  '2025-08-15',
  '2025-08-29',
  0,
  'pre_day',
  'EXPO会場（東京ビッグサイト）にて前日受付。2/26-28。大会当日の受付なし。',
  'Pre-race registration at EXPO venue (Tokyo Big Sight). Feb 26-28. No registration on race day.',
  '["フラット","ワールドメジャーズ","初心者おすすめ","大規模","日本陸連公認","観光"]',
  NULL,
  40,
  3,
  37,
  'road',
  '["JAAF","AIMS","WMM"]',
  '東京都庁、皇居、浅草雷門、銀座、東京タワー、東京駅丸の内',
  'Tokyo Metropolitan Government, Imperial Palace, Asakusa Kaminarimon, Ginza, Tokyo Tower, Tokyo Station Marunouchi',
  NULL,
  NULL,
  '東京の街',
  '#1e293b',
  'Tokyo-no-Machi',
  '世界6大メジャーの一つ、東京の街を駆け抜ける',
  'Race through Tokyo — one of the six World Marathon Majors',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-03-15T00:00:00Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('tokyo-marathon-2026', 'full', 42.195, 420, '09:10', 38500, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  ('tokyo-marathon-2026', '新宿駅', 'Shinjuku Station', 'shinjuku', '新宿駅西口から徒歩約10分でスタート会場（東京都庁前）', '10 min walk from Shinjuku Station West Exit to the start (Tokyo Metropolitan Government)', 35.6896, 139.6999, NULL, 0, 0);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  ('tokyo-marathon-2026', '都庁前駅', 'Tochomae Station', 'tochomae', '都営大江戸線都庁前駅直結', 'Direct access from Toei Oedo Line Tochomae Station', 35.6915, 139.6917, NULL, 0, 1);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('tokyo-marathon-2026', '観光地', '浅草寺・雷門', 'Sensoji Temple & Kaminarimon', 'コース上を通過する東京を代表する観光名所。外国人ランナーにも人気のスポット。', 'An iconic Tokyo landmark on the course. Popular with international runners.', 'コース上（約15km地点）', NULL, 35.7148, 139.7967);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('tokyo-marathon-2026', '観光地', '皇居', 'Imperial Palace', 'コースの中盤で皇居周辺を通過。普段はランナーの聖地として知られるランニングコース。', 'The course passes near the Imperial Palace in the middle section. Known as a holy ground for runners.', 'コース上（約37km地点）', NULL, 35.6852, 139.7528);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('tokyo-marathon-2026', 'グルメ', '東京駅周辺グルメ', 'Tokyo Station Area Dining', 'フィニッシュ地点の東京駅周辺には多数の飲食店。レース後の打ち上げに最適。', 'Numerous restaurants around Tokyo Station at the finish. Perfect for post-race celebrations.', 'フィニッシュ地点周辺', NULL, 35.6812, 139.7671);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('tokyo-marathon-2026', '["tshirt","towel"]', '参加記念Tシャツ（参加者全員）、完走メダル（完走者）、完走タオル（完走者）', 'Commemorative T-shirt (all participants), Finisher medal (finishers), Finisher towel (finishers)', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('tokyo-marathon-2026', '["medal"]', '参加記念Tシャツ（参加者全員）、完走メダル（完走者）、完走タオル（完走者）', 'Commemorative T-shirt (all participants), Finisher medal (finishers), Finisher towel (finishers)', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('tokyo-marathon-2026', NULL, '一般エントリー', 'General Entry', '2025-08-15', '2025-08-29', NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('tokyo-marathon-2026', NULL, NULL, '東京都庁', 'Tokyo Metropolitan Government', NULL, NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('tokyo-marathon-2026', NULL, NULL, '皇居', 'Imperial Palace', NULL, NULL, 1);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('tokyo-marathon-2026', NULL, NULL, '浅草雷門', 'Asakusa Kaminarimon', NULL, NULL, 2);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('tokyo-marathon-2026', NULL, NULL, '銀座', 'Ginza', NULL, NULL, 3);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('tokyo-marathon-2026', NULL, NULL, '東京タワー', 'Tokyo Tower', NULL, NULL, 4);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('tokyo-marathon-2026', NULL, NULL, '東京駅丸の内', 'Tokyo Station Marunouchi', NULL, NULL, 5);

-- ==================
-- 東京マラソン (tokyo-marathon-2027)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'tokyo-marathon-2027';
DELETE FROM race_categories WHERE race_id = 'tokyo-marathon-2027';
DELETE FROM aid_stations WHERE race_id = 'tokyo-marathon-2027';
DELETE FROM checkpoints WHERE race_id = 'tokyo-marathon-2027';
DELETE FROM access_points WHERE race_id = 'tokyo-marathon-2027';
DELETE FROM nearby_spots WHERE race_id = 'tokyo-marathon-2027';
DELETE FROM weather_history WHERE race_id = 'tokyo-marathon-2027';
DELETE FROM participation_gifts WHERE race_id = 'tokyo-marathon-2027';
DELETE FROM completion_gifts WHERE race_id = 'tokyo-marathon-2027';
DELETE FROM race_entry_links WHERE race_id = 'tokyo-marathon-2027';
DELETE FROM race_entry_periods WHERE race_id = 'tokyo-marathon-2027';
DELETE FROM reception_sessions WHERE race_id = 'tokyo-marathon-2027';
DELETE FROM race_travel_times WHERE race_id = 'tokyo-marathon-2027';
DELETE FROM race_results WHERE race_id = 'tokyo-marathon-2027';
DELETE FROM race_gallery WHERE race_id = 'tokyo-marathon-2027';
DELETE FROM race_voices WHERE race_id = 'tokyo-marathon-2027';
DELETE FROM race_time_buckets WHERE race_id = 'tokyo-marathon-2027';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'tokyo-marathon-2027',
  '東京マラソン',
  'Tokyo Marathon',
  '2027-03-07',
  '13',
  '新宿区〜千代田区',
  'Shinjuku to Chiyoda',
  '日本最大規模の市民マラソン。東京都庁をスタートし、皇居、浅草、銀座など東京の名所を巡り東京駅前でフィニッシュ。ワールドマラソンメジャーズの一つ。',
  'Japan''s largest citizens'' marathon. Starting from Tokyo Metropolitan Government, passing the Imperial Palace, Asakusa, Ginza, finishing at Tokyo Station. One of the World Marathon Majors.',
  'https://www.marathon.tokyo',
  NULL,
  1,
  38500,
  '2026-06-24',
  '2026-08-28',
  0,
  'pre_day',
  'EXPO会場（東京ビッグサイト）にて前日受付。大会当日の受付なし。',
  'Pre-race registration at EXPO venue (Tokyo Big Sight). No registration on race day.',
  '["フラット","ワールドメジャーズ","初心者おすすめ","大規模","日本陸連公認","観光"]',
  NULL,
  40,
  3,
  37,
  'road',
  '["JAAF","AIMS","WMM"]',
  '東京都庁、皇居、浅草雷門、銀座、東京タワー、東京駅丸の内',
  'Tokyo Metropolitan Government, Imperial Palace, Asakusa Kaminarimon, Ginza, Tokyo Tower, Tokyo Station Marunouchi',
  NULL,
  NULL,
  '東京の街',
  '#1e293b',
  'Tokyo-no-Machi',
  '世界6大メジャーの一つ、東京の街を駆け抜ける',
  'Race through Tokyo — one of the six World Marathon Majors',
  NULL,
  NULL,
  NULL,
  '東京都庁前',
  'Tokyo Metropolitan Government Plaza',
  '東京都新宿区西新宿2丁目8-1',
  NULL,
  NULL,
  '2026-06-24T00:00:00Z',
  '2026-07-27T14:34:48.172Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('tokyo-marathon-2027', 'full', 42.195, 420, '09:10', 38500, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  ('tokyo-marathon-2027', '新宿駅', 'Shinjuku Station', 'shinjuku', '新宿駅西口から徒歩約10分でスタート会場（東京都庁前）', '10 min walk from Shinjuku Station West Exit to the start (Tokyo Metropolitan Government)', 35.6896, 139.6999, 10, 0, 0);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  ('tokyo-marathon-2027', '都庁前駅', 'Tochomae Station', 'tochomae', '都営大江戸線都庁前駅直結', 'Direct access from Toei Oedo Line Tochomae Station', 35.6915, 139.6917, NULL, 1, 1);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('tokyo-marathon-2027', '観光地', '浅草寺・雷門', 'Sensoji Temple & Kaminarimon', 'コース上を通過する東京を代表する観光名所。外国人ランナーにも人気のスポット。', 'An iconic Tokyo landmark on the course. Popular with international runners.', 'コース上（約15km地点）', NULL, 35.7148, 139.7967);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('tokyo-marathon-2027', '観光地', '皇居', 'Imperial Palace', 'コースの中盤で皇居周辺を通過。普段はランナーの聖地として知られるランニングコース。', 'The course passes near the Imperial Palace in the middle section. Known as a holy ground for runners.', 'コース上（約37km地点）', NULL, 35.6852, 139.7528);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('tokyo-marathon-2027', 'グルメ', '東京駅周辺グルメ', 'Tokyo Station Area Dining', 'フィニッシュ地点の東京駅周辺には多数の飲食店。レース後の打ち上げに最適。', 'Numerous restaurants around Tokyo Station at the finish. Perfect for post-race celebrations.', 'フィニッシュ地点周辺', NULL, 35.6812, 139.7671);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('tokyo-marathon-2027', '["tshirt"]', '参加記念Tシャツ（参加者全員）', 'Commemorative T-shirt (all participants)', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('tokyo-marathon-2027', '["medal","towel"]', '完走メダル、完走タオル（完走者）', 'Finisher medal, Finisher towel (finishers)', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('tokyo-marathon-2027', NULL, 'チャリティランナー寄付申込', 'Charity Runner Donation Entry', '2026-06-24', '2026-07-09', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('tokyo-marathon-2027', NULL, 'ONE TOKYOプレミアムメンバーエントリー', 'ONE TOKYO Premium Member Entry', '2026-07-31', '2026-08-13', NULL, 1);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('tokyo-marathon-2027', NULL, '準エリートエントリー', 'Sub-Elite Entry', '2026-07-31', '2026-08-13', NULL, 2);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('tokyo-marathon-2027', NULL, '一般エントリー', 'General Entry', '2026-08-14', '2026-08-28', NULL, 3);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('tokyo-marathon-2027', NULL, NULL, '東京都庁', 'Tokyo Metropolitan Government', NULL, NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('tokyo-marathon-2027', NULL, NULL, '皇居', 'Imperial Palace', NULL, NULL, 1);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('tokyo-marathon-2027', NULL, NULL, '浅草雷門', 'Asakusa Kaminarimon', NULL, NULL, 2);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('tokyo-marathon-2027', NULL, NULL, '銀座', 'Ginza', NULL, NULL, 3);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('tokyo-marathon-2027', NULL, NULL, '東京タワー', 'Tokyo Tower', NULL, NULL, 4);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('tokyo-marathon-2027', NULL, NULL, '東京駅丸の内', 'Tokyo Station Marunouchi', NULL, NULL, 5);

-- ==================
-- 富里スイカロードレース (tomisato-suikaroad-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'tomisato-suikaroad-2026';
DELETE FROM race_categories WHERE race_id = 'tomisato-suikaroad-2026';
DELETE FROM aid_stations WHERE race_id = 'tomisato-suikaroad-2026';
DELETE FROM checkpoints WHERE race_id = 'tomisato-suikaroad-2026';
DELETE FROM access_points WHERE race_id = 'tomisato-suikaroad-2026';
DELETE FROM nearby_spots WHERE race_id = 'tomisato-suikaroad-2026';
DELETE FROM weather_history WHERE race_id = 'tomisato-suikaroad-2026';
DELETE FROM participation_gifts WHERE race_id = 'tomisato-suikaroad-2026';
DELETE FROM completion_gifts WHERE race_id = 'tomisato-suikaroad-2026';
DELETE FROM race_entry_links WHERE race_id = 'tomisato-suikaroad-2026';
DELETE FROM race_entry_periods WHERE race_id = 'tomisato-suikaroad-2026';
DELETE FROM reception_sessions WHERE race_id = 'tomisato-suikaroad-2026';
DELETE FROM race_travel_times WHERE race_id = 'tomisato-suikaroad-2026';
DELETE FROM race_results WHERE race_id = 'tomisato-suikaroad-2026';
DELETE FROM race_gallery WHERE race_id = 'tomisato-suikaroad-2026';
DELETE FROM race_voices WHERE race_id = 'tomisato-suikaroad-2026';
DELETE FROM race_time_buckets WHERE race_id = 'tomisato-suikaroad-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'tomisato-suikaroad-2026',
  '富里スイカロードレース',
  'Tomisato Suika Road Race',
  '2026-06-14',
  '12',
  '富里市',
  'Tomisato City, Chiba',
  'スイカの一大産地・千葉県富里市で毎年6月に開催される人気大会。エイドステーションでスイカを食べながら走れる名物大会。コース沿いのスイカ畑が広がる田園風景の中、7kmと10kmで競う。マイカップ給水対応。',
  'A popular race held every June in Tomisato City, Chiba, the top watermelon-producing area in Japan. Famous for eating watermelon at aid stations while running. Race through scenic watermelon fields in 7km and 10km distances. Supports personal cup hydration.',
  'https://tomisato-suikaroad.jp/',
  6500,
  1,
  7000,
  '2026-02-22',
  '2026-04-04',
  0,
  'race_day',
  '雨天決行。スポーツエントリー（インターネット）で申込。先着順。',
  'Held rain or shine. Entry via Sports Entry (online). First-come, first-served.',
  '["ご当地エイド","ご当地グルメ","コスパが良い","初心者おすすめ","夏マラソン"]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  'スイカ畑の田園風景',
  'Scenic watermelon fields',
  'エイドでスイカ配布。マイカップ給水対応。',
  'Watermelon served at aid stations. Personal cup hydration supported.',
  '給スイカ所',
  '#16a34a',
  'KyuSuika',
  '日本一のスイカの産地・富里を走る、夏の風物詩',
  'Run Japan''s watermelon capital — a midsummer tradition',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '2026-03-30T00:00:00Z',
  '2026-05-30T06:43:46.887Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('tomisato-suikaroad-2026', '10k', 10, 70, '09:15', 1500, 6500, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('tomisato-suikaroad-2026', 'other', 7, 90, '10:00', 5100, 6500, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 1);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('tomisato-suikaroad-2026', '["tshirt"]', 'Tシャツ（大会当日、「Tシャツ引換所」で引き換え）', '', NULL, 0);
INSERT OR REPLACE INTO race_entry_links (race_id, site_name, url, sort_order) VALUES
  ('tomisato-suikaroad-2026', 'SPORT ENTRY', 'https://www.sportsentry.ne.jp/event/t/104032', 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('tomisato-suikaroad-2026', NULL, '一般エントリー', 'General Entry', '2026-02-22', '2026-04-04', NULL, 0);

-- ==================
-- 鳥取マラソン (tottori-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'tottori-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'tottori-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'tottori-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'tottori-marathon-2026';
DELETE FROM access_points WHERE race_id = 'tottori-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'tottori-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'tottori-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'tottori-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'tottori-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'tottori-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'tottori-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'tottori-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'tottori-marathon-2026';
DELETE FROM race_results WHERE race_id = 'tottori-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'tottori-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'tottori-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'tottori-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'tottori-marathon-2026',
  '鳥取マラソン',
  'Tottori Marathon',
  '2026-03-15',
  '31',
  '鳥取市',
  'Tottori City',
  '鳥取砂丘に近いコースを走るフルマラソン。日本海沿いの景色を楽しめる。',
  'A full marathon near Tottori Sand Dunes. Enjoy views along the Sea of Japan coast.',
  'https://tottori-marathon.jp',
  13000,
  1,
  4000,
  '2025-10-15',
  '2025-12-12',
  0,
  'pre_day',
  '',
  '',
  '["景色が良い"]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  '鳥取砂丘付近、日本海',
  'Near Tottori Sand Dunes, Sea of Japan',
  NULL,
  NULL,
  '砂丘',
  '#d4a853',
  'Sakyu',
  '日本最大の砂丘を望む、山陰の大地を走る',
  'Run the San-in coast with Japan''s great sand dunes in view',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-05-30T06:43:52.495Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('tottori-marathon-2026', 'full', 42.195, 0, '', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('tottori-marathon-2026', '観光地', '鳥取砂丘', 'Tottori Sand Dunes', '日本最大級の砂丘。起伏のある広大な砂の風景は圧巻。パラグライダーやラクダ乗りも。', 'Japan''s largest sand dunes. Vast sandy landscape. Paragliding and camel rides available.', '会場から車約15分', NULL, 35.5411, 134.2289);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('tottori-marathon-2026', '["tshirt","towel","local_product"]', '大会Tシャツ
●完走賞
・完走証
・特別メダル
・フィニッシャータオル
・鳥取のお土産
・スポンサードリンク
', 'Race T-shirt', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('tottori-marathon-2026', '["medal"]', '大会Tシャツ
●完走賞
・完走証
・特別メダル
・フィニッシャータオル
・鳥取のお土産
・スポンサードリンク
', 'Race T-shirt', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('tottori-marathon-2026', NULL, '一般エントリー', 'General Entry', '2025-10-15', '2025-12-12', NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('tottori-marathon-2026', NULL, NULL, '鳥取砂丘付近', 'Near Tottori Sand Dunes', NULL, NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('tottori-marathon-2026', NULL, NULL, '日本海', 'Sea of Japan', NULL, NULL, 1);

-- ==================
-- 洞爺湖マラソン (toyako-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'toyako-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'toyako-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'toyako-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'toyako-marathon-2026';
DELETE FROM access_points WHERE race_id = 'toyako-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'toyako-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'toyako-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'toyako-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'toyako-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'toyako-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'toyako-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'toyako-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'toyako-marathon-2026';
DELETE FROM race_results WHERE race_id = 'toyako-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'toyako-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'toyako-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'toyako-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'toyako-marathon-2026',
  '洞爺湖マラソン',
  'Lake Toya Marathon',
  '2026-05-17',
  '01',
  '洞爺湖町',
  'Toyako Town',
  '北海道・洞爺湖畔を一周するフルマラソン。羊蹄山と洞爺湖の絶景を楽しめる。新緑の季節に開催。',
  'A full marathon circling Lake Toya in Hokkaido. Enjoy magnificent views of Mt. Yotei and Lake Toya in the fresh green season.',
  'https://www.toyako-marathon.jp',
  11500,
  1,
  4500,
  '2026-02-01',
  '2026-03-08',
  0,
  'pre_day',
  '',
  '',
  '["北海道","景色が良い","湖畔"]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  '洞爺湖、羊蹄山',
  'Lake Toya, Mt. Yotei',
  NULL,
  NULL,
  '洞爺湖',
  '#0369a1',
  'Toyako',
  '洞爺湖の湖畔を巡る、北海道の爽快42km',
  'Circle the shores of Lake Toya in refreshing Hokkaido',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-05-30T06:44:01.797Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('toyako-marathon-2026', 'full', 42.195, 0, '', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('toyako-marathon-2026', '温泉', '洞爺湖温泉', 'Lake Toya Onsen', '洞爺湖畔の温泉街。湖と羊蹄山を望む露天風呂が魅力。レース後のリカバリーに最適。', 'Hot spring town on the shore of Lake Toya. Open-air baths with views of the lake and Mt. Yotei. Perfect for post-race recovery.', '会場付近', NULL, 42.55, 140.85);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('toyako-marathon-2026', '観光地', '有珠山・昭和新山', 'Mt. Usu & Showa-Shinzan', '活火山とその噴火で誕生した昭和新山。ロープウェイで山頂へ。洞爺湖を一望。', 'An active volcano and Showa-Shinzan born from its eruption. Ropeway to the summit with panoramic lake views.', '洞爺湖温泉から車約10分', NULL, 42.5389, 140.8411);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('toyako-marathon-2026', '["tshirt"]', '大会Tシャツとトートバッグ及びフェイスタオル、完走メダル', 'Race T-shirt, Finisher medal', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('toyako-marathon-2026', '["medal"]', '大会Tシャツとトートバッグ及びフェイスタオル、完走メダル', 'Race T-shirt, Finisher medal', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('toyako-marathon-2026', NULL, '一般エントリー', 'General Entry', '2026-02-01', '2026-03-08', NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('toyako-marathon-2026', NULL, NULL, '洞爺湖', 'Lake Toya', NULL, NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('toyako-marathon-2026', NULL, NULL, '羊蹄山', 'Mt. Yotei', NULL, NULL, 1);

-- ==================
-- 富山マラソン (toyama-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'toyama-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'toyama-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'toyama-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'toyama-marathon-2026';
DELETE FROM access_points WHERE race_id = 'toyama-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'toyama-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'toyama-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'toyama-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'toyama-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'toyama-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'toyama-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'toyama-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'toyama-marathon-2026';
DELETE FROM race_results WHERE race_id = 'toyama-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'toyama-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'toyama-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'toyama-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'toyama-marathon-2026',
  '富山マラソン',
  'Toyama Marathon',
  '2026-11-01',
  '16',
  '富山市〜高岡市',
  'Toyama to Takaoka',
  '立山連峰を望みながら走るフルマラソン。新湊大橋を渡るコースが特徴。富山湾の景色が美しい。',
  'A full marathon with views of the Tateyama mountain range. Features crossing the Shinminato Bridge with beautiful Toyama Bay scenery.',
  'https://www.toyamamarathon.com',
  14000,
  1,
  13000,
  '2026-04-11',
  '2026-06-30',
  0,
  'pre_day',
  'マラソン・ジョギングの部は令和8年10月31日（土）9:30～19:00、YKK APアリーナ（富山市湊入船町12-1）にて受付。上記時間帯以外・大会当日の受付は行わない。車いすの部は大会当日7:00～7:30、スタート地点（高岡市役所前）周辺受付テントにて受付。',
  'Marathon and Jogging entries: reception on Sat, Oct 31, 2026, 9:30-19:00 at YKK AP Arena (12-1 Minatoirifune-cho, Toyama City). No same-day reception. Wheelchair category: reception on race day 7:00-7:30 near the start (Takaoka City Hall).',
  '["景色が良い","橋"]',
  NULL,
  0,
  0,
  0,
  'road',
  '["JAAF"]',
  '高岡古城公園、高岡大仏、山町筋、新湊漁港、新湊大橋、海王丸パーク、立山連峰、富岩運河環水公園',
  'Takaoka Kojyo Park, Takaoka Daibutsu, Yamachosuji, Shinminato Port, Shinminato Bridge, Kaiomaru Park, Tateyama Mountains, Fugan Canal Kansui Park',
  '前回大会からコースの一部を変更：①赤祖父折り返し約260m短縮 ②射水高専折り返し約180m短縮 ③フィニッシュ位置約440m延伸',
  'Course partially changed from the previous edition: (1) Akasoba turnaround shortened by approx. 260m, (2) Imizu National College turnaround shortened by approx. 180m, (3) finish location extended by approx. 440m.',
  '立山連峰',
  '#1e3a8a',
  'Tateyama-Rempo',
  '立山連峰と富山湾を望む、360度の絶景コース',
  'Run with panoramic views of the Tateyama Range and Toyama Bay',
  NULL,
  NULL,
  NULL,
  '高岡市役所前',
  'Takaoka City Hall',
  NULL,
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-08-24T16:44:40.715Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('toyama-marathon-2026', 'full', 42.195, 420, '09:30', 13000, 14000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  ('toyama-marathon-2026', '新高岡駅', 'Shin-Takaoka Station', '', '南口からスタート会場直行の無料シャトルバス（約15分）', 'Free shuttle bus from south exit directly to start venue (approx. 15 min)', 0, 0, 0, 1, 0);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  ('toyama-marathon-2026', '高岡駅', 'Takaoka Station', '', '徒歩約20分', 'Approx. 20 min walk', 0, 0, 20, 0, 1);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('toyama-marathon-2026', '観光地', '立山黒部アルペンルート', 'Tateyama Kurobe Alpine Route', '世界有数の山岳観光ルート。レース翌日の観光に。11月上旬は紅葉シーズン。', 'One of the world''s premier mountain sightseeing routes. For sightseeing the day after. Early November is autumn foliage season.', '富山駅から電鉄富山駅経由', NULL, 36.5778, 137.6028);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('toyama-marathon-2026', 'グルメ', '富山ブラックラーメン・白えび', 'Toyama Black Ramen & White Shrimp', '富山名物の濃い醤油ラーメンと、富山湾の宝石・白えび。', 'Toyama''s dark soy sauce ramen and white shrimp, jewels of Toyama Bay.', '富山市内', NULL, 36.6953, 137.2113);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('toyama-marathon-2026', '["tshirt","towel"]', '大会Tシャツ、完走メダル・フィニッシャータオル', 'Race T-shirt, Finisher medal', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('toyama-marathon-2026', '["medal"]', '大会Tシャツ、完走メダル・フィニッシャータオル', 'Race T-shirt, Finisher medal', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('toyama-marathon-2026', NULL, '一般エントリー', 'General Entry', '2026-04-11', '2026-06-30', 14000, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('toyama-marathon-2026', NULL, NULL, '立山連峰', 'Tateyama Mountains', NULL, NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('toyama-marathon-2026', NULL, NULL, '新湊大橋', 'Shinminato Bridge', NULL, NULL, 1);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('toyama-marathon-2026', NULL, NULL, '富山湾', 'Toyama Bay', NULL, NULL, 2);

-- ==================
-- つくばマラソン (tsukuba-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'tsukuba-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'tsukuba-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'tsukuba-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'tsukuba-marathon-2026';
DELETE FROM access_points WHERE race_id = 'tsukuba-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'tsukuba-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'tsukuba-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'tsukuba-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'tsukuba-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'tsukuba-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'tsukuba-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'tsukuba-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'tsukuba-marathon-2026';
DELETE FROM race_results WHERE race_id = 'tsukuba-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'tsukuba-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'tsukuba-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'tsukuba-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'tsukuba-marathon-2026',
  'つくばマラソン',
  'Tsukuba Marathon',
  '2026-11-22',
  '08',
  'つくば市',
  'Tsukuba City',
  '筑波研究学園都市を走るフルマラソン。フラットなコースで記録を狙いやすい。2025年にコースを大幅変更。',
  'A full marathon through Tsukuba Science City. The flat course is ideal for personal records. Course significantly changed in 2025.',
  'https://www.tsukuba-marathon.com',
  NULL,
  1,
  0,
  '2026-07-05',
  '2026-07-27',
  0,
  'pre_day',
  '',
  '',
  '["フラット","記録狙い"]',
  NULL,
  0,
  0,
  0,
  'road',
  '["JAAF"]',
  '筑波研究学園都市',
  'Tsukuba Science City',
  NULL,
  NULL,
  '筑波山',
  '#374151',
  'Tsukuba-san',
  '西の富士、東の筑波。科学の街を快走する',
  'Run through the science city with Mt. Tsukuba as your landmark',
  NULL,
  NULL,
  NULL,
  'つくば市役所',
  'Tsukuba City Hall',
  NULL,
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-08-31T13:40:53.927Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('tsukuba-marathon-2026', 'full', 42.195, 0, '', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  ('tsukuba-marathon-2026', '研究学園駅', 'Kenkyu-Gakuen Station', '', '徒歩7分', '7 min walk', 0, 0, 7, 1, 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('tsukuba-marathon-2026', '観光地', '筑波山', 'Mt. Tsukuba', '関東平野にそびえる名山。ロープウェイで山頂へ。コースからも望める。', 'A famous mountain rising from the Kanto Plain. Ropeway to the summit. Visible from the course.', 'つくば市から車約30分', NULL, 36.2253, 140.1);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('tsukuba-marathon-2026', '["tshirt"]', '大会Tシャツ', 'Race T-shirt', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('tsukuba-marathon-2026', NULL, '一般エントリー', 'General Entry', '2026-07-05', '2026-07-27', NULL, 0);

-- ==================
-- ベジタブルマラソンin彩湖 (vegetable-marathon-saiko-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'vegetable-marathon-saiko-2026';
DELETE FROM race_categories WHERE race_id = 'vegetable-marathon-saiko-2026';
DELETE FROM aid_stations WHERE race_id = 'vegetable-marathon-saiko-2026';
DELETE FROM checkpoints WHERE race_id = 'vegetable-marathon-saiko-2026';
DELETE FROM access_points WHERE race_id = 'vegetable-marathon-saiko-2026';
DELETE FROM nearby_spots WHERE race_id = 'vegetable-marathon-saiko-2026';
DELETE FROM weather_history WHERE race_id = 'vegetable-marathon-saiko-2026';
DELETE FROM participation_gifts WHERE race_id = 'vegetable-marathon-saiko-2026';
DELETE FROM completion_gifts WHERE race_id = 'vegetable-marathon-saiko-2026';
DELETE FROM race_entry_links WHERE race_id = 'vegetable-marathon-saiko-2026';
DELETE FROM race_entry_periods WHERE race_id = 'vegetable-marathon-saiko-2026';
DELETE FROM reception_sessions WHERE race_id = 'vegetable-marathon-saiko-2026';
DELETE FROM race_travel_times WHERE race_id = 'vegetable-marathon-saiko-2026';
DELETE FROM race_results WHERE race_id = 'vegetable-marathon-saiko-2026';
DELETE FROM race_gallery WHERE race_id = 'vegetable-marathon-saiko-2026';
DELETE FROM race_voices WHERE race_id = 'vegetable-marathon-saiko-2026';
DELETE FROM race_time_buckets WHERE race_id = 'vegetable-marathon-saiko-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'vegetable-marathon-saiko-2026',
  'ベジタブルマラソンin彩湖',
  'Vegetable Marathon in Saiko',
  '2026-09-26',
  '11',
  '戸田市',
  'Toda City',
  '彩湖・道満グリーンパークを舞台に開催される市民マラソン。30km・ハーフ・10km・5km・親子1.5kmと幅広い種目が揃う。',
  'A citizens'' marathon held at Saiko-Domanko Green Park, offering distances from a parent-child 1.5km fun run up to 30km.',
  'https://www.vege-mara.com/',
  NULL,
  1,
  0,
  '2026-05-29',
  '2026-09-06',
  0,
  'race_day',
  '',
  '',
  '[]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  '',
  '',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '彩湖・道満グリーンパーク',
  'Saiko-Domanko Green Park',
  NULL,
  NULL,
  NULL,
  '2026-08-25T00:00:00Z',
  '2026-08-25T00:00:00Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('vegetable-marathon-saiko-2026', 'other', 30, 0, '', 0, NULL, NULL, '30km', '30km', NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('vegetable-marathon-saiko-2026', 'half', 21.0975, 0, '', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 1);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('vegetable-marathon-saiko-2026', '10k', 10, 0, '', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 2);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('vegetable-marathon-saiko-2026', '5k', 5, 0, '', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 3);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('vegetable-marathon-saiko-2026', 'other', 1.5, 0, '', 0, NULL, NULL, '親子1.5km', 'Parent-Child 1.5km', NULL, NULL, NULL, NULL, NULL, '[]', 4);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('vegetable-marathon-saiko-2026', NULL, '一般エントリー', 'General Entry', '2026-05-29', '2026-09-06', NULL, 0);

-- ==================
-- 日本最北端わっかない平和マラソン (wakkanai-peace-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'wakkanai-peace-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'wakkanai-peace-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'wakkanai-peace-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'wakkanai-peace-marathon-2026';
DELETE FROM access_points WHERE race_id = 'wakkanai-peace-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'wakkanai-peace-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'wakkanai-peace-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'wakkanai-peace-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'wakkanai-peace-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'wakkanai-peace-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'wakkanai-peace-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'wakkanai-peace-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'wakkanai-peace-marathon-2026';
DELETE FROM race_results WHERE race_id = 'wakkanai-peace-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'wakkanai-peace-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'wakkanai-peace-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'wakkanai-peace-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'wakkanai-peace-marathon-2026',
  '日本最北端わっかない平和マラソン',
  'Wakkanai Peace Marathon',
  '2026-09-06',
  '01',
  '稚内市',
  'Wakkanai City',
  '日本最北端の地・稚内で開催されるフルマラソン。稚内港北防波堤ドームをスタート・ゴールに、日本海と宗谷岬方面を望む雄大なコースを走る。平和の象徴としての歴史も持つ大会。',
  'A full marathon held in Wakkanai, the northernmost city in Japan. Starting and finishing at the Wakkanai Port Northern Breakwater Dome, runners enjoy sweeping views of the Sea of Japan and Cape Soya.',
  'https://wakkanai-marathon.jp/',
  10000,
  0,
  1000,
  '2026-04-01',
  '2026-06-30',
  0,
  'race_day',
  '',
  '',
  '["日本最北端","絶景","海沿い","平和"]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  '稚内港北防波堤ドーム、日本海、宗谷岬方面の眺望',
  'Wakkanai Port Northern Breakwater Dome, Sea of Japan, views toward Cape Soya',
  NULL,
  NULL,
  '宗谷岬',
  '#0c4a6e',
  'Soya-Misaki',
  '日本最北端・宗谷岬を目指す平和の42km',
  'Run toward Cape Soya, Japan''s northernmost point',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '2026-04-30T00:00:00Z',
  '2026-04-30T00:00:00Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('wakkanai-peace-marathon-2026', 'full', 42.195, 390, '', 1000, 10000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('wakkanai-peace-marathon-2026', '観光地', '宗谷岬', 'Cape Soya', '日本最北端の岬。モニュメントや展望台があり、晴れた日はサハリンも見える。', 'The northernmost point of Japan. On clear days, you can see Sakhalin Island.', '稚内市中心部から約30km', NULL, 45.5234, 141.9347);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('wakkanai-peace-marathon-2026', '温泉', '童夢', 'Domu Hot Spring', '稚内市内の温泉施設。レース後のリカバリーに。', 'Hot spring facility in Wakkanai. Great for post-race recovery.', '稚内市内', NULL, 45.4167, 141.6722);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('wakkanai-peace-marathon-2026', '["tshirt"]', '完走メダル、大会オリジナルTシャツ', 'Finisher medal, Official race T-shirt', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('wakkanai-peace-marathon-2026', '["medal"]', '完走メダル、大会オリジナルTシャツ', 'Finisher medal, Official race T-shirt', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('wakkanai-peace-marathon-2026', NULL, '一般エントリー', 'General Entry', '2026-04-01', '2026-06-30', 10000, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('wakkanai-peace-marathon-2026', NULL, NULL, '稚内港北防波堤ドーム', 'Wakkanai Port Northern Breakwater Dome', NULL, NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('wakkanai-peace-marathon-2026', NULL, NULL, '日本海', 'Sea of Japan', NULL, NULL, 1);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('wakkanai-peace-marathon-2026', NULL, NULL, '宗谷岬方面の眺望', 'views toward Cape Soya', NULL, NULL, 2);

-- ==================
-- 横浜マラソン (yokohama-marathon-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'yokohama-marathon-2026';
DELETE FROM race_categories WHERE race_id = 'yokohama-marathon-2026';
DELETE FROM aid_stations WHERE race_id = 'yokohama-marathon-2026';
DELETE FROM checkpoints WHERE race_id = 'yokohama-marathon-2026';
DELETE FROM access_points WHERE race_id = 'yokohama-marathon-2026';
DELETE FROM nearby_spots WHERE race_id = 'yokohama-marathon-2026';
DELETE FROM weather_history WHERE race_id = 'yokohama-marathon-2026';
DELETE FROM participation_gifts WHERE race_id = 'yokohama-marathon-2026';
DELETE FROM completion_gifts WHERE race_id = 'yokohama-marathon-2026';
DELETE FROM race_entry_links WHERE race_id = 'yokohama-marathon-2026';
DELETE FROM race_entry_periods WHERE race_id = 'yokohama-marathon-2026';
DELETE FROM reception_sessions WHERE race_id = 'yokohama-marathon-2026';
DELETE FROM race_travel_times WHERE race_id = 'yokohama-marathon-2026';
DELETE FROM race_results WHERE race_id = 'yokohama-marathon-2026';
DELETE FROM race_gallery WHERE race_id = 'yokohama-marathon-2026';
DELETE FROM race_voices WHERE race_id = 'yokohama-marathon-2026';
DELETE FROM race_time_buckets WHERE race_id = 'yokohama-marathon-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'yokohama-marathon-2026',
  '横浜マラソン',
  'Yokohama Marathon',
  '2026-10-25',
  '14',
  '横浜市',
  'Yokohama City',
  'みなとみらいを発着点とする横浜の大規模フルマラソン。首都高速湾岸線を走れる貴重な大会。',
  'A large-scale marathon starting and finishing in Minato Mirai, Yokohama. A rare opportunity to run on the Metropolitan Expressway Bayshore Route.',
  'https://yokohamamarathon.jp',
  0,
  1,
  0,
  '2026-04-08',
  '2026-05-17',
  0,
  'pre_day',
  'ローソンWEB',
  '',
  '["大規模","景色が良い","海沿い"]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  'みなとみらい、赤レンガ倉庫、首都高速湾岸線、山下公園',
  'Minato Mirai, Red Brick Warehouse, Bayshore Expressway, Yamashita Park',
  NULL,
  NULL,
  '港',
  '#0e4f8a',
  'Minato',
  '開港の街・横浜の海と丘を駆け抜ける',
  'Run through Yokohama''s historic port city of sea and hills',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-05-30T06:44:28.893Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('yokohama-marathon-2026', 'full', 42.195, 390, '08:30', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('yokohama-marathon-2026', '観光地', 'みなとみらい・赤レンガ倉庫', 'Minato Mirai & Red Brick Warehouse', 'スタート・フィニッシュエリア周辺。横浜を代表する観光スポット。ショッピングやグルメも充実。', 'Around the start/finish area. Yokohama''s iconic landmark. Shopping and dining.', 'スタート・フィニッシュ付近', NULL, 35.4537, 139.6429);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('yokohama-marathon-2026', 'グルメ', '横浜中華街', 'Yokohama Chinatown', '日本最大の中華街。レース後の食べ歩きに最適。', 'Japan''s largest Chinatown. Perfect for post-race food tours.', 'みなとみらいから徒歩約15分', NULL, 35.4422, 139.6453);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('yokohama-marathon-2026', '["tshirt","towel"]', '大会Tシャツ、完走メダル、フィニッシャータオル', 'Race T-shirt, Finisher medal, Finisher towel', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('yokohama-marathon-2026', '["medal"]', '大会Tシャツ、完走メダル、フィニッシャータオル', 'Race T-shirt, Finisher medal, Finisher towel', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('yokohama-marathon-2026', NULL, '一般エントリー', 'General Entry', '2026-04-08', '2026-05-17', NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('yokohama-marathon-2026', NULL, NULL, 'みなとみらい', 'Minato Mirai', NULL, NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('yokohama-marathon-2026', NULL, NULL, '赤レンガ倉庫', 'Red Brick Warehouse', NULL, NULL, 1);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('yokohama-marathon-2026', NULL, NULL, '首都高速湾岸線', 'Bayshore Expressway', NULL, NULL, 2);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('yokohama-marathon-2026', NULL, NULL, '山下公園', 'Yamashita Park', NULL, NULL, 3);

-- ==================
-- 横浜ノースドックラン (yokohama-northdock-run-2026)
-- ==================
DELETE FROM race_course_highlights WHERE race_id = 'yokohama-northdock-run-2026';
DELETE FROM race_categories WHERE race_id = 'yokohama-northdock-run-2026';
DELETE FROM aid_stations WHERE race_id = 'yokohama-northdock-run-2026';
DELETE FROM checkpoints WHERE race_id = 'yokohama-northdock-run-2026';
DELETE FROM access_points WHERE race_id = 'yokohama-northdock-run-2026';
DELETE FROM nearby_spots WHERE race_id = 'yokohama-northdock-run-2026';
DELETE FROM weather_history WHERE race_id = 'yokohama-northdock-run-2026';
DELETE FROM participation_gifts WHERE race_id = 'yokohama-northdock-run-2026';
DELETE FROM completion_gifts WHERE race_id = 'yokohama-northdock-run-2026';
DELETE FROM race_entry_links WHERE race_id = 'yokohama-northdock-run-2026';
DELETE FROM race_entry_periods WHERE race_id = 'yokohama-northdock-run-2026';
DELETE FROM reception_sessions WHERE race_id = 'yokohama-northdock-run-2026';
DELETE FROM race_travel_times WHERE race_id = 'yokohama-northdock-run-2026';
DELETE FROM race_results WHERE race_id = 'yokohama-northdock-run-2026';
DELETE FROM race_gallery WHERE race_id = 'yokohama-northdock-run-2026';
DELETE FROM race_voices WHERE race_id = 'yokohama-northdock-run-2026';
DELETE FROM race_time_buckets WHERE race_id = 'yokohama-northdock-run-2026';
INSERT INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date, entry_closed,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  motif, motif_color, motif_romaji,
  tagline_ja, tagline_en,
  hero_image_url, hero_caption_ja, hero_caption_en,
  venue_name_ja, venue_name_en, venue_address, start_lat, start_lng,
  created_at, updated_at
) VALUES (
  'yokohama-northdock-run-2026',
  '横浜ノースドックラン',
  'Yokohama North Dock Run',
  '2026-11-07',
  '14',
  '横浜市神奈川区',
  'Kanagawa Ward, Yokohama City',
  '在日米陸軍基地・横浜ノース・ドックを走る大会。普段は立ち入れない基地内を、みなとみらいの景色とともに駆け抜ける。ハーフマラソン・10km・5kmの3種目。',
  'A race held inside Yokohama North Dock, a U.S. Army installation normally off-limits to the public, with views of Minato Mirai. Half marathon, 10km, and 5km divisions.',
  'https://pia-running.jp/northdock/',
  NULL,
  1,
  6000,
  '2026-04-11',
  '2026-09-27',
  0,
  'race_day',
  '開催1週間前までに「基地入場証兼ビブス引換証のはがき」と参加案内メールを送付。当日ははがきと引き換えでビブスを受け取る',
  'A postcard serving as both base entry pass and bib exchange voucher is mailed about a week before the event; bibs are exchanged for it on race day',
  '["米軍基地"]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  '在日米陸軍横浜ノース・ドック基地内を走る、普段は立ち入れない特別なコース。みなとみらいの景色を望む',
  'A special course inside the normally off-limits Yokohama North Dock U.S. Army base, with views of Minato Mirai',
  '5kmコース×周回（5km=1周、10km=2周、ハーフマラソン=5.275kmコース×4周）。コース上に距離表示なし',
  'Laps of a course loop (5km = 1 lap, 10km = 2 laps, half marathon = 5.275km course x4 laps). No distance markers on course',
  '横浜ノース・ドック',
  '#b91c1c',
  'Yokohama North Dock',
  '普段は入れない米軍基地を、みなとみらいの絶景とともに走る',
  'Run inside a U.S. military base normally off-limits to the public, with Minato Mirai views',
  NULL,
  NULL,
  NULL,
  '横浜ノース・ドック（在日米陸軍基地）',
  'Yokohama North Dock (U.S. Army Installation)',
  '神奈川県横浜市神奈川区瑞穂埠頭（千若町、瑞穂町、鈴繁町）',
  NULL,
  NULL,
  '2026-08-31T23:51:21.157Z',
  '2026-08-31T23:51:21.157Z'
) ON CONFLICT(id) DO UPDATE SET
  name_ja = excluded.name_ja,
  name_en = excluded.name_en,
  date = excluded.date,
  prefecture = excluded.prefecture,
  city_ja = excluded.city_ja,
  city_en = excluded.city_en,
  description_ja = excluded.description_ja,
  description_en = excluded.description_en,
  official_url = excluded.official_url,
  entry_fee = excluded.entry_fee,
  entry_fee_by_category = excluded.entry_fee_by_category,
  entry_capacity = excluded.entry_capacity,
  entry_start_date = excluded.entry_start_date,
  entry_end_date = excluded.entry_end_date,
  entry_closed = excluded.entry_closed,
  reception_type = excluded.reception_type,
  reception_note_ja = excluded.reception_note_ja,
  reception_note_en = excluded.reception_note_en,
  tags = excluded.tags,
  course_gpx_file = excluded.course_gpx_file,
  course_max_elevation_m = excluded.course_max_elevation_m,
  course_min_elevation_m = excluded.course_min_elevation_m,
  course_elevation_diff_m = excluded.course_elevation_diff_m,
  course_surface = excluded.course_surface,
  course_certification = excluded.course_certification,
  course_highlights_ja = excluded.course_highlights_ja,
  course_highlights_en = excluded.course_highlights_en,
  course_notes_ja = excluded.course_notes_ja,
  course_notes_en = excluded.course_notes_en,
  motif = excluded.motif,
  motif_color = excluded.motif_color,
  motif_romaji = excluded.motif_romaji,
  tagline_ja = excluded.tagline_ja,
  tagline_en = excluded.tagline_en,
  hero_image_url = excluded.hero_image_url,
  hero_caption_ja = excluded.hero_caption_ja,
  hero_caption_en = excluded.hero_caption_en,
  venue_name_ja = excluded.venue_name_ja,
  venue_name_en = excluded.venue_name_en,
  venue_address = excluded.venue_address,
  start_lat = excluded.start_lat,
  start_lng = excluded.start_lng,
  updated_at = excluded.updated_at;
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('yokohama-northdock-run-2026', '5k', 5, 60, '12:35', 1500, 5000, NULL, '5km', '5km', '中学生以上、男女別。Tシャツ付きエントリーは10,000円', 'Junior high school age and above, men''s/women''s divisions. Entry with T-shirt: 10,000 yen', NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('yokohama-northdock-run-2026', '10k', 10, 90, '12:30', 1500, 6000, NULL, '10km', '10km', '高校生以上、男女別。Tシャツ付きエントリーは11,000円', 'High school age and above, men''s/women''s divisions. Entry with T-shirt: 11,000 yen', NULL, NULL, NULL, '[]', 1);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, eligibility_ja, eligibility_en, course_gpx_file, waves, sort_order) VALUES
  ('yokohama-northdock-run-2026', 'half', 21.1, 150, '10:20', 0, 7000, NULL, 'ハーフマラソン', 'Half Marathon', '5.275kmコース×4周。年代別（18〜39歳/40歳代/50歳代/60歳以上）・男女別。Tシャツ付きエントリーは12,000円', '5.275km course x4 laps. Divided by age group (18-39/40s/50s/60+) and gender. Entry with T-shirt: 12,000 yen', NULL, NULL, NULL, '[]', 2);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  ('yokohama-northdock-run-2026', '東神奈川駅（JR横浜線）', 'Higashi-Kanagawa Station (JR Yokohama Line)', '', '徒歩14分', '14 min walk', 0, 0, 14, 1, 0);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, walk_minutes, is_primary, sort_order) VALUES
  ('yokohama-northdock-run-2026', '東神奈川駅（京急線）', 'Higashi-Kanagawa Station (Keikyu Line)', '', '徒歩13分', '13 min walk', 0, 0, 13, 0, 1);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('yokohama-northdock-run-2026', '["towel"]', '米軍ロゴ入りオリジナルタオル（予定）', 'Original towel with U.S. military logo (planned)', NULL, 0);
INSERT OR REPLACE INTO completion_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('yokohama-northdock-run-2026', '["certificate"]', 'WEB完走証発行', 'Digital (web) finisher certificate', NULL, 0);
INSERT OR REPLACE INTO race_entry_periods (race_id, category_id, label_ja, label_en, start_date, end_date, entry_fee, sort_order) VALUES
  ('yokohama-northdock-run-2026', NULL, '一般エントリー', 'General Entry', '2026-04-11', '2026-09-27', NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('yokohama-northdock-run-2026', NULL, NULL, '横浜ノース・ドック（米軍基地）', 'Yokohama North Dock (U.S. Army base)', NULL, NULL, 0);
INSERT OR REPLACE INTO race_course_highlights (race_id, category_id, km, name_ja, name_en, note_ja, note_en, sort_order) VALUES
  ('yokohama-northdock-run-2026', NULL, NULL, 'みなとみらいの景色', 'Minato Mirai skyline views', NULL, NULL, 1);

