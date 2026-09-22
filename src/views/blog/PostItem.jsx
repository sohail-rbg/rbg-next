"use client";

import { Box } from "@mui/material";
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import NextImage from "../../components/NextImage";
const PostItem = ({ post }) => {
  
  return (
    <>
      <motion.li
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ x: -0, y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{
          type: "spring",
          duration: 2,
        }}
        className="blog__item"
        component={"li"}
      >
        <Box className="blog__inner_box">
        <Link to={`/blog/${post.id}`}  className="blog__img">
          {
            post.featured_image_url && (
              <NextImage
              src={post.featured_image_url}
              alt={post.title.rendered}
              className="img-fluid"
            />
            )
          }
            
            </Link>
          
        </Box>
      </motion.li>
    </>
  );
};

export default PostItem;
