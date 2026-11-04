import { useEffect, useRef, useState } from "react";
import type { CounterStat } from "../types.ts";
import { useI18n } from "../i18n/LanguageContext.tsx";
import { formatNumber } from "../lib/format.ts";
import { tx } from "../lib/text.ts";

function useCountUp(target: number, active: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setValue(target);
      return;
    }
    const start = performance.now();
    const duration = 1100;
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target]);
  return value;
}

function Counter({ stat, active }: { stat: CounterStat; active: boolean }) {
  const { lang } = useI18n();
  const value = useCountUp(stat.value, active);
  return (
    <div className="px-3 py-6 text-center">
      <p className="font-heading text-4xl leading-relaxed text-haldi sm:text-5xl">{formatNumber(value, lang)}</p>
      <p className="mt-1 text-sm leading-relaxed text-parchment/90 sm:text-base">{tx(stat.label, lang)}</p>
    </div>
  );
}

export function Counters({ stats }: { stats: CounterStat[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-navy" aria-label="stats">
      <div className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4">
        {stats.map((stat) => (
          <Counter key={stat.id} stat={stat} active={active} />
        ))}
      </div>
    </section>
  );
}
