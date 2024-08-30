// pages/teams/[id].tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Header from '../../components/Header';

const TeamDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [team, setTeam] = useState<any>(null);

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
        }
      };

      fetchTeam();
    }
  }, [id]);

  if (!team) return <p>Carregando...</p>;

  return (
    <div>
      <Header />
      <h1>{team.name}</h1>
      <h2>Jogadores</h2>
      {Array.isArray(team.players) && team.players.length > 0 ? (
        <ul>
          {team.players.map((player: any) => (
            <li key={player.id}>{player.name}</li>
          ))}
        </ul>
      ) : (
        <p>Não há jogadores para este time.</p>
      )}
    </div>
  );
};

export default TeamDetail;
