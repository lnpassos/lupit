import Link from 'next/link';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import styles from '../styles/Players.module.scss';
import { formatDateToBrazilian } from '../utils/data';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Oval } from 'react-loader-spinner';

// Interfaces
interface Team {
  id: number;
  name: string;
}

interface Player {
  id: number;
  name: string;
  age: number;
  team: Team | null; 
  createdDt: string;
  updatedDt: string;
}

// Acessando a API para obter os jogadores
const PlayersPage = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch('http://localhost:3001/players');
        if (!response.ok) {
          throw new Error('Erro ao se conectar no servidor!');
        }
        const data = await response.json();
        setPlayers(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  const openModal = (player: Player) => {
    setCurrentPlayer(player);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentPlayer(null);
  };

  const handleDelete = async (playerId: number) => {
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
        const response = await fetch(`http://localhost:3001/players/${playerId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Erro ao excluir o jogador');
        }

        Swal.fire('Excluído!', 'O jogador foi excluído com sucesso.', 'success');

        // Atualizar a lista de jogadores após exclusão
        setPlayers((prevPlayers) => prevPlayers.filter((player) => player.id !== playerId));
      } catch (error) {
        Swal.fire('Erro!', 'Não foi possível excluir o jogador.', 'error');
      }
    }
  };

  const handleSave = async () => {
    if (!currentPlayer) return;

    // Atualizando o campo updatedDt antes de salvar
    const updatedPlayer = {
      ...currentPlayer,
      updatedDt: new Date().toISOString(),
    };

    try {
      const response = await fetch(`http://localhost:3001/players/${updatedPlayer.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name: updatedPlayer.name, 
          age: updatedPlayer.age,
          updatedDt: updatedPlayer.updatedDt 
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar o jogador');
      }

      // Atualizar a lista de jogadores
      setPlayers((prevPlayers) =>
        prevPlayers.map((player) => (player.id === updatedPlayer.id ? updatedPlayer : player))
      );

      Swal.fire('Sucesso!', 'Jogador atualizado com sucesso.', 'success');
      closeModal();
    } catch (error) {
      Swal.fire('Erro!', 'Não foi possível salvar o jogador.', 'error');
    }
  };

  // Animação para Loading..
  if (loading) return (
    <div className={styles.loadingContainer}>
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
      <p>Procurando por Jogadores..</p>
    </div>
  );

  // Se houver algum tipo de erro, exiba uma mensagem para o usuário
  if (error) {
    return (
      <div className={styles.container}>
        <Header />
        <p className={styles.error}>Erro ao se conectar no servidor! - Tente novamente mais tarde.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Header />
      <table className={styles.table}>
        <thead className={styles.tableHeader}>
          <tr className={styles.trTitle}>
            <th colSpan={5} className={styles.buttonCell}>
              <div className={styles.titleContainer}>
                <h1 className={styles.tableTitle}>Tabela de Jogadores</h1>
                <Link href="/create-player" className={styles.createButton}>
                  <button className={styles.createPlayerButton}>Cadastrar novo Jogador</button>
                </Link>
              </div>
            </th>
          </tr>
          <tr className={styles.lineTr}>
            <th className={styles.tableThId}>ID</th>
            <th className={styles.tableThName}>Nome</th>
            <th className={styles.tableThAge}>Idade</th>
            <th className={styles.tableThTeam}>Time</th>
            <th className={styles.tableThActions}>Ações</th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {players.length > 0 ? (
            players.map((player) => (
              <tr key={player.id}>
                <td>{player.id}</td>
                <td>
                  <Link href={`/players/${player.id}`} className={styles.link}>
                    {player.name}
                  </Link>
                </td>
                <td>{player.age}</td>
                <td>
                  {player.team ? (
                    <Link href={`/teams/${player.team.id}`} className={styles.link}>
                      {player.team.name}
                    </Link>
                  ) : (
                    'Nenhum time atribuído'
                  )}
                </td>
                <td className={styles.actions}>
                  <span className={styles.icon} onClick={() => openModal(player)}>
                    <FaEdit />
                  </span>
                  <span className={styles.icon} onClick={() => handleDelete(player.id)}>
                    <FaTrash />
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className={styles.noPlayers}>
                Nenhum Jogador Encontrado
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal para edição de jogador */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Editar Jogador"
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <h2 className={styles.modalTitle}>Editar Jogador</h2>
        <div className={styles.form}>
          <label className={styles.label}>Nome do Jogador</label>
          <input
            type="text"
            value={currentPlayer?.name || ''}
            onChange={(e) =>
              setCurrentPlayer((prev) => (prev ? { ...prev, name: e.target.value } : null))
            }
            className={styles.input}
          />
          <label className={styles.label}>Idade</label>
          <input
            type="number"
            value={currentPlayer?.age || ''}
            onChange={(e) =>
              setCurrentPlayer((prev) => (prev ? { ...prev, age: parseInt(e.target.value, 10) } : null))
            }
            className={styles.input}
          />
          <div className={styles.buttons}>
            <button onClick={handleSave} className={styles.saveButton}>
              Salvar
            </button>
            <button onClick={closeModal} className={styles.cancelButton}>
              Cancelar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PlayersPage;
