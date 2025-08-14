import styles from './Cell.module.scss';

const Cell = ({ type, value, isOpen, onClick }) => {
  return (
    <div
      className={`${styles.cell} ${isOpen ? styles.open : ''}`}
      onClick={onClick}
    >
      <div className={styles.inner}>
        <div className={styles.front}><img src="/src/assets/icons/$.svg" alt="$" /></div>
        <div className={styles.back}>
          {type === 'cash' && <span className={styles.cash}><img className={styles.icon} src="/src/assets/icons/cash.svg" alt="cash" />{value}</span>}
          {type === 'x2' && <span className={styles.x2}><img src="/src/assets/icons/x.svg" alt="x" /><img src="/src/assets/icons/2.svg" alt="2" /></span>}
          {type === 'zero' && <span className={styles.zero}><img src="/src/assets/icons/zero.svg" alt="zero" /></span>}
          {type === 'bomb' && <span className={styles.bomb}><img src="/src/assets/icons/bomb.svg" alt="bomb" /></span>}
        </div>
      </div>
    </div>
  );
};

export default Cell;
