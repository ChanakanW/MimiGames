import React, { useState, useEffect } from 'react';

type Tile = number | null; // null = ช่องว่าง

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
  const [timerId, setTimerId] = useState<NodeJS.Timer | null>(null);
  const [gameOver, setGameOver] = useState<boolean>(false);

  // เริ่มเกม
  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const initialTiles: Tile[] = shuffle([
      ...[...Array(8).keys()].map(n => n + 1),
      null,
    ]);
    setTiles(initialTiles);
    setStartTime(new Date());
    setElapsed(0);
    setGameOver(false);
  };

  // ตั้งเวลา
  useEffect(() => {
    if (!startTime || gameOver) return;
    const id = setInterval(() => {
      setElapsed(Math.floor((new Date().getTime() - startTime.getTime()) / 1000));
    }, 1000);
    setTimerId(id);
    return () => clearInterval(id);
  }, [startTime, gameOver]);

  // ตรวจชนะทุกครั้งที่ tiles เปลี่ยน
  useEffect(() => {
    if (!gameOver && tiles.length === 9 && isSolved(tiles)) {
      if (timerId) clearInterval(timerId);
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
    const canMove = [index - 1, index + 1, index - 3, index + 3].includes(blankIndex);

    if (index % 3 === 0 && blankIndex === index - 1) return;
    if (index % 3 === 2 && blankIndex === index + 1) return;

    if (canMove) {
      const newTiles = tiles.slice();
      [newTiles[index], newTiles[blankIndex]] = [newTiles[blankIndex], newTiles[index]];
      setTiles(newTiles);
    }
  };

  // หน้าเกมจบ
  if (gameOver) {
    return (
      <div style={{ textAlign: 'center', marginTop: 50 }}>
        <h1 style={{ fontSize: 40, color: '#4caf50', textShadow: '2px 2px #000' }}>🎉 TIME 🎉</h1>
        {/* <p style={{ fontSize: 24 }}> {elapsed} Second</p> */}
        <p style={{ fontSize: 24 }}>
 {Math.floor(elapsed / 60)} min {elapsed % 60} sec
</p>
        <button
          onClick={startNewGame}
          style={{
            marginTop: 30,
            padding: '12px 30px',
            fontSize: 18,
            backgroundColor: '#2196f3',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            boxShadow: '2px 2px 10px rgba(0,0,0,0.3)',
          }}
        >
          เล่นใหม่
        </button>
      </div>
    );
  }

  // หน้าเล่นเกม
  return (
    <div style={{ textAlign: 'center', marginTop: 20 }}>
      <h1 style={{ fontSize: 36, color: '#ff5722', textShadow: '1px 1px #000' }}>Sudoku</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 130px)',
          gridTemplateRows: 'repeat(3, 130px)',
          gap: 1,
          justifyContent: 'center',
          marginTop: 30,
        }}
      >
        {tiles.map((tile, idx) => (
          <div
            key={idx}
            onClick={() => moveTile(idx)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 120,
              height: 120,
              backgroundColor: tile ? '#18a1e0ff' : '#eeeeee',
              fontSize: 46,
              fontWeight: 'bold',
              color: tile ? '#fff' : '#ccc',
              cursor: tile ? 'pointer' : 'default',
              borderRadius: 12,
              boxShadow: tile ? '2px 2px 10px rgba(0,0,0,0.3)' : 'none',
              transition: 'all 0.3s ease',
              userSelect: 'none',
            }}
          >
            {tile}
          </div>
        ))}
      </div>
      {/* <p style={{ fontSize: 20, marginTop: 20 }}>เวลา: {elapsed} วินาที</p> */}
    </div>
  );
}
