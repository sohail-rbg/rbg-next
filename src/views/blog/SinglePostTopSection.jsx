"use client";

import { Box, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ParallaxBanner, ParallaxBannerLayer } from "react-scroll-parallax";

import { PortalUrl } from "../../ThemeModule";

const SinglePostTopSection = ({ bannerImageID, postTitle }) => {
  const [featuredImg, setFeaturedImg] = useState(null);

  useEffect(() => {
    const fetchFeaturedImage = async () => {
      if (!bannerImageID) {
        return;
      }

      try {
        const response = await axios.get(
          `${PortalUrl}/wp/v2/media/${bannerImageID}`
        );
        const featuredImgData = response.data;
        setFeaturedImg(featuredImgData);
      } catch (error) {
        console.error("Error fetching featured image:", error);
      }
    };

    fetchFeaturedImage();
  }, [bannerImageID]);

  return (
    <>
      <Box component={"section"} sx={{ pt: 5 }} className="single_top_bannerWrapper">
        <Container>
          {featuredImg && (
            <Box  className="singleTop_bannerWrapper">
            <ParallaxBanner
              className="singleTop_bannerImg"
              style={{ aspectRatio: "2 / 1" }}
            >
              <ParallaxBannerLayer
                image={featuredImg.source_url}
                scale={[1, 1.2]}
                speed={-20}
              />
            </ParallaxBanner>
            <Box className="blog-list__title-box" >
            
            <h1 className="blog-main__title">{postTitle.rendered}</h1>
        </Box>
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
};

export default SinglePostTopSection;
