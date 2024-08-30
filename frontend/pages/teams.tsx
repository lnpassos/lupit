import Link from 'next/link';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import styles from '../styles/Teams.module.scss';
import { formatDateToBrazilian } from '../utils/data';  // Importe a função
import Modal from 'react-modal'; // Importar React Modal
import Swal from 'sweetalert2'; // Importar SweetAlert2
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importar ícones de editar e excluir

interface Team {
  id: number;
  name: string;
  createdDt: string;
  updatedDt: string;
}

const TeamsPage = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch('http://localhost:3001/teams');
        const data = await response.json();
        setTeams(data);
      } catch (error) {
        console.error('Failed to fetch teams:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  const openModal = (team: Team) => {
    setCurrentTeam(team);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentTeam(null);
  };

  const handleDelete = async (teamId: number) => {
    const result = await Swal.fire({
      title: 'Você tem certeza?',
      text: 'Esta ação não pode ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6a0dad',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:3001/teams/${teamId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Erro ao excluir o time');
        }

        Swal.fire(
          'Excluído!',
          'O time foi excluído com sucesso.',
          'success'
        );

        // Atualizar a lista de times após exclusão
        setTeams(prevTeams => prevTeams.filter(team => team.id !== teamId));

      } catch (error) {
        Swal.fire(
          'Erro!',
          'Não foi possível excluir o time.',
          'error'
        );
      }
    }
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div className={styles.container}>
      <Header />
      <h1 className={styles.title}>Times Cadastrados</h1>
      <table className={styles.table}>
        <thead className={styles.tableHeader}>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Criado em</th>
            <th>Atualizado em</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {teams.length > 0 ? (
            teams.map((team) => (
              <tr key={team.id}>
                <td>{team.id}</td>
                <td>
                  <Link href={`/teams/${team.id}`} className={styles.link}>
                    {team.name}
                  </Link>
                </td>
                <td>{formatDateToBrazilian(team.createdDt)}</td>
                <td>{formatDateToBrazilian(team.updatedDt)}</td>
                <td className={styles.actions}>
                  <span className={styles.icon} onClick={() => openModal(team)}>
                    <FaEdit />
                  </span>
                  <span className={styles.icon} onClick={() => handleDelete(team.id)}>
                    <FaTrash />
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className={styles.noTeams}>
                Não há nenhum time cadastrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal para edição */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Editar Time"
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <h2>Editar Time</h2>
        <div className={styles.form}>
          <label className={styles.label}>Nome do Time</label>
          <input
            type="text"
            value={currentTeam?.name || ''}
            onChange={(e) =>
              setCurrentTeam((prev) =>
                prev ? { ...prev, name: e.target.value } : null
              )
            }
            className={styles.input}
          />
          <div className={styles.buttons}>
            <button
              onClick={async () => {
                if (!currentTeam) return;

                try {
                  const response = await fetch(`http://localhost:3001/teams/${currentTeam.id}`, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name: currentTeam.name }),
                  });

                  if (!response.ok) {
                    throw new Error('Erro ao salvar o time');
                  }

                  // Atualizar a lista de times
                  setTeams((prevTeams) =>
                    prevTeams.map((team) =>
                      team.id === currentTeam.id ? currentTeam : team
                    )
                  );

                  Swal.fire('Sucesso!', 'Time atualizado com sucesso.', 'success');
                  closeModal();
                } catch (error) {
                  Swal.fire('Erro!', 'Não foi possível salvar o time.', 'error');
                }
              }}
              className={styles.saveButton}
            >
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

export default TeamsPage;
