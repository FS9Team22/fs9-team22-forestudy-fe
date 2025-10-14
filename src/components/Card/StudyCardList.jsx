import { Card } from './Card';
import styles from './StudyCardList.module.css';

export function StudyCardList({ cards }) {
  return (
    <div className={styles.cardListSection}>
      <div className={styles.cardListContainer}>
        {cards.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            status={card.status}
            points={card.points}
            quote={card.quote}
            likes={card.likes}
            views={card.views}
            comments={card.comments}
          />
        ))}
      </div>
    </div>
  );
}
