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
      <YearTimeline races={[]} year={2026} locale="ja" today="2026-04-05" />
    );
    expect(container.querySelector('svg')).not.toBeNull();
  });

  it('12ヶ月の月ラベルが描画される', () => {
    render(<YearTimeline races={[]} year={2026} locale="ja" today="2026-04-05" />);
    // 月ラベルが存在する（1月〜12月）
    expect(screen.getByText('1月')).toBeInTheDocument();
    expect(screen.getByText('12月')).toBeInTheDocument();
  });

  it('en ロケールで月ラベルが英語になる', () => {
    render(<YearTimeline races={[]} year={2026} locale="en" today="2026-04-05" />);
    expect(screen.getByText('Jan')).toBeInTheDocument();
    expect(screen.getByText('Dec')).toBeInTheDocument();
  });

  it('大会名が表示される', () => {
    const race = makeRace({ name_ja: '長野マラソン2026', date: '2026-04-19' });
    render(<YearTimeline races={[race]} year={2026} locale="ja" today="2026-04-05" />);
    expect(screen.getByText('長野マラソン2026')).toBeInTheDocument();
  });

  it('対象年以外の大会は表示されない', () => {
    const race = makeRace({ name_ja: '東京2025', date: '2025-03-15' });
    render(<YearTimeline races={[race]} year={2026} locale="ja" today="2026-04-05" />);
    expect(screen.queryByText('東京2025')).toBeNull();
  });

  it('races が空でもクラッシュしない', () => {
    expect(() =>
      render(<YearTimeline races={[]} year={2026} locale="ja" today="2026-04-05" />)
    ).not.toThrow();
  });
});
