"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import NextImage from "../../../components/NextImage";

gsap.registerPlugin(ScrollTrigger);

const BeforeAfterDesign = ({ beforeAfter }) => {
  const listRef = useRef(null);

  useEffect(() => {
    if (!beforeAfter?.length) return undefined;

    const media = gsap.matchMedia();

    media.add("(min-width: 1024px)", () => {
      const cards = gsap.utils.toArray(".wdxWork__card");
      const triggers = [];
      const tweens = [];

      cards.forEach((card, index) => {
        tweens.push(
          gsap.fromTo(
            card,
            { scale: 1 },
            {
              scale: 1 - (cards.length - index) * 0.02,
              transformOrigin: "50% 12%",
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 24%",
                end: "bottom 34%",
                scrub: true,
                invalidateOnRefresh: true,
              },
            }
          )
        );

        triggers.push(
          ScrollTrigger.create({
            trigger: card,
            start: "top 12%",
            endTrigger: cards[cards.length - 1],
            end: "top 12%",
            pin: true,
            pinSpacing: false,
            invalidateOnRefresh: true,
            onToggle: (self) =>
              card.classList.toggle("is-lifted", self.isActive),
          })
        );
      });

      return () => {
        triggers.forEach((trigger) => trigger.kill());
        tweens.forEach((tween) => tween.kill());
        cards.forEach((card) => card.classList.remove("is-lifted"));
      };
    });

    return () => media.revert();
  }, [beforeAfter]);

  return (
    <Box className="wdxWork" ref={listRef}>
      <span className="wdxWork__aurora" aria-hidden="true" />
      <div className="wdxWork__list">
        {beforeAfter.map((ba_item, index) => (
          <article key={ba_item.title} className="wdxWork__card">
            <motion.div
              className="wdxWork__inner"
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
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
              <span className="wdxWork__line" aria-hidden="true" />
            </motion.div>
          </article>
        ))}
      </div>
    </Box>
  );
};

export default BeforeAfterDesign;
