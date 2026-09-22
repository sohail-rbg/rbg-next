"use client";

import { useEffect, useRef } from "react";
import { useReward } from "partycles";

function HeartEffect() {
  const { reward } = useReward("heart-container", "hearts", {
    particleCount: 151,
    spread: 275,
    startVelocity: 23,
    elementSize: 15,
    lifetime: 180,
    physics: {
      gravity: 0.1,
      wind: -0.01,
      friction: 0.973,
    },
    effects: {
      pulse: false,
    },
    radial: {
      enabled: false,
    },
    colors: ["#ff1744", "#e91e63", "#ff4569"],
  });

  const intervalRef = useRef(null);

  useEffect(() => {
    // fire once after mount
    reward();

    intervalRef.current = setInterval(() => {
      reward();
    }, 5000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []); // ✅ IMPORTANT: empty dependency array

  return (
    <div
      id="heart-container"
      style={{
        position: "fixed",
        left: "50%",
        bottom: "24px",
        transform: "translateX(-50%)",
        width: "1px",
        height: "1px",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}

export default HeartEffect;
