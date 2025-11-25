import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [reverse, setReverse] = useState(false);
  const [scale, setScale] = useState(1);

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
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
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
    </div>
  );
}

export default App;
