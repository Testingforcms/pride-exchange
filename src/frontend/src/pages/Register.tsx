import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Link, Navigate } from "@tanstack/react-router";
import { ShoppingBag, UserPlus } from "lucide-react";

export default function Register() {
  const { isLoggedIn, loginWithII, isLoading } = useAuth();

  if (isLoggedIn) return <Navigate to="/" />;

  return (
    <div
      className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-12"
      data-ocid="register.page"
    >
      <div className="w-full max-w-sm space-y-8">
        {/* Logo / App branding */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-16 h-16 rounded-2xl gradient-pride flex items-center justify-center shadow-lg">
            <ShoppingBag className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              The Pride Exchange
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Create your account to start shopping
            </p>
          </div>
        </div>

        {/* Auth card */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-5">
          <div className="space-y-1 text-center">
            <h2 className="font-semibold text-foreground">Create account</h2>
            <p className="text-xs text-muted-foreground">
              Register with Internet Identity — secure, private, and
              passwordless.
            </p>
          </div>

          {/* Benefits list */}
          <ul className="space-y-2 text-xs text-muted-foreground">
            {[
              "Track your orders",
              "Save items to your wishlist",
              "Faster checkout with saved addresses",
            ].map((benefit) => (
              <li key={benefit} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                {benefit}
              </li>
            ))}
          </ul>

          <Button
            type="button"
            onClick={loginWithII}
            disabled={isLoading}
            className="btn-pride w-full gap-2 h-11"
            data-ocid="register.submit_button"
          >
            <UserPlus className="h-4 w-4" />
            {isLoading ? "Connecting…" : "Register with Internet Identity"}
          </Button>

          <p className="text-[11px] text-center text-muted-foreground leading-relaxed">
            By registering, you agree to our terms. Internet Identity keeps you
            anonymous — no email or password required.
          </p>
        </div>

        {/* Sign in & guest links */}
        <div className="text-center space-y-3">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              search={{ returnUrl: undefined }}
              className="text-primary font-medium hover:underline"
              data-ocid="register.login_link"
            >
              Sign In
            </Link>
          </p>
          <Link
            to="/"
            className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
            data-ocid="register.guest_link"
          >
            Continue as Guest →
          </Link>
        </div>
      </div>
    </div>
  );
}
