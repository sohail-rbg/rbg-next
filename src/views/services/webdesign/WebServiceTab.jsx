"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger"; 
import { motion } from "framer-motion";
import { Box, Grid } from "@mui/material";
import { AnimatedParagraph } from "../../../ThemeModule";
import NextImage from "../../../components/NextImage";




const WebServiceTab = (props) => {
  const { webServiceTabData } = props;

  const AnimatedCardHeading = ({ children }) => {
    return (
      <motion.h2
        className="service_stack_title"
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ x: -0, y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{
          type: "spring",
          duration: 2,
        }}
      >
        {children}
      </motion.h2>
    );
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const spacer = 1;

    const initAnimation = () => {
      gsap.fromTo(
        ".service_stack_card:not(:first-child)",
        {
          x: () => window.innerWidth / 2 + 100,
          rotate: 0,
        },
        {
          x: spacer,
          stagger: 0.8,
          rotate: 0,
          scrollTrigger: {
            pin: ".service_stack_card_wrp",
            markers: false,
            scrub: true,
            start: "top 50px",
            // end: "bottom 20%",
            invalidateOnRefresh: true,
          },
          ease: "slow",
        }
      );
    };

    initAnimation();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <div className="spacer"></div>
      <Box className="service_stack_card_wrp">
        {
          webServiceTabData.map((webTabItem) => (
            <Box className="service_stack_card" key={webTabItem.id} bgcolor={webTabItem.bgColor}>
              <Grid container spacing={{ xs: 2, md: 3 }} alignItems="center">
                <Grid item xs={6}>
                  <motion.div initial={{ y: 100, opacity: 0 }}
                  whileInView={{ x: -0, y: 0, opacity: 1 }}
                  exit={{ y: 100, opacity: 0 }}
                  transition={{
                    type: "spring",
                    duration: 2,
                  }} className="service_stack_img">
                    <NextImage
                      src={webTabItem.featuredImg}
                      alt={webTabItem.title}
                      className="img-fluid"
                      style={{ borderRadius: "13px" }}
                    />
                  </motion.div>
                </Grid>
                <Grid item xs={6}>
                  <Box className="service_stack_description" color={webTabItem.color}>
                    <AnimatedCardHeading>{webTabItem.title}</AnimatedCardHeading>
                    <AnimatedParagraph><div dangerouslySetInnerHTML={{ __html: webTabItem.Description }} /></AnimatedParagraph>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          ))
        }
        
       
      </Box>
    </>
  );
};

export default WebServiceTab;
