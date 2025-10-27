import styles from './TimerBox.module.css';

const TimerBox = ({ children }) => {
  return <div className={styles.timerBox}>{children}</div>;
};

export default TimerBox;
