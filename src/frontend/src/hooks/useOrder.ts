import { createActor } from "@/backend";
import type { WooOrder as BackendWooOrder } from "@/backend";
import type { WooOrder } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

export function mapBackendOrder(o: BackendWooOrder): WooOrder {
  return {
    id: Number(o.id),
    status: o.status,
    total: o.total,
    paymentMethod: o.paymentMethod,
    dateCreated: o.dateCreated,
    customerNote: o.customerNote,
    billing: {
      firstName: o.billing.firstName,
      lastName: o.billing.lastName,
      address1: o.billing.address1,
      address2: o.billing.address2,
      city: o.billing.city,
      state: o.billing.state,
      postcode: o.billing.postcode,
      country: o.billing.country,
      email: o.billing.email,
      phone: o.billing.phone,
    },
    shipping: {
      firstName: o.shipping.firstName,
      lastName: o.shipping.lastName,
      address1: o.shipping.address1,
      address2: o.shipping.address2,
      city: o.shipping.city,
      state: o.shipping.state,
      postcode: o.shipping.postcode,
      country: o.shipping.country,
      email: o.shipping.email,
      phone: o.shipping.phone,
    },
    lineItems: o.lineItems.map((li) => ({
      productId: Number(li.productId),
      name: li.name,
      quantity: Number(li.quantity),
      price: li.price,
      total: li.total,
    })),
  };
}

export function useOrder(orderId: number | null) {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<WooOrder | null>({
    queryKey: ["order", orderId],
    queryFn: async () => {
      if (!actor || !orderId) return null;
      const result = await actor.getOrder(BigInt(orderId));
      if (result.__kind__ === "err") return null;
      return mapBackendOrder(result.ok);
    },
    enabled: !!orderId && !isFetching,
    staleTime: 1000 * 30,
  });
}
