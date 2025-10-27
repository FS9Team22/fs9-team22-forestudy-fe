import { useState, useEffect } from 'react';
import Picker from 'emoji-picker-react';
import {
  fetchReactions,
  addReaction,
} from '@/api/ReactionService/ReactionService';
import smileIcon from '@/assets/icons/ic_smile.svg';
import styles from './Reaction.module.css';

const Reaction = ({ studyId }) => {
  const [reactions, setReactions] = useState({});
  const [showPicker, setShowPicker] = useState(false);
  const [showReactionPopup, setShowReactionPopup] = useState(false);

  useEffect(() => {
    if (!studyId) return;
    fetchReactions(studyId).then(setReactions);
  }, [studyId]);

  const handleReaction = async (emoji) => {
    setReactions((prev) => ({
      ...prev,
      [emoji]: prev[emoji] ? prev[emoji] + 1 : 1,
    }));
    await addReaction(studyId, emoji);
  };

  const onEmojiClick = (emojiObject) => {
    handleReaction(emojiObject.emoji);
    setShowPicker(false);
  };

  const reactionEntries = Object.entries(reactions);
  const visibleReactions = reactionEntries.slice(0, 3);
  const hiddenReactions = reactionEntries.slice(3);
  const hasMoreReactions = reactionEntries.length > 3;

  // 팝업 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showReactionPopup &&
        !event.target.closest(`.${styles.reactionPopup}`) &&
        !event.target.closest(`.${styles.moreReactionsButton}`)
      ) {
        setShowReactionPopup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showReactionPopup]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        marginTop: '1rem',
        position: 'relative',
      }}
    >
      <div className={styles.reactionContainer}>
        {/* 처음 3개 이모지만 표시 */}
        {visibleReactions.map(([emoji, count]) => (
          <button
            key={emoji}
            onClick={() => handleReaction(emoji)}
            className={styles.reactionButton}
          >
            {emoji} {count}
          </button>
        ))}

        {/* 더 많은 리액션이 있을 때 +N 버튼 표시 */}
        {hasMoreReactions && (
          <button
            onClick={() => setShowReactionPopup((prev) => !prev)}
            className={styles.moreReactionsButton}
          >
            +{hiddenReactions.length}
          </button>
        )}

        <button
          onClick={() => setShowPicker((prev) => !prev)}
          className={styles.pickerToggle}
        >
          <img
            src={smileIcon}
            alt="반응 추가 버튼"
            className={styles.pickerIcon}
          />{' '}
          추가
        </button>
      </div>

      {showPicker && (
        <div style={{ position: 'absolute', zIndex: 100 }}>
          <Picker onEmojiClick={onEmojiClick} />
        </div>
      )}

      {/* 리액션 팝업 */}
      {showReactionPopup && (
        <div className={styles.reactionPopup}>
          <div className={styles.popupHeader}>
            <button
              onClick={() => setShowReactionPopup(false)}
              className={styles.closeButton}
            >
              ×
            </button>
          </div>
          <div className={styles.popupContent}>
            {reactionEntries.map(([emoji, count]) => (
              <button
                key={emoji}
                onClick={() => {
                  handleReaction(emoji);
                  setShowReactionPopup(false);
                }}
                className={styles.popupReactionButton}
              >
                {emoji} {count}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Reaction;
