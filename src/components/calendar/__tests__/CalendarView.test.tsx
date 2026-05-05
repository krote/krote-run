// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CalendarView from '../CalendarView';
import { makeRace } from '../../../lib/__tests__/fixtures';

vi.mock('@/i18n/navigation', () => ({
  Link: ({ href, children, ...props }: { href: string; children: React.ReactNode; className?: string }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

const REGIONS = ['北海道', '東北', '関東', '中部', '近畿', '中国', '四国', '九州・沖縄'];
const PREF_TO_REGION: Record<string, string> = {
  '13': '関東',
  '27': '近畿',
  '01': '北海道',
};

describe('CalendarView', () => {
  it('初期状態でMonthGridが表示される', () => {
    const { container } = render(
      <CalendarView
        races={[]}
        year={2026}
        month={3}
        locale="ja"
        today="2026-04-05"
        regions={REGIONS}
        prefToRegion={PREF_TO_REGION}
      />
    );
    // MonthGrid はグリッドを持つ
    expect(container.querySelector('.grid-cols-7')).not.toBeNull();
  });

  it('年間ビューボタンでYearTimelineに切り替わる', () => {
    const { container } = render(
      <CalendarView
        races={[]}
        year={2026}
        month={3}
        locale="ja"
        today="2026-04-05"
        regions={REGIONS}
        prefToRegion={PREF_TO_REGION}
      />
    );
    fireEvent.click(screen.getByText('年間'));
    expect(container.querySelector('svg')).not.toBeNull();
    expect(container.querySelector('.grid-cols-7')).toBeNull();
  });

  it('月表示ボタンでMonthGridに戻る', () => {
    const { container } = render(
      <CalendarView
        races={[]}
        year={2026}
        month={3}
        locale="ja"
        today="2026-04-05"
        regions={REGIONS}
        prefToRegion={PREF_TO_REGION}
      />
    );
    fireEvent.click(screen.getByText('年間'));
    fireEvent.click(screen.getByText('月'));
    expect(container.querySelector('.grid-cols-7')).not.toBeNull();
  });

  it('REGIONフィルターで対象外の大会が非表示になる', () => {
    const race1 = makeRace({ name_ja: '東京マラソン', date: '2026-04-19', prefecture: '13' }); // 関東
    const race2 = makeRace({ id: 'osaka-2026', name_ja: '大阪マラソン', date: '2026-04-26', prefecture: '27' }); // 近畿
    render(
      <CalendarView
        races={[race1, race2]}
        year={2026}
        month={3}
        locale="ja"
        today="2026-04-05"
        regions={REGIONS}
        prefToRegion={PREF_TO_REGION}
      />
    );
    // 関東フィルターをクリック
    fireEvent.click(screen.getByText('関東'));
    expect(screen.getByText('東京マラソン')).toBeInTheDocument();
    expect(screen.queryByText('大阪マラソン')).toBeNull();
  });

  it('ControlBar が描画される', () => {
    render(
      <CalendarView
        races={[]}
        year={2026}
        month={3}
        locale="ja"
        today="2026-04-05"
        regions={REGIONS}
        prefToRegion={PREF_TO_REGION}
      />
    );
    expect(screen.getByText('受付中')).toBeInTheDocument();
  });
});
