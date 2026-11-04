import { PaithaniBorder } from "./visual/PaithaniBorder.tsx";
import { SectionHeading } from "./SectionHeading.tsx";

export function PageHero({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead: string;
}) {
  return (
    <header className="relative overflow-hidden border-b border-navy/10 bg-parchment-deep">
      <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-80" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <SectionHeading eyebrow={eyebrow} title={title} lead={lead} />
      </div>
      <PaithaniBorder />
    </header>
  );
}
