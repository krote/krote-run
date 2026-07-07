'use client';

import { useState, useCallback, useEffect } from 'react';
import type { TravelSettings } from '../travel';

const STORAGE_KEY = 'hashiru_travel_settings';

function loadFromStorage(): TravelSettings | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as TravelSettings;
  } catch {
    return null;
  }
}

function saveToStorage(settings: TravelSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // ignore
  }
}

export function useTravelSettings() {
  // SSR とのハイドレーション不一致を防ぐため、初期値は null に固定し
  // マウント後に useEffect で localStorage を読む
  const [settings, setSettings] = useState<TravelSettings | null>(null);

  useEffect(() => {
    setSettings(loadFromStorage());
  }, []);

  const updateSettings = useCallback((next: TravelSettings | null) => {
    setSettings(next);
    if (next === null) {
      try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
    } else {
      saveToStorage(next);
    }
  }, []);

  return { settings, updateSettings };
}
