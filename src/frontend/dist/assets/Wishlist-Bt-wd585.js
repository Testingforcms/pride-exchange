import { l as useWishlist, r as reactExports, j as jsxRuntimeExports, L as Link, H as Heart, S as Skeleton } from "./index-H678KSt5.js";
import { E as EmptyState } from "./EmptyState-Ck0uGg5A.js";
import { P as ProductCard } from "./useProducts-CcNXd3HP.js";
import { u as useProduct } from "./useProduct-DlUj_kaD.js";
import { S as ShoppingBag } from "./shopping-bag-Cc-mwI3i.js";
import "./useToast-DMJ_wuGw.js";
import "./backend-DCDaJMxi.js";
import "./actor-Bhp-OfYg.js";
import "./useActor-B2woeb8X.js";
function WishlistProductCard({
  productId,
  index,
  onRemove
}) {
  const { data: product, isLoading } = useProduct(productId);
  const [removing, setRemoving] = reactExports.useState(false);
  function handleRemove(e) {
    e.preventDefault();
    e.stopPropagation();
    setRemoving(true);
    setTimeout(() => onRemove(productId), 300);
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl overflow-hidden bg-card border border-border/50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-full" })
      ] })
    ] });
  }
  if (!product) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-ocid": `wishlist.item.${index + 1}`,
      className: `transition-all duration-300 ${removing ? "opacity-0 scale-95" : "opacity-100 scale-100"}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: handleRemove,
            "aria-label": "Remove from wishlist",
            "data-ocid": `wishlist.delete_button.${index + 1}`,
            className: "absolute top-2 right-2 z-10 p-1.5 rounded-full bg-card/90 backdrop-blur-sm shadow-sm text-primary hover:bg-destructive hover:text-destructive-foreground transition-smooth",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-4 w-4 fill-primary" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product, index })
      ] })
    }
  );
}
function Wishlist() {
  const { wishlistIds, removeFromWishlist } = useWishlist();
  const [visibleIds, setVisibleIds] = reactExports.useState([]);
  reactExports.useEffect(() => {
    setVisibleIds(wishlistIds);
  }, [wishlistIds]);
  const itemCount = visibleIds.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h1",
          {
            className: "text-2xl font-display font-bold text-foreground",
            "data-ocid": "wishlist.page",
            children: "My Wishlist"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: itemCount === 0 ? "No saved items yet" : `${itemCount} item${itemCount !== 1 ? "s" : ""} saved` })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/products",
          search: {
            search: void 0,
            category: void 0,
            orderby: void 0,
            page: void 0
          },
          "data-ocid": "wishlist.discover_link",
          className: "text-sm text-primary font-medium hover:underline flex items-center gap-1",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-4 w-4" }),
            "Shop"
          ]
        }
      )
    ] }),
    itemCount === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-8 w-8" }),
        title: "Your wishlist is empty",
        description: "Save items you love and come back to them anytime.",
        ctaLabel: "Discover Products",
        ctaHref: "/products"
      }
    ),
    itemCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "data-ocid": "wishlist.list",
        className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4",
        children: visibleIds.map((id, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          WishlistProductCard,
          {
            productId: id,
            index: idx,
            onRemove: removeFromWishlist
          },
          id
        ))
      }
    )
  ] });
}
export {
  Wishlist as default
};
