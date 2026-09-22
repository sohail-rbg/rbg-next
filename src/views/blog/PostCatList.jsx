"use client";

import React, {  } from "react";
import { Button } from "@mui/material";

const PostCatList = ({ category, handleCategoryClick, isActive }) => {
  const handleClick = () => {
    handleCategoryClick(category.id);
  };
  const textWithEntities = category.name;

  return (
    <>
      <Button onClick={handleClick} className={isActive ? "active" : ""}>
      <span dangerouslySetInnerHTML={{ __html: textWithEntities }} />
        <sub> ({category.postCount})</sub>
      </Button>
    </>
  );
};

export default PostCatList;
