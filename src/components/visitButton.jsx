"use client";

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import vir from '../images/virginia.jpg'
import { Box } from "@mui/material";
import NextImage from "./NextImage";

const VisitButton = () => {
    useEffect(() => {
        const text = document.querySelector(".text");
        text.innerHTML = text.innerText
          .trim() // Removes any leading/trailing whitespace from the string
          .split("")
          .map(
            (char, i) =>
              `<span style="transform:rotate(${i * 10.28}deg)">${char}</span>`
          )
          .join(""); // Join without spaces
      }, []);
  return (
    <Link to={"https://virginia.rebrandgurus.com/"} target="_blank" className="visit-button">
      <Box className="circle">
        <Box className="logo">
            <NextImage
                className="img-fluid"
                src={vir}
                alt="Virginia"
                width={200}
                height={200}
                sizes="140px"
            />
        </Box>
        <Box className="text">
          <p>Virginia Visit - Virginia Visit - </p>
        </Box>
      </Box>
    </Link>
  );
};

export default VisitButton;
