import { motion } from "framer-motion";
import { useEvents } from "../../context/EventContext";
import { useState } from "react";
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

export default function MyEvents() {
  const { events } = useEvents();
  const [joined, setJoined] = useState<number[]>([]);
  const [filter, setFilter] = useState<"all" | "upcoming" | "joined">("all");

  const upcomingEvents = events.filter((e: any) => {
    const eventDate = new Date(e.date);
    return eventDate >= new Date();
  });

  const filteredEvents =
    filter === "joined"
      ? events.filter((e: any) => joined.includes(e.id))
      : filter === "upcoming"
      ? upcomingEvents
      : events;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getDaysUntil = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
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
          <h1 className="text-5xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">Events</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Discover and join upcoming club events, workshops, and activities.
          </p>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl p-6 text-white">
          <p className="text-sm opacity-90">Total Events</p>
          <p className="text-3xl font-bold mt-2">{events.length}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
          <p className="text-sm opacity-90">Upcoming</p>
          <p className="text-3xl font-bold mt-2">{upcomingEvents.length}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-6 text-white">
          <p className="text-sm opacity-90">Joined</p>
          <p className="text-3xl font-bold mt-2">{joined.length}</p>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div variants={itemVariants} className="flex gap-3">
        <button
          onClick={() => setFilter("all")}
          className={`px-6 py-2.5 rounded-xl font-medium transition ${
            filter === "all"
              ? "bg-cyan-500 text-black"
              : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700"
          }`}
        >
          All Events
        </button>
        <button
          onClick={() => setFilter("upcoming")}
          className={`px-6 py-2.5 rounded-xl font-medium transition ${
            filter === "upcoming"
              ? "bg-cyan-500 text-black"
              : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700"
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setFilter("joined")}
          className={`px-6 py-2.5 rounded-xl font-medium transition ${
            filter === "joined"
              ? "bg-cyan-500 text-black"
              : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700"
          }`}
        >
          My Events
        </button>
      </motion.div>

      {/* Event List */}
      {filteredEvents.length === 0 ? (
        <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center">
          <p className="text-lg text-slate-500 dark:text-slate-400">
            {filter === "joined"
              ? "You haven't joined any events yet."
              : filter === "upcoming"
              ? "No upcoming events at the moment."
              : "No events available."}
          </p>
          {filter !== "all" && (
            <button
              onClick={() => setFilter("all")}
              className="mt-4 text-cyan-500 hover:text-cyan-400 font-medium"
            >
              View all events
            </button>
          )}
        </div>
      ) : (
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.map((e: any, index: number) => {
            const daysUntil = getDaysUntil(e.date);
            const isUpcoming = daysUntil >= 0;
            const isJoined = joined.includes(e.id);

            return (
              <motion.div
                key={e.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:shadow-xl transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-xl font-semibold group-hover:text-cyan-500 transition-colors">
                        {e.title}
                      </h2>
                      {isJoined && (
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-medium">
                          Joined
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-1">
                        <span>📅</span>
                        <span>{formatDate(e.date)}</span>
                      </div>
                      {isUpcoming && (
                        <div className="flex items-center gap-1">
                          <span>⏰</span>
                          <span>
                            {daysUntil === 0
                              ? "Today"
                              : daysUntil === 1
                              ? "Tomorrow"
                              : `${daysUntil} days`}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    Join this event to participate in club activities and network
                    with fellow members.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 rounded-full text-xs font-medium">
                        Workshop
                      </span>
                      <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full text-xs font-medium">
                        Networking
                      </span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        !isJoined && setJoined([...joined, e.id])
                      }
                      disabled={isJoined}
                      className={`px-6 py-2.5 rounded-xl text-sm font-bold transition ${
                        isJoined
                          ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white cursor-not-allowed"
                          : "bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-400 hover:to-blue-400 shadow-lg"
                      }`}
                    >
                      {isJoined ? "✓ Joined" : "Join Event"}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Related Links */}
      <motion.div variants={itemVariants} className="bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-800">
        <h3 className="text-xl font-semibold mb-4">Related</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/app/achievements"
            className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl hover:shadow-lg transition-all group"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-2xl">
              🏆
            </div>
            <div>
              <p className="font-semibold group-hover:text-cyan-500 transition-colors">
                View Achievements
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                See your earned badges and recognitions
              </p>
            </div>
          </Link>
          <Link
            to="/app/leaderboard"
            className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl hover:shadow-lg transition-all group"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-2xl">
              📊
            </div>
            <div>
              <p className="font-semibold group-hover:text-cyan-500 transition-colors">
                Check Leaderboard
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                See where you rank among members
              </p>
            </div>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
