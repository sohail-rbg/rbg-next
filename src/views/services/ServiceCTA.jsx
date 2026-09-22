"use client";

import { Box, Button } from "@mui/material";
import React from "react";
import SectionHeading from "../../components/SectionHeading";
import EastIcon from "@mui/icons-material/East";
import { Parallax } from 'react-scroll-parallax';
import { Link } from "react-router-dom";

const ServiceCTA = () => {

  return (
    <>
      <Box className="service_CTA_sec">
        <Box className="cta_effect_1" />
        <Box className="cta_effect_2" />
        <Parallax speed={-10} className="cta_effect_3" />
        <Box className="service_cta_inner">
          <Box className="service_title">
            <SectionHeading
              subtitle="Request A Quote"
              title="Grow Your Brand Online With ReBrand Gurus"
              align="center"
             
            />
          </Box>
          <Box align={"center"}>
            <Button
              sx={{ mt: 0, align: "center" }}
              variant="roundBtn"
              endIcon={<EastIcon />}
              component={Link}
              to={'/contact-us'}
            >
              Request a Quote
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ServiceCTA;
