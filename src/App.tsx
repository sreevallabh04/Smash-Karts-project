import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, History, BarChart } from 'lucide-react';
import MatchForm from './components/MatchForm';
import MatchHistory from './components/MatchHistory';
import Statistics from './components/Statistics';
import type { Match } from './types';

function App() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [view, setView] = useState<'form' | 'history' | 'stats'>('form');

  const handleMatchSubmit = (match: Match) => {
    setMatches([...matches, match]);
    setView('history');
  };

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-grid opacity-30"></div>
      
      {/* Decorative Cars */}
      <div className="absolute top-10 left-10 floating-car" style={{ animationDelay: '0s' }}>
        <Car size={48} className="text-blue-500 opacity-30" />
      </div>
      <div className="absolute top-20 right-20 floating-car" style={{ animationDelay: '2s' }}>
        <Car size={48} className="text-red-500 opacity-30" />
      </div>
      <div className="absolute bottom-20 left-20 floating-car" style={{ animationDelay: '4s' }}>
        <Car size={48} className="text-purple-500 opacity-30" />
      </div>

      {/* Main Content */}
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
              onClick={() => setView('form')}
              className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-colors duration-300 ${
                view === 'form'
                  ? 'bg-blue-500 text-white neon-glow'
                  : 'bg-white/10 text-blue-500 hover:bg-white/20'
              }`}
            >
              <Car />
              New Match
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setView('history')}
              className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-colors duration-300 ${
                view === 'history'
                  ? 'bg-blue-500 text-white neon-glow'
                  : 'bg-white/10 text-blue-500 hover:bg-white/20'
              }`}
            >
              <History />
              History
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setView('stats')}
              className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-colors duration-300 ${
                view === 'stats'
                  ? 'bg-blue-500 text-white neon-glow'
                  : 'bg-white/10 text-blue-500 hover:bg-white/20'
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
            {view === 'form' && <MatchForm onSubmit={handleMatchSubmit} />}
            {view === 'history' && <MatchHistory matches={matches} />}
            {view === 'stats' && <Statistics matches={matches} />}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default App;