"use client";

import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import { Box, Container } from "@mui/material";
import { gql } from "graphql-request";
import Hygraph from "../../GraphqlClient";  
import { Link } from "react-router-dom";
import NextImage from "../../components/NextImage";

// Import css files
const WeeklyDrop = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const firstSliderRef = useRef(null);
  const secondSliderRef = useRef(null);

  // Fetch posts on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      const query = gql`
        query MyQuery {
          portfolios(last: 5, where: { weeklyDrop: true }) {
            websiteUrl
            weeklyDropImage {
              url
            }
            color1 {
              hex
            }
            color2 {
              hex
            }
            title
            websiteLogo {
              url
            }
            websiteLaunchDate
          }
        }
      `;

      try {
        const data = await Hygraph.request(query, {});
        setPosts(data.portfolios);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Failed to load Weekly Drop content.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const settingsFirstSlider = {
    ref: firstSliderRef,
    centerMode: true,
    centerPadding: "24%",
    slidesToShow: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    swipe: true,
    pauseOnHover: false,
    arrows: false,
    speed: 500,
    afterChange: function (index) {
      setActiveSlideIndex(index);
      if (secondSliderRef.current) {
        secondSliderRef.current.slickGoTo(index);
      }
    },
  };

  const settingsSecondSlider = {
    ref: secondSliderRef,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    fade: true,
    speed: 500,
    cssEase: "cubic-bezier(0.7, 0.3, 0.3, 1)",
  };

  return (
    <Box component="section" bgcolor="#0C0A0B">
      <Container>
        <Box className="weeklyDropSection section" sx={{ py: 8, position: "relative" }}>
          {loading ? (
            <div className="loader">Loading...</div>
          ) : error ? (
            <div className="error-message">
              <p>Failed to load: {error}</p>
            </div>
          ) : (
            <>
              <Slider {...settingsSecondSlider} className="weeklyDropOverlay">
                {posts.map((slide, index) => (
                  <div key={index}>
                    <div
                      className="zoom-effect"
                      style={{
                        // background: `linear-gradient(45deg, ${slide.color1.hex}, ${slide.color2.hex})`,
                      }}
                    ></div>
                  </div>
                ))}
              </Slider>

              <div className="wd_title">
                <h2>Weekly Drop</h2>
                <h2>Weekly Drop</h2>
                <h2>Weekly Drop</h2>
                <h2>Weekly Drop</h2>
              </div>

              <Box className="wd_info_wrp">
                <Box className="wd_logo">
                  <NextImage
                    className="img-fluid"
                    src={posts[activeSlideIndex]?.websiteLogo.url}
                    alt={posts[activeSlideIndex]?.title || ""}
                  />
                </Box>
                <Box className="wd_date">
                  {/* {posts[activeSlideIndex]?.websiteLaunchDate} */}
                </Box>
              </Box>

              <Slider {...settingsFirstSlider} className="projectDisc_slider">
                {posts.map((slide, index) => (
                  <Box key={index} sx={{ pb: 3, textAlign: "center" }}>
                    <div className="project_disc_box">
                      <NextImage src={slide.weeklyDropImage.url} alt={slide.title} />
                    </div>
                    <Link
                      className="visitSite_box"
                      to={slide.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Visit the website in a new tab"
                    >
                      {slide.websiteUrl}
                    </Link>
                  </Box>
                ))}
              </Slider>
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default WeeklyDrop;
