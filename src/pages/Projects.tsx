import { X } from "lucide-react";
import { use, useEffect, useRef, useState } from "react";
import { PageHero } from "../components/PageHero.tsx";
import { ProjectCard } from "../components/ProjectCard.tsx";
import { Seo } from "../components/Seo.tsx";
import { useI18n } from "../i18n/LanguageContext.tsx";
import { getProjects } from "../lib/api.ts";
import { formatNumber } from "../lib/format.ts";
import { tx } from "../lib/text.ts";
import type { Project } from "../types.ts";

const projectsData = getProjects();
const filters = ["all", "residential", "industrial", "agricultural"] as const;

export default function ProjectsPage() {
  const { t, lang } = useI18n();
  const projects = use(projectsData);
  const [filter, setFilter] = useState<(typeof filters)[number]>("all");
  const [open, setOpen] = useState<Project | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const visible = filter === "all" ? projects : projects.filter((project) => project.category === filter);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <Seo title={t.meta.projectsTitle} description={t.meta.projectsDesc} path="/projects" />
      <PageHero eyebrow={t.projects.eyebrow} title={t.projects.title} lead={t.projects.lead} />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
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
        {visible.length === 0 ? <p className="mt-8 text-lg">{t.projects.empty}</p> : null}
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={() => setOpen(project)} />
          ))}
        </div>
      </div>
      {open ? (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-navy/70 p-3 sm:items-center" role="presentation">
          <div
            role="dialog"
            aria-modal="true"
            aria-label={t.projects.dialog}
            className="max-h-[90svh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-parchment p-5 sm:p-7"
          >
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-heading text-3xl leading-[1.6] text-navy">{tx(open.title, lang)}</h2>
              <button
                ref={closeRef}
                type="button"
                className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-navy"
                onClick={() => setOpen(null)}
                aria-label={t.projects.close}
              >
                <X aria-hidden="true" />
              </button>
            </div>
            <img
              src={open.image}
              alt={tx(open.imageAlt, lang)}
              width={960}
              height={640}
              className="mt-4 h-56 w-full rounded-2xl object-cover"
            />
            <p className="mt-4 text-lg leading-relaxed">{tx(open.story, lang)}</p>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-kumkum">{t.projects.year}</dt>
                <dd className="font-semibold">{formatNumber(open.year, lang)}</dd>
              </div>
              <div>
                <dt className="text-kumkum">{t.projects.area}</dt>
                <dd className="font-semibold">
                  {formatNumber(open.area, lang)} {t.estimator.units[open.areaUnit]}
                </dd>
              </div>
              <div className="col-span-2">
                <dt className="text-kumkum">{t.projects.materials}</dt>
                <dd>{tx(open.materials, lang)}</dd>
              </div>
            </dl>
          </div>
        </div>
      ) : null}
    </>
  );
}
