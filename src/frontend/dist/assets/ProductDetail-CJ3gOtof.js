import { i as useParams, k as useCart, l as useWishlist, r as reactExports, j as jsxRuntimeExports, L as Link, h as Badge, e as cn, B as Button, m as ShoppingCart, H as Heart, S as Skeleton } from "./index-H678KSt5.js";
import { E as EmptyState } from "./EmptyState-Ck0uGg5A.js";
import { u as useProducts, P as ProductCard } from "./useProducts-CcNXd3HP.js";
import { u as useProduct } from "./useProduct-DlUj_kaD.js";
import { u as useToast } from "./useToast-DMJ_wuGw.js";
import { P as Package } from "./package-DnVNg46m.js";
import { M as Minus, P as Plus } from "./plus-De0pKXJS.js";
import { C as ChevronUp } from "./chevron-up-Ce2SD-c3.js";
import { C as ChevronDown } from "./chevron-down-zuzzpNxp.js";
import "./backend-DCDaJMxi.js";
import "./actor-Bhp-OfYg.js";
import "./useActor-B2woeb8X.js";
function ImageGallery({ images, productName }) {
  var _a, _b;
  const [activeIdx, setActiveIdx] = reactExports.useState(0);
  const [imgLoaded, setImgLoaded] = reactExports.useState(false);
  const [transitioning, setTransitioning] = reactExports.useState(false);
  const thumbsRef = reactExports.useRef(null);
  const safeImages = (images == null ? void 0 : images.length) ? images : [];
  function selectImage(idx) {
    var _a2;
    if (idx === activeIdx) return;
    setTransitioning(true);
    setImgLoaded(false);
    setTimeout(() => {
      setActiveIdx(idx);
      setTransitioning(false);
    }, 150);
    const thumb = (_a2 = thumbsRef.current) == null ? void 0 : _a2.children[idx];
    thumb == null ? void 0 : thumb.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center"
    });
  }
  const mainSrc = (_a = safeImages[activeIdx]) == null ? void 0 : _a.src;
  const mainAlt = ((_b = safeImages[activeIdx]) == null ? void 0 : _b.alt) || productName;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 w-full", "data-ocid": "product.gallery", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-2xl overflow-hidden bg-muted aspect-square w-full shadow-md", children: [
      !imgLoaded && /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "absolute inset-0 rounded-2xl" }),
      mainSrc ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: mainSrc,
          alt: mainAlt,
          loading: "lazy",
          onLoad: () => setImgLoaded(true),
          className: cn(
            "w-full h-full object-cover transition-opacity duration-300",
            transitioning || !imgLoaded ? "opacity-0" : "opacity-100"
          )
        },
        activeIdx
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center text-6xl bg-muted text-muted-foreground", children: "🏳️‍🌈" })
    ] }),
    safeImages.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref: thumbsRef,
        className: "flex gap-2 overflow-x-auto pb-1 scroll-smooth",
        style: { scrollbarWidth: "none" },
        "data-ocid": "product.gallery_thumbnails",
        children: safeImages.map((img, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => selectImage(i),
            "aria-label": `View image ${i + 1}`,
            "data-ocid": `product.gallery_thumb.${i + 1}`,
            className: cn(
              "flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-smooth",
              i === activeIdx ? "border-primary shadow-md scale-105" : "border-border opacity-60 hover:opacity-90 hover:border-primary/50"
            ),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: img.src,
                alt: img.alt || `${productName} ${i + 1}`,
                loading: "lazy",
                className: "w-full h-full object-cover"
              }
            )
          },
          img.id ?? i
        ))
      }
    )
  ] });
}
function DescriptionAccordion({ html, label }) {
  const [open, setOpen] = reactExports.useState(false);
  const textOnly = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  if (!textOnly) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "border border-border rounded-xl overflow-hidden",
      "data-ocid": "product.description_accordion",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setOpen((v) => !v),
            className: "w-full flex items-center justify-between px-4 py-3 bg-card hover:bg-muted/50 transition-colors text-left",
            "data-ocid": "product.description_toggle",
            "aria-expanded": open,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm text-foreground", children: label }),
              open ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-4 w-4 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 text-muted-foreground" })
            ]
          }
        ),
        open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-3 bg-background text-sm text-foreground/80 leading-relaxed border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            dangerouslySetInnerHTML: { __html: html },
            className: "prose-sm max-w-none"
          }
        ) })
      ]
    }
  );
}
function VariationSelectors({
  attributes,
  selected,
  onChange
}) {
  if (!(attributes == null ? void 0 : attributes.length)) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", "data-ocid": "product.variations", children: attributes.map((attr) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: [
      attr.name,
      selected[attr.name] && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 text-foreground normal-case font-normal", children: [
        "— ",
        selected[attr.name]
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: attr.options.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => onChange(attr.name, option),
        "data-ocid": "product.variation_option",
        className: cn(
          "px-3 py-1.5 rounded-lg border text-sm font-medium transition-smooth",
          selected[attr.name] === option ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-foreground hover:border-primary/50"
        ),
        children: option
      },
      option
    )) })
  ] }, attr.id ?? attr.name)) });
}
function QuantitySelector({ value, min = 1, max = 99, onChange }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center gap-2 border border-border rounded-xl overflow-hidden bg-card",
      "data-ocid": "product.quantity_selector",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => onChange(Math.max(min, value - 1)),
            disabled: value <= min,
            "aria-label": "Decrease quantity",
            "data-ocid": "product.quantity_decrease",
            className: "flex items-center justify-center w-10 h-10 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-40",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "w-10 text-center font-semibold text-foreground select-none",
            "data-ocid": "product.quantity_value",
            children: value
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => onChange(Math.min(max, value + 1)),
            disabled: value >= max,
            "aria-label": "Increase quantity",
            "data-ocid": "product.quantity_increase",
            className: "flex items-center justify-center w-10 h-10 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-40",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" })
          }
        )
      ]
    }
  );
}
function RelatedProducts({ categoryId, currentProductId }) {
  const { data: products, isLoading } = useProducts({
    category: categoryId == null ? void 0 : categoryId.toString(),
    perPage: 8
  });
  const related = (products == null ? void 0 : products.filter((p) => p.id !== currentProductId).slice(0, 6)) ?? [];
  if (!isLoading && !related.length) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-10", "data-ocid": "product.related_section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-bold text-foreground mb-4", children: "You may also like" }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4 overflow-x-auto pb-2", children: Array.from({ length: 4 }).map((_, i) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: skeleton list
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-shrink-0 w-44", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square w-full rounded-xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 mt-2 rounded" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 mt-1 w-16 rounded" })
      ] }, i)
    )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4 overflow-x-auto", children: related.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product: p, index: i }, p.id)) })
  ] });
}
function ProductDetailSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-5xl mx-auto px-4 py-6",
      "data-ocid": "product.loading_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-48 mb-5 rounded" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square w-full rounded-2xl" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 mt-3", children: Array.from({ length: 4 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: skeleton list
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-16 h-16 rounded-xl" }, i)
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-3/4 rounded" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-24 rounded" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full rounded" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-5/6 rounded" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-4/6 rounded" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 flex-1 rounded-xl" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-12 rounded-xl" })
            ] })
          ] })
        ] })
      ]
    }
  );
}
function ProductDetail() {
  var _a, _b;
  const { slug } = useParams({ from: "/products/$slug" });
  const { data: product, isLoading, isError } = useProduct(slug);
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();
  const [quantity, setQuantity] = reactExports.useState(1);
  const [selectedAttrs, setSelectedAttrs] = reactExports.useState(
    {}
  );
  const [adding, setAdding] = reactExports.useState(false);
  reactExports.useEffect(() => {
    var _a2, _b2;
    if ((_a2 = product == null ? void 0 : product.attributes) == null ? void 0 : _a2.length) {
      const defaults = {};
      for (const attr of product.attributes) {
        if ((_b2 = attr.options) == null ? void 0 : _b2[0]) defaults[attr.name] = attr.options[0];
      }
      setSelectedAttrs(defaults);
    }
  }, [product]);
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(ProductDetailSkeleton, {});
  if (isError || !product) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "max-w-5xl mx-auto px-4 py-12",
        "data-ocid": "product.error_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          EmptyState,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-8 w-8" }),
            title: "Product not found",
            description: "This product may have been removed or the link is incorrect.",
            ctaLabel: "Browse Products",
            ctaHref: "/products"
          }
        )
      }
    );
  }
  const safeProduct = product;
  const isSale = !!safeProduct.salePrice && safeProduct.salePrice !== "" && safeProduct.salePrice !== safeProduct.regularPrice;
  const displayPrice = isSale ? safeProduct.salePrice : safeProduct.price;
  const hasStock = safeProduct.stockStatus !== "outofstock";
  const inWishlist = isInWishlist(safeProduct.id);
  const primaryCategory = (_a = safeProduct.categories) == null ? void 0 : _a[0];
  function handleAttrChange(name, value) {
    setSelectedAttrs((prev) => ({ ...prev, [name]: value }));
  }
  function handleAddToCart() {
    if (!hasStock) return;
    setAdding(true);
    addItem(safeProduct, quantity, void 0, selectedAttrs);
    showToast(`${safeProduct.name} added to cart!`, "success");
    setTimeout(() => setAdding(false), 700);
  }
  function handleWishlist() {
    toggleWishlist(safeProduct.id);
    showToast(
      inWishlist ? "Removed from wishlist" : "Added to wishlist",
      inWishlist ? "info" : "success"
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 py-6 pb-16", "data-ocid": "product.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5 flex-wrap gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "nav",
        {
          className: "flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap",
          "aria-label": "Breadcrumb",
          "data-ocid": "product.breadcrumb",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-foreground transition-colors", children: "Home" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-40", children: "/" }),
            primaryCategory ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/categories/$slug",
                  params: { slug: primaryCategory.slug },
                  search: { orderby: void 0, page: void 0 },
                  className: "hover:text-foreground transition-colors",
                  children: primaryCategory.name
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-40", children: "/" })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/products",
                  search: {
                    search: void 0,
                    category: void 0,
                    orderby: void 0,
                    page: void 0
                  },
                  className: "hover:text-foreground transition-colors",
                  children: "Products"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-40", children: "/" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium line-clamp-1 max-w-[180px]", children: safeProduct.name })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/products",
          search: {
            search: void 0,
            category: void 0,
            orderby: void 0,
            page: void 0
          },
          "data-ocid": "product.back_link",
          className: "text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1",
          children: "← Back to Products"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        ImageGallery,
        {
          images: safeProduct.images,
          productName: safeProduct.name
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", "data-ocid": "product.info_section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
            isSale && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "badge-pride text-xs",
                "data-ocid": "product.sale_badge",
                children: "Sale"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                "data-ocid": "product.stock_badge",
                className: cn(
                  "text-xs font-semibold",
                  hasStock ? "border-green-500/40 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30" : "border-border text-muted-foreground bg-muted"
                ),
                children: hasStock ? "In Stock" : "Out of Stock"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h1",
            {
              className: "font-display font-bold text-2xl sm:text-3xl text-foreground leading-tight",
              "data-ocid": "product.title",
              children: safeProduct.name
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-baseline gap-2.5",
            "data-ocid": "product.price",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-2xl font-bold text-foreground", children: [
                "$",
                displayPrice
              ] }),
              isSale && safeProduct.regularPrice && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-base text-muted-foreground line-through", children: [
                "$",
                safeProduct.regularPrice
              ] })
            ]
          }
        ),
        safeProduct.shortDescription && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "text-sm text-foreground/75 leading-relaxed [&_ul]:list-disc [&_ul]:pl-4 [&_p]:mb-1",
            "data-ocid": "product.short_description",
            dangerouslySetInnerHTML: { __html: safeProduct.shortDescription }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-border" }),
        ((_b = safeProduct.attributes) == null ? void 0 : _b.length) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          VariationSelectors,
          {
            attributes: safeProduct.attributes,
            selected: selectedAttrs,
            onChange: handleAttrChange
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-3 flex-wrap",
            "data-ocid": "product.add_to_cart_section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                QuantitySelector,
                {
                  value: quantity,
                  min: 1,
                  max: 99,
                  onChange: setQuantity
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  onClick: handleAddToCart,
                  disabled: !hasStock || adding,
                  "data-ocid": "product.add_to_cart_button",
                  className: cn(
                    "btn-pride flex-1 min-w-[140px] h-12 text-base gap-2 flex items-center justify-center",
                    !hasStock && "opacity-50 cursor-not-allowed"
                  ),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "h-5 w-5" }),
                    adding ? "Added!" : hasStock ? "Add to Cart" : "Out of Stock"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: handleWishlist,
                  "aria-label": inWishlist ? "Remove from wishlist" : "Add to wishlist",
                  "data-ocid": "product.wishlist_button",
                  className: cn(
                    "flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl border-2 transition-smooth",
                    inWishlist ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-primary"
                  ),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: cn("h-5 w-5", inWishlist && "fill-primary") })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-border" }),
        safeProduct.description && /* @__PURE__ */ jsxRuntimeExports.jsx(
          DescriptionAccordion,
          {
            html: safeProduct.description,
            label: "Product Description"
          }
        )
      ] })
    ] }),
    primaryCategory && /* @__PURE__ */ jsxRuntimeExports.jsx(
      RelatedProducts,
      {
        categoryId: primaryCategory.id,
        currentProductId: safeProduct.id
      }
    )
  ] });
}
export {
  ProductDetail as default
};
