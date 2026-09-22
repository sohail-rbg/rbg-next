"use client";

import { Box, Button, Container } from "@mui/material";
import React, { useState, useEffect } from "react";
import EastIcon from "@mui/icons-material/East";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// import { useLayoutEffect, useRef } from "react";
import SectionHeading from "../../components/SectionHeading";
import { HomePageData } from "../../Data";
import { Link } from "react-router-dom";

import { gql } from "graphql-request";
import Hygraph from "../../GraphqlClient";  
import NextImage from "../../components/NextImage";

const PortfolioHome = () => {
  const [portfolio, setPortfolio] = useState([]);


  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));


  useEffect(() => {
    const fetchPosts = async () => {
      const query = gql`
        query MyQuery {
          portfolios(last: 6  where: {showInHomepage: true}) {
            id
            websiteUrl
            title
            showInHomepage
            homeImage {
              url
            }
            tags
          }
        }
      `;

      try {
        const data = await Hygraph.request(query);
        
        setPortfolio((data.portfolios || []).filter((item) => item?.homeImage?.url));
      } catch (error) {
        console.error("Error fetching Featured Portfolio:", error);
      } finally {
        // setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const homeWorkData = HomePageData.HomePortfolio;

  const work_item_imageStyle = {
    rotate: "-10deg",
    scale: "0.85",
    y: "100px",
    opacity: "0",
  };

  return (
    <>
      <Box
        className="portfolio__section"
        component="section"
        sx={{ py: 7 }}
        bgcolor="background.bg_3"
      >
        <Container>
          <SectionHeading
            title={homeWorkData.title}
            subtitle={homeWorkData.subTitle}
            align="center"
          />
          <div className="portfolio__list-1">
            {portfolio.map((work_item) => (
              <motion.div
                initial={work_item_imageStyle}
                whileInView={{ rotate: 0, x: 0, y: 0, scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  duration: 2,
                  repeatType: "reverse",
                }}
                className="portfolio__item"
                key={work_item.id}
              >
                <a href={work_item.websiteUrl} target="_blank" rel="noreferrer">
                  <NextImage
                    alt={work_item.title}
                    src={work_item.homeImage.url}
                    className="img-fluid"
                  />
                  <div className="portfolio__info">
                    <h3 className="portfolio__title">{work_item.title}</h3>
                    <div className="portfolio__tag">
                      {(work_item.tags || []).map((tag, index) => (
                        <Box key={index}>
                          {tag}
                          {index < (work_item.tags || []).length - 1 && <span>,</span>}
                        </Box>
                      ))}
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
          <Box align={"center"}>
            <Button
              sx={{
                mt: isMobile ? 4 : 20,
                align: "center",
              }}
              variant="roundBtn"
              component={Link}
              to={'/portfolio'}
              endIcon={<EastIcon />}
            >
            And the Journey Continues..
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default PortfolioHome;
