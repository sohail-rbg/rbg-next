"use client";

import React, {  } from "react";
import { Box, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
// import PlayArrowIcon from "@mui/icons-material/PlayArrow";

// import welcomeVideo from "../../images/about.mp4";
import AboutNavigation from "./AboutNavigation";
import backgroundVideo from "../../videos/about.mp4";
// import VideoModal from "./VideoModal";
const WelcomeAbout = () => {

  // const modalVideo = `https://www.youtube.com/embed/tL_cPZN5B_w`

  // const handleOpen = (videoUrl) => {
  //   setSelectedVideo(videoUrl);
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  //   setSelectedVideo("");
  // };

  return (
    <>
      <Box
        id="rbgEra"
        className="aboutWelcomeWrp"
        component="section"
        sx={{ py: 10 }}
        // ref={props.aboutMainContainerRef}
      >
        <video autoPlay muted loop className="about_bg_video">
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <Container>
          <Box className=" aboutTOpContent" textAlign="center">
            <motion.h1
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{
                type: "spring",
                duration: 2,
              }}
            >
              Welcome to the <br /> <span>ReBrand Gurus</span> Era
            </motion.h1>
            <Box className="aboutTableContent table_content">
              <AboutNavigation />
            </Box>
          </Box>
          <Box align="center" className="about_subHeading" sx={{ py: 10 }}>
            <Typography component="h2" variant="h3" lineHeight="1.2">
              We are in the business of{" "}
              <Box component="span" className="gradient_text">
                humanity
              </Box>{" "}
              because it still exists. We are not behind your
              <Box component="span" className="gradient_text">
                {" "}
                money
              </Box>
              , but the success you can get with it. Because pushing hard to
              achieve your{" "}
              <Box component="span" className="gradient_text">
                goals
              </Box>{" "}
              is the biggest job we have done.
            </Typography>
          </Box>

          
        </Container>
      </Box>
      
    </>
  );
};

export default WelcomeAbout;
