-- ==================
-- races（大会データ）
-- ==================

-- 長野マラソン 2026
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
  'nagano-marathon-2026',
  '第28回 長野マラソン',
  '28th Nagano Marathon',
  '2026-04-19',
  '20',
  '長野市',
  'Nagano City',
  '1998年長野冬季オリンピックの理念を継承し、1999年に初開催された歴史ある市民マラソン大会。エムウェーブ、ホワイトリング、ビッグハットなどのオリンピック施設を巡りながら、春の信濃路を駆け抜ける42.195km。日本陸連公認・AIMS公認コース。AbbottWMMワンダ・エイジグループワールドランキング予選大会。',
  'A historic citizens'' marathon inheriting the spirit of the 1998 Nagano Winter Olympics, first held in 1999. The 42.195km course passes through Olympic venues including M-Wave, White Ring, and Big Hat, running through the scenic spring landscape of Shinano. JAAF and AIMS certified course. AbbottWMM Wanda Age Group World Rankings qualifying event.',
  'https://www.naganomarathon.gr.jp/',
  14300,
  0,
  10000,
  '2025-10-11',
  '2025-10-31',
  'none',
  '前日受付なし。アスリートビブス・参加賞は大会2週間〜10日前に事前郵送',
  'No on-site registration. Athlete bibs and participation gifts are mailed 10-14 days before the event.',
  '["記録狙い","フラット","オリンピック施設","景色が良い","日本陸連公認","AIMS公認"]',
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
  '2026-03-10T00:00:00Z',
  '2026-03-10T00:00:00Z'
);

-- チャレンジ富士五湖 2026
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
  'challenge-fuji5lakes-2026',
  '第36回 チャレンジ富士五湖ウルトラマラソン',
  '36th Challenge Fuji Five Lakes Ultra Marathon',
  '2026-04-19',
  '19',
  '富士吉田市',
  'Fujiyoshida City',
  '世界遺産・富士山と五つの湖を舞台にしたウルトラマラソン大会。62km・80km・100km・120kmの4種目から実力に合わせて選べる。フラットなコースと春の走りやすい気候で、初めてのウルトラマラソンにもおすすめ。120kmの部はSPARTATHLON一般エントリー枠の国際レース基準を満たす大会。',
  'An ultra marathon set against the World Heritage site of Mt. Fuji and five beautiful lakes. Choose from 4 distances: 62km, 80km, 100km, and 120km to match your ability. The flat course and pleasant spring climate make it ideal for first-time ultra marathon runners. The 120km category meets the international race criteria for SPARTATHLON general entry.',
  'https://www.r-wellness.com/fuji5/',
  NULL,
  1,
  4500,
  '2025-10-24',
  '2026-01-31',
  'pre_mail',
  'ゼッケン・計測タグは大会約3週間前に発送。参加案内はメールで配信。前日（4/18）に受付あり。',
  'Race bibs and timing tags are mailed approximately 3 weeks before the event. Participation guide sent by email. On-site registration available the day before (4/18).',
  '["ウルトラマラソン","富士山","世界遺産","初ウルトラおすすめ","フラット","景色が良い","SPARTATHLON基準"]',
  NULL,
  1050,
  830,
  220,
  'road',
  '[]',
  '河口湖畔の桜並木、西湖からの富士山眺望、精進湖、本栖湖（120kmのみ）、山中湖（100km・120kmのみ）、富士北麓公園（スタート・フィニッシュ）',
  'Cherry blossom-lined Lake Kawaguchi shore, Mt. Fuji views from Lake Saiko, Lake Shoji, Lake Motosu (120km only), Lake Yamanaka (100km & 120km only), Fuji Hokuroku Park (start/finish)',
  '紙コップでの給水提供なし。携帯ボトル・カップ必須。補給食・防寒具・雨対策も携帯必須。標高830〜1050mのため、早朝は気温が低い（4月でも氷点下の可能性あり）。',
  'No paper cup water service. Carry your own bottle/cup. Must carry supplies, cold weather gear, and rain protection. Elevation 830-1050m, so early morning temperatures can be very low (below freezing possible even in April).',
  '2026-03-10T00:00:00Z',
  '2026-03-10T00:00:00Z'
);

