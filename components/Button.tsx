import React from 'react'
import styles from './Button.module.css'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary-teal' | 'primary-blue' | 'outline-blue' | 'text-blue'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary-blue',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  return (
    <button
      className={`${styles.btn} ${styles[`btn-${variant}`]} ${styles[`btn-${size}`]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'primary-teal' | 'primary-blue' | 'outline-blue' | 'text-blue'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export const LinkButton: React.FC<LinkButtonProps> = ({
  variant = 'text-blue',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  return (
    <a
      className={`${styles.btn} ${styles[`btn-${variant}`]} ${styles[`btn-${size}`]} ${className}`}
      {...props}
    >
      {children}
    </a>
  )
}
