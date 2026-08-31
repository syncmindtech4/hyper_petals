import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Gift, Package, Truck, XCircle, RotateCcw } from "lucide-react";
import { useAdminOrders, useInvalidateOrders } from "@/hooks/useOrders";
import { adminUpdateOrderStatus } from "@/lib/cms.functions";
import { formatUGX } from "@/lib/products";
import type { OrderRow } from "@/lib/db/orders.server";

export const Route = createFileRoute("/_authenticated/admin/orders")({
  component: OrdersAdmin,
});

const STATUS_STYLES: Record<OrderRow["status"], string> = {
  new: "bg-primary/10 text-primary",
  confirmed: "bg-blue-500/10 text-blue-700",
  fulfilled: "bg-emerald-500/10 text-emerald-700",
  cancelled: "bg-muted text-muted-foreground line-through",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-UG", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function OrdersAdmin() {
  const { data: orders = [], isLoading } = useAdminOrders();
  const invalidate = useInvalidateOrders();

  const newCount = orders.filter((o) => o.status === "new").length;
  const revenueTotal = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + o.total_price_ugx, 0);

  async function setStatus(order: OrderRow, status: OrderRow["status"]) {
    try {
      await adminUpdateOrderStatus({ data: { id: order.id, status } });
      invalidate();
    } catch (e: any) {
      toast.error(e?.message ?? "Update failed");
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          Orders confirmed via the product page.
          {newCount > 0 && (
            <span className="ml-2 rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary">
              {newCount} new
            </span>
          )}
        </p>
        <p className="text-sm text-muted-foreground">
          Total (excl. cancelled):{" "}
          <span className="font-semibold text-foreground">{formatUGX(revenueTotal)}</span>
        </p>
      </div>

      {isLoading ? (
        <div className="mt-10 text-sm text-muted-foreground">Loading…</div>
      ) : orders.length === 0 ? (
        <div className="mt-10 rounded-sm border border-dashed border-border/60 p-14 text-center">
          <p className="font-serif text-2xl text-foreground">No orders yet</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Orders confirmed via "Order via WhatsApp" on a product page will show up here.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className={`rounded-2xl border p-5 ${
                order.status === "new" ? "border-primary/30 bg-primary/5" : "border-border/60"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-serif text-lg text-foreground">{order.product_name}</p>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] uppercase tracking-wider ${STATUS_STYLES[order.status]}`}
                    >
                      {order.status}
                    </span>
                    {order.is_gift && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-foreground">
                        <Gift className="h-3 w-3" /> Gift
                      </span>
                    )}
                  </div>
                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span>
                      {order.size} × {order.quantity}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Truck className="h-3 w-3" /> {order.delivery_location} —{" "}
                      {order.delivery_date}
                    </span>
                    <span>{formatDate(order.created_at)}</span>
                  </div>
                  {order.add_ons.length > 0 && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      Add-ons:{" "}
                      {order.add_ons.map((a) => `${a.name} (+${formatUGX(a.price)})`).join(", ")}
                    </p>
                  )}
                  {order.is_gift && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      To: {order.recipient_name} · {order.recipient_phone}
                      {order.gift_message && ` — "${order.gift_message}"`}
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-2">
                  <p className="font-serif text-xl text-foreground">
                    {formatUGX(order.total_price_ugx)}
                  </p>
                  <div className="flex gap-2">
                    {order.status !== "confirmed" && order.status !== "fulfilled" && (
                      <button
                        onClick={() => setStatus(order, "confirmed")}
                        title="Mark confirmed"
                        className="rounded-sm border border-input p-2 hover:bg-accent"
                      >
                        <Package className="h-4 w-4" />
                      </button>
                    )}
                    {order.status !== "fulfilled" && (
                      <button
                        onClick={() => setStatus(order, "fulfilled")}
                        title="Mark fulfilled"
                        className="rounded-sm border border-input p-2 hover:bg-accent"
                      >
                        <Truck className="h-4 w-4" />
                      </button>
                    )}
                    {order.status !== "cancelled" && (
                      <button
                        onClick={() => setStatus(order, "cancelled")}
                        title="Cancel"
                        className="rounded-sm border border-input p-2 hover:bg-accent"
                      >
                        <XCircle className="h-4 w-4" />
                      </button>
                    )}
                    {order.status !== "new" && (
                      <button
                        onClick={() => setStatus(order, "new")}
                        title="Reset to new"
                        className="rounded-sm border border-input p-2 hover:bg-accent"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
