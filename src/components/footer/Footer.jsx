"use client";

import { Box, Container, Grid } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { footerData } from "./FooterData";
import NextImage from "../NextImage";
// import RightClick from "../RightClick";

const Footer = () => {
  const [activeItem, setActiveItem] = useState(null);

  const handleMouseEnter = (itemId) => {
    setActiveItem(itemId);
  };

  const handleMouseLeave = () => {
    setActiveItem(null);
  };
  return (
    <>
      <Box component="footer" className="customFooter">
        <Box className="footer_title">{footerData.title}</Box>
        <Box className="footer_image">
          <NextImage
            src={footerData.mainImage}
            alt=""
            fill
            sizes="100vw"
          />
        </Box>
        <Box className="footer_image_list">
          {footerData.listItem.map((item) => {
            return (
              <Box
                key={item.id}
                className={`footer_list-item ${
                  activeItem === item.id ? "active" : ""
                }`}
              >
                <NextImage
                  src={item.image}
                  alt=""
                  fill
                  sizes="100vw"
                />
              </Box>
            );
          })}
        </Box>
        <Container>
          <Box className="footer_content_Wrp">
            <Box className="footer_content_list">
              <Grid container spacing={0}>
                {footerData.listItem.map((item) => {
                  return (
                    <Grid key={item.id} item xs={2}>
                      <Link
                        to={item.pageUrl}
                        className="fl_content_inner"
                        onMouseEnter={() => handleMouseEnter(item.id)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <Box
                          component="span"
                          className="colorBox"
                          sx={{ backgroundColor: item.bgColor }}
                        ></Box>
                        <Box
                          className="fl_content_Box"
                          style={{ textDecoration: "none" }}

                        >
                          <Box className="fl_heading">
                            <h4>{item.title}</h4>
                          </Box>
                          <Box className="fl_text">{item.description}</Box>
                        </Box>
                      </Link>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Footer;
