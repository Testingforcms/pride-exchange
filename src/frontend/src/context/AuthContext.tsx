import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthUser {
  principalId: string;
  wooCustomerId: number | null;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  isLoggedIn: boolean;
  isGuest: boolean;
  isLoading: boolean;
  loginWithII: () => void;
  logout: () => void;
  setWooCustomerId: (id: number) => void;
  setUserProfile: (email: string, firstName: string, lastName: string) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const PROFILE_KEY = "tpe_user_profile";

/** Returns the localStorage key for wooCustomerId for a given principal */
function wooCustomerKey(principalId: string) {
  return `wooCustomerId_${principalId}`;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { login, clear, isAuthenticated, isInitializing, identity } =
    useInternetIdentity();
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const stored = localStorage.getItem(PROFILE_KEY);
      return stored ? (JSON.parse(stored) as AuthUser) : null;
    } catch {
      return null;
    }
  });

  const isLoggedIn = isAuthenticated;
  const isGuest = !isAuthenticated;
  const isLoading = isInitializing;

  useEffect(() => {
    if (isAuthenticated && identity) {
      const principalId = identity.getPrincipal().toText();

      // Look up stored wooCustomerId for this principal
      const storedWooId = localStorage.getItem(wooCustomerKey(principalId));
      const wooCustomerId = storedWooId ? Number(storedWooId) : null;

      setUser((prev) => {
        const updated: AuthUser = {
          principalId,
          // Prefer freshly resolved wooCustomerId over stale cached value
          wooCustomerId: wooCustomerId ?? prev?.wooCustomerId ?? null,
          email: prev?.email ?? "",
          firstName: prev?.firstName ?? "",
          lastName: prev?.lastName ?? "",
        };
        localStorage.setItem(PROFILE_KEY, JSON.stringify(updated));
        return updated;
      });
    } else if (!isAuthenticated && !isInitializing) {
      setUser(null);
      localStorage.removeItem(PROFILE_KEY);
    }
  }, [isAuthenticated, isInitializing, identity]);

  const loginWithII = useCallback(() => {
    login();
  }, [login]);

  const logout = useCallback(() => {
    clear();
    setUser(null);
    localStorage.removeItem(PROFILE_KEY);
  }, [clear]);

  const setWooCustomerId = useCallback((id: number) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, wooCustomerId: id };
      localStorage.setItem(PROFILE_KEY, JSON.stringify(updated));
      // Also persist keyed by principal for quick lookup on next login
      localStorage.setItem(wooCustomerKey(prev.principalId), String(id));
      return updated;
    });
  }, []);

  const setUserProfile = useCallback(
    (email: string, firstName: string, lastName: string) => {
      setUser((prev) => {
        if (!prev) return prev;
        const updated = { ...prev, email, firstName, lastName };
        localStorage.setItem(PROFILE_KEY, JSON.stringify(updated));
        return updated;
      });
    },
    [],
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        isGuest,
        isLoading,
        loginWithII,
        logout,
        setWooCustomerId,
        setUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
