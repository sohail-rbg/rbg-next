"use client";

import React from "react";
import EastIcon from "@mui/icons-material/East";
import { Box, Button, Grid } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import NextImage from "../../components/NextImage";

const WorkItem = ({ item }) => {
  const w_item_index = item.id % 2 === 0 ? "even" : "odd";

  const work_item_imageStyle = {
    rotate: w_item_index === "even" ? "45deg" : "-45deg",
    x: w_item_index === "even" ? "100%" : "-100%",
  };
  const work_item_TextStyle = {
    opacity: w_item_index === "even" ? "0" : "0",
    y: w_item_index === "even" ? "100px" : "100px",
  };
  return (
    <>
      <motion.div className="work_grid_item">
        <Grid
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          container
          rowSpacing={8}
          columnSpacing={{ xs: 1, sm: 6, md: 6 }}
        >
          <Grid item md={7} className="work__item__image">
            <motion.div
              initial={work_item_imageStyle}
              whileInView={{ rotate: 0, x: 0 }}
              transition={{
                type: "spring",
                duration: 2,
                repeatType: "reverse",
              }}
            >
              <Link target="_blank"
              to={item.websiteUrl}>
<NextImage
                className="img-fluid"
                src={item.image.url}
                alt={item.title}
              />
              </Link>
              
            </motion.div>
          </Grid>
          <Grid item md={5} className="work__item__info">
            <motion.div
              initial={work_item_TextStyle}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                duration: 2,
                repeatType: "reverse",
              }}
              className="work__info__wrapper"
            >
              <Box className="work__info__title" component="h3">
                <Link component="a" href="#">
                  {item.title}
                </Link>
              </Box>
              <Box className="work__info__tag">
                
                {item.tags.map((tag, index) => (
                  <Box key={index}>
                    {tag}
                    {index < item.tags.length - 1 && <span>,</span>}
                  </Box>
                ))}
              </Box>
              <Button 
              component={Link}
              target="_blank"
              to={item.websiteUrl}
              sx={{ mt: 4 }} variant="roundBtn" endIcon={<EastIcon />}>
                View Now
              </Button>
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>
    </>
  );
};

export default WorkItem;
