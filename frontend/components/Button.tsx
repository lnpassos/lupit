import Link from 'next/link';
import styles from './Button.module.scss';

interface ButtonProps {
  href?: string; // href é opcional agora
  onClick?: () => void; // Adiciona suporte a onClick
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset'; // Adiciona suporte ao tipo de botão
}

const Button: React.FC<ButtonProps> = ({ href, onClick, children, type = 'button' }) => {
  if (href) {
    // Renderiza como um link
    return (
      <Link href={href}>
        <span className={styles.button}>{children}</span>
      </Link>
    );
  }

  // Renderiza como um botão
  return (
    <button className={styles.button} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default Button;
