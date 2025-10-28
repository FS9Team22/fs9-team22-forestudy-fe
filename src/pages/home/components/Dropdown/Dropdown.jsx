import { useState } from 'react';
import { useToggle } from '@/hooks/useToggle';
import { DropdownContent } from './DropdownContent';
import styles from './Dropdown.module.css';
import { DropdownTrigger } from './DropdownTrigger';

const sortOptions = [
  { id: 1, name: '최근 순', value: 'latest' },
  { id: 2, name: '오래된 순', value: 'oldest' },
  { id: 3, name: '많은 포인트 순', value: 'mostPoint' },
  { id: 4, name: '적은 포인트 순', value: 'fewerPoint' },
];

export function Dropdown({ onSortType }) {
  const [isOpen, toggle] = useToggle(false);
  const [selectedOption, setSelectedOption] = useState(sortOptions[0]);

  const containerClassName = `${styles.dropdownContainer} ${isOpen ? styles.isOpen : ''}`;

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSortType(option.value);
    toggle();
  };

  return (
    <div className={containerClassName}>
      <DropdownTrigger
        label={selectedOption.name}
        onClick={toggle}
        isOpen={isOpen}
      />

      {isOpen && (
        <DropdownContent
          onItemClick={handleOptionClick}
          sortOptions={sortOptions}
        />
      )}
    </div>
  );
}
