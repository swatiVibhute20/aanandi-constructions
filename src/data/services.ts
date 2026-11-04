import type { L10n, Service } from "../types.ts";
import { stockSet } from "./images.ts";

function shot(photoId: string, imageAlt: L10n) {
  return { ...stockSet(photoId), imageAlt };
}

export const services: Service[] = [
  {
    id: "autocad",
    icon: "draft",
    accent: "kumkum",
    title: { mr: "ऑटोकॅड ड्राफ्टिंग", en: "AutoCAD drafting" },
    summary: {
      mr: "प्लॅन, सेक्शन आणि एलिव्हेशन — मोजमापांसह, छापून आणि फाइलने.",
      en: "Plans, sections and elevations, with dimensions, on paper and as a file.",
    },
    body: {
      mr: "तोंडी सांगितलेला प्लॅन साइटवर चुकतो. आम्ही खोल्या, उघडी आणि भिंतीची जाडी रेखाटतो. नगरपालिकेसाठी जो संच हवा तो, आणि साइटवर वापरता येईल तो, दोन्ही देतो.",
      en: "A plan that lives only in talk goes wrong on site. We draw the rooms, the openings and the wall thickness. You get the set a council asks for, and the set the site can build from.",
    },
    includes: [
      { mr: "प्लॅन, सेक्शन, एलिव्हेशन", en: "Plan, section and elevation" },
      { mr: "मोजमाप आणि खोलीचं क्षेत्रफळ", en: "Dimensions and room areas" },
      { mr: "DWG आणि PDF", en: "DWG and PDF" },
      { mr: "एक फेरी दुरुस्त्या", en: "One round of corrections" },
    ],
    duration: { mr: "साधारण ७ ते १५ दिवस", en: "About 7 to 15 days" },
    images: [
      shot("photo-1508337323540-f5d861907573", {
        mr: "स्टीलच्या चौकटीचं रेखाटन दिसणारी इमारत",
        en: "A building whose steel frame reads like a drawing",
      }),
    ],
  },
  {
    id: "structural",
    icon: "columns",
    accent: "terracotta",
    title: { mr: "स्ट्रक्चरल डिझाइन", en: "Structural design" },
    summary: {
      mr: "स्लॅब, बीम, स्तंभ. लोखंडाची यादी लिहून.",
      en: "Slab, beam and column. The steel list written down.",
    },
    body: {
      mr: "किती मिलिमीटर लोखंड आणि स्लॅब किती जाड, हे तोंडी नको. ड्रॉइंग आणि बार यादी मिळते. काळ्या जमिनीवर पाया किती खोल, ते सांगूनच पुढे जातो.",
      en: "Millimetres of steel and the slab thickness are not a spoken aside. You get a drawing and a bar list. How deep the foundation goes in black soil is said before anyone digs.",
    },
    includes: [
      { mr: "पाया, स्लॅब, बीम, कॉलम", en: "Foundation, slab, beam and column" },
      { mr: "बार बेंडिंग यादी", en: "Bar-bending schedule" },
      { mr: "जिना", en: "Staircase" },
      { mr: "क्युरिंग किती दिवस, ते लिहून", en: "Curing days written down" },
    ],
    duration: { mr: "घराच्या आकारावर २ ते ४ आठवडे", en: "2 to 4 weeks, by the size of the house" },
    images: [
      shot("photo-1507486076008-3c60cfcce36f", {
        mr: "स्टील बीमची जाळी",
        en: "A lattice of steel beams",
      }),
    ],
  },
  {
    id: "estimation",
    icon: "calculator",
    accent: "kumkum",
    title: { mr: "अंदाजपत्रक व खर्च नियोजन", en: "Estimation and costing" },
    summary: {
      mr: "वीट, वाळू, लोखंड आणि मजुरी वेगळ्या. काय दरात नाही तेही वेगळं.",
      en: "Brick, sand, steel and labour listed apart. What is outside the rate, too.",
    },
    body: {
      mr: "एकूण आकडा पुरेसा नसतो. टप्प्याटप्प्याने किती निघेल, आणि बाजारभाव बदलला तर कोणती ओळ बदलेल, ते पत्रकात दिसतं. हा अंतिम कोट नाही — साइट पाहिल्यावर पक्का होतो.",
      en: "A single total is not enough. The sheet shows what each stage costs, and which line moves if the market moves. It is not a final quote — it firms up after a site visit.",
    },
    includes: [
      { mr: "साहित्याची यादी", en: "A materials list" },
      { mr: "मजुरी वेगळी", en: "Labour on its own line" },
      { mr: "टप्प्यांचे बिल", en: "Bills by stage" },
      { mr: "काय दरात नाही, ती यादी", en: "A list of what the rate leaves out" },
    ],
    duration: { mr: "ड्रॉइंग आल्यावर ४ ते ८ दिवस", en: "4 to 8 days once the drawing is in" },
    images: [
      shot("photo-1600585154340-be6161a56a0c", {
        mr: "अंदाज ज्या घरासाठी काढला जातो, त्या प्रकारचं घर",
        en: "The kind of house an estimate is drawn for",
      }),
    ],
  },
  {
    id: "elevation",
    icon: "box",
    accent: "terracotta",
    title: { mr: "३डी एलिव्हेशन", en: "3D elevations" },
    summary: {
      mr: "घर कसं दिसेल, ते वीट लावण्याआधी पाहा.",
      en: "See the house before a brick is laid.",
    },
    body: {
      mr: "समोरची बाजू, रंग आणि छज्जा. दोन-तीन पर्याय दाखवतो. आवडलेला पर्याय प्लॅनमध्ये बसवतो, जेणेकरून साइटवर दुसरंच घर उभं राहू नये.",
      en: "The front, the colour and the chhajja. Two or three options. The one you keep is drawn back into the plan, so the site does not grow a different house.",
    },
    includes: [
      { mr: "बाहेरील ३डी दृश्य", en: "An exterior 3D view" },
      { mr: "दोन रंगांचे पर्याय", en: "Two colour options" },
      { mr: "रात्रीचा दिवा, मागितला तर", en: "A night view if you ask" },
      { mr: "प्लॅनशी जुळवून घेणं", en: "Matched back to the plan" },
    ],
    duration: { mr: "साधारण ५ ते १० दिवस", en: "About 5 to 10 days" },
    images: [
      shot("photo-1600596542815-ffad4c1539a9", {
        mr: "बाहेरील बाजू दिसणारं घर",
        en: "A house seen from the front",
      }),
      shot("photo-1713365860516-256d20dbb7e0", {
        mr: "लाकडी फरशी असलेली बैठक",
        en: "A living room with a timber floor",
      }),
    ],
  },
  {
    id: "industrial",
    icon: "factory",
    accent: "terracotta",
    title: { mr: "औद्योगिक शेड", en: "Industrial sheds" },
    summary: {
      mr: "पीईबी किंवा स्टील. उतार, दरवाजा आणि ट्रकची जागा आधी.",
      en: "PEB or steel. Slope, doors and room for a truck, drawn first.",
    },
    body: {
      mr: "कारखाना, वर्कशॉप किंवा माल. पत्र्याचा प्रकार, ट्रस आणि फरशीचा उतार लिहून ठरवतो. ट्रकला वळायला मागे जागा सोडतो.",
      en: "A workshop or goods. Sheet type, truss and floor fall are decided in writing. There is room behind for a truck to turn.",
    },
    includes: [
      { mr: "स्टील ट्रस किंवा पीईबी", en: "Steel truss or PEB" },
      { mr: "पत्रे आणि गटर", en: "Sheets and gutters" },
      { mr: "शटर आणि फरशीचा उतार", en: "Shutters and a floor fall" },
      { mr: "लेखी अंदाज", en: "A written estimate" },
    ],
    duration: { mr: "साधारण ६ ते १४ आठवडे", en: "About 6 to 14 weeks" },
    images: [
      shot("photo-1759310347407-b0dbfeb8745d", {
        mr: "पत्रा लावलेलं औद्योगिक शेड",
        en: "An industrial shed clad in metal sheet",
      }),
    ],
  },
  {
    id: "agri",
    icon: "tractor",
    accent: "leaf",
    title: { mr: "शेतीसाठी शेड", en: "Agricultural sheds" },
    summary: {
      mr: "कुक्कुटपालन, गोठा, गोदाम आणि पॉलीहाउस. हवा आणि कोरडी जमीन.",
      en: "Poultry, cattle, storage and a polyhouse. Air, and a dry floor.",
    },
    body: {
      mr: "शेड म्हणजे चार खांब आणि पत्रं एवढंच नाही. वारा, पावसाचं पाणी आणि ट्रॅक्टरला वळायची जागा आधी काढतो. गोदामाची फरशी ओल अडवते.",
      en: "A shed is more than four posts and a sheet. Breeze, rainwater and room for a tractor to turn are drawn first. A godown floor keeps damp out.",
    },
    includes: [
      { mr: "पोल्ट्री, गोठा किंवा गोदाम", en: "Poultry, cattle or a godown" },
      { mr: "पॉलीहाउसची चौकट", en: "A polyhouse frame" },
      { mr: "फरशीचा उतार आणि निचरा", en: "Floor fall and drainage" },
      { mr: "हवा खेळती राहील अशी उंची", en: "Eaves high enough for moving air" },
    ],
    duration: { mr: "साधारण ३ ते ८ आठवडे", en: "About 3 to 8 weeks" },
    images: [
      shot("photo-1673991204144-1573a107c70b", {
        mr: "धातूच्या छताचं शेड",
        en: "A shed with a metal roof",
      }),
      shot("photo-1538451825199-8605af521e85", {
        mr: "छताखाली कोंबड्यांचं शेड",
        en: "A poultry shed under a roof",
      }),
    ],
  },
  {
    id: "homes",
    icon: "home",
    accent: "kumkum",
    title: { mr: "घर बांधकाम", en: "House construction" },
    summary: {
      mr: "नवीन घर, ओसरी किंवा बंगला — पायापासून रंगापर्यंत, एकच जबाबदारी.",
      en: "A new house, a front verandah or a bungalow — one person accountable from foundation to paint.",
    },
    body: {
      mr: "काळ्या जमिनीवर पाया किती खोल, हे आम्ही सांगतो. खोल्यांची दिशा उन्हाळा आणि पाऊस पाहून ठेवतो. सिमेंट, वाळू, वीट आणि मजुरी दरपत्रकात वेगळ्या दिसतात.",
      en: "We say how deep the foundation needs to go in black soil. Rooms are turned for summer heat and the rain. Cement, sand, brick and labour sit on separate lines.",
    },
    includes: [
      { mr: "पाया, आरसीसी, वीटकाम, प्लास्टर", en: "Foundation, RCC, brickwork and plaster" },
      { mr: "फरशी, दरवाजे आणि खिडक्या", en: "Flooring, doors and windows" },
      { mr: "लेखी अंदाज आणि टप्प्यांची बिलं", en: "A written estimate and bills by stage" },
      { mr: "कंपाउंड, मागितला तर वेगळा", en: "A compound wall, billed apart if you ask" },
    ],
    duration: { mr: "साधारण ८ ते १४ महिने", en: "About 8 to 14 months" },
    images: [
      shot("photo-1680487741021-370449ba69da", {
        mr: "एकमजली घर, समोर ड्राइव्हवे",
        en: "A single-storey house with a front drive",
      }),
      shot("photo-1713365860516-256d20dbb7e0", {
        mr: "उंच खिडक्या आणि लाकडी फरशी असलेली बैठक",
        en: "A living room with tall windows and a timber floor",
      }),
    ],
  },
  {
    id: "renovation",
    icon: "hammer",
    accent: "terracotta",
    title: { mr: "डागडुजी", en: "Renovation" },
    summary: {
      mr: "जुने घर पाडायचं नसेल, तर जे राहील ते राखतो.",
      en: "If the old house should stay, we keep what can stay.",
    },
    body: {
      mr: "राहत असताना काम होईल का, ते आधी सांगतो. भिंत भिजत असेल तर कारण शोधतो. फक्त वरचा रंग लावून सोडत नाही.",
      en: "We say first whether you can live in the house while we work. If a wall is drinking water, we look for the cause. A coat of paint is not the repair.",
    },
    includes: [
      { mr: "भेगा, गळती आणि तुटलेला प्लास्टर", en: "Cracks, leaks and failed plaster" },
      { mr: "छत, ओसरी आणि स्नानगृह", en: "Roof, verandah and bathroom" },
      { mr: "राहून काम करण्याची योजना", en: "A plan for living on site" },
      { mr: "काय ठेवायचं, काय बदलायचं — लेखी", en: "A written list of what stays and what goes" },
    ],
    duration: { mr: "कामानुसार ३ ते १६ आठवडे", en: "3 to 16 weeks, by the scope" },
    images: [
      shot("photo-1649160279236-ab59367f5e84", {
        mr: "ओसरी असलेलं जुने घर",
        en: "An old house with a front porch",
      }),
    ],
  },
];
