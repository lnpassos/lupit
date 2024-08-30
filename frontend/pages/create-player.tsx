import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';

const CreatePlayer = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [teamId, setTeamId] = useState<number | string>('');
  const [teams, setTeams] = useState<{ id: number; name: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null); // Novo estado para sucesso

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await axios.get('http://localhost:3001/teams');
        setTeams(res.data);
      } catch (err) {
        setError('Failed to fetch teams. Please try again later.');
        console.error('Failed to fetch teams:', err);
      }
    };
    fetchTeams();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/players', { name, age, teamId });
      setName('');
      setAge(0);
      setTeamId('');
      setSuccess('Jogador criado com sucesso!');
      setError(null); // Limpa a mensagem de erro
    } catch (error) {
      console.error('Failed to create player:', error);
      setError('Erro ao criar jogador!');
      setSuccess(null); // Limpa a mensagem de sucesso
    }
  };

  return (
    <div>
      <Header />
      <h1>Criar um Jogador</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Idade:
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value))}
            required
          />
        </label>
        <label>
          Time:
          <select
            value={teamId}
            onChange={(e) => setTeamId(e.target.value)}
            required
          >
            <option value="">Selecione um time</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Criar Jogador</button>
      </form>
    </div>
  );
};

export default CreatePlayer;
