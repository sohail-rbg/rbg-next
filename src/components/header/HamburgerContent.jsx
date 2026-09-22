"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { usePathname } from "next/navigation";

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

// Social Background Image
import instagram from "../../images/social/instagram.jpg";
import facebook from "../../images/social/facebook.jpg";
import youtube from "../../images/social/youtube.jpg";
import linkedIn from "../../images/social/linked.jpg";

import { Box, Grid } from "@mui/material";

import MarkunreadOutlinedIcon from "@mui/icons-material/MarkunreadOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import LanguageSharpIcon from "@mui/icons-material/LanguageSharp";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

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
    state: "United Arab Emirates",
    icon: "UAE",
    website: "branditpurple.com",
    webLink: "https://branditpurple.com/",
    image:
      "https://us-west-2.graphassets.com/cm1foy8dy008n01w42t9thc43/cmagzs246feaz07lnbfqmxvfe",
  },
  {
    name: "Leeds",
    email: "info@rebrandgurus.com",
    state: "New York",
    icon: "ENG",
    phone: "+44 7501 025298",

    image:
      "https://us-west-2.graphassets.com/cm1foy8dy008n01w42t9thc43/cmrkok5sr33i7077lqpi410oot",
  },
];

const pageLink = [
  { name: "Home", path: "/" },
  { name: "Agency", path: "/about-us" },
  { name: "Expertise", path: "/services" },
  { name: "Work", path: "/portfolio" },
  { name: "Blog", path: "/blog" },
  { name: "Support", path: "/contact-us" },
];

const getTelLink = (phone) => `tel:${phone.replace(/[^\d+]/g, "")}`;
const defaultPhoneCity = cities[0];
const currentYear = new Date().getFullYear();

