import { c as createLucideIcon, g as useNavigate, k as useCart, u as useAuth, r as reactExports, j as jsxRuntimeExports, m as ShoppingCart, h as Badge, X, B as Button, L as Link, n as ue, S as Skeleton } from "./index-H678KSt5.js";
import { createActor } from "./backend-DCDaJMxi.js";
import { E as EmptyState } from "./EmptyState-Ck0uGg5A.js";
import { I as Input } from "./input-DQyXjHW1.js";
import { u as useActor } from "./useActor-B2woeb8X.js";
import { A as AnimatePresence } from "./index-BF__D6vH.js";
import { m as motion } from "./proxy-CIW2Aglt.js";
import { M as Minus, P as Plus } from "./plus-De0pKXJS.js";
import { T as Tag } from "./tag-BuxpZIRL.js";
import { S as ShoppingBag } from "./shopping-bag-Cc-mwI3i.js";
import "./actor-Bhp-OfYg.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode);
function calcDiscount(coupon, subtotal) {
  const amount = Number.parseFloat(coupon.amount || "0");
  if (coupon.discountType === "percent") {
    return subtotal * amount / 100;
  }
  return Math.min(amount, subtotal);
}
function ProductImage({ src, alt }) {
  const [loaded, setLoaded] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-[60px] h-[60px] rounded-lg overflow-hidden bg-muted flex-shrink-0", children: [
    !loaded && !error && /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "absolute inset-0 w-full h-full" }),
    src && !error ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src,
        alt,
        loading: "lazy",
        className: `w-full h-full object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`,
        onLoad: () => setLoaded(true),
        onError: () => setError(true)
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 20 }) })
  ] });
}
function Cart() {
  const navigate = useNavigate();
  const {
    items,
    itemCount,
    subtotal,
    coupon: appliedCoupon,
    updateQuantity,
    removeItem,
    applyCoupon,
    removeCoupon
  } = useCart();
  const { isLoggedIn } = useAuth();
  const { actor } = useActor(createActor);
  const [couponCode, setCouponCode] = reactExports.useState("");
  const [couponData, setCouponData] = reactExports.useState(null);
  const [couponLoading, setCouponLoading] = reactExports.useState(false);
  const [guestBannerDismissed, setGuestBannerDismissed] = reactExports.useState(false);
  const bannerKey = "tpe_guest_banner_dismissed";
  reactExports.useEffect(() => {
    const dismissed = sessionStorage.getItem(bannerKey);
    if (dismissed) setGuestBannerDismissed(true);
  }, []);
  reactExports.useEffect(() => {
    if (appliedCoupon == null ? void 0 : appliedCoupon.code) {
      setCouponCode(appliedCoupon.code);
    }
  }, [appliedCoupon]);
  const inputRef = reactExports.useRef(null);
  function handleDismissBanner() {
    setGuestBannerDismissed(true);
    sessionStorage.setItem(bannerKey, "1");
  }
  async function handleApplyCoupon() {
    const code = couponCode.trim();
    if (!code) return;
    setCouponLoading(true);
    try {
      if (!actor) throw new Error("Not connected");
      const result = await actor.validateCoupon(code);
      if (result.__kind__ === "err") {
        ue.error("Invalid coupon code. Please check and try again.");
        setCouponData(null);
        return;
      }
      const c = result.ok;
      if (c.minimumAmount && Number.parseFloat(c.minimumAmount) > subtotal) {
        ue.error(
          `This coupon requires a minimum order of $${Number.parseFloat(c.minimumAmount).toFixed(2)}.`
        );
        return;
      }
      setCouponData(c);
      applyCoupon(code);
      ue.success(`Coupon "${code.toUpperCase()}" applied!`);
    } catch {
      ue.error("Failed to validate coupon. Please try again.");
    } finally {
      setCouponLoading(false);
    }
  }
  function handleRemoveCoupon() {
    setCouponData(null);
    removeCoupon();
    setCouponCode("");
    ue.info("Coupon removed.");
  }
  const discount = couponData ? calcDiscount(couponData, subtotal) : 0;
  const orderTotal = Math.max(0, subtotal - discount);
  function handleCheckout() {
    if (!isLoggedIn) {
      navigate({ to: "/login", search: { returnUrl: "/checkout" } });
    } else {
      navigate({ to: "/checkout" });
    }
  }
  if (items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[70vh] flex flex-col items-center justify-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        "data-ocid": "cart.empty_state",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { size: 36 }),
        title: "Your cart is empty",
        description: "Looks like you haven't added anything yet. Start browsing and find something you love.",
        ctaLabel: "Browse Products",
        ctaHref: "/products"
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 py-6 sm:py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex items-center gap-3", "data-ocid": "cart.page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { size: 24, className: "text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Your Cart" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "ml-1 text-xs", children: [
        itemCount,
        " ",
        itemCount === 1 ? "item" : "items"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: !isLoggedIn && !guestBannerDismissed && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
        transition: { duration: 0.25 },
        "data-ocid": "cart.guest_banner",
        className: "mb-5 flex items-start sm:items-center justify-between gap-3 px-4 py-3 rounded-lg bg-accent/10 border border-accent/30 text-sm text-foreground",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-accent", children: "Tip:" }),
            " Log in to save your cart across devices and access exclusive member benefits."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "aria-label": "Dismiss",
              onClick: handleDismissBanner,
              "data-ocid": "cart.guest_banner.close_button",
              className: "text-muted-foreground hover:text-foreground flex-shrink-0 transition-colors duration-200",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16 })
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col lg:flex-row gap-8 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 space-y-3", "data-ocid": "cart.list", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: items.map((item, index) => {
          var _a;
          const price = Number.parseFloat(
            item.product.salePrice || item.product.price || "0"
          );
          const lineTotal = price * item.quantity;
          const image = (_a = item.product.images) == null ? void 0 : _a[0];
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              layout: true,
              initial: { opacity: 0, x: -16 },
              animate: { opacity: 1, x: 0 },
              exit: {
                opacity: 0,
                x: 32,
                height: 0,
                marginTop: 0,
                marginBottom: 0
              },
              transition: { duration: 0.28, ease: "easeInOut" },
              "data-ocid": `cart.item.${index + 1}`,
              className: "flex items-start gap-4 p-4 rounded-xl bg-card border border-border shadow-sm",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ProductImage,
                  {
                    src: image == null ? void 0 : image.src,
                    alt: (image == null ? void 0 : image.alt) ?? item.product.name
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "font-semibold text-sm text-foreground truncate leading-snug",
                      title: item.product.name,
                      children: item.product.name
                    }
                  ),
                  item.selectedAttributes && Object.keys(item.selectedAttributes).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: Object.entries(item.selectedAttributes).map(([k, v]) => `${k}: ${v}`).join(" · ") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                    "$",
                    price.toFixed(2),
                    " each"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        "data-ocid": `cart.quantity_decrement.${index + 1}`,
                        "aria-label": "Decrease quantity",
                        onClick: () => updateQuantity(
                          item.product.id,
                          item.quantity - 1,
                          item.variationId
                        ),
                        className: "w-7 h-7 rounded-md border border-border bg-background text-foreground flex items-center justify-center hover:bg-muted transition-smooth disabled:opacity-40",
                        disabled: item.quantity <= 1,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { size: 12 })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        "data-ocid": `cart.quantity_value.${index + 1}`,
                        className: "w-8 text-center text-sm font-semibold text-foreground tabular-nums",
                        children: item.quantity
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        "data-ocid": `cart.quantity_increment.${index + 1}`,
                        "aria-label": "Increase quantity",
                        onClick: () => updateQuantity(
                          item.product.id,
                          item.quantity + 1,
                          item.variationId
                        ),
                        className: "w-7 h-7 rounded-md border border-border bg-background text-foreground flex items-center justify-center hover:bg-muted transition-smooth",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 12 })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-sm font-bold text-foreground tabular-nums", children: [
                      "$",
                      lineTotal.toFixed(2)
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        "data-ocid": `cart.delete_button.${index + 1}`,
                        "aria-label": `Remove ${item.product.name}`,
                        onClick: () => removeItem(item.product.id, item.variationId),
                        className: "w-7 h-7 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 flex items-center justify-center transition-smooth ml-1",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 13 })
                      }
                    )
                  ] })
                ] })
              ]
            },
            `${item.product.id}-${item.variationId ?? "base"}`
          );
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "cart.coupon.section",
            className: "mt-6 p-4 rounded-xl bg-card border border-border",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3 text-sm font-semibold text-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { size: 15, className: "text-primary" }),
                "Coupon Code"
              ] }),
              (appliedCoupon == null ? void 0 : appliedCoupon.code) && couponData ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-500/15 text-green-600 border-green-500/30 text-xs font-semibold px-3 py-1", children: appliedCoupon.code.toUpperCase() }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                    "−$",
                    discount.toFixed(2),
                    " discount"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "cart.coupon.remove_button",
                    onClick: handleRemoveCoupon,
                    className: "text-xs text-destructive hover:underline transition-smooth",
                    children: "Remove"
                  }
                )
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    ref: inputRef,
                    "data-ocid": "cart.coupon.input",
                    placeholder: "Enter coupon code",
                    value: couponCode,
                    onChange: (e) => setCouponCode(e.target.value),
                    onKeyDown: (e) => e.key === "Enter" && handleApplyCoupon(),
                    className: "flex-1 uppercase placeholder:normal-case text-sm"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    "data-ocid": "cart.coupon.apply_button",
                    variant: "outline",
                    className: "px-4 text-sm font-semibold",
                    onClick: handleApplyCoupon,
                    disabled: couponLoading || !couponCode.trim(),
                    children: couponLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "w-3.5 h-3.5 rounded-full border-2 border-current border-t-transparent animate-spin",
                          "aria-hidden": true
                        }
                      ),
                      "Applying…"
                    ] }) : "Apply"
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/products",
            search: {
              search: void 0,
              category: void 0,
              orderby: void 0,
              page: void 0
            },
            "data-ocid": "cart.continue_shopping.link",
            className: "text-sm text-primary hover:underline font-medium transition-smooth",
            children: "← Continue Shopping"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          "data-ocid": "cart.order_summary",
          className: "w-full lg:w-80 lg:sticky lg:top-24",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-card border border-border p-5 shadow-sm space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-base text-foreground", children: "Order Summary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2.5 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium tabular-nums", children: [
                  "$",
                  subtotal.toFixed(2)
                ] })
              ] }),
              discount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-green-600", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Discount" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium tabular-nums", children: [
                  "−$",
                  discount.toFixed(2)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Est. Shipping" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs italic", children: "Calculated at checkout" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Est. Tax" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs italic", children: "Calculated at checkout" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-2.5 flex justify-between text-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-base", children: "Order Total" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-base tabular-nums text-primary", children: [
                  "$",
                  orderTotal.toFixed(2)
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                "data-ocid": "cart.checkout.primary_button",
                className: "btn-pride w-full text-sm py-3 h-auto font-semibold",
                onClick: handleCheckout,
                children: isLoggedIn ? "Proceed to Checkout" : "Log in to Checkout"
              }
            ),
            !isLoggedIn && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground", children: "You'll be asked to log in before checkout." })
          ] })
        }
      )
    ] })
  ] });
}
export {
  Cart as default
};
