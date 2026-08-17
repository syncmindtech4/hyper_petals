import { i as __toESM } from "../_runtime.mjs";
import { v as require_jsx_runtime } from "../_libs/@clerk/react+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as waLink, t as site } from "./site-Wk8BehLF.mjs";
import { t as MediaCarousel } from "./media-carousel-BC_p4F96.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/occasion-detail-BmzAS87h.js
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function OccasionDetail({ cfg }) {
	const quoteMsg = `Hi Hyper Petals & Decor, I'd love a quote for ${cfg.eyebrow.toLowerCase()}.`;
	const isGold = cfg.accent === "gold";
	const galleryItems = cfg.gallery.map((g) => typeof g === "string" ? { src: g } : g);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "sticky top-[64px] z-30 border-b border-border/60 bg-background/90 backdrop-blur",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-7xl px-6 py-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/occasions",
					className: "inline-flex items-center gap-2 text-[13px] text-primary hover:opacity-70",
					children: "← Back to Occasions"
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: `relative overflow-hidden bg-gradient-to-br ${cfg.heroGradient} text-[color:var(--cream)]`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-[1.1fr_.9fr] md:py-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: `eyebrow ${isGold ? "!text-[#E4C877]" : "!text-[#E8B7B4]"}`,
						children: cfg.eyebrow
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 font-serif text-4xl leading-[1.05] md:text-5xl",
						children: cfg.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 max-w-lg text-base leading-relaxed text-white/80",
						children: cfg.intro
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: waLink(quoteMsg),
							target: "_blank",
							rel: "noreferrer",
							className: `inline-flex rounded-xl px-7 py-3.5 text-[11px] uppercase tracking-[0.24em] transition-opacity hover:opacity-90 ${isGold ? "bg-[#C6992F] text-[#0d1a13]" : "bg-primary text-primary-foreground"}`,
							children: "Get a quote"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/contact",
							className: "border-b border-white/60 pb-1 text-[11px] uppercase tracking-[0.24em] text-white/90 hover:opacity-70",
							children: "Contact us ↓"
						})]
					}),
					cfg.chips && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 flex flex-wrap gap-2",
						children: cfg.chips.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full border border-white/25 px-4 py-1.5 text-[12px] text-white/85",
							children: c
						}, c))
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-2xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: cfg.heroImage,
						alt: cfg.eyebrow,
						className: "h-full w-full object-cover"
					})
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-b border-border/60",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-6 py-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "What's included"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 max-w-2xl font-serif text-3xl text-foreground md:text-4xl",
						children: "A setup that looks as good as it feels."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10 grid gap-px bg-border md:grid-cols-3",
						children: cfg.included.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-background p-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-serif text-xl text-foreground",
								children: i.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-muted-foreground",
								children: i.body
							})]
						}, i.title))
					}),
					cfg.extra
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-[oklch(0.955_0.012_60)]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-6 py-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "Recent setups"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-serif text-3xl text-foreground md:text-4xl",
						children: cfg.galleryHeading ?? "Real events, real moments."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaCarousel, {
						items: galleryItems,
						dotClassName: isGold ? "bg-[#C6992F]" : "bg-primary"
					})
				]
			})
		}),
		cfg.tiers && cfg.tiers.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-t border-border/60 bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-6 py-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "Packages"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-serif text-3xl text-foreground md:text-4xl",
						children: "Choose the level of styling you need."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10 grid gap-6 md:grid-cols-3",
						children: cfg.tiers.map((tier) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `flex flex-col rounded-2xl border p-8 ${tier.featured ? "border-transparent bg-[#122219] text-[color:var(--cream)] shadow-2xl" : "border-border/60 bg-card"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: `text-[11px] uppercase tracking-[0.2em] ${tier.featured ? "text-[#E4C877]" : "text-primary"}`,
									children: tier.tag
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 font-serif text-2xl",
									children: tier.amount
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-5 flex-1 space-y-3 text-sm",
									children: tier.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
										className: `border-t pt-3 ${tier.featured ? "border-white/15 text-white/85" : "border-border/60 text-muted-foreground"}`,
										children: item
									}, item))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: waLink(quoteMsg),
									target: "_blank",
									rel: "noreferrer",
									className: `mt-6 rounded-xl px-6 py-3 text-center text-[11px] uppercase tracking-[0.2em] transition-opacity hover:opacity-90 ${tier.featured ? "bg-[#E4C877] text-[#122219]" : "border border-primary text-primary"}`,
									children: "Enquire"
								})
							]
						}, tier.tag))
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-3xl px-6 py-24 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-serif text-2xl italic leading-snug text-foreground md:text-3xl",
					children: [
						"“",
						cfg.testimonial.quote,
						"”"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-sm text-muted-foreground",
					children: cfg.testimonial.cite
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-primary text-primary-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow !text-[#E8B7B4]",
						children: "Request a Quote"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-serif text-4xl leading-tight md:text-5xl",
						children: "Let's plan the moment."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-md text-white/85",
						children: "Share a few details and a stylist will reply — usually the same day. Deposits by MTN MoMo or Airtel Money."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col justify-center gap-4 md:items-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: waLink(quoteMsg),
						target: "_blank",
						rel: "noreferrer",
						className: "inline-flex rounded-2xl bg-background px-8 py-4 text-[11px] uppercase tracking-[0.24em] text-primary hover:opacity-90",
						children: ["WhatsApp ", site.phone]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/contact",
						className: "border-b border-white/60 pb-1 text-[11px] uppercase tracking-[0.24em] text-white/90 hover:opacity-70",
						children: "Send a message →"
					})]
				})]
			})
		})
	] });
}
//#endregion
export { OccasionDetail as t };
