import { Routes, Route, Navigate } from "react-router-dom";

// Public
import Home from "./pages/Home";
import Login from "./pages/Login";
import Members from "./pages/public/Members";
import Events from "./pages/public/Events";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";

// Member
import MemberLayout from "./layouts/MemberLayout";
import Dashboard from "./pages/member/Dashboard";
import MyEvents from "./pages/member/MyEvents";
import Achievements from "./pages/member/Achievements";
import Leaderboard from "./pages/member/Leaderboard";
import Profile from "./pages/member/Profile";
import Directory from "./pages/member/Directory";
import Analytics from "./pages/member/Analytics";

// Shared
import Gallery from "./pages/shared/Gallery";

// Committee
import CommitteeLayout from "./layouts/CommitteeLayout";
import CommitteeDashboard from "./pages/committee/CommitteeDashboard";
import EventsCommittee from "./pages/committee/EventsCommittee";
import GalleryCommittee from "./pages/committee/GalleryCommittee";
import AchievementsCommittee from "./pages/committee/AchievementsCommittee";

// Admin
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import EventsAdmin from "./pages/admin/EventsAdmin";
import MembersAdmin from "./pages/admin/MembersAdmin";
import AchievementsAdmin from "./pages/admin/AchievementsAdmin";

// Guards (OUTLET BASED)
import ProtectedRoute from "./components/ProtectedRoute";
import CommitteeRoute from "./components/CommitteeRoute";
import AdminRoute from "./components/AdminRoute";

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/members" element={<Members />} />
      <Route path="/events" element={<Events />} />

      {/* Member */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<MemberLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="events" element={<MyEvents />} />
          <Route path="achievements" element={<Achievements />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="directory" element={<Directory />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="gallery" element={<Gallery />} />
        </Route>
      </Route>

      {/* Committee */}
      <Route element={<CommitteeRoute />}>
        <Route path="/committee" element={<CommitteeLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<CommitteeDashboard />} />
          <Route path="events" element={<EventsCommittee />} />
          <Route path="gallery" element={<GalleryCommittee />} />
          <Route path="achievements" element={<AchievementsCommittee />} />
        </Route>
      </Route>

      {/* Admin */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="events" element={<EventsAdmin />} />
          <Route path="members" element={<MembersAdmin />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="achievements" element={<AchievementsAdmin />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
