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
      className="space-y-4"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Match History</h2>
      {matches.map((match) => (
        <motion.div
          key={match.id}
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          className="bg-white p-4 rounded-lg shadow-md"
        >
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">
              {format(new Date(match.date), 'MMM dd, yyyy')}
            </span>
            <div className="flex items-center gap-2">
              <Trophy className="text-yellow-500" />
              <span className="font-semibold">
                Winner: {match[match.winner].name}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {['team1', 'team2'].map((team) => (
              <div
                key={team}
                className={`p-4 rounded-lg ${
                  match.winner === team
                    ? 'bg-green-100 border-green-500'
                    : 'bg-red-100 border-red-500'
                } border-2`}
              >
                <h3 className="font-bold mb-2">{match[team].name}</h3>
                <div className="space-y-2">
                  {match[team].players.map((player, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span>{player.name}</span>
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          {player.points}
                        </span>
                        <span className="flex items-center gap-1">
                          <Target className="w-4 h-4 text-green-500" />
                          {player.kills}
                        </span>
                        <span className="flex items-center gap-1">
                          <Skull className="w-4 h-4 text-red-500" />
                          {player.deaths}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}