"use client";

import React from 'react';
import { Box, Container } from '@mui/material';
import Marquee from "react-fast-marquee";
const roll_1 = [ 'Agency', 'Studio', 'Digital Solution', 'Digital Magazine', 'Strategy', 'Branding', 'Contemplative', 'Forethought', 'Development'];
const roll_2 = [ 'Design', 'Interaction', 'Creative', 'Typography', 'Aesthetic', 'Minimalistic', ];

const USPSection = () => {
  return (
    <>
    <Box className='rollSection' component="section">
       
            <Box  className='roll_wrp roll--1_wrp'  bgcolor="primary.light">
                <Container maxWidth="lg">
                    <Marquee pauseOnHover='true' className="second_roll_swiper" >
                        {roll_1.map((item, index) => (
                            <div className='roll_wrp_item' key={index}>{item} </div>
                        ))}
                        
                    </Marquee>
                </Container>
            </Box>
            <Box  className='roll_wrp roll--1_wrp' color={'#fff'}  bgcolor="primary.main">
                <Container maxWidth="lg">
                    <Marquee  pauseOnHover='true' direction='right' className="first_roll_swiper">
                        {roll_2.map((item, index) => (
                            <div  className='roll_wrp_item' key={index}>{item}</div>
                        ))}
                    </Marquee>
                </Container>
            </Box>
        
    </Box>
    </>
  )
}

export default USPSection;