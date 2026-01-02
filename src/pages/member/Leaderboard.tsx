import { motion } from "framer-motion";
import { useAchievements } from "../../context/AchievementContext";
import { useProfile } from "../../context/ProfileContext";

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

export default function Leaderboard() {
  const { achievements } = useAchievements();
  const { profile } = useProfile();

  const scores: Record<string, number> = {};
  achievements.forEach((a: any) => {
    scores[a.user] = (scores[a.user] || 0) + 1;
  });

  const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1]);

  const getRankIcon = (rank: number) => {
    if (rank === 0) return "🥇";
    if (rank === 1) return "🥈";
    if (rank === 2) return "🥉";
    return `#${rank + 1}`;
  };

  const getRankGradient = (rank: number) => {
    if (rank === 0) return "from-yellow-400 to-orange-500";
    if (rank === 1) return "from-slate-300 to-slate-400";
    if (rank === 2) return "from-orange-300 to-orange-400";
    return "from-slate-400 to-slate-500";
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-5xl mx-auto space-y-10"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-5xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
          Leaderboard
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">
          Top contributors ranked by achievements earned.
        </p>
      </motion.div>

      {/* Top 3 Podium */}
      {ranked.length >= 3 && (
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          {[ranked[1], ranked[0], ranked[2]].map(([user, score], idx) => {
            const actualRank = idx === 0 ? 1 : idx === 1 ? 0 : 2;
            return (
              <motion.div
                key={user}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className={`bg-gradient-to-br ${getRankGradient(
                  actualRank
                )} rounded-2xl p-6 text-center ${
                  actualRank === 0 ? "transform scale-110 -mt-4" : ""
                }`}
              >
                <div className="text-4xl mb-2">{getRankIcon(actualRank)}</div>
                <div className="font-bold text-lg text-white">{user}</div>
                <div className="text-white/90 mt-1">{score} pts</div>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Rankings */}
      <motion.div variants={itemVariants} className="space-y-4">
        {ranked.map(([user, score], i) => {
          const isCurrentUser = user === profile.name;
          return (
            <motion.div
              key={user}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.05 }}
              whileHover={{ scale: 1.02, x: 10 }}
              className={`bg-gradient-to-r ${
                isCurrentUser
                  ? "from-cyan-500/20 to-blue-500/20 border-cyan-400"
                  : "from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 border-slate-200 dark:border-slate-800"
              } border rounded-2xl px-6 py-5 flex items-center justify-between transition-all hover:shadow-xl`}
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
                    i < 3
                      ? `bg-gradient-to-br ${getRankGradient(i)} text-white`
                      : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  {i < 3 ? getRankIcon(i) : `#${i + 1}`}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg">{user}</span>
                    {isCurrentUser && (
                      <span className="px-2 py-1 bg-cyan-500 text-white rounded-full text-xs font-bold">
                        You
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {score} achievement{score !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div className="text-2xl font-black bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                  {score}
                </div>
                <div className="text-xs text-slate-500">points</div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {ranked.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center"
        >
          <p className="text-lg text-slate-500 dark:text-slate-400">
            No rankings yet. Be the first to earn achievements!
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
