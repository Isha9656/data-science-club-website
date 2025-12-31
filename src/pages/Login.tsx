import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role: "member" | "admin") => {
    login(role);
    if (role === "admin") navigate("/admin");
    else navigate("/app");
  };

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-slate-900 dark:text-slate-200 flex items-center justify-center p-6 overflow-hidden relative transition-colors">
      {/* Animated grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.1)_1px,transparent_1px)] bg-[size:80px_80px] opacity-20 dark:opacity-30" />

      {/* Subtle radial gradients */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(6,182,212,0.12) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(99,102,241,0.1) 0%, transparent 50%)
          `,
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-slate-300 dark:border-slate-700/50 p-10 rounded-3xl shadow-2xl w-full max-w-md relative z-10 transition-colors"
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
          <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Data Science Club
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-4 text-lg">
            Secure access to our platform
          </p>
        </motion.div>

        {/* Login Options */}
        <div className="space-y-6">
          {[
            {
              role: "member" as const,
              title: "Member Access",
              subtitle: "Workshops, projects, community",
              color: "from-cyan-500 to-blue-500",
            },
            {
              role: "admin" as const,
              title: "Committee Access",
              subtitle: "Admin dashboard & management",
              color: "from-indigo-500 to-purple-500",
            },
          ].map((option, index) => (
            <motion.button
              key={option.role}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
              whileHover={{
                y: -4,
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(6, 182, 212, 0.25)",
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleLogin(option.role)}
              className={`group relative w-full h-20 bg-gradient-to-r ${option.color} text-black font-semibold rounded-2xl border border-white/20 overflow-hidden transition-all shadow-xl`}
            >
              {/* Shine */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />

              <div className="relative z-10 flex items-center justify-between px-6 h-full">
                <div>
                  <div className="font-bold text-lg">{option.title}</div>
                  <div className="text-xs opacity-90">{option.subtitle}</div>
                </div>
                <div className="w-5 h-5 border-r-2 border-b-2 border-white/60 rotate-45 opacity-0 group-hover:opacity-100" />
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
