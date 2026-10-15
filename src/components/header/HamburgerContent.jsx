"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

import NextImage from "../NextImage";
import {
  staggerText,
  staggerReveal,
  fadeInUp,
  fadeInDown,
  staggerRevealClose,
} from "./Animations";

import MarkunreadOutlinedIcon from "@mui/icons-material/MarkunreadOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import LanguageSharpIcon from "@mui/icons-material/LanguageSharp";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

// Section imagery (local assets so the menu never depends on a remote host)
import heroImg from "../../images/hero.png";
import agencyImg from "../../images/about_1.jpg";
import expertiseImg from "../../images/services/list/1.jpg";
import workImg from "../../images/portfolio/beautyLounge.jpg";
import blogImg from "../../images/howitwork/3.jpg";
import supportImg from "../../images/bg/consultation.jpg";

// Social artwork
import instagram from "../../images/social/instagram.jpg";
import facebook from "../../images/social/facebook.jpg";
import youtube from "../../images/social/youtube.jpg";
import linkedIn from "../../images/social/linked.jpg";

/* ------------------------------------------------------------------ data */

const sections = [
  {
    id: "home",
    index: "01",
    name: "Home",
    path: "/",
    image: heroImg,
    tag: "Start here",
    title: "Culture-first branding",
    text: "We build brands that matter in culture — strategy, story and craft in one studio.",
  },
  {
    id: "agency",
    index: "02",
    name: "Agency",
    path: "/about-us",
    image: agencyImg,
    tag: "The studio",
    title: "Rebrand. Rethink. Grow.",
    text: "Strategists, designers and engineers who rebuild brands from the inside out.",
  },
  {
    id: "expertise",
    index: "03",
    name: "Expertise",
    path: "/services",
    image: expertiseImg,
    tag: "What we do",
    title: "Web, search & social",
    text: "Web design, SEO/AEO/GEO, social optimisation and online reputation management.",
  },
  {
    id: "work",
    index: "04",
    name: "Work",
    path: "/portfolio",
    image: workImg,
    tag: "Proof",
    title: "200+ launches",
    text: "Websites, brand systems and campaigns for founders, challengers and icons.",
  },
  {
    id: "blog",
    index: "05",
    name: "Blog",
    path: "/blog",
    image: blogImg,
    tag: "Ideas",
    title: "Playbooks & field notes",
    text: "Search, AI visibility and brand thinking — written by the people doing the work.",
  },
  {
    id: "support",
    index: "06",
    name: "Support",
    path: "/contact-us",
    image: supportImg,
    tag: "Talk to us",
    title: "A reply within 24 hours",
    text: "Tell us what is broken, or what is next. A strategist answers within a day.",
  },
];

const social = [
  {
    name: "Instagram",
    handle: "@rebrandgurusofficial",
    image: instagram,
    path: "https://www.instagram.com/rebrandgurusofficial/",
    tint: "rgba(250, 237, 233, 0.62)",
  },
  {
    name: "Facebook",
    handle: "/rebrandgurusmarketing",
    image: facebook,
    path: "https://www.facebook.com/rebrandgurusmarketing",
    tint: "#8b9c8c",
  },
  {
    name: "YouTube",
    handle: "@rebrandgurus",
    image: youtube,
    path: "https://www.youtube.com/channel/UClS9V3u_D4AsWhVOqZ92xrQ",
    tint: "rgba(14, 25, 29, 0.72)",
  },
  {
    name: "LinkedIn",
    handle: "/rebrandgurus",
    image: linkedIn,
    path: "https://www.linkedin.com/company/74515017/admin/dashboard/",
    tint: "#2e5e53",
  },
];

