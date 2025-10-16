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
            nickname={card.nickname}
            status={card.status}
            point={card.point}
            description={card.description}
            background={card.background}
            likes={card.likes}
            views={card.views}
            comments={card.comments}
          />
        ))}
      </div>
    </div>
  );
}
