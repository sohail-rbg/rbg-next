"use client";

import { Box, Container } from "@mui/material";
import React, { useState, useEffect } from "react";
import WorkListItem from "./WorkListItem";

import { motion } from "framer-motion";
import { gql } from "graphql-request";
import Hygraph from "../../GraphqlClient";  
const WorkListView = () => {
  const [portfolio, setPortfolio] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const query = gql`
        query MyQuery {
          portfolios(where: {clientReview_not: ""}) {
            id
            title
            clientReview
            websiteUrl
            projectType
            tags
          }
        }
      `;

      try {
        const data = await Hygraph.request(query);
        
        setPortfolio(data.portfolios);
      } catch (error) {
        console.error("Error fetching Featured Portfolio:", error);
      } finally {
        // setLoading(false);
      }
    };

    fetchPosts();
  }, []);
  return (
    <>
      <Box
        className="portfolio__List_section"
        component={"section"}
        sx={{ py: 8 }}
      >
        <Container>
          <Box className="portfolio__item_wrp">
            <motion.div
              initial={{ x: -100, y: 50, opacity: 0 }}
              whileInView={{ x: -0, y: 0, opacity: 1 }}
              exit={{ x: -100, y: 50, opacity: 0 }}
              transition={{
                type: "spring",
                duration: 2,
              }}
              className="portfoli_list_item portfoli_list_item_header"
            >
              <Box className="portfolio__item_inner">
                <Box className="portfolio__no">#</Box>
                <h5 className="portfolio__title">Website Name</h5>
                <Box className={`portfolio__cat `}>Type</Box>
                <Box className="portfolio__reviewText">Client's Review</Box>
                <Box className="portfolio__tags">Tag</Box>
              </Box>
            </motion.div>
            {portfolio.map((portItem, index) => (
              <WorkListItem
                key={portItem.id}
                portItem={portItem}
                index={index}
              />
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default WorkListView;
