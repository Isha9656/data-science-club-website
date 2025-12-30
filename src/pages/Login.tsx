import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role: "member" | "admin") => {
    login(role);
    if (role === "admin") navigate("/admin");
    else navigate("/app");
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 20 }}>
      <h1>Login as</h1>
      <button onClick={() => handleLogin("member")}>Club Member</button>
      <button onClick={() => handleLogin("admin")}>Committee</button>
    </div>
  );
}
