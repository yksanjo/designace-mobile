import styles from './Card.module.css';

export default function Card({ 
  children, 
  className = '',
  onClick,
  hover = false,
  glow = false,
}) {
  return (
    <div 
      className={`${styles.card} ${hover ? styles.hover : ''} ${glow ? styles.glow : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
