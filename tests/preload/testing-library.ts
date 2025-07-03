import { beforeEach, afterEach, expect, jest, mock } from 'bun:test';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import '@testing-library/jest-dom';

expect.extend(matchers);

beforeEach(async () => {
  mock.restore();
});

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});



