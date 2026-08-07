// import { useEffect, useRef, useState } from "react";

// export type CarouselItem = {
//   src: string;
//   alt?: string;
//   video?: boolean;
// };

// /**
//  * Horizontal, snap-scrolling media carousel with autoplay, arrow/dot
//  * navigation, and a click-to-zoom lightbox. Autoplay pauses on hover and
//  * while the lightbox is open, and resumes afterwards.
//  */
// export function MediaCarousel({
//   items,
//   autoplayMs = 4500,
//   dotClassName = "bg-primary",
// }: {
//   items: CarouselItem[];
//   autoplayMs?: number;
//   dotClassName?: string;
// }) {
//   const trackRef = useRef<HTMLDivElement>(null);
//   const hoverRef = useRef(false);
//   const [active, setActive] = useState(0);
//   const [lightbox, setLightbox] = useState<number | null>(null);

//   const slideWidth = () => {
//     const el = trackRef.current;
//     if (!el) return 0;
//     const first = el.querySelector<HTMLElement>("[data-slide]");
//     if (!first) return 0;
//     const gap = parseFloat(getComputedStyle(el).columnGap || "14") || 14;
//     return first.offsetWidth + gap;
//   };

//   const scrollToIndex = (i: number, smooth = true) => {
//     const el = trackRef.current;
//     if (!el || items.length === 0) return;
//     const clamped = ((i % items.length) + items.length) % items.length;
//     el.scrollTo({ left: clamped * slideWidth(), behavior: smooth ? "smooth" : "auto" });
//   };

//   useEffect(() => {
//     if (items.length <= 1) return;
//     const id = setInterval(() => {
//       if (hoverRef.current || lightbox !== null) return;
//       scrollToIndex(active + 1);
//     }, autoplayMs);
//     return () => clearInterval(id);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [active, autoplayMs, lightbox, items.length]);

//   useEffect(() => {
//     const el = trackRef.current;
//     if (!el) return;
//     let raf = 0;
//     const onScroll = () => {
//       cancelAnimationFrame(raf);
//       raf = requestAnimationFrame(() => {
//         const w = slideWidth();
//         if (w) setActive(Math.round(el.scrollLeft / w) % items.length);
//       });
//     };
//     el.addEventListener("scroll", onScroll, { passive: true });
//     return () => {
//       el.removeEventListener("scroll", onScroll);
//       cancelAnimationFrame(raf);
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [items.length]);

//   useEffect(() => {
//     if (lightbox === null) return;
//     const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLightbox(null);
//     document.addEventListener("keydown", onKey);
//     return () => document.removeEventListener("keydown", onKey);
//   }, [lightbox]);

//   if (items.length === 0) return null;

//   return (
//     <div
//       className="relative mt-8"
//       onMouseEnter={() => (hoverRef.current = true)}
//       onMouseLeave={() => (hoverRef.current = false)}
//     >
//       <div
//         ref={trackRef}
//         className="flex gap-3.5 overflow-x-auto scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
//       >
//         {items.map((item, i) => (
//           <button
//             key={i}
//             data-slide
//             type="button"
//             onClick={() => setLightbox(i)}
//             className="group relative shrink-0 basis-[calc(100%-14px)] snap-start overflow-hidden rounded-2xl text-left sm:basis-[calc(50%-10.5px)] lg:basis-[calc(25%-10.5px)]"
//           >
//             <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted">
//               {item.video ? (
//                 <video
//                   src={item.src}
//                   muted
//                   playsInline
//                   className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
//                 />
//               ) : (
//                 <img
//                   src={item.src}
//                   alt={item.alt ?? ""}
//                   loading="lazy"
//                   className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
//                 />
//               )}
//             </div>
//             {item.video && (
//               <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
//                 <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm">
//                   ▶
//                 </span>
//               </span>
//             )}
//           </button>
//         ))}
//       </div>

//       {items.length > 1 && (
//         <>
//           <button
//             type="button"
//             onClick={() => scrollToIndex(active - 1)}
//             aria-label="Previous slide"
//             className="absolute left-[-14px] top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white transition hover:bg-black/80 sm:flex"
//           >
//             ‹
//           </button>
//           <button
//             type="button"
//             onClick={() => scrollToIndex(active + 1)}
//             aria-label="Next slide"
//             className="absolute right-[-14px] top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white transition hover:bg-black/80 sm:flex"
//           >
//             ›
//           </button>
//           <div className="mt-4 flex justify-center gap-1.5">
//             {items.map((_, i) => (
//               <button
//                 key={i}
//                 type="button"
//                 onClick={() => scrollToIndex(i)}
//                 aria-label={`Go to slide ${i + 1}`}
//                 className={`h-1.5 rounded-full transition-all ${
//                   i === active ? `w-5 ${dotClassName}` : "w-1.5 bg-foreground/25"
//                 }`}
//               />
//             ))}
//           </div>
//         </>
//       )}

//       {lightbox !== null && (
//         <div
//           className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-6 md:p-10"
//           onClick={() => setLightbox(null)}
//         >
//           <div
//             className="relative max-h-[85vh] w-full max-w-3xl"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {items[lightbox].video ? (
//               <video
//                 src={items[lightbox].src}
//                 controls
//                 autoPlay
//                 className="max-h-[85vh] w-full rounded-lg object-contain shadow-2xl"
//               />
//             ) : (
//               <img
//                 src={items[lightbox].src}
//                 alt={items[lightbox].alt ?? ""}
//                 className="max-h-[85vh] w-full rounded-lg object-contain shadow-2xl"
//               />
//             )}
//             <button
//               type="button"
//               onClick={() => setLightbox(null)}
//               aria-label="Close"
//               className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition hover:bg-white/20"
//             >
//               ✕
//             </button>
//             <p className="mt-3 text-center text-xs text-white/55">
//               Click outside the image, press Esc, or use ✕ to close
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { useEffect, useRef, useState, type TouchEvent } from "react";

