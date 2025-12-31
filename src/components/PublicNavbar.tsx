import { Link } from "react-router-dom";

export default function PublicNavbar() {
  return (
    <div className="w-full flex justify-between items-center px-10 py-4 bg-gray-100 dark:bg-slate-900 text-slate-900 dark:text-slate-200 shadow">
      <h2 className="text-xl font-bold text-cyan-500">
        Data Science Club
      </h2>

      <div className="flex gap-6">
        <Link className="hover:text-cyan-500" to="/">Home</Link>
        <Link className="hover:text-cyan-500" to="/events">Events</Link>
        <Link className="hover:text-cyan-500" to="/members">Members</Link>
        <Link className="hover:text-cyan-500" to="/login">Login</Link>
      </div>
    </div>
  );
}
