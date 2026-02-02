import React, { useState, useRef } from "react";
import LandingPage from "./components/LandingPage";
import PuzzlePanel from "./components/PuzzlePanel";
import AlphabetKeyboard from "./components/AlphabetKeyboard";
import Wheel from "./components/Wheel";
import FinalRoundWheel from "./components/FinalRoundWheel";
import FinalRoundKeyboard from "./components/FinalRoundKeyboard";
import { phrases } from "./data/phrases";
import "./App.css";

const ResolvePanel = ({ onSolve, onCancel }) => {
  const [guess, setGuess] = useState("");
  return (
    <div className="resolve-container">
      <input
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Escribe tu respuesta aquí"
        className="resolve-input"
      />
      <div className="resolve-buttons">
        <button onClick={() => onSolve(guess)}>Aceptar</button>
        <button onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
};

const getRandomPhrase = () => {
  const randomIndex = Math.floor(Math.random() * phrases.length);
  return phrases[randomIndex];
};

const App = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [players, setPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentPhrase, setCurrentPhrase] = useState(getRandomPhrase());
  const [guessedLetters, setGuessedLetters] = useState(new Set());
  const [gameState, setGameState] = useState("ready");
  const [currentPrizeValue, setCurrentPrizeValue] = useState(null);
  const [currentRound, setCurrentRound] = useState(1);

  const [gamePhase, setGamePhase] = useState("playing");
  const [jackpotScore, setJackpotScore] = useState(1000);
  const [finalist, setFinalist] = useState(null);
  const [finalRoundPrize, setFinalRoundPrize] = useState(null);
  const [finalPhrase, setFinalPhrase] = useState(null);
  const [finalGuess, setFinalGuess] = useState("");
  const [finalTimer, setFinalTimer] = useState(15);
  const timerRef = useRef(null);
  const initialFinalLetters = new Set(["R", "S", "F", "Y", "O"]);
  const [selectedFinalLetters, setSelectedFinalLetters] = useState(new Set());
  const VOWEL_COST = 50;

  const startGame = (playerNames) => {
    const newPlayers = playerNames.map((p, index) => ({
      ...p,
      id: index,
      score: 0,
      roundScore: 0,
    }));
    setPlayers(newPlayers);
    setIsGameStarted(true);
  };

  const resetGame = () => {
    setIsGameStarted(false);
    setPlayers([]);
    setCurrentPlayerIndex(0);
    setCurrentPhrase(getRandomPhrase());
    setGuessedLetters(new Set());
    setGameState("ready");
    setCurrentPrizeValue(null);
    setCurrentRound(1);
    setGamePhase("playing");
    setJackpotScore(1000);
    setFinalist(null);
    setFinalRoundPrize(null);
    setFinalPhrase(null);
    setFinalGuess("");
    setSelectedFinalLetters(new Set());
  };

  const nextTurn = () => {
    setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
  };

  const resetRound = () => {
    if (currentRound < 5) {
      setCurrentPhrase(getRandomPhrase());
      setGuessedLetters(new Set());
      setGameState("ready");
      setCurrentRound((prevRound) => prevRound + 1);
      setPlayers((prevPlayers) =>
        prevPlayers.map((p) => ({ ...p, roundScore: 0 }))
      );
    } else {
      const winner = players.reduce(
        (prev, current) => (prev.score > current.score ? prev : current),
        players[0]
      );
      setFinalist(winner);
      setGamePhase("finalRound");
    }
  };

  const handleGuessConsonant = (letter) => {
    if (guessedLetters.has(letter) || gameState !== "guessing") return;

    const newGuessedLetters = new Set(guessedLetters).add(letter);
    setGuessedLetters(newGuessedLetters);

    const isCorrectGuess = currentPhrase.text.toUpperCase().includes(letter);
    const updatedPlayers = [...players];
    const currentPlayer = updatedPlayers[currentPlayerIndex];

    if (isCorrectGuess) {
      const occurrences = currentPhrase.text
        .toUpperCase()
        .split("")
        .filter((char) => char === letter).length;

      // Lógica para la ronda del bote (ronda 5)
      if (currentRound === 5) {
        if (currentPrizeValue === "jackpot") {
          // El bote solo se gana si se resuelve, no al acertar la consonante
          alert(
            "¡Acertaste! Ahora puedes intentar resolver para ganar el Bote."
          );
          setGameState("resolving");
        } else if (typeof currentPrizeValue === "number") {
          // Se suma a la puntuación de ronda del jugador Y al bote.
          currentPlayer.roundScore += occurrences * currentPrizeValue;
          setJackpotScore((prev) => prev + occurrences * currentPrizeValue);
          setPlayers(updatedPlayers);
          setGameState("ready");
        } else {
          // 'quiebra' o 'turn' no afectan el bote
          setGameState("ready");
        }
      } else {
        // Lógica para rondas normales (1-4)
        let newScore = currentPlayer.roundScore;
        if (currentPrizeValue === "multiplicar") {
          newScore *= 2;
        } else if (currentPrizeValue === "dividir") {
          newScore = Math.floor(newScore / 2);
        } else {
          newScore += occurrences * currentPrizeValue;
        }
        currentPlayer.roundScore = newScore;
        setPlayers(updatedPlayers);
        setGameState("ready");
      }
    } else {
      // Letra incorrecta
      alert("¡Incorrecto! Pierdes tu turno.");
      nextTurn();
      setGameState("ready");
    }
  };

  const handleBuyVowel = (letter) => {
    const updatedPlayers = [...players];
    const currentPlayer = updatedPlayers[currentPlayerIndex];

    if (guessedLetters.has(letter) || currentPlayer.roundScore < VOWEL_COST)
      return;

    currentPlayer.roundScore -= VOWEL_COST;
    setPlayers(updatedPlayers);

    const newGuessedLetters = new Set(guessedLetters).add(letter);
    setGuessedLetters(newGuessedLetters);

    if (!currentPhrase.text.toUpperCase().includes(letter)) {
      nextTurn();
    }
    setGameState("ready");
  };

  const handlePrize = (prizeValue) => {
    const updatedPlayers = [...players];
    const currentPlayer = updatedPlayers[currentPlayerIndex];

    if (prizeValue === "quiebra") {
      currentPlayer.roundScore = 0;
      setPlayers(updatedPlayers);
      nextTurn();
      setGameState("ready");
    } else if (prizeValue === "turn") {
      nextTurn();
      setGameState("ready");
    } else {
      setCurrentPrizeValue(prizeValue);
      setGameState("guessing");
    }
  };

  const handleSpinStart = () => setGameState("spinning");

  const handleSolve = (guess) => {
    const normalizedGuess = guess.toUpperCase().trim();
    const normalizedPhrase = currentPhrase.text.toUpperCase().trim();
    const updatedPlayers = [...players];
    const currentPlayer = updatedPlayers[currentPlayerIndex];

    if (normalizedGuess === normalizedPhrase) {
      if (currentRound === 5) {
        if (currentPrizeValue === "jackpot") {
          currentPlayer.score += currentPlayer.roundScore + jackpotScore;
          alert(
            `¡${currentPlayer.name} ha resuelto el panel y gana el bote de ${jackpotScore} puntos, más su puntuación de ronda!`
          );
        } else {
          currentPlayer.score += currentPlayer.roundScore;
          alert(`${currentPlayer.name} ha resuelto el panel y gana la ronda!`);
        }
      } else {
        currentPlayer.score += currentPlayer.roundScore;
        alert(`${currentPlayer.name} ha resuelto el panel y gana la ronda!`);
      }
      setPlayers(updatedPlayers);
      nextTurn();
      resetRound();
    } else {
      alert("¡Incorrecto! Pierdes tu turno.");
      if (currentRound !== 5) {
        currentPlayer.roundScore = 0;
        setPlayers(updatedPlayers);
      }
      nextTurn();
      setGameState("ready");
    }
  };

  const startFinalRound = () => {
    setGamePhase("spinningFinalWheel");
    setFinalPhrase(getRandomPhrase());
  };
  const handleFinalWheelSpinEnd = (prize) => {
    setFinalRoundPrize(prize);
    setGamePhase("choosingLetters");
    setGuessedLetters(initialFinalLetters);
  };
  const handleSelectFinalLetter = (letter) => {
    const isSelected = selectedFinalLetters.has(letter);
    const isVowel = "AEIOU".includes(letter);
    let newSelected = new Set(selectedFinalLetters);

    if (isSelected) {
      newSelected.delete(letter);
    } else {
      const currentVowels = Array.from(newSelected).filter((l) =>
        "AEIOU".includes(l)
      ).length;
      const currentConsonants = Array.from(newSelected).filter(
        (l) => !"AEIOU".includes(l)
      ).length;

      if (isVowel && currentVowels < 1) {
        newSelected.add(letter);
      } else if (!isVowel && currentConsonants < 3) {
        newSelected.add(letter);
      }
    }
    setSelectedFinalLetters(newSelected);
  };
  const allLettersSelected = () => {
    const vowels = Array.from(selectedFinalLetters).filter((l) =>
      "AEIOU".includes(l)
    ).length;
    const consonants = Array.from(selectedFinalLetters).filter(
      (l) => !"AEIOU".includes(l)
    ).length;
    return vowels === 1 && consonants === 3;
  };
  const startFinalTimer = () => {
    const finalLetters = new Set([
      ...initialFinalLetters,
      ...selectedFinalLetters,
    ]);
    setGuessedLetters(finalLetters);
    setGamePhase("solvingFinalPuzzle");
    setFinalTimer(15);
    timerRef.current = setInterval(() => {
      setFinalTimer((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current);
          alert("¡Se acabó el tiempo! No has conseguido el premio.");
          setGamePhase("gameOver");
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };
  const handleFinalSolve = () => {
    const normalizedGuess = finalGuess.toUpperCase().trim();
    const normalizedPhrase = finalPhrase.text.toUpperCase().trim();
    if (normalizedGuess === normalizedPhrase) {
      clearInterval(timerRef.current);
      alert(
        `¡Felicidades, has resuelto el panel! Has ganado ${finalRoundPrize.label}.`
      );
      setGamePhase("gameOver");
    } else {
      alert("Inténtalo de nuevo.");
    }
  };

  if (!isGameStarted) {
    return <LandingPage onStartGame={startGame} />;
  }

  if (gamePhase === "gameOver") {
    return (
      <div className="game-over-container">
        <h2>¡Fin del juego!</h2>
        <p>Gracias por jugar.</p>
        <button onClick={resetGame} className="reset-button">
          Volver a Jugar
        </button>
      </div>
    );
  }

  if (gamePhase === "finalRound") {
    return (
      <div className="final-round-entry">
        <h2>¡Felicidades, {finalist.name}!</h2>
        <p>
          Con una puntuación de {finalist.score}, has llegado a la ronda final.
        </p>
        <button onClick={startFinalRound}>Empezar la ronda final</button>
      </div>
    );
  }

  if (gamePhase === "spinningFinalWheel") {
    return (
      <div className="final-round-container">
        <h2>Girando la ruleta final...</h2>
        <FinalRoundWheel
          onSpinEnd={handleFinalWheelSpinEnd}
          onSpinStart={() => setGamePhase("spinningFinalWheel")}
          gameState={"ready"}
        />
      </div>
    );
  }

  if (gamePhase === "choosingLetters") {
    const selectedVowelCount = Array.from(selectedFinalLetters).filter((l) =>
      "AEIOU".includes(l)
    ).length;
    const selectedConsonantCount = Array.from(selectedFinalLetters).filter(
      (l) => !"AEIOU".includes(l)
    ).length;
    return (
      <div className="final-round-container">
        <h2>¡A elegir letras!</h2>
        <h3>Tu premio: {finalRoundPrize.label}</h3>
        <p>Tienes las letras R, S, F, Y, O.</p>
        <p>Elige 3 consonantes y 1 vocal para el panel final.</p>

        <div className="selection-info">
          <p>Consonantes seleccionadas: {selectedConsonantCount} de 3</p>
          <p>Vocal seleccionada: {selectedVowelCount} de 1</p>
        </div>

        <FinalRoundKeyboard
          onSelectLetter={handleSelectFinalLetter}
          selectedLetters={selectedFinalLetters}
          initialLetters={initialFinalLetters}
          vowelCount={selectedVowelCount}
          consonantCount={selectedConsonantCount}
        />
        <button onClick={startFinalTimer} disabled={!allLettersSelected()}>
          Empezar el tiempo (15s)
        </button>
      </div>
    );
  }

  if (gamePhase === "solvingFinalPuzzle") {
    return (
      <div className="final-round-container">
        <h2>¡Resuelve el panel!</h2>
        <h3>Tiempo restante: {finalTimer}</h3>
        <PuzzlePanel
          phrase={finalPhrase.text}
          guessedLetters={guessedLetters}
          hint={finalPhrase.hint}
        />
        <div className="final-solve-form">
          <input
            type="text"
            value={finalGuess}
            onChange={(e) => setFinalGuess(e.target.value)}
            placeholder="Escribe tu respuesta aquí"
          />
          <button onClick={handleFinalSolve}>Resolver</button>
        </div>
      </div>
    );
  }

  const currentPlayerRoundScore = players[currentPlayerIndex]?.roundScore ?? 0;

  return (
    <div className="app-container">
      <aside>
        <span>
          Ronda {currentRound} de 5{" "}
          {currentRound === 5 && `(Panel del Bote: ${jackpotScore})`}
        </span>
        <div className="player-scores">
          {players.map((player) => (
            <div
              key={player.id}
              className={`player-card ${
                player.id === currentPlayerIndex ? "current-player" : ""
              }`}
            >
              <h3>{player.name}</h3>
              <span>Puntos Globales: {player.score}</span>
              <span>Puntos de Ronda: {player.roundScore}</span>
            </div>
          ))}
        </div>
      </aside>
      <main>
        <PuzzlePanel
          phrase={currentPhrase.text}
          guessedLetters={guessedLetters}
          hint={currentPhrase.hint}
        />
        <button
          onClick={() => setGameState("resolving")}
          disabled={
            gameState !== "ready" &&
            !(currentRound === 5 && currentPrizeValue === "jackpot")
          }
          className="resolve-button"
        >
          Resolver
        </button>
        <Wheel
          onSpinEnd={handlePrize}
          onSpinStart={handleSpinStart}
          gameState={gameState}
          gamePhase={currentRound === 5 ? "jackpot" : "regular"}
        />
      </main>
      <aside>
        {gameState === "resolving" ? (
          <ResolvePanel
            onSolve={handleSolve}
            onCancel={() => setGameState("ready")}
          />
        ) : (
          <AlphabetKeyboard
            guessedLetters={guessedLetters}
            onGuessConsonant={handleGuessConsonant}
            onBuyVowel={handleBuyVowel}
            gameState={gameState}
            roundScore={currentPlayerRoundScore}
            VOWEL_COST={50}
          />
        )}
      </aside>
    </div>
  );
};

export default App;
