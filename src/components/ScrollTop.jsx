"use client";

import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

import scrolltop from "../images/scroll_top.svg";
import NextImage from "./NextImage";

export const ScrollTop = () => {
    const [scroll, setScroll] = useState("");

    useEffect(() => {
      let ticking = false;

      const updateScroll = () => {
        const html = document.documentElement;
        const body = document.body;
        const scrollTop = html.scrollTop || body.scrollTop;
        const scrollHeight = (html.scrollHeight || body.scrollHeight) - html.clientHeight;
        const scrollPercent = Math.round((scrollTop / scrollHeight) * 100);

        setScroll(isNaN(scrollPercent) ? "" : scrollPercent);
        ticking = false;
      };

      const handleScroll = () => {
        if (!ticking) {
          ticking = true;
          window.requestAnimationFrame(updateScroll);
        }
      };

      handleScroll();
      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);


      //Scroll top
      const handleScrollTop = () => {
        const scrollToTop = () => {
          const currentPosition = window.scrollY;
          if (currentPosition > 0) {
            window.requestAnimationFrame(scrollToTop);
            window.scrollTo(0, currentPosition - currentPosition / 8);
          }
        };
      
        scrollToTop();
      };

  return (
    <>
      <Box className="scroll-to-top" onClick={handleScrollTop}>
        <NextImage
          className="scrollImg"
          src={scrolltop}
          alt="scroll"
          width={120}
          height={120}
          sizes="(max-width: 767px) 36px, 70px"
          style={{ transform: `rotate(${Number(scroll || 0) * 2.4}deg)` }}
        />
        <Box className="box-number v-middle">
          <span>{`${scroll}%`}</span>
        </Box>
      </Box>
    </>
  );
};
