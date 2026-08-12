// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import RaceGearSection from '../RaceGearSection';

// ─── モック ──────────────────────────────────────────────────────────────────

const TRANSLATION_MAP: Record<string, string> = {
  raceGearButton: '装備',
  raceGearEmpty: '装備なし',
  raceGearNoGear: 'ギアを登録してリストを作成',
  raceGearAddFromGear: 'マイギアから追加',
  raceGearCopyFromPrev: '前のレースからコピー',
  raceGearCopySelect: 'コピー元を選択',
  raceGearCopyConfirm: 'このリストをコピー',
  raceGearNoCandidates: 'コピー元なし',
  raceGearSave: '保存',
  raceGearSaving: '保存中…',
  raceGearSaved: '保存済み',
  raceGearQuantity: '数量',
  raceGearUsed: '使用',
  raceGearNotUsed: '未使用',
  raceGearUsedUnknown: '未記録',
  raceGearUsedQuantity: '使用数',
  raceGearNote: 'メモ',
  raceGearGoToGear: 'ギアを登録する',
  raceGearRemove: '削除',
  raceGearAdd: '追加',
  raceGearCancel: 'キャンセル',
  raceGearPatchError: '保存に失敗しました',
};

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => TRANSLATION_MAP[key] ?? key,
}));

