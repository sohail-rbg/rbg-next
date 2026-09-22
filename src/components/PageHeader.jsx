"use client";

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import HeaderBgImg2 from "../images/project_3.jpg";
import { motion } from "framer-motion";
import { ParallaxBanner, ParallaxBannerLayer } from "react-scroll-parallax";
import { Box, Container, Typography } from "@mui/material";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NextImage from "./NextImage";
const titleVariants = {
  hidden: { opacity: 0, y: -100 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -100 },
};

const PageHeader = ({ title = "Page Title", backgroundImg = HeaderBgImg2 }) => {
  return (
    <Box className="page-header" position="relative" zIndex={1}>
      <Container>
        <ParallaxBanner className="aspect-img">
          <ParallaxBannerLayer speed={-20}>
            <NextImage
              src={backgroundImg}
              alt=""
              fill
              sizes="(max-width: 767px) calc(100vw - 40px), calc(100vw - 220px)"
              priority
            />
          </ParallaxBannerLayer>
          <ParallaxBannerLayer speed={-15} />
        </ParallaxBanner>
        <Box className="pageHeader_content">
          <motion.h1
            variants={titleVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "spring", duration: 1 }}
          >
            {title}
          </motion.h1>
          <motion.div
            variants={titleVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "spring", duration: 1.2 }}
            className="breadcrumbWrp"
          >
            <Breadcrumbs aria-label="breadcrumb" align="center">
              <Link underline="hover" color="inherit" to="/">
                Home
              </Link>
              <Typography color="text.primary">{title}</Typography>
            </Breadcrumbs>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

PageHeader.propTypes = {
  title: PropTypes.string,
  backgroundImg: PropTypes.string,
};

export default PageHeader;
