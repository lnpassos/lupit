// pages/players.tsx
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Header from '../components/Header';

interface Team {
  id: number;
  name: string;
}

interface Player {
  id: number;
  name: string;
  age: number;
  team: Team | null;  // Permitir que team possa ser null
}

interface PlayersPageProps {
  players: Player[];
  error: string | null;
}

const PlayersPage: React.FC<PlayersPageProps> = ({ players, error }) => {
  if (error) {
    return <div>
        <Header />
        Error: {error}
        </div>;
  }

  return (
    <div>
      <Header />
      <h1>All Players</h1>
      {players.length === 0 ? (
        <p>No players found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Team</th>
            </tr>
          </thead>
          <tbody>
            {players.map(player => (
              <tr key={player.id}>
                <td>{player.id}</td>
                <td>{player.name}</td>
                <td>{player.age}</td>
                <td>
                  {player.team ? (
                    <Link href={`/teams/${player.team.id}`}>
                      {player.team.name}
                    </Link>
                  ) : (
                    'No team assigned'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<PlayersPageProps> = async () => {
  try {
    const res = await fetch('http://localhost:3001/players'); // Ajuste a URL conforme necessário
    if (!res.ok) {
      throw new Error('Failed to fetch players');
    }
    const players = await res.json();

    return { props: { players, error: null } };
  } catch (error) {
    return { props: { players: [], error: (error as Error).message } };
  }
};

export default PlayersPage;
