// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import RaceResultSection, { parseTimeToSec } from '../RaceResultSection';

// ─── モック ──────────────────────────────────────────────────────────────────

const TRANSLATION_MAP: Record<string, string> = {
  raceResultButton: '結果を記録',
  raceResultStatus: '完走状態',
  raceResultFinished: '完走',
  raceResultDnf: 'DNF',
  raceResultDns: 'DNS',
  raceResultTime: 'タイム',
  raceResultTimePlaceholder: '例: 4:30:00',
  raceResultCategory: 'カテゴリ',
  raceResultNote: 'メモ',
  raceResultSave: '保存',
  raceResultSaving: '保存中…',
  raceResultSaved: '保存しました',
  raceResultEdit: '編集',
  raceResultDelete: '削除',
  raceResultDeleteConfirm: '記録を削除しますか？',
  raceResultBucketLabel: '走力帯',
  raceResultBucketNote: '走力帯は集計に使われます',
  raceResultInvalidTime: 'タイム形式が不正です',
  raceResultSaveError: '保存に失敗しました',
  'performance.sub430': 'サブ4.5',
};

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => TRANSLATION_MAP[key] ?? key,
}));

// ─── テストデータ ──────────────────────────────────────────────────────────────

const RACE_ID = 'nagano-marathon-2026';
const PAST_DATE = '2026-01-01';
const FUTURE_DATE = '2099-12-31';

const MOCK_CATEGORIES = [
  { id: 1, name_ja: 'フルマラソン', distance_km: 42.195, distance_type: 'full' },
];

const MOCK_RESULT = {
  id: 'result-1',
  user_race_id: 'ur-1',
  category_id: null,
  status: 'finished',
  finish_time_sec: 14400,
  note: '',
  created_at: '2026-01-02T00:00:00Z',
  updated_at: '2026-01-02T00:00:00Z',
};

const MOCK_RESULT_WITH_NOTE = { ...MOCK_RESULT, note: '途中で足がつった' };

const TODAY_JST = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Tokyo',
  year: 'numeric', month: '2-digit', day: '2-digit',
}).format(new Date());

// ─── テスト ───────────────────────────────────────────────────────────────────

describe('RaceResultSection — 未来の大会', () => {
  it('大会前は表示されない', () => {
    const { container } = render(
      <RaceResultSection raceId={RACE_ID} raceDate={FUTURE_DATE} categories={MOCK_CATEGORIES} />,
    );
    expect(container.firstChild).toBeNull();
  });
});

