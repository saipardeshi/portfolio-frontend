import { useEffect, useState } from "react";

export default function Loader({ onComplete }) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const targets = [20, 45, 70, 88, 100];
    const delays  = [300, 700, 1200, 2000, 3000];
    const timers  = [];
    let current   = 0;

    targets.forEach((target, idx) => {
      const t = setTimeout(() => {
        const from = current;
        const diff = target - from;
        for (let i = 0; i <= 20; i++) {
          const t2 = setTimeout(() => {
            setPct(Math.round(from + (diff * i) / 20));
          }, i * diff * 7);
          timers.push(t2);
        }
        current = target;
        if (target === 100) {
          const t3 = setTimeout(() => onComplete?.(), 3500);
          timers.push(t3);
        }
      }, delays[idx]);
      timers.push(t);
    });

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div style={{
      position: "fixed", inset: 0, background: "#0a0a12",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      zIndex: 9999, gap: "1.5rem"
    }}>
      <p style={{
        fontFamily: "monospace", fontSize: 22,
        color: "#CECBF6", letterSpacing: "0.2em", margin: 0
      }}>
        SAI PARDESHI
      </p>

      <div style={{ width: 260, background: "#1a1a2e", borderRadius: 2, height: 2 }}>
        <div style={{
          height: "100%", width: `${pct}%`,
          background: "#7F77DD", borderRadius: 2,
          transition: "width 0.4s ease"
        }} />
      </div>

      <p style={{
        fontFamily: "monospace", fontSize: 11, margin: 0,
        color: pct === 100 ? "#AFA9EC" : "#534AB7",
        letterSpacing: "0.15em", transition: "color 0.4s"
      }}>
        {pct}%
      </p>
    </div>
  );
}