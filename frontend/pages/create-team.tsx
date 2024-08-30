// pages/create-team.tsx
import { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';

const CreateTeam = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/teams', { name });
      setName('');
      alert('Time criado com sucesso!');
    } catch (error) {
      console.error('Failed to create team:', error);
      setError('Erro ao criar o time. Tente novamente.');
    }
  };

  return (
    <div>
      <Header />
      <h1>Criar um Novo Time</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
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
        <button type="submit">Criar Time</button>
      </form>
    </div>
  );
};

export default CreateTeam;
