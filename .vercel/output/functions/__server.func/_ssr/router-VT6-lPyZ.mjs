import { i as __toESM } from "../_runtime.mjs";
import { f as QueryClient, v as require_jsx_runtime, y as require_react } from "../_libs/@clerk/react+[...].mjs";
import { B as redirect, S as useRouter, _ as createFileRoute, d as useLocation, g as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as createRootRouteWithContext, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as ClerkProvider } from "./dist-Bev1KVaa.mjs";
import { c as createServerFn } from "./esm-C9N-ta7K.mjs";
import { t as createSsrRpc } from "./createSsrRpc-BhEbcv-J.mjs";
import { n as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { D as Facebook, b as MapPin, c as ShoppingBag, f as Plus, g as Minus, i as Trash2, j as Clock, p as Phone, t as X, v as MessageCircle, w as Instagram, x as Mail, y as Menu } from "../_libs/lucide-react.mjs";
import { t as formatUGX } from "./products-aqe0UNe5.mjs";
import { r as useCart, t as CartProvider } from "./utils-CIaufAXp.mjs";
import { a as SheetTitle, i as SheetHeader, n as Sheet, o as SheetTrigger, r as SheetContent, t as Route$24 } from "./catalogue-Cn4EZD84.mjs";
import { t as hyper_petals___decor_logo_black_default } from "./hyper petals _ decor_logo_black-CLgrbIoU.mjs";
import { s as customizationSummary } from "./bouquet-customization-DkxKtVtU.mjs";
import { n as waLink, t as site } from "./site-Wk8BehLF.mjs";
import { t as decoration_003_default } from "./decoration_003-B1DE_iHL.mjs";
import { t as baby_shower_default } from "./baby_shower-C_xZcE8w.mjs";
import { t as birthday_party_default } from "./birthday_party-DSGb-hh6.mjs";
import { t as bridal_shower_party_default } from "./bridal-shower-party-CAirDkBd.mjs";
import { t as team_default } from "./team-C_BFc-bs.mjs";
import { t as tea_default } from "./tea-DIVeYxXT.mjs";
import { t as proposal_africa_default } from "./proposal_africa-BK5r6wXn.mjs";
import { t as Route$25 } from "./product-detail-DxRvqIyZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-VT6-lPyZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var styles_default = "/assets/styles-R0snVa-m.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
var nav = [
	{
		to: "/catalogue",
		label: "Bouquets"
	},
	{
		to: "/occasions",
		label: "Occasions"
	},
	{
		to: "/gallery",
		label: "Gallery"
	},
	{
		to: "/contact",
		label: "Contact"
	}
];
function SiteHeader() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const { items, cartCount, cartTotal, updateQuantity, removeFromCart, isCartOpen, setIsCartOpen } = useCart();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 md:py-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "flex items-center ",
					onClick: () => setOpen(false),
					"aria-label": site.full,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: hyper_petals___decor_logo_black_default,
						alt: `${site.full} logo`,
						className: "logo h-14 md:h-16",
						style: { width: 300 }
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-9 md:flex",
					children: nav.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: n.to,
						className: "text-[13px] uppercase tracking-[0.2em] text-foreground/75 transition-colors hover:text-primary",
						activeProps: { className: "text-primary" },
						children: n.label
					}, n.to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
							open: isCartOpen,
							onOpenChange: setIsCartOpen,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "relative p-2 text-foreground/75 hover:text-primary transition-colors focus:outline-none",
									"aria-label": "Shopping Cart",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-5.5 w-5.5 stroke-[1.5]" }), cartCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute -top-0.5 -right-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground",
										children: cartCount
									})]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
								className: "flex w-full flex-col sm:max-w-md bg-background border-l border-border/60 p-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, {
									className: "pb-4 border-b border-border/60",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetTitle, {
										className: "font-serif text-2xl text-foreground flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Your Selection" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-sm font-sans font-normal text-muted-foreground",
											children: [
												"(",
												cartCount,
												" ",
												cartCount === 1 ? "item" : "items",
												")"
											]
										})]
									})
								}), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-1 flex-col items-center justify-center py-12 text-center",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-16 w-16 text-muted/40 stroke-[1]" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-4 font-serif text-lg text-foreground",
											children: "Your cart is empty"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-sm text-muted-foreground max-w-xs",
											children: "Browse our premium collections and add hand-tied arrangements to your cart."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/catalogue",
											onClick: () => setIsCartOpen(false),
											className: "mt-6 inline-flex rounded-sm bg-primary px-6 py-2.5 text-[11px] uppercase tracking-[0.22em] text-primary-foreground hover:bg-primary/90",
											children: "Shop Bouquets"
										})
									]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex-1 overflow-y-auto py-4 space-y-4 pr-1",
									children: items.map((item) => {
										const addOnsTotal = item.selectedAddOns.reduce((sum, addOn) => sum + addOn.price, 0);
										const itemTotal = (item.sizePrice + addOnsTotal) * item.quantity;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-4 pb-4 border-b border-border/40 last:border-b-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: item.product.image,
												alt: item.product.name,
												className: "h-20 w-18 rounded-sm object-cover bg-muted"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex-1 flex flex-col justify-between min-w-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex justify-between items-start gap-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
															className: "font-serif text-base text-foreground truncate",
															children: item.product.name
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															type: "button",
															onClick: () => removeFromCart(item.cartItemId),
															className: "text-muted-foreground hover:text-destructive p-0.5 transition-colors",
															"aria-label": "Remove item",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-[11px] text-muted-foreground mt-0.5",
														children: ["Size: ", item.selectedSize]
													}),
													item.selectedAddOns.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-[11px] text-muted-foreground truncate mt-0.5",
														children: ["Add-ons: ", item.selectedAddOns.map((a) => a.name).join(", ")]
													}),
													item.customizations && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-[11px] text-muted-foreground mt-0.5",
														children: customizationSummary(item.customizations)
													}),
													item.deliveryDate && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-[11px] text-primary font-medium mt-1",
														children: ["Delivery: ", item.deliveryDate]
													})
												] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex justify-between items-center mt-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center border border-border/80 rounded-sm",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																type: "button",
																onClick: () => updateQuantity(item.cartItemId, item.quantity - 1),
																className: "p-1 text-muted-foreground hover:text-foreground transition-colors",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-3.5 w-3.5" })
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "px-2 text-xs font-medium text-foreground",
																children: item.quantity
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																type: "button",
																onClick: () => updateQuantity(item.cartItemId, item.quantity + 1),
																className: "p-1 text-muted-foreground hover:text-foreground transition-colors",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" })
															})
														]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-sm font-semibold text-primary",
														children: formatUGX(itemTotal)
													})]
												})]
											})]
										}, item.cartItemId);
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-t border-border/60 pt-4 space-y-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between text-base font-medium text-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-serif",
												children: "Subtotal"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold text-primary",
												children: formatUGX(cartTotal)
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-muted-foreground",
											children: "Shipping fees and delivery details will be calculated at checkout."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-1 gap-2 pt-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/checkout",
												onClick: () => setIsCartOpen(false),
												className: "flex w-full items-center justify-center rounded-sm bg-primary py-3 text-[11px] uppercase tracking-[0.22em] font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors",
												children: "Proceed To Checkout"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setIsCartOpen(false),
												className: "flex w-full items-center justify-center rounded-sm border border-border/80 py-3 text-[11px] uppercase tracking-[0.22em] text-foreground hover:bg-accent/40 transition-colors",
												children: "Continue Shopping"
											})]
										})
									]
								})] })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/contact",
							className: "hidden rounded-sm bg-primary px-5 py-2.5 text-[11px] uppercase tracking-[0.22em] text-primary-foreground transition-colors hover:bg-primary/90 md:inline-flex",
							children: "Request A Quote"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "Toggle menu",
							className: "text-foreground md:hidden p-2",
							onClick: () => setOpen((v) => !v),
							children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5.5 w-5.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5.5 w-5.5" })
						})
					]
				})
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-border/60 bg-background md:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4",
				children: [nav.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: n.to,
					onClick: () => setOpen(false),
					className: "py-3 text-sm uppercase tracking-[0.2em] text-foreground/80",
					activeProps: { className: "text-primary" },
					children: n.label
				}, n.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/contact",
					onClick: () => setOpen(false),
					className: "mt-2 inline-flex items-center justify-center rounded-sm bg-primary px-5 py-3 text-[11px] uppercase tracking-[0.22em] text-primary-foreground",
					children: "Request A Quote"
				})]
			})
		})]
	});
}
var hyper_petals_decor_logo_white_default = "/assets/hyper_petals_decor_logo_white-DL87AE6M.svg";
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "bg-[#5C1D24] text-white",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:grid-cols-2 md:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: hyper_petals_decor_logo_white_default,
							alt: `${site.full} logo`,
							className: "h-14 w-auto md:h-16",
							style: { filter: "brightness(0) invert(1)" }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "max-w-xs text-sm leading-relaxed text-[#E0E0E0]",
							children: "Romantic, luxury florals for the moments that matter — from a Tuesday bouquet to the wedding of a lifetime."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: site.instagram,
									target: "_blank",
									rel: "noopener noreferrer",
									"aria-label": "Instagram",
									className: "flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-[#5C1D24]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "h-4 w-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: site.facebook,
									target: "_blank",
									rel: "noopener noreferrer",
									"aria-label": "Facebook",
									className: "flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-[#5C1D24]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Facebook, { className: "h-4 w-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: waLink(),
									target: "_blank",
									rel: "noopener noreferrer",
									"aria-label": "WhatsApp",
									className: "flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-[#5C1D24]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4" })
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-xs uppercase tracking-[1.5px] font-semibold text-white mb-5",
						children: "Explore"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "space-y-3 text-sm text-[#E0E0E0]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/catalogue",
								className: "transition-opacity hover:opacity-80",
								children: "Bouquets"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/occasions",
								className: "transition-opacity hover:opacity-80",
								children: "Occasions"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/gallery",
								className: "transition-opacity hover:opacity-80",
								children: "Gallery"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/contact",
								className: "transition-opacity hover:opacity-80",
								children: "Contact"
							}) })
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-xs uppercase tracking-[1.5px] font-semibold text-white mb-5",
					children: "Studio Info"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-3.5 text-sm text-[#E0E0E0]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "mt-0.5 h-4 w-4 text-white shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: site.address })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "mt-0.5 h-4 w-4 text-white shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: site.phoneHref,
								className: "hover:underline",
								children: site.phone
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "mt-0.5 h-4 w-4 text-white shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: `mailto:${site.email}`,
								className: "hover:underline break-all",
								children: site.email
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "mt-0.5 h-4 w-4 text-white shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: site.hours })]
						})
					]
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t relative border-white/15",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-6 py-8 flex justify-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs tracking-[1.5px] text-[#E0E0E0] text-center",
					children: [
						"© 2026 ",
						site.full,
						". All rights reserved."
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs tracking-[1.5px] text-[#E0E0E0] absolute italic font-serif bottom-24 right-6 z-50 flex gap-1 transition-transform",
					children: ["Designed by", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "https://syncmindtech.com/",
						target: "_blank",
						rel: "noopener noreferrer",
						className: "hover:text-[#E4C877] transition-colors",
						children: "SyncMindTech"
					})]
				})]
			})
		})]
	});
}
function WhatsAppButton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href: waLink(),
		target: "_blank",
		rel: "noopener noreferrer",
		"aria-label": "Chat on WhatsApp",
		className: "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-soft)] transition-transform hover:scale-105",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-6 w-6" })
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-serif text-5xl text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted-foreground",
					children: "The page you're looking for has wilted away."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-sm bg-primary px-6 py-3 text-xs uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Return home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-serif text-3xl text-foreground",
					children: "Something went wrong"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Please refresh or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "rounded-sm bg-primary px-5 py-2.5 text-xs uppercase tracking-widest text-primary-foreground hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "rounded-sm border border-input bg-background px-5 py-2.5 text-xs uppercase tracking-widest hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$23 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Hyper Petals Decor — Premium Bouquets & Event Florals" },
			{
				name: "description",
				content: "Hyper Petals Decor crafts romantic, luxury bouquets and full-service event florals for weddings, celebrations, and everyday moments."
			},
			{
				property: "og:title",
				content: "Hyper Petals Decor — Premium Bouquets & Event Florals"
			},
			{
				property: "og:description",
				content: "Hyper Petals Decor crafts romantic, luxury bouquets and full-service event florals for weddings, celebrations, and everyday moments."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:site_name",
				content: "Hyper Petals Decor"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: "Hyper Petals Decor — Premium Bouquets & Event Florals"
			},
			{
				name: "twitter:description",
				content: "Hyper Petals Decor crafts romantic, luxury bouquets and full-service event florals for weddings, celebrations, and everyday moments."
			},
			{
				property: "og:image",
				content: "https://hyper-petals.vercel.app/og-image.png"
			},
			{
				name: "twitter:image",
				content: "https://hyper-petals.vercel.app/og-image.png"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				type: "image/png",
				href: "/favicon.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClerkProvider, { children }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$23.useRouteContext();
	const loc = useLocation();
	const isAdminArea = loc.pathname.startsWith("/admin") || loc.pathname === "/auth";
	const isCheckout = loc.pathname === "/checkout";
	const hideHeaderFooter = isAdminArea || isCheckout;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-screen flex-col bg-background text-foreground",
			children: [
				!hideHeaderFooter && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				}),
				!hideHeaderFooter && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {}),
				!hideHeaderFooter && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppButton, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
					position: "top-right",
					richColors: true
				})
			]
		}) })
	});
}
var $$splitComponentImporter$21 = () => import("./routes-Vvx4C0tA.mjs");
var Route$22 = createFileRoute("/")({
	component: lazyRouteComponent($$splitComponentImporter$21, "component"),
	head: () => ({
		meta: [
			{ title: "Hyper Petals & Decor — Romantic Luxury Florals" },
			{
				name: "description",
				content: "Hand-tied bouquets and full-service event florals from Hyper Petals Decor. Order signature arrangements or enquire about your next celebration."
			},
			{
				property: "og:title",
				content: "Hyper Petals & Decor"
			},
			{
				property: "og:description",
				content: "Hand-tied bouquets and full-service event florals."
			},
			{
				property: "og:url",
				content: "/"
			}
		],
		links: [{
			rel: "canonical",
			href: "/"
		}]
	})
});
var $$splitComponentImporter$20 = () => import("./route-Di7iQBCH.mjs");
var checkAuthFn = createServerFn().handler(createSsrRpc("d689aea8e830972b0e4feeb279cbaa4916d4d159555731905062a836b90546b8"));
var Route$21 = createFileRoute("/_authenticated")({
	beforeLoad: async () => await checkAuthFn(),
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
var $$splitComponentImporter$19 = () => import("./auth-oA2sGE2k.mjs");
var Route$20 = createFileRoute("/auth")({
	component: lazyRouteComponent($$splitComponentImporter$19, "component"),
	head: () => ({ meta: [{ title: "Admin Sign In — Hyper Petals Decor" }, {
		name: "robots",
		content: "noindex"
	}] })
});
var Route$19 = createFileRoute("/bouquets")({ beforeLoad: () => {
	throw redirect({
		to: "/catalogue",
		replace: true
	});
} });
var $$splitComponentImporter$18 = () => import("./checkout-DA2L1lzI.mjs");
var Route$18 = createFileRoute("/checkout")({
	component: lazyRouteComponent($$splitComponentImporter$18, "component"),
	head: () => ({ meta: [{ title: "Secure Checkout — Hyper Petals Decor" }, {
		name: "description",
		content: "Complete your premium hand-tied bouquet order securely."
	}] })
});
var $$splitComponentImporter$17 = () => import("./contact-CdfrGiBE.mjs");
var Route$17 = createFileRoute("/contact")({
	component: lazyRouteComponent($$splitComponentImporter$17, "component"),
	head: () => ({
		meta: [
			{ title: "Contact & Enquiries — Hyper Petals Decor" },
			{
				name: "description",
				content: "Get in touch with Hyper Petals Decor for bouquet orders, event florals and bespoke enquiries. WhatsApp, phone, email or send us a message."
			},
			{
				property: "og:title",
				content: "Contact & Enquiries — Hyper Petals Decor"
			},
			{
				property: "og:description",
				content: "Get in touch for bouquets, event florals and bespoke enquiries."
			},
			{
				property: "og:url",
				content: "/contact"
			}
		],
		links: [{
			rel: "canonical",
			href: "/contact"
		}]
	})
});
var $$splitComponentImporter$16 = () => import("./gallery-FwNreNF7.mjs");
var Route$16 = createFileRoute("/gallery")({
	component: lazyRouteComponent($$splitComponentImporter$16, "component"),
	head: () => ({
		meta: [
			{ title: "Bouquets & Event Portfolio — Hyper Petals Decor" },
			{
				name: "description",
				content: "Browse Hyper Petals Decor's signature bouquets and a portfolio of past weddings, corporate events, and bespoke floral installations."
			},
			{
				property: "og:title",
				content: "Bouquets & Event Portfolio — Hyper Petals Decor"
			},
			{
				property: "og:description",
				content: "Signature bouquets and a portfolio of past events."
			},
			{
				property: "og:url",
				content: "/gallery"
			}
		],
		links: [{
			rel: "canonical",
			href: "/gallery"
		}]
	})
});
var $$splitComponentImporter$15 = () => import("./occasions-PUZEu5wS.mjs");
var Route$15 = createFileRoute("/occasions")({ component: lazyRouteComponent($$splitComponentImporter$15, "component") });
var $$splitComponentImporter$14 = () => import("./admin-bNy43xtm.mjs");
var requireAdminFn = createServerFn().handler(createSsrRpc("6b73bbcabad50b9bb1bd3d11cc6735299ff09f25797d4ceebaf3941af3365220"));
var Route$14 = createFileRoute("/_authenticated/admin")({
	beforeLoad: async () => {
		try {
			await requireAdminFn();
		} catch {
			throw redirect({ to: "/" });
		}
	},
	component: lazyRouteComponent($$splitComponentImporter$14, "component"),
	head: () => ({ meta: [{ title: "Admin — Hyper Petals Decor" }, {
		name: "robots",
		content: "noindex"
	}] })
});
var $$splitComponentImporter$13 = () => import("./occasions.index-BJFSrcx_.mjs");
var Route$13 = createFileRoute("/occasions/")({
	component: lazyRouteComponent($$splitComponentImporter$13, "component"),
	head: () => ({
		meta: [
			{ title: "Occasions — Hyper Petals Decor, Kampala" },
			{
				name: "description",
				content: "Birthday parties, bridal & baby showers, marriage proposals and Kwanjula décor by Hyper Petals Decor — full-service styling across Kampala and Uganda."
			},
			{
				property: "og:title",
				content: "Occasions — Hyper Petals Decor"
			},
			{
				property: "og:description",
				content: "Full-service event florals for every celebration in Uganda."
			},
			{
				property: "og:url",
				content: "/occasions"
			}
		],
		links: [{
			rel: "canonical",
			href: "/occasions"
		}]
	})
});
var $$splitComponentImporter$12 = () => import("./occasions.baby-showers-DQR2eA_H.mjs");
var Route$12 = createFileRoute("/occasions/baby-showers")({
	component: lazyRouteComponent($$splitComponentImporter$12, "component"),
	head: () => ({
		meta: [
			{ title: "Baby Shower Décor & Gender Reveals — Hyper Petals Decor, Kampala" },
			{
				name: "description",
				content: "Baby shower styling in Uganda — soft-toned balloon arches, \"Oh Baby\" backdrops and gender-reveal setups designed around mum-to-be."
			},
			{
				property: "og:title",
				content: "Baby Shower Styling — Hyper Petals Decor"
			},
			{
				property: "og:description",
				content: "Soft pastel and gender-neutral baby shower décor."
			},
			{
				property: "og:image",
				content: baby_shower_default
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:image",
				content: baby_shower_default
			}
		],
		links: [{
			rel: "canonical",
			href: "/occasions/baby-showers"
		}]
	})
});
var $$splitComponentImporter$11 = () => import("./occasions.birthday-parties-BF-Djr7q.mjs");
var Route$11 = createFileRoute("/occasions/birthday-parties")({
	component: lazyRouteComponent($$splitComponentImporter$11, "component"),
	head: () => ({
		meta: [
			{ title: "Birthday Party Décor & Balloons — Hyper Petals & Decor, Kampala" },
			{
				name: "description",
				content: "Birthday party styling in Kampala — themed balloon arches, backdrops, cake tables and full décor for kids' parties, sweet sixteens and milestone birthdays."
			},
			{
				property: "og:title",
				content: "Birthday Party Décor — Hyper Petals & Decor"
			},
			{
				property: "og:description",
				content: "Themed birthday styling across Uganda."
			},
			{
				property: "og:image",
				content: birthday_party_default
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:image",
				content: birthday_party_default
			}
		],
		links: [{
			rel: "canonical",
			href: "/occasions/birthday-parties"
		}]
	})
});
var $$splitComponentImporter$10 = () => import("./occasions.bridal-showers-DDidx9Gv.mjs");
var Route$10 = createFileRoute("/occasions/bridal-showers")({
	component: lazyRouteComponent($$splitComponentImporter$10, "component"),
	head: () => ({
		meta: [
			{ title: "Bridal Shower Décor & Styling — Hyper Petals & Decor, Kampala" },
			{
				name: "description",
				content: "Bridal shower styling in Uganda — blush, gold and ivory balloon arches, table setups and floral accents designed around the bride-to-be."
			},
			{
				property: "og:title",
				content: "Bridal Shower Styling — Hyper Petals & Decor"
			},
			{
				property: "og:description",
				content: "Blush, gold and ivory bridal shower décor."
			},
			{
				property: "og:image",
				content: bridal_shower_party_default
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:image",
				content: bridal_shower_party_default
			}
		],
		links: [{
			rel: "canonical",
			href: "/occasions/bridal-showers"
		}]
	})
});
var $$splitComponentImporter$9 = () => import("./occasions.corporate_brand-events-Dpa5LktG.mjs");
var Route$9 = createFileRoute("/occasions/corporate&brand-events")({
	component: lazyRouteComponent($$splitComponentImporter$9, "component"),
	head: () => ({
		meta: [
			{ title: "Corporate & Brand Events — Hyper Petals & Decor, Kampala" },
			{
				name: "description",
				content: "Birthday party styling in Kampala — themed balloon arches, backdrops, cake tables and full décor for kids' parties, sweet sixteens and milestone birthdays."
			},
			{
				property: "og:title",
				content: "Birthday Party Décor — Hyper Petals & Decor"
			},
			{
				property: "og:description",
				content: "Themed birthday styling across Uganda."
			},
			{
				property: "og:image",
				content: team_default
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:image",
				content: team_default
			}
		],
		links: [{
			rel: "canonical",
			href: "/occasions/corporate&brand-events"
		}]
	})
});
var $$splitComponentImporter$8 = () => import("./occasions.kwanjula-CNT2ZDJg.mjs");
var Route$8 = createFileRoute("/occasions/kwanjula")({
	component: lazyRouteComponent($$splitComponentImporter$8, "component"),
	head: () => ({
		meta: [
			{ title: "Kwanjula & Kukyala Ceremony Décor — Hyper Petals & Decor" },
			{
				name: "description",
				content: "Kwanjula and Kuhingira décor across Uganda — tent draping, mat and canopy styling, gift-basket displays and family-colour theming for introduction ceremonies."
			},
			{
				property: "og:title",
				content: "Kwanjula Décor — Hyper Petals & Decor"
			},
			{
				property: "og:description",
				content: "Traditional ceremony styling built around your family colours."
			},
			{
				property: "og:image",
				content: decoration_003_default
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:image",
				content: decoration_003_default
			}
		],
		links: [{
			rel: "canonical",
			href: "/occasions/kwanjula"
		}]
	})
});
var $$splitComponentImporter$7 = () => import("./occasions.tea-parties-CwXedDpt.mjs");
var Route$7 = createFileRoute("/occasions/tea-parties")({
	component: lazyRouteComponent($$splitComponentImporter$7, "component"),
	head: () => ({
		meta: [
			{ title: "Tea Parties — Hyper Petals & Decor, Kampala" },
			{
				name: "description",
				content: "Birthday party styling in Kampala — themed balloon arches, backdrops, cake tables and full décor for kids' parties, sweet sixteens and milestone birthdays."
			},
			{
				property: "og:title",
				content: "Birthday Party Décor — Hyper Petals & Decor"
			},
			{
				property: "og:description",
				content: "Themed birthday styling across Uganda."
			},
			{
				property: "og:image",
				content: tea_default
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:image",
				content: tea_default
			}
		],
		links: [{
			rel: "canonical",
			href: "/occasions/tea-parties"
		}]
	})
});
var $$splitComponentImporter$6 = () => import("./occasions.wedding-proposals-COzhiemn.mjs");
var Route$6 = createFileRoute("/occasions/wedding-proposals")({
	component: lazyRouteComponent($$splitComponentImporter$6, "component"),
	head: () => ({
		meta: [
			{ title: "Marriage Proposal Setups — Hyper Petals & Decor, Kampala" },
			{
				name: "description",
				content: "Discreet, romantic marriage proposal setups across Uganda — rooftop, lakeside, garden and suite styling with florals, candles and full venue scouting."
			},
			{
				property: "og:title",
				content: "Marriage Proposal Setups — Hyper Petals & Decor"
			},
			{
				property: "og:description",
				content: "Rooftop, lakeside and garden proposal styling."
			},
			{
				property: "og:image",
				content: proposal_africa_default
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:image",
				content: proposal_africa_default
			}
		],
		links: [{
			rel: "canonical",
			href: "/occasions/wedding-proposals"
		}]
	})
});
var $$splitComponentImporter$5 = () => import("./sign-in._-DWqn34AZ.mjs");
var Route$5 = createFileRoute("/sign-in/$")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./sign-up._-DKl6-cuY.mjs");
var Route$4 = createFileRoute("/sign-up/$")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./admin.index-D0-N7v4d.mjs");
var Route$3 = createFileRoute("/_authenticated/admin/")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./admin.content-CYusT-V9.mjs");
var Route$2 = createFileRoute("/_authenticated/admin/content")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./admin.gallery-BVVpBEoI.mjs");
var Route$1 = createFileRoute("/_authenticated/admin/gallery")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./admin.products-jX3U8MBo.mjs");
var Route = createFileRoute("/_authenticated/admin/products")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$22.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$23
});
var AuthenticatedRouteRoute = Route$21.update({
	id: "/_authenticated",
	getParentRoute: () => Route$23
});
var AuthRoute = Route$20.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$23
});
var BouquetsRoute = Route$19.update({
	id: "/bouquets",
	path: "/bouquets",
	getParentRoute: () => Route$23
});
var CatalogueRoute = Route$24.update({
	id: "/catalogue",
	path: "/catalogue",
	getParentRoute: () => Route$23
});
var CheckoutRoute = Route$18.update({
	id: "/checkout",
	path: "/checkout",
	getParentRoute: () => Route$23
});
var ContactRoute = Route$17.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$23
});
var GalleryRoute = Route$16.update({
	id: "/gallery",
	path: "/gallery",
	getParentRoute: () => Route$23
});
var OccasionsRoute = Route$15.update({
	id: "/occasions",
	path: "/occasions",
	getParentRoute: () => Route$23
});
var ProductDetailRoute = Route$25.update({
	id: "/product-detail",
	path: "/product-detail",
	getParentRoute: () => Route$23
});
var AuthenticatedAdminRoute = Route$14.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => AuthenticatedRouteRoute
});
var OccasionsIndexRoute = Route$13.update({
	id: "/",
	path: "/",
	getParentRoute: () => OccasionsRoute
});
var OccasionsBabyShowersRoute = Route$12.update({
	id: "/baby-showers",
	path: "/baby-showers",
	getParentRoute: () => OccasionsRoute
});
var OccasionsBirthdayPartiesRoute = Route$11.update({
	id: "/birthday-parties",
	path: "/birthday-parties",
	getParentRoute: () => OccasionsRoute
});
var OccasionsBridalShowersRoute = Route$10.update({
	id: "/bridal-showers",
	path: "/bridal-showers",
	getParentRoute: () => OccasionsRoute
});
var OccasionsCorporateChar38brandEventsRoute = Route$9.update({
	id: "/corporate&brand-events",
	path: "/corporate&brand-events",
	getParentRoute: () => OccasionsRoute
});
var OccasionsKwanjulaRoute = Route$8.update({
	id: "/kwanjula",
	path: "/kwanjula",
	getParentRoute: () => OccasionsRoute
});
var OccasionsTeaPartiesRoute = Route$7.update({
	id: "/tea-parties",
	path: "/tea-parties",
	getParentRoute: () => OccasionsRoute
});
var OccasionsWeddingProposalsRoute = Route$6.update({
	id: "/wedding-proposals",
	path: "/wedding-proposals",
	getParentRoute: () => OccasionsRoute
});
var SignInSplatRoute = Route$5.update({
	id: "/sign-in/$",
	path: "/sign-in/$",
	getParentRoute: () => Route$23
});
var SignUpSplatRoute = Route$4.update({
	id: "/sign-up/$",
	path: "/sign-up/$",
	getParentRoute: () => Route$23
});
var AuthenticatedAdminIndexRoute = Route$3.update({
	id: "/",
	path: "/",
	getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminRouteChildren = {
	AuthenticatedAdminContentRoute: Route$2.update({
		id: "/content",
		path: "/content",
		getParentRoute: () => AuthenticatedAdminRoute
	}),
	AuthenticatedAdminGalleryRoute: Route$1.update({
		id: "/gallery",
		path: "/gallery",
		getParentRoute: () => AuthenticatedAdminRoute
	}),
	AuthenticatedAdminProductsRoute: Route.update({
		id: "/products",
		path: "/products",
		getParentRoute: () => AuthenticatedAdminRoute
	}),
	AuthenticatedAdminIndexRoute
};
var AuthenticatedRouteRouteChildren = { AuthenticatedAdminRoute: AuthenticatedAdminRoute._addFileChildren(AuthenticatedAdminRouteChildren) };
var AuthenticatedRouteRouteWithChildren = AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren);
var OccasionsRouteChildren = {
	OccasionsBabyShowersRoute,
	OccasionsBirthdayPartiesRoute,
	OccasionsBridalShowersRoute,
	OccasionsCorporateChar38brandEventsRoute,
	OccasionsKwanjulaRoute,
	OccasionsTeaPartiesRoute,
	OccasionsWeddingProposalsRoute,
	OccasionsIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRouteWithChildren,
	AuthRoute,
	BouquetsRoute,
	CatalogueRoute,
	CheckoutRoute,
	ContactRoute,
	GalleryRoute,
	OccasionsRoute: OccasionsRoute._addFileChildren(OccasionsRouteChildren),
	ProductDetailRoute,
	SignInSplatRoute,
	SignUpSplatRoute
};
var routeTree = Route$23._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
