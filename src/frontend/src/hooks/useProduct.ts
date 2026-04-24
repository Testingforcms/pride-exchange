import { createActor } from "@/backend";
import type { Product } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { mapBackendProduct } from "./useProducts";

export function useProduct(slugOrId: string | number) {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<Product | null>({
    queryKey: ["product", slugOrId],
    queryFn: async () => {
      if (!actor) return null;

      if (typeof slugOrId === "number") {
        const result = await actor.getProduct(BigInt(slugOrId));
        if (result.__kind__ === "err") return null;
        return mapBackendProduct(result.ok);
      }

      // Slug-based: search and find matching slug
      const result = await actor.getProducts(
        BigInt(1),
        BigInt(5),
        null,
        slugOrId,
        "date",
        "desc",
      );
      if (result.__kind__ === "err") return null;
      const products = result.ok.map(mapBackendProduct);
      return products.find((p) => p.slug === slugOrId) ?? products[0] ?? null;
    },
    enabled: !!slugOrId && !isFetching,
    staleTime: 1000 * 60 * 5,
  });
}
