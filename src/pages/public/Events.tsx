import { motion } from "framer-motion";
import { useEvents } from "../../context/EventContext";
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

export default function Events() {
  const { events } = useEvents();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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
            Club Events
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Join our exciting events, workshops, and networking sessions to
            grow your skills and connect with the community.
          </p>
        </motion.div>

        {events.length === 0 ? (
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 md:p-16 text-center"
          >
            <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400">
              No events scheduled at the moment. Check back soon!
            </p>
          </motion.div>
        ) : (
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {events.map((e: any, index: number) => (
              <motion.div
                key={e.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-xl hover:border-cyan-400/50 transition-all group"
              >
                {e.image ? (
                  <div className="h-48 w-full overflow-hidden relative mb-4">
                    <img src={e.image} alt={e.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  </div>
                ) : (
                    <div className="p-6 md:p-8 pb-0">
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center text-2xl mb-4">
                        📅
                        </div>
                    </div>
                )}
                <div className="p-6 md:p-8 pt-0">
                    <h2 className="text-xl md:text-2xl font-bold mb-3">{e.title}</h2>
                    <p className="text-slate-600 dark:text-slate-400">
                    {formatDate(e.date)}
                    </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
