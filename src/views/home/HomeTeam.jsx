"use client";

import React, { useState, useEffect, useRef } from "react";
import { Box, Container, Grid } from "@mui/material";
import Slider from "react-slick";
import { useParallax } from "react-scroll-parallax";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import SectionHeading from "../../components/SectionHeading";
import { gql } from "graphql-request";
import Hygraph from "../../GraphqlClient";

import { HomePageData } from "../../Data";
import NextImage from "../../components/NextImage";

// Reusable TeamMember Component
const TeamMember = ({ member }) => (
  <Box className="teamItem" key={member.id}>
    <div className="teamInner">
      <div className="team__img">
        <NextImage
          className="img-fluid"
          alt={member.name}
          src={member.image.url}
          width={480}
          height={600}
          sizes="(max-width: 600px) 100vw, (max-width: 1024px) 33vw, 240px"
        />
      </div>
      <h2 className="team__title">{member.name}</h2>
      <h3 className="team__role">{member.position}</h3>
      {member.linkedIn && (
        <Box className="team__linkedIn">
          <Box
            component="a"
            href={member.linkedIn}
            onClick={(e) => e.stopPropagation()}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </Box>
        </Box>
      )}
    </div>
  </Box>
);

// Helper function to chunk the array
const chunkArray = (array, size) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

const HomeTeam = () => {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const query = gql`
        query MyQuery {
          teams {
            id
            name
            linkedIn
            image {
              url
            }
            position
          }
        }
      `;

      try {
        const data = await Hygraph.request(query);

        setTeam(data.teams);
      } catch (error) {
        console.error("Error fetching Team:", error);
      } finally {
        // setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const teamMembers = HomePageData.TeamSection;
  const sliderRef = useRef(null);

  // Parallax setup
  const parallax = useParallax({
    speed: 15,
    translateX: [0, 100, "easeInOut"],
  });

  const goToPrevious = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const goToNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const sliderSettings = {
    dots: false,
    arrows: false,
    infinite: false,
    fade: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // Split team members into groups of 3
  const teamChunks = chunkArray(team, 3);

  return (
    <Box
      component="section"
      sx={{ py: 7, position: "relative" }}
      bgcolor="background.bg_3"
      className="homeTeamSection"
    >
      <Container>
        {/* Section Heading */}
        <Box className="teamSectionHeadingWrp">
          <Grid container>
            <Grid item md={4}></Grid>
            <Grid item md={5}>
              <Box className="teamSectionHeading">
                <SectionHeading
                  title={teamMembers.title}
                  subtitle={teamMembers.subTitle}
                  description={teamMembers.description}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Slider */}
        <Slider className="" {...sliderSettings} ref={sliderRef}>
          {teamChunks.map((chunk, index) => (
            <Box className="teamWrp" key={index}>
              {chunk.map((team) => (
                <TeamMember member={team} key={team.id} />
              ))}
            </Box>
          ))}
        </Slider>

        {/* Parallax Image with Tooltip */}
        <Box className="HeroTeam" ref={parallax.ref}>
          <NextImage
            className="img-fluid"
            alt={teamMembers.Chase.title}
            src={teamMembers.Chase.image}
            width={300}
            height={300}
            sizes="150px"
          />
          <Box className="customTooltip">
            <svg
              className="tooltip__shape"
              width="100%"
              height="100%"
              viewBox="0 0 400 300"
            >
              <path d="M 199,21.9 C 152,22.2 109,35.7 78.8,57.4 48,79.1 29,109 29,142 29,172 45.9,201 73.6,222 101,243 140,258 183,260 189,270 200,282 200,282 200,282 211,270 217,260 261,258 299,243 327,222 354,201 371,172 371,142 371,109 352,78.7 321,57 290,35.3 247,21.9 199,21.9 Z"></path>
            </svg>
            <h3>{teamMembers.Chase.title}</h3>
            <p
              dangerouslySetInnerHTML={{ __html: teamMembers.Chase.content }}
            ></p>
          </Box>
        </Box>
        <Stack direction="row" className="teamBtnGroup crouselGroupNav">
          <IconButton
            className="prev_arrow arrowBtn"
            color="primary"
            onClick={goToPrevious}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          <IconButton
            className="next_arrow arrowBtn"
            color="primary"
            onClick={goToNext}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Stack>
      </Container>
    </Box>
  );
};

export default HomeTeam;
