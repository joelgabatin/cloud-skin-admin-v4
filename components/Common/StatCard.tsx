import styles from './StatCard.module.css';

interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
}

export default function StatCard({
  label,
  value,
  change,
  isPositive = true,
}: StatCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{value}</div>
      {change && (
        <div className={`${styles.change} ${isPositive ? styles.positive : styles.negative}`}>
          {isPositive ? '↑' : '↓'} {change}
        </div>
      )}
    </div>
  );
}
