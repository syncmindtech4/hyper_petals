import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  adminListOrders,
  getOrder,
  markOrderWhatsAppSent,
  getOrderGroupItems,
  markOrderGroupWhatsAppSent,
} from "@/lib/cms.functions";
import type { OrderRow } from "@/lib/db/orders.server";

export function useAdminOrders() {
  return useQuery<OrderRow[]>({
    queryKey: ["admin", "orders"],
    queryFn: () => adminListOrders(),
  });
}

// Public: single order (used by anything that only ever creates one order
// row, if that ever comes up again — the post-checkout success page uses
// useOrderGroup below instead, since every checkout is a group of >= 1).
export function useOrder(orderId: string | undefined) {
  return useQuery<OrderRow | null>({
    queryKey: ["order", orderId],
    queryFn: () => getOrder({ data: { id: orderId! } }),
    enabled: !!orderId,
    staleTime: 0,
  });
}

export function useMarkOrderWhatsAppSent(orderId: string | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => markOrderWhatsAppSent({ data: { id: orderId! } }),
    onSuccess: () => {
      qc.setQueryData<OrderRow | null>(["order", orderId], (old) =>
        old ? { ...old, whatsapp_sent: true } : old,
      );
    },
  });
}

// Public: every order line-item from one checkout (product-detail's
// single-item flow and checkout's multi-item cart both land here — a
// single-item order is just a group of one). Powers /order-success/$orderId.
export function useOrderGroup(groupId: string | undefined) {
  return useQuery<OrderRow[]>({
    queryKey: ["orderGroup", groupId],
    queryFn: () => getOrderGroupItems({ data: { groupId: groupId! } }),
    enabled: !!groupId,
    // Refetch on mount so a refresh always reflects the latest whatsapp_sent
    // state, but don't poll — the user drives state changes by clicking.
    staleTime: 0,
  });
}

export function useMarkOrderGroupWhatsAppSent(groupId: string | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => markOrderGroupWhatsAppSent({ data: { groupId: groupId! } }),
    onSuccess: () => {
      qc.setQueryData<OrderRow[] | undefined>(["orderGroup", groupId], (old) =>
        old?.map((o) => ({ ...o, whatsapp_sent: true })),
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
