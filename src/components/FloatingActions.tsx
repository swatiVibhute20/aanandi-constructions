import { Phone } from "lucide-react";
import { site, waLink } from "../config/site.ts";
import { useI18n } from "../i18n/LanguageContext.tsx";

export function FloatingActions() {
  const { t, lang } = useI18n();
  return (
    <div className="fixed right-3 bottom-3 z-40 flex flex-col items-end gap-2 sm:right-5 sm:bottom-5">
      <a
        href={`tel:${site.phoneTel}`}
        className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-navy text-parchment shadow-lg md:hidden"
        aria-label={t.floating.call}
      >
        <Phone className="h-6 w-6" aria-hidden="true" />
      </a>
      <a
        href={waLink(lang)}
        target="_blank"
        rel="noreferrer"
        className="inline-flex min-h-14 items-center gap-2 rounded-full bg-[#128C7E] px-4 text-base font-semibold text-white shadow-lg"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.34 4.94L2 22l5.39-1.4a10 10 0 0 0 4.65 1.18h.01c5.46 0 9.89-4.4 9.89-9.83C21.94 6.4 17.5 2 12.04 2zm5.76 14.15c-.24.68-1.4 1.3-1.94 1.38-.5.08-1.12.11-1.81-.11-.42-.14-.95-.31-1.64-.6-2.88-1.24-4.76-4.13-4.9-4.32-.14-.19-1.16-1.54-1.16-2.94s.73-2.08 1-2.37c.24-.28.64-.41 1.02-.41.12 0 .23 0 .33.01.3.01.44-.02.68.52.24.58.82 2 .89 2.15.07.14.12.33.02.52-.1.19-.14.31-.28.48-.14.17-.3.37-.42.5-.14.14-.28.29-.12.55.16.26.7 1.15 1.5 1.86 1.03.92 1.9 1.2 2.16 1.34.26.14.42.12.58-.07.16-.19.66-.77.84-1.03.17-.26.35-.22.58-.13.24.1 1.5.7 1.76.83.26.14.43.19.5.3.06.12.06.67-.18 1.35z"
          />
        </svg>
        {t.floating.whatsapp}
      </a>
    </div>
  );
}
