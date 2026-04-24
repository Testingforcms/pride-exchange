import { c as createLucideIcon, r as reactExports, b as useComposedRefs, j as jsxRuntimeExports, e as cn, u as useAuth, q as useTheme, g as useNavigate, o as useQueryClient, S as Skeleton, U as User, B as Button, M as Moon, s as Sun, L as Link, H as Heart, X } from "./index-H678KSt5.js";
import { createActor } from "./backend-DCDaJMxi.js";
import { A as AlertDialog, a as AlertDialogTrigger, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, h as AlertDialogAction } from "./alert-dialog-C12qDAkM.js";
import { I as Input } from "./input-DQyXjHW1.js";
import { L as Label } from "./label-giCWjXcP.js";
import { b as useControllableState, P as Primitive, d as composeEventHandlers, c as createContextScope } from "./index-B7w5Djay.js";
import { a as usePrevious, u as useSize } from "./index-rOxqgYq2.js";
import { u as useToast } from "./useToast-DMJ_wuGw.js";
import { u as useActor, a as useQuery } from "./useActor-B2woeb8X.js";
import { P as Package } from "./package-DnVNg46m.js";
import { C as ChevronRight } from "./chevron-right-Cf9rjURF.js";
import { C as ChevronDown } from "./chevron-down-zuzzpNxp.js";
import "./actor-Bhp-OfYg.js";
import "./Combination-DLafyM7a.js";
import "./index-CEQ5Rdgw.js";
import "./index-D9N1YI4t.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
];
const LogOut = createLucideIcon("log-out", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
];
const Pencil = createLucideIcon("pencil", __iconNode);
var SWITCH_NAME = "Switch";
var [createSwitchContext] = createContextScope(SWITCH_NAME);
var [SwitchProvider, useSwitchContext] = createSwitchContext(SWITCH_NAME);
var Switch$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeSwitch,
      name,
      checked: checkedProp,
      defaultChecked,
      required,
      disabled,
      value = "on",
      onCheckedChange,
      form,
      ...switchProps
    } = props;
    const [button, setButton] = reactExports.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setButton(node));
    const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
    const isFormControl = button ? form || !!button.closest("form") : true;
    const [checked, setChecked] = useControllableState({
      prop: checkedProp,
      defaultProp: defaultChecked ?? false,
      onChange: onCheckedChange,
      caller: SWITCH_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(SwitchProvider, { scope: __scopeSwitch, checked, disabled, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.button,
        {
          type: "button",
          role: "switch",
          "aria-checked": checked,
          "aria-required": required,
          "data-state": getState(checked),
          "data-disabled": disabled ? "" : void 0,
          disabled,
          value,
          ...switchProps,
          ref: composedRefs,
          onClick: composeEventHandlers(props.onClick, (event) => {
            setChecked((prevChecked) => !prevChecked);
            if (isFormControl) {
              hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
              if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
            }
          })
        }
      ),
      isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
        SwitchBubbleInput,
        {
          control: button,
          bubbles: !hasConsumerStoppedPropagationRef.current,
          name,
          value,
          checked,
          required,
          disabled,
          form,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
Switch$1.displayName = SWITCH_NAME;
var THUMB_NAME = "SwitchThumb";
var SwitchThumb = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSwitch, ...thumbProps } = props;
    const context = useSwitchContext(THUMB_NAME, __scopeSwitch);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.span,
      {
        "data-state": getState(context.checked),
        "data-disabled": context.disabled ? "" : void 0,
        ...thumbProps,
        ref: forwardedRef
      }
    );
  }
);
SwitchThumb.displayName = THUMB_NAME;
var BUBBLE_INPUT_NAME = "SwitchBubbleInput";
var SwitchBubbleInput = reactExports.forwardRef(
  ({
    __scopeSwitch,
    control,
    checked,
    bubbles = true,
    ...props
  }, forwardedRef) => {
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(ref, forwardedRef);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = ref.current;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        setChecked.call(input, checked);
        input.dispatchEvent(event);
      }
    }, [prevChecked, checked, bubbles]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: checked,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
