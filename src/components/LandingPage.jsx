import React, { useState } from "react";
import "../styles/LandingPage.css";

const LandingPage = ({ onStartGame }) => {
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");
  const [player3Name, setPlayer3Name] = useState("");

  const handleStart = (e) => {
    e.preventDefault();
    if (player1Name && player2Name && player3Name) {
      onStartGame([
        { id: 0, name: player1Name },
        { id: 1, name: player2Name },
        { id: 2, name: player3Name },
      ]);
    } else {
      alert("Por favor, introduce el nombre de los 3 concursantes.");
    }
  };

  return (
    <div className="landing-page">
      <div className="landing-container">
        <h1>La Ruleta de la Suerte</h1>
        <p>Introduce el nombre de los 3 concursantes para empezar a jugar.</p>
        <form onSubmit={handleStart} className="player-form">
          <input
            type="text"
            placeholder="Concursante 1"
            value={player1Name}
            onChange={(e) => setPlayer1Name(e.target.value)}
          />
          <input
            type="text"
            placeholder="Concursante 2"
            value={player2Name}
            onChange={(e) => setPlayer2Name(e.target.value)}
          />
          <input
            type="text"
            placeholder="Concursante 3"
            value={player3Name}
            onChange={(e) => setPlayer3Name(e.target.value)}
          />
          <button type="submit">Empezar</button>
        </form>
      </div>
    </div>
  );
};

export default LandingPage;
