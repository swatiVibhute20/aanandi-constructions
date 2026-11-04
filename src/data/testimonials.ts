import type { Testimonial } from "../types.ts";

export const testimonials: Testimonial[] = [
  {
    id: "patil",
    category: "residential",
    name: { mr: "श्री. रमेश पाटील", en: "Shri. Ramesh Patil" },
    place: { mr: "कोल्हापूर", en: "Kolhapur" },
    work: { mr: "घर", en: "House" },
    quote: {
      mr: "दर वेळी कुठे खर्च होतोय ते सांगितलं. स्वस्तातला कोट नव्हता, पण लपवलेलं काही नव्हतं. चावी दिलेल्या दिवशी घर आमचं झालं.",
      en: "They said where the money was going, every time. It was not the cheap quote, but nothing was hidden. The day they handed over the key, the house was ours.",
    },
  },
  {
    id: "jadhav",
    category: "agricultural",
    name: { mr: "सौ. सुनिता जाधव", en: "Sau. Sunita Jadhav" },
    place: { mr: "सांगली", en: "Sangli" },
    work: { mr: "पोल्ट्री शेड", en: "Poultry shed" },
    quote: {
      mr: "शेडला हवा हवी हे त्यांनी आधीच धरलं. मे महिन्यात आत शिरले तरी गुदमरत नाही. शेताचा रस्ता कामगारांनी खराब केला नाही.",
      en: "They insisted the shed needed air, and they were right. Step inside in May and it does not choke you. The crew left the farm path alone.",
    },
  },
  {
    id: "deshpande",
    category: "agricultural",
    name: { mr: "श्री. विश्वास देशपांडे", en: "Shri. Vishwas Deshpande" },
    place: { mr: "मिरज", en: "Miraj" },
    work: { mr: "कांदा गोदाम", en: "Onion godown" },
    quote: {
      mr: "कांद्याच्या गोदामाला जमीन कोरडी हवी. त्यांनी ती तशी केली. सिमेंटच्या पोत्यांपासून मजुरीपर्यंत यादी लिहून मिळाली.",
      en: "An onion godown needs a dry floor. They built it that way. We got a written list from the cement bags down to the labour.",
    },
  },
  {
    id: "kale",
    category: "residential",
    name: { mr: "सौ. मंगला काळे", en: "Sau. Mangala Kale" },
    place: { mr: "कोल्हापूर", en: "Kolhapur" },
    work: { mr: "जुने घर", en: "Old house" },
    quote: {
      mr: "जुना वाडा पाडायचा नव्हता. जे घट्ट होतं ते ठेवलं, भिजलेलं बदललं. आम्ही घरात राहिलो, काम चालू होतं.",
      en: "We did not want the old house pulled down. What was sound stayed, and what was wet was replaced. We lived there while the work went on.",
    },
  },
  {
    id: "thorat",
    category: "agricultural",
    name: { mr: "श्री. कैलास थोरात", en: "Shri. Kailas Thorat" },
    place: { mr: "सांगली", en: "Sangli" },
    work: { mr: "गोठा", en: "Cattle shed" },
    quote: {
      mr: "गोठ्याचा उतार, गायींची सावली, चाऱ्याची जागा — शेतात राहणाऱ्या माणसासारखं समजून केलं. उगीच शहरी नकाशा आणला नाही.",
      en: "The slope, shade for the cows, a place for fodder — planned the way someone from a farm would. They did not arrive with a city drawing and force it on us.",
    },
  },
];