describe('RaceResultSection — 開催済み大会', () => {
  beforeEach(() => vi.clearAllMocks());

  it('トグルボタンが表示される', () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => null }));
    render(<RaceResultSection raceId={RACE_ID} raceDate={PAST_DATE} categories={MOCK_CATEGORIES} />);
    expect(screen.getByRole('button', { name: '結果を記録' })).toBeInTheDocument();
  });

  it('ボタンクリックでフォームが展開される', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => null }));
    render(<RaceResultSection raceId={RACE_ID} raceDate={PAST_DATE} categories={MOCK_CATEGORIES} />);
    fireEvent.click(screen.getByRole('button', { name: '結果を記録' }));
    await waitFor(() => {
      expect(screen.getByText('完走状態')).toBeInTheDocument();
    });
  });

  it('完走を選ぶとタイム入力が表示される', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => null }));
    render(<RaceResultSection raceId={RACE_ID} raceDate={PAST_DATE} categories={MOCK_CATEGORIES} />);
    fireEvent.click(screen.getByRole('button', { name: '結果を記録' }));
    await waitFor(() => screen.getByText('完走状態'));
    // 完走を選択
    fireEvent.click(screen.getByRole('button', { name: '完走' }));
    expect(screen.getByText('タイム')).toBeInTheDocument();
  });

  it('DNF を選ぶとタイム入力が表示されない', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => null }));
    render(<RaceResultSection raceId={RACE_ID} raceDate={PAST_DATE} categories={MOCK_CATEGORIES} />);
    fireEvent.click(screen.getByRole('button', { name: '結果を記録' }));
    await waitFor(() => screen.getByText('完走状態'));
    fireEvent.click(screen.getByRole('button', { name: 'DNF' }));
    expect(screen.queryByText('タイム')).not.toBeInTheDocument();
  });

  it('記録済みの場合は走力帯ノートと結果を表示', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => MOCK_RESULT }));
    render(<RaceResultSection raceId={RACE_ID} raceDate={PAST_DATE} categories={MOCK_CATEGORIES} />);
    fireEvent.click(screen.getByRole('button', { name: '結果を記録' }));
    await waitFor(() => {
      // 走力帯ノートが表示される
      expect(screen.getByText('走力帯は集計に使われます')).toBeInTheDocument();
      // タイムが表示される
      expect(screen.getByText('4:00:00')).toBeInTheDocument();
      // 走力帯が翻訳済みラベルで表示される（生の bucket id ではない）
      expect(screen.getByText(/サブ4.5/)).toBeInTheDocument();
    });
  });

  it('タイム形式が不正な場合はエラーを表示', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => null }));
    render(<RaceResultSection raceId={RACE_ID} raceDate={PAST_DATE} categories={MOCK_CATEGORIES} />);
    fireEvent.click(screen.getByRole('button', { name: '結果を記録' }));
    await waitFor(() => screen.getByText('完走状態'));
    fireEvent.click(screen.getByRole('button', { name: '完走' }));
    const input = screen.getByPlaceholderText('例: 4:30:00');
    fireEvent.change(input, { target: { value: 'invalid' } });
    fireEvent.click(screen.getByRole('button', { name: '保存' }));
    expect(screen.getByText('タイム形式が不正です')).toBeInTheDocument();
  });

  it('大会当日は表示される', () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => null }));
    render(<RaceResultSection raceId={RACE_ID} raceDate={TODAY_JST} categories={MOCK_CATEGORIES} />);
    expect(screen.getByRole('button', { name: '結果を記録' })).toBeInTheDocument();
  });

  it('記録済みのnoteを空にして保存すると空文字がそのまま送信される', async () => {
    const fetchMock = vi.fn().mockImplementation((url: string, init?: RequestInit) => {
      if (init?.method === 'PUT') {
        return Promise.resolve({ ok: true, json: async () => ({ ...MOCK_RESULT_WITH_NOTE, note: '' }) });
      }
      return Promise.resolve({ ok: true, json: async () => MOCK_RESULT_WITH_NOTE });
    });
    vi.stubGlobal('fetch', fetchMock);

    render(<RaceResultSection raceId={RACE_ID} raceDate={PAST_DATE} categories={MOCK_CATEGORIES} />);
    fireEvent.click(screen.getByRole('button', { name: '結果を記録' }));
    await waitFor(() => screen.getByText('途中で足がつった'));

    fireEvent.click(screen.getByRole('button', { name: '編集' }));
    const noteInput = await screen.findByDisplayValue('途中で足がつった');
    fireEvent.change(noteInput, { target: { value: '' } });
    fireEvent.click(screen.getByRole('button', { name: '保存' }));

    await waitFor(() => {
      const putCall = fetchMock.mock.calls.find(([, init]) => init?.method === 'PUT');
      expect(putCall).toBeDefined();
      const body = JSON.parse(putCall![1].body as string);
      expect(body.note).toBe('');
    });
  });

  it('category_id未指定の走力帯はフルマラソンのカテゴリを優先して算出する', async () => {
    const categories = [
      { id: 1, name_ja: '10km', distance_km: 10, distance_type: '10k' },
      { id: 2, name_ja: 'フルマラソン', distance_km: 42.195, distance_type: 'full' },
    ];
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => MOCK_RESULT }));
    render(<RaceResultSection raceId={RACE_ID} raceDate={PAST_DATE} categories={categories} />);
    fireEvent.click(screen.getByRole('button', { name: '結果を記録' }));
    await waitFor(() => {
      // 4:00:00 はフルマラソン基準では sub430、10km基準の 'all' ではない
      expect(screen.getByText(/サブ4.5/)).toBeInTheDocument();
    });
  });
});

describe('parseTimeToSec', () => {
  it('整数の h:mm:ss を正しく秒に変換する', () => {
    expect(parseTimeToSec('4:30:00')).toBe(16200);
  });

  it('小数を含む場合は不正として null を返す', () => {
    expect(parseTimeToSec('4:30:00.5')).toBeNull();
    expect(parseTimeToSec('4:30.5:00')).toBeNull();
  });
});
