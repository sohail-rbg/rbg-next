"use client";




import React from 'react'
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

// import { useParallax } from "react-scroll-parallax";
import { Box } from '@mui/material';
import SlideOne from './whyChooseScene/SlideOne';
import SlideTwo from './whyChooseScene/SlideTwo';
import ContactSlide from './whyChooseScene/ContactSlide';

import { HomePageData } from "../../Data";
import introBgImg from "../../images/whyChoose_bg.png";
import introBgImg2 from "../../images/whyChoose_bg_1.png";


gsap.registerPlugin(ScrollTrigger);


const WhyChoose = () => {
  const component = useRef();
  const slider = useRef();

  useEffect(() => {
    const media = gsap.matchMedia();

    media.add("(min-width: 1025px)", () => {
      const context = gsap.context(() => {
        const panels = gsap.utils.toArray(".hori_panel");
        gsap.to(panels, {
          xPercent: -100 * (panels.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: slider.current,
            pin: true,
            scrub: 1,
            snap: 1 / (panels.length - 1),
            end: () => "+=" + slider.current.offsetWidth,
            markers: false,
          },
        });
      });

      return () => context.revert();
    });

    return () => media.revert();
  }, []);


  const IntroSectionStyle = {
    backgroundImage: `url(${introBgImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'top left'
  };

  const IntroSectionStyle2 = {
    backgroundImage: `url(${introBgImg2})`,
    backgroundSize: 'cover',
    backgroundPosition: 'top left',
    backgroundAttachment:'fixed'
  };


  return (
    <Box component='section' className="hortizontailWrpBox" ref={component}>
      <Box ref={slider} className="hori_sectionWrp">
        <Box className="description into_panel hori_panel " bgcolor="background.bg_0"  style={IntroSectionStyle}>
          <Box className='choose-title-wrapper'>
            <h2 className='choose-title' >{HomePageData.whyChooseUs.title}</h2>
          </Box>
        </Box>
        <Box className="hori_panel research__area"  bgcolor="background.bg_1">
          <SlideOne />
        </Box>
        <Box className="hori_panel "  bgcolor="background.bg_3">
          <SlideTwo />
        </Box>
        <Box className="hori_panel"  bgcolor="background.bg_3"  style={IntroSectionStyle2}>
          <ContactSlide />
        </Box>
      </Box>
      
    </Box>
  )
}

export default WhyChoose
