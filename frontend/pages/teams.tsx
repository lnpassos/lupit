import Link from 'next/link';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import styles from '../styles/Teams.module.scss';
import { formatDateToBrazilian } from '../utils/data';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Oval } from 'react-loader-spinner';

// Interface
interface Team {
  id: number;
  name: string;
  createdDt: string;
  updatedDt: string;
}

// Acessando a API para obter os times
const TeamsPage = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch('http://localhost:3001/teams');
        if (!response.ok) {
          throw new Error('Erro ao se conectar no servidor!');
        }
        const data = await response.json();
        setTeams(data);
      } catch (error) {
        setError((error as Error).message);
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
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:3001/teams/${teamId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Erro ao excluir o time');
        }

        Swal.fire('Excluído!', 'O time foi excluído com sucesso.', 'success');

        // Atualizar a lista de times após exclusão
        setTeams((prevTeams) => prevTeams.filter((team) => team.id !== teamId));
      } catch (error) {
        Swal.fire('Erro!', 'Não foi possível excluir o time.', 'error');
      }
    }
  };

  const handleSave = async () => {
    if (!currentTeam) return;

    // Atualizando o campo updatedDt antes de salvar
    const updatedTeam = {
      ...currentTeam,
      updatedDt: new Date().toISOString(),
    };

    try {
      const response = await fetch(`http://localhost:3001/teams/${updatedTeam.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: updatedTeam.name, updatedDt: updatedTeam.updatedDt }),
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar o time');
      }

      // Atualizar a lista de times
      setTeams((prevTeams) =>
        prevTeams.map((team) => (team.id === updatedTeam.id ? updatedTeam : team))
      );

      Swal.fire('Sucesso!', 'Time atualizado com sucesso.', 'success');
      closeModal();
    } catch (error) {
      Swal.fire('Erro!', 'Não foi possível salvar o time.', 'error');
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
      <p>Procurando por Times..</p>
    </div>
  );

  // Se houver algum tipo de erro, exibir mensagem para o usuário
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
                <h1 className={styles.tableTitle}>Tabela de Times</h1>
                <Link href="/create-team" className={styles.createButton}>
                  <button className={styles.createTeamButton}>Cadastrar novo Time</button>
                </Link>
              </div>
            </th>
          </tr>
          <tr className={styles.lineTr}>
            <th className={styles.tableThId}>ID</th>
            <th className={styles.tableThName}>Nome</th>
            <th className={styles.tableThCreated}>Criado em</th>
            <th className={styles.tableThUpdated}>Atualizado em</th>
            <th className={styles.tableThActions}>Ações</th>
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

      {/* Modal para edição de time */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Editar Time"
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <h2 className={styles.modalTitle}>Editar Time</h2>
        <div className={styles.form}>
          <label className={styles.label}>Nome do Time</label>
          <input
            type="text"
            value={currentTeam?.name || ''}
            onChange={(e) =>
              setCurrentTeam((prev) => (prev ? { ...prev, name: e.target.value } : null))
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

export default TeamsPage;
