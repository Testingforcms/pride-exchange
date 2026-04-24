import { c as createLucideIcon, i as useParams, g as useNavigate, o as useQueryClient, r as reactExports, j as jsxRuntimeExports, B as Button, p as House, n as ue, S as Skeleton } from "./index-H678KSt5.js";
import { createActor } from "./backend-DCDaJMxi.js";
import { A as AlertDialog, a as AlertDialogTrigger, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, h as AlertDialogAction } from "./alert-dialog-C12qDAkM.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-DlgkKOGH.js";
import { S as Separator } from "./separator-AWN0Z2fG.js";
import { u as useOrder } from "./useOrder-C99YPbdH.js";
import { u as useActor } from "./useActor-B2woeb8X.js";
import { C as ChevronRight } from "./chevron-right-Cf9rjURF.js";
import { C as CircleAlert } from "./circle-alert-CQwiZj29.js";
import { R as RefreshCw } from "./refresh-cw-CZ4L5rsu.js";
import { P as Package } from "./package-DnVNg46m.js";
import { C as CircleX, M as MapPin } from "./map-pin-DzEGtiOE.js";
import "./actor-Bhp-OfYg.js";
import "./index-B7w5Djay.js";
import "./Combination-DLafyM7a.js";
import "./index-CEQ5Rdgw.js";
import "./index-D9N1YI4t.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
];
const CreditCard = createLucideIcon("credit-card", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m16 16 2 2 4-4", key: "gfu2re" }],
  [
    "path",
    {
      d: "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",
      key: "e7tb2h"
    }
  ],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["line", { x1: "12", x2: "12", y1: "22", y2: "12", key: "a4e8g8" }]
];
const PackageCheck = createLucideIcon("package-check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2", key: "wrbu53" }],
  ["path", { d: "M15 18H9", key: "1lyqi6" }],
  [
    "path",
    {
      d: "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",
      key: "lysw3i"
    }
  ],
  ["circle", { cx: "17", cy: "18", r: "2", key: "332jqn" }],
  ["circle", { cx: "7", cy: "18", r: "2", key: "19iecd" }]
];
const Truck = createLucideIcon("truck", __iconNode);
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
      className: `inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${config.className}`,
      children: config.label
    }
  );
}
const TIMELINE_STEPS = [
  { key: "placed", label: "Order Placed", icon: Package },
  { key: "processing", label: "Processing", icon: LoaderCircle },
  { key: "shipped", label: "Shipped", icon: Truck },
  { key: "delivered", label: "Delivered", icon: PackageCheck }
];
function getTimelineProgress(status) {
  const map = {
    pending: 1,
    "on-hold": 1,
    processing: 2,
    completed: 4,
    cancelled: -1,
    refunded: -1,
    failed: -1
  };
  return map[status] ?? 1;
}
function StatusTimeline({ status }) {
  const isCancelled = status === "cancelled" || status === "refunded" || status === "failed";
  const progress = getTimelineProgress(status);
  if (isCancelled) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-5 h-5 text-red-600 dark:text-red-400" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground capitalize", children: status }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          "This order has been ",
          status
        ] })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute top-5 left-5 h-0.5 bg-border",
        style: { right: "1.25rem" }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute top-5 left-5 h-0.5 bg-primary transition-all duration-700",
        style: {
          width: `calc(${Math.min((progress - 1) / (TIMELINE_STEPS.length - 1) * 100, 100)}% - 0.5rem)`
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex justify-between", children: TIMELINE_STEPS.map((step, idx) => {
      const stepNum = idx + 1;
      const isDone = stepNum < progress;
      const isCurrent = stepNum === progress;
      const isPending = stepNum > progress;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center gap-2 flex-1",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": `order_detail.timeline_step.${stepNum}`,
                className: [
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 z-10 relative",
                  isDone ? "bg-primary border-primary" : isCurrent ? "bg-primary border-primary ring-4 ring-primary/20" : "bg-background border-border"
                ].join(" "),
                children: [
                  isDone ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-primary-foreground" }) : isCurrent ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    step.icon,
                    {
                      className: [
                        "w-4 h-4 text-primary-foreground",
                        isCurrent && step.key === "processing" ? "animate-spin" : ""
                      ].join(" ")
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx(step.icon, { className: "w-4 h-4 text-muted-foreground" }),
                  isCurrent && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 rounded-full animate-ping bg-primary/30" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: [
                  "text-xs font-medium text-center leading-tight",
                  isPending ? "text-muted-foreground" : "text-foreground"
                ].join(" "),
                children: step.label
              }
            )
          ]
        },
        step.key
      );
    }) })
  ] });
}
function AddressCard({ title, address }) {
  const hasAddress = address.address1 || address.city || address.firstName || address.lastName;
  if (!hasAddress) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border bg-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2 pt-4 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold text-muted-foreground flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4" }),
      title
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "px-4 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-foreground space-y-0.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium", children: [
        address.firstName,
        " ",
        address.lastName
      ] }),
      address.address1 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: address.address1 }),
      address.address2 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: address.address2 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: [address.city, address.state, address.postcode].filter(Boolean).join(", ") }),
      address.country && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: address.country }),
      address.phone && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: address.phone })
    ] }) })
  ] });
}
function PaymentMethodDisplay({ method }) {
  const isStripe = method.toLowerCase().includes("stripe") || method === "stripe";
  const isPayPal = method.toLowerCase().includes("paypal") || method === "ppcp-gateway" || method === "paypal";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-5 h-5 text-muted-foreground" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: isStripe ? "Stripe" : isPayPal ? "PayPal" : method || "Unknown" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: isStripe ? "Credit / Debit Card" : isPayPal ? "PayPal Account" : "Payment method" })
    ] })
  ] });
}
function DetailSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "order_detail.loading_state",
      className: "space-y-4 animate-pulse",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-48" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 w-full rounded-xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full rounded-xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 rounded-xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 rounded-xl" })
        ] })
      ]
    }
  );
}
function OrderDetail() {
  const { id } = useParams({ from: "/orders/$id" });
  const navigate = useNavigate();
  const qc = useQueryClient();
  const orderId = Number.parseInt(id, 10);
  const { actor } = useActor(createActor);
  const {
    data: order,
    isLoading,
    isError,
    refetch
  } = useOrder(Number.isNaN(orderId) ? null : orderId);
  const [isCancelling, setIsCancelling] = reactExports.useState(false);
  const canCancel = order && (order.status === "pending" || order.status === "processing");
  async function handleCancel() {
    if (!order || !actor) return;
    setIsCancelling(true);
    try {
      const result = await actor.cancelOrder(BigInt(order.id));
      if (result.__kind__ === "err") throw new Error(result.err);
      await qc.invalidateQueries({ queryKey: ["order", order.id] });
      await qc.invalidateQueries({ queryKey: ["orders"] });
      ue.success("Order cancelled successfully");
    } catch {
      ue.error("Failed to cancel order. Please try again.");
    } finally {
      setIsCancelling(false);
    }
  }
  const date = order ? new Date(order.dateCreated).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  }) : "";
  const subtotal = order ? order.lineItems.reduce((s, i) => s + Number.parseFloat(i.total), 0) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border sticky top-0 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 py-3 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "ghost",
          size: "sm",
          "data-ocid": "order_detail.back_button",
          onClick: () => navigate({ to: "/orders" }),
          className: "gap-1.5 text-muted-foreground hover:text-foreground -ml-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Back to Orders" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "nav",
        {
          "aria-label": "Breadcrumb",
          className: "hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground ml-auto",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => navigate({ to: "/" }),
                className: "hover:text-foreground transition-colors flex items-center gap-1",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "w-3 h-3" }),
                  "Home"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => navigate({ to: "/orders" }),
                className: "hover:text-foreground transition-colors",
                children: "My Orders"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: order ? `Order #${order.id}` : "Loading…" })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 py-6 space-y-5", children: [
      isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(DetailSkeleton, {}),
      isError && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "order_detail.error_state",
          className: "flex flex-col items-center justify-center gap-4 py-16 text-center",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-8 h-8 text-destructive" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-lg text-foreground", children: "Could not load order" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Failed to fetch order details. Please try again." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                "data-ocid": "order_detail.retry_button",
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
      !isLoading && !isError && !order && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Order not found." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "link",
            onClick: () => navigate({ to: "/orders" }),
            className: "mt-2 text-primary",
            children: "Back to orders"
          }
        )
      ] }),
      order && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Card,
          {
            "data-ocid": "order_detail.header",
            className: "border-border bg-card",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-xl text-foreground", children: [
                    "Order #",
                    order.id
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: order.status })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: date })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Order Total" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-bold text-2xl text-foreground", children: [
                  "$",
                  Number.parseFloat(order.total).toFixed(2)
                ] })
              ] })
            ] }) })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border bg-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2 pt-4 px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wide", children: "Order Status" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "px-5 pb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusTimeline, { status: order.status }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Card,
          {
            "data-ocid": "order_detail.items_section",
            className: "border-border bg-card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2 pt-4 px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wide", children: [
                order.lineItems.length,
                " ",
                order.lineItems.length === 1 ? "Item" : "Items"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "px-5 pb-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: order.lineItems.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  "data-ocid": `order_detail.item.${idx + 1}`,
                  className: "flex items-center gap-3 py-3",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-lg bg-muted shrink-0 flex items-center justify-center overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-6 h-6 text-muted-foreground" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: item.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                        "Qty: ",
                        item.quantity,
                        " × $",
                        Number.parseFloat(item.price).toFixed(2)
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground shrink-0", children: [
                      "$",
                      Number.parseFloat(item.total).toFixed(2)
                    ] })
                  ]
                },
                `${item.productId}-${idx}`
              )) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 border-t border-border space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Subtotal" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "$",
                    subtotal.toFixed(2)
                  ] })
                ] }),
                Number.parseFloat(order.total) < subtotal && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm text-green-600 dark:text-green-400", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Discount" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "−$",
                    (subtotal - Number.parseFloat(order.total)).toFixed(2)
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-2" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-display font-bold text-foreground text-base", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "$",
                    Number.parseFloat(order.total).toFixed(2)
                  ] })
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "order_detail.addresses_section",
            className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AddressCard, { title: "Billing Address", address: order.billing }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AddressCard, { title: "Shipping Address", address: order.shipping })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Card,
          {
            "data-ocid": "order_detail.payment_section",
            className: "border-border bg-card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2 pt-4 px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wide", children: "Payment Method" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "px-5 pb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PaymentMethodDisplay, { method: order.paymentMethod }) })
            ]
          }
        ),
        canCancel && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "order_detail.cancel_section", className: "pb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              "data-ocid": "order_detail.cancel_button",
              className: "w-full border-destructive text-destructive hover:bg-destructive/10 gap-2",
              disabled: isCancelling,
              children: [
                isCancelling ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4" }),
                "Cancel Order"
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "order_detail.dialog", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Cancel this order?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
                "Order #",
                order.id,
                " will be cancelled. This action cannot be undone. If you've already been charged, a refund may take 3–5 business days."
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "order_detail.cancel_button.confirm_cancel", children: "Keep Order" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                AlertDialogAction,
                {
                  "data-ocid": "order_detail.confirm_button",
                  onClick: () => void handleCancel(),
                  className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                  children: "Yes, Cancel Order"
                }
              )
            ] })
          ] })
        ] }) })
      ] })
    ] })
  ] });
}
export {
  OrderDetail as default
};
