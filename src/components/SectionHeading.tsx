import { useI18n } from "../i18n/LanguageContext.tsx";

export function SectionHeading({
  eyebrow,
  title,
  lead,
  light = false,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  light?: boolean;
  align?: "left" | "center";
}) {
  const { lang } = useI18n();
  const wrap = align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl";
  const eyebrowClass =
    lang === "mr"
      ? `font-accent text-xl leading-relaxed ${light ? "text-haldi" : "text-kumkum"}`
      : `font-sans text-xs font-semibold tracking-[0.2em] uppercase ${light ? "text-haldi" : "text-kumkum"}`;
  return (
    <div className={wrap}>
      <p className={eyebrowClass}>{eyebrow}</p>
      <h2
        className={`mt-1 font-heading text-[1.85rem] leading-[1.6] text-balance sm:text-4xl ${light ? "text-parchment" : "text-navy"}`}
      >
        {title}
      </h2>
      {lead ? (
        <p className={`mt-3 text-base leading-relaxed sm:text-lg ${light ? "text-parchment/90" : "text-ink/85"}`}>
          {lead}
        </p>
      ) : null}
    </div>
  );
}
