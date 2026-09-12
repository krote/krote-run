// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useTravelSettings } from '../useTravelSettings';
import type { TravelSettings } from '../../travel';

const STORAGE_KEY = 'hashiru_travel_settings';

beforeEach(() => {
  localStorage.clear();
});

describe('useTravelSettings - 初期状態', () => {
  it('localStorage が空なら settings は null', async () => {
    const { result } = renderHook(() => useTravelSettings());
    await waitFor(() => expect(result.current.settings).toBeNull());
  });

  it('localStorage に保存済みの設定があれば読み込まれる', async () => {
    const stored: TravelSettings = {
      hubId: 'osaka',
      nearestStation: '大阪駅',
      offsetMinutes: 15,
      firstTrainTime: '05:30',
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));

    const { result } = renderHook(() => useTravelSettings());
    await waitFor(() => expect(result.current.settings).toEqual(stored));
  });

  it('壊れたJSONの場合は null にフォールバックする', async () => {
    localStorage.setItem(STORAGE_KEY, '{invalid json');
    const { result } = renderHook(() => useTravelSettings());
    await waitFor(() => expect(result.current.settings).toBeNull());
  });
});

describe('useTravelSettings - updateSettings', () => {
  it('設定を更新すると localStorage に保存される', async () => {
    const { result } = renderHook(() => useTravelSettings());
    await waitFor(() => expect(result.current.settings).toBeNull());

    const next: TravelSettings = {
      hubId: 'tokyo',
      nearestStation: '東京駅',
      offsetMinutes: 10,
      firstTrainTime: '05:00',
    };
    act(() => result.current.updateSettings(next));

    expect(result.current.settings).toEqual(next);
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)).toEqual(next);
  });

  it('null を渡すと localStorage から削除される', async () => {
    const stored: TravelSettings = {
      hubId: 'tokyo',
      nearestStation: '東京駅',
      offsetMinutes: 10,
      firstTrainTime: '05:00',
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));

    const { result } = renderHook(() => useTravelSettings());
    await waitFor(() => expect(result.current.settings).toEqual(stored));

    act(() => result.current.updateSettings(null));

    expect(result.current.settings).toBeNull();
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });
});
