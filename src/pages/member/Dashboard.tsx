import Sidebar from "../../components/Sidebar";
import { useEvents } from "../../context/EventContext";
import { useAchievements } from "../../context/AchievementContext";

export default function Dashboard() {
  const { events } = useEvents();
  const { achievements } = useAchievements();

  return (
    <div className="flex min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-200">
      <Sidebar />
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        <div className="grid grid-cols-4 gap-6">
          <div className="bg-gray-100 dark:bg-slate-900 p-6 rounded-xl">
            <p>Total Events</p>
            <p className="text-3xl text-cyan-500">{events.length}</p>
          </div>

          <div className="bg-gray-100 dark:bg-slate-900 p-6 rounded-xl">
            <p>Achievements</p>
            <p className="text-3xl text-cyan-500">{achievements.length}</p>
          </div>

          <div className="bg-gray-100 dark:bg-slate-900 p-6 rounded-xl">
            <p>Status</p>
            <p className="text-green-500">Active</p>
          </div>

          <div className="bg-gray-100 dark:bg-slate-900 p-6 rounded-xl">
            <p>Rank</p>
            <p className="text-cyan-500">#12</p>
          </div>
        </div>
      </div>
    </div>
  );
}
