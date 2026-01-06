import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import logo from "../logo.png";

const navItems = [
  { to: "/app", label: "Dashboard" },
  { to: "/app/events", label: "Events" },
  { to: "/app/achievements", label: "Achievements" },
  { to: "/app/leaderboard", label: "Leaderboard" },
  { to: "/app/profile", label: "Profile" },
  { to: "/app/directory", label: "Directory" },
  { to: "/app/gallery", label: "Gallery" },
  { to: "/app/analytics", label: "Analytics" },
];

export default function MemberLayout() {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white flex transition-colors">
      <aside className="w-64 bg-slate-100 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 md:p-6">
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="flex items-center gap-3 text-xl font-bold mb-8 block hover:text-cyan-500 transition-colors cursor-pointer text-left w-full"
        >
          <img src={logo} alt="Logo" className="w-8 h-8" />
          <span>DS Club</span>
        </button>
        <nav className="space-y-2">
          {navItems.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={`block px-4 py-2 rounded ${
                isActive(n.to)
                  ? "bg-slate-200 dark:bg-slate-800"
                  : "hover:bg-slate-200 dark:hover:bg-slate-800"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center px-6 gap-4">
          <Link
            to="/login"
            className="text-cyan-500 hover:text-cyan-400 text-sm font-medium flex items-center gap-2 transition-colors"
          >
            ← Back to Login
          </Link>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors flex items-center justify-center"
            >
              {theme === "dark" ? "🌞" : "🌙"}
            </button>
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:from-cyan-400 hover:to-blue-400 transition-all shadow-lg hover:shadow-xl"
            >
              Logout
            </button>
          </div>
        </header>

        <main className="flex-1 bg-slate-50 dark:bg-slate-950 p-6 md:p-10 lg:p-12">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
