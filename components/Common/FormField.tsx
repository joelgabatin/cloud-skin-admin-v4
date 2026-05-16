import styles from './FormField.module.css';
import { InputHTMLAttributes } from 'react';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export default function FormField({
  label,
  error,
  helperText,
  ...props
}: FormFieldProps) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      <input
        className={`${styles.input} ${error ? styles.errorInput : ''}`}
        {...props}
      />
      {error && <p className={styles.error}>{error}</p>}
      {helperText && <p className={styles.helperText}>{helperText}</p>}
    </div>
  );
}
