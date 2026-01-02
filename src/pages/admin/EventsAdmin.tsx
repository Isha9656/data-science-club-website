import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useEvents } from "../../context/EventContext";
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

export default function EventsAdmin() {
  const { events, addEvent, updateEvent, deleteEvent } = useEvents();
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [formData, setFormData] = useState({ title: "", date: "" });
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const validate = () => {
    const newErrors: any = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.date) newErrors.date = "Date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (isEditing) {
      updateEvent(isEditing, formData.title, formData.date);
      setIsEditing(null);
    } else {
      addEvent(formData.title, formData.date);
    }
    setFormData({ title: "", date: "" });
    setShowForm(false);
  };

  const handleEdit = (event: any) => {
    setIsEditing(event.id);
    setFormData({ title: event.title, date: event.date });
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      deleteEvent(id);
    }
  };

  const handleCancel = () => {
    setIsEditing(null);
    setFormData({ title: "", date: "" });
    setShowForm(false);
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
            Manage Events
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Create, edit, and manage club events
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setShowForm(true);
            setIsEditing(null);
            setFormData({ title: "", date: "" });
          }}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
        >
          + Add Event
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
              {isEditing ? "Edit Event" : "Create New Event"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm text-slate-600 dark:text-slate-400 mb-2 font-medium">
                  Event Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => {
                    setFormData({ ...formData, title: e.target.value });
                    if (errors.title) setErrors({ ...errors, title: "" });
                  }}
                  className={`w-full bg-slate-50 dark:bg-slate-950 border ${
                    errors.title ? "border-red-500" : "border-slate-200 dark:border-slate-800"
                  } rounded-xl p-4 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition text-lg`}
                  placeholder="Enter event title"
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
              </div>
              <div>
                <label className="block text-sm text-slate-600 dark:text-slate-400 mb-2 font-medium">
                  Event Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => {
                    setFormData({ ...formData, date: e.target.value });
                    if (errors.date) setErrors({ ...errors, date: "" });
                  }}
                  className={`w-full bg-slate-50 dark:bg-slate-950 border ${
                    errors.date ? "border-red-500" : "border-slate-200 dark:border-slate-800"
                  } rounded-xl p-4 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition text-lg`}
                />
                {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
              </div>
              <div className="flex gap-4">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  {isEditing ? "Update Event" : "Create Event"}
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

      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden backdrop-blur-sm"
      >
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-2xl font-bold">All Events</h2>
        </div>
        {events.length === 0 ? (
          <div className="p-12 text-center text-slate-500 dark:text-slate-400">
            <p className="text-lg">No events created yet.</p>
            <p className="text-sm mt-2">
              Click "Add Event" to create your first event.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {events.map((event: any, index: number) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ x: 10 }}
                className="p-6 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold">{event.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">
                      {new Date(event.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleEdit(event)}
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-2.5 rounded-xl font-bold hover:shadow-lg transition-all"
                    >
                      Edit
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(event.id)}
                      className="bg-gradient-to-r from-red-500 to-rose-500 text-white px-6 py-2.5 rounded-xl font-bold hover:shadow-lg transition-all"
                    >
                      Delete
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
