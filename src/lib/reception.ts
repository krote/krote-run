import type { Race } from './types';

/** HH:MM 文字列を分に変換 */
function toMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

/** 分を HH:MM 文字列に変換（負値は24時間でラップ） */
function fromMinutes(minutes: number): string {
  const normalized = ((minutes % 1440) + 1440) % 1440;
  const h = Math.floor(normalized / 60);
  const m = normalized % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

/** 大会当日（race.date）の reception_session を返す */
function findRaceDaySession(race: Race) {
  return race.reception_sessions.find(s => s.date === race.date);
}

/**
 * 当日受付が可能かを返す。
 * reception_sessions がある場合は大会当日と同日の session の有無で判定。
 * sessions がない場合は reception_type にフォールバック。
 */
export function canReceiveOnRaceDay(race: Race): boolean {
  if (race.reception_sessions.length > 0) {
    return findRaceDaySession(race) !== undefined;
  }
  return race.reception_type === 'both' || race.reception_type === 'race_day';
}

/**
 * 大会当日受付の締切時刻を返す。
 * 対応する reception_session がない、または close_time が null の場合は null。
 */
export function getRaceDayReceptionClose(race: Race): string | null {
  return findRaceDaySession(race)?.close_time ?? null;
}

/**
 * 到着期限を返す。
 * = min(最早スタート時刻 - 30分バッファ, 当日受付締切時刻)
 * start_time が未設定の場合は null。
 */
export function getArrivalDeadline(race: Race): string | null {
  const startTimes = race.categories
    .map(c => c.start_time)
    .filter((t): t is string => !!t);

  if (startTimes.length === 0) return null;

  const earliestStart = startTimes.reduce((a, b) =>
    toMinutes(a) <= toMinutes(b) ? a : b
  );
  const deadlineFromStart = toMinutes(earliestStart) - 30;

  const receptionClose = getRaceDayReceptionClose(race);
  if (receptionClose === null) {
    return fromMinutes(deadlineFromStart);
  }

  const deadlineFromReception = toMinutes(receptionClose);
  return fromMinutes(Math.min(deadlineFromStart, deadlineFromReception));
}
