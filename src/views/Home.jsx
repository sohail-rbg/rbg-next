"use client";

import React from "react";

/**
 * HOMEPAGE — vintage editorial edition.
 *
 * The previous homepage (Hero, USP, Team, Portfolio marquee, etc.) is preserved
 * in git history; its section components still live in src/views/home/*.
 * This file now renders the old-school, story-driven layout:
 *   src/views/home/editorial/EditorialHome.jsx  (structure)
 *   src/views/home/editorial/story.js           (all copy — edit this)
 *   src/views/home/css/editorial.css            (styling)
 */
import EditorialHome from "./home/editorial/EditorialHome";

const Home = () => {
  return <EditorialHome />;
};

export default Home;
