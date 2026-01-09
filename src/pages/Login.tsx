import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../logo.png";
import { authAPI } from "../utils/api";

type AuthMode = "login" | "signup";
type UserType = "member" | "committee" | null;

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>("login");
  const [userType, setUserType] = useState<UserType>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const validate = () => {
    const newErrors: any = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@marwadiuniversity\.ac\.in$/;
    
    if (mode === "signup" && !formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email must be from marwadiuniversity.ac.in";
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (mode === "signup" && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");
    if (!validate()) return;
    
    if (!userType) return;

    setLoading(true);
    
    try {
      let role = "member";
      if (userType === "committee") {
        role = "committee";
      }

      if (mode === "signup") {
        await authAPI.register(formData.name, formData.email, formData.password, role);
      }

      const loggedInUser = await login(formData.email, formData.password);
      
      if (loggedInUser.mustChangePassword) {
        navigate("/change-password");
        return;
      }

      if (loggedInUser.role === "admin") {
        navigate("/admin/dashboard");
      } else if (loggedInUser.role === "committee") {
        navigate("/committee/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error: any) {
      setApiError(error.message || "Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUserTypeSelect = (type: "member" | "committee") => {
    setUserType(type);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#050B18] to-slate-900 text-white flex items-center justify-center p-6 overflow-hidden relative">
      {/* Animated background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:80px_80px] opacity-20" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(6,182,212,0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(99,102,241,0.12) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(16,185,129,0.1) 0%, transparent 50%)
          `,
        }}
      />

      {/* Back to Home Button */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="absolute top-6 left-6 z-20"
      >
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            className="group relative flex items-center gap-3 px-6 py-3 bg-slate-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-xl hover:border-cyan-400/60 hover:bg-slate-900/90 transition-all shadow-lg hover:shadow-cyan-500/20"
          >
            {/* Animated arrow */}
            <motion.div
              animate={{ x: [0, -4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="text-cyan-400 text-xl"
            >
              ←
            </motion.div>
            <span className="text-cyan-400 font-semibold group-hover:text-cyan-300 transition-colors">
              Back to Home
            </span>
            {/* Glow effect on hover */}
            <motion.div
              className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0 opacity-0 group-hover:opacity-100 blur-xl"
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-slate-900/80 backdrop-blur-2xl border border-slate-700/50 p-10 rounded-3xl shadow-2xl w-full max-w-md relative z-10"
      >
        {/* Decorative top gradient */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 rounded-t-3xl" />

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mb-8"
        >
          <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            transition={{ delay: 0.2, type: "spring" }}
            className="flex justify-center mb-6"
          >
              <img src={logo} alt="DS Club Logo" className="w-24 h-24 drop-shadow-lg" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Data Science Club
          </h1>
          <p className="text-slate-400 mt-4 text-lg">
            {mode === "login" ? "Welcome back" : "Join our community"}
          </p>
        </motion.div>

        {/* Auth Mode Toggle */}
        {userType === "member" && (
          <div className="flex bg-slate-800/50 p-1 rounded-xl mb-8">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                mode === "login"
                  ? "bg-cyan-500 text-white shadow-lg"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setMode("signup")}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                mode === "signup"
                  ? "bg-cyan-500 text-white shadow-lg"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Sign Up
            </button>
          </div>
        )}

        {userType === "committee" && (
          <div className="mb-8 text-center">
             <p className="text-slate-400 text-sm">Committee Member Login</p>
          </div>
        )}

        <AnimatePresence mode="wait">
          {!userType ? (
            <motion.div
              key="user-type"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <p className="text-center text-slate-400 mb-4">
                Select your account type
              </p>
              {[
                {
                  type: "member" as const,
                  title: "Member",
                  subtitle: "Access workshops, projects & community",
                  icon: "👤",
                  gradient: "from-cyan-500 to-blue-500",
                },
                {
                  type: "committee" as const,
                  title: "Committee",
                  subtitle: "Admin dashboard & management",
                  icon: "👔",
                  gradient: "from-indigo-500 to-purple-500",
                },
              ].map((option) => (
                <motion.button
                  key={option.type}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleUserTypeSelect(option.type)}
                  className={`group relative w-full h-20 bg-gradient-to-r ${option.gradient} text-black font-semibold rounded-2xl border border-white/20 overflow-hidden transition-all shadow-xl`}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="relative z-10 flex items-center gap-4 px-6 h-full">
                    <span className="text-3xl">{option.icon}</span>
                    <div className="text-left flex-1">
                      <div className="font-bold text-lg">{option.title}</div>
                      <div className="text-xs opacity-90">{option.subtitle}</div>
                    </div>
                    <div className="w-5 h-5 border-r-2 border-b-2 border-white/60 rotate-45 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <button
                type="button"
                onClick={() => {
                  setUserType(null);
                  setErrors({});
                }}
                className="text-cyan-400 hover:text-cyan-300 text-sm font-medium flex items-center gap-2 mb-4"
              >
                ← Back
              </button>

              {mode === "signup" && (
                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition"
                    placeholder="Enter your name"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={`w-full bg-slate-800/50 border rounded-xl p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition ${errors.email ? 'border-red-500' : 'border-slate-700'}`}
                  placeholder={
                    userType === "committee"
                      ? "committee@marwadiuniversity.ac.in"
                      : "student@marwadiuniversity.ac.in"
                  }
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className={`w-full bg-slate-800/50 border rounded-xl p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition ${errors.password ? 'border-red-500' : 'border-slate-700'}`}
                  placeholder="Enter your password"
                />
                {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
              </div>

              {mode === "signup" && (
                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({ ...formData, confirmPassword: e.target.value })
                    }
                    className={`w-full bg-slate-800/50 border rounded-xl p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition ${errors.confirmPassword ? 'border-red-500' : 'border-slate-700'}`}
                    placeholder="Confirm your password"
                  />
                  {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
                </div>
              )}

              {apiError && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-3 text-red-400 text-sm">
                  {apiError}
                </div>
              )}

              <Link
                to="/forgot-password"
                className="block text-center text-cyan-400 hover:text-cyan-300 text-sm"
              >
                Forgot Password?
              </Link>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className={`w-full h-12 bg-gradient-to-r ${
                  userType === "committee"
                    ? "from-indigo-500 to-purple-500"
                    : "from-cyan-500 to-blue-500"
                } text-black font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {loading ? "Processing..." : mode === "login" ? "Login" : "Sign Up"}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
