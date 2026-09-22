"use client";

import React from 'react';
import { Box, Grid } from '@mui/material';
import processImg from '../../../images/services/webdesign/processImg.jpg'
import { motion } from "framer-motion";
import SectionHeading from '../../../components/SectionHeading';
import NextImage from '../../../components/NextImage';
// import ProcessTab from './ProcessTab';

const ProcessWebDesign = () => {
  return (
    <Box component="section" sx={{pb:7}} className="wd_processSection">
      <Grid container   alignItems="end" spacing={5}>
        <Grid item xs={6}>
          <motion.div  initial={{ y: 50, opacity: 0, scale:0.6 }}
          whileInView={{ y: 0, opacity: 1, scale:1 }}
          exit={{ y: 50, opacity: 0, scale:0.6 }}
          transition={{
            type: "spring",
            duration: 2,
          }} className="process-circle-crev ">
            <Box className="circle-button">
              <Box className="rotate-circle fz-16 ls1 text-u">
                <svg className="textcircle" viewBox="0 0 500 500">
                  <defs>
                    <path id="textcircle" d="M250,400 a150,150 0 0,1 0,-300a150,150 0 0,1 0,300Z" />
                  </defs>
                  <text>
                    <textPath xlinkHref="#textcircle" textLength="900"> ReBrand Gurus - ReBrand Gurus - ReBrand Gurus - </textPath>
                  </text>
                </svg>
              </Box>
            </Box>
            <Box className="half-circle-img">
              <NextImage src={processImg} alt="" />
            </Box>
          </motion.div>
        </Grid>
        <Grid item xs={6}>
          <SectionHeading title="Website Redesign Process" description="Following our step-by-step process, our team will deliver expert redesign of your website to boost your online brand and increase conversions." />
        </Grid>
        <Grid item xs={12}>

        </Grid>
      </Grid>
    </Box>
  );
}

export default ProcessWebDesign;
