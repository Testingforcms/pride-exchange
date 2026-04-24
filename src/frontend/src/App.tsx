import { LoadingGrid } from "@/components/LoadingGrid";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/context/AuthContext";
import {
  Navigate,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { type ReactNode, Suspense, lazy } from "react";

// Placeholder page component for routes not yet built
function PlaceholderPage({ name }: { name: string }) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <p className="text-2xl font-display font-bold text-foreground mb-2">
          {name}
        </p>
        <p className="text-sm text-muted-foreground">Coming soon</p>
      </div>
    </div>
  );
}

function makePlaceholder(name: string) {
  return { default: () => <PlaceholderPage name={name} /> };
}

// Lazy page imports — catch handles missing modules during development
const HomePage = lazy(() =>
  import("@/pages/Home").catch(() => makePlaceholder("Home")),
);
const ProductsPage = lazy(() =>
  import("@/pages/Products").catch(() => makePlaceholder("Products")),
);
const ProductDetailPage = lazy(() =>
  import("@/pages/ProductDetail").catch(() =>
    makePlaceholder("Product Detail"),
  ),
);
const CategoriesPage = lazy(() =>
  import("@/pages/Categories").catch(() => makePlaceholder("Categories")),
);
const CategoryDetailPage = lazy(() =>
  import("@/pages/CategoryDetail").catch(() => makePlaceholder("Category")),
);
const CartPage = lazy(() =>
  import("@/pages/Cart").catch(() => makePlaceholder("Cart")),
);
const CheckoutPage = lazy(() =>
  import("@/pages/Checkout").catch(() => makePlaceholder("Checkout")),
);
const OrdersPage = lazy(() =>
  import("@/pages/Orders").catch(() => makePlaceholder("Orders")),
);
const OrderDetailPage = lazy(() =>
  import("@/pages/OrderDetail").catch(() => makePlaceholder("Order Detail")),
);
const OrderConfirmationPage = lazy(() =>
  import("@/pages/OrderConfirmation").catch(() =>
    makePlaceholder("Order Confirmation"),
  ),
);
const WishlistPage = lazy(() =>
  import("@/pages/Wishlist").catch(() => makePlaceholder("Wishlist")),
);
const ProfilePage = lazy(() =>
  import("@/pages/Profile").catch(() => makePlaceholder("Profile")),
);
const LoginPage = lazy(() =>
  import("@/pages/Login").catch(() => makePlaceholder("Login")),
);
const RegisterPage = lazy(() =>
  import("@/pages/Register").catch(() => makePlaceholder("Register")),
);

function PageLoader() {
  return (
    <div className="px-4 pt-6">
      <LoadingGrid count={4} />
    </div>
  );
}

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isLoggedIn, isLoading } = useAuth();
  if (isLoading) return <PageLoader />;
  if (!isLoggedIn)
    return <Navigate to="/login" search={{ returnUrl: undefined }} />;
  return <>{children}</>;
}

// Root route with Layout
const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </Layout>
  ),
});

// Public routes
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <HomePage />,
});

const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products",
  component: () => <ProductsPage />,
  validateSearch: (search: Record<string, unknown>) => ({
    search: (search.search as string | undefined) ?? undefined,
    category: (search.category as string | undefined) ?? undefined,
    orderby: (search.orderby as string | undefined) ?? undefined,
    page: search.page !== undefined ? Number(search.page) : undefined,
  }),
});

const productDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products/$slug",
  component: () => <ProductDetailPage />,
});

const categoriesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/categories",
  component: () => <CategoriesPage />,
});

const categoryDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/categories/$slug",
  component: () => <CategoryDetailPage />,
  validateSearch: (search: Record<string, unknown>) => ({
    orderby: (search.orderby as string | undefined) ?? undefined,
    page: search.page !== undefined ? Number(search.page) : undefined,
  }),
});

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: () => <CartPage />,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: () => <LoginPage />,
  validateSearch: (search: Record<string, unknown>) => ({
    returnUrl: (search.returnUrl as string | undefined) ?? undefined,
  }),
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: () => <RegisterPage />,
});

// Protected routes
const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout",
  component: () => (
    <ProtectedRoute>
      <CheckoutPage />
    </ProtectedRoute>
  ),
});

const ordersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/orders",
  component: () => (
    <ProtectedRoute>
      <OrdersPage />
    </ProtectedRoute>
  ),
});

const orderDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/orders/$id",
  component: () => (
    <ProtectedRoute>
      <OrderDetailPage />
    </ProtectedRoute>
  ),
});

const orderConfirmationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/order-confirmation/$id",
  component: () => (
    <ProtectedRoute>
      <OrderConfirmationPage />
    </ProtectedRoute>
  ),
  validateSearch: (search: Record<string, unknown>) => ({
    session_id: (search.session_id as string | undefined) ?? undefined,
  }),
});

const wishlistRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/wishlist",
  component: () => (
    <ProtectedRoute>
      <WishlistPage />
    </ProtectedRoute>
  ),
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: () => (
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  ),
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  productsRoute,
  productDetailRoute,
  categoriesRoute,
  categoryDetailRoute,
  cartRoute,
  loginRoute,
  registerRoute,
  checkoutRoute,
  ordersRoute,
  orderDetailRoute,
  orderConfirmationRoute,
  wishlistRoute,
  profileRoute,
]);

const router = createRouter({ routeTree, defaultPreload: "intent" });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
