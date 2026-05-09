// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AnchorBar from '../AnchorBar';

const items = [
  { id: 'overview', label: '概要' },
  { id: 'course', label: 'コース' },
  { id: 'entry', label: 'エントリー' },
];

describe('AnchorBar', () => {
  it('アイテムがアンカーリンクとして描画される', () => {
    render(<AnchorBar items={items} />);
    expect(screen.getByText('概要')).toBeInTheDocument();
    expect(screen.getByText('コース')).toBeInTheDocument();
    expect(screen.getByText('エントリー')).toBeInTheDocument();
  });

  it('各リンクの href が #id 形式になっている', () => {
    const { container } = render(<AnchorBar items={items} />);
    const links = container.querySelectorAll('a');
    expect(links[0].getAttribute('href')).toBe('#overview');
    expect(links[1].getAttribute('href')).toBe('#course');
    expect(links[2].getAttribute('href')).toBe('#entry');
  });

  it('アイテムが空のとき何も描画しない', () => {
    const { container } = render(<AnchorBar items={[]} />);
    expect(container.querySelector('nav')).toBeNull();
  });

  it('nav 要素が sticky で描画される', () => {
    const { container } = render(<AnchorBar items={items} />);
    const nav = container.querySelector('nav');
    expect(nav).not.toBeNull();
    expect(nav?.className).toMatch(/sticky/);
  });

  it('activeId に一致するリンクが active スタイルを持つ', () => {
    const { container } = render(<AnchorBar items={items} activeId="course" />);
    const links = container.querySelectorAll('a');
    expect(links[1].getAttribute('data-active')).toBe('true');
    expect(links[0].getAttribute('data-active')).not.toBe('true');
  });
});
