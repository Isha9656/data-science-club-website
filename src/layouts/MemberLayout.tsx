import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const navItems = [
  { to: "/app", label: "Dashboard" },
  { to: "/app/events", label: "Events" },
  { to: "/app/achievements", label: "Achievements" },
  { to: "/app/leaderboard", label: "Leaderboard" },
  { to: "/app/profile", label: "Profile" },
  { to: "/app/directory", label: "Directory" },
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
      <aside className="w-64 bg-slate-100 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-6">
        <h1 className="text-xl font-bold mb-8">DS Club</h1>
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
        <header className="h-16 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex justify-end items-center px-6 gap-4">
          <button onClick={toggleTheme}>
            {theme === "dark" ? "🌞" : "🌙"}
          </button>
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Logout
          </button>
        </header>

        <main className="flex-1 bg-slate-50 dark:bg-slate-950 p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
