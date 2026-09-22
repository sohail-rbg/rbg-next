"use client";

import React from "react";
import { Link } from "react-router-dom";

const CustomButton = ({
  children = "Know More",
  endIcon,
  link,
  margin = "34px 0 20px",
}) => {
  return (
    <>
      <Link
        to={link}
        style={{ margin }}
        className="button button--atlas"
      >
        <span>
          {children} {endIcon}
        </span>
        <div className="marquee" aria-hidden="true">
          <div className="marquee__inner">
            <span>{children}</span>
            <span>{children}</span>
            <span>{children}</span>
            <span>{children}</span>
          </div>
        </div>
      </Link>
    </>
  );
};

export default CustomButton;
