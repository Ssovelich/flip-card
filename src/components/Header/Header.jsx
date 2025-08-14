import CountUp from "react-countup";
import { useRef } from "react";
import styles from "./Header.module.scss";

const Header = ({ balance, multiplier, x2Active }) => {
  const prevBalanceRef = useRef(balance);

  const startValue = prevBalanceRef.current;
  prevBalanceRef.current = balance;

  return (
    <div className={styles.header}>
      <h1>Roll Craft</h1>
      <div className={styles.wrapper}>
        {x2Active && (
          <div className={`${styles.x2} ${styles.pop}`}>×{multiplier}</div>
        )}
        <div className={styles.balance}>
          <img
            className={styles.icon}
            src="/src/assets/icons/cash.svg"
            alt="cash"
          />
          <CountUp
            start={startValue}
            end={balance}
            duration={0.5}
            separator=","
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
