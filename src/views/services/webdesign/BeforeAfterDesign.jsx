"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import SectionHeading from "../../../components/SectionHeading";
import NextImage from "../../../components/NextImage";

gsap.registerPlugin(ScrollTrigger);

/**
 * Selected work.
 *
 * Cards stack with CSS `position: sticky` (each one a touch lower than the
 * last, so the edges read as a deck) and GSAP only scrubs the recede scale.
 * No pins anywhere — scrolling therefore never stalls.
 */
const BeforeAfterDesign = ({ beforeAfter }) => {
  const listRef = useRef(null);

  useEffect(() => {
    if (!beforeAfter?.length) return undefined;

    const media = gsap.matchMedia();

    media.add("(min-width: 1024px)", () => {
      const list = listRef.current;
      const cards = gsap.utils.toArray(".wdxWork__card", list || undefined);
      if (!list || !cards.length) return undefined;

      const tweens = [];

      cards.forEach((card, index) => {
        if (index === cards.length - 1) return;
        tweens.push(
          gsap.to(card, {
            scale: 0.94 - index * 0.01,
            yPercent: -2,
            ease: "none",
            scrollTrigger: {
              trigger: cards[index + 1],
              start: "top bottom",
              end: "top 14%",
              scrub: 0.5,
              invalidateOnRefresh: true,
            },
          })
        );
      });

      return () => {
        tweens.forEach((tween) => {
          tween.scrollTrigger?.kill();
          tween.kill();
          gsap.set(tween.targets(), { clearProps: "transform" });
        });
      };
    });

    return () => media.revert();
  }, [beforeAfter]);

  return (
    <Box className="wdxWork" ref={listRef}>
      <div className="wdxWork__head">
        <SectionHeading
          subtitle="Portfolio"
          title="Selected Work"
          titleFontSize="clamp(30px, 3.4vw, 58px)"
          margin="12px 0 14px"
          align="center"
          description="Three of the sites we rebuilt from the ground up."
        />
      </div>

      <div className="wdxWork__list">
        {beforeAfter.map((ba_item, index) => (
          <article
            key={ba_item.title}
            className="wdxWork__card"
            data-wd-spot
            style={{ "--i": index, zIndex: 3 + index }}
          >
            <span className="wdxWork__spot" aria-hidden="true" />
            <motion.div
              className="wdxWork__inner"
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="wdxWork__media">
                <NextImage
                  src={ba_item.img}
                  alt={ba_item.title || ""}
                  fill
                  sizes="(max-width: 1023px) 92vw, 74vw"
                  className="wdxWork__img"
                />
                <span className="wdxWork__tint" aria-hidden="true" />
              </div>
              <div className="wdxWork__meta">
                <span className="wdxWork__idx" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="wdxWork__title">{ba_item.title}</h3>
              </div>
            </motion.div>
          </article>
        ))}
        <span className="wdxWork__tail" aria-hidden="true" />
      </div>
    </Box>
  );
};

export default BeforeAfterDesign;
