type ValidationResult<T> = { data: T } | { error: string };

export interface PutGearItem {
  gear_id: string;
  quantity: number;
  sort_order: number;
}

export interface PutGearBody {
  items: PutGearItem[];
}

export interface PatchGearBody {
  gear_id: string;
  used: boolean | null;
  used_quantity?: number;
  note?: string;
}

function isInteger(n: unknown): n is number {
  return typeof n === 'number' && Number.isInteger(n);
}

export function validatePutBody(body: unknown): ValidationResult<PutGearBody> {
  if (body === null || typeof body !== 'object') {
    return { error: 'リクエストボディが不正です' };
  }

  const b = body as Record<string, unknown>;

  if (!Array.isArray(b.items)) {
    return { error: 'items は配列で指定してください' };
  }

  const items: PutGearItem[] = [];
  const seenGearIds = new Set<string>();

  for (let i = 0; i < b.items.length; i++) {
    const item = b.items[i] as Record<string, unknown>;

    if (typeof item.gear_id !== 'string' || item.gear_id.trim() === '') {
      return { error: `items[${i}].gear_id は空でない文字列で指定してください` };
    }
    const gear_id = item.gear_id.trim();

    if (seenGearIds.has(gear_id)) {
      return { error: `items に重複した gear_id があります: ${gear_id}` };
    }
    seenGearIds.add(gear_id);

    if (!isInteger(item.quantity) || (item.quantity as number) < 1 || (item.quantity as number) > 999) {
      return { error: `items[${i}].quantity は1〜999の整数で指定してください` };
    }

    if (!isInteger(item.sort_order) || (item.sort_order as number) < 0) {
      return { error: `items[${i}].sort_order は0以上の整数で指定してください` };
    }

    items.push({ gear_id, quantity: item.quantity as number, sort_order: item.sort_order as number });
  }

  return { data: { items } };
}

export function validatePatchBody(body: unknown): ValidationResult<PatchGearBody> {
  if (body === null || typeof body !== 'object') {
    return { error: 'リクエストボディが不正です' };
  }

  const b = body as Record<string, unknown>;

  if (!('gear_id' in b) || typeof b.gear_id !== 'string' || b.gear_id.trim() === '') {
    return { error: 'gear_id は空でない文字列で指定してください' };
  }
  const gear_id = b.gear_id.trim();

  if (!('used' in b)) {
    return { error: 'used は必須です' };
  }
  if (b.used !== null && typeof b.used !== 'boolean') {
    return { error: 'used は boolean または null で指定してください' };
  }
  const used = b.used as boolean | null;

  const result: PatchGearBody = { gear_id, used };

  if ('used_quantity' in b && b.used_quantity !== undefined && b.used_quantity !== null) {
    if (!isInteger(b.used_quantity) || (b.used_quantity as number) < 0 || (b.used_quantity as number) > 999) {
      return { error: 'used_quantity は0〜999の整数で指定してください' };
    }
    result.used_quantity = b.used_quantity as number;
  }

  if ('note' in b && b.note !== undefined && b.note !== null) {
    if (typeof b.note !== 'string') {
      return { error: 'note は文字列で指定してください' };
    }
    if (b.note.length > 500) {
      return { error: 'note は500文字以内で指定してください' };
    }
    result.note = b.note;
  }

  return { data: result };
}
