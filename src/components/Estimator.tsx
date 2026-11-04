import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { AddOnId, EstimatorWork, TierId } from "../types.ts";
import { estimatorAddOns } from "../data/estimatorRates.ts";
import { waLink } from "../config/site.ts";
import { useI18n } from "../i18n/LanguageContext.tsx";
import { calculateEstimate } from "../lib/estimate.ts";
import { formatInr, formatNumber } from "../lib/format.ts";
import { tx } from "../lib/text.ts";
import { Button } from "./Button.tsx";
import { SectionHeading } from "./SectionHeading.tsx";

const tiers: TierId[] = ["basic", "standard", "premium"];
const floorChoices = [1, 2, 3, 4];

export function Estimator({ works }: { works: EstimatorWork[] }) {
  const { t, lang } = useI18n();
  const navigate = useNavigate();
  const [workId, setWorkId] = useState(works[0]?.id ?? "residential");
  const [tier, setTier] = useState<TierId>("standard");
  const [qtyText, setQtyText] = useState("1000");
  const [floors, setFloors] = useState(1);
  const [picked, setPicked] = useState<AddOnId[]>([]);

  const work = works.find((item) => item.id === workId) ?? works[0];
  const qty = Number(qtyText);
  const rate = work?.tiers[tier];
  const chosen = estimatorAddOns.filter((item) => picked.includes(item.id));

  const result = useMemo(() => {
    if (!work || !rate) return null;
    return calculateEstimate({
      rateMin: rate.min,
      rateMax: rate.max,
      area: qty,
      minQty: work.minQty,
      maxQty: work.maxQty,
      floors,
      floorsApply: work.floors,
      addOns: chosen.map((item) => ({ mode: item.mode, min: item.min, max: item.max })),
    });
  }, [work, rate, qty, floors, chosen]);

  const valid = Boolean(result?.valid);
  const unitLabel = work ? t.estimator.units[work.unit] : "";

  const summary = useMemo(() => {
    if (!work || !result?.valid) return "";
    const title = tx(work.title, lang);
    const finish = t.estimator.tiers[tier];
    const low = formatInr(result.min, lang);
    const high = formatInr(result.max, lang);
    const extras = chosen.map((item) => tx(item.title, lang)).join(", ");
    const floorLine = work.floors
      ? lang === "mr"
        ? floors === 1
          ? `, ${formatNumber(floors, lang)} मजला`
          : `, ${formatNumber(floors, lang)} मजले`
        : floors === 1
          ? `, ${formatNumber(floors, lang)} floor`
          : `, ${formatNumber(floors, lang)} floors`
      : "";
    const extraLine = extras ? (lang === "mr" ? `, जोडणी: ${extras}` : `, add-ons: ${extras}`) : "";
    return lang === "mr"
      ? `${title}, ${finish}${floorLine}, ${formatNumber(qty, lang)} ${unitLabel}${extraLine}: ${low} ते ${high}. हा ढोबळ अंदाज आहे.`
      : `${title}, ${finish}${floorLine}, ${formatNumber(qty, lang)} ${unitLabel}${extraLine}: ${low} to ${high}. This is only an approximate estimate.`;
  }, [work, result, lang, tier, floors, qty, unitLabel, chosen, t.estimator.tiers]);

  if (!work || !rate || !result) return null;

  const toggle = (id: AddOnId) => {
    setPicked((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  return (
    <section id="estimator" className="relative overflow-hidden bg-parchment py-14 sm:py-20">
      <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow={t.estimator.eyebrow} title={t.estimator.title} lead={t.estimator.lead} />
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
          <div className="rounded-2xl border border-navy/15 bg-parchment/90 p-4 sm:p-6">
            <fieldset>
              <legend className="font-heading text-xl leading-relaxed text-navy">{t.estimator.work}</legend>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {works.map((item) => {
                  const selected = item.id === work.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setWorkId(item.id)}
                      className={`min-h-12 rounded-2xl border-2 px-3 py-2 text-left text-base font-semibold ${
                        selected ? "border-kumkum bg-kumkum text-parchment" : "border-navy/20 bg-white/60 text-navy"
                      }`}
                    >
                      {tx(item.title, lang)}
                    </button>
                  );
                })}
              </div>
            </fieldset>
            <fieldset className="mt-6">
              <legend className="font-heading text-xl leading-relaxed text-navy">{t.estimator.tier}</legend>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {tiers.map((item) => {
                  const selected = item === tier;
                  return (
                    <button
                      key={item}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setTier(item)}
                      className={`min-h-12 rounded-full border-2 px-2 text-sm font-semibold sm:text-base ${
                        selected ? "border-navy bg-navy text-parchment" : "border-navy/25 text-navy"
                      }`}
                    >
                      {t.estimator.tiers[item]}
                    </button>
                  );
                })}
              </div>
            </fieldset>
            <label className="mt-6 block">
              <span className="font-heading text-xl leading-relaxed text-navy">
                {t.estimator.quantity} ({unitLabel})
              </span>
              <input
                className="mt-3 w-full accent-kumkum"
                type="range"
                min={work.minQty}
                max={work.maxQty}
                step={work.unit === "rft" ? 10 : 50}
                value={Number.isFinite(qty) ? Math.min(work.maxQty, Math.max(work.minQty, qty)) : work.minQty}
                onChange={(event) => setQtyText(event.target.value)}
                aria-label={t.estimator.quantity}
              />
              <input
                className="field mt-2 text-2xl font-semibold"
                inputMode="decimal"
                value={qtyText}
                onChange={(event) => setQtyText(event.target.value.replace(/[^\d.]/g, ""))}
                aria-invalid={!valid}
                aria-describedby="qty-hint"
              />
              <span id="qty-hint" className="mt-2 block text-sm leading-relaxed text-ink/75">
                {tx(work.hint, lang)} {valid ? "" : t.estimator.invalid} ({formatNumber(work.minQty, lang)}–
                {formatNumber(work.maxQty, lang)})
              </span>
            </label>
            {work.floors ? (
              <fieldset className="mt-6">
                <legend className="font-heading text-xl leading-relaxed text-navy">{t.estimator.floors}</legend>
                <div className="mt-3 grid grid-cols-4 gap-2">
                  {floorChoices.map((count) => {
                    const selected = count === floors;
                    return (
                      <button
                        key={count}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => setFloors(count)}
                        className={`min-h-12 rounded-full border-2 font-semibold ${
                          selected ? "border-kumkum bg-kumkum text-parchment" : "border-navy/25 text-navy"
                        }`}
                      >
                        {formatNumber(count, lang)}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            ) : null}
            <fieldset className="mt-6">
              <legend className="font-heading text-xl leading-relaxed text-navy">{t.estimator.addons}</legend>
              <div className="mt-3 grid gap-2">
                {estimatorAddOns.map((item) => {
                  const on = picked.includes(item.id);
                  return (
                    <label
                      key={item.id}
                      className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-2xl border-2 px-3 py-2 ${
                        on ? "border-kumkum bg-kumkum/5" : "border-navy/15"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="h-5 w-5 accent-kumkum"
                        checked={on}
                        onChange={() => toggle(item.id)}
                      />
                      <span className="font-semibold text-navy">{tx(item.title, lang)}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </div>
          <aside className="h-fit rounded-2xl bg-navy p-5 text-parchment sm:p-7" aria-live="polite">
            <p className="font-accent text-xl leading-relaxed text-haldi">{t.estimator.result}</p>
            {valid ? (
              <>
                <p className="mt-3 font-heading text-3xl leading-relaxed text-balance text-parchment sm:text-4xl">
                  {formatInr(result.min, lang)}
                  <span className="mx-2 text-haldi">–</span>
                  {formatInr(result.max, lang)}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-parchment/80">
                  {t.estimator.rate}: {formatInr(rate.min, lang)} – {formatInr(rate.max, lang)} / {unitLabel}
                </p>
                <div className="mt-5">
                  <p className="text-sm font-semibold text-haldi">{t.estimator.breakdown}</p>
                  <ul className="mt-2 space-y-2">
                    {result.slices.map((slice) => (
                      <li key={slice.id}>
                        <div className="flex justify-between gap-3 text-sm">
                          <span>{t.estimator.slices[slice.id]}</span>
                          <span>{Math.round(slice.share * 100)}%</span>
                        </div>
                        <div className="mt-1 h-2 overflow-hidden rounded-full bg-parchment/20">
                          <div className="h-full rounded-full bg-haldi" style={{ width: `${slice.share * 100}%` }} />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <p className="mt-3 text-lg leading-relaxed">{t.estimator.empty}</p>
            )}
            <p className="mt-4 text-sm leading-relaxed text-parchment/75">{t.estimator.disclaimer}</p>
            <Button className="mt-6 w-full" href={valid ? waLink(lang, summary) : undefined} disabled={!valid}>
              {t.estimator.whatsapp}
            </Button>
            <Button
              className="mt-3 w-full"
              variant="light"
              disabled={!valid}
              onClick={() => {
                const params = new URLSearchParams({
                  work: work.id,
                  tier,
                  qty: String(qty),
                  min: String(result.min),
                  max: String(result.max),
                });
                navigate(`/contact?${params.toString()}`);
              }}
            >
              {t.estimator.toContact}
            </Button>
          </aside>
        </div>
        <p className="sr-only">{summary}</p>
      </div>
    </section>
  );
}
