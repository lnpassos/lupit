import Link from 'next/link';
import { useEffect, useState } from 'react';
import Header from '../components/Header';

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
    <div>
      <Header />
      <h1>Times Cadastrados</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {teams.length > 0 ? (
            teams.map((team) => (
              <li key={team.id}>
                <Link href={`/teams/${team.id}`}>
                    <p>Nome: {team.name}</p>
                    <p>Criado em: {team.createdDt}</p>
                    <p>Atualizado em: {team.updatedDt}</p>
                </Link>
              </li>
            ))
          ) : (
            <p>Não há nenhum time cadastrado.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default TeamsPage;
