import { j as jsxRuntimeExports, B as Button, e as cn } from "./index-H678KSt5.js";
function EmptyState({
  icon,
  title,
  description,
  ctaLabel,
  onCta,
  ctaHref,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "empty_state",
      className: cn(
        "flex flex-col items-center justify-center gap-4 py-16 px-6 text-center",
        className
      ),
      children: [
        icon && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-muted flex items-center justify-center text-muted-foreground", children: icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-lg text-foreground", children: title }),
          description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs", children: description })
        ] }),
        ctaLabel && (onCta || ctaHref) && (ctaHref ? /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: ctaHref, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            className: "btn-pride",
            "data-ocid": "empty_state.primary_button",
            children: ctaLabel
          }
        ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: onCta,
            className: "btn-pride",
            "data-ocid": "empty_state.primary_button",
            children: ctaLabel
          }
        ))
      ]
    }
  );
}
export {
  EmptyState as E
};
