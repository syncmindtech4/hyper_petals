export const site = {
  name: "Hyper Petals & Decor",
  full: "Hyper Petals & Decor",
  tagline: "& Decor",
  phone: "+256 790 449 711",
  phoneHref: "tel:+256790449711",
  whatsapp: "+971522901168",
  whatsappMsg: "Hi Hyper Petals & Decor, I'd love to place an order.",
  email: "syncmindtech4@gmail.com",
  address: "Kampala, Uganda",
  hours: "Tue – Sat · 10am – 6pm",
  instagram: "https://instagram.com",
  facebook: "https://facebook.com",
  pinterest: "https://pinterest.com",
};

export const waLink = (msg = site.whatsappMsg) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`;

// Builds a safe wa.me link summarizing a saved order, for the post-checkout
// success page. `phone` should be digits only (with country code, no "+" or
// spaces) — wa.me tolerates a leading "+" but strips it internally; we strip
// it here too so the link is unambiguous either way.
export type OrderWhatsAppSummary = {
  orderId: string;
  customerName?: string;
  items: { name: string; quantity: number; priceUgx: number }[];
  totalUgx: number;
  deliveryLocation: string;
  deliveryDate: string;
};

export function buildOrderWhatsAppUrl(
  order: OrderWhatsAppSummary,
  phone: string = site.whatsapp,
): string {
  const shortId = order.orderId.slice(0, 8).toUpperCase();
  const itemLines = order.items
    .map((i) => `- ${i.name} x${i.quantity} (UGX ${i.priceUgx.toLocaleString()})`)
    .join("\n");

  const message = [
    `Hello Hyper Petals & Decor! Confirming my order #${shortId}.`,
    order.customerName ? `- *Customer*: ${order.customerName}` : null,
    itemLines,
    `- *Delivery*: ${order.deliveryLocation}, ${order.deliveryDate}`,
    `- *Total*: UGX ${order.totalUgx.toLocaleString()}`,
  ]
    .filter(Boolean)
    .join("\n");

  const cleanPhone = phone.replace(/[^\d]/g, "");
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

// whatsapp: "+256790449711",
// email: "hyperpetals.decor@gmail.com",
