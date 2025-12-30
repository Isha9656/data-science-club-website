import Sidebar from "../../components/Sidebar";
import { useAchievements } from "../../context/AchievementContext";

export default function Leaderboard() {
  const { achievements } = useAchievements();

  const scores: Record<string, number> = {};
  achievements.forEach((a: any) => {
    scores[a.user] = (scores[a.user] || 0) + 1;
  });

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <div style={{ flex: 1, padding: "40px" }}>
        <h1>Leaderboard</h1>

        {Object.keys(scores).length === 0 && <p>No rankings yet.</p>}

        {Object.entries(scores).map(([user, score]) => (
          <div key={user} style={{ padding: 10, borderBottom: "1px solid #ddd" }}>
            {user} — {score} points
          </div>
        ))}
      </div>
    </div>
  );
}
