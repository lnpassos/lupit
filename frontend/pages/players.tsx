import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Header from '../components/Header';
import styles from '../styles/Players.module.scss';  // Importa o SCSS
import { FaTrash } from 'react-icons/fa'; // Importa o ícone de lixo
import Swal from 'sweetalert2';
import { useState } from 'react';

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
  initialPlayers: Player[];
  error: string | null;
}

const PlayersPage: React.FC<PlayersPageProps> = ({ initialPlayers, error }) => {
  const [players, setPlayers] = useState<Player[]>(initialPlayers);

  if (error) {
    return (
      <div className={styles.container}>
        <Header />
        <div className={styles.error}>Error: {error}</div>
      </div>
    );
  }

  const handleDelete = async (playerId: number) => {
    const result = await Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não poderá reverter isso!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, delete!'
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:3001/players/${playerId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Erro ao deletar o jogador');
        }

        Swal.fire('Deletado!', 'O jogador foi deletado com sucesso.', 'success');

        // Atualiza o estado local removendo o jogador deletado
        setPlayers(players.filter(player => player.id !== playerId));
      } catch (error) {
        Swal.fire('Erro!', 'Não foi possível deletar o jogador.', 'error');
      }
    }
  };

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
              <th>Ações</th> {/* Nova coluna de ações */}
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {players.map(player => (
              <tr key={player.id}>
                <td>{player.id}</td>
                <td>
                  <Link href={`/players/${player.id}`} className={styles.link}>
                    {player.name}
                  </Link>
                </td>
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
                <td>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(player.id)}
                  >
                    <FaTrash />
                  </button>
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
    const initialPlayers = await res.json();

    return { props: { initialPlayers, error: null } };
  } catch (error) {
    return { props: { initialPlayers: [], error: (error as Error).message } };
  }
};

export default PlayersPage;
