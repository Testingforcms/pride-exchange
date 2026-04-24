import { k as useCart, l as useWishlist, r as reactExports, j as jsxRuntimeExports, L as Link, H as Heart, e as cn, B as Button, m as ShoppingCart } from "./index-H678KSt5.js";
import { u as useToast } from "./useToast-DMJ_wuGw.js";
import { createActor } from "./backend-DCDaJMxi.js";
import { u as useActor, a as useQuery } from "./useActor-B2woeb8X.js";
function ProductCard({
  product,
  index = 0,
  className
}) {
  var _a, _b, _c, _d;
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();
  const [imgError, setImgError] = reactExports.useState(false);
  const [adding, setAdding] = reactExports.useState(false);
  const inWishlist = isInWishlist(product.id);
  const isSale = !!product.salePrice && product.salePrice !== "" && product.salePrice !== product.regularPrice;
  const displayPrice = isSale ? product.salePrice : product.price;
  const imageUrl = (_b = (_a = product.images) == null ? void 0 : _a[0]) == null ? void 0 : _b.src;
  const hasStock = product.stockStatus !== "outofstock";
  async function handleAddToCart(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!hasStock) return;
    setAdding(true);
    addItem(product, 1);
    showToast(`${product.name} added to cart`, "success");
    setTimeout(() => setAdding(false), 600);
  }
  function handleWishlist(e) {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    showToast(
      inWishlist ? "Removed from wishlist" : "Added to wishlist",
      inWishlist ? "info" : "success"
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to: "/products/$slug",
      params: { slug: product.slug },
      "data-ocid": `product.item.${index + 1}`,
      className: cn("block group", className),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-xl overflow-hidden bg-card border border-border/50 card-hover shadow-card flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-square bg-muted overflow-hidden", children: [
          imageUrl && !imgError ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: imageUrl,
              alt: ((_d = (_c = product.images) == null ? void 0 : _c[0]) == null ? void 0 : _d.alt) || product.name,
              loading: "lazy",
              onError: () => setImgError(true),
              className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center bg-muted text-muted-foreground text-4xl", children: "🏳️‍🌈" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-2 left-2 flex flex-wrap gap-1", children: [
            isSale && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-md uppercase", children: "Sale" }),
            !hasStock && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-muted text-muted-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-md uppercase", children: "Sold out" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: handleWishlist,
              "aria-label": inWishlist ? "Remove from wishlist" : "Add to wishlist",
              "data-ocid": `product.wishlist_button.${index + 1}`,
              className: cn(
                "absolute top-2 right-2 p-1.5 rounded-full bg-card/90 backdrop-blur-sm shadow-xs transition-smooth",
                inWishlist ? "text-primary" : "text-muted-foreground hover:text-primary"
              ),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: cn("h-4 w-4", inWishlist && "fill-primary") })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 flex flex-col gap-1.5 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground line-clamp-2 min-h-[2.5rem]", children: product.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-foreground text-base", children: [
              "$",
              displayPrice
            ] }),
            isSale && product.regularPrice && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground line-through", children: [
              "$",
              product.regularPrice
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              onClick: handleAddToCart,
              disabled: !hasStock || adding,
              "data-ocid": `product.add_to_cart_button.${index + 1}`,
              className: cn(
                "btn-pride w-full h-8 text-xs mt-auto",
                !hasStock && "opacity-50 cursor-not-allowed"
              ),
              children: adding ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "h-3.5 w-3.5" }),
                " Added!"
              ] }) : hasStock ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "h-3.5 w-3.5" }),
                " Add to Cart"
              ] }) : "Out of Stock"
            }
          )
        ] })
      ] })
    }
  );
}
function mapBackendProduct(p) {
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
      alt: img.alt
    })),
    categories: p.categories.map((cat) => ({
      id: Number(cat.id),
      name: cat.name,
      slug: cat.slug
    })),
    description: p.description,
    shortDescription: p.shortDescription,
    stockStatus: p.stockStatus,
    variations: p.variations.map((v) => Number(v)),
    attributes: p.attributes.map((attr) => ({
      id: Number(attr.id),
      name: attr.name,
      options: attr.options
    }))
  };
}
function useProducts(filters = {}) {
  const { category, search, orderBy, page = 1, perPage = 20 } = filters;
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
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
      const categoryId = category ? BigInt(category) : null;
      const result = await actor.getProducts(
        BigInt(page),
        BigInt(perPage),
        categoryId,
        search ?? null,
        orderby,
        order
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok.map(mapBackendProduct);
    },
    enabled: !isFetching,
    staleTime: 1e3 * 60 * 5
  });
}
export {
  ProductCard as P,
  mapBackendProduct as m,
  useProducts as u
};
