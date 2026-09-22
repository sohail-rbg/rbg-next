"use client";

import { Box, Container, Grid } from "@mui/material";
import React from "react";
import SectionHeading from "../../../components/SectionHeading";
import { motion } from "framer-motion";
import img1 from "../../../images/services/service/1.png";
import img2 from "../../../images/services/service/2.png";
import img3 from "../../../images/services/service/3.png";
import img4 from "../../../images/services/service/4.png";
import img5 from "../../../images/services/service/5.png";
import img6 from "../../../images/services/service/6.png";
import img7 from "../../../images/services/service/7.png";
import img8 from "../../../images/services/service/8.png";
import img9 from "../../../images/services/service/9.png";
import img10 from "../../../images/services/service/10.png";
import img11 from "../../../images/services/service/11.png";
import img12 from "../../../images/services/service/12.png";
import img13 from "../../../images/services/service/13.png";
import img14 from "../../../images/services/service/14.png";
import img15 from "../../../images/services/service/15.png";
import img16 from "../../../images/services/service/16.png";
import NextImage from "../../../components/NextImage";

const WelcomeService = () => {
  const work_item_initial = {
    opacity: 0,
    y: "-100px",
  };
  const work_item_view = {
    opacity: 1,
    y: "0",
  };
  const work_item_transition = {
    type: "spring",
    duration: 2,
    repeatType: "reverse",
  };

  const imagesUp = [img1, img2, img3, img4, img5, img6, img7, img8];
  const imagesDown = [img9, img10, img11, img12, img13, img14, img15, img16];

  const renderImages = (images, direction) => (
    <Box
      component={"marquee"}
      loop="100"
      direction={direction}
      className={`ser_maqqueeBox ${direction === 'down' ? 'stm_left_box' : 'stm_right_box'}`}
    >
      {images.map((img, index) => (
        <Box className="ser_maq_item" key={index}>
          <NextImage
            alt={`service-image-${index + 1}`}
            src={img}
            className="img-fluid"
          />
        </Box>
      ))}
    </Box>
  );

  return (
    <>
      <Box component={"section"} className="serviceWelcomeSec">
        <Container>
          <Grid container spacing={4} direction="row" alignItems="center">
            <Grid xs={12} md={6} item>
              <SectionHeading
                title="High Quality Projects"
                subtitle="ReBrand Gurus"
                titleFontSize="80px"
              />
              <div className="sv-inner__service-list-wrap">
                <motion.div
                  initial={work_item_initial}
                  whileInView={work_item_view}
                  transition={work_item_transition}
                  className="sv-inner__service-list list-1"
                >
                  <span>Specialized Design Enhancement Protocol</span>
                </motion.div>
                <motion.div
                  initial={work_item_initial}
                  whileInView={work_item_view}
                  transition={work_item_transition}
                  className="sv-inner__service-list list-2"
                >
                  <span>Over 200 Websites in the SME Sector</span>
                </motion.div>
                <motion.div
                  initial={work_item_initial}
                  whileInView={work_item_view}
                  transition={work_item_transition}
                  className="sv-inner__service-list list-3"
                >
                  <span>Exquisite Visual Optimization</span>
                </motion.div>
              </div>
            </Grid>
            <Grid xs={12} md={6} item>
              <div className="service_top_marquee_box">
                {renderImages(imagesDown, "down")}
                {renderImages(imagesUp, "up")}
              </div>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default WelcomeService;
