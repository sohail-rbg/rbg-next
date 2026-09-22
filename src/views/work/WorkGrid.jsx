"use client";

import { Box, Container } from "@mui/material";
import React, { useState, useEffect } from "react";
import WorkItem from "./WorkItem";
import { gql } from "graphql-request";
import Hygraph from "../../GraphqlClient";  
const WorkGrid = () => {
  const [portfolio, setPortfolio] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const query = gql`
        query MyQuery {
          portfolios(where: {featured: true}, last: 3) {
            id
            title
            websiteUrl
            tags
            image {
              url
            }
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
      <Box>
        <Container>
          <Box className="work_grid_container">
            {portfolio.map((workItem) => (
              <WorkItem key={workItem.id} item={workItem} />
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default WorkGrid;
