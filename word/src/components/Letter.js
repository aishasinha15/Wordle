import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";

const Letter = ({ letterPos, attemptVal }) => {
  const { grid, correctWord, currAttempt, disabledLetters, setDisabledLetter } =
    useContext(AppContext);

  const letter = grid[attemptVal][letterPos];

  const correct = correctWord.toUpperCase()[letterPos] === letter;
  const almost =
    !correct && letter !== "" && correctWord.toUpperCase().includes(letter);

  const letterState =
    currAttempt.attempt > attemptVal &&
    (correct ? "correct" : almost ? "almost" : "error");

  useEffect(() => {
    if (
      letter !== "" &&
      !correct &&
      !almost &&
      currAttempt.attempt > attemptVal
    ) {
      if (!disabledLetters.includes(letter)) {
        setDisabledLetter((prev) => [...prev, letter]);
      }
    }
  }, [currAttempt.attempt]);

  return (
    <div className="letter" id={letterState}>
      {letter}
    </div>
  );
};

export default Letter;
