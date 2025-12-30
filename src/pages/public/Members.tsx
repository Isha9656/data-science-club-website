import { useMembers } from "../../context/MembersContext";

export default function Members() {
  const { members } = useMembers();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-10">
      <h1 className="text-4xl font-bold text-cyan-400 mb-8">
        Our Members
      </h1>

      <div className="grid grid-cols-3 gap-8">
        {members.map((m: any) => (
          <div
            key={m.id}
            className="bg-slate-900 p-6 rounded-xl shadow hover:scale-105 transition"
          >
            <h2 className="text-xl font-semibold">{m.name}</h2>
            <p className="text-slate-400 mt-2">{m.skills}</p>
            <a
              href={m.github}
              className="text-blue-400 mt-3 block"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
