import React, { useState } from 'react';
import Picker from 'emoji-picker-react';
import styles from './Reaction.module.css';

const Reaction = () => {
  const [reactions, setReactions] = useState({
    '👍': 0,
    '❤️': 0,
    '😂': 0,
  });
  const [showPicker, setShowPicker] = useState(false);

  // 버튼 클릭 시 카운트 증가
  const handleReaction = (emoji) => {
    setReactions((prev) => ({
      ...prev,
      [emoji]: prev[emoji] ? prev[emoji] + 1 : 1,
    }));
  };

  // Picker에서 선택 시
  const onEmojiClick = (emojiObject) => {
    const emoji = emojiObject.emoji;
    handleReaction(emoji);
    setShowPicker(false);
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', marginTop: '1rem' }}
    >
      {/* 기존 반응 버튼 */}
      <div className={styles.reactionContainer}>
        {Object.entries(reactions).map(([emoji, count]) => (
          <button
            key={emoji}
            onClick={() => handleReaction(emoji)}
            className={styles.reactionButton}
          >
            {emoji} {count}
          </button>
        ))}
        <button
          onClick={() => setShowPicker((prev) => !prev)}
          className={styles.pickerToggle}
        >
          <img
            src="/images/ic_smile.png"
            alt="smile"
            className={styles.pickerIcon}
          />
          추가
        </button>
      </div>

      {/* Picker */}
      {showPicker && (
        <div style={{ position: 'absolute', zIndex: 100 }}>
          <Picker onEmojiClick={onEmojiClick} />
        </div>
      )}
    </div>
  );
};

export default Reaction;