SwitchBubbleInput.displayName = BUBBLE_INPUT_NAME;
function getState(checked) {
  return checked ? "checked" : "unchecked";
}
var Root = Switch$1;
var Thumb = SwitchThumb;
function Switch({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "switch",
      className: cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Thumb,
        {
          "data-slot": "switch-thumb",
          className: cn(
            "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
          )
        }
      )
    }
  );
}
function useWooCustomer(customerId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["wooCustomer", customerId],
    queryFn: async () => {
      if (!actor || !customerId) return null;
      const result = await actor.getWooCustomer(BigInt(customerId));
      if (result.__kind__ === "err") return null;
      const c = result.ok;
      return {
        id: Number(c.id),
        email: c.email,
        firstName: c.firstName,
        lastName: c.lastName,
        billing: {
          firstName: c.billing.firstName,
          lastName: c.billing.lastName,
          address1: c.billing.address1,
          address2: c.billing.address2,
          city: c.billing.city,
          state: c.billing.state,
          postcode: c.billing.postcode,
          country: c.billing.country,
          email: c.billing.email,
          phone: c.billing.phone
        },
        shipping: {
          firstName: c.shipping.firstName,
          lastName: c.shipping.lastName,
          address1: c.shipping.address1,
          address2: c.shipping.address2,
          city: c.shipping.city,
          state: c.shipping.state,
          postcode: c.shipping.postcode,
          country: c.shipping.country,
          email: c.shipping.email,
          phone: c.shipping.phone
        }
      };
    },
    enabled: !!customerId && !isFetching,
    staleTime: 1e3 * 60 * 5
  });
}
function AddressForm({
  address,
  label,
  type,
  customerId,
  onSaved
}) {
  const [open, setOpen] = reactExports.useState(false);
  const [editing, setEditing] = reactExports.useState(false);
  const [saving, setSaving] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState(address);
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  reactExports.useEffect(() => {
    setForm(address);
  }, [address]);
  function field(key) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: `${type}-${key}`, className: "text-xs capitalize", children: key.replace(/([A-Z])/g, " $1").trim() }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: `${type}-${key}`,
          value: form[key],
          onChange: (e) => setForm((prev) => ({ ...prev, [key]: e.target.value })),
          className: "h-9 text-sm"
        }
      )
    ] }, key);
  }
  async function handleSave() {
    if (!actor) return;
    setSaving(true);
    try {
      const addr = {
        firstName: form.firstName,
        lastName: form.lastName,
        address1: form.address1,
        address2: form.address2,
        city: form.city,
        state: form.state,
        postcode: form.postcode,
        country: form.country,
        email: form.email,
        phone: form.phone,
        company: ""
      };
      const data = type === "billing" ? { billing: addr } : { shipping: addr };
      const result = await actor.updateWooCustomer(BigInt(customerId), data);
      if (result.__kind__ === "err") throw new Error(result.err);
      await queryClient.invalidateQueries({
        queryKey: ["wooCustomer", customerId]
      });
      showToast("Address saved", "success");
      setEditing(false);
      onSaved();
    } catch {
      showToast("Failed to save address", "error");
    } finally {
      setSaving(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-xl overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setOpen((p) => !p),
        className: "w-full flex items-center justify-between p-4 text-left bg-card hover:bg-muted/30 transition-smooth",
        "data-ocid": `profile.${type}_address_toggle`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm text-foreground", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ChevronDown,
            {
              className: `h-4 w-4 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`
            }
          )
        ]
      }
    ),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 bg-background space-y-3 border-t border-border", children: !editing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-foreground space-y-0.5", children: [
        form.firstName && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium", children: [
          form.firstName,
          " ",
          form.lastName
        ] }),
        form.address1 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: form.address1 }),
        form.address2 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: form.address2 }),
        (form.city || form.state || form.postcode) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: [form.city, form.state, form.postcode].filter(Boolean).join(", ") }),
        form.country && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: form.country }),
        form.phone && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: form.phone }),
        !form.address1 && !form.city && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground italic", children: "No address saved" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          onClick: () => setEditing(true),
          className: "gap-1.5",
          "data-ocid": `profile.${type}_address_edit_button`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" }),
            " Edit"
          ]
        }
      )
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        field("firstName"),
        field("lastName")
      ] }),
      field("address1"),
      field("address2"),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        field("city"),
        field("state")
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        field("postcode"),
        field("country")
      ] }),
      type === "billing" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        field("email"),
        field("phone")
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            onClick: handleSave,
            disabled: saving,
            size: "sm",
            className: "btn-pride gap-1",
            "data-ocid": `profile.${type}_address_save_button`,
            children: saving ? "Saving…" : "Save"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "ghost",
            size: "sm",
            onClick: () => setEditing(false),
            className: "gap-1",
            "data-ocid": `profile.${type}_address_cancel_button`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" }),
              " Cancel"
            ]
          }
        )
      ] })
    ] }) })
  ] });
}
function AvatarCircle({
  firstName,
  lastName,
  email
}) {
  var _a;
  const initials = [firstName == null ? void 0 : firstName[0], lastName == null ? void 0 : lastName[0]].filter(Boolean).join("").toUpperCase() || ((_a = email == null ? void 0 : email[0]) == null ? void 0 : _a.toUpperCase()) || "?";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full gradient-pride flex items-center justify-center text-white font-display font-bold text-2xl shadow-lg select-none", children: initials });
}
function Profile() {
  const { user, logout, setUserProfile } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  const customerId = (user == null ? void 0 : user.wooCustomerId) ?? null;
  const { data: customer, isLoading } = useWooCustomer(customerId);
  const [profileForm, setProfileForm] = reactExports.useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  });
  const [savingProfile, setSavingProfile] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (customer) {
      setProfileForm({
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.billing.phone
      });
    } else if (user) {
      setProfileForm((prev) => ({
        ...prev,
        firstName: prev.firstName || user.firstName,
        lastName: prev.lastName || user.lastName,
        email: prev.email || user.email
      }));
    }
  }, [customer, user]);
  async function handleSaveProfile(e) {
    e.preventDefault();
    if (!customerId || !actor) return;
    setSavingProfile(true);
    try {
      const result = await actor.updateWooCustomer(BigInt(customerId), {
        firstName: profileForm.firstName,
        lastName: profileForm.lastName,
        email: profileForm.email,
        billing: {
          firstName: profileForm.firstName,
          lastName: profileForm.lastName,
          address1: (customer == null ? void 0 : customer.billing.address1) ?? "",
          address2: (customer == null ? void 0 : customer.billing.address2) ?? "",
          city: (customer == null ? void 0 : customer.billing.city) ?? "",
          state: (customer == null ? void 0 : customer.billing.state) ?? "",
          postcode: (customer == null ? void 0 : customer.billing.postcode) ?? "",
          country: (customer == null ? void 0 : customer.billing.country) ?? "",
          email: profileForm.email,
          phone: profileForm.phone,
          company: ""
        }
      });
      if (result.__kind__ === "err") throw new Error(result.err);
      setUserProfile(
        profileForm.email,
        profileForm.firstName,
        profileForm.lastName
      );
      await queryClient.invalidateQueries({
        queryKey: ["wooCustomer", customerId]
      });
      showToast("Profile updated", "success");
    } catch {
      showToast("Failed to update profile", "error");
    } finally {
      setSavingProfile(false);
    }
  }
  function handleLogout() {
    logout();
    void navigate({ to: "/" });
  }
  const displayName = customer ? `${customer.firstName} ${customer.lastName}`.trim() : (user == null ? void 0 : user.firstName) ? `${user.firstName} ${user.lastName}`.trim() : "My Account";
  const displayEmail = (customer == null ? void 0 : customer.email) ?? (user == null ? void 0 : user.email) ?? "";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-6 space-y-6 max-w-lg mx-auto", "data-ocid": "profile.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center gap-3 pt-2 pb-4", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-20 h-20 rounded-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-36" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-48" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        AvatarCircle,
        {
          firstName: profileForm.firstName,
          lastName: profileForm.lastName,
          email: displayEmail
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-display font-bold text-foreground", children: displayName || "Welcome!" }),
        displayEmail && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: displayEmail })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card border border-border rounded-xl p-4 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-foreground flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4 text-primary" }),
        " Edit Profile"
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-full" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSaveProfile, className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "firstName", className: "text-xs", children: "First Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "firstName",
                value: profileForm.firstName,
                onChange: (e) => setProfileForm((p) => ({ ...p, firstName: e.target.value })),
                placeholder: "First name",
                className: "h-9 text-sm",
                "data-ocid": "profile.first_name_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "lastName", className: "text-xs", children: "Last Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "lastName",
                value: profileForm.lastName,
                onChange: (e) => setProfileForm((p) => ({ ...p, lastName: e.target.value })),
                placeholder: "Last name",
                className: "h-9 text-sm",
                "data-ocid": "profile.last_name_input"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", className: "text-xs", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "email",
              type: "email",
              value: profileForm.email,
              onChange: (e) => setProfileForm((p) => ({ ...p, email: e.target.value })),
              placeholder: "your@email.com",
              className: "h-9 text-sm",
              "data-ocid": "profile.email_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "phone", className: "text-xs", children: "Phone" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "phone",
              type: "tel",
              value: profileForm.phone,
              onChange: (e) => setProfileForm((p) => ({ ...p, phone: e.target.value })),
              placeholder: "+1 (555) 000-0000",
              className: "h-9 text-sm",
              "data-ocid": "profile.phone_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            disabled: savingProfile || !customerId,
            className: "btn-pride w-full",
            "data-ocid": "profile.save_profile_button",
            children: savingProfile ? "Saving…" : "Save Changes"
          }
        ),
        !customerId && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center", children: "Link a WooCommerce account to edit your profile." })
      ] })
    ] }),
    customerId && customer && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground px-1", children: "Saved Addresses" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        AddressForm,
        {
          address: customer.billing,
          label: "Billing Address",
          type: "billing",
          customerId,
          onSaved: () => {
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        AddressForm,
        {
          address: customer.shipping,
          label: "Shipping Address",
          type: "shipping",
          customerId,
          onSaved: () => {
          }
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card border border-border rounded-xl overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground p-4 border-b border-border", children: "Account Settings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4 border-b border-border/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
          theme === "dark" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "h-4 w-4 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground", children: theme === "dark" ? "Dark Mode" : "Light Mode" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Switch,
          {
            checked: theme === "dark",
            onCheckedChange: toggleTheme,
            "aria-label": "Toggle dark mode",
            "data-ocid": "profile.theme_toggle"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/orders",
          "data-ocid": "profile.orders_link",
          className: "flex items-center justify-between p-4 border-b border-border/50 hover:bg-muted/30 transition-smooth group",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-4 w-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground", children: "My Orders" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/wishlist",
          "data-ocid": "profile.wishlist_link",
          className: "flex items-center justify-between p-4 hover:bg-muted/30 transition-smooth group",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-4 w-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground", children: "My Wishlist" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          className: "w-full gap-2 text-destructive border-destructive/40 hover:bg-destructive/10",
          "data-ocid": "profile.logout_open_modal_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
            " Sign Out"
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "profile.dialog", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Sign out?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "You'll need to sign in again to access your orders, wishlist, and profile." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "profile.logout_cancel_button", children: "Cancel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            AlertDialogAction,
            {
              onClick: handleLogout,
              className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
              "data-ocid": "profile.logout_confirm_button",
              children: "Sign Out"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  Profile as default
};