-- ==================
-- race_categories
-- ==================

-- 長野マラソン: フルマラソン
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, waves, sort_order) VALUES
  ('nagano-marathon-2026', 'full', 42.195, 300, '08:30', 10000, NULL, NULL, NULL, NULL, NULL, NULL, '[]', 0);

-- チャレンジ富士五湖: 4カテゴリ
INSERT OR REPLACE INTO race_categories (race_id, distance_type, distance_km, time_limit_minutes, start_time, capacity, entry_fee, entry_fee_u25, name_ja, name_en, description_ja, description_en, waves, sort_order) VALUES
  ('challenge-fuji5lakes-2026', 'ultra', 120, 915, '04:00', 680, 25000, 20000, 'FUJI 5LAKES 120km', 'FUJI 5LAKES 120km',
   '富士五湖すべてを巡るコース。SPARTATHLON一般エントリー枠の国際レース基準対象（12時間以内完走が条件）',
   'Course circling all five Fuji lakes. Qualifies for SPARTATHLON general entry (must finish within 12 hours)',
   '[{"wave":"A","start_time":"04:00","end_time":"19:15"},{"wave":"B","start_time":"04:15","end_time":"19:30"}]', 0),
  ('challenge-fuji5lakes-2026', 'ultra', 100, 840, '04:30', 2090, 23000, 18400, 'FUJI 4LAKES 100km', 'FUJI 4LAKES 100km',
   '本栖湖を除く四湖を巡るコース',
   'Course circling four lakes (excluding Lake Motosu)',
   '[{"wave":"C","start_time":"04:30","end_time":"18:30"},{"wave":"D","start_time":"04:45","end_time":"18:45"},{"wave":"E","start_time":"05:00","end_time":"19:00"}]', 1),
  ('challenge-fuji5lakes-2026', 'ultra', 80, 750, '06:00', 1040, 21500, 17200, 'FUJI 4LAKES 80km', 'FUJI 4LAKES 80km',
   '山中湖を除く四湖を巡るコース',
   'Course circling four lakes (excluding Lake Yamanaka)',
   '[{"wave":"F","start_time":"06:00","end_time":"18:30"}]', 2),
  ('challenge-fuji5lakes-2026', 'ultra', 62, 660, '06:45', 690, 19500, 15600, 'FUJI 3LAKES 62km', 'FUJI 3LAKES 62km',
   '山中湖・本栖湖を除く三湖を巡るコース。初ウルトラにおすすめ',
   'Course circling three lakes (excluding Lake Yamanaka and Lake Motosu). Recommended for first ultra marathon',
   '[{"wave":"G","start_time":"06:45","end_time":"17:45"},{"wave":"H","start_time":"07:00","end_time":"18:00"}]', 3);

-- ==================
-- aid_stations
-- ==================

-- 長野マラソン
INSERT OR REPLACE INTO aid_stations (race_id, distance_km, offerings_ja, offerings_en, is_featured) VALUES
  ('nagano-marathon-2026',  5.0, '水、スポーツドリンク',                 'Water, sports drink',                   0),
  ('nagano-marathon-2026', 10.0, '水、スポーツドリンク、バナナ',         'Water, sports drink, banana',            0),
  ('nagano-marathon-2026', 15.0, '水、スポーツドリンク',                 'Water, sports drink',                   0),
  ('nagano-marathon-2026', 20.0, '水、スポーツドリンク、バナナ、おにぎり','Water, sports drink, banana, rice ball', 0),
  ('nagano-marathon-2026', 25.0, '水、スポーツドリンク',                 'Water, sports drink',                   0),
  ('nagano-marathon-2026', 30.0, '水、スポーツドリンク、バナナ、チョコレート','Water, sports drink, banana, chocolate', 0),
  ('nagano-marathon-2026', 35.0, '水、スポーツドリンク',                 'Water, sports drink',                   0),
  ('nagano-marathon-2026', 40.0, '水、スポーツドリンク',                 'Water, sports drink',                   0);

