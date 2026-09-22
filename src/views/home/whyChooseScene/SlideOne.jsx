"use client";

import { Box, Container, Grid } from "@mui/material";
import React from "react";
import SectionHeading from "../../../components/SectionHeading";

import { HomePageData } from "../../../Data";

const SlideOne = () => {
  const researchTool = HomePageData.whyChooseUs.slideOne.researchTool;
  const points = HomePageData.whyChooseUs.slideOne.points;

  return (
    <>
      <Box>
        <Container>
          <Grid container>
            <Grid item  xs={12} sm={6}>
              <Box className="researchTitleWrp">
                <SectionHeading
                  subtitle={HomePageData.whyChooseUs.slideOne.subTitle}
                  title={HomePageData.whyChooseUs.slideOne.title}
                  description={HomePageData.whyChooseUs.slideOne.description}
                />
                <ul className="research__tools">
                  {researchTool.map((item)=>{
                    return (
                      <li key={item.id}>
                          <a href={item.link} target='"_blank"' rel='"nofollow"'>
                          {item.title}
                        </a>
                      </li>

                    )
                  })}
                </ul>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box className="research__list">
                {points.map((item)=>{
                  return (
                    <Box key={item.id} className="research__item">
                      <Box className="research__number">
                        <span>{item.number}{item.numberPrefix}</span>
                      </Box>
                      <Box className="research__info">
                        <h4 className="research__title">{item.title}</h4>
                        <p>{item.description}
                        </p>
                      </Box>
                    </Box>

                  )
                })}
               
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default SlideOne;
