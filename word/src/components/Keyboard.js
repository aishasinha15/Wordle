import React, { useCallback } from "react";
import { useEffect } from "react";
import { FaDeleteLeft } from "react-icons/fa6";
import Key from "./Key";
import { useContext } from "react";
import { AppContext } from "../App";

const Keyboard = () => {
  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];
  const {
    onEnter,
    onDelete,
    onSelectLetter,
    disabledLetters,
    setDisabledLetter,
  } = useContext(AppContext);

  const handleKeyboard = useCallback((event) => {
    if (event.key === "Enter" || event.key === " " || event.code === "Space") {
      onEnter();
    } else if (event.key === "Delete" || event.key === "Backspace") {
      onDelete();
    } else {
      keys1.forEach((key) => {
        if (event.key.toLowerCase() === key.toLowerCase()) onSelectLetter(key);
      });

      keys2.forEach((key) => {
        if (event.key.toLowerCase() === key.toLowerCase()) onSelectLetter(key);
      });

      keys3.forEach((key) => {
        if (event.key.toLowerCase() === key.toLowerCase()) onSelectLetter(key);
      });
    }
  });

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);
    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  return (
    <div className="keyboard" onKeyDown={handleKeyboard}>
      <div className="row-2 r-1">
        {keys1.map((key) => {
          return <Key KeyVal={key} disabled={disabledLetters.includes(key)} />;
        })}
      </div>

      <div className="row-2 r-2">
        {keys2.map((key) => {
          return <Key KeyVal={key} disabled={disabledLetters.includes(key)} />;
        })}
      </div>

      <div className="row-2 r-3">
        <Key KeyVal={"ENTER"} />;
        {keys3.map((key) => {
          return <Key KeyVal={key} disabled={disabledLetters.includes(key)} />;
        })}
        <Key KeyVal={<FaDeleteLeft />} />;
      </div>
    </div>
  );
};

export default Keyboard;
