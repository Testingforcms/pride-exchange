import { createActor } from "./backend-DCDaJMxi.js";
import "./index-H678KSt5.js";
import { u as useActor, a as useQuery } from "./useActor-B2woeb8X.js";
import { m as mapBackendProduct } from "./useProducts-CcNXd3HP.js";
function useProduct(slugOrId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["product", slugOrId],
    queryFn: async () => {
      if (!actor) return null;
      if (typeof slugOrId === "number") {
        const result2 = await actor.getProduct(BigInt(slugOrId));
        if (result2.__kind__ === "err") return null;
        return mapBackendProduct(result2.ok);
      }
      const result = await actor.getProducts(
        BigInt(1),
        BigInt(5),
        null,
        slugOrId,
        "date",
        "desc"
      );
      if (result.__kind__ === "err") return null;
      const products = result.ok.map(mapBackendProduct);
      return products.find((p) => p.slug === slugOrId) ?? products[0] ?? null;
    },
    enabled: !!slugOrId && !isFetching,
    staleTime: 1e3 * 60 * 5
  });
}
export {
  useProduct as u
};
