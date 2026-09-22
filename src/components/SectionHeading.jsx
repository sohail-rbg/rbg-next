"use client";

import { Typography } from '@mui/material';
import React from 'react';
import { motion } from "framer-motion";

const SectionHeading = ({
  titleFontSize = "60px",
  margin = "24px 0 20px",
  title = "Heading Text",
  subtitle,
  description,
  padding,
  align,
}) => {
  return (
    <>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{
          type: "spring",
          duration: 2,
        }}
        className={`sectionHeading_wrp ${
          align === "center" ? "sectionHeading_wrp--center" : ""
        }`}
        style={{
          padding,
          textAlign: align,
        }}
      >
        <h2 className="sec_sub_title">{subtitle}</h2>
        <Typography
          component="h3"
          variant="h3"
          className="sec_title"
          sx={{
            fontSize: titleFontSize,
            margin: margin,
          }}
        >
          {title}
        </Typography>
        <p className="sec_desc">{description}</p>
      </motion.div>
    </>
  );
};

export default SectionHeading;
