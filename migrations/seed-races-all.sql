-- 自動生成: generate-seed-races.js
-- 生成日時: 2026-03-17T22:18:43.833Z
-- 対象ファイル数: 50 件（既存 2 件はskip）

-- ==================
-- あおもり桜マラソン (aomori-sakura-marathon-2026)
-- ==================
INSERT OR REPLACE INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
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
  0,
  2400,
  '2025-11-01',
  '2026-01-30',
  'pre_mail',
  '',
  '',
  '["桜","景色が良い"]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  '八甲田山、陸奥湾、桜並木',
  'Mt. Hakkoda, Mutsu Bay, cherry blossom trees',
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-03-15T00:00:00Z'
);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, waves, sort_order) VALUES
  ('aomori-sakura-marathon-2026', 'full', 42.195, '5:30', '08:50', 0, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('aomori-sakura-marathon-2026', '観光地', '弘前城・弘前公園', 'Hirosaki Castle & Park', '日本屈指の桜の名所。4月下旬は桜まつりの時期と重なる可能性あり。', 'One of Japan''s top cherry blossom spots. Late April may coincide with the cherry blossom festival.', '青森市から車約1時間', NULL, 40.6072, 140.4639);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('aomori-sakura-marathon-2026', '["tshirt","medal"]', '大会Tシャツ、完走メダル', 'Race T-shirt, Finisher medal', NULL, 0);

-- ==================
-- 別府大分毎日マラソン (beppu-oita-marathon-2026)
-- ==================
INSERT OR REPLACE INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
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
  0,
  4000,
  '2025-08-29',
  '2025-09-11',
  'pre_day',
  '',
  '',
  '["エリート大会","日本陸連公認","記録狙い","フラット","温泉"]',
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
  '2026-03-15T00:00:00Z',
  '2026-03-16T00:00:00Z'
);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, waves, sort_order) VALUES
  ('beppu-oita-marathon-2026', 'full', 42.195, 0, '12:00', 0, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('beppu-oita-marathon-2026', '温泉', '別府温泉', 'Beppu Onsen', '日本一の湧出量を誇る温泉地。地獄めぐりが有名。レース後に様々な泉質の温泉を楽しめる。', 'Japan''s top hot spring area by water output. Famous for ''Hell Tours''. Enjoy various hot spring types after the race.', 'スタート地点付近', NULL, 33.2847, 131.5006);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('beppu-oita-marathon-2026', 'グルメ', '別府冷麺・とり天', 'Beppu Cold Noodles & Chicken Tempura', '別府のご当地グルメ。冷麺ととり天は名物。', 'Beppu''s local specialties. Cold noodles and chicken tempura.', '別府市内', NULL, 33.2847, 131.5006);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('beppu-oita-marathon-2026', '["tshirt"]', '大会Tシャツ', 'Race T-shirt', NULL, 0);

-- ==================
-- びわ湖マラソン (biwako-marathon-2026)
-- ==================
INSERT OR REPLACE INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
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
  NULL,
  0,
  7000,
  '2025-08-01',
  '2025-10-31',
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
  '2026-03-15T00:00:00Z',
  '2026-03-15T00:00:00Z'
);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, waves, sort_order) VALUES
  ('biwako-marathon-2026', 'full', 42.195, 360, '08:20', 7000, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('biwako-marathon-2026', '観光地', '琵琶湖', 'Lake Biwa', '日本最大の湖。コース全体で湖畔を走る。水面に映る比叡山の景色が美しい。', 'Japan''s largest lake. The entire course runs along the lakeshore. Beautiful views of Mt. Hiei reflected on the water.', 'コース上', NULL, 35.3506, 136.0689);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('biwako-marathon-2026', '温泉', 'おごと温泉', 'Ogoto Onsen', '琵琶湖西岸の温泉地。コース付近。レース後のリカバリーに便利。', 'Hot spring town on the west shore of Lake Biwa. Near the course. Convenient for post-race recovery.', 'コース付近', NULL, 35.1167, 135.8833);

-- ==================
-- 愛媛マラソン (ehime-marathon-2026)
-- ==================
INSERT OR REPLACE INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
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
  NULL,
  0,
  0,
  '2025-08-01',
  '2025-08-19',
  'both',
  '',
  '',
  '["温泉","景色が良い","城下町"]',
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
  '2026-03-15T00:00:00Z',
  '2026-03-15T00:00:00Z'
);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, waves, sort_order) VALUES
  ('ehime-marathon-2026', 'full', 42.195, 360, '10:00', 0, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('ehime-marathon-2026', '温泉', '道後温泉', 'Dogo Onsen', '日本最古の温泉の一つ。フィニッシュ地点から近く、レース後のリカバリーに最適。夏目漱石の「坊ちゃん」の舞台としても有名。', 'One of Japan''s oldest hot springs. Close to the finish and perfect for post-race recovery. Famous as the setting of Natsume Soseki''s ''Botchan''.', 'フィニッシュ付近', NULL, 33.8492, 132.7867);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('ehime-marathon-2026', '観光地', '松山城', 'Matsuyama Castle', '現存12天守の一つ。コース上から望める。ロープウェイで天守閣へ。', 'One of Japan''s 12 surviving original castle keeps. Visible from the course. Ropeway access to the keep.', 'コース付近', NULL, 33.8456, 132.7656);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('ehime-marathon-2026', '["tshirt","medal","towel"]', '大会オリジナルTシャツ、完走メダル、今治タオル（完走者）', 'Official race T-shirt, Finisher medal, Imabari towel (finishers)', NULL, 0);

-- ==================
-- 富士山マラソン (fujisan-marathon-2026)
-- ==================
INSERT OR REPLACE INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
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
  'https://www.fujisan-marathon.com',
  NULL,
  0,
  0,
  NULL,
  NULL,
  'race_day',
  '',
  '',
  '["富士山","景色が良い","紅葉","湖畔"]',
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
  '2026-03-15T00:00:00Z',
  '2026-03-16T00:00:00Z'
);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, waves, sort_order) VALUES
  ('fujisan-marathon-2026', 'full', 42.195, 360, '09:00', 0, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('fujisan-marathon-2026', '温泉', '河口湖温泉', 'Lake Kawaguchi Onsen', '河口湖畔の温泉。富士山を望む露天風呂が魅力。レース後に最適。', 'Hot springs on the shore of Lake Kawaguchi. Open-air baths with Mt. Fuji views.', '会場付近', NULL, 35.51, 138.75);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('fujisan-marathon-2026', '["tshirt","medal","towel"]', '大会Tシャツ、完走メダル、フィニッシャータオル', 'Race T-shirt, Finisher medal, Finisher towel', NULL, 0);

-- ==================
-- ふくい桜マラソン (fukui-sakura-marathon-2026)
-- ==================
INSERT OR REPLACE INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
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
  NULL,
  0,
  13200,
  NULL,
  NULL,
  'race_day',
  '',
  '',
  '["桜","初心者おすすめ"]',
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
  '2026-03-15T00:00:00Z',
  '2026-03-15T00:00:00Z'
);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, waves, sort_order) VALUES
  ('fukui-sakura-marathon-2026', 'full', 42.195, 420, '', 13200, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('fukui-sakura-marathon-2026', '観光地', '永平寺', 'Eiheiji Temple', '曹洞宗の大本山。荘厳な修行道場。福井市から車約30分。', 'The head temple of Soto Zen. A solemn training monastery. About 30 min by car from Fukui city.', '福井市から車約30分', NULL, 36.0833, 136.35);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('fukui-sakura-marathon-2026', 'グルメ', '越前おろしそば', 'Echizen Oroshi Soba', '大根おろしとだしで食べる福井名物のそば。レース後のエネルギー補給に。', 'Fukui''s specialty soba with grated radish and broth. For post-race energy.', '福井市内', NULL, 36.0652, 136.2199);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('fukui-sakura-marathon-2026', '["tshirt","medal","towel"]', '大会Tシャツ、完走メダル、フィニッシャータオル', 'Race T-shirt, Finisher medal, Finisher towel', NULL, 0);

-- ==================
-- 福岡国際マラソン (fukuoka-international-marathon-2026)
-- ==================
INSERT OR REPLACE INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
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
  'https://fukuoka-marathon.com',
  NULL,
  0,
  0,
  NULL,
  NULL,
  'race_day',
  '',
  '',
  '["エリート大会","歴史ある大会","日本陸連公認"]',
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
  '2026-03-15T00:00:00Z',
  '2026-03-16T00:00:00Z'
);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, waves, sort_order) VALUES
  ('fukuoka-international-marathon-2026', 'full', 42.195, 0, '12:10', 0, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('fukuoka-international-marathon-2026', 'グルメ', '博多ラーメン・もつ鍋', 'Hakata Ramen & Motsunabe', '福岡を代表するグルメ。中洲や天神の屋台街で楽しめる。', 'Fukuoka''s iconic dishes. Enjoy at street stalls in Nakasu and Tenjin.', '天神・中洲エリア', NULL, 33.5917, 130.4017);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('fukuoka-international-marathon-2026', '["tshirt"]', '大会Tシャツ', 'Race T-shirt', NULL, 0);

-- ==================
-- ぐんまマラソン (gunma-marathon-2026)
-- ==================
INSERT OR REPLACE INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
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
  'https://www.gunma-marathon.jp',
  NULL,
  0,
  0,
  NULL,
  NULL,
  'race_day',
  '',
  '',
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
  '2026-03-15T00:00:00Z',
  '2026-03-15T00:00:00Z'
);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, waves, sort_order) VALUES
  ('gunma-marathon-2026', 'full', 42.195, 350, '', 0, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('gunma-marathon-2026', '温泉', '伊香保温泉', 'Ikaho Onsen', '石段街で有名な群馬の温泉地。黄金の湯と白銀の湯の2種。前橋から車約40分。', 'Famous for its stone steps. Two types of springs: Golden and Silver. About 40 min by car from Maebashi.', '前橋市から車約40分', NULL, 36.4886, 138.9311);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('gunma-marathon-2026', '["tshirt","medal"]', '大会Tシャツ、完走メダル', 'Race T-shirt, Finisher medal', NULL, 0);

-- ==================
-- 世界遺産姫路城マラソン (himeji-castle-marathon-2026)
-- ==================
INSERT OR REPLACE INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
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
  NULL,
  0,
  9000,
  NULL,
  NULL,
  'race_day',
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
  '2026-03-15T00:00:00Z',
  '2026-03-15T00:00:00Z'
);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, waves, sort_order) VALUES
  ('himeji-castle-marathon-2026', 'full', 42.195, 360, '', 9000, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('himeji-castle-marathon-2026', '観光地', '姫路城', 'Himeji Castle', '世界遺産・国宝の白鷺城。日本で最も美しい城の一つ。コース上から望める。', 'A World Heritage and National Treasure. One of Japan''s most beautiful castles. Visible from the course.', 'コース上', NULL, 34.8394, 134.6939);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('himeji-castle-marathon-2026', '["tshirt","medal","towel"]', '大会Tシャツ、完走メダル、フィニッシャータオル', 'Race T-shirt, Finisher medal, Finisher towel', NULL, 0);

-- ==================
-- 防府読売マラソン (hofu-yomiuri-marathon-2026)
-- ==================
INSERT OR REPLACE INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
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
  'https://hofu-yomiuri-marathon.jp',
  NULL,
  0,
  0,
  NULL,
  NULL,
  'race_day',
  '',
  '',
  '["エリート大会","記録狙い","日本陸連公認"]',
  NULL,
  0,
  0,
  0,
  'road',
  '["JAAF"]',
  '防府天満宮付近',
  'Near Hofu Tenmangu Shrine',
  '制限時間4時間。サブ4の走力が必要。',
  '4-hour time limit. Sub-4 running ability required.',
  '2026-03-15T00:00:00Z',
  '2026-03-16T00:00:00Z'
);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, waves, sort_order) VALUES
  ('hofu-yomiuri-marathon-2026', 'full', 42.195, 240, '12:03', 0, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('hofu-yomiuri-marathon-2026', '観光地', '防府天満宮', 'Hofu Tenmangu', '日本三大天神の一つ。学問の神様・菅原道真を祀る。コース付近。', 'One of Japan''s three great Tenmangu shrines. Enshrines Sugawara no Michizane, deity of learning.', 'コース付近', NULL, 34.0478, 131.5711);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('hofu-yomiuri-marathon-2026', '["medal"]', '完走メダル', 'Finisher medal', NULL, 0);

-- ==================
-- 北海道マラソン (hokkaido-marathon-2026)
-- ==================
INSERT OR REPLACE INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
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
  NULL,
  0,
  0,
  NULL,
  NULL,
  'pre_day',
  '',
  '',
  '["夏マラソン","大規模","北海道","日本陸連公認"]',
  NULL,
  0,
  0,
  0,
  'road',
  '["JAAF"]',
  '大通公園、北海道大学、豊平川',
  'Odori Park, Hokkaido University, Toyohira River',
  '夏開催のため暑さ対策が必須。制限時間5時間。',
  'Summer heat countermeasures essential. 5-hour time limit.',
  '2026-03-15T00:00:00Z',
  '2026-03-15T00:00:00Z'
);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, waves, sort_order) VALUES
  ('hokkaido-marathon-2026', 'full', 42.195, 300, '08:30', 0, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('hokkaido-marathon-2026', '観光地', '大通公園', 'Odori Park', 'スタート・フィニッシュ地点。札幌を代表する都市公園。大会当日は大きな声援で包まれる。', 'Start/Finish area. Sapporo''s iconic urban park. Filled with cheers on race day.', 'スタート・フィニッシュ地点', NULL, 43.0589, 141.3476);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('hokkaido-marathon-2026', 'グルメ', '札幌ラーメン横丁', 'Sapporo Ramen Yokocho', '味噌ラーメンの聖地。レース後のエネルギー補給に最適。', 'The holy ground of miso ramen. Perfect for post-race energy replenishment.', 'すすきの付近', NULL, 43.0537, 141.3525);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('hokkaido-marathon-2026', '温泉', '定山渓温泉', 'Jozankei Onsen', '札幌の奥座敷と呼ばれる温泉地。レース翌日の観光に。札幌中心部からバスで約60分。', 'Known as Sapporo''s inner parlor. For sightseeing the day after. About 60 min by bus from central Sapporo.', '札幌中心部からバス約60分', NULL, 42.9694, 141.1667);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('hokkaido-marathon-2026', '["tshirt","medal"]', '大会オリジナルTシャツ、完走メダル', 'Official race T-shirt, Finisher medal', NULL, 0);

-- ==================
-- いぶすき菜の花マラソン (ibusuki-nanohana-2026)
-- ==================
INSERT OR REPLACE INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
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
  0,
  10000,
  NULL,
  NULL,
  'pre_mail',
  'アスリートビブスは事前郵送。記念品引換は前日・当日に総合体育館にて。',
  'Bibs mailed in advance. Gift exchange at gymnasium the day before and on race day.',
  '["景色が良い","温泉","温暖","初心者おすすめ","ご当地エイド充実","日本陸連公認"]',
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
  '2026-03-15T00:00:00Z',
  '2026-03-16T00:00:00Z'
);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, waves, sort_order) VALUES
  ('ibusuki-nanohana-2026', 'full', 42.195, 480, '09:00', 10000, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
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
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, sort_order) VALUES
  ('ibusuki-nanohana-2026', '指宿駅', 'Ibusuki Station', 'ibusuki', 'JR指宿駅から徒歩約15分', 'About 15 min walk from JR Ibusuki Station', 31.2544, 130.6556, 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('ibusuki-nanohana-2026', '温泉', '砂むし温泉', 'Sand Steam Bath (Sunamushi Onsen)', '指宿名物の砂蒸し温泉。海岸の天然砂の中に埋まって温まる独特の体験。レース後のリカバリーに最適。', 'Ibusuki''s famous sand steam bath. A unique experience of being buried in naturally heated sand on the beach. Perfect for post-race recovery.', '指宿市内', NULL, 31.2283, 130.6367);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('ibusuki-nanohana-2026', '["tshirt"]', '大会記念品（参加者全員）', 'Commemorative gift (all participants)', NULL, 0);

-- ==================
-- 板橋Cityマラソン (itabashi-city-marathon-2026)
-- ==================
INSERT OR REPLACE INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
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
  NULL,
  0,
  0,
  NULL,
  NULL,
  'race_day',
  '',
  '',
  '["フラット","記録狙い","初心者おすすめ"]',
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
  '2026-03-15T00:00:00Z',
  '2026-03-15T00:00:00Z'
);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, waves, sort_order) VALUES
  ('itabashi-city-marathon-2026', 'full', 42.195, 420, '09:00', 0, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('itabashi-city-marathon-2026', '観光地', '荒川河川敷', 'Arakawa Riverbank', 'フラットな河川敷コース。記録を狙うランナーに人気の定番コース。', 'A flat riverbank course. A classic course popular with runners aiming for personal records.', 'コース上', NULL, 35.7917, 139.675);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('itabashi-city-marathon-2026', '["tshirt","medal"]', '大会Tシャツ、完走メダル', 'Race T-shirt, Finisher medal', NULL, 0);

-- ==================
-- いわきサンシャインマラソン (iwaki-sunshine-marathon-2026)
-- ==================
INSERT OR REPLACE INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
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
  NULL,
  0,
  0,
  NULL,
  NULL,
  'race_day',
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
  '2026-03-15T00:00:00Z',
  '2026-03-15T00:00:00Z'
);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, waves, sort_order) VALUES
  ('iwaki-sunshine-marathon-2026', 'full', 42.195, 360, '', 0, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('iwaki-sunshine-marathon-2026', '温泉', 'いわき湯本温泉', 'Iwaki Yumoto Onsen', 'いわき市の歴史ある温泉地。レース後のリカバリーに。', 'A historic hot spring in Iwaki. For post-race recovery.', 'いわき市内', NULL, 36.9744, 140.8456);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('iwaki-sunshine-marathon-2026', '["tshirt","medal"]', '大会Tシャツ、完走メダル', 'Race T-shirt, Finisher medal', NULL, 0);

-- ==================
-- いわて奥州きらめきマラソン (iwate-oshu-kirameki-marathon-2026)
-- ==================
INSERT OR REPLACE INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
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
  NULL,
  0,
  0,
  NULL,
  NULL,
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
  '2026-03-15T00:00:00Z',
  '2026-03-15T00:00:00Z'
);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, waves, sort_order) VALUES
  ('iwate-oshu-kirameki-marathon-2026', 'full', 42.195, 0, '', 0, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('iwate-oshu-kirameki-marathon-2026', '観光地', '中尊寺金色堂', 'Chusonji Konjikido', '世界遺産・平泉。奥州藤原氏の栄華を伝える。奥州市から車約30分。', 'World Heritage Hiraizumi. Tells of the glory of the Oshu Fujiwara clan. About 30 min by car from Oshu.', '奥州市から車約30分', NULL, 39, 141.1);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('iwate-oshu-kirameki-marathon-2026', '["tshirt","medal"]', '大会Tシャツ、完走メダル', 'Race T-shirt, Finisher medal', NULL, 0);

-- ==================
-- かがわマラソン (kagawa-marathon-2026)
-- ==================
INSERT OR REPLACE INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
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
  NULL,
  0,
  10000,
  NULL,
  NULL,
  'race_day',
  '',
  '',
  '["第1回大会","海沿い","ご当地エイド"]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  '瀬戸内海',
  'Seto Inland Sea',
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-03-15T00:00:00Z'
);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, waves, sort_order) VALUES
  ('kagawa-marathon-2026', 'full', 42.195, 360, '', 10000, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kagawa-marathon-2026', 'グルメ', '讃岐うどん', 'Sanuki Udon', '香川を代表するご当地グルメ。コシの強い麺とシンプルなだしが特徴。市内に多数の名店。', 'Kagawa''s signature dish. Characterized by chewy noodles and simple broth. Many famous shops in the city.', '高松市内各所', NULL, 34.3403, 134.0472);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kagawa-marathon-2026', '観光地', '栗林公園', 'Ritsurin Garden', '国の特別名勝。日本を代表する回遊式大名庭園。', 'A Special Place of Scenic Beauty. One of Japan''s finest strolling gardens.', '高松市内', NULL, 34.3289, 134.0467);

