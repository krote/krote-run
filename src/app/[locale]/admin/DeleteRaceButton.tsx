'use client';

import { useActionState } from 'react';
import { deleteRace } from '@/lib/admin-actions';

export function DeleteRaceButton({
  raceId,
  raceName,
  locale,
}: {
  raceId: string;
  raceName: string;
  locale: string;
}) {
  const [, action, isPending] = useActionState(deleteRace, null);

  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(`「${raceName}」を削除しますか？\n\nこの操作は取り消せません。`)) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="race_id" value={raceId} />
      <input type="hidden" name="locale" value={locale} />
      <button
        type="submit"
        disabled={isPending}
        className="text-xs px-3 py-1.5 border border-red-200 rounded text-red-600 hover:bg-red-50 hover:border-red-400 transition-colors disabled:opacity-50"
      >
        {isPending ? '削除中…' : '削除'}
      </button>
    </form>
  );
}
