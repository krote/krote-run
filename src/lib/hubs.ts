export const HUBS = {
  sapporo:   { id: 'sapporo',   name_ja: '札幌',  name_en: 'Sapporo',   lat: 43.0642, lng: 141.3469 },
  sendai:    { id: 'sendai',    name_ja: '仙台',  name_en: 'Sendai',    lat: 38.2682, lng: 140.8694 },
  tokyo:     { id: 'tokyo',     name_ja: '東京',  name_en: 'Tokyo',     lat: 35.6812, lng: 139.7671 },
  nagoya:    { id: 'nagoya',    name_ja: '名古屋', name_en: 'Nagoya',   lat: 35.1709, lng: 136.8815 },
  osaka:     { id: 'osaka',     name_ja: '大阪',  name_en: 'Osaka',     lat: 34.6937, lng: 135.5023 },
  kyoto:     { id: 'kyoto',     name_ja: '京都',  name_en: 'Kyoto',     lat: 35.0116, lng: 135.7681 },
  hiroshima: { id: 'hiroshima', name_ja: '広島',  name_en: 'Hiroshima', lat: 34.3853, lng: 132.4553 },
  fukuoka:   { id: 'fukuoka',   name_ja: '福岡',  name_en: 'Fukuoka',   lat: 33.5904, lng: 130.4017 },
} as const;

export type HubId = keyof typeof HUBS;
export type Hub = typeof HUBS[HubId];
