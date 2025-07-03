import { describe, expect, test } from "bun:test";
import { add } from "../src/utils/add";

describe("add", () => {
  test("Simple case, addition of two numbers", () => {
    const result = add(5, 10);
    expect(result).toBe(15);
  });

  test("return error if result is negative", () => {
    expect(() => add(-5, -10)).toThrow("chech!");
  });

  test("handle zero values", () => {
    expect(add(0, 0)).toBe(0);
    expect(add(5, 0)).toBe(5);
    expect(add(0, 5)).toBe(5);
  });

  test("handle positive numbers", () => {
    expect(add(1, 1)).toBe(2);
    expect(add(100, 200)).toBe(300);
  });
});


