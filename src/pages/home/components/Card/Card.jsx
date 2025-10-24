import workspaceWindowDeskImg from '../../../../assets/card/images/desk1.png';
import workspaceDetailDeskImg from '../../../../assets/card/images/desk2.png';
import patternImg from '../../../../assets/card/images/pattern.png';
import leavesImg from '../../../../assets/card/images/leaves.png';
import styles from './Card.module.css';
import pointIcon from '../../../../assets/icons/ic_point.svg';

const BACKGROUND_MAP = {
  1: {
    backgroundColor: '#E1EDDE',
    nicknameColor: '#578246',
    otherColor: '#111',
  },
  2: {
    backgroundColor: '#FFF1CC',
    nicknameColor: '#C18E1B',
    otherColor: '#111',
  },
  3: {
    backgroundColor: '#E0F1F5',
    nicknameColor: '#22d7ff',
    otherColor: '#111',
  },
  4: {
    backgroundColor: '#FDE0E9',
    nicknameColor: '#ff3676',
    otherColor: '#111',
  },
  5: {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${workspaceWindowDeskImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    nicknameColor: '#fff',
  },
  6: {
    background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${workspaceDetailDeskImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    nicknameColor: '#fff',
  },
  7: {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${patternImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    nicknameColor: '#fff',
  },
  8: {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${leavesImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    nicknameColor: '#fff',
  },
};
export function Card({ card }) {
  const overlayStyle = BACKGROUND_MAP[card.background] || {
    backgroundColor: '#000',
    nicknameColor: '#fff',
    otherColor: '#111',
  };

  return (
    <div className={styles.card}>
      <div className={styles.overlay} style={overlayStyle}>
        <div className={styles.header}>
          <div className={styles.titleBox}>
            <h2
              className={styles.title}
              style={{ color: overlayStyle.nicknameColor }}
            >
              {card.nickname}의
            </h2>
            <h2
              className={styles.title}
              style={{ color: overlayStyle.otherColor }}
            >
              {card.title}
            </h2>
          </div>
          <span
            className={styles.points}
            style={{ color: overlayStyle.otherColor }}
          >
            <img src={pointIcon} alt="point" className={styles.pointIcon} />{' '}
            {card.point}P 획득
          </span>
        </div>
        {/* <p className={styles.status}>{status}</p> */}
        <p className={styles.quote} style={{ color: overlayStyle.otherColor }}>
          {card.description}
        </p>
        {card.reactions?.length > 0 && (
          <ul className={styles.footer}>
            {card.reactions.map((reaction) => (
              <li key={reaction.id} className={styles.reaction}>
                <span className={styles.icon}>{reaction.emoji}</span>
                <span className={styles.count}>{reaction.count}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
