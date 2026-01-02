import { createContext, useContext, useEffect, useState } from "react";
import { authAPI, setToken, removeToken } from "../utils/api";

type Role = "guest" | "member" | "admin";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<{ role: Role; id?: string; name?: string; email?: string }>({ role: "guest" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      const savedRole = localStorage.getItem("role") as Role;
      
      if (token) {
        try {
          const userData = await authAPI.getMe();
          setUser({
            role: userData.role || "member",
            id: userData._id || userData.id,
            name: userData.name,
            email: userData.email,
          });
        } catch (error) {
          // Token invalid, clear it
          removeToken();
          if (savedRole) {
            setUser({ role: savedRole });
          }
        }
      } else if (savedRole) {
        setUser({ role: savedRole });
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (role?: Role, email?: string, password?: string) => {
    try {
      if (email && password) {
        // API login
        const response = await authAPI.login(email, password, role);
        setUser({
          role: response.user.role || "member",
          id: response.user.id,
          name: response.user.name,
          email: response.user.email,
        });
        return response;
      } else if (role) {
        // Demo login (backward compatibility)
        localStorage.setItem("role", role);
        setUser({ role });
        // Also create a demo token for API calls
        if (role !== "guest") {
          const demoResponse = await authAPI.login("", "", role);
          return demoResponse;
        }
      }
    } catch (error: any) {
      throw new Error(error.message || "Login failed");
    }
  };

  const logout = () => {
    removeToken();
    localStorage.removeItem("role");
    setUser({ role: "guest" });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
