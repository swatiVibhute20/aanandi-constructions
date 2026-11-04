import { describe, expect, it } from "vitest";
import { calculateEstimate } from "./estimate.ts";

const house = {
  rateMin: 2000,
  rateMax: 2400,
  area: 1000,
  minQty: 200,
  maxQty: 8000,
  floors: 1,
  floorsApply: true,
  addOns: [],
};

describe("calculateEstimate", () => {
  it("multiplies the per-foot band by the area", () => {
    const result = calculateEstimate(house);
    expect(result.valid).toBe(true);
    expect(result.min).toBe(2_000_000);
    expect(result.max).toBe(2_400_000);
  });

  it("adds six percent for each floor above the first", () => {
    const result = calculateEstimate({ ...house, floors: 3 });
    expect(result.min).toBe(Math.round(2_000_000 * 1.12));
    expect(result.max).toBe(Math.round(2_400_000 * 1.12));
  });

  it("ignores floors for a shed", () => {
    const result = calculateEstimate({ ...house, floors: 4, floorsApply: false });
    expect(result.min).toBe(2_000_000);
  });

  it("rejects an area outside the allowed band", () => {
    const result = calculateEstimate({ ...house, area: 50 });
    expect(result.valid).toBe(false);
    expect(result.min).toBe(0);
  });

  it("adds a percent add-on and a lump sum", () => {
    const result = calculateEstimate({
      ...house,
      addOns: [
        { mode: "percent", min: 0.1, max: 0.1 },
        { mode: "lump", min: 8000, max: 18000 },
      ],
    });
    expect(result.min).toBe(2_000_000 + 200_000 + 8000);
    expect(result.max).toBe(2_400_000 + 240_000 + 18000);
  });

  it("splits the total into materials, labour, design and misc", () => {
    const result = calculateEstimate(house);
    const share = result.slices.reduce((sum, slice) => sum + slice.share, 0);
    expect(share).toBeCloseTo(1);
    expect(result.slices.map((slice) => slice.id)).toEqual(["materials", "labour", "design", "misc"]);
    expect(result.slices[0]?.min).toBe(Math.round(2_000_000 * 0.55));
  });
});
