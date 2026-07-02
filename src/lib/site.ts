export const site = {
  name: "Luxe Floral",
  full: "Luxe Floral Designs & Events",
  tagline: "Designs & Events",
  phone: "+234 800 000 0000",
  phoneHref: "tel:+2348000000000",
  whatsapp: "2348000000000",
  whatsappMsg: "Hi Luxe Floral, I'd love to place an order.",
  email: "hello@luxefloral.co",
  address: "Studio 14, Ikoyi · Lagos, Nigeria",
  hours: "Tue – Sat · 10am – 6pm",
  instagram: "https://instagram.com",
  facebook: "https://facebook.com",
  pinterest: "https://pinterest.com",
};

export const waLink = (msg = site.whatsappMsg) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`;
