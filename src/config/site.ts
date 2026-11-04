import type { Lang, L10n } from "../types.ts";

/** Single source for phone, WhatsApp and office details. */
export const site = {
  name: "आनंदी Constructions",
  url: "https://aanandiconstructions.in",
  phoneDisplay: "+91 98530 32020",
  phoneTel: "+919853032020",
  whatsapp: "919853032020",
  email: "aanandiconstruction@gmail.com",
  founded: 2024,
  engineer: {
    mr: "इंजि. राजवर्धन इंगवले",
    en: "Er. Rajvardhan Ingawale",
  } satisfies L10n,
  address: {
    mr: "इंगवले लोन कन्सल्टन्सीजवळ, पेठ वडगाव, कोल्हापूर",
    en: "Near Ingawale Loan Consultancy, Peth Vadgaon, Kolhapur",
  } satisfies L10n,
  hours: {
    mr: "सोमवार ते शनिवार, सकाळी ९ ते संध्याकाळी ६. रविवार भेटीने.",
    en: "Monday to Saturday, 9:00 to 18:00. Sunday by appointment.",
  } satisfies L10n,
  map: {
    lat: 16.838,
    lng: 74.314,
    embed:
      "https://maps.google.com/maps?q=Ingawale%20Loan%20Consultancy%2C%20Peth%20Vadgaon%2C%20Kolhapur&z=16&output=embed",
    link: "https://goo.gl/maps/p4gDcGCQaFwhMb318",
  },
  /** Replace these placeholder profiles before launch. */
  socials: {
    instagram: "https://www.instagram.com/anandi_construction?xtok=MTBzb2k2NmE1cjdlaQ==",
  },
  waMessage: {
    mr: "नमस्कार आनंदी Constructions, मला बांधकामाबद्दल बोलायचं आहे.",
    en: "Hello Aanandi Constructions, I would like to talk about a building job.",
  } satisfies L10n,
  heroImage: {
    src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=60",
    srcSet:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=640&q=60 640w, https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=60 1200w, https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=60 1600w",
  },
};

export function waLink(lang: Lang, extra?: string) {
  const text = extra?.trim()
    ? `${site.waMessage[lang]} ${extra.trim()}`
    : site.waMessage[lang];
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}
