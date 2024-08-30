import Header from '../components/Header';
import Button from '../components/Button';
import styles from './Index.module.scss'; // Importa o arquivo SCSS para estilos

const Home = () => (
  <div className={styles.container}>
    <Header />
    <main className={styles.mainContent}>
      <h1>Olá, Seja muito bem-vindo!</h1>
      <h2>O que deseja!?</h2>
      <div className={styles.buttonContainer}>
        <Button href="/create-team">Eu quero criar um novo Time..</Button>
        <Button href="/create-player">Eu quero criar um novo Jogador</Button>
        <Button href="/teams">Gostaria de ver os Times já criados..</Button>
        <Button href="/players">Gostaria de ver os Jogadores já criados..</Button>
      </div>
    </main>
  </div>
);

export default Home;
