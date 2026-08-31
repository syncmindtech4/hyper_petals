// Provider-agnostic payment interface. The idea: checkout.tsx and the rest
// of the app talk to `initiatePayment` / `isPaymentConfigured` from
// `./index.server`, never to a specific gateway directly. Once a client is
// picked (Flutterwave, Pesapal, DPO, etc.), implement `PaymentProvider`
// for it in a new file and swap the export in `./index.server.ts` — nothing
// else in the app needs to change.
//
// This models the standard "hosted redirect" flow used by every major
// Uganda-compatible processor: the browser is sent to a page hosted by the
// gateway to enter card/MoMo details, then redirected back with a
// reference we verify server-side. Card numbers/CVVs never touch our
// server or client code — that's what keeps this out of PCI-DSS scope.
// Do not add raw card-field collection back into checkout.tsx; route any
// "card" selection through this interface instead.

export type PaymentMethodOption = "momo" | "airtel_money" | "card" | "cash_on_delivery";

export type InitiatePaymentParams = {
  /** Our internal group_id, used as the merchant reference for reconciliation. */
  reference: string;
  amountUgx: number;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  method: PaymentMethodOption;
  /** Where the gateway should send the browser back to after payment. */
  redirectUrl: string;
};

export type InitiatePaymentResult =
  { ok: true; redirectUrl: string; providerReference: string } | { ok: false; error: string };

export type VerifyPaymentResult =
  | { verified: true; status: "paid"; providerReference: string; amountUgx: number }
  | { verified: true; status: "failed"; providerReference: string }
  | { verified: false; error: string };

export interface PaymentProvider {
  readonly name: string;
  isConfigured(): boolean;
  initiate(params: InitiatePaymentParams): Promise<InitiatePaymentResult>;
  /** Called from a webhook or the redirect-back handler to confirm a payment actually went through. */
  verify(providerReference: string): Promise<VerifyPaymentResult>;
}
