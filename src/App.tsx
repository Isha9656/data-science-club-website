import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Members from "./pages/public/Members";
import Events from "./pages/public/Events";

// Member
import Dashboard from "./pages/member/Dashboard";
import MyEvents from "./pages/member/MyEvents";
import Achievements from "./pages/member/Achievements";
import Leaderboard from "./pages/member/Leaderboard";
import Profile from "./pages/member/Profile";
import Directory from "./pages/member/Directory";
import Analytics from "./pages/member/Analytics";

// Shared
import Gallery from "./pages/shared/Gallery";

// Layouts
import MemberLayout from "./layouts/MemberLayout";
import AdminLayout from "./layouts/AdminLayout";

// Admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import EventsAdmin from "./pages/admin/EventsAdmin";
import MembersAdmin from "./pages/admin/MembersAdmin";
import AchievementsAdmin from "./pages/admin/AchievementsAdmin";

// Auth
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/members" element={<Members />} />
      <Route path="/events" element={<Events />} />

      {/* Member */}
      <Route
        path="/app"
        element={
          <ProtectedRoute role="member">
            <MemberLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="events" element={<MyEvents />} />
        <Route path="achievements" element={<Achievements />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="directory" element={<Directory />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="gallery" element={<Gallery />} />
      </Route>

      {/* Admin */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="events" element={<EventsAdmin />} />
        <Route path="members" element={<MembersAdmin />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="achievements" element={<AchievementsAdmin />} />
      </Route>
    </Routes>
  );
}
