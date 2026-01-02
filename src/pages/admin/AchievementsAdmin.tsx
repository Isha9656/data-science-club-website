import { motion } from "framer-motion";
import { useAchievements } from "../../context/AchievementContext";
import { useMembers } from "../../context/MembersContext";

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

export default function AchievementsAdmin() {
  const { achievements } = useAchievements();
  const { members } = useMembers();

  const committeeMemberIds = members.slice(0, 2).map((m: any) => m.id);
  const committeeMemberNames = members.slice(0, 2).map((m: any) => m.name);
  const committeeAchievements = achievements.filter((achievement: any) =>
    (achievement.userId && committeeMemberIds.includes(achievement.userId)) ||
    (achievement.user && committeeMemberNames.includes(achievement.user))
  );

  const getMemberName = (userId: number | string, userName?: string) => {
    if (userName) return userName;
    const member = members.find((m: any) => m.id === userId);
    return member ? member.name : "Unknown Member";
  };

  const getAchievementIcon = (name: string) => {
    if (name.toLowerCase().includes("leadership")) return "👑";
    if (name.toLowerCase().includes("organizer")) return "🎯";
    if (name.toLowerCase().includes("contributor")) return "⭐";
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
      className="max-w-7xl mx-auto space-y-8"
    >
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Committee Members Achievements
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            View and manage achievements for committee members
          </p>
        </div>
        <div className="text-slate-600 dark:text-slate-400">
          Total:{" "}
          <span className="font-bold text-slate-900 dark:text-white text-xl">
            {committeeAchievements.length}
          </span>
        </div>
      </motion.div>

      {committeeAchievements.length === 0 ? (
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center"
        >
          <p className="text-lg text-slate-500 dark:text-slate-400">
            No achievements found for committee members.
          </p>
          <p className="text-sm text-slate-400 dark:text-slate-500 mt-2">
            Achievements will appear here once they are assigned to committee
            members.
          </p>
        </motion.div>
      ) : (
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden backdrop-blur-sm"
        >
          <div className="p-6 border-b border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl font-bold">Achievement Records</h2>
          </div>
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {committeeAchievements.map((achievement: any, index: number) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 10 }}
                className="p-6 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getAchievementColor(
                        index
                      )} flex items-center justify-center text-3xl flex-shrink-0 shadow-lg`}
                    >
                      {getAchievementIcon(achievement.name)}
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold">{achievement.name}</h3>
                      <p className="text-slate-600 dark:text-slate-400 mt-1">
                        Awarded to:{" "}
                        <span className="font-medium">
                          {getMemberName(
                            achievement.userId || achievement.user,
                            achievement.user
                          )}
                        </span>
                      </p>
                      {achievement.date && (
                        <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">
                          Date:{" "}
                          {new Date(achievement.date).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                      )}
                      {achievement.description && (
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                          {achievement.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-3 py-1 bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 text-cyan-700 dark:text-cyan-400 rounded-full text-xs font-bold">
                      Committee Member
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Committee Members List */}
      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 backdrop-blur-sm"
      >
        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Committee Members
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {members.slice(0, 2).map((member: any, index: number) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-4 p-4 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-500 flex items-center justify-center text-sm font-black text-white shadow-lg"
              >
                {member.name?.charAt(0) || "M"}
              </motion.div>
              <div>
                <p className="font-bold">{member.name}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {member.course || "Committee Member"}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
