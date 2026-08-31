import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getDeliveryLocations,
  validatePromoCode,
  checkPaymentConfigured,
} from "@/lib/cms.functions";
import type { DeliveryLocationRow } from "@/lib/db/checkout.server";

export function useDeliveryLocations() {
  return useQuery<DeliveryLocationRow[]>({
    queryKey: ["deliveryLocations"],
    queryFn: () => getDeliveryLocations(),
    // These rarely change — an admin editing them is a rare event, and a
    // stale list for a few minutes just means an outdated fee, not broken
    // checkout, so cache generously.
    staleTime: 5 * 60 * 1000,
  });
}

export function useValidatePromoCode() {
  return useMutation({
    mutationFn: (code: string) => validatePromoCode({ data: { code } }),
  });
}

// Whether a real payment gateway is wired up yet. Always false until
// Flutterwave (or whichever processor) has real API keys — see
// src/lib/payments/. Checkout uses this to decide whether to attempt a
// real charge or fall back to "confirm via WhatsApp".
export function usePaymentConfigured() {
  return useQuery({
    queryKey: ["paymentConfigured"],
    queryFn: () => checkPaymentConfigured(),
    staleTime: 5 * 60 * 1000,
  });
}
