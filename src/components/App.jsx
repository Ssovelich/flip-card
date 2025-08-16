import { useState, useRef } from "react";
import styles from "./App.module.scss";
import Header from "../components/Header/Header";
import Cell from "../components/Cell/Cell";
import GameModal from "../components/GameModal/GameModal";
import RemainingCells from "./RemainingCells/RemainingCells";

const moneyMap = [
  { short: "100", value: 100 },
  { short: "500", value: 500 },
  { short: "1K", value: 1000 },
  { short: "10K", value: 10000 },
  { short: "1M", value: 1000000 },
];

const initialBoard = [
  "cash",
  "cash",
  "cash",
  "cash",
  "cash",
  "x2",
  "zero",
  "stop",
  "bomb",
];

const App = () => {
  const [board, setBoard] = useState(generateBoard);
  const [opened, setOpened] = useState([]);
  const [balance, setBalance] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [defuseCount, setDefuseCount] = useState(5);
  const [x2Active, setX2Active] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [highlightIndex, setHighlightIndex] = useState(null);
  const [flyingCash, setFlyingCash] = useState(null);
  const [isExploded, setIsExploded] = useState(false);
  const [canClaim, setCanClaim] = useState(false);
  const headerIconRef = useRef(null);
  const cellRefs = useRef([]);

  function shuffleArray(array) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  function generateBoard() {
    const shuffledMoney = shuffleArray(moneyMap);
    let moneyIndex = 0;

    return shuffleArray(initialBoard).map((type) => {
      if (type === "cash") {
        const { short, value } = shuffledMoney[moneyIndex];
        moneyIndex++;
        return { type, short, value };
      }
      return { type, short: null, value: null };
    });
  }

  function handleCellClick(index) {
    if (opened.includes(index) || gameOver) return;

    const cell = board[index];
    setOpened((prev) => [...prev, index]);

    if (cell.type === "x2") {
      setMultiplier((prev) => prev * 2);
      setBalance((prev) => prev * 2);
      setX2Active(true);
      return;
    }

    if (cell.type === "cash") {
      setHighlightIndex(index);

      const cellRect = cellRefs.current[index].getBoundingClientRect();
      const headerRect = headerIconRef.current.getBoundingClientRect();

      const startPos = {
        x: cellRect.left,
        y: cellRect.top,
        icon: "/icons/cash.svg",
        targetX: headerRect.left,
        targetY: headerRect.top,
        animate: false,
      };

      setFlyingCash(startPos);

      requestAnimationFrame(() => {
        setFlyingCash((prev) => ({ ...prev, animate: true }));
      });

      setTimeout(() => {
        setBalance((prev) => prev + cell.value * multiplier);
        setFlyingCash(null);
        setHighlightIndex(null);
      }, 600);
    }

    if (cell.type === "zero") {
      setBalance(0);
    }

    if (cell.type === "stop") {
      setModalType("stop");
      setGameOver(true);
    }

    if (cell.type === "bomb") {
      setIsExploded(true);

      setTimeout(() => {
        setIsExploded(false);
        setModalType("bomb");
      }, 800);
    }
  }

  function handleClaim() {
    setModalType("claim");
  }

  function handleRestart() {
    setBoard(generateBoard());
    setOpened([]);
    setBalance(0);
    setMultiplier(1);
    setX2Active(false);
    setGameOver(false);
    setModalType(null);
  }

  function handleTakeHit() {
    setGameOver(true);
    setModalType(null);
  }

  function handleDefuse() {
    if (defuseCount > 0) {
      setDefuseCount((prev) => prev - 1);
      setModalType(null);
      setOpened(board.map((_, idx) => idx));
      setCanClaim(true);
    }
  }

  function countRemaining(type) {
    return board.filter(
      (cell, idx) => cell.type === type && !opened.includes(idx)
    ).length;
  }

  return (
    <div className={`${styles.app} ${isExploded ? styles.bombExplode : ""}`}>
      <Header
        balance={balance}
        multiplier={multiplier}
        x2Active={x2Active}
        iconRef={headerIconRef}
      />

      <div className={styles.board}>
        {board.map((cell, idx) => (
          <Cell
            key={idx}
            ref={(el) => (cellRefs.current[idx] = el)}
            type={cell.type}
            short={cell.short}
            value={cell.value}
            isOpen={opened.includes(idx) || gameOver}
            onClick={() => handleCellClick(idx)}
            highlight={highlightIndex === idx}
          />
        ))}
      </div>

      <RemainingCells
        remaining={{
          cash: countRemaining("cash"),
          x2: countRemaining("x2"),
          zero: countRemaining("zero"),
          bomb: countRemaining("bomb"),
          stop: countRemaining("stop"),
        }}
      />

      <button
        className={styles.claimBtn}
        onClick={handleClaim}
        disabled={balance === 0 && !canClaim}
      >
        Claim
      </button>

      {flyingCash && (
        <img
          src={flyingCash.icon}
          alt="cash"
          className={`${styles.flyingCash} ${
            flyingCash.animate ? styles.animate : ""
          }`}
          style={{
            left: flyingCash.x,
            top: flyingCash.y,
            "--dx": `${flyingCash.targetX - flyingCash.x}px`,
            "--dy": `${flyingCash.targetY - flyingCash.y}px`,
          }}
        />
      )}

      {modalType && (
        <GameModal
          type={modalType}
          balance={balance}
          onRestart={handleRestart}
          onTakeHit={handleTakeHit}
          onDefuse={handleDefuse}
          onClaim={handleClaim}
          defuseCount={defuseCount}
        />
      )}
    </div>
  );
};

export default App;
