import { i as __toESM } from "../_runtime.mjs";
import { v as require_jsx_runtime, y as require_react } from "../_libs/@clerk/react+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _ as MessageSquare, a as Star, c as ShoppingBag, d as RefreshCw, r as Truck } from "../_libs/lucide-react.mjs";
import { r as useProducts } from "./useProducts-BtNG2CQt.mjs";
import { t as formatUGX } from "./products-aqe0UNe5.mjs";
import { r as useCart } from "./utils-CIaufAXp.mjs";
import { t as Checkbox } from "./checkbox-CGJQldXN.mjs";
import { t as Label } from "./label-BA0vr4PA.mjs";
import { a as colorOptionsFor, c as isCustomizableBouquet, d as stylesAvailableFor, i as OCCASIONS, l as isCustomizationComplete, n as EMPTY_CUSTOMIZATION, o as colorSelectionMode, r as FLOWER_TYPES, s as customizationSummary, t as ARRANGEMENT_STYLES, u as missingCustomizationFields } from "./bouquet-customization-DkxKtVtU.mjs";
import { a as SelectTrigger, i as SelectItem, n as Select, o as SelectValue, r as SelectContent, s as Textarea, t as Input } from "./select-f54aULDH.mjs";
import { n as waLink } from "./site-Wk8BehLF.mjs";
import { t as Route } from "./product-detail-DxRvqIyZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/product-detail-BdvJmRt2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function FilterRow({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			className: "text-xs uppercase tracking-wider text-muted-foreground font-semibold block",
			children: label
		}), children]
	});
}
function ChipGroup({ options, selected, onSelect, disabled }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-wrap gap-1.5",
		children: options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			disabled,
			onClick: () => onSelect(option),
			className: `rounded-full border px-3 py-1.5 text-[11px] font-medium whitespace-nowrap transition-all ${selected(option) ? "border-primary bg-primary/5 ring-1 ring-primary text-foreground" : "border-border/60 hover:border-primary/40 bg-card text-foreground/80"} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`,
			children: option
		}, option))
	});
}
function BouquetCustomizer({ value, onChange }) {
	const availableStyles = value.flowerType ? stylesAvailableFor(value.flowerType) : [];
	const colorMode = colorSelectionMode(value.style);
	const colorOptions = colorOptionsFor(value.flowerType);
	const handleFlowerType = (flowerType) => {
		const nextFlowerType = flowerType;
		const nextStyles = stylesAvailableFor(nextFlowerType);
		onChange({
			...value,
			flowerType: nextFlowerType,
			style: nextStyles.length === 1 ? nextStyles[0] : null,
			colors: []
		});
	};
	const handleStyle = (style) => {
		onChange({
			...value,
			style,
			colors: []
		});
	};
	const handleColor = (color) => {
		if (colorMode === "single") onChange({
			...value,
			colors: [color]
		});
		else {
			const alreadySelected = value.colors.includes(color);
			onChange({
				...value,
				colors: alreadySelected ? value.colors.filter((c) => c !== color) : [...value.colors, color]
			});
		}
	};
	const handleOccasion = (occasion) => {
		onChange({
			...value,
			occasion
		});
	};
	const handleArrangementStyle = (arrangementStyle) => {
		onChange({
			...value,
			arrangementStyle
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterRow, {
				label: "Flower Type",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipGroup, {
					options: FLOWER_TYPES,
					selected: (opt) => value.flowerType === opt,
					onSelect: handleFlowerType
				})
			}),
			value.flowerType && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterRow, {
				label: "Style",
				children: availableStyles.length === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[11px] text-muted-foreground",
					children: [
						value.flowerType,
						" is always a multicolor blend, so this is set to",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold text-foreground",
							children: "Mixed"
						}),
						"."
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipGroup, {
					options: availableStyles,
					selected: (opt) => value.style === opt,
					onSelect: handleStyle
				})
			}),
			value.flowerType && value.style && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterRow, {
				label: `Color${colorMode === "multi" ? " (multi)" : ""}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipGroup, {
					options: colorOptions,
					selected: (opt) => value.colors.includes(opt),
					onSelect: handleColor
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterRow, {
				label: "Occasion",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipGroup, {
					options: OCCASIONS,
					selected: (opt) => value.occasion === opt,
					onSelect: handleOccasion
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterRow, {
				label: "Arrangement",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipGroup, {
					options: ARRANGEMENT_STYLES,
					selected: (opt) => value.arrangementStyle === opt,
					onSelect: handleArrangementStyle
				})
			})
		]
	});
}
var ADDONS_LIST = [
	{
		name: "Chocolate box",
		price: 35e3
	},
	{
		name: "Teddy bear",
		price: 45e3
	},
	{
		name: "Slice cake",
		price: 4e4
	}
];
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
function ProductDetail() {
	const { id } = Route.useSearch();
	const { addToCart } = useCart();
	const { data: products, isLoading } = useProducts();
	const product = (0, import_react.useMemo)(() => {
		return products.find((p) => p.id === id) || products[0];
	}, [products, id]);
	(0, import_react.useEffect)(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}, [id]);
	(0, import_react.useEffect)(() => {
		if (product) document.title = `${product.name} — Hyper Petals Decor`;
	}, [product]);
	const [selectedSize, setSelectedSize] = (0, import_react.useState)("12 Stems");
	const [selectedAddOns, setSelectedAddOns] = (0, import_react.useState)([]);
	const [isGift, setIsGift] = (0, import_react.useState)(false);
	const [recipientName, setRecipientName] = (0, import_react.useState)("");
	const [recipientPhone, setRecipientPhone] = (0, import_react.useState)("");
	const [deliveryLocation, setDeliveryLocation] = (0, import_react.useState)("Kampala Central");
	const [customLocation, setCustomLocation] = (0, import_react.useState)("");
	const [deliveryDate, setDeliveryDate] = (0, import_react.useState)("");
	const [giftMessage, setGiftMessage] = (0, import_react.useState)("");
	const [quantity, setQuantity] = (0, import_react.useState)(1);
	const [customization, setCustomization] = (0, import_react.useState)(EMPTY_CUSTOMIZATION);
	(0, import_react.useEffect)(() => {
		setCustomization(EMPTY_CUSTOMIZATION);
	}, [id]);
	(0, import_react.useEffect)(() => {
		const tomorrow = /* @__PURE__ */ new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
		const yyyy = tomorrow.getFullYear();
		const mm = String(tomorrow.getMonth() + 1).padStart(2, "0");
		const dd = String(tomorrow.getDate()).padStart(2, "0");
		setDeliveryDate(`${yyyy}-${mm}-${dd}`);
	}, []);
	const sizePrice = (0, import_react.useMemo)(() => {
		if (!product) return 0;
		const base = product.price;
		if (selectedSize === "6 Stems") {
			if (product.id === "wine-blush-dozen") return 65e3;
			return Math.round(base * .6 / 5e3) * 5e3;
		}
		if (selectedSize === "24 Stems") {
			if (product.id === "wine-blush-dozen") return 19e4;
			return Math.round(base * 1.73 / 5e3) * 5e3;
		}
		return base;
	}, [product, selectedSize]);
	const addOnsTotal = (0, import_react.useMemo)(() => {
		return selectedAddOns.reduce((sum, addOn) => sum + addOn.price, 0);
	}, [selectedAddOns]);
	const totalPrice = (0, import_react.useMemo)(() => {
		return (sizePrice + addOnsTotal) * quantity;
	}, [
		sizePrice,
		addOnsTotal,
		quantity
	]);
	const recommended = (0, import_react.useMemo)(() => {
		if (!product) return [];
		return products.filter((p) => p.id !== product.id).slice(0, 3);
	}, [products, product]);
	const requiresCustomization = product ? isCustomizableBouquet(product) : false;
	const customizationValid = !requiresCustomization || isCustomizationComplete(customization);
	const customizationMissing = requiresCustomization ? missingCustomizationFields(customization) : [];
	const effectiveDeliveryLocation = deliveryLocation === OTHER_LOCATION ? customLocation.trim() : deliveryLocation;
	const handleAddOnToggle = (addOn, checked) => {
		if (checked) setSelectedAddOns((prev) => [...prev, addOn]);
		else setSelectedAddOns((prev) => prev.filter((a) => a.name !== addOn.name));
	};
	const handleAddToCart = () => {
		if (requiresCustomization && !customizationValid) {
			toast.error("Please finish customizing your bouquet", { description: `Still needed: ${customizationMissing.join(", ")}` });
			return;
		}
		if (isGift && (!recipientName.trim() || !recipientPhone.trim())) {
			toast.error("Please fill in the recipient's details");
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
		addToCart({
			product,
			quantity,
			selectedSize,
			sizePrice,
			selectedAddOns,
			isGift,
			giftDetails: isGift ? {
				recipientName,
				recipientPhone
			} : void 0,
			deliveryLocation: effectiveDeliveryLocation,
			deliveryDate,
			giftMessage: giftMessage.trim() || void 0,
			customizations: requiresCustomization ? customization : void 0
		});
		toast.success(`${product.name} added to cart!`, { description: `Size: ${selectedSize}. Open cart to check out.` });
	};
	const handleWhatsAppOrder = () => {
		if (requiresCustomization && !customizationValid) {
			toast.error("Please finish customizing your bouquet", { description: `Still needed: ${customizationMissing.join(", ")}` });
			return;
		}
		if (isGift && (!recipientName.trim() || !recipientPhone.trim())) {
			toast.error("Please fill in the recipient's details");
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
		const addOnsText = selectedAddOns.length > 0 ? `\n- *Add-ons*: ${selectedAddOns.map((a) => `${a.name} (+${formatUGX(a.price)})`).join(", ")}` : "";
		const giftText = isGift ? `\n- *Recipient Name*: ${recipientName}\n- *Recipient Phone*: ${recipientPhone}` : "";
		const msgText = giftMessage.trim() ? `\n- *Card Note*: "${giftMessage.trim()}"` : "";
		const customizationText = requiresCustomization ? `\n- *Customization*: ${customizationSummary(customization)}` : "";
		const message = `Hello Hyper Petals Decor! I'd like to place an order:
- *Product*: ${product.name}
- *Size*: ${selectedSize} (Price: ${formatUGX(sizePrice)})
- *Quantity*: ${quantity}${customizationText}${addOnsText}${giftText}
- *Delivery Location*: ${effectiveDeliveryLocation}
- *Delivery Date*: ${deliveryDate}${msgText}
*Total*: ${formatUGX(totalPrice)}`;
		window.open(waLink(message), "_blank");
	};
	if (!product) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-7xl px-6 py-24 text-center",
		children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Loading product..."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "We couldn't find that product."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/catalogue",
			className: "mt-4 inline-block text-sm text-primary underline",
			children: "Browse the catalogue"
		})] })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-6 py-10 md:py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "flex mb-8 text-xs text-muted-foreground uppercase tracking-widest gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "hover:text-primary transition-colors",
						children: "Home"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "/" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/catalogue",
						className: "hover:text-primary transition-colors",
						children: "Bouquets"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "/" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-foreground/80 font-medium truncate",
						children: product.category.split(" · ")[0]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "/" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-primary font-semibold truncate",
						children: product.name
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-12 lg:grid-cols-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-7 space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-card border border-border/40",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: product.image,
								alt: `${product.name} detail view`,
								className: "object-cover w-full h-full transition-all duration-300"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "delivery-location",
										className: "text-[11px] uppercase tracking-wider text-muted-foreground font-semibold",
										children: "Delivery Area (Kampala)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: deliveryLocation,
										onValueChange: setDeliveryLocation,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											id: "delivery-location",
											className: "text-xs bg-card border-border/60",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select Area" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
											className: "bg-background border-border/60",
											children: [LOCATIONS.map((loc) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
												value: loc.name,
												className: "text-xs",
												children: [
													loc.name,
													" (+",
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
										className: "text-xs bg-card border-border/60 mt-2"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "delivery-date",
									className: "text-[11px] uppercase tracking-wider text-muted-foreground font-semibold",
									children: "Delivery Date"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "relative",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "delivery-date",
										type: "date",
										value: deliveryDate,
										onChange: (e) => setDeliveryDate(e.target.value),
										className: "text-xs bg-card border-border/60 block w-full pl-3 pr-10 py-2.5"
									})
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "gift-message",
								className: "text-[11px] uppercase tracking-wider text-muted-foreground font-semibold",
								children: "Gift Card Message (Optional)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "gift-message",
								placeholder: "Write a sweet message to be handwritten on our luxury gift card...",
								value: giftMessage,
								onChange: (e) => setGiftMessage(e.target.value),
								className: "text-xs min-h-[80px] bg-card border-border/60 leading-relaxed resize-none"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pt-2 space-y-3",
							children: [
								requiresCustomization && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs",
									children: customizationValid ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold",
												children: "Selected:"
											}),
											" ",
											customizationSummary(customization)
										]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-amber-700",
										children: ["Please select: ", customizationMissing.join(", ")]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center border border-border/80 rounded-sm bg-card",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setQuantity((q) => Math.max(1, q - 1)),
												className: "px-3 py-2 text-muted-foreground hover:text-foreground transition-colors",
												children: "-"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "px-3 text-sm font-semibold text-foreground",
												children: quantity
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setQuantity((q) => q + 1),
												className: "px-3 py-2 text-muted-foreground hover:text-foreground transition-colors",
												children: "+"
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: handleAddToCart,
										disabled: requiresCustomization && !customizationValid,
										className: "flex-1 flex items-center justify-center gap-2 rounded-sm bg-primary py-3 text-[11px] uppercase tracking-[0.22em] font-semibold text-primary-foreground hover:bg-primary/95 transition-colors shadow-xs disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-4 w-4" }), "Add to Cart"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: handleWhatsAppOrder,
									className: "w-full flex items-center justify-center gap-2 rounded-sm border border-emerald-600/80 bg-emerald-500/5 hover:bg-emerald-500/10 py-3 text-[11px] uppercase tracking-[0.22em] font-semibold text-emerald-700 transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-4 w-4" }), "Order via WhatsApp"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "border-border/60" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-3 gap-2.5 pt-1 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col items-center justify-center p-2 border border-border/40 rounded-lg bg-card/60",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "h-4 w-4 text-primary mb-1.5" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-semibold text-foreground",
											children: "Same-day delivery"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[9px] text-muted-foreground mt-0.5",
											children: "Order by 2pm"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col items-center justify-center p-2 border border-border/40 rounded-lg bg-card/60",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-1 items-center mb-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[9px] font-bold text-[#FFCC00] bg-black px-1 py-0.5 rounded-sm",
												children: "MoMo"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[9px] font-bold text-red-600 bg-white border border-red-500 px-1 py-0.5 rounded-sm",
												children: "Airtel"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-semibold text-foreground",
											children: "Mobile Money"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[9px] text-muted-foreground mt-0.5",
											children: "Secure payment"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col items-center justify-center p-2 border border-border/40 rounded-lg bg-card/60",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-4 w-4 text-primary mb-1.5" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-semibold text-foreground",
											children: "Free rescheduling"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[9px] text-muted-foreground mt-0.5",
											children: "Up to 24h prior"
										})
									]
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-5 space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] uppercase tracking-widest font-semibold text-primary/95 border border-primary/20 rounded-full px-2.5 py-0.5 bg-primary/5",
								children: product.category
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-3 font-serif text-3xl md:text-4xl text-foreground",
								children: product.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex items-center text-amber-500",
										children: [...Array(5)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 fill-current" }, i))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-semibold text-foreground",
										children: "4.9"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-muted-foreground",
										children: "(24 reviews)"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-sm text-muted-foreground leading-relaxed",
								children: product.description
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "border-border/60" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3.5 block",
									children: "Select Arrangement Size"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-3 gap-3",
									children: [
										{
											size: "6 Stems",
											label: "6 Stems",
											desc: "Classic"
										},
										{
											size: "12 Stems",
											label: "12 Stems",
											desc: "Signature"
										},
										{
											size: "24 Stems",
											label: "24 Stems",
											desc: "Luxe Premium"
										}
									].map((opt) => {
										const price = opt.size === "6 Stems" ? product.id === "wine-blush-dozen" ? 65e3 : Math.round(product.price * .6 / 5e3) * 5e3 : opt.size === "24 Stems" ? product.id === "wine-blush-dozen" ? 19e4 : Math.round(product.price * 1.73 / 5e3) * 5e3 : product.price;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => setSelectedSize(opt.size),
											className: `flex flex-col items-center justify-center p-3 rounded-lg border transition-all text-center ${selectedSize === opt.size ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border/60 hover:border-primary/40 bg-card"}`,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs font-semibold text-foreground",
													children: opt.label
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[10px] text-muted-foreground mt-0.5",
													children: opt.desc
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[11px] font-medium text-primary mt-1.5",
													children: formatUGX(price)
												})
											]
										}, opt.size);
									})
								})] }),
								requiresCustomization && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-xs uppercase tracking-wider text-muted-foreground font-semibold block",
										children: "Customize Your Bouquet"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BouquetCustomizer, {
										value: customization,
										onChange: setCustomization
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3.5 block",
									children: "Add Premium Gift Accents (Optional)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-2.5",
									children: ADDONS_LIST.map((addOn) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between border border-border/40 p-3 rounded-lg bg-card hover:bg-accent/10 transition-colors",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center space-x-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
												id: `addon-${addOn.name}`,
												checked: selectedAddOns.some((a) => a.name === addOn.name),
												onCheckedChange: (checked) => handleAddOnToggle(addOn, checked === true),
												className: "rounded-lg"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: `addon-${addOn.name}`,
												className: "text-xs md:text-sm text-foreground/90 font-normal cursor-pointer select-none",
												children: addOn.name
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs font-semibold text-primary",
											children: ["+", formatUGX(addOn.price)]
										})]
									}, addOn.name))
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border border-border/40 p-4 rounded-lg bg-card space-y-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center space-x-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
											id: "is-gift",
											checked: isGift,
											onCheckedChange: (checked) => setIsGift(checked === true),
											className: "rounded-lg"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "is-gift",
											className: "text-xs md:text-sm font-medium text-foreground cursor-pointer select-none",
											children: "This is a gift for someone else"
										})]
									}), isGift && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "recipient-name",
												className: "text-[11px] uppercase tracking-wider text-muted-foreground font-semibold",
												children: "Recipient Name"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "recipient-name",
												placeholder: "e.g. Sarah Namayanja",
												value: recipientName,
												onChange: (e) => setRecipientName(e.target.value),
												className: "text-xs bg-background"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "recipient-phone",
												className: "text-[11px] uppercase tracking-wider text-muted-foreground font-semibold",
												children: "Recipient Phone"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "recipient-phone",
												placeholder: "e.g. 0772 123 456",
												value: recipientPhone,
												onChange: (e) => setRecipientPhone(e.target.value),
												className: "text-xs bg-background"
											})]
										})]
									})]
								})
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-20 border-t border-border/60 pt-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-serif text-3xl text-foreground text-center mb-10",
					children: "You May Also Like"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
					children: recommended.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "group relative flex flex-col bg-card border border-border/40 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-card)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: `/product-detail`,
							search: { id: p.id },
							className: "block overflow-hidden relative aspect-[4/5] bg-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: p.image,
								alt: p.name,
								loading: "lazy",
								className: "object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-5 flex-1 flex flex-col justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: `/product-detail`,
								search: { id: p.id },
								className: "block hover:opacity-85",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-serif text-base text-foreground truncate group-hover:text-primary transition-colors",
									children: p.name
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[11px] text-muted-foreground line-clamp-2 leading-relaxed",
								children: p.description
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 pt-3 border-t border-border/40 flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-primary text-sm",
									children: formatUGX(p.price)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: `/product-detail`,
									search: { id: p.id },
									className: "text-[10px] uppercase tracking-wider font-semibold text-primary hover:opacity-75",
									children: "Customize & Order →"
								})]
							})]
						})]
					}, p.id))
				})]
			})
		]
	});
}
//#endregion
export { ProductDetail as component };
