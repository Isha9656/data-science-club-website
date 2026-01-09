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

export default function CommitteeDashboard() {
  const { events } = useEvents();
  const { achievements } = useAchievements();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-7xl mx-auto space-y-10"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-5xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
          Committee Dashboard
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">
          Manage events, gallery, and achievements.
        </p>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Card
          title="Total Events"
          value={events.length}
          gradient="from-purple-500 to-pink-500"
          icon="📅"
          delay={0.1}
        />
        <Card
          title="Achievements Issued"
          value={achievements.length}
          gradient="from-green-500 to-emerald-500"
          icon="🏆"
          delay={0.2}
        />
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-800 rounded-3xl p-10 space-y-6 backdrop-blur-sm"
      >
        <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ActionLink
            to="/committee/events"
            label="Manage Events"
            icon="📅"
            gradient="from-cyan-500 to-blue-500"
            delay={0.1}
          />
          <ActionLink
            to="/committee/gallery"
            label="Manage Gallery"
            icon="🖼️"
            gradient="from-purple-500 to-pink-500"
            delay={0.2}
          />
          <ActionLink
            to="/committee/achievements"
            label="Manage Achievements"
            icon="🏆"
            gradient="from-green-500 to-emerald-500"
            delay={0.3}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

function Card({
  title,
  value,
  gradient,
  icon,
  delay = 0,
}: {
  title: string;
  value: number;
  gradient: string;
  icon: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.05 }}
      className={`bg-gradient-to-br ${gradient} rounded-2xl p-6 text-white shadow-xl`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-3xl">{icon}</span>
      </div>
      <p className="text-sm opacity-90 mb-1">{title}</p>
      <motion.p
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: delay + 0.2, type: "spring", stiffness: 200 }}
        className="text-4xl font-black"
      >
        {value}
      </motion.p>
    </motion.div>
  );
}

function ActionLink({
  to,
  label,
  icon,
  gradient,
  delay = 0,
}: {
  to: string;
  label: string;
  icon: string;
  gradient: string;
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
          className={`bg-gradient-to-br ${gradient} rounded-2xl p-6 text-white hover:shadow-2xl transition-all group`}
        >
          <div className="flex items-center gap-4">
            <span className="text-3xl">{icon}</span>
            <span className="font-bold text-lg">{label}</span>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

