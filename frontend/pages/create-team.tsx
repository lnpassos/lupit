// Imports
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Button from '../components/Button';
import Swal from 'sweetalert2';
import { Oval } from 'react-loader-spinner'; // Importa o componente de loading
import styles from '../styles/CreateTeam.module.scss'; 
import Link from 'next/link';


// Componente CreateTeam
const CreateTeam = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); 

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      await axios.post('http://localhost:3001/teams', { name });

      setName('');
      Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        text: 'Time criado com sucesso!',
      });
      setError(null);
    } catch (error) {
      console.error('Failed to create team:', error);
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Erro ao criar time!',
      });
      setError('Erro ao criar time!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <Link href="/teams" className={styles.backButton}>Voltar</Link>
        <h1 className={styles.title}>Cadastro de novo Time</h1>
        <label className={styles.label}>
          Nome:
          <input
            type="text"
            placeholder='Ex: Barcelona'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={styles.input}
          />
        </label>
        <Button type="submit">Criar Time</Button>
        {loading && (
          <div className={styles.loading}>
            <Oval
              height={80}
              width={80}
              color="#00BFFF"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel='oval-loading'
              secondaryColor="#00BFFF"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
            <p>Cadastrando novo Time...</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateTeam;
