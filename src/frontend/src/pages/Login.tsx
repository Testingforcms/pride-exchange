import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Link, Navigate, useSearch } from "@tanstack/react-router";
import { LogIn, ShoppingBag } from "lucide-react";
import { useEffect } from "react";

export default function Login() {
  const { isLoggedIn, loginWithII, isLoading } = useAuth();
  const { returnUrl } = useSearch({ from: "/login" });

  // After login, redirect to returnUrl if set
  useEffect(() => {
    if (isLoggedIn && returnUrl) {
      window.location.replace(returnUrl);
    }
  }, [isLoggedIn, returnUrl]);

  if (isLoggedIn && !returnUrl) return <Navigate to="/" />;

  return (
    <div
      className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-12"
      data-ocid="login.page"
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
              Sign in to access your account
            </p>
          </div>
        </div>

        {/* Auth card */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-5">
          <div className="space-y-1 text-center">
            <h2 className="font-semibold text-foreground">Welcome back</h2>
            <p className="text-xs text-muted-foreground">
              Use Internet Identity — no passwords, no tracking.
            </p>
          </div>

          <Button
            type="button"
            onClick={loginWithII}
            disabled={isLoading}
            className="btn-pride w-full gap-2 h-11"
            data-ocid="login.submit_button"
          >
            <LogIn className="h-4 w-4" />
            {isLoading ? "Connecting…" : "Sign in with Internet Identity"}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-card px-2 text-muted-foreground">or</span>
            </div>
          </div>

          {/* Forgot password */}
          <div className="text-center">
            <button
              type="button"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              data-ocid="login.forgot_password_button"
              onClick={() =>
                window.alert(
                  "Please contact support at https://caffeine.ai for account help.",
                )
              }
            >
              Forgot password?
            </button>
          </div>
        </div>

        {/* Register & guest links */}
        <div className="text-center space-y-3">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-primary font-medium hover:underline"
              data-ocid="login.register_link"
            >
              Register
            </Link>
          </p>
          <Link
            to="/"
            className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
            data-ocid="login.guest_link"
          >
            Continue as Guest →
          </Link>
        </div>
      </div>
    </div>
  );
}
