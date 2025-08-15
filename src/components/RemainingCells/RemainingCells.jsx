import styles from "./RemainingCells.module.scss";

const RemainingCells = ({ remaining }) => {
  return (
    <div className={styles.remaining}>
      <div className={styles.item}>
        <img
          className={styles.icon}
          src="/src/assets/icons/cash.svg"
          alt="cash"
        />
        <span>{remaining.cash}</span>
      </div>
      <div className={styles.item}>
        <span className={styles.x2}>
         <p>x2</p>
        </span>
        <span>{remaining.x2}</span>
      </div>
      <div className={styles.item}>
        <span className={styles.zero}>
          <img src="/src/assets/icons/zero.svg" alt="zero" />
        </span>
        <span>{remaining.zero}</span>
      </div>
      <div className={styles.item}>
        <span className={styles.bomb}>
          <img src="/src/assets/icons/bomb.svg" alt="bomb" />
        </span>
        <span>{remaining.bomb}</span>
      </div>
      <div className={styles.item}>
        <span className={styles.stop}>
          <img src="/src/assets/icons/stop.svg" alt="stop" />
        </span>
        <span>{remaining.stop}</span>
      </div>
    </div>
  );
};

export default RemainingCells;
