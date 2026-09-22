"use client";

import { Box, Container, Grid } from "@mui/material";
import React from "react";
import RightImage from '../../../images/counter-3.png'

import { HomePageData } from "../../../Data";
import NextImage from "../../../components/NextImage";
const SlideTwo = () => {
    const ourNumbers = HomePageData.whyChooseUs.SlideTwo.ourNumbers
  return (
    <>
      <Box className="achievementPanel">
        <Container>
          <Grid 
          container
          justifyContent="center"
          alignItems="center"
          >
            <Grid item xs={12} md={6}>
              <div className="counter__wrapper">
              {
                ourNumbers.map((item)=>{
                    return (
                    <Box key={item.id} className="counter__item">
                        <h2 className="counter__number">{item.number}{item.numberPrefix}</h2>
                        <p>{item.title}</p>
                    </Box>
                )})
              }
               
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
            <Box className='couterImg'>
                <NextImage
                    className="img-fluid"
                    alt="ReBrand Gurus achievements"
                    src={RightImage}
                    width={717}
                    height={670}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    />
            </Box>
            
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default SlideTwo;