-- ==================
-- 鹿児島マラソン (kagoshima-marathon-2026)
-- ==================
INSERT OR REPLACE INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
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
  NULL,
  0,
  0,
  NULL,
  NULL,
  'race_day',
  '',
  '',
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
  '2026-03-15T00:00:00Z',
  '2026-03-15T00:00:00Z'
);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, waves, sort_order) VALUES
  ('kagoshima-marathon-2026', 'full', 42.195, 420, '', 0, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kagoshima-marathon-2026', '観光地', '桜島', 'Sakurajima', 'コース上から望める活火山。フェリーで15分。溶岩原や展望台からの眺望が圧巻。', 'An active volcano visible from the course. 15 min by ferry. Lava fields and observation decks.', '鹿児島港からフェリー15分', NULL, 31.5856, 130.6569);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kagoshima-marathon-2026', '温泉', '指宿温泉', 'Ibusuki Onsen', '砂むし温泉で有名。鹿児島市から特急で約1時間。レース翌日の遠足に。', 'Famous for sand steam baths. About 1 hour by express from Kagoshima. Day trip the day after.', '鹿児島市から特急約1時間', NULL, 31.25, 130.65);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('kagoshima-marathon-2026', '["tshirt","medal"]', '大会Tシャツ、完走メダル', 'Race T-shirt, Finisher medal', NULL, 0);

