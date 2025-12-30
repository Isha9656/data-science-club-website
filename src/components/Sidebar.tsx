import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div style={{ width: 200, background: "#f4f4f4", height: "100vh", padding: 20 }}>
      <h3>DS Club</h3>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Link to="/app">Dashboard</Link>
        <Link to="/app/events">Events</Link>
        <Link to="/app/achievements">Achievements</Link>
        <Link to="/app/leaderboard">Leaderboard</Link>
        <Link to="/app/profile">Profile</Link>
        <Link to="/app/directory" className="hover:text-cyan-400">Members</Link>
      </div>
    </div>
  );
}
