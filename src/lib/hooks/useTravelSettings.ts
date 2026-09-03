'use client';

import { useCallback, useSyncExternalStore } from 'react';
import type { TravelSettings } from '../travel';

const STORAGE_KEY = 'hashiru_travel_settings';

const listeners = new Set<() => void>();

function notifyListeners(): void {
  listeners.forEach((listener) => listener());
}

function subscribe(onStoreChange: () => void): () => void {
  listeners.add(onStoreChange);

  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) onStoreChange();
  };
  window.addEventListener('storage', onStorage);

  return () => {
    listeners.delete(onStoreChange);
    window.removeEventListener('storage', onStorage);
  };
}

// getSnapshot は同一入力に対して同じ参照を返す必要がある（useSyncExternalStore の要件）。
// localStorage の生文字列が変わっていなければキャッシュ済みのパース結果をそのまま返す。
let cachedRaw: string | null | undefined;
let cachedValue: TravelSettings | null = null;

function getSnapshot(): TravelSettings | null {
  let raw: string | null;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
  } catch {
    raw = null;
  }

  if (raw === cachedRaw) return cachedValue;
  cachedRaw = raw;
  try {
    cachedValue = raw ? (JSON.parse(raw) as TravelSettings) : null;
  } catch {
    cachedValue = null;
  }
  return cachedValue;
}

// SSR 時点では localStorage が無いため常に null（未設定）を返す。
// ハイドレーション後は getSnapshot がクライアントの実際の値を返す。
function getServerSnapshot(): TravelSettings | null {
  return null;
}

function saveToStorage(settings: TravelSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // ignore
  }
}

export function useTravelSettings() {
  const settings = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const updateSettings = useCallback((next: TravelSettings | null) => {
    if (next === null) {
      try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
    } else {
      saveToStorage(next);
    }
    notifyListeners();
  }, []);

  return { settings, updateSettings };
}
