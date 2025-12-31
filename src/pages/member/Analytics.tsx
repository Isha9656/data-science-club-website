import { useEvents } from "../../context/EventContext";
import { useAchievements } from "../../context/AchievementContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Analytics() {
  const { events } = useEvents();
  const { achievements } = useAchievements();

  const data = [
    { name: "Jan", events: 1, achievements: 2 },
    { name: "Feb", events: 2, achievements: 5 },
    { name: "Mar", events: events.length, achievements: achievements.length },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight">
          Club Analytics
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Visual insights into member participation and achievements.
        </p>
      </div>

      {/* Chart Card */}
      <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 transition-colors">
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={data}>
            <XAxis
              dataKey="name"
              stroke="currentColor"
              tick={{ fill: "currentColor" }}
            />
            <YAxis
              stroke="currentColor"
              tick={{ fill: "currentColor" }}
            />
            <Tooltip
              contentStyle={{
                background: "rgba(15,23,42,0.9)",
                border: "none",
                borderRadius: "8px",
                color: "white",
              }}
            />
            <Line
              type="monotone"
              dataKey="events"
              stroke="#06b6d4"
              strokeWidth={3}
            />
            <Line
              type="monotone"
              dataKey="achievements"
              stroke="#22c55e"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
