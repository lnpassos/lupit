import Header from '../components/Header';
import Button from '../components/Button';
import styles from '../styles/Index.module.scss'; // Importa o arquivo SCSS para estilos

const Home = () => (
  <div className={styles.container}>
    <Header />
    <main className={styles.mainContent}>
      <h1>FutLovers.io</h1>
      <div className={styles.buttonContainer}>
        <Button href="/create-team">Eu quero criar um Novo Time</Button>
        <Button href="/create-player">Eu quero criar um Novo Jogador</Button>
        <Button href="/teams">Gostaria de ver os Times Criados</Button>
        <Button href="/players">Gostaria de ver os Jogadores Criados</Button>
      </div>
    </main>
  </div>
);

export default Home;
