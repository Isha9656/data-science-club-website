import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../logo.png";

export default function PublicNavbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full flex justify-between items-center px-6 md:px-10 lg:px-16 py-4 md:py-6 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50 text-white sticky top-0 z-50"
    >
      <Link to="/" className="flex items-center gap-3 group">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          className="w-10 h-10 md:w-12 md:h-12"
        >
          <img src={logo} alt="Data Science Club Logo" className="w-full h-full object-contain" />
        </motion.div>
        <h2 className="text-lg md:text-xl lg:text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:to-blue-300 transition-all">
          Data Science Club
        </h2>
      </Link>

      <div className="flex gap-4 md:gap-6 lg:gap-8 items-center">
        {[
          { to: "/", label: "Home" },
          { to: "/events", label: "Events" },
          { to: "/members", label: "Members" },
          { to: "/login", label: "Login" },
        ].map((item, i) => (
          <Link key={item.to} to={item.to}>
            <motion.span
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              whileHover={{ y: -2 }}
              className="text-sm md:text-base font-semibold text-slate-300 hover:text-cyan-400 transition-colors relative group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300" />
            </motion.span>
          </Link>
        ))}
      </div>
    </motion.nav>
  );
}
