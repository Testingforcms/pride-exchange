import { createActor } from "@/backend";
import type { WooCustomer } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

export function useWooCustomer(customerId: number | null) {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<WooCustomer | null>({
    queryKey: ["wooCustomer", customerId],
    queryFn: async () => {
      if (!actor || !customerId) return null;
      const result = await actor.getWooCustomer(BigInt(customerId));
      if (result.__kind__ === "err") return null;
      const c = result.ok;
      return {
        id: Number(c.id),
        email: c.email,
        firstName: c.firstName,
        lastName: c.lastName,
        billing: {
          firstName: c.billing.firstName,
          lastName: c.billing.lastName,
          address1: c.billing.address1,
          address2: c.billing.address2,
          city: c.billing.city,
          state: c.billing.state,
          postcode: c.billing.postcode,
          country: c.billing.country,
          email: c.billing.email,
          phone: c.billing.phone,
        },
        shipping: {
          firstName: c.shipping.firstName,
          lastName: c.shipping.lastName,
          address1: c.shipping.address1,
          address2: c.shipping.address2,
          city: c.shipping.city,
          state: c.shipping.state,
          postcode: c.shipping.postcode,
          country: c.shipping.country,
          email: c.shipping.email,
          phone: c.shipping.phone,
        },
      };
    },
    enabled: !!customerId && !isFetching,
    staleTime: 1000 * 60 * 5,
  });
}
