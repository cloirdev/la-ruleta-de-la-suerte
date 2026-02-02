import React from "react";

import "../styles/AlphabetKeyboard.css";

const AlphabetKeyboard = ({
  guessedLetters,

  onGuessConsonant,

  onBuyVowel,

  gameState,

  roundScore,

  VOWEL_COST,
}) => {
  const alphabet = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");

  const vowels = "AEIOU".split("");

  return (
    <div className="keyboard-container">
      {alphabet.map((letter) => {
        const isVowel = vowels.includes(letter);

        const isGuessed = guessedLetters.has(letter);

        const canAffordVowel = roundScore >= VOWEL_COST;

        if (isVowel) {
          return (
            <div key={letter} className="letter-wrapper vowel-wrapper">
              <span className="vowel-label">{letter}</span>

              <button
                className="buy-button"
                onClick={() => onBuyVowel(letter)}
                disabled={isGuessed || !canAffordVowel || gameState !== "ready"}
              >
                Comprar ({VOWEL_COST})
              </button>
            </div>
          );
        } else {
          return (
            <button
              key={letter}
              className="keyboard-button"
              onClick={() => onGuessConsonant(letter)}
              disabled={isGuessed || gameState !== "guessing"}
            >
              {letter}
            </button>
          );
        }
      })}
    </div>
  );
};

export default AlphabetKeyboard;
