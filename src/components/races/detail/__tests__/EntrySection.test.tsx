// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import EntrySection from '../EntrySection';
import { makeRace } from '../../../../lib/__tests__/fixtures';

describe('EntrySection', () => {
  it('セクションに id="entry" が付く', () => {
    const race = makeRace({ date: '2026-04-19' });
    const { container } = render(<EntrySection race={race} locale="ja" today="2026-01-01" />);
    expect(container.querySelector('#entry')).not.toBeNull();
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
        entry_fee: null, sort_order: 0,
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
