import { useEvents } from "../../context/EventContext";
import { useState } from "react";
import { useAchievements } from "../../context/AchievementContext";

export default function AdminDashboard() {
  const { addEvent } = useEvents();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const { addAchievement } = useAchievements();
  const [name, setName] = useState("");
  const [user, setUser] = useState("");

  return (
    <div style={{ padding: 40 }}>
      <h1>Committee Panel</h1>

      <h3>Create Event</h3>
        <input placeholder="Event title" onChange={(e) => setTitle(e.target.value)} />
        <input type="date" onChange={(e) => setDate(e.target.value)} />
        <button onClick={() => addEvent(title, date)}>Add</button>

      <h3>Add Achievement</h3>
        <input placeholder="Achievement" onChange={(e) => setName(e.target.value)} />
        <input placeholder="Member Name" onChange={(e) => setUser(e.target.value)} />
        <button onClick={() => addAchievement(name, user)}>Publish</button>
    </div>
  );
}
