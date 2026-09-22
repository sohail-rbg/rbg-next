"use client";

// HeroSection.js
import React from "react";
// import BannerVideo from "https://us-west-2.graphassets.com/cm1foy8dy008n01w42t9thc43/cmrkp4wj43e3n07lqxy55xcmg";

import { Box } from "@mui/material";
import BackgroundVideo from "./BackgroundVideo";
import rbgIcon from "../../images/rbg.png";
import NextImage from "../../components/NextImage";
// import Snowfall from "../../components/Snowfall";
const HeroSection = () => {
  return (
    <>
      <Box className="homeBannerSection" sx={{ py: 0 }}>
        <BackgroundVideo />
        <Box className="bannerTextWrp">
          <NextImage
            src={rbgIcon}
            className="img-fluid"
            alt="ReBrand Gurus"
            width={640}
            height={263}
            sizes="(max-width: 767px) calc(100vw - 48px), 80vw"
            priority
          />
          <h3>We Build Brands That Matter In Culture...</h3>
        </Box>

        <Box className="background-video">
        
          <Box
              component="video"
              className="scroll-video"
              src={'https://us-west-2.graphassets.com/cm1foy8dy008n01w42t9thc43/cmrkp4wj43e3n07lqxy55xcmg'}
              autoPlay
              loop
              muted
              
              
          />
        </Box>
        {/* <VisitButton /> */}
      </Box>
      {/* <Snowfall /> */}
    </>
  );
};

export default HeroSection;
