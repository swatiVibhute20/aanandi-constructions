import type { Lang } from "../types.ts";

function localeOf(lang: Lang) {
  return lang === "mr" ? "mr-IN" : "en-IN";
}

export function formatNumber(value: number, lang: Lang, digits = 0) {
  return new Intl.NumberFormat(localeOf(lang), {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(value);
}

export function formatInr(value: number, lang: Lang) {
  return new Intl.NumberFormat(localeOf(lang), {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

/** Lakhs once the figure is large enough to read that way on a village estimate. */
export function formatInrCompact(value: number, lang: Lang) {
  if (value >= 100000) {
    const lakhs = value / 100000;
    const digits = lakhs >= 10 ? 1 : 2;
    const num = new Intl.NumberFormat(localeOf(lang), {
      maximumFractionDigits: digits,
      minimumFractionDigits: digits,
    }).format(lakhs);
    return lang === "mr" ? `₹${num} लाख` : `₹${num} lakh`;
  }
  return formatInr(value, lang);
}
