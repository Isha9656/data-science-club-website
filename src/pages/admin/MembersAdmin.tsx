import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useMembers } from "../../context/MembersContext";
import { Link } from "react-router-dom";

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

type MemberFormData = {
  name: string;
  skills: string;
  github: string;
  email: string;
  phone: string;
  course: string;
  year: string;
};

export default function MembersAdmin() {
  const { members, addMember, updateMember, deleteMember, loading } = useMembers();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<MemberFormData>({
    name: "",
    skills: "",
    github: "",
    email: "",
    phone: "",
    course: "",
    year: "",
  });
  const [errors, setErrors] = useState<any>({});

  const validate = () => {
    const newErrors: any = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@marwadiuniversity\.ac\.in$/;
    const phoneRegex = /^\d{10}$/;
    const nameRegex = /^[a-zA-Z\s]+$/;
    const urlRegex = /^https?:\/\/.+/;

    if (!formData.name.trim()) {
        newErrors.name = "Name is required";
    } else if (!nameRegex.test(formData.name)) {
        newErrors.name = "Name must contain only letters";
    }

    if (formData.email && !emailRegex.test(formData.email)) newErrors.email = "Email must be from marwadiuniversity.ac.in";
    if (formData.phone && !phoneRegex.test(formData.phone)) newErrors.phone = "Phone must be exactly 10 digits";
    if (formData.github && !urlRegex.test(formData.github)) newErrors.github = "Invalid URL (must start with http/https)";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({
      name: "",
      skills: "",
      github: "",
      email: "",
      phone: "",
      course: "",
      year: "",
    });
    setErrors({});
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (editingId) {
      await updateMember(editingId, formData);
    } else {
      await addMember(formData);
    }

    resetForm();
    setShowForm(false);
  };

  const handleCancel = () => {
    resetForm();
    setShowForm(false);
  };

  const handleEdit = (member: any) => {
    setFormData({
      name: member.name || "",
      skills: member.skills || "",
      github: member.github || "",
      email: member.email || "",
      phone: member.phone || "",
      course: member.course || "",
      year: member.year || "",
    });
    setEditingId(member._id || String(member.id));
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    await deleteMember(id);
    if (editingId === id) {
      resetForm();
      setShowForm(false);
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
            Committee Members
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Manage all club members and their information
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-slate-600 dark:text-slate-400">
            Total:{" "}
            <span className="font-bold text-slate-900 dark:text-white text-xl">
              {members.length}
            </span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
          >
            + Add New Member
          </motion.button>
        </div>
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
              {editingId ? "Edit Committee Member" : "Add New Committee Member"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-slate-600 dark:text-slate-400 mb-2 font-medium">
                    Full Name *
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
                    placeholder="Enter full name"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm text-slate-600 dark:text-slate-400 mb-2 font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: "" });
                    }}
                    className={`w-full bg-slate-50 dark:bg-slate-950 border ${
                      errors.email ? "border-red-500" : "border-slate-200 dark:border-slate-800"
                    } rounded-xl p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition`}
                    placeholder="email@marwadiuniversity.ac.in"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm text-slate-600 dark:text-slate-400 mb-2 font-medium">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (errors.phone) setErrors({ ...errors, phone: "" });
                    }}
                    className={`w-full bg-slate-50 dark:bg-slate-950 border ${
                      errors.phone ? "border-red-500" : "border-slate-200 dark:border-slate-800"
                    } rounded-xl p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition`}
                    placeholder="+91 00000 00000"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm text-slate-600 dark:text-slate-400 mb-2 font-medium">
                    GitHub URL *
                  </label>
                  <input
                    type="url"
                    value={formData.github}
                    onChange={(e) => {
                      setFormData({ ...formData, github: e.target.value });
                      if (errors.github) setErrors({ ...errors, github: "" });
                    }}
                    className={`w-full bg-slate-50 dark:bg-slate-950 border ${
                      errors.github ? "border-red-500" : "border-slate-200 dark:border-slate-800"
                    } rounded-xl p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition`}
                    placeholder="https://github.com/username"
                  />
                  {errors.github && <p className="text-red-500 text-sm mt-1">{errors.github}</p>}
                </div>
                <div>
                  <label className="block text-sm text-slate-600 dark:text-slate-400 mb-2 font-medium">
                    Course
                  </label>
                  <input
                    type="text"
                    value={formData.course}
                    onChange={(e) =>
                      setFormData({ ...formData, course: e.target.value })
                    }
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                    placeholder="B.Tech Data Science"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-600 dark:text-slate-400 mb-2 font-medium">
                    Year
                  </label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) =>
                      setFormData({ ...formData, year: e.target.value })
                    }
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                    placeholder="3rd Year"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-slate-600 dark:text-slate-400 mb-2 font-medium">
                  Skills *
                </label>
                <textarea
                  required
                  value={formData.skills}
                  onChange={(e) =>
                    setFormData({ ...formData, skills: e.target.value })
                  }
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                  rows={3}
                  placeholder="Python, Machine Learning, SQL, Power BI..."
                />
              </div>
              <div className="flex gap-4">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  Add Member
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
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center"
        >
          <p className="text-lg text-slate-500 dark:text-slate-400">
            Loading members...
          </p>
        </motion.div>
      ) : members.length === 0 ? (
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center"
        >
          <p className="text-lg text-slate-500 dark:text-slate-400">
            No members found.
          </p>
        </motion.div>
      ) : (
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {members.map((member: any, index: number) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 hover:shadow-2xl transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold group-hover:text-cyan-500 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    ID: {member._id || member.id}
                  </p>
                </div>
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-500 flex items-center justify-center text-lg font-black text-white shadow-lg"
                >
                  {member.name?.charAt(0) || "M"}
                </motion.div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
                    Contact
                  </p>
                  <p className="text-sm">{member.email || "Not provided"}</p>
                  <p className="text-sm">{member.phone || "Not provided"}</p>
                </div>

                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
                    Course Details
                  </p>
                  <p className="text-sm font-medium">
                    {member.course || "Not specified"}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {member.year || "Not specified"}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
                    Skills
                  </p>
                  <p className="text-sm">{member.skills || "Not specified"}</p>
                </div>

                <div className="flex items-center justify-between gap-3 pt-2">
                  <div className="flex gap-2">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleEdit(member)}
                      className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                    >
                      Edit
                    </motion.button>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(member._id || String(member.id))}
                      className="px-3 py-1 rounded-lg text-xs font-semibold bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                    >
                      Delete
                    </motion.button>
                  </div>
                </div>

                <div>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-500 hover:text-cyan-400 text-sm font-bold inline-flex items-center gap-1"
                  >
                    View GitHub →
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
