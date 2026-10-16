"use client";

// HeroSection.js
import React, { useCallback, useRef, useState } from "react";

import BackgroundVideo from "./BackgroundVideo";
import rbgIcon from "../../images/rbg.png";
import posterImage from "../../images/hero.png";
import NextImage from "../../components/NextImage";

const HERO_VIDEO =
  "https://us-west-2.graphassets.com/cm1foy8dy008n01w42t9thc43/cmrkp4wj43e3n07lqxy55xcmg";

const tagline = "We Build Brands That Matter In Culture...";

const HeroSection = () => {
  const [videoFailed, setVideoFailed] = useState(false);
  const sectionRef = useRef(null);

  // The cue hands the reader to the section below. scrollIntoView on the next
  // sibling lands exactly on it however tall the hero turns out to be; the
  // scrollBy fallback keeps it working if the hero is ever rendered alone.
  const handleScrollCue = useCallback(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const behavior = reduced ? "auto" : "smooth";
    const next = sectionRef.current?.nextElementSibling;
    if (next && typeof next.scrollIntoView === "function") {
      next.scrollIntoView({ behavior, block: "start" });
      return;
    }
    window.scrollBy({ top: window.innerHeight, behavior });
  }, []);

  return (
    <section className="homeBannerSection rbg-hero" ref={sectionRef}>
      {/* film: poster fallback under the video, single scrim for legibility */}
      <div className="rbg-hero__media" aria-hidden="true">
        {videoFailed && (
          <NextImage
            src={posterImage}
            alt=""
            fill
            sizes="100vw"
            className="rbg-hero__poster"
          />
        )}

        {!videoFailed && (
          <video
            className="rbg-hero__video"
            poster={posterImage}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            onError={() => setVideoFailed(true)}
          >
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>
        )}

        <span className="rbg-hero__scrim" />
      </div>

      {/* cursor image trail — unchanged */}
      <BackgroundVideo />

      {/* the film dissolves into the black section below; deepens as it leaves */}
      <span className="rbg-hero__merge" aria-hidden="true" />

      <div className="bannerTextWrp rbg-hero__type">
        <div className="rbg-hero__stage rbg-glass rbg-glass--squircle">
          <NextImage
            src={rbgIcon}
            className="img-fluid rbg-hero__wordmark"
            alt="ReBrand Gurus"
            width={640}
            height={263}
            sizes="(max-width: 767px) calc(100vw - 48px), 80vw"
            priority
          />
          <h3 className="rbg-hero__tagline">
            {tagline.split(" ").map((word, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <span className="rbg-hero__word" style={{ "--i": index }} key={`${word}-${index}`}>
                {word}
              </span>
            ))}
          </h3>
        </div>
      </div>

      <div className="rbg-hero__cueWrp">
        <button
          type="button"
          className="rbg-hero__cue"
          onClick={handleScrollCue}
          aria-label="Scroll to the next section"
        >
          <span className="rbg-hero__cue-pill rbg-glass rbg-glass--lite rbg-glass--pill">
            <span className="rbg-hero__cue-dot" />
          </span>
          <span className="rbg-hero__cue-label">scroll</span>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
