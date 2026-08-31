import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { Lock, ShoppingBag, ShieldCheck, CreditCard, Sparkles, Loader2 } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { formatUGX } from "@/lib/products";
import { customizationSummary } from "@/lib/bouquet-customization";
import { submitOrder } from "@/lib/cms.functions";
import { buildOrderWhatsAppUrl } from "@/lib/site";
import { useDeliveryLocations, useValidatePromoCode } from "@/hooks/useCheckout";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import logo from "@/assets/hyper petals & decor_logo_black.svg";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/checkout")({
  component: Checkout,
  head: () => ({
    meta: [
      { title: "Checkout — Hyper Petals Decor" },
      { name: "description", content: "Complete your premium hand-tied bouquet order." },
    ],
  }),
});

const OTHER_LOCATION = "Other";
const DEFAULT_CUSTOM_LOCATION_FEE_UGX = 5000;

type PaymentMethod = "momo" | "airtel_money" | "card" | "cash_on_delivery";

const PROMO_ERROR_MESSAGES: Record<string, string> = {
  not_found: "That promo code doesn't exist.",
  inactive: "That promo code is no longer active.",
  expired: "That promo code has expired.",
  not_started: "That promo code isn't active yet.",
  redemption_limit_reached: "That promo code has reached its usage limit.",
};

