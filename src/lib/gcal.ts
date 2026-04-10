/**
 * Google Calendar API helper (edge-compatible, fetch ベース)
 * アクセストークンは Better Auth の account テーブルから取得済みであること前提
 */

const GCAL_BASE = 'https://www.googleapis.com/calendar/v3';

export interface GCalEventInput {
  summary: string;
  description?: string;
  date: string; // "YYYY-MM-DD"
  reminderMinutesBefore?: number; // undefined = リマインダーなし
}

export interface GCalEvent {
  id: string;
  htmlLink: string;
}

/** Google Calendar にイベントを作成してイベントIDを返す */
export async function createGCalEvent(
  accessToken: string,
  input: GCalEventInput,
): Promise<GCalEvent> {
  const hasReminder = input.reminderMinutesBefore !== undefined;

  const body = {
    summary: input.summary,
    description: input.description,
    start: { date: input.date },
    end:   { date: input.date },
    reminders: {
      useDefault: false,
      overrides: hasReminder
        ? [
            { method: 'popup', minutes: input.reminderMinutesBefore },
            { method: 'email', minutes: input.reminderMinutesBefore },
          ]
        : [],
    },
  };

  const res = await fetch(
    `${GCAL_BASE}/calendars/primary/events`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Google Calendar API error ${res.status}: ${text}`);
  }

  const data = await res.json() as { id: string; htmlLink: string };
  return { id: data.id, htmlLink: data.htmlLink };
}

/** Google Calendar のイベントを削除する */
export async function deleteGCalEvent(
  accessToken: string,
  eventId: string,
): Promise<void> {
  const res = await fetch(
    `${GCAL_BASE}/calendars/primary/events/${eventId}`,
    {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );

  // 404 はすでに削除済みとみなして無視
  if (!res.ok && res.status !== 404) {
    const text = await res.text();
    throw new Error(`Google Calendar API error ${res.status}: ${text}`);
  }
}
