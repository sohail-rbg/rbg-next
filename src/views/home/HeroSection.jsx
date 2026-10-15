"use client";

// HeroSection.js
import React, { useEffect, useRef, useState } from "react";

import BackgroundVideo from "./BackgroundVideo";
import rbgIcon from "../../images/rbg.png";
import posterImage from "../../images/hero.png";
import NextImage from "../../components/NextImage";

const HERO_VIDEO =
  "https://us-west-2.graphassets.com/cm1foy8dy008n01w42t9thc43/cmrkp4wj43e3n07lqxy55xcmg";

const tagline = "We Build Brands That Matter In Culture...";

const HudItem = ({ children, className = "" }) => (
  <span className={`rbg-hero__hud-item ${className}`}>{children}</span>
);

const HeroSection = () => {
  const sectionRef = useRef(null);
  const rafRef = useRef(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);

  /* scroll parallax: the frame pushes in and drifts as you leave the hero -- */
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;
    if (typeof window.matchMedia !== "function") return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    let frame = null;

    const update = () => {
      frame = null;
      const box = node.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const progress = Math.max(-1, Math.min(1, -box.top / vh));

      node.style.setProperty("--hero-shift", `${(progress * 46).toFixed(1)}px`);
      node.style.setProperty("--hero-zoom", (1 + Math.max(0, progress) * 0.08).toFixed(4));
      node.style.setProperty("--hero-copy", `${(-progress * 34).toFixed(1)}px`);
      node.style.setProperty("--hero-fade", (1 - Math.max(0, progress) * 1.15).toFixed(3));
    };

    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);

    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  /* spotlight follows the cursor across the film ------------------------- */
  const handlePointerMove = (event) => {
    const node = sectionRef.current;
    if (!node) return;
    const box = node.getBoundingClientRect();
    if (!box.width || !box.height) return;
    node.style.setProperty("--hx", `${(((event.clientX - box.left) / box.width) * 100).toFixed(2)}%`);
    node.style.setProperty("--hy", `${(((event.clientY - box.top) / box.height) * 100).toFixed(2)}%`);
    if (!hasMoved) setHasMoved(true);
  };

  return (
    <section
      ref={sectionRef}
      className={`homeBannerSection rbg-hero${hasMoved ? " is-live" : ""}`}
      onPointerMove={handlePointerMove}
    >
      {/* film: poster fallback → video → scrims → grain */}
      <div className="rbg-hero__media" aria-hidden="true">
        <span className="rbg-hero__fallback">
          <NextImage
            src={posterImage}
            alt=""
            fill
            sizes="100vw"
            className="rbg-hero__fallback-img"
          />
        </span>

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
      </div>

      <span className="rbg-hero__scrim" aria-hidden="true" />
      <span className="rbg-hero__vignette" aria-hidden="true" />
      <span className="rbg-hero__spotlight" aria-hidden="true" />
      <span className="rbg-hero__grain" aria-hidden="true" />
      <span className="rbg-hero__frame" aria-hidden="true" />

      {/* cursor image trail — keep as-is, sits above the film */}
      <BackgroundVideo />

      <div className="rbg-hero__copy">
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
      </div>

      <div className="rbg-hero__hud">
        <HudItem>
          <span className="rbg-hero__dot" />
          Taking projects for Q1 2026
        </HudItem>

        <HudItem className="rbg-hero__hud--center">
          <span className="rbg-hero__cue-line" />
          {hasMoved ? "Scroll" : "Move your cursor"}
        </HudItem>

        <HudItem className="rbg-hero__hud--right">
          Strategy ✳ Web ✳ Search &amp; AI ✳ Social
        </HudItem>
      </div>
    </section>
  );
};

export default HeroSection;
