"use client";

import React, { useEffect, useRef, useState } from "react";
import { Box, Container } from "@mui/material";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import NextImage from "../../components/NextImage";
import { HomePageData } from "../../Data";

gsap.registerPlugin(ScrollTrigger);

const { title, subTitle, steps } = HomePageData.howItWorkSec;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Process Flow — "Insync Approach".
 *
 * A five step timeline on the brand's emerald / brass palette: the rail lights
 * up step by step as the section is scrolled, the numbered nodes pulse on the
 * active step, and each card reveals on a stagger. Below 1200px the same
 * timeline turns vertical (node rail on the left, wide media cards on the
 * right) so the flow reads on every screen.
 */
const HowWeWork = () => {
  const sectionRef = useRef(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const reduceMotion = prefersReducedMotion();

    const ctx = gsap.context(() => {
      const stepNodes = gsap.utils.toArray(".pfStep");

      if (reduceMotion) {
        gsap.set(".pfReveal, .pfStep__node", { opacity: 1, y: 0, scale: 1 });
        setCurrent(steps.length - 1);
        return;
      }

      gsap.fromTo(
        ".pfReveal",
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 76%" },
        }
      );

      gsap.fromTo(
        ".pfStep__node",
        { scale: 0.55, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.7,
          ease: "back.out(1.9)",
          stagger: 0.1,
          scrollTrigger: { trigger: ".pfSteps", start: "top 84%" },
        }
      );

      gsap.fromTo(
        ".pfCard",
        { y: 70, opacity: 0, rotateX: 6, transformPerspective: 900 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.05,
          ease: "power3.out",
          stagger: 0.13,
          scrollTrigger: { trigger: ".pfSteps", start: "top 82%" },
        }
      );

      gsap.fromTo(
        ".pfCard__img",
        { scale: 1.14 },
        {
          scale: 1,
          duration: 1.5,
          ease: "power2.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ".pfSteps", start: "top 82%" },
        }
      );

      // Rail + card highlight follow the step the reader is on.
      stepNodes.forEach((node, index) => {
        ScrollTrigger.create({
          trigger: node,
          start: "top 72%",
          end: "bottom 44%",
          onEnter: () => setCurrent(index),
          onEnterBack: () => setCurrent(index),
        });
      });

      // Opening the page mid-section should not leave the rail unlit.
      const passed = stepNodes.filter(
        (node) => node.getBoundingClientRect().top < window.innerHeight * 0.72
      ).length;
      if (passed > 1) setCurrent(passed - 1);
    }, section);

    const refresh = () => ScrollTrigger.refresh();
    if (document.readyState !== "complete") {
      window.addEventListener("load", refresh);
    }

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  const litThrough = (current + 1) / steps.length;

  return (
    <Box component="section" className="pfSection" ref={sectionRef}>
      <span className="pfSection__glow" aria-hidden="true" />

      <Container>
        <header className="pfHead">
          <Box className="pfHead__main">
            <span className="pfEyebrow pfReveal">
              <span className="pfEyebrow__dot" aria-hidden="true" />
              {subTitle}
            </span>
            <h2 className="pfTitle pfReveal">{title}</h2>
            <p className="pfNote pfReveal">
              Five steps, one team — from the first conversation to launch day.
            </p>
          </Box>

          <Box className="pfMeter pfReveal" aria-hidden="true">
            <span className="pfMeter__count">
              <span className="pfMeter__now">{steps[current]?.step}</span>
              <span className="pfMeter__slash">/</span>
              <span className="pfMeter__all">
                {String(steps.length).padStart(2, "0")}
              </span>
            </span>
            <span className="pfMeter__label">{steps[current]?.title}</span>
            <span className="pfMeter__bar">
              <span
                className="pfMeter__fill"
                style={{ transform: `scaleX(${litThrough})` }}
              />
            </span>
          </Box>
        </header>

        <Box component="ol" className="pfSteps">
          {steps.map((stepItem, index) => (
            <Box
              component="li"
              key={stepItem.title}
              className={`pfStep ${index <= current ? "is-lit" : ""} ${
                index === current ? "is-current" : ""
              }`}
            >
              {index < steps.length - 1 && (
                <span className="pfStep__link" aria-hidden="true" />
              )}

              <span className="pfStep__node" aria-hidden="true">
                <span className="pfStep__num">{stepItem.step}</span>
              </span>

              <article className="pfCard">
                <Box className="pfCard__media">
                  <NextImage
                    className="pfCard__img"
                    src={stepItem.image}
                    alt={stepItem.title}
                    width={640}
                    height={440}
                    sizes="(max-width: 767px) 88vw, (max-width: 1199px) 72vw, 22vw"
                  />
                  <span className="pfCard__tag">Step {stepItem.step}</span>
                </Box>

                <Box className="pfCard__body">
                  <h3 className="pfCard__title">{stepItem.title}</h3>
                  <p className="pfCard__text">{stepItem.content}</p>
                </Box>

                <span className="pfCard__rule" aria-hidden="true" />
              </article>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default HowWeWork;
