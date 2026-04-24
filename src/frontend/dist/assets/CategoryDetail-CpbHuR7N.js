import { i as useParams, f as useSearch, g as useNavigate, j as jsxRuntimeExports, L as Link, S as Skeleton, a as LoadingGrid, B as Button } from "./index-H678KSt5.js";
import { E as EmptyState } from "./EmptyState-Ck0uGg5A.js";
import { u as useProducts, P as ProductCard } from "./useProducts-CcNXd3HP.js";
import { u as useCategories } from "./useCategories-C_yEf4vt.js";
import { C as ChevronRight } from "./chevron-right-Cf9rjURF.js";
import { P as Package } from "./package-DnVNg46m.js";
import { T as Tag } from "./tag-BuxpZIRL.js";
import { m as motion } from "./proxy-CIW2Aglt.js";
import "./useToast-DMJ_wuGw.js";
import "./backend-DCDaJMxi.js";
import "./actor-Bhp-OfYg.js";
import "./useActor-B2woeb8X.js";
const SORT_OPTIONS = [
  { value: "date", label: "Latest" },
  { value: "popularity", label: "Popular" },
  { value: "price", label: "Price ↑" },
  { value: "price-desc", label: "Price ↓" }
];
const PER_PAGE = 10;
function CategoryDetail() {
  var _a;
  const { slug } = useParams({ from: "/categories/$slug" });
  const search = useSearch({
    from: "/categories/$slug"
  });
  const navigate = useNavigate({ from: "/categories/$slug" });
  const currentPage = search.page ?? 1;
  const currentSort = search.orderby ?? "date";
  const { data: categories, isLoading: catsLoading } = useCategories();
  const category = categories == null ? void 0 : categories.find((c) => c.slug === slug);
  const filters = {
    category: category ? String(category.id) : void 0,
    orderBy: currentSort,
    page: currentPage,
    perPage: PER_PAGE
  };
  const {
    data: products,
    isLoading: prodsLoading,
    isError
  } = useProducts(filters);
  function updateSearch(patch) {
    const next = {
      orderby: patch.orderby ?? search.orderby,
      page: patch.page ?? 1
    };
    void navigate({ search: next });
  }
  const isLoading = catsLoading || prodsLoading;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "nav",
        {
          className: "flex items-center gap-1.5 text-xs text-muted-foreground mb-3",
          "data-ocid": "category_detail.breadcrumb",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/",
                "data-ocid": "category_detail.breadcrumb_home",
                className: "hover:text-foreground transition-smooth",
                children: "Home"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3 flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/categories",
                "data-ocid": "category_detail.breadcrumb_categories",
                className: "hover:text-foreground transition-smooth",
                children: "Categories"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3 flex-shrink-0" }),
            catsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-20" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium truncate", children: (category == null ? void 0 : category.name) ?? slug })
          ]
        }
      ),
      catsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-64" })
      ] }) : category ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
        ((_a = category.image) == null ? void 0 : _a.src) && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: category.image.src,
            alt: category.image.alt || category.name,
            className: "w-12 h-12 rounded-lg object-cover flex-shrink-0 border border-border/50"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-display font-bold text-foreground", children: category.name }),
          category.description && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-sm text-muted-foreground mt-0.5 line-clamp-2",
              dangerouslySetInnerHTML: { __html: category.description }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
            category.count,
            " product",
            category.count !== 1 ? "s" : ""
          ] })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-display font-bold text-foreground capitalize", children: slug.replace(/-/g, " ") })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-background border-b border-border/30 sticky top-0 z-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 py-2.5 flex items-center gap-2 overflow-x-auto scrollbar-hide", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground flex-shrink-0 font-medium", children: "Sort:" }),
      SORT_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => updateSearch({ orderby: opt.value }),
          "data-ocid": `category_detail.sort.${opt.value}`,
          className: `flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-smooth ${currentSort === opt.value ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`,
          children: opt.label
        },
        opt.value
      ))
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 py-5", children: [
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingGrid, { count: PER_PAGE, cols: 4 }) : isError ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-8 w-8" }),
          title: "Failed to load products",
          description: "We couldn't load products for this category. Please try again.",
          ctaLabel: "Retry",
          onCta: () => window.location.reload()
        }
      ) : !products || products.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          "data-ocid": "category_detail.empty_state",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "h-8 w-8" }),
          title: "No products in this category",
          description: "Check back soon — new items are added regularly.",
          ctaLabel: "Browse all products",
          ctaHref: "/products"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.35, ease: "easeOut" },
          className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3",
          "data-ocid": "category_detail.product_list",
          children: products.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product, index: i }, product.id))
        }
      ),
      !isLoading && products && products.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center justify-center gap-3 mt-8",
          "data-ocid": "category_detail.pagination",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: () => updateSearch({ page: Math.max(1, currentPage - 1) }),
                disabled: currentPage <= 1,
                "data-ocid": "category_detail.pagination_prev",
                children: "← Previous"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground px-2", children: [
              "Page ",
              currentPage
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: () => updateSearch({ page: currentPage + 1 }),
                disabled: products.length < PER_PAGE,
                "data-ocid": "category_detail.pagination_next",
                children: "Next →"
              }
            )
          ]
        }
      )
    ] })
  ] });
}
export {
  CategoryDetail as default
};
