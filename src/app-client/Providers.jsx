"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ThemeProvider } from "@mui/material/styles";
import { ParallaxProvider } from "react-scroll-parallax";
import { darkTheme } from "../ThemeModule";
import Header from "../components/header/Header";
import CursorLayer from "./CursorLayer";
import NavigationLoader from "./NavigationLoader";
import Preloader from "../components/preloader/Preloader";

const Footer = dynamic(() => import("../components/footer/Footer"), {
  ssr: false,
});

export default function Providers({ children }) {
  return (
    <ParallaxProvider>
      <ThemeProvider theme={darkTheme}>
        <Preloader />
        <CursorLayer />
        <NavigationLoader />
        <div className="body-bg"></div>
        <Header />
        <div className="mainContentWrp">{children}</div>
        <Footer />
      </ThemeProvider>
    </ParallaxProvider>
  );
}
