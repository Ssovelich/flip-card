import styles from './GameModal.module.scss';

const GameModal = ({ type, balance, onClose, onRestart }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {type === 'bomb' && <h2>💣 Game Over!</h2>}
        {type === 'claim' && <h2>You won {balance} coins!</h2>}
        <div className={styles.actions}>
          <button onClick={onRestart}>Restart</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default GameModal;