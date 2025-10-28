import vectorArrow from '@/assets/icons/ic_vector.svg';
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
      <img
        className={`${styles.dropdownArrow} ${isOpen ? styles.isOpen : ''}`}
        src={vectorArrow}
        alt="드롭다운 화살표"
      />
    </button>
  );
}
