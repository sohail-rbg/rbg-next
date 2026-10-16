"use client";

import React from "react";

import EastIcon from "@mui/icons-material/East";
import aboutImageLeft from "../../images/utah2.jpg";
import aboutImageRight from "../../images/skyline.webp";
import { HomePageData } from "../../Data";
import CustomButton from "../../components/CustomButton";
import NextImage from "../../components/NextImage";

const { aboutus } = HomePageData;

/* Art direction only — not one word of the copy changes.
   The heading is set as a three-line masthead whose last two words are lifted
   into italic sage. The line breaks are computed rather than hardcoded, so the
   block survives an edit to the title. */
const titleWords = aboutus.title.trim().split(/\s+/);
const accentWords = titleWords.slice(-2);
const leadWords = titleWords.slice(0, -2);

// split the leading words into two lines of near-equal length
const balance = (words) => {
  const total = words.join(" ").length;
  let best = 1;
  let bestDiff = Infinity;
  for (let i = 1; i < words.length; i += 1) {
    const head = words.slice(0, i).join(" ").length;
    const diff = Math.abs(head - (total - head - 1));
    if (diff < bestDiff) {
      bestDiff = diff;
      best = i;
    }
  }
  return [words.slice(0, best).join(" "), words.slice(best).join(" ")];
};

const titleLines = [...balance(leadWords), accentWords.join(" ")];

/* The paragraph's opening sentence becomes a standfirst, which gives the column
   scale contrast — a magazine move, again with no new copy. */
const descriptionText = aboutus.description.trim();
const firstStop = descriptionText.indexOf(". ");
const standfirst = firstStop > 0 ? descriptionText.slice(0, firstStop + 1) : descriptionText;
const bodyText = firstStop > 0 ? descriptionText.slice(firstStop + 1).trim() : "";

const HomeAbout = () => (
  <section className="sectionWrp rbg-about">
    {/* ---- act one: the claim, type only, on black ---------------------- */}
    <div className="rbg-about__claim">
      <span className="rbg-about__rail" aria-hidden="true">
        Salt Lake City — Utah
      </span>

      <h2 className="rbg-about__masthead">
        {/* the explicit spaces matter: the lines are display:block, so without
            them the heading's text content runs the words together for screen
            readers and crawlers ("potentialof your business withcreative"). */}
        <span className="rbg-about__line">{titleLines[0]}</span>{" "}
        <span className="rbg-about__line">{titleLines[1]}</span>{" "}
        <em className="rbg-about__line rbg-about__line--accent">{titleLines[2]}</em>
      </h2>

      <div className="rbg-about__copy">
        <p className="rbg-about__standfirst">{standfirst}</p>
        {bodyText ? <p className="rbg-about__body">{bodyText}</p> : null}

        <div className="rbg-about__cta">
          <CustomButton margin="0" link="/about-us" endIcon={<EastIcon />}>
            {aboutus.button.text}
          </CustomButton>
        </div>
      </div>
    </div>

    {/* ---- act two: the place. A full-bleed plate with the skyline card
             overlapping up out of it, so the two images layer instead of
             sitting in neighbouring cells. ------------------------------- */}
    <div className="rbg-about__place">
      <figure className="rbg-about__utah">
        <NextImage
          src={aboutImageLeft}
          fill
          alt={aboutus.title}
          className="rbg-about__photo"
          sizes="100vw"
          quality={78}
        />
      </figure>

      <figure className="rbg-about__skyline">
        <div className="rbg-about__skylineFrame">
          <NextImage
            src={aboutImageRight}
            fill
            alt={aboutus.rightImage.alt}
            className="rbg-about__photo"
            sizes="(max-width: 1024px) 100vw, 46vw"
          />
        </div>

        {/* real glass: the photo sits directly behind this pane, so the blur has
            something to diffuse, and neither the photo nor the pane moves */}
        <figcaption className="rbg-about__caption rbg-glass rbg-glass--slab">
          <span className="rbg-about__captionTitle">
            <span className="rbg-about__dot" aria-hidden="true" />
            {aboutus.hoverBox.heading}
          </span>
          <span className="rbg-about__captionBody">{aboutus.hoverBox.description}</span>
        </figcaption>
      </figure>
    </div>
  </section>
);

export default HomeAbout;
