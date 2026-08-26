import { getSql } from "@/integrations/db/client.server";
import type { BouquetCustomization } from "@/lib/bouquet-customization";

export type OrderAddOn = { name: string; price: number };

export type OrderRow = {
  id: string;
  product_id: string | null;
  product_name: string;
  size: string;
  size_price_ugx: number;
  quantity: number;
  add_ons: OrderAddOn[];
  customization: BouquetCustomization | null;
  is_gift: boolean;
  recipient_name: string | null;
  recipient_phone: string | null;
  gift_message: string | null;
  delivery_location: string;
  delivery_date: string;
  total_price_ugx: number;
  status: "new" | "confirmed" | "fulfilled" | "cancelled";
  whatsapp_sent: boolean;
  created_at: string;
};

export type NewOrder = {
  productId?: string;
  productName: string;
  size: string;
  sizePriceUgx: number;
  quantity: number;
  addOns: OrderAddOn[];
  customization?: BouquetCustomization | null;
  isGift: boolean;
  recipientName?: string;
  recipientPhone?: string;
  giftMessage?: string;
  deliveryLocation: string;
  deliveryDate: string;
  totalPriceUgx: number;
};

export async function createOrder(input: NewOrder): Promise<OrderRow> {
  const sql = getSql();
  const rows = await sql`
    INSERT INTO orders (
      product_id, product_name, size, size_price_ugx, quantity, add_ons,
      customization, is_gift, recipient_name, recipient_phone, gift_message,
      delivery_location, delivery_date, total_price_ugx
    ) VALUES (
      ${input.productId ?? null}, ${input.productName}, ${input.size}, ${input.sizePriceUgx},
      ${input.quantity}, ${JSON.stringify(input.addOns)}::jsonb,
      ${input.customization ? JSON.stringify(input.customization) : null}::jsonb,
      ${input.isGift}, ${input.recipientName ?? null}, ${input.recipientPhone ?? null},
      ${input.giftMessage ?? null}, ${input.deliveryLocation}, ${input.deliveryDate},
      ${input.totalPriceUgx}
    )
    RETURNING id, product_id, product_name, size, size_price_ugx, quantity, add_ons,
      customization, is_gift, recipient_name, recipient_phone, gift_message,
      delivery_location, delivery_date, total_price_ugx, status, whatsapp_sent, created_at
  `;
  return rows[0] as OrderRow;
}

export async function listOrdersAdmin(): Promise<OrderRow[]> {
  const sql = getSql();
  const rows = await sql`
    SELECT id, product_id, product_name, size, size_price_ugx, quantity, add_ons,
      customization, is_gift, recipient_name, recipient_phone, gift_message,
      delivery_location, delivery_date, total_price_ugx, status, whatsapp_sent, created_at
    FROM orders
    ORDER BY created_at DESC
  `;
  return rows as OrderRow[];
}

export async function updateOrderStatus(id: string, status: OrderRow["status"]): Promise<void> {
  const sql = getSql();
  await sql`UPDATE orders SET status = ${status} WHERE id = ${id}`;
}

// Public: fetch a single order for the post-checkout success page. The id
// is a random UUID acting as a capability token (same trust model Stripe/
// Shopify use for guest order-confirmation links) — no auth required, but
// not listable and not guessable.
export async function getOrderById(id: string): Promise<OrderRow | null> {
  const sql = getSql();
  const rows = await sql`
    SELECT id, product_id, product_name, size, size_price_ugx, quantity, add_ons,
      customization, is_gift, recipient_name, recipient_phone, gift_message,
      delivery_location, delivery_date, total_price_ugx, status, whatsapp_sent, created_at
    FROM orders
    WHERE id = ${id}
  `;
  return (rows[0] as OrderRow | undefined) ?? null;
}

export async function markOrderWhatsAppSent(id: string): Promise<void> {
  const sql = getSql();
  await sql`UPDATE orders SET whatsapp_sent = true WHERE id = ${id}`;
}
