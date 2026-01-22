import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { eventGalleryAPI } from "../../utils/api";
import { useEvents } from "../../context/EventContext";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function GalleryCommittee() {
  const { events } = useEvents();

  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventId: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    loadItems();
  }, []);

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

  const validate = () => {
    const newErrors: any = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!imageFile && !editingId) newErrors.image = "Image is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      let uploadedImageUrl = "";

      if (imageFile) {
        const form = new FormData();
        form.append("photo", imageFile);

        const res = await fetch("http://localhost:5000/api/upload/committee", {
          method: "POST",
          body: form,
        });

        const data = await res.json();
        uploadedImageUrl = data.photoUrl;
      }

      const payload: any = {
        title: formData.title,
        description: formData.description,
        eventId: formData.eventId || undefined,
        ...(uploadedImageUrl && { imageUrl: uploadedImageUrl }),
      };

      editingId
        ? await eventGalleryAPI.update(editingId, payload)
        : await eventGalleryAPI.create(payload);

      await loadItems();
      handleCancel();
    } catch (error) {
      console.error("Failed to save gallery item:", error);
    }
  };

  const handleEdit = (item: any) => {
    setEditingId(item._id || item.id);
    setFormData({
      title: item.title,
      description: item.description || "",
      eventId:
        typeof item.eventId === "object"
          ? item.eventId._id || item.eventId.id
          : item.eventId || "",
    });
    setImageFile(null);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this gallery item?")) return;
    try {
      await eventGalleryAPI.delete(id);
      setItems(items.filter((i) => i._id !== id && i.id !== id));
    } catch (error) {
      console.error("Failed to delete gallery item:", error);
    }
  };

  const handleCancel = () => {
    setFormData({ title: "", description: "", eventId: "" });
    setImageFile(null);
    setErrors({});
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-7xl mx-auto space-y-8"
    >
      {/* HEADER */}
      <motion.div variants={itemVariants} className="flex justify-between">
        <div>
          <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Event Gallery
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Manage event gallery photos
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-xl font-bold shadow hover:shadow-lg transition"
        >
          + Add Photo
        </button>
      </motion.div>

      {/* FORM */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-slate-700 dark:text-slate-300">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full mt-1 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title}</p>
                )}
              </div>

              <div>
                <label className="text-slate-700 dark:text-slate-300">
                  Image *
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setImageFile(e.target.files ? e.target.files[0] : null)
                  }
                  className="w-full mt-1 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
                {errors.image && (
                  <p className="text-red-500 text-sm">{errors.image}</p>
                )}
              </div>

              <div>
                <label className="text-slate-700 dark:text-slate-300">
                  Event (optional)
                </label>
                <select
                  value={formData.eventId}
                  onChange={(e) =>
                    setFormData({ ...formData, eventId: e.target.value })
                  }
                  className="w-full mt-1 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="">No event</option>
                  {events.map((event: any) => (
                    <option
                      key={event._id || event.id}
                      value={event._id || event.id}
                    >
                      {event.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-700 dark:text-slate-300">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full mt-1 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition"
                >
                  {editingId ? "Update" : "Add"}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white px-6 py-3 rounded-xl font-bold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* GALLERY GRID */}
      {!loading && (
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item._id || i}
              className="relative rounded-2xl overflow-hidden shadow-lg bg-slate-200 dark:bg-slate-800"
            >
              <img
                src={`http://localhost:5000${item.imageUrl}`}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/70 opacity-0 hover:opacity-100 transition flex justify-between p-4">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-white"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(item._id || item.id)}
                  className="text-red-400"
                >
                  🗑
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
