import type { AddOnMode, BreakdownId } from "../types.ts";
import { breakdownShares, floorPremium } from "../data/estimatorRates.ts";

export type EstimateAddOn = {
  mode: AddOnMode;
  min: number;
  max: number;
};

export type EstimateInput = {
  rateMin: number;
  rateMax: number;
  area: number;
  minQty: number;
  maxQty: number;
  floors: number;
  floorsApply: boolean;
  addOns: EstimateAddOn[];
};

export type EstimateSlice = {
  id: BreakdownId;
  share: number;
  min: number;
  max: number;
};

export type EstimateResult = {
  valid: boolean;
  min: number;
  max: number;
  slices: EstimateSlice[];
};

const sliceIds: BreakdownId[] = ["materials", "labour", "design", "misc"];

function emptySlices(): EstimateSlice[] {
  return sliceIds.map((id) => ({ id, share: breakdownShares[id], min: 0, max: 0 }));
}

/** Pure cost range. Rates stay in estimatorRates.ts; this only multiplies them. */
export function calculateEstimate(input: EstimateInput): EstimateResult {
  const area = input.area;
  if (!Number.isFinite(area) || area < input.minQty || area > input.maxQty) {
    return { valid: false, min: 0, max: 0, slices: emptySlices() };
  }

  const floors = input.floorsApply ? Math.min(8, Math.max(1, Math.round(input.floors) || 1)) : 1;
  const factor = 1 + floorPremium * (floors - 1);
  let min = input.rateMin * area * factor;
  let max = input.rateMax * area * factor;

  for (const addOn of input.addOns) {
    if (addOn.mode === "percent") {
      min += input.rateMin * area * factor * addOn.min;
      max += input.rateMax * area * factor * addOn.max;
    } else if (addOn.mode === "perUnit") {
      min += addOn.min * area;
      max += addOn.max * area;
    } else {
      min += addOn.min;
      max += addOn.max;
    }
  }

  min = Math.round(min);
  max = Math.round(max);

  return {
    valid: true,
    min,
    max,
    slices: sliceIds.map((id) => ({
      id,
      share: breakdownShares[id],
      min: Math.round(min * breakdownShares[id]),
      max: Math.round(max * breakdownShares[id]),
    })),
  };
}
