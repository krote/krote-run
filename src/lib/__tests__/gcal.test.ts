import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createGCalEvent, deleteGCalEvent } from '../gcal';

const ACCESS_TOKEN = 'test-access-token';

describe('createGCalEvent', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  it('正常なイベント作成リクエストを送信し、イベントIDを返す', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 'event-123', htmlLink: 'https://calendar.google.com/event?id=event-123' }),
    } as Response);

    const result = await createGCalEvent(ACCESS_TOKEN, {
      summary: '🏃 東京マラソン2026',
      date: '2026-03-01',
    });

    expect(result.id).toBe('event-123');
    expect(result.htmlLink).toContain('event-123');
    expect(fetch).toHaveBeenCalledWith(
      'https://www.googleapis.com/calendar/v3/calendars/primary/events',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({ Authorization: `Bearer ${ACCESS_TOKEN}` }),
      }),
    );
  });

  it('リマインダーなしの場合 overrides が空配列になる', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 'event-456', htmlLink: '' }),
    } as Response);

    await createGCalEvent(ACCESS_TOKEN, {
      summary: '🏃 テストレース',
      date: '2026-05-01',
    });

    const body = JSON.parse((vi.mocked(fetch).mock.calls[0][1] as RequestInit).body as string);
    expect(body.reminders.useDefault).toBe(false);
    expect(body.reminders.overrides).toEqual([]);
  });

  it('リマインダーあり (1440分) の場合 popup と email が設定される', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 'event-789', htmlLink: '' }),
    } as Response);

    await createGCalEvent(ACCESS_TOKEN, {
      summary: '📋 エントリー開始',
      date: '2025-10-01',
      reminderMinutesBefore: 1440,
    });

    const body = JSON.parse((vi.mocked(fetch).mock.calls[0][1] as RequestInit).body as string);
    expect(body.reminders.overrides).toHaveLength(2);
    expect(body.reminders.overrides).toContainEqual({ method: 'popup', minutes: 1440 });
    expect(body.reminders.overrides).toContainEqual({ method: 'email', minutes: 1440 });
  });

  it('APIがエラーを返した場合に例外をスローする', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 401,
      text: async () => 'Unauthorized',
    } as Response);

    await expect(
      createGCalEvent(ACCESS_TOKEN, { summary: 'test', date: '2026-01-01' }),
    ).rejects.toThrow('Google Calendar API error 401');
  });
});

describe('deleteGCalEvent', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  it('DELETE リクエストを正しいURLに送信する', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({ ok: true, status: 204 } as Response);

    await deleteGCalEvent(ACCESS_TOKEN, 'event-abc');

    expect(fetch).toHaveBeenCalledWith(
      'https://www.googleapis.com/calendar/v3/calendars/primary/events/event-abc',
      expect.objectContaining({
        method: 'DELETE',
        headers: expect.objectContaining({ Authorization: `Bearer ${ACCESS_TOKEN}` }),
      }),
    );
  });

  it('404 の場合は例外をスローしない（削除済みとみなす）', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({ ok: false, status: 404 } as Response);

    await expect(deleteGCalEvent(ACCESS_TOKEN, 'not-found')).resolves.toBeUndefined();
  });

  it('404 以外のエラーは例外をスローする', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 403,
      text: async () => 'Forbidden',
    } as Response);

    await expect(deleteGCalEvent(ACCESS_TOKEN, 'event-x')).rejects.toThrow(
      'Google Calendar API error 403',
    );
  });
});
