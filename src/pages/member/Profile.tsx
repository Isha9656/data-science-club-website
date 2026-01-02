import { motion } from "framer-motion";
import { useProfile } from "../../context/ProfileContext";
import { useState, useRef } from "react";
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

export default function Profile() {
  const { profile, updateProfile } = useProfile();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(profile.name);
  const [skills, setSkills] = useState(profile.skills);
  const [github, setGithub] = useState(profile.github);
  const [email, setEmail] = useState(
    profile.email || "student@marwadiuniversity.ac.in"
  );
  const [phone, setPhone] = useState(profile.phone || "+91 00000 00000");
  const [photo, setPhoto] = useState(profile.photo || "");
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const validate = () => {
    const newErrors: any = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@marwadiuniversity\.ac\.in$/;
    const phoneRegex = /^\d{10}$/;
    const nameRegex = /^[a-zA-Z\s]+$/;
    const urlRegex = /^https?:\/\/.+/;

    if (!nameRegex.test(name)) newErrors.name = "Name must contain only letters";
    if (!emailRegex.test(email)) newErrors.email = "Email must be from marwadiuniversity.ac.in";
    if (!phoneRegex.test(phone)) newErrors.phone = "Phone must be exactly 10 digits";
    if (github && !urlRegex.test(github)) newErrors.github = "Invalid URL (must start with http/https)";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!validate()) return;
    updateProfile({ name, skills, github, email, phone, photo });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-6xl mx-auto space-y-10"
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-5xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
            My Profile
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Manage your personal information and preferences
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSave}
          className={`px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-all ${
            saved
              ? "bg-gradient-to-r from-green-500 to-emerald-500"
              : "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400"
          }`}
        >
          {saved ? "✓ Saved!" : "Save Changes"}
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 flex flex-col items-center text-center space-y-6 transition-all hover:shadow-2xl"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="relative group cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            {photo ? (
               <img src={photo} alt="Profile" className="w-32 h-32 rounded-full object-cover shadow-2xl" />
            ) : (
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-500 flex items-center justify-center text-5xl font-black text-white shadow-2xl">
                    {name?.charAt(0) || "U"}
                </div>
            )}
             <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-sm font-bold">Change Photo</span>
            </div>
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handlePhotoChange}
            />
          </motion.div>

          <div>
            <p className="text-2xl font-bold">{name}</p>
            <p className="text-slate-600 dark:text-slate-400">
              Data Science Club Member
            </p>
          </div>

          <div className="w-full space-y-3 text-left">
            <Info label="Email" value={email} />
            <Info label="Phone" value={phone} />
            <Info label="GitHub" value={github} />
          </div>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={github}
            target="_blank"
            rel="noreferrer"
            className="w-full text-center bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-950 dark:to-slate-900 border border-slate-200 dark:border-slate-800 py-3 rounded-xl hover:border-cyan-400 hover:shadow-lg transition-all font-semibold"
          >
            View GitHub →
          </motion.a>
        </motion.div>

        {/* Edit Section */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-800 rounded-3xl p-10 transition-all backdrop-blur-sm"
        >
          <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Edit Profile
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field label="Full Name" value={name} setValue={setName} error={errors.name} />
            <Field
              label="College Email"
              value={email}
              setValue={setEmail}
              error={errors.email}
            />
            <Field
              label="Contact Number"
              value={phone}
              setValue={setPhone}
              error={errors.phone}
            />
            <Field label="GitHub URL" value={github} setValue={setGithub} error={errors.github} />
          </div>

          <div className="mt-6">
            <label className="text-sm text-slate-600 dark:text-slate-400 font-medium">
              Skills
            </label>
            <textarea
              className="w-full mt-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
              rows={4}
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="Python, Machine Learning, SQL, Power BI..."
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function Field({ label, value, setValue, error }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <label className="text-sm text-slate-600 dark:text-slate-400 font-medium">
        {label}
      </label>
      <input
        className={`w-full mt-2 bg-slate-50 dark:bg-slate-950 border rounded-xl p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition ${error ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'}`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </motion.div>
  );
}

function Info({ label, value }: any) {
  return (
    <div>
      <p className="text-xs text-slate-500 font-medium">{label}</p>
      <p className="text-sm break-all mt-1">{value || "Not provided"}</p>
    </div>
  );
}
