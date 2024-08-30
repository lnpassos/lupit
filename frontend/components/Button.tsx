import Link from 'next/link';
import styles from './Button.module.scss';

interface ButtonProps {
  href: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ href, children }) => (
  <Link href={href} passHref>
    <span className={styles.button}>{children}</span>
  </Link>
);

export default Button;