vi.mock('@/i18n/navigation', () => ({
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

// ─── テストデータ ──────────────────────────────────────────────────────────────

const MOCK_MY_GEAR = [
  {
    id: 'gear-1',
    user_id: 'user-1',
    category: 'shoes',
    brand: 'Nike',
    name: 'Vaporfly',
    amazon_url: null,
    asin: null,
    usage_tag: 'race',
    memo: '',
    is_retired: false,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'gear-2',
    user_id: 'user-1',
    category: 'tops',
    brand: null,
    name: 'ランニングシャツ',
    amazon_url: null,
    asin: null,
    usage_tag: 'both',
    memo: '',
    is_retired: false,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
];

const MOCK_RACE_GEAR = [
  {
    gear_id: 'gear-1',
    quantity: 1,
    used: null,
    used_quantity: null,
    note: '',
    sort_order: 0,
    name: 'Vaporfly',
    brand: 'Nike',
    category: 'shoes',
    asin: null,
    amazon_url: null,
  },
];

const MOCK_CANDIDATES = [
  { user_race_id: 'ur-other', race_id: 'osaka-marathon-2026', gear_count: 3 },
];

function setupFetch(opts: {
  myGear?: unknown[];
  raceGear?: unknown[];
  candidates?: unknown[];
  putResponse?: unknown[];
  patchResponse?: unknown;
} = {}) {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockImplementation((url: string, init?: RequestInit) => {
      const method = init?.method ?? 'GET';

      if (url === '/api/user/gear' && method === 'GET') {
        return Promise.resolve({ ok: true, json: async () => opts.myGear ?? [] });
      }
      if (url.includes('/gear?source=candidates')) {
        return Promise.resolve({ ok: true, json: async () => opts.candidates ?? [] });
      }
      if (url.includes('/gear') && method === 'GET') {
        return Promise.resolve({ ok: true, json: async () => opts.raceGear ?? [] });
      }
      if (url.includes('/gear') && method === 'PUT') {
        return Promise.resolve({ ok: true, json: async () => opts.putResponse ?? opts.raceGear ?? [] });
      }
      if (url.includes('/gear') && method === 'PATCH') {
        return Promise.resolve({ ok: true, json: async () => opts.patchResponse ?? (opts.raceGear ?? [])[0] ?? {} });
      }
      return Promise.resolve({ ok: false, json: async () => ({}) });
    }),
  );
}

const FUTURE_DATE = '2099-12-31';
const PAST_DATE = '2020-01-01';
const RACE_ID = 'tokyo-marathon-2026';

// ─── テスト ──────────────────────────────────────────────────────────────────

describe('RaceGearSection — 初期状態', () => {
  beforeEach(() => vi.clearAllMocks());

  it('「装備」ボタンが表示される', () => {
    render(<RaceGearSection raceId={RACE_ID} raceDate={FUTURE_DATE} />);
    expect(screen.getByRole('button', { name: '装備' })).toBeInTheDocument();
  });

  it('初期状態では展開パネルは表示されない', () => {
    render(<RaceGearSection raceId={RACE_ID} raceDate={FUTURE_DATE} />);
    expect(screen.queryByText('マイギアから追加')).not.toBeInTheDocument();
  });
});

describe('RaceGearSection — 展開・データ読み込み', () => {
  beforeEach(() => vi.clearAllMocks());

  it('ボタンクリックでデータを取得してパネルが展開される', async () => {
    setupFetch({ myGear: MOCK_MY_GEAR, raceGear: MOCK_RACE_GEAR });

    render(<RaceGearSection raceId={RACE_ID} raceDate={FUTURE_DATE} />);
    fireEvent.click(screen.getByRole('button', { name: '装備' }));

    await waitFor(() => {
      expect(screen.getByText('マイギアから追加')).toBeInTheDocument();
    });
  });

  it('マイギア0件: ギア登録リンクを表示', async () => {
    setupFetch({ myGear: [], raceGear: [] });

    render(<RaceGearSection raceId={RACE_ID} raceDate={FUTURE_DATE} />);
    fireEvent.click(screen.getByRole('button', { name: '装備' }));

    await waitFor(() => {
      expect(screen.getByText('ギアを登録してリストを作成')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'ギアを登録する' })).toBeInTheDocument();
    });
  });

  it('引退済みギアはマイギアリストに含まれない', async () => {
    const retiredGear = [
      { ...MOCK_MY_GEAR[0], is_retired: true },
    ];
    setupFetch({ myGear: retiredGear, raceGear: [] });

    render(<RaceGearSection raceId={RACE_ID} raceDate={FUTURE_DATE} />);
    fireEvent.click(screen.getByRole('button', { name: '装備' }));

    await waitFor(() => {
      // 引退ギアのみ → アクティブギアなし → ギア登録リンクを表示
      expect(screen.getByText('ギアを登録してリストを作成')).toBeInTheDocument();
    });
  });
});

describe('RaceGearSection — レース前（pre-race）', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setupFetch({ myGear: MOCK_MY_GEAR, raceGear: MOCK_RACE_GEAR });
  });

  it('装備アイテムを表示する', async () => {
    render(<RaceGearSection raceId={RACE_ID} raceDate={FUTURE_DATE} />);
    fireEvent.click(screen.getByRole('button', { name: '装備' }));

    await waitFor(() => {
      expect(screen.getByText('Nike Vaporfly')).toBeInTheDocument();
    });
  });

  it('「マイギアから追加」「前のレースからコピー」「保存」ボタンを表示', async () => {
    render(<RaceGearSection raceId={RACE_ID} raceDate={FUTURE_DATE} />);
    fireEvent.click(screen.getByRole('button', { name: '装備' }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'マイギアから追加' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '前のレースからコピー' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '保存' })).toBeInTheDocument();
    });
  });

  it('装備リストが空の場合「装備なし」を表示', async () => {
    setupFetch({ myGear: MOCK_MY_GEAR, raceGear: [] });

    render(<RaceGearSection raceId={RACE_ID} raceDate={FUTURE_DATE} />);
    fireEvent.click(screen.getByRole('button', { name: '装備' }));

    await waitFor(() => {
      expect(screen.getByText('装備なし')).toBeInTheDocument();
    });
  });

  it('「保存」ボタンクリックでPUT APIを呼ぶ', async () => {
    render(<RaceGearSection raceId={RACE_ID} raceDate={FUTURE_DATE} />);
    fireEvent.click(screen.getByRole('button', { name: '装備' }));

    await waitFor(() => screen.getByRole('button', { name: '保存' }));
    fireEvent.click(screen.getByRole('button', { name: '保存' }));

    await waitFor(() => {
      const fetchMock = vi.mocked(fetch);
      const putCall = fetchMock.mock.calls.find(
        ([url, init]) => String(url).includes('/gear') && (init as RequestInit)?.method === 'PUT',
      );
      expect(putCall).toBeDefined();
    });
  });

  it('×ボタンでアイテムをドラフトから削除できる', async () => {
    render(<RaceGearSection raceId={RACE_ID} raceDate={FUTURE_DATE} />);
    fireEvent.click(screen.getByRole('button', { name: '装備' }));

    await waitFor(() => screen.getByText('Nike Vaporfly'));

    fireEvent.click(screen.getByRole('button', { name: '削除' }));

    expect(screen.queryByText('Nike Vaporfly')).not.toBeInTheDocument();
    expect(screen.getByText('装備なし')).toBeInTheDocument();
  });
});

