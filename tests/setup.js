import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => cleanup());

// jsdom não tem IntersectionObserver (usado pelo efeito de revelar seções)
globalThis.IntersectionObserver ??= class {
  observe() {}
  disconnect() {}
  unobserve() {}
};
