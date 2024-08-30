import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import styles from '../../styles/PlayerDetail.module.scss';
import Swal from 'sweetalert2';
import Modal from 'react-modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Team {
  id: number;
  name: string;
}

interface Player {
  id: number;
  name: string;
  age: number;
  team: Team | null;
}

const PlayerPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [playerName, setPlayerName] = useState('');
  const [playerAge, setPlayerAge] = useState('');
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);

  useEffect(() => {
    const fetchPlayerAndTeams = async () => {
      try {
        const [playerResponse, teamsResponse] = await Promise.all([
          fetch(`http://localhost:3001/players/${id}`),
          fetch('http://localhost:3001/teams') // Endpoint para buscar os times
        ]);

        if (!playerResponse.ok || !teamsResponse.ok) {
          throw new Error('Erro ao buscar os dados');
        }

        const playerData = await playerResponse.json();
        const teamsData = await teamsResponse.json();

        setPlayer(playerData);
        setCurrentPlayer(playerData);
        setPlayerName(playerData.name);
        setPlayerAge(playerData.age.toString());
        setTeams(teamsData);
        setSelectedTeamId(playerData.team ? playerData.team.id : null);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPlayerAndTeams();
    }
  }, [id]);

  const openModal = () => {
    if (player) {
      setCurrentPlayer(player);
      setModalIsOpen(true);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentPlayer(null);
  };

  const handleEditSave = async () => {
    if (!currentPlayer) return;

    try {
      const response = await fetch(`http://localhost:3001/players/${currentPlayer.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: playerName,
          age: parseInt(playerAge, 10),
          teamId: selectedTeamId, // Adicione o teamId ao atualizar
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar o jogador');
      }

      // Atualizar os detalhes do jogador na página
      setPlayer((prevPlayer) => ({
        ...prevPlayer!,
        name: playerName,
        age: parseInt(playerAge, 10),
        team: teams.find((team) => team.id === selectedTeamId) || null,
      }));

      Swal.fire('Sucesso!', 'Jogador atualizado com sucesso.', 'success');
      closeModal();
    } catch (error) {
      Swal.fire('Erro!', 'Não foi possível salvar o jogador.', 'error');
    }
  };

  const handleDelete = async () => {
    if (!player) return;

    const result = await Swal.fire({
      title: 'Você tem certeza?',
      text: 'Esta ação não pode ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6a0dad',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:3001/players/${player.id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Erro ao excluir o jogador');
        }

        Swal.fire('Excluído!', 'O jogador foi excluído com sucesso.', 'success').then(() => {
          router.push('/players');  // Redireciona para a lista de jogadores
        });
      } catch (error) {
        Swal.fire('Erro!', 'Não foi possível excluir o jogador.', 'error');
      }
    }
  };

  const handleGoBack = () => {
    if (typeof window !== 'undefined') {
      window.history.back(); // Voltar para a página anterior no histórico do navegador
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (!player) return <p>Não foi possível encontrar o jogador.</p>;

  return (
    <div className={styles.container}>
      <Header />
      <h1 className={styles.title}>Detalhes do Jogador</h1>
      <div className={styles.card}>
        <div className={styles.playerDetails}>
          <p><strong>Nome:</strong> {player.name}</p>
          <p><strong>Idade:</strong> {player.age}</p>
          <p><strong>Time:</strong> {player.team ? player.team.name : 'Nenhum time atribuído'}</p>
        </div>
        <div className={styles.buttons}>
          <button className={styles.editButton} onClick={openModal}>Editar</button>
          <button className={styles.deleteButton} onClick={handleDelete}>Excluir</button>
        </div>

        <span className={styles.backButton} onClick={handleGoBack}>Voltar</span>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Editar Jogador"
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <h2>Editar Jogador</h2>
        <div className={styles.form}>
          <label className={styles.label}>Nome:</label>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className={styles.input}
          />
          <label className={styles.label}>Idade:</label>
          <input
            type="number"
            value={playerAge}
            onChange={(e) => setPlayerAge(e.target.value)}
            className={styles.input}
          />
          <label className={styles.label}>Time:</label>
          <select
            value={selectedTeamId || ''}
            onChange={(e) => setSelectedTeamId(parseInt(e.target.value, 10))}
            className={styles.input}
          >
            <option value="">Nenhum time</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
          <button onClick={handleEditSave} className={styles.saveButton}>Salvar</button>
          <button onClick={closeModal} className={styles.cancelButton}>Cancelar</button>
        </div>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default PlayerPage;