-- ==================
-- 金沢マラソン (kanazawa-marathon-2026)
-- ==================
INSERT OR REPLACE INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
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
  NULL,
  0,
  0,
  NULL,
  NULL,
  'race_day',
  '',
  '',
  '["城下町","観光","ご当地エイド充実","景色が良い"]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  '兼六園、金沢城、ひがし茶屋街付近',
  'Kenroku-en Garden, Kanazawa Castle, Higashi Chaya District area',
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-03-15T00:00:00Z'
);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, waves, sort_order) VALUES
  ('kanazawa-marathon-2026', 'full', 42.195, 420, '08:30', 0, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kanazawa-marathon-2026', '観光地', '兼六園', 'Kenroku-en Garden', '日本三名園の一つ。コース上から望める。秋の紅葉が美しい。', 'One of Japan''s three most beautiful gardens. Visible from the course. Beautiful autumn foliage.', 'コース付近', NULL, 36.5625, 136.6625);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kanazawa-marathon-2026', 'グルメ', '近江町市場', 'Omicho Market', '金沢の台所。新鮮な海鮮が楽しめる。レース後の食べ歩きに最適。', 'Kanazawa''s kitchen. Enjoy fresh seafood. Perfect for post-race food tours.', '金沢市中心部', NULL, 36.5719, 136.6563);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kanazawa-marathon-2026', '温泉', '金沢駅周辺の温泉施設', 'Hot spring facilities near Kanazawa Station', '金沢駅周辺には日帰り温泉施設あり。レース後のリカバリーに。', 'Day-trip hot spring facilities available near Kanazawa Station. For post-race recovery.', '金沢駅周辺', NULL, 36.5781, 136.6486);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('kanazawa-marathon-2026', '["tshirt","medal","local_product"]', '大会オリジナルTシャツ、完走メダル、地元特産品', 'Official race T-shirt, Finisher medal, Local specialty products', NULL, 0);

