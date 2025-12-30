import Sidebar from "../../components/Sidebar";
import { useAchievements } from "../../context/AchievementContext";

export default function Achievements() {
  const { achievements } = useAchievements();

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <div style={{ flex: 1, padding: "40px" }}>
        <h1>Achievements</h1>

        {achievements.length === 0 && <p>No achievements yet.</p>}

        {achievements.map((a: any) => (
          <div key={a.id} style={{ padding: 10, borderBottom: "1px solid #ddd" }}>
            <strong>{a.user}</strong> – {a.name}
          </div>
        ))}
      </div>
    </div>
  );
}
