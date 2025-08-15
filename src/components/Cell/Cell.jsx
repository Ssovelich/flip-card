import { forwardRef } from "react";
import styles from "./Cell.module.scss";

const Cell = forwardRef(({ type, short, isOpen, onClick, highlight }, ref) => {
  return (
    <div
      ref={ref}
      className={`${styles.cell} ${isOpen ? styles.open : ""} ${
        highlight ? styles.highlight : ""
      }`}
      onClick={onClick}
    >
      <div className={styles.inner}>
        <div className={styles.front}>
          <img src="/icons/$.svg" alt="$" />
        </div>

        <div className={styles.back}>
          {type === "cash" && (
            <span className={styles.cash}>
              <img
                className={styles.icon}
                src="/icons/cash.svg"
                alt="cash"
              />
              {short}
            </span>
          )}

          {type === "x2" && (
            <span className={styles.x2}>
              <img src="/icons/x.svg" alt="x" />
              <img src="/icons/2.svg" alt="2" />
            </span>
          )}

          {type === "zero" && (
            <span className={styles.zero}>
              <img src="/icons/zero.svg" alt="zero" />
            </span>
          )}

          {type === "stop" && (
            <span className={styles.stop}>
              <img src="/icons/stop.svg" alt="stop" />
            </span>
          )}

          {type === "bomb" && (
            <span className={styles.bomb}>
              <img src="/icons/bomb.svg" alt="bomb" />
            </span>
          )}
        </div>
      </div>
    </div>
  );
});

export default Cell;
