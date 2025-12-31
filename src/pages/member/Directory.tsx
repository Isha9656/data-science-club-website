import { useMembers } from "../../context/MembersContext";

export default function Directory() {
  const { members } = useMembers();

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight">
          Member Directory
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Explore the talent inside the Data Science Club.
        </p>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {members.map((m: any) => (
          <div
            key={m.id}
            className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 flex flex-col justify-between transition-colors hover:border-cyan-400"
          >
            {/* Avatar + Name */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-black font-bold text-xl">
                {m.name?.charAt(0)}
              </div>
              <div>
                <p className="text-lg font-semibold">{m.name}</p>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Club Member
                </p>
              </div>
            </div>

            {/* Skills */}
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
              {m.skills}
            </p>

            {/* Action */}
            <a
              href={m.github}
              target="_blank"
              rel="noreferrer"
              className="mt-auto text-center bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 py-2.5 rounded-xl hover:border-cyan-400 transition"
            >
              View GitHub
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
