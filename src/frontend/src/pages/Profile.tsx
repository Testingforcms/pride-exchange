import { createActor } from "@/backend";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useToast } from "@/hooks/useToast";
import { useWooCustomer } from "@/hooks/useWooCustomer";
import type { Address } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ChevronDown,
  ChevronRight,
  Heart,
  LogOut,
  Moon,
  Package,
  Pencil,
  Sun,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface AddressFormProps {
  address: Address;
  label: string;
  type: "billing" | "shipping";
  customerId: number;
  onSaved: () => void;
}

function AddressForm({
  address,
  label,
  type,
  customerId,
  onSaved,
}: AddressFormProps) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Address>(address);
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);

  useEffect(() => {
    setForm(address);
  }, [address]);

  function field(key: keyof Address) {
    return (
      <div key={key} className="space-y-1">
        <Label htmlFor={`${type}-${key}`} className="text-xs capitalize">
          {key.replace(/([A-Z])/g, " $1").trim()}
        </Label>
        <Input
          id={`${type}-${key}`}
          value={form[key]}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, [key]: e.target.value }))
          }
          className="h-9 text-sm"
        />
      </div>
    );
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
        company: "",
      };

      const data = type === "billing" ? { billing: addr } : { shipping: addr };

      const result = await actor.updateWooCustomer(BigInt(customerId), data);
      if (result.__kind__ === "err") throw new Error(result.err);
      await queryClient.invalidateQueries({
        queryKey: ["wooCustomer", customerId],
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

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between p-4 text-left bg-card hover:bg-muted/30 transition-smooth"
        data-ocid={`profile.${type}_address_toggle`}
      >
        <span className="font-medium text-sm text-foreground">{label}</span>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="p-4 bg-background space-y-3 border-t border-border">
          {!editing ? (
            <>
              <div className="text-sm text-foreground space-y-0.5">
                {form.firstName && (
                  <p className="font-medium">
                    {form.firstName} {form.lastName}
                  </p>
                )}
                {form.address1 && <p>{form.address1}</p>}
                {form.address2 && <p>{form.address2}</p>}
                {(form.city || form.state || form.postcode) && (
                  <p>
                    {[form.city, form.state, form.postcode]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                )}
                {form.country && <p>{form.country}</p>}
                {form.phone && (
                  <p className="text-muted-foreground">{form.phone}</p>
                )}
                {!form.address1 && !form.city && (
                  <p className="text-muted-foreground italic">
                    No address saved
                  </p>
                )}
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setEditing(true)}
                className="gap-1.5"
                data-ocid={`profile.${type}_address_edit_button`}
              >
                <Pencil className="h-3.5 w-3.5" /> Edit
              </Button>
            </>
          ) : (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                {field("firstName")}
                {field("lastName")}
              </div>
              {field("address1")}
              {field("address2")}
              <div className="grid grid-cols-2 gap-3">
                {field("city")}
                {field("state")}
              </div>
              <div className="grid grid-cols-2 gap-3">
                {field("postcode")}
                {field("country")}
              </div>
              {type === "billing" && (
                <div className="grid grid-cols-2 gap-3">
                  {field("email")}
                  {field("phone")}
                </div>
              )}
              <div className="flex gap-2 pt-1">
                <Button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  size="sm"
                  className="btn-pride gap-1"
                  data-ocid={`profile.${type}_address_save_button`}
                >
                  {saving ? "Saving…" : "Save"}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditing(false)}
                  className="gap-1"
                  data-ocid={`profile.${type}_address_cancel_button`}
                >
                  <X className="h-3.5 w-3.5" /> Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function AvatarCircle({
  firstName,
  lastName,
  email,
}: { firstName: string; lastName: string; email: string }) {
  const initials =
    [firstName?.[0], lastName?.[0]].filter(Boolean).join("").toUpperCase() ||
    email?.[0]?.toUpperCase() ||
    "?";

  return (
    <div className="w-20 h-20 rounded-full gradient-pride flex items-center justify-center text-white font-display font-bold text-2xl shadow-lg select-none">
      {initials}
    </div>
  );
}

export default function Profile() {
  const { user, logout, setUserProfile } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);

  const customerId = user?.wooCustomerId ?? null;
  const { data: customer, isLoading } = useWooCustomer(customerId);

  const [profileForm, setProfileForm] = useState<ProfileFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [savingProfile, setSavingProfile] = useState(false);

  useEffect(() => {
    if (customer) {
      setProfileForm({
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.billing.phone,
      });
    } else if (user) {
      setProfileForm((prev) => ({
        ...prev,
        firstName: prev.firstName || user.firstName,
        lastName: prev.lastName || user.lastName,
        email: prev.email || user.email,
      }));
    }
  }, [customer, user]);

  async function handleSaveProfile(e: React.FormEvent) {
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
          address1: customer?.billing.address1 ?? "",
          address2: customer?.billing.address2 ?? "",
          city: customer?.billing.city ?? "",
          state: customer?.billing.state ?? "",
          postcode: customer?.billing.postcode ?? "",
          country: customer?.billing.country ?? "",
          email: profileForm.email,
          phone: profileForm.phone,
          company: "",
        },
      });
      if (result.__kind__ === "err") throw new Error(result.err);
      setUserProfile(
        profileForm.email,
        profileForm.firstName,
        profileForm.lastName,
      );
      await queryClient.invalidateQueries({
        queryKey: ["wooCustomer", customerId],
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

  const displayName = customer
    ? `${customer.firstName} ${customer.lastName}`.trim()
    : user?.firstName
      ? `${user.firstName} ${user.lastName}`.trim()
      : "My Account";

  const displayEmail = customer?.email ?? user?.email ?? "";

  return (
    <div className="py-6 space-y-6 max-w-lg mx-auto" data-ocid="profile.page">
      {/* Profile Header */}
      <div className="flex flex-col items-center gap-3 pt-2 pb-4">
        {isLoading ? (
          <>
            <Skeleton className="w-20 h-20 rounded-full" />
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-4 w-48" />
          </>
        ) : (
          <>
            <AvatarCircle
              firstName={profileForm.firstName}
              lastName={profileForm.lastName}
              email={displayEmail}
            />
            <div className="text-center">
              <h1 className="text-xl font-display font-bold text-foreground">
                {displayName || "Welcome!"}
              </h1>
              {displayEmail && (
                <p className="text-sm text-muted-foreground mt-0.5">
                  {displayEmail}
                </p>
              )}
            </div>
          </>
        )}
      </div>

      {/* Edit Profile Form */}
      <section className="bg-card border border-border rounded-xl p-4 space-y-4">
        <h2 className="font-display font-semibold text-foreground flex items-center gap-2">
          <User className="h-4 w-4 text-primary" /> Edit Profile
        </h2>

        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
          </div>
        ) : (
          <form onSubmit={handleSaveProfile} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="firstName" className="text-xs">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  value={profileForm.firstName}
                  onChange={(e) =>
                    setProfileForm((p) => ({ ...p, firstName: e.target.value }))
                  }
                  placeholder="First name"
                  className="h-9 text-sm"
                  data-ocid="profile.first_name_input"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="lastName" className="text-xs">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  value={profileForm.lastName}
                  onChange={(e) =>
                    setProfileForm((p) => ({ ...p, lastName: e.target.value }))
                  }
                  placeholder="Last name"
                  className="h-9 text-sm"
                  data-ocid="profile.last_name_input"
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="email" className="text-xs">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={profileForm.email}
                onChange={(e) =>
                  setProfileForm((p) => ({ ...p, email: e.target.value }))
                }
                placeholder="your@email.com"
                className="h-9 text-sm"
                data-ocid="profile.email_input"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="phone" className="text-xs">
                Phone
              </Label>
              <Input
                id="phone"
                type="tel"
                value={profileForm.phone}
                onChange={(e) =>
                  setProfileForm((p) => ({ ...p, phone: e.target.value }))
                }
                placeholder="+1 (555) 000-0000"
                className="h-9 text-sm"
                data-ocid="profile.phone_input"
              />
            </div>
            <Button
              type="submit"
              disabled={savingProfile || !customerId}
              className="btn-pride w-full"
              data-ocid="profile.save_profile_button"
            >
              {savingProfile ? "Saving…" : "Save Changes"}
            </Button>
            {!customerId && (
              <p className="text-xs text-muted-foreground text-center">
                Link a WooCommerce account to edit your profile.
              </p>
            )}
          </form>
        )}
      </section>

      {/* Saved Addresses */}
      {customerId && customer && (
        <section className="space-y-3">
          <h2 className="font-display font-semibold text-foreground px-1">
            Saved Addresses
          </h2>
          <AddressForm
            address={customer.billing}
            label="Billing Address"
            type="billing"
            customerId={customerId}
            onSaved={() => {}}
          />
          <AddressForm
            address={customer.shipping}
            label="Shipping Address"
            type="shipping"
            customerId={customerId}
            onSaved={() => {}}
          />
        </section>
      )}

      {/* Account Settings */}
      <section className="bg-card border border-border rounded-xl overflow-hidden">
        <h2 className="font-display font-semibold text-foreground p-4 border-b border-border">
          Account Settings
        </h2>

        {/* Theme toggle */}
        <div className="flex items-center justify-between p-4 border-b border-border/50">
          <div className="flex items-center gap-2.5">
            {theme === "dark" ? (
              <Moon className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Sun className="h-4 w-4 text-muted-foreground" />
            )}
            <span className="text-sm text-foreground">
              {theme === "dark" ? "Dark Mode" : "Light Mode"}
            </span>
          </div>
          <Switch
            checked={theme === "dark"}
            onCheckedChange={toggleTheme}
            aria-label="Toggle dark mode"
            data-ocid="profile.theme_toggle"
          />
        </div>

        {/* My Orders link */}
        <Link
          to="/orders"
          data-ocid="profile.orders_link"
          className="flex items-center justify-between p-4 border-b border-border/50 hover:bg-muted/30 transition-smooth group"
        >
          <div className="flex items-center gap-2.5">
            <Package className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-foreground">My Orders</span>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        </Link>

        {/* Wishlist link */}
        <Link
          to="/wishlist"
          data-ocid="profile.wishlist_link"
          className="flex items-center justify-between p-4 hover:bg-muted/30 transition-smooth group"
        >
          <div className="flex items-center gap-2.5">
            <Heart className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-foreground">My Wishlist</span>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        </Link>
      </section>

      {/* Logout */}
      <div className="pb-2">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              type="button"
              variant="outline"
              className="w-full gap-2 text-destructive border-destructive/40 hover:bg-destructive/10"
              data-ocid="profile.logout_open_modal_button"
            >
              <LogOut className="h-4 w-4" /> Sign Out
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent data-ocid="profile.dialog">
            <AlertDialogHeader>
              <AlertDialogTitle>Sign out?</AlertDialogTitle>
              <AlertDialogDescription>
                You'll need to sign in again to access your orders, wishlist,
                and profile.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel data-ocid="profile.logout_cancel_button">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleLogout}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                data-ocid="profile.logout_confirm_button"
              >
                Sign Out
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
