const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/backend-DCDaJMxi.js","assets/actor-Bhp-OfYg.js","assets/index-H678KSt5.js","assets/index-DSAEicO0.css","assets/index-BDePP4It.js"])))=>i.map(i=>d[i]);
import { r as reactExports, j as jsxRuntimeExports, b as useComposedRefs, e as cn, k as useCart, u as useAuth, g as useNavigate, B as Button, h as Badge, _ as __vitePreload, S as Skeleton } from "./index-H678KSt5.js";
import { P as Primitive, b as useControllableState, d as composeEventHandlers, c as createContextScope } from "./index-B7w5Djay.js";
import { a as usePrevious, u as useSize } from "./index-rOxqgYq2.js";
import { P as Presence } from "./index-CEQ5Rdgw.js";
import { C as Check } from "./check-BTHN4F_s.js";
import { I as Input } from "./input-DQyXjHW1.js";
import { L as Label } from "./label-giCWjXcP.js";
import { S as Separator } from "./separator-AWN0Z2fG.js";
import { m as motion } from "./proxy-CIW2Aglt.js";
import "./index-D9N1YI4t.js";
var CHECKBOX_NAME = "Checkbox";
var [createCheckboxContext] = createContextScope(CHECKBOX_NAME);
var [CheckboxProviderImpl, useCheckboxContext] = createCheckboxContext(CHECKBOX_NAME);
function CheckboxProvider(props) {
  const {
    __scopeCheckbox,
    checked: checkedProp,
    children,
    defaultChecked,
    disabled,
    form,
    name,
    onCheckedChange,
    required,
    value = "on",
    // @ts-expect-error
    internal_do_not_use_render
  } = props;
  const [checked, setChecked] = useControllableState({
    prop: checkedProp,
    defaultProp: defaultChecked ?? false,
    onChange: onCheckedChange,
    caller: CHECKBOX_NAME
  });
  const [control, setControl] = reactExports.useState(null);
  const [bubbleInput, setBubbleInput] = reactExports.useState(null);
  const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
  const isFormControl = control ? !!form || !!control.closest("form") : (
    // We set this to true by default so that events bubble to forms without JS (SSR)
    true
  );
  const context = {
    checked,
    disabled,
    setChecked,
    control,
    setControl,
    name,
    form,
    value,
    hasConsumerStoppedPropagationRef,
    required,
    defaultChecked: isIndeterminate(defaultChecked) ? false : defaultChecked,
    isFormControl,
    bubbleInput,
    setBubbleInput
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CheckboxProviderImpl,
    {
      scope: __scopeCheckbox,
      ...context,
      children: isFunction(internal_do_not_use_render) ? internal_do_not_use_render(context) : children
    }
  );
}
var TRIGGER_NAME = "CheckboxTrigger";
var CheckboxTrigger = reactExports.forwardRef(
  ({ __scopeCheckbox, onKeyDown, onClick, ...checkboxProps }, forwardedRef) => {
    const {
      control,
      value,
      disabled,
      checked,
      required,
      setControl,
      setChecked,
      hasConsumerStoppedPropagationRef,
      isFormControl,
      bubbleInput
    } = useCheckboxContext(TRIGGER_NAME, __scopeCheckbox);
    const composedRefs = useComposedRefs(forwardedRef, setControl);
    const initialCheckedStateRef = reactExports.useRef(checked);
    reactExports.useEffect(() => {
      const form = control == null ? void 0 : control.form;
      if (form) {
        const reset = () => setChecked(initialCheckedStateRef.current);
        form.addEventListener("reset", reset);
        return () => form.removeEventListener("reset", reset);
      }
    }, [control, setChecked]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        role: "checkbox",
        "aria-checked": isIndeterminate(checked) ? "mixed" : checked,
        "aria-required": required,
        "data-state": getState(checked),
        "data-disabled": disabled ? "" : void 0,
        disabled,
        value,
        ...checkboxProps,
        ref: composedRefs,
        onKeyDown: composeEventHandlers(onKeyDown, (event) => {
          if (event.key === "Enter") event.preventDefault();
        }),
        onClick: composeEventHandlers(onClick, (event) => {
          setChecked((prevChecked) => isIndeterminate(prevChecked) ? true : !prevChecked);
          if (bubbleInput && isFormControl) {
            hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
            if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
          }
        })
      }
    );
  }
);
CheckboxTrigger.displayName = TRIGGER_NAME;
var Checkbox$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeCheckbox,
      name,
      checked,
      defaultChecked,
      required,
      disabled,
      value,
      onCheckedChange,
      form,
      ...checkboxProps
    } = props;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      CheckboxProvider,
      {
        __scopeCheckbox,
        checked,
        defaultChecked,
        disabled,
        required,
        onCheckedChange,
        name,
        form,
        value,
        internal_do_not_use_render: ({ isFormControl }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CheckboxTrigger,
            {
              ...checkboxProps,
              ref: forwardedRef,
              __scopeCheckbox
            }
          ),
          isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
            CheckboxBubbleInput,
            {
              __scopeCheckbox
            }
          )
        ] })
      }
    );
  }
);
Checkbox$1.displayName = CHECKBOX_NAME;
var INDICATOR_NAME = "CheckboxIndicator";
var CheckboxIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeCheckbox, forceMount, ...indicatorProps } = props;
    const context = useCheckboxContext(INDICATOR_NAME, __scopeCheckbox);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Presence,
      {
        present: forceMount || isIndeterminate(context.checked) || context.checked === true,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.span,
          {
            "data-state": getState(context.checked),
            "data-disabled": context.disabled ? "" : void 0,
            ...indicatorProps,
            ref: forwardedRef,
            style: { pointerEvents: "none", ...props.style }
          }
        )
      }
    );
  }
);
CheckboxIndicator.displayName = INDICATOR_NAME;
var BUBBLE_INPUT_NAME = "CheckboxBubbleInput";
var CheckboxBubbleInput = reactExports.forwardRef(
  ({ __scopeCheckbox, ...props }, forwardedRef) => {
    const {
      control,
      hasConsumerStoppedPropagationRef,
      checked,
      defaultChecked,
      required,
      disabled,
      name,
      value,
      form,
      bubbleInput,
      setBubbleInput
    } = useCheckboxContext(BUBBLE_INPUT_NAME, __scopeCheckbox);
    const composedRefs = useComposedRefs(forwardedRef, setBubbleInput);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = bubbleInput;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      const bubbles = !hasConsumerStoppedPropagationRef.current;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        input.indeterminate = isIndeterminate(checked);
        setChecked.call(input, isIndeterminate(checked) ? false : checked);
        input.dispatchEvent(event);
      }
    }, [bubbleInput, prevChecked, checked, hasConsumerStoppedPropagationRef]);
    const defaultCheckedRef = reactExports.useRef(isIndeterminate(checked) ? false : checked);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.input,
      {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: defaultChecked ?? defaultCheckedRef.current,
        required,
        disabled,
        name,
        value,
        form,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0,
          // We transform because the input is absolutely positioned but we have
          // rendered it **after** the button. This pulls it back to sit on top
          // of the button.
          transform: "translateX(-100%)"
        }
      }
    );
  }
);
CheckboxBubbleInput.displayName = BUBBLE_INPUT_NAME;
function isFunction(value) {
  return typeof value === "function";
}
function isIndeterminate(checked) {
  return checked === "indeterminate";
}
function getState(checked) {
  return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
function Checkbox({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Checkbox$1,
    {
      "data-slot": "checkbox",
      className: cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        CheckboxIndicator,
        {
          "data-slot": "checkbox-indicator",
          className: "flex items-center justify-center text-current transition-none",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3.5" })
        }
      )
    }
  );
}
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
const COUNTRIES = [
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "ZA", name: "South Africa" },
  { code: "NG", name: "Nigeria" },
  { code: "KE", name: "Kenya" },
  { code: "GH", name: "Ghana" },
  { code: "IN", name: "India" },
  { code: "PK", name: "Pakistan" },
  { code: "BD", name: "Bangladesh" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "NL", name: "Netherlands" },
  { code: "SE", name: "Sweden" },
  { code: "NO", name: "Norway" },
  { code: "DK", name: "Denmark" },
  { code: "IT", name: "Italy" },
  { code: "ES", name: "Spain" }
];
const emptyAddress = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address1: "",
  city: "",
  state: "",
  postcode: "",
  country: "US"
};
function AddressForm({
  prefix,
  value,
  errors,
  onChange,
  disabled
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
    [
      ["firstName", "First Name"],
      ["lastName", "Last Name"]
    ].map(([field, label]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: `${prefix}-${field}`, className: "text-xs font-medium", children: [
        label,
        " *"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: `${prefix}-${field}`,
          value: value[field],
          onChange: (e) => onChange(field, e.target.value),
          disabled,
          placeholder: label,
          "data-ocid": `checkout.${prefix}_${field}_input`,
          className: errors[field] ? "border-destructive" : ""
        }
      ),
      errors[field] && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-xs text-destructive",
          "data-ocid": `checkout.${prefix}_${field}_field_error`,
          children: errors[field]
        }
      )
    ] }, field)),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 sm:col-span-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: `${prefix}-email`, className: "text-xs font-medium", children: "Email *" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: `${prefix}-email`,
          type: "email",
          value: value.email,
          onChange: (e) => onChange("email", e.target.value),
          disabled,
          placeholder: "you@example.com",
          "data-ocid": `checkout.${prefix}_email_input`,
          className: errors.email ? "border-destructive" : ""
        }
      ),
      errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-xs text-destructive",
          "data-ocid": `checkout.${prefix}_email_field_error`,
          children: errors.email
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: `${prefix}-phone`, className: "text-xs font-medium", children: "Phone *" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: `${prefix}-phone`,
          type: "tel",
          value: value.phone,
          onChange: (e) => onChange("phone", e.target.value),
          disabled,
          placeholder: "+1 555 000 0000",
          "data-ocid": `checkout.${prefix}_phone_input`,
          className: errors.phone ? "border-destructive" : ""
        }
      ),
      errors.phone && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-xs text-destructive",
          "data-ocid": `checkout.${prefix}_phone_field_error`,
          children: errors.phone
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: `${prefix}-postcode`, className: "text-xs font-medium", children: "Postcode *" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: `${prefix}-postcode`,
          value: value.postcode,
          onChange: (e) => onChange("postcode", e.target.value),
          disabled,
          placeholder: "10001",
          "data-ocid": `checkout.${prefix}_postcode_input`,
          className: errors.postcode ? "border-destructive" : ""
        }
      ),
      errors.postcode && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-xs text-destructive",
          "data-ocid": `checkout.${prefix}_postcode_field_error`,
          children: errors.postcode
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 sm:col-span-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: `${prefix}-address1`, className: "text-xs font-medium", children: "Street Address *" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: `${prefix}-address1`,
          value: value.address1,
          onChange: (e) => onChange("address1", e.target.value),
          disabled,
          placeholder: "123 Main St",
          "data-ocid": `checkout.${prefix}_address1_input`,
          className: errors.address1 ? "border-destructive" : ""
        }
      ),
      errors.address1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-xs text-destructive",
          "data-ocid": `checkout.${prefix}_address1_field_error`,
          children: errors.address1
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: `${prefix}-city`, className: "text-xs font-medium", children: "City *" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: `${prefix}-city`,
          value: value.city,
          onChange: (e) => onChange("city", e.target.value),
          disabled,
          placeholder: "New York",
          "data-ocid": `checkout.${prefix}_city_input`,
          className: errors.city ? "border-destructive" : ""
        }
      ),
      errors.city && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-xs text-destructive",
          "data-ocid": `checkout.${prefix}_city_field_error`,
          children: errors.city
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: `${prefix}-state`, className: "text-xs font-medium", children: "State / Province *" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: `${prefix}-state`,
          value: value.state,
          onChange: (e) => onChange("state", e.target.value),
          disabled,
          placeholder: "NY",
          "data-ocid": `checkout.${prefix}_state_input`,
          className: errors.state ? "border-destructive" : ""
        }
      ),
      errors.state && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-xs text-destructive",
          "data-ocid": `checkout.${prefix}_state_field_error`,
          children: errors.state
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 sm:col-span-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: `${prefix}-country`, className: "text-xs font-medium", children: "Country *" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "select",
        {
          id: `${prefix}-country`,
          value: value.country,
          onChange: (e) => onChange("country", e.target.value),
          disabled,
          "data-ocid": `checkout.${prefix}_country_select`,
          className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50",
          children: COUNTRIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c.code, children: c.name }, c.code))
        }
      )
    ] })
  ] });
}
function PayPalButtonContainer({
  amount,
  onApprove,
  disabled
}) {
  const containerRef = reactExports.useRef(null);
  const [sdkLoaded, setSdkLoaded] = reactExports.useState(false);
  const onApproveRef = reactExports.useRef(onApprove);
  onApproveRef.current = onApprove;
  reactExports.useEffect(() => {
    const existing = document.getElementById("paypal-sdk");
    if (existing) {
      setSdkLoaded(true);
      return;
    }
    const script = document.createElement("script");
    script.id = "paypal-sdk";
    script.src = "https://www.paypal.com/sdk/js?client-id=sb&currency=USD";
    script.onload = () => setSdkLoaded(true);
    document.body.appendChild(script);
  }, []);
  reactExports.useEffect(() => {
    if (!sdkLoaded || !containerRef.current || disabled) return;
    const container = containerRef.current;
    container.innerHTML = "";
    const w = window;
    if (!w.paypal) return;
    w.paypal.Buttons({
      createOrder: async () => {
        const res = await fetch(
          "https://api-m.sandbox.paypal.com/v2/checkout/orders",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Basic ${btoa("sb:sb")}`
            },
            body: JSON.stringify({
              intent: "CAPTURE",
              purchase_units: [
                {
                  amount: { currency_code: "USD", value: amount.toFixed(2) }
                }
              ]
            })
          }
        );
        const data = await res.json();
        return data.id;
      },
      onApprove: (data) => onApproveRef.current(data.orderID)
    }).render(container);
  }, [sdkLoaded, amount, disabled]);
  if (!sdkLoaded) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-lg" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: containerRef, "data-ocid": "checkout.paypal_button" });
}
function validateAddress(addr) {
  const errs = {};
  if (!addr.firstName.trim()) errs.firstName = "Required";
  if (!addr.lastName.trim()) errs.lastName = "Required";
  if (!addr.email.trim()) errs.email = "Required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(addr.email))
    errs.email = "Invalid email";
  if (!addr.phone.trim()) errs.phone = "Required";
  if (!addr.address1.trim()) errs.address1 = "Required";
  if (!addr.city.trim()) errs.city = "Required";
  if (!addr.state.trim()) errs.state = "Required";
  if (!addr.postcode.trim()) errs.postcode = "Required";
  return errs;
}
function Checkout() {
  const { items, subtotal, coupon, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [billing, setBilling] = reactExports.useState({
    ...emptyAddress,
    email: (user == null ? void 0 : user.email) ?? "",
    firstName: (user == null ? void 0 : user.firstName) ?? "",
    lastName: (user == null ? void 0 : user.lastName) ?? ""
  });
  const [shipping, setShipping] = reactExports.useState({ ...emptyAddress });
  const [sameAsBilling, setSameAsBilling] = reactExports.useState(true);
  const [payment, setPayment] = reactExports.useState("stripe");
  const [notes, setNotes] = reactExports.useState("");
  const [billingErrors, setBillingErrors] = reactExports.useState({});
  const [shippingErrors, setShippingErrors] = reactExports.useState({});
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const [stripeError, setStripeError] = reactExports.useState(null);
  const effectiveShipping = sameAsBilling ? billing : shipping;
  const discountAmount = coupon ? subtotal * 0.1 : 0;
  const total = Math.max(0, subtotal - discountAmount);
  function updateBilling(field, val) {
    setBilling((prev) => ({ ...prev, [field]: val }));
    setBillingErrors((prev) => ({ ...prev, [field]: void 0 }));
  }
  function updateShipping(field, val) {
    setShipping((prev) => ({ ...prev, [field]: val }));
    setShippingErrors((prev) => ({ ...prev, [field]: void 0 }));
  }
  function validate() {
    const bErrs = validateAddress(billing);
    setBillingErrors(bErrs);
    if (!sameAsBilling) {
      const sErrs = validateAddress(shipping);
      setShippingErrors(sErrs);
      return Object.keys(bErrs).length === 0 && Object.keys(sErrs).length === 0;
    }
    return Object.keys(bErrs).length === 0;
  }
  async function buildAndSubmitOrder(paymentMethodSlug) {
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
    const actor = createActor(canisterId, noopUpload, noopDownload, { agent });
    const addr = (a) => ({
      firstName: a.firstName,
      lastName: a.lastName,
      address1: a.address1,
      address2: "",
      city: a.city,
      state: a.state,
      postcode: a.postcode,
      country: a.country,
      email: a.email,
      phone: a.phone,
      company: ""
    });
    const result = await actor.createOrder({
      customerId: (user == null ? void 0 : user.wooCustomerId) ? BigInt(user.wooCustomerId) : void 0,
      billing: addr(billing),
      shipping: addr(effectiveShipping),
      lineItems: items.map((i) => ({
        productId: BigInt(i.product.id),
        quantity: BigInt(i.quantity),
        variationId: i.variationId ? BigInt(i.variationId) : void 0
      })),
      paymentMethod: paymentMethodSlug,
      couponLines: coupon ? [{ code: coupon.code }] : [],
      customerNote: notes || ""
    });
    if (result.__kind__ === "err") throw new Error(result.err);
    return Number(result.ok.id);
  }
  async function handleStripePayment() {
    if (!validate()) return;
    if (items.length === 0) return;
    setIsSubmitting(true);
    setStripeError(null);
    try {
      const origin = window.location.origin;
      const successUrl = `${origin}/order-confirmation/stripe-pending?session_id={CHECKOUT_SESSION_ID}`;
      const cancelUrl = `${origin}/checkout`;
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
      const stripeItems = items.map((i) => ({
        productName: i.product.name,
        productDescription: i.product.shortDescription || i.product.name,
        currency: "usd",
        priceInCents: BigInt(
          Math.round(
            Number.parseFloat(i.product.salePrice || i.product.price || "0") * 100
          )
        ),
        quantity: BigInt(i.quantity)
      }));
      const checkoutUrl = await actor.createCheckoutSession(
        stripeItems,
        successUrl,
        cancelUrl
      );
      window.location.href = checkoutUrl;
    } catch (err) {
      setStripeError(
        err instanceof Error ? err.message : "Payment failed. Please try again."
      );
      setIsSubmitting(false);
    }
  }
  async function handlePayPalApprove(_paypalOrderId) {
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const orderId = await buildAndSubmitOrder("paypal");
      clearCart();
      navigate({
        to: "/order-confirmation/$id",
        params: { id: String(orderId) },
        search: { session_id: void 0 }
      });
    } catch {
      setStripeError(
        "Failed to create order after PayPal payment. Please contact support."
      );
      setIsSubmitting(false);
    }
  }
  if (items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4",
        "data-ocid": "checkout.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl", children: "🛒" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-bold text-foreground", children: "Your cart is empty" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm text-center", children: "Add some products before checking out." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: () => navigate({
                to: "/products",
                search: {
                  search: void 0,
                  category: void 0,
                  orderby: void 0,
                  page: void 0
                }
              }),
              "data-ocid": "checkout.continue_shopping_button",
              children: "Browse Products"
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 py-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Checkout" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Complete your order securely" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.section,
          {
            initial: { opacity: 0, y: 8 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.05, duration: 0.3 },
            className: "bg-card border border-border rounded-xl p-5 space-y-3",
            "data-ocid": "checkout.cart_summary",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base text-foreground", children: "Order Items" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: items.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-3",
                  "data-ocid": `checkout.cart_item.${idx + 1}`,
                  children: [
                    item.product.images[0] && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: item.product.images[0].src,
                        alt: item.product.images[0].alt || item.product.name,
                        className: "w-12 h-12 rounded-lg object-cover border border-border flex-shrink-0"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: item.product.name }),
                      item.selectedAttributes && Object.keys(item.selectedAttributes).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: Object.entries(item.selectedAttributes).map(([k, v]) => `${k}: ${v}`).join(", ") })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right flex-shrink-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground", children: [
                        "$",
                        (Number.parseFloat(
                          item.product.salePrice || item.product.price || "0"
                        ) * item.quantity).toFixed(2)
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                        "×",
                        item.quantity
                      ] })
                    ] })
                  ]
                },
                `${item.product.id}-${item.variationId ?? 0}`
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
                  "$",
                  subtotal.toFixed(2)
                ] })
              ] }),
              coupon && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground flex items-center gap-1", children: [
                  "Coupon",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: coupon.code })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary font-semibold", children: [
                  "−$",
                  discountAmount.toFixed(2)
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.section,
          {
            initial: { opacity: 0, y: 8 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.1, duration: 0.3 },
            className: "bg-card border border-border rounded-xl p-5 space-y-4",
            "data-ocid": "checkout.billing_section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base text-foreground", children: "Billing Address" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                AddressForm,
                {
                  prefix: "billing",
                  value: billing,
                  errors: billingErrors,
                  onChange: updateBilling,
                  disabled: isSubmitting
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2 px-1",
            "data-ocid": "checkout.same_as_billing_toggle",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Checkbox,
                {
                  id: "same-billing",
                  checked: sameAsBilling,
                  onCheckedChange: (v) => setSameAsBilling(!!v),
                  disabled: isSubmitting,
                  "data-ocid": "checkout.same_as_billing_checkbox"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Label,
                {
                  htmlFor: "same-billing",
                  className: "text-sm text-foreground cursor-pointer",
                  children: "Shipping address same as billing"
                }
              )
            ]
          }
        ),
        !sameAsBilling && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.section,
          {
            initial: { opacity: 0, height: 0 },
            animate: { opacity: 1, height: "auto" },
            transition: { duration: 0.25 },
            className: "bg-card border border-border rounded-xl p-5 space-y-4",
            "data-ocid": "checkout.shipping_section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base text-foreground", children: "Shipping Address" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                AddressForm,
                {
                  prefix: "shipping",
                  value: shipping,
                  errors: shippingErrors,
                  onChange: updateShipping,
                  disabled: isSubmitting
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.section,
          {
            initial: { opacity: 0, y: 8 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.15, duration: 0.3 },
            className: "bg-card border border-border rounded-xl p-5 space-y-3",
            "data-ocid": "checkout.notes_section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base text-foreground", children: "Order Notes" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  value: notes,
                  onChange: (e) => setNotes(e.target.value),
                  placeholder: "Any special instructions for your order (optional)",
                  rows: 3,
                  disabled: isSubmitting,
                  "data-ocid": "checkout.notes_textarea"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.section,
          {
            initial: { opacity: 0, y: 8 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.2, duration: 0.3 },
            className: "bg-card border border-border rounded-xl p-5 space-y-4",
            "data-ocid": "checkout.payment_section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base text-foreground", children: "Payment Method" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "label",
                {
                  className: `flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-smooth ${payment === "stripe" ? "border-primary bg-primary/5" : "border-border"}`,
                  "data-ocid": "checkout.stripe_option",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "radio",
                        name: "payment",
                        value: "stripe",
                        checked: payment === "stripe",
                        onChange: () => setPayment("stripe"),
                        disabled: isSubmitting,
                        className: "mt-1 accent-primary",
                        "data-ocid": "checkout.stripe_radio"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm text-foreground", children: "Pay with Stripe" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: "Secure" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Credit or debit card. Powered by Stripe's secure checkout." }),
                      payment === "stripe" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 space-y-3", children: [
                        stripeError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "text-xs text-destructive",
                            "data-ocid": "checkout.stripe_error_state",
                            children: stripeError
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Button,
                          {
                            onClick: handleStripePayment,
                            disabled: isSubmitting,
                            className: "w-full btn-pride",
                            "data-ocid": "checkout.stripe_pay_button",
                            children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" }),
                              "Processing..."
                            ] }) : `Pay $${total.toFixed(2)} with Stripe`
                          }
                        )
                      ] })
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "label",
                {
                  className: `flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-smooth ${payment === "paypal" ? "border-primary bg-primary/5" : "border-border"}`,
                  "data-ocid": "checkout.paypal_option",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "radio",
                        name: "payment",
                        value: "paypal",
                        checked: payment === "paypal",
                        onChange: () => setPayment("paypal"),
                        disabled: isSubmitting,
                        className: "mt-1 accent-primary",
                        "data-ocid": "checkout.paypal_radio"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm text-foreground", children: "Pay with PayPal" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: "Fast" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Pay using your PayPal balance, bank account, or card." }),
                      payment === "paypal" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        PayPalButtonContainer,
                        {
                          amount: total,
                          onApprove: handlePayPalApprove,
                          disabled: isSubmitting
                        }
                      ) })
                    ] })
                  ]
                }
              )
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: 12 },
          animate: { opacity: 1, x: 0 },
          transition: { delay: 0.25, duration: 0.3 },
          className: "sticky top-4 bg-card border border-border rounded-xl p-5 space-y-4",
          "data-ocid": "checkout.order_summary",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base text-foreground", children: "Order Total" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-medium", children: [
                  "$",
                  subtotal.toFixed(2)
                ] })
              ] }),
              discountAmount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Discount" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary font-medium", children: [
                  "−$",
                  discountAmount.toFixed(2)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Shipping" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Calculated at next step" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Tax" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Included if applicable" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-base font-bold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary", children: [
                "$",
                total.toFixed(2)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center", children: "🔒 Secured by Stripe & PayPal" })
          ]
        }
      ) })
    ] })
  ] });
}
export {
  Checkout as default
};
