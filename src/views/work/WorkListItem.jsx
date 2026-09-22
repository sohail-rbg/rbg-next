"use client";

import { Box } from "@mui/material";
import React from "react";
import { motion } from "framer-motion";

const WorkListItem = ({ portItem, index }) => {
  // const portfImgItemRef = useRef(null);

  // function portfImageCursor(event) {
  //   const portfImgItem = portfImgItemRef.current;
  //   if (!portfImgItem) return;

  //   const contentBox = portfImgItem.getBoundingClientRect();
  //   const dx = event.clientX - contentBox.x;
  //   const dy = event.clientY - contentBox.y;
  //   portfImgItem.children[5].style.transform = `translate(${dx}px, ${dy}px)`;
  // }
  // const formattedNumber = String(index + 1).padStart(2, "0");
  const formattedNumber = String(index + 1);
  const categortClass = portItem.projectType.toLowerCase();

  

  return (
    <>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ x: -0, y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{
          type: "spring",
          duration: 2,
        }}
        className="portfoli_list_item"
      >
        <a
          href={portItem.websiteUrl}
          target="_blank"
          rel="noreferrer"
          // ref={portfImgItemRef}
          // onMouseMove={portfImageCursor}
          className="portfolio__item_inner"
        >
          <Box className="portfolio__no">{formattedNumber}</Box>
          <h5 className="portfolio__title">{portItem.title}</h5>
          <Box className={`portfolio__cat ${categortClass}`}>
            <span>{portItem.projectType}</span>
          </Box>
          <Box className="portfolio__reviewText">{portItem.clientReview}</Box>
          <Box className="portfolio__tags">
            {portItem.tags.map((tag, index) => (
              <Box key={index}>
                {tag}
                {index < portItem.tags.length - 1 && <span>,</span>}
              </Box>
            ))}
          </Box>
        </a>
      </motion.div>
    </>
  );
};

export default WorkListItem;
