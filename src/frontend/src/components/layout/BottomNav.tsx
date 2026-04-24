import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import { Grid3X3, Heart, Home, Search, User } from "lucide-react";

const navItems = [
  { to: "/", label: "Home", icon: Home, ocid: "bottom_nav.home_link" },
  {
    to: "/categories",
    label: "Shop",
    icon: Grid3X3,
    ocid: "bottom_nav.categories_link",
  },
  {
    to: "/products",
    label: "Search",
    icon: Search,
    ocid: "bottom_nav.search_link",
  },
  {
    to: "/wishlist",
    label: "Wishlist",
    icon: Heart,
    ocid: "bottom_nav.wishlist_link",
    requiresAuth: true,
  },
  {
    to: "/profile",
    label: "Account",
    icon: User,
    ocid: "bottom_nav.account_link",
  },
];

export function BottomNav() {
  const { isLoggedIn } = useAuth();
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border safe-area-inset-bottom">
      <div className="flex items-center justify-around px-2 py-1 max-w-screen-xl mx-auto">
        {navItems.map(({ to, label, icon: Icon, ocid, requiresAuth }) => {
          const resolvedTo = requiresAuth && !isLoggedIn ? "/login" : to;
          const isActive =
            pathname === to || (to !== "/" && pathname.startsWith(to));

          return (
            <Link
              key={to}
              to={resolvedTo}
              data-ocid={ocid}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors min-w-[52px]",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon
                className={cn("h-5 w-5", isActive && "fill-primary/20")}
                strokeWidth={isActive ? 2.5 : 1.5}
              />
              <span
                className={cn(
                  "text-[10px] font-medium",
                  isActive ? "text-primary" : "text-muted-foreground",
                )}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
