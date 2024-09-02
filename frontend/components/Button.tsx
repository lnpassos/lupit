import Link from 'next/link';
import styles from './Button.module.scss';

interface ButtonProps {
  href?: string; 
  onClick?: () => void; 
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({ href, onClick, children, type = 'button' }) => {
  if (href) {

    return (
      <Link href={href}>
        <span className={styles.button}>{children}</span>
      </Link>
    );
  }

  return (
    <button className={styles.button} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default Button;
