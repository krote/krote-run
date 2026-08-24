import { RACE_RESULT_STATUSES, type RaceResultStatus } from './types';

type ValidationResult<T> = { data: T } | { error: string };

export interface PutResultBody {
  status: RaceResultStatus;
  finish_time_sec?: number;
  category_id?: number;
  note?: string;
}

function isInteger(n: unknown): n is number {
  return typeof n === 'number' && Number.isInteger(n);
}

export function validatePutBody(body: unknown): ValidationResult<PutResultBody> {
  if (body === null || typeof body !== 'object' || Array.isArray(body)) {
    return { error: 'リクエストボディが不正です' };
  }

  const b = body as Record<string, unknown>;

  // status
  if (!('status' in b) || !RACE_RESULT_STATUSES.includes(b.status as RaceResultStatus)) {
    return { error: `status は ${RACE_RESULT_STATUSES.join(' / ')} のいずれかで指定してください` };
  }
  const status = b.status as RaceResultStatus;

  // finish_time_sec
  let finish_time_sec: number | undefined;
  if (status === 'finished') {
    if (!('finish_time_sec' in b)) {
      return { error: 'finished の場合 finish_time_sec は必須です' };
    }
    if (!isInteger(b.finish_time_sec) || (b.finish_time_sec as number) < 1 || (b.finish_time_sec as number) > 172800) {
      return { error: 'finish_time_sec は 1〜172800 の整数で指定してください' };
    }
    finish_time_sec = b.finish_time_sec as number;
  } else if ('finish_time_sec' in b && b.finish_time_sec !== undefined && b.finish_time_sec !== null) {
    if (!isInteger(b.finish_time_sec) || (b.finish_time_sec as number) < 1 || (b.finish_time_sec as number) > 172800) {
      return { error: 'finish_time_sec は 1〜172800 の整数で指定してください' };
    }
    finish_time_sec = b.finish_time_sec as number;
  }

  // category_id
  let category_id: number | undefined;
  if ('category_id' in b && b.category_id !== undefined && b.category_id !== null) {
    if (!isInteger(b.category_id) || (b.category_id as number) < 1) {
      return { error: 'category_id は正の整数で指定してください' };
    }
    category_id = b.category_id as number;
  }

  // note
  let note: string | undefined;
  if ('note' in b && b.note !== undefined && b.note !== null) {
    if (typeof b.note !== 'string') {
      return { error: 'note は文字列で指定してください' };
    }
    if (b.note.length > 1000) {
      return { error: 'note は1000文字以内で指定してください' };
    }
    note = b.note;
  }

  const result: PutResultBody = { status };
  if (finish_time_sec !== undefined) result.finish_time_sec = finish_time_sec;
  if (category_id !== undefined) result.category_id = category_id;
  if (note !== undefined) result.note = note;

  return { data: result };
}
