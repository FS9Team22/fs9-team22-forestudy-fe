import styles from './Background.module.css';

export function BackgroundList({ backgrounds, bgSelected, setBgSelected }) {
  return (
    <div className={styles.bgOptionsContainer}>
      {backgrounds.map((bg) => (
        <label key={bg.id} className={styles.bgOptions}>
          {bgSelected === bg.id && (
            <div className={styles.selectedContainer}>
              <div className={styles.selected}></div>
            </div>
          )}
          <input
            type="radio"
            name="background"
            value={bg.id}
            checked={bgSelected === bg.id}
            onChange={() => setBgSelected(bg.id)}
          />
          {bg.type === 'color' ? (
            <div
              className={styles.bgPreview}
              style={{ backgroundColor: bg.value }}
            />
          ) : (
            <img className={styles.bgPreview} src={bg.value} alt={bg.id} />
          )}
        </label>
      ))}
    </div>
  );
}
