"use client";

import React from "react";
import PostItem from "./PostItem";
import { Box, Container } from "@mui/material";
import ErrorMessage from "../../components/ErrorMessage";
import CircularProgress from '@mui/material/CircularProgress';


const PostFeed = ({ isPostLoading, posts }) => {
  return (
    <>
      <Box component={"section"} className="blogFeedSec" sx={{ py: 8 }}>
        <Container>
          {isPostLoading ? (
            <CircularProgress />
          ) : (
            <Box>
              {posts.length > 0 ? (
                <Box component={'ul'} className="blogGridWrp">
                  {posts.map((post) => (
                    <PostItem post={post}  key={post.id} />
                  ))}
                </Box>
              ) : (
                <ErrorMessage text="No posts found for this category." type="info" />
              )}
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
};

export default PostFeed;
