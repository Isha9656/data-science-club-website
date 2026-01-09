import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useAchievements } from "../../context/AchievementContext";
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

export default function AchievementsCommittee() {
  const { achievements, addAchievement, updateAchievement, deleteAchievement, loading } = useAchievements();
  const { members } = useMembers();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    user: "",
    description: "",
  });
  const [errors, setErrors] = useState<any>({});

  const validate = () => {
    const newErrors: any = {};
    if (!formData.name.trim()) {
      newErrors.name = "Achievement name is required";
    }
    if (!formData.user) {
      newErrors.user = "User is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      if (editingId) {
        await updateAchievement(editingId, formData);
      } else {
        await addAchievement(formData.name, formData.user, formData.description);
      }
      setFormData({ name: "", user: "", description: "" });
      setShowForm(false);
      setEditingId(null);
    } catch (error) {
      console.error("Failed to save achievement:", error);
    }
  };

  const handleEdit = (achievement: any) => {
    setEditingId(achievement._id || achievement.id);
    setFormData({
      name: achievement.name,
      user: typeof achievement.user === 'object' ? achievement.user._id || achievement.user.id : achievement.user,
      description: achievement.description || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this achievement?")) {
      try {
        await deleteAchievement(id);
      } catch (error) {
        console.error("Failed to delete achievement:", error);
      }
    }
  };

  const handleCancel = () => {
    setFormData({ name: "", user: "", description: "" });
    setShowForm(false);
    setEditingId(null);
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
            Achievements Management
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Manage and track member achievements
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
        >
          + Add Achievement
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 backdrop-blur-sm"
          >
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              {editingId ? "Edit Achievement" : "Add New Achievement"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm text-slate-600 dark:text-slate-400 mb-2 font-medium">
                  Achievement Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: "" });
                  }}
                  className={`w-full bg-slate-50 dark:bg-slate-950 border ${
                    errors.name ? "border-red-500" : "border-slate-200 dark:border-slate-800"
                  } rounded-xl p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition`}
                  placeholder="Achievement name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm text-slate-600 dark:text-slate-400 mb-2 font-medium">
                  Member *
                </label>
                <select
                  value={formData.user}
                  onChange={(e) => {
                    setFormData({ ...formData, user: e.target.value });
                    if (errors.user) setErrors({ ...errors, user: "" });
                  }}
                  className={`w-full bg-slate-50 dark:bg-slate-950 border ${
                    errors.user ? "border-red-500" : "border-slate-200 dark:border-slate-800"
                  } rounded-xl p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition`}
                >
                  <option value="">Select a member</option>
                  {members.map((m: any) => (
                    <option key={m._id || m.id} value={m._id || m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>
                {errors.user && <p className="text-red-500 text-sm mt-1">{errors.user}</p>}
              </div>
              <div>
                <label className="block text-sm text-slate-600 dark:text-slate-400 mb-2 font-medium">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                  rows={3}
                  placeholder="Achievement description"
                />
              </div>
              <div className="flex gap-4">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  {editingId ? "Update Achievement" : "Add Achievement"}
                </motion.button>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCancel}
                  className="bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-300 dark:hover:bg-slate-700 transition-all"
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="text-center py-20 text-slate-500">Loading achievements...</div>
      ) : achievements.length === 0 ? (
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center"
        >
          <p className="text-lg text-slate-500 dark:text-slate-400">
            No achievements found.
          </p>
        </motion.div>
      ) : (
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {achievements.map((achievement: any, index: number) => (
            <motion.div
              key={achievement._id || achievement.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 hover:shadow-2xl transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold group-hover:text-cyan-500 transition-colors">
                    {achievement.name}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {typeof achievement.user === 'object' ? achievement.user.name : 'Unknown'}
                  </p>
                </div>
              </div>
              {achievement.description && (
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  {achievement.description}
                </p>
              )}
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleEdit(achievement)}
                  className="flex-1 bg-cyan-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-cyan-400 transition-all"
                >
                  Edit
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDelete(achievement._id || achievement.id)}
                  className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-400 transition-all"
                >
                  Delete
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}

