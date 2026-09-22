"use client";

import React from "react";
import { Box, Container } from "@mui/material";
import { motion } from "framer-motion";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import InsightsIcon from "@mui/icons-material/Insights";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import RouteIcon from "@mui/icons-material/Route";
import CustomButton from "../components/CustomButton";
import NextImage from "../components/NextImage";

// Add your hero screen image import here, then assign it below.
// Example:
// import heroScreenImage from "../images/new-seo/ai-dashboard.png";
const heroScreenImage = null;

// Add AI logo imports here, then place them in `logoImage`.
// Example:
// import chatGptLogo from "../images/new-seo/chatgpt.png";
// import geminiLogo from "../images/new-seo/gemini.png";
// import claudeLogo from "../images/new-seo/claude.png";
// import perplexityLogo from "../images/new-seo/perplexity.png";

const aiPlatforms = [
  { name: "ChatGPT", score: "92%", icon: "C", logoImage: null, delay: 0.1 },
  { name: "Gemini", score: "85%", icon: "G", logoImage: null, delay: 0.18 },
  { name: "Claude", score: "78%", icon: "Cl", logoImage: null, delay: 0.26 },
  { name: "Perplexity", score: "72%", icon: "P", logoImage: null, delay: 0.34 },
];

const floatingLogos = [
  { name: "ChatGPT", icon: "C", logoImage: null, className: "logo-chatgpt" },
  { name: "Gemini", icon: "G", logoImage: null, className: "logo-gemini" },
  { name: "Perplexity", icon: "P", logoImage: null, className: "logo-perplexity" },
  { name: "Claude", icon: "Ai", logoImage: null, className: "logo-claude" },
];

const trustItems = [
  { label: "AI Visibility Score", icon: <TravelExploreIcon /> },
  { label: "Actionable Insights", icon: <InsightsIcon /> },
  { label: "Custom Roadmap", icon: <RouteIcon /> },
];

const logoEntranceDelay = 1.2;
const screenLoadDelay = 2.25;

