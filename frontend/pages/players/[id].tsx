// pages/players/[id].tsx
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Header from '../../components/Header';

interface Player {
  id: number;
  name: string;
  age: number;
  teamId: number;
}

interface PlayerProps {
  player: Player | null;
  error: string | null;
}

const PlayerPage: React.FC<PlayerProps> = ({ player, error }) => {
  const router = useRouter();
  const { id } = router.query;

  if (error) {
    return <div>
      <Header />
      Error: {error}
      </div>;
  }

  if (!player) {
    return <div>
      <Header />
      Loading...
      </div>;
  }

  return (
    <div>
      <Header />
      <h1>Player Details</h1>
      <div>
        <p><strong>ID:</strong> {player.id}</p>
        <p><strong>Name:</strong> {player.name}</p>
        <p><strong>Age:</strong> {player.age}</p>
        <p><strong>Team ID:</strong> {player.teamId}</p>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<PlayerProps> = async (context) => {
  const { id } = context.params as { id: string };

  try {
    const res = await fetch(`http://localhost:3001/players/${id}`);
    if (!res.ok) {
      throw new Error('Player not found');
    }
    const player = await res.json();

    return { props: { player, error: null } };
  } catch (error) {
    return { props: { player: null, error: (error as Error).message } };
  }
};

export default PlayerPage;
