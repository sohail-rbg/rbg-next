"use client";

import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import EastIcon from '@mui/icons-material/East';

// import { useParams } from "react-router-dom";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import { ScrollTop } from "../../components/ScrollTop";
import EmblaCarousel from "../../components/EmblaCarousel";


//CSS
import { ServicesPageData } from "../../Data";
import CustomButton from "../../components/CustomButton";

gsap.registerPlugin(ScrollTrigger);

const ServiceDetailsLayout = ({
  id,
  content,
  showFeatured = true,
  contentFullBleed = false,
}) => {
  const service = ServicesPageData.services[id] || ServicesPageData.services[0];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100;
      const rotation = scrollPercentage * 10;

      gsap.to(".page_title", { y: `${rotation}`, duration: 1, ease: "none" });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const OPTIONS = { dragFree: false, loop: true };
  const SLIDE_COUNT = 3;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());


  const TitleWithSpan = ()=> (
    <span>
      {service.title}
      <span className="letter-stroke"> {service.title}</span>
    </span>
  );

  return (
      <Box component="section" className="servicePageWrp">
        {showFeatured && (
        <Box className="pageFeaturedImageSec ">
          <EmblaCarousel slides={SLIDES} options={OPTIONS} sliderImage={service.sliderImage} />
          <Box className="pageFeature_content">
            <Typography
              component="h1"
              variant="h1"
              fontSize="60px"
              fontWeight="normal"
            >
              {service.mainHeading}
            </Typography>
            <p className="description border-before">{service.description}</p>
            <CustomButton endIcon={<EastIcon />}>Get a Quote</CustomButton>
            
          </Box>
        </Box>
        )}
        <Box className="servicewrp">
          <Box className="page_sidebox">
            <Box className="box-first-left">
              <Box className="page-active">
                <h2>Service</h2>
              </Box>
              <ScrollTop />
            </Box>
            <Box className="box-second-left">
              <Box className="page_title">
                  {[...Array(3)].map((_, index) => (
                    <TitleWithSpan key={index} text={index} />
                  ))}
              </Box>
            </Box>
          </Box>
          <Box
            className={`page_contentbox${contentFullBleed ? " page_contentbox--fullBleed" : ""}`}
          >
            {content}
          </Box>
        </Box>
      </Box>
  );
};

export default ServiceDetailsLayout;
