import React from "react";
import { useContext } from "react";
import { AppContext } from "../App";

const Key = ({ KeyVal, disabled }) => {
  const isAlphabet = /^[A-Za-z]$/.test(KeyVal);
  const { onEnter, onDelete, onSelectLetter } = useContext(AppContext);

  const selectLetter = () => {
    if (KeyVal === "ENTER") {
      onEnter();
    } else if (KeyVal !== "ENTER" && !isAlphabet) {
      onDelete();
    } else {
      onSelectLetter(KeyVal);
    }
  };

  return (
    <div
      className={isAlphabet ? "key" : "key-big"}
      id={disabled ? "disabled" : "enabled"}
      onClick={selectLetter}
    >
      {KeyVal}
    </div>
  );
};

export default Key;
