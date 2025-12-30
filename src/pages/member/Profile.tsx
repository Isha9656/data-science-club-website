import Sidebar from "../../components/Sidebar";
import { useProfile } from "../../context/ProfileContext";
import { useState } from "react";

export default function Profile() {
  const { profile, updateProfile } = useProfile();

  const [name, setName] = useState(profile.name);
  const [skills, setSkills] = useState(profile.skills);
  const [github, setGithub] = useState(profile.github);

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-200">
      <Sidebar />

      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>

        <div className="grid grid-cols-2 gap-8">

          {/* Edit Card */}
          <div className="bg-slate-900 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

            <div className="flex flex-col gap-4">
              <input
                className="bg-slate-800 p-3 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />

              <input
                className="bg-slate-800 p-3 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="Skills (Python, ML, SQL...)"
              />

              <input
                className="bg-slate-800 p-3 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                placeholder="GitHub link"
              />

              <button
                onClick={() => updateProfile({ name, skills, github })}
                className="bg-cyan-500 text-black py-2 rounded hover:bg-cyan-400 transition"
              >
                Save Profile
              </button>
            </div>
          </div>

          {/* Preview Card */}
          <div className="bg-slate-900 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Preview</h2>

            <div className="space-y-2">
              <p className="text-cyan-400 text-lg font-semibold">
                {profile.name}
              </p>
              <p className="text-slate-400">{profile.skills}</p>
              {profile.github && (
                <a
                  href={profile.github}
                  className="text-blue-400 hover:underline"
                >
                  {profile.github}
                </a>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
