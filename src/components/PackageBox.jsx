"use client";

import React from "react";
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

const PackageBox = ({
  url,
  className = "dark",
  title = "14 Days Free",
  description = "Subscription fee is $129.99 USD and automatically renews each year.",
  price = "$129<span> .99</span>",
  badge,
  btnText,
}) => {
  return (
    <>
      <Link to={url} className={`package__item ${className}`}>
        <Box className="package__icon">
          <span>
            <CheckRoundedIcon />
          </span>
        </Box>
        <Box className="package__info">
          <h3 className="package__title">{title}</h3>
          <p>{description}</p>
        </Box>
        <Box className="package__amount">
          {badge ? <h4 className="best-value">{badge}</h4> : null}
          <p dangerouslySetInnerHTML={{ __html: price }}></p>
        </Box>
        <Box className="bookingBtn">{btnText}</Box>
      </Link>
    </>
  );
};

export default PackageBox;
