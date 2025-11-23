import React, { useEffect, useState } from "react";

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

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const initialTiles: Tile[] = shuffle([
      ...[...Array(8).keys()].map((n) => n + 1),
      null,
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
    const canMove = [index - 1, index + 1, index - 3, index + 3].includes(
      blankIndex
    );

    if (index % 3 === 0 && blankIndex === index - 1) return;
    if (index % 3 === 2 && blankIndex === index + 1) return;

    if (canMove) {
      const newTiles = tiles.slice();
      [newTiles[index], newTiles[blankIndex]] = [
        newTiles[blankIndex],
        newTiles[index],
      ];
      setTiles(newTiles);
    }
  };

  const paddingSide = "5vw";
  const containerStyle: React.CSSProperties = {
    boxSizing: "border-box",
    paddingLeft: paddingSide,
    paddingRight: paddingSide,
    display: "flex",
    justifyContent: "center",
  };

  const boardWrapperStyle: React.CSSProperties = {
    width: "100%",
    maxWidth: 560,
  };

  // const cardStyle: React.CSSProperties = {
  //   background:
  //     "linear-gradient(180deg, rgba(255,255,255,0.85), rgba(245,245,250,0.85))",
  //   borderRadius: 18,
  //   padding: "18px",
  //   boxShadow: "0 8px 30px rgba(16,24,40,0.15), inset 0 1px 0 rgba(255,255,255,0.6)",
  //   border: "1px solid rgba(0,0,0,0.06)",
  // };

  const headerStyle: React.CSSProperties = {
    fontSize: 36,
    color: "#ff6a3d",
    textShadow: "0 2px 0 rgba(0,0,0,0.06)",
    margin: 0,
    padding: 0,
    letterSpacing: 0.5,
  };

  const timeBarStyle: React.CSSProperties = {
    width: "100%",
    marginTop: 2,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 8,
  };

  const timeBubbleStyle: React.CSSProperties = {
    padding: "6px 10px",
    fontSize: 14,
    background: "linear-gradient(90deg,#fff,#f7f9fc)",
    borderRadius: 999,
    border: "1px solid rgba(0,0,0,0.06)",
    boxShadow: "0 6px 14px rgba(13,38,59,0.05)",
    minWidth: 84,
    textAlign: "center",
    color: "#263238",
    fontWeight: 600,
  };

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridAutoRows: "1fr",
    gap: "1.5vmin",
    marginTop: 12,
  };

  const tileBaseStyle: React.CSSProperties = {
    width: "100%",
    aspectRatio: "1 / 1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "12px",
    userSelect: "none",
    transition: "transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease",
  };

  const fontSizeValue = "clamp(20px, 6vw, 48px)";

  const newBtnStyle: React.CSSProperties = {
    padding: "10px 18px",
    fontSize: 16,
    marginRight: 10,
    borderRadius: 12,
    border: "none",
    background:
      "linear-gradient(180deg, #4facfe 0%, #00f2fe 100%)", 
    color: "#fff",
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(0,162,255,0.18)",
    fontWeight: 700,
  };

  const smallNoteStyle: React.CSSProperties = {
    marginTop: 10,
    color: "#6b7280",
    fontSize: 13,
    textAlign: "center",
  };

  if (gameOver) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 5vw",
          boxSizing: "border-box",
          background:
            "radial-gradient(1200px 400px at 10% 10%, rgba(255,121,97,0.06), transparent), linear-gradient(180deg,#f5f7fb,#ffffff)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: 44, color: "#23c552", textShadow: "2px 2px #00000010" }}>
            🎉 TIME 🎉
          </h1>
          <p style={{ fontSize: 24, marginTop: 6 }}>
            {Math.floor(elapsed / 60)} min {elapsed % 60} sec
          </p>
          <button
            onClick={startNewGame}
            style={{
              marginTop: 30,
              padding: "12px 30px",
              fontSize: 18,
              backgroundColor: "#2196f3",
              color: "#fff",
              border: "none",
              borderRadius: 12,
              cursor: "pointer",
              boxShadow: "2px 8px 24px rgba(33,150,243,0.24)",
            }}
          >
            เล่นใหม่
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', marginTop: 20 }}>
      <h1 style={{ fontSize: 36, color: '#ff5722', textShadow: '1px 1px #000' }}>Sudoku</h1>

      <div style={containerStyle}>
        <div style={boardWrapperStyle}>
            <div>
            <div style={timeBarStyle}>
              <div >Time : {elapsed}</div>
            </div>

            <div style={gridStyle}>
              {tiles.map((tile, idx) => {
                const isBlank = tile === null;
                const bg = isBlank
                  ? "#e0e4eb"
                  : "linear-gradient(180deg,#18a1e0,#0a84c5)";
                const color = isBlank ? "#9aa4b2" : "#fff";
                return (
                  <button
                    key={idx}
                    onClick={() => moveTile(idx)}
                    aria-label={tile ? `Tile ${tile}` : "Blank"}
                    style={{
                      ...tileBaseStyle,
                      background: bg,
                      color,
                      fontSize: fontSizeValue,
                      fontWeight: 800,
                      border: isBlank ? "1px dashed rgba(0,0,0,0.04)" : "none",
                      cursor: isBlank ? "default" : "pointer",
                      boxShadow: isBlank
                        ? "inset 0 1px 0 rgba(255,255,255,0.6)"
                        : "0 8px 18px rgba(3, 102, 214, 0.12)",
                      transform: "translateZ(0)",
                    }}
                    onMouseDown={(e) => {
                      // small press effect
                      const el = e.currentTarget as HTMLButtonElement;
                      el.style.transform = "translateY(2px) scale(0.998)";
                    }}
                    onMouseUp={(e) => {
                      const el = e.currentTarget as HTMLButtonElement;
                      el.style.transform = "translateY(0) scale(1)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLButtonElement;
                      el.style.transform = "translateY(0) scale(1)";
                    }}
                  >
                    {tile}
                  </button>
                );
              })}
            </div>

            <div
              style={{
                padding: "8px 16px",
                fontSize: 16,
                marginRight: 10,
                marginTop: 18,
                display: "center",
                justifyContent: "center",
              }}
            >
              <button
                onClick={startNewGame}
                style={{
                  padding: "12px 26px",      // ใหญ่ขึ้น
                  fontSize: 18,              // ตัวหนังสือใหญ่ขึ้น
                  background: "#ffffff",     // สีขาวเรียบ
                  border: "1px solid #d1d5db", // ขอบบางสีเทาอ่อน (#d1d5db)
                  borderRadius: 12,          // โค้งมน
                  cursor: "pointer",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.08)", // เงาเบา ๆ
                  fontWeight: 600,
                  transition: "0.15s ease",
                }}
                onMouseDown={(e) => {
                  const el = e.currentTarget;
                  el.style.transform = "scale(0.97)";
                  el.style.boxShadow = "0 2px 6px rgba(0,0,0,0.06)";
                }}
                onMouseUp={(e) => {
                  const el = e.currentTarget;
                  el.style.transform = "scale(1)";
                  el.style.boxShadow = "0 4px 10px rgba(0,0,0,0.08)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.transform = "scale(1)";
                  el.style.boxShadow = "0 4px 10px rgba(0,0,0,0.08)";
                }}
              >
                สุ่มใหม่
              </button>
            </div>

            <div >
              เคลื่อนที่ได้ด้วยการกดที่ตัวเลข
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
