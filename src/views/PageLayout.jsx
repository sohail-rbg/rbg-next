"use client";

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { gql } from "graphql-request";
import hygraph from "../GraphqlClient";
import PageHeader from "../components/PageHeader";
import HeaderBgImg2 from "../images/project_3.jpg";
import { Box, Container, Grid } from "@mui/material";

const PageLayout = () => {
  const { slug } = useParams(); // This grabs the slug from the URL
  const navigate = useNavigate(); // For redirecting to the Page404
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const query = gql`
        query GetPage($slug: String!) {
          page(where: { slug: $slug }) {
            title
            slug
            content {
              html
            }
            featuredImage {
              url
            }
          }
        }
      `;

      try {
        const data = await hygraph.request(query, { slug });
        if (!data.page) {
          navigate("*");
          return;
        }
        setPost(data.page);
      } catch (error) {
        console.error("Error fetching data:", error.response || error.message);
        setError(error.response?.data || error.message);
        // Redirect to Page404 in case of fetch error
        navigate("*");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, navigate]); // Include navigate in dependencies

  if (loading) {
    // return <Box className="loader text-center">Loading...</Box>;
  }

  if (error) {
    return (
      <Box className="error-message text-red-500 text-center">
        <p>Failed to load page: {error}</p>
      </Box>
    );
  }

  return (
    <>
      <PageHeader
        title={post ? post.title : "Loading..."}
        backgroundImg={post?.featuredImage?.url || HeaderBgImg2}
      />
      <Box sx={{ py: 8 }}>
        <Container>
          <Grid container spacing={5}>
            <Grid item md={12}>
              {post && (
                <div className="pageContent">
                  {post.content?.html && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: post.content.html,
                      }}
                    />
                  )}
                </div>
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default PageLayout;
