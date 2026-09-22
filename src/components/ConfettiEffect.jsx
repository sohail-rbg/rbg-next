"use client";

import React from 'react';
import Particles from 'react-tsparticles';
import { loadConfettiPreset } from 'tsparticles-preset-confetti';

const ConfettiBackground = () => {
  return (
    <Particles
      id="tsparticles"
      options={{
        preset: 'confetti', // Use the confetti preset
        background: {
          color: {
            // value: "#ffffff", // Optional background color
          },
        },
      }}
    />
  );
};

export default ConfettiBackground;
