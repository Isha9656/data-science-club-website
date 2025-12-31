import { useProfile } from "../../context/ProfileContext";
import { useState } from "react";

export default function Profile() {
  const { profile, updateProfile } = useProfile();

  const [name, setName] = useState(profile.name);
  const [skills, setSkills] = useState(profile.skills);
  const [github, setGithub] = useState(profile.github);
  const [email, setEmail] = useState(profile.email || "student@marwadiuniversity.ac.in");
  const [phone, setPhone] = useState(profile.phone || "+91 00000 00000");

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold tracking-tight">My Profile</h1>
        <button
          onClick={() => updateProfile({ name, skills, github, email, phone })}
          className="bg-cyan-500 text-black px-6 py-2.5 rounded-xl font-semibold hover:bg-cyan-400 transition"
        >
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Profile Card */}
        <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 flex flex-col items-center text-center space-y-6 transition-colors">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-4xl font-bold text-black shadow-xl">
            {name?.charAt(0) || "U"}
          </div>

          <div>
            <p className="text-2xl font-bold">{profile.name}</p>
            <p className="text-slate-600 dark:text-slate-400">
              Data Science Club Member
            </p>
          </div>

          <div className="w-full space-y-3 text-left">
            <Info label="Email" value={email} />
            <Info label="Phone" value={phone} />
            <Info label="GitHub" value={profile.github} />
          </div>

          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="w-full text-center bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 py-2.5 rounded-xl hover:border-cyan-400 transition"
          >
            View GitHub
          </a>
        </div>

        {/* Edit Section */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-10 transition-colors">
          <h2 className="text-2xl font-semibold mb-8">
            Edit Profile
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field label="Full Name" value={name} setValue={setName} />
            <Field label="College Email" value={email} setValue={setEmail} />
            <Field label="Contact Number" value={phone} setValue={setPhone} />
            <Field label="GitHub URL" value={github} setValue={setGithub} />
          </div>

          <div className="mt-6">
            <label className="text-sm text-slate-600 dark:text-slate-400">
              Skills
            </label>
            <textarea
              className="w-full mt-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 focus:ring-2 focus:ring-cyan-500 outline-none transition"
              rows={4}
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="Python, Machine Learning, SQL, Power BI..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, setValue }: any) {
  return (
    <div>
      <label className="text-sm text-slate-600 dark:text-slate-400">
        {label}
      </label>
      <input
        className="w-full mt-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 focus:ring-2 focus:ring-cyan-500 outline-none transition"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

function Info({ label, value }: any) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-sm break-all">{value || "Not provided"}</p>
    </div>
  );
}
