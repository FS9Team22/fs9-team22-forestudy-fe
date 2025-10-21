import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Toast.module.css';

const Toast = ({ message, type = 'info', onClose, duration = 2500 }) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose?.(), duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const toastElement = (
    <div
      className={`${styles.toast} ${type === 'success' ? styles.success : styles.error}`}
    >
      {message}
    </div>
  );

  return createPortal(toastElement, document.body);
};

export default Toast;
