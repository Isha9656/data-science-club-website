import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, role }: any) {
  const { user, loading } = useAuth();

  if (loading) return null; // wait for auth to load
  if (user.role !== role) return <Navigate to="/login" />;
  return children;
}
