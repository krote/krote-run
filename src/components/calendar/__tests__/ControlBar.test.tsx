// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ControlBar from '../ControlBar';

const REGIONS = ['北海道', '東北', '関東', '中部', '近畿', '中国', '四国', '九州・沖縄'];

const defaultProps = {
  status: 'all' as const,
  region: 'all',
  distance: 'all' as const,
  onStatusChange: () => {},
  onRegionChange: () => {},
  onDistanceChange: () => {},
  regions: REGIONS,
  locale: 'ja',
};

describe('ControlBar', () => {
  it('STATUSボタンが描画される', () => {
    render(<ControlBar {...defaultProps} />);
    expect(screen.getAllByText('すべて')).toHaveLength(3); // STATUS・REGION・DISTANCE の3行
    expect(screen.getByText('受付中')).toBeInTheDocument();
    expect(screen.getByText('まもなく')).toBeInTheDocument();
    expect(screen.getByText('終了')).toBeInTheDocument();
  });

  it('REGIONボタンが描画される', () => {
    render(<ControlBar {...defaultProps} />);
    expect(screen.getByText('北海道')).toBeInTheDocument();
    expect(screen.getByText('関東')).toBeInTheDocument();
    expect(screen.getByText('九州・沖縄')).toBeInTheDocument();
  });

  it('DISTANCEボタンが描画される', () => {
    render(<ControlBar {...defaultProps} />);
    expect(screen.getByText('フル')).toBeInTheDocument();
    expect(screen.getByText('ハーフ')).toBeInTheDocument();
    expect(screen.getByText('ウルトラ')).toBeInTheDocument();
  });

  it('STATUSをクリックすると onStatusChange が呼ばれる', () => {
    const onStatusChange = vi.fn();
    render(<ControlBar {...defaultProps} onStatusChange={onStatusChange} />);
    fireEvent.click(screen.getByText('受付中'));
    expect(onStatusChange).toHaveBeenCalledWith('open');
  });

  it('REGIONをクリックすると onRegionChange が呼ばれる', () => {
    const onRegionChange = vi.fn();
    render(<ControlBar {...defaultProps} onRegionChange={onRegionChange} />);
    fireEvent.click(screen.getByText('関東'));
    expect(onRegionChange).toHaveBeenCalledWith('関東');
  });

  it('DISTANCEをクリックすると onDistanceChange が呼ばれる', () => {
    const onDistanceChange = vi.fn();
    render(<ControlBar {...defaultProps} onDistanceChange={onDistanceChange} />);
    fireEvent.click(screen.getByText('フル'));
    expect(onDistanceChange).toHaveBeenCalledWith('full');
  });

  it('active な STATUS ボタンが強調スタイルを持つ', () => {
    const { container } = render(<ControlBar {...defaultProps} status="open" />);
    const activeBtn = container.querySelector('[data-active="true"]');
    expect(activeBtn?.textContent).toBe('受付中');
  });

  it('en ロケールで英語ラベルが表示される', () => {
    render(<ControlBar {...defaultProps} locale="en" />);
    expect(screen.getAllByText('All')).toHaveLength(3); // STATUS・REGION・DISTANCE の3行
    expect(screen.getByText('Open')).toBeInTheDocument();
    expect(screen.getByText('Coming Soon')).toBeInTheDocument();
    expect(screen.getByText('Closed')).toBeInTheDocument();
    expect(screen.getByText('Full')).toBeInTheDocument();
    expect(screen.getByText('Half')).toBeInTheDocument();
  });
});
