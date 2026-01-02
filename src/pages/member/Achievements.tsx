import { motion } from "framer-motion";
import { useAchievements } from "../../context/AchievementContext";
import { useProfile } from "../../context/ProfileContext";
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

export default function Achievements() {
  const { achievements } = useAchievements();
  const { profile } = useProfile();

  // Filter achievements for current user
  const myAchievements = achievements.filter(
    (a: any) => a.user === profile.name || a.userId === profile.id
  );

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getAchievementIcon = (name: string) => {
    if (name.toLowerCase().includes("leadership")) return "👑";
    if (name.toLowerCase().includes("organizer")) return "🎯";
    if (name.toLowerCase().includes("contributor")) return "⭐";
    if (name.toLowerCase().includes("expert")) return "💡";
    return "🏆";
  };

  const getAchievementColor = (index: number) => {
    const colors = [
      "from-yellow-400 to-orange-500",
      "from-blue-400 to-purple-500",
      "from-green-400 to-emerald-500",
      "from-pink-400 to-rose-500",
      "from-cyan-400 to-blue-500",
    ];
    return colors[index % colors.length];
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-6xl mx-auto space-y-10"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">Achievements</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Recognitions and milestones earned by club members.
          </p>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-6 text-white">
          <p className="text-sm opacity-90">My Achievements</p>
          <p className="text-3xl font-bold mt-2">{myAchievements.length}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl p-6 text-white">
          <p className="text-sm opacity-90">Total Club Achievements</p>
          <p className="text-3xl font-bold mt-2">{achievements.length}</p>
        </div>
        <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl p-6 text-white">
          <p className="text-sm opacity-90">Progress</p>
          <p className="text-3xl font-bold mt-2">
            {achievements.length > 0
              ? Math.round((myAchievements.length / achievements.length) * 100)
              : 0}
            %
          </p>
        </div>
      </motion.div>

      {/* My Achievements Section */}
      {myAchievements.length > 0 && (
        <motion.div variants={itemVariants}>
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">My Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {myAchievements.map((a: any, index: number) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:shadow-xl transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getAchievementColor(
                      index
                    )} flex items-center justify-center text-3xl flex-shrink-0`}
                  >
                    {getAchievementIcon(a.name)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold group-hover:text-cyan-500 transition-colors mb-2">
                      {a.name}
                    </h3>
                    {a.description && (
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                        {a.description}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-500">
                      <span>📅 {formatDate(a.date)}</span>
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
                        Earned
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* All Achievements Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">All Club Achievements</h2>
        {achievements.length === 0 ? (
          <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center">
            <p className="text-lg text-slate-500 dark:text-slate-400">
              No achievements have been awarded yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {achievements.map((a: any, index: number) => {
              const isMine = myAchievements.some((ma: any) => ma.id === a.id);
              return (
                <div
                  key={a.id}
                  className={`bg-white dark:bg-slate-900/60 border ${
                    isMine
                      ? "border-cyan-400 dark:border-cyan-600"
                      : "border-slate-200 dark:border-slate-800"
                  } rounded-2xl p-6 hover:shadow-lg transition-all group`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getAchievementColor(
                          index
                        )} flex items-center justify-center text-2xl flex-shrink-0`}
                      >
                        {getAchievementIcon(a.name)}
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold group-hover:text-cyan-500 transition-colors">
                            {a.name}
                          </h3>
                          {isMine && (
                            <span className="px-2 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 rounded-full text-xs font-medium">
                              You
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 mt-1">
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {a.user}
                          </p>
                          {a.date && (
                            <span className="text-xs text-slate-500 dark:text-slate-500">
                              {formatDate(a.date)}
                            </span>
                          )}
                        </div>
                        {a.description && (
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                            {a.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          isMine
                            ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                        }`}
                      >
                        {isMine ? "✓ Earned" : "View"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Related Links */}
      <motion.div variants={itemVariants} className="bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-800">
        <h3 className="text-xl font-semibold mb-4">Related</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/app/events"
            className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl hover:shadow-lg transition-all group"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-2xl">
              📅
            </div>
            <div>
              <p className="font-semibold group-hover:text-cyan-500 transition-colors">
                Join Events
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Participate in events to earn achievements
              </p>
            </div>
          </Link>
          <Link
            to="/app/leaderboard"
            className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl hover:shadow-lg transition-all group"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-2xl">
              🏅
            </div>
            <div>
              <p className="font-semibold group-hover:text-cyan-500 transition-colors">
                View Leaderboard
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                See top achievers in the club
              </p>
            </div>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
