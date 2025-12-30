import Sidebar from "../../components/Sidebar";
import { useMembers } from "../../context/MembersContext";

export default function Directory() {
  const { members } = useMembers();

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-200">
      <Sidebar />

      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6">Member Directory</h1>

        <div className="grid grid-cols-2 gap-6">
          {members.map((m: any) => (
            <div key={m.id} className="bg-slate-900 p-5 rounded-xl shadow">
              <h3 className="text-lg font-semibold text-cyan-400">
                {m.name}
              </h3>
              <p className="text-slate-400">{m.skills}</p>
              <a className="text-blue-400" href={m.github}>
                GitHub
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
