const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/backend-DCDaJMxi.js","assets/actor-Bhp-OfYg.js","assets/index-H678KSt5.js","assets/index-DSAEicO0.css","assets/index-BDePP4It.js"])))=>i.map(i=>d[i]);
import { c as createLucideIcon, i as useParams, f as useSearch, j as jsxRuntimeExports, B as Button, L as Link, r as reactExports, S as Skeleton, _ as __vitePreload } from "./index-H678KSt5.js";
import { S as Separator } from "./separator-AWN0Z2fG.js";
import { u as useOrder } from "./useOrder-C99YPbdH.js";
import { m as motion } from "./proxy-CIW2Aglt.js";
import { P as Package } from "./package-DnVNg46m.js";
import { S as ShoppingBag } from "./shopping-bag-Cc-mwI3i.js";
import { C as CircleX, M as MapPin } from "./map-pin-DzEGtiOE.js";
import "./index-D9N1YI4t.js";
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
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode);
const STATUS_STYLES = {
  pending: "bg-muted text-muted-foreground",
  processing: "bg-secondary/20 text-secondary",
  "on-hold": "bg-accent/20 text-accent",
  completed: "bg-primary/20 text-primary",
  cancelled: "bg-destructive/20 text-destructive-foreground",
  refunded: "bg-muted text-muted-foreground",
  failed: "bg-destructive/20 text-destructive-foreground"
};
function OrderStatusBadge({ status }) {
  const style = STATUS_STYLES[status] ?? "bg-muted text-muted-foreground";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${style}`,
      children: status
    }
  );
}
function AddressBlock({ label, addr }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3" }),
      " ",
      label
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground font-medium", children: [
      addr.firstName,
      " ",
      addr.lastName
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: addr.address1 }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
      addr.city,
      ", ",
      addr.state,
      " ",
      addr.postcode
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: addr.country }),
    addr.email && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: addr.email }),
    addr.phone && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: addr.phone })
  ] });
}
function ConfirmationSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-2xl mx-auto px-4 py-8 space-y-6",
      "data-ocid": "order_confirmation.loading_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-16 h-16 rounded-full mx-auto" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-56 mx-auto" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-80 mx-auto" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-40 w-full rounded-xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 w-full rounded-xl" })
      ]
    }
  );
}
function ErrorState({ orderId }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-2xl mx-auto px-4 py-16 text-center space-y-4",
      "data-ocid": "order_confirmation.error_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl", children: "📦" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-display font-bold text-foreground", children: [
          "Order #",
          orderId,
          " not found"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "We couldn't load your order details. Your order may still be processing." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              variant: "outline",
              "data-ocid": "order_confirmation.view_orders_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/orders", children: "View All Orders" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, "data-ocid": "order_confirmation.continue_shopping_button", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/products",
              search: {
                search: void 0,
                category: void 0,
                orderby: void 0,
                page: void 0
              },
              children: "Continue Shopping"
            }
          ) })
        ] })
      ]
    }
  );
}
function StripePendingView({ sessionId }) {
  const [status, setStatus] = reactExports.useState("polling");
  const [errorMsg, setErrorMsg] = reactExports.useState("");
  const intervalRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      setErrorMsg("Missing Stripe session ID.");
      return;
    }
    async function poll() {
      try {
        const { createActor } = await __vitePreload(async () => {
          const { createActor: createActor2 } = await import("./backend-DCDaJMxi.js");
          return { createActor: createActor2 };
        }, true ? __vite__mapDeps([0,1,2,3]) : void 0);
        const { HttpAgent } = await __vitePreload(async () => {
          const { HttpAgent: HttpAgent2 } = await import("./index-BDePP4It.js");
          return { HttpAgent: HttpAgent2 };
        }, true ? __vite__mapDeps([4,1,2,3]) : void 0);
        const envJson = await fetch("/env.json").then((r) => r.json());
        const canisterId = envJson.CANISTER_ID_BACKEND ?? "";
        const isLocal = envJson.DFX_NETWORK !== "ic";
        const agent = HttpAgent.createSync({
          host: isLocal ? "http://localhost:4943" : "https://ic0.app"
        });
        if (isLocal) await agent.fetchRootKey();
        const noopUpload = async (_f) => new Uint8Array();
        const noopDownload = async (_f) => ({
          directURL: "",
          getBytes: async () => new Uint8Array(),
          getDirectURL: () => ""
        });
        const actor = createActor(canisterId, noopUpload, noopDownload, {
          agent
        });
        const result = await actor.getStripeSessionStatus(sessionId);
        if (result.__kind__ === "completed") {
          setStatus("complete");
          if (intervalRef.current) clearInterval(intervalRef.current);
        } else if (result.__kind__ === "failed") {
          setStatus("expired");
          setErrorMsg(result.failed.error);
          if (intervalRef.current) clearInterval(intervalRef.current);
        }
      } catch (e) {
        setStatus("error");
        setErrorMsg(e instanceof Error ? e.message : "Unknown error");
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }
    void poll();
    intervalRef.current = setInterval(() => void poll(), 3e3);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [sessionId]);
  if (status === "polling") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-2xl mx-auto px-4 py-16 text-center space-y-6",
        "data-ocid": "order_confirmation.stripe_polling",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.9 },
              animate: { opacity: 1, scale: 1 },
              className: "text-center space-y-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Confirming your payment…" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-sm mx-auto", children: "Please wait while we confirm your Stripe payment. This usually takes a few seconds." })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              variant: "outline",
              "data-ocid": "order_confirmation.view_orders_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/orders", children: "View My Orders" })
            }
          ) })
        ]
      }
    );
  }
  if (status === "complete") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-2xl mx-auto px-4 py-16 text-center space-y-6",
        "data-ocid": "order_confirmation.stripe_complete",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.9 },
              animate: { opacity: 1, scale: 1 },
              transition: { duration: 0.4, ease: "easeOut" },
              className: "text-center space-y-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-8 h-8" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Payment confirmed!" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-sm mx-auto", children: "Your payment was successful and your order is being processed. You'll receive updates by email." })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                asChild: true,
                variant: "outline",
                "data-ocid": "order_confirmation.view_orders_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/orders", children: "View My Orders" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                asChild: true,
                className: "btn-pride",
                "data-ocid": "order_confirmation.continue_shopping_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Link,
                  {
                    to: "/products",
                    search: {
                      search: void 0,
                      category: void 0,
                      orderby: void 0,
                      page: void 0
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-4 h-4 mr-2" }),
                      "Continue Shopping"
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-2xl mx-auto px-4 py-16 text-center space-y-6",
      "data-ocid": "order_confirmation.stripe_failed",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.9 },
            animate: { opacity: 1, scale: 1 },
            transition: { duration: 0.4 },
            className: "text-center space-y-4",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 text-destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-8 h-8" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-display font-bold text-foreground", children: [
                "Payment ",
                status === "expired" ? "expired" : "failed"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-sm mx-auto", children: errorMsg || "Your payment session has expired or failed. Please try again." })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              className: "btn-pride",
              "data-ocid": "order_confirmation.try_again_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/checkout", children: "Try Again" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              variant: "outline",
              "data-ocid": "order_confirmation.continue_shopping_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/products",
                  search: {
                    search: void 0,
                    category: void 0,
                    orderby: void 0,
                    page: void 0
                  },
                  children: "Continue Shopping"
                }
              )
            }
          )
        ] })
      ]
    }
  );
}
function OrderConfirmation() {
  const { id } = useParams({ from: "/order-confirmation/$id" });
  const search = useSearch({ from: "/order-confirmation/$id" });
  const sessionId = search.session_id ?? "";
  const isStripePending = id === "stripe-pending";
  const orderId = isStripePending ? null : Number.parseInt(id, 10);
  const {
    data: order,
    isLoading,
    isError
  } = useOrder(isStripePending ? null : orderId);
  if (isStripePending) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(StripePendingView, { sessionId });
  }
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(ConfirmationSkeleton, {});
  if (isError || !order && !isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorState, { orderId: id });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-2xl mx-auto px-4 py-8 space-y-6",
      "data-ocid": "order_confirmation.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.9 },
            animate: { opacity: 1, scale: 1 },
            transition: { duration: 0.4, ease: "easeOut" },
            className: "text-center space-y-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-8 h-8" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Thank you for your order!" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-sm mx-auto", children: "Your order is being processed. You'll receive updates by email." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/60 px-3 py-1.5 rounded-full", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-3.5 h-3.5" }),
                "Estimated delivery: 5–10 business days"
              ] })
            ]
          }
        ),
        order && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.15, duration: 0.35 },
              className: "bg-card border border-border rounded-xl p-5 space-y-4",
              "data-ocid": "order_confirmation.order_card",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Order" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-bold text-foreground text-lg", children: [
                      "#",
                      order.id
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(OrderStatusBadge, { status: order.status })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Payment" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground capitalize", children: order.paymentMethod || "—" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Date" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: order.dateCreated ? new Date(order.dateCreated).toLocaleDateString() : "—" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Items" }),
                  order.lineItems.map((li, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex justify-between items-center gap-2",
                      "data-ocid": `order_confirmation.item.${idx + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: li.name }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                            "×",
                            li.quantity
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground flex-shrink-0", children: [
                          "$",
                          Number.parseFloat(li.total).toFixed(2)
                        ] })
                      ]
                    },
                    `${li.productId}-${idx}`
                  ))
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "Total" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg font-bold text-primary", children: [
                    "$",
                    Number.parseFloat(order.total).toFixed(2)
                  ] })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.25, duration: 0.35 },
              className: "bg-card border border-border rounded-xl p-5 grid grid-cols-1 sm:grid-cols-2 gap-6",
              "data-ocid": "order_confirmation.addresses",
              children: [
                order.billing && /* @__PURE__ */ jsxRuntimeExports.jsx(AddressBlock, { label: "Billing Address", addr: order.billing }),
                order.shipping && /* @__PURE__ */ jsxRuntimeExports.jsx(AddressBlock, { label: "Shipping Address", addr: order.shipping })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.35, duration: 0.3 },
              className: "flex flex-col sm:flex-row gap-3",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    asChild: true,
                    variant: "outline",
                    className: "flex-1",
                    "data-ocid": "order_confirmation.view_order_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/orders/$id", params: { id: String(order.id) }, children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4 mr-2" }),
                      "View Order Details"
                    ] })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    asChild: true,
                    className: "flex-1 btn-pride",
                    "data-ocid": "order_confirmation.continue_shopping_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Link,
                      {
                        to: "/products",
                        search: {
                          search: void 0,
                          category: void 0,
                          orderby: void 0,
                          page: void 0
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-4 h-4 mr-2" }),
                          "Continue Shopping"
                        ]
                      }
                    )
                  }
                )
              ]
            }
          )
        ] })
      ]
    }
  );
}
export {
  OrderConfirmation as default
};
