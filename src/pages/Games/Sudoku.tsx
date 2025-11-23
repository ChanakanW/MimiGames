import React, { useEffect, useState } from "react";
import "./CSS/Sudoku.css";

type Tile = number | null;

function shuffle(array: Tile[]): Tile[] {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function Sudoku() {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsed, setElapsed] = useState<number>(0);
  const [timerId, setTimerId] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState<boolean>(false);

  useEffect(() => { startNewGame(); }, []);

  const startNewGame = () => {
    const initialTiles: Tile[] = shuffle([
  ...[...Array(8).keys()].map(n => n + 1),
  null
]);
    setTiles(initialTiles);
    setStartTime(new Date());
    setElapsed(0);
    setGameOver(false);
    if (timerId) {
      window.clearInterval(timerId);
      setTimerId(null);
    }
  };

  useEffect(() => {
    if (!startTime || gameOver) return;
    const id = window.setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime.getTime()) / 1000));
    }, 1000);
    setTimerId(id);
    return () => window.clearInterval(id);
  }, [startTime, gameOver]);

  useEffect(() => {
    if (!gameOver && tiles.length === 9 && isSolved(tiles)) {
      if (timerId) window.clearInterval(timerId);
      setGameOver(true);
    }
  }, [tiles]);

  const isSolved = (tilesToCheck: Tile[]) => {
    for (let i = 0; i < 8; i++) if (tilesToCheck[i] !== i + 1) return false;
    return tilesToCheck[8] === null;
  };

  const moveTile = (index: number) => {
    if (gameOver) return;
    const blankIndex = tiles.indexOf(null);
    const canMove = [index-1, index+1, index-3, index+3].includes(blankIndex);
    if (index % 3 === 0 && blankIndex === index-1) return;
    if (index % 3 === 2 && blankIndex === index+1) return;
    if (canMove) {
      const newTiles = tiles.slice();
      [newTiles[index], newTiles[blankIndex]] = [newTiles[blankIndex], newTiles[index]];
      setTiles(newTiles);
    }
  };

  const fontSizeValue = "clamp(20px, 6vw, 48px)";

  if (gameOver) {
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <h1 style={{ fontSize: 44, color: "#23c552", textShadow: "2px 2px #00000010" }}>🎉 TIME 🎉</h1>
        <p style={{ fontSize: 24 }}>{Math.floor(elapsed/60)} min {elapsed % 60} sec</p>
        <button onClick={startNewGame} style={{marginTop:30, padding:"12px 30px", fontSize:18, backgroundColor:"#2196f3", color:"#fff", border:"none", borderRadius:12, cursor:"pointer"}}>เล่นใหม่</button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', marginTop: 20 }}>
      <h1 className="sudoku-header">Sudoku</h1>

      <div className="sudoku-container">
        <div className="sudoku-board-wrapper">
          <div className="sudoku-time-bar">
            <div>Time : {elapsed}</div>
          </div>

          <div className="sudoku-grid">
            {tiles.map((tile, idx) => {
              const isBlank = tile === null;
              return (
                <button
                  key={idx}
                  onClick={() => moveTile(idx)}
                  aria-label={tile ? `Tile ${tile}` : "Blank"}
                  className={`sudoku-tile ${isBlank ? 'blank' : 'number'}`}
                  style={{ fontSize: fontSizeValue }}
                >
                  {tile}
                </button>
              );
            })}
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <button className="sudoku-new-btn" onClick={startNewGame}>
              สุ่มใหม่
            </button>
          </div>

          <div className="sudoku-note">
            เคลื่อนที่ได้ด้วยการกดที่ตัวเลข
          </div>
        </div>
      </div>
    </div>
  );
}
