"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
// import {BrowserRouter , Routes , Route} from 'react-router-dom';
// import { Link } from "react-router-dom";
import { Link } from "react-router-dom";

import {
  staggerText,
  staggerReveal,
  fadeInUp,
  fadeInDown,
  handleHover,
  handleHoverExit,
  handleCityReturn,
  handleCity,
  staggerRevealClose,
} from "./Animations";

//Location Background Image
// import salt from "../../images/header/salt.jpg";
// import dallas from "../../images/header/dallas.jpg";
// import wyoming from "../../images/header/wyoming.jpg";
// import dubai from "../../images/header/dubai.jpg";
// import india from "../../images/header/india.jpg";

//Location Icon Image
// import newyorkIcon from "../../images/header/newyork_icon.png";
// import dallasIcon from "../../images/header/dallas_icon.png";
// import wyomingIcon from "../../images/header/wyoming_icon.png";
// import dubaiIcon from "../../images/header/dubai_icon.png";
// import indiaIcon from "../../images/header/india_icon.png";
// import saltIcon from "../../images/header/salt_icon.png";

//Social Background Image
import instagram from "../../images/social/instagram.jpg";
import facebook from "../../images/social/facebook.jpg";
import youtube from "../../images/social/youtube.jpg";
import linkedIn from "../../images/social/linked.jpg";

import { Box, Grid } from "@mui/material";

import MarkunreadOutlinedIcon from "@mui/icons-material/MarkunreadOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import LanguageSharpIcon from '@mui/icons-material/LanguageSharp';
// import AddressCrousel from "../AddressCrousel";
// import HeaderLocation from "./HeaderLocation";
// const cities2 = [
//   { name: "Salt Lack City", image: salt, icon: saltIcon },
//   { name: "Dallas", image: dallas, icon: dallasIcon },
//   { name: "Wyoming", image: wyoming, icon: wyomingIcon },
//   { name: "Dubai", image: dubai, icon: dubaiIcon },
//   { name: "India", image: india, icon: indiaIcon },
// ];
const social = [
  {
    name: "Instagram",
    image: instagram,
    path: "https://www.instagram.com/rebrandgurusofficial/",
    color: "#d6366c",
  },
  {
    name: "Facebook",
    image: facebook,
    path: "https://www.facebook.com/rebrandgurusmarketing",
    color: "#0863F7",
  },
  {
    name: "YouTube",
    image: youtube,
    path: "https://www.youtube.com/channel/UClS9V3u_D4AsWhVOqZ92xrQ",
    color: "#F60002",
  },
  {
    name: "LinkedIn",
    image: linkedIn,
    path: "https://www.linkedin.com/company/74515017/admin/dashboard/",
    color: "#0077AF",
  },
];

const cities = [
  {
    name: "Salt Lake City",
    email: "info@rebrandgurus.com",
    state: "Utah",
    // image: salt,
    icon: "SLC",
    phone: "+1 (435)-395-0079",
    address: `ReBrand Gurus International LLC, PO Box 980457, Park City, Utah 84098`,
    addressLink:
      "https://www.google.com/maps/place/ReBrand+Gurus/@44.7980451,-106.9551321,17.25z/data=!4m6!3m5!1s0x5335fbc78df01a2f:0x1d7207e6f2ccf79f!8m2!3d44.7977689!4d-106.9549034!16s%2Fg%2F11s0vlc51c?entry=ttu",
    image:
      "https://us-west-2.graphassets.com/cm1foy8dy008n01w42t9thc43/cmagz7bbge23s07lnk7vpmxpg",
  },
  {
    name: "Stafford",
    email: "info@rebrandgurus.com",
    // image: dallas,
    state: "Virginia",
    icon: "VA",
    phone: "+1 (469)-205-8133",
    address: `ReBrand Gurus Virginia LLC, 93 Brooke Crest Ln, Stafford, VA, 22554, USA`,
    addressLink:
      "https://www.google.com/maps/place/13151+Emily+Rd+Suite+210-D,+Dallas,+TX+75240,+USA",
    image:
      "https://us-west-2.graphassets.com/cm1foy8dy008n01w42t9thc43/cmagzlc6femec07lntckar5ke",
  },
  {
    name: "Sheridan",
    email: "info@rebrandgurus.com",
    // image: dallas,
    state: "Wyoming",
    icon: "WY",
    phone: "+1 (469)-205-8133",
    address: "30 N Gould St Suite R, Sheridan, WY 82801, United States",
    addressLink:
      "https://www.google.com/maps/place/13151+Emily+Rd+Suite+210-D,+Dallas,+TX+75240,+USA",
    image:
      "https://us-west-2.graphassets.com/cm1foy8dy008n01w42t9thc43/cmagzpixtf95k07mxt4l42dy0",
  },
  {
    name: "Dubai",
    email: "info@rebrandgurus.com",
    // image: dallas,
    state: "United Arab Emirates",
    icon: "UAE",
    website: 'branditpurple.com',
    webLink: 'https://branditpurple.com/',
    image:
      "https://us-west-2.graphassets.com/cm1foy8dy008n01w42t9thc43/cmagzs246feaz07lnbfqmxvfe",
  },
  {
    name: "Leeds",
    email: "info@rebrandgurus.com",
    // image: dallas,
    state: "New York",
    icon: "ENG",
    phone: "+44 7501 025298",

    image:
      "https://us-west-2.graphassets.com/cm1foy8dy008n01w42t9thc43/cmrkok5sr33i707lqpi410oot",
  },
];

