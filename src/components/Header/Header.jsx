import CountUp from "react-countup";
import { useRef } from "react";
import styles from "./Header.module.scss";

const Header = ({ balance, multiplier, iconRef }) => {
  const prevBalanceRef = useRef(balance);
  const startValue = prevBalanceRef.current;
  prevBalanceRef.current = balance;

  return (
    <div className={styles.header}>
      <img
        className={styles.logo}
        src="/src/assets/icons/logo.svg"
        alt="logo"
      />
      <h1 className={styles.titleWrapper}>
        <span className={styles.line}></span>
        <span className={styles.title}>Roll Craft</span>
        <span className={styles.line}></span>
      </h1>
      <div className={styles.wrapper}>
        {multiplier > 1 && (
          <div className={`${styles.x2} ${styles.pop}`}>x{multiplier}</div>
        )}
        <div className={styles.balance}>
          <img
            ref={iconRef}
            className={styles.icon}
            src="/src/assets/icons/cash.svg"
            alt="cash"
          />
          <CountUp
            start={startValue}
            end={balance}
            duration={0.5}
            separator=" "
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
