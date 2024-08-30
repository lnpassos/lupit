import Link from 'next/link';
import styles from './Header.module.scss';

const Header = () => (
  <header className={styles.header}>
    <nav className={styles.nav}>
      <Link href="/" className={styles.link}>Lupit</Link>
    </nav>
  </header>
);

export default Header;
