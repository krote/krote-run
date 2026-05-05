// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import MonthGrid from '../MonthGrid';
import { makeRace } from '../../../lib/__tests__/fixtures';

// Link コンポーネントのモック
vi.mock('@/i18n/navigation', () => ({
  Link: ({ href, children, ...props }: { href: string; children: React.ReactNode; className?: string }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

const TODAY = '2026-04-05';

describe('MonthGrid', () => {
  it('7列のグリッドが描画される', () => {
    const { container } = render(
      <MonthGrid races={[]} year={2026} month={3} locale="ja" today={TODAY} onHover={() => {}} />
    );
    const header = container.querySelector('.grid-cols-7');
    expect(header).not.toBeNull();
  });

  it('当月の日数分のセルが描画される（4月 = 30日）', () => {
    const { container } = render(
      <MonthGrid races={[]} year={2026} month={3} locale="ja" today={TODAY} onHover={() => {}} />
    );
    // 日付セルを数える（data-date 属性で識別）
    const dayCells = container.querySelectorAll('[data-date]');
    expect(dayCells).toHaveLength(30);
  });

  it('開催日のある大会名が表示される', () => {
    const race = makeRace({ name_ja: '長野マラソン2026', date: '2026-04-19' });
    render(
      <MonthGrid races={[race]} year={2026} month={3} locale="ja" today={TODAY} onHover={() => {}} />
    );
    expect(screen.getByText('長野マラソン2026')).toBeInTheDocument();
  });

  it('en ロケールで name_en が表示される', () => {
    const race = makeRace({ name_en: 'Nagano Marathon 2026', date: '2026-04-19' });
    render(
      <MonthGrid races={[race]} year={2026} month={3} locale="en" today={TODAY} onHover={() => {}} />
    );
    expect(screen.getByText('Nagano Marathon 2026')).toBeInTheDocument();
  });

  it('今日のセルに data-today 属性が付く', () => {
    const { container } = render(
      <MonthGrid races={[]} year={2026} month={3} locale="ja" today="2026-04-05" onHover={() => {}} />
    );
    expect(container.querySelector('[data-today="true"]')).not.toBeNull();
  });

  it('異なる月の大会は表示されない', () => {
    const race = makeRace({ name_ja: '東京マラソン2026', date: '2026-03-15' }); // 3月
    render(
      <MonthGrid races={[race]} year={2026} month={3} locale="ja" today={TODAY} onHover={() => {}} /> // 4月
    );
    expect(screen.queryByText('東京マラソン2026')).toBeNull();
  });
});
