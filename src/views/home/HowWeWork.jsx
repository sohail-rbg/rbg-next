"use client";

import React, { useEffect, useRef, useState } from "react";
import { Box, Container } from "@mui/material";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SectionHeading from "../../components/SectionHeading";
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
 * Uses the same SectionHeading as every other section, then walks the five
 * steps down an alternating, borderless timeline: images on one side, copy on
 * the other, joined by a single emerald spine that fills as the reader
 * scrolls and lights each step's node as they pass it.
 */
const HowWeWork = () => {
  const sectionRef = useRef(null);
  const spineRef = useRef(null);
  const [current, setCurrent] = useState(-1);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const reduceMotion = prefersReducedMotion();

    const ctx = gsap.context(() => {
      const stepNodes = gsap.utils.toArray(".pfStep");

      if (reduceMotion) return;

      // the spine fills as the flow is scrolled through
      if (spineRef.current) {
        gsap.fromTo(
          spineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".pfFlow",
              start: "top 74%",
              end: "bottom 76%",
              scrub: 0.4,
            },
          }
        );
      }

      stepNodes.forEach((node, index) => {
        gsap.fromTo(
          node.querySelectorAll(".pfStep__reveal"),
          { y: 38, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.95,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: node, start: "top 84%" },
          }
        );

        ScrollTrigger.create({
          trigger: node,
          start: "top 68%",
          end: "bottom 42%",
          onEnter: () => setCurrent(index),
          onEnterBack: () => setCurrent(index),
        });
      });

      // opening the page mid-flow should not leave the spine unlit
      const passed = stepNodes.filter(
        (node) => node.getBoundingClientRect().top < window.innerHeight * 0.68
      ).length;
      if (passed > 0) setCurrent(passed - 1);
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

        <Box component="ol" className="pfFlow">
          <span className="pfFlow__spine" aria-hidden="true">
            <span className="pfFlow__spineFill" ref={spineRef} />
          </span>

          {steps.map((stepItem, index) => (
            <Box
              component="li"
              key={stepItem.title}
              className={`pfStep ${index <= current ? "is-done" : ""} ${
                index === current ? "is-current" : ""
              }`}
            >
              <Box className="pfStep__media pfStep__reveal">
                <NextImage
                  className="pfStep__img"
                  src={stepItem.image}
                  alt={stepItem.title}
                  width={720}
                  height={540}
                  sizes="(max-width: 1023px) 90vw, 42vw"
                />
              </Box>

              <Box className="pfStep__body">
                <span className="pfStep__index pfStep__reveal">
                  {stepItem.step}
                </span>
                <span className="pfStep__label pfStep__reveal">
                  Step {stepItem.step}
                </span>
                <h3 className="pfStep__title pfStep__reveal">
                  {stepItem.title}
                </h3>
                <p className="pfStep__text pfStep__reveal">
                  {stepItem.content}
                </p>
              </Box>

              <span className="pfStep__dot" aria-hidden="true" />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default HowWeWork;
