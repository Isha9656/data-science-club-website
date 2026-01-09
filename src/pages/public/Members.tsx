import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { committeeAPI } from "../../utils/api";
import PublicNavbar from "../../components/PublicNavbar";

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

export default function Members() {
  const [committeeMembers, setCommitteeMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCommittee = async () => {
      try {
        const data = await committeeAPI.getAll();
        setCommitteeMembers(data);
      } catch (error) {
        console.error("Failed to load committee members:", error);
      } finally {
        setLoading(false);
      }
    };
    loadCommittee();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 text-slate-900 dark:text-slate-200">
      <PublicNavbar />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-12 md:py-16 lg:py-20"
      >
        <motion.div variants={itemVariants} className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent mb-4">
            Our Members
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Meet the talented data scientists, ML engineers, and researchers
            driving innovation in our community.
          </p>
        </motion.div>

        {loading ? (
          <motion.div
            variants={itemVariants}
            className="text-center py-20 text-slate-500"
          >
            Loading committee members...
          </motion.div>
        ) : committeeMembers.length === 0 ? (
          <motion.div
            variants={itemVariants}
            className="text-center py-20 text-slate-500"
          >
            No committee members found.
          </motion.div>
        ) : (
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {committeeMembers.map((m: any, index: number) => (
            <motion.div
              key={m.id}
              variants={itemVariants}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 hover:shadow-xl hover:border-cyan-400/50 transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-500 flex items-center justify-center text-black font-black text-xl md:text-2xl shadow-lg">
                  {m.name?.charAt(0)}
                </div>
                <div>
                  <h2 className="text-lg md:text-xl font-bold">{m.name}</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {m.course || "Club Member"}
                  </p>
                </div>
              </div>
              <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 mb-4">
                {m.skills}
              </p>
              <a
                href={m.github}
                target="_blank"
                rel="noreferrer"
                className="text-cyan-500 hover:text-cyan-400 font-semibold text-sm md:text-base inline-flex items-center gap-2"
              >
                View GitHub →
              </a>
            </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
