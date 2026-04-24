import { c as createLucideIcon, j as jsxRuntimeExports, L as Link, S as Skeleton } from "./index-H678KSt5.js";
import { E as EmptyState } from "./EmptyState-Ck0uGg5A.js";
import { u as useCategories } from "./useCategories-C_yEf4vt.js";
import { T as Tag } from "./tag-BuxpZIRL.js";
import { m as motion } from "./proxy-CIW2Aglt.js";
import "./backend-DCDaJMxi.js";
import "./actor-Bhp-OfYg.js";
import "./useActor-B2woeb8X.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 3v18", key: "108xh3" }],
  ["path", { d: "M3 12h18", key: "1i2n21" }],
  ["rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", key: "h1oib" }]
];
const Grid2x2 = createLucideIcon("grid-2x2", __iconNode);
function CategorySkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl overflow-hidden bg-card border border-border/50", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square w-full" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/3" })
    ] })
  ] });
}
function Categories() {
  const { data: categories, isLoading, isError } = useCategories();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 py-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Grid2x2, { className: "h-5 w-5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-display font-bold text-foreground", children: "Browse Categories" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Explore our curated collection of pride merchandise" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 py-6", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3", children: Array.from({ length: 8 }, (_, i) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: skeleton items have no identity
      /* @__PURE__ */ jsxRuntimeExports.jsx(CategorySkeleton, {}, i)
    )) }) : isError ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "h-8 w-8" }),
        title: "Failed to load categories",
        description: "We couldn't fetch categories right now. Please try again.",
        ctaLabel: "Retry",
        onCta: () => window.location.reload()
      }
    ) : !categories || categories.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        "data-ocid": "categories.empty_state",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "h-8 w-8" }),
        title: "No categories available",
        description: "Check back soon for new collections."
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.35, ease: "easeOut" },
        className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3",
        "data-ocid": "categories.list",
        children: categories.map((cat, i) => {
          var _a;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.3, delay: i * 0.05, ease: "easeOut" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/categories/$slug",
                  params: { slug: cat.slug },
                  search: { orderby: void 0, page: void 0 },
                  "data-ocid": `categories.item.${i + 1}`,
                  className: "block group",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-xl overflow-hidden bg-card border border-border/50 card-hover shadow-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-square bg-muted overflow-hidden", children: [
                      ((_a = cat.image) == null ? void 0 : _a.src) ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "img",
                        {
                          src: cat.image.src,
                          alt: cat.image.alt || cat.name,
                          loading: "lazy",
                          className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        }
                      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full gradient-pride opacity-70 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl", children: "🏳️‍🌈" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 right-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "badge-pride text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm", children: [
                        cat.count,
                        " items"
                      ] }) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground line-clamp-2 group-hover:text-primary transition-smooth", children: cat.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                        cat.count,
                        " product",
                        cat.count !== 1 ? "s" : ""
                      ] })
                    ] })
                  ] })
                }
              )
            },
            cat.id
          );
        })
      }
    ) })
  ] });
}
export {
  Categories as default
};
