import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Trophy, Skull, Target, Star } from 'lucide-react';
import type { Match } from '../types';

interface MatchHistoryProps {
  matches: Match[];
}

export default function MatchHistory({ matches }: MatchHistoryProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <motion.h2
        initial={{ scale: 0.9, y: -10 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl font-bold mb-6 text-center text-blue-500"
      >
        Match History
      </motion.h2>

      {matches.length === 0 ? (
        <p className="text-center text-gray-600">No matches recorded yet.</p>
      ) : (
        matches.map((match) => (
          <motion.div
            key={match.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-md"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-400">
                {format(new Date(match.date), 'MMM dd, yyyy')}
              </span>
              <div className="flex items-center gap-2">
                <Trophy className="text-yellow-400" />
                <span className="font-semibold text-white">
                  Winner: {match[match.winner as 'team1' | 'team2'].name}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {(['team1', 'team2'] as const).map((teamKey) => {
                const team = match[teamKey]; // TypeScript understands teamKey is 'team1' or 'team2'
                return (
                  <div
                    key={teamKey}
                    className={`p-4 rounded-lg border-2 ${
                      match.winner === teamKey
                        ? 'bg-green-200/20 border-green-400'
                        : 'bg-red-200/20 border-red-400'
                    }`}
                  >
                    <h3 className="font-bold text-lg text-white mb-3">
                      {team.name}
                    </h3>
                    <div className="space-y-2">
                      {team.players.map((player, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center text-gray-300"
                        >
                          <span>{player.name}</span>
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-400" />
                              {player.points}
                            </span>
                            <span className="flex items-center gap-1">
                              <Target className="w-4 h-4 text-green-400" />
                              {player.kills}
                            </span>
                            <span className="flex items-center gap-1">
                              <Skull className="w-4 h-4 text-red-400" />
                              {player.deaths}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))
      )}
    </motion.div>
  );
}
