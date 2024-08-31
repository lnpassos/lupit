import Header from '../components/Header';
import Button from '../components/Button';
import styles from '../styles/Index.module.scss'; // Importa o arquivo SCSS para estilos

const Home = () => (
  <div className={styles.container}>
    <Header />
    <main className={styles.mainContent}>
      <h1>FutLovers.io</h1>
      <div className={styles.buttonContainer}>
        <Button href="/create-team">Cadastrar novo Time</Button>
        <Button href="/create-player">Cadastrar novo Jogador</Button>
        <Button href="/teams">Ver Times cadastrados</Button>
        <Button href="/players">Ver os Jogadores cadastrados</Button>
      </div>
    </main>
  </div>
);

export default Home;
