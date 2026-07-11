import '@testing-library/jest-dom';

// window.open stub（jsdom 環境で "Not implemented" 警告を抑制）
if (typeof window !== 'undefined') {
  window.open = () => null;
}
