import { createActor } from "./backend-DCDaJMxi.js";
import "./index-H678KSt5.js";
import { u as useActor, a as useQuery } from "./useActor-B2woeb8X.js";
function useCategories() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.getCategories();
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok.map((c) => ({
        id: Number(c.id),
        name: c.name,
        slug: c.slug,
        description: c.description,
        image: c.image ? { id: 0, src: c.image.src, alt: c.image.alt } : null,
        count: Number(c.count),
        parentId: Number(c.parentId)
      }));
    },
    enabled: !isFetching,
    staleTime: 1e3 * 60 * 10
  });
}
export {
  useCategories as u
};
