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
    <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-200">
      <div className="bg-slate-900 p-10 rounded-2xl shadow-xl w-[420px]">
        <h1 className="text-3xl font-bold text-cyan-400 text-center">
          Data Science Club
        </h1>

        <p className="text-slate-400 text-center mt-2">
          Choose how you want to enter
        </p>

        <div className="mt-10 space-y-4">
          <button
            onClick={() => handleLogin("member")}
            className="w-full bg-cyan-500 text-black py-3 rounded-lg font-semibold hover:bg-cyan-400 transition"
          >
            Enter as Member
          </button>

          <button
            onClick={() => handleLogin("admin")}
            className="w-full border border-cyan-500 text-cyan-400 py-3 rounded-lg hover:bg-cyan-500 hover:text-black transition"
          >
            Enter as Committee
          </button>
        </div>
      </div>
    </div>
  );
}
