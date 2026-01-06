import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import PublicNavbar from "../components/PublicNavbar";
import logo from "../logo.png";

const AnimatedGrid = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0.4, 0.2, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

  return (
    <motion.div
      ref={gridRef}
      style={{ opacity, scale }}
      className="fixed inset-0 z-0 bg-[linear-gradient(rgba(6,182,212,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.15)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none"
    />
  );
};

const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0,
          }}
          animate={{
            y: [null, Math.random() * window.innerHeight - 100],
            x: [null, Math.random() * window.innerWidth - 100],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};

const FloatingLogo = () => {
  return (
    <motion.div
      animate={{ 
        y: [0, -15, 0],
        filter: ["drop-shadow(0 0 0px rgba(6,182,212,0))", "drop-shadow(0 0 20px rgba(6,182,212,0.3))", "drop-shadow(0 0 0px rgba(6,182,212,0))"]
      }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48"
    >
      <img src={logo} alt="Data Science Club Logo" className="w-full h-full object-contain" />
    </motion.div>
  );
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);
  const logoScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.5]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-[#050B18] to-slate-900 text-white overflow-hidden">
      <PublicNavbar />

      <AnimatedGrid />
      <FloatingParticles />

      {/* Enhanced Glow layers */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(6,182,212,0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(99,102,241,0.12) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(16,185,129,0.1) 0%, transparent 50%),
            radial-gradient(circle at 60% 60%, rgba(236,72,153,0.08) 0%, transparent 50%)
          `,
        }}
      />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* CONTENT CONTAINER */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        {/* HERO */}
        <motion.div
          style={{ y: heroY }}
          className="min-h-[90vh] flex flex-col items-center justify-center text-center py-20"
        >
          <motion.div
            style={{ opacity: logoOpacity, scale: logoScale }}
            className="mb-8"
          >
            <FloatingLogo />
          </motion.div>

          <motion.div
            style={{ opacity: titleOpacity }}
            className="space-y-8 max-w-5xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-2xl"
            >
              Data Science Club
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-lg md:text-xl lg:text-2xl text-slate-300 leading-relaxed px-4"
            >
              Building production AI systems. Driving data-driven innovation.
              <br />
              Empowering the next generation of machine learning engineers.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
            >
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl shadow-lg hover:shadow-cyan-500/50 transition-all text-lg"
                >
                  Get Started
                </motion.button>
              </Link>
              <Link to="/events">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-slate-800/50 backdrop-blur-xl border border-cyan-400/30 text-cyan-400 font-bold rounded-xl hover:border-cyan-400/60 hover:bg-slate-800/70 transition-all text-lg"
                >
                  Explore Events
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* STATS SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 px-4"
        >
          {[
            { number: "500+", label: "Active Members" },
            { number: "50+", label: "Events Hosted" },
            { number: "100+", label: "Projects Completed" },
            { number: "24/7", label: "Community Support" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.05 }}
              className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 text-center hover:border-cyan-400/60 transition-all"
            >
              <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-sm md:text-base text-slate-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ACTION CARDS */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="pb-32 px-4"
        >
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-center mb-16 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent"
          >
            Explore Our Platform
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {[
              {
                to: "/login",
                title: "Join Community",
                desc: "Access exclusive workshops, projects, and networking opportunities with industry experts",
                icon: "👤",
                gradient: "from-cyan-500 to-blue-500",
              },
              {
                to: "/members",
                title: "Our Members",
                desc: "Connect with 500+ data scientists, ML engineers, and researchers from top institutions",
                icon: "📊",
                gradient: "from-purple-500 to-pink-500",
              },
              {
                to: "/events",
                title: "Upcoming Events",
                desc: "Join hackathons, guest lectures, technical workshops, and networking sessions",
                icon: "📅",
                gradient: "from-green-500 to-emerald-500",
              },
            ].map((card, i) => (
              <Link key={card.to} to={card.to}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, duration: 0.6 }}
                  whileHover={{ y: -12, scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="group h-full min-h-[320px] flex flex-col justify-between p-8 bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 hover:border-cyan-400/60 hover:bg-slate-900/80 rounded-3xl shadow-xl hover:shadow-cyan-500/20 transition-all duration-500"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${card.gradient} rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg`}>
                    {card.icon}
                  </div>

                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-cyan-300 transition">
                      {card.title}
                    </h3>
                    <p className="text-slate-400 text-base md:text-lg leading-relaxed">
                      {card.desc}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-2 text-cyan-400 group-hover:text-cyan-300 transition-colors">
                    <span className="font-semibold">Learn More</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      {/* FOOTER */}
      <footer className="relative z-10 bg-slate-900 border-t border-slate-800 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <img src={logo} alt="DS Club" className="w-10 h-10 opacity-80" />
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} Data Science Club. All rights reserved.
            </p>
          </div>
          <div className="flex gap-6 text-slate-500">
            <a href="#" className="hover:text-cyan-400 transition-colors">Twitter</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">GitHub</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
