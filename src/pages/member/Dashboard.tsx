import Sidebar from "../../components/Sidebar";

export default function Dashboard() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <div style={{ flex: 1, padding: "40px" }}>
        <h1>Member Dashboard</h1>
        <p>Overview of your activity and growth in the Data Science Club.</p>

        <div style={{ marginTop: 20 }}>
          <p>✔ Events Joined</p>
          <p>✔ Projects Built</p>
          <p>✔ Achievements Earned</p>
          <p>✔ Leaderboard Rank</p>
        </div>
      </div>
    </div>
  );
}
