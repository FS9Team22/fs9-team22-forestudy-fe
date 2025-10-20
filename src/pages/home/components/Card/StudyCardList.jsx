import { Link } from 'react-router';
import { useLocalStorage } from '../../../../hooks/useLocalStorage';
import { Card } from './Card';
import styles from './StudyCardList.module.css';

const ONE_HOUR = 60 * 60 * 1000;
const MAX_STUDIES_LENGTH = 3;
export function StudyCardList({ cards }) {
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
      <div className={styles.cardListContainer}>
        {cards.map((card) => (
          <Link to={`/study/${card.id}`} onClick={() => handleOnClick(card)}>
            <Card
              key={card.id}
              title={card.title}
              nickname={card.nickname}
              status={card.status}
              point={card.point}
              description={card.description}
              background={card.background}
              likes={card.likes}
              views={card.views}
              comments={card.comments}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
