import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/member/Dashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import MyEvents from "./pages/member/MyEvents";
import Achievements from "./pages/member/Achievements";
import Leaderboard from "./pages/member/Leaderboard";
import Profile from "./pages/member/Profile";
import Directory from "./pages/member/Directory";
import Members from "./pages/public/Members";





export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/app/achievements" element={<ProtectedRoute role="member"><Achievements /></ProtectedRoute>} />
      <Route path="/app/leaderboard" element={<ProtectedRoute role="member"><Leaderboard /></ProtectedRoute>} />
      <Route path="/app/events" element={<ProtectedRoute role="member"><MyEvents /></ProtectedRoute>}/>
      <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>}/>
      <Route path="/app/profile" element={<ProtectedRoute role="member"><Profile /></ProtectedRoute>}/>
      <Route path="/app/directory"  element={<ProtectedRoute role="member"><Directory /></ProtectedRoute>}/>
      <Route path="/members"  element={<Members />} />

    </Routes>
  );
}
