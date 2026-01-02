import { motion } from "framer-motion";
import { useEvents } from "../../context/EventContext";
import { useAchievements } from "../../context/AchievementContext";
import { Link } from "react-router-dom";

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

export default function Dashboard() {
  const { events } = useEvents();
  const { achievements } = useAchievements();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-6xl mx-auto space-y-10"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="space-y-3">
        <h1 className="text-5xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg">
          Track your growth, participation and achievements inside the club.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        <Stat title="Events Joined" value={events.length} delay={0.1} />
        <Stat title="Achievements" value={achievements.length} delay={0.2} />
        <Stat title="Status" value="Active" delay={0.3} />
        <Stat title="Rank" value="#12" delay={0.4} />
      </motion.div>

      {/* Quick Actions */}
      <motion.section
        variants={itemVariants}
        className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-10 space-y-6 transition-colors backdrop-blur-sm"
      >
        <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Action to="/app/events" label="Join Event" icon="📅" delay={0.1} />
          <Action
            to="/app/achievements"
            label="View Achievements"
            icon="🏆"
            delay={0.2}
          />
          <Action
            to="/app/profile"
            label="Edit Profile"
            icon="👤"
            delay={0.3}
          />
        </div>
      </motion.section>

      {/* Recent Activity */}
      <motion.section
        variants={itemVariants}
        className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-10 space-y-6 transition-colors backdrop-blur-sm"
      >
        <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Recent Activity
        </h2>

        <div className="space-y-4">
          {[
            "Joined AI/ML Workshop",
            "Earned Data Viz Badge",
            "Rank improved to #12",
            "Completed 5 events",
          ].map((a, i) => (
            <motion.div
              key={a}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-6 py-4 text-slate-700 dark:text-slate-300 transition-all hover:border-cyan-400 hover:shadow-lg group"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-cyan-500 group-hover:scale-150 transition-transform" />
                <span>{a}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
}

function Stat({
  title,
  value,
  delay = 0,
}: {
  title: string;
  value: any;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.05 }}
      className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 transition-all hover:shadow-2xl hover:border-cyan-400/50 group"
    >
      <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mb-2">
        {title}
      </p>
      <motion.p
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: delay + 0.2, type: "spring", stiffness: 200 }}
        className="text-4xl font-black bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent"
      >
        {value}
      </motion.p>
    </motion.div>
  );
}

function Action({
  to,
  label,
  icon,
  delay = 0,
}: {
  to: string;
  label: string;
  icon: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Link to={to}>
        <motion.div
          whileHover={{ y: -4, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-5 hover:border-cyan-400 hover:shadow-xl transition-all group"
        >
          <div className="flex items-center gap-4">
            <span className="text-3xl">{icon}</span>
            <span className="font-semibold group-hover:text-cyan-500 transition-colors">
              {label}
            </span>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