function Checkout() {
  const { items, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const { data: locations, isLoading: locationsLoading } = useDeliveryLocations();
  const validatePromo = useValidatePromoCode();

  // Contact details
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // Delivery details
  const [sendToSelf, setSendToSelf] = useState(true);
  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("Kampala Central");
  const [customLocation, setCustomLocation] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [landmarkNotes, setLandmarkNotes] = useState("");

  // Payment method — no real gateway is connected yet (see
  // src/lib/payments/), so this is captured for the order record and to
  // have the field ready the moment one is wired up. Every option today
  // resolves to the same outcome: order saved as pending, confirmed over
  // WhatsApp.
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("momo");

  // Promo code details
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{
    code: string;
    discountType: "flat" | "percent";
    discountValue: number;
  } | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Default delivery dates
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, "0");
    const dd = String(tomorrow.getDate()).padStart(2, "0");
    setDeliveryDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  // Pre-populate delivery info from the first cart item once locations load
  useEffect(() => {
    if (!locations || items.length === 0) return;
    const firstItem = items[0];
    const isKnownLocation = locations.some((l) => l.name === firstItem.deliveryLocation);
    if (isKnownLocation) {
      setDeliveryLocation(firstItem.deliveryLocation);
    } else {
      setDeliveryLocation(OTHER_LOCATION);
      setCustomLocation(firstItem.deliveryLocation);
    }
    setDeliveryDate(firstItem.deliveryDate);
    if (firstItem.isGift && firstItem.giftDetails) {
      setSendToSelf(false);
      setRecipientName(firstItem.giftDetails.recipientName);
      setRecipientPhone(firstItem.giftDetails.recipientPhone);
    }
    // Only run once locations arrive / items change — not on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locations, items.length]);

  const effectiveDeliveryLocation =
    deliveryLocation === OTHER_LOCATION ? customLocation.trim() : deliveryLocation;

  const deliveryFee = useMemo(() => {
    if (deliveryLocation === OTHER_LOCATION) return DEFAULT_CUSTOM_LOCATION_FEE_UGX;
    const loc = locations?.find((l) => l.name === deliveryLocation);
    return loc ? loc.fee_ugx : DEFAULT_CUSTOM_LOCATION_FEE_UGX;
  }, [deliveryLocation, locations]);

  const discountAmount = useMemo(() => {
    if (!appliedPromo) return 0;
    return appliedPromo.discountType === "percent"
      ? Math.round((cartTotal * appliedPromo.discountValue) / 100)
      : Math.min(appliedPromo.discountValue, cartTotal);
  }, [appliedPromo, cartTotal]);

  const applyPromoCode = () => {
    const code = promoInput.trim();
    if (!code) return;
    validatePromo.mutate(code, {
      onSuccess: (result) => {
        if (result.valid) {
          setAppliedPromo({
            code: result.code,
            discountType: result.discountType,
            discountValue: result.discountValue,
          });
          toast.success(
            result.discountType === "percent"
              ? `Promo applied! ${result.discountValue}% off.`
              : `Promo applied! ${formatUGX(result.discountValue)} off.`,
          );
        } else {
          toast.error(PROMO_ERROR_MESSAGES[result.reason] ?? "That promo code isn't valid.");
        }
      },
      onError: () => {
        toast.error("Couldn't check that promo code right now — try again in a moment.");
      },
    });
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    setPromoInput("");
    toast.info("Promo code removed.");
  };

  const grandTotal = useMemo(() => {
    return Math.max(0, cartTotal - discountAmount + deliveryFee);
  }, [cartTotal, discountAmount, deliveryFee]);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      toast.error("Please fill in your name and phone number");
      return;
    }
    if (!sendToSelf && (!recipientName.trim() || !recipientPhone.trim())) {
      toast.error("Please fill in recipient details");
      return;
    }
    if (deliveryLocation === OTHER_LOCATION && !customLocation.trim()) {
      toast.error("Please type in your delivery location");
      return;
    }
    if (!deliveryDate) {
      toast.error("Please select a delivery date");
      return;
    }
    if (items.length === 0) return;

    setIsSubmitting(true);

    // Every item in the cart is saved as its own order row, all sharing one
    // group_id so the success page can show and confirm them together —
    // same pattern as product-detail's single-item "Order via WhatsApp"
    // flow, just for N items instead of one. Delivery fee, discount, and
    // promo code are only attached to the first row so summing across the
    // group on the success page gives the right total without double-
    // counting a fee that only applies once per checkout, not per item.
    const groupId = crypto.randomUUID();

    try {
      const results = await Promise.allSettled(
        items.map((item, index) => {
          const addOnsTotal = item.selectedAddOns.reduce((sum, a) => sum + a.price, 0);
          const itemTotal = (item.sizePrice + addOnsTotal) * item.quantity;
          return submitOrder({
            data: {
              groupId,
              productSlug: item.product.id,
              productName: item.product.name,
              size: item.selectedSize,
              sizePriceUgx: item.sizePrice,
              quantity: item.quantity,
              addOns: item.selectedAddOns.map((a) => ({ name: a.name, price: a.price })),
              customization: item.customizations ?? undefined,
              isGift: item.isGift,
              recipientName: item.isGift ? item.giftDetails?.recipientName : undefined,
              recipientPhone: item.isGift ? item.giftDetails?.recipientPhone : undefined,
              giftMessage: item.giftMessage,
              deliveryLocation: effectiveDeliveryLocation || item.deliveryLocation,
              deliveryDate: deliveryDate || item.deliveryDate,
              deliveryFeeUgx: index === 0 ? deliveryFee : 0,
              promoCode: index === 0 ? appliedPromo?.code : undefined,
              discountUgx: index === 0 ? discountAmount : 0,
              totalPriceUgx: itemTotal,
              paymentMethod,
            },
          });
        }),
      );

      const fulfilled = results.filter(
        (r): r is PromiseFulfilledResult<Awaited<ReturnType<typeof submitOrder>>> =>
          r.status === "fulfilled",
      );
      const failedCount = results.length - fulfilled.length;

      if (fulfilled.length === 0) {
        // Nothing saved at all — no group to route to. Fall back to a
        // direct WhatsApp message so the order still reaches the studio,
        // same safety net as product-detail's catch block.
        console.error("All order(s) failed to save:", results);
        toast.error(
          "Couldn't save your order, but we've opened WhatsApp so you can send it directly.",
        );
        const waUrl = buildOrderWhatsAppUrl({
          orderId: groupId,
          items: items.map((item) => ({
            name: `${item.product.name} (${item.selectedSize})`,
            quantity: item.quantity,
            priceUgx: item.sizePrice,
          })),
          totalUgx: grandTotal,
          deliveryLocation: effectiveDeliveryLocation,
          deliveryDate,
        });
        window.open(waUrl, "_blank");
        return;
      }

      if (failedCount > 0) {
        toast.error(
          `${failedCount} item(s) couldn't be saved — the rest of your order went through.`,
        );
      }

      clearCart();
      navigate({ to: "/order-success/$orderId", params: { orderId: groupId } });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-md px-6 py-24 text-center">
        <ShoppingBag className="mx-auto h-16 w-16 text-muted/40 stroke-[1]" />
        <h1 className="mt-6 font-serif text-3xl text-foreground">Your checkout is empty</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          You don't have any items in your selection to checkout.
        </p>
        <Link
          to="/catalogue"
          className="mt-8 inline-flex rounded-sm bg-primary px-6 py-3 text-xs uppercase tracking-widest text-primary-foreground hover:bg-primary/95 transition-colors"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[oklch(0.985_0.005_78)]">
      {/* Custom Minimal Header */}
      <header className="border-b border-border/40 bg-background py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Hyper Petals & Decor logo"
              className="h-10 md:h-12"
              style={{ width: 220 }}
            />
          </Link>
          <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-primary">
            <Lock className="h-3.5 w-3.5" />
            <span>Checkout</span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10 md:py-16">
        <form onSubmit={handlePay} className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
          {/* Left Column: Details */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Contact */}
            <section className="bg-card border border-border/40 rounded-sm p-6 space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b border-border/40">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  1
                </span>
                <h2 className="font-serif text-xl text-foreground font-medium">Your Details</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="cust-name"
                    className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold"
                  >
                    Full Name <span className="text-primary">*</span>
                  </Label>
                  <Input
                    id="cust-name"
                    required
                    placeholder="e.g. Sarah Nakato"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="text-xs bg-background"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="cust-phone"
                    className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold"
                  >
                    Phone Number <span className="text-primary">*</span>
                  </Label>
                  <Input
                    id="cust-phone"
                    required
                    placeholder="e.g. 0770 123 456"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="text-xs bg-background"
                  />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label
                    htmlFor="cust-email"
                    className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold"
                  >
                    Email (optional)
                  </Label>
                  <Input
                    id="cust-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-xs bg-background"
                  />
                </div>
              </div>
            </section>

            {/* Step 2: Delivery */}
            <section className="bg-card border border-border/40 rounded-sm p-6 space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b border-border/40">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  2
                </span>
                <h2 className="font-serif text-xl text-foreground font-medium">Delivery</h2>
              </div>

              <RadioGroup
                value={sendToSelf ? "self" : "gift"}
                onValueChange={(v) => setSendToSelf(v === "self")}
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="self" id="send-self" />
                  <Label
                    htmlFor="send-self"
                    className="text-xs font-medium cursor-pointer select-none"
                  >
                    This is for me
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="gift" id="send-gift" />
                  <Label
                    htmlFor="send-gift"
                    className="text-xs font-medium cursor-pointer select-none"
                  >
                    This is a gift
                  </Label>
                </div>
              </RadioGroup>

              {!sendToSelf && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="rec-name"
                      className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold"
                    >
                      Recipient's Name <span className="text-primary">*</span>
                    </Label>
                    <Input
                      id="rec-name"
                      required={!sendToSelf}
                      placeholder="e.g. Jane Namubiru"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      className="text-xs bg-background"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="rec-phone"
                      className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold"
                    >
                      Recipient's Phone <span className="text-primary">*</span>
                    </Label>
                    <Input
                      id="rec-phone"
                      required={!sendToSelf}
                      placeholder="e.g. 0701 987 654"
                      value={recipientPhone}
                      onChange={(e) => setRecipientPhone(e.target.value)}
                      className="text-xs bg-background"
                    />
                  </div>
                </div>
              )}

              {/* Date & Location Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="del-location"
                    className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold"
                  >
                    Delivery Location (Kampala) <span className="text-primary">*</span>
                  </Label>
                  <Select value={deliveryLocation} onValueChange={setDeliveryLocation}>
                    <SelectTrigger id="del-location" className="text-xs bg-background">
                      <SelectValue
                        placeholder={locationsLoading ? "Loading areas…" : "Select Area"}
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border/60">
                      {(locations ?? []).map((loc) => (
                        <SelectItem key={loc.id} value={loc.name} className="text-xs">
                          {loc.name} ({formatUGX(loc.fee_ugx)})
                        </SelectItem>
                      ))}
                      <SelectItem value={OTHER_LOCATION} className="text-xs">
                        Other (type in your location)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {deliveryLocation === OTHER_LOCATION && (
                    <Input
                      placeholder="Enter your delivery location"
                      value={customLocation}
                      onChange={(e) => setCustomLocation(e.target.value)}
                      className="text-xs bg-background mt-2"
                    />
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="del-date"
                    className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold"
                  >
                    Delivery Date <span className="text-primary">*</span>
                  </Label>
                  <Input
                    id="del-date"
                    type="date"
                    required
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="text-xs bg-background"
                  />
                </div>
              </div>

              {/* Delivery landmark notes */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="del-landmark"
                  className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold"
                >
                  Delivery Landmark / Instructions
                </Label>
                <Textarea
                  id="del-landmark"
                  placeholder="e.g. Red gate next to Shell Muyenga, second building on the right..."
                  value={landmarkNotes}
                  onChange={(e) => setLandmarkNotes(e.target.value)}
                  className="text-xs min-h-[85px] leading-relaxed resize-none bg-background"
                />
              </div>
            </section>

            {/* Step 3: Payment Methods */}
            <section className="bg-card border border-border/40 rounded-sm p-6 space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b border-border/40">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  3
                </span>
                <h2 className="font-serif text-xl text-foreground font-medium">Payment Method</h2>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                Choose how you'd like to pay — we'll confirm your order and finalize payment with
                you directly on WhatsApp. Online payment isn't live yet, so nothing is charged here.
              </p>

              <RadioGroup
                value={paymentMethod}
                onValueChange={(v) => setPaymentMethod(v as PaymentMethod)}
                className="space-y-3.5"
              >
                {/* MTN Momo */}
                <div className="flex items-center justify-between border border-border/40 rounded-sm p-4 bg-background/50 hover:bg-accent/10 transition-colors">
                  <div className="flex items-center space-x-3.5">
                    <RadioGroupItem value="momo" id="pay-momo" />
                    <Label
                      htmlFor="pay-momo"
                      className="text-xs md:text-sm font-semibold text-foreground cursor-pointer select-none"
                    >
                      MTN Mobile Money
                    </Label>
                  </div>
                  <span className="text-[9px] font-bold text-[#FFCC00] bg-black px-2 py-1 rounded-sm tracking-wider">
                    MOMO
                  </span>
                </div>

                {/* Airtel Money */}
                <div className="flex items-center justify-between border border-border/40 rounded-sm p-4 bg-background/50 hover:bg-accent/10 transition-colors">
                  <div className="flex items-center space-x-3.5">
                    <RadioGroupItem value="airtel_money" id="pay-airtel" />
                    <Label
                      htmlFor="pay-airtel"
                      className="text-xs md:text-sm font-semibold text-foreground cursor-pointer select-none"
                    >
                      Airtel Money
                    </Label>
                  </div>
                  <span className="text-[9px] font-bold text-red-600 bg-white border border-red-500 px-2 py-0.5 rounded-sm tracking-wider">
                    AIRTEL
                  </span>
                </div>

                {/* Card Payment — no raw card fields: once a gateway (see
                    src/lib/payments/) is connected, selecting this will
                    redirect to their hosted payment page instead. */}
                <div className="border border-border/40 rounded-sm p-4 bg-background/50 hover:bg-accent/5 transition-colors space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3.5">
                      <RadioGroupItem value="card" id="pay-card" />
                      <Label
                        htmlFor="pay-card"
                        className="text-xs md:text-sm font-semibold text-foreground cursor-pointer select-none flex items-center gap-1.5"
                      >
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                        Card (Visa / Mastercard)
                      </Label>
                    </div>
                    <span className="text-[9px] font-bold text-muted-foreground border border-border/80 px-2 py-0.5 rounded-sm tracking-wider">
                      CARD
                    </span>
                  </div>
                  {paymentMethod === "card" && (
                    <p className="text-[11px] text-muted-foreground leading-relaxed pl-8">
                      Online card payment is coming soon. We'll share a secure payment link on
                      WhatsApp, or you can pay by Mobile Money on delivery instead.
                    </p>
                  )}
                </div>

                {/* Cash / MoMo on delivery */}
                <div className="flex items-center justify-between border border-border/40 rounded-sm p-4 bg-background/50 hover:bg-accent/10 transition-colors">
                  <div className="flex items-center space-x-3.5">
                    <RadioGroupItem value="cash_on_delivery" id="pay-cod" />
                    <Label
                      htmlFor="pay-cod"
                      className="text-xs md:text-sm font-semibold text-foreground cursor-pointer select-none"
                    >
                      Cash / Mobile Money on Delivery
                    </Label>
                  </div>
                  <span className="text-[9px] font-bold text-muted-foreground border border-border/80 px-2 py-0.5 rounded-sm tracking-wider">
                    COD
                  </span>
                </div>
              </RadioGroup>
            </section>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="bg-card border border-border/40 rounded-sm p-6 space-y-5 shadow-xs">
              <h3 className="font-serif text-lg text-foreground font-medium pb-3 border-b border-border/40 flex items-center justify-between">
                <span>Order Summary</span>
                <span className="text-xs font-sans font-normal text-muted-foreground">
                  ({items.length} items)
                </span>
              </h3>

              {/* Items List */}
              <div className="max-h-60 overflow-y-auto pr-1 space-y-3.5 border-b border-border/40 pb-4">
                {items.map((item) => {
                  const addOnsTotal = item.selectedAddOns.reduce(
                    (sum, addOn) => sum + addOn.price,
                    0,
                  );
                  const itemCost = (item.sizePrice + addOnsTotal) * item.quantity;
                  return (
                    <div key={item.cartItemId} className="flex gap-3 text-xs">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-14 w-12 rounded-sm object-cover bg-muted"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h4 className="font-serif font-medium text-foreground truncate">
                            {item.product.name}
                          </h4>
                          <span className="font-semibold text-primary">{formatUGX(itemCost)}</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          Size: {item.selectedSize} {item.quantity > 1 && `(x${item.quantity})`}
                        </p>
                        {item.selectedAddOns.length > 0 && (
                          <p className="text-[10px] text-muted-foreground truncate">
                            Add-ons: {item.selectedAddOns.map((a) => a.name).join(", ")}
                          </p>
                        )}
                        {item.customizations && (
                          <p className="text-[10px] text-muted-foreground truncate">
                            {customizationSummary(item.customizations)}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Promo Code Input */}
              <div className="space-y-2">
                <Label
                  htmlFor="promo-input"
                  className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold"
                >
                  Promo Code
                </Label>
                {appliedPromo ? (
                  <div className="flex items-center justify-between border border-emerald-600/30 bg-emerald-500/5 px-3 py-2 rounded-sm text-xs text-emerald-800">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                      {appliedPromo.code} Applied
                    </span>
                    <button
                      type="button"
                      onClick={removePromoCode}
                      className="text-xs underline text-emerald-700 hover:text-emerald-950 focus:outline-none"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      id="promo-input"
                      placeholder="e.g. WELCOME10"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="text-xs bg-background"
                    />
                    <button
                      type="button"
                      onClick={applyPromoCode}
                      disabled={validatePromo.isPending}
                      className="rounded-sm bg-primary/10 border border-primary/20 px-4 py-2 text-[10px] uppercase tracking-wider font-semibold text-primary hover:bg-primary/20 transition-colors disabled:opacity-50"
                    >
                      {validatePromo.isPending ? "Checking…" : "Apply"}
                    </button>
                  </div>
                )}
              </div>

              <hr className="border-border/40" />

              {/* Prices breakdown */}
              <div className="space-y-2.5 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-foreground">{formatUGX(cartTotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount</span>
                    <span>-{formatUGX(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Fee ({effectiveDeliveryLocation || "—"})</span>
                  <span className="font-medium text-foreground">{formatUGX(deliveryFee)}</span>
                </div>
                <hr className="border-border/40 my-1" />
                <div className="flex justify-between text-sm text-foreground font-semibold pt-1">
                  <span className="font-serif text-base">Grand Total</span>
                  <span className="text-primary text-base font-bold">{formatUGX(grandTotal)}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 rounded-sm bg-primary py-3.5 text-xs uppercase tracking-[0.22em] font-bold text-primary-foreground hover:bg-primary/95 transition-colors shadow-xs focus:outline-none disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Placing Order...
                  </>
                ) : (
                  "Place Order"
                )}
              </button>
            </div>

            {/* Trust Footer */}
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>Your order details are saved securely</span>
              </div>
              <p className="text-[10px] text-muted-foreground leading-relaxed px-4">
                We'll confirm your order and payment with you directly on WhatsApp after you place
                it. Refunds & date adjustments are free of charge up to 24h prior to delivery.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