-- ==================
-- かすみがうらマラソン (kasumigaura-marathon-2026)
-- ==================
INSERT OR REPLACE INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
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
  NULL,
  0,
  0,
  NULL,
  NULL,
  'race_day',
  '',
  '',
  '["フラット","記録狙い","湖畔"]',
  NULL,
  0,
  0,
  0,
  'road',
  '["JAAF"]',
  '霞ヶ浦湖畔',
  'Lake Kasumigaura shore',
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-03-15T00:00:00Z'
);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, waves, sort_order) VALUES
  ('kasumigaura-marathon-2026', 'full', 42.195, 360, '', 0, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kasumigaura-marathon-2026', '観光地', '霞ヶ浦', 'Lake Kasumigaura', '日本第2位の面積を持つ湖。コースで湖畔を走る。広大な水面は壮観。', 'Japan''s second largest lake. Run along the lakeshore. The vast water surface is spectacular.', 'コース上', NULL, 36.0333, 140.3333);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('kasumigaura-marathon-2026', '["tshirt","medal"]', '大会Tシャツ、完走メダル', 'Race T-shirt, Finisher medal', NULL, 0);

-- ==================
-- 勝田全国マラソン (katsuta-marathon-2026)
-- ==================
INSERT OR REPLACE INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
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
  0,
  12000,
  NULL,
  NULL,
  'none',
  '事前郵送。大会当日の受付なし。',
  'Pre-mailed. No on-site registration on race day.',
  '["歴史ある大会","記録狙い","コスパが良い","日本陸連公認"]',
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
  '2026-03-15T00:00:00Z',
  '2026-03-16T00:00:00Z'
);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, waves, sort_order) VALUES
  ('katsuta-marathon-2026', 'full', 42.195, 360, '10:30', 0, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, sort_order) VALUES
  ('katsuta-marathon-2026', '勝田駅', 'Katsuta Station', 'katsuta', 'JR勝田駅東口から徒歩約10分。無料シャトルバスあり。', 'About 10 min walk from JR Katsuta Station East Exit. Free shuttle bus available.', 36.3933, 140.4756, 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('katsuta-marathon-2026', '観光地', '国営ひたち海浜公園', 'Hitachi Seaside Park', 'ネモフィラやコキアで有名な広大な公園。ひたちなか市のシンボル。', 'A vast park famous for nemophila and kochia. Symbol of Hitachinaka City.', 'ひたちなか市内', NULL, 36.3958, 140.5917);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('katsuta-marathon-2026', '["tshirt"]', '大会オリジナルTシャツ', 'Official race T-shirt', NULL, 0);

-- ==================
-- 北九州マラソン (kitakyushu-marathon-2026)
-- ==================
INSERT OR REPLACE INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
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
  NULL,
  0,
  0,
  NULL,
  NULL,
  'race_day',
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
  '2026-03-15T00:00:00Z',
  '2026-03-15T00:00:00Z'
);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, waves, sort_order) VALUES
  ('kitakyushu-marathon-2026', 'full', 42.195, 0, '09:00', 0, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kitakyushu-marathon-2026', '観光地', '門司港レトロ', 'Mojiko Retro', '大正ロマンの雰囲気が残る港町。焼きカレーが名物。', 'A port town with Taisho-era atmosphere. Famous for baked curry.', '小倉から電車約15分', NULL, 33.95, 130.9611);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('kitakyushu-marathon-2026', '["tshirt","medal","towel"]', '大会Tシャツ、完走メダル、フィニッシャータオル', 'Race T-shirt, Finisher medal, Finisher towel', NULL, 0);

-- ==================
-- KIX泉州国際マラソン (kix-senshu-marathon-2026)
-- ==================
INSERT OR REPLACE INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
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
  NULL,
  0,
  0,
  NULL,
  NULL,
  'race_day',
  '',
  '',
  '["記録狙い","フラット"]',
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
  '2026-03-15T00:00:00Z',
  '2026-03-15T00:00:00Z'
);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, waves, sort_order) VALUES
  ('kix-senshu-marathon-2026', 'full', 42.195, 300, '10:30', 0, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kix-senshu-marathon-2026', '観光地', '岸和田城', 'Kishiwada Castle', 'だんじり祭りで有名な岸和田の城。コース付近。', 'The castle in Kishiwada, famous for the Danjiri Festival. Near the course.', 'コース付近', NULL, 34.4608, 135.3706);

-- ==================
-- 神戸マラソン (kobe-marathon-2026)
-- ==================
INSERT OR REPLACE INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
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
  NULL,
  0,
  0,
  NULL,
  NULL,
  'pre_day',
  '',
  '',
  '["大規模","景色が良い","海沿い","日本陸連公認"]',
  NULL,
  0,
  0,
  0,
  'road',
  '["JAAF"]',
  '明石海峡大橋、ポートアイランド、ハーバーランド',
  'Akashi Kaikyo Bridge, Port Island, Harborland',
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-03-15T00:00:00Z'
);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, waves, sort_order) VALUES
  ('kobe-marathon-2026', 'full', 42.195, 420, '09:00', 0, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kobe-marathon-2026', '観光地', '明石海峡大橋', 'Akashi Kaikyo Bridge', 'コースの折り返し地点付近。世界最長の吊り橋を間近に見ながら走れる。', 'Near the turnaround point. Run with views of the world''s longest suspension bridge.', 'コース上', NULL, 34.6167, 135.0222);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kobe-marathon-2026', '温泉', '有馬温泉', 'Arima Onsen', '日本三大古湯の一つ。神戸市街からバスで約30分。金泉・銀泉が楽しめる。レース翌日に最適。', 'One of Japan''s three oldest hot springs. About 30 min by bus from Kobe city. Enjoy gold and silver springs. Perfect for the day after the race.', '神戸市街からバス約30分', NULL, 34.7978, 135.2475);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kobe-marathon-2026', 'グルメ', '神戸牛', 'Kobe Beef', '世界的に有名なブランド和牛。レース後のご褒美に。三宮・元町エリアに名店多数。', 'World-famous premium wagyu beef. A reward after the race. Many restaurants in Sannomiya-Motomachi area.', '三宮・元町エリア', NULL, 34.6913, 135.1956);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('kobe-marathon-2026', '["tshirt","medal","towel"]', '大会オリジナルTシャツ、完走メダル、フィニッシャータオル', 'Official race T-shirt, Finisher medal, Finisher towel', NULL, 0);

-- ==================
-- 高知龍馬マラソン (kochi-ryoma-marathon-2026)
-- ==================
INSERT OR REPLACE INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
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
  NULL,
  0,
  13000,
  NULL,
  NULL,
  'race_day',
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
  '2026-03-15T00:00:00Z',
  '2026-03-15T00:00:00Z'
);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, waves, sort_order) VALUES
  ('kochi-ryoma-marathon-2026', 'full', 42.195, 420, '09:00', 13000, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kochi-ryoma-marathon-2026', '観光地', '桂浜', 'Katsurahama Beach', '坂本龍馬像がある高知を代表する景勝地。太平洋の荒波が美しい。', 'A scenic spot representing Kochi with a statue of Sakamoto Ryoma. Beautiful Pacific waves.', '高知市から車約30分', NULL, 33.4997, 133.575);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kochi-ryoma-marathon-2026', 'グルメ', 'カツオのたたき', 'Katsuo no Tataki', '高知を代表するグルメ。藁焼きで仕上げた鰹のたたきは絶品。ひろめ市場で気軽に楽しめる。', 'Kochi''s signature dish. Straw-grilled bonito tataki is exquisite. Enjoy casually at Hirome Market.', '高知市内', NULL, 33.5589, 133.5311);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('kochi-ryoma-marathon-2026', '["tshirt","medal"]', '大会Tシャツ、完走メダル', 'Race T-shirt, Finisher medal', NULL, 0);

-- ==================
-- 熊本城マラソン (kumamoto-castle-marathon-2026)
-- ==================
INSERT OR REPLACE INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
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
  NULL,
  0,
  0,
  NULL,
  NULL,
  'race_day',
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
  '2026-03-15T00:00:00Z',
  '2026-03-16T00:00:00Z'
);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, waves, sort_order) VALUES
  ('kumamoto-castle-marathon-2026', 'full', 42.195, 420, '09:00', 0, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kumamoto-castle-marathon-2026', '観光地', '熊本城', 'Kumamoto Castle', '日本三名城の一つ。震災復興のシンボル。ゴール地点から近い。', 'One of Japan''s three famous castles. Symbol of earthquake recovery. Close to the finish.', 'ゴール付近', NULL, 32.806, 130.7058);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kumamoto-castle-marathon-2026', 'グルメ', '馬刺し・太平燕', 'Horse Sashimi & Taipien', '熊本を代表するグルメ。馬刺しと太平燕（春雨スープ）はぜひ試したい。', 'Kumamoto''s signature dishes. Horse sashimi and taipien (glass noodle soup) are must-tries.', '熊本市内', NULL, 32.8032, 130.7079);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('kumamoto-castle-marathon-2026', '["tshirt","medal"]', '大会Tシャツ、完走メダル', 'Race T-shirt, Finisher medal', NULL, 0);

