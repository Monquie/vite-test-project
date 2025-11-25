import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [reverse, setReverse] = useState(false);

  return (
    <div>
      <img
        src={reactLogo}
        className={`logo react ${reverse ? "reverse" : ""}`}
        alt="React logo"
        onClick={() => setReverse(!reverse)}
      />
    </div>
  );
}

export default App;
