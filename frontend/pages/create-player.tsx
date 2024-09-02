// Imports
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Button from '../components/Button';
import Swal from 'sweetalert2';
import { Oval } from 'react-loader-spinner'; // Importa o componente de loading
import styles from '../styles/CreatePlayer.module.scss'; 
import Link from 'next/link';

// Componente CreatePlayer
const CreatePlayer = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState<number>(0);
  const [teamId, setTeamId] = useState<number | string>('');
  const [teams, setTeams] = useState<{ id: number; name: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Ativa o loading

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
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
    } finally {
      setLoading(false); 
    }
  };

  // Renderização do componente
  return (
    <div className={styles.container}>
      <Header />
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <Link href="/players" className={styles.backButton}>Voltar</Link>
        <h1 className={styles.title}>Cadastro de novo Jogador</h1>
        <label className={styles.label}>
          Nome:
          <input
            type="text"
            placeholder='Ex: Messi'
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
            disabled={loading} // Desativa o select durante o loading
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
        {loading && (
          <div className={styles.loading}>
            <Oval
              height={80}
              width={80}
              color="#00BFFF"
              visible={true}
              ariaLabel='oval-loading'
              secondaryColor="#00BFFF"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
            <p>Cadastrando novo Jogador...</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreatePlayer;
