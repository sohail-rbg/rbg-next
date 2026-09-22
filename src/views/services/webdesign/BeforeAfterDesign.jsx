"use client";

import React, { useEffect } from "react";
import { gsap, ScrollTrigger } from "gsap/all"; 
import { Box } from "@mui/material";
import NextImage from "../../../components/NextImage";

const BeforeAfterDesign = ({ beforeAfter }) => {
  useEffect(() => {
    const cards = gsap.utils.toArray(".ba_card_item"); // Corrected class name

    cards.forEach((card, index) => {
      gsap.to(card, {
        scrollTrigger: {
          trigger: card,
          start: () => `top bottom-=100`,
          end: () => `top top+=40`,
          scrub: true,
          markers: false,
          invalidateOnRefresh: true,
        },
        ease: "none",
        scale: () => 1 - (cards.length - index) * 0.015,
      });

      ScrollTrigger.create({
        trigger: card,
        start: "top top",
        pin: true,
        pinSpacing: false,
        markers: false,
        id: "pin",
        end: "max",
        invalidateOnRefresh: true,
      });
    });
  }, []);

  return (
    <Box>
      <Box className="ba_cards_wrp">
        {beforeAfter.map((ba_item) => (
          <Box key={ba_item.title} className="ba_card_item">
                <NextImage className="img-fluid" src={ba_item.img} alt={ba_item.title || ""} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default BeforeAfterDesign;
