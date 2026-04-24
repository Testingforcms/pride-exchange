import { c as createLucideIcon, u as useAuth, r as reactExports, j as jsxRuntimeExports, B as Button, S as Skeleton, g as useNavigate } from "./index-H678KSt5.js";
import { E as EmptyState } from "./EmptyState-Ck0uGg5A.js";
import { C as Card, a as CardContent } from "./card-DlgkKOGH.js";
import { createActor } from "./backend-DCDaJMxi.js";
import { u as useActor, a as useQuery } from "./useActor-B2woeb8X.js";
import { m as mapBackendOrder } from "./useOrder-C99YPbdH.js";
import { R as RefreshCw } from "./refresh-cw-CZ4L5rsu.js";
import { C as CircleAlert } from "./circle-alert-CQwiZj29.js";
import { S as ShoppingBag } from "./shopping-bag-Cc-mwI3i.js";
import { P as Package } from "./package-DnVNg46m.js";
import "./actor-Bhp-OfYg.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode);
function useOrders(customerId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["orders", customerId],
    queryFn: async () => {
      if (!actor || !customerId) return [];
      const result = await actor.getOrders(
        BigInt(customerId),
        BigInt(1),
        BigInt(20)
      );
      if (result.__kind__ === "err") return [];
      return result.ok.map(mapBackendOrder);
    },
    enabled: !!customerId && !isFetching,
    refetchInterval: 3e4,
    staleTime: 1e3 * 30
  });
}
const PER_PAGE = 10;
const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800"
  },
  processing: {
    label: "Processing",
    className: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border-blue-200 dark:border-blue-800"
  },
  "on-hold": {
    label: "On Hold",
    className: "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300 border-orange-200 dark:border-orange-800"
  },
  completed: {
    label: "Completed",
    className: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 border-green-200 dark:border-green-800"
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-muted text-muted-foreground border-border"
  },
  refunded: {
    label: "Refunded",
    className: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 border-purple-200 dark:border-purple-800"
  },
  failed: {
    label: "Failed",
    className: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300 border-red-200 dark:border-red-800"
  }
};
function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] ?? {
    label: status,
    className: "bg-muted text-muted-foreground border-border"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${config.className}`,
      children: config.label
    }
  );
}
function OrderCard({ order, index }) {
  const navigate = useNavigate();
  const date = new Date(order.dateCreated).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
  const itemCount = order.lineItems.reduce((sum, i) => sum + i.quantity, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Card,
    {
      "data-ocid": `orders.item.${index + 1}`,
      className: "card-hover cursor-pointer border-border bg-card group",
      onClick: () => navigate({ to: "/orders/$id", params: { id: String(order.id) } }),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4 sm:p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-5 h-5 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-semibold text-foreground text-sm", children: [
                "Order #",
                order.id
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: order.status })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: date }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
              itemCount,
              " ",
              itemCount === 1 ? "item" : "items"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-2 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-foreground text-base", children: [
            "$",
            Number.parseFloat(order.total).toFixed(2)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "ghost",
              "data-ocid": `orders.view_button.${index + 1}`,
              className: "text-primary hover:text-primary text-xs h-7 px-2 gap-1 group-hover:bg-primary/10",
              onClick: (e) => {
                e.stopPropagation();
                navigate({
                  to: "/orders/$id",
                  params: { id: String(order.id) }
                });
              },
              children: [
                "View Details",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
              ]
            }
          )
        ] })
      ] }) })
    }
  );
}
function OrderSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4 sm:p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-10 h-10 rounded-lg" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-24" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-16" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-16" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-24" })
    ] })
  ] }) }) });
}
function Orders() {
  const { user } = useAuth();
  const [page, setPage] = reactExports.useState(1);
  const {
    data: allOrders = [],
    isLoading,
    isError,
    refetch
  } = useOrders((user == null ? void 0 : user.wooCustomerId) ?? null);
  const sorted = [...allOrders].sort(
    (a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
  );
  const totalPages = Math.ceil(sorted.length / PER_PAGE);
  const start = (page - 1) * PER_PAGE;
  const pageOrders = sorted.slice(start, start + PER_PAGE);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto px-4 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "My Orders" }),
        !isLoading && !isError && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
          allOrders.length,
          " ",
          allOrders.length === 1 ? "order" : "orders",
          " total"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => void refetch(),
          "data-ocid": "orders.refresh_button",
          className: "gap-2 text-muted-foreground hover:text-foreground",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Refresh" })
          ]
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 py-6", children: [
      isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "orders.loading_state", className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(OrderSkeleton, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(OrderSkeleton, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(OrderSkeleton, {})
      ] }),
      isError && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "orders.error_state",
          className: "flex flex-col items-center justify-center gap-4 py-16 text-center",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-8 h-8 text-destructive" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-lg text-foreground", children: "Could not load orders" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs", children: "Something went wrong while fetching your orders. Please try again." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                "data-ocid": "orders.retry_button",
                onClick: () => void refetch(),
                className: "btn-pride gap-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
                  "Retry"
                ]
              }
            )
          ]
        }
      ),
      !isLoading && !isError && allOrders.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          "data-ocid": "orders.empty_state",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-10 h-10" }),
          title: "No orders yet",
          description: "Your order history will appear here once you place your first order.",
          ctaLabel: "Start Shopping",
          ctaHref: "/products"
        }
      ),
      !isLoading && !isError && pageOrders.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "orders.list", className: "space-y-3", children: pageOrders.map((order, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(OrderCard, { order, index: start + i }, order.id)) }),
      !isLoading && !isError && totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-6 pt-6 border-t border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            "data-ocid": "orders.pagination_prev",
            disabled: page === 1,
            onClick: () => setPage((p) => Math.max(1, p - 1)),
            className: "gap-2",
            children: "Previous"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
          "Page ",
          page,
          " of ",
          totalPages
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            "data-ocid": "orders.pagination_next",
            disabled: page === totalPages,
            onClick: () => setPage((p) => Math.min(totalPages, p + 1)),
            className: "gap-2",
            children: "Next"
          }
        )
      ] })
    ] })
  ] });
}
export {
  Orders as default
};
