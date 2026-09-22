"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import HeroSection from "./work/HeroSection";

import { Box } from "@mui/material";
import WorkGrid from "./work/WorkGrid";
import WorkNumber from "./work/WorkNumber";
import WorkListView from "./work/WorkListView";

const Portfolio = () => {
  //Video Fixed
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();

    media.add("(min-width: 768px)", () => {
      const imgAnimation = gsap.fromTo(
        "#img1",
        { height: "100px", width: "250px", borderRadius: "100px" },
        {
          width: "100%",
          borderRadius: "20px",
          height: "90vh",
          top: "0%",
          left: "0%",
          duration: 2,
          xPercent: 0,
          yPercent: 0,
          scrollTrigger: {
            invalidateOnRefresh: true,
            trigger: ".ImgWrapper",
            start: "top 30px",
            end: "+=400",
            pin: true,
            scrub: 1,
          },
        }
      );

      return () => imgAnimation.kill();
    });

    return () => media.revert();
  }, []);

  return (
    <>
      <Box bgcolor="#000">
        <HeroSection />
        <Box sx={{ height: { xs: "40px", md: "calc(90vh + 300px)" } }} />
        <WorkGrid />
        <WorkNumber />
        <WorkListView />
      </Box>
    </>
  );
};

export default Portfolio;
