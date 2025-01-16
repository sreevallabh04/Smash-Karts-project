import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, Skull, Star } from 'lucide-react';
import type { Match, Player } from '../types';

interface StatisticsProps {
  matches: Match[];
}

export default function Statistics({ matches }: StatisticsProps) {
  const getAllPlayers = () => {
    const players: Record<string, { points: number; kills: number; deaths: number; wins: number }> = {};
    
    matches.forEach(match => {
      [...match.team1.players, ...match.team2.players].forEach(player => {
        if (!players[player.name]) {
          players[player.name] = { points: 0, kills: 0, deaths: 0, wins: 0 };
        }
        players[player.name].points += player.points;
        players[player.name].kills += player.kills;
        players[player.name].deaths += player.deaths;
        if (
          (match.winner === 'team1' && match.team1.players.some(p => p.name === player.name)) ||
          (match.winner === 'team2' && match.team2.players.some(p => p.name === player.name))
        ) {
          players[player.name].wins++;
        }
      });
    });

    return players;
  };

  const players = getAllPlayers();
  const sortedPlayers = Object.entries(players).sort((a, b) => b[1].points - a[1].points);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Player Statistics</h2>
      
      <div className="grid gap-4">
        {sortedPlayers.map(([name, stats], index) => (
          <motion.div
            key={name}
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-lg border-2 ${
              index === 0 ? 'bg-yellow-50 border-yellow-500' :
              index === 1 ? 'bg-gray-50 border-gray-500' :
              index === 2 ? 'bg-orange-50 border-orange-500' :
              'bg-white border-gray-200'
            }`}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                {index < 3 && <Trophy className={
                  index === 0 ? 'text-yellow-500' :
                  index === 1 ? 'text-gray-500' :
                  'text-orange-500'
                } />}
                <span className="font-bold">{name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  {stats.points}
                </span>
                <span className="flex items-center gap-1">
                  <Target className="w-4 h-4 text-green-500" />
                  {stats.kills}
                </span>
                <span className="flex items-center gap-1">
                  <Skull className="w-4 h-4 text-red-500" />
                  {stats.deaths}
                </span>
                <span className="flex items-center gap-1">
                  <Trophy className="w-4 h-4 text-purple-500" />
                  {stats.wins}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}