// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import DayTripBadge from '../DayTripBadge';
import type { DayTripStatus } from '../../../lib/travel';

describe('DayTripBadge', () => {
  it('status が null なら何も表示しない', () => {
    const { container } = render(<DayTripBadge status={null} locale="ja" />);
    expect(container).toBeEmptyDOMElement();
  });

  it('overnight_required（前日受付のみ）は「前泊必須」を表示する', () => {
    const status: DayTripStatus = { status: 'overnight_required', reason: 'pre_day_only' };
    render(<DayTripBadge status={status} locale="ja" />);
    expect(screen.getByText('前泊必須')).toBeInTheDocument();
  });

  it('overnight_recommended は「前泊推奨」と必要出発時刻を表示する', () => {
    const status: DayTripStatus = { status: 'overnight_recommended', reason: 'travel_time', departureNeeded: '04:30' };
    render(<DayTripBadge status={status} locale="ja" />);
    expect(screen.getByText(/前泊推奨/)).toBeInTheDocument();
    expect(screen.getByText(/04:30/)).toBeInTheDocument();
  });

  it('day_trip は「日帰り可」と出発時刻を表示する', () => {
    const status: DayTripStatus = { status: 'day_trip', departureNeeded: '07:30' };
    render(<DayTripBadge status={status} locale="ja" />);
    expect(screen.getByText(/日帰り可/)).toBeInTheDocument();
    expect(screen.getByText(/07:30/)).toBeInTheDocument();
  });

  it('unknown/no_start_time は何も表示しない（判定不能のため）', () => {
    const status: DayTripStatus = { status: 'unknown', reason: 'no_start_time' };
    const { container } = render(<DayTripBadge status={status} locale="ja" />);
    expect(container).toBeEmptyDOMElement();
  });

  it('unknown/no_travel_time は「移動時間不明」を表示する', () => {
    const status: DayTripStatus = { status: 'unknown', reason: 'no_travel_time' };
    render(<DayTripBadge status={status} locale="ja" />);
    expect(screen.getByText('移動時間不明')).toBeInTheDocument();
  });

  it('en ロケールでは英語表記になる', () => {
    const status: DayTripStatus = { status: 'overnight_required', reason: 'pre_day_only' };
    render(<DayTripBadge status={status} locale="en" />);
    expect(screen.getByText('Overnight Required')).toBeInTheDocument();
  });
});
