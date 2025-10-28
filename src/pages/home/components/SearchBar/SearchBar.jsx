import { useState } from 'react';
import SearchIcon from '@/assets/icons/ic_search.svg';
import styles from './SearchBar.module.css';

export function SearchBar({ onSearch }) {
  const [keyword, setKeyword] = useState('');

  const handleOnKeyDown = (e) => {
    if (e.key === 'Enter') return onSearch(keyword);
  };

  const handleOnChange = (e) => {
    const trimmed = e.target.value.trim();
    setKeyword(trimmed);
  };

  return (
    <div className={styles.inputContainer}>
      <img src={SearchIcon} alt="서치 아이콘" />
      <input
        type="text"
        placeholder="검색"
        onChange={handleOnChange}
        onKeyDown={handleOnKeyDown}
        aria-label="검색어 입력"
      />
    </div>
  );
}
