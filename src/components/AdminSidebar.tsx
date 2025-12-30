import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <div className="w-64 min-h-screen bg-gray-200 dark:bg-slate-900 text-slate-900 dark:text-slate-200 p-6">
      <h2 className="text-2xl font-bold text-cyan-500 mb-10">
        Committee
      </h2>

      <nav className="flex flex-col gap-4">
        <Link className="hover:text-cyan-500" to="/admin">
          Dashboard
        </Link>
        <Link className="hover:text-cyan-500" to="/admin/members">
          Members
        </Link>
      </nav>
    </div>
  );
}
