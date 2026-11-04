import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useEffect, useState } from "react";
import type { Testimonial } from "../types.ts";
import { useI18n } from "../i18n/LanguageContext.tsx";
import { tx } from "../lib/text.ts";
import { SectionHeading } from "./SectionHeading.tsx";
import { Sheet } from "./Sheet.tsx";

export function Testimonials({ items }: { items: Testimonial[] }) {
  const { t, lang } = useI18n();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = items.length;
  const current = items[index];

  useEffect(() => {
    if (paused || count < 2) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % count);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [paused, count]);

  if (!current) return null;

  const go = (next: number) => setIndex((next + count) % count);

  return (
    <section id="reviews" className="bg-parchment-deep py-14 sm:py-20" aria-roledescription="carousel" aria-label={t.quotes.region}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow={t.quotes.eyebrow} title={t.quotes.title} />
        <div
          className="mt-8"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onPointerDown={(event) => {
            const start = event.clientX;
            const target = event.currentTarget;
            const end = (move: PointerEvent) => {
              const delta = move.clientX - start;
              if (Math.abs(delta) > 48) go(index + (delta < 0 ? 1 : -1));
              target.removeEventListener("pointerup", end);
            };
            target.addEventListener("pointerup", end);
          }}
        >
          <Sheet>
            <figure className="px-6 py-8 sm:px-10 sm:py-12">
              <Quote className="h-8 w-8 text-kumkum" aria-hidden="true" />
              <blockquote className="mt-4 font-accent text-xl leading-relaxed text-navy sm:text-2xl" aria-live="polite">
                {tx(current.quote, lang)}
              </blockquote>
              <figcaption className="mt-6">
                <p className="font-heading text-lg leading-relaxed text-ink">{tx(current.name, lang)}</p>
                <p className="text-ink/75">
                  {tx(current.place, lang)} · {tx(current.work, lang)}
                </p>
              </figcaption>
            </figure>
          </Sheet>
          <div className="mt-4 flex items-center justify-between gap-3">
            <button
              type="button"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-navy text-navy"
              onClick={() => go(index - 1)}
              aria-label={t.quotes.prev}
            >
              <ChevronLeft aria-hidden="true" />
            </button>
            <div className="flex gap-2" role="tablist">
              {items.map((item, dot) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={dot === index}
                  aria-label={tx(item.name, lang)}
                  className={`h-3 w-3 rounded-full ${dot === index ? "bg-kumkum" : "bg-navy/25"}`}
                  onClick={() => go(dot)}
                />
              ))}
            </div>
            <button
              type="button"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-navy text-navy"
              onClick={() => go(index + 1)}
              aria-label={t.quotes.next}
            >
              <ChevronRight aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
