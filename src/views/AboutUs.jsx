"use client";

import React, { useEffect, useRef } from "react";

import WelcomeAbout from "./about/WelcomeAbout";
import OurVission from "./about/OurVission";
import { Box } from "@mui/material";

import ScrollSpy from "react-ui-scrollspy";
import ClientReviewVideos from "./about/ClientReviewVideos";
import BuiltWithUs from "./about/BuiltWithUs";

const AboutUs = () => {
  const firstmainAboutHref = useRef(null);

  useEffect(() => {
    const setVwVh = () => {
      const vw = document.documentElement.clientWidth / 100;
      const vh = document.documentElement.clientHeight / 100;
      document.documentElement.style.setProperty("--vw", `${vw}px`);
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setVwVh();
    window.addEventListener("resize", setVwVh);

    return () => {
      window.removeEventListener("resize", setVwVh);
    };
  }, []); 

  return (
    <>
      <Box ref={firstmainAboutHref}>
        <ScrollSpy  scrollThrottle={100} useBoxMethod={false}>
          <WelcomeAbout />
          <OurVission />
          <ClientReviewVideos />
          <BuiltWithUs />
        </ScrollSpy>
      </Box>
    </>
  );
};

export default AboutUs;
