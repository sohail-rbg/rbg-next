"use client";

import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
import NextImage from "../../components/NextImage";

// Letters re-tinted into the brand palette by tools/recolor-letters.py
// (the pink originals in src/images are untouched)
import R from "../../images/brandinfo/r.png";
import B from "../../images/brandinfo/b.png";
import G from "../../images/brandinfo/g.png";

/**
 * "Revolutionary / Build / Group" — the three words behind the RBG mark.
 *
 * The letter artwork ships in the brand palette (re-tinted from the original
 * pink by tools/recolor-letters.py). The first letter of every word is also
 * carried into the heading, tying the mark to the copy, and an oversized ghost
 * letter sits behind each block.
 */
const brandInfoItems = [
  {
    letter: "R",
    word: "Revolutionary",
    mark: R,
    content:
      "Our agency embodies innovation, cutting-edge technology, and forward-thinking solutions. We are not just following trends; we are setting new standards in the industry.",
  },
  {
    letter: "B",
    word: "Build",
    mark: B,
    content:
      "At the heart of our agency's mission is the construction of websites. We emphasize a strong foundation, meticulous attention to detail, and the ability to create complex and robust digital structures.",
  },
  {
    letter: "G",
    word: "Group",
    mark: G,
    content:
      "We pride ourselves on a team-oriented approach, fostering collaboration and leveraging a diverse skill set. Our collective effort ensures exceptional results, reflecting our commitment to delivering top-notch services as a unified team.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 48 },
  shown: (index) => ({
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 90, damping: 18, delay: index * 0.12 },
  }),
};

const markVariants = {
  hidden: { opacity: 0, scale: 0.82 },
  shown: (index) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 + index * 0.12 },
  }),
};

const BrandInfo = () => {
  return (
    <Box
      className="brandInfoSection"
      bgcolor="background.bg_3"
      component="section"
    >
      <span className="biSectionGlow" aria-hidden="true" />

      <Container>
        <Grid container className="biGrid" spacing={{ xs: 3, md: 4 }}>
          {brandInfoItems.map((item, index) => (
            <Grid item xs={12} md={4} key={item.word}>
              <motion.div
                className="biCard"
                variants={cardVariants}
                custom={index}
                initial="hidden"
                whileInView="shown"
                viewport={{ once: true, amount: 0.25 }}
              >
                <NextImage
                  className="biCard__watermark"
                  src={item.mark}
                  alt=""
                  aria-hidden="true"
                  width={400}
                  height={495}
                  sizes="240px"
                />

                <motion.span
                  className="biCard__mark"
                  variants={markVariants}
                  custom={index}
                >
                  <NextImage
                    className="biCard__mark-img"
                    src={item.mark}
                    alt={`${item.word} — the ${item.letter} in RBG`}
                    width={400}
                    height={495}
                    sizes="90px"
                  />
                </motion.span>

                <span className="biCard__index" aria-hidden="true">
                  {`0${index + 1}`}
                </span>

                <Typography
                  variant="h3"
                  className="biCard__title"
                  component="h3"
                >
                  <span className="biCard__initial">{item.letter}</span>
                  {item.word.slice(1)}
                </Typography>

                <p className="biCard__text">{item.content}</p>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default BrandInfo;
