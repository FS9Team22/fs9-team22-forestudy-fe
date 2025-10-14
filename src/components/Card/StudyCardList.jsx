import { Card } from './Card';
import styles from './StudyCardList.module.css';

export function StudyCardList({ title, cards }) {
  return (
    <div className={styles.cardListSection}>
      <h3 className={styles.sectionTitle}>{title}</h3>
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
