import { useEvents } from "../../context/EventContext";

export default function Events() {
  const { events } = useEvents();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-10">
      <h1 className="text-4xl font-bold text-cyan-400 mb-8">
        Club Events
      </h1>

      {events.length === 0 && (
        <p className="text-slate-400">No events announced yet.</p>
      )}

      <div className="grid grid-cols-2 gap-8">
        {events.map((e: any) => (
          <div
            key={e.id}
            className="bg-slate-900 p-6 rounded-xl shadow hover:scale-105 transition"
          >
            <h2 className="text-xl font-semibold">{e.title}</h2>
            <p className="text-slate-400 mt-2">{e.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
