import { use } from "react";
import { PageHero } from "../components/PageHero.tsx";
import { Reveal } from "../components/Reveal.tsx";
import { SectionHeading } from "../components/SectionHeading.tsx";
import { Seo } from "../components/Seo.tsx";
import { WarliPortrait } from "../components/visual/Warli.tsx";
import { stock } from "../data/images.ts";
import { useI18n } from "../i18n/LanguageContext.tsx";
import { getFounder, getServiceAreas, getSteps } from "../lib/api.ts";
import { tx } from "../lib/text.ts";

const aboutData = Promise.all([getFounder(), getSteps(), getServiceAreas()]);
const planPhoto = stock("photo-1503387762-592deb58ef4e", 1200);

export default function AboutPage() {
  const { t, lang } = useI18n();
  const [founder, steps, areas] = use(aboutData);

  return (
    <>
      <Seo title={t.meta.aboutTitle} description={t.meta.aboutDesc} path="/about" />
      <PageHero eyebrow={t.about.eyebrow} title={t.about.title} lead={t.about.lead} />
      <section className="py-14 sm:py-20">
        <div className="mx-auto grid max-w-6xl items-start gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <WarliPortrait className="mx-auto w-full max-w-xs rounded-2xl" />
            <figure className="mt-4">
              <img
                src={planPhoto}
                alt={lang === "mr" ? "बांधकामाच्या रेखांकनाचा फोटो" : "A photograph of construction drawings"}
                width={1200}
                height={800}
                loading="lazy"
                decoding="async"
                className="h-48 w-full rounded-2xl object-cover"
              />
            </figure>
          </div>
          <div>
            <p className="font-accent text-xl leading-relaxed text-kumkum">{tx(founder.role, lang)}</p>
            <h2 className="font-heading text-4xl leading-[1.6] text-navy">{tx(founder.name, lang)}</h2>
            <div className="mt-4 space-y-4 text-lg leading-relaxed">
              {founder.paragraphs.map((paragraph) => (
                <p key={paragraph.en}>{tx(paragraph, lang)}</p>
              ))}
            </div>
            <blockquote className="mt-6 border-s-4 border-haldi ps-4 font-accent text-2xl leading-relaxed text-navy">
              {tx(founder.quote, lang)}
              <footer className="mt-2 font-sans text-base text-ink/70">— {t.about.quoteBy}</footer>
            </blockquote>
          </div>
        </div>
      </section>

      <section className="bg-parchment-deep py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading eyebrow={t.about.stepsEyebrow} title={t.about.stepsTitle} />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <Reveal key={step.id} className="h-full" delay={index * 0.05}>
                <article className="h-full rounded-2xl border border-navy/10 bg-parchment p-5">
                  <p className="font-heading text-3xl leading-relaxed text-haldi">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 font-heading text-2xl leading-relaxed text-navy">{tx(step.title, lang)}</h3>
                  <p className="mt-2 text-ink/85">{tx(step.body, lang)}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-heading text-3xl leading-[1.6] text-navy">{t.about.valuesTitle}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {t.about.values.map((value) => (
              <article key={value.title} className="rounded-2xl bg-navy p-5 text-parchment">
                <h3 className="font-heading text-2xl leading-relaxed text-haldi">{value.title}</h3>
                <p className="mt-2 leading-relaxed text-parchment/90">{value.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-navy/10 bg-leaf py-14 text-parchment sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow={t.about.areasEyebrow}
            title={t.about.areasTitle}
            lead={t.about.areasLead}
            light
          />
          <ul className="mt-6 flex flex-wrap gap-2">
            {areas.map((area) => (
              <li key={area.en} className="rounded-full border border-parchment/40 px-4 py-2 text-lg">
                {tx(area, lang)}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
