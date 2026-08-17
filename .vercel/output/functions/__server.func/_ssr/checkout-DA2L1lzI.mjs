import { i as __toESM } from "../_runtime.mjs";
import { v as require_jsx_runtime, y as require_react } from "../_libs/@clerk/react+[...].mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as LoaderCircle, N as CircleCheck, S as Lock, V as ArrowLeft, c as ShoppingBag, k as CreditCard, l as ShieldCheck, o as Sparkles, t as X } from "../_libs/lucide-react.mjs";
import { t as formatUGX } from "./products-aqe0UNe5.mjs";
import { n as cn, r as useCart } from "./utils-CIaufAXp.mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as RadioGroupItem, t as RadioGroup } from "./radio-group-Owytr2q2.mjs";
import { t as Label } from "./label-BA0vr4PA.mjs";
import { t as hyper_petals___decor_logo_black_default } from "./hyper petals _ decor_logo_black-CLgrbIoU.mjs";
import { s as customizationSummary } from "./bouquet-customization-DkxKtVtU.mjs";
import { a as SelectTrigger, i as SelectItem, n as Select, o as SelectValue, r as SelectContent, s as Textarea, t as Input } from "./select-f54aULDH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-DA2L1lzI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
var LOCATIONS = [
	{
		name: "Kampala Central",
		fee: 5e3
	},
	{
		name: "Muyenga",
		fee: 1e4
	},
	{
		name: "Kololo",
		fee: 8e3
	},
	{
		name: "Nakasero",
		fee: 8e3
	},
	{
		name: "Bugolobi",
		fee: 1e4
	},
	{
		name: "Entebbe",
		fee: 3e4
	},
	{
		name: "Naalya",
		fee: 15e3
	},
	{
		name: "Lubowa",
		fee: 2e4
	}
];
var OTHER_LOCATION = "Other";
function Checkout() {
	const { items, cartTotal, clearCart, updateQuantity, removeFromCart } = useCart();
	const navigate = useNavigate();
	const [name, setName] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [sendToSelf, setSendToSelf] = (0, import_react.useState)(true);
	const [recipientName, setRecipientName] = (0, import_react.useState)("");
	const [recipientPhone, setRecipientPhone] = (0, import_react.useState)("");
	const [deliveryLocation, setDeliveryLocation] = (0, import_react.useState)("Kampala Central");
	const [customLocation, setCustomLocation] = (0, import_react.useState)("");
	const [deliveryDate, setDeliveryDate] = (0, import_react.useState)("");
	const [landmarkNotes, setLandmarkNotes] = (0, import_react.useState)("");
	const [paymentMethod, setPaymentMethod] = (0, import_react.useState)("momo");
	const [cardNumber, setCardNumber] = (0, import_react.useState)("");
	const [cardExpiry, setCardExpiry] = (0, import_react.useState)("");
	const [cardCvv, setCardCvv] = (0, import_react.useState)("");
	const [promoInput, setPromoInput] = (0, import_react.useState)("");
	const [appliedPromo, setAppliedPromo] = (0, import_react.useState)(null);
	const [discountAmount, setDiscountAmount] = (0, import_react.useState)(0);
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const [showPaymentModal, setShowPaymentModal] = (0, import_react.useState)(false);
	const [paymentStep, setPaymentStep] = (0, import_react.useState)("momo-prompt");
	const [simulatedPin, setSimulatedPin] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const tomorrow = /* @__PURE__ */ new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
		const yyyy = tomorrow.getFullYear();
		const mm = String(tomorrow.getMonth() + 1).padStart(2, "0");
		const dd = String(tomorrow.getDate()).padStart(2, "0");
		setDeliveryDate(`${yyyy}-${mm}-${dd}`);
		if (items.length > 0) {
			const firstItem = items[0];
			if (LOCATIONS.some((l) => l.name === firstItem.deliveryLocation)) setDeliveryLocation(firstItem.deliveryLocation);
			else {
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
	const effectiveDeliveryLocation = deliveryLocation === OTHER_LOCATION ? customLocation.trim() : deliveryLocation;
	const deliveryFee = (0, import_react.useMemo)(() => {
		const loc = LOCATIONS.find((l) => l.name === deliveryLocation);
		return loc ? loc.fee : 5e3;
	}, [deliveryLocation]);
	const applyPromoCode = () => {
		const code = promoInput.toUpperCase().trim();
		if (code === "WELCOME10" || code === "HYPERPETALS") {
			setAppliedPromo(code);
			setDiscountAmount(cartTotal * .1);
			toast.success("Promo code applied! 10% discount subtracted.");
		} else toast.error("Invalid promo code. Try WELCOME10.");
	};
	const removePromoCode = () => {
		setAppliedPromo(null);
		setDiscountAmount(0);
		setPromoInput("");
		toast.info("Promo code removed.");
	};
	const grandTotal = (0, import_react.useMemo)(() => {
		return Math.max(0, cartTotal - discountAmount + deliveryFee);
	}, [
		cartTotal,
		discountAmount,
		deliveryFee
	]);
	const handlePay = (e) => {
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
		setTimeout(() => {
			setIsSubmitting(false);
			setShowPaymentModal(true);
			if (paymentMethod === "visa") {
				setPaymentStep("processing");
				setTimeout(() => {
					setPaymentStep("success");
				}, 2500);
			} else setPaymentStep("momo-prompt");
		}, 1500);
	};
	const handleSimulateMomoSubmit = (e) => {
		e.preventDefault();
		if (simulatedPin.length < 4) {
			toast.error("Please enter a valid 4-digit PIN");
			return;
		}
		setPaymentStep("processing");
		setTimeout(() => {
			setPaymentStep("success");
		}, 3e3);
	};
	const handleCloseSuccess = () => {
		setShowPaymentModal(false);
		clearCart();
		navigate({ to: "/" });
	};
	if (items.length === 0 && paymentStep !== "success") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-md px-6 py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "mx-auto h-16 w-16 text-muted/40 stroke-[1]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-6 font-serif text-3xl text-foreground",
				children: "Your checkout is empty"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "You don't have any items in your selection to checkout."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/catalogue",
				className: "mt-8 inline-flex rounded-sm bg-primary px-6 py-3 text-xs uppercase tracking-widest text-primary-foreground hover:bg-primary/95 transition-colors",
				children: "Return to Catalog"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[oklch(0.985_0.005_78)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "border-b border-border/40 bg-background py-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-7xl items-center justify-between px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "flex items-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: hyper_petals___decor_logo_black_default,
							alt: "Hyper Petals & Decor logo",
							className: "h-10 md:h-12",
							style: { width: 220 }
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Secure Checkout" })]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-6 py-10 md:py-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/catalogue",
					className: "inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors mb-6 uppercase tracking-wider font-semibold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3 w-3" }), "Back to Catalogue"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handlePay,
					className: "grid grid-cols-1 gap-12 lg:grid-cols-12 items-start",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-7 space-y-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "bg-card border border-border/40 rounded-sm p-6 space-y-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3 pb-3 border-b border-border/40",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground",
											children: "1"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "font-serif text-xl text-foreground font-medium",
											children: "Your Details"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
												htmlFor: "cust-name",
												className: "text-[11px] uppercase tracking-wider text-muted-foreground font-semibold",
												children: ["Full Name ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-primary",
													children: "*"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "cust-name",
												required: true,
												placeholder: "e.g. John Doe",
												value: name,
												onChange: (e) => setName(e.target.value),
												className: "text-xs bg-background"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
												htmlFor: "cust-phone",
												className: "text-[11px] uppercase tracking-wider text-muted-foreground font-semibold",
												children: ["Phone Number ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-primary",
													children: "*"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "cust-phone",
												required: true,
												placeholder: "e.g. 0772 000 000",
												value: phone,
												onChange: (e) => setPhone(e.target.value),
												className: "text-xs bg-background"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "cust-email",
											className: "text-[11px] uppercase tracking-wider text-muted-foreground font-semibold",
											children: "Email Address (Optional)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "cust-email",
											type: "email",
											placeholder: "e.g. name@domain.com",
											value: email,
											onChange: (e) => setEmail(e.target.value),
											className: "text-xs bg-background"
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "bg-card border border-border/40 rounded-sm p-6 space-y-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3 pb-3 border-b border-border/40",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground",
											children: "2"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "font-serif text-xl text-foreground font-medium",
											children: "Delivery Details"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex rounded-sm bg-accent/20 p-1 border border-border/40 max-w-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setSendToSelf(true),
											className: `flex-1 text-center py-2 text-xs font-medium rounded-xs transition-colors ${sendToSelf ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`,
											children: "Send to Myself"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setSendToSelf(false),
											className: `flex-1 text-center py-2 text-xs font-medium rounded-xs transition-colors ${!sendToSelf ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`,
											children: "Send as a Gift"
										})]
									}),
									!sendToSelf && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
												htmlFor: "rec-name",
												className: "text-[11px] uppercase tracking-wider text-muted-foreground font-semibold",
												children: ["Recipient's Full Name ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-primary",
													children: "*"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "rec-name",
												required: !sendToSelf,
												placeholder: "e.g. Jane Namubiru",
												value: recipientName,
												onChange: (e) => setRecipientName(e.target.value),
												className: "text-xs bg-background"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
												htmlFor: "rec-phone",
												className: "text-[11px] uppercase tracking-wider text-muted-foreground font-semibold",
												children: ["Recipient's Phone ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-primary",
													children: "*"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "rec-phone",
												required: !sendToSelf,
												placeholder: "e.g. 0701 987 654",
												value: recipientPhone,
												onChange: (e) => setRecipientPhone(e.target.value),
												className: "text-xs bg-background"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
													htmlFor: "del-location",
													className: "text-[11px] uppercase tracking-wider text-muted-foreground font-semibold",
													children: ["Delivery Location (Kampala) ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-primary",
														children: "*"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
													value: deliveryLocation,
													onValueChange: setDeliveryLocation,
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
														id: "del-location",
														className: "text-xs bg-background",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select Area" })
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
														className: "bg-background border-border/60",
														children: [LOCATIONS.map((loc) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
															value: loc.name,
															className: "text-xs",
															children: [
																loc.name,
																" (",
																formatUGX(loc.fee),
																")"
															]
														}, loc.name)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
															value: OTHER_LOCATION,
															className: "text-xs",
															children: "Other (type in your location)"
														})]
													})]
												}),
												deliveryLocation === OTHER_LOCATION && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													placeholder: "Enter your delivery location",
													value: customLocation,
													onChange: (e) => setCustomLocation(e.target.value),
													className: "text-xs bg-background mt-2"
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
												htmlFor: "del-date",
												className: "text-[11px] uppercase tracking-wider text-muted-foreground font-semibold",
												children: ["Delivery Date ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-primary",
													children: "*"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "del-date",
												type: "date",
												required: true,
												value: deliveryDate,
												onChange: (e) => setDeliveryDate(e.target.value),
												className: "text-xs bg-background"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "del-landmark",
											className: "text-[11px] uppercase tracking-wider text-muted-foreground font-semibold",
											children: "Delivery Landmark / Instructions"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
											id: "del-landmark",
											placeholder: "e.g. Red gate next to Shell Muyenga, second building on the right...",
											value: landmarkNotes,
											onChange: (e) => setLandmarkNotes(e.target.value),
											className: "text-xs min-h-[85px] leading-relaxed resize-none bg-background"
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "bg-card border border-border/40 rounded-sm p-6 space-y-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 pb-3 border-b border-border/40",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground",
										children: "3"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "font-serif text-xl text-foreground font-medium",
										children: "Payment Method"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioGroup, {
									value: paymentMethod,
									onValueChange: setPaymentMethod,
									className: "space-y-3.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between border border-border/40 rounded-sm p-4 bg-background/50 hover:bg-accent/10 transition-colors",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center space-x-3.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
													value: "momo",
													id: "pay-momo"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "pay-momo",
													className: "text-xs md:text-sm font-semibold text-foreground cursor-pointer select-none",
													children: "MTN Mobile Money"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[9px] font-bold text-[#FFCC00] bg-black px-2 py-1 rounded-sm tracking-wider",
												children: "MOMO"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between border border-border/40 rounded-sm p-4 bg-background/50 hover:bg-accent/10 transition-colors",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center space-x-3.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
													value: "airtel",
													id: "pay-airtel"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "pay-airtel",
													className: "text-xs md:text-sm font-semibold text-foreground cursor-pointer select-none",
													children: "Airtel Money"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[9px] font-bold text-red-600 bg-white border border-red-500 px-2 py-0.5 rounded-sm tracking-wider",
												children: "AIRTEL"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "border border-border/40 rounded-sm p-4 bg-background/50 hover:bg-accent/5 transition-colors space-y-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center space-x-3.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
														value: "visa",
														id: "pay-visa"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
														htmlFor: "pay-visa",
														className: "text-xs md:text-sm font-semibold text-foreground cursor-pointer select-none flex items-center gap-1.5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "h-4 w-4 text-muted-foreground" }), "Visa / Mastercard"]
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[9px] font-bold text-muted-foreground border border-border/80 px-2 py-0.5 rounded-sm tracking-wider",
													children: "CARD"
												})]
											}), paymentMethod === "visa" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid grid-cols-3 gap-3 pt-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "col-span-3 space-y-1.5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
															htmlFor: "visa-num",
															className: "text-[10px] uppercase tracking-wider text-muted-foreground font-semibold",
															children: "Card Number"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															id: "visa-num",
															required: paymentMethod === "visa",
															placeholder: "4000 1234 5678 9010",
															value: cardNumber,
															onChange: (e) => setCardNumber(e.target.value),
															className: "text-xs bg-background"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "space-y-1.5 col-span-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
															htmlFor: "visa-expiry",
															className: "text-[10px] uppercase tracking-wider text-muted-foreground font-semibold",
															children: "Expiry Date"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															id: "visa-expiry",
															required: paymentMethod === "visa",
															placeholder: "MM/YY",
															value: cardExpiry,
															onChange: (e) => setCardExpiry(e.target.value),
															className: "text-xs bg-background"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "space-y-1.5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
															htmlFor: "visa-cvv",
															className: "text-[10px] uppercase tracking-wider text-muted-foreground font-semibold",
															children: "CVV"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															id: "visa-cvv",
															type: "password",
															required: paymentMethod === "visa",
															maxLength: 3,
															placeholder: "123",
															value: cardCvv,
															onChange: (e) => setCardCvv(e.target.value),
															className: "text-xs bg-background"
														})]
													})
												]
											})]
										})
									]
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-5 space-y-6 lg:sticky lg:top-28",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-card border border-border/40 rounded-sm p-6 space-y-5 shadow-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "font-serif text-lg text-foreground font-medium pb-3 border-b border-border/40 flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Order Summary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs font-sans font-normal text-muted-foreground",
										children: [
											"(",
											items.length,
											" items)"
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "max-h-60 overflow-y-auto pr-1 space-y-3.5 border-b border-border/40 pb-4",
									children: items.map((item) => {
										const addOnsTotal = item.selectedAddOns.reduce((sum, addOn) => sum + addOn.price, 0);
										const itemCost = (item.sizePrice + addOnsTotal) * item.quantity;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-3 text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: item.product.image,
												alt: item.product.name,
												className: "h-14 w-12 rounded-sm object-cover bg-muted"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex-1 min-w-0",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex justify-between items-start",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
															className: "font-serif font-medium text-foreground truncate",
															children: item.product.name
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "font-semibold text-primary",
															children: formatUGX(itemCost)
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-[11px] text-muted-foreground mt-0.5",
														children: [
															"Size: ",
															item.selectedSize,
															" ",
															item.quantity > 1 && `(x${item.quantity})`
														]
													}),
													item.selectedAddOns.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-[10px] text-muted-foreground truncate",
														children: ["Add-ons: ", item.selectedAddOns.map((a) => a.name).join(", ")]
													}),
													item.customizations && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-[10px] text-muted-foreground truncate",
														children: customizationSummary(item.customizations)
													})
												]
											})]
										}, item.cartItemId);
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "promo-input",
										className: "text-[10px] uppercase tracking-wider text-muted-foreground font-semibold",
										children: "Promo Code"
									}), appliedPromo ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between border border-emerald-600/30 bg-emerald-500/5 px-3 py-2 rounded-sm text-xs text-emerald-800",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1.5 font-medium",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 text-emerald-600" }),
												appliedPromo,
												" Applied"
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: removePromoCode,
											className: "text-xs underline text-emerald-700 hover:text-emerald-950 focus:outline-none",
											children: "Remove"
										})]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "promo-input",
											placeholder: "e.g. WELCOME10",
											value: promoInput,
											onChange: (e) => setPromoInput(e.target.value),
											className: "text-xs bg-background"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: applyPromoCode,
											className: "rounded-sm bg-primary/10 border border-primary/20 px-4 py-2 text-[10px] uppercase tracking-wider font-semibold text-primary hover:bg-primary/20 transition-colors",
											children: "Apply"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "border-border/40" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2.5 text-xs text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Subtotal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium text-foreground",
												children: formatUGX(cartTotal)
											})]
										}),
										discountAmount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between text-emerald-700",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Discount" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["-", formatUGX(discountAmount)] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
												"Delivery Fee (",
												effectiveDeliveryLocation || "—",
												")"
											] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium text-foreground",
												children: formatUGX(deliveryFee)
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "border-border/40 my-1" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between text-sm text-foreground font-semibold pt-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-serif text-base",
												children: "Grand Total"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-primary text-base font-bold",
												children: formatUGX(grandTotal)
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									disabled: isSubmitting,
									className: "w-full flex items-center justify-center gap-2 rounded-sm bg-primary py-3.5 text-xs uppercase tracking-[0.22em] font-bold text-primary-foreground hover:bg-primary/95 transition-colors shadow-xs focus:outline-none",
									children: isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), "Preparing Secure Form..."] }) : `Pay ${formatUGX(grandTotal)}`
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-center gap-2 text-[11px] text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4 text-emerald-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "128-bit Encrypted SSL Connection" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-muted-foreground leading-relaxed px-4",
								children: "Mobile Money transactions are verified directly on your phone. Refunds & date adjustments are free of charge up to 24h prior to delivery."
							})]
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: showPaymentModal,
				onOpenChange: (open) => {
					if (!isSubmitting && paymentStep === "success") handleCloseSuccess();
					else if (paymentStep !== "processing") setShowPaymentModal(open);
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "sm:max-w-md bg-background border-border/60 p-6 flex flex-col items-center text-center",
					children: [
						paymentStep === "momo-prompt" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
								className: "font-serif text-xl text-foreground text-center",
								children: "Simulating Mobile Money Push"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
								className: "text-xs text-muted-foreground leading-relaxed text-center",
								children: [
									"In a production environment, an API push prompt is sent to ",
									phone,
									". Enter your Pin below to simulate a successful payment."
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleSimulateMomoSubmit,
							className: "w-full space-y-4 pt-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2 text-left",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "momo-pin",
										className: "text-[10px] uppercase tracking-wider text-muted-foreground font-semibold",
										children: "Enter Mobile Money PIN (Simulated)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "momo-pin",
										type: "password",
										maxLength: 4,
										placeholder: "••••",
										value: simulatedPin,
										onChange: (e) => setSimulatedPin(e.target.value.replace(/\D/g, "")),
										className: "text-center tracking-widest text-lg font-semibold bg-accent/10 border-border/80 h-12"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-[#FFCC00]/10 border border-[#FFCC00]/30 rounded-sm p-3 flex justify-between items-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-left",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] font-semibold text-foreground",
											children: "Hyper Petals Decor"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[10px] text-muted-foreground",
											children: ["Amount: ", formatUGX(grandTotal)]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[9px] font-bold text-black bg-[#FFCC00] px-2 py-0.5 rounded-sm",
										children: "MoMo Secure"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: "w-full rounded-sm bg-primary py-3 text-xs uppercase tracking-widest font-semibold text-primary-foreground hover:bg-primary/95 transition-colors focus:outline-none",
									children: "Confirm PIN & Pay"
								})
							]
						})] }),
						paymentStep === "processing" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "py-8 flex flex-col items-center space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-12 w-12 text-primary animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-serif text-lg text-foreground font-medium",
									children: "Verifying Transaction"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground max-w-xs leading-relaxed",
									children: "Securing communication channel, checking Mobile Money operator status, and processing ledger. Please hold..."
								})]
							})]
						}),
						paymentStep === "success" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "py-6 flex flex-col items-center space-y-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-16 w-16 text-emerald-600 stroke-[1.5]" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-serif text-2xl text-foreground font-medium",
										children: "Order Placed Successfully!"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground max-w-sm leading-relaxed",
										children: "Thank you for choosing Hyper Petals Decor! Your payment has been received, and our Kampalan florists are scheduling your delivery."
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-emerald-500/5 border border-emerald-500/20 rounded-sm p-4 w-full text-xs text-left text-foreground/90 space-y-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Customer Name:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium",
												children: name
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Recipient Name:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium",
												children: sendToSelf ? name : recipientName
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Delivery Date:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium text-primary font-semibold",
												children: deliveryDate
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between border-t border-border/40 pt-2 mt-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground font-semibold",
												children: "Total Paid:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-primary",
												children: formatUGX(grandTotal)
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: handleCloseSuccess,
									className: "w-full rounded-sm bg-primary py-3 text-xs uppercase tracking-widest font-semibold text-primary-foreground hover:bg-primary/95 transition-colors focus:outline-none",
									children: "Close & Return Home"
								})
							]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { Checkout as component };
