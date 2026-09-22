"use client";

import React, { useState } from "react";
import { Box,  Container, Grid, Typography } from "@mui/material";

import EastIcon from '@mui/icons-material/East';
import aboutImageLeft from "../../images/utah2.jpg";
import aboutImageRight from "../../images/skyline.webp";
import { HomePageData } from "../../Data";
import { useParallax } from "react-scroll-parallax";
import CustomButton from "../../components/CustomButton";
import NextImage from "../../components/NextImage";

const HomeAbout = () => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const classNames = isHovered ? "active" : "";

  //paralax effect
  const parallax = useParallax({
    speed: 15,
  });
  const parallax2 = useParallax({
    speed: -10,
  });


  return (
    <>
      <Box className="sectionWrp" component="section" bgcolor="#0C0A0B" >
       
        <Container>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 5 }}
          >
            <Grid item={true} xs={12} sm={6} md={4} lg={4} >
              <Box className="about__img">
                <NextImage
                  src={aboutImageLeft}
                  ref={parallax.ref}
                  className="img-fluid"
                  alt={HomePageData.aboutus.title}
                />
              </Box>
            </Grid>
            <Grid item={true} xs={12} sm={6} md={8} lg={8}>
              <Box className="about__content-wrapper" >
                <Box className={`about__content ${classNames}`}>
                  <Typography color="white" sx={{ mb: 3 }} variant="h3" fontWeight={400} component="h2">
                    {HomePageData.aboutus.title}
                  </Typography>
                  <Typography  color="#d1d1d1" variant="p" fontWeight={400} component="p">
                    {HomePageData.aboutus.description}
                  </Typography>
                 
                  <CustomButton margin="40px 0 0" component={'a'} link={'/about-us'} endIcon={<EastIcon />}>{HomePageData.aboutus.button.text}</CustomButton>
                </Box>
                <Box className="about__img-right" >
                  <NextImage
                    alt={HomePageData.aboutus.rightImage.alt}
                    src={aboutImageRight}
                    className="img-fluid"
                    ref={parallax2.ref}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  />
                  <Box
                    component={'div'}
                    className="aboutOverlayBox"
                  >
                    <Typography
                      component={'h4'}
                      variant="h4"
                      sx={{mb:1}}
                    >{HomePageData.aboutus.hoverBox.heading}</Typography>
                    <Typography
                      component={'p'}
                      variant="p"
                     
                    >{HomePageData.aboutus.hoverBox.description}</Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default HomeAbout;
