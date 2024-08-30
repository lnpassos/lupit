// pages/players.tsx
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Header from '../components/Header';
import styles from '../styles/Players.module.scss';  // Importa o SCSS

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
    return (
      <div className={styles.container}>
        <Header />
        <div className={styles.error}>Error: {error}</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Header />
      <h1 className={styles.title}>Tabela de Jogadores</h1>
      {players.length === 0 ? (
        <p>Nenhum Jogador Encontrado</p>
      ) : (
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Idade</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {players.map(player => (
              <tr key={player.id}>
                <td>{player.id}</td>
                <td>{player.name}</td>
                <td>{player.age}</td>
                <td>
                  {player.team ? (
                    <Link href={`/teams/${player.team.id}`} className={styles.link}>
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
