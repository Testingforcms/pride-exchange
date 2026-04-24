import { createActor } from "@/backend";
import type { WooOrder } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { mapBackendOrder } from "./useOrder";

export function useOrders(customerId: number | null) {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<WooOrder[]>({
    queryKey: ["orders", customerId],
    queryFn: async () => {
      if (!actor || !customerId) return [];
      const result = await actor.getOrders(
        BigInt(customerId),
        BigInt(1),
        BigInt(20),
      );
      if (result.__kind__ === "err") return [];
      return result.ok.map(mapBackendOrder);
    },
    enabled: !!customerId && !isFetching,
    refetchInterval: 30_000,
    staleTime: 1000 * 30,
  });
}
