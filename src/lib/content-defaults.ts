// Default site content — used as fallback if the CMS row is missing.
export type HeroContent = {
  eyebrow: string;
  titleLead: string;
  titleItalic: string;
  titleTail: string;
  subtitle: string;
  stat1Label: string; stat1Value: string;
  stat2Label: string; stat2Value: string;
  stat3Label: string; stat3Value: string;
};

export type ContactContent = {
  phone: string;
  phoneHref: string;
  whatsapp: string;
  email: string;
  address: string;
  hours: string;
  instagram: string;
};

export type ServiceItem = {
  title: string;
  price: string;
  body: string;
  includes: string[];
};

export type ServicesContent = {
  heading: string;
  subtitle: string;
  items: ServiceItem[];
};

export const defaultHero: HeroContent = {
  eyebrow: "Luxe Floral · Est. Kampala",
  titleLead: "Flowers, arranged for",
  titleItalic: "the moments",
  titleTail: "that matter.",
  subtitle:
    "Romantic, luxury bouquets and full-service event florals — designed by hand in our Kampala studio and delivered across Uganda.",
  stat1Label: "Events", stat1Value: "120+",
  stat2Label: "Delivery", stat2Value: "Same day",
  stat3Label: "Since", stat3Value: "2019",
};

export const defaultContact: ContactContent = {
  phone: "+256 700 000 000",
  phoneHref: "tel:+256700000000",
  whatsapp: "256700000000",
  email: "hello@luxefloral.co",
  address: "Kampala, Uganda",
  hours: "Tue – Sat · 10am – 6pm",
  instagram: "https://instagram.com",
};

export const defaultServices: ServicesContent = {
  heading: "Florals for birthdays, showers & proposals.",
  subtitle:
    "From surprise proposals to milestone celebrations, we design and install floral moments that feel like an extension of you.",
  items: [
    { title: "Birthday Parties", price: "From UGX 450,000",
      body: "From sweet sixteen surprises to milestone celebrations — bold backdrops, table florals, and cake table styling that set the tone for an unforgettable party.",
      includes: ["Theme & palette design","Backdrop & balloon florals","Table centerpieces","Cake table styling"] },
    { title: "Baby Showers", price: "From UGX 380,000",
      body: "Soft, dreamy installations in pastel or gender-neutral palettes. Thoughtful details that make the mum-to-be feel truly celebrated.",
      includes: ["Mood board & concept","Welcome arch or backdrop","Guest table florals","Gift & dessert table styling"] },
    { title: "Wedding Proposals", price: "From UGX 280,000",
      body: "Intimate, romantic settings designed to make the moment unforgettable. From private dinners to surprise garden setups — one question, one yes.",
      includes: ["Venue scouting advice","Romantic floral setup","Candle & prop styling","On-site installation"] },
  ],
};
