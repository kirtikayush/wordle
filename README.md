# 🎮 Wordle Clone (React)

A responsive Wordle-like game built with **React**.  
Includes a custom on-screen keyboard, flip & typing animations, shake feedback for invalid words, and full mobile support.  

---

## ✨ Features

- 🎯 5-letter word guessing game
- 🎹 Custom on-screen keyboard (works on desktop + mobile)
- 🟩🟨⬛ Tile flip animations for feedback
- ⌨️ Invisible input for desktop typing
- 📱 Fully responsive board & keyboard
- ❌ Shake animation for invalid words
- 🔄 Random new word each game
- 🚀 Deployable to GitHub Pages

---

## 🛠️ Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/) (fast dev server & build)
- Vanilla CSS for animations
- GitHub Pages for deployment
  
---

## 📂 Project Structure

├── App.js            # Main game logic
├── App.css           # Game styles & animations
├── words.json        # List of valid guess words (~500)
├── words_main.json   # Possible solutions
├── components/
│   ├── Keyboard/     # On-screen keyboard
│   └── Menubar/      # Simple menu/header

## How to Run Locally

1. Clone the repository

   ```bash
   git clone https://github.com/kirtikayush/wordle.git
   cd wordle
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the development server

   ```bash
   npm run dev
   ```

4. Open the app in your browser at
   ```
   http://localhost:5173
   ```

## Gameplay Instructions

- Guess the correct word in 6 tries.
- Green indicates correct letter at correct position.
- Yellow indicates correct letter at wrong position.
- Gray indicates wrong letter.

## License

MIT License
