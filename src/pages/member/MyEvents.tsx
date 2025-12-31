import { useEvents } from "../../context/EventContext";
import { useState } from "react";

export default function MyEvents() {
  const { events } = useEvents();
  const [joined, setJoined] = useState<number[]>([]);

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Events</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Discover and join upcoming club events.
        </p>
      </div>

      {/* Event List */}
      <div className="space-y-6">
        {events.map((e: any) => (
          <div
            key={e.id}
            className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex items-center justify-between transition-colors"
          >
            <div>
              <h2 className="text-xl font-semibold">{e.title}</h2>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                {e.date}
              </p>
            </div>

            <button
              onClick={() =>
                !joined.includes(e.id) && setJoined([...joined, e.id])
              }
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition ${
                joined.includes(e.id)
                  ? "bg-green-400 text-black"
                  : "bg-cyan-500 text-black hover:bg-cyan-400"
              }`}
            >
              {joined.includes(e.id) ? "Joined" : "Join"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
