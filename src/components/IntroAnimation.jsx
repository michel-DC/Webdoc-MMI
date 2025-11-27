import React, { useState, useEffect } from "react";

const words = ["ALORS", "QUEL", "EST", "TON", "CHOIX ?"];

const IntroAnimation = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [fadeout, setFadeout] = useState(false);

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => {
        if (prevIndex < words.length - 1) {
          return prevIndex + 1;
        } else {
          clearInterval(wordInterval);
          setTimeout(() => setFadeout(true), 500); // Start fade out after last word
          setTimeout(() => setVisible(false), 1000); // Remove component after fade out
          return prevIndex;
        }
      });
    }, 600);

    return () => clearInterval(wordInterval);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 100,
        fontFamily: "'Black Ops One', sans-serif",
        color: "white",
        fontSize: "10rem", // Super large text
        transition: "opacity 0.5s ease-out",
        opacity: fadeout ? 0 : 1,
      }}
    >
      <span>{words[currentWordIndex]}</span>
    </div>
  );
};

export default IntroAnimation;
