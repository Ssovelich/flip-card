import React, { useState } from "react";
import styles from "./App.module.scss";
import Header from "../components/Header/Header";
import Cell from "../components/Cell/Cell";
import GameModal from "../components/GameModal/GameModal";

const initialBoard = [
  "cash",
  "cash",
  "cash",
  "cash",
  "cash",
  "x2",
  "zero",
  "zero",
  "bomb",
];

const App = () => {
  const [board, setBoard] = useState(shuffleArray(initialBoard));
  const [opened, setOpened] = useState([]);
  const [balance, setBalance] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [x2Active, setX2Active] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [modalType, setModalType] = useState(null);

  function shuffleArray(array) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  function handleCellClick(index) {
    if (opened.includes(index) || gameOver) return;

    const type = board[index];
    setOpened((prev) => [...prev, index]);

    if (type === "cash") {
      setBalance((prev) => prev + 10 * multiplier);
    } else if (type === "x2") {
      setMultiplier((prev) => prev * 2);
      setBalance((prev) => prev * 2);
      setX2Active(true); // показуємо бейдж
    } else if (type === "bomb") {
      setModalType("bomb");
      setGameOver(true);
    }
  }

  function handleClaim() {
    setModalType("claim");
  }

  function handleRestart() {
    setBoard(shuffleArray(initialBoard));
    setOpened([]);
    setBalance(0);
    setMultiplier(1);
    setX2Active(false); // ховаємо при рестарті
    setGameOver(false);
    setModalType(null);
  }

  return (
    <div className={styles.app}>
      <Header balance={balance} multiplier={multiplier} x2Active={x2Active} />

      <div className={styles.board}>
        {board.map((type, idx) => (
          <Cell
            key={idx}
            type={type}
            value={type === "cash" ? 10 : null}
            isOpen={opened.includes(idx) || gameOver}
            onClick={() => handleCellClick(idx)}
          />
        ))}
      </div>

      <button
        className={styles.claimBtn}
        onClick={handleClaim}
        disabled={balance === 0}
      >
        Claim
      </button>

      {modalType && (
        <GameModal
          type={modalType}
          balance={balance}
          onClose={() => setModalType(null)}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default App;
