import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { authAPI, removeToken } from "../utils/api";

export type Role = "guest" | "member" | "committee" | "admin";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  mustChangePassword?: boolean;
}

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const AUTH_USER_KEY = "authUser";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedUser = localStorage.getItem(AUTH_USER_KEY);
      const token = localStorage.getItem("token");

      if (storedUser) {
        try {
          const parsed: AuthUser = JSON.parse(storedUser);
          setUser(parsed);
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
            role: (userData.role || "member") as Role,
          };
          setUser(normalizedUser);
          localStorage.setItem(AUTH_USER_KEY, JSON.stringify(normalizedUser));
          localStorage.setItem("role", normalizedUser.role);
        } catch {
          removeToken();
          localStorage.removeItem(AUTH_USER_KEY);
          localStorage.removeItem("role");
          setUser(null);
        }
      }

      setLoading(false);
    };

    void initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authAPI.login(email, password);
    const normalizedUser: AuthUser = {
      id: response.user.id,
      name: response.user.name,
      email: response.user.email,
      role: (response.user.role || "member") as Role,
      mustChangePassword: response.user.mustChangePassword || false,
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

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}



