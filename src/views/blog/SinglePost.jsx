"use client";

// SinglePost.js
import React, { useState, useEffect } from "react";
import axios from "axios";

import { PortalUrl } from "../../ThemeModule";
import { useParams } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Container } from "@mui/material";
import SinglePostTopSection from "./SinglePostTopSection";
import { motion } from "framer-motion";
import NavigationPost from "./NavigationPost";
import NextImage from "../../components/NextImage";

const SinglePost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bgImg, setBgImg] = useState(null);
  const [bgImgID, setBgImgID] = useState();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `${PortalUrl}/wp/v2/posts/${postId}`
        );
        setPost(response.data);
        setBgImgID(response.data.acf?.bg_img);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching post:", error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  useEffect(() => {
    const fetchBgImage = async () => {
      if (!bgImgID) {
        return;
      }

      try {
        const response = await axios.get(
          `${PortalUrl}/wp/v2/media/${bgImgID}`
        );
        const bgImgData = response.data;
        setBgImg(bgImgData);
      } catch (error) {
        // console.error("Error fetching Background image:", error);
      }
    };

    fetchBgImage();
  }, [bgImgID]);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <ErrorMessage text={error} type="error" />;
  }

  if (!post) {
    return <ErrorMessage text="Post Not Found" type="info" />;
  }

  return (
    <>
      <Box className="singlePostMainWrp">
        {bgImg && (
          <Box className="post__bgImg">
            <NextImage
              src={bgImg.source_url}
              alt=""
              fill
              sizes="100vw"
            />
          </Box>
        )}
        <SinglePostTopSection
          bannerImageID={post.acf?.detail_page_image}
          postTitle={post.title}
        />
        <Box component={"section"} sx={{ py: 10 }}>
          <Container>
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ x: -0, y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{
                type: "spring",
                duration: 2,
              }}
              className="postContentArea"
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />
            <NavigationPost postId={post.id} />
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default SinglePost;
