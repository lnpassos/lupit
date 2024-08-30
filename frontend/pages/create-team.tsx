import { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Swal from 'sweetalert2';
import styles from '../styles/CreateTeam.module.scss'; // Importe o arquivo de estilo

const CreateTeam = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/teams', { name });
      setName('');
      // Exibe uma mensagem de sucesso usando SweetAlert2
      Swal.fire({
        title: 'Sucesso!',
        text: 'Time criado com sucesso!',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#6a0dad', // Cor do botão de confirmação
      });
      setError(null); // Limpa a mensagem de erro
    } catch (error) {
      console.error('Failed to create team:', error);
      setError('Erro ao criar o time. Tente novamente.');
      // Exibe uma mensagem de erro usando SweetAlert2
      Swal.fire({
        title: 'Erro!',
        text: 'Não foi possível criar o time. Tente novamente.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#e74c3c', // Cor do botão de confirmação
      });
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <h1 className={styles.title}>Criar um Novo Time</h1>
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
        <button type="submit" className={styles.button}>Criar Time</button>
      </form>
    </div>
  );
};

export default CreateTeam;
