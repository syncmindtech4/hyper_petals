import { i as __toESM } from "../_runtime.mjs";
import { v as require_jsx_runtime } from "../_libs/@clerk/react+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as getPublicGallery } from "./cms.functions-CoGRr0hG.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as decoration_003_default } from "./decoration_003-B1DE_iHL.mjs";
import { t as MediaCarousel } from "./media-carousel-BC_p4F96.mjs";
import { t as decoration_001_default } from "./decoration_001-x0bW2Qlt.mjs";
import { t as decoration_002_default } from "./decoration_002-Dr83HNXA.mjs";
import { t as decoration_004_default } from "./decoration_004-BzA5Fxw5.mjs";
import { t as bouquet_005_default } from "./bouquet_005-CUZcOrQh.mjs";
import { t as bouquet_010_default } from "./bouquet_010-C3lI7eUO.mjs";
import { n as bouquet_007_default, r as bouquet_014_default, t as bouquet_003_default } from "./bouquet_014-D1puND5f.mjs";
import { t as bouquet_018_default } from "./bouquet_018-CuLekLG4.mjs";
import { n as decoration_000_default, t as bouquet_015_default } from "./decoration_000-CCZBLppl.mjs";
import { t as bouquet_019_default } from "./bouquet_019-BBv0xuxh.mjs";
import { t as bouquet_020_default } from "./bouquet_020-DLlc8MY0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/gallery-FwNreNF7.js
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var gallery_hero_default = "/assets/gallery-hero-B6ITgWog.png";
var bands = [
	{
		key: "birthday",
		eyebrow: "Birthday Parties",
		eyebrowClass: "text-[#E4C877]",
		heading: "Every theme, every age.",
		link: "/occasions/birthday-parties",
		linkLabel: "View Birthday page",
		bandClass: "bg-gradient-to-br from-[#3a2c10] to-[#0d1a13]",
		headingClass: "text-[color:var(--cream)]",
		bodyClass: "text-white/75",
		dotClassName: "bg-[#E4C877]",
		images: [
			decoration_001_default,
			decoration_002_default,
			decoration_003_default,
			decoration_004_default,
			bouquet_005_default,
			bouquet_010_default
		]
	},
	{
		key: "bridal",
		eyebrow: "Bridal Showers",
		eyebrowClass: "text-[#E4C877]",
		heading: "Real setups, real brides.",
		link: "/occasions/bridal-showers",
		linkLabel: "View Bridal Shower page",
		bandClass: "bg-gradient-to-br from-[#2A4A35] to-[#122219]",
		headingClass: "text-[color:var(--cream)]",
		bodyClass: "text-white/75",
		dotClassName: "bg-[#E8B7B4]",
		images: [
			bouquet_003_default,
			bouquet_007_default,
			decoration_001_default,
			decoration_002_default,
			bouquet_014_default,
			bouquet_018_default
		]
	},
	{
		key: "baby",
		eyebrow: "Baby Showers",
		eyebrowClass: "text-[#E4C877]",
		heading: "Boy, girl, or beautifully neutral.",
		link: "/occasions/baby-showers",
		linkLabel: "View Baby Shower page",
		bandClass: "bg-gradient-to-br from-[#1e3a4a] to-[#122219]",
		headingClass: "text-[color:var(--cream)]",
		bodyClass: "text-white/75",
		dotClassName: "bg-[#B9CDE0]",
		images: [
			decoration_003_default,
			decoration_004_default,
			bouquet_010_default,
			bouquet_015_default,
			decoration_000_default,
			bouquet_019_default
		]
	},
	{
		key: "proposal",
		eyebrow: "Marriage Proposals",
		eyebrowClass: "text-[#E4C877]",
		heading: "Every setup, kept secret until the moment.",
		link: "/occasions/wedding-proposals",
		linkLabel: "View Proposals page",
		bandClass: "bg-gradient-to-b from-[#0d1a13] to-[#051009]",
		headingClass: "text-[color:var(--cream)]",
		bodyClass: "text-white/70",
		dotClassName: "bg-[#C6992F]",
		images: [
			bouquet_003_default,
			decoration_004_default,
			bouquet_014_default,
			decoration_001_default,
			bouquet_020_default,
			bouquet_007_default
		]
	},
	{
		key: "tea",
		eyebrow: "Tea Parties",
		eyebrowClass: "text-[#6E2434]",
		heading: "Delicate, unhurried, beautifully set.",
		link: "/occasions/tea-parties",
		linkLabel: "View Tea Parties page",
		bandClass: "bg-gradient-to-br from-[#F3E3D8] via-[#F1EADA] to-[#FBF6EC] border-y border-border/60",
		headingClass: "text-foreground",
		bodyClass: "text-foreground/65",
		dotClassName: "bg-[#D9A6A0]",
		images: [
			decoration_001_default,
			decoration_002_default,
			decoration_003_default,
			decoration_004_default,
			bouquet_005_default,
			bouquet_010_default
		]
	},
	{
		key: "corporate",
		eyebrow: "Corporate & Brand Events",
		eyebrowClass: "text-[#E4C877]",
		heading: "From a lobby refresh to a 300-guest gala.",
		link: "/occasions/corporate&brand-events",
		linkLabel: "View Corporate page",
		bandClass: "bg-[#20262A]",
		headingClass: "text-[color:var(--cream)]",
		bodyClass: "text-white/70",
		dotClassName: "bg-[#C6992F]",
		images: [
			decoration_001_default,
			decoration_002_default,
			decoration_003_default,
			decoration_004_default,
			bouquet_005_default,
			bouquet_010_default
		]
	},
	{
		key: "kwanjula",
		eyebrow: "Kwanjula & Traditional Ceremonies",
		eyebrowClass: "text-[#E4C877]",
		heading: "From intimate family gatherings to 300+ guests.",
		link: "/occasions/kwanjula",
		linkLabel: "View Kwanjula page",
		bandClass: "bg-gradient-to-br from-[#4A2E1D] to-[#122219]",
		headingClass: "text-[color:var(--cream)]",
		bodyClass: "text-white/75",
		dotClassName: "bg-[#B5602E]",
		images: [
			decoration_000_default,
			decoration_001_default,
			decoration_002_default,
			decoration_003_default,
			bouquet_015_default,
			bouquet_020_default
		]
	}
];
function Gallery() {
	const { data: adminItems = [] } = useQuery({
		queryKey: ["public_gallery"],
		queryFn: () => getPublicGallery()
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative flex min-h-[660px] items-center overflow-hidden border-b border-border/60 text-white md:min-h-[500px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: gallery_hero_default,
					alt: "Roses and hand-tied floral arrangement",
					loading: "eager",
					fetchPriority: "high",
					className: "absolute inset-0 h-full w-full object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-[#5C1D24]/65 via-[#5C1D24]/45 to-[#5C1D24]/68" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative z-10 mx-auto max-w-7xl px-6 py-24 md:py-28",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-2xl text-left flex flex-col items-start space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow text-white/90",
								children: "Shop"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-serif text-5xl leading-[1.05] text-white md:text-6xl",
								children: "Signature bouquets, ready to order."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "max-w-2xl text-base leading-relaxed text-white/90",
								children: "Same-day delivery across Kampala on orders placed before 11am. All bouquets are hand-tied in our studio the morning of delivery."
							})
						]
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-t border-border/60 bg-[oklch(0.955_0.012_60)]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-6 py-16 text-center md:py-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow justify-center",
						children: "Gallery"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mx-auto mt-4 max-w-2xl font-serif text-4xl leading-[1.1] text-foreground md:text-5xl",
						children: "Every occasion, in photos."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground",
						children: "Browse real setups by occasion. Click any photo to see it full-size — the carousel keeps playing behind it, so you can close the zoom and pick up right where it left off."
					})
				]
			})
		}),
		bands.map((band, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: band.bandClass,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-6 py-16 md:py-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-end justify-between gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: `eyebrow ${band.eyebrowClass}`,
						children: band.eyebrow
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: `mt-2 font-serif text-3xl md:text-4xl ${band.headingClass}`,
						children: band.heading
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: band.link,
						className: `whitespace-nowrap border-b pb-0.5 text-[13px] ${band.headingClass} ${band.bodyClass} border-current opacity-85 hover:opacity-100`,
						children: [band.linkLabel, " →"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaCarousel, {
					items: band.images.map((src) => ({ src })),
					dotClassName: band.dotClassName,
					direction: i % 2 === 0 ? "left" : "right"
				})]
			})
		}, band.key)),
		adminItems.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-t border-border/60 bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-6 py-16 md:py-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "Behind the scenes"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-serif text-3xl text-foreground md:text-4xl",
					children: "Fresh from the studio."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaCarousel, {
					items: adminItems.map((item) => ({
						src: item.public_url,
						alt: item.alt_text ?? item.title ?? "",
						video: item.kind === "video"
					})),
					dotClassName: "bg-primary",
					direction: bands.length % 2 === 0 ? "left" : "right"
				})]
			})
		})
	] });
}
//#endregion
export { Gallery as component };
