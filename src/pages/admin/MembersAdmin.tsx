import AdminSidebar from "../../components/AdminSidebar";
import { useMembers } from "../../context/MembersContext";

export default function MembersAdmin() {
  const { members } = useMembers();

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-200">
      <AdminSidebar />

      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-cyan-400 mb-8">
          Member Management
        </h1>

        <div className="grid grid-cols-3 gap-6">
          {members.map((m: any) => (
            <div key={m.id} className="bg-slate-900 p-6 rounded-xl">
              <h2 className="text-lg font-semibold text-cyan-400">
                {m.name}
              </h2>
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
