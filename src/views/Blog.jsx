"use client";

// Blog.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import IntroBlogSection from "./blog/IntroBlogSection";
import PostFeed from "./blog/PostFeed";
import { PortalUrl } from "../ThemeModule";

const Blog = () => {
  const [categoriesWithPostCount, setCategoriesWithPostCount] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPostLoading, setIsPostLoading] = useState(true);
  const [activeCategoryId, setActiveCategoryId] = useState(null); // Initialize with null
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchCategoriesWithPostCount();
  }, []);

  const fetchCategoriesWithPostCount = async () => {
    try {
      setIsLoading(true);
      const categoriesResponse = await axios.get(
        `${PortalUrl}/wp/v2/categories`
      );

      const categoriesData = await Promise.all(
        categoriesResponse.data.map(async (category) => {
          const postsResponse = await axios.get(
            `${PortalUrl}/wp/v2/posts?categories=${category.id}`
          );
          return {
            id: category.id,
            name: category.name,
            postCount: postsResponse.headers["x-wp-total"],
          };
        })
      );

      setCategoriesWithPostCount(categoriesData);
    } catch (error) {
      console.error("Error fetching categories with post count:", error);
      setCategoriesWithPostCount([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (activeCategoryId !== null) {
      fetchPostsForCategory(activeCategoryId);
    } else {
      fetchAllPosts(); // Fetch all posts if activeCategoryId is null
    }
  }, [activeCategoryId]);

  const handleCategoryClick = async (categoryId) => {
    try {
      setActiveCategoryId(categoryId);
    } catch (error) {
      console.error("Error handling category click:", error);
    }
  };

  const fetchPostsForCategory = async (categoryId) => {
    try {
      setIsPostLoading(true);
      const postsResponse = await axios.get(
        `${PortalUrl}/wp/v2/posts?categories=${categoryId}`
      );
      const postsData = postsResponse.data;

      // Fetch featured image for each post
      const postsWithData = await Promise.all(
        postsData.map(async (post) => {
          if (post.featured_media) {
            const mediaResponse = await axios.get(
              `${PortalUrl}/wp/v2/media/${post.featured_media}`
            );
            const mediaData = mediaResponse.data;
            post.featured_image_url = mediaData.source_url;
          }
          return post;
        })
      );

      setPosts(postsWithData);
    } catch (error) {
      console.error("Error fetching posts for category:", error);
      setPosts([]);
    } finally {
      setIsPostLoading(false);
    }
  };

  const fetchAllPosts = async () => {
    try {
      setIsPostLoading(true);
      const postsResponse = await axios.get(
        `${PortalUrl}/wp/v2/posts`
      );
      const postsData = postsResponse.data;

      // Fetch featured image for each post
      const postsWithData = await Promise.all(
        postsData.map(async (post) => {
          if (post.featured_media) {
            const mediaResponse = await axios.get(
              `${PortalUrl}/wp/v2/media/${post.featured_media}`
            );
            const mediaData = mediaResponse.data;
            post.featured_image_url = mediaData.source_url;
          }
          return post;
        })
      );

      setPosts(postsWithData);
    } catch (error) {
      console.error("Error fetching all posts:", error);
      setPosts([]);
    } finally {
      setIsPostLoading(false);
    }
  };

  return (
    <>
      <IntroBlogSection
        isLoading={isLoading}
        categoriesWithPostCount={categoriesWithPostCount}
        handleCategoryClick={handleCategoryClick}
        handleAllPostsClick={() => setActiveCategoryId(null)} // Set activeCategoryId to null for all posts
        isActive={activeCategoryId}
      />
      <div>
        <PostFeed
          isPostLoading={isPostLoading}
          posts={posts}
        />
      </div>
    </>
  );
};

export default Blog;
