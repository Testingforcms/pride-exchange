import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import type { Address } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ── Address form helpers ─────────────────────────────────────────────────────
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
  { code: "ES", name: "Spain" },
];

type FormAddress = Omit<Address, "address2">;

const emptyAddress: FormAddress = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address1: "",
  city: "",
  state: "",
  postcode: "",
  country: "US",
};

type PaymentMethod = "stripe" | "paypal";

// ── Address sub-form ─────────────────────────────────────────────────────────
function AddressForm({
  prefix,
  value,
  errors,
  onChange,
  disabled,
}: {
  prefix: string;
  value: FormAddress;
  errors: Partial<Record<keyof FormAddress, string>>;
  onChange: (field: keyof FormAddress, val: string) => void;
  disabled: boolean;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {(
        [
          ["firstName", "First Name"],
          ["lastName", "Last Name"],
        ] as Array<[keyof FormAddress, string]>
      ).map(([field, label]) => (
        <div key={field} className="flex flex-col gap-1">
          <Label htmlFor={`${prefix}-${field}`} className="text-xs font-medium">
            {label} *
          </Label>
          <Input
            id={`${prefix}-${field}`}
            value={value[field]}
            onChange={(e) => onChange(field, e.target.value)}
            disabled={disabled}
            placeholder={label}
            data-ocid={`checkout.${prefix}_${field}_input`}
            className={errors[field] ? "border-destructive" : ""}
          />
          {errors[field] && (
            <p
              className="text-xs text-destructive"
              data-ocid={`checkout.${prefix}_${field}_field_error`}
            >
              {errors[field]}
            </p>
          )}
        </div>
      ))}

      <div className="flex flex-col gap-1 sm:col-span-2">
        <Label htmlFor={`${prefix}-email`} className="text-xs font-medium">
          Email *
        </Label>
        <Input
          id={`${prefix}-email`}
          type="email"
          value={value.email}
          onChange={(e) => onChange("email", e.target.value)}
          disabled={disabled}
          placeholder="you@example.com"
          data-ocid={`checkout.${prefix}_email_input`}
          className={errors.email ? "border-destructive" : ""}
        />
        {errors.email && (
          <p
            className="text-xs text-destructive"
            data-ocid={`checkout.${prefix}_email_field_error`}
          >
            {errors.email}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor={`${prefix}-phone`} className="text-xs font-medium">
          Phone *
        </Label>
        <Input
          id={`${prefix}-phone`}
          type="tel"
          value={value.phone}
          onChange={(e) => onChange("phone", e.target.value)}
          disabled={disabled}
          placeholder="+1 555 000 0000"
          data-ocid={`checkout.${prefix}_phone_input`}
          className={errors.phone ? "border-destructive" : ""}
        />
        {errors.phone && (
          <p
            className="text-xs text-destructive"
            data-ocid={`checkout.${prefix}_phone_field_error`}
          >
            {errors.phone}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor={`${prefix}-postcode`} className="text-xs font-medium">
          Postcode *
        </Label>
        <Input
          id={`${prefix}-postcode`}
          value={value.postcode}
          onChange={(e) => onChange("postcode", e.target.value)}
          disabled={disabled}
          placeholder="10001"
          data-ocid={`checkout.${prefix}_postcode_input`}
          className={errors.postcode ? "border-destructive" : ""}
        />
        {errors.postcode && (
          <p
            className="text-xs text-destructive"
            data-ocid={`checkout.${prefix}_postcode_field_error`}
          >
            {errors.postcode}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1 sm:col-span-2">
        <Label htmlFor={`${prefix}-address1`} className="text-xs font-medium">
          Street Address *
        </Label>
        <Input
          id={`${prefix}-address1`}
          value={value.address1}
          onChange={(e) => onChange("address1", e.target.value)}
          disabled={disabled}
          placeholder="123 Main St"
          data-ocid={`checkout.${prefix}_address1_input`}
          className={errors.address1 ? "border-destructive" : ""}
        />
        {errors.address1 && (
          <p
            className="text-xs text-destructive"
            data-ocid={`checkout.${prefix}_address1_field_error`}
          >
            {errors.address1}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor={`${prefix}-city`} className="text-xs font-medium">
          City *
        </Label>
        <Input
          id={`${prefix}-city`}
          value={value.city}
          onChange={(e) => onChange("city", e.target.value)}
          disabled={disabled}
          placeholder="New York"
          data-ocid={`checkout.${prefix}_city_input`}
          className={errors.city ? "border-destructive" : ""}
        />
        {errors.city && (
          <p
            className="text-xs text-destructive"
            data-ocid={`checkout.${prefix}_city_field_error`}
          >
            {errors.city}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor={`${prefix}-state`} className="text-xs font-medium">
          State / Province *
        </Label>
        <Input
          id={`${prefix}-state`}
          value={value.state}
          onChange={(e) => onChange("state", e.target.value)}
          disabled={disabled}
          placeholder="NY"
          data-ocid={`checkout.${prefix}_state_input`}
          className={errors.state ? "border-destructive" : ""}
        />
        {errors.state && (
          <p
            className="text-xs text-destructive"
            data-ocid={`checkout.${prefix}_state_field_error`}
          >
            {errors.state}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1 sm:col-span-2">
        <Label htmlFor={`${prefix}-country`} className="text-xs font-medium">
          Country *
        </Label>
        <select
          id={`${prefix}-country`}
          value={value.country}
          onChange={(e) => onChange("country", e.target.value)}
          disabled={disabled}
          data-ocid={`checkout.${prefix}_country_select`}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
        >
          {COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

// ── PayPal button (vanilla JS SDK) ───────────────────────────────────────────
function PayPalButtonContainer({
  amount,
  onApprove,
  disabled,
}: {
  amount: number;
  onApprove: (orderId: string) => void;
  disabled: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const onApproveRef = useRef(onApprove);
  onApproveRef.current = onApprove;

  useEffect(() => {
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

  useEffect(() => {
    if (!sdkLoaded || !containerRef.current || disabled) return;
    const container = containerRef.current;
    container.innerHTML = "";

    const w = window as unknown as {
      paypal?: {
        Buttons: (opts: {
          createOrder: () => Promise<string>;
          onApprove: (data: { orderID: string }) => void;
        }) => { render: (el: HTMLElement) => void };
      };
    };

    if (!w.paypal) return;

    w.paypal
      .Buttons({
        createOrder: async () => {
          const res = await fetch(
            "https://api-m.sandbox.paypal.com/v2/checkout/orders",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${btoa("sb:sb")}`,
              },
              body: JSON.stringify({
                intent: "CAPTURE",
                purchase_units: [
                  {
                    amount: { currency_code: "USD", value: amount.toFixed(2) },
                  },
                ],
              }),
            },
          );
          const data = (await res.json()) as { id: string };
          return data.id;
        },
        onApprove: (data) => onApproveRef.current(data.orderID),
      })
      .render(container);
  }, [sdkLoaded, amount, disabled]);

  if (!sdkLoaded) {
    return <Skeleton className="h-12 w-full rounded-lg" />;
  }

  return <div ref={containerRef} data-ocid="checkout.paypal_button" />;
}

// ── Validation ───────────────────────────────────────────────────────────────
function validateAddress(
  addr: FormAddress,
): Partial<Record<keyof FormAddress, string>> {
  const errs: Partial<Record<keyof FormAddress, string>> = {};
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

// ── Main Page ────────────────────────────────────────────────────────────────
export default function Checkout() {
  const { items, subtotal, coupon, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [billing, setBilling] = useState<FormAddress>({
    ...emptyAddress,
    email: user?.email ?? "",
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
  });
  const [shipping, setShipping] = useState<FormAddress>({ ...emptyAddress });
  const [sameAsBilling, setSameAsBilling] = useState(true);
  const [payment, setPayment] = useState<PaymentMethod>("stripe");
  const [notes, setNotes] = useState("");
  const [billingErrors, setBillingErrors] = useState<
    Partial<Record<keyof FormAddress, string>>
  >({});
  const [shippingErrors, setShippingErrors] = useState<
    Partial<Record<keyof FormAddress, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stripeError, setStripeError] = useState<string | null>(null);

  const effectiveShipping = sameAsBilling ? billing : shipping;

  const discountAmount = coupon
    ? subtotal * 0.1 // assume 10% if coupon present; real discount fetched server-side
    : 0;

  const total = Math.max(0, subtotal - discountAmount);

  function updateBilling(field: keyof FormAddress, val: string) {
    setBilling((prev) => ({ ...prev, [field]: val }));
    setBillingErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function updateShipping(field: keyof FormAddress, val: string) {
    setShipping((prev) => ({ ...prev, [field]: val }));
    setShippingErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validate(): boolean {
    const bErrs = validateAddress(billing);
    setBillingErrors(bErrs);
    if (!sameAsBilling) {
      const sErrs = validateAddress(shipping);
      setShippingErrors(sErrs);
      return Object.keys(bErrs).length === 0 && Object.keys(sErrs).length === 0;
    }
    return Object.keys(bErrs).length === 0;
  }

  async function buildAndSubmitOrder(
    paymentMethodSlug: string,
  ): Promise<number> {
    const { createActor } = await import("@/backend");
    const { HttpAgent } = await import("@icp-sdk/core/agent");
    const envJson = (await fetch("/env.json").then((r) => r.json())) as {
      CANISTER_ID_BACKEND?: string;
      DFX_NETWORK?: string;
    };
    const canisterId = envJson.CANISTER_ID_BACKEND ?? "";
    const isLocal = envJson.DFX_NETWORK !== "ic";
    const agent = HttpAgent.createSync({
      host: isLocal ? "http://localhost:4943" : "https://ic0.app",
    });
    if (isLocal) await agent.fetchRootKey();
    const noopUpload = async (_f: unknown) => new Uint8Array();
    const noopDownload = async (_f: unknown) =>
      ({
        directURL: "",
        getBytes: async () => new Uint8Array(),
        getDirectURL: () => "",
      }) as never;
    const actor = createActor(canisterId, noopUpload, noopDownload, { agent });

    const addr = (a: typeof billing) => ({
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
      company: "",
    });

    const result = await actor.createOrder({
      customerId: user?.wooCustomerId ? BigInt(user.wooCustomerId) : undefined,
      billing: addr(billing),
      shipping: addr(effectiveShipping),
      lineItems: items.map((i) => ({
        productId: BigInt(i.product.id),
        quantity: BigInt(i.quantity),
        variationId: i.variationId ? BigInt(i.variationId) : undefined,
      })),
      paymentMethod: paymentMethodSlug,
      couponLines: coupon ? [{ code: coupon.code }] : [],
      customerNote: notes || "",
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
      // Build Stripe shopping items from cart
      const origin = window.location.origin;
      const successUrl = `${origin}/order-confirmation/stripe-pending?session_id={CHECKOUT_SESSION_ID}`;
      const cancelUrl = `${origin}/checkout`;

      // Import backend actor utilities
      const { createActor } = await import("@/backend");
      const { HttpAgent } = await import("@icp-sdk/core/agent");
      const envJson = (await fetch("/env.json").then((r) => r.json())) as {
        CANISTER_ID_BACKEND?: string;
        DFX_NETWORK?: string;
      };
      const canisterId = envJson.CANISTER_ID_BACKEND ?? "";
      const isLocal = envJson.DFX_NETWORK !== "ic";
      const agent = HttpAgent.createSync({
        host: isLocal ? "http://localhost:4943" : "https://ic0.app",
      });
      if (isLocal) await agent.fetchRootKey();

      const noopUpload = async (_f: unknown) => new Uint8Array();
      const noopDownload = async (_f: unknown) =>
        ({
          directURL: "",
          getBytes: async () => new Uint8Array(),
          getDirectURL: () => "",
        }) as never;

      const actor = createActor(canisterId, noopUpload, noopDownload, {
        agent,
      });

      const stripeItems = items.map((i) => ({
        productName: i.product.name,
        productDescription: i.product.shortDescription || i.product.name,
        currency: "usd",
        priceInCents: BigInt(
          Math.round(
            Number.parseFloat(i.product.salePrice || i.product.price || "0") *
              100,
          ),
        ),
        quantity: BigInt(i.quantity),
      }));

      const checkoutUrl = await actor.createCheckoutSession(
        stripeItems,
        successUrl,
        cancelUrl,
      );
      window.location.href = checkoutUrl;
    } catch (err) {
      setStripeError(
        err instanceof Error
          ? err.message
          : "Payment failed. Please try again.",
      );
      setIsSubmitting(false);
    }
  }

  async function handlePayPalApprove(_paypalOrderId: string) {
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const orderId = await buildAndSubmitOrder("paypal");
      clearCart();
      navigate({
        to: "/order-confirmation/$id",
        params: { id: String(orderId) },
        search: { session_id: undefined },
      });
    } catch {
      setStripeError(
        "Failed to create order after PayPal payment. Please contact support.",
      );
      setIsSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4"
        data-ocid="checkout.empty_state"
      >
        <div className="text-5xl">🛒</div>
        <h2 className="text-xl font-display font-bold text-foreground">
          Your cart is empty
        </h2>
        <p className="text-muted-foreground text-sm text-center">
          Add some products before checking out.
        </p>
        <Button
          onClick={() =>
            navigate({
              to: "/products",
              search: {
                search: undefined,
                category: undefined,
                orderby: undefined,
                page: undefined,
              },
            })
          }
          data-ocid="checkout.continue_shopping_button"
        >
          Browse Products
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-display font-bold text-foreground">
          Checkout
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Complete your order securely
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: forms */}
        <div className="lg:col-span-2 space-y-5">
          {/* Cart Summary */}
          <motion.section
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.3 }}
            className="bg-card border border-border rounded-xl p-5 space-y-3"
            data-ocid="checkout.cart_summary"
          >
            <h2 className="font-display font-semibold text-base text-foreground">
              Order Items
            </h2>
            <div className="space-y-2">
              {items.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.variationId ?? 0}`}
                  className="flex items-center gap-3"
                  data-ocid={`checkout.cart_item.${idx + 1}`}
                >
                  {item.product.images[0] && (
                    <img
                      src={item.product.images[0].src}
                      alt={item.product.images[0].alt || item.product.name}
                      className="w-12 h-12 rounded-lg object-cover border border-border flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {item.product.name}
                    </p>
                    {item.selectedAttributes &&
                      Object.keys(item.selectedAttributes).length > 0 && (
                        <p className="text-xs text-muted-foreground">
                          {Object.entries(item.selectedAttributes)
                            .map(([k, v]) => `${k}: ${v}`)
                            .join(", ")}
                        </p>
                      )}
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-semibold text-foreground">
                      $
                      {(
                        Number.parseFloat(
                          item.product.salePrice || item.product.price || "0",
                        ) * item.quantity
                      ).toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ×{item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Separator />
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold text-foreground">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            {coupon && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground flex items-center gap-1">
                  Coupon{" "}
                  <Badge variant="outline" className="text-xs">
                    {coupon.code}
                  </Badge>
                </span>
                <span className="text-primary font-semibold">
                  −${discountAmount.toFixed(2)}
                </span>
              </div>
            )}
          </motion.section>

          {/* Billing Address */}
          <motion.section
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="bg-card border border-border rounded-xl p-5 space-y-4"
            data-ocid="checkout.billing_section"
          >
            <h2 className="font-display font-semibold text-base text-foreground">
              Billing Address
            </h2>
            <AddressForm
              prefix="billing"
              value={billing}
              errors={billingErrors}
              onChange={updateBilling}
              disabled={isSubmitting}
            />
          </motion.section>

          {/* Same as billing toggle */}
          <div
            className="flex items-center gap-2 px-1"
            data-ocid="checkout.same_as_billing_toggle"
          >
            <Checkbox
              id="same-billing"
              checked={sameAsBilling}
              onCheckedChange={(v) => setSameAsBilling(!!v)}
              disabled={isSubmitting}
              data-ocid="checkout.same_as_billing_checkbox"
            />
            <Label
              htmlFor="same-billing"
              className="text-sm text-foreground cursor-pointer"
            >
              Shipping address same as billing
            </Label>
          </div>

          {/* Shipping Address */}
          {!sameAsBilling && (
            <motion.section
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.25 }}
              className="bg-card border border-border rounded-xl p-5 space-y-4"
              data-ocid="checkout.shipping_section"
            >
              <h2 className="font-display font-semibold text-base text-foreground">
                Shipping Address
              </h2>
              <AddressForm
                prefix="shipping"
                value={shipping}
                errors={shippingErrors}
                onChange={updateShipping}
                disabled={isSubmitting}
              />
            </motion.section>
          )}

          {/* Order Notes */}
          <motion.section
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.3 }}
            className="bg-card border border-border rounded-xl p-5 space-y-3"
            data-ocid="checkout.notes_section"
          >
            <h2 className="font-display font-semibold text-base text-foreground">
              Order Notes
            </h2>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any special instructions for your order (optional)"
              rows={3}
              disabled={isSubmitting}
              data-ocid="checkout.notes_textarea"
            />
          </motion.section>

          {/* Payment Method */}
          <motion.section
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="bg-card border border-border rounded-xl p-5 space-y-4"
            data-ocid="checkout.payment_section"
          >
            <h2 className="font-display font-semibold text-base text-foreground">
              Payment Method
            </h2>

            {/* Stripe option */}
            <label
              className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-smooth ${payment === "stripe" ? "border-primary bg-primary/5" : "border-border"}`}
              data-ocid="checkout.stripe_option"
            >
              <input
                type="radio"
                name="payment"
                value="stripe"
                checked={payment === "stripe"}
                onChange={() => setPayment("stripe")}
                disabled={isSubmitting}
                className="mt-1 accent-primary"
                data-ocid="checkout.stripe_radio"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-foreground">
                    Pay with Stripe
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    Secure
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Credit or debit card. Powered by Stripe's secure checkout.
                </p>
                {payment === "stripe" && (
                  <div className="mt-3 space-y-3">
                    {stripeError && (
                      <p
                        className="text-xs text-destructive"
                        data-ocid="checkout.stripe_error_state"
                      >
                        {stripeError}
                      </p>
                    )}
                    <Button
                      onClick={handleStripePayment}
                      disabled={isSubmitting}
                      className="w-full btn-pride"
                      data-ocid="checkout.stripe_pay_button"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                          Processing...
                        </span>
                      ) : (
                        `Pay $${total.toFixed(2)} with Stripe`
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </label>

            {/* PayPal option */}
            <label
              className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-smooth ${payment === "paypal" ? "border-primary bg-primary/5" : "border-border"}`}
              data-ocid="checkout.paypal_option"
            >
              <input
                type="radio"
                name="payment"
                value="paypal"
                checked={payment === "paypal"}
                onChange={() => setPayment("paypal")}
                disabled={isSubmitting}
                className="mt-1 accent-primary"
                data-ocid="checkout.paypal_radio"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-foreground">
                    Pay with PayPal
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    Fast
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Pay using your PayPal balance, bank account, or card.
                </p>
                {payment === "paypal" && (
                  <div className="mt-3">
                    <PayPalButtonContainer
                      amount={total}
                      onApprove={handlePayPalApprove}
                      disabled={isSubmitting}
                    />
                  </div>
                )}
              </div>
            </label>
          </motion.section>
        </div>

        {/* Right column: Order Summary */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.3 }}
            className="sticky top-4 bg-card border border-border rounded-xl p-5 space-y-4"
            data-ocid="checkout.order_summary"
          >
            <h2 className="font-display font-semibold text-base text-foreground">
              Order Total
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground font-medium">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Discount</span>
                  <span className="text-primary font-medium">
                    −${discountAmount.toFixed(2)}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-muted-foreground">
                  Calculated at next step
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span className="text-muted-foreground">
                  Included if applicable
                </span>
              </div>
            </div>
            <Separator />
            <div className="flex justify-between text-base font-bold">
              <span className="text-foreground">Total</span>
              <span className="text-primary">${total.toFixed(2)}</span>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              🔒 Secured by Stripe & PayPal
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