-- ==================
-- 京都マラソン (kyoto-marathon-2026)
-- ==================
INSERT OR REPLACE INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
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
  NULL,
  0,
  16000,
  NULL,
  NULL,
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
  '2026-03-15T00:00:00Z',
  '2026-03-15T00:00:00Z'
);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, waves, sort_order) VALUES
  ('kyoto-marathon-2026', 'full', 42.195, 360, '08:55', 16000, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kyoto-marathon-2026', '観光地', '金閣寺', 'Kinkaku-ji', 'コース付近を通過する世界遺産。金色に輝く舎利殿が有名。', 'A World Heritage site near the course. Famous for its golden pavilion.', 'コース付近', NULL, 35.0394, 135.7292);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kyoto-marathon-2026', '観光地', '嵐山', 'Arashiyama', 'スタート地点付近。渡月橋や竹林の小径で知られる京都屈指の景勝地。', 'Near the start. Known for Togetsukyo Bridge and the bamboo grove.', 'スタート付近', NULL, 35.0116, 135.6681);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('kyoto-marathon-2026', '温泉', 'さがの温泉 天山の湯', 'Sagano Onsen Tenzan no Yu', '嵐山エリアの天然温泉。レース後のリカバリーに。', 'Natural hot spring in the Arashiyama area. For post-race recovery.', '嵐山エリア', NULL, 35.0167, 135.6833);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('kyoto-marathon-2026', '["tshirt","medal"]', '大会オリジナルTシャツ、完走メダル', 'Official race T-shirt, Finisher medal', NULL, 0);

