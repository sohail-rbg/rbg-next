"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box, Container } from "@mui/material";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SectionHeading from "../../components/SectionHeading";
import NextImage from "../../components/NextImage";
import { HomePageData } from "../../Data";

gsap.registerPlugin(ScrollTrigger);

const { title, subTitle, steps } = HomePageData.howItWorkSec;

const CYCLE_MS = 5200;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Process Flow — "Insync Approach".
 *
 * One view, five panels: the five steps sit side by side as an expanding
 * stage. The open panel shows its image and copy, the others stay as slim
 * labelled columns, so the whole flow is readable without scrolling. The
 * stage advances on its own (pausing on hover / focus), and answers to
 * hover, click, tap and arrow keys.
 */
const HowWeWork = () => {
  const sectionRef = useRef(null);
  const boardRef = useRef(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);

  const select = useCallback((index) => {
    setActive((current) => (current === index ? current : index));
  }, []);

  const step = useCallback(
    (delta) => {
      setActive((current) => (current + delta + steps.length) % steps.length);
    },
    []
  );

  // entrance reveal
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        setReady(true);
        return;
      }

      gsap.fromTo(
        ".pfPanel",
        { y: 46, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: ".pfBoard", start: "top 88%" },
          onComplete: () => setReady(true),
        }
      );

      gsap.fromTo(
        ".pfPanel__img",
        { scale: 1.16 },
        {
          scale: 1,
          duration: 1.6,
          stagger: 0.07,
          ease: "power2.out",
          scrollTrigger: { trigger: ".pfBoard", start: "top 88%" },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  // auto advance — pauses on hover / focus, keyboard, reduced motion and
  // while the tab is in the background
  useEffect(() => {
    if (!ready || paused || prefersReducedMotion()) return undefined;

    let timer = window.setTimeout(() => step(1), CYCLE_MS);

    const onVisibility = () => {
      window.clearTimeout(timer);
      if (!document.hidden && !paused) {
        timer = window.setTimeout(() => step(1), CYCLE_MS);
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [active, ready, paused, step]);

  const onKeyDown = (event) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      step(1);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      step(-1);
    } else if (event.key === "Home") {
      event.preventDefault();
      select(0);
    } else if (event.key === "End") {
      event.preventDefault();
      select(steps.length - 1);
    }
  };

  return (
    <Box
      component="section"
      className="sectionWrp pfSection"
      bgcolor="background.bg_3"
      ref={sectionRef}
    >
      <span className="pfSection__wash" aria-hidden="true" />

      <Container>
        <SectionHeading title={title} subtitle={subTitle} align="center" />

        <Box
          className={`pfBoard ${paused ? "is-paused" : ""}`}
          ref={boardRef}
          onMouseDown={() => setPaused(true)}
          onKeyDown={onKeyDown}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          {steps.map((stepItem, index) => {
            const isActive = index === active;

            return (
              <Box
                component="article"
                key={stepItem.title}
                className={`pfPanel ${isActive ? "is-active" : ""}`}
              >
                <Box className="pfPanel__media" aria-hidden="true">
                  <NextImage
                    className="pfPanel__img"
                    src={stepItem.image}
                    alt=""
                    fill
                    sizes="(max-width: 1023px) 92vw, 34vw"
                  />
                </Box>

                <button
                  type="button"
                  className="pfPanel__trigger"
                  onClick={() => select(index)}
                  onMouseEnter={() => select(index)}
                  aria-expanded={isActive}
                  aria-controls={`pfPanelContent-${index}`}
                >
                  <span className="pfPanel__num">{stepItem.step}</span>
                  <span className="pfPanel__name">{stepItem.title}</span>
                  <span className="pfPanel__sr">
                    {`Step ${stepItem.step}: ${stepItem.title}`}
                  </span>
                </button>

                <div
                  className="pfPanel__content"
                  id={`pfPanelContent-${index}`}
                  role="region"
                  aria-label={`Step ${stepItem.step}: ${stepItem.title}`}
                >
                  <h3 className="pfPanel__title">{stepItem.title}</h3>
                  <p className="pfPanel__text">{stepItem.content}</p>
                </div>

                <span className="pfPanel__progress" aria-hidden="true" />
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default HowWeWork;
