import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold text-cyan-400">
        Data Science Club
      </h1>
      <p className="text-slate-400 mt-4">
        Building AI, Data, and future leaders
      </p>

      <div className="flex gap-6 mt-10">
        <Link
          to="/login"
          className="bg-cyan-500 text-black px-6 py-3 rounded-lg hover:bg-cyan-400 transition"
        >
          Join the Club
        </Link>

        <Link
          to="/members"
          className="border border-cyan-500 text-cyan-400 px-6 py-3 rounded-lg hover:bg-cyan-500 hover:text-black transition"
        >
          Meet Our Members
        </Link>
      </div>
    </div>
  );
}
