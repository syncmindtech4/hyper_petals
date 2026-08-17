import { i as __toESM } from "../_runtime.mjs";
import { v as require_jsx_runtime } from "../_libs/@clerk/react+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as decoration_003_default } from "./decoration_003-B1DE_iHL.mjs";
import { t as decoration_004_default } from "./decoration_004-BzA5Fxw5.mjs";
import { t as baby_shower_default } from "./baby_shower-C_xZcE8w.mjs";
import { t as birthday_party_default } from "./birthday_party-DSGb-hh6.mjs";
import { t as bridal_shower_party_default } from "./bridal-shower-party-CAirDkBd.mjs";
import { t as tea_default } from "./tea-DIVeYxXT.mjs";
import { t as proposal_africa_default } from "./proposal_africa-BK5r6wXn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/occasions.index-BJFSrcx_.js
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var occasions_hero_default = "/assets/occasions-hero-Cvwy7UMu.jpg";
var cards = [
	{
		to: "/occasions/birthday-parties",
		label: "Birthday Parties",
		tag: "Kids · Sweet 16 · Milestone",
		img: birthday_party_default,
		tint: "from-[#3a2c10]/70 to-[#0d1a13]/85"
	},
	{
		to: "/occasions/bridal-showers",
		label: "Bridal Showers",
		tag: "Blush · Gold · Ivory",
		img: bridal_shower_party_default,
		tint: "from-[#6E2434]/70 to-[#3a1420]/85"
	},
	{
		to: "/occasions/baby-showers",
		label: "Baby Showers",
		tag: "Boy · Girl · Reveal",
		img: baby_shower_default,
		tint: "from-[#5a6f89]/70 to-[#122219]/85"
	},
	{
		to: "/occasions/wedding-proposals",
		label: "Marriage Proposals",
		tag: "Rooftop · Lakeside · Garden",
		img: proposal_africa_default,
		tint: "from-[#6E2434]/70 to-[#0d1a13]/90"
	},
	{
		to: "/occasions/kwanjula",
		label: "Kwanjula & Traditional",
		tag: "Tent · Mat · Family colours",
		img: decoration_003_default,
		tint: "from-[#B5602E]/70 to-[#3a1420]/85"
	},
	{
		to: "/occasions/tea-parties",
		label: "Tea Party",
		tag: "Cups · Spices · Tables",
		img: tea_default,
		tint: "from-[#4E6B56]/70 to-[#122219]/85"
	},
	{
		to: "/occasions/corporate&brand-events",
		label: "Corporate & Brand Events",
		tag: "Classic · Elegant · Unique",
		img: decoration_003_default,
		tint: "from-[#1B2E4A]/70 to-[#0d1a13]/90"
	}
];
function OccasionsIndex() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative flex min-h-[660px] items-center overflow-hidden border-b border-border/60 text-[color:var(--cream)] md:min-h-[500px]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: occasions_hero_default,
				alt: "Elegant floral table setting for a celebration",
				loading: "eager",
				fetchPriority: "high",
				className: "absolute inset-0 h-full w-full object-cover"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-[#122219]/65 via-[#122219]/48 to-[#122219]/70" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 mx-auto max-w-7xl px-6 py-24 md:py-28",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow !text-[#E4C877]",
						children: "Occasions"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 max-w-3xl font-serif text-5xl leading-[1.05] md:text-6xl",
						children: "Every celebration deserves a beautiful setting."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 max-w-2xl text-base leading-relaxed text-white/80",
						children: "From surprise proposals to Kwanjula ceremonies, we design and install floral moments across Uganda — with same-day delivery available on selected setups."
					})
				]
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mx-auto max-w-7xl px-6 py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
			children: [cards.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: c.to,
				className: "group relative block aspect-[5/5] overflow-hidden rounded-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: c.img,
						alt: c.label,
						loading: "lazy",
						className: "absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `absolute inset-0 bg-gradient-to-br ${c.tint} transition-opacity duration-500 group-hover:opacity-40` }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex h-full flex-col justify-end p-8 text-[color:var(--cream)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] uppercase tracking-[0.22em] text-white/75",
								children: c.tag
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-2 font-serif text-3xl md:text-4xl",
								children: c.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-4 inline-block border p-2 border-border rounded-xl border-white/70  text-[11px] uppercase tracking-[0.24em] w-max",
								children: "Explore Occasion →"
							})
						]
					})
				]
			}, c.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "group relative flex aspect-[5/5] md:aspect-auto min-h-[320px] w-full flex-col justify-between overflow-hidden rounded-3xl border border-[#E4C877]/30 bg-[#122219] p-8 md:p-10 text-[color:var(--cream)] md:col-span-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: decoration_004_default,
						alt: "Custom floral setup",
						loading: "lazy",
						className: "absolute inset-0 h-full w-full object-cover opacity-25 transition-transform duration-700 group-hover:scale-105"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-[#122219] via-[#122219]/90 to-[#122219]/60" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative z-10 max-w-xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow !text-[#E4C877]",
								children: "Custom Experience"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-3 font-serif text-3xl md:text-4xl text-white",
								children: "Have something unique in mind?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm md:text-base leading-relaxed text-white/80",
								children: "We style celebrations of every scale across Uganda. Reach out and our team will help bring your exact vision to life."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative z-10 mt-8 flex items-center justify-between",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/contact",
							className: "inline-flex items-center gap-3 rounded-2xl bg-[#E4C877] px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#122219] transition-all hover:bg-white hover:shadow-lg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Start an inquiry" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "transition-transform duration-300 group-hover:translate-x-1",
								children: "→"
							})]
						})
					})
				]
			})]
		})
	})] });
}
//#endregion
export { OccasionsIndex as component };
