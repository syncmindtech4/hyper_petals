import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { Lock, ShoppingBag, ShieldCheck, CreditCard, Sparkles, CheckCircle2, ChevronRight, Loader2, ArrowLeft } from "lucide-react";
import { useCart, CartItem } from "@/hooks/use-cart";
import { formatUGX } from "@/lib/products";
import { customizationSummary } from "@/lib/bouquet-customization";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import logo from "@/assets/hyper petals & decor_logo_black.svg";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
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
      { title: "Secure Checkout — Hyper Petals Decor" },
      { name: "description", content: "Complete your premium hand-tied bouquet order securely." },
    ],
  }),
});

const LOCATIONS = [
  { name: "Kampala Central", fee: 5000 },
  { name: "Muyenga", fee: 10000 },
  { name: "Kololo", fee: 8000 },
  { name: "Nakasero", fee: 8000 },
  { name: "Bugolobi", fee: 10000 },
  { name: "Entebbe", fee: 30000 },
  { name: "Naalya", fee: 15000 },
  { name: "Lubowa", fee: 20000 },
];

const OTHER_LOCATION = "Other";

function Checkout() {
  const { items, cartTotal, clearCart, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

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

  // Payment details
  const [paymentMethod, setPaymentMethod] = useState("momo");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  // Promo code details
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);

  // Simulation states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentStep, setPaymentStep] = useState<"momo-prompt" | "processing" | "success">("momo-prompt");
  const [simulatedPin, setSimulatedPin] = useState("");

  // Default delivery dates
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, "0");
    const dd = String(tomorrow.getDate()).padStart(2, "0");
    setDeliveryDate(`${yyyy}-${mm}-${dd}`);

    // If there is an item in the cart, pre-populate delivery info from the first item
    if (items.length > 0) {
      const firstItem = items[0];
      const isKnownLocation = LOCATIONS.some((l) => l.name === firstItem.deliveryLocation);
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
    }
  }, [items]);

  const effectiveDeliveryLocation =
    deliveryLocation === OTHER_LOCATION ? customLocation.trim() : deliveryLocation;

  // Delivery fee
  const deliveryFee = useMemo(() => {
    const loc = LOCATIONS.find((l) => l.name === deliveryLocation);
    return loc ? loc.fee : 5000;
  }, [deliveryLocation]);

  // Promo code calculation
  const applyPromoCode = () => {
    const code = promoInput.toUpperCase().trim();
<<<<<<< HEAD
    if (code === "WELCOME10" || code === "HYPERPETALS" || code === "LUXEFLORAL") {
=======
    if (code === "WELCOME10" || code === "HYPERPETALS") {
>>>>>>> f6858ec5fd00cdef039523b985ba989a45a5a45e
      setAppliedPromo(code);
      setDiscountAmount(cartTotal * 0.1);
      toast.success("Promo code applied! 10% discount subtracted.");
    } else {
      toast.error("Invalid promo code. Try WELCOME10.");
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    setDiscountAmount(0);
    setPromoInput("");
    toast.info("Promo code removed.");
  };

  const grandTotal = useMemo(() => {
    return Math.max(0, cartTotal - discountAmount + deliveryFee);
  }, [cartTotal, discountAmount, deliveryFee]);

  const handlePay = (e: React.FormEvent) => {
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

    if (paymentMethod === "visa" && (!cardNumber.trim() || !cardExpiry.trim() || !cardCvv.trim())) {
      toast.error("Please fill in your card details");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API request delay
    setTimeout(() => {
      setIsSubmitting(false);
      setShowPaymentModal(true);
      if (paymentMethod === "visa") {
        setPaymentStep("processing");
        setTimeout(() => {
          setPaymentStep("success");
        }, 2500);
      } else {
        setPaymentStep("momo-prompt");
      }
    }, 1500);
  };

  const handleSimulateMomoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (simulatedPin.length < 4) {
      toast.error("Please enter a valid 4-digit PIN");
      return;
    }
    setPaymentStep("processing");
    setTimeout(() => {
      setPaymentStep("success");
    }, 3000);
  };

  const handleCloseSuccess = () => {
    setShowPaymentModal(false);
    clearCart();
    navigate({ to: "/" });
  };

  if (items.length === 0 && paymentStep !== "success") {
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
            <img src={logo} alt="Hyper Petals & Decor logo" className="h-10 md:h-12" style={{ width: 220 }} />
          </Link>
          <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-primary">
            <Lock className="h-3.5 w-3.5" />
            <span>Secure Checkout</span>
          </div>
        </div>
      </header>

      {/* Main Layout Grid */}
      <div className="mx-auto max-w-7xl px-6 py-10 md:py-16">
        <Link to="/catalogue" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors mb-6 uppercase tracking-wider font-semibold">
          <ArrowLeft className="h-3 w-3" />
          Back to Catalogue
        </Link>

        <form onSubmit={handlePay} className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
          {/* Left Column: Forms */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Your Details */}
            <section className="bg-card border border-border/40 rounded-sm p-6 space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b border-border/40">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  1
                </span>
                <h2 className="font-serif text-xl text-foreground font-medium">Your Details</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="cust-name" className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                    Full Name <span className="text-primary">*</span>
                  </Label>
                  <Input
                    id="cust-name"
                    required
                    placeholder="e.g. John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="text-xs bg-background"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="cust-phone" className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                    Phone Number <span className="text-primary">*</span>
                  </Label>
                  <Input
                    id="cust-phone"
                    required
                    placeholder="e.g. 0772 000 000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="text-xs bg-background"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="cust-email" className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                  Email Address (Optional)
                </Label>
                <Input
                  id="cust-email"
                  type="email"
                  placeholder="e.g. name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-xs bg-background"
                />
              </div>
            </section>

            {/* Step 2: Delivery Details */}
            <section className="bg-card border border-border/40 rounded-sm p-6 space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b border-border/40">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  2
                </span>
                <h2 className="font-serif text-xl text-foreground font-medium">Delivery Details</h2>
              </div>

              {/* Sender Toggle */}
              <div className="flex rounded-sm bg-accent/20 p-1 border border-border/40 max-w-sm">
                <button
                  type="button"
                  onClick={() => setSendToSelf(true)}
                  className={`flex-1 text-center py-2 text-xs font-medium rounded-xs transition-colors ${
                    sendToSelf ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Send to Myself
                </button>
                <button
                  type="button"
                  onClick={() => setSendToSelf(false)}
                  className={`flex-1 text-center py-2 text-xs font-medium rounded-xs transition-colors ${
                    !sendToSelf ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Send as a Gift
                </button>
              </div>

              {/* Recipient Fields */}
              {!sendToSelf && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="rec-name" className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                      Recipient's Full Name <span className="text-primary">*</span>
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
                    <Label htmlFor="rec-phone" className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
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
                  <Label htmlFor="del-location" className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                    Delivery Location (Kampala) <span className="text-primary">*</span>
                  </Label>
                  <Select value={deliveryLocation} onValueChange={setDeliveryLocation}>
                    <SelectTrigger id="del-location" className="text-xs bg-background">
                      <SelectValue placeholder="Select Area" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border/60">
                      {LOCATIONS.map((loc) => (
                        <SelectItem key={loc.name} value={loc.name} className="text-xs">
                          {loc.name} ({formatUGX(loc.fee)})
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
                  <Label htmlFor="del-date" className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
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
                <Label htmlFor="del-landmark" className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
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

              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3.5">
                {/* MTN Momo */}
                <div className="flex items-center justify-between border border-border/40 rounded-sm p-4 bg-background/50 hover:bg-accent/10 transition-colors">
                  <div className="flex items-center space-x-3.5">
                    <RadioGroupItem value="momo" id="pay-momo" />
                    <Label htmlFor="pay-momo" className="text-xs md:text-sm font-semibold text-foreground cursor-pointer select-none">
                      MTN Mobile Money
                    </Label>
                  </div>
                  <span className="text-[9px] font-bold text-[#FFCC00] bg-black px-2 py-1 rounded-sm tracking-wider">MOMO</span>
                </div>

                {/* Airtel Money */}
                <div className="flex items-center justify-between border border-border/40 rounded-sm p-4 bg-background/50 hover:bg-accent/10 transition-colors">
                  <div className="flex items-center space-x-3.5">
                    <RadioGroupItem value="airtel" id="pay-airtel" />
                    <Label htmlFor="pay-airtel" className="text-xs md:text-sm font-semibold text-foreground cursor-pointer select-none">
                      Airtel Money
                    </Label>
                  </div>
                  <span className="text-[9px] font-bold text-red-600 bg-white border border-red-500 px-2 py-0.5 rounded-sm tracking-wider">AIRTEL</span>
                </div>

                {/* Card Payment */}
                <div className="border border-border/40 rounded-sm p-4 bg-background/50 hover:bg-accent/5 transition-colors space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3.5">
                      <RadioGroupItem value="visa" id="pay-visa" />
                      <Label htmlFor="pay-visa" className="text-xs md:text-sm font-semibold text-foreground cursor-pointer select-none flex items-center gap-1.5">
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                        Visa / Mastercard
                      </Label>
                    </div>
                    <span className="text-[9px] font-bold text-muted-foreground border border-border/80 px-2 py-0.5 rounded-sm tracking-wider">CARD</span>
                  </div>

                  {paymentMethod === "visa" && (
                    <div className="grid grid-cols-3 gap-3 pt-2">
                      <div className="col-span-3 space-y-1.5">
                        <Label htmlFor="visa-num" className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                          Card Number
                        </Label>
                        <Input
                          id="visa-num"
                          required={paymentMethod === "visa"}
                          placeholder="4000 1234 5678 9010"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="text-xs bg-background"
                        />
                      </div>
                      <div className="space-y-1.5 col-span-2">
                        <Label htmlFor="visa-expiry" className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                          Expiry Date
                        </Label>
                        <Input
                          id="visa-expiry"
                          required={paymentMethod === "visa"}
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="text-xs bg-background"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="visa-cvv" className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                          CVV
                        </Label>
                        <Input
                          id="visa-cvv"
                          type="password"
                          required={paymentMethod === "visa"}
                          maxLength={3}
                          placeholder="123"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="text-xs bg-background"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </RadioGroup>
            </section>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="bg-card border border-border/40 rounded-sm p-6 space-y-5 shadow-xs">
              <h3 className="font-serif text-lg text-foreground font-medium pb-3 border-b border-border/40 flex items-center justify-between">
                <span>Order Summary</span>
                <span className="text-xs font-sans font-normal text-muted-foreground">({items.length} items)</span>
              </h3>

              {/* Items List */}
              <div className="max-h-60 overflow-y-auto pr-1 space-y-3.5 border-b border-border/40 pb-4">
                {items.map((item) => {
                  const addOnsTotal = item.selectedAddOns.reduce((sum, addOn) => sum + addOn.price, 0);
                  const itemCost = (item.sizePrice + addOnsTotal) * item.quantity;
                  return (
                    <div key={item.cartItemId} className="flex gap-3 text-xs">
                      <img src={item.product.image} alt={item.product.name} className="h-14 w-12 rounded-sm object-cover bg-muted" />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h4 className="font-serif font-medium text-foreground truncate">{item.product.name}</h4>
                          <span className="font-semibold text-primary">{formatUGX(itemCost)}</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          Size: {item.selectedSize} {item.quantity > 1 && `(x${item.quantity})`}
                        </p>
                        {item.selectedAddOns.length > 0 && (
                          <p className="text-[10px] text-muted-foreground truncate">
                            Add-ons: {item.selectedAddOns.map(a => a.name).join(', ')}
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
                <Label htmlFor="promo-input" className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                  Promo Code
                </Label>
                {appliedPromo ? (
                  <div className="flex items-center justify-between border border-emerald-600/30 bg-emerald-500/5 px-3 py-2 rounded-sm text-xs text-emerald-800">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                      {appliedPromo} Applied
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
                      className="rounded-sm bg-primary/10 border border-primary/20 px-4 py-2 text-[10px] uppercase tracking-wider font-semibold text-primary hover:bg-primary/20 transition-colors"
                    >
                      Apply
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
                className="w-full flex items-center justify-center gap-2 rounded-sm bg-primary py-3.5 text-xs uppercase tracking-[0.22em] font-bold text-primary-foreground hover:bg-primary/95 transition-colors shadow-xs focus:outline-none"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Preparing Secure Form...
                  </>
                ) : (
                  `Pay ${formatUGX(grandTotal)}`
                )}
              </button>
            </div>

            {/* Security Footer */}
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>128-bit Encrypted SSL Connection</span>
              </div>
              <p className="text-[10px] text-muted-foreground leading-relaxed px-4">
                Mobile Money transactions are verified directly on your phone. Refunds & date adjustments are free of charge up to 24h prior to delivery.
              </p>
            </div>
          </div>
        </form>
      </div>

      {/* Payment Simulation Modal Dialog */}
      <Dialog open={showPaymentModal} onOpenChange={(open) => {
        // Prevent manual dismiss during processing or successful payment
        if (!isSubmitting && paymentStep === "success") {
          handleCloseSuccess();
        } else if (paymentStep !== "processing") {
          setShowPaymentModal(open);
        }
      }}>
        <DialogContent className="sm:max-w-md bg-background border-border/60 p-6 flex flex-col items-center text-center">
          {paymentStep === "momo-prompt" && (
            <>
              <DialogHeader className="space-y-2">
                <DialogTitle className="font-serif text-xl text-foreground text-center">
                  Simulating Mobile Money Push
                </DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground leading-relaxed text-center">
                  In a production environment, an API push prompt is sent to {phone}. Enter your Pin below to simulate a successful payment.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSimulateMomoSubmit} className="w-full space-y-4 pt-3">
                <div className="space-y-2 text-left">
                  <Label htmlFor="momo-pin" className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                    Enter Mobile Money PIN (Simulated)
                  </Label>
                  <Input
                    id="momo-pin"
                    type="password"
                    maxLength={4}
                    placeholder="••••"
                    value={simulatedPin}
                    onChange={(e) => setSimulatedPin(e.target.value.replace(/\D/g, ""))}
                    className="text-center tracking-widest text-lg font-semibold bg-accent/10 border-border/80 h-12"
                  />
                </div>

                <div className="bg-[#FFCC00]/10 border border-[#FFCC00]/30 rounded-sm p-3 flex justify-between items-center">
                  <div className="text-left">
                    <p className="text-[11px] font-semibold text-foreground">Hyper Petals Decor</p>
                    <p className="text-[10px] text-muted-foreground">Amount: {formatUGX(grandTotal)}</p>
                  </div>
                  <span className="text-[9px] font-bold text-black bg-[#FFCC00] px-2 py-0.5 rounded-sm">MoMo Secure</span>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-sm bg-primary py-3 text-xs uppercase tracking-widest font-semibold text-primary-foreground hover:bg-primary/95 transition-colors focus:outline-none"
                >
                  Confirm PIN & Pay
                </button>
              </form>
            </>
          )}

          {paymentStep === "processing" && (
            <div className="py-8 flex flex-col items-center space-y-4">
              <Loader2 className="h-12 w-12 text-primary animate-spin" />
              <div className="space-y-1">
                <h3 className="font-serif text-lg text-foreground font-medium">Verifying Transaction</h3>
                <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
                  Securing communication channel, checking Mobile Money operator status, and processing ledger. Please hold...
                </p>
              </div>
            </div>
          )}

          {paymentStep === "success" && (
            <div className="py-6 flex flex-col items-center space-y-5">
              <CheckCircle2 className="h-16 w-16 text-emerald-600 stroke-[1.5]" />
              <div className="space-y-1">
                <h3 className="font-serif text-2xl text-foreground font-medium">Order Placed Successfully!</h3>
                <p className="text-xs text-muted-foreground max-w-sm leading-relaxed">
                  Thank you for choosing Hyper Petals Decor! Your payment has been received, and our Kampalan florists are scheduling your delivery.
                </p>
              </div>

              <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-sm p-4 w-full text-xs text-left text-foreground/90 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Customer Name:</span>
                  <span className="font-medium">{name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Recipient Name:</span>
                  <span className="font-medium">{sendToSelf ? name : recipientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Date:</span>
                  <span className="font-medium text-primary font-semibold">{deliveryDate}</span>
                </div>
                <div className="flex justify-between border-t border-border/40 pt-2 mt-1">
                  <span className="text-muted-foreground font-semibold">Total Paid:</span>
                  <span className="font-bold text-primary">{formatUGX(grandTotal)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCloseSuccess}
                className="w-full rounded-sm bg-primary py-3 text-xs uppercase tracking-widest font-semibold text-primary-foreground hover:bg-primary/95 transition-colors focus:outline-none"
              >
                Close & Return Home
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
