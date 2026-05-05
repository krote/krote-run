// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ControlBar from '../ControlBar';

const REGIONS = ['北海道', '東北', '関東', '中部', '近畿', '中国', '四国', '九州・沖縄'];

describe('ControlBar', () => {
  it('STATUSボタンが描画される', () => {
    render(<ControlBar status="all" region="all" onStatusChange={() => {}} onRegionChange={() => {}} regions={REGIONS} locale="ja" />);
    expect(screen.getAllByText('すべて')).toHaveLength(2); // STATUS と REGION の両方
    expect(screen.getByText('受付中')).toBeInTheDocument();
    expect(screen.getByText('まもなく')).toBeInTheDocument();
    expect(screen.getByText('終了')).toBeInTheDocument();
  });

  it('REGIONボタンが描画される', () => {
    render(<ControlBar status="all" region="all" onStatusChange={() => {}} onRegionChange={() => {}} regions={REGIONS} locale="ja" />);
    expect(screen.getByText('北海道')).toBeInTheDocument();
    expect(screen.getByText('関東')).toBeInTheDocument();
    expect(screen.getByText('九州・沖縄')).toBeInTheDocument();
  });

  it('STATUSをクリックすると onStatusChange が呼ばれる', () => {
    const onStatusChange = vi.fn();
    render(<ControlBar status="all" region="all" onStatusChange={onStatusChange} onRegionChange={() => {}} regions={REGIONS} locale="ja" />);
    fireEvent.click(screen.getByText('受付中'));
    expect(onStatusChange).toHaveBeenCalledWith('open');
  });

  it('REGIONをクリックすると onRegionChange が呼ばれる', () => {
    const onRegionChange = vi.fn();
    render(<ControlBar status="all" region="all" onStatusChange={() => {}} onRegionChange={onRegionChange} regions={REGIONS} locale="ja" />);
    fireEvent.click(screen.getByText('関東'));
    expect(onRegionChange).toHaveBeenCalledWith('関東');
  });

  it('active な STATUS ボタンが強調スタイルを持つ', () => {
    const { container } = render(<ControlBar status="open" region="all" onStatusChange={() => {}} onRegionChange={() => {}} regions={REGIONS} locale="ja" />);
    const activeBtn = container.querySelector('[data-active="true"]');
    expect(activeBtn?.textContent).toBe('受付中');
  });

  it('en ロケールで英語ラベルが表示される', () => {
    render(<ControlBar status="all" region="all" onStatusChange={() => {}} onRegionChange={() => {}} regions={REGIONS} locale="en" />);
    expect(screen.getAllByText('All')).toHaveLength(2); // STATUS と REGION の両方
    expect(screen.getByText('Open')).toBeInTheDocument();
    expect(screen.getByText('Coming Soon')).toBeInTheDocument();
    expect(screen.getByText('Closed')).toBeInTheDocument();
  });
});
