import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, MessageCircle, ShoppingBag } from "lucide-react";
import { formatUGX } from "@/lib/products";
import { buildOrderWhatsAppUrl } from "@/lib/site";
import { useOrder, useMarkOrderWhatsAppSent } from "@/hooks/useOrders";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/order-success/$orderId")({
  component: OrderSuccessPage,
});

function OrderSuccessPage() {
  const { orderId } = Route.useParams();
  const { data: order, isLoading, isError } = useOrder(orderId);
  const markSent = useMarkOrderWhatsAppSent(orderId);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center text-muted-foreground">
        Loading your order…
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-serif text-2xl text-foreground mb-2">
          We couldn't find that order
        </h1>
        <p className="text-muted-foreground mb-6">
          The link may be incorrect, or the order may have been removed.
        </p>
        <Button asChild>
          <Link to="/catalogue">Back to shop</Link>
        </Button>
      </div>
    );
  }

  const whatsappSent = order.whatsapp_sent;

  const waUrl = buildOrderWhatsAppUrl({
    orderId: order.id,
    items: [
      {
        name: `${order.product_name} (${order.size})`,
        quantity: order.quantity,
        priceUgx: order.size_price_ugx,
      },
      ...order.add_ons.map((a) => ({ name: a.name, quantity: 1, priceUgx: a.price })),
    ],
    totalUgx: order.total_price_ugx,
    deliveryLocation: order.delivery_location,
    deliveryDate: order.delivery_date,
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
        <p className="text-muted-foreground">
          Order #{order.id.slice(0, 8).toUpperCase()}
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Order Summary</CardTitle>
          {whatsappSent ? (
            <Badge className="bg-primary text-primary-foreground">
              Message Sent · Processing
            </Badge>
          ) : (
            <Badge variant="destructive">Order Placed · Action Required</Badge>
          )}
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Item</span>
            <span className="text-right font-medium">
              {order.product_name} ({order.size}) × {order.quantity}
            </span>
          </div>
          {order.add_ons.length > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Add-ons</span>
              <span className="text-right">
                {order.add_ons.map((a) => a.name).join(", ")}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-muted-foreground">Delivery</span>
            <span className="text-right">
              {order.delivery_location} · {order.delivery_date}
            </span>
          </div>
          <div className="flex justify-between border-t pt-3 font-semibold">
            <span>Total</span>
            <span>{formatUGX(order.total_price_ugx)}</span>
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
