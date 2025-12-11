import React, { useEffect, useMemo, useState } from "react";

/**
 * MatchingGames.tsx
 * Single-file React + TypeScript component implementing:
 * - Auto progression levels: 3 pairs -> 10 pairs -> 15 pairs
 * - Preview with countdown (5 / 8 / 10 seconds)
 * - CSS flip animation for preview and on-click
 * - Start timing after preview ends; record missCount & elapsed time (not shown)
 * - Each icon appears exactly 2 times (1 pair) per level
 *
 * Adjustments made:
 * - The card board now scales to fit the viewport and stays within the container
 * - Grid always forms a near-square layout: columns = ceil(sqrt(totalCards))
 * - Each card keeps square aspect-ratio and scales with screen size
 */

type Card = {
  uid: string;
  icon: string;
  matched: boolean;
  flipped: boolean; // true => showing face
};

const LEVELS = [
  { pairs: 3, previewMs: 5_000 },
  { pairs: 10, previewMs: 8_000 },
  { pairs: 15, previewMs: 10_000 },
];

const ICON_POOL = [
  "🐶","🐱","🦊","🐻","🐼","🐨","🐯","🦁","🐮","🐷",
  "🐵","🐸","🐙","🦄","🐝","🐞","🐢","🐬","🐳","🐔",
  "🍎","🍌","🍇","🍓","🍑","🍍","🥝","🍉","🍒","🍋",
];

const shuffle = <T,>(arr: T[]) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const makeDeck = (pairs: number): Card[] => {
  const icons = shuffle(ICON_POOL).slice(0, pairs);
  const deck: Card[] = [];
  icons.forEach((icon, idx) => {
    deck.push({ uid: `${idx}-a`, icon, matched: false, flipped: true });
    deck.push({ uid: `${idx}-b`, icon, matched: false, flipped: true });
  });
  return shuffle(deck);
};

