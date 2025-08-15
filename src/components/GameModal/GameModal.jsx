import styles from './GameModal.module.scss';

const GameModal = ({ type, balance, onRestart, onTakeHit, onDefuse, onClaim, onClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {type === 'bomb' && (
          <>
            <h2>💣 Danger ahead!</h2>
            <p>You’re on a Bomb Square! You hit a bomb and lose all rewards from this field...</p>
            <p>...or defuse it and save your run!</p>
            <div className={styles.actions}>
              <button onClick={onTakeHit}>Take a hit</button>
              <button onClick={onDefuse}>Defuse for</button>
            </div>
          </>
        )}

        {type === 'stop' && (
          <>
            <h2>Game over!</h2>
            <p>You've reached the end of this run...</p>
            <p>...claim and return to the main board</p>
            <div className={styles.actions}>
              <button onClick={onClaim}>Claim</button>
            </div>
          </>
        )}

        {type === 'claim' && (
          <>
            <h2>You won {balance} coins!</h2>
            <div className={styles.actions}>
              <button onClick={onRestart}>Restart</button>
              <button onClick={onClose}>Close</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GameModal;
