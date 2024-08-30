import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import styles from '../../styles/TeamDetail.module.scss';
import { formatDateToBrazilian } from '../../utils/data'; // Importar função para formatação de datas
import Swal from 'sweetalert2'; // Importar SweetAlert2
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importar ícones de editar e excluir
import Modal from 'react-modal'; // Importar React Modal

interface Player {
  id: number;
  name: string;
}

interface Team {
  id: number;
  name: string;
  createdDt: string;
  updatedDt: string;
  players: Player[];
}

const TeamDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

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
        } finally {
          setLoading(false);
        }
      };

      fetchTeam();
    }
  }, [id]);

  const openModal = (player: Player) => {
    setCurrentPlayer(player);
    setModalIsOpen(true);
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
        body: JSON.stringify({ name: currentPlayer.name }),
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar o jogador');
      }

      // Atualizar a lista de jogadores
      setTeam((prevTeam) => ({
        ...prevTeam!,
        players: prevTeam!.players.map((player) =>
          player.id === currentPlayer.id ? currentPlayer : player
        ),
      }));

      Swal.fire('Sucesso!', 'Jogador atualizado com sucesso.', 'success');
      closeModal();
    } catch (error) {
      Swal.fire('Erro!', 'Não foi possível salvar o jogador.', 'error');
    }
  };

  const handleDelete = async (playerId: number) => {
    const result = await Swal.fire({
      title: 'Você tem certeza?',
      text: 'Esta ação não pode ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:3001/players/${playerId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Erro ao excluir o jogador');
        }

        Swal.fire(
          'Excluído!',
          'O jogador foi excluído com sucesso.',
          'success'
        );

        // Atualizar a lista de jogadores após exclusão
        setTeam(prevTeam => ({
          ...prevTeam!,
          players: prevTeam!.players.filter(player => player.id !== playerId),
        }));

      } catch (error) {
        Swal.fire(
          'Erro!',
          'Não foi possível excluir o jogador.',
          'error'
        );
      }
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (!team) return <p>Não foi possível encontrar o time.</p>;

  return (
    <div className={styles.container}>
      <Header />
      <h1 className={styles.title}>{team.name}</h1>
      <div className={styles.info}>
        <p><strong>Criado em:</strong> {formatDateToBrazilian(team.createdDt)}</p>
        <p><strong>Atualizado em:</strong> {formatDateToBrazilian(team.updatedDt)}</p>
      </div>
      {team.players.length > 0 ? (
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {team.players.map((player) => (
              <tr key={player.id}>
                <td>{player.id}</td>
                <td>{player.name}</td>
                <td className={styles.actions}>
                  <span onClick={() => openModal(player)}>
                    <FaEdit />
                  </span>
                  <span onClick={() => handleDelete(player.id)}>
                    <FaTrash />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className={styles.void}>Este time ainda não contratou nenhum jogador :(</p>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Editar Jogador"
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <h2>Editar Jogador</h2>
        <div className={styles.form}>
          <label className={styles.label}>Nome do Jogador</label>
          <input
            type="text"
            value={currentPlayer?.name || ''}
            onChange={(e) =>
              setCurrentPlayer((prev) =>
                prev ? { ...prev, name: e.target.value } : null
              )
            }
            className={styles.input}
          />
          <button onClick={handleEditSave} className={styles.saveButton}>
            Salvar
          </button>
          <button onClick={closeModal} className={styles.cancelButton}>
            Cancelar
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default TeamDetail;
