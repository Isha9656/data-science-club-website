import { useAchievements } from "../../context/AchievementContext";

export default function Achievements() {
  const { achievements } = useAchievements();

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Achievements</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Recognitions and milestones earned by club members.
        </p>
      </div>

      {/* Achievement List */}
      <div className="space-y-4">
        {achievements.map((a: any) => (
          <div
            key={a.id}
            className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-4 flex items-center justify-between transition-colors"
          >
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {a.user}
              </p>
              <p className="text-lg font-semibold">{a.name}</p>
            </div>

            <span className="text-cyan-500 font-semibold text-sm">
              Awarded
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
