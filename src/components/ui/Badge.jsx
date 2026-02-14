import styles from './Badge.module.css';

export default function Badge({ 
  children, 
  variant = 'default',
  size = 'medium',
}) {
  return (
    <span className={`${styles.badge} ${styles[variant]} ${styles[size]}`}>
      {children}
    </span>
  );
}
