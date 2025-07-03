import { Matchers, AsymmetricMatchers } from 'bun:test';
import { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';
import '@testing-library/jest-dom';

declare module 'bun:test' {
  interface Matchers<T>
    extends TestingLibraryMatchers<typeof expect.stringContaining, T> { }
  interface AsymmetricMatchers extends TestingLibraryMatchers<any, any> { }
}
