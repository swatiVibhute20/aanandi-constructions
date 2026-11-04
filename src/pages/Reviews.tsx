import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { Button } from "../components/Button.tsx";
import { PageHero } from "../components/PageHero.tsx";
import { Seo } from "../components/Seo.tsx";
import { testimonials } from "../data/testimonials.ts";
import { useI18n } from "../i18n/LanguageContext.tsx";
import { readReviews, submitReview } from "../lib/api.ts";
import { tx } from "../lib/text.ts";
import type { ProjectCategory, StoredReview } from "../types.ts";

const filters = ["all", "residential", "industrial", "agricultural"] as const;
type Filter = (typeof filters)[number];

type ReviewCard = {
  id: string;
  category: ProjectCategory;
  name: string;
  place: string;
  quote: string;
  createdAt: string;
};

function isCategory(value: string): value is ProjectCategory {
  return value === "residential" || value === "industrial" || value === "agricultural";
}

export default function ReviewsPage() {
  const { t, lang } = useI18n();
  const [filter, setFilter] = useState<Filter>("all");
  const [mine, setMine] = useState<StoredReview[]>([]);
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [category, setCategory] = useState<ProjectCategory | "">("");
  const [quote, setQuote] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  const cards = useMemo(() => {
    const added: ReviewCard[] = mine.map((row) => ({
      id: row.id,
      category: row.category,
      name: row.name,
      place: row.place,
      quote: row.quote,
      createdAt: row.createdAt,
    }));
    const seeded: ReviewCard[] = testimonials.map((row) => ({
      id: row.id,
      category: row.category,
      name: tx(row.name, lang),
      place: tx(row.place, lang),
      quote: tx(row.quote, lang),
      createdAt: "",
    }));
    return [...added, ...seeded];
  }, [mine, lang]);

  const visible = filter === "all" ? cards : cards.filter((row) => row.category === filter);

  useEffect(() => {
    let active = true;
    readReviews().then((rows) => {
      if (active) setMine(rows);
    });
    return () => {
      active = false;
    };
  }, []);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (name.trim().length < 2) next.name = t.reviews.errors.name;
    if (place.trim().length < 2) next.place = t.reviews.errors.place;
    if (!isCategory(category)) next.category = t.reviews.errors.category;
    if (quote.trim().length < 8) next.quote = t.reviews.errors.quote;
    setErrors(next);
    if (Object.keys(next).length > 0 || !isCategory(category)) return;
    try {
      const row = await submitReview({ name, place, category, quote });
      setMine((current) => [row, ...current]);
      setFilter(category);
      setName("");
      setPlace("");
      setCategory("");
      setQuote("");
      setSaved(true);
    } catch {
      setSaved(false);
      setErrors({ form: t.reviews.errors.send });
    }
  };

  return (
    <>
      <Seo title={t.meta.reviewsTitle} description={t.meta.reviewsDesc} path="/reviews" />
      <PageHero eyebrow={t.reviews.eyebrow} title={t.reviews.title} lead={t.reviews.lead} />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[0.9fr_1.1fr]">
        <form onSubmit={onSubmit} noValidate className="h-fit space-y-4 rounded-3xl border border-navy/10 bg-parchment p-5 sm:p-6">
          <h2 className="font-heading text-3xl leading-[1.6] text-navy">{t.reviews.formTitle}</h2>
          {saved ? (
            <p className="rounded-2xl border border-leaf/40 bg-leaf/10 px-4 py-3" role="status">
              {t.reviews.success}
            </p>
          ) : null}
          {errors.form ? <p className="text-sm text-kumkum">{errors.form}</p> : null}
          <label className="block">
            <span className="font-semibold">{t.reviews.name}</span>
            <input
              className="field mt-1"
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
              aria-invalid={Boolean(errors.name)}
            />
            {errors.name ? <span className="mt-1 block text-sm text-kumkum">{errors.name}</span> : null}
          </label>
          <label className="block">
            <span className="font-semibold">{t.reviews.place}</span>
            <input
              className="field mt-1"
              value={place}
              onChange={(event) => setPlace(event.target.value)}
              aria-invalid={Boolean(errors.place)}
            />
            {errors.place ? <span className="mt-1 block text-sm text-kumkum">{errors.place}</span> : null}
          </label>
          <label className="block">
            <span className="font-semibold">{t.reviews.category}</span>
            <select
              className="field mt-1"
              value={category}
              onChange={(event) => setCategory(isCategory(event.target.value) ? event.target.value : "")}
              aria-invalid={Boolean(errors.category)}
            >
              <option value="">{t.reviews.categoryPlaceholder}</option>
              <option value="residential">{t.projects.residential}</option>
              <option value="industrial">{t.projects.industrial}</option>
              <option value="agricultural">{t.projects.agricultural}</option>
            </select>
            {errors.category ? <span className="mt-1 block text-sm text-kumkum">{errors.category}</span> : null}
          </label>
          <label className="block">
            <span className="font-semibold">{t.reviews.quote}</span>
            <textarea
              className="field mt-1"
              value={quote}
              onChange={(event) => setQuote(event.target.value)}
              aria-invalid={Boolean(errors.quote)}
            />
            {errors.quote ? <span className="mt-1 block text-sm text-kumkum">{errors.quote}</span> : null}
          </label>
          <Button type="submit">{t.reviews.submit}</Button>
        </form>
        <div>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label={t.projects.eyebrow}>
            {filters.map((item) => {
              const selected = filter === item;
              const farm = item === "agricultural";
              return (
                <button
                  key={item}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setFilter(item)}
                  className={`min-h-12 rounded-full border-2 px-4 font-semibold ${
                    selected
                      ? farm
                        ? "border-leaf bg-leaf text-parchment"
                        : "border-navy bg-navy text-parchment"
                      : "border-navy/20 text-navy"
                  }`}
                >
                  {t.projects[item]}
                </button>
              );
            })}
          </div>
          {visible.length === 0 ? <p className="mt-8 text-lg">{t.reviews.empty}</p> : null}
          <ul className="mt-6 grid gap-4">
            {visible.map((row) => (
              <li key={row.id} className="rounded-3xl border border-navy/10 bg-parchment p-5">
                <p className="text-sm font-semibold text-kumkum">{t.projects[row.category]}</p>
                <p className="mt-2 font-heading text-2xl leading-relaxed text-navy">{row.quote}</p>
                <p className="mt-3 font-semibold text-navy">{row.name}</p>
                <p className="text-sm text-ink/70">{row.place}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
