"use client";

import React, { useEffect, useRef, useState } from "react";

const Snowfall = () => {
  const snowContainerRef = useRef(null);
  const [isTabActive, setIsTabActive] = useState(true);
  const snowflakes = useRef([]);

  const particlesPerThousandPixels = 0.1;
  const fallSpeed = 1.25;
  const maxSnowflakes = 200;
  let snowflakeInterval = null;

  const resetSnowflake = (snowflake) => {
    const size = Math.random() * 5 + 1;
    const viewportWidth = window.innerWidth - size; // Adjust for snowflake size
    const viewportHeight = window.innerHeight;

    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;
    snowflake.style.left = `${Math.random() * viewportWidth}px`; // Constrain within viewport width
    snowflake.style.top = `-${size}px`;

    const animationDuration = (Math.random() * 3 + 2) / fallSpeed;
    snowflake.style.animationDuration = `${animationDuration}s`;
    snowflake.style.animationTimingFunction = "linear";
    snowflake.style.animationName =
      Math.random() < 0.5 ? "fall" : "diagonal-fall";

    setTimeout(() => {
      const currentTop = parseInt(snowflake.style.top, 10);
      if (currentTop < viewportHeight) {
        resetSnowflake(snowflake);
      } else {
        snowflake.remove(); // Remove when it goes off the bottom edge
      }
    }, animationDuration * 1000);
  };

  const createSnowflake = () => {
    if (snowflakes.current.length < maxSnowflakes) {
      const snowflake = document.createElement("div");
      snowflake.classList.add("snowflake");
      snowflakes.current.push(snowflake);
      snowContainerRef.current.appendChild(snowflake);
      resetSnowflake(snowflake);
    }
  };

  const generateSnowflakes = () => {
    const numberOfParticles =
      Math.ceil((window.innerWidth * window.innerHeight) / 1000) *
      particlesPerThousandPixels;
    const interval = 5000 / numberOfParticles;

    clearInterval(snowflakeInterval);
    snowflakeInterval = setInterval(() => {
      if (isTabActive && snowflakes.current.length < maxSnowflakes) {
        requestAnimationFrame(createSnowflake);
      }
    }, interval);
  };

  const handleVisibilityChange = () => {
    if (document.hidden) {
      setIsTabActive(false);
      clearInterval(snowflakeInterval);
    } else {
      setIsTabActive(true);
      generateSnowflakes();
    }
  };

  useEffect(() => {
    generateSnowflakes();

    window.addEventListener("resize", () => {
      clearInterval(snowflakeInterval);
      setTimeout(generateSnowflakes, 1000);
    });

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(snowflakeInterval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isTabActive]);

  return <div className="snow-container" ref={snowContainerRef}></div>;
};

export default Snowfall;
