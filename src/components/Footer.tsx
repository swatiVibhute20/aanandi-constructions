import { NavLink } from "react-router-dom";
import { site, waLink } from "../config/site.ts";
import { useI18n } from "../i18n/LanguageContext.tsx";
import { tx } from "../lib/text.ts";
import { PaithaniBorder } from "./visual/PaithaniBorder.tsx";
import { Logo } from "./visual/Logo.tsx";

const links = [
  ["/", "home"],
  ["/about", "about"],
  ["/services", "services"],
  ["/projects", "projects"],
  ["/reviews", "reviews"],
  ["/contact", "contact"],
] as const;

function SocialIcon({ kind }: { kind: "instagram" | "whatsapp" }) {
  if (kind === "whatsapp") {
    return (
      <svg viewBox="-1.4 -1.4 26.8 26.8" className="h-5 w-5" aria-hidden="true">
        <path
          fill="currentColor"
          d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

export function Footer() {
  const { t, lang } = useI18n();
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy text-parchment">
      <PaithaniBorder tone="haldi" />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <Logo variant="light" />
          <p className="mt-4 max-w-xs leading-relaxed text-parchment/85">{t.footer.blurb}</p>
        </div>
        <div>
          <h2 className="font-heading text-xl leading-relaxed text-haldi">{t.footer.links}</h2>
          <ul className="mt-3 space-y-1">
            {links.map(([to, key]) => (
              <li key={to}>
                <NavLink to={to} end={to === "/"} className="inline-flex min-h-10 items-center hover:text-haldi">
                  {t.nav[key]}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-heading text-xl leading-relaxed text-haldi">{t.footer.contact}</h2>
          <p className="mt-3 font-semibold">{tx(site.engineer, lang)}</p>
          <p className="mt-2 leading-relaxed">{tx(site.address, lang)}</p>
          <a href={`tel:${site.phoneTel}`} className="mt-2 inline-flex min-h-10 items-center font-semibold text-haldi">
            {site.phoneDisplay}
          </a>
          <p className="leading-relaxed text-parchment/80">{tx(site.hours, lang)}</p>
          <div className="mt-4 flex items-center gap-2" aria-label={t.footer.social}>
            {(
              [
                ["instagram", site.socials.instagram, t.footer.instagram],
                ["whatsapp", waLink(lang), t.footer.whatsapp],
              ] as const
            ).map(([kind, href, label]) => (
              <a
                key={kind}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-parchment/40 hover:border-haldi hover:text-haldi"
              >
                <SocialIcon kind={kind} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-parchment/15 px-4 py-4 text-center text-sm text-parchment/75">
        © {year} आनंदी Constructions. {t.footer.rights}
      </div>
    </footer>
  );
}
