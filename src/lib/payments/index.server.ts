import { flutterwaveProvider } from "./flutterwave.server";
import type { InitiatePaymentParams, InitiatePaymentResult, PaymentProvider } from "./types";

// Swap this line once a real provider is wired up — everything else
// (checkout.tsx, cms.functions.ts) calls the functions below and never
// needs to know which gateway is behind them.
const activeProvider: PaymentProvider = flutterwaveProvider;

export function isPaymentConfigured(): boolean {
  return activeProvider.isConfigured();
}

export async function initiatePayment(
  params: InitiatePaymentParams,
): Promise<InitiatePaymentResult> {
  if (!activeProvider.isConfigured()) {
    return { ok: false, error: `${activeProvider.name} is not configured yet.` };
  }
  return activeProvider.initiate(params);
}

export async function verifyPayment(providerReference: string) {
  return activeProvider.verify(providerReference);
}