describe('RaceGearSection — レース後（post-race）', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setupFetch({ myGear: MOCK_MY_GEAR, raceGear: MOCK_RACE_GEAR });
  });

  it('使用/未使用/未記録トグルを表示する', async () => {
    render(<RaceGearSection raceId={RACE_ID} raceDate={PAST_DATE} />);
    fireEvent.click(screen.getByRole('button', { name: '装備' }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: '使用' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '未使用' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '未記録' })).toBeInTheDocument();
    });
  });

  it('「使用」ボタンクリックでPATCH APIを呼ぶ', async () => {
    const patchedItem = { ...MOCK_RACE_GEAR[0], used: true };
    setupFetch({ myGear: MOCK_MY_GEAR, raceGear: MOCK_RACE_GEAR, patchResponse: patchedItem });

    render(<RaceGearSection raceId={RACE_ID} raceDate={PAST_DATE} />);
    fireEvent.click(screen.getByRole('button', { name: '装備' }));

    await waitFor(() => screen.getByRole('button', { name: '使用' }));
    fireEvent.click(screen.getByRole('button', { name: '使用' }));

    await waitFor(() => {
      const fetchMock = vi.mocked(fetch);
      const patchCall = fetchMock.mock.calls.find(
        ([url, init]) => String(url).includes('/gear') && (init as RequestInit)?.method === 'PATCH',
      );
      expect(patchCall).toBeDefined();
    });
  });

  it('レース前UIのボタン（保存・追加・コピー）が表示されない', async () => {
    render(<RaceGearSection raceId={RACE_ID} raceDate={PAST_DATE} />);
    fireEvent.click(screen.getByRole('button', { name: '装備' }));

    await waitFor(() => screen.getByRole('button', { name: '使用' }));

    expect(screen.queryByRole('button', { name: '保存' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'マイギアから追加' })).not.toBeInTheDocument();
  });
});

describe('RaceGearSection — 参加済みレース後（post-race + isParticipated）', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setupFetch({ myGear: MOCK_MY_GEAR, raceGear: MOCK_RACE_GEAR });
  });

  it('「マイギアから追加」「保存」ボタンが表示される', async () => {
    render(<RaceGearSection raceId={RACE_ID} raceDate={PAST_DATE} isParticipated={true} />);
    fireEvent.click(screen.getByRole('button', { name: '装備' }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'マイギアから追加' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '保存' })).toBeInTheDocument();
    });
  });

  it('使用/未使用トグルも表示される', async () => {
    render(<RaceGearSection raceId={RACE_ID} raceDate={PAST_DATE} isParticipated={true} />);
    fireEvent.click(screen.getByRole('button', { name: '装備' }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: '使用' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '未使用' })).toBeInTheDocument();
    });
  });

  it('ギア未登録でも「マイギアから追加」ボタンが表示される', async () => {
    setupFetch({ myGear: MOCK_MY_GEAR, raceGear: [] });

    render(<RaceGearSection raceId={RACE_ID} raceDate={PAST_DATE} isParticipated={true} />);
    fireEvent.click(screen.getByRole('button', { name: '装備' }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'マイギアから追加' })).toBeInTheDocument();
    });
  });

  it('「保存」クリックでPUT APIを呼ぶ', async () => {
    render(<RaceGearSection raceId={RACE_ID} raceDate={PAST_DATE} isParticipated={true} />);
    fireEvent.click(screen.getByRole('button', { name: '装備' }));

    await waitFor(() => screen.getByRole('button', { name: '保存' }));
    fireEvent.click(screen.getByRole('button', { name: '保存' }));

    await waitFor(() => {
      const fetchMock = vi.mocked(fetch);
      const putCall = fetchMock.mock.calls.find(
        ([url, init]) => String(url).includes('/gear') && (init as RequestInit)?.method === 'PUT',
      );
      expect(putCall).toBeDefined();
    });
  });
});

