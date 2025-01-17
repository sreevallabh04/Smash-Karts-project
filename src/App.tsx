import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

import { Car, History, BarChart } from "lucide-react";
import MatchForm from "./components/MatchForm";
import MatchHistory from "./components/MatchHistory";
import Statistics from "./components/Statistics";
import type { Match } from "./types";


function AppContent() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [view, setView] = useState<"form" | "history" | "stats">("form");

  const handleMatchSubmit = (match: Match) => {
    setMatches([...matches, match]);
    setView("history");
  };

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30"></div>
      <div
        className="absolute top-10 left-10 floating-car"
        style={{ animationDelay: "0s" }}
      >
        <Car size={48} className="text-blue-500 opacity-30" />
      </div>
      <div
        className="absolute top-20 right-20 floating-car"
        style={{ animationDelay: "2s" }}
      >
        <Car size={48} className="text-red-500 opacity-30" />
      </div>
      <div
        className="absolute bottom-20 left-20 floating-car"
        style={{ animationDelay: "4s" }}
      >
        <Car size={48} className="text-purple-500 opacity-30" />
      </div>

      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="max-w-6xl mx-auto relative z-10 p-8"
      >
        <header className="text-center mb-8">
          <motion.h1
            className="text-4xl font-bold mb-4 flex items-center justify-center gap-2 text-white"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Car className="text-blue-500" />
            <span className="neon-glow">Smash Karts Tracker</span>
            <UserButton></UserButton>
            <Car className="text-red-500" />
          </motion.h1>
          <motion.div
            className="flex justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setView("form")}
              className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-colors duration-300 ${
                view === "form"
                  ? "bg-blue-500 text-white neon-glow"
                  : "bg-white/10 text-blue-500 hover:bg-white/20"
              }`}
            >
              <Car />
              New Match
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setView("history")}
              className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-colors duration-300 ${
                view === "history"
                  ? "bg-blue-500 text-white neon-glow"
                  : "bg-white/10 text-blue-500 hover:bg-white/20"
              }`}
            >
              <History />
              History
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setView("stats")}
              className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-colors duration-300 ${
                view === "stats"
                  ? "bg-blue-500 text-white neon-glow"
                  : "bg-white/10 text-blue-500 hover:bg-white/20"
              }`}
            >
              <BarChart />
              Statistics
            </motion.button>
          </motion.div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            {view === "form" && <MatchForm onSubmit={handleMatchSubmit} />}
            {view === "history" && <MatchHistory matches={matches} />}
            {view === "stats" && <Statistics matches={matches} />}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default function App() {
  return (
<div >
      
<SignedIn>
        <AppContent/>
      </SignedIn>
        <div className="text-center">
          <SignedOut>
          <div className="relative min-h-screen bg-slate-900 overflow-hidden flex items-center justify-center">
  {/* Background Gradient */}
  <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-black to-slate-900"></div>

  {/* Floating Particles */}
  <div className="absolute inset-0 pointer-events-none">
    {Array.from({ length: 50 }).map((_, i) => (
      <div
        key={i}
        className="absolute w-2 h-2 bg-cyan-500 rounded-full animate-float"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${Math.random() * 5 + 5}s`,
        }}
      ></div>
    ))}
  </div>

  {/* Glowing Overlay */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,255,255,0.15)_0%,_transparent_80%)] pointer-events-none"></div>

  {/* Button Wrapper */}
  <div className="relative z-10 text-center">
    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 mb-8">
      Welcome to Smash Karts Tracker 🚀
    </h1>

    {/* Futuristic Button */}
    <SignInButton>
      <motion.button
        whileHover={{
          scale: 1.1,
          boxShadow: "0 0 20px 5px rgba(0, 200, 255, 0.9)",
        }}
        whileTap={{
          scale: 0.95,
          boxShadow: "0 0 10px 2px rgba(0, 150, 255, 0.8)",
        }}
        className="relative px-10 py-4 text-white text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 
                   bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-purple-600 hover:to-blue-500"
        style={{
          position: "relative",
          overflow: "hidden",
          zIndex: 1,
        }}
      >
        {/* Glowing Borders */}
        <div className="absolute inset-0 rounded-xl z-[-1]">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-teal-400 to-indigo-500 opacity-20 blur-xl"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          ></motion.div>
        </div>

        {/* Inner Glow Ring */}
        <div
          className="absolute inset-0 bg-[radial-gradient(circle,_rgba(0,255,255,0.5)_10%,_transparent_70%)] 
          rounded-xl opacity-30 pointer-events-none"
        ></div>

        {/* Button Text */}
        <span className="relative z-10">🚀 Sign In</span>
      </motion.button>
    </SignInButton>
  </div>
</div>


          </SignedOut>
        </div>
      
    </div>
  );
}