import styles from './SearchBar.module.css';

export function SearchBar() {
  return (
    <div className={styles.inputContainer}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        aria-label="검색 아이콘"
      >
        <g clipPath="url(#clip0_11208_4075)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.625 2.0625C5.00063 2.0625 2.0625 5.00063 2.0625 8.625C2.0625 12.2494 5.00063 15.1875 8.625 15.1875C12.2494 15.1875 15.1875 12.2494 15.1875 8.625C15.1875 5.00063 12.2494 2.0625 8.625 2.0625ZM0.9375 8.625C0.9375 4.37931 4.37931 0.9375 8.625 0.9375C12.8707 0.9375 16.3125 4.37931 16.3125 8.625C16.3125 10.5454 15.6083 12.3013 14.4441 13.6487L16.8977 16.1023C17.1174 16.3219 17.1174 16.6781 16.8977 16.8977C16.6781 17.1174 16.3219 17.1174 16.1023 16.8977L13.6487 14.4441C12.3013 15.6083 10.5454 16.3125 8.625 16.3125C4.37931 16.3125 0.9375 12.8707 0.9375 8.625Z"
            fill="#818181"
          />
        </g>
        <defs>
          <clipPath id="clip0_11208_4075">
            <rect width="18" height="18" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <input type="text" placeholder="검색" aria-label="검색어 입력" />
    </div>
  );
}
