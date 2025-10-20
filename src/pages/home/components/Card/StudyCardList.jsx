import { Link } from 'react-router';
import { useLocalStorage } from '../../../../hooks/useLocalStorage';
import { Card } from './Card';
import styles from './StudyCardList.module.css';

const ONE_HOUR = 60 * 60 * 1000;
const MAX_STUDIES_LENGTH = 3;
export function StudyCardList({ className, cards }) {
  const [recentStudies, setRecentStudies] = useLocalStorage(
    'recentStudies',
    [],
    ONE_HOUR,
  );
  const handleOnClick = (study) => {
    const updatedStudies = recentStudies.filter((item) => item.id !== study.id);
    updatedStudies.unshift(study);
    if (updatedStudies.length > MAX_STUDIES_LENGTH) {
      updatedStudies.pop();
    }
    setRecentStudies(updatedStudies);
  };

  return (
    <div className={styles.cardListSection}>
      <div
        className={
          className ? `${styles.recentStudies}` : `${styles.cardListContainer}`
        }
      >
        {cards.map((card) => (
          <Link
            key={card.id}
            to={`/study/${card.id}`}
            onClick={() => handleOnClick(card)}
          >
            <Card card={card} />
          </Link>
        ))}
      </div>
    </div>
  );
}
