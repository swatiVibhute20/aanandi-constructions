import type { Project } from "../types.ts";
import { stockSet } from "./images.ts";

const house = stockSet("photo-1600585154340-be6161a56a0c");
const poultryShed = stockSet("photo-1538451825199-8605af521e85");
const godown = stockSet("photo-1586528116311-ad8dd3c8310d");
const cattleShed = stockSet("photo-1673991204144-1573a107c70b");
const oldHouse = stockSet("photo-1649160279236-ab59367f5e84");
const industrialShed = stockSet("photo-1759310347407-b0dbfeb8745d");
const warehouse = stockSet("photo-1553413077-190dd305871c");
const polyhouse = stockSet("photo-1651855833979-80d8d469cc33");

export const projects: Project[] = [
  {
    id: "patil-house",
    category: "residential",
    featured: false,
    title: { mr: "कुटुंबाचं घर", en: "The family house" },
    summary: {
      mr: "दोन मजले, दुपारची बाजू जाड भिंतीने बंद.",
      en: "Two floors, the afternoon side closed with a thicker wall.",
    },
    story: {
      mr: "कोल्हापुरात पूर्व-पश्चिम उघडं घर. उन्हाळ्यात दुपारची बाजू जाड भिंतीने बंद ठेवली, समोर ओसरी ठेवली. दरपत्रकात फरशी आणि खिडक्या वेगळ्या होत्या, शेवटी त्याच आकड्यात काम संपलं.",
      en: "An east-west house in Kolhapur. The afternoon side got a thicker wall, and the front kept its verandah. Flooring and windows were separate lines, and the job closed on that figure.",
    },
    location: { mr: "कोल्हापूर", en: "Kolhapur" },
    year: 2024,
    area: 1680,
    areaUnit: "sqft",
    materials: {
      mr: "आरसीसी चौकट, विटांची भिंत, व्हिट्रिफाइड फरशी, ॲल्युमिनियम खिडक्या",
      en: "RCC frame, brick walls, vitrified tile, aluminium windows",
    },
    imageAlt: {
      mr: "कुटुंबाच्या घरासाठी प्रातिनिधिक फोटो: दोन मजली राहतं घर",
      en: "Representative photo for the family house: a two-storey home",
    },
    ...house,
  },
  {
    id: "jadhav-shed",
    category: "agricultural",
    featured: true,
    title: { mr: "पोल्ट्री शेड", en: "Poultry shed" },
    summary: {
      mr: "बाजूला जाळी, वरून हवा, पावसाळ्यात आत कोरडं.",
      en: "Mesh at the sides, air above, a dry floor in the rains.",
    },
    story: {
      mr: "कोल्हापुरात कोंबड्यांचं शेड. बाजूला जाळी, छताखाली हवा खेळती, आणि पावसाचं पाणी आत येणार नाही असा उतार. शेताचा रस्ता तसाच ठेवला.",
      en: "A poultry shed in Kolhapur. Mesh sides, air under the roof, and a fall that keeps rain out. The farm path was left as it was.",
    },
    location: { mr: "कोल्हापूर", en: "Kolhapur" },
    year: 2025,
    area: 3600,
    areaUnit: "sqft",
    materials: {
      mr: "एमएस ट्रस, जीआय पत्रे, सिमेंट फरशी, बाजूला जाळी",
      en: "MS truss, GI sheets, cement floor, side mesh",
    },
    imageAlt: {
      mr: "पोल्ट्री शेडसाठी प्रातिनिधिक फोटो: छताखाली कोंबड्यांच्या रांगा",
      en: "Representative photo for the poultry shed: poultry rows under a roof",
    },
    ...poultryShed,
  },
  {
    id: "deshpande-godown",
    category: "agricultural",
    featured: false,
    title: { mr: "कांदा गोदाम", en: "Onion godown" },
    summary: {
      mr: "जमीन कोरडी, वर हवा, ट्रॅक्टरला सरळ प्रवेश.",
      en: "A dry floor, air above, and a straight run for the tractor.",
    },
    story: {
      mr: "कोल्हापुरात कांदा साठवायचं गोदाम. जमिनीखालची ओल अडवली, वरच्या बाजूने हवा ठेवली. ट्रॅक्टरला वळायला मागे जागा सोडली. सिमेंटपासून मजुरीपर्यंत यादी दिली.",
      en: "An onion godown in Kolhapur. Damp was kept under the floor and air was kept above it. There is room behind for a tractor to turn. The list ran from cement to labour.",
    },
    location: { mr: "कोल्हापूर", en: "Kolhapur" },
    year: 2023,
    area: 2800,
    areaUnit: "sqft",
    materials: {
      mr: "प्लिंथसह फरशी, स्टील ट्रस, हवेशीर पत्रे",
      en: "Raised floor, steel truss, ventilated sheeting",
    },
    imageAlt: {
      mr: "कांदा गोदामासाठी प्रातिनिधिक फोटो: साठवणुकीचं गोदाम",
      en: "Representative photo for the onion godown: a storage warehouse",
    },
    ...godown,
  },
  {
    id: "kale-wada",
    category: "residential",
    featured: false,
    title: { mr: "वाड्याची डागडुजी", en: "House repairs" },
    summary: {
      mr: "लाकडी कडी ठेवल्या, भिजलेला मागील भाग बदलला.",
      en: "The timber frames stayed. The wet rear wall was rebuilt.",
    },
    story: {
      mr: "कोल्हापुरात जुना वाडा पूर्ण पाडला नाही. जे घट्ट होतं ते ठेवलं, भिजलेला मागील भाग बदलला. कुटुंब घरात राहिलं. काम आणि जेवण एकाच आवारात चाललं.",
      en: "The old house at Kolhapur was not pulled down. What was sound stayed, and the wet rear was rebuilt. The family lived in. Work and meals shared the same court.",
    },
    location: { mr: "कोल्हापूर", en: "Kolhapur" },
    year: 2024,
    area: 980,
    areaUnit: "sqft",
    materials: {
      mr: "जुने लाकूड राखून, नवीन प्लास्टर, स्नानगृहाची दुरुस्ती",
      en: "Old timber kept, new plaster, bathroom repaired",
    },
    imageAlt: {
      mr: "वाड्यासाठी प्रातिनिधिक फोटो: ओसरी असलेलं जुने घर",
      en: "Representative photo for the repaired house: an old house with a porch",
    },
    ...oldHouse,
  },
  {
    id: "thorat-shed",
    category: "agricultural",
    featured: false,
    title: { mr: "गोठा", en: "Cattle shed" },
    summary: {
      mr: "गायींना सावली, चारा वेगळा, पाणी बाहेर.",
      en: "Shade for the cows, fodder apart, water sent outside.",
    },
    story: {
      mr: "कोल्हापुरात गोठा. गायींना सावली, चाऱ्याची जागा वेगळी, आणि धुतलेलं पाणी बाहेर जाईल असा उतार. शहरी नकाशा आणला नाही — शेतातल्या सवयीभोवती बसवलं.",
      en: "A cattle shed in Kolhapur. Shade for the cows, a separate fodder bay, and a fall that sends wash-water out. No city plan — it follows how the farm already works.",
    },
    location: { mr: "कोल्हापूर", en: "Kolhapur" },
    year: 2025,
    area: 1500,
    areaUnit: "sqft",
    materials: {
      mr: "आरसीसी खांब, जीआय छत, खडबडीत फरशी",
      en: "RCC posts, GI roof, broom-finished floor",
    },
    imageAlt: {
      mr: "गोठ्यासाठी प्रातिनिधिक फोटो: धातूच्या छताचं शेड",
      en: "Representative photo for the cattle shed: a shed with a metal roof",
    },
    ...cattleShed,
  },
  {
    id: "satara-shed",
    category: "industrial",
    featured: false,
    title: { mr: "वर्कशॉप शेड", en: "Workshop shed" },
    summary: {
      mr: "स्टील ट्रस, पत्रा, आणि ट्रकला सरळ प्रवेश.",
      en: "A steel truss, sheet, and a straight run for the truck.",
    },
    story: {
      mr: "कोल्हापुरात वर्कशॉप. ट्रस आणि पत्र्याचा प्रकार लिहून ठरवला. शटरची रुंदी ट्रकच्या मापावर. फरशीचा उतार आतून बाहेर.",
      en: "A workshop in Kolhapur. Truss and sheet were chosen in writing. The shutter width follows the truck. The floor falls from inside to out.",
    },
    location: { mr: "कोल्हापूर", en: "Kolhapur" },
    year: 2025,
    area: 4200,
    areaUnit: "sqft",
    materials: {
      mr: "स्टील ट्रस, जीआय पत्रे, सिमेंट फरशी, रोलिंग शटर",
      en: "Steel truss, GI sheets, cement floor, rolling shutter",
    },
    imageAlt: {
      mr: "वर्कशॉप शेडसाठी प्रातिनिधिक फोटो: पत्रा लावलेलं औद्योगिक शेड",
      en: "Representative photo for the workshop shed: an industrial shed in metal sheet",
    },
    ...industrialShed,
  },
  {
    id: "kolhapur-store",
    category: "industrial",
    featured: false,
    title: { mr: "कोल्हापूर माल गोदाम", en: "Kolhapur goods godown" },
    summary: {
      mr: "उंच छत, रॅकची जागा, आणि कोरडी फरशी.",
      en: "A high roof, room for racks, and a dry floor.",
    },
    story: {
      mr: "कोल्हापुरात मालाचं गोदाम. उंची रॅकला पुरेशी, फरशी ओल अडवणारी, आणि लोडिंगसाठी समोर उघडं. सिमेंटपासून मजुरीपर्यंत यादी दिली.",
      en: "A goods godown in Kolhapur. The height clears the racks, the floor keeps damp out, and the front is open for loading. The list ran from cement to labour.",
    },
    location: { mr: "कोल्हापूर", en: "Kolhapur" },
    year: 2024,
    area: 6400,
    areaUnit: "sqft",
    materials: {
      mr: "स्टील फ्रेम, उंच छत, इंडस्ट्रियल फरशी",
      en: "Steel frame, high roof, industrial floor",
    },
    imageAlt: {
      mr: "कोल्हापूर गोदामासाठी प्रातिनिधिक फोटो: सामान साठवलेलं गोदाम",
      en: "Representative photo for the Kolhapur godown: a warehouse of stored goods",
    },
    ...warehouse,
  },
  {
    id: "pune-polyhouse",
    category: "agricultural",
    featured: false,
    title: { mr: "पॉलीहाउस", en: "Polyhouse" },
    summary: {
      mr: "गटर, पॉलिथीन, आणि आत हवा खेळती.",
      en: "Gutters, polythene, and air moving inside.",
    },
    story: {
      mr: "कोल्हापुरात पॉलीहाउस. चौकट आणि गटर आधी, पॉलिथीन नंतर. पाणी छतावर थांबू नये म्हणून उतार ठेवला. पंखा वेगळ्या बिलात.",
      en: "A polyhouse in Kolhapur. Frame and gutters first, polythene after. The fall keeps water off the roof. Fans were a separate bill.",
    },
    location: { mr: "कोल्हापूर", en: "Kolhapur" },
    year: 2025,
    area: 8000,
    areaUnit: "sqft",
    materials: {
      mr: "जीआय चौकट, यूव्ही पॉलिथीन, गटर",
      en: "GI frame, UV polythene, gutters",
    },
    imageAlt: {
      mr: "पॉलीहाउससाठी प्रातिनिधिक फोटो: काचेसारखं हरितगृह",
      en: "Representative photo for the polyhouse: a glazed growing house",
    },
    ...polyhouse,
  },
];
