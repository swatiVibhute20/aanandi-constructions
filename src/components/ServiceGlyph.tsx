import { Box, Calculator, Columns3, DraftingCompass, Factory, Hammer, Home, Tractor } from "lucide-react";
import type { ServiceAccent, ServiceIcon } from "../types.ts";

const icons = {
  draft: DraftingCompass,
  columns: Columns3,
  calculator: Calculator,
  box: Box,
  factory: Factory,
  tractor: Tractor,
  home: Home,
  hammer: Hammer,
} as const;

const tones: Record<ServiceAccent, string> = {
  kumkum: "bg-kumkum/10 text-kumkum",
  leaf: "bg-leaf/10 text-leaf",
  terracotta: "bg-terracotta/10 text-terracotta",
};

export function ServiceGlyph({
  icon,
  accent,
  className = "h-6 w-6",
}: {
  icon: ServiceIcon;
  accent: ServiceAccent;
  className?: string;
}) {
  const Icon = icons[icon];
  return (
    <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${tones[accent]}`}>
      <Icon className={className} aria-hidden="true" />
    </span>
  );
}
