import Link from 'next/link';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import styles from '../styles/Teams.module.scss';
import { formatDateToBrazilian } from '../utils/data';  // Importe a função

interface Team {
  id: number;
  name: string;
  createdDt: string;
  updatedDt: string;
}

const TeamsPage = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch('http://localhost:3001/teams');
        const data = await response.json();
        setTeams(data);
      } catch (error) {
        console.error('Failed to fetch teams:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      <h1 className={styles.title}>Times Cadastrados</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Criado em</th>
              <th>Atualizado em</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {teams.length > 0 ? (
              teams.map((team) => (
                <tr key={team.id}>
                  <td>{team.id}</td>
                  <td>
                    <Link href={`/teams/${team.id}`} className={styles.link}>
                      {team.name}
                    </Link>
                  </td>
                  <td>{formatDateToBrazilian(team.createdDt)}</td>
                  <td>{formatDateToBrazilian(team.updatedDt)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className={styles.noTeams}>
                  Não há nenhum time cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TeamsPage;
