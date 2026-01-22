import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { eventGalleryAPI } from "../../utils/api";
import { useEvents } from "../../context/EventContext";

export default function GalleryCommittee() {
  const { events } = useEvents();

  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

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
      console.log("🟢 Gallery items:", data);
      setItems(data);
    } catch (err) {
      console.error("❌ Failed to load gallery", err);
    } finally {
      setLoading(false);
    }
  };

  const validate = () => {
    const e: any = {};
    if (!formData.title.trim()) e.title = "Title required";
    if (!imageFile) e.image = "Image required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const form = new FormData();
    form.append("photo", imageFile as File);
    form.append("title", formData.title);
    form.append("description", formData.description);
    if (formData.eventId) form.append("eventId", formData.eventId);

    const res = await fetch("http://localhost:5000/api/upload/committee", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: form,
    });

    if (!res.ok) {
      const err = await res.json();
      console.error("❌ Upload error:", err);
      return;
    }

    setShowForm(false);
    setFormData({ title: "", description: "", eventId: "" });
    setImageFile(null);
    await loadItems();
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-cyan-400">Event Gallery</h1>
          <p className="text-slate-400">Manage event photos</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-cyan-500 px-6 py-3 rounded-xl font-bold text-white"
        >
          + Add Photo
        </button>
      </div>

      {/* FORM */}
      <AnimatePresence>
        {showForm && (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-slate-900 p-6 rounded-2xl mb-10 space-y-4"
          >
            <input
              placeholder="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full p-3 rounded bg-slate-800 text-white"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="text-white"
            />
            <button className="bg-blue-600 px-5 py-2 rounded text-white">
              Upload
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {/* GALLERY */}
      {loading && <p className="text-slate-400">Loading...</p>}

      {!loading && items.length === 0 && (
        <p className="text-slate-400">No images yet.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item) => (
          <div
            key={item._id}
            className="rounded-2xl overflow-hidden bg-slate-900 shadow-lg"
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-white font-bold">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
