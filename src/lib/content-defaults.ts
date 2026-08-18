// Default site content — used as fallback if the CMS row is missing.
export type HeroContent = {
  eyebrow: string;
  titleLead: string;
  titleItalic: string;
  titleTail?: string;
  subtitle: string;
  stat1Label: string;
  stat1Value: string;
  stat2Label: string;
  stat2Value: string;
  stat3Label: string;
  stat3Value: string;
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

export const defaultHero: HeroContent = {
  eyebrow: "Kampala · Entebbe · Wakiso · Nationwide Delivery",
  titleLead: "Flowers and celebrations, ",
  titleItalic: "designed like Uganda deserves.",
  subtitle:
    "Bouquets, bridal & baby showers, birthdays, marriage proposals and Kwanjula décor — handcrafted by local florists and stylists, delivered same-day across Kampala.",
  stat1Label: "Events",
  stat1Value: "200+",
  stat2Label: "Delivery",
  stat2Value: "Same day",
  stat3Label: "Mobile Money",
  stat3Value: "MTN · Airtel",
};

export const defaultContact: ContactContent = {
  phone: "+256790449711",
  phoneHref: "tel:++256790449711",
  whatsapp: "+256790449711",
  email: "hyperpetals.decor@gmail.com",
  address: "Kampala, Uganda",
  hours: "Tue – Sat · 10am – 6pm",
  instagram: "https://instagram.com",
};
