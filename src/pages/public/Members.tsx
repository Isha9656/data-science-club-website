import { useMembers } from "../../context/MembersContext";
import PublicNavbar from "../../components/PublicNavbar";

export default function Members() {
  const { members } = useMembers();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-200">
      <PublicNavbar />

      <div className="p-10">
        <h1 className="text-4xl font-bold text-cyan-500 mb-8">
          Our Members
        </h1>

        <div className="grid grid-cols-3 gap-6">
          {members.map((m: any) => (
            <div
              key={m.id}
              className="bg-gray-100 dark:bg-slate-900 p-6 rounded-xl shadow"
            >
              <h2 className="text-lg font-semibold">{m.name}</h2>
              <p className="text-slate-400">{m.skills}</p>
              <a className="text-blue-500" href={m.github}>
                GitHub
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
