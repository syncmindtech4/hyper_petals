import { getSql } from "@/integrations/db/client.server";

export type DeliveryLocationRow = {
  id: string;
  name: string;
  fee_ugx: number;
  sort_order: number;
};

export async function listActiveDeliveryLocations(): Promise<DeliveryLocationRow[]> {
  const sql = getSql();
  const rows = await sql`
    SELECT id, name, fee_ugx, sort_order
    FROM delivery_locations
    WHERE is_active = true
    ORDER BY sort_order ASC
  `;
  return rows as DeliveryLocationRow[];
}

export type PromoCodeResult =
  | { valid: true; code: string; discountType: "flat" | "percent"; discountValue: number }
  | {
      valid: false;
      reason: "not_found" | "inactive" | "expired" | "not_started" | "redemption_limit_reached";
    };

// Validates a promo code against every constraint the schema defines
// (active flag, redemption cap, start/expiry window). Does NOT increment
// redemptions_count here — that happens once an order is actually placed
// with this code (see incrementPromoRedemption), so an abandoned checkout
// doesn't burn a redemption.
export async function validatePromoCode(rawCode: string): Promise<PromoCodeResult> {
  const sql = getSql();
  const code = rawCode.trim().toUpperCase();
  const rows = await sql`
    SELECT code, discount_type, discount_value, is_active, max_redemptions,
      redemptions_count, starts_at, expires_at
    FROM promo_codes
    WHERE code = ${code}
  `;
  const row = rows[0] as
    | {
        code: string;
        discount_type: "flat" | "percent";
        discount_value: number;
        is_active: boolean;
        max_redemptions: number | null;
        redemptions_count: number;
        starts_at: string | null;
        expires_at: string | null;
      }
    | undefined;

  if (!row) return { valid: false, reason: "not_found" };
  if (!row.is_active) return { valid: false, reason: "inactive" };

  const now = Date.now();
  if (row.starts_at && new Date(row.starts_at).getTime() > now) {
    return { valid: false, reason: "not_started" };
  }
  if (row.expires_at && new Date(row.expires_at).getTime() < now) {
    return { valid: false, reason: "expired" };
  }
  if (row.max_redemptions !== null && row.redemptions_count >= row.max_redemptions) {
    return { valid: false, reason: "redemption_limit_reached" };
  }

  return {
    valid: true,
    code: row.code,
    discountType: row.discount_type,
    discountValue: row.discount_value,
  };
}

export async function incrementPromoRedemption(code: string): Promise<void> {
  const sql = getSql();
  await sql`
    UPDATE promo_codes
    SET redemptions_count = redemptions_count + 1
    WHERE code = ${code.trim().toUpperCase()}
  `;
}
