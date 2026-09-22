"use client";

import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import SectionHeading from "../../components/SectionHeading";

const OurVission = () => {
  return (
    <>
      <Box component="section" id="ourvision" sx={{ py: 8, pb:22 }} bgcolor="#060606">
        <Container>
          <SectionHeading
            title="Unleashing Tomorrow's Possibilities"
            subtitle="Our Vision"
           
            align="center"
          />

          <Grid container spacing={10}>
            <Grid item xs={12} md={6} lg={4}>
              <Box className="iconBox" textAlign="center">
                <Box className="ib_circleBox">
                  <Box className="ib_circle" ><span></span></Box>
                  <Typography
                    className="ic_title "
                    zIndex={5}
                    fontSize={25}
                    variant="h4"
                    component="h4"
                  >
                    Handshake Approach
                  </Typography>
                </Box>
                <Typography component="p" color="#9d9d9d">
                  Goals of rebrandgurus Rebrand gurus Ensures Clients's success
                  by Handshake approach and having skin in the game. RBG focuses
                  on creating a legacy for its client not just a pretty website.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Box className="iconBox angle1" textAlign="center">
                <Box className="ib_circleBox">
                  <Box className="ib_circle"><span></span></Box>
                  <Typography
                    className="ic_title "
                    zIndex={5}
                    fontSize={25}
                    variant="h4"
                    component="h4"
                  >
                  Female Orientation
                  </Typography>
                </Box>
                <Typography component="p" color="#9d9d9d">
                Rebrand gurus Focuses on Minimum 60% Female orientation whether its happy employees or clients.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Box className="iconBox " textAlign="center">
                <Box className="ib_circleBox">
                  <Box className="ib_circle"><span></span></Box>
                  <Typography
                    className="ic_title "
                    zIndex={5}
                    fontSize={25}
                    variant="h4"
                    component="h4"
                  >
                  Retention

                  </Typography>
                </Box>
                <Typography component="p" color="#9d9d9d">
                Rebrand gurus not only focuses on acquiring new clients albeit focuses on retaining all its clients for creating legacy and better ROI generation.


                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default OurVission;
