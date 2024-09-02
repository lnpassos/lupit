import Link from 'next/link';
import styles from './Header.module.scss';

const Header = () => (
  <header className={styles.header}>
    <nav className={styles.nav}>
      <Link href="/teams" className={styles.link}>Times</Link>
      <Link href="/" className={`${styles.link}`}>
        <span>Lupit</span>
      </Link>
      <Link href="/players" className={styles.link}>Jogadores</Link>
    </nav>
  </header>
);

export default Header;
