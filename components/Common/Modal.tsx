'use client';

import { ReactNode } from 'react';
import styles from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footerAction?: {
    label: string;
    onClick: () => void;
  };
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footerAction,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button onClick={onClose} className={styles.closeBtn}>
            ✕
          </button>
        </div>
        <div className={styles.content}>{children}</div>
        {footerAction && (
          <div className={styles.footer}>
            <button onClick={onClose} className={styles.cancelBtn}>
              Cancel
            </button>
            <button onClick={footerAction.onClick} className={styles.actionBtn}>
              {footerAction.label}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
