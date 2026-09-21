// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';

const { mockPathname } = vi.hoisted(() => ({ mockPathname: vi.fn<() => string>() }));

vi.mock('next/navigation', () => ({
  usePathname: () => mockPathname(),
}));

import PageViewTracker from '../PageViewTracker';

const mockGtag = vi.fn();

beforeEach(() => {
  window.gtag = mockGtag;
  mockGtag.mockClear();
  mockPathname.mockReturnValue('/ja');
  window.history.replaceState({}, '', '/ja');
  document.title = 'HASHIRU';
});

/** 送信された page_view イベントだけを取り出す */
function pageViews() {
  return mockGtag.mock.calls.filter(([type, name]) => type === 'event' && name === 'page_view');
}

describe('PageViewTracker', () => {
  it('着地ページでは送らない（gtag の config が送るため二重計上になる）', () => {
    render(<PageViewTracker />);

    expect(pageViews()).toHaveLength(0);
  });

  it('クライアントサイド遷移で送る（App Router では config が再実行されないため）', () => {
    const { rerender } = render(<PageViewTracker />);

    mockPathname.mockReturnValue('/ja/news');
    window.history.replaceState({}, '', '/ja/news');
    rerender(<PageViewTracker />);

    expect(pageViews()).toHaveLength(1);
  });

  it('遷移先のURLとタイトルを添えて送る', () => {
    const { rerender } = render(<PageViewTracker />);

    mockPathname.mockReturnValue('/ja/news');
    window.history.replaceState({}, '', '/ja/news');
    document.title = 'お知らせ | HASHIRU';
    rerender(<PageViewTracker />);

    expect(pageViews()[0][2]).toMatchObject({
      page_location: expect.stringContaining('/ja/news'),
      page_title: 'お知らせ | HASHIRU',
    });
  });

  it('遷移するたびに送る', () => {
    const { rerender } = render(<PageViewTracker />);

    for (const p of ['/ja/news', '/ja/guide', '/ja/about']) {
      mockPathname.mockReturnValue(p);
      rerender(<PageViewTracker />);
    }

    expect(pageViews()).toHaveLength(3);
  });

  it('同じパスでの再レンダリングでは重複送信しない', () => {
    const { rerender } = render(<PageViewTracker />);

    mockPathname.mockReturnValue('/ja/news');
    rerender(<PageViewTracker />);
    rerender(<PageViewTracker />);
    rerender(<PageViewTracker />);

    expect(pageViews()).toHaveLength(1);
  });

  it('gtag が未定義でも落ちない（同意前にスクリプトが未ロードの場合）', () => {
    delete window.gtag;

    expect(() => render(<PageViewTracker />)).not.toThrow();
  });

  it('DOMには何も描画しない', () => {
    const { container } = render(<PageViewTracker />);

    expect(container).toBeEmptyDOMElement();
  });
});
