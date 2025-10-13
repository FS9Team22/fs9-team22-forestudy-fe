import styles from './Card.module.css';

export function Card() {
  return (
    <div className={styles.card}>
      <div className={styles.overlay}>
        <div className={styles.header}>
          <h2 className={styles.title}>이유디의 UX 스터디</h2>
          <span className={styles.points}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <g clipPath="url(#clip0_11208_2730)">
                <path
                  d="M11.1952 0.24152C10.7063 0.00155102 8.22806 0.275645 6.44044 1.98977C3.62513 4.80158 3.69272 8.50458 3.69272 8.50458C3.69272 8.50458 3.59997 8.88587 3.20316 8.33308C2.33516 7.2273 2.78994 4.68236 2.84069 4.32755C2.91244 3.82858 2.59416 3.81327 2.46138 3.97864C-0.674405 8.33286 2.15775 11.8987 4.01253 13.0305C6.18341 14.3551 10.4668 14.3546 12.1732 10.5963C14.2975 5.91568 11.8075 0.541864 11.1952 0.24152Z"
                  fill="#79AC6A"
                />
                <path
                  d="M11.1463 4.3713C11.364 2.91158 11.3653 1.50546 11.1863 0.238456C10.681 0.00483146 8.219 0.283956 6.44035 1.98977C3.62504 4.80158 3.69263 8.50458 3.69263 8.50458C3.69263 8.50458 3.59988 8.88586 3.20307 8.33308C2.33507 7.2273 2.78985 4.68236 2.8406 4.32755C2.91235 3.82858 2.59407 3.81327 2.46129 3.97864C0.566036 6.61021 0.851942 8.95258 1.78316 10.6451C2.71525 11.6458 3.77597 12.3036 4.75838 12.4502C7.55838 12.868 10.4179 9.25096 11.1463 4.3713Z"
                  fill="#CAE5C2"
                />
                <path
                  d="M11.1465 4.37132C11.3641 2.9116 11.3654 1.50548 11.1865 0.238475C10.6812 0.00485003 8.7201 0.816412 6.94123 2.52266C4.12592 5.33426 3.69279 8.5046 3.69279 8.5046C3.69279 8.5046 3.60004 8.88588 3.20323 8.3331C2.33523 7.22732 2.6336 5.31698 2.68457 4.96238C2.75654 4.46319 2.43804 4.4481 2.30526 4.61348C0.410229 7.24504 0.852323 8.95282 1.78376 10.6451C2.71585 11.6459 3.77657 12.3036 4.75898 12.4502C7.55854 12.868 10.418 9.25098 11.1465 4.37132Z"
                  fill="#99C08E"
                />
              </g>
              <defs>
                <clipPath id="clip0_11208_2730">
                  <rect width="14" height="14" fill="white" />
                </clipPath>
              </defs>
            </svg>
            310P 획득
          </span>
        </div>
        <p className={styles.status}>62일째 진행 중</p>
        <p className={styles.quote}>Slow And Steady Wins The Race!!</p>
        <div className={styles.footer}>
          <div className={styles.reaction}>
            <span className={styles.icon}>👩🏻‍💻</span>
            <span className={styles.count}>37</span>
          </div>
          <div className={styles.reaction}>
            <span className={styles.icon}>🔥</span>
            <span className={styles.count}>26</span>
          </div>
          <div className={styles.reaction}>
            <span className={styles.icon}>🤍️</span>
            <span className={styles.count}>14</span>
          </div>
        </div>
      </div>
    </div>
  );
}
