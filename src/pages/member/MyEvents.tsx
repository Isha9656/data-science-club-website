import Sidebar from "../../components/Sidebar";
import { useEvents } from "../../context/EventContext";

export default function MyEvents() {
  const { events } = useEvents();

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <div style={{ flex: 1, padding: "40px" }}>
        <h1>Club Events</h1>

        {events.length === 0 && <p>No events yet.</p>}

        {events.map((e: any) => (
          <div key={e.id} style={{ padding: 10, borderBottom: "1px solid #ddd" }}>
            <strong>{e.title}</strong> – {e.date}
          </div>
        ))}
      </div>
    </div>
  );
}
