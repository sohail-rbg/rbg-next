"use client";

import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import EastIcon from '@mui/icons-material/East';
import { motion } from 'framer-motion';

import CustomButton from "../../../components/CustomButton";
import NextImage from "../../../components/NextImage";


const ServiceCard = ({ data }) => { 

  const iconsData = [
    { src: data.icons && data.icons[0]?.src, alt: data.icons && data.icons[0]?.title, initial: { top: '50%', left: '50%' }, final: { top: '10%', left: '10%' }},
    { src: data.icons && data.icons[1]?.src, alt: data.icons && data.icons[1]?.title, initial: { top: '20%', left: '70%' }, final: { top: '25%', left: '85%' }},
    { src: data.icons && data.icons[2]?.src, alt: data.icons && data.icons[2]?.title, initial: { top: '80%', left: '60%' }, final: { top: '85%', left: '95%' }},
    { src: data.icons && data.icons[3]?.src, alt: data.icons && data.icons[3]?.title, initial: { top: '90%', left: '20%' }, final: { top: '95%', left: '10%' }},
    { src: data.icons && data.icons[4]?.src, alt: data.icons && data.icons[4]?.title, initial: { top: '5%', left: '90%' }, final: { top: '10%', left: '85%' }},
    { src: data.icons && data.icons[5]?.src, alt: data.icons && data.icons[5]?.title, initial: { top: '80%', left: '80%' }, final: { top: '85%', left: '85%' }},
    { src: data.icons && data.icons[6]?.src, alt: data.icons && data.icons[6]?.title, initial: { top: '40%', left: '10%' }, final: { top: '45%', left: '12%' }},
    { src: data.icons && data.icons[7]?.src, alt: data.icons && data.icons[7]?.title, initial: { top: '60%', left: '25%' }, final: { top: '65%', left: '15%' }},
    { src: data.icons && data.icons[8]?.src, alt: data.icons && data.icons[8]?.title, initial: { top: '70%', left: '80%' }, final: { top: '75%', left: '100%' }},
    { src: data.icons && data.icons[9]?.src, alt: data.icons && data.icons[9]?.title, initial: { top: '30%', left: '40%' }, final: { top: '35%', left: '85%' }},
  ];
  return (
    <Box 
      className="stackCard__body"
      sx={{ position: 'relative', overflow: 'hidden', }}
    >
      <Box className="stackCard_overlay" sx={{backgroundColor:data.bgColor }}/>
      <Grid
        container
        spacing={4}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item md={2} />
        <Grid item md>
          <Box className="serviceCardContent" textAlign={'center'}>
            <h3>{data.title}</h3>
            <Typography variant="body1">{data.description}</Typography>
            <CustomButton margin="40px 0 0" component={'a'} link={`/service/${data.slug}`} endIcon={<EastIcon />}>
              Explore Now
            </CustomButton>
          </Box>
        </Grid>
        <Grid item md={2} />
      </Grid>
      <div className="stackBodyIcons">
        {iconsData.map((icon, index) => (
          <motion.div
            key={index}
            className="absolute"
            initial={icon.initial}
            animate={icon.final}
            transition={{
              duration: 3, // Adjust duration as needed
              repeat: Infinity,
              repeatType: 'reverse', // Make the animation go back and forth
              ease: 'easeInOut',
              delay: index * 0.2,
            }}
            style={{
              top: icon.initial.top,
              left: icon.initial.left,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="relative">
              <NextImage
                alt={icon.alt || ""}
                loading="lazy"
                src={icon.src}
                width={120}
                height={120}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </Box>
  );
};

export default ServiceCard;
