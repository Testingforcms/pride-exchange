import { c as createLucideIcon, u as useAuth, f as useSearch, r as reactExports, j as jsxRuntimeExports, Y as Navigate, B as Button, L as Link } from "./index-H678KSt5.js";
import { S as ShoppingBag } from "./shopping-bag-Cc-mwI3i.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m10 17 5-5-5-5", key: "1bsop3" }],
  ["path", { d: "M15 12H3", key: "6jk70r" }],
  ["path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4", key: "u53s6r" }]
];
const LogIn = createLucideIcon("log-in", __iconNode);
function Login() {
  const { isLoggedIn, loginWithII, isLoading } = useAuth();
  const { returnUrl } = useSearch({ from: "/login" });
  reactExports.useEffect(() => {
    if (isLoggedIn && returnUrl) {
      window.location.replace(returnUrl);
    }
  }, [isLoggedIn, returnUrl]);
  if (isLoggedIn && !returnUrl) return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "flex flex-col items-center justify-center min-h-[80vh] px-4 py-12",
      "data-ocid": "login.page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm space-y-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl gradient-pride flex items-center justify-center shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-8 w-8 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "The Pride Exchange" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Sign in to access your account" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-6 shadow-sm space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: "Welcome back" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Use Internet Identity — no passwords, no tracking." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              onClick: loginWithII,
              disabled: isLoading,
              className: "btn-pride w-full gap-2 h-11",
              "data-ocid": "login.submit_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "h-4 w-4" }),
                isLoading ? "Connecting…" : "Sign in with Internet Identity"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-full border-t border-border" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex justify-center text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-card px-2 text-muted-foreground", children: "or" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "text-xs text-muted-foreground hover:text-foreground transition-colors",
              "data-ocid": "login.forgot_password_button",
              onClick: () => window.alert(
                "Please contact support at https://caffeine.ai for account help."
              ),
              children: "Forgot password?"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            "Don't have an account?",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/register",
                className: "text-primary font-medium hover:underline",
                "data-ocid": "login.register_link",
                children: "Register"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/",
              className: "block text-sm text-muted-foreground hover:text-foreground transition-colors",
              "data-ocid": "login.guest_link",
              children: "Continue as Guest →"
            }
          )
        ] })
      ] })
    }
  );
}
export {
  Login as default
};
