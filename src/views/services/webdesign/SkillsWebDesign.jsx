"use client";

import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { motion } from "framer-motion";
import wordpress from "../../../images/services/webdesign/skills/wordpress.png";
import shopify from "../../../images/services/webdesign/skills/shopify.png";
import html from "../../../images/services/webdesign/skills/html.png";
import javascript from "../../../images/services/webdesign/skills/javascript.png";
import webflow from "../../../images/services/webdesign/skills/webflow.png";
import react from "../../../images/services/webdesign/skills/react.png";
import figma from "../../../images/services/webdesign/skills/figma.png";
import sketch from "../../../images/services/webdesign/skills/sketch.png";
import photoshop from "../../../images/services/webdesign/skills/photoshop.png";
import xd from "../../../images/services/webdesign/skills/xd.png";
import canva from "../../../images/services/webdesign/skills/canva.png";
import ai from "../../../images/services/webdesign/skills/ai.png";
import SectionHeading from "../../../components/SectionHeading";
import NextImage from "../../../components/NextImage";
const skills = {
  tech: [
    {
      id: "0",
      title: "WordPress",
      numbers: "95%",
      icons: wordpress,
    },
    {
      id: "1",
      title: "Shopify",
      numbers: "89%",
      icons: shopify,
    },
    {
      id: "2",
      title: "HTML5",
      numbers: "97%",
      icons: html,
    },
    {
      id: "3",
      title: "Javascript",
      numbers: "70%",
      icons: javascript,
    },
    {
      id: "4",
      title: "Webflow",
      numbers: "75%",
      icons: webflow,
    },
    {
      id: "5",
      title: "React",
      numbers: "50%",
      icons: react,
    },
  ],
  design: [
    {
      id: "0",
      title: "Figma",
      numbers: "94%",
      icons: figma,
    },
    {
      id: "1",
      title: "Sketch",
      numbers: "82%",
      icons: sketch,
    },
    {
      id: "2",
      title: "Photoshop",
      numbers: "97%",
      icons: photoshop,
    },
    {
      id: "3",
      title: "Adobe XD",
      numbers: "60%",
      icons: xd,
    },
    {
      id: "4",
      title: "Canva",
      numbers: "75%",
      icons: canva,
    },
    {
      id: "5",
      title: "Illustrator",
      numbers: "84%",
      icons: ai,
    },
  ],
};

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`skills-tabpanel-${index}`}
      aria-labelledby={`skills-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `skills-tab-${index}`,
    "aria-controls": `skills-tabpanel-${index}`,
  };
}

const SkillsWebDesign = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box component={"section"} className="skillSection">
       
          <span className="wd-skill-shape-1"></span>
          <span className="wd-skill-shape-2"></span>
       
        <SectionHeading
          title="Skills & Tools"
          description={`For those who know what they're looking for..`}
          align="center"
        />
        <Box className="tabNavBox">
          <Tabs
            value={value}
            onChange={handleChange}
            centered
            aria-label="Web Design Skills"
          >
            <Tab label="Tech" {...a11yProps(0)} />
            <Tab label="Design" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Box className="skill_wrp_box">
            {skills.tech.map((item_tech) => (
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{
                  type: "spring",
                  duration: 2,
                }}
                className="wd-skill-item"
                key={item_tech.id}
              >
                <Box className="wd-skill-thumb">
                  <Box className="wd-skill-icon">
                    <NextImage
                      src={item_tech.icons}
                      alt={item_tech.title}
                      className="img-fluid"
                      width={120}
                      height={120}
                    />
                  </Box>
                  <h3 className="wd-skill-count">{item_tech.numbers}</h3>
                </Box>
                <Box className="wd-skill-content">
                  <h3 className="wd-skill-title">{item_tech.title}</h3>
                </Box>
              </motion.div>
            ))}
          </Box>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Box className="skill_wrp_box">
            {skills.design.map((item_design) => (
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{
                  type: "spring",
                  duration: 2,
                }}
                className="wd-skill-item"
                key={item_design.id}
              >
                <Box className="wd-skill-thumb">
                  <Box className="wd-skill-icon">
                    <NextImage
                      src={item_design.icons}
                      alt={item_design.title}
                      className="img-fluid"
                      width={120}
                      height={120}
                    />
                  </Box>
                  <h3 className="wd-skill-count">{item_design.numbers}</h3>
                </Box>
                <Box className="wd-skill-content">
                  <h3 className="wd-skill-title">{item_design.title}</h3>
                </Box>
              </motion.div>
            ))}
          </Box>
        </CustomTabPanel>
      </Box>
    </>
  );
};

export default SkillsWebDesign;
