"use client";

import { Box, Container, Grid,  Typography } from "@mui/material";
import React from "react";
//Images
import R from "../../images/r.png";
import B from "../../images/b.png";
import G from "../../images/g.png";
import NextImage from "../../components/NextImage";

const BrandInfo = () => {
  return (
    <>
      <Box
        className="brandInfoSection"
        sx={{ py: 8 }}
        bgcolor="background.bg_3"
        component="section"
      >
        <Container>
          <Grid container className="brandInfo_wrp" spacing={3}>
            <Grid item xs={12} md={4}>
              <Box className="bi_item">
                <Box className="bi_inner">
                  <NextImage className="img-fluid" alt="R" src={R} width={400} height={495} sizes="140px" />
                  <Typography
                    variant="h3"
                    className="bi_title"
                    component={"h3"}
                  >
                    Revolutionary
                  </Typography>
                  <p>
                    Our agency embodies innovation, cutting-edge technology, and
                    forward-thinking solutions. We are not just following
                    trends; we are setting new standards in the industry.
                  </p>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box className="bi_item">
                <Box className="bi_inner">
                  <NextImage className="img-fluid" alt="B" src={B} width={400} height={495} sizes="140px" />
                  <Typography
                    variant="h3"
                    className="bi_title"
                    component={"h3"}
                  >
                    Build
                  </Typography>
                  <p>
                    At the heart of our agency's mission is the construction of
                    websites. We emphasize a strong foundation, meticulous
                    attention to detail, and the ability to create complex and
                    robust digital structures.
                  </p>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box className="bi_item">
                <Box className="bi_inner">
                  <NextImage className="img-fluid" alt="G" src={G} width={400} height={495} sizes="140px" />
                  <Typography
                    variant="h3"
                    className="bi_title"
                    component={"h3"}
                  >
                    Group
                  </Typography>
                  <p>
                    We pride ourselves on a team-oriented approach, fostering
                    collaboration and leveraging a diverse skill set. Our
                    collective effort ensures exceptional results, reflecting
                    our commitment to delivering top-notch services as a unified
                    team.
                  </p>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default BrandInfo;
