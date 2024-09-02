// Imports
import Header from '../components/Header';
import Button from '../components/Button';
import styles from '../styles/Index.module.scss'; 

const Home = () => (
  <div className={styles.container}>
    <Header />
    <main className={styles.mainContent}>
      <h1>FutLovers.io</h1>
      <div className={styles.buttonContainer}>

        <Button href="/teams">Visualizar Times</Button>
        <Button href="/players">Visualizar Jogadores</Button>
      </div>
    </main>
  </div>
);

export default Home;
