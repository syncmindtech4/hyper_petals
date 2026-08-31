// Flutterwave is the default stub here because it's the most common
// aggregator covering MTN MoMo + Airtel Money + cards for Uganda in one
// integration — swap this whole file out if the client picks a different
// processor (e.g. Pesapal, DPO); the shape to implement is `PaymentProvider`
// in ./types.ts.
//
// TODO once the client provides Flutterwave credentials:
//   1. `npm install flutterwave-node-v3` (or call the REST API directly with fetch).
//   2. Add to .env:
//        FLUTTERWAVE_PUBLIC_KEY=...
//        FLUTTERWAVE_SECRET_KEY=...
//        FLUTTERWAVE_ENCRYPTION_KEY=...
//   3. Implement `initiate`: call Flutterwave's "Standard" hosted-checkout
//      endpoint (POST https://api.flutterwave.com/v3/payments) with
//      amount/currency/redirect_url/customer, return the `data.link` they
//      give back as `redirectUrl`.
//   4. Implement `verify`: call GET
//      https://api.flutterwave.com/v3/transactions/{id}/verify and check
//      `data.status === "successful"` and `data.amount`/`data.currency`
//      match what was charged, before trusting it.
//   5. Add a webhook route (e.g. src/routes/api.webhooks.flutterwave.ts)
//      that calls `verify` and then `updateOrderStatus`/sets
//      payment_status = 'paid' on the matching group_id — don't rely on
//      the redirect alone, since a customer can close the tab before it fires.
//
// Until those env vars are set, `isConfigured()` returns false and the app
// falls back to the WhatsApp-confirmation flow (payment_status stays
// 'pending', confirmed manually) — see checkout.tsx.

import type {
  PaymentProvider,
  InitiatePaymentParams,
  InitiatePaymentResult,
  VerifyPaymentResult,
} from "./types";

export const flutterwaveProvider: PaymentProvider = {
  name: "flutterwave",

  isConfigured() {
    return Boolean(
      process.env.FLUTTERWAVE_SECRET_KEY &&
      process.env.FLUTTERWAVE_PUBLIC_KEY &&
      process.env.FLUTTERWAVE_ENCRYPTION_KEY,
    );
  },

  async initiate(_params: InitiatePaymentParams): Promise<InitiatePaymentResult> {
    if (!this.isConfigured()) {
      return { ok: false, error: "Flutterwave is not configured yet — missing API keys." };
    }
    // TODO: replace with a real call once keys are available (see notes above).
    throw new Error(
      "flutterwaveProvider.initiate() is a template — implement once client credentials are provided.",
    );
  },

  async verify(_providerReference: string): Promise<VerifyPaymentResult> {
    if (!this.isConfigured()) {
      return { verified: false, error: "Flutterwave is not configured yet — missing API keys." };
    }
    // TODO: replace with a real call once keys are available (see notes above).
    throw new Error(
      "flutterwaveProvider.verify() is a template — implement once client credentials are provided.",
    );
  },
};
