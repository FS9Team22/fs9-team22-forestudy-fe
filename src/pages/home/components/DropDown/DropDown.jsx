import { useState } from 'react';
import styles from './DropDown.module.css';

// mock
const sortOptions = [
  { id: 1, name: '최근 순', value: 'latest' },
  { id: 2, name: '오래된 순', value: 'oldest' },
  { id: 3, name: '많은 포인트 순', value: 'mostPoint' },
  { id: 4, name: '적은 포인트 순', value: 'fewerPoint' },
];

export function DropDown({ onSortType }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(sortOptions[0]);

  const containerClassName = `${styles.dropdownContainer} ${isOpen ? styles.isOpen : ''}`;

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSortType(option.value);
    setIsOpen(false);
  };

  return (
    <div className={containerClassName}>
      <div
        className={styles.dropdownHeader}
        role="button"
        onClick={toggleDropDown}
        aria-label="드롭다운버튼"
      >
        <span className={styles.dropdownHeaderText}>{selectedOption.name}</span>
        <svg
          className={styles.dropdownArrow}
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
      </div>

      {isOpen && (
        <ul className={styles.dropdownMenu}>
          {sortOptions.map((option) => (
            <li
              key={option.id}
              className={styles.dropdownMenuItem}
              onClick={() => handleOptionClick(option)}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
