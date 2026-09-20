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
  it('初回表示でページビューを1件送る', () => {
    render(<PageViewTracker />);

    expect(pageViews()).toHaveLength(1);
  });

  it('現在のURLとタイトルを添えて送る', () => {
    document.title = 'テストページ | HASHIRU';

    render(<PageViewTracker />);

    expect(pageViews()[0][2]).toMatchObject({
      page_location: window.location.href,
      page_title: 'テストページ | HASHIRU',
    });
  });

  it('クライアントサイド遷移のたびに送る（App Router では自動送信されないため）', () => {
    const { rerender } = render(<PageViewTracker />);
    expect(pageViews()).toHaveLength(1);

    mockPathname.mockReturnValue('/ja/news');
    window.history.replaceState({}, '', '/ja/news');
    rerender(<PageViewTracker />);

    expect(pageViews()).toHaveLength(2);
    expect(pageViews()[1][2]).toMatchObject({ page_location: expect.stringContaining('/ja/news') });
  });

  it('同じパスでの再レンダリングでは重複送信しない', () => {
    const { rerender } = render(<PageViewTracker />);

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
