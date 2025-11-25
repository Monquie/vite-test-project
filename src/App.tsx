import { useState, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [reverse, setReverse] = useState(false);
  const [scale, setScale] = useState(1);
  const [idleTime, setIdleTime] = useState(0);
  const idleTimerRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate scale based on distance from center of viewport
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const distanceX = Math.abs(e.clientX - centerX);
      const distanceY = Math.abs(e.clientY - centerY);
      const maxDistance = Math.sqrt(centerX ** 2 + centerY ** 2);
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      // Scale from 0.5 to 2 based on distance from center
      const newScale = 0.5 + (distance / maxDistance) * 1.5;
      setScale(newScale);

      // Reset idle time when mouse moves
      setIdleTime(0);

      // Clear existing timers
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      // Start counting after mouse stops moving (100ms delay)
      idleTimerRef.current = window.setTimeout(() => {
        intervalRef.current = window.setInterval(() => {
          setIdleTime((prev) => prev + 0.1);
        }, 100);
      }, 100);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div>
      <div style={{ transform: `scale(${scale})` }}>
        <img
          src={reactLogo}
          className={`logo react ${reverse ? "reverse" : ""}`}
          alt="React logo"
          onClick={() => setReverse(!reverse)}
        />
      </div>
      <p>Mouse idle for: {idleTime.toFixed(1)} seconds</p>
    </div>
  );
}

export default App;
