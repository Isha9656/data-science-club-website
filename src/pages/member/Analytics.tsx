import { motion } from "framer-motion";
import { useEvents } from "../../context/EventContext";
import { useAchievements } from "../../context/AchievementContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const COLORS = ["#06b6d4", "#3b82f6", "#8b5cf6", "#10b981", "#f59e0b"];

export default function Analytics() {
  const { events } = useEvents();
  const { achievements } = useAchievements();

  const data = [
    { name: "Jan", events: 1, achievements: 2 },
    { name: "Feb", events: 2, achievements: 5 },
    { name: "Mar", events: events.length, achievements: achievements.length },
    { name: "Apr", events: 4, achievements: 8 },
    { name: "May", events: 5, achievements: 10 },
  ];

  const pieData = [
    { name: "Workshops", value: 35 },
    { name: "Hackathons", value: 25 },
    { name: "Lectures", value: 20 },
    { name: "Networking", value: 20 },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-7xl mx-auto space-y-10"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-5xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
          Club Analytics
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">
          Visual insights into member participation and achievements.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <StatCard
          title="Total Events"
          value={events.length}
          gradient="from-cyan-500 to-blue-500"
          icon="📅"
        />
        <StatCard
          title="Achievements"
          value={achievements.length}
          gradient="from-purple-500 to-pink-500"
          icon="🏆"
        />
        <StatCard
          title="Growth Rate"
          value="+24%"
          gradient="from-green-500 to-emerald-500"
          icon="📈"
        />
        <StatCard
          title="Engagement"
          value="89%"
          gradient="from-orange-500 to-red-500"
          icon="🔥"
        />
      </motion.div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Line Chart */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 transition-all hover:shadow-2xl"
        >
          <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Activity Over Time
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis
                dataKey="name"
                stroke="currentColor"
                tick={{ fill: "currentColor" }}
              />
              <YAxis stroke="currentColor" tick={{ fill: "currentColor" }} />
              <Tooltip
                contentStyle={{
                  background: "rgba(15,23,42,0.95)",
                  border: "1px solid rgba(6,182,212,0.3)",
                  borderRadius: "12px",
                  color: "white",
                }}
              />
              <Line
                type="monotone"
                dataKey="events"
                stroke="#06b6d4"
                strokeWidth={3}
                dot={{ fill: "#06b6d4", r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="achievements"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={{ fill: "#8b5cf6", r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 transition-all hover:shadow-2xl"
        >
          <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Event Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${((percent || 0) * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "rgba(15,23,42,0.95)",
                  border: "1px solid rgba(6,182,212,0.3)",
                  borderRadius: "12px",
                  color: "white",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Bar Chart */}
      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 transition-all hover:shadow-2xl"
      >
        <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Monthly Participation
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="currentColor"
              tick={{ fill: "currentColor" }}
            />
            <YAxis stroke="currentColor" tick={{ fill: "currentColor" }} />
            <Tooltip
              contentStyle={{
                background: "rgba(15,23,42,0.95)",
                border: "1px solid rgba(6,182,212,0.3)",
                borderRadius: "12px",
                color: "white",
              }}
            />
            <Bar dataKey="events" fill="#06b6d4" radius={[8, 8, 0, 0]} />
            <Bar dataKey="achievements" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  );
}

function StatCard({
  title,
  value,
  gradient,
  icon,
}: {
  title: string;
  value: string | number;
  gradient: string;
  icon: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.05 }}
      className={`bg-gradient-to-br ${gradient} rounded-2xl p-6 text-white shadow-xl`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-3xl">{icon}</span>
      </div>
      <p className="text-sm opacity-90 mb-1">{title}</p>
      <p className="text-4xl font-black">{value}</p>
    </motion.div>
  );
}
