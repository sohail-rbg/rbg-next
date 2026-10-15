"use client";

// HeroSection.js
import React, { useState } from "react";

import BackgroundVideo from "./BackgroundVideo";
import rbgIcon from "../../images/rbg.png";
import posterImage from "../../images/hero.png";
import NextImage from "../../components/NextImage";

const HERO_VIDEO =
  "https://us-west-2.graphassets.com/cm1foy8dy008n01w42t9thc43/cmrkp4wj43e3n07lqxy55xcmg";

const tagline = "We Build Brands That Matter In Culture...";

const HeroSection = () => {
  const [videoFailed, setVideoFailed] = useState(false);

  return (
    <section className="homeBannerSection rbg-hero">
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

      <div className="bannerTextWrp rbg-hero__type">
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
    </section>
  );
};

export default HeroSection;
