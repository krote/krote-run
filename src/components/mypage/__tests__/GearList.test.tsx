// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import GearList from '../GearList';

// ─── モック ──────────────────────────────────────────────────────────────────
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const map: Record<string, string> = {
      title: 'マイギア',
      add: 'ギアを追加',
      empty: '登録したギアはありません。',
      showRetired: '引退したギアを表示',
      hideRetired: '引退したギアを隠す',
      retiredBadge: '引退',
      retire: '引退にする',
      unretire: '現役に戻す',
      delete: '削除',
      edit: '編集',
      save: '保存',
      cancel: 'キャンセル',
      deleteConfirmTitle: 'ギアを削除しますか？',
      deleteConfirmMessage: '削除すると、過去のレース装備記録からも削除されます。記録を残したい場合は「引退」がおすすめです。',
      deleteConfirmButton: '削除する',
      amazonLink: 'Amazonで見る',
      formCategory: 'カテゴリ',
      formBrand: 'ブランド（任意）',
      formName: '製品名',
      formAmazonUrl: 'Amazon商品URL（任意）',
      formAddTitle: 'ギアを追加',
      formEditTitle: 'ギアを編集',
      usageRace: 'レース用',
      usageTraining: '練習用',
      usageBoth: '兼用',
      categoryShoes: 'シューズ',
      categoryTops: 'トップス',
      categoryNutrition: '補給食',
      categoryOther: 'その他',
    };
    return map[key] ?? key;
  },
}));

const { mockUseSession } = vi.hoisted(() => ({
  mockUseSession: vi.fn(),
}));

vi.mock('@/lib/auth-client', () => ({
  useSession: () => mockUseSession(),
}));

vi.mock('@/lib/amazon', () => ({
  buildAmazonUrl: (asin: string) => `https://www.amazon.co.jp/dp/${asin}?tag=test-22`,
}));

// ─── テストデータ ──────────────────────────────────────────────────────────────
const MOCK_SESSION = { user: { id: 'user-1', name: 'テスト', email: 'test@example.com' } };

function makeGear(overrides: Partial<{
  id: string;
  user_id: string;
  category: string;
  brand: string;
  name: string;
  amazon_url: string | null;
  asin: string | null;
  usage_tag: string;
  memo: string;
  is_retired: boolean;
  created_at: string;
  updated_at: string;
}> = {}) {
  return {
    id: 'gear-1',
    user_id: 'user-1',
    category: 'shoes',
    brand: 'Nike',
    name: 'テストシューズ',
    amazon_url: null,
    asin: null,
    usage_tag: 'both',
    memo: '',
    is_retired: false,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
    ...overrides,
  };
}

function setupFetch(gears: unknown[]) {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockImplementation((url: string) => {
      if (url.includes('/api/user/gear')) {
        return Promise.resolve({ ok: true, json: async () => gears });
      }
      return Promise.resolve({ ok: false, json: async () => [] });
    }),
  );
}

// ─── テスト ──────────────────────────────────────────────────────────────────
describe('GearList — セッション状態', () => {
  beforeEach(() => vi.clearAllMocks());

  it('未ログイン（session=null）: 何も描画しない', () => {
    mockUseSession.mockReturnValue({ data: null });
    const { container } = render(<GearList />);
    expect(container.firstChild).toBeNull();
  });

  it('ローディング中: スケルトン UI を表示する', () => {
    mockUseSession.mockReturnValue({ data: MOCK_SESSION });
    vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {})));
    render(<GearList />);
    expect(document.querySelector('.animate-pulse')).toBeInTheDocument();
  });
});

describe('GearList — データ表示', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseSession.mockReturnValue({ data: MOCK_SESSION });
  });

  it('ギアなし: 空メッセージを表示', async () => {
    setupFetch([]);
    render(<GearList />);
    await waitFor(() => {
      expect(screen.getByText('登録したギアはありません。')).toBeInTheDocument();
    });
  });

  it('ギアあり: ブランドと製品名を表示', async () => {
    setupFetch([makeGear()]);
    render(<GearList />);
    await waitFor(() => {
      expect(screen.getByText('Nike')).toBeInTheDocument();
      expect(screen.getByText('テストシューズ')).toBeInTheDocument();
    });
  });

  it('カテゴリラベルを表示', async () => {
    setupFetch([makeGear({ category: 'shoes' })]);
    render(<GearList />);
    await waitFor(() => {
      expect(screen.getByText('シューズ')).toBeInTheDocument();
    });
  });

  it('usage_tag=race: レース用バッジを表示', async () => {
    setupFetch([makeGear({ usage_tag: 'race' })]);
    render(<GearList />);
    await waitFor(() => {
      expect(screen.getByText('レース用')).toBeInTheDocument();
    });
  });

  it('usage_tag=both: 兼用バッジを表示', async () => {
    setupFetch([makeGear({ usage_tag: 'both' })]);
    render(<GearList />);
    await waitFor(() => {
      expect(screen.getByText('兼用')).toBeInTheDocument();
    });
  });
});

