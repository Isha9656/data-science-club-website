import Sidebar from "../../components/Sidebar";
import { useEvents } from "../../context/EventContext";
import { useState } from "react";

export default function MyEvents() {
  const { events } = useEvents();
  const [joined, setJoined] = useState<number[]>([]);

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-200">
      <Sidebar />
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6">Events</h1>

        {events.map((e: any) => (
          <div key={e.id} className="bg-slate-900 p-6 rounded-xl mb-4 flex justify-between">
            <div>
              <h2 className="text-xl">{e.title}</h2>
              <p className="text-slate-400">{e.date}</p>
            </div>

            <button
              onClick={() => setJoined([...joined, e.id])}
              className={`px-4 py-2 rounded ${
                joined.includes(e.id)
                  ? "bg-green-500 text-black"
                  : "bg-cyan-500 text-black"
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