describe('RaceGearSection — マイギアから追加', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setupFetch({ myGear: MOCK_MY_GEAR, raceGear: [] });
  });

  it('「マイギアから追加」クリックで選択パネルを表示', async () => {
    render(<RaceGearSection raceId={RACE_ID} raceDate={FUTURE_DATE} />);
    fireEvent.click(screen.getByRole('button', { name: '装備' }));

    await waitFor(() => screen.getByRole('button', { name: 'マイギアから追加' }));
    fireEvent.click(screen.getByRole('button', { name: 'マイギアから追加' }));

    await waitFor(() => {
      expect(screen.getByText(/Vaporfly/)).toBeInTheDocument();
      expect(screen.getByText('ランニングシャツ')).toBeInTheDocument();
    });
  });

  it('ギアを選択して追加するとドラフトに追加される', async () => {
    render(<RaceGearSection raceId={RACE_ID} raceDate={FUTURE_DATE} />);
    fireEvent.click(screen.getByRole('button', { name: '装備' }));

    await waitFor(() => screen.getByRole('button', { name: 'マイギアから追加' }));
    fireEvent.click(screen.getByRole('button', { name: 'マイギアから追加' }));

    await waitFor(() => screen.getByText(/Vaporfly/));
    // チェックボックスをクリック
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);

    fireEvent.click(screen.getByRole('button', { name: '追加' }));

    await waitFor(() => {
      expect(screen.getByText('Nike Vaporfly')).toBeInTheDocument();
    });
  });
});

describe('RaceGearSection — 前のレースからコピー', () => {
  beforeEach(() => vi.clearAllMocks());

  it('候補が0件の場合「コピー元なし」を表示', async () => {
    setupFetch({ myGear: MOCK_MY_GEAR, raceGear: [], candidates: [] });

    render(<RaceGearSection raceId={RACE_ID} raceDate={FUTURE_DATE} />);
    fireEvent.click(screen.getByRole('button', { name: '装備' }));

    await waitFor(() => screen.getByRole('button', { name: '前のレースからコピー' }));
    fireEvent.click(screen.getByRole('button', { name: '前のレースからコピー' }));

    await waitFor(() => {
      expect(screen.getByText('コピー元なし')).toBeInTheDocument();
    });
  });

  it('候補が存在する場合、セレクトボックスを表示', async () => {
    setupFetch({ myGear: MOCK_MY_GEAR, raceGear: [], candidates: MOCK_CANDIDATES });

    render(<RaceGearSection raceId={RACE_ID} raceDate={FUTURE_DATE} />);
    fireEvent.click(screen.getByRole('button', { name: '装備' }));

    await waitFor(() => screen.getByRole('button', { name: '前のレースからコピー' }));
    fireEvent.click(screen.getByRole('button', { name: '前のレースからコピー' }));

    await waitFor(() => {
      expect(screen.getByRole('combobox')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'このリストをコピー' })).toBeInTheDocument();
    });
  });
});
