import type { Lang, L10n } from "../types.ts";

export function tx(value: L10n, lang: Lang) {
  return value[lang];
}