describe('GearList — Amazonリンク', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseSession.mockReturnValue({ data: MOCK_SESSION });
  });

  it('asinがある場合: Amazonリンクを表示', async () => {
    setupFetch([makeGear({ asin: 'B0XXXXXXXX' })]);
    render(<GearList />);
    await waitFor(() => {
      const link = screen.getByText('Amazonで見る').closest('a');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', 'https://www.amazon.co.jp/dp/B0XXXXXXXX?tag=test-22');
    });
  });

  it('Amazonリンクには rel="sponsored noopener noreferrer" が付く', async () => {
    setupFetch([makeGear({ asin: 'B0XXXXXXXX' })]);
    render(<GearList />);
    await waitFor(() => {
      const link = screen.getByText('Amazonで見る').closest('a');
      expect(link).toHaveAttribute('rel', 'sponsored noopener noreferrer');
    });
  });

  it('Amazonリンクには target="_blank" が付く', async () => {
    setupFetch([makeGear({ asin: 'B0XXXXXXXX' })]);
    render(<GearList />);
    await waitFor(() => {
      const link = screen.getByText('Amazonで見る').closest('a');
      expect(link).toHaveAttribute('target', '_blank');
    });
  });

  it('asinがない場合: Amazonリンクを表示しない', async () => {
    setupFetch([makeGear({ asin: null })]);
    render(<GearList />);
    await waitFor(() => {
      expect(screen.queryByText('Amazonで見る')).not.toBeInTheDocument();
    });
  });
});

describe('GearList — 引退ギア', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseSession.mockReturnValue({ data: MOCK_SESSION });
  });

  it('引退ギアはデフォルトで非表示', async () => {
    setupFetch([
      makeGear({ id: 'gear-1', name: 'アクティブシューズ', is_retired: false }),
      makeGear({ id: 'gear-2', name: '引退シューズ', is_retired: true }),
    ]);
    render(<GearList />);
    await waitFor(() => {
      expect(screen.getByText('アクティブシューズ')).toBeInTheDocument();
      expect(screen.queryByText('引退シューズ')).not.toBeInTheDocument();
    });
  });

  it('引退ギアが存在する場合: 「引退したギアを表示」ボタンを表示', async () => {
    setupFetch([makeGear({ is_retired: true })]);
    render(<GearList />);
    await waitFor(() => {
      expect(screen.getByText('引退したギアを表示')).toBeInTheDocument();
    });
  });

  it('「引退したギアを表示」クリック後: 引退ギアが表示される', async () => {
    setupFetch([
      makeGear({ id: 'gear-1', name: 'アクティブシューズ', is_retired: false }),
      makeGear({ id: 'gear-2', name: '引退シューズ', is_retired: true }),
    ]);
    render(<GearList />);
    await waitFor(() => {
      expect(screen.getByText('引退したギアを表示')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('引退したギアを表示'));
    expect(screen.getByText('引退シューズ')).toBeInTheDocument();
    expect(screen.getByText('引退したギアを隠す')).toBeInTheDocument();
  });

  it('引退ギアがない場合: 「引退したギアを表示」ボタンを表示しない', async () => {
    setupFetch([makeGear({ is_retired: false })]);
    render(<GearList />);
    await waitFor(() => {
      expect(screen.queryByText('引退したギアを表示')).not.toBeInTheDocument();
    });
  });

  it('引退ギアには「引退」バッジを表示', async () => {
    setupFetch([makeGear({ is_retired: true })]);
    render(<GearList />);

    // まず「表示」ボタンをクリックして引退ギアを見える状態にする
    await waitFor(() => {
      expect(screen.getByText('引退したギアを表示')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('引退したギアを表示'));

    expect(screen.getByText('引退')).toBeInTheDocument();
  });
});

describe('GearList — 追加ボタン', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseSession.mockReturnValue({ data: MOCK_SESSION });
  });

  it('「ギアを追加」ボタンを表示', async () => {
    setupFetch([]);
    render(<GearList />);
    await waitFor(() => {
      expect(screen.getByText('ギアを追加')).toBeInTheDocument();
    });
  });

  it('「ギアを追加」クリック後: フォームタイトルを表示', async () => {
    setupFetch([]);
    render(<GearList />);
    await waitFor(() => {
      expect(screen.getByText('ギアを追加')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('ギアを追加'));
    expect(screen.getByText('ギアを追加', { selector: 'h3, h2, [role="heading"]' })).toBeInTheDocument();
  });
});
