import { describe, expect, test } from "bun:test";
import { noCover } from "../src/utils/no-cover";

describe("noCover", () => {
  test("yes", () => {
    const result = noCover(true, false, true);
    expect(result).toBe("yes");
  });

  test("maybe", () => {
    const result = noCover(false, true, false);
    expect(result).toBe("maybe");
  });

  test("no", () => {
    const result = noCover(false, false, true);
    expect(result).toBe("no");
  });

  test('if maybe is true, and, yes is true, and no is true, return "hi norman guy"', () => {
    const result = noCover(true, true, true);
    expect(result).toBe("hi norman guy");
  });

  test('if no is true, yes is false and maybe is true, return "cat"', () => {
    const result = noCover(false, true, true);
    expect(result).toBe("cat");
  })
});
