import { describe, expect, it } from "bun:test";
import { fmtNum } from "./fmtNum";

describe("fmtNum", () => {
  it("adds leading zero for numbers less than 10", () => {
    expect(fmtNum(0)).toBe("00");
    expect(fmtNum(1)).toBe("01");
    expect(fmtNum(9)).toBe("09");
  });

  it("returns the number as string when 10 or greater", () => {
    expect(fmtNum(10)).toBe("10");
    expect(fmtNum(23)).toBe("23");
    expect(fmtNum(99)).toBe("99");
  });

  it("throws error for negative numbers", () => {
    expect(() => fmtNum(-1)).toThrowError("Number must be non-negative");
    expect(() => fmtNum(-100)).toThrow();
  });
});