-- ==================
-- 松本マラソン (matsumoto-marathon-2026)
-- ==================
INSERT OR REPLACE INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
  created_at, updated_at
) VALUES (
  'matsumoto-marathon-2026',
  '松本マラソン',
  'Matsumoto Marathon',
  '2026-11-08',
  '20',
  '松本市',
  'Matsumoto City',
  '北アルプスと松本城を望むフルマラソン。国宝松本城の城下町を走る。制限時間6時間。',
  'A full marathon with views of the Northern Alps and Matsumoto Castle. Run through the castle town of National Treasure Matsumoto Castle. 6-hour time limit.',
  'https://www.matsumoto-marathon.jp',
  12000,
  0,
  6000,
  NULL,
  NULL,
  'race_day',
  '',
  '',
  '["城下町","景色が良い","アルプス"]',
  NULL,
  0,
  0,
  114,
  'road',
  '["JAAF"]',
  '松本城、北アルプス、薄川',
  'Matsumoto Castle, Northern Alps, Susuki River',
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-03-15T00:00:00Z'
);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, waves, sort_order) VALUES
  ('matsumoto-marathon-2026', 'full', 42.195, 360, '08:15', 6000, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('matsumoto-marathon-2026', '観光地', '松本城', 'Matsumoto Castle', '国宝五城の一つ。黒と白のコントラストが美しい。コース上から望める。', 'One of Japan''s five National Treasure castles. Beautiful black and white contrast. Visible from the course.', 'コース付近', NULL, 36.2381, 137.97);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('matsumoto-marathon-2026', '温泉', '浅間温泉', 'Asama Onsen', '松本市街から近い歴史ある温泉地。レース後のリカバリーに最適。', 'A historic hot spring area close to Matsumoto city. Perfect for post-race recovery.', '松本市街から車約15分', NULL, 36.25, 138.0167);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('matsumoto-marathon-2026', '["tshirt","medal","towel"]', '大会オリジナルTシャツ、完走メダル、フィニッシャータオル', 'Official race T-shirt, Finisher medal, Finisher towel', NULL, 0);

-- ==================
-- みえ松阪マラソン (mie-matsusaka-marathon-2026)
-- ==================
INSERT OR REPLACE INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
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
  NULL,
  0,
  0,
  NULL,
  NULL,
  'race_day',
  '',
  '',
  '["ご当地グルメ"]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  '松阪の城下町',
  'Matsusaka castle town',
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-03-15T00:00:00Z'
);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, waves, sort_order) VALUES
  ('mie-matsusaka-marathon-2026', 'full', 42.195, 0, '', 0, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('mie-matsusaka-marathon-2026', 'グルメ', '松阪牛', 'Matsusaka Beef', '日本三大和牛の一つ。レース後のご褒美に。', 'One of Japan''s three premium wagyu. A reward after the race.', '松阪市内', NULL, 34.5778, 136.5312);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('mie-matsusaka-marathon-2026', '["tshirt","medal","local_product"]', '大会Tシャツ、完走メダル、松阪の特産品', 'Race T-shirt, Finisher medal, Matsusaka local products', NULL, 0);

-- ==================
-- 水戸黄門漫遊マラソン (mito-komon-manyu-marathon-2026)
-- ==================
INSERT OR REPLACE INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
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
  NULL,
  0,
  0,
  NULL,
  NULL,
  'race_day',
  '',
  '',
  '["観光","景色が良い"]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  '偕楽園、千波湖',
  'Kairakuen Garden, Lake Senba',
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-03-15T00:00:00Z'
);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, waves, sort_order) VALUES
  ('mito-komon-manyu-marathon-2026', 'full', 42.195, 360, '', 0, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('mito-komon-manyu-marathon-2026', '観光地', '偕楽園', 'Kairakuen Garden', '日本三名園の一つ。2〜3月は梅まつりで有名。コース上から望める。', 'One of Japan''s three most beautiful gardens. Famous for plum blossom festival in Feb-Mar.', 'コース付近', NULL, 36.3811, 140.4511);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('mito-komon-manyu-marathon-2026', '["tshirt","medal"]', '大会Tシャツ、完走メダル', 'Race T-shirt, Finisher medal', NULL, 0);

-- ==================
-- 名古屋ウィメンズマラソン (nagoya-womens-marathon-2026)
-- ==================
INSERT OR REPLACE INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
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
  NULL,
  0,
  20000,
  NULL,
  NULL,
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
  '2026-03-15T00:00:00Z',
  '2026-03-15T00:00:00Z'
);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, waves, sort_order) VALUES
  ('nagoya-womens-marathon-2026', 'full', 42.195, 420, '09:10', 20000, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('nagoya-womens-marathon-2026', '観光地', '名古屋城', 'Nagoya Castle', '金のシャチホコで有名な名古屋のシンボル。コース上から望める。', 'Nagoya''s symbol, famous for its golden shachihoko (dolphin-like ornaments). Visible from the course.', 'コース付近', NULL, 35.1856, 136.8992);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('nagoya-womens-marathon-2026', 'グルメ', '名古屋めし', 'Nagoya Meshi', '味噌カツ、ひつまぶし、手羽先など名古屋名物が充実。レース後のご褒美に。', 'Miso katsu, hitsumabushi, chicken wings and more Nagoya specialties. A reward after the race.', '名古屋市内', NULL, 35.1709, 136.8815);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('nagoya-womens-marathon-2026', '["medal","goods"]', 'ティファニー オリジナルペンダント（完走者全員）', 'Tiffany original pendant (all finishers)', NULL, 0);

-- ==================
-- NAHAマラソン (naha-marathon-2026)
-- ==================
INSERT OR REPLACE INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
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
  NULL,
  0,
  0,
  NULL,
  NULL,
  'race_day',
  '',
  '',
  '["大規模","温暖","沖縄"]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  '国際通り、那覇市街、沖縄の風景',
  'Kokusai Street, Naha city, Okinawan scenery',
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-03-15T00:00:00Z'
);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, waves, sort_order) VALUES
  ('naha-marathon-2026', 'full', 42.195, 375, '09:00', 0, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('naha-marathon-2026', '観光地', '首里城', 'Shuri Castle', '琉球王国の歴史を伝える世界遺産。復元工事が進む。コースからも比較的近い。', 'A World Heritage site conveying the history of the Ryukyu Kingdom. Restoration work in progress.', '那覇市街から車で約15分', NULL, 26.217, 127.7195);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('naha-marathon-2026', 'グルメ', '沖縄そば', 'Okinawa Soba', '沖縄を代表するご当地グルメ。あっさりとしたスープと太麺が特徴。レース後のエネルギー補給に。', 'Okinawa''s signature local dish. Characterized by light broth and thick noodles. Perfect for post-race energy.', '那覇市内各所', NULL, 26.3344, 127.7679);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('naha-marathon-2026', '["tshirt","medal"]', '大会オリジナルTシャツ、完走メダル', 'Official race T-shirt, Finisher medal', NULL, 0);

-- ==================
-- 奈良マラソン (nara-marathon-2026)
-- ==================
INSERT OR REPLACE INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
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
  NULL,
  0,
  0,
  NULL,
  NULL,
  'race_day',
  '',
  '',
  '["世界遺産","観光","アップダウン多い","景色が良い"]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  '東大寺、春日大社、平城宮跡、奈良公園',
  'Todai-ji, Kasuga Shrine, Heijo Palace ruins, Nara Park',
  'アップダウンが多い。坂道対策が必要。',
  'Many hills. Hill training recommended.',
  '2026-03-15T00:00:00Z',
  '2026-03-15T00:00:00Z'
);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, waves, sort_order) VALUES
  ('nara-marathon-2026', 'full', 42.195, 360, '', 0, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('nara-marathon-2026', '観光地', '東大寺（大仏殿）', 'Todai-ji (Great Buddha Hall)', '世界最大級の木造建築物。コース上で大仏殿を望みながら走れる。鹿がコースを横切ることも。', 'One of the world''s largest wooden structures. Run with views of the Great Buddha Hall. Deer may cross the course.', 'コース上', NULL, 34.689, 135.8398);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('nara-marathon-2026', '温泉', 'ゆららの湯 奈良店', 'Yurara no Yu Nara', '奈良市内の日帰り温泉施設。レース後のリカバリーに便利。', 'A day-trip hot spring facility in Nara city. Convenient for post-race recovery.', '奈良市内', NULL, 34.6851, 135.8048);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('nara-marathon-2026', '["tshirt","medal","towel"]', '大会オリジナルTシャツ、完走メダル、フィニッシャータオル', 'Official race T-shirt, Finisher medal, Finisher towel', NULL, 0);

-- ==================
-- にしおマラソン (nishio-marathon-2026)
-- ==================
INSERT OR REPLACE INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
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
  NULL,
  0,
  6000,
  NULL,
  NULL,
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
  '2026-03-15T00:00:00Z',
  '2026-03-15T00:00:00Z'
);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, waves, sort_order) VALUES
  ('nishio-marathon-2026', 'full', 42.195, 390, '09:00', 6000, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('nishio-marathon-2026', 'グルメ', '西尾の抹茶スイーツ', 'Nishio Matcha Sweets', '日本有数の抹茶産地・西尾ならではの抹茶グルメが充実。', 'Nishio, one of Japan''s top matcha producing areas, offers rich matcha cuisine.', '西尾市内', NULL, 34.8667, 137.0667);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('nishio-marathon-2026', '["tshirt","local_product"]', '大会Tシャツ、抹茶関連の特産品', 'Race T-shirt, Matcha-related local products', NULL, 0);

-- ==================
-- おかやまマラソン (okayama-marathon-2026)
-- ==================
INSERT OR REPLACE INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
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
  NULL,
  0,
  0,
  NULL,
  NULL,
  'race_day',
  '',
  '',
  '["城下町","観光"]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  '岡山城、後楽園',
  'Okayama Castle, Korakuen Garden',
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-03-15T00:00:00Z'
);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, waves, sort_order) VALUES
  ('okayama-marathon-2026', 'full', 42.195, 360, '', 0, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('okayama-marathon-2026', '観光地', '後楽園', 'Korakuen Garden', '日本三名園の一つ。岡山城とセットで訪れたい。', 'One of Japan''s three most beautiful gardens. Visit together with Okayama Castle.', 'コース付近', NULL, 34.6694, 133.9356);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('okayama-marathon-2026', '["tshirt","medal"]', '大会Tシャツ、完走メダル', 'Race T-shirt, Finisher medal', NULL, 0);

-- ==================
-- 大阪マラソン (osaka-marathon-2026)
-- ==================
INSERT OR REPLACE INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
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
  31970,
  NULL,
  NULL,
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
  '2026-03-15T00:00:00Z',
  '2026-03-15T00:00:00Z'
);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, waves, sort_order) VALUES
  ('osaka-marathon-2026', 'full', 42.195, 420, '09:15', 31970, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('osaka-marathon-2026', '観光地', '大阪城', 'Osaka Castle', 'コース上を通過する大阪のシンボル。天守閣からの眺望は壮観。', 'The symbol of Osaka on the course. The view from the castle tower is magnificent.', 'コース上（約8km地点）', NULL, 35.6586, 135.5261);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('osaka-marathon-2026', 'グルメ', '道頓堀', 'Dotonbori', '大阪グルメの中心地。たこ焼き、お好み焼きなど大阪名物が集結。レース後の食べ歩きに最適。', 'The heart of Osaka''s food culture. Takoyaki, okonomiyaki, and more. Perfect for post-race food tours.', 'コース付近', NULL, 35.6595, 135.5023);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('osaka-marathon-2026', '温泉', 'スパワールド世界の大温泉', 'Spa World', '通天閣近くの大型温泉施設。レース後のリカバリーに。コースの近くにあり便利。', 'A large hot spring facility near Tsutenkaku. Convenient for post-race recovery, located near the course.', '通天閣付近', NULL, 34.6522, 135.5064);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('osaka-marathon-2026', '["tshirt","medal","towel"]', '参加記念Tシャツ、完走メダル、フィニッシャータオル', 'Commemorative T-shirt, Finisher medal, Finisher towel', NULL, 0);

-- ==================
-- 佐渡トキマラソン (sado-toki-marathon-2026)
-- ==================
INSERT OR REPLACE INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
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
  0,
  0,
  NULL,
  NULL,
  'race_day',
  '',
  '',
  '["離島","景色が良い"]',
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
  '2026-03-15T00:00:00Z',
  '2026-03-15T00:00:00Z'
);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, waves, sort_order) VALUES
  ('sado-toki-marathon-2026', 'full', 42.195, 0, '', 0, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('sado-toki-marathon-2026', '観光地', '佐渡金山', 'Sado Kinzan Gold Mine', '世界遺産登録された佐渡金山。江戸時代の金採掘の歴史を学べる。', 'The World Heritage Sado Gold Mine. Learn about Edo-period gold mining history.', '佐渡島内', NULL, 38.0667, 138.2333);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('sado-toki-marathon-2026', '観光地', 'トキの森公園', 'Toki no Mori Park', '国の特別天然記念物トキを間近で観察できる施設。大会のモチーフであるトキに会える。', 'A facility to observe the crested ibis, a national special natural monument, up close.', '佐渡島内', NULL, 38.0333, 138.3667);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('sado-toki-marathon-2026', '["tshirt","medal","local_product"]', '大会Tシャツ、完走メダル、佐渡の特産品', 'Race T-shirt, Finisher medal, Sado Island local products', NULL, 0);

-- ==================
-- さが桜マラソン (saga-sakura-marathon-2026)
-- ==================
INSERT OR REPLACE INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
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
  NULL,
  0,
  0,
  NULL,
  NULL,
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
  '2026-03-15T00:00:00Z',
  '2026-03-15T00:00:00Z'
);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, waves, sort_order) VALUES
  ('saga-sakura-marathon-2026', 'full', 42.195, 0, '', 0, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('saga-sakura-marathon-2026', '観光地', '吉野ヶ里遺跡', 'Yoshinogari Ruins', '弥生時代の大規模環濠集落遺跡。国の特別史跡。佐賀市から近い。', 'A large-scale Yayoi period moated settlement. National Special Historic Site. Close to Saga city.', '佐賀市から車約20分', NULL, 33.3167, 130.3833);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('saga-sakura-marathon-2026', '["tshirt","medal"]', '大会Tシャツ、完走メダル', 'Race T-shirt, Finisher medal', NULL, 0);

-- ==================
-- さいたまマラソン (saitama-marathon-2026)
-- ==================
INSERT OR REPLACE INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
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
  NULL,
  0,
  0,
  NULL,
  NULL,
  'race_day',
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
  '2026-03-15T00:00:00Z',
  '2026-03-15T00:00:00Z'
);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, waves, sort_order) VALUES
  ('saitama-marathon-2026', 'full', 42.195, 360, '', 0, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('saitama-marathon-2026', '観光地', '氷川神社', 'Hikawa Shrine', '武蔵国一宮。2km以上の参道は日本一の長さ。大宮の象徴。', 'The first shrine of Musashi Province. Its 2km+ approach is the longest in Japan.', '大宮エリア', NULL, 35.9069, 139.6286);

-- ==================
-- 静岡マラソン (shizuoka-marathon-2026)
-- ==================
INSERT OR REPLACE INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
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
  0,
  0,
  NULL,
  NULL,
  'race_day',
  '',
  '',
  '["景色が良い","富士山","海沿い"]',
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
  '2026-03-15T00:00:00Z',
  '2026-03-15T00:00:00Z'
);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, waves, sort_order) VALUES
  ('shizuoka-marathon-2026', 'full', 42.195, 0, '', 0, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('shizuoka-marathon-2026', '観光地', '三保松原', 'Miho no Matsubara', '世界遺産「富士山」の構成資産。松林越しの富士山の眺望が美しい。', 'Part of the World Heritage ''Mt. Fuji''. Beautiful views of Mt. Fuji through pine groves.', '静岡市内から車約30分', NULL, 35.0136, 138.5167);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('shizuoka-marathon-2026', '["tshirt","medal"]', '大会Tシャツ、完走メダル', 'Race T-shirt, Finisher medal', NULL, 0);

-- ==================
-- 湘南国際マラソン (shonan-international-marathon-2026)
-- ==================
INSERT OR REPLACE INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
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
  0,
  0,
  NULL,
  NULL,
  'race_day',
  '',
  '',
  '["海沿い","景色が良い","富士山"]',
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
  '2026-03-15T00:00:00Z',
  '2026-03-16T00:00:00Z'
);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, waves, sort_order) VALUES
  ('shonan-international-marathon-2026', 'full', 42.195, 390, '', 0, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('shonan-international-marathon-2026', '観光地', '江の島', 'Enoshima', 'コースの折り返し地点付近。湘南のシンボル。しらす丼やサザエが名物。', 'Near the turnaround point. Symbol of Shonan. Famous for shirasu bowl and turban shell.', 'コース折り返し付近', NULL, 35.2994, 139.4806);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('shonan-international-marathon-2026', '["tshirt","medal"]', '大会Tシャツ、完走メダル', 'Race T-shirt, Finisher medal', NULL, 0);

-- ==================
-- そうじゃ吉備路マラソン (soja-kibiji-marathon-2026)
-- ==================
INSERT OR REPLACE INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
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
  NULL,
  0,
  0,
  NULL,
  NULL,
  'race_day',
  '',
  '',
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
  '2026-03-15T00:00:00Z',
  '2026-03-15T00:00:00Z'
);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, waves, sort_order) VALUES
  ('soja-kibiji-marathon-2026', 'full', 42.195, 0, '', 0, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('soja-kibiji-marathon-2026', '観光地', '備中国分寺五重塔', 'Bitchu Kokubunji Five-Story Pagoda', '吉備路のシンボル。コース上から望める。田園風景の中に立つ姿が美しい。', 'Symbol of Kibiji. Visible from the course. Beautiful standing among rice paddies.', 'コース上', NULL, 34.65, 133.7833);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('soja-kibiji-marathon-2026', '["tshirt","medal"]', '大会Tシャツ、完走メダル', 'Race T-shirt, Finisher medal', NULL, 0);

-- ==================
-- 丹波篠山ABCマラソン (tamba-sasayama-abc-marathon-2026)
-- ==================
INSERT OR REPLACE INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
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
  NULL,
  0,
  0,
  NULL,
  NULL,
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
  '2026-03-15T00:00:00Z',
  '2026-03-15T00:00:00Z'
);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, waves, sort_order) VALUES
  ('tamba-sasayama-abc-marathon-2026', 'full', 42.195, 330, '', 0, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('tamba-sasayama-abc-marathon-2026', 'グルメ', '丹波篠山の黒豆・ぼたん鍋', 'Tamba-Sasayama Black Beans & Botan Nabe', '丹波の黒豆と猪肉のぼたん鍋が名物。秋〜冬が旬。', 'Famous for Tamba black beans and boar meat hot pot. Best in autumn-winter.', '篠山市内', NULL, 35.0764, 135.2203);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('tamba-sasayama-abc-marathon-2026', '["tshirt","local_product"]', '大会Tシャツ、丹波の特産品', 'Race T-shirt, Tamba local products', NULL, 0);

-- ==================
-- 館山若潮マラソン (tateyama-wakashio-2026)
-- ==================
INSERT OR REPLACE INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
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
  NULL,
  0,
  0,
  NULL,
  NULL,
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
  '2026-03-15T00:00:00Z',
  '2026-03-16T00:00:00Z'
);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, waves, sort_order) VALUES
  ('tateyama-wakashio-2026', 'full', 42.195, 360, '', 0, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('tateyama-wakashio-2026', '観光地', '館山城', 'Tateyama Castle', '城山公園内の城。館山市街と東京湾を一望できる。', 'A castle in Shiroyama Park with views of Tateyama city and Tokyo Bay.', '会場付近', NULL, 34.9956, 139.8622);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('tateyama-wakashio-2026', 'グルメ', '房総の海鮮', 'Boso Seafood', '新鮮な海鮮が楽しめる。特に寿司や刺身がおすすめ。', 'Fresh seafood. Sushi and sashimi are especially recommended.', '館山市内', NULL, 34.9997, 139.8697);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('tateyama-wakashio-2026', '["tshirt","medal"]', '大会Tシャツ、完走メダル', 'Race T-shirt, Finisher medal', NULL, 0);

-- ==================
-- とくしまマラソン (tokushima-marathon-2026)
-- ==================
INSERT OR REPLACE INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
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
  NULL,
  0,
  0,
  NULL,
  NULL,
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
  '吉野川',
  'Yoshino River',
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-03-15T00:00:00Z'
);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, waves, sort_order) VALUES
  ('tokushima-marathon-2026', 'full', 42.195, 0, '', 0, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('tokushima-marathon-2026', '観光地', '鳴門の渦潮', 'Naruto Whirlpools', '世界三大潮流の一つ。大鳴門橋の遊歩道から渦潮を観察できる。', 'One of the world''s three great tidal currents. Observe whirlpools from the Onaruto Bridge walkway.', '徳島市から車約1時間', NULL, 34.2333, 134.6333);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('tokushima-marathon-2026', '["tshirt","medal"]', '大会Tシャツ、完走メダル', 'Race T-shirt, Finisher medal', NULL, 0);

-- ==================
-- 東京マラソン (tokyo-marathon-2026)
-- ==================
INSERT OR REPLACE INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
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
  23300,
  0,
  38500,
  '2025-08-15',
  '2025-08-29',
  'pre_day',
  'EXPO会場（東京ビッグサイト）にて前日受付。2/26-28。大会当日の受付なし。',
  'Pre-race registration at EXPO venue (Tokyo Big Sight). Feb 26-28. No registration on race day.',
  '["大規模","初心者おすすめ","フラット","観光","ワールドメジャーズ","日本陸連公認"]',
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
  '2026-03-15T00:00:00Z',
  '2026-03-15T00:00:00Z'
);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, waves, sort_order) VALUES
  ('tokyo-marathon-2026', 'full', 42.195, 420, '09:10', 38500, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, sort_order) VALUES
  ('tokyo-marathon-2026', '新宿駅', 'Shinjuku Station', 'shinjuku', '新宿駅西口から徒歩約10分でスタート会場（東京都庁前）', '10 min walk from Shinjuku Station West Exit to the start (Tokyo Metropolitan Government)', 35.6896, 139.6999, 0);
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, sort_order) VALUES
  ('tokyo-marathon-2026', '都庁前駅', 'Tochomae Station', 'tochomae', '都営大江戸線都庁前駅直結', 'Direct access from Toei Oedo Line Tochomae Station', 35.6915, 139.6917, 1);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('tokyo-marathon-2026', '観光地', '浅草寺・雷門', 'Sensoji Temple & Kaminarimon', 'コース上を通過する東京を代表する観光名所。外国人ランナーにも人気のスポット。', 'An iconic Tokyo landmark on the course. Popular with international runners.', 'コース上（約15km地点）', NULL, 35.7148, 139.7967);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('tokyo-marathon-2026', '観光地', '皇居', 'Imperial Palace', 'コースの中盤で皇居周辺を通過。普段はランナーの聖地として知られるランニングコース。', 'The course passes near the Imperial Palace in the middle section. Known as a holy ground for runners.', 'コース上（約37km地点）', NULL, 35.6852, 139.7528);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('tokyo-marathon-2026', 'グルメ', '東京駅周辺グルメ', 'Tokyo Station Area Dining', 'フィニッシュ地点の東京駅周辺には多数の飲食店。レース後の打ち上げに最適。', 'Numerous restaurants around Tokyo Station at the finish. Perfect for post-race celebrations.', 'フィニッシュ地点周辺', NULL, 35.6812, 139.7671);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('tokyo-marathon-2026', '["tshirt","medal","towel"]', '参加記念Tシャツ（参加者全員）、完走メダル（完走者）、完走タオル（完走者）', 'Commemorative T-shirt (all participants), Finisher medal (finishers), Finisher towel (finishers)', NULL, 0);

