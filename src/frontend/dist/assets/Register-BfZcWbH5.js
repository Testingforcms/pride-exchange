import { c as createLucideIcon, u as useAuth, j as jsxRuntimeExports, Y as Navigate, B as Button, L as Link } from "./index-H678KSt5.js";
import { S as ShoppingBag } from "./shopping-bag-Cc-mwI3i.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "19", x2: "19", y1: "8", y2: "14", key: "1bvyxn" }],
  ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }]
];
const UserPlus = createLucideIcon("user-plus", __iconNode);
function Register() {
  const { isLoggedIn, loginWithII, isLoading } = useAuth();
  if (isLoggedIn) return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "flex flex-col items-center justify-center min-h-[80vh] px-4 py-12",
      "data-ocid": "register.page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm space-y-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl gradient-pride flex items-center justify-center shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-8 w-8 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "The Pride Exchange" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Create your account to start shopping" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-6 shadow-sm space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: "Create account" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Register with Internet Identity — secure, private, and passwordless." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 text-xs text-muted-foreground", children: [
            "Track your orders",
            "Save items to your wishlist",
            "Faster checkout with saved addresses"
          ].map((benefit) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" }),
            benefit
          ] }, benefit)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              onClick: loginWithII,
              disabled: isLoading,
              className: "btn-pride w-full gap-2 h-11",
              "data-ocid": "register.submit_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "h-4 w-4" }),
                isLoading ? "Connecting…" : "Register with Internet Identity"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-center text-muted-foreground leading-relaxed", children: "By registering, you agree to our terms. Internet Identity keeps you anonymous — no email or password required." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            "Already have an account?",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/login",
                search: { returnUrl: void 0 },
                className: "text-primary font-medium hover:underline",
                "data-ocid": "register.login_link",
                children: "Sign In"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/",
              className: "block text-sm text-muted-foreground hover:text-foreground transition-colors",
              "data-ocid": "register.guest_link",
              children: "Continue as Guest →"
            }
          )
        ] })
      ] })
    }
  );
}
export {
  Register as default
};
