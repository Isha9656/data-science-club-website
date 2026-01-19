import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { authAPI, removeToken } from "../utils/api";

/* =========================
   Types
========================= */

export type Role = "member" | "committee" | "admin";

export interface AuthUser {
  id: string;
  name?: string;
  email: string;
  role: Role;
  mustChangePassword?: boolean;
}

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<AuthUser>;
  logout: () => void;
}

/* =========================
   Context
========================= */

const AuthContext = createContext<AuthContextValue | null>(null);

const AUTH_USER_KEY = "authUser";

/* =========================
   Provider
========================= */

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const storedUser = localStorage.getItem(AUTH_USER_KEY);
      const token = localStorage.getItem("token");

      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          localStorage.removeItem(AUTH_USER_KEY);
        }
      }

      if (token) {
        try {
          const userData = await authAPI.getMe();
          const normalizedUser: AuthUser = {
            id: userData._id || userData.id,
            name: userData.name,
            email: userData.email,
            role: userData.role,
            mustChangePassword: userData.mustChangePassword ?? false,
          };

          setUser(normalizedUser);
          localStorage.setItem(
            AUTH_USER_KEY,
            JSON.stringify(normalizedUser)
          );
          localStorage.setItem("role", normalizedUser.role);
        } catch (err) {
  console.error("Auth init failed:", err);
  // ❗ DO NOT LOGOUT HERE
  // Token may still be valid
}

      }

      setLoading(false);
    };

    void init();
  }, []);

  /* =========================
     LOGIN (FORCED TYPE)
  ========================= */

  const login: AuthContextValue["login"] = async (email, password) => {
    const response = await authAPI.login(email, password);

    const normalizedUser: AuthUser = {
      id: response.user.id,
      name: response.user.name,
      email: response.user.email,
      role: response.user.role,
      mustChangePassword: response.user.mustChangePassword ?? false,
    };

    setUser(normalizedUser);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(normalizedUser));
    localStorage.setItem("role", normalizedUser.role);

    return normalizedUser;
  };

  const logout = () => {
    removeToken();
    localStorage.removeItem(AUTH_USER_KEY);
    localStorage.removeItem("role");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

/* =========================
   Hook
========================= */

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
