import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { eventGalleryAPI } from "../../utils/api";
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

  const loadItems = async () => {
    try {
      setLoading(true);
      const data = await eventGalleryAPI.getAll();
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

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure?")) {
      try {
        await eventGalleryAPI.delete(id);
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
      </motion.div>

      {/* Grid */}
      {loading ? (
        <div className="text-center py-20 text-slate-500">Loading gallery...</div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 text-slate-500 bg-slate-100 dark:bg-slate-900/50 rounded-2xl">
          No photos found.
        </div>
      ) : (
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item: any, index: number) => (
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
                    {item.description && (
                      <p className="text-white text-sm mt-1">{item.description}</p>
                    )}
                  </div>
                  {user && (user.role === "admin" || user.role === "committee") && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item._id || item.id);
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
