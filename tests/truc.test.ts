import { describe, expect, test } from "bun:test";
import { truc } from "../src/utils/truc";

describe("truc", () => {
  test("additionne deux nombres", () => {
    expect(truc(1, 2)).toBe(3);
    expect(truc(0, 0)).toBe(0);
    expect(truc(-1, 1)).toBe(0);
  });
}); 