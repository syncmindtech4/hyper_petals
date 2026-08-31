import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, MessageCircle, ShoppingBag } from "lucide-react";
import { formatUGX } from "@/lib/products";
import { buildOrderWhatsAppUrl } from "@/lib/site";
import { useOrderGroup, useMarkOrderGroupWhatsAppSent } from "@/hooks/useOrders";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Note: the "$orderId" param actually holds a group_id — every checkout
// (single product-detail order or a multi-item cart from checkout.tsx)
// saves as a group of one-or-more order rows sharing one group_id, so this
// page always fetches and confirms the whole group together. Kept the
// param name as "orderId" rather than "groupId" so any links already
// shared/bookmarked from before this change keep working.
export const Route = createFileRoute("/order-success/$orderId")({
  component: OrderSuccessPage,
});

function OrderSuccessPage() {
  const { orderId: groupId } = Route.useParams();
  const { data: orders, isLoading, isError } = useOrderGroup(groupId);
  const markSent = useMarkOrderGroupWhatsAppSent(groupId);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center text-muted-foreground">
        Loading your order…
      </div>
    );
  }

  if (isError || !orders || orders.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-serif text-2xl text-foreground mb-2">We couldn't find that order</h1>
        <p className="text-muted-foreground mb-6">
          The link may be incorrect, or the order may have been removed.
        </p>
        <Button asChild>
          <Link to="/catalogue">Back to shop</Link>
        </Button>
      </div>
    );
  }

  const first = orders[0];
  const whatsappSent = orders.every((o) => o.whatsapp_sent);

  const itemsSubtotal = orders.reduce((sum, o) => sum + o.total_price_ugx, 0);
  const deliveryFee = orders.reduce((sum, o) => sum + o.delivery_fee_ugx, 0);
  const discount = orders.reduce((sum, o) => sum + o.discount_ugx, 0);
  const grandTotal = itemsSubtotal + deliveryFee - discount;

  const waUrl = buildOrderWhatsAppUrl({
    orderId: groupId,
    items: orders.flatMap((o) => [
      { name: `${o.product_name} (${o.size})`, quantity: o.quantity, priceUgx: o.size_price_ugx },
      ...o.add_ons.map((a) => ({ name: a.name, quantity: 1, priceUgx: a.price })),
    ]),
    totalUgx: grandTotal,
    deliveryLocation: first.delivery_location,
    deliveryDate: first.delivery_date,
  });

  const openWhatsApp = () => {
    window.open(waUrl, "_blank");
    if (!whatsappSent) markSent.mutate();
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-16">
      <div className="text-center mb-8">
        <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-primary" />
        <h1 className="font-serif text-3xl text-foreground mb-2">Order Placed</h1>
        <p className="text-muted-foreground">Order #{groupId.slice(0, 8).toUpperCase()}</p>
      </div>

      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Order Summary</CardTitle>
          {whatsappSent ? (
            <Badge className="bg-primary text-primary-foreground">Message Sent · Processing</Badge>
          ) : (
            <Badge variant="destructive">Order Placed · Action Required</Badge>
          )}
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          {orders.map((o) => (
            <div key={o.id} className="flex justify-between">
              <span className="text-muted-foreground">
                {o.product_name} ({o.size})
                {o.add_ons.length > 0 && (
                  <span className="block text-xs">+ {o.add_ons.map((a) => a.name).join(", ")}</span>
                )}
              </span>
              <span className="text-right font-medium">
                × {o.quantity} · {formatUGX(o.total_price_ugx)}
              </span>
            </div>
          ))}
          <div className="flex justify-between border-t pt-3">
            <span className="text-muted-foreground">Delivery</span>
            <span className="text-right">
              {first.delivery_location} · {first.delivery_date}
              {deliveryFee > 0 && ` · ${formatUGX(deliveryFee)}`}
            </span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Discount {first.promo_code ? `(${first.promo_code})` : ""}
              </span>
              <span className="text-right text-primary">-{formatUGX(discount)}</span>
            </div>
          )}
          <div className="flex justify-between border-t pt-3 font-semibold">
            <span>Total</span>
            <span>{formatUGX(grandTotal)}</span>
          </div>
        </CardContent>
      </Card>

      {!whatsappSent ? (
        <div className="space-y-3">
          <Button size="lg" className="w-full gap-2" onClick={openWhatsApp}>
            <MessageCircle className="h-4 w-4" />
            Complete Order on WhatsApp
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Didn't open WhatsApp?{" "}
            <button
              onClick={openWhatsApp}
              className="underline underline-offset-2 hover:text-foreground"
            >
              Click here to re-send
            </button>
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="rounded-md border bg-muted/40 p-4 text-center text-sm text-muted-foreground">
            We've received your WhatsApp confirmation and are processing your order.
          </div>
          <p className="text-center text-xs text-muted-foreground">
            Need to send it again?{" "}
            <button
              onClick={openWhatsApp}
              className="underline underline-offset-2 hover:text-foreground"
            >
              Re-open WhatsApp
            </button>
          </p>
        </div>
      )}

      <Button asChild variant="outline" size="lg" className="mt-4 w-full gap-2">
        <Link to="/catalogue">
          <ShoppingBag className="h-4 w-4" />
          Continue Shopping
        </Link>
      </Button>
    </div>
  );
}
