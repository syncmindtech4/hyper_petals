import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminListOrders, getOrder, markOrderWhatsAppSent } from "@/lib/cms.functions";
import type { OrderRow } from "@/lib/db/orders.server";

export function useAdminOrders() {
  return useQuery<OrderRow[]>({
    queryKey: ["admin", "orders"],
    queryFn: () => adminListOrders(),
  });
}

// Public: single order for the post-checkout success page.
export function useOrder(orderId: string | undefined) {
  return useQuery<OrderRow | null>({
    queryKey: ["order", orderId],
    queryFn: () => getOrder({ data: { id: orderId! } }),
    enabled: !!orderId,
    // Refetch on mount so a refresh always reflects the latest whatsapp_sent
    // state, but don't poll — the user drives state changes by clicking.
    staleTime: 0,
  });
}

export function useMarkOrderWhatsAppSent(orderId: string | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => markOrderWhatsAppSent({ data: { id: orderId! } }),
    onSuccess: () => {
      // Optimistically flip the cached order so the badge updates instantly
      // without waiting on a refetch.
      qc.setQueryData<OrderRow | null>(["order", orderId], (old) =>
        old ? { ...old, whatsapp_sent: true } : old,
      );
    },
  });
}

export function useInvalidateOrders() {
  const qc = useQueryClient();
  return () => {
    qc.invalidateQueries({ queryKey: ["admin", "orders"] });
  };
}

export type { OrderRow };
