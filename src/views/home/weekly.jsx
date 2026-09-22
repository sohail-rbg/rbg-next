"use client";

import React, { useState, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import { Box, Container, Typography } from "@mui/material";
import { gql } from "graphql-request";
import Hygraph from "../../GraphqlClient";
import { Link } from "react-router-dom";
import NextImage from "../../components/NextImage";
gsap.registerPlugin(ScrollTrigger);

const Weekly = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const query = gql`
        query MyQuery {
          portfolios(last: 5, where: { weeklyDrop: true }) {
            id
            websiteUrl
            weeklyDropImage {
              url
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
        const data = await Hygraph.request(query);
        setPosts(data.portfolios || []);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const setupGSAPAnimations = () => {
      const directorBoxes = document.querySelectorAll(".weeklyBox");
      const title = document.querySelector(".title");
      const names = document.querySelectorAll(".website_name");

      if (!title || !names.length || !directorBoxes.length) return;

      const splitText = (element) => {
        const text = element.textContent || "";
        element.innerHTML = text
          .split("")
          .map((char) => `<span class="char">${char}</span>`)
          .join("");
      };

      // Apply splitting to title and names
      splitText(title);
      names.forEach((name) => splitText(name));

      const animateEnterName = (nameToAnimate) => {
        gsap.to(title.querySelectorAll(".char"), {
          yPercent: -130,
          stagger: 0.015,
          ease: "power4.out",
          duration: 0.6,
        });
        gsap.to(nameToAnimate.querySelectorAll(".char"), {
          yPercent: -100,
          stagger: 0.015,
          ease: "power4.out",
          duration: 0.6,
        });
      };

      const animateLeaveName = (nameToAnimate) => {
        gsap.to(title.querySelectorAll(".char"), {
          yPercent: 0,
          stagger: 0.015,
          ease: "power4.out",
          duration: 0.6,
        });
        gsap.to(nameToAnimate.querySelectorAll(".char"), {
          yPercent: 0,
          stagger: 0.015,
          ease: "power4.out",
          duration: 0.6,
        });
      };

      const listeners = [];

      directorBoxes.forEach((box) => {
        const dirName = box.dataset.dirName;
        const nameToAnimate = Array.from(names).find(
          (n) => n.dataset.dirName === dirName
        );

        if (!nameToAnimate) return;

        const enterHandler = () => animateEnterName(nameToAnimate);
        const leaveHandler = () => animateLeaveName(nameToAnimate);

        box.addEventListener("mouseenter", enterHandler);
        box.addEventListener("mouseleave", leaveHandler);
        listeners.push({ box, enterHandler, leaveHandler });
      });

      return () => {
        listeners.forEach(({ box, enterHandler, leaveHandler }) => {
          box.removeEventListener("mouseenter", enterHandler);
          box.removeEventListener("mouseleave", leaveHandler);
        });
      };
    };

    return setupGSAPAnimations();
  }, [posts]); // Add `posts` as a dependency

  return (
    <Box
      component="section"
      className="WeeklySec"
      bgcolor="#0C0A0B"
      py={4}
      sx={{
        paddingTop: { xs: 14, sm: 5 },
        overflow: "hidden",
      }}
    >
      <Container position="relative">
        <Box
          sx={{
            fontSize: { xs: "60px", md: "100px", lg: "130px" },
          }}
          className="wd_title"
        >
          <h2>Weekly Drop</h2>
          <h2>Weekly Drop</h2>
          <h2>Weekly Drop</h2>
        </Box>
        <Typography
          sx={{
            fontSize: { xs: "20px", md: "25px", lg: "30px" },
          }}
          pb={3}
          color="#8b9c8c"
          textAlign="center"
        >
          Freshly Brewed Websites Streaming this Week
        </Typography>
        <Box
          className="weeklyDropSection section"
          sx={{ pb: 8, position: "relative" }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: { xs: "100px", md: "150px", lg: "200px" },
              margin: "0 auto",
              position: "relative",
              zIndex: "32",
            }}
          >
            {posts.map((director) => (
              <Box
               
                key={director.id}
                className="weeklyBox"
                data-dir-name={director.title.toLowerCase()}
                sx={{
                  width: "20%",
                  height: "100%",
                  // margin: { xs: "2px", md: "4px", lg: "6px" },
                  margin: "2px",
                  overflow: "hidden",
                  transition: "all 0.4s linear",
                  transform: "scale(0.9)",
                  // cursor: "pointer",
                  filter: "grayscale(100%)",
                  position: "relative",
                  zIndex: 3,
                  ":hover": {
                    transform: "scale(1.05) translateY(10px)",
                    filter: "grayscale(0%)",
                  },
                }}
              >
                
                <NextImage
                  src={director.weeklyDropImage?.url || "/placeholder.jpg"}
                  alt={director.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "12px",
                    // transition: "filter 0.3s ease-in-out",
                  }}
                />
                <Link
                rel="noopener noreferrer"
                to={director.websiteUrl}
                target="_blank" className="weeklyOver"></Link>
              </Box>
            ))}
          </Box>

          <Box
            className="words-container"
            sx={{
              overflow: "hidden",
              position: "relative",
              textAlign: "center",
              fontSize: { xs: "2rem", md: "7rem", lg: "7rem" },
              height: { xs: "56px", md: "108px", lg: "148px" },
              //   height: "148px",
              // textTransform: "uppercase",
            }}
          >
            <Typography
              variant="h2"
              className="title"
              sx={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                fontSize: { xs: "2rem", md: "7rem", lg: "7rem" },
                fontWeight: { xs: "normal", md: "bold", lg: "bold" },
                gap: { xs: "2px", md: "6px", lg: "8px" },
              }}
            >
              Weekly Drop
            </Typography>
            {posts.map((post) => (
              <Box
                key={post.id}
                className="website_name"
                data-dir-name={post.title.toLowerCase()}
                sx={{
                  position: "absolute",
                  top: 0,
                  left: "50%",
                  transform: "translate(-50%, 100%)",
                  display: "flex",
                  color: "#2E5E53",
                  fontWeight: { xs: "normal", md: "bold", lg: "bold" },
                  gap: { xs: "2px", md: "6px", lg: "8px" },
                }}
              >
                {post.title}
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Weekly;