export type CarouselItem = {
  src: string;
  alt?: string;
  video?: boolean;
};

/**
 * Horizontal, snap-scrolling media carousel with autoplay, arrow/dot
 * navigation, and a click-to-zoom lightbox. Autoplay pauses on hover and
 * while the lightbox is open, and resumes afterwards.
 */
export function MediaCarousel({
  items,
  autoplayMs = 4500,
  dotClassName = "bg-primary",
}: {
  items: CarouselItem[];
  autoplayMs?: number;
  dotClassName?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef(false);
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const slideWidth = () => {
    const el = trackRef.current;
    if (!el) return 0;
    const first = el.querySelector<HTMLElement>("[data-slide]");
    if (!first) return 0;
    const gap = parseFloat(getComputedStyle(el).columnGap || "14") || 14;
    return first.offsetWidth + gap;
  };

  const scrollToIndex = (i: number, smooth = true) => {
    const el = trackRef.current;
    if (!el || items.length === 0) return;
    const clamped = ((i % items.length) + items.length) % items.length;
    el.scrollTo({ left: clamped * slideWidth(), behavior: smooth ? "smooth" : "auto" });
  };

  useEffect(() => {
    if (items.length <= 1) return;
    const id = setInterval(() => {
      if (hoverRef.current || lightbox !== null) return;
      scrollToIndex(active + 1);
    }, autoplayMs);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, autoplayMs, lightbox, items.length]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const w = slideWidth();
        if (w) setActive(Math.round(el.scrollLeft / w) % items.length);
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  const lightboxNext = () => setLightbox((i) => (i === null ? null : (i + 1) % items.length));
  const lightboxPrev = () =>
    setLightbox((i) => (i === null ? null : (i - 1 + items.length) % items.length));

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") lightboxNext();
      if (e.key === "ArrowLeft") lightboxPrev();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightbox, items.length]);

  // swipe support for the lightbox on touch devices
  const touchStartX = useRef<number | null>(null);
  const onLightboxTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onLightboxTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 40) return;
    if (delta < 0) lightboxNext();
    else lightboxPrev();
  };

  // when the lightbox closes, sync the strip so it picks up where you left off
  const closeLightbox = () => {
    if (lightbox !== null) scrollToIndex(lightbox, false);
    setLightbox(null);
  };

  if (items.length === 0) return null;

  return (
    <div
      className="relative mt-8"
      onMouseEnter={() => (hoverRef.current = true)}
      onMouseLeave={() => (hoverRef.current = false)}
    >
      <div
        ref={trackRef}
        className="flex gap-3.5 overflow-x-auto scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => (
          <button
            key={i}
            data-slide
            type="button"
            onClick={() => setLightbox(i)}
            className="group relative shrink-0 basis-[calc(100%-14px)] snap-start overflow-hidden rounded-2xl text-left sm:basis-[calc(50%-10.5px)] lg:basis-[calc(25%-10.5px)]"
          >
            <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted">
              {item.video ? (
                <video
                  src={item.src}
                  muted
                  playsInline
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <img
                  src={item.src}
                  alt={item.alt ?? ""}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
            </div>
            {item.video && (
              <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm">
                  ▶
                </span>
              </span>
            )}
          </button>
        ))}
      </div>

      {items.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => scrollToIndex(active - 1)}
            aria-label="Previous slide"
            className="absolute left-[-14px] top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white transition hover:bg-black/80 sm:flex"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => scrollToIndex(active + 1)}
            aria-label="Next slide"
            className="absolute right-[-14px] top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white transition hover:bg-black/80 sm:flex"
          >
            ›
          </button>
          <div className="mt-4 flex justify-center gap-1.5">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollToIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === active ? `w-5 ${dotClassName}` : "w-1.5 bg-foreground/25"
                }`}
              />
            ))}
          </div>
        </>
      )}

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 md:p-10"
          onClick={closeLightbox}
          onTouchStart={onLightboxTouchStart}
          onTouchEnd={onLightboxTouchEnd}
        >
          <div
            className="relative max-h-[85vh] w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            {items[lightbox].video ? (
              <video
                key={lightbox}
                src={items[lightbox].src}
                controls
                autoPlay
                className="max-h-[85vh] w-full rounded-lg object-contain shadow-2xl"
              />
            ) : (
              <img
                key={lightbox}
                src={items[lightbox].src}
                alt={items[lightbox].alt ?? ""}
                className="max-h-[85vh] w-full rounded-lg object-contain shadow-2xl"
              />
            )}

            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close"
              className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition hover:bg-white/20"
            >
              ✕
            </button>

            {items.length > 1 && (
              <>
                {/* counter */}
                <span className="absolute -top-12 left-0 text-xs tracking-wide text-white/60">
                  {lightbox + 1} / {items.length}
                </span>

                {/* nav arrows — always visible (desktop + mobile) */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    lightboxPrev();
                  }}
                  aria-label="Previous slide"
                  className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-xl text-white transition hover:bg-black/80 md:-left-14"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    lightboxNext();
                  }}
                  aria-label="Next slide"
                  className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-xl text-white transition hover:bg-black/80 md:-right-14"
                >
                  ›
                </button>

                {/* dots */}
                <div className="mt-4 flex justify-center gap-1.5">
                  {items.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightbox(i);
                      }}
                      aria-label={`Go to slide ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all ${
                        i === lightbox ? `w-5 ${dotClassName}` : "w-1.5 bg-white/30"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}

            <p className="mt-3 text-center text-xs text-white/55">
              {items.length > 1 ? "Swipe or use ‹ › to browse · " : ""}Esc or ✕ to close
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
