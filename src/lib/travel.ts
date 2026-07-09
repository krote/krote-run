import type { Race } from './types';
import type { HubId } from './hubs';
import { canReceiveOnRaceDay, getArrivalDeadline } from './reception';

export interface TravelSettings {
  hubId: HubId;
  nearestStation: string;
  offsetMinutes: number;
  firstTrainTime: string; // HH:MM
}

export type DayTripStatus =
  | { status: 'overnight_required'; reason: 'pre_day_only' }
  | { status: 'overnight_recommended'; reason: 'travel_time'; departureNeeded: string }
  | { status: 'day_trip'; departureNeeded: string }
  | { status: 'unknown'; reason: 'no_start_time' | 'no_travel_time' };

/** HH:MM 文字列を分に変換 */
function toMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

/** 分を HH:MM 文字列に変換 */
function fromMinutes(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

/**
 * 受付制約による前泊必須判定。
 * pre_mail / none は受付なし → 前泊必須にならない。
 * pre_day のみ（当日受付なし）→ 前泊必須。
 */
function requiresOvernightDueToReception(race: Race): boolean {
  if (race.reception_type === 'pre_mail' || race.reception_type === 'none') {
    return false;
  }
  return !canReceiveOnRaceDay(race);
}

/**
 * ユーザーの拠点（hub）から大会への当日移動が可能かを判定する。
 *
 * @param race 大会情報
 * @param travelMinutes ハブから会場までの所要時間（分）。未計算の場合は null
 * @param settings ユーザーの移動設定
 */
export function calcDayTripStatus(
  race: Race,
  travelMinutes: number | null,
  settings: TravelSettings,
): DayTripStatus {
  // 1. 受付制約で前泊必須
  if (requiresOvernightDueToReception(race)) {
    return { status: 'overnight_required', reason: 'pre_day_only' };
  }

  // 2. 到着期限が不明（start_time 未設定）
  const deadline = getArrivalDeadline(race);
  if (!deadline) {
    return { status: 'unknown', reason: 'no_start_time' };
  }

  // 3. 移動時間が未計算
  if (travelMinutes === null) {
    return { status: 'unknown', reason: 'no_travel_time' };
  }

  // 4. 必要出発時刻を計算
  const deadlineMinutes = toMinutes(deadline);
  const totalTravelMinutes = travelMinutes + settings.offsetMinutes;
  const departureMinutes = deadlineMinutes - totalTravelMinutes;
  const departureTime = fromMinutes(departureMinutes);

  // 5. 始発との比較
  const firstTrainMinutes = toMinutes(settings.firstTrainTime ?? '05:00');
  if (departureMinutes < firstTrainMinutes) {
    return { status: 'overnight_recommended', reason: 'travel_time', departureNeeded: departureTime };
  }

  return { status: 'day_trip', departureNeeded: departureTime };
}
