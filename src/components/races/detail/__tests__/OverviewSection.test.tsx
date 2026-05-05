// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import OverviewSection from '../OverviewSection';
import { makeRace } from '../../../../lib/__tests__/fixtures';

describe('OverviewSection', () => {
  it('ja ロケールで description_ja が表示される', () => {
    const race = makeRace({ description_ja: '桜並木を走る春の大会。', date: '2026-04-19' });
    render(<OverviewSection race={race} locale="ja" />);
    expect(screen.getByText('桜並木を走る春の大会。')).toBeInTheDocument();
  });

  it('en ロケールで description_en が表示される', () => {
    const race = makeRace({ description_en: 'A spring race along cherry blossoms.', date: '2026-04-19' });
    render(<OverviewSection race={race} locale="en" />);
    expect(screen.getByText('A spring race along cherry blossoms.')).toBeInTheDocument();
  });

  it('description_en が null のとき description_ja にフォールバック', () => {
    const race = makeRace({ description_ja: '日本語説明', description_en: null, date: '2026-04-19' });
    render(<OverviewSection race={race} locale="en" />);
    expect(screen.getByText('日本語説明')).toBeInTheDocument();
  });

  it('description_ja が空文字のとき何も描画しない', () => {
    const race = makeRace({ description_ja: '', description_en: '', date: '2026-04-19' });
    const { container } = render(<OverviewSection race={race} locale="ja" />);
    expect(container.querySelector('section')).toBeNull();
  });

  it('セクションに id="overview" が付く', () => {
    const race = makeRace({ description_ja: 'テスト', date: '2026-04-19' });
    const { container } = render(<OverviewSection race={race} locale="ja" />);
    expect(container.querySelector('#overview')).not.toBeNull();
  });

  it('tags が表示される', () => {
    const race = makeRace({ tags: ['ファミリー', '公認コース'], date: '2026-04-19' });
    render(<OverviewSection race={race} locale="ja" />);
    expect(screen.getByText('ファミリー')).toBeInTheDocument();
    expect(screen.getByText('公認コース')).toBeInTheDocument();
  });
});
