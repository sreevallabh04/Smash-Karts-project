import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Car, Trophy } from 'lucide-react';
import { Match } from '../types';

interface MatchFormProps {
  onSubmit: (match: Match) => void;
}

export default function MatchForm({ onSubmit }: MatchFormProps) {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [teams, setTeams] = useState([
    {
      name: 'Red Team',
      color: 'blue',
      players: [
        { name: 'Alex', points: 100, kills: 5, deaths: 2 },
        { name: 'Sarah', points: 85, kills: 4, deaths: 3 },
        { name: 'Mike', points: 95, kills: 6, deaths: 4 },
      ],
    },
    {
      name: 'Blue Team',
      color: 'red',
      players: [
        { name: 'John', points: 90, kills: 5, deaths: 3 },
        { name: 'Emma', points: 110, kills: 7, deaths: 2 },
        { name: 'Chris', points: 80, kills: 4, deaths: 5 },
      ],
    },
  ]);
  const [winner, setWinner] = useState<'team1' | 'team2'>('team1');

  const handleTeamChange = (
    index: number,
    key: keyof typeof teams[number], // Restrict key to valid team properties
    value: any
  ) => {
    const updatedTeams = [...teams];
    updatedTeams[index][key] = value;
    setTeams(updatedTeams);
  };

  const handlePlayerChange = <
    K extends keyof typeof teams[number]['players'][number]
  >(
    teamIndex: number,
    playerIndex: number,
    key: K, // Restrict key to valid properties of a player
    value: typeof teams[number]['players'][number][K] // Ensure value matches the type of the key
  ) => {
    const updatedTeams = [...teams];
    updatedTeams[teamIndex].players[playerIndex][key] = value;
    setTeams(updatedTeams);
  };

  const addPlayer = (teamIndex: number) => {
    const updatedTeams = [...teams];
    updatedTeams[teamIndex].players.push({
      name: '',
      points: 0,
      kills: 0,
      deaths: 0,
    });
    setTeams(updatedTeams);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const match: Match = {
      id: Date.now().toString(),
      date,
      team1: teams[0],
      team2: teams[1],
      winner,
    };
    onSubmit(match);
    // Reset form
    setDate(new Date().toISOString().split('T')[0]);
    setTeams([
      { name: 'Red Team', color: 'blue', players: [] },
      { name: 'Blue Team', color: 'red', players: [] },
    ]);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-lg p-8 rounded-lg shadow-lg max-w-2xl mx-auto text-white"
      onSubmit={handleSubmit}
    >
      <motion.h2
        className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
      >
        <Car className="text-blue-500" />
        New Match
        <Car className="text-red-500" />
      </motion.h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Date</label>
        <input
          type="date"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded bg-white/5 border-blue-500/30 focus:border-blue-500 focus:ring focus:ring-blue-500/20"
        />
      </div>

      {teams.map((team, teamIndex) => (
        <motion.div
          key={teamIndex}
          initial={{ opacity: 0, x: teamIndex === 0 ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 * teamIndex }}
          className="mb-6"
        >
          <h3
            className={`font-semibold mb-2 text-${team.color}-500 flex items-center gap-2`}
          >
            <Trophy />
            {teamIndex === 0 ? 'Team 1' : 'Team 2'}
          </h3>
          <input
            type="text"
            placeholder="Team Name"
            value={team.name}
            onChange={(e) => handleTeamChange(teamIndex, 'name', e.target.value)}
            className="w-full p-2 border rounded mb-2 bg-white/5 border-blue-500/30 focus:border-blue-500 focus:ring focus:ring-blue-500/20"
            required
          />
          {team.players.map((player, playerIndex) => (
            <div key={playerIndex} className="space-y-2 mb-2">
              <input
                type="text"
                placeholder="Player Name"
                value={player.name}
                onChange={(e) =>
                  handlePlayerChange(teamIndex, playerIndex, 'name', e.target.value)
                }
                className="w-full p-2 border rounded bg-white/5 border-blue-500/30 focus:border-blue-500 focus:ring focus:ring-blue-500/20"
                required
              />
              <div className="grid grid-cols-3 gap-2">
                {['Points', 'Kills', 'Deaths'].map((stat) => (
                  <input
                    key={stat}
                    type="number"
                    placeholder={stat}
                    value={player[stat.toLowerCase() as keyof typeof player]} // Ensure correct type for the stat
                    onChange={(e) =>
                      handlePlayerChange(
                        teamIndex,
                        playerIndex,
                        stat.toLowerCase() as keyof typeof player, // Assert the key type
                        parseInt(e.target.value, 10)
                      )
                    }
                    className="w-full p-2 border rounded bg-white/5 border-blue-500/30 focus:border-blue-500 focus:ring focus:ring-blue-500/20"
                    required
                  />
                ))}
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addPlayer(teamIndex)}
            className={`mt-2 px-4 py-2 bg-${team.color}-500 text-white rounded hover:bg-${team.color}-600 transition-colors duration-300`}
          >
            Add Player
          </button>
        </motion.div>
      ))}

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Winner</label>
        <select
          value={winner}
          onChange={(e) => setWinner(e.target.value as 'team1' | 'team2')}
          className="w-full p-2 border rounded bg-white/5 border-blue-500/30 focus:border-blue-500 focus:ring focus:ring-blue-500/20"
          required
        >
          <option value="team1">Team 1</option>
          <option value="team2">Team 2</option>
        </select>
      </div>

      <motion.button
        type="submit"
        className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Submit Match
      </motion.button>
    </motion.form>
  );
}
