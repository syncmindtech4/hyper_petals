import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import logo from "@/assets/hyper petals & decor_logo_black.svg";
import { site } from "@/lib/site";
import { useCart } from "@/hooks/use-cart";
import { formatUGX } from "@/lib/products";
import { customizationSummary } from "@/lib/bouquet-customization";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const nav = [
  { to: "/catalogue", label: "Bouquets" },
  { to: "/occasions", label: "Occasions" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { items, cartCount, cartTotal, updateQuantity, removeFromCart, isCartOpen, setIsCartOpen } =
    useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 md:py-5">
        <Link
          to="/"
          className="flex items-center "
          onClick={() => setOpen(false)}
          aria-label={site.full}
        >
          <img
            src={logo}
            alt={`${site.full} logo`}
            className="logo h-14 md:h-16"
            style={{ width: 300 }}
          />
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-[13px] uppercase tracking-[0.2em] text-foreground/75 transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {/* Cart Icon & Slide-over Drawer */}
          <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="relative p-2 text-foreground/75 hover:text-primary transition-colors focus:outline-none"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="h-5.5 w-5.5 stroke-[1.5]" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
                    {cartCount}
                  </span>
                )}
              </button>
            </SheetTrigger>
            <SheetContent className="flex w-full flex-col sm:max-w-md bg-background border-l border-border/60 p-6">
              <SheetHeader className="pb-4 border-b border-border/60">
                <SheetTitle className="font-serif text-2xl text-foreground flex items-center justify-between">
                  <span>Your Selection</span>
                  <span className="text-sm font-sans font-normal text-muted-foreground">
                    ({cartCount} {cartCount === 1 ? "item" : "items"})
                  </span>
                </SheetTitle>
              </SheetHeader>

              {items.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center py-12 text-center">
                  <ShoppingBag className="h-16 w-16 text-muted/40 stroke-[1]" />
                  <p className="mt-4 font-serif text-lg text-foreground">Your cart is empty</p>
                  <p className="mt-2 text-sm text-muted-foreground max-w-xs">
                    Browse our premium collections and add hand-tied arrangements to your cart.
                  </p>
                  <Link
                    to="/catalogue"
                    onClick={() => setIsCartOpen(false)}
                    className="mt-6 inline-flex rounded-sm bg-primary px-6 py-2.5 text-[11px] uppercase tracking-[0.22em] text-primary-foreground hover:bg-primary/90"
                  >
                    Shop Bouquets
                  </Link>
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
                    {items.map((item) => {
                      const addOnsTotal = item.selectedAddOns.reduce(
                        (sum, addOn) => sum + addOn.price,
                        0,
                      );
                      const itemTotal = (item.sizePrice + addOnsTotal) * item.quantity;
                      return (
                        <div
                          key={item.cartItemId}
                          className="flex gap-4 pb-4 border-b border-border/40 last:border-b-0"
                        >
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="h-20 w-18 rounded-sm object-cover bg-muted"
                          />
                          <div className="flex-1 flex flex-col justify-between min-w-0">
                            <div>
                              <div className="flex justify-between items-start gap-2">
                                <h4 className="font-serif text-base text-foreground truncate">
                                  {item.product.name}
                                </h4>
                                <button
                                  type="button"
                                  onClick={() => removeFromCart(item.cartItemId)}
                                  className="text-muted-foreground hover:text-destructive p-0.5 transition-colors"
                                  aria-label="Remove item"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                              <p className="text-[11px] text-muted-foreground mt-0.5">
                                Size: {item.selectedSize}
                              </p>
                              {item.selectedAddOns.length > 0 && (
                                <p className="text-[11px] text-muted-foreground truncate mt-0.5">
                                  Add-ons: {item.selectedAddOns.map((a) => a.name).join(", ")}
                                </p>
                              )}
                              {item.customizations && (
                                <p className="text-[11px] text-muted-foreground mt-0.5">
                                  {customizationSummary(item.customizations)}
                                </p>
                              )}
                              {item.deliveryDate && (
                                <p className="text-[11px] text-primary font-medium mt-1">
                                  Delivery: {item.deliveryDate}
                                </p>
                              )}
                            </div>
                            <div className="flex justify-between items-center mt-2">
                              <div className="flex items-center border border-border/80 rounded-sm">
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                                  className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                  <Minus className="h-3.5 w-3.5" />
                                </button>
                                <span className="px-2 text-xs font-medium text-foreground">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                                  className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                  <Plus className="h-3.5 w-3.5" />
                                </button>
                              </div>
                              <span className="text-sm font-semibold text-primary">
                                {formatUGX(itemTotal)}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="border-t border-border/60 pt-4 space-y-4">
                    <div className="flex justify-between text-base font-medium text-foreground">
                      <span className="font-serif">Subtotal</span>
                      <span className="font-semibold text-primary">{formatUGX(cartTotal)}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      Shipping fees and delivery details will be calculated at checkout.
                    </p>
                    <div className="grid grid-cols-1 gap-2 pt-2">
                      <Link
                        to="/checkout"
                        onClick={() => setIsCartOpen(false)}
                        className="flex w-full items-center justify-center rounded-sm bg-primary py-3 text-[11px] uppercase tracking-[0.22em] font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
                      >
                        Proceed To Checkout
                      </Link>
                      <button
                        type="button"
                        onClick={() => setIsCartOpen(false)}
                        className="flex w-full items-center justify-center rounded-sm border border-border/80 py-3 text-[11px] uppercase tracking-[0.22em] text-foreground hover:bg-accent/40 transition-colors"
                      >
                        Continue Shopping
                      </button>
                    </div>
                  </div>
                </>
              )}
            </SheetContent>
          </Sheet>

          <Link
            to="/contact"
            className="hidden rounded-sm bg-primary px-5 py-2.5 text-[11px] uppercase tracking-[0.22em] text-primary-foreground transition-colors hover:bg-primary/90 md:inline-flex"
          >
            Request A Quote
          </Link>

          <button
            type="button"
            aria-label="Toggle menu"
            className="text-foreground md:hidden p-2"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5.5 w-5.5" /> : <Menu className="h-5.5 w-5.5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-3 text-sm uppercase tracking-[0.2em] text-foreground/80"
                activeProps={{ className: "text-primary" }}
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-sm bg-primary px-5 py-3 text-[11px] uppercase tracking-[0.22em] text-primary-foreground"
            >
              Request A Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
