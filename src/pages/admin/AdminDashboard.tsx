import AdminSidebar from "../../components/AdminSidebar";
import { useEvents } from "../../context/EventContext";
import { useAchievements } from "../../context/AchievementContext";
import { useMembers } from "../../context/MembersContext";

export default function AdminDashboard() {
  const { events } = useEvents();
  const { achievements } = useAchievements();
  const { members } = useMembers();

  return (
    <div className="flex min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-200">
      <AdminSidebar />
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-8 text-cyan-500">
          Committee Dashboard
        </h1>

        <div className="grid grid-cols-4 gap-6 mb-10">
          <div className="bg-gray-100 dark:bg-slate-900 p-6 rounded-xl">
            Members: {members.length}
          </div>

          <div className="bg-gray-100 dark:bg-slate-900 p-6 rounded-xl">
            Events: {events.length}
          </div>

          <div className="bg-gray-100 dark:bg-slate-900 p-6 rounded-xl">
            Achievements: {achievements.length}
          </div>

          <div className="bg-gray-100 dark:bg-slate-900 p-6 rounded-xl text-green-500">
            Active
          </div>
        </div>
      </div>
    </div>
  );
}
