import { site } from "../config/site.ts";
import type { CounterStat, Founder, L10n, Reason, WorkStep } from "../types.ts";

export const counters: CounterStat[] = [
  { id: "projects", value: 5, label: { mr: "पूर्ण प्रकल्प", en: "Projects completed" } },
  { id: "years", value: 2, label: { mr: "वर्षांचा अनुभव", en: "Years of experience" } },
  { id: "clients", value: 5, label: { mr: "समाधान झालेली कुटुंबं", en: "Happy clients" } },
  { id: "sheds", value: 3, label: { mr: "शेड आणि गोदामं", en: "Sheds built" } },
];

export const reasons: Reason[] = [
  {
    id: "pricing",
    title: { mr: "पारदर्शक दर", en: "Transparent pricing" },
    body: {
      mr: "वीट, वाळू, लोखंड आणि मजुरी वेगळ्या दिसतात. बदल झाला तर तो लिहून ठेवतो, तोंडी सांगत नाही.",
      en: "Brick, sand, steel and labour are listed apart. If something changes, it is written down.",
    },
  },
  {
    id: "time",
    title: { mr: "वेळेवर काम", en: "On-time delivery" },
    body: {
      mr: "पावसाळ्याआधी प्लास्टर करायचं म्हटलं, तर तो दिवस डायरीत असतो. उशीर झाला तर आधी फोन.",
      en: "If plaster is promised before the rains, that date is in the diary. If we slip, we call first.",
    },
  },
  {
    id: "materials",
    title: { mr: "दर्जेदार साहित्य", en: "Quality materials" },
    body: {
      mr: "ब्रँडच्या पिशव्या साइटवर दिसतात. पुरवठादार देत असेल तर बिलं तुमच्या नावाने.",
      en: "Branded bags stay visible on site. Bills are in your name when the supplier will write them that way.",
    },
  },
  {
    id: "local",
    title: { mr: "स्थानिक समज", en: "Local understanding" },
    body: {
      mr: "काळी जमीन, उन्हाळ्याची दिशा, ट्रॅक्टरचा रस्ता आणि पीक काढणीचा हंगाम — काम या सगळ्याभोवती बसवतो.",
      en: "Black soil, the hot-season sun, the tractor path and harvest time — the job is planned around them.",
    },
  },
];

export const founder: Founder = {
  name: site.engineer,
  role: { mr: "सिव्हिल इंजिनिअर", en: "Civil engineer" },
  quote: {
    mr: "बिल लपवणं हुशारी नाही. तो विश्वास तुटतो.",
    en: "Hiding a bill is not cleverness. It breaks trust.",
  },
  paragraphs: [
    {
      mr: "इंजि. राजवर्धन इंगवले पेठ वडगाव, कोल्हापूर येथील सिव्हिल इंजिनिअर आहेत. त्यांना २ वर्षांचा अनुभव आहे. काम घरं, शेड, गोदामं आणि डागडुजी — कोल्हापूर परिसरात.",
      en: "Er. Rajvardhan Ingawale is a civil engineer in Peth Vadgaon, Kolhapur, with 2 years of experience. The work is houses, sheds, godowns and repairs around Kolhapur.",
    },
    {
      mr: "ते स्वतः साइट पाहतात. काम सुरू होण्याआधी दर लिहून दिला जातो.",
      en: "He visits the site himself. The rate is written down before the work starts.",
    },
  ],
};

export const steps: WorkStep[] = [
  {
    id: "visit",
    title: { mr: "साइट पाहणी", en: "Site visit" },
    body: {
      mr: "जमीन, रस्ता आणि जुना बांध पाहतो. फोनवरील अंदाज पुरेसा नसतो.",
      en: "We look at the soil, the road and any old building. A phone estimate is not enough.",
    },
  },
  {
    id: "drawing",
    title: { mr: "डिझाइन आणि ड्रॉइंग", en: "Design and drawing" },
    body: {
      mr: "प्लॅन, स्ट्रक्चर आणि हवं तर ३डी एलिव्हेशन. साइटवर दुसरंच घर उभं राहू नये म्हणून.",
      en: "The plan, the structure and a 3D elevation if you want one, so the site does not grow a different house.",
    },
  },
  {
    id: "estimate",
    title: { mr: "लेखी अंदाज", en: "Estimate" },
    body: {
      mr: "टप्पे आणि साहित्याची यादी. काय दरात आहे, काय नाही, ते वेगळं.",
      en: "Stages and a materials list. What is inside the rate, and what is not, sits apart.",
    },
  },
  {
    id: "build",
    title: { mr: "बांधकाम", en: "Construction" },
    body: {
      mr: "टप्प्याटप्प्याने बिल. शेवटी साफ जागा आणि उरलेल्या कामाची यादी.",
      en: "Bills at each stage. At the end, a clean site and a list of anything still open.",
    },
  },
];

export const serviceAreas: L10n[] = [
  { mr: "कोल्हापूर", en: "Kolhapur" },
];
