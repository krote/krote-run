// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import EntrySection from '../EntrySection';
import { makeRace } from '../../../../lib/__tests__/fixtures';

describe('EntrySection', () => {
  it('コンテンツが描画される', () => {
    // id="entry" は page.tsx 側の <section> に付与されるため、EntrySection 自体は持たない
    const race = makeRace({ date: '2026-04-19' });
    const { container } = render(<EntrySection race={race} locale="ja" today="2026-01-01" />);
    expect(container.firstChild).not.toBeNull();
  });

  it('entry_closed=true のとき受付終了メッセージが表示される', () => {
    const race = makeRace({ entry_closed: true, date: '2026-04-19' });
    render(<EntrySection race={race} locale="ja" today="2026-01-01" />);
    expect(screen.getByTestId('entry-closed-msg')).toBeInTheDocument();
  });

  it('entry_closed=false のとき受付終了メッセージが表示されない', () => {
    const race = makeRace({ entry_closed: false, date: '2026-04-19' });
    const { container } = render(<EntrySection race={race} locale="ja" today="2026-01-01" />);
    expect(container.querySelector('[data-testid="entry-closed-msg"]')).toBeNull();
  });

  it('entry_periods が1件のとき期間が表示される', () => {
    const race = makeRace({
      date: '2026-04-19',
      entry_periods: [{
        id: 1, race_id: 'test', category_id: null,
        label_ja: '一般エントリー', label_en: 'General',
        start_date: '2025-09-01', end_date: '2025-11-30',
        entry_fee: null, sort_order: 0, closed_early: false,
      }],
    });
    render(<EntrySection race={race} locale="ja" today="2025-08-01" />);
    expect(screen.getByText(/2025/)).toBeInTheDocument();
  });

  it('entry_links が表示される', () => {
    const race = makeRace({
      date: '2026-04-19',
      entry_links: [{
        id: 1, race_id: 'test',
        site_name: 'RunNet', url: 'https://runnet.jp/test', sort_order: 0,
      }],
    });
    render(<EntrySection race={race} locale="ja" today="2026-01-01" />);
    const link = screen.getByText('RunNet ↗');
    expect(link).toBeInTheDocument();
    expect(link.closest('a')?.getAttribute('href')).toBe('https://runnet.jp/test');
  });

  it('entry_capacity > 0 のとき定員が表示される', () => {
    const race = makeRace({ entry_capacity: 3000, date: '2026-04-19' });
    render(<EntrySection race={race} locale="ja" today="2026-01-01" />);
    expect(screen.getByText(/3,000/)).toBeInTheDocument();
  });

  it('entry_capacity = 0 のとき定員が表示されない', () => {
    const race = makeRace({ entry_capacity: 0, date: '2026-04-19' });
    render(<EntrySection race={race} locale="ja" today="2026-01-01" />);
    expect(screen.queryByText(/人$/)).toBeNull();
  });
});

describe('EntrySection - 途中終了（closed_early）', () => {
  const period = (overrides: Record<string, unknown> = {}) => ({
    id: 1, race_id: 'test-race-2026', category_id: null, label_ja: '一般エントリー', label_en: 'General Entry',
    start_date: '2026-03-01', end_date: '2026-06-30', entry_fee: null, sort_order: 0, closed_early: false, ...overrides,
  });

  it('期間が1件で途中終了していれば「受付終了（締切前に終了）」を表示し、期間も残す', () => {
    const race = makeRace({ date: '2026-10-01', entry_periods: [period({ closed_early: true })] });
    render(<EntrySection race={race} locale="ja" today="2026-04-01" />);
    expect(screen.getByTestId('entry-period-closed-early')).toHaveTextContent('受付終了（締切前に終了）');
    expect(screen.getByText(/2026/)).toBeInTheDocument();
  });

  it('複数期間のうち途中終了した期間の行だけに表示する', () => {
    const race = makeRace({
      date: '2026-10-01',
      entry_periods: [period({ id: 1, label_ja: '先行エントリー', closed_early: true }), period({ id: 2, label_ja: '一般エントリー' })],
    });
    render(<EntrySection race={race} locale="ja" today="2026-04-01" />);
    const badges = screen.getAllByTestId('entry-period-closed-early');
    expect(badges).toHaveLength(1);
    expect(badges[0].closest('tr')).toHaveTextContent('先行エントリー');
  });

  it('en ロケールでは「Closed early」と表示する', () => {
    const race = makeRace({ date: '2026-10-01', entry_periods: [period({ closed_early: true })] });
    render(<EntrySection race={race} locale="en" today="2026-04-01" />);
    expect(screen.getByTestId('entry-period-closed-early')).toHaveTextContent('Closed early');
  });

  it('途中終了していない期間には表示しない', () => {
    const race = makeRace({ date: '2026-10-01', entry_periods: [period()] });
    render(<EntrySection race={race} locale="ja" today="2026-04-01" />);
    expect(screen.queryByTestId('entry-period-closed-early')).toBeNull();
  });
});