const NewSeo = () => {
  return (
    <>
      <Box component="section" className="newSeoHero">
        <div className="newSeoHero__grid" />
        <div className="newSeoHero__orbit orbit-one" />
        <div className="newSeoHero__orbit orbit-two" />
        <div className="newSeoHero__orbitalGlow" />

        <Container>
          <div className="newSeoHero__wrap">
            <motion.div
              className="newSeoHero__content"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
            >
              <motion.div
                className="newSeoHero__eyebrow"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.12, duration: 0.55 }}
              >
                <AutoAwesomeIcon />
                AI Search Is Changing
              </motion.div>

              <h1>
                Your Website <span>Needs More</span> Than Traditional SEO.
              </h1>
              
              <p>
                Customers now discover brands through AI platforms like ChatGPT,
                Gemini, Claude, and Perplexity.
              </p>

              
              <CustomButton> Get Free AI Visibility Audit </CustomButton>

              <div className="newSeoHero__trust">
                {trustItems.map((item) => (
                  <span key={item.label}>
                    {item.icon}
                    {item.label}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="newSeoHero__visual"
              initial={{ opacity: 0, x: 45 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                className="laptopScene"
                initial={{ y: 38, scale: 0.94, opacity: 0 }}
                animate={{
                  y: [0, -10, 0],
                  scale: 1,
                  opacity: 1,
                }}
                transition={{
                  y: {
                    delay: screenLoadDelay + 0.25,
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  scale: { duration: 0.55, ease: "easeOut" },
                  opacity: { duration: 0.45 },
                }}
              >
                <motion.div
                  className="laptopScreen"
                  initial={{ rotateX: -78, rotateY: -12, opacity: 0.72 }}
                  animate={{ rotateX: 4, rotateY: -12, opacity: 1 }}
                  transition={{ delay: 0.35, duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="laptopScreen__bar" />

                  <motion.div
                    className="screenBoot"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 1, 0] }}
                    transition={{
                      delay: 1.55,
                      duration: 1.2,
                      times: [0, 0.18, 0.78, 1],
                      ease: "easeInOut",
                    }}
                  >
                    <span />
                  </motion.div>

                  <motion.div
                    className="laptopScreen__content"
                    initial={{ opacity: 0, scale: 0.96, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ delay: screenLoadDelay, duration: 0.75, ease: "easeOut" }}
                  >
                    <div className="laptopScreen__imageSlot">
                      {heroScreenImage ? (
                        <NextImage src={heroScreenImage} alt="AI visibility dashboard" />
                      ) : (
                        <div className="screenPlaceholder">
                          Add screen image here
                        </div>
                      )}
                    </div>

                    {!heroScreenImage && (
                      <>
                        <div className="visibilityCard">
                          <span>AI Visibility Score</span>
                          <div className="scoreRing">
                            <strong>86</strong>
                          </div>
                          <div className="miniStats">
                            <i />
                            <i />
                            <i />
                          </div>
                        </div>
                        <div className="growthChart" aria-hidden="true">
                          <span className="chartLine" />
                          <i />
                          <i />
                          <i />
                          <i />
                          <i />
                        </div>
                      </>
                    )}
                  </motion.div>
                </motion.div>
                <motion.div
                  className="laptopBase"
                  initial={{ opacity: 0, y: 28, scaleX: 0.78 }}
                  animate={{ opacity: 1, y: 0, scaleX: 1 }}
                  transition={{ duration: 0.65, ease: "easeOut" }}
                />
              </motion.div>

              <motion.div
                className="platformPanel"
                initial={{ opacity: 0, rotate: -4, y: 22, scale: 0.92 }}
                animate={{ opacity: 1, rotate: 3, scale: 1, y: [0, -8, 0] }}
                transition={{
                  opacity: { delay: screenLoadDelay + 0.25, duration: 0.45 },
                  rotate: { delay: screenLoadDelay + 0.25, duration: 0.6 },
                  scale: { delay: screenLoadDelay + 0.25, duration: 0.45 },
                  y: {
                    delay: screenLoadDelay + 0.8,
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              >
                <h2>Top AI Platforms</h2>
                {aiPlatforms.map((item) => (
                  <motion.div
                    className="platformRow"
                    key={item.name}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: screenLoadDelay + item.delay + 0.35, duration: 0.45 }}
                  >
                    <span className="platformIcon">
                      {item.logoImage ? (
                        <NextImage src={item.logoImage} alt={`${item.name} logo`} width={80} height={80} />
                      ) : (
                        item.icon
                      )}
                    </span>
                    <strong>{item.name}</strong>
                    <em>
                      <b style={{ width: item.score }} />
                    </em>
                    <small>{item.score}</small>
                  </motion.div>
                ))}
              </motion.div>

              {floatingLogos.map((logo, index) => (
                <motion.div
                  className={`aiLogo ${logo.className}`}
                  key={logo.name}
                  initial={{ opacity: 0, scale: 0.35, y: 28 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: [0, index % 2 === 0 ? -14 : 14, 0],
                    x: [0, index % 2 === 0 ? 10 : -10, 0],
                  }}
                  transition={{
                    opacity: { delay: logoEntranceDelay + index * 0.16, duration: 0.34 },
                    scale: {
                      delay: logoEntranceDelay + index * 0.16,
                      duration: 0.52,
                      type: "spring",
                      stiffness: 210,
                      damping: 15,
                    },
                    y: {
                      delay: screenLoadDelay + index * 0.2,
                      duration: 4.5 + index * 0.45,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                    x: {
                      delay: screenLoadDelay + index * 0.2,
                      duration: 5.5 + index * 0.35,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                >
                  <span>
                    {logo.logoImage ? (
                      <NextImage src={logo.logoImage} alt={`${logo.name} logo`} width={80} height={80} />
                    ) : (
                      logo.icon
                    )}
                  </span>
                  {logo.name}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Container>
      </Box>
    </>
  );
};

export default NewSeo;