-- チャレンジ富士五湖
INSERT OR REPLACE INTO aid_stations (race_id, distance_km, offerings_ja, offerings_en, is_featured) VALUES
  ('challenge-fuji5lakes-2026',  10.0, '水、スポーツドリンク、補給食',         'Water, sports drink, snacks',           0),
  ('challenge-fuji5lakes-2026',  20.0, '水、スポーツドリンク、補給食、バナナ', 'Water, sports drink, snacks, banana',   0),
  ('challenge-fuji5lakes-2026',  30.0, '水、スポーツドリンク、補給食',         'Water, sports drink, snacks',           0),
  ('challenge-fuji5lakes-2026',  40.0, '水、スポーツドリンク、補給食、おにぎり','Water, sports drink, snacks, rice ball',0),
  ('challenge-fuji5lakes-2026',  50.0, '水、スポーツドリンク、補給食',         'Water, sports drink, snacks',           0),
  ('challenge-fuji5lakes-2026',  60.0, '水、スポーツドリンク、補給食',         'Water, sports drink, snacks',           0),
  ('challenge-fuji5lakes-2026',  75.0, '水、スポーツドリンク、補給食',         'Water, sports drink, snacks',           0),
  ('challenge-fuji5lakes-2026',  90.0, '水、スポーツドリンク、補給食',         'Water, sports drink, snacks',           0),
  ('challenge-fuji5lakes-2026', 105.0, '水、スポーツドリンク、補給食',         'Water, sports drink, snacks',           0);

-- ==================
-- checkpoints
-- ==================

-- 長野マラソン
INSERT OR REPLACE INTO checkpoints (race_id, distance_km, closing_time) VALUES
  ('nagano-marathon-2026',  5.8, '09:21'),
  ('nagano-marathon-2026', 10.4, '09:53'),
  ('nagano-marathon-2026', 14.7, '10:22'),
  ('nagano-marathon-2026', 19.3, '10:54'),
  ('nagano-marathon-2026', 24.6, '11:31'),
  ('nagano-marathon-2026', 29.2, '12:03'),
  ('nagano-marathon-2026', 34.2, '12:37'),
  ('nagano-marathon-2026', 39.3, '13:12'),
  ('nagano-marathon-2026', 41.1, '13:24');

-- チャレンジ富士五湖: 関門情報なし

-- ==================
-- access_points
-- ==================

-- 長野マラソン
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, sort_order) VALUES
  ('nagano-marathon-2026', '長野駅', 'Nagano Station', 'nagano',
   '長野駅東口からスタート会場（長野運動公園）までシャトルバスで約15分。または北長野駅から徒歩約15分。',
   'Shuttle bus from Nagano Station East Exit to the start venue (Nagano Athletic Park), approx. 15 min. Or 15 min walk from Kita-Nagano Station.',
   36.6433, 138.1889, 0),
  ('nagano-marathon-2026', '北長野駅', 'Kita-Nagano Station', 'kita-nagano',
   '徒歩約15分でスタート会場（長野運動公園）に到着',
   'Approx. 15 min walk to the start venue (Nagano Athletic Park)',
   36.6586, 138.1932, 1);

-- チャレンジ富士五湖
INSERT OR REPLACE INTO access_points (race_id, station_name_ja, station_name_en, station_code, transport_to_venue_ja, transport_to_venue_en, latitude, longitude, sort_order) VALUES
  ('challenge-fuji5lakes-2026', '富士山駅', 'Fujisan Station', 'fujisan',
   '富士山駅から富士北麓公園までシャトルバス運行（大会当日早朝）。または徒歩約30分。',
   'Shuttle bus from Fujisan Station to Fuji Hokuroku Park (early morning on race day). Or approx. 30 min walk.',
   35.4879, 138.7948, 0),
  ('challenge-fuji5lakes-2026', '河口湖駅', 'Kawaguchiko Station', 'kawaguchiko',
   '河口湖駅からタクシーで約15分。大会当日のシャトルバスは富士山駅発。',
   'Approx. 15 min by taxi from Kawaguchiko Station. Race day shuttle buses depart from Fujisan Station.',
   35.4997, 138.7656, 1);

-- ==================
-- nearby_spots
-- ==================

