import Grid from "./components/Grid";
import Keyboard from "./components/Keyboard";
import "./App.css";
import { useState, useEffect, createContext } from "react";
import { gridDefault, generateWordSet } from "./Words";
import { toast } from "react-toastify";
import GameOver from "./components/GameOver";

export const AppContext = createContext();

function App() {
  const [grid, setGrid] = useState(gridDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 });
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetter] = useState([]);
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });
  const [correctWord, setCorrectWord] = useState("");
  const [guessedWords, setGuessedWords] = useState(new Set()); // New state to track guessed words

  useEffect(() => {
    generateWordSet().then(({ wordSet, todaysWord }) => {
      setWordSet(wordSet);
      setCorrectWord(todaysWord);
    });
  }, []);

  const onSelectLetter = (KeyVal) => {
    if (currAttempt.letterPos > 4) return;
    const newGrid = [...grid];
    newGrid[currAttempt.attempt][currAttempt.letterPos] = KeyVal;
    setGrid(newGrid);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos + 1 });
  };

  const onEnter = () => {
    if (currAttempt.letterPos !== 5) return;

    let currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += grid[currAttempt.attempt][i];
    }
    currWord = currWord.toLowerCase();

    if (guessedWords.has(currWord)) {
      toast.warning("You've already guessed this word!");
      return;
    }

    if (wordSet && wordSet.has && wordSet.has(currWord)) {
      setGuessedWords(new Set(guessedWords).add(currWord));
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 });

      if (currWord === correctWord.toLowerCase()) {
        setGameOver({ gameOver: true, guessedWord: true });
        return;
      }
      if (currAttempt.attempt === 5) {
        setGameOver({ gameOver: true, guessedWord: false });
        return;
      }
    } else {
      toast.error("Not a word");
    }
  };

  const onDelete = () => {
    if (currAttempt.letterPos === 0) return;
    const newGrid = [...grid];
    newGrid[currAttempt.attempt][currAttempt.letterPos - 1] = "";
    setGrid(newGrid);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos - 1 });
  };

  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <AppContext.Provider
        value={{
          grid,
          setGrid,
          currAttempt,
          setCurrAttempt,
          onDelete,
          onEnter,
          onSelectLetter,
          correctWord,
          disabledLetters,
          setDisabledLetter,
          gameOver,
          setGameOver,
        }}
      >
        <Grid />
        {gameOver.gameOver ? <GameOver /> : <Keyboard />}
      </AppContext.Provider>
    </div>
  );
}

export default App;
