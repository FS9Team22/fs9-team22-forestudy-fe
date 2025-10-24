import styles from './Point.module.css';
import pointIcon from '../../assets/icons/ic_point.svg';

const Point = ({ points }) => {
  return (
    <div className={styles.pointsSection}>
      <p className={styles.smallHeader}>현재까지 획득한 포인트</p>
      <span className={styles.point}>
        <img src={pointIcon} alt="point" className={styles.pointIcon} />
        {points}P 획득
      </span>
    </div>
  );
};

export default Point;
