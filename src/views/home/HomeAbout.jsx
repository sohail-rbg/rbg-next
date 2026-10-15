"use client";

import React from "react";

import EastIcon from "@mui/icons-material/East";
import aboutImageLeft from "../../images/utah2.jpg";
import aboutImageRight from "../../images/skyline.webp";
import { HomePageData } from "../../Data";
import { useParallax } from "react-scroll-parallax";
import CustomButton from "../../components/CustomButton";
import NextImage from "../../components/NextImage";

const { aboutus } = HomePageData;

// Art direction only — not one word of the copy changes. The closing two words
// are set apart in lighter Recoleta sage, and the opening clause of the
// paragraph is picked out as a lead-in.
const titleWords = aboutus.title.trim().split(/\s+/);
const ACCENT_WORDS = 2;
const titleLead = titleWords.slice(0, -ACCENT_WORDS).join(" ");
const titleAccent = titleWords.slice(-ACCENT_WORDS).join(" ");

const firstComma = aboutus.description.indexOf(",");
const bodyLead = aboutus.description.slice(0, firstComma + 1);
const bodyRest = aboutus.description.slice(firstComma + 1);

const HomeAbout = () => {
  // Small, transform-only parallax drift on the two plates.
  const leadDrift = useParallax({ speed: 8 });
  const downtownDrift = useParallax({ speed: -6 });

  return (
    <section className="sectionWrp rbg-about">
      <div className="rbg-about__grid">
        <div className="rbg-about__media">
          <figure className="rbg-about__figure rbg-about__figure--lead" ref={leadDrift.ref}>
            <span className="rbg-about__offset" aria-hidden="true" />
            <div className="rbg-about__frame">
              <NextImage
                src={aboutImageLeft}
                fill
                alt={aboutus.title}
                className="rbg-about__photo"
                sizes="(max-width: 1024px) 100vw, 46vw"
                quality={78}
              />
            </div>
          </figure>

          <figure className="rbg-about__figure rbg-about__figure--downtown" ref={downtownDrift.ref}>
            <div className="rbg-about__frame rbg-about__frame--wide">
              <NextImage
                src={aboutImageRight}
                fill
                alt={aboutus.rightImage.alt}
                className="rbg-about__photo"
                sizes="(max-width: 1024px) 100vw, 46vw"
              />
            </div>
            <figcaption className="rbg-about__caption">
              <span className="rbg-about__captionTitle">
                <span className="rbg-about__dot" aria-hidden="true" />
                {aboutus.hoverBox.heading}
              </span>
              <span className="rbg-about__captionBody">{aboutus.hoverBox.description}</span>
            </figcaption>
          </figure>
        </div>

        <div className="rbg-about__copy">
          <p className="rbg-about__kicker">
            <span className="rbg-about__dot" aria-hidden="true" />
            Salt Lake City, Utah
          </p>

          <h2 className="rbg-about__title">
            {titleLead} <em className="rbg-about__titleAccent">{titleAccent}</em>
          </h2>

          <p className="rbg-about__body">
            <span className="rbg-about__lead">{bodyLead}</span>
            {bodyRest}
          </p>

          <div className="rbg-about__cta">
            <CustomButton margin="0" link="/about-us" endIcon={<EastIcon />}>
              {aboutus.button.text}
            </CustomButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeAbout;
