import formatNumber from "../utils/formatNumber.js";

it("should format numbers correctly", () => {
  expect(formatNumber(1006)).toBe("1.01K");
  expect(formatNumber(1234589)).toBe("1.23M");
});

it("should handle edge case of rounding up to a thousand", () => {
  expect(formatNumber(999999)).toBe("1M");
});
