import { formatUGX, type Product } from "@/lib/products";
import { waLink } from "@/lib/site";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200/80 dark:border-slate-800 max-w-sm relative group overflow-hidden">
      <div className="relative overflow-hidden rounded-sm bg-muted">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="aspect-[4/5] w-full h-90 object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-sm bg-background/85 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-primary backdrop-blur">
          {product.category}
        </span>
      </div>
      <div className="px-4 mb-4">
        <div className="mt-5 flex items-baseline justify-between gap-4">
          <h3 className="font-serif text-xl text-foreground">{product.name}</h3>
          {/* <span className="text-sm text-foreground/80">{formatUGX(product.price)}</span> */}
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
        <a
          href={waLink(`Hi Luxe Floral, I'd love to order the ${product.name}.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex w-max items-center gap-2 border-b border-primary pb-1 text-[11px] uppercase tracking-[0.22em] text-primary transition-opacity hover:opacity-70"
        >
          Order via WhatsApp
        </a>
      </div>
    </article>
  );
}
