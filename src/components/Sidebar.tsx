import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Sidebar() {
  const { toggleTheme } = useTheme();

  return (
    <div className="w-56 min-h-screen bg-gray-200 dark:bg-slate-900 text-slate-900 dark:text-slate-200 p-5 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold text-cyan-500 mb-6">
          DS Club
        </h2>

        <div className="flex flex-col gap-3">
          <Link className="hover:text-cyan-500" to="/app">Dashboard</Link>
          <Link className="hover:text-cyan-500" to="/app/events">Events</Link>
          <Link className="hover:text-cyan-500" to="/app/achievements">Achievements</Link>
          <Link className="hover:text-cyan-500" to="/app/leaderboard">Leaderboard</Link>
          <Link className="hover:text-cyan-500" to="/app/profile">Profile</Link>
          <Link className="hover:text-cyan-500" to="/app/directory">Members</Link>
        </div>
      </div>

      <button
        onClick={toggleTheme}
        className="bg-cyan-500 text-black py-2 rounded hover:bg-cyan-400 transition"
      >
        Toggle Theme
      </button>
    </div>
  );
}
