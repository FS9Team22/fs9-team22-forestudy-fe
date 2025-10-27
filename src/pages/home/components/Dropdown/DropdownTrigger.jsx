import styles from './DropdownTrigger.module.css';

export function DropdownTrigger({ label, onClick, isOpen }) {
  return (
    <button
      className={styles.dropdownHeader}
      role="button"
      onClick={onClick}
      aria-label="드롭다운버튼"
      aria-expanded={isOpen}
    >
      <span className={styles.dropdownHeaderText}>{label}</span>
      <svg
        className={`${styles.dropdownArrow} ${isOpen ? styles.isOpen : ''}`}
        width="10"
        height="5"
        viewBox="0 0 10 5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="dropdownArrow"
      >
        <path
          d="M4.99999 4.6538L0.596191 0.25H9.40379L4.99999 4.6538Z"
          fill="#818181"
        />
      </svg>
    </button>
  );
}
