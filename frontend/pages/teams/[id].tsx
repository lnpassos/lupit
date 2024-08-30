import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import styles from '../../styles/TeamDetail.module.scss'; 
import { formatDateToBrazilian } from '../../utils/data'; 

interface Player {
  id: number;
  name: string;
}

interface Team {
  id: number;
  name: string;
  createdDt: string;
  updatedDt: string;
  players: Player[];
}

const TeamDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchTeam = async () => {
        try {
          const response = await fetch(`http://localhost:3001/teams/${id}`);
          if (!response.ok) {
            throw new Error('Erro ao buscar o time');
          }
          const data = await response.json();
          setTeam(data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

      fetchTeam();
    }
  }, [id]);

  const handleGoBack = () => {
    router.back();
  };

  if (loading) return <p>Carregando...</p>;
  if (!team) return <p>Não foi possível encontrar o time.</p>;

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.card}>
        <span className={styles.backButton} onClick={handleGoBack}>Voltar</span>
        <h1 className={styles.title}>{team.name}</h1>
        <div className={styles.info}>
          <p><strong>Criado em:</strong> {formatDateToBrazilian(team.createdDt)}</p>
          <p><strong>Atualizado em:</strong> {formatDateToBrazilian(team.updatedDt)}</p>
        </div>
        {team.players.length > 0 ? (
          <table className={styles.table}>
            <thead className={styles.tableHeader}>
              <tr>
                <th>ID</th>
                <th>Nome</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {team.players.map((player) => (
                <tr key={player.id}>
                  <td>{player.id}</td>
                  <td>
                    <Link href={`/players/${player.id}`} className={styles.link}>
                      {player.name}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className={styles.void}>Este time ainda não contratou nenhum jogador :(</p>
        )}
      </div>
    </div>
  );
};

export default TeamDetail;
