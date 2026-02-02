import React from "react";
import "../styles/PuzzlePanel.css";

const PuzzlePanel = React.memo(({ phrase, guessedLetters, hint }) => {
  const numRows = 4;
  const numCols = 14;
  const totalAvailableCells = numRows * numCols - 4;

  const panelGrid = Array.from({ length: numRows }, () =>
    Array(numCols).fill(null),
  );
  const phraseCharacters = phrase.toUpperCase().split("");

  const phraseLength = phrase.length;
  const startIndex = Math.floor((totalAvailableCells - phraseLength) / 2);
  let cellIndex = 0;
  let phraseIndex = 0;

  for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
    for (let colIndex = 0; colIndex < numCols; colIndex++) {
      const isCornerCell =
        (rowIndex === 0 || rowIndex === numRows - 1) &&
        (colIndex === 0 || colIndex === numCols - 1);

      if (!isCornerCell) {
        if (cellIndex >= startIndex && phraseIndex < phraseLength) {
          panelGrid[rowIndex][colIndex] = phraseCharacters[phraseIndex];
          phraseIndex++;
        } else {
          panelGrid[rowIndex][colIndex] = " ";
        }
        cellIndex++;
      }
    }
  }

  return (
    <div className="panel-completo">
      <div className="puzzle-panel-container">
        {panelGrid.map((row, rowIndex) =>
          row.map((char, colIndex) => {
            if (char === null) {
              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className="panel-filler-cell"
                ></div>
              );
            }

            const isSpace = char === " ";
            const isGuessed = guessedLetters.has(char);

            let cellClass = "puzzle-cell";
            if (isSpace) {
              cellClass += " space-cell";
            } else if (isGuessed) {
              cellClass += " solved-cell";
            } else {
              cellClass += " unsolved-cell";
            }

            return (
              <span key={`${rowIndex}-${colIndex}`} className={cellClass}>
                {isGuessed || isSpace ? char : ""}
              </span>
            );
          }),
        )}
      </div>
      <div className="hint-panel">
        <h3>Pista:</h3>
        <p>{hint}</p>
      </div>
    </div>
  );
});

export default PuzzlePanel;
