"use client";

import React from 'react';

// import { PortfolioData } from "../Data";
import { Box, Container } from "@mui/material";

import introVideo from '../../videos/intro-video.mp4';
import backgroundVideo from '../../videos/portfolio.mp4'
const HeroSection = () => {
   
  return (
    <>
    <Box
    className="workWelcomeWrp"
    component="section"
    sx={{ py: 10 }}
  >
  <video autoPlay muted loop className="bg_video">
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    <Container>
      <Box className="workMainContent" textAlign="center">
        <h1>
        Roar in the <br /> <span>Digital</span> Wilderness. 
        </h1>
        
      </Box>
      
      <div className="ImgWrapper">
       
        <video id="img1"   autoPlay muted loop >
        <source src={introVideo} type="video/mp4"/>
        Your browser does not support the video tag.

       </video>
        </div>
    </Container>
  </Box>
    </>
  );
};

export default HeroSection;
