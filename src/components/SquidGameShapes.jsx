import React, { useMemo } from "react";

const shapeAnims = `
  @keyframes fly1 {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    25% { transform: translate(40px, -60px) rotate(90deg); }
    50% { transform: translate(-30px, 20px) rotate(180deg); }
    75% { transform: translate(50px, 50px) rotate(270deg); }
  }
  @keyframes fly2 {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    25% { transform: translate(-50px, 30px) rotate(-90deg); }
    50% { transform: translate(40px, -40px) rotate(-180deg); }
    75% { transform: translate(-20px, -60px) rotate(-270deg); }
  }
  @keyframes fly3 {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    25% { transform: translate(20px, 50px) rotate(45deg); }
    50% { transform: translate(-40px, -30px) rotate(90deg); }
    75% { transform: translate(30px, -70px) rotate(135deg); }
  }
  @keyframes fly4 {
    0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
    20% { transform: translate(60px, 10px) rotate(120deg) scale(0.9); }
    40% { transform: translate(-70px, -20px) rotate(240deg) scale(1.1); }
    60% { transform: translate(30px, 80px) rotate(360deg) scale(1); }
    80% { transform: translate(-40px, -50px) rotate(180deg) scale(0.95); }
  }
  @keyframes fly5 {
    0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
    30% { transform: translate(-80px, 40px) rotate(-100deg) scale(1.05); }
    70% { transform: translate(50px, -70px) rotate(-200deg) scale(0.9); }
  }
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
`;

const Shape = ({ children, style }) => (
  <div className="absolute" style={style}>
    {children}
  </div>
);

const shapesConfig = {
  player: [
    // Circle
    <svg
      width="30"
      height="30"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="40" stroke="#E50914" strokeWidth="5" />
    </svg>,
    // Triangle
    <svg
      width="30"
      height="30"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M50 10 L90 80 H10 Z"
        stroke="#E50914"
        strokeWidth="5"
        strokeLinejoin="round"
      />
    </svg>,
    // Star
    <svg
      width="30"
      height="30"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M50 5 L61.8 38.2 H98 L68.2 59.8 L79 92 L50 70 L21 92 L31.8 59.8 L2 38.2 H38.2 Z"
        stroke="#E50914"
        strokeWidth="5"
        strokeLinejoin="round"
      />
    </svg>,
    // Umbrella
    <svg
      width="30"
      height="30"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 50 A 40 40 0 0 1 90 50 H10 Z"
        stroke="#E50914"
        strokeWidth="5"
      />
      <path d="M50 50 V 90" stroke="#E50914" strokeWidth="5" />
      <path
        d="M40 90 C 40 80, 60 80, 60 90"
        stroke="#E50914"
        strokeWidth="5"
        fill="none"
      />
    </svg>,
  ],
  guard: [
    // Circle
    <svg
      width="35"
      height="35"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="40" stroke="#E50914" strokeWidth="5" />
    </svg>,
    // Triangle
    <svg
      width="35"
      height="35"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M50 10 L90 80 H10 Z"
        stroke="#E50914"
        strokeWidth="5"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>,
    // Square
    <svg
      width="35"
      height="35"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="10"
        y="10"
        width="80"
        height="80"
        stroke="#E50914"
        strokeWidth="5"
      />
    </svg>,
  ],
  vip: [
    // Circle
    <svg
      width="40"
      height="40"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="50"
        cy="50"
        r="40"
        stroke="#E50914"
        strokeWidth="5"
        fill="#E50914"
        fillOpacity={0.4}
      />
    </svg>,
    // Triangle
    <svg
      width="40"
      height="40"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M50 10 L90 80 H10 Z"
        stroke="#E50914"
        strokeWidth="5"
        strokeLinejoin="round"
        fill="#E50914"
        fillOpacity={0.4}
      />
    </svg>,
    // Square
    <svg
      width="40"
      height="40"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="10"
        y="10"
        width="80"
        height="80"
        stroke="#E50914"
        strokeWidth="5"
        fill="#E50914"
        fillOpacity={0.4}
      />
    </svg>,
  ],
};

const animations = ["fly1", "fly2", "fly3", "fly4", "fly5"];

export default function SquidGameShapes({ type }) {
  const numShapes = 50; // This will be updated in the next step

  const renderedShapes = useMemo(() => {
    const availableShapes = shapesConfig[type] || [];
    if (availableShapes.length === 0) return [];

    return Array.from({ length: numShapes }).map((_, i) => {
      const shapeSvg = availableShapes[i % availableShapes.length];
      const animName = animations[i % animations.length];
      const duration = 15 + Math.random() * 10; // 15-25s
      const delay = Math.random() * 5; // 0-5s
      const pulseDelay = Math.random() * 2; // 0-2s for pulse animation

      const style = {
        top: `${10 + Math.random() * 80}%`, // 10-90%
        left: `${10 + Math.random() * 80}%`, // 10-90%
        animation: `${animName} ${duration}s ${delay}s infinite linear, pulse 2s ${pulseDelay}s infinite ease-in-out alternate, fadeIn 1s ${delay}s forwards`,
        opacity: 0, // Start with opacity 0
      };

      return (
        <Shape key={i} style={style}>
          {shapeSvg}
        </Shape>
      );
    });
  }, [type]);

  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 9999 }}
    >
      <style>{`
        ${shapeAnims}
        @keyframes fadeIn {
          to { opacity: 0.4; }
        }
       `}</style>
      {renderedShapes}
    </div>
  );
}
