import { useEffect, useRef, useState } from "react";
import words from "./words.json";
import words_main from "./words_main.json";
import "./App.css";
import Menubar from "./components/Menubar/Menubar";
import Keyboard from "./components/Keyboard/Keyboard";

const WORD_LENGTH = 5;
const MAX_GUESSES = 6;

function App() {
  const inputRef = useRef(null);

  const [solution, setSolution] = useState("");
  const [guesses, setGuesses] = useState(
    Array(MAX_GUESSES)
      .fill("")
      .map(() => Array(WORD_LENGTH).fill(""))
  );
  const [colors, setColors] = useState(
    Array(MAX_GUESSES)
      .fill("")
      .map(() => Array(WORD_LENGTH).fill("empty"))
  );
  const [keyColors, setKeyColors] = useState({});
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");

  // pick solution at start
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * words_main.length);
    setSolution(words_main[randomIndex].toUpperCase());
  }, []);

  // focus invisible input to capture keystrokes
  useEffect(() => {
    inputRef.current?.focus();
  }, [currentRow]);

  const handleInput = (key) => {
    if (gameOver) return;
    if (currentRow >= MAX_GUESSES) return;

    if (key === "Backspace") {
      if (currentCol > 0) {
        updateCell(currentRow, currentCol - 1, "");
        setCurrentCol(currentCol - 1);
      }
    } else if (key === "Enter") {
      if (currentCol === WORD_LENGTH) {
        submitGuess();
      }
    } else if (/^[A-Z]$/.test(key)) {
      if (currentCol < WORD_LENGTH) {
        updateCell(currentRow, currentCol, key);

        // typing animation
        const cellElement = document.querySelector(
          `.line:nth-child(${currentRow + 1}) .title:nth-child(${
            currentCol + 1
          })`
        );
        if (cellElement) {
          cellElement.classList.remove("typing");
          void cellElement.offsetWidth;
          cellElement.classList.add("typing");
        }

        setCurrentCol(currentCol + 1);
      }
    }
  };

  const handleKeyDown = (e) => {
    const key = e.key;
    if (key === "Backspace" || key === "Enter" || /^[a-zA-Z]$/.test(key)) {
      handleInput(key.length === 1 ? key.toUpperCase() : key);
      e.preventDefault();
    }
  };

  const updateCell = (row, col, value) => {
    const newGuesses = guesses.map((r) => [...r]);
    newGuesses[row][col] = value;
    setGuesses(newGuesses);
  };

  const submitGuess = () => {
    const guessWord = guesses[currentRow].join("").toLowerCase();

    if (!words.includes(guessWord)) {
      const currentLine = document.querySelector(
        `.board .line:nth-child(${currentRow + 1})`
      );
      if (currentLine) {
        currentLine.classList.remove("shake");
        void currentLine.offsetWidth;
        currentLine.classList.add("shake");
      }

      setTimeout(() => setMessage(""), 1500);
      return;
    }

    setMessage("");

    const solutionLetters = solution.split("");
    const guessLetters = guesses[currentRow];
    const letterCount = {};
    solutionLetters.forEach((l) => {
      letterCount[l] = (letterCount[l] || 0) + 1;
    });

    const computedColors = Array(WORD_LENGTH).fill("gray");

    // first pass → greens
    for (let i = 0; i < WORD_LENGTH; i++) {
      if (guessLetters[i] === solutionLetters[i]) {
        computedColors[i] = "green";
        letterCount[guessLetters[i]]--;
      }
    }

    // second pass → yellows
    for (let i = 0; i < WORD_LENGTH; i++) {
      if (
        computedColors[i] !== "green" &&
        solutionLetters.includes(guessLetters[i]) &&
        letterCount[guessLetters[i]] > 0
      ) {
        computedColors[i] = "yellow";
        letterCount[guessLetters[i]]--;
      }
    }

    // animate flip row
    for (let i = 0; i < WORD_LENGTH; i++) {
      setTimeout(() => {
        setColors((prevColors) => {
          const newColors = prevColors.map((r) => [...r]);
          newColors[currentRow][i] = "flip";
          return newColors;
        });

        setTimeout(() => {
          setColors((prevColors) => {
            const newColors = prevColors.map((r) => [...r]);
            newColors[currentRow][i] = computedColors[i];
            return newColors;
          });

          // update keyboard color with priority (green > yellow > gray)
          const letter = guessLetters[i];
          setKeyColors((prev) => {
            const current = prev[letter];
            if (current === "green") return prev;
            if (current === "yellow" && computedColors[i] === "gray")
              return prev;
            return { ...prev, [letter]: computedColors[i] };
          });
        }, 400);
      }, i * 300);
    }

    // check win/lose
    setTimeout(() => {
      if (guessWord.toUpperCase() === solution) {
        setGameOver(true);
        setMessage("You Win!");
      } else if (currentRow + 1 >= MAX_GUESSES) {
        setGameOver(true);
        setMessage("Game Over!");
      } else {
        setCurrentRow(currentRow + 1);
        setCurrentCol(0);
      }
    }, WORD_LENGTH * 300 + 500);
  };

  const resetGame = () => {
    setGuesses(
      Array(MAX_GUESSES)
        .fill("")
        .map(() => Array(WORD_LENGTH).fill(""))
    );
    setColors(
      Array(MAX_GUESSES)
        .fill("")
        .map(() => Array(WORD_LENGTH).fill("empty"))
    );
    setKeyColors({});
    setCurrentRow(0);
    setCurrentCol(0);
    setGameOver(false);
    setMessage("");

    const randomIndex = Math.floor(Math.random() * words.length);
    setSolution(words[randomIndex].toUpperCase());
    inputRef.current?.focus();
  };

  return (
    <>
      <Menubar />

      {/* {solution} */}

      <div
        className="board-container"
        onClick={() => inputRef.current?.focus()}
      >
        <div
          ref={inputRef}
          tabIndex={0} // makes div focusable
          onKeyDown={handleKeyDown}
          style={{
            position: "absolute",
            opacity: 0,
            height: 0,
            width: 0,
            top: 0,
            left: 0,
            zIndex: -1,
          }}
        />

        <div className="board">
          {guesses.map((guessRow, rowIndex) => (
            <Line key={rowIndex} guess={guessRow} colors={colors[rowIndex]} />
          ))}
        </div>

        {message && <div className="message">{message}</div>}

        {gameOver && (
          <div className="game-over-container">
            <div className="solution">
              Solution: <strong>{solution}</strong>
            </div>
            <button className="reset-button" onClick={resetGame}>
              New Game
            </button>
          </div>
        )}

        <Keyboard onKeyPress={handleInput} keyColors={keyColors} />
      </div>
    </>
  );
}

function Line({ guess, colors }) {
  return (
    <div className="line">
      {guess.map((char, i) => (
        <div key={i} className={`title ${colors[i]}`}>
          {char}
        </div>
      ))}
    </div>
  );
}

export default App;
