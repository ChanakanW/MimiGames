import React, { useEffect, useMemo, useRef, useState } from "react";
import "./CSS/CupShuffleGame.css";

;

type Cup = {
  id: number;
  // logical index (0..2)
  index: number;
};

export default function CupsAndBall() {
  const [cups, setCups] = useState<Cup[]>(
    () => [{ id: 0, index: 0 }, { id: 1, index: 1 }, { id: 2, index: 2 }]
  );
  const [ballUnder, setBallUnder] = useState<number>(() => Math.floor(Math.random() * 3));
  const [isShuffling, setIsShuffling] = useState(false);
  const [message, setMessage] = useState("กด Start เพื่อเริ่มสับแก้ว");
  const [disabled, setDisabled] = useState(false);
  const animationRef = useRef<number | null>(null);
  const shuffleStepsRef = useRef<number>(0);
  const totalSteps = useRef<number>(0);

  // positions for 3 cups (in px)
  const positions = useMemo(() => {
    return [
      { left: 40 }, // slot 0
      { left: 210 }, // slot 1
      { left: 380 }, // slot 2
    ];
  }, []);

  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  function startShuffle(rounds = 12, speedMs = 300) {
    if (isShuffling) return;
    setMessage("กำลังสับแก้ว...");
    setIsShuffling(true);
    setDisabled(true);

    // create a sequence of swaps (swap pairs of indices)
    const swaps: [number, number][] = [];
    for (let i = 0; i < rounds; i++) {
      const a = Math.floor(Math.random() * 3);
      let b = Math.floor(Math.random() * 3);
      while (b === a) b = Math.floor(Math.random() * 3);
      swaps.push([a, b]);
    }

    // run swaps sequentially with timeout
    totalSteps.current = swaps.length;
    shuffleStepsRef.current = 0;

    const runStep = (i: number) => {
      if (i >= swaps.length) {
        // finish
        setIsShuffling(false);
        setDisabled(false);
        setMessage("สับเสร็จแล้ว! ทายได้เลยว่าลูกบอลอยู่ใต้แก้วไหน");
        return;
      }
      const [a, b] = swaps[i];
      // swap cup indexes: find cup objects whose index == a/b and swap their index values
      setCups((prev) => {
        const next = prev.map((c) => ({ ...c }));
        const ca = next.find((x) => x.index === a)!;
        const cb = next.find((x) => x.index === b)!;
        if (ca && cb) {
          const tmp = ca.index;
          ca.index = cb.index;
          cb.index = tmp;
        }
        return next;
      });

      // if ball is under a or b, update logical position of ball (we track ballUnder as index)
      setBallUnder((prevPos) => {
        if (prevPos === a) return b;
        if (prevPos === b) return a;
        return prevPos;
      });

      shuffleStepsRef.current++;
      setMessage(`สับแล้ว ${shuffleStepsRef.current}/${totalSteps.current}`);
      // schedule next
      setTimeout(() => runStep(i + 1), speedMs);
    };

    // small delay before starting to let animation class initialize
    setTimeout(() => runStep(0), 120);
  }

  function resetGame() {
    setCups([{ id: 0, index: 0 }, { id: 1, index: 1 }, { id: 2, index: 2 }]);
    setBallUnder(Math.floor(Math.random() * 3));
    setIsShuffling(false);
    setMessage("กด Start เพื่อเริ่มสับแก้ว");
    setDisabled(false);
  }

  function handleGuess(slotIndex: number) {
    if (isShuffling || disabled) return;
    // reveal outcome
    const correct = slotIndex === ballUnder;
    if (correct) {
      setMessage("ถูก! 🎉 คุณเจอลูกบอล");
    } else {
      setMessage(`ผิด! ลูกบอลอยู่ใต้แก้วหมายเลข ${ballUnder + 1}`);
    }
    // reveal briefly then reset or allow replay
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 800);
  }

  // helper: get cup placed at slot i (there's exactly one cup with index === i)
  function cupAtSlot(i: number) {
    return cups.find((c) => c.index === i);
  }

  return (
    <div className="cup-game-root">
      <h2>เกมหาลูกบอลใต้แก้ว (3 แก้ว)</h2>

      <div className="controls">
        <button
          onClick={() => {
            resetGame();
            // small delay to randomize ball and start
            setTimeout(() => startShuffle(12, 260), 200);
          }}
          disabled={isShuffling}
        >
          Start (สับ)
        </button>

        <button
          onClick={() => startShuffle(18, 220)}
          disabled={isShuffling}
        >
          สับนานขึ้น
        </button>

        <button onClick={resetGame} disabled={isShuffling}>
          Reset
        </button>
      </div>

      <p className="message">{message}</p>

      <div className="table-area">
        <div className="slots">
          {positions.map((pos, slotIdx) => {
            const cup = cupAtSlot(slotIdx);
            // cup may be undefined only during state transitions but should exist
            const cupId = cup ? cup.id : slotIdx;
            const isBallVisible = false; // do not show ball until reveal (we reveal visually by message)
            // For nicer reveal effect: show ball under cup after user guesses (disabled==true and not shuffling)
            const revealBall =
              !isShuffling && !disabled && false; // keep false - show by message
            return (
              <div
                className="slot"
                key={slotIdx}
                style={{ left: pos.left }}
              >
                {/* ball placed visually under the cup when the game is not shuffling and reveal condition */}
                {(!isShuffling && !disabled && revealBall && ballUnder === slotIdx) && (
                  <div className="ball" />
                )}

                <button
                  className="cup-button"
                  onClick={() => handleGuess(slotIdx)}
                  aria-label={`เลือกแก้วที่ ${slotIdx + 1}`}
                  disabled={isShuffling}
                >
                  {/* image used as cup art */}
                  {/* <img src={CUP_IMG} alt="cup" className="cup-img" draggable={false} /> */}
                  <div className="cup-css" />
                </button>

                <div className="slot-number">#{slotIdx + 1}</div>
              </div>
            );
          })}
        </div>

        {/* visual indicator (when disabled after guess, reveal ball under the right slot) */}
        <div className="reveal-row">
          {!isShuffling && disabled && (
            <div className="reveal-board">
              <div className="reveal-label">เฉลย</div>
              <div className="reveal-slots">
                {positions.map((p, i) => (
                  <div key={i} className="reveal-slot" style={{ left: p.left }}>
                    {ballUnder === i ? <div className="ball reveal" /> : <div style={{ height: 32 }} />}
                    <div className="reveal-index">#{i + 1}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="hint">
        <strong>วิธีเล่น:</strong> กด Start เพื่อสับแก้ว แล้วเมื่อสับเสร็จ ให้คลิกเลือกแก้วที่คิดว่ามีลูกบอลอยู่ใต้แก้วนั้น
      </div>
    </div>
  );
}
