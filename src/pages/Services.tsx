import { use } from "react";
import { Button } from "../components/Button.tsx";
import { PageHero } from "../components/PageHero.tsx";
import { Seo } from "../components/Seo.tsx";
import { ServiceGlyph } from "../components/ServiceGlyph.tsx";
import { waLink } from "../config/site.ts";
import { useI18n } from "../i18n/LanguageContext.tsx";
import { getServices } from "../lib/api.ts";
import { tx } from "../lib/text.ts";

const servicesData = getServices();

export default function ServicesPage() {
  const { t, lang } = useI18n();
  const services = use(servicesData);

  return (
    <>
      <Seo title={t.meta.servicesTitle} description={t.meta.servicesDesc} path="/services" />
      <PageHero eyebrow={t.servicesPage.eyebrow} title={t.servicesPage.title} lead={t.servicesPage.lead} />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="space-y-8">
          {services.map((service, index) => {
            const agri = service.accent === "leaf";
            return (
              <article
                key={service.id}
                id={`service-${service.id}`}
                className={`grid items-start gap-6 rounded-3xl border p-5 sm:p-8 lg:grid-cols-[1fr_1.2fr] ${
                  agri ? "border-leaf/30 bg-leaf/5" : index % 2 === 0 ? "border-navy/10 bg-parchment" : "border-navy/10 bg-parchment-deep"
                }`}
              >
                <div className={`grid gap-3 lg:col-span-2 ${service.images.length > 1 ? "sm:grid-cols-2" : ""}`}>
                  {service.images.map((shot) => (
                    <img
                      key={shot.image}
                      src={shot.image}
                      srcSet={shot.imageSrcSet}
                      sizes="(min-width: 1024px) 560px, 100vw"
                      alt={tx(shot.imageAlt, lang)}
                      width={960}
                      height={640}
                      loading="lazy"
                      decoding="async"
                      className="h-56 w-full rounded-2xl object-cover sm:h-64"
                    />
                  ))}
                </div>
                <div>
                  <ServiceGlyph icon={service.icon} accent={service.accent} />
                  <h2 className="mt-4 font-heading text-3xl leading-[1.6] text-navy">{tx(service.title, lang)}</h2>
                  <p className="mt-3 text-lg leading-relaxed">{tx(service.body, lang)}</p>
                  <p className={`mt-4 text-sm font-semibold ${agri ? "text-leaf" : "text-terracotta"}`}>
                    {t.common.duration}: {tx(service.duration, lang)}
                  </p>
                  <Button
                    className="mt-5"
                    href={waLink(lang, tx(service.title, lang))}
                  >
                    {t.servicesPage.enquire}
                  </Button>
                </div>
                <div>
                  <h3 className="font-heading text-xl leading-relaxed text-navy">{t.common.includes}</h3>
                  <ul className="mt-3 space-y-2">
                    {service.includes.map((item) => (
                      <li key={item.en} className="flex gap-3 leading-relaxed">
                        <span className={`mt-2 h-2.5 w-2.5 shrink-0 rounded-full ${agri ? "bg-leaf" : "bg-kumkum"}`} />
                        <span>{tx(item, lang)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </>
  );
}
