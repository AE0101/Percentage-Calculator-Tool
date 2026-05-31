import { describe, expect, test } from "vitest";
import {
  calculateDiscount,
  calculateOriginalValue,
  calculatePercentageOfTotal,
  calculatePercentagePortion,
  calculatePercentageChange,
  formatDecimal
} from "../src/calculations.js";

describe("formatDecimal", () => {
  test("formats numbers to two decimal places", () => {
    expect(formatDecimal(25)).toBe("25.00");
    expect(formatDecimal(12.345)).toBe("12.35");
  });
});

describe("percentage change", () => {
  test("reports increases with an absolute percentage", () => {
    expect(calculatePercentageChange(150, 180)).toEqual({
      ok: true,
      value: 20,
      label: "20.00% increase"
    });
  });

  test("reports decreases with an absolute percentage", () => {
    expect(calculatePercentageChange(200, 150)).toEqual({
      ok: true,
      value: -25,
      label: "25.00% decrease"
    });
  });

  test("rejects zero original value", () => {
    expect(calculatePercentageChange(0, 150)).toEqual({
      ok: false,
      error: "Original value cannot be zero"
    });
  });
});

describe("percentage of total", () => {
  test("calculates what percentage a part is of a total", () => {
    expect(calculatePercentageOfTotal(50, 200)).toEqual({
      ok: true,
      value: 25,
      label: "25.00%"
    });
  });

  test("rejects zero total", () => {
    expect(calculatePercentageOfTotal(50, 0)).toEqual({
      ok: false,
      error: "Total cannot be zero"
    });
  });
});

describe("calculate percentage", () => {
  test("calculates a percentage portion of a number", () => {
    expect(calculatePercentagePortion(20, 500)).toEqual({
      ok: true,
      value: 100,
      label: "100.00"
    });
  });
});

describe("discount", () => {
  test("calculates final price and savings", () => {
    const result = calculateDiscount(79.99, 20);

    expect(result.ok).toBe(true);
    expect(result.finalPrice).toBeCloseTo(63.992);
    expect(result.saved).toBeCloseTo(15.998);
    expect(result.label).toBe("Final: 63.99<br>Saved: 16.00");
    expect(result.copyText).toBe("Final: 63.99\nSaved: 16.00");
  });
});

describe("find original value", () => {
  test("finds the full value from a known percentage", () => {
    expect(calculateOriginalValue(50, 25)).toEqual({
      ok: true,
      value: 200,
      label: "200.00"
    });
  });

  test("rejects zero percent", () => {
    expect(calculateOriginalValue(50, 0)).toEqual({
      ok: false,
      error: "Percent cannot be zero"
    });
  });
});
