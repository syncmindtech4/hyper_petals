import { getSql } from "@/integrations/db/client.server";
import type { BouquetCustomization } from "@/lib/bouquet-customization";

export type OrderAddOn = { name: string; price: number };
export type PaymentMethod = "momo" | "airtel_money" | "card" | "cash_on_delivery";
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export type OrderRow = {
  id: string;
  group_id: string;
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
  delivery_fee_ugx: number;
  promo_code: string | null;
  discount_ugx: number;
  total_price_ugx: number;
  payment_method: PaymentMethod | null;
  payment_status: PaymentStatus;
  status: "new" | "confirmed" | "fulfilled" | "cancelled";
  whatsapp_sent: boolean;
  created_at: string;
};

const ORDER_COLUMNS = `
  id, group_id, product_id, product_name, size, size_price_ugx, quantity, add_ons,
  customization, is_gift, recipient_name, recipient_phone, gift_message,
  delivery_location, delivery_date, delivery_fee_ugx, promo_code, discount_ugx,
  total_price_ugx, payment_method, payment_status, status, whatsapp_sent, created_at
`;

export type NewOrder = {
  groupId?: string;
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
  deliveryFeeUgx?: number;
  promoCode?: string;
  discountUgx?: number;
  totalPriceUgx: number;
  paymentMethod?: PaymentMethod;
};

export async function createOrder(input: NewOrder): Promise<OrderRow> {
  const sql = getSql();
  const rows = await sql`
    INSERT INTO orders (
      group_id, product_id, product_name, size, size_price_ugx, quantity, add_ons,
      customization, is_gift, recipient_name, recipient_phone, gift_message,
      delivery_location, delivery_date, delivery_fee_ugx, promo_code, discount_ugx,
      total_price_ugx, payment_method
    ) VALUES (
      COALESCE(${input.groupId ?? null}::uuid, gen_random_uuid()), ${input.productId ?? null}, ${input.productName},
      ${input.size}, ${input.sizePriceUgx}, ${input.quantity}, ${JSON.stringify(input.addOns)}::jsonb,
      ${input.customization ? JSON.stringify(input.customization) : null}::jsonb,
      ${input.isGift}, ${input.recipientName ?? null}, ${input.recipientPhone ?? null},
      ${input.giftMessage ?? null}, ${input.deliveryLocation}, ${input.deliveryDate},
      ${input.deliveryFeeUgx ?? 0}, ${input.promoCode ?? null}, ${input.discountUgx ?? 0},
      ${input.totalPriceUgx}, ${input.paymentMethod ?? null}
    )
    RETURNING id, group_id, product_id, product_name, size, size_price_ugx, quantity, add_ons,
      customization, is_gift, recipient_name, recipient_phone, gift_message,
      delivery_location, delivery_date, delivery_fee_ugx, promo_code, discount_ugx,
      total_price_ugx, payment_method, payment_status, status, whatsapp_sent, created_at
  `;
  return rows[0] as OrderRow;
}

export async function listOrdersAdmin(): Promise<OrderRow[]> {
  const sql = getSql();
  const rows = await sql`
    SELECT id, group_id, product_id, product_name, size, size_price_ugx, quantity, add_ons,
      customization, is_gift, recipient_name, recipient_phone, gift_message,
      delivery_location, delivery_date, delivery_fee_ugx, promo_code, discount_ugx,
      total_price_ugx, payment_method, payment_status, status, whatsapp_sent, created_at
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
    SELECT id, group_id, product_id, product_name, size, size_price_ugx, quantity, add_ons,
      customization, is_gift, recipient_name, recipient_phone, gift_message,
      delivery_location, delivery_date, delivery_fee_ugx, promo_code, discount_ugx,
      total_price_ugx, payment_method, payment_status, status, whatsapp_sent, created_at
    FROM orders
    WHERE id = ${id}
  `;
  return (rows[0] as OrderRow | undefined) ?? null;
}

export async function markOrderWhatsAppSent(id: string): Promise<void> {
  const sql = getSql();
  await sql`UPDATE orders SET whatsapp_sent = true WHERE id = ${id}`;
}

// Public: fetch every order line-item saved together from one checkout
// (a cart with several products = several rows sharing one group_id).
// Same capability-token trust model as getOrderById above.
export async function getOrderGroup(groupId: string): Promise<OrderRow[]> {
  const sql = getSql();
  const rows = await sql`
    SELECT id, group_id, product_id, product_name, size, size_price_ugx, quantity, add_ons,
      customization, is_gift, recipient_name, recipient_phone, gift_message,
      delivery_location, delivery_date, delivery_fee_ugx, promo_code, discount_ugx,
      total_price_ugx, payment_method, payment_status, status, whatsapp_sent, created_at
    FROM orders
    WHERE group_id = ${groupId}
    ORDER BY created_at ASC
  `;
  return rows as OrderRow[];
}

export async function markGroupWhatsAppSent(groupId: string): Promise<void> {
  const sql = getSql();
  await sql`UPDATE orders SET whatsapp_sent = true WHERE group_id = ${groupId}`;
}
