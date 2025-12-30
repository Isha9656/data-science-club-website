import Sidebar from "../../components/Sidebar";
import { useAchievements } from "../../context/AchievementContext";

export default function Leaderboard() {
  const { achievements } = useAchievements();

  const scores: Record<string, number> = {};
  achievements.forEach((a: any) => {
    scores[a.user] = (scores[a.user] || 0) + 1;
  });

  const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1]);

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-200">
      <Sidebar />
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>

        {ranked.map(([user, score], i) => (
          <div key={user} className="bg-slate-900 p-4 rounded-xl mb-3 flex justify-between">
            <span>#{i + 1} {user}</span>
            <span className="text-cyan-400">{score} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
}
