import { Link } from "react-router-dom";
import type { Project } from "../types.ts";
import { useI18n } from "../i18n/LanguageContext.tsx";
import { formatNumber } from "../lib/format.ts";
import { tx } from "../lib/text.ts";

export function ProjectCard({ project, onOpen }: { project: Project; onOpen?: () => void }) {
  const { lang, t } = useI18n();
  const farm = project.category === "agricultural";
  const body = (
    <>
        <div className={`relative ${farm ? "bg-leaf" : "bg-terracotta"}`}>
          <img
            src={project.image}
            srcSet={project.imageSrcSet}
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
            alt={tx(project.imageAlt, lang)}
            width={960}
            height={640}
            loading="lazy"
            decoding="async"
            className="aspect-[3/2] w-full object-cover"
          />
          <span
            className={`absolute top-3 left-3 rounded-full px-3 py-1 text-sm font-semibold text-parchment ${farm ? "bg-leaf" : "bg-navy"}`}
          >
            {t.projects[project.category]}
          </span>
        </div>
        <div className="px-4 py-4">
          <h3 className="font-heading text-2xl leading-relaxed text-navy">{tx(project.title, lang)}</h3>
          <p className="mt-1 text-ink/80">{tx(project.summary, lang)}</p>
          <p className={`mt-3 text-sm font-semibold ${farm ? "text-leaf" : "text-terracotta"}`}>
            {tx(project.location, lang)} · {formatNumber(project.year, lang)} · {formatNumber(project.area, lang)}{" "}
            {t.estimator.units[project.areaUnit]}
          </p>
        </div>
    </>
  );
  return (
    <article id={`project-${project.id}`} className="overflow-hidden rounded-2xl border border-navy/10 bg-parchment shadow-[0_12px_30px_-22px_rgba(20,33,61,0.8)]">
      {onOpen ? (
        <button type="button" onClick={onOpen} className="block w-full text-left">
          {body}
        </button>
      ) : (
        <Link to={`/projects#project-${project.id}`} className="block">
          {body}
        </Link>
      )}
    </article>
  );
}