const offices = [
  {
    id: "slc",
    icon: "SLC",
    name: "Salt Lake City",
    state: "Utah",
    phone: "+1 (435)-395-0079",
    address: "ReBrand Gurus International LLC, PO Box 980457, Park City, Utah 84098",
    addressLink:
      "https://www.google.com/maps/place/ReBrand+Gurus/@44.7980451,-106.9551321,17.25z/data=!4m6!3m5!1s0x5335fbc78df01a2f:0x1d7207e6f2ccf79f!8m2!3d44.7977689!4d-106.9549034!16s%2Fg%2F11s0vlc51c?entry=ttu",
    image:
      "https://us-west-2.graphassets.com/cm1foy8dy008n01w42t9thc43/cmagz7bbge23s07lnk7vpmxpg",
  },
  {
    id: "va",
    icon: "VA",
    name: "Stafford",
    state: "Virginia",
    phone: "+1 (469)-205-8133",
    address: "ReBrand Gurus Virginia LLC, 93 Brooke Crest Ln, Stafford, VA 22554, USA",
    addressLink:
      "https://www.google.com/maps/place/13151+Emily+Rd+Suite+210-D,+Dallas,+TX+75240,+USA",
    image:
      "https://us-west-2.graphassets.com/cm1foy8dy008n01w42t9thc43/cmagzlc6femec07lntckar5ke",
  },
  {
    id: "wy",
    icon: "WY",
    name: "Sheridan",
    state: "Wyoming",
    phone: "+1 (469)-205-8133",
    address: "30 N Gould St Suite R, Sheridan, WY 82801, United States",
    addressLink:
      "https://www.google.com/maps/place/13151+Emily+Rd+Suite+210-D,+Dallas,+TX+75240,+USA",
    image:
      "https://us-west-2.graphassets.com/cm1foy8dy008n01w42t9thc43/cmagzpixtf95k07mxt4l42dy0",
  },
  {
    id: "uae",
    icon: "UAE",
    name: "Dubai",
    state: "United Arab Emirates",
    phone: "+971 4 000 0000",
    website: "branditpurple.com",
    webLink: "https://branditpurple.com/",
    image:
      "https://us-west-2.graphassets.com/cm1foy8dy008n01w42t9thc43/cmagzs246feaz07lnbfqmxvfe",
  },
  {
    id: "eng",
    icon: "ENG",
    name: "Leeds",
    state: "United Kingdom",
    phone: "+44 7501 025298",
    image:
      "https://us-west-2.graphassets.com/cm1foy8dy008n01w42t9thc43/cmrkok5sr33i707lqpi410oot",
  },
];

const tickerItems = [
  "Digital branding",
  "SEO · AEO · GEO",
  "Web design",
  "Social media optimisation",
  "Online reputation",
  "AI visibility audits",
  "200+ launches",
  "Salt Lake City · Virginia · Wyoming · Dubai · Leeds",
];

const currentYear = new Date().getFullYear();
const AUTOPLAY_MS = 4800;

const getTelLink = (phone = "") => `tel:${phone.replace(/[^\d+]/g, "")}`;

/* ------------------------------------------------------------ component */

