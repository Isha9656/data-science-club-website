import { createContext, useContext, useEffect, useState } from "react";

type Role = "guest" | "member" | "admin";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<{ role: Role }>({ role: "guest" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedRole = localStorage.getItem("role") as Role;
    if (savedRole) {
      setUser({ role: savedRole });
    }
    setLoading(false);
  }, []);

  const login = (role: Role) => {
    localStorage.setItem("role", role);
    setUser({ role });
  };

  const logout = () => {
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
