import React, { useState, useEffect } from 'react';
import Picker from 'emoji-picker-react';
import {
  fetchReactions,
  addReaction,
} from '../../api/ReactionService/ReactionService';
import styles from './Reaction.module.css';

const Reaction = ({ studyId }) => {
  const [reactions, setReactions] = useState({});
  const [showPicker, setShowPicker] = useState(false);

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

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', marginTop: '1rem' }}
    >
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
          />{' '}
          추가
        </button>
      </div>

      {showPicker && (
        <div style={{ position: 'absolute', zIndex: 100 }}>
          <Picker onEmojiClick={onEmojiClick} />
        </div>
      )}
    </div>
  );
};

export default Reaction;
