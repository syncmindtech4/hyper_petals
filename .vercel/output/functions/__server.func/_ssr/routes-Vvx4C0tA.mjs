import { i as __toESM } from "../_runtime.mjs";
import { v as require_jsx_runtime } from "../_libs/@clerk/react+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useHero } from "./useSiteContent-Dfn_bZBC.mjs";
import { r as useProducts } from "./useProducts-BtNG2CQt.mjs";
import { t as hero_bouquet_default } from "./hero-bouquet-CYnx_bTr.mjs";
import { n as waLink, t as site } from "./site-Wk8BehLF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Vvx4C0tA.js
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var gallery_workshop_default = "/assets/gallery-workshop-D6itFs_O.jpg";
function ProductCard({ product }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200/80 dark:border-slate-800 max-w-sm relative group overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative overflow-hidden rounded-sm bg-muted",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: product.image,
				alt: product.name,
				loading: "lazy",
				className: "aspect-[4/5] w-full h-90 object-cover transition-transform duration-700 ease-out group-hover:scale-105"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute left-4 top-4 rounded-sm bg-background/85 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-primary backdrop-blur",
				children: product.category
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-4 mb-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 flex items-baseline justify-between gap-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-serif text-xl text-foreground",
						children: product.name
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-relaxed text-muted-foreground",
					children: product.description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: waLink(`Hi Hyper Petals & Decor, I'd love to order the ${product.name}.`),
					target: "_blank",
					rel: "noopener noreferrer",
					className: "mt-4 inline-flex w-max items-center gap-2 border-b border-primary pb-1 text-[11px] uppercase tracking-[0.22em] text-primary transition-opacity hover:opacity-70",
					children: "Order via WhatsApp"
				})
			]
		})]
	});
}
function Home() {
	const { data: products, isFetching } = useProducts();
	const featured = products.slice(0, 3);
	const isInitialProductsLoad = isFetching && products.length === 0;
	const { data: h } = useHero();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "relative overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-7xl gap-10 px-6 pb-16 pt-14 md:grid-cols-12 md:gap-8 md:pb-24 md:pt-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "md:col-span-6 md:pt-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: h.eyebrow
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-5 font-serif text-5xl leading-[1.05] text-foreground md:text-[68px]",
							children: [h.titleLead, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "italic text-primary",
								children: [
									" ",
									h.titleItalic,
									" "
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 max-w-full text-base leading-relaxed text-muted-foreground",
							children: h.subtitle
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-9 flex flex-wrap items-center gap-12",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/catalogue",
								className: "rounded-lg bg-primary px-7 py-3.5 text-[11px] uppercase tracking-[0.24em] text-primary-foreground transition-colors hover:bg-primary/90",
								children: "Shop bouquets"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/occasions",
								className: "border-b border-foreground/60 pb-1 text-[11px] uppercase tracking-[0.24em] text-foreground transition-colors hover:border-primary hover:text-primary",
								children: "Explore Occasions ↓"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-14 sm:grid-col grid max-w-full grid-cols-3 gap-6 border-t border-border/70 pt-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-[10px] uppercase tracking-[0.22em] text-muted-foreground",
									children: h.stat1Label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-2 font-serif text-2xl text-foreground",
									children: h.stat1Value
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-[10px] uppercase tracking-[0.22em] text-muted-foreground",
									children: h.stat2Label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-2 font-serif text-2xl text-foreground",
									children: h.stat2Value
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "lg::hidden max-w-full",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-[10px] uppercase tracking-[0.22em] text-muted-foreground",
										children: h.stat3Label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "mt-2 font-serif text-2xl text-foreground",
										children: h.stat3Value
									})]
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative md:col-span-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: hero_bouquet_default,
						alt: "Luxury bouquet of blush and burgundy roses",
						width: 1600,
						height: 1200,
						className: "aspect-[4/5] w-full rounded-2xl object-cover shadow-[var(--shadow-soft)]"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute -bottom-6 -left-6 hidden max-w-[240px] rounded-2xl border border-border/60 bg-background/95 p-5 shadow-[var(--shadow-card)] backdrop-blur md:block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 backdrop-blur-xl rounded-2xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative z-10 rounded-2xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow",
								children: "Now Booking"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-serif text-lg leading-snug text-foreground",
								children: "Birthday setups for any month of your choice."
							})]
						})]
					})]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "vine-divider",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				viewBox: "0 0 640 40",
				xmlns: "http://www.w3.org/2000/svg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M0 20 Q 40 0, 80 20 T 160 20 T 240 20 T 320 20 T 400 20 T 480 20 T 560 20 T 640 20",
					stroke: "#1F3D2B",
					"stroke-width": "1.3",
					fill: "none"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					fill: "#C6992F",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "80",
							cy: "20",
							r: "3"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "240",
							cy: "20",
							r: "3"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "400",
							cy: "20",
							r: "3"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "560",
							cy: "20",
							r: "3"
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-border/60",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-6 py-20 md:py-28",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-end justify-between gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "Featured"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-serif text-4xl text-foreground md:text-5xl",
						children: "The signature collection"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/gallery",
						className: "border-b border-primary pb-1 text-[11px] uppercase tracking-[0.22em] text-primary hover:opacity-70",
						children: "View all bouquets →"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 grid gap-10 md:grid-cols-3",
					children: isInitialProductsLoad ? Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "animate-pulse",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "aspect-[4/5] rounded-2xl bg-muted/70" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-4 h-3 w-2/3 rounded bg-muted/70" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-2 h-3 w-1/3 rounded bg-muted/70" })
						]
					}, i)) : featured.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.id))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-[oklch(0.955_0.012_60)]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: gallery_workshop_default,
					alt: "Florist arranging blush and burgundy roses in the studio",
					loading: "lazy",
					width: 900,
					height: 1100,
					className: "aspect-[4/5] w-full rounded-sm object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "Our studio"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-serif text-4xl leading-tight text-foreground md:text-5xl",
						children: "A love letter to flowers, tied by hand."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-6 text-base leading-relaxed text-muted-foreground",
						children: [
							"We started ",
							site.name,
							" because Kampala deserved florals that felt considered — bouquets that arrive quietly beautiful, and event installations that hold their own next to the moment they were made for."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-base leading-relaxed text-muted-foreground",
						children: "Every arrangement is designed and hand-tied in our Kampala studio using seasonal blooms sourced from farms we trust."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-9 flex flex-wrap gap-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: waLink(),
							target: "_blank",
							rel: "noopener noreferrer",
							className: "border border-border  border-foreground/60 p-2 rounded-xl text-[11px] uppercase tracking-[0.24em] text-foreground hover:border-primary hover:text-primary",
							children: "Message on WhatsApp"
						})
					})
				] })]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-6 py-10 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "Planning something?"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mx-auto mt-4 max-w-7xl font-serif text-4xl leading-tight text-foreground md:text-5xl",
					children: "Birthdays, Baby & Bridal showers, Marriage Proposals, Tea & Corporate Parties, and Kwanjula. — tell us the moment, we'll bring the flowers."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/contact",
					className: "mt-8 inline-flex rounded-sm bg-primary px-8 py-3.5 text-[11px] uppercase tracking-[0.24em] text-primary-foreground hover:bg-primary/90",
					children: "Start an inquiry"
				})
			]
		}) })
	] });
}
//#endregion
export { Home as component };
