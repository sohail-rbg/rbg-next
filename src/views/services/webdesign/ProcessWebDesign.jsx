"use client";

import React from 'react'
import { Box, Grid } from '@mui/material';
import processImg from '../../../images/services/webdesign/processImg.jpg'
import { motion } from "framer-motion";
import SectionHeading from '../../../components/SectionHeading';
import NextImage from '../../../components/NextImage';

const ProcessWebDesign = () => {
  return (
    <Box component="section" className="wd_processSection wdxProcess">
      <span className="wdxProcess__aurora" aria-hidden="true" />
      <Grid container alignItems="center" spacing={5}>
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.72 }}
            whileInView={{ y: 0, opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: "spring", duration: 1.6 }}
            className="process-circle-crev wdxProcess__medallion"
          >
            <span className="wdxProcess__halo" aria-hidden="true" />
            <Box className="circle-button wdxProcess__ring">
              <Box className="rotate-circle wdxProcess__rotor">
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
            <Box className="wdxProcess__disc">
              <NextImage
                src={processImg}
                alt=""
                fill
                sizes="(max-width: 1023px) 78vw, 34vw"
                className="wdxProcess__img"
              />
              <span className="wdxProcess__discTint" aria-hidden="true" />
            </Box>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={6}>
          <div className="wdxProcess__copy">
            <SectionHeading
              title="Website Redesign Process"
              description="Following our step-by-step process, our team will deliver expert redesign of your website to boost your online brand and increase conversions."
            />
          </div>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ProcessWebDesign;
