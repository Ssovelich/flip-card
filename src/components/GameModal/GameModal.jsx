import styles from "./GameModal.module.scss";

const GameModal = ({ type, balance, onRestart, onDefuse, onClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <img className={styles.logo} src="/icons/logo.svg" alt="logo" />
        {type === "bomb" && (
          <>
            <h2 className={`${styles.title} ${styles.titleDenger}`}>
              Danger ahead!
            </h2>
            <p>
              You’re on a Bomb Square! You hit a bomb and lose all rewards from
              this field...
            </p>
            <span className={styles.iconModal}>
              <img src="/icons/bomb.svg" alt="bomb" />
            </span>
            <span className={styles.cash}>
              <img className={styles.icon} src="/icons/cash.svg" alt="cash" />
              {balance}
            </span>
            <p>...or defuse it and save your run!</p>
            <div className={styles.actions}>
              <button
                className={`${styles.btn} ${styles.btnHit}`}
                onClick={onRestart}
              >
                <span>
                  <img
                    src="/icons/bomb.svg"
                    height={24}
                    width={24}
                    alt="bomb"
                  />
                </span>
                Take a hit
              </button>
              <button
                className={`${styles.btn} ${styles.btnDef}`}
                onClick={onDefuse}
              >
                Defuse for
                <span>
                  <img src="/gem.png" alt="gem" />
                </span>
              </button>
            </div>
          </>
        )}

        {type === "stop" && (
          <>
            <h2 className={`${styles.title} ${styles.titleGameOver}`}>
              Game over!
            </h2>
            <p>You've reached the end of this run...</p>
            <span className={styles.iconModal}>
              <img src="/icons/stop.svg" alt="stop" />
            </span>
            <span className={styles.cash}>
              <img className={styles.icon} src="/icons/cash.svg" alt="cash" />
              {balance}
            </span>
            <p>...claim and return to the main board</p>
            <div className={styles.actions}>
              <button
                className={`${styles.btn} ${styles.btnClaim}`}
                onClick={onRestart}
              >
                Claim
              </button>
            </div>
          </>
        )}

        {type === "claim" && (
          <>
            <h2>You won {balance} coins!</h2>

            <span className={styles.cash}>
              <img className={styles.icon} src="/icons/cash.svg" alt="cash" />
              {balance}
            </span>
            <div className={styles.actions}>
              <button className={styles.btn} onClick={onRestart}>
                Restart
              </button>
              <button className={styles.btn} onClick={onClose}>
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GameModal;
