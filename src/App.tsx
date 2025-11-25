import { useState, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [reverse, setReverse] = useState(false);
  const [scale, setScale] = useState(1);
  const [idleTime, setIdleTime] = useState(0);
  const idleTimerRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  // Sidebar and feature toggles
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rotationEnabled, setRotationEnabled] = useState(true);
  const [scalingEnabled, setScalingEnabled] = useState(true);
  const [idleTimerEnabled, setIdleTimerEnabled] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate scale based on distance from center of viewport
      if (scalingEnabled) {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const distanceX = Math.abs(e.clientX - centerX);
        const distanceY = Math.abs(e.clientY - centerY);
        const maxDistance = Math.sqrt(centerX ** 2 + centerY ** 2);
        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

        // Scale from 0.5 to 2 based on distance from center
        const newScale = 0.5 + (distance / maxDistance) * 1.5;
        setScale(newScale);
      }

      // Reset idle time when mouse moves
      if (idleTimerEnabled) {
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
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [scalingEnabled, idleTimerEnabled]);

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button
        className={`sidebar-toggle ${sidebarOpen ? "shifted" : ""}`}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? "✕" : "☰"}
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <h2>Features</h2>
        <label>
          <input
            type="checkbox"
            checked={rotationEnabled}
            onChange={(e) => setRotationEnabled(e.target.checked)}
          />
          Rotation Animation
        </label>
        <label>
          <input
            type="checkbox"
            checked={scalingEnabled}
            onChange={(e) => setScalingEnabled(e.target.checked)}
          />
          Mouse Position Scaling
        </label>
        <label>
          <input
            type="checkbox"
            checked={idleTimerEnabled}
            onChange={(e) => setIdleTimerEnabled(e.target.checked)}
          />
          Idle Timer
        </label>
      </div>

      {/* Main Content */}
      <div>
        <div
          style={{ transform: scalingEnabled ? `scale(${scale})` : "scale(1)" }}
        >
          <img
            src={reactLogo}
            className={`logo react ${
              rotationEnabled && reverse ? "reverse" : ""
            } ${!rotationEnabled ? "no-animation" : ""}`}
            alt="React logo"
            onClick={() => rotationEnabled && setReverse(!reverse)}
          />
        </div>
        {idleTimerEnabled && (
          <p>Mouse idle for: {idleTime.toFixed(1)} seconds</p>
        )}
      </div>
    </>
  );
}

export default App;
