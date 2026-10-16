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

/* Art direction only — not one word of the copy changes.
   The heading is set as a three-line masthead, the closing two words lifted out
   in italic sage. Line breaks are computed, not hardcoded, so the block survives
   an edit to the title. */
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

const HomeAbout = () => {
  // transform-only drift, on the plate that runs off the left edge
  const leadDrift = useParallax({ speed: 8 });

  return (
    <section className="sectionWrp rbg-about">
      <div className="rbg-about__ambience" aria-hidden="true" />

      <div className="rbg-about__stage">
        <h2 className="rbg-about__masthead">
          <span className="rbg-about__line rbg-about__line--one">{titleLines[0]}</span>
          <span className="rbg-about__line rbg-about__line--two">{titleLines[1]}</span>
          <span className="rbg-about__line rbg-about__line--three">{titleLines[2]}</span>
        </h2>

        <figure className="rbg-about__plate rbg-about__plate--lead" ref={leadDrift.ref}>
          <span className="rbg-about__offset" aria-hidden="true" />
          <div className="rbg-about__frame rbg-about__frame--lead">
            <NextImage
              src={aboutImageLeft}
              fill
              alt={aboutus.title}
              className="rbg-about__photo"
              sizes="(max-width: 1024px) 100vw, 56vw"
              quality={78}
            />
          </div>
        </figure>

        <div className="rbg-about__copy">
          <p className="rbg-about__standfirst">{standfirst}</p>
          {bodyText ? <p className="rbg-about__body">{bodyText}</p> : null}

          <div className="rbg-about__cta">
            <CustomButton margin="0" link="/about-us" endIcon={<EastIcon />}>
              {aboutus.button.text}
            </CustomButton>
          </div>
        </div>

        {/* marginal note in the void the two plates leave behind */}
        <p className="rbg-about__label" aria-hidden="true">
          Salt Lake City — Utah
        </p>

        <figure className="rbg-about__plate rbg-about__plate--downtown">
          <div className="rbg-about__frame rbg-about__frame--wide">
            <NextImage
              src={aboutImageRight}
              fill
              alt={aboutus.rightImage.alt}
              className="rbg-about__photo"
              sizes="(max-width: 1024px) 100vw, 62vw"
            />
          </div>

          {/* real glass: the photo is directly behind this pane, so the blur has
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
};

export default HomeAbout;
