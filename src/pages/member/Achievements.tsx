import Sidebar from "../../components/Sidebar";
import { useAchievements } from "../../context/AchievementContext";

export default function Achievements() {
  const { achievements } = useAchievements();

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-200">
      <Sidebar />
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6">Achievements</h1>

        {achievements.map((a: any) => (
          <div key={a.id} className="bg-slate-900 p-4 rounded-xl mb-3">
            <strong className="text-cyan-400">{a.user}</strong> – {a.name}
          </div>
        ))}
      </div>
    </div>
  );
}
