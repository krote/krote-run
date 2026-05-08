// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import YearTimeline from '../YearTimeline';
import { makeRace } from '../../../lib/__tests__/fixtures';

vi.mock('@/i18n/navigation', () => ({
  Link: ({ href, children, ...props }: { href: string; children: React.ReactNode; className?: string }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

describe('YearTimeline', () => {
  it('SVGが描画される', () => {
    const { container } = render(
      <YearTimeline races={[]} year={2026} month={3} locale="ja" today="2026-04-05" />
    );
    expect(container.querySelector('svg')).not.toBeNull();
  });

  it('12ヶ月のスロットが描画される（month=2 → 1月〜12月が表示される）', () => {
    // month=2 (March): windowStart = absMonth(2026,2)-2 = Jan 2026, windowEnd = Dec 2026
    render(<YearTimeline races={[]} year={2026} month={2} locale="ja" today="2026-03-01" />);
    expect(screen.getByText('1月')).toBeInTheDocument();
    expect(screen.getByText('12月')).toBeInTheDocument();
  });

  it('en ロケールで月ラベルが英語になる', () => {
    // month=2: window Jan-Dec 2026
    render(<YearTimeline races={[]} year={2026} month={2} locale="en" today="2026-03-01" />);
    expect(screen.getByText('Jan')).toBeInTheDocument();
    expect(screen.getByText('Dec')).toBeInTheDocument();
  });

  it('ウィンドウ開始が選択月-2であること（month=4 → 3月から始まる）', () => {
    // month=4 (May): windowStart = absMonth(2026,4)-2 = March 2026
    render(<YearTimeline races={[]} year={2026} month={4} locale="ja" today="2026-05-01" />);
    expect(screen.getByText('3月')).toBeInTheDocument();
  });

  it('年またぎウィンドウで翌年の月が表示される（month=11 → 2027年の月が含まれる）', () => {
    // month=11 (Dec): windowStart = Oct 2026, windowEnd = Sep 2027
    render(<YearTimeline races={[]} year={2026} month={11} locale="ja" today="2026-12-01" />);
    expect(screen.getByText('10月')).toBeInTheDocument();
    // 2027年の月も表示されるはず
    expect(screen.getByText('2027')).toBeInTheDocument();
  });

  it('大会名が表示される（ウィンドウ内）', () => {
    // month=3 (April): window Feb 2026 - Jan 2027
    const race = makeRace({ name_ja: '長野マラソン2026', date: '2026-04-19' });
    render(<YearTimeline races={[race]} year={2026} month={3} locale="ja" today="2026-04-05" />);
    expect(screen.getByText('長野マラソン2026')).toBeInTheDocument();
  });

  it('ウィンドウ外の大会は表示されない', () => {
    // month=3 (April): window Feb 2026 - Jan 2027 → 2025年3月は対象外
    const race = makeRace({ name_ja: '東京2025', date: '2025-03-15' });
    render(<YearTimeline races={[race]} year={2026} month={3} locale="ja" today="2026-04-05" />);
    expect(screen.queryByText('東京2025')).toBeNull();
  });

  it('races が空でもクラッシュしない', () => {
    expect(() =>
      render(<YearTimeline races={[]} year={2026} month={3} locale="ja" today="2026-04-05" />)
    ).not.toThrow();
  });
});
