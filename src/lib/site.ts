export const site = {
  name: "Hyper Petals & Decor",
  full: "Hyper Petals & Decor",
  tagline: "& Decor",
  phone: "+256 790 449 711",
  phoneHref: "tel:+256790449711",
  whatsapp: "+256790449711",
  whatsappMsg: "Hi Hyper Petals & Decor, I'd love to place an order.",
  email: "hyperpetals.decor@gmail.com",
  address: "Kampala, Uganda",
  hours: "Tue – Sat · 10am – 6pm",
  instagram: "https://instagram.com",
  facebook: "https://facebook.com",
  pinterest: "https://pinterest.com",
};

export const waLink = (msg = site.whatsappMsg) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`;
