import { motion } from "framer-motion";
import { useEvents } from "../../context/EventContext";
import { useAchievements } from "../../context/AchievementContext";

export default function Dashboard() {
  const { events } = useEvents();
  const { achievements } = useAchievements();

  return (
    <div className="max-w-4xl mx-auto space-y-14">
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">
          Dashboard
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg">
          Track your growth, participation and achievements inside the club.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Stat title="Events Joined" value={events.length} />
        <Stat title="Achievements" value={achievements.length} />
        <Stat title="Status" value="Active" />
        <Stat title="Rank" value="#12" />
      </div>

      {/* Quick Actions */}
      <section className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-10 space-y-6 transition-colors">
        <h2 className="text-xl font-semibold">
          Quick Actions
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {[
            "Join Event",
            "Submit Achievement",
          ].map((a) => (
            <button
              key={a}
              className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-6 py-5 text-sm text-left hover:border-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition"
            >
              {a}
            </button>
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-10 space-y-6 transition-colors">
        <h2 className="text-xl font-semibold">
          Recent Activity
        </h2>

        <div className="space-y-4">
          {[
            "Joined AI/ML Workshop",
            "Earned Data Viz Badge",
            "Rank improved to #12",
            "Completed 5 events",
          ].map((a) => (
            <div
              key={a}
              className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-6 py-4 text-slate-700 dark:text-slate-300 transition-colors"
            >
              {a}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({ title, value }: { title: string; value: any }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 transition-colors"
    >
      <p className="text-slate-600 dark:text-slate-400 text-sm">
        {title}
      </p>
      <p className="text-3xl font-bold text-cyan-500 mt-3">
        {value}
      </p>
    </motion.div>
  );
}
