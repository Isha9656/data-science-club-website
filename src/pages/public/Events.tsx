import { useEvents } from "../../context/EventContext";
import PublicNavbar from "../../components/PublicNavbar";

export default function Events() {
  const { events } = useEvents();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-200">
      <PublicNavbar />

      <div className="p-10">
        <h1 className="text-4xl font-bold text-cyan-500 mb-8">
          Club Events
        </h1>

        <div className="grid grid-cols-2 gap-6">
          {events.map((e: any) => (
            <div
              key={e.id}
              className="bg-gray-100 dark:bg-slate-900 p-6 rounded-xl shadow"
            >
              <h2 className="text-xl font-semibold">{e.title}</h2>
              <p className="text-slate-400">{e.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
