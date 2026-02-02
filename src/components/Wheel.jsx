import React, { useState } from "react";
import { motion } from "framer-motion";
import "../styles/Wheel.css";

const Wheel = ({ onSpinEnd, onSpinStart, gameState, gamePhase }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotationDegrees, setRotationDegrees] = useState(0);

  const regularWheelData = [
    { label: "Quiebra", value: "quiebra", color: "#0a0a0a" },
    { label: "0", value: 0, color: "#7F4303" },
    { label: "50", value: 50, color: "#FF0000" },
    { label: "100", value: 100, color: "#3357FF" },
    { label: "x2", value: "multiplicar", color: "#FF70E7" },
    { label: "25", value: 25, color: "#57FF33" },
    { label: "Pierde Turno", value: "turn", color: "#939393" },
    { label: "100", value: 100, color: "#3357FF" },
    { label: "75", value: 75, color: "#A133FF" },
    { label: "200", value: 200, color: "#FF5733" },
    { label: "25", value: 25, color: "#57FF33" },
    { label: "75", value: 75, color: "#A133FF" },
    { label: "Quiebra", value: "quiebra", color: "#0a0a0a" },
    { label: "50", value: 50, color: "#FF0000" },
    { label: "100", value: 100, color: "#3357FF" },
    { label: "0", value: 0, color: "#7F4303" },
    { label: "150", value: 150, color: "#70D2FF" },
    { label: "/2", value: "dividir", color: "#77b300" },
    { label: "Pierde Turno", value: "turn", color: "#939393" },
    { label: "100", value: 100, color: "#3357FF" },
    { label: "50", value: 50, color: "#FF0000" },
    { label: "25", value: 25, color: "#57FF33" },
    { label: "150", value: 150, color: "#70D2FF" },
    { label: "75", value: 75, color: "#A133FF" },
  ];

  const jackpotWheelData = [
    { label: "Quiebra", value: "quiebra", color: "#0a0a0a" },
    { label: "Bote", value: "jackpot", color: "#FFD700" },
    { label: "0", value: 0, color: "#7F4303" },
    { label: "100", value: 100, color: "#3357FF" },
    { label: "x2", value: "multiplicar", color: "#FF70E7" },
    { label: "25", value: 25, color: "#57FF33" },
    { label: "Pierde Turno", value: "turn", color: "#939393" },
    { label: "100", value: 100, color: "#3357FF" },
    { label: "75", value: 75, color: "#A133FF" },
    { label: "200", value: 200, color: "#FF5733" },
    { label: "25", value: 25, color: "#57FF33" },
    { label: "75", value: 75, color: "#A133FF" },
    { label: "Quiebra", value: "quiebra", color: "#0a0a0a" },
    { label: "50", value: 50, color: "#FF0000" },
    { label: "100", value: 100, color: "#3357FF" },
    { label: "0", value: 0, color: "#7F4303" },
    { label: "150", value: 150, color: "#70D2FF" },
    { label: "/2", value: "dividir", color: "#77b300" },
    { label: "Pierde Turno", value: "turn", color: "#939393" },
    { label: "100", value: 100, color: "#3357FF" },
    { label: "50", value: 50, color: "#FF0000" },
    { label: "25", value: 25, color: "#57FF33" },
    { label: "150", value: 150, color: "#70D2FF" },
    { label: "75", value: 75, color: "#A133FF" },
  ];

  const currentWheelData =
    gamePhase === "jackpot" ? jackpotWheelData : regularWheelData;
  const sectorAngle = 360 / currentWheelData.length;
  const wheelRadius = 200;

  const handleSpin = () => {
    if (gameState !== "ready" || isSpinning) return;

    onSpinStart();
    setIsSpinning(true);

    const spinDuration = 3;
    const numRotations = Math.floor(Math.random() * 5) + 5;
    const winningSectorIndex = Math.floor(
      Math.random() * currentWheelData.length
    );

    const angleToCenterOfWinningSector =
      winningSectorIndex * sectorAngle + sectorAngle / 2;

    const finalRotation =
      numRotations * 360 + (360 - angleToCenterOfWinningSector);

    setRotationDegrees(finalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      onSpinEnd(currentWheelData[winningSectorIndex].value);
    }, spinDuration * 1000);
  };

  return (
    <div className="wheel-container">
      <motion.div
        className="wheel"
        onClick={handleSpin}
        animate={{ rotate: rotationDegrees }}
        transition={{ type: "tween", ease: "circOut", duration: 3 }}
      >
        <svg
          width={wheelRadius * 2}
          height={wheelRadius * 2}
          viewBox={`-${wheelRadius} -${wheelRadius} ${wheelRadius * 2} ${
            wheelRadius * 2
          }`}
        >
          {currentWheelData.map((sector, index) => {
            const startAngle = (360 / currentWheelData.length) * index;
            const endAngle = startAngle + 360 / currentWheelData.length;

            const startRad = ((startAngle - 90) * Math.PI) / 180;
            const endRad = ((endAngle - 90) * Math.PI) / 180;

            const x1 = wheelRadius * Math.cos(startRad);
            const y1 = wheelRadius * Math.sin(startRad);
            const x2 = wheelRadius * Math.cos(endRad);
            const y2 = wheelRadius * Math.sin(endRad);

            const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

            return (
              <g key={index}>
                <path
                  d={`M 0 0 L ${x1} ${y1} A ${wheelRadius} ${wheelRadius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                  fill={sector.color}
                  stroke="white"
                  strokeWidth="2"
                />
                <text
                  x={wheelRadius * Math.cos((startRad + endRad) / 2) * 0.65}
                  y={wheelRadius * Math.sin((startRad + endRad) / 2) * 0.65}
                  fill="white"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  transform={`rotate(${(startAngle + endAngle) / 2 + 90}, ${
                    wheelRadius * Math.cos((startRad + endRad) / 2) * 0.65
                  }, ${
                    wheelRadius * Math.sin((startRad + endRad) / 2) * 0.65
                  })`}
                >
                  {sector.label}
                </text>
              </g>
            );
          })}
        </svg>
      </motion.div>
      <div className="wheel-pointer"></div>
    </div>
  );
};

export default Wheel;
