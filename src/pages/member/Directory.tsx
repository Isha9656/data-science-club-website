import { motion } from "framer-motion";
import { useMembers } from "../../context/MembersContext";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
    },
  },
};

export default function Directory() {
  const { members } = useMembers();

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
          Member Directory
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">
          Explore the talent inside the Data Science Club.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl p-6 text-white">
          <p className="text-sm opacity-90">Total Members</p>
          <p className="text-4xl font-black mt-2">{members.length}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
          <p className="text-sm opacity-90">Active Members</p>
          <p className="text-4xl font-black mt-2">{members.length}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-6 text-white">
          <p className="text-sm opacity-90">New This Month</p>
          <p className="text-4xl font-black mt-2">+5</p>
        </div>
      </motion.div>

      {/* Members Grid */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {members.map((m: any, index: number) => (
          <motion.div
            key={m.id}
            variants={itemVariants}
            whileHover={{ y: -8, scale: 1.02 }}
            className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 flex flex-col justify-between transition-all hover:shadow-2xl hover:border-cyan-400 group"
          >
            {/* Avatar + Name */}
            <div className="flex items-center space-x-4 mb-4">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-500 flex items-center justify-center text-black font-black text-2xl shadow-lg"
              >
                {m.name?.charAt(0)}
              </motion.div>
              <div>
                <p className="text-lg font-bold group-hover:text-cyan-500 transition-colors">
                  {m.name}
                </p>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  {m.course || "Club Member"}
                </p>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-6">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">
                Skills
              </p>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                {m.skills || "Not specified"}
              </p>
            </div>

            {/* Course Info */}
            {m.year && (
              <div className="mb-6">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                  Year
                </p>
                <p className="text-sm font-medium">{m.year}</p>
              </div>
            )}

            {/* Action */}
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={m.github}
              target="_blank"
              rel="noreferrer"
              className="mt-auto text-center bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-950 dark:to-slate-900 border border-slate-200 dark:border-slate-800 py-3 rounded-xl hover:border-cyan-400 hover:shadow-lg transition-all font-semibold group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-blue-500 group-hover:text-white"
            >
              View GitHub →
            </motion.a>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
