import type { Race, Locale } from './types';
import { formatDate, getDistanceLabel, getRaceDescription, getRaceCity, getRaceName } from './utils';
import prefecturesData from '@/data/prefectures.json';

/**
 * 説明文が未入力の大会向けのフォールバック文を組み立てる。
 *
 * 説明文が空のままだと JSON-LD の description を出せず、Search Console で
 * 「項目 description がありません」と指摘される（ja 10件・en 13件）。
 * ここで作るのは持っているデータ（開催日・開催地・距離種別・コース認定）を並べた
 * 事実だけの文で、実データにない内容は書かない。
 */
export function getRaceDescriptionOrFallback(race: Race, locale: Locale): string {
  const existing = getRaceDescription(race, locale).trim();
  if (existing) return existing;

  return locale === 'en' ? buildEnglish(race) : buildJapanese(race);
}

function getPrefectureName(race: Race, locale: Locale): string | null {
  const pref = prefecturesData.find((p) => p.code === race.prefecture);
  if (!pref) return null;
  return locale === 'en' ? pref.nameEn : pref.name;
}

/**
 * 開催地。市区町村の値には都道府県名を含むもの（「北海道網走市」）があるため、
 * 都道府県名と重ねて書かないようにする。
 */
function formatPlace(race: Race, locale: Locale): string | null {
  const pref = getPrefectureName(race, locale);
  const city = getRaceCity(race, locale).trim();

  if (!pref) return city || null;
  if (!city || city === pref) return pref;
  if (city.startsWith(pref)) return city;
  return locale === 'en' ? `${city}, ${pref}` : `${pref}${city}`;
}

/** 距離種別のラベル。'other'（「その他」）は文にしても情報にならないので除く */
function distanceLabels(race: Race, locale: Locale): string[] {
  const seen = new Set<string>();
  for (const category of race.categories) {
    if (category.distance_type === 'other') continue;
    seen.add(getDistanceLabel(category.distance_type, locale));
  }
  return [...seen];
}

function buildJapanese(race: Race): string {
  const place = formatPlace(race, 'ja');
  const distances = distanceLabels(race, 'ja');
  const sentences: string[] = [];

  const where = place ? `${place}で` : '';
  const what = distances.length > 0 ? `${distances.join('・')}の大会` : '大会';
  sentences.push(`${formatDate(race.date, 'ja')}に${where}開催される${what}「${getRaceName(race, 'ja').trim()}」。`);

  const certifications = race.course_info.certification;
  if (certifications.length > 0) {
    sentences.push(`${certifications.join('・')}公認コース。`);
  }

  return sentences.join('');
}

function buildEnglish(race: Race): string {
  const place = formatPlace(race, 'en');
  const distances = distanceLabels(race, 'en');
  const sentences: string[] = [];

  const what = distances.length > 0 ? distances.join(' / ') : 'running';
  const where = place ? ` in ${place}` : '';
  sentences.push(`${getRaceName(race, 'en').trim()} is a ${what} event held${where} on ${formatDate(race.date, 'en')}.`);

  const certifications = race.course_info.certification;
  if (certifications.length > 0) {
    sentences.push(`${certifications.join(' / ')} certified course.`);
  }

  return sentences.join(' ');
}
