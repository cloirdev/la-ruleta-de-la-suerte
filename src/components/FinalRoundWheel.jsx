import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { finalWheelData } from "../data/finalWheelData";
import "../styles/FinalRoundWheel.css";

const FinalRoundWheel = ({ onSpinEnd }) => {
  const [rotation, setRotation] = useState(0);
  const wheelRadius = 150;

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * finalWheelData.length);
    const winningPrize = finalWheelData[randomIndex];
    const sectorAngle = 360 / finalWheelData.length;
    const finalAngle = 360 * 5 + randomIndex * sectorAngle;

    setRotation(finalAngle);

    const timer = setTimeout(() => {
      onSpinEnd(winningPrize);
    }, 4000);

    return () => clearTimeout(timer);
  }, [onSpinEnd]);

  const sectors = finalWheelData.map((sector, index) => {
    const startAngle = (360 / finalWheelData.length) * index - 90;
    const endAngle = startAngle + 360 / finalWheelData.length;
    const textAngle = (startAngle + endAngle) / 2;
    const textRadius = wheelRadius * 0.75;
    const textX = textRadius * Math.cos((textAngle * Math.PI) / 180);
    const textY = textRadius * Math.sin((textAngle * Math.PI) / 180);
    const textRotation = textAngle;

    return {
      path: `M 0 0 L ${wheelRadius * Math.cos((startAngle * Math.PI) / 180)} ${
        wheelRadius * Math.sin((startAngle * Math.PI) / 180)
      } A ${wheelRadius} ${wheelRadius} 0 0 1 ${
        wheelRadius * Math.cos((endAngle * Math.PI) / 180)
      } ${wheelRadius * Math.sin((endAngle * Math.PI) / 180)} Z`,
      textTransform: `translate(${textX}, ${textY}) rotate(${textRotation})`,
      color: sector.color,
      label: sector.label,
    };
  });

  return (
    <div className="final-wheel-container">
      <motion.div
        animate={{ rotate: rotation }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
          duration: 4,
        }}
      >
        <svg
          width={wheelRadius * 2 + 20}
          height={wheelRadius * 2 + 20}
          viewBox={`-${wheelRadius + 10} -${wheelRadius + 10} ${
            wheelRadius * 2 + 20
          } ${wheelRadius * 2 + 20}`}
        >
          {sectors.map((sector, index) => (
            <React.Fragment key={index}>
              <path
                d={sector.path}
                fill={sector.color}
                stroke="#fff"
                strokeWidth="2"
              />
            </React.Fragment>
          ))}
        </svg>
      </motion.div>
      <div className="final-pointer"></div>
    </div>
  );
};

export default FinalRoundWheel;
