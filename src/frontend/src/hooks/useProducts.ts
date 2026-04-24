import { createActor } from "@/backend";
import type { Product, ProductFilters } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

// mapProduct converts backend bigint-based Product to frontend number-based Product
import type { Product as BackendProduct } from "@/backend";

export function mapBackendProduct(p: BackendProduct): Product {
  return {
    id: Number(p.id),
    name: p.name,
    slug: p.slug,
    price: p.price,
    regularPrice: p.regularPrice,
    salePrice: p.salePrice,
    images: p.images.map((img) => ({
      id: Number(img.id),
      src: img.src,
      alt: img.alt,
    })),
    categories: p.categories.map((cat) => ({
      id: Number(cat.id),
      name: cat.name,
      slug: cat.slug,
    })),
    description: p.description,
    shortDescription: p.shortDescription,
    stockStatus: p.stockStatus,
    variations: p.variations.map((v) => Number(v)),
    attributes: p.attributes.map((attr) => ({
      id: Number(attr.id),
      name: attr.name,
      options: attr.options,
    })),
  };
}

export function useProducts(filters: ProductFilters = {}) {
  const { category, search, orderBy, page = 1, perPage = 20 } = filters;

  const { actor, isFetching } = useActor(createActor);

  return useQuery<Product[]>({
    queryKey: ["products", { category, search, orderBy, page, perPage }],
    queryFn: async () => {
      if (!actor) return [];

      let orderby = "date";
      let order = "desc";
      if (orderBy === "popularity") {
        orderby = "popularity";
        order = "desc";
      } else if (orderBy === "date") {
        orderby = "date";
        order = "desc";
      } else if (orderBy === "price") {
        orderby = "price";
        order = "asc";
      } else if (orderBy === "price-desc") {
        orderby = "price";
        order = "desc";
      }

      // category from filters is a string slug or id; backend takes bigint | null
      const categoryId = category ? BigInt(category) : null;

      const result = await actor.getProducts(
        BigInt(page),
        BigInt(perPage),
        categoryId,
        search ?? null,
        orderby,
        order,
      );

      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok.map(mapBackendProduct);
    },
    enabled: !isFetching,
    staleTime: 1000 * 60 * 5,
  });
}
