import { SearchBar } from "@/components/SearchBar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { Heart, Menu, Moon, ShoppingCart, Sun, User, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const { itemCount } = useCart();
  const { isLoggedIn, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border shadow-xs">
      <div className="flex items-center gap-2 px-4 py-3 max-w-screen-xl mx-auto">
        {/* Logo */}
        <Link to="/" className="shrink-0 mr-1" data-ocid="header.home_link">
          <span className="font-display font-extrabold text-lg leading-tight text-primary uppercase tracking-tight">
            The Pride
            <br />
            Exchange
          </span>
        </Link>

        {/* Search bar */}
        <SearchBar className="flex-1 min-w-0" />

        {/* Actions */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Cart */}
          <Link
            to="/cart"
            className="relative p-2 rounded-lg hover:bg-muted transition-colors"
            data-ocid="header.cart_link"
          >
            <ShoppingCart className="h-5 w-5 text-foreground" />
            {itemCount > 0 && (
              <Badge className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 text-[10px] bg-primary text-primary-foreground border-0 rounded-full flex items-center justify-center">
                {itemCount > 99 ? "99+" : itemCount}
              </Badge>
            )}
          </Link>

          {/* Wishlist (logged in only) */}
          {isLoggedIn && (
            <Link
              to="/wishlist"
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              data-ocid="header.wishlist_link"
            >
              <Heart className="h-5 w-5 text-foreground" />
            </Link>
          )}

          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Toggle theme"
            data-ocid="header.theme_toggle"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5 text-foreground" />
            ) : (
              <Sun className="h-5 w-5 text-foreground" />
            )}
          </button>

          {/* User / Login */}
          {isLoggedIn ? (
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="p-2 rounded-lg hover:bg-muted transition-colors relative"
              aria-label="Account menu"
              data-ocid="header.account_menu_button"
            >
              <User className="h-5 w-5 text-foreground" />
            </button>
          ) : (
            <Link
              to="/login"
              search={{ returnUrl: undefined }}
              data-ocid="header.login_link"
            >
              <Button size="sm" className="btn-pride h-8 text-xs px-3">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Account dropdown */}
      {isLoggedIn && menuOpen && (
        <div className="absolute right-4 top-[56px] bg-card border border-border rounded-xl shadow-elevated z-50 py-1 min-w-[160px] animate-fade-in">
          <Link
            to="/profile"
            className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-muted transition-colors"
            onClick={() => setMenuOpen(false)}
            data-ocid="header.profile_link"
          >
            <User className="h-4 w-4" /> My Profile
          </Link>
          <Link
            to="/orders"
            className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-muted transition-colors"
            onClick={() => setMenuOpen(false)}
            data-ocid="header.orders_link"
          >
            <ShoppingCart className="h-4 w-4" /> My Orders
          </Link>
          <Link
            to="/wishlist"
            className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-muted transition-colors"
            onClick={() => setMenuOpen(false)}
            data-ocid="header.wishlist_menu_link"
          >
            <Heart className="h-4 w-4" /> Wishlist
          </Link>
          <hr className="border-border my-1" />
          <button
            type="button"
            onClick={() => {
              logout();
              setMenuOpen(false);
            }}
            className="flex items-center gap-2 px-4 py-2.5 text-sm text-destructive hover:bg-muted transition-colors w-full text-left"
            data-ocid="header.logout_button"
          >
            <X className="h-4 w-4" /> Logout
          </button>
        </div>
      )}

      {/* Overlay to close menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40"
          role="button"
          tabIndex={-1}
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
          onKeyDown={(e) => e.key === "Escape" && setMenuOpen(false)}
        />
      )}
    </header>
  );
}
