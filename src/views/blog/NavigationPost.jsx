"use client";

import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";

import { PortalUrl } from "../../ThemeModule";
import { Link } from "react-router-dom";

import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
import Tooltip from "@mui/material/Tooltip";
import { motion } from "framer-motion";
const NavigationPost = ({ postId }) => {
  const [prevPostTitle, setPrevPostTitle] = useState("");
  const [nextPostTitle, setNextPostTitle] = useState("");
  useEffect(() => {
    const fetchNavigation = async () => {
      try {
        // Fetch current post data
        const currentPostResponse = await axios.get(
          `${PortalUrl}/wp/v2/posts/${postId}`
        );
        const currentPost = currentPostResponse.data;

        // Fetch previous post data
        const prevPostResponse = await axios.get(
          `${PortalUrl}/wp/v2/posts?per_page=1&orderby=date&order=desc&before=${currentPost.date}`
        );
        const prevPost = prevPostResponse.data[0];

        // Fetch next post data
        const nextPostResponse = await axios.get(
          `${PortalUrl}/wp/v2/posts?per_page=1&orderby=date&order=asc&after=${currentPost.date}`
        );
        const nextPost = nextPostResponse.data[0];

        // Set previous and next post titles
        setPrevPostTitle(prevPost ? prevPost : "");
        setNextPostTitle(nextPost ? nextPost : "");
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchNavigation();
  }, [postId]);

  return (
    <>
    <motion.div
    initial={{ y: 100, opacity: 0 }}
whileInView={{ x: -0, y: 0, opacity: 1 }}
exit={{ y: 100, opacity: 0 }}
transition={{
  type: "spring",
  duration: 2,
}} className="post-details__navigation-wrap">
        <Grid container alignItems="center">
          <Grid item xs={12} md={4}>
            <Box className="post-details__navigation-content prev">
              {prevPostTitle && (
                <Link to={`/blog/${prevPostTitle.id}`}>
                  <WestIcon />
                  <span>Previous</span>
                  <h4>{prevPostTitle.title?.rendered}</h4>
                </Link>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Tooltip
             
              title="See All Post"
              className="post-details__navigation-bar text-center"
            >
              <Link to="/blog">
                <span>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.5"
                      d="M1 5.21053C1 3.22567 1 2.23323 1.61662 1.61662C2.23323 1 3.22567 1 5.21053 1C7.19539 1 8.18782 1 8.80444 1.61662C9.42105 2.23323 9.42105 3.22567 9.42105 5.21053C9.42105 7.19539 9.42105 8.18782 8.80444 8.80444C8.18782 9.42105 7.19539 9.42105 5.21053 9.42105C3.22567 9.42105 2.23323 9.42105 1.61662 8.80444C1 8.18782 1 7.19539 1 5.21053Z"
                      stroke="white"
                      strokeWidth="1.5"
                    ></path>
                    <path
                      opacity="0.5"
                      d="M12.5781 16.7896C12.5781 14.8048 12.5781 13.8123 13.1947 13.1957C13.8114 12.5791 14.8038 12.5791 16.7887 12.5791C18.7735 12.5791 19.7659 12.5791 20.3826 13.1957C20.9992 13.8123 20.9992 14.8048 20.9992 16.7896C20.9992 18.7745 20.9992 19.7669 20.3826 20.3835C19.7659 21.0002 18.7735 21.0002 16.7887 21.0002C14.8038 21.0002 13.8114 21.0002 13.1947 20.3835C12.5781 19.7669 12.5781 18.7745 12.5781 16.7896Z"
                      stroke="white"
                      strokeWidth="1.5"
                    ></path>
                    <path
                      d="M1 16.7896C1 14.8048 1 13.8123 1.61662 13.1957C2.23323 12.5791 3.22567 12.5791 5.21053 12.5791C7.19539 12.5791 8.18782 12.5791 8.80444 13.1957C9.42105 13.8123 9.42105 14.8048 9.42105 16.7896C9.42105 18.7745 9.42105 19.7669 8.80444 20.3835C8.18782 21.0002 7.19539 21.0002 5.21053 21.0002C3.22567 21.0002 2.23323 21.0002 1.61662 20.3835C1 19.7669 1 18.7745 1 16.7896Z"
                      stroke="white"
                      strokeWidth="1.5"
                    ></path>
                    <path
                      d="M12.5781 5.21053C12.5781 3.22567 12.5781 2.23323 13.1947 1.61662C13.8114 1 14.8038 1 16.7887 1C18.7735 1 19.7659 1 20.3826 1.61662C20.9992 2.23323 20.9992 3.22567 20.9992 5.21053C20.9992 7.19539 20.9992 8.18782 20.3826 8.80444C19.7659 9.42105 18.7735 9.42105 16.7887 9.42105C14.8038 9.42105 13.8114 9.42105 13.1947 8.80444C12.5781 8.18782 12.5781 7.19539 12.5781 5.21053Z"
                      stroke="white"
                      strokeWidth="1.5"
                    ></path>
                  </svg>
                </span>
              </Link>
            </Tooltip>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box className="post-details__navigation-content next">
              {nextPostTitle && (
                <Link to={`/blog/${nextPostTitle.id}`}>
                  <span>Next</span>
                  <EastIcon />
                  <h4>{nextPostTitle.title?.rendered}</h4>
                </Link>
              )}
            </Box>
          </Grid>
        </Grid>
      </motion.div>
    </>
  );
};

export default NavigationPost;
