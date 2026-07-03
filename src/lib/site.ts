export const site = {
  name: "Luxe Floral",
  full: "Luxe Floral Designs & Events",
  tagline: "Designs & Events",
  phone: "+256 700 000 000",
  phoneHref: "tel:+256700000000",
  whatsapp: "256700000000",
  whatsappMsg: "Hi Luxe Floral, I'd love to place an order.",
  email: "hello@luxefloral.co",
  address: "Kampala, Uganda",
  hours: "Tue – Sat · 10am – 6pm",
  instagram: "https://instagram.com",
  facebook: "https://facebook.com",
  pinterest: "https://pinterest.com",
};

export const waLink = (msg = site.whatsappMsg) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`;
