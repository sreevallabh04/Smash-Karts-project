import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Car, Trophy } from 'lucide-react';
import { Match } from '../types'; // Adjust according to your types

interface MatchFormProps {
  onSubmit: (match: Match) => void;
}

export default function MatchForm({ onSubmit }: MatchFormProps) {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [team1Name, setTeam1Name] = useState('Red Team');
  const [team2Name, setTeam2Name] = useState('Blue Team');
  const [team1Players, setTeam1Players] = useState([
    { name: 'Alex', points: 100, kills: 5, deaths: 2 },
    { name: 'Sarah', points: 85, kills: 4, deaths: 3 },
    { name: 'Mike', points: 95, kills: 6, deaths: 4 }
  ]);
  const [team2Players, setTeam2Players] = useState([
    { name: 'John', points: 90, kills: 5, deaths: 3 },
    { name: 'Emma', points: 110, kills: 7, deaths: 2 },
    { name: 'Chris', points: 80, kills: 4, deaths: 5 }
  ]);
  const [winner, setWinner] = useState<'team1' | 'team2'>('team1');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const match: Match = {
      id: Date.now().toString(),
      date,
      team1: { name: team1Name, players: team1Players },
      team2: { name: team2Name, players: team2Players },
      winner
    };

    // Call onSubmit function passed from the parent to handle the match data
    onSubmit(match);

    // Reset the form
    setDate(new Date().toISOString().split('T')[0]);
    setTeam1Name('Red Team');
    setTeam2Name('Blue Team');
    setTeam1Players([{ name: '', points: 0, kills: 0, deaths: 0 }]);
    setTeam2Players([{ name: '', points: 0, kills: 0, deaths: 0 }]);
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

      <div className="grid grid-cols-2 gap-4 mb-6">
        {[{
          title: 'Team 1', name: team1Name, setName: setTeam1Name, players: team1Players, setPlayers: setTeam1Players, color: 'blue' 
        }, {
          title: 'Team 2', name: team2Name, setName: setTeam2Name, players: team2Players, setPlayers: setTeam2Players, color: 'red'
        }].map((team, teamIndex) => (
          <motion.div
            key={team.title}
            initial={{ x: teamIndex === 0 ? -20 : 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 * teamIndex }}
          >
            <h3 className={`font-semibold mb-2 flex items-center gap-2 text-${team.color}-500`}>
              <Trophy />
              {team.title}
            </h3>
            <input
              type="text"
              placeholder={`${team.title} Name`}
              value={team.name}
              onChange={(e) => team.setName(e.target.value)}
              className="w-full p-2 border rounded mb-2 bg-white/5 border-blue-500/30 focus:border-blue-500 focus:ring focus:ring-blue-500/20"
              required
            />
            {team.players.map((player, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="space-y-2 mb-2"
              >
                <input
                  type="text"
                  placeholder="Player Name"
                  value={player.name}
                  onChange={(e) => {
                    const newPlayers = [...team.players];
                    newPlayers[index].name = e.target.value;
                    team.setPlayers(newPlayers);
                  }}
                  className="w-full p-2 border rounded bg-white/5 border-blue-500/30 focus:border-blue-500 focus:ring focus:ring-blue-500/20"
                  required
                />
                <div className="grid grid-cols-3 gap-2">
                  {['Points', 'Kills', 'Deaths'].map((stat) => (
                    <input
                      key={stat}
                      type="number"
                      placeholder={stat}
                      value={player[stat.toLowerCase() as keyof typeof player]}
                      onChange={(e) => {
                        const newPlayers = [...team.players];
                        newPlayers[index][stat.toLowerCase() as keyof typeof player] = parseInt(e.target.value);
                        team.setPlayers(newPlayers);
                      }}
                      className="w-full p-2 border rounded bg-white/5 border-blue-500/30 focus:border-blue-500 focus:ring focus:ring-blue-500/20"
                      required
                    />
                  ))}
                </div>
              </motion.div>
            ))}
            <motion.button
              type="button"
              onClick={() => team.setPlayers([...team.players, { name: '', points: 0, kills: 0, deaths: 0 }])}
              className={`mt-2 px-4 py-2 bg-${team.color}-500 text-white rounded hover:bg-${team.color}-600 transition-colors duration-300`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Add Player
            </motion.button>
          </motion.div>
        ))}
      </div>

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
