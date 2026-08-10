import { useEffect, useRef, useState, type TouchEvent } from "react";

export type CarouselItem = {
  src: string;
  alt?: string;
  video?: boolean;
};

/**
 * Continuous marquee media strip with a click-to-zoom lightbox. The strip
 * scrolls forever via a CSS animation (seamless because the item list is
 * rendered twice back-to-back) and pauses on hover so a slide can be clicked.
 */
export function MediaCarousel({
  items,
  direction = "left",
  speed = 4.5,
  dotClassName = "bg-primary",
}: {
  items: CarouselItem[];
  /** Scroll direction of the marquee strip. */
  direction?: "left" | "right";
  /** Seconds of animation per item — lower is faster. */
  speed?: number;
  dotClassName?: string;
}) {
  const [lightbox, setLightbox] = useState<number | null>(null);

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

  if (items.length === 0) return null;

  const trackItems = [...items, ...items];

  return (
    <div className="relative mt-8">
      <div className="marquee-viewport overflow-hidden">
        <div
          className={`marquee-track flex w-max gap-3.5 ${direction === "right" ? "marquee-reverse" : ""}`}
          style={{ animationDuration: `${items.length * speed}s` }}
        >
          {trackItems.map((item, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setLightbox(i % items.length)}
              className="group relative shrink-0 w-[75vw] max-w-[320px] overflow-hidden rounded-2xl text-left sm:w-[300px]"
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
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 md:p-10"
          onClick={() => setLightbox(null)}
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
              onClick={() => setLightbox(null)}
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
