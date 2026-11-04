import { use, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "../components/Button.tsx";
import { PageHero } from "../components/PageHero.tsx";
import { Seo } from "../components/Seo.tsx";
import { site, waLink } from "../config/site.ts";
import { useI18n } from "../i18n/LanguageContext.tsx";
import { getEstimatorWorks, getServices, submitEnquiry } from "../lib/api.ts";
import { formatInrCompact, formatNumber } from "../lib/format.ts";
import { tx } from "../lib/text.ts";
import type { TierId } from "../types.ts";

const contactData = Promise.all([getServices(), getEstimatorWorks()]);

const workToService: Record<string, string> = {
  residential: "homes",
  commercial: "structural",
  industrial: "industrial",
  poultry: "agri",
  cattle: "agri",
  godown: "agri",
  polyhouse: "agri",
  compound: "homes",
};

function isTier(value: string | null): value is TierId {
  return value === "basic" || value === "standard" || value === "premium";
}

export default function ContactPage() {
  const { t, lang } = useI18n();
  const [services, works] = use(contactData);
  const [params] = useSearchParams();
  const estimate = useMemo(() => {
    const workId = params.get("work");
    const tier = params.get("tier");
    const quantity = Number(params.get("qty"));
    const min = Number(params.get("min"));
    const max = Number(params.get("max"));
    if (!workId || !isTier(tier) || !Number.isFinite(quantity) || !Number.isFinite(min) || !Number.isFinite(max)) {
      return null;
    }
    return { workId, tier, quantity, min, max };
  }, [params]);

  const estimateLine = useMemo(() => {
    if (!estimate) return "";
    const work = works.find((item) => item.id === estimate.workId);
    const name = work ? tx(work.title, lang) : estimate.workId;
    const finish = t.estimator.tiers[estimate.tier];
    const low = formatInrCompact(estimate.min, lang);
    const high = formatInrCompact(estimate.max, lang);
    const qty = formatNumber(estimate.quantity, lang);
    return lang === "mr"
      ? `ढोबळ अंदाज: ${name}, ${finish}, ${qty}. ${low} ते ${high}. हा कोट नाही.`
      : `Rough estimate: ${name}, ${finish}, ${qty}. ${low} to ${high}. Not a quote.`;
  }, [estimate, works, lang, t.estimator.tiers]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [place, setPlace] = useState("");
  const [serviceId, setServiceId] = useState(estimate ? (workToService[estimate.workId] ?? "") : "");
  const [message, setMessage] = useState(estimateLine);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (name.trim().length < 2) next.name = t.contact.errors.name;
    let digits = phone.replace(/\D/g, "");
    if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
    if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
    if (!/^[6-9]\d{9}$/.test(digits)) next.phone = t.contact.errors.phone;
    if (place.trim().length < 2) next.place = t.contact.errors.place;
    if (!serviceId) next.service = t.contact.errors.service;
    if (message.trim().length < 8) next.message = t.contact.errors.message;
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setStatus("sending");
    try {
      await submitEnquiry({
        name: name.trim(),
        phone: digits,
        place: place.trim(),
        serviceId,
        message: message.trim(),
        lang,
        estimate: estimate ?? undefined,
      });
      setStatus("sent");
    } catch {
      setStatus("error");
      setErrors({ form: t.contact.errors.send });
    }
  };

  return (
    <>
      <Seo title={t.meta.contactTitle} description={t.meta.contactDesc} path="/contact" />
      <PageHero eyebrow={t.contact.eyebrow} title={t.contact.title} lead={t.contact.lead} />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          {status === "sent" ? (
            <div className="rounded-3xl border border-leaf/40 bg-leaf/10 p-6" role="status">
              <h2 className="font-heading text-3xl leading-[1.6] text-navy">{t.contact.successTitle}</h2>
              <p className="mt-3 text-lg leading-relaxed">{t.contact.successBody}</p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Button href={`tel:${site.phoneTel}`}>{t.contact.call}</Button>
                <Button href={waLink(lang, message)} variant="secondary">
                  {t.contact.whatsapp}
                </Button>
              </div>
              <button
                type="button"
                className="mt-4 min-h-12 font-semibold text-kumkum"
                onClick={() => setStatus("idle")}
              >
                {t.contact.another}
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-4">
              {estimate ? (
                <p className="rounded-2xl border border-haldi bg-haldi/15 px-4 py-3 leading-relaxed">{t.contact.estimateNote}</p>
              ) : null}
              <label className="block">
                <span className="font-semibold">{t.contact.name}</span>
                <input className="field mt-1" value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" aria-invalid={Boolean(errors.name)} />
                {errors.name ? <span className="mt-1 block text-sm text-kumkum">{errors.name}</span> : null}
              </label>
              <label className="block">
                <span className="font-semibold">{t.contact.phone}</span>
                <input
                  className="field mt-1"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  inputMode="tel"
                  autoComplete="tel"
                  aria-invalid={Boolean(errors.phone)}
                />
                {errors.phone ? <span className="mt-1 block text-sm text-kumkum">{errors.phone}</span> : null}
              </label>
              <label className="block">
                <span className="font-semibold">{t.contact.place}</span>
                <input className="field mt-1" value={place} onChange={(event) => setPlace(event.target.value)} aria-invalid={Boolean(errors.place)} />
                {errors.place ? <span className="mt-1 block text-sm text-kumkum">{errors.place}</span> : null}
              </label>
              <label className="block">
                <span className="font-semibold">{t.contact.service}</span>
                <select className="field mt-1" value={serviceId} onChange={(event) => setServiceId(event.target.value)} aria-invalid={Boolean(errors.service)}>
                  <option value="">{t.contact.servicePlaceholder}</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {tx(service.title, lang)}
                    </option>
                  ))}
                </select>
                {errors.service ? <span className="mt-1 block text-sm text-kumkum">{errors.service}</span> : null}
              </label>
              <label className="block">
                <span className="font-semibold">{t.contact.message}</span>
                <textarea className="field mt-1" value={message} onChange={(event) => setMessage(event.target.value)} aria-invalid={Boolean(errors.message)} />
                {errors.message ? <span className="mt-1 block text-sm text-kumkum">{errors.message}</span> : null}
              </label>
              {errors.form ? <p className="text-kumkum">{errors.form}</p> : null}
              <Button type="submit" disabled={status === "sending"}>
                {status === "sending" ? t.contact.sending : t.contact.submit}
              </Button>
            </form>
          )}
        </div>
        <aside className="space-y-4">
          <div className="rounded-3xl bg-navy p-5 text-parchment">
            <p className="font-heading text-2xl leading-relaxed text-haldi">{tx(site.engineer, lang)}</p>
            <h2 className="mt-4 font-heading text-2xl leading-relaxed text-haldi">{t.contact.address}</h2>
            <p className="mt-2 leading-relaxed">{tx(site.address, lang)}</p>
            <a href={`tel:${site.phoneTel}`} className="mt-3 inline-flex min-h-11 items-center text-lg font-semibold text-haldi">
              {site.phoneDisplay}
            </a>
            <h3 className="mt-4 font-heading text-xl leading-relaxed text-haldi">{t.contact.hours}</h3>
            <p className="leading-relaxed">{tx(site.hours, lang)}</p>
            <a href={`mailto:${site.email}`} className="mt-2 inline-flex min-h-11 items-center leading-relaxed">
              {site.email}
            </a>
          </div>
          <div className="overflow-hidden rounded-3xl border border-navy/15">
            <iframe
              title={t.contact.map}
              src={site.map.embed}
              className="h-64 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a href={site.map.link} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center px-4 font-semibold text-kumkum">
              {t.contact.mapLink}
            </a>
          </div>
        </aside>
      </div>
    </>
  );
}