const HamburgerContent = ({ state, onButtonClick }) => {
  const pathname = usePathname();
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
  const spotRef = useRef(null);

  const isOpen = state?.clicked === true;

  // pointer-follow emerald spotlight in the panel
  const handleSpotlight = (event) => {
    const spot = spotRef.current;
    if (!spot) return;
    const rect = event.currentTarget.getBoundingClientRect();
    spot.style.setProperty("--m-mx", `${((event.clientX - rect.left) / rect.width) * 100}%`);
    spot.style.setProperty("--m-my", `${((event.clientY - rect.top) / rect.height) * 100}%`);
  };

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

  // Lock the page behind the open menu + close it with Escape.
  useEffect(() => {
    const root = document.documentElement;
    if (isOpen) {
      root.classList.add("rbg-menu-open");
    } else {
      root.classList.remove("rbg-menu-open");
    }

    const onKeyDown = (event) => {
      if (event.key === "Escape" && isOpen && onButtonClick) {
        onButtonClick();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      root.classList.remove("rbg-menu-open");
    };
  }, [isOpen, onButtonClick]);

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
    <Box
      ref={menuLayerRef}
      className="hamburger-menu"
      onMouseMove={handleSpotlight}
    >
      <Box ref={reveal1Ref} className="menu-secondary-background-color"></Box>
      <Box ref={reveal2Ref} className="menu-layer">
        <Box ref={cityBackgroundRef} className="menu-city-background"></Box>
        <span ref={spotRef} className="menu-spot" aria-hidden="true" />

        <Box className="MenuWrap">
          <Box className="menu-topbar">
            <span className="menu-topbar__brand">
              <span className="menu-topbar__mark" />
              ReBrand Gurus
            </span>
            <span className="menu-topbar__eyebrow">Menu</span>
            <button
              type="button"
              className="menu-close"
              onClick={() => handleClick(null)}
              aria-label="Close menu"
            >
              <span className="menu-close__lines" aria-hidden="true" />
            </button>
          </Box>

          <Grid container className="menuGrid">
            <Grid item xs={12} lg={4} className="menuNavColumn">
              <nav className="menu-links">
                <span className="menu-label">Navigation</span>
                <ul>
                  {pageLink.map((user, index) => (
                    <li key={user.name}>
                      <span className="menu-num" aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <Link
                        onClick={() => handleClick(user.path)}
                        onMouseEnter={(e) => handleHover(e)}
                        onMouseLeave={(e) => handleHoverExit(e)}
                        ref={(el) => {
                          linkRefs.current[index] = el;
                        }}
                        to={user.path}
                        className={`menu-link ${
                          pathname === user.path ? "is-active" : ""
                        }`}
                        aria-current={pathname === user.path ? "page" : undefined}
                      >
                        <span className="menu-link__text">{user.name}</span>
                        <span className="menu-link__arrow" aria-hidden="true">
                          <ArrowOutwardIcon />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </Grid>

            <Grid item xs={12} lg={5} className="menuContactColumn">
              <Box ref={infoRef} className="HeaderContactInfo height100">
                <span className="menu-label">Our studios</span>

                <Box className="options">
                  {cities.map((opt, index) => (
                    <button
                      type="button"
                      key={opt.name}
                      onClick={() => handleClickLocation(index)}
                      className={`option ${index === active ? "active" : ""}`}
                      aria-pressed={index === active}
                      style={{
                        backgroundImage: `url(${opt.image})`,
                      }}
                    >
                      <div className="shadow"></div>
                      <div className="label">
                        <div className="icon">{opt.icon}</div>
                        <div className="info">
                          <div className="main">{opt.name}</div>
                          <div className="sub">{opt.state}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </Box>

                <Box className="h_info_wrp">
                  <Box className="h_info_item">
                    <Box className="h_info_icon">
                      <PhoneOutlinedIcon />
                    </Box>
                    <a href={getTelLink(phoneCity.phone)}>
                      <label>{phoneCity.name} Office</label>
                      {phoneCity.phone}
                    </a>
                  </Box>

                  <Box className="h_info_item">
                    <Box className="h_info_icon">
                      <MarkunreadOutlinedIcon />
                    </Box>
                    <a href="mailto:info@rebrandgurus.com">
                      <label>Email Us</label>
                      info@rebrandgurus.com
                    </a>
                  </Box>

                  {cities[selectedCity]?.address && (
                    <Box className="h_info_item fullWidth">
                      <Box className="h_info_icon">
                        <FmdGoodOutlinedIcon />
                      </Box>
                      <a
                        href={cities[selectedCity].addressLink || "#"}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <label>Location</label>
                        {cities[selectedCity].address}
                      </a>
                    </Box>
                  )}

                  {cities[selectedCity]?.website && (
                    <Box className="h_info_item fullWidth">
                      <Box className="h_info_icon">
                        <LanguageSharpIcon />
                      </Box>
                      <a
                        href={cities[selectedCity].webLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <label>Website</label>
                        {cities[selectedCity].website}
                      </a>
                    </Box>
                  )}
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} lg={3} className="menuSocialColumn">
              <Box className="socialBox height100">
                <span className="menu-label">Follow us</span>
                <Box className="social_Wrp" ref={socialRef}>
                  {social.map((list) => (
                    <Box
                      className={`${list.name.toLowerCase()} social_item`}
                      key={list.color}
                    >
                      <Box
                        component="a"
                        href={`${list.path}`}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`ReBrand Gurus on ${list.name}`}
                        sx={{ backgroundImage: "url(" + list.image + ")" }}
                        onMouseEnter={() =>
                          handleCity(list.image, cityBackgroundRef.current)
                        }
                        onMouseOut={() =>
                          handleCityReturn(cityBackgroundRef.current)
                        }
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
          </Grid>

          <Box className="menu-foot">
            <span className="menu-foot__copy">
              © {currentYear} ReBrandGurus. All rights reserved.
            </span>
            <a
              className="menu-foot__cta"
              href="tel:+1-4353950079"
              data-cursor-size="80px"
              data-cursor-color="#FF9776"
            >
              Support center · +1 (435)-395-0079
            </a>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HamburgerContent;
