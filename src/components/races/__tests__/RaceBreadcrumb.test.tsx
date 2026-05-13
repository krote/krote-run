// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RaceBreadcrumb from '../RaceBreadcrumb';

// ─── モック ──────────────────────────────────────────────────────────────────
const mockBack = vi.fn();

vi.mock('@/i18n/navigation', () => ({
  useRouter: () => ({ back: mockBack }),
  Link: ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: React.MouseEventHandler }) => (
    <a href={href} onClick={onClick}>{children}</a>
  ),
}));

// ─── テストデータ ──────────────────────────────────────────────────────────────
const LABELS = {
  home: 'ホーム',
  races: '大会一覧',
  calendar: 'カレンダー',
};

const user = userEvent.setup({ delay: null });

// ─── テスト ──────────────────────────────────────────────────────────────────
describe('RaceBreadcrumb — from が null/undefined の場合', () => {
  beforeEach(() => vi.clearAllMocks());

  it('2段構成（ホーム › レース名）で描画される', () => {
    render(<RaceBreadcrumb raceName="東京マラソン2026" from={null} labels={LABELS} />);

    expect(screen.getByText('ホーム')).toBeInTheDocument();
    expect(screen.getByText('東京マラソン2026')).toBeInTheDocument();
  });

  it('中間リンクは表示されない', () => {
    render(<RaceBreadcrumb raceName="東京マラソン2026" from={null} labels={LABELS} />);

    expect(screen.queryByText('大会一覧')).not.toBeInTheDocument();
    expect(screen.queryByText('カレンダー')).not.toBeInTheDocument();
  });

  it('from を省略した場合も中間リンクが表示されない', () => {
    render(<RaceBreadcrumb raceName="東京マラソン2026" labels={LABELS} />);

    expect(screen.queryByText('大会一覧')).not.toBeInTheDocument();
  });
});

describe('RaceBreadcrumb — from="races" の場合', () => {
  beforeEach(() => vi.clearAllMocks());

  it('3段構成（ホーム › 大会一覧 › レース名）で描画される', () => {
    render(<RaceBreadcrumb raceName="東京マラソン2026" from="races" labels={LABELS} />);

    expect(screen.getByText('ホーム')).toBeInTheDocument();
    expect(screen.getByText('大会一覧')).toBeInTheDocument();
    expect(screen.getByText('東京マラソン2026')).toBeInTheDocument();
  });

  it('中間リンクの href が /races である', () => {
    render(<RaceBreadcrumb raceName="東京マラソン2026" from="races" labels={LABELS} />);

    const link = screen.getByText('大会一覧').closest('a');
    expect(link).toHaveAttribute('href', '/races');
  });

  it('中間リンクをクリックすると router.back() が呼ばれる', async () => {
    render(<RaceBreadcrumb raceName="東京マラソン2026" from="races" labels={LABELS} />);

    await user.click(screen.getByText('大会一覧'));
    expect(mockBack).toHaveBeenCalledOnce();
  });
});

describe('RaceBreadcrumb — from="calendar" の場合', () => {
  beforeEach(() => vi.clearAllMocks());

  it('3段構成（ホーム › カレンダー › レース名）で描画される', () => {
    render(<RaceBreadcrumb raceName="東京マラソン2026" from="calendar" labels={LABELS} />);

    expect(screen.getByText('ホーム')).toBeInTheDocument();
    expect(screen.getByText('カレンダー')).toBeInTheDocument();
    expect(screen.getByText('東京マラソン2026')).toBeInTheDocument();
  });

  it('中間リンクの href が /calendar である', () => {
    render(<RaceBreadcrumb raceName="東京マラソン2026" from="calendar" labels={LABELS} />);

    const link = screen.getByText('カレンダー').closest('a');
    expect(link).toHaveAttribute('href', '/calendar');
  });
});

describe('RaceBreadcrumb — その他', () => {
  beforeEach(() => vi.clearAllMocks());

  it('raceName が最終要素として表示される', () => {
    render(<RaceBreadcrumb raceName="筑波マラソン2026" from={null} labels={LABELS} />);

    expect(screen.getByText('筑波マラソン2026')).toBeInTheDocument();
  });

  it('labels.home / labels.races / labels.calendar の文字列が使われる', () => {
    const customLabels = { home: 'TOP', races: 'Race List', calendar: 'Calendar' };
    render(<RaceBreadcrumb raceName="Test Race" from="races" labels={customLabels} />);

    expect(screen.getByText('TOP')).toBeInTheDocument();
    expect(screen.getByText('Race List')).toBeInTheDocument();
  });

  it('nav に aria-label="breadcrumb" が付与されている', () => {
    render(<RaceBreadcrumb raceName="東京マラソン2026" from={null} labels={LABELS} />);

    expect(screen.getByRole('navigation', { name: 'breadcrumb' })).toBeInTheDocument();
  });
});
