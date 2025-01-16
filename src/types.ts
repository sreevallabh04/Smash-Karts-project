export interface Player {
  name: string;
  points: number;
  kills: number;
  deaths: number;
}

export interface Team {
  name: string;
  players: Player[];
}

export interface Match {
  id: string;
  date: string;
  team1: Team;
  team2: Team;
  winner: 'team1' | 'team2';
}