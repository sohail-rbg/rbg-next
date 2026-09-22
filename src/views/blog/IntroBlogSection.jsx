"use client";

import { Box, Container } from "@mui/material";
import React from "react";
// import { ButtonGroup } from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import CircularProgress from "@mui/material/CircularProgress";
import backgroundVideo from "../../videos/blog.mp4";
// import PostCatList from "./PostCatList";

const IntroBlogSection = ({
  isLoading,
  categoriesWithPostCount,
  handleCategoryClick,
  isActive,
  handleAllPostsClick, // Added this prop
}) => {
  return (
    <>
      <Box className="blogIntroSec" component={"section"}>
       
        <Box
              component="video"
              className="about_bg_video"
              src={backgroundVideo}
              autoPlay
              loop
              muted
              
              
          />
        <Container sx={{position:'relative', zIndex:4}}>
          <Box className="blogIntro_content">
            <h1>Discover Articles and Guides to Help You.</h1>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <>
                
                <ButtonGroup sx={{mt:4, display:'none'}}  size="large" variant="contained" aria-label="Basic button group" >
                  <Button onClick={() => handleAllPostsClick()}>All</Button>
                  
               
                {categoriesWithPostCount.map((category) => (
                  <Button
                    key={category.id}
                    onClick={() => handleCategoryClick(category.id)}
                    className={isActive === category.id ? "active" : ""}
                  >
                    {category.name} 
                  </Button>
                ))}
                </ButtonGroup>
              </>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default IntroBlogSection;
