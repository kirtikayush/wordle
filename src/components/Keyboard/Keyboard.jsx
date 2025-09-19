import "./Keyboard.css";

const KEYS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"],
];

function Keyboard({ onKeyPress, keyColors }) {
  return (
    <div className="keyboard">
      {KEYS.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key) => (
            <button
              key={key}
              className={`key ${keyColors[key] || ""}`}
              onClick={() => onKeyPress(key)}
            >
              {key === "Backspace" ? "⌫" : key === "Enter" ? "↵" : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