-- ==================
-- 鳥取マラソン (tottori-marathon-2026)
-- ==================
INSERT OR REPLACE INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
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
  NULL,
  0,
  0,
  NULL,
  NULL,
  'race_day',
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
  '2026-03-15T00:00:00Z',
  '2026-03-15T00:00:00Z'
);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, waves, sort_order) VALUES
  ('tottori-marathon-2026', 'full', 42.195, 0, '', 0, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('tottori-marathon-2026', '観光地', '鳥取砂丘', 'Tottori Sand Dunes', '日本最大級の砂丘。起伏のある広大な砂の風景は圧巻。パラグライダーやラクダ乗りも。', 'Japan''s largest sand dunes. Vast sandy landscape. Paragliding and camel rides available.', '会場から車約15分', NULL, 35.5411, 134.2289);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('tottori-marathon-2026', '["tshirt"]', '大会Tシャツ', 'Race T-shirt', NULL, 0);

-- ==================
-- 洞爺湖マラソン (toyako-marathon-2026)
-- ==================
INSERT OR REPLACE INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
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
  NULL,
  0,
  0,
  NULL,
  NULL,
  'race_day',
  '',
  '',
  '["景色が良い","湖畔","北海道"]',
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
  '2026-03-15T00:00:00Z',
  '2026-03-15T00:00:00Z'
);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, waves, sort_order) VALUES
  ('toyako-marathon-2026', 'full', 42.195, 0, '', 0, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('toyako-marathon-2026', '温泉', '洞爺湖温泉', 'Lake Toya Onsen', '洞爺湖畔の温泉街。湖と羊蹄山を望む露天風呂が魅力。レース後のリカバリーに最適。', 'Hot spring town on the shore of Lake Toya. Open-air baths with views of the lake and Mt. Yotei. Perfect for post-race recovery.', '会場付近', NULL, 42.55, 140.85);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('toyako-marathon-2026', '観光地', '有珠山・昭和新山', 'Mt. Usu & Showa-Shinzan', '活火山とその噴火で誕生した昭和新山。ロープウェイで山頂へ。洞爺湖を一望。', 'An active volcano and Showa-Shinzan born from its eruption. Ropeway to the summit with panoramic lake views.', '洞爺湖温泉から車約10分', NULL, 42.5389, 140.8411);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('toyako-marathon-2026', '["tshirt","medal"]', '大会Tシャツ、完走メダル', 'Race T-shirt, Finisher medal', NULL, 0);

-- ==================
-- 富山マラソン (toyama-marathon-2026)
-- ==================
INSERT OR REPLACE INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
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
  NULL,
  0,
  0,
  NULL,
  NULL,
  'race_day',
  '',
  '',
  '["景色が良い","橋"]',
  NULL,
  0,
  0,
  0,
  'road',
  '[]',
  '立山連峰、新湊大橋、富山湾',
  'Tateyama Mountains, Shinminato Bridge, Toyama Bay',
  NULL,
  NULL,
  '2026-03-15T00:00:00Z',
  '2026-03-16T00:00:00Z'
);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, waves, sort_order) VALUES
  ('toyama-marathon-2026', 'full', 42.195, 420, '', 0, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('toyama-marathon-2026', '観光地', '立山黒部アルペンルート', 'Tateyama Kurobe Alpine Route', '世界有数の山岳観光ルート。レース翌日の観光に。11月上旬は紅葉シーズン。', 'One of the world''s premier mountain sightseeing routes. For sightseeing the day after. Early November is autumn foliage season.', '富山駅から電鉄富山駅経由', NULL, 36.5778, 137.6028);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('toyama-marathon-2026', 'グルメ', '富山ブラックラーメン・白えび', 'Toyama Black Ramen & White Shrimp', '富山名物の濃い醤油ラーメンと、富山湾の宝石・白えび。', 'Toyama''s dark soy sauce ramen and white shrimp, jewels of Toyama Bay.', '富山市内', NULL, 36.6953, 137.2113);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('toyama-marathon-2026', '["tshirt","medal"]', '大会Tシャツ、完走メダル', 'Race T-shirt, Finisher medal', NULL, 0);

-- ==================
-- つくばマラソン (tsukuba-marathon-2026)
-- ==================
INSERT OR REPLACE INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
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
  0,
  0,
  NULL,
  NULL,
  'race_day',
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
  '2026-03-15T00:00:00Z',
  '2026-03-16T00:00:00Z'
);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, waves, sort_order) VALUES
  ('tsukuba-marathon-2026', 'full', 42.195, 0, '', 0, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('tsukuba-marathon-2026', '観光地', '筑波山', 'Mt. Tsukuba', '関東平野にそびえる名山。ロープウェイで山頂へ。コースからも望める。', 'A famous mountain rising from the Kanto Plain. Ropeway to the summit. Visible from the course.', 'つくば市から車約30分', NULL, 36.2253, 140.1);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('tsukuba-marathon-2026', '["tshirt","medal"]', '大会Tシャツ、完走メダル', 'Race T-shirt, Finisher medal', NULL, 0);

-- ==================
-- 横浜マラソン (yokohama-marathon-2026)
-- ==================
INSERT OR REPLACE INTO races (
  id, name_ja, name_en, date, prefecture, city_ja, city_en,
  description_ja, description_en, official_url,
  entry_fee, entry_fee_by_category, entry_capacity,
  entry_start_date, entry_end_date,
  reception_type, reception_note_ja, reception_note_en,
  tags, course_gpx_file,
  course_max_elevation_m, course_min_elevation_m, course_elevation_diff_m,
  course_surface, course_certification,
  course_highlights_ja, course_highlights_en,
  course_notes_ja, course_notes_en,
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
  NULL,
  0,
  0,
  NULL,
  NULL,
  'race_day',
  '',
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
  '2026-03-15T00:00:00Z',
  '2026-03-16T00:00:00Z'
);
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, waves, sort_order) VALUES
  ('yokohama-marathon-2026', 'full', 42.195, 390, '08:30', 0, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('yokohama-marathon-2026', '観光地', 'みなとみらい・赤レンガ倉庫', 'Minato Mirai & Red Brick Warehouse', 'スタート・フィニッシュエリア周辺。横浜を代表する観光スポット。ショッピングやグルメも充実。', 'Around the start/finish area. Yokohama''s iconic landmark. Shopping and dining.', 'スタート・フィニッシュ付近', NULL, 35.4537, 139.6429);
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('yokohama-marathon-2026', 'グルメ', '横浜中華街', 'Yokohama Chinatown', '日本最大の中華街。レース後の食べ歩きに最適。', 'Japan''s largest Chinatown. Perfect for post-race food tours.', 'みなとみらいから徒歩約15分', NULL, 35.4422, 139.6453);
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('yokohama-marathon-2026', '["tshirt","medal","towel"]', '大会Tシャツ、完走メダル、フィニッシャータオル', 'Race T-shirt, Finisher medal, Finisher towel', NULL, 0);

