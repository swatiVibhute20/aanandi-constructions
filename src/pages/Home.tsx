import { ArrowRight, BadgeIndianRupee, MapPin, ShieldCheck, Timer } from "lucide-react";
import { use } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button.tsx";
import { Counters } from "../components/Counters.tsx";
import { ProjectCard } from "../components/ProjectCard.tsx";
import { Reveal } from "../components/Reveal.tsx";
import { SectionHeading } from "../components/SectionHeading.tsx";
import { Seo } from "../components/Seo.tsx";
import { ServiceGlyph } from "../components/ServiceGlyph.tsx";
import { Sheet } from "../components/Sheet.tsx";
import { Testimonials } from "../components/Testimonials.tsx";
import { PaithaniBorder } from "../components/visual/PaithaniBorder.tsx";
import { WarliFrieze } from "../components/visual/Warli.tsx";
import { site } from "../config/site.ts";
import { useI18n } from "../i18n/LanguageContext.tsx";
import {
  getCounters,
  getFeaturedProjects,
  getReasons,
  getServiceAreas,
  getServices,
  getTestimonials,
} from "../lib/api.ts";
import { tx } from "../lib/text.ts";

const homeData = Promise.all([
  getServices(),
  getFeaturedProjects(),
  getTestimonials(),
  getCounters(),
  getReasons(),
  getServiceAreas(),
]);

const whyIcons = [BadgeIndianRupee, Timer, ShieldCheck, MapPin];

export default function HomePage() {
  const { t, lang } = useI18n();
  const [services, projects, quotes, counters, reasons, areas] = use(homeData);

  return (
    <>
      <Seo title={t.meta.homeTitle} description={t.meta.homeDesc} path="/" />
      <section className="relative bg-navy text-parchment">
        <div className="relative min-h-[88svh]">
          <img
            src={site.heroImage.src}
            srcSet={site.heroImage.srcSet}
            sizes="100vw"
            alt=""
            width={1600}
            height={1067}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/75 to-navy/45" />
          <div className="blueprint-grid-light pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
          <div className="relative z-10 mx-auto flex min-h-[88svh] max-w-6xl flex-col justify-end px-4 pt-16 pb-10 sm:px-6 sm:pb-14">
            <p className="inline-flex w-fit items-center rounded-full border border-haldi/80 px-3 py-1 text-sm text-haldi">
              {t.hero.since}
            </p>
            <p className="mt-4 font-accent text-xl leading-relaxed text-haldi sm:text-2xl">{t.hero.kicker}</p>
            <h1 className="mt-2 max-w-3xl font-heading text-4xl leading-[1.6] text-balance text-parchment sm:text-6xl">
              {t.hero.title}
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-parchment/90">{t.hero.sub}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button to="/projects">{t.hero.ctaProjects}</Button>
              <Button to="/reviews" variant="light">
                {t.hero.ctaReview}
              </Button>
            </div>
          </div>
        </div>
        <div className="flex h-24 items-end justify-center overflow-hidden bg-terracotta">
          <WarliFrieze className="h-24 w-[980px] max-w-none shrink-0" />
        </div>
      </section>

      <section className="border-b border-navy/10 bg-parchment-deep" aria-label={t.ribbon}>
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:px-6">
          <p className="font-accent text-lg leading-relaxed text-kumkum">{t.ribbon}</p>
          <ul className="flex flex-wrap gap-2">
            {areas.map((area) => (
              <li key={area.en} className="rounded-full border border-navy/15 bg-parchment px-3 py-1 text-sm text-navy">
                {tx(area, lang)}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading eyebrow={t.services.eyebrow} title={t.services.title} lead={t.services.lead} />
            <Link to="/services" className="inline-flex min-h-12 items-center gap-2 font-semibold text-kumkum">
              {t.services.seeAll}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Reveal key={service.id} className="h-full" delay={Math.min(index, 3) * 0.05}>
                <Link to={`/services#service-${service.id}`} className="block h-full">
                  <Sheet className="h-full">
                    <div className="flex h-full flex-col">
                      <div
                        className={`grid gap-1 px-2 pt-2 ${service.images.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}
                      >
                        {service.images.map((shot) => (
                          <img
                            key={shot.image}
                            src={shot.image}
                            srcSet={shot.imageSrcSet}
                            sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                            alt={tx(shot.imageAlt, lang)}
                            width={960}
                            height={640}
                            loading="lazy"
                            decoding="async"
                            className="h-40 w-full rounded-xl object-cover"
                          />
                        ))}
                      </div>
                      <div className="flex h-full flex-col p-5">
                        <ServiceGlyph icon={service.icon} accent={service.accent} />
                        <h3 className="mt-4 font-heading text-2xl leading-relaxed text-navy">{tx(service.title, lang)}</h3>
                        <p className="mt-2 text-ink/85">{tx(service.summary, lang)}</p>
                      </div>
                    </div>
                  </Sheet>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Counters stats={counters} />

      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading eyebrow={t.projects.eyebrow} title={t.projects.title} lead={t.projects.lead} />
            <Link to="/projects" className="inline-flex min-h-12 items-center gap-2 font-semibold text-kumkum">
              {t.projects.seeAll}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-parchment-deep py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading eyebrow={t.why.eyebrow} title={t.why.title} lead={t.why.lead} />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {reasons.map((reason, index) => {
              const Icon = whyIcons[index] ?? MapPin;
              return (
                <Reveal key={reason.id} delay={index * 0.05}>
                  <article className="h-full rounded-2xl border border-navy/10 bg-parchment p-5">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-kumkum/10 text-kumkum">
                      <Icon aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 font-heading text-2xl leading-relaxed text-navy">{tx(reason.title, lang)}</h3>
                    <p className="mt-2 text-ink/85">{tx(reason.body, lang)}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <Testimonials items={quotes} />
      <PaithaniBorder />

      <section className="relative overflow-hidden bg-terracotta text-parchment">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <h2 className="max-w-2xl font-heading text-3xl leading-[1.6] text-balance sm:text-5xl">{t.band.title}</h2>
          <p className="mt-3 max-w-xl text-lg leading-relaxed text-parchment/90">{t.band.lead}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button to="/contact">{t.band.button}</Button>
            <Button href={`tel:${site.phoneTel}`} variant="light">
              {t.nav.call}
            </Button>
          </div>
        </div>
        <div className="flex h-20 items-end justify-center overflow-hidden bg-terracotta">
          <WarliFrieze className="h-20 w-[980px] max-w-none shrink-0" stroke="#FBF3E0" />
        </div>
      </section>
    </>
  );
}
