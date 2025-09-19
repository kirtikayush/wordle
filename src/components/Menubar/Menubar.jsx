import { useState } from "react";
import "./Menubar.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Menubar() {
  const [activePopup, setActivePopup] = useState(null); // null | "howto" | "about"

  return (
    <div className="menubar">
      <div className="menubar-title">
        <p className="wordle white">W</p>
        <p className="wordle green">O</p>
        <p className="wordle yellow">R</p>
        <p className="wordle green">D</p>
        <p className="wordle grey">L</p>
        <p className="wordle yellow">E</p>
      </div>

      <div className="menubar-right">
        <div
          className="help-icon"
          onClick={() =>
            setActivePopup((prev) => (prev === "about" ? null : "about"))
          }
          title="About"
        >
          <i className="fas fa-info-circle" />
        </div>

        <div
          className="help-icon"
          onClick={() =>
            setActivePopup((prev) => (prev === "howto" ? null : "howto"))
          }
          title="How to Play"
        >
          <i className="fas fa-question-circle"></i>
        </div>
      </div>

      {activePopup === "howto" && (
        <div className="popup show">
          <strong>How to Play:</strong>
          <p>Guess the word in 6 tries.</p>
          <p>Each guess must be a valid 5-letter word.</p>
          <p>
            Green: Correct letter in correct place.
            <br />
            Yellow: Correct letter in wrong place.
            <br />
            Gray: Incorrect letter.
          </p>
        </div>
      )}

      {activePopup === "about" && (
        <div className="popup show">
          <strong>About:</strong>
          <p>Made by Kirtik Ayush</p>

          <div className="about-links">
            <a
              href="https://github.com/kirtikayush"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
            >
              <i className="fab fa-github"></i>
            </a>
            <a
              href="https://kirtikayush.medium.com"
              target="_blank"
              rel="noopener noreferrer"
              title="Medium"
            >
              <i className="fab fa-medium"></i>
            </a>
            <a
              href="https://kirtikayush.github.io/Portfolio"
              target="_blank"
              rel="noopener noreferrer"
              title="Portfolio"
            >
              <i className="fas fa-briefcase"></i>
            </a>
            <a
              href="https://linkedin.com/in/kirtikayush"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
            >
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="mailto:kirtikayush2000@gmail.com" title="Mail">
              <i className="fas fa-envelope"></i>
            </a>
          </div>

          <p className="disclaimer">
            ⚠️ This is a clone, not for commercial use
          </p>
        </div>
      )}
    </div>
  );
}

export default Menubar;
