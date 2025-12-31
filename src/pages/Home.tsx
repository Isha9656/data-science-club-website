import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import PublicNavbar from "../components/PublicNavbar";

const AnimatedGrid = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0.3, 0.15, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

  return (
    <motion.div
      ref={gridRef}
      style={{ opacity, scale }}
      className="fixed inset-0 z-0 bg-[linear-gradient(rgba(15,23,42,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.4)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none"
    />
  );
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-[#050B18] to-slate-900 text-white overflow-hidden">
      <PublicNavbar />

      <AnimatedGrid />

      {/* Glow layers */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(6,182,212,0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(99,102,241,0.06) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(16,185,129,0.06) 0%, transparent 50%)
          `,
        }}
      />

      {/* CONTENT CONTAINER */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* HERO */}
        <motion.div
          style={{ y: heroY }}
          className="min-h-[85vh] flex flex-col items-center justify-center text-center"
        >
          <motion.div
            style={{ opacity: titleOpacity }}
            className="space-y-8 max-w-4xl"
          >
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-xl">
              Data Science Club
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
              Building production AI systems. Driving data-driven innovation.  
              Empowering the next generation of machine learning engineers.
            </p>
          </motion.div>
        </motion.div>

        {/* ACTION CARDS */}
        <div className="pb-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                to: "/login",
                title: "Join Community",
                desc: "Access exclusive workshops, projects, and networking opportunities",
                icon: "👤",
              },
              {
                to: "/members",
                title: "Our Members",
                desc: "500+ data scientists, ML engineers, and researchers",
                icon: "📊",
              },
              {
                to: "/events",
                title: "Upcoming Events",
                desc: "Hackathons, guest lectures, and technical workshops",
                icon: "📅",
              },
            ].map((card) => (
              <Link key={card.to} to={card.to}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group h-72 flex flex-col justify-between p-8 bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 hover:border-cyan-400/60 hover:bg-slate-900/70 rounded-2xl shadow-xl hover:shadow-cyan-500/10 transition-all duration-500"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 border border-cyan-400/30 rounded-2xl flex items-center justify-center text-2xl">
                    {card.icon}
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold group-hover:text-cyan-300 transition">
                      {card.title}
                    </h3>
                    <p className="text-slate-400 mt-3">{card.desc}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
