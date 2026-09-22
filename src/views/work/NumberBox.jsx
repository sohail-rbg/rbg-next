"use client";

import { Box } from "@mui/material";
import React from "react";
import { motion } from "framer-motion";

const NumberBox = ({work_num}) => {
    const activeClass = work_num.id % 2 === 0 ? 'even' : 'odd';

  const animateStyle = {
    rotate: activeClass === 'even' ? "45deg" : "-45deg",
    x: activeClass === 'even' ? "100%" : "-100%",
    opacity: activeClass === "even" ? "0" : "0",

  };
  return (
    <>
      <motion.div
        initial={animateStyle}
        whileInView={{ rotate: 0, x: 0, opacity:1 }}
        exit={animateStyle}
        transition={{
          type: "spring",
          duration: 2,
        }}
        className="work__achieve_box_item"
      >
        <Box className={`wa_box__inner`}>
          <Box className="wa_box__number">
            <Box className="wa_box__number_one">
              {work_num.number}
              <sup>{work_num.postfix}</sup>
            </Box>
            <Box className="wa_box__number_two">
              {work_num.number}
              <sup>{work_num.postfix}</sup>
            </Box>
          </Box>
          <Box className="wa_box__heading">{work_num.title}</Box>
        </Box>
      </motion.div>
    </>
  );
};

export default NumberBox;
