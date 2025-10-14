import { useState } from 'react';
import styles from './DropDown.module.css';

// mock
const sortOptions = [
  '최근 순',
  '오래된 순',
  '많은 포인트 순',
  '적은 포인트 순',
];

export function DropDown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(sortOptions[0]);

  const containerClassName = `${styles.dropdownContainer} ${isOpen ? styles.isOpen : ''}`;

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
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
        <span className={styles.dropdownHeaderText}>{selectedOption}</span>
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
          {sortOptions.map((option, idx) => (
            <li
              key={idx}
              className={styles.dropdownMenuItem}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
