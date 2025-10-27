import { StudyInfo } from '@/components/StudyInfo';
import styles from './TimerTop.module.css';

const TimerTop = ({ study }) => {
  if (!study) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.timerTop}>
      <StudyInfo study={study} />
    </div>
  );
};

export default TimerTop;
