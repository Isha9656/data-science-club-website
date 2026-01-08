import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { galleryAPI } from "../../utils/api";
import { useAuth } from "../../context/AuthContext";

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

export default function Gallery() {
  const { user } = useAuth();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "event" | "festival">("all");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
    category: "event",
  });

  const loadItems = async () => {
    try {
      setLoading(true);
      const data = await galleryAPI.getAll();
      setItems(data);
    } catch (error) {
      console.error("Failed to load gallery:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const filteredItems = filter === "all" 
    ? items 
    : items.filter((item) => item.category === filter);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await galleryAPI.create(formData);
      await loadItems();
      setShowForm(false);
      setFormData({ title: "", imageUrl: "", category: "event" });
    } catch (error) {
      alert("Failed to add item");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure?")) {
      try {
        await galleryAPI.delete(id);
        setItems(items.filter((item) => item._id !== id));
      } catch (error) {
        alert("Failed to delete item");
      }
    }
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
            Gallery
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Explore our events and festival memories
          </p>
        </div>
        {user && user.role === "admin" && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2 rounded-xl font-bold shadow-lg"
          >
            + Add Photo
          </motion.button>
        )}
      </motion.div>

      {/* Filters */}
      <motion.div variants={itemVariants} className="flex gap-3">
        {(["all", "event", "festival"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-6 py-2.5 rounded-xl font-medium transition capitalize ${
              filter === f
                ? "bg-cyan-500 text-black"
                : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700"
            }`}
          >
            {f === "all" ? "All Photos" : `${f}s`}
          </button>
        ))}
      </motion.div>

      {/* Admin Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Title"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <input
                  type="url"
                  placeholder="Image URL"
                  required
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="event">Event</option>
                  <option value="festival">Festival</option>
                </select>
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-cyan-500 text-white px-6 py-2 rounded-xl font-bold hover:bg-cyan-400 transition"
                >
                  Save
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid */}
      {loading ? (
        <div className="text-center py-20 text-slate-500">Loading gallery...</div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-20 text-slate-500 bg-slate-100 dark:bg-slate-900/50 rounded-2xl">
          No photos found.
        </div>
      ) : (
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item._id || index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="group relative aspect-video bg-slate-200 dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-white font-bold text-lg">{item.title}</h3>
                    <span className="text-xs text-cyan-400 uppercase font-bold tracking-wider">
                      {item.category}
                    </span>
                  </div>
                  {user && user.role === "admin" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item._id);
                      }}
                      className="bg-red-500/20 text-red-400 p-2 rounded-lg hover:bg-red-500 hover:text-white transition"
                    >
                      🗑
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
