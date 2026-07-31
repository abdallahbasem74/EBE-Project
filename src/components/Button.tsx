import styles from './Button.module.css';

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'danger';
}

function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button
      className={`${styles.btn} ${variant === 'danger' ? styles.danger : styles.primary}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default Button;