export default function MatchingGames(): JSX.Element {
  const [levelIndex, setLevelIndex] = useState(0); // 0 -> 1 -> 2
  const { pairs, previewMs } = LEVELS[levelIndex];

  const [cards, setCards] = useState<Card[]>(() => makeDeck(LEVELS[0].pairs));
  const [previewing, setPreviewing] = useState(true);
  const [countdown, setCountdown] = useState(Math.ceil(previewMs / 1000));
  const [openIdxs, setOpenIdxs] = useState<number[]>([]);
  const [disableClicks, setDisableClicks] = useState(true);

  // Stats (kept but not displayed) and per-level stats
  const [missCount, setMissCount] = useState(0);
  const [startTs, setStartTs] = useState<number | null>(null);
  const [finishTs, setFinishTs] = useState<number | null>(null);
  const [levelStats, setLevelStats] = useState<Array<{ level: number; elapsed: number; miss: number }>>(
    []
  );
  const [showResults, setShowResults] = useState(false);

  // total cards
  const totalCards = pairs * 2;

  // grid columns derived to force **max 5 columns** so cards become larger
  const columns = pairs === 3 ? 3 : 5;

  // (re)start current level
  const startCurrentLevel = (idx: number) => {
    const lvl = LEVELS[idx];
    const deck = makeDeck(lvl.pairs);
    setCards(deck);
    setPreviewing(true);
    setCountdown(Math.ceil(lvl.previewMs / 1000));
    setOpenIdxs([]);
    setDisableClicks(true);
    setMissCount(0);
    setStartTs(null);
    setFinishTs(null);

    // countdown interval for UI
    const step = 1000;
    let remaining = lvl.previewMs;
    const iv = setInterval(() => {
      remaining -= step;
      setCountdown(Math.max(0, Math.ceil(remaining / 1000)));
    }, step);

    // after previewMs, flip all down and allow play
    const t = setTimeout(() => {
      clearInterval(iv);
      setCards(prev => prev.map(c => ({ ...c, flipped: false })));
      setPreviewing(false);
      setDisableClicks(false);
      setStartTs(Date.now());
    }, lvl.previewMs);

    // cleanup if component re-renders before timeout
    return () => {
      clearInterval(iv);
      clearTimeout(t);
    };
  };

  // init first level
  useEffect(() => {
    startCurrentLevel(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // helper to start next level or finish
  const proceedNext = () => {
    if (levelIndex < LEVELS.length - 1) {
      // small delay before next level
      setTimeout(() => {
        setLevelIndex(i => {
          const next = i + 1;
          startCurrentLevel(next);
          return next;
        });
      }, 900);
    } else {
      // all levels completed; show results
      setShowResults(true);
    }
  };

  // click handler
  const handleClick = (idx: number) => {
    if (disableClicks) return;
    const c = cards[idx];
    if (!c || c.flipped || c.matched) return;

    // flip this card
    setCards(prev => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], flipped: true };
      return copy;
    });

    setOpenIdxs(prev => {
      const next = [...prev, idx];
      if (next.length === 2) {
        setDisableClicks(true);
        const [i1, i2] = next;

        // create updated snapshot
        const updated = (() => {
          const arr = [...cards];
          arr[i1] = { ...arr[i1], flipped: true };
          arr[i2] = { ...arr[i2], flipped: true };
          return arr;
        })();

        if (updated[i1].icon === updated[i2].icon) {
          // matched
          setTimeout(() => {
            setCards(prevCards =>
              prevCards.map((cc, j) => (j === i1 || j === i2 ? { ...cc, matched: true } : cc))
            );
            setOpenIdxs([]);
            setDisableClicks(false);
          }, 350);
        } else {
          // miss
          setMissCount(m => m + 1);
          setTimeout(() => {
            setCards(prevCards =>
              prevCards.map((cc, j) => (j === i1 || j === i2 ? { ...cc, flipped: false } : cc))
            );
            setOpenIdxs([]);
            setDisableClicks(false);
          }, 800);
        }
      }
      return next.slice(-2);
    });
  };

  // watch for finish of current level
  useEffect(() => {
    if (cards.length > 0 && cards.every(c => c.matched)) {
      if (!finishTs) setFinishTs(Date.now());
      setDisableClicks(true);

      // compute level elapsed and save stats
      if (startTs) {
        const elapsed = (Date.now() - startTs) / 1000;
        setLevelStats(prev => [...prev, { level: levelIndex + 1, elapsed, miss: missCount }]);
      } else {
        setLevelStats(prev => [...prev, { level: levelIndex + 1, elapsed: 0, miss: missCount }]);
      }

      // auto proceed to next level (if any) or show results
      proceedNext();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards]);

  // when all levels done, compute aggregated stats
  const totalElapsed = levelStats.reduce((s, l) => s + l.elapsed, 0);
  const totalMiss = levelStats.reduce((s, l) => s + l.miss, 0);
  const totalPairsMatched = LEVELS.reduce((s, l) => s + l.pairs, 0);
  const processingSpeedPairsPerSec = totalElapsed > 0 ? totalPairsMatched / totalElapsed : 0; // pairs per second
  const processingSpeedCardsPerSec = processingSpeedPairsPerSec * 2; // cards per second

  // formatted elapsed (not displayed by requirement)
  useEffect(() => {
    if (startTs && finishTs) {
      const elapsed = (finishTs - startTs) / 1000;
      // stats kept but not shown; could be saved to localStorage or API
      // localStorage.setItem(`matching_stats_level_${levelIndex+1}`, JSON.stringify({ elapsed, missCount }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finishTs]);

  // simple restart all levels
  const restartAll = () => {
    setLevelStats([]);
    setShowResults(false);
    setLevelIndex(0);
    startCurrentLevel(0);
  };

  // result screen
  if (showResults) {
    return (
      <div
  style={{
    padding: 16,
    fontFamily: "Inter, Arial, sans-serif",
    minHeight: "100vh",
    background: "linear-gradient(180deg, #f3f4f6 0%, #e5e7eb 100%)", // พื้นหลังโทนอ่อน
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }}
>
  {/* กล่องสรุปใหญ่ */}
  <div
    style={{
      width: "100%",
      maxWidth: 480,
      background: "#ffffff",
      padding: 20,
      borderRadius: 12,
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    }}
  >
    <h2 style={{ margin: 0, marginBottom: 12, textAlign: "center" }}>🎉 ผลลัพธ์สรุป</h2>

    {/* TIME */}
    <div
      style={{
        padding: 16,
        borderRadius: 10,
        background: "#f9fafb",
        marginBottom: 14,
        textAlign: "center",
        border: "1px solid #e5e7eb",
      }}
    >
      <div style={{ fontSize: 18, color: "#374151" }}>Time</div>
      <div style={{ fontSize: 36, fontWeight: 700, color: "#111827" }}>
        {totalElapsed.toFixed(0)}s
      </div>
    </div>

    {/* SPEED BLOCK */}
    <div
      style={{
        padding: 16,
        borderRadius: 10,
        background: "#eef2ff",
        border: "1px solid #c7d2fe",
        marginBottom: 14,
      }}
    >
      <div style={{ fontSize: 18, color: "#1e3a8a", fontWeight: 600 }}>
        Processing speed
      </div>

      <div style={{ marginTop: 6, fontSize: 16 }}>
        <strong>{processingSpeedPairsPerSec.toFixed(3)}</strong> คู่/วินาที
      </div>

      <div style={{ marginTop: 2, fontSize: 14, color: "#4b5563" }}>
        ({processingSpeedCardsPerSec.toFixed(3)} ใบ/วินาที)
      </div>
    </div>

    {/* รวมเปิดผิด */}
    <div
      style={{
        padding: 14,
        background: "#fdfdfd",
        borderRadius: 10,
        border: "1px solid #e5e7eb",
      }}
    >
      <div style={{ fontSize: 16, color: "#374151" }}>
        <strong>จำนวนครั้งที่เปิดผิดทั้งหมด:</strong> {totalMiss} ครั้ง
      </div>
    </div>
  </div>

  {/* รายละเอียดต่อด่าน */}
  <h3 style={{ marginTop: 20, marginBottom: 8, color: "#374151" }}>

  </h3>

  <div
    style={{
      width: "100%",
      maxWidth: 480,
      display: "grid",
      gap: 10,
    }}
  >
    {levelStats.map((ls) => (
      <div
        key={ls.level}
        style={{
          padding: 12,
          borderRadius: 10,
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <div style={{ fontWeight: 600, marginBottom: 4 }}>ด่าน {ls.level}</div>
        <div>เวลา: {ls.elapsed.toFixed(1)} วินาที</div>
        <div>เปิดผิด: {ls.miss} ครั้ง</div>
      </div>
    ))}
  </div>

  {/* ปุ่มเล่นใหม่ */}
  <button
    onClick={restartAll}
    style={{
      marginTop: 20,
      padding: "10px 20px",
      borderRadius: 8,
      background: "#2563eb",
      color: "#fff",
      border: "none",
      fontSize: 16,
      cursor: "pointer",
      boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
    }}
  >
    เล่นใหม่
  </button>
</div>

    );
  }

  // CSS styles for flip effect
  const styles: { [k: string]: React.CSSProperties } = {
    container: {
      padding: 6,
      fontFamily: "Inter, Arial, sans-serif",
      boxSizing: "border-box",
      width: "100%",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    headerRow: { width: "100%", maxWidth: 1200, padding: "0 12px", boxSizing: "border-box" },
    boardWrapper: {
      width: "100%",
      maxWidth: 1300,
      padding: 4,
      boxSizing: "border-box",
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start", // move board up towards top
    },
    board: {
      display: "grid",
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: 6,
      width: "100%",
      // set a sensible max height so very tall boards scroll inside wrapper
      maxHeight: "calc(100vh - 220px)",
      overflowY: "auto",
      padding: 6,
      boxSizing: "border-box",
    },
    cardWrap: { perspective: 800, width: "100%" },
    card: {
      // card fills cell and keeps square shape
      width: "100%",
      aspectRatio: "1 / 1",
      borderRadius: 10,
      border: "1px solid rgba(0,0,0,0.08)",
      cursor: "pointer",
      background: "transparent",
      position: "relative",
      display: "block",
    },
    face: {
      position: "absolute",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
      backfaceVisibility: "hidden" as const,
      transition: "transform 360ms, box-shadow 200ms",
    },
    front: { transform: "rotateY(0deg)", background: "#fff", fontSize: "clamp(28px, 7vw, 72px)" },
    back: { transform: "rotateY(180deg)", background: "#1e40af", color: "#1e40af" , fontSize: "clamp(28px, 7vw, 72px)" },
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <h2 style={{ margin: 0, marginBottom: 8 }}>เกมจับคู่ภาพ</h2>
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
          <div>ระดับตอนนี้: <strong>{levelIndex + 1}</strong> / {LEVELS.length}</div>
          <div>คู่ในด่าน: <strong>{pairs}</strong></div>
          <div style={{ marginLeft: "auto" }}>
            {previewing ? (
              <div style={{ padding: "6px 8px", background: "#fff7cc", borderRadius: 6 }}>Preview: {countdown}s</div>
            ) : (
              <div style={{ padding: "6px 8px", background: "#eef2ff", borderRadius: 6 }}></div>
            )}
          </div>
        </div>
      </div>

      <div style={styles.boardWrapper}>
        <div style={styles.board}>
          {cards.map((c, i) => {
            const isFace = c.flipped || c.matched;
            const flipDeg = isFace ? 0 : 180;
            const matchedShadow = c.matched ? "0 6px 14px rgba(0,0,0,0.12)" : undefined;

            return (
              <div key={c.uid} style={styles.cardWrap}>
                <div
                  role="button"
                  onClick={() => handleClick(i)}
                  style={{
                    ...styles.card,
                    boxShadow: matchedShadow,
                    transformStyle: "preserve-3d" as const,
                  }}
                >
                  {/* front (face) */}
                  <div
                    style={{
                      ...styles.face,
                      ...styles.front,
                      transform: `rotateY(${flipDeg}deg)`,
                      zIndex: isFace ? 2 : 1,
                    }}
                  >
                    <span>{c.icon}</span>
                  </div>

                  {/* back */}
                  <div
                    style={{
                      ...styles.face,
                      ...styles.back,
                      transform: `rotateY(${flipDeg + 180}deg)`,
                    }}
                  >
                    <span style={{ color: "#fff", fontSize: "clamp(36px, 9vw, 96px)" }}>◆</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* <div style={{ marginTop: 14, display: "flex", gap: 8, alignItems: "center" }}>
        <button onClick={restartAll} style={{ padding: "8px 12px" }}>เริ่มใหม่ทั้งหมด</button>
        <div style={{ color: "#6b7280" }}>
          (เวลาและจำนวนการเปิดผิดจะถูกบันทึกแต่ไม่แสดง)
        </div>
      </div> */}
    </div>
  );
}
