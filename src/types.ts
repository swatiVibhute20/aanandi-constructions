export type Lang = "mr" | "en";

export type L10n = { mr: string; en: string };

export type ServiceIcon =
  | "draft"
  | "columns"
  | "calculator"
  | "box"
  | "factory"
  | "tractor"
  | "home"
  | "hammer";

export type ServiceAccent = "kumkum" | "leaf" | "terracotta";

export type ServiceImage = {
  image: string;
  imageSrcSet: string;
  imageAlt: L10n;
};

export type Service = {
  id: string;
  icon: ServiceIcon;
  accent: ServiceAccent;
  title: L10n;
  summary: L10n;
  body: L10n;
  includes: L10n[];
  duration: L10n;
  images: ServiceImage[];
};

export type ProjectCategory = "residential" | "industrial" | "agricultural";

export type Project = {
  id: string;
  category: ProjectCategory;
  featured: boolean;
  title: L10n;
  summary: L10n;
  story: L10n;
  location: L10n;
  year: number;
  area: number;
  areaUnit: "sqft" | "rft";
  materials: L10n;
  image: string;
  imageSrcSet: string;
  imageAlt: L10n;
};

export type Testimonial = {
  id: string;
  category: ProjectCategory;
  name: L10n;
  place: L10n;
  work: L10n;
  quote: L10n;
};

export type StoredReview = {
  id: string;
  name: string;
  place: string;
  category: ProjectCategory;
  quote: string;
  createdAt: string;
};

export type TierId = "basic" | "standard" | "premium";

export type AddOnId = "structural" | "elevation" | "interior" | "borewell" | "mep";

export type AddOnMode = "percent" | "lump" | "perUnit";

export type BreakdownId = "materials" | "labour" | "design" | "misc";

export type EstimatorWork = {
  id: string;
  serviceId: string;
  unit: "sqft" | "rft";
  minQty: number;
  maxQty: number;
  /** Extra floors change the figure only for houses and commercial buildings. */
  floors: boolean;
  title: L10n;
  hint: L10n;
  tiers: Record<TierId, { min: number; max: number }>;
};

export type EstimatorAddOn = {
  id: AddOnId;
  mode: AddOnMode;
  min: number;
  max: number;
  title: L10n;
};

export type CounterStat = {
  id: string;
  value: number;
  label: L10n;
};

export type Reason = {
  id: string;
  title: L10n;
  body: L10n;
};

export type Founder = {
  name: L10n;
  role: L10n;
  quote: L10n;
  paragraphs: L10n[];
};

export type WorkStep = {
  id: string;
  title: L10n;
  body: L10n;
};

export type EnquiryInput = {
  name: string;
  phone: string;
  place: string;
  serviceId: string;
  message: string;
  lang: Lang;
  estimate?: {
    workId: string;
    tier: TierId;
    quantity: number;
    min: number;
    max: number;
  };
};

export type StoredEnquiry = EnquiryInput & {
  id: string;
  createdAt: string;
};
