import { i as __toESM } from "../_runtime.mjs";
import { v as require_jsx_runtime, y as require_react } from "../_libs/@clerk/react+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/media-carousel-BC_p4F96.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
/**
* Continuous marquee media strip with a click-to-zoom lightbox. The strip
* scrolls forever via a CSS animation (seamless because the item list is
* rendered twice back-to-back) and pauses on hover so a slide can be clicked.
*/
function MediaCarousel({ items, direction = "left", speed = 4.5, dotClassName = "bg-primary" }) {
	const [lightbox, setLightbox] = (0, import_react.useState)(null);
	const lightboxNext = () => setLightbox((i) => i === null ? null : (i + 1) % items.length);
	const lightboxPrev = () => setLightbox((i) => i === null ? null : (i - 1 + items.length) % items.length);
	(0, import_react.useEffect)(() => {
		if (lightbox === null) return;
		const onKey = (e) => {
			if (e.key === "Escape") setLightbox(null);
			if (e.key === "ArrowRight") lightboxNext();
			if (e.key === "ArrowLeft") lightboxPrev();
		};
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [lightbox, items.length]);
	const touchStartX = (0, import_react.useRef)(null);
	const onLightboxTouchStart = (e) => {
		touchStartX.current = e.touches[0].clientX;
	};
	const onLightboxTouchEnd = (e) => {
		if (touchStartX.current === null) return;
		const delta = e.changedTouches[0].clientX - touchStartX.current;
		touchStartX.current = null;
		if (Math.abs(delta) < 40) return;
		if (delta < 0) lightboxNext();
		else lightboxPrev();
	};
	if (items.length === 0) return null;
	const trackItems = [...items, ...items];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative mt-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "marquee-viewport overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `marquee-track flex w-max gap-3.5 ${direction === "right" ? "marquee-reverse" : ""}`,
				style: { animationDuration: `${items.length * speed}s` },
				children: trackItems.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setLightbox(i % items.length),
					className: "group relative shrink-0 w-[75vw] max-w-[320px] overflow-hidden rounded-2xl text-left sm:w-[300px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted",
						children: item.video ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
							src: item.src,
							muted: true,
							playsInline: true,
							className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: item.src,
							alt: item.alt ?? "",
							loading: "lazy",
							className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
						})
					}), item.video && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "pointer-events-none absolute inset-0 flex items-center justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex h-11 w-11 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm",
							children: "▶"
						})
					})]
				}, i))
			})
		}), lightbox !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 md:p-10",
			onClick: () => setLightbox(null),
			onTouchStart: onLightboxTouchStart,
			onTouchEnd: onLightboxTouchEnd,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative max-h-[85vh] w-full max-w-3xl",
				onClick: (e) => e.stopPropagation(),
				children: [
					items[lightbox].video ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
						src: items[lightbox].src,
						controls: true,
						autoPlay: true,
						className: "max-h-[85vh] w-full rounded-lg object-contain shadow-2xl"
					}, lightbox) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: items[lightbox].src,
						alt: items[lightbox].alt ?? "",
						className: "max-h-[85vh] w-full rounded-lg object-contain shadow-2xl"
					}, lightbox),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setLightbox(null),
						"aria-label": "Close",
						className: "absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition hover:bg-white/20",
						children: "✕"
					}),
					items.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "absolute -top-12 left-0 text-xs tracking-wide text-white/60",
							children: [
								lightbox + 1,
								" / ",
								items.length
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: (e) => {
								e.stopPropagation();
								lightboxPrev();
							},
							"aria-label": "Previous slide",
							className: "absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-xl text-white transition hover:bg-black/80 md:-left-14",
							children: "‹"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: (e) => {
								e.stopPropagation();
								lightboxNext();
							},
							"aria-label": "Next slide",
							className: "absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-xl text-white transition hover:bg-black/80 md:-right-14",
							children: "›"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 flex justify-center gap-1.5",
							children: items.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: (e) => {
									e.stopPropagation();
									setLightbox(i);
								},
								"aria-label": `Go to slide ${i + 1}`,
								className: `h-1.5 rounded-full transition-all ${i === lightbox ? `w-5 ${dotClassName}` : "w-1.5 bg-white/30"}`
							}, i))
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-center text-xs text-white/55",
						children: [items.length > 1 ? "Swipe or use ‹ › to browse · " : "", "Esc or ✕ to close"]
					})
				]
			})
		})]
	});
}
//#endregion
export { MediaCarousel as t };
