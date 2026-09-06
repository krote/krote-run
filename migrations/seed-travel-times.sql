-- 自動生成: calc-travel-times.js（レース単位で逐次追記）
-- 生成開始: 2026-09-06T06:59:00.906Z
--
-- レビュー後、手動で適用すること:
--   wrangler d1 execute <DB名> --local/--remote --file=migrations/seed-travel-times.sql

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('ainotuchiyama-2026', 'sapporo', 546, NULL, '2026-09-06T06:59:01.485Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('ainotuchiyama-2026', 'sendai', 497, NULL, '2026-09-06T06:59:01.954Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('ainotuchiyama-2026', 'tokyo', 400, NULL, '2026-09-06T06:59:02.618Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('ainotuchiyama-2026', 'nagoya', 297, NULL, '2026-09-06T06:59:02.934Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('ainotuchiyama-2026', 'osaka', 273, NULL, '2026-09-06T06:59:03.326Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('ainotuchiyama-2026', 'kyoto', 259, NULL, '2026-09-06T06:59:03.693Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('ainotuchiyama-2026', 'hiroshima', 387, NULL, '2026-09-06T06:59:04.142Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('ainotuchiyama-2026', 'fukuoka', 442, NULL, '2026-09-06T06:59:04.602Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('aomori-sakura-marathon-2026', 'sapporo', 390, NULL, '2026-09-06T06:59:05.008Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('aomori-sakura-marathon-2026', 'sendai', 214, NULL, '2026-09-06T06:59:05.386Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('aomori-sakura-marathon-2026', 'tokyo', 292, NULL, '2026-09-06T06:59:06.092Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('aomori-sakura-marathon-2026', 'nagoya', 411, NULL, '2026-09-06T06:59:06.712Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('aomori-sakura-marathon-2026', 'osaka', 438, NULL, '2026-09-06T06:59:07.446Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('aomori-sakura-marathon-2026', 'kyoto', 473, NULL, '2026-09-06T06:59:07.869Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('aomori-sakura-marathon-2026', 'hiroshima', 513, NULL, '2026-09-06T06:59:08.315Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('aomori-sakura-marathon-2026', 'fukuoka', 453, NULL, '2026-09-06T06:59:08.617Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('bando-masakado-half-marathon-2026', 'sapporo', 468, NULL, '2026-09-06T06:59:09.119Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('bando-masakado-half-marathon-2026', 'sendai', 333, NULL, '2026-09-06T06:59:09.558Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('bando-masakado-half-marathon-2026', 'tokyo', 245, NULL, '2026-09-06T06:59:10.222Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('bando-masakado-half-marathon-2026', 'nagoya', 365, NULL, '2026-09-06T06:59:10.652Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('bando-masakado-half-marathon-2026', 'osaka', 444, NULL, '2026-09-06T06:59:11.271Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('bando-masakado-half-marathon-2026', 'kyoto', 427, NULL, '2026-09-06T06:59:11.715Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('bando-masakado-half-marathon-2026', 'hiroshima', 514, NULL, '2026-09-06T06:59:12.228Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('bando-masakado-half-marathon-2026', 'fukuoka', 447, NULL, '2026-09-06T06:59:12.723Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('ehime-marathon-2027', 'sapporo', 396, NULL, '2026-09-06T06:59:13.118Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('ehime-marathon-2027', 'sendai', 376, NULL, '2026-09-06T06:59:13.483Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('ehime-marathon-2027', 'tokyo', 248, NULL, '2026-09-06T06:59:13.996Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('ehime-marathon-2027', 'nagoya', 294, NULL, '2026-09-06T06:59:14.364Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('ehime-marathon-2027', 'osaka', 229, NULL, '2026-09-06T06:59:14.809Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('ehime-marathon-2027', 'kyoto', 272, NULL, '2026-09-06T06:59:15.229Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('ehime-marathon-2027', 'hiroshima', 293, NULL, '2026-09-06T06:59:15.717Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('ehime-marathon-2027', 'fukuoka', 262, NULL, '2026-09-06T06:59:16.008Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('foodvalley-tokachi-marathon-2026', 'sapporo', 216, NULL, '2026-09-06T06:59:16.300Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('foodvalley-tokachi-marathon-2026', 'sendai', 380, NULL, '2026-09-06T06:59:16.681Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('foodvalley-tokachi-marathon-2026', 'tokyo', 364, NULL, '2026-09-06T06:59:17.337Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('foodvalley-tokachi-marathon-2026', 'nagoya', 409, NULL, '2026-09-06T06:59:17.657Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('foodvalley-tokachi-marathon-2026', 'osaka', 428, NULL, '2026-09-06T06:59:18.083Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('foodvalley-tokachi-marathon-2026', 'kyoto', 467, NULL, '2026-09-06T06:59:18.495Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('foodvalley-tokachi-marathon-2026', 'hiroshima', 550, NULL, '2026-09-06T06:59:18.831Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('foodvalley-tokachi-marathon-2026', 'fukuoka', 491, NULL, '2026-09-06T06:59:19.120Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('fukui-sakura-marathon-2027', 'sapporo', 465, NULL, '2026-09-06T06:59:19.611Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('fukui-sakura-marathon-2027', 'sendai', 333, NULL, '2026-09-06T06:59:20.043Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('fukui-sakura-marathon-2027', 'tokyo', 244, NULL, '2026-09-06T06:59:20.712Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('fukui-sakura-marathon-2027', 'nagoya', 195, NULL, '2026-09-06T06:59:21.118Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('fukui-sakura-marathon-2027', 'osaka', 201, NULL, '2026-09-06T06:59:21.676Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('fukui-sakura-marathon-2027', 'kyoto', 183, NULL, '2026-09-06T06:59:22.084Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('fukui-sakura-marathon-2027', 'hiroshima', 303, NULL, '2026-09-06T06:59:22.472Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('fukui-sakura-marathon-2027', 'fukuoka', 358, NULL, '2026-09-06T06:59:22.854Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('hamamatsu-city-marathon-2027', 'sapporo', 343, NULL, '2026-09-06T06:59:23.331Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('hamamatsu-city-marathon-2027', 'sendai', 266, NULL, '2026-09-06T06:59:23.769Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('hamamatsu-city-marathon-2027', 'tokyo', 124, NULL, '2026-09-06T06:59:24.426Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('hamamatsu-city-marathon-2027', 'nagoya', 73, NULL, '2026-09-06T07:00:29.877Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('hamamatsu-city-marathon-2027', 'osaka', 155, NULL, '2026-09-06T07:00:30.436Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('hamamatsu-city-marathon-2027', 'kyoto', 141, NULL, '2026-09-06T07:00:30.801Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('hamamatsu-city-marathon-2027', 'hiroshima', 248, NULL, '2026-09-06T07:00:31.176Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('hamamatsu-city-marathon-2027', 'fukuoka', 276, NULL, '2026-09-06T07:00:31.646Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('higashinipon-half-marathon-2026', 'sapporo', 299, NULL, '2026-09-06T07:00:32.406Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('higashinipon-half-marathon-2026', 'sendai', 235, NULL, '2026-09-06T07:00:32.866Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('higashinipon-half-marathon-2026', 'tokyo', 92, NULL, '2026-09-06T07:00:33.372Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('higashinipon-half-marathon-2026', 'nagoya', 156, NULL, '2026-09-06T07:00:33.789Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('higashinipon-half-marathon-2026', 'osaka', 235, NULL, '2026-09-06T07:00:34.322Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('higashinipon-half-marathon-2026', 'kyoto', 218, NULL, '2026-09-06T07:00:34.794Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('higashinipon-half-marathon-2026', 'hiroshima', 319, NULL, '2026-09-06T07:00:35.213Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('higashinipon-half-marathon-2026', 'fukuoka', 276, NULL, '2026-09-06T07:00:35.609Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('hokkaido-marathon-2026', 'sapporo', 10, NULL, '2026-09-06T07:00:35.890Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('hokkaido-marathon-2026', 'sendai', 248, NULL, '2026-09-06T07:00:36.275Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('hokkaido-marathon-2026', 'tokyo', 234, NULL, '2026-09-06T07:00:37.026Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('hokkaido-marathon-2026', 'nagoya', 276, NULL, '2026-09-06T07:00:37.547Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('hokkaido-marathon-2026', 'osaka', 295, NULL, '2026-09-06T07:00:38.100Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('hokkaido-marathon-2026', 'kyoto', 334, NULL, '2026-09-06T07:00:38.491Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('hokkaido-marathon-2026', 'hiroshima', 419, NULL, '2026-09-06T07:00:38.961Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('hokkaido-marathon-2026', 'fukuoka', 362, NULL, '2026-09-06T07:00:39.347Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('ichinoseki-half-marathon-2026', 'sapporo', 323, NULL, '2026-09-06T07:00:39.746Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('ichinoseki-half-marathon-2026', 'sendai', 100, NULL, '2026-09-06T07:00:40.167Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('ichinoseki-half-marathon-2026', 'tokyo', 211, NULL, '2026-09-06T07:00:40.746Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('ichinoseki-half-marathon-2026', 'nagoya', 331, NULL, '2026-09-06T07:00:41.108Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('ichinoseki-half-marathon-2026', 'osaka', 325, NULL, '2026-09-06T07:00:41.559Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('ichinoseki-half-marathon-2026', 'kyoto', 363, NULL, '2026-09-06T07:00:42.033Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('ichinoseki-half-marathon-2026', 'hiroshima', 448, NULL, '2026-09-06T07:00:42.594Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('ichinoseki-half-marathon-2026', 'fukuoka', 357, NULL, '2026-09-06T07:00:43.061Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('ishioka-tsukubane-half-marathon-2027', 'sapporo', 344, NULL, '2026-09-06T07:00:43.497Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('ishioka-tsukubane-half-marathon-2027', 'sendai', 252, NULL, '2026-09-06T07:00:43.881Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('ishioka-tsukubane-half-marathon-2027', 'tokyo', 114, NULL, '2026-09-06T07:00:44.399Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('ishioka-tsukubane-half-marathon-2027', 'nagoya', 233, NULL, '2026-09-06T07:00:44.818Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('ishioka-tsukubane-half-marathon-2027', 'osaka', 311, NULL, '2026-09-06T07:00:45.470Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('ishioka-tsukubane-half-marathon-2027', 'kyoto', 295, NULL, '2026-09-06T07:00:45.901Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('ishioka-tsukubane-half-marathon-2027', 'hiroshima', 388, NULL, '2026-09-06T07:00:46.288Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('ishioka-tsukubane-half-marathon-2027', 'fukuoka', 322, NULL, '2026-09-06T07:00:46.728Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('itabashi-city-marathon-2027', 'sapporo', 280, NULL, '2026-09-06T07:00:47.182Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('itabashi-city-marathon-2027', 'sendai', 163, NULL, '2026-09-06T07:01:52.617Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('itabashi-city-marathon-2027', 'tokyo', 53, NULL, '2026-09-06T07:01:53.198Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('itabashi-city-marathon-2027', 'nagoya', 173, NULL, '2026-09-06T07:01:53.658Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('itabashi-city-marathon-2027', 'osaka', 252, NULL, '2026-09-06T07:01:54.242Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('itabashi-city-marathon-2027', 'kyoto', 235, NULL, '2026-09-06T07:01:54.722Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('itabashi-city-marathon-2027', 'hiroshima', 320, NULL, '2026-09-06T07:01:55.064Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('itabashi-city-marathon-2027', 'fukuoka', 259, NULL, '2026-09-06T07:01:55.451Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('iwate-morioka-city-marathon-2026', 'sapporo', 375, NULL, '2026-09-06T07:01:55.924Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('iwate-morioka-city-marathon-2026', 'sendai', 152, NULL, '2026-09-06T07:01:56.340Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('iwate-morioka-city-marathon-2026', 'tokyo', 231, NULL, '2026-09-06T07:01:56.990Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('iwate-morioka-city-marathon-2026', 'nagoya', 350, NULL, '2026-09-06T07:01:57.444Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('iwate-morioka-city-marathon-2026', 'osaka', 377, NULL, '2026-09-06T07:01:58.045Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('iwate-morioka-city-marathon-2026', 'kyoto', 412, NULL, '2026-09-06T07:01:58.680Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('iwate-morioka-city-marathon-2026', 'hiroshima', 512, NULL, '2026-09-06T07:01:59.167Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('iwate-morioka-city-marathon-2026', 'fukuoka', 409, NULL, '2026-09-06T07:01:59.627Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('izu-oshima-2026', 'sapporo', 780, NULL, '2026-09-06T07:02:00.078Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('izu-oshima-2026', 'sendai', 698, NULL, '2026-09-06T07:02:00.450Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('izu-oshima-2026', 'tokyo', 555, NULL, '2026-09-06T07:02:00.979Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('izu-oshima-2026', 'nagoya', 665, NULL, '2026-09-06T07:02:01.391Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('izu-oshima-2026', 'osaka', 740, NULL, '2026-09-06T07:02:01.941Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('izu-oshima-2026', 'kyoto', 726, NULL, '2026-09-06T07:02:02.455Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('izu-oshima-2026', 'hiroshima', 822, NULL, '2026-09-06T07:02:02.907Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('izu-oshima-2026', 'fukuoka', 756, NULL, '2026-09-06T07:02:03.379Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kagawa-marathon-2027', 'sapporo', 421, NULL, '2026-09-06T07:02:03.872Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kagawa-marathon-2027', 'sendai', 397, NULL, '2026-09-06T07:02:04.353Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kagawa-marathon-2027', 'tokyo', 271, NULL, '2026-09-06T07:02:04.995Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kagawa-marathon-2027', 'nagoya', 194, NULL, '2026-09-06T07:02:05.387Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kagawa-marathon-2027', 'osaka', 171, NULL, '2026-09-06T07:02:05.879Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kagawa-marathon-2027', 'kyoto', 182, NULL, '2026-09-06T07:02:06.615Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kagawa-marathon-2027', 'hiroshima', 162, NULL, '2026-09-06T07:02:07.149Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kagawa-marathon-2027', 'fukuoka', 218, NULL, '2026-09-06T07:02:07.655Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kagoshima-marathon-2026', 'sapporo', 445, NULL, '2026-09-06T07:02:08.016Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kagoshima-marathon-2026', 'sendai', 408, NULL, '2026-09-06T07:02:08.439Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kagoshima-marathon-2026', 'tokyo', 296, NULL, '2026-09-06T07:02:08.964Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kagoshima-marathon-2026', 'nagoya', 297, NULL, '2026-09-06T07:02:09.354Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kagoshima-marathon-2026', 'osaka', 296, NULL, '2026-09-06T07:02:09.839Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kagoshima-marathon-2026', 'kyoto', 333, NULL, '2026-09-06T07:02:10.242Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kagoshima-marathon-2026', 'hiroshima', 245, NULL, '2026-09-06T07:02:10.591Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kagoshima-marathon-2026', 'fukuoka', 155, NULL, '2026-09-06T07:02:10.957Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kagoshima-marathon-2027', 'sapporo', 445, NULL, '2026-09-06T07:02:11.396Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kagoshima-marathon-2027', 'sendai', 408, NULL, '2026-09-06T07:02:11.825Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kagoshima-marathon-2027', 'tokyo', 296, NULL, '2026-09-06T07:02:12.450Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kagoshima-marathon-2027', 'nagoya', 297, NULL, '2026-09-06T07:02:12.814Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kagoshima-marathon-2027', 'osaka', 296, NULL, '2026-09-06T07:02:13.274Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kagoshima-marathon-2027', 'kyoto', 333, NULL, '2026-09-06T07:02:13.626Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kagoshima-marathon-2027', 'hiroshima', 245, NULL, '2026-09-06T07:02:14.077Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kagoshima-marathon-2027', 'fukuoka', 155, NULL, '2026-09-06T07:02:14.366Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kasama-togeinosato-half-2025-2026', 'sapporo', 406, NULL, '2026-09-06T07:02:14.791Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kasama-togeinosato-half-2025-2026', 'sendai', 245, NULL, '2026-09-06T07:02:15.174Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kasama-togeinosato-half-2025-2026', 'tokyo', 173, NULL, '2026-09-06T07:02:15.681Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kasama-togeinosato-half-2025-2026', 'nagoya', 292, NULL, '2026-09-06T07:02:16.108Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kasama-togeinosato-half-2025-2026', 'osaka', 374, NULL, '2026-09-06T07:02:16.526Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kasama-togeinosato-half-2025-2026', 'kyoto', 357, NULL, '2026-09-06T07:02:16.906Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kasama-togeinosato-half-2025-2026', 'hiroshima', 447, NULL, '2026-09-06T07:02:17.313Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kasama-togeinosato-half-2025-2026', 'fukuoka', 385, NULL, '2026-09-06T07:02:17.742Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kasumigaura-marathon-2026', 'sapporo', 331, NULL, '2026-09-06T07:03:23.579Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kasumigaura-marathon-2026', 'sendai', 239, NULL, '2026-09-06T07:03:24.291Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kasumigaura-marathon-2026', 'tokyo', 102, NULL, '2026-09-06T07:03:24.943Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kasumigaura-marathon-2026', 'nagoya', 220, NULL, '2026-09-06T07:03:25.605Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kasumigaura-marathon-2026', 'osaka', 299, NULL, '2026-09-06T07:03:26.350Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kasumigaura-marathon-2026', 'kyoto', 282, NULL, '2026-09-06T07:03:26.950Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kasumigaura-marathon-2026', 'hiroshima', 376, NULL, '2026-09-06T07:03:27.713Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kasumigaura-marathon-2026', 'fukuoka', 310, NULL, '2026-09-06T07:03:28.451Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kasumigaura-marathon-2027', 'sapporo', 331, NULL, '2026-09-06T07:03:29.065Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kasumigaura-marathon-2027', 'sendai', 239, NULL, '2026-09-06T07:03:29.705Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kasumigaura-marathon-2027', 'tokyo', 102, NULL, '2026-09-06T07:03:30.371Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kasumigaura-marathon-2027', 'nagoya', 220, NULL, '2026-09-06T07:03:31.060Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kasumigaura-marathon-2027', 'osaka', 299, NULL, '2026-09-06T07:03:31.793Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kasumigaura-marathon-2027', 'kyoto', 282, NULL, '2026-09-06T07:03:32.509Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kasumigaura-marathon-2027', 'hiroshima', 376, NULL, '2026-09-06T07:03:33.232Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kasumigaura-marathon-2027', 'fukuoka', 310, NULL, '2026-09-06T07:03:34.031Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('katsuta-marathon-2027', 'sapporo', 352, NULL, '2026-09-06T07:03:34.421Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('katsuta-marathon-2027', 'sendai', 260, NULL, '2026-09-06T07:03:34.769Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('katsuta-marathon-2027', 'tokyo', 123, NULL, '2026-09-06T07:03:35.278Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('katsuta-marathon-2027', 'nagoya', 241, NULL, '2026-09-06T07:03:35.707Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('katsuta-marathon-2027', 'osaka', 320, NULL, '2026-09-06T07:03:36.234Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('katsuta-marathon-2027', 'kyoto', 303, NULL, '2026-09-06T07:03:36.687Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('katsuta-marathon-2027', 'hiroshima', 396, NULL, '2026-09-06T07:03:37.138Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('katsuta-marathon-2027', 'fukuoka', 331, NULL, '2026-09-06T07:03:37.536Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kawaguchi-marathon-2026', 'sapporo', 273, NULL, '2026-09-06T07:03:38.089Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kawaguchi-marathon-2026', 'sendai', 158, NULL, '2026-09-06T07:03:38.460Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kawaguchi-marathon-2026', 'tokyo', 51, NULL, '2026-09-06T07:03:39.028Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kawaguchi-marathon-2026', 'nagoya', 171, NULL, '2026-09-06T07:03:39.510Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kawaguchi-marathon-2026', 'osaka', 250, NULL, '2026-09-06T07:03:39.990Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kawaguchi-marathon-2026', 'kyoto', 233, NULL, '2026-09-06T07:03:40.478Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kawaguchi-marathon-2026', 'hiroshima', 313, NULL, '2026-09-06T07:03:40.986Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kawaguchi-marathon-2026', 'fukuoka', 252, NULL, '2026-09-06T07:03:41.469Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kobe-marathon-2026', 'sapporo', 309, NULL, '2026-09-06T07:03:41.895Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kobe-marathon-2026', 'sendai', 267, NULL, '2026-09-06T07:03:42.341Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kobe-marathon-2026', 'tokyo', 208, NULL, '2026-09-06T07:03:43.104Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kobe-marathon-2026', 'nagoya', 106, NULL, '2026-09-06T07:03:43.465Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kobe-marathon-2026', 'osaka', 54, NULL, '2026-09-06T07:03:43.910Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kobe-marathon-2026', 'kyoto', 94, NULL, '2026-09-06T07:03:44.221Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kobe-marathon-2026', 'hiroshima', 137, NULL, '2026-09-06T07:03:44.591Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kobe-marathon-2026', 'fukuoka', 192, NULL, '2026-09-06T07:03:44.938Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kochi-ryoma-marathon-2027', 'sapporo', 416, NULL, '2026-09-06T07:04:50.400Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kochi-ryoma-marathon-2027', 'sendai', 371, NULL, '2026-09-06T07:04:50.813Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kochi-ryoma-marathon-2027', 'tokyo', 271, NULL, '2026-09-06T07:04:51.498Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kochi-ryoma-marathon-2027', 'nagoya', 292, NULL, '2026-09-06T07:04:51.961Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kochi-ryoma-marathon-2027', 'osaka', 227, NULL, '2026-09-06T07:04:52.444Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kochi-ryoma-marathon-2027', 'kyoto', 266, NULL, '2026-09-06T07:04:52.826Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kochi-ryoma-marathon-2027', 'hiroshima', 296, NULL, '2026-09-06T07:04:53.204Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kochi-ryoma-marathon-2027', 'fukuoka', 261, NULL, '2026-09-06T07:04:53.531Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kumamoto-castle-marathon-2027', 'sapporo', 433, NULL, '2026-09-06T07:04:54.008Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kumamoto-castle-marathon-2027', 'sendai', 345, NULL, '2026-09-06T07:04:54.398Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kumamoto-castle-marathon-2027', 'tokyo', 276, NULL, '2026-09-06T07:04:54.941Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kumamoto-castle-marathon-2027', 'nagoya', 278, NULL, '2026-09-06T07:04:55.338Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kumamoto-castle-marathon-2027', 'osaka', 261, NULL, '2026-09-06T07:04:55.767Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kumamoto-castle-marathon-2027', 'kyoto', 269, NULL, '2026-09-06T07:04:56.171Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kumamoto-castle-marathon-2027', 'hiroshima', 182, NULL, '2026-09-06T07:04:56.584Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('kumamoto-castle-marathon-2027', 'fukuoka', 91, NULL, '2026-09-06T07:04:56.929Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('myoko-trail-2026', 'sapporo', 448, NULL, '2026-09-06T07:04:57.365Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('myoko-trail-2026', 'sendai', 302, NULL, '2026-09-06T07:04:57.826Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('myoko-trail-2026', 'tokyo', 214, NULL, '2026-09-06T07:04:58.465Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('myoko-trail-2026', 'nagoya', 313, NULL, '2026-09-06T07:04:58.866Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('myoko-trail-2026', 'osaka', 336, NULL, '2026-09-06T07:04:59.411Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('myoko-trail-2026', 'kyoto', 322, NULL, '2026-09-06T07:04:59.834Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('myoko-trail-2026', 'hiroshima', 441, NULL, '2026-09-06T07:05:00.241Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('myoko-trail-2026', 'fukuoka', 427, NULL, '2026-09-06T07:05:00.651Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('nagano-marathon-2027', 'sapporo', 380, NULL, '2026-09-06T07:05:01.140Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('nagano-marathon-2027', 'sendai', 238, NULL, '2026-09-06T07:05:01.520Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('nagano-marathon-2027', 'tokyo', 149, NULL, '2026-09-06T07:05:02.170Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('nagano-marathon-2027', 'nagoya', 216, NULL, '2026-09-06T07:05:02.522Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('nagano-marathon-2027', 'osaka', 310, NULL, '2026-09-06T07:05:02.994Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('nagano-marathon-2027', 'kyoto', 293, NULL, '2026-09-06T07:05:03.429Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('nagano-marathon-2027', 'hiroshima', 394, NULL, '2026-09-06T07:05:03.864Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('nagano-marathon-2027', 'fukuoka', 359, NULL, '2026-09-06T07:05:04.335Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('ohme-marathon-2027', 'sapporo', 323, NULL, '2026-09-06T07:05:04.932Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('ohme-marathon-2027', 'sendai', 222, NULL, '2026-09-06T07:05:05.402Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('ohme-marathon-2027', 'tokyo', 96, NULL, '2026-09-06T07:05:06.182Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('ohme-marathon-2027', 'nagoya', 205, NULL, '2026-09-06T07:05:06.884Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('ohme-marathon-2027', 'osaka', 284, NULL, '2026-09-06T07:05:07.654Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('ohme-marathon-2027', 'kyoto', 267, NULL, '2026-09-06T07:05:08.138Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('ohme-marathon-2027', 'hiroshima', 368, NULL, '2026-09-06T07:05:08.621Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('ohme-marathon-2027', 'fukuoka', 302, NULL, '2026-09-06T07:05:09.095Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('okinawa-marathon-2027', 'sapporo', 622, NULL, '2026-09-06T07:05:09.601Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('okinawa-marathon-2027', 'sendai', 615, NULL, '2026-09-06T07:05:10.048Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('okinawa-marathon-2027', 'tokyo', 472, NULL, '2026-09-06T07:05:10.634Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('okinawa-marathon-2027', 'nagoya', 483, NULL, '2026-09-06T07:05:11.186Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('okinawa-marathon-2027', 'osaka', 492, NULL, '2026-09-06T07:05:11.658Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('okinawa-marathon-2027', 'kyoto', 534, NULL, '2026-09-06T07:05:12.199Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('okinawa-marathon-2027', 'hiroshima', 510, NULL, '2026-09-06T07:05:12.668Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('okinawa-marathon-2027', 'fukuoka', 405, NULL, '2026-09-06T07:05:13.162Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('osj-ontake100-2026', 'sapporo', 682, NULL, '2026-09-06T07:05:13.641Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('osj-ontake100-2026', 'sendai', 617, NULL, '2026-09-06T07:05:14.124Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('osj-ontake100-2026', 'tokyo', 529, NULL, '2026-09-06T07:05:14.704Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('osj-ontake100-2026', 'nagoya', 412, NULL, '2026-09-06T07:05:15.039Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('osj-ontake100-2026', 'osaka', 503, NULL, '2026-09-06T07:05:15.523Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('osj-ontake100-2026', 'kyoto', 489, NULL, '2026-09-06T07:05:15.924Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('osj-ontake100-2026', 'hiroshima', 589, NULL, '2026-09-06T07:05:16.340Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('osj-ontake100-2026', 'fukuoka', 615, NULL, '2026-09-06T07:05:16.871Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('sapporo-marathon-2026', 'sapporo', 56, NULL, '2026-09-06T07:05:17.222Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('sapporo-marathon-2026', 'sendai', 288, NULL, '2026-09-06T07:06:22.700Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('sapporo-marathon-2026', 'tokyo', 275, NULL, '2026-09-06T07:06:23.414Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('sapporo-marathon-2026', 'nagoya', 317, NULL, '2026-09-06T07:06:23.759Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('sapporo-marathon-2026', 'osaka', 336, NULL, '2026-09-06T07:06:24.219Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('sapporo-marathon-2026', 'kyoto', 375, NULL, '2026-09-06T07:06:24.676Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('sapporo-marathon-2026', 'hiroshima', 459, NULL, '2026-09-06T07:06:25.094Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('sapporo-marathon-2026', 'fukuoka', 411, NULL, '2026-09-06T07:06:25.411Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('shiga-kogen100-2026', 'sapporo', 848, NULL, '2026-09-06T07:06:25.936Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('shiga-kogen100-2026', 'sendai', 706, NULL, '2026-09-06T07:06:26.344Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('shiga-kogen100-2026', 'tokyo', 617, NULL, '2026-09-06T07:06:27.013Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('shiga-kogen100-2026', 'nagoya', 684, NULL, '2026-09-06T07:06:27.422Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('shiga-kogen100-2026', 'osaka', 775, NULL, '2026-09-06T07:06:27.911Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('shiga-kogen100-2026', 'kyoto', 761, NULL, '2026-09-06T07:06:28.357Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('shiga-kogen100-2026', 'hiroshima', 862, NULL, '2026-09-06T07:06:28.721Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('shiga-kogen100-2026', 'fukuoka', 827, NULL, '2026-09-06T07:06:29.193Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('shimada-oigawa-marathon-2026', 'sapporo', 351, NULL, '2026-09-06T07:06:29.612Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('shimada-oigawa-marathon-2026', 'sendai', 271, NULL, '2026-09-06T07:06:30.112Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('shimada-oigawa-marathon-2026', 'tokyo', 129, NULL, '2026-09-06T07:06:30.607Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('shimada-oigawa-marathon-2026', 'nagoya', 118, NULL, '2026-09-06T07:06:30.971Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('shimada-oigawa-marathon-2026', 'osaka', 200, NULL, '2026-09-06T07:06:31.450Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('shimada-oigawa-marathon-2026', 'kyoto', 186, NULL, '2026-09-06T07:06:31.916Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('shimada-oigawa-marathon-2026', 'hiroshima', 294, NULL, '2026-09-06T07:06:32.427Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('shimada-oigawa-marathon-2026', 'fukuoka', 322, NULL, '2026-09-06T07:06:32.875Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('shimosuwa-onbashira-trail-2026', 'sapporo', 443, NULL, '2026-09-06T07:06:33.391Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('shimosuwa-onbashira-trail-2026', 'sendai', 324, NULL, '2026-09-06T07:06:33.852Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('shimosuwa-onbashira-trail-2026', 'tokyo', 228, NULL, '2026-09-06T07:06:34.454Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('shimosuwa-onbashira-trail-2026', 'nagoya', 173, NULL, '2026-09-06T07:06:34.851Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('shimosuwa-onbashira-trail-2026', 'osaka', 267, NULL, '2026-09-06T07:06:35.369Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('shimosuwa-onbashira-trail-2026', 'kyoto', 250, NULL, '2026-09-06T07:06:35.742Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('shimosuwa-onbashira-trail-2026', 'hiroshima', 350, NULL, '2026-09-06T07:06:36.150Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('shimosuwa-onbashira-trail-2026', 'fukuoka', 376, NULL, '2026-09-06T07:06:36.575Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('soja-kibiji-marathon-2027', 'sapporo', 423, NULL, '2026-09-06T07:06:36.999Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('soja-kibiji-marathon-2027', 'sendai', 378, NULL, '2026-09-06T07:06:37.448Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('soja-kibiji-marathon-2027', 'tokyo', 276, NULL, '2026-09-06T07:06:38.031Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('soja-kibiji-marathon-2027', 'nagoya', 174, NULL, '2026-09-06T07:06:38.356Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('soja-kibiji-marathon-2027', 'osaka', 151, NULL, '2026-09-06T07:06:38.721Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('soja-kibiji-marathon-2027', 'kyoto', 162, NULL, '2026-09-06T07:06:39.094Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('soja-kibiji-marathon-2027', 'hiroshima', 143, NULL, '2026-09-06T07:06:39.388Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('soja-kibiji-marathon-2027', 'fukuoka', 198, NULL, '2026-09-06T07:06:39.712Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('tateyama-wakashio-2027', 'sapporo', 364, NULL, '2026-09-06T07:07:45.298Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('tateyama-wakashio-2027', 'sendai', 329, NULL, '2026-09-06T07:07:45.727Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('tateyama-wakashio-2027', 'tokyo', 191, NULL, '2026-09-06T07:07:46.251Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('tateyama-wakashio-2027', 'nagoya', 306, NULL, '2026-09-06T07:07:46.739Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('tateyama-wakashio-2027', 'osaka', 360, NULL, '2026-09-06T07:07:47.298Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('tateyama-wakashio-2027', 'kyoto', 367, NULL, '2026-09-06T07:07:47.894Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('tateyama-wakashio-2027', 'hiroshima', 401, NULL, '2026-09-06T07:07:48.289Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('tateyama-wakashio-2027', 'fukuoka', 346, NULL, '2026-09-06T07:07:48.681Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('tokyo-legacy-half-2026', 'sapporo', 250, NULL, '2026-09-06T07:07:49.127Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('tokyo-legacy-half-2026', 'sendai', 179, NULL, '2026-09-06T07:07:49.525Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('tokyo-legacy-half-2026', 'tokyo', 36, NULL, '2026-09-06T07:07:50.109Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('tokyo-legacy-half-2026', 'nagoya', 153, NULL, '2026-09-06T07:07:50.474Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('tokyo-legacy-half-2026', 'osaka', 231, NULL, '2026-09-06T07:07:51.039Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('tokyo-legacy-half-2026', 'kyoto', 214, NULL, '2026-09-06T07:07:51.457Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('tokyo-legacy-half-2026', 'hiroshima', 294, NULL, '2026-09-06T07:07:51.871Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('tokyo-legacy-half-2026', 'fukuoka', 229, NULL, '2026-09-06T07:07:52.221Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('tokyo-marathon-2027', 'sapporo', 256, NULL, '2026-09-06T07:07:52.649Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('tokyo-marathon-2027', 'sendai', 180, NULL, '2026-09-06T07:07:53.012Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('tokyo-marathon-2027', 'tokyo', 40, NULL, '2026-09-06T07:07:53.713Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('tokyo-marathon-2027', 'nagoya', 156, NULL, '2026-09-06T07:07:54.181Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('tokyo-marathon-2027', 'osaka', 235, NULL, '2026-09-06T07:07:54.646Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('tokyo-marathon-2027', 'kyoto', 218, NULL, '2026-09-06T07:07:55.130Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('tokyo-marathon-2027', 'hiroshima', 295, NULL, '2026-09-06T07:07:55.594Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('tokyo-marathon-2027', 'fukuoka', 234, NULL, '2026-09-06T07:07:55.991Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('yokohama-northdock-run-2026', 'sapporo', 276, NULL, '2026-09-06T07:07:56.409Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('yokohama-northdock-run-2026', 'sendai', 225, NULL, '2026-09-06T07:07:56.736Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('yokohama-northdock-run-2026', 'tokyo', 82, NULL, '2026-09-06T07:07:57.305Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('yokohama-northdock-run-2026', 'nagoya', 156, NULL, '2026-09-06T07:07:57.659Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('yokohama-northdock-run-2026', 'osaka', 231, NULL, '2026-09-06T07:07:58.100Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('yokohama-northdock-run-2026', 'kyoto', 218, NULL, '2026-09-06T07:07:58.557Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('yokohama-northdock-run-2026', 'hiroshima', 313, NULL, '2026-09-06T07:07:58.964Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

INSERT INTO race_travel_times (race_id, hub_id, duration_minutes, departure_time, calculated_at) VALUES
  ('yokohama-northdock-run-2026', 'fukuoka', 252, NULL, '2026-09-06T07:07:59.279Z')
ON CONFLICT(race_id, hub_id) DO UPDATE SET
  duration_minutes = excluded.duration_minutes,
  departure_time = excluded.departure_time,
  calculated_at = excluded.calculated_at;

