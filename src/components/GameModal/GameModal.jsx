import styles from "./GameModal.module.scss";

const GameModal = ({ type, balance, onRestart, onDefuse, defuseCount }) => {
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
              <div className={styles.wrapper}>
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
                  disabled={defuseCount === 0}
                >
                  Defuse for
                  <span>
                    <img src="/gem.png" alt="gem" />
                  </span>
                  {defuseCount}
                </button>
              </div>
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

              <div className={styles.shareBlock}>
                <button
                  className={`${styles.btn} ${styles.btnShare}`}
                  onClick={() => {
                    const text = `🎉 I just won ${balance} coins in Roll Craft! 🚀`;
                    const url = "https://flip-card-mu-sepia.vercel.app/";

                    if (navigator.share) {
                      navigator.share({
                        title: "Roll Craft",
                        text,
                        url,
                      });
                    } else {
                      window.open(
                        `https://www.facebook.com/dialog/send?link=${encodeURIComponent(
                          url
                        )}&app_id=123456789&redirect_uri=${encodeURIComponent(
                          url
                        )}`,
                        "_blank"
                      );
                    }
                  }}
                >
                  <img src="/messenger.png" alt="Messenger" />
                </button>

                {/* WhatsApp */}
                <a
                  className={`${styles.btn} ${styles.btnWhatsapp}`}
                  href={`https://wa.me/?text=${encodeURIComponent(
                    `🎉 I just won ${balance} coins in Roll Craft! 🚀 https://your-game-link.com`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src="/whatsapp.png" alt="WhatsApp" />
                </a>

                {/* Telegram */}
                <a
                  className={`${styles.btn} ${styles.btnTelegram}`}
                  href={`https://t.me/share/url?url=${encodeURIComponent(
                    "https://your-game-link.com"
                  )}&text=${encodeURIComponent(
                    `🎉 I just won ${balance} coins in Roll Craft! 🚀`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src="/telegram.png" alt="Telegram" />
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GameModal;