const HamburgerContent = ({ state, onButtonClick }) => {
  const isOpen = state?.clicked === true;

  const [activeSection, setActiveSection] = useState(0);
  const [activeOffice, setActiveOffice] = useState(0);
  const [engaged, setEngaged] = useState(false);

  const menuLayerRef = useRef(null);
  const reveal1Ref = useRef(null);
  const reveal2Ref = useRef(null);
  const cityBackgroundRef = useRef(null);
  const linkRefs = useRef([]);
  const infoRef = useRef(null);
  const socialRef = useRef(null);

  const section = sections[activeSection];
  const office = offices[activeOffice];

  /* --- reveal / hide -------------------------------------------------- */
  useEffect(() => {
    const menuLayer = menuLayerRef.current;
    const reveal1 = reveal1Ref.current;
    const reveal2 = reveal2Ref.current;
    const info = infoRef.current;
    const socialNode = socialRef.current;
    const links = linkRefs.current.filter(Boolean);

    if (!menuLayer || !reveal1 || !reveal2) return undefined;

    gsap.killTweensOf([menuLayer, reveal1, reveal2]);

    if (state.clicked === false) {
      staggerRevealClose(reveal2, reveal1, () => {
        gsap.set(menuLayer, { display: "none" });
      });
    } else if (state.clicked === true) {
      gsap.set(menuLayer, { display: "block" });
      gsap.set([reveal1, reveal2], { opacity: 1, height: "100%" });
      staggerReveal(reveal1, reveal2);
      fadeInUp(info);
      fadeInDown(socialNode);
      staggerText(links);
    }

    return () => {
      gsap.killTweensOf([
        menuLayer,
        reveal1,
        reveal2,
        info,
        socialNode,
        ...links,
      ]);
      gsap.set([info, socialNode, ...links].filter(Boolean), {
        opacity: 1,
        y: 0,
      });
    };
  }, [state]);

  /* --- background wash (section + office imagery) --------------------- */
  const showWash = useCallback((url, opacity = 0.42) => {
    const node = cityBackgroundRef.current;
    if (!node || !url) return;
    gsap.set(node, { backgroundImage: `url(${url})` });
    gsap.to(node, { opacity, duration: 0.7, ease: "power2.out" });
  }, []);

  const hideWash = useCallback(() => {
    const node = cityBackgroundRef.current;
    if (!node) return;
    gsap.to(node, { opacity: 0, duration: 0.5, ease: "power2.out" });
  }, []);

  /* --- selection helpers --------------------------------------------- */
  const activateSection = useCallback(
    (index) => {
      setActiveSection(index);
      setEngaged(true);
    },
    []
  );

  const activateOffice = useCallback((index) => {
    setActiveOffice(index);
    setEngaged(true);
  }, []);

  useEffect(() => {
    const image = sections[activeSection]?.image;
    if (image && isOpen) showWash(image, 0.38);
  }, [activeSection, isOpen, showWash]);

  /* --- idle autoplay -------------------------------------------------- */
  useEffect(() => {
    if (!isOpen || engaged) return undefined;
    const id = window.setInterval(() => {
      setActiveSection((prev) => (prev + 1) % sections.length);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [isOpen, engaged]);

  /* --- open state: esc to close, lock page scroll --------------------- */
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return undefined;
    }

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && onButtonClick) onButtonClick();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onButtonClick]);

  /* --- spotlight follows the pointer --------------------------------- */
  const handlePointerMove = (event) => {
    const node = menuLayerRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--rbg-mx", `${event.clientX - rect.left}px`);
    node.style.setProperty("--rbg-my", `${event.clientY - rect.top}px`);
  };

  const handleClick = (path) => {
    if (onButtonClick) onButtonClick(path);
  };

  const handleClose = () => {
    if (onButtonClick) onButtonClick();
  };

  return (
    <div
      ref={menuLayerRef}
      className="hamburger-menu"
      onMouseMove={handlePointerMove}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
    >
      <div ref={reveal1Ref} className="menu-secondary-background-color" />
      <div ref={reveal2Ref} className="menu-layer">
        <div ref={cityBackgroundRef} className="rbg-menu__wash" />
        <div className="rbg-menu__spotlight" />

        <div className="rbg-menu__inner">
          {/* top bar */}
          <div className="rbg-menu__top">
            <span className="rbg-menu__brand">
              <span className="rbg-menu__brand-dot" />
              ReBrand Gurus
            </span>
            <span className="rbg-menu__topright">
              <span className="rbg-menu__topnote">
                Menu — {String(sections.length).padStart(2, "0")} destinations
              </span>
              <button
                type="button"
                className="rbg-menu__close"
                onClick={handleClose}
              >
                <CloseRoundedIcon sx={{ fontSize: 14, mr: "6px" }} />
                Close
              </button>
            </span>
          </div>

          {/* main: index · showcase · socials */}
          <div className="rbg-menu__main">
            <nav aria-label="Primary">
              <ul className="rbg-menu__nav">
                {sections.map((item, index) => (
                  <li
                    key={item.id}
                    className={index === activeSection ? "is-active" : ""}
                  >
                    <Link
                      to={item.path}
                      className="rbg-menu__nav-link"
                      aria-current={index === activeSection ? "page" : undefined}
                      onMouseEnter={() => activateSection(index)}
                      onFocus={() => activateSection(index)}
                      onClick={() => handleClick(item.path)}
                      ref={(el) => {
                        linkRefs.current[index] = el;
                      }}
                    >
                      <span className="rbg-menu__nav-index">{item.index}</span>
                      <span className="rbg-menu__nav-label">{item.name}</span>
                      <span className="rbg-menu__nav-arrow" aria-hidden="true">
                        ↗
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div
              className="rbg-menu__stage"
              onMouseLeave={hideWash}
            >
              <span className="rbg-menu__ghost" key={section.index} aria-hidden="true">
                {section.index}
              </span>

              <div className="rbg-menu__deck">
                {sections.map((item, index) => {
                  const offset =
                    (index - activeSection + sections.length) % sections.length;
                  return (
                    <div
                      key={item.id}
                      className={`rbg-menu__card ${
                        offset === 0 ? "is-active" : ""
                      }`}
                      style={{
                        "--offset": offset,
                        zIndex: sections.length - offset,
                      }}
                      aria-hidden={offset === 0 ? undefined : "true"}
                    >
                      <NextImage
                        src={item.image}
                        alt=""
                        fill
                        sizes="(max-width: 767px) 60vw, (max-width: 1199px) 36vw, 320px"
                        className="rbg-menu__card-img"
                      />
                      <span className="rbg-menu__card-tag">{item.tag}</span>
                    </div>
                  );
                })}
              </div>

              <div className="rbg-menu__caption">
                <span className="rbg-menu__caption-kicker">{section.tag}</span>
                <h3 className="rbg-menu__caption-title">{section.title}</h3>
                <p className="rbg-menu__caption-text">{section.text}</p>
              </div>
            </div>

            <div className="rbg-menu__social" ref={socialRef}>
              {social.map((item) => (
                <a
                  key={item.name}
                  className="rbg-menu__social-item"
                  href={item.path}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    "--brand": item.tint,
                    "--img": `url(${item.image})`,
                  }}
                >
                  <span className="rbg-menu__social-name">{item.name}</span>
                  <span className="rbg-menu__social-handle">
                    {item.handle}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* bottom band: offices, ticker, footer */}
          <div className="rbg-menu__bottom">
            <div className="rbg-menu__offices">
              <div>
                <span className="rbg-menu__offices-label">
                  Global footprint — {office.name}, {office.state}
                </span>
                <div className="rbg-menu__chips">
                  {offices.map((item, index) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`rbg-menu__chip ${
                        index === activeOffice ? "is-active" : ""
                      }`}
                      onMouseEnter={() => activateOffice(index)}
                      onFocus={() => activateOffice(index)}
                      onClick={() => activateOffice(index)}
                    >
                      <span className="rbg-menu__chip-code">{item.icon}</span>
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rbg-menu__meta" ref={infoRef}>
                <div className="rbg-menu__meta-row">
                  <span className="rbg-menu__meta-icon">
                    <PhoneOutlinedIcon />
                  </span>
                  <span className="rbg-menu__meta-body">
                    <span className="rbg-menu__meta-label">
                      {office.name} office
                    </span>
                    <a
                      className="rbg-menu__meta-value"
                      href={getTelLink(office.phone)}
                    >
                      {office.phone}
                    </a>
                  </span>
                </div>

                <div className="rbg-menu__meta-row">
                  <span className="rbg-menu__meta-icon">
                    <MarkunreadOutlinedIcon />
                  </span>
                  <span className="rbg-menu__meta-body">
                    <span className="rbg-menu__meta-label">Email us</span>
                    <a
                      className="rbg-menu__meta-value"
                      href="mailto:info@rebrandgurus.com"
                    >
                      info@rebrandgurus.com
                    </a>
                  </span>
                </div>

                {office.address && (
                  <div className="rbg-menu__meta-row is-wide">
                    <span className="rbg-menu__meta-icon">
                      <FmdGoodOutlinedIcon />
                    </span>
                    <span className="rbg-menu__meta-body">
                      <span className="rbg-menu__meta-label">Location</span>
                      <a
                        className="rbg-menu__meta-value"
                        href={office.addressLink || "#"}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {office.address}
                      </a>
                    </span>
                  </div>
                )}

                {office.website && (
                  <div className="rbg-menu__meta-row">
                    <span className="rbg-menu__meta-icon">
                      <LanguageSharpIcon />
                    </span>
                    <span className="rbg-menu__meta-body">
                      <span className="rbg-menu__meta-label">Website</span>
                      <a
                        className="rbg-menu__meta-value"
                        href={office.webLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {office.website}
                      </a>
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="rbg-menu__ticker" aria-hidden="true">
              <div className="rbg-menu__ticker-track">
                {[0, 1].map((copy) => (
                  <div className="rbg-menu__ticker-group" key={copy}>
                    {tickerItems.map((item) => (
                      <span className="rbg-menu__ticker-item" key={`${copy}-${item}`}>
                        {item}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="rbg-menu__footer">
              <div className="rbg-menu__footer-links">
                <a href="mailto:info@rebrandgurus.com">info@rebrandgurus.com</a>
                <a href={getTelLink(offices[0].phone)}>{offices[0].phone}</a>
              </div>
              <span>
                © {currentYear} ReBrand Gurus. All rights reserved.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HamburgerContent;
