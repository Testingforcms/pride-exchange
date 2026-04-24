import { createActor } from "@/backend";
import type { Category } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

export function useCategories() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<Category[]>({
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
        parentId: Number(c.parentId),
      }));
    },
    enabled: !isFetching,
    staleTime: 1000 * 60 * 10,
  });
}
