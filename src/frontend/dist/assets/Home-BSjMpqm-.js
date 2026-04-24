import { j as jsxRuntimeExports, L as Link, B as Button, a as LoadingGrid, S as Skeleton, u as useAuth } from "./index-H678KSt5.js";
import { E as EmptyState } from "./EmptyState-Ck0uGg5A.js";
import { u as useProducts, P as ProductCard } from "./useProducts-CcNXd3HP.js";
import { u as useCategories } from "./useCategories-C_yEf4vt.js";
import { m as motion } from "./proxy-CIW2Aglt.js";
import { S as ShoppingBag } from "./shopping-bag-Cc-mwI3i.js";
import { T as Tag } from "./tag-BuxpZIRL.js";
import { C as ChevronRight } from "./chevron-right-Cf9rjURF.js";
import { C as CircleAlert } from "./circle-alert-CQwiZj29.js";
import { R as RefreshCw } from "./refresh-cw-CZ4L5rsu.js";
import "./useToast-DMJ_wuGw.js";
import "./backend-DCDaJMxi.js";
import "./actor-Bhp-OfYg.js";
import "./useActor-B2woeb8X.js";
const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6 } }
};
const slideUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" }
  })
};
const slideLeft = {
  hidden: { opacity: 0, x: 24 },
  show: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, delay: i * 0.07, ease: "easeOut" }
  })
};
function SectionHeader({
  title,
  to,
  linkLabel = "See All",
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-bold text-foreground", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to,
        ...to === "/products" ? {
          search: {
            search: void 0,
            category: void 0,
            orderby: void 0,
            page: void 0
          }
        } : {},
        "data-ocid": ocid,
        className: "flex items-center gap-0.5 text-sm font-medium text-primary hover:underline transition-smooth",
        children: [
          linkLabel,
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
        ]
      }
    )
  ] });
}
function SectionError({
  onRetry,
  label
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `${label}.error_state`,
      className: "flex flex-col items-center justify-center gap-3 py-10 text-center",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-8 w-8 text-destructive opacity-70" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Failed to load. Please try again." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: onRetry,
            "data-ocid": `${label}.retry_button`,
            className: "flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-3.5 w-3.5" }),
              " Retry"
            ]
          }
        )
      ]
    }
  );
}
function HeroBanner() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.section,
    {
      variants: fadeIn,
      initial: "hidden",
      animate: "show",
      "data-ocid": "hero.section",
      className: "relative overflow-hidden rounded-2xl gradient-pride shadow-lg mx-4 mt-4",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/10 pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-white/10 pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 px-6 py-12 sm:py-16 flex flex-col items-start gap-5 max-w-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: ["🏳️‍🌈", "🏳️‍⚧️", "✊"].map((emoji, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-2xl select-none",
              children: emoji
            },
            i
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl sm:text-5xl font-display font-bold text-white leading-tight", children: "Shop with Pride" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-white/80 text-base sm:text-lg max-w-sm", children: "Celebrate who you are. Discover pride apparel, accessories, and more." })
          ] }),
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
              "data-ocid": "hero.shop_now_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "lg",
                  className: "bg-white text-primary font-bold hover:bg-white/90 transition-smooth active:scale-95 shadow-md",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-5 w-5 mr-2" }),
                    "Shop Now"
                  ]
                }
              )
            }
          )
        ] })
      ]
    }
  );
}
function FeaturedProducts() {
  const { data, isLoading, isError, refetch } = useProducts({
    orderBy: "popularity",
    perPage: 6
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.section,
    {
      variants: slideUp,
      custom: 0,
      initial: "hidden",
      whileInView: "show",
      viewport: { once: true },
      "data-ocid": "featured.section",
      className: "px-4",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SectionHeader,
          {
            title: "Featured Products",
            to: "/products",
            ocid: "featured.see_all_link"
          }
        ),
        isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingGrid, { count: 4, cols: 4 }),
        isError && /* @__PURE__ */ jsxRuntimeExports.jsx(SectionError, { onRetry: refetch, label: "featured" }),
        !isLoading && !isError && data && data.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "featured.empty_state", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          EmptyState,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-8 w-8" }),
            title: "No featured products",
            description: "Check back soon for our featured picks."
          }
        ) }),
        !isLoading && !isError && data && data.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "data-ocid": "featured.list",
              className: "flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory scrollbar-none sm:hidden",
              children: data.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-none w-44 snap-start", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product, index: i }) }, product.id))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden sm:grid sm:grid-cols-3 lg:grid-cols-4 gap-4", children: data.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              variants: slideUp,
              custom: i,
              initial: "hidden",
              whileInView: "show",
              viewport: { once: true },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product, index: i })
            },
            product.id
          )) })
        ] })
      ]
    }
  );
}
function NewArrivals() {
  const { data, isLoading, isError, refetch } = useProducts({
    orderBy: "date",
    perPage: 8
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.section,
    {
      variants: slideUp,
      custom: 1,
      initial: "hidden",
      whileInView: "show",
      viewport: { once: true },
      "data-ocid": "new_arrivals.section",
      className: "px-4 bg-muted/30 py-6 rounded-2xl mx-4",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SectionHeader,
          {
            title: "New Arrivals",
            to: "/products",
            ocid: "new_arrivals.see_all_link"
          }
        ),
        isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingGrid, { count: 8, cols: 4 }),
        isError && /* @__PURE__ */ jsxRuntimeExports.jsx(SectionError, { onRetry: refetch, label: "new_arrivals" }),
        !isLoading && !isError && data && data.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          EmptyState,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-8 w-8" }),
            title: "No new arrivals yet",
            description: "Check back soon for the latest products."
          }
        ),
        !isLoading && !isError && data && data.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "data-ocid": "new_arrivals.list",
            className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4",
            children: data.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                variants: slideUp,
                custom: i,
                initial: "hidden",
                whileInView: "show",
                viewport: { once: true },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product, index: i })
              },
              product.id
            ))
          }
        )
      ]
    }
  );
}
function CategoryTile({ cat, index }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      variants: slideLeft,
      custom: index,
      initial: "hidden",
      whileInView: "show",
      viewport: { once: true },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/categories/$slug",
          params: { slug: cat.slug },
          search: { orderby: void 0, page: void 0 },
          "data-ocid": `categories.item.${index + 1}`,
          className: "flex flex-col items-center gap-2 group",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-card border border-border/50 shadow-sm card-hover flex items-center justify-center", children: cat.image ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: cat.image.src,
                alt: cat.image.alt || cat.name,
                className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110",
                loading: "lazy"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "h-7 w-7 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs sm:text-sm font-semibold text-foreground line-clamp-1 max-w-[80px]", children: cat.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground", children: [
                cat.count,
                " items"
              ] })
            ] })
          ]
        }
      )
    }
  );
}
function CategoryRow() {
  const { data, isLoading, isError, refetch } = useCategories();
  const categories = (data == null ? void 0 : data.slice(0, 6)) ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.section,
    {
      variants: slideUp,
      custom: 2,
      initial: "hidden",
      whileInView: "show",
      viewport: { once: true },
      "data-ocid": "categories.section",
      className: "px-4",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SectionHeader,
          {
            title: "Shop by Category",
            to: "/categories",
            ocid: "categories.see_all_link"
          }
        ),
        isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4 overflow-x-auto pb-2", children: Array.from({ length: 6 }, (_, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex-none flex flex-col items-center gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-16 h-16 sm:w-20 sm:h-20 rounded-2xl" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-12" })
            ]
          },
          i
        )) }),
        isError && /* @__PURE__ */ jsxRuntimeExports.jsx(SectionError, { onRetry: refetch, label: "categories" }),
        !isLoading && !isError && categories.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          EmptyState,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "h-8 w-8" }),
            title: "No categories found",
            description: "Categories will appear here once available."
          }
        ),
        !isLoading && !isError && categories.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "data-ocid": "categories.list",
            className: "flex gap-5 sm:gap-6 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-none",
            children: categories.map((cat, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryTile, { cat, index: i }, cat.id))
          }
        )
      ]
    }
  );
}
function PromoBanner() {
  const { isLoggedIn } = useAuth();
  if (isLoggedIn) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.section,
    {
      variants: fadeIn,
      initial: "hidden",
      whileInView: "show",
      viewport: { once: true },
      "data-ocid": "promo.section",
      className: "mx-4",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-2xl bg-accent/10 border border-accent/25 px-6 py-8 flex flex-col sm:flex-row items-center gap-5 sm:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-6 -right-6 w-28 h-28 rounded-full bg-accent/15 pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 text-center sm:text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-accent mb-1", children: "Join the Community" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl sm:text-2xl font-display font-bold text-foreground", children: "Unlock Orders, Wishlist & More" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 max-w-sm", children: "Create a free account to track your orders, save favourites, and get exclusive updates." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/register",
            "data-ocid": "promo.create_account_button",
            className: "relative z-10 flex-none",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", className: "btn-pride shadow-md", children: "Create Account" })
          }
        )
      ] })
    }
  );
}
function Home() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "home.page", className: "flex flex-col gap-8 pb-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(HeroBanner, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FeaturedProducts, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryRow, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NewArrivals, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PromoBanner, {})
  ] });
}
export {
  Home as default
};