-- 長野マラソン
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('nagano-marathon-2026', '観光地', '善光寺', 'Zenkoji Temple',
   '約1400年の歴史を持つ長野市を代表する寺院。コース上でも善光寺表参道を通過する。前泊して朝のお朝事（あさじ）に参加するランナーも多い。',
   'A historic temple with approximately 1,400 years of history, representing Nagano City. The course passes through the Zenkoji approach road. Many runners who stay the night before participate in the early morning ceremony (Asaji).',
   'スタート会場から約3km', 'https://www.zenkoji.jp/', 36.6613, 138.1861),
  ('nagano-marathon-2026', '温泉', '裾花峡天然温泉 うるおい館', 'Susobanakyo Onsen Uruoikan',
   '長野市街地から近い天然温泉施設。レース後のリカバリーに最適。露天風呂から渓谷の景色を楽しめる。',
   'A natural hot spring facility close to Nagano city center. Perfect for post-race recovery. Enjoy views of the gorge from the outdoor bath.',
   '長野駅から車で約10分', NULL, 36.6470, 138.1600),
  ('nagano-marathon-2026', '温泉', '湯田中渋温泉郷', 'Yudanaka-Shibu Onsen',
   '長野駅から長野電鉄で約50分。歴史ある温泉街で、地獄谷野猿公苑（スノーモンキー）へのアクセス拠点でもある。レース翌日の観光に最適。',
   'About 50 min from Nagano Station by Nagano Electric Railway. A historic hot spring town and gateway to Jigokudani Monkey Park (Snow Monkeys). Perfect for sightseeing the day after the race.',
   '長野駅から電車で約50分', NULL, 36.7444, 138.4219),
  ('nagano-marathon-2026', 'グルメ', '戸隠そば', 'Togakushi Soba',
   '長野を代表するグルメ。戸隠地区には多くのそば店が並ぶ。レース前のカーボローディングにもおすすめ。',
   'A signature dish of Nagano. The Togakushi area is lined with soba noodle shops. Also recommended for carbo-loading before the race.',
   '長野市街地から車で約30分', NULL, 36.7500, 138.0700),
  ('nagano-marathon-2026', '観光地', '長野オリンピックミュージアム', 'Nagano Olympic Museum',
   '1998年長野冬季オリンピックの記録と記憶を展示する博物館。コースのゴール地点であるオリンピックスタジアムに隣接。',
   'A museum exhibiting records and memories of the 1998 Nagano Winter Olympics. Adjacent to the Olympic Stadium, which is the finish point of the course.',
   'フィニッシュ会場に隣接', NULL, 36.5982, 138.1814);

-- チャレンジ富士五湖
INSERT OR REPLACE INTO nearby_spots (race_id, type, name_ja, name_en, description_ja, description_en, distance_from_venue, url, latitude, longitude) VALUES
  ('challenge-fuji5lakes-2026', '観光地', '富士山五合目', 'Mt. Fuji 5th Station',
   '標高約2,300mの富士山五合目。4月はまだ冬季閉鎖中の場合があるが、富士スバルラインからの富士山の眺望は圧巻。',
   'Mt. Fuji 5th Station at approx. 2,300m altitude. May still be closed in April, but the views of Mt. Fuji from the Fuji Subaru Line are spectacular.',
   '富士北麓公園から車で約40分', NULL, 35.3606, 138.7274),
  ('challenge-fuji5lakes-2026', '温泉', '富士山溶岩の湯 泉水', 'Fuji Lava Hot Spring Sensui',
   '富士山の溶岩を使用した温泉施設。レース後のリカバリーに最適。富士山駅から徒歩圏内。',
   'A hot spring facility using Mt. Fuji lava rocks. Perfect for post-race recovery. Within walking distance from Fujisan Station.',
   '富士山駅から徒歩約10分', NULL, 35.4870, 138.7900),
  ('challenge-fuji5lakes-2026', '温泉', '山中湖温泉 紅富士の湯', 'Yamanakako Onsen Beni Fuji no Yu',
   '山中湖畔にある日帰り温泉施設。露天風呂から富士山を一望できる。',
   'A day-trip hot spring facility on the shore of Lake Yamanaka. Enjoy panoramic views of Mt. Fuji from the outdoor bath.',
   '富士北麓公園から車で約20分', NULL, 35.4200, 138.8600),
  ('challenge-fuji5lakes-2026', 'グルメ', '吉田のうどん', 'Yoshida Udon',
   '富士吉田市の名物料理。太くてコシの強い麺と味噌ベースのスープが特徴。市内に50軒以上のうどん店がある。レース後のエネルギー補給に最適。',
   'A specialty dish of Fujiyoshida City. Characterized by thick, chewy noodles and miso-based soup. Over 50 udon shops in the city. Perfect for post-race energy replenishment.',
   '富士山駅周辺', NULL, 35.4879, 138.7948),
  ('challenge-fuji5lakes-2026', '観光地', '忍野八海', 'Oshino Hakkai',
   '富士山の伏流水が湧き出す8つの池からなる景勝地。世界遺産「富士山」の構成資産のひとつ。透明度の高い水面に映る富士山が美しい。',
   'A scenic spot consisting of 8 ponds fed by Mt. Fuji''s underground water. Part of the World Heritage ''Mt. Fuji'' site. The clear water reflecting Mt. Fuji is breathtaking.',
   '富士北麓公園から車で約15分', NULL, 35.4578, 138.8306),
  ('challenge-fuji5lakes-2026', '観光地', '河口湖', 'Lake Kawaguchi',
   '富士五湖の中で最もアクセスが良い湖。4月は桜と富士山の共演が楽しめる。コース上でも湖畔を走る。',
   'The most accessible of the Fuji Five Lakes. In April, enjoy cherry blossoms with Mt. Fuji. The course runs along the lakeshore.',
   '富士北麓公園から車で約10分', NULL, 35.5100, 138.7500);

