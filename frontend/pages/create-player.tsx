import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Button from '../components/Button';
import Swal from 'sweetalert2';
import styles from '../styles/CreatePlayer.module.scss'; // Certifique-se de que este arquivo existe e está configurado

const CreatePlayer = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [teamId, setTeamId] = useState<number | string>('');
  const [teams, setTeams] = useState<{ id: number; name: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await axios.get('http://localhost:3001/teams');
        setTeams(res.data);
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Falha ao buscar times. Tente novamente mais tarde.',
        });
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
      Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        text: 'Jogador criado com sucesso!',
      });
      setError(null);
    } catch (error) {
      console.error('Failed to create player:', error);
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Erro ao criar jogador!',
      });
      setError('Erro ao criar jogador!');
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <h1 className={styles.title}>Criar Novo Jogador</h1>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Nome:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Idade:
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value))}
            required
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Time:
          <select
            value={teamId}
            onChange={(e) => setTeamId(e.target.value)}
            required
            className={styles.select}
          >
            <option value="">Selecione um time</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </label>
        <Button type="submit">Criar Jogador</Button>
      </form>
    </div>
  );
};

export default CreatePlayer;
