import type { EstimatorAddOn, EstimatorWork } from "../types.ts";

/**
 * Placeholder rates for Kolhapur, Sangli and Miraj, in INR.
 * Adjust every figure to current local market rates before anyone is quoted.
 * Houses and sheds are per square foot. Compound is per running foot of wall
 * about 5 feet high. The gate is not included.
 *
 * Bands follow a rural Maharashtra starting point:
 * residential about ₹1,600–2,800 / sq ft, steel sheds about ₹600–1,200,
 * poultry and cattle about ₹400–900, polyhouse about ₹300–700.
 */

/** Share of the total. These four add up to 1. */
export const breakdownShares = {
  materials: 0.55,
  labour: 0.28,
  design: 0.08,
  misc: 0.09,
} as const;

/** Each floor above the first adds this fraction, for stairs and extra structure. */
export const floorPremium = 0.06;

export const estimatorAddOns: EstimatorAddOn[] = [
  {
    id: "structural",
    mode: "percent",
    min: 0.015,
    max: 0.025,
    title: { mr: "स्ट्रक्चरल डिझाइन", en: "Structural design" },
  },
  {
    id: "elevation",
    mode: "lump",
    min: 8000,
    max: 18000,
    title: { mr: "३डी एलिव्हेशन", en: "3D elevation" },
  },
  {
    id: "interior",
    mode: "perUnit",
    min: 180,
    max: 450,
    title: { mr: "साधी आतील सजावट", en: "Interior, basic" },
  },
  {
    id: "borewell",
    mode: "lump",
    min: 80000,
    max: 150000,
    title: { mr: "बोअर आणि पाण्याची टाकी", en: "Borewell and water tank" },
  },
  {
    id: "mep",
    mode: "percent",
    min: 0.06,
    max: 0.1,
    title: { mr: "वीज आणि नळकाम", en: "Electrical and plumbing" },
  },
];

export const estimatorWorks: EstimatorWork[] = [
  {
    id: "residential",
    serviceId: "homes",
    unit: "sqft",
    minQty: 200,
    maxQty: 8000,
    floors: true,
    title: { mr: "राहतं घर", en: "Residential house" },
    hint: {
      mr: "एकूण बांधलेलं क्षेत्रफळ, चौ. फुटात. किफायतशीर म्हणजे साधी फरशी आणि खिडक्या.",
      en: "Total built-up area in square feet. Economy means a plain floor and plain windows.",
    },
    tiers: {
      basic: { min: 1600, max: 2000 },
      standard: { min: 2000, max: 2400 },
      premium: { min: 2400, max: 2800 },
    },
  },
  {
    id: "commercial",
    serviceId: "structural",
    unit: "sqft",
    minQty: 300,
    maxQty: 20000,
    floors: true,
    title: { mr: "व्यावसायिक इमारत", en: "Commercial building" },
    hint: {
      mr: "दुकान किंवा कार्यालय. एकूण बांधलेलं क्षेत्रफळ धरा.",
      en: "A shop or an office. Use the total built-up area.",
    },
    tiers: {
      basic: { min: 1800, max: 2200 },
      standard: { min: 2200, max: 2700 },
      premium: { min: 2700, max: 3300 },
    },
  },
  {
    id: "industrial",
    serviceId: "industrial",
    unit: "sqft",
    minQty: 400,
    maxQty: 40000,
    floors: false,
    title: { mr: "औद्योगिक शेड", en: "Industrial shed" },
    hint: {
      mr: "पीईबी किंवा स्टील शेड. छताखालचं क्षेत्रफळ धरा.",
      en: "A PEB or steel shed. Measure the area under the roof.",
    },
    tiers: {
      basic: { min: 600, max: 800 },
      standard: { min: 800, max: 1000 },
      premium: { min: 1000, max: 1200 },
    },
  },
  {
    id: "poultry",
    serviceId: "agri",
    unit: "sqft",
    minQty: 200,
    maxQty: 30000,
    floors: false,
    title: { mr: "पोल्ट्री शेड", en: "Poultry shed" },
    hint: {
      mr: "कोंबड्यांचं शेड. बाजूची जाळी या दरात धरली आहे.",
      en: "A poultry shed. Side mesh is inside this rate.",
    },
    tiers: {
      basic: { min: 400, max: 550 },
      standard: { min: 550, max: 720 },
      premium: { min: 720, max: 900 },
    },
  },
  {
    id: "cattle",
    serviceId: "agri",
    unit: "sqft",
    minQty: 200,
    maxQty: 20000,
    floors: false,
    title: { mr: "गोठा", en: "Cattle shed" },
    hint: {
      mr: "गायी किंवा म्हशी. चाऱ्याची जागा वेगळी हवी तर प्रीमियम धरा.",
      en: "Cows or buffaloes. Use premium if you want a separate fodder bay.",
    },
    tiers: {
      basic: { min: 400, max: 550 },
      standard: { min: 550, max: 720 },
      premium: { min: 720, max: 900 },
    },
  },
  {
    id: "godown",
    serviceId: "agri",
    unit: "sqft",
    minQty: 200,
    maxQty: 30000,
    floors: false,
    title: { mr: "साठवण गोदाम", en: "Storage godown" },
    hint: {
      mr: "कांदा, धान्य किंवा माल. ओल अडवणारी फरशी या दरात आहे.",
      en: "Onions, grain or goods. A damp-resistant floor is inside this rate.",
    },
    tiers: {
      basic: { min: 700, max: 900 },
      standard: { min: 900, max: 1150 },
      premium: { min: 1150, max: 1400 },
    },
  },
  {
    id: "polyhouse",
    serviceId: "agri",
    unit: "sqft",
    minQty: 200,
    maxQty: 40000,
    floors: false,
    title: { mr: "पॉलीहाउस", en: "Greenhouse polyhouse" },
    hint: {
      mr: "पॉलिथीन आणि गटर. पंखा आणि फॉगर या दरात नाहीत.",
      en: "Polythene and gutters. Fans and foggers are not in this rate.",
    },
    tiers: {
      basic: { min: 300, max: 420 },
      standard: { min: 420, max: 560 },
      premium: { min: 560, max: 700 },
    },
  },
  {
    id: "compound",
    serviceId: "homes",
    unit: "rft",
    minQty: 20,
    maxQty: 2000,
    floors: false,
    title: { mr: "कंपाउंड भिंत", en: "Compound wall" },
    hint: {
      mr: "सुमारे ५ फूट उंच भिंतीची लांबी, फुटात. गेट वेगळा.",
      en: "Length in feet of a wall about 5 feet high. The gate is extra.",
    },
    tiers: {
      basic: { min: 650, max: 900 },
      standard: { min: 1000, max: 1400 },
      premium: { min: 1600, max: 2200 },
    },
  },
];
