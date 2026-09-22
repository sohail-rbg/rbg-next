"use client";

import React from "react";

import { Box, Container, Grid } from "@mui/material";

import SectionHeading from "../../components/SectionHeading";
import { HomePageData } from "../../Data";
import NextImage from "../../components/NextImage";

const HowWeWork = () => {
  return (
    <>
      <Box
        component="section"
        sx={{pt:3, pb: 9 }}
        bgcolor="#000"
        className="howweworkSection"
      >
        <Container>
          <Box className="teamSectionHeading">
            <SectionHeading
              title={HomePageData.howItWorkSec.title}
              align="center"
              subtitle={HomePageData.howItWorkSec.subTitle}
            />
          </Box>
          <Grid
            container
            direction="row"
            columns={10}
            justifyContent={'center'}
          >
            {
              HomePageData.howItWorkSec.steps.map((stepItem)=>{
                return (
                  <Grid item xs={12} md={3} lg={2} key={stepItem.title}>
                    <Box className="stepInner">
                      <h4 className="workflow__step">step {stepItem.step}</h4>
                      <h5 className="workflow__number">{stepItem.step}</h5>
                      <NextImage
                        className='hiw_img'
                        alt={stepItem.title}
                        src={stepItem.image}
                        width={300}
                        height={300}
                        sizes="150px"
                       />
                      <h6 className="workflow__title">{stepItem.title}</h6>
                      <p>{stepItem.content}</p>
                    </Box>
                  </Grid>
                )
              })
            }

           
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default HowWeWork;
