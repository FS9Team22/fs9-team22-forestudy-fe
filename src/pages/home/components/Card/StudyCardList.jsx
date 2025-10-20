import { Link } from 'react-router';
import { Card } from './Card';
import styles from './StudyCardList.module.css';

export function StudyCardList({ className, cards, onClick }) {
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
            onClick={() => onClick(card)}
          >
            <Card card={card} />
          </Link>
        ))}
      </div>
    </div>
  );
}
