#!/usr/bin/env node
/**
 * 全レース JSON に motif / motif_color / motif_romaji / tagline_ja / tagline_en を設定するスクリプト
 */
const fs = require('fs');
const path = require('path');

const RACES_DIR = path.join(__dirname, '../src/data/races');

// id → motifデータのマップ
const MOTIF_DATA = {
  'abashiri-marathon-2026': {
    motif: '流氷',
    motif_color: '#bfdbfe',
    motif_romaji: 'Ryuhyo',
    tagline_ja: '流氷の大地を駆け抜ける春の42km',
    tagline_en: 'Run through the land of drift ice in spring',
  },
  'akita-nairiku-ultra-2026': {
    motif: '紅葉',
    motif_color: '#d4631a',
    motif_romaji: 'Koyo',
    tagline_ja: '秋田内陸の紅葉の回廊を走る100km',
    tagline_en: 'A 100km journey through autumn foliage corridors',
  },
  'aomori-sakura-marathon-2026': {
    motif: '桜',
    motif_color: '#f9c1cc',
    motif_romaji: 'Sakura',
    tagline_ja: '桜前線に乗って、青森を走る',
    tagline_en: 'Run through Aomori on the cherry blossom front',
  },
  'asahikawa-half-marathon-2026': {
    motif: '大雪山',
    motif_color: '#dbeafe',
    motif_romaji: 'Taisetsuzan',
    tagline_ja: '大雪山を仰ぎながら旭川の街を駆ける',
    tagline_en: 'Run through Asahikawa with Mt. Taisetsu in view',
  },
  'beppu-oita-marathon-2026': {
    motif: '温泉',
    motif_color: '#fed7aa',
    motif_romaji: 'Onsen',
    tagline_ja: '湯けむりの街から、大分へ。歴史ある42.195km',
    tagline_en: 'From the city of hot springs to Oita — a storied 42.195km',
  },
  'biwako-marathon-2026': {
    motif: '琵琶湖',
    motif_color: '#93c5fd',
    motif_romaji: 'Biwako',
    tagline_ja: '日本最大の湖を舞台に、水の都を走る',
    tagline_en: "Run along Japan's largest lake",
  },
  'challenge-fuji5lakes-2026': {
    motif: '富士五湖',
    motif_color: '#2563eb',
    motif_romaji: 'Fuji-Goko',
    tagline_ja: '富士五湖を巡る、究極のチャレンジ',
    tagline_en: 'The ultimate challenge around the five Fuji lakes',
  },
  'chiba-aqualine-marathon-2026': {
    motif: '海',
    motif_color: '#0ea5e9',
    motif_romaji: 'Umi',
    tagline_ja: '東京湾アクアラインを渡る、世界唯一のコース',
    tagline_en: 'The world-unique course crossing Tokyo Bay Aqua-Line',
  },
  'ehime-marathon-2026': {
    motif: 'みかん',
    motif_color: '#f97316',
    motif_romaji: 'Mikan',
    tagline_ja: '蜜柑の香り漂う、瀬戸内の道を走る',
    tagline_en: 'Run through the Seto Inland citrus country',
  },
  'fuji-mountain-race-2026': {
    motif: '富士山',
    motif_color: '#4b5563',
    motif_romaji: 'Fujisan',
    tagline_ja: '山頂を目指す、日本の頂への挑戦',
    tagline_en: 'Challenge to the summit — the ultimate mountain race',
  },
  'fujisan-marathon-2026': {
    motif: '富士山',
    motif_color: '#2a4fa3',
    motif_romaji: 'Fujisan',
    tagline_ja: '霊峰富士を望みながら駆ける、絶景のコース',
    tagline_en: "Run with Japan's sacred peak as your guide",
  },
  'fukuchiyama-marathon-2026': {
    motif: '福知山城',
    motif_color: '#78350f',
    motif_romaji: 'Fukuchiyama-jo',
    tagline_ja: '城下町・福知山の歴史街道を駆け抜ける',
    tagline_en: "Run through the historic castle town of Fukuchiyama",
  },
  'fukui-sakura-marathon-2026': {
    motif: '桜',
    motif_color: '#f9c1cc',
    motif_romaji: 'Sakura',
    tagline_ja: '福井の桜回廊を巡る、春の42km',
    tagline_en: "A spring 42km through Fukui's cherry blossom corridors",
  },
  'fukuoka-international-marathon-2026': {
    motif: '博多',
    motif_color: '#1e3a5f',
    motif_romaji: 'Hakata',
    tagline_ja: '国際都市・福岡が誇る、世界へ続く道',
    tagline_en: 'A world-class course in the international city of Fukuoka',
  },
  'fukuoka-marathon-2026': {
    motif: '博多湾',
    motif_color: '#0284c7',
    motif_romaji: 'Hakata-wan',
    tagline_ja: '博多の海沿いを走る、秋の風物詩',
    tagline_en: "Run along Hakata Bay in autumn",
  },
  'gunma-marathon-2026': {
    motif: '赤城山',
    motif_color: '#166534',
    motif_romaji: 'Akagi-san',
    tagline_ja: '赤城を仰ぎ、前橋の大地を駆ける',
    tagline_en: "Run across Maebashi plain with Mt. Akagi in view",
  },
  'higashine-sakuranbo-marathon-2026': {
    motif: 'さくらんぼ',
    motif_color: '#dc2626',
    motif_romaji: 'Sakuranbo',
    tagline_ja: 'さくらんぼの里・東根で走る、甘い42km',
    tagline_en: "Run 42km in Japan's cherry capital",
  },
  'higashinipon-half-marathon-2026': {
    motif: '桜',
    motif_color: '#f9c1cc',
    motif_romaji: 'Sakura',
    tagline_ja: '立川の春を駆け抜ける東日本ハーフ',
    tagline_en: 'East Japan Half Marathon through spring Tachikawa',
  },
  'himeji-castle-marathon-2026': {
    motif: '姫路城',
    motif_color: '#f8fafc',
    motif_romaji: 'Himeji-jo',
    tagline_ja: '世界遺産・白鷺城を眺めながら走る42.195km',
    tagline_en: "Run beneath the White Heron Castle, a World Heritage Site",
  },
  'hitachi-seaside-marathon-2026': {
    motif: 'コキア',
    motif_color: '#dc2626',
    motif_romaji: 'Kochiya',
    tagline_ja: '海浜公園のコキアが彩る、ひたちの秋',
    tagline_en: "Run through Hitachi Seaside Park's autumn kochia fields",
  },
  'hofu-yomiuri-marathon-2026': {
    motif: '防府天満宮',
    motif_color: '#92400e',
    motif_romaji: 'Hofu-Tenmangu',
    tagline_ja: '日本最古の天満宮の参道を巡る歴史ある大会',
    tagline_en: "Race through the grounds of Japan's oldest Tenmangu shrine",
  },
  'hokkaido-marathon-2026': {
    motif: 'ライラック',
    motif_color: '#8b5cf6',
    motif_romaji: 'Rairakku',
    tagline_ja: 'ライラック香る大通公園から、北の大地を走る',
    tagline_en: 'From the lilac-scented Odori Park across Hokkaido',
  },
  'ibusuki-nanohana-2026': {
    motif: '菜の花',
    motif_color: '#eab308',
    motif_romaji: 'Nanohana',
    tagline_ja: '黄金色の菜の花畑と薩摩の海を巡る42km',
    tagline_en: 'Run through golden rapeseed fields along the Satsuma sea',
  },
  'ichinoseki-half-marathon-2026': {
    motif: '厳美渓',
    motif_color: '#065f46',
    motif_romaji: 'Genbikei',
    tagline_ja: '厳美渓の渓谷美を感じながら走る一関ハーフ',
    tagline_en: "Run through the scenic Genbikei gorge in Ichinoseki",
  },
  'iki-ultra-marathon-2026': {
    motif: '壱岐の海',
    motif_color: '#0891b2',
    motif_romaji: 'Iki-no-Umi',
    tagline_ja: '玄界灘に浮かぶ神秘の島・壱岐を一周する',
    tagline_en: "Circle the mystical island of Iki in the Genkai Sea",
  },
  'itabashi-city-marathon-2026': {
    motif: '荒川',
    motif_color: '#6b7280',
    motif_romaji: 'Arakawa',
    tagline_ja: '荒川河川敷を駆ける、春の板橋シティマラソン',
    tagline_en: "Run the Arakawa riverside in spring",
  },
  'iwaki-sunshine-marathon-2026': {
    motif: '太平洋',
    motif_color: '#0369a1',
    motif_romaji: 'Taiheiyo',
    tagline_ja: '太平洋の輝きとともに、いわきの海岸を走る',
    tagline_en: "Run along Iwaki's Pacific coast in sunshine",
  },
  'iwate-morioka-city-marathon-2026': {
    motif: '岩手山',
    motif_color: '#374151',
    motif_romaji: 'Iwate-san',
    tagline_ja: '南部片富士・岩手山を望み、盛岡の街を駆ける',
    tagline_en: "Run through Morioka with Mt. Iwate towering above",
  },
  'iwate-oshu-kirameki-marathon-2026': {
    motif: '平泉',
    motif_color: '#854d0e',
    motif_romaji: 'Hiraizumi',
    tagline_ja: '世界遺産・平泉の黄金文化を感じながら走る',
    tagline_en: "Run through Hiraizumi, the Golden City of World Heritage",
  },
  'kagawa-marathon-2026': {
    motif: '瀬戸内海',
    motif_color: '#0284c7',
    motif_romaji: 'Setonaikai',
    tagline_ja: '瀬戸内の穏やかな海を見渡しながら走る42km',
    tagline_en: "Run along the serene shores of the Seto Inland Sea",
  },
  'kagoshima-marathon-2026': {
    motif: '桜島',
    motif_color: '#991b1b',
    motif_romaji: 'Sakura-jima',
    tagline_ja: '活火山・桜島を望む、薩摩の海岸を走る',
    tagline_en: "Run along Kagoshima Bay with the volcanic Sakurajima in view",
  },
  'kaikyo-marathon-2026': {
    motif: '関門海峡',
    motif_color: '#1e40af',
    motif_romaji: 'Kanmon-Kaikyo',
    tagline_ja: '本州と九州をつなぐ、関門海峡を渡る',
    tagline_en: "Cross the Kanmon Strait connecting Honshu and Kyushu",
  },
  'kanazawa-marathon-2026': {
    motif: '兼六園',
    motif_color: '#14532d',
    motif_romaji: 'Kenroku-en',
    tagline_ja: '加賀百万石の城下町・金沢を駆ける',
    tagline_en: "Run through Kanazawa, the castle town of one million koku",
  },
  'kasumigaura-marathon-2026': {
    motif: '霞ヶ浦',
    motif_color: '#7dd3fc',
    motif_romaji: 'Kasumigaura',
    tagline_ja: '日本第2位の湖・霞ヶ浦のほとりを走る',
    tagline_en: "Run along the shores of Lake Kasumigaura, Japan's 2nd largest lake",
  },
  'katsuta-marathon-2026': {
    motif: '百里',
    motif_color: '#4b5563',
    motif_romaji: 'Hyakuri',
    tagline_ja: '常陸の大地を駆け抜ける、勝田全国マラソン',
    tagline_en: "Run across the Hitachi plains at Katsuta",
  },
  'kitakyushu-marathon-2026': {
    motif: '洞海湾',
    motif_color: '#1d4ed8',
    motif_romaji: 'Dokai-wan',
    tagline_ja: '北九州の海と工場夜景の街を走る',
    tagline_en: "Run through Kitakyushu's industrial waterfront",
  },
  'kix-senshu-marathon-2026': {
    motif: '大阪湾',
    motif_color: '#0ea5e9',
    motif_romaji: 'Osaka-wan',
    tagline_ja: '関西国際空港を望む、泉州の海岸を駆ける',
    tagline_en: "Run the Senshu coast with Kansai International Airport in view",
  },
  'kobe-marathon-2026': {
    motif: '異人館',
    motif_color: '#b91c1c',
    motif_romaji: 'Ijin-kan',
    tagline_ja: '港町・神戸の異国情緒あふれる街を走る',
    tagline_en: "Run through the exotic port city of Kobe",
  },
  'kochi-ryoma-marathon-2026': {
    motif: '坂本龍馬',
    motif_color: '#1a3a1a',
    motif_romaji: 'Ryoma',
    tagline_ja: '龍馬の志を胸に、土佐の大地を駆け抜ける',
    tagline_en: "Run the Tosa plains with the spirit of Ryoma",
  },
  'kumamoto-castle-marathon-2026': {
    motif: '熊本城',
    motif_color: '#1c1917',
    motif_romaji: 'Kumamoto-jo',
    tagline_ja: '不落の名城・熊本城をめぐる感動の42km',
    tagline_en: "42km around the legendary Kumamoto Castle",
  },
  'kyoto-marathon-2026': {
    motif: '大文字山',
    motif_color: '#7f1d1d',
    motif_romaji: 'Daimonji-yama',
    tagline_ja: '千年の古都・京都の世界遺産をめぐる',
    tagline_en: "Run through Kyoto's thousand years of world heritage",
  },
  'mie-matsusaka-marathon-2026': {
    motif: '松阪牛',
    motif_color: '#7f1d1d',
    tagline_ja: '松阪牛の里・松阪を走る、美食ランナーの聖地',
    tagline_en: "Run through Matsusaka, home of Japan's finest beef",
    motif_romaji: 'Matsusaka-gyu',
  },
  'mito-komon-manyu-marathon-2026': {
    motif: '水戸黄門',
    motif_color: '#1c1917',
    motif_romaji: 'Mito-Komon',
    tagline_ja: '助さん格さんも驚く、水戸を駆ける42km',
    tagline_en: "Run through Mito as legends of the Komon await",
  },
  'mtfuji-climb-run-2026': {
    motif: '富士山頂',
    motif_color: '#1e3a8a',
    motif_romaji: 'Fujisan-cho',
    tagline_ja: '霊峰富士の頂へ、山岳レースの最高峰',
    tagline_en: "Climb to the summit of Mt. Fuji — the ultimate trail race",
  },
  'nagano-marathon-2026': {
    motif: '善光寺',
    motif_color: '#78350f',
    motif_romaji: 'Zenko-ji',
    tagline_ja: '長野オリンピックの遺産を巡る、信濃の春',
    tagline_en: "Run through Nagano's Olympic legacy in spring Shinano",
  },
  'nagoya-womens-marathon-2026': {
    motif: '名古屋城',
    motif_color: '#c2410c',
    motif_romaji: 'Nagoya-jo',
    tagline_ja: '女性ランナーの憧れ、名古屋の街を駆ける42km',
    tagline_en: "The women's marathon destination — run through Nagoya",
  },
  'naha-marathon-2026': {
    motif: 'ハイビスカス',
    motif_color: '#dc2626',
    motif_romaji: 'Haibisukasu',
    tagline_ja: '南国の陽光と笑顔溢れる、那覇の42km',
    tagline_en: "Run through tropical Naha with sunshine and smiles",
  },
  'nara-marathon-2026': {
    motif: '奈良の鹿',
    motif_color: '#92400e',
    motif_romaji: 'Nara-no-Shika',
    tagline_ja: '奈良の鹿と世界遺産が待つ、古都の42km',
    tagline_en: "Run through the ancient capital of Nara alongside sacred deer",
  },
  'niigata-city-marathon-2026': {
    motif: '信濃川',
    motif_color: '#0369a1',
    motif_romaji: 'Shinano-gawa',
    tagline_ja: '日本一の大河・信濃川が流れる、米どころを走る',
    tagline_en: "Run along the Shinano River, Japan's longest",
  },
  'nishio-marathon-2026': {
    motif: '抹茶',
    motif_color: '#4d7c0f',
    motif_romaji: 'Matcha',
    tagline_ja: '日本有数の抹茶の産地・西尾を巡る42km',
    tagline_en: "Run through Nishio, one of Japan's top matcha-producing cities",
  },
  'okayama-marathon-2026': {
    motif: '桃',
    motif_color: '#f9a8d4',
    motif_romaji: 'Momo',
    tagline_ja: '桃太郎の里・岡山を、晴れの国で走る',
    tagline_en: "Run through Okayama, the sunny land of Momotaro",
  },
  'okushinano100-2026': {
    motif: '北アルプス',
    motif_color: '#1e40af',
    motif_romaji: 'Kita-Arupusu',
    tagline_ja: '北アルプスの麓・奥信濃を走る100km',
    tagline_en: "100km through the foothills of the Northern Alps",
  },
  'osaka-marathon-2026': {
    motif: '大阪城',
    motif_color: '#92400e',
    motif_romaji: 'Osaka-jo',
    tagline_ja: '笑いと活気溢れる、天下の台所・大阪を走る',
    tagline_en: "Run through Osaka, the nation's kitchen of energy",
  },
  'osaka-yodo-river-citizens-marathon-2026': {
    motif: '淀川',
    motif_color: '#0284c7',
    motif_romaji: 'Yodogawa',
    tagline_ja: '淀川の流れに沿って、大阪の街を走る',
    tagline_en: "Run along the Yodo River through Osaka",
  },
  'osj-ontake100-2026': {
    motif: '御嶽山',
    motif_color: '#1c1917',
    motif_romaji: 'Ontake-san',
    tagline_ja: '霊峰・御嶽山の麓を巡る、100kmの山岳路',
    tagline_en: "100km through the sacred slopes of Mt. Ontake",
  },
  'sado-toki-marathon-2026': {
    motif: '朱鷺',
    motif_color: '#fb7185',
    motif_romaji: 'Toki',
    tagline_ja: '朱鷺舞う離島・佐渡で走る、自然豊かな42km',
    tagline_en: "Run the island of Sado where the endangered crested ibis soars",
  },
  'saga-sakura-marathon-2026': {
    motif: '桜',
    motif_color: '#f9c1cc',
    motif_romaji: 'Sakura',
    tagline_ja: '佐賀城址の桜を愛でながら走る、春の42km',
    tagline_en: "Run beneath cherry blossoms at Saga Castle in spring",
  },
  'saitama-marathon-2026': {
    motif: '荒川',
    motif_color: '#0369a1',
    motif_romaji: 'Arakawa',
    tagline_ja: '荒川の雄大な流れとともに走る、さいたまの42km',
    tagline_en: "Run along the vast Arakawa River through Saitama",
  },
  'shiga-kogen100-2026': {
    motif: '高原',
    motif_color: '#166534',
    motif_romaji: 'Kogen',
    tagline_ja: '志賀高原の雄大な自然の中を走る100kmトレイル',
    tagline_en: "100km trail through the majestic nature of Shiga Kogen",
  },
  'shimada-oigawa-marathon-2026': {
    motif: '大井川',
    motif_color: '#15803d',
    motif_romaji: 'Oi-gawa',
    tagline_ja: '南アルプスから流れる大井川沿いを走る42km',
    tagline_en: "Run along the Oi River flowing down from the Southern Alps",
  },
  'shinetsu5mountains-trail-100-2026': {
    motif: '信越五岳',
    motif_color: '#065f46',
    motif_romaji: 'Shin-etsu-Gogaku',
    tagline_ja: '信越の五つの山を巡る、100マイルの挑戦',
    tagline_en: "A 100-mile challenge through five peaks of the Shin-Etsu mountains",
  },
  'shizuoka-marathon-2026': {
    motif: '富士山',
    motif_color: '#2a4fa3',
    motif_romaji: 'Fujisan',
    tagline_ja: '富士山を正面に望む、海岸線の42km',
    tagline_en: "Run the coastline with Mt. Fuji straight ahead",
  },
  'shonan-international-marathon-2026': {
    motif: '湘南の海',
    motif_color: '#0ea5e9',
    motif_romaji: 'Shonan-no-Umi',
    tagline_ja: '湘南の海風を感じながら走る、江ノ島から湘南へ',
    tagline_en: "Run the Shonan coast from Enoshima with ocean breezes",
  },
  'soja-kibiji-marathon-2026': {
    motif: '吉備路',
    motif_color: '#854d0e',
    motif_romaji: 'Kibiji',
    tagline_ja: '吉備路の古代ロマンを感じながら走る42km',
    tagline_en: "Run the ancient Kibiji road through Soja's historic landscape",
  },
  'tamba-sasayama-abc-marathon-2026': {
    motif: '城下町',
    motif_color: '#1c1917',
    motif_romaji: 'Jokamachi',
    tagline_ja: '丹波篠山・城下町の風情漂う黒豆の里を走る',
    tagline_en: "Run through the castle town of Tamba Sasayama, home of black soybeans",
  },
  'tateyama-wakashio-2026': {
    motif: '若潮',
    motif_color: '#0369a1',
    motif_romaji: 'Wakashio',
    tagline_ja: '太平洋に面した館山の若潮を感じながら走る',
    tagline_en: "Run Tateyama's Pacific coast on the fresh tides of spring",
  },
  'tazawako-marathon-2026': {
    motif: '田沢湖',
    motif_color: '#1e40af',
    motif_romaji: 'Tazawako',
    tagline_ja: '日本最深の湖・田沢湖を一望しながら走る',
    tagline_en: "Run overlooking Lake Tazawa, Japan's deepest lake",
  },
  'tokushima-marathon-2026': {
    motif: '阿波おどり',
    motif_color: '#ea580c',
    motif_romaji: 'Awa-Odori',
    tagline_ja: '踊る阿呆に走る阿呆！阿波の国を駆け抜ける',
    tagline_en: "Run the land of Awa dance — the spirit of Tokushima",
  },
  'tokyo-marathon-2026': {
    motif: '東京の街',
    motif_color: '#1e293b',
    motif_romaji: 'Tokyo-no-Machi',
    tagline_ja: '世界6大メジャーの一つ、東京の街を駆け抜ける',
    tagline_en: "Race through Tokyo — one of the six World Marathon Majors",
  },
  'tokyo-marathon-2027': {
    motif: '東京の街',
    motif_color: '#1e293b',
    motif_romaji: 'Tokyo-no-Machi',
    tagline_ja: '世界6大メジャーの一つ、東京の街を駆け抜ける',
    tagline_en: "Race through Tokyo — one of the six World Marathon Majors",
  },
  'tomisato-suikaroad-2026': {
    motif: 'スイカ',
    motif_color: '#16a34a',
    motif_romaji: 'Suika',
    tagline_ja: '日本一のスイカの産地・富里を走る、夏の風物詩',
    tagline_en: "Run Japan's watermelon capital — a midsummer tradition",
  },
  'tottori-marathon-2026': {
    motif: '砂丘',
    motif_color: '#d4a853',
    motif_romaji: 'Sakyu',
    tagline_ja: '日本最大の砂丘を望む、山陰の大地を走る',
    tagline_en: "Run the San-in coast with Japan's great sand dunes in view",
  },
  'toyako-marathon-2026': {
    motif: '洞爺湖',
    motif_color: '#0369a1',
    motif_romaji: 'Toyako',
    tagline_ja: '洞爺湖の湖畔を巡る、北海道の爽快42km',
    tagline_en: "Circle the shores of Lake Toya in refreshing Hokkaido",
  },
  'toyama-marathon-2026': {
    motif: '立山連峰',
    motif_color: '#1e3a8a',
    motif_romaji: 'Tateyama-Rempo',
    tagline_ja: '立山連峰と富山湾を望む、360度の絶景コース',
    tagline_en: "Run with panoramic views of the Tateyama Range and Toyama Bay",
  },
  'tsukuba-marathon-2026': {
    motif: '筑波山',
    motif_color: '#374151',
    motif_romaji: 'Tsukuba-san',
    tagline_ja: '西の富士、東の筑波。科学の街を快走する',
    tagline_en: "Run through the science city with Mt. Tsukuba as your landmark",
  },
  'wakkanai-peace-marathon-2026': {
    motif: '宗谷岬',
    motif_color: '#0c4a6e',
    motif_romaji: 'Soya-Misaki',
    tagline_ja: '日本最北端・宗谷岬を目指す平和の42km',
    tagline_en: "Run toward Cape Soya, Japan's northernmost point",
  },
  'yokohama-marathon-2026': {
    motif: '港',
    motif_color: '#0e4f8a',
    motif_romaji: 'Minato',
    tagline_ja: '開港の街・横浜の海と丘を駆け抜ける',
    tagline_en: "Run through Yokohama's historic port city of sea and hills",
  },
};

const files = fs.readdirSync(RACES_DIR).filter(f => f.endsWith('.json') && f !== 'index.json');

let updated = 0;
let skipped = 0;

for (const file of files) {
  const id = file.replace('.json', '');
  const filePath = path.join(RACES_DIR, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const motifData = MOTIF_DATA[id];
  if (!motifData) {
    console.warn(`⚠ No motif data for: ${id}`);
    skipped++;
    continue;
  }

  data.motif = motifData.motif;
  data.motif_color = motifData.motif_color;
  data.motif_romaji = motifData.motif_romaji;
  data.tagline_ja = motifData.tagline_ja;
  data.tagline_en = motifData.tagline_en;

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  updated++;
}

console.log(`Updated: ${updated}, Skipped: ${skipped}, Total: ${files.length}`);