-- ==================
-- weather_history
-- ==================

-- 長野マラソン
INSERT OR REPLACE INTO weather_history (race_id, year, avg_temp, max_temp, min_temp, humidity_pct, precipitation_mm, wind_speed_ms) VALUES
  ('nagano-marathon-2026', 2025, 12.5, 18.2,  5.8, 55, 2.0, 2.5),
  ('nagano-marathon-2026', 2024, 14.1, 20.5,  7.2, 52, 0.0, 3.1),
  ('nagano-marathon-2026', 2023, 15.8, 22.3,  8.5, 48, 0.0, 2.8),
  ('nagano-marathon-2026', 2022, 11.2, 16.8,  4.9, 62, 5.5, 3.5),
  ('nagano-marathon-2026', 2019, 10.8, 15.5,  3.2, 58, 0.5, 2.2);

-- チャレンジ富士五湖
INSERT OR REPLACE INTO weather_history (race_id, year, avg_temp, max_temp, min_temp, humidity_pct, precipitation_mm, wind_speed_ms) VALUES
  ('challenge-fuji5lakes-2026', 2025, 10.2, 16.5, 2.8, 58, 1.5, 2.0),
  ('challenge-fuji5lakes-2026', 2024, 12.0, 18.8, 4.5, 52, 0.0, 2.5),
  ('challenge-fuji5lakes-2026', 2023, 13.5, 20.1, 5.8, 50, 0.0, 2.2),
  ('challenge-fuji5lakes-2026', 2022,  9.8, 15.0, 2.2, 65, 8.0, 3.0),
  ('challenge-fuji5lakes-2026', 2019,  8.5, 13.8, 1.0, 60, 3.5, 2.8);

-- ==================
-- participation_gifts
-- ==================

-- 長野マラソン
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('nagano-marathon-2026',
   '["tshirt","medal","towel"]',
   '大会オリジナルTシャツ（参加者全員）、完走メダル（完走者）、フィニッシャータオル（完走者）',
   'Official race T-shirt (all participants), Finisher medal (finishers), Finisher towel (finishers)',
   NULL, 0);

-- チャレンジ富士五湖
INSERT OR REPLACE INTO participation_gifts (race_id, gift_categories, description_ja, description_en, image, sort_order) VALUES
  ('challenge-fuji5lakes-2026',
   '["tshirt","medal","towel"]',
   '大会オリジナルTシャツ（THE NORTH FACE製・先着2,800名。先着数到達後はオリジナルタオルに変更）、完走メダル（完走者）、WEB完走証（完走者）',
   'Official race T-shirt by THE NORTH FACE (first 2,800 entries; changes to original towel after limit reached), Finisher medal (finishers), Web finisher certificate (finishers)',
   NULL, 0);
