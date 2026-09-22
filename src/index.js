"use client";

import React from 'react';
import ReactDOM from 'react-dom/client';
import { ParallaxProvider } from "react-scroll-parallax";

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ParallaxProvider>
    <App />
    </ParallaxProvider>

);
