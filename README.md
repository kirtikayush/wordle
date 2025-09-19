# Wordle Maybe - React App

A simple Wordle clone built with React where players guess a 5-letter word in 6 tries.

## Features

- Responsive Wordle grid with color-coded feedback
- Shake animation for invalid words
- Flip animation for letter evaluation
- Game over screen with solution and reset option
- Simple menubar with game instructions

## Technologies Used

- React (with hooks)
- CSS animations for visual feedback
- words.json (containing a list of valid 5-letter words)

## Folder Structure

wordle/
├── public/
├── src/
│ ├── components/
│ │ ├── Menubar/
│ │ │ └── Menubar.jsx
│ │ │ └── Menubar.css
│ │ └── words.json
│ ├── App.jsx
│ ├── App.css
│ ├── index.jsx
├── package.json
├── vite.config.js
└── README.md

## How to Run Locally

1. Clone the repository

   ```bash
   git clone https://github.com/kirtikayush/wordle-react.git
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
