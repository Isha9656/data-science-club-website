import { useAchievements } from "../../context/AchievementContext";

export default function Leaderboard() {
  const { achievements } = useAchievements();

  const scores: Record<string, number> = {};
  achievements.forEach((a: any) => {
    scores[a.user] = (scores[a.user] || 0) + 1;
  });

  const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1]);

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Leaderboard</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Top contributors ranked by achievements earned.
        </p>
      </div>

      {/* Rankings */}
      <div className="space-y-4">
        {ranked.map(([user, score], i) => (
          <div
            key={user}
            className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-4 flex items-center justify-between transition-colors"
          >
            <div className="flex items-center space-x-4">
              <span className="text-slate-500 dark:text-slate-400 font-mono">
                #{i + 1}
              </span>
              <span className="font-semibold">{user}</span>
            </div>

            <span className="text-cyan-500 font-semibold">
              {score} pts
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
