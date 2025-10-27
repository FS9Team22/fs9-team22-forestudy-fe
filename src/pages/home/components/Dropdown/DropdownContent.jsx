import styles from './DropdownContent.module.css';

export function DropdownContent({ onItemClick, sortOptions }) {
  const handleItemClick = (option) => {
    onItemClick(option);
  };

  return (
    <ul className={styles.dropdownMenu}>
      {sortOptions.map((option) => (
        <li
          key={option.id}
          className={styles.dropdownMenuItem}
          onClick={() => handleItemClick(option)}
        >
          {option.name}
        </li>
      ))}
    </ul>
  );
}