const pageLink = [
  { name: "Home", path: "/", animationType: "line1" },
  { name: "Agency", path: "/about-us", animationType: "line2" },
  { name: "Expertise", path: "/services", animationType: "line3" },
  { name: "Work", path: "/portfolio", animationType: "line2" },
  { name: "Blog", path: "/blog", animationType: "line3" },
  { name: "Support", path: "/contact-us", animationType: "line1" },
  // { name: "M&A", path: "/mergers-and-acquisitions", animationType: "line3" },
];

const getTelLink = (phone) => `tel:${phone.replace(/[^\d+]/g, "")}`;
const defaultPhoneCity = cities[0];
const currentYear = new Date().getFullYear();

const HamburgerContent = ({ state, onButtonClick }) => {
  const [selectedCity, setSelectedCity] = useState(0);
  const [active, setActive] = useState(0);
  const selectedCityData = cities[selectedCity] || defaultPhoneCity;
  const phoneCity = selectedCityData.phone ? selectedCityData : defaultPhoneCity;

  const menuLayerRef = useRef(null);
  const reveal1Ref = useRef(null);
  const reveal2Ref = useRef(null);
  const cityBackgroundRef = useRef(null);
  const linkRefs = useRef([]);
  const infoRef = useRef(null);
  const socialRef = useRef(null);

  useEffect(() => {
    const menuLayer = menuLayerRef.current;
    const reveal1 = reveal1Ref.current;
    const reveal2 = reveal2Ref.current;
    const info = infoRef.current;
    const social = socialRef.current;
    const links = linkRefs.current.filter(Boolean);

    if (!menuLayer || !reveal1 || !reveal2) return undefined;

    gsap.killTweensOf([menuLayer, reveal1, reveal2]);

    if (state.clicked === false) {
      staggerRevealClose(reveal2, reveal1, () => {
        gsap.set(menuLayer, { display: "none" });
      });
    } else if (
      state.clicked === true ||
      (state.clicked === true && state.initial === null)
    ) {
      gsap.set(menuLayer, { display: "block" });
      gsap.set([reveal1, reveal2], {
        opacity: 1,
        height: "100%",
      });
      staggerReveal(reveal1, reveal2);
      fadeInUp(info);
      fadeInDown(social);
      staggerText(links);
    }

    return () => {
      gsap.killTweensOf([
        menuLayer,
        reveal1,
        reveal2,
        info,
        social,
        ...links,
      ]);
      gsap.set([info, social, ...links].filter(Boolean), { opacity: 1, y: 0 });
    };
  }, [state]);

  const handleClick = (path) => {
    if (onButtonClick) {
      onButtonClick(path);
    }
  };


  const handleClickLocation = (index) => {
    setActive(index);
    setSelectedCity(index);
  };

  return (
    <Box ref={menuLayerRef} className="hamburger-menu">
      <Box
        ref={reveal1Ref}
        className="menu-secondary-background-color"
      ></Box>
      <Box ref={reveal2Ref} className="menu-layer">
        <Box
          ref={cityBackgroundRef}
          className="menu-city-background"
        ></Box>
        <Box className="MenuWrap">
          <Grid container>
            <Grid item xs={12} md={6} lg={3} className="menuNavColumn">
              <nav className="menu-links">
                <ul>
                  {pageLink.map((user, index) => {
                    return (
                      <li key={user.name}>
                        <Link
                          onClick={() => handleClick(user.path)}
                          onMouseEnter={(e) => handleHover(e)}
                          onMouseLeave={(e) => handleHoverExit(e)}
                          ref={(el) => {
                            linkRefs.current[index] = el;
                          }}
                          to={user.path}
                        >
                          {user.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              lg={6}
              alignItems={"center"}
              className="menuContactColumn"
            >
              <Box
                sx={{ p: 4, pl: 0, textAlign: "left" }}
                ref={infoRef}
                className="HeaderContactInfo  height100"
              >
                <Box className="options">
                  {cities.map((opt, index) => (
                    <div
                      key={index}
                      onClick={() => handleClickLocation(index)}
                      className={`option ${index === active ? "active" : ""}`}
                      style={{
                        backgroundImage: `url(${opt.image})`,
                      }}
                    >
                      <div className="shadow"></div>
                      <div className="label">
                        <div className="icon">{opt.icon}</div>
                        {index === active && (
                          <div className="info">
                            <div className="main">{opt.name}</div>
                            <div className="sub">{opt.state}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </Box>

                <Box className="h_info_wrp">
                  <Box className="h_info_item">
                    <Box className="h_info_icon">
                      <PhoneOutlinedIcon />
                    </Box>

                    <Link to={getTelLink(phoneCity.phone)}>
                      <label>{phoneCity.name} Office</label>
                      {phoneCity.phone}
                    </Link>
                  </Box>

                  <Box className="h_info_item">
                    <Box className="h_info_icon">
                      <MarkunreadOutlinedIcon />
                    </Box>
                    <Link to={`mailto:info@rebrandgurus.com`}>
                      <label>Email Us</label>
                      info@rebrandgurus.com
                    </Link>
                  </Box>

                  {cities[selectedCity]?.address && (
                    <Box className="h_info_item fullWidth">
                      <Box className="h_info_icon">
                        <FmdGoodOutlinedIcon />
                      </Box>
                      <Link to={`#`}>
                        <label>Location</label>
                        {cities[selectedCity].address}
                      </Link>
                    </Box>
                  )}
                  {cities[selectedCity]?.website && (
                    <Box className="h_info_item fullWidth">
                      <Box className="h_info_icon">
                        <LanguageSharpIcon />
                      </Box>
                      <Link to={cities[selectedCity].webLink}>
                        <label>Website</label>
                        {cities[selectedCity].website}
                      </Link>
                    </Box>
                  )}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={3} className="menuSocialColumn">
              <Box
                sx={{ p: 0, textAlign: "center" }}
                className="socialBox  height100"
              >
                <Box className="social_Wrp" ref={socialRef}>
                  {social.map((list) => (
                    <Box
                      className={`${list.name.toLowerCase()} social_item`}
                      key={list.color}
                    >
                      <Box
                        component="a"
                        href={`${list.path}`}
                        sx={{ backgroundImage: "url(" + list.image + ")" }}
                        onMouseEnter={() =>
                          handleCity(list.image, cityBackgroundRef.current)
                        }
                        onMouseOut={() => handleCityReturn(cityBackgroundRef.current)}
                      >
                        <Box
                          className="social_overlay"
                          bgcolor={list.color}
                        ></Box>
                      </Box>
                      <Box className="socialText">{list.name}</Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={3} className="menuCopyrightColumn">
              <Box
                sx={{ p: 0, textAlign: "center" }}
                className="copyright  "
              >
                © {currentYear} ReBrandGurus. All rights reserved.
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default HamburgerContent;
