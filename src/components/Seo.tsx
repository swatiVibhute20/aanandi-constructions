import { useEffect } from "react";
import { site } from "../config/site.ts";
import { useI18n } from "../i18n/LanguageContext.tsx";

type SeoProps = {
  title: string;
  description: string;
  path: string;
};

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  const marker = `${attr}:${key}`;
  let el = document.head.querySelector(`meta[data-aanandi="${marker}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("data-aanandi", marker);
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function Seo({ title, description, path }: SeoProps) {
  const { lang } = useI18n();

  useEffect(() => {
    document.title = title;
    document.documentElement.lang = lang;
    const url = `${site.url}${path}`;
    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:locale", lang === "mr" ? "mr_IN" : "en_IN");
    upsertMeta("property", "og:image", site.heroImage.src);
    upsertMeta("name", "twitter:card", "summary_large_image");

    let canonical = document.head.querySelector('link[data-aanandi="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("data-aanandi", "canonical");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);

    const scriptId = "aanandi-jsonld";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "GeneralContractor",
      name: site.name,
      description,
      url: site.url,
      telephone: site.phoneTel,
      email: site.email,
      image: site.heroImage.src,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Near Ingawale Loan Consultancy, Peth Vadgaon",
        addressLocality: "Kolhapur",
        addressRegion: "Maharashtra",
        postalCode: "416112",
        addressCountry: "IN",
      },
      areaServed: "Kolhapur, Sangli and Miraj, Maharashtra",
    });
  }, [title, description, path, lang]);

  return null;
}
