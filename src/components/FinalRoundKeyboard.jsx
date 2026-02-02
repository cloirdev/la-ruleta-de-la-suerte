import React from "react";
import "../styles/FinalRoundKeyboard.css";

const FinalRoundKeyboard = ({
  onSelectLetter,
  selectedLetters,
  initialLetters,
  vowelCount,
  consonantCount,
}) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const vowels = "AEIOU".split("");

  return (
    <div className="final-keyboard-container">
      {alphabet.map((letter) => {
        const isVowel = vowels.includes(letter);
        const isInitial = initialLetters.has(letter);
        const isSelected = selectedLetters.has(letter);

        let isDisabled = false;
        if (isInitial) {
          isDisabled = true;
        } else if (isVowel && vowelCount >= 1 && !isSelected) {
          isDisabled = true;
        } else if (!isVowel && consonantCount >= 3 && !isSelected) {
          isDisabled = true;
        }

        return (
          <button
            key={letter}
            className={`final-keyboard-button ${isSelected ? "selected" : ""} ${
              isInitial ? "initial-letter" : ""
            }`}
            onClick={() => onSelectLetter(letter)}
            disabled={isDisabled}
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
};

export default FinalRoundKeyboard;
