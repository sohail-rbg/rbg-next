"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Box, Grid } from "@mui/material";
import NextImage from "../../../components/NextImage";

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.22, 1, 0.36, 1];

const WebServiceTab = (props) => {
  const { webServiceTabData } = props;
  const stackRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    if (!webServiceTabData?.length) return undefined;

    const media = gsap.matchMedia();

    media.add("(min-width: 1024px)", () => {
      const wrap = stackRef.current;
      const cards = cardRefs.current.filter(Boolean);
      if (!wrap || cards.length < 2) return undefined;

      const flags = new Array(cards.length).fill(false);

      const syncTop = () => {
        let top = 0;
        flags.forEach((on, index) => {
          if (on) top = Math.max(top, index);
        });
        cards.forEach((card, index) => {
          card.classList.toggle("is-front", index === top);
          card.classList.toggle("is-dealt", index < top);
        });
      };

      const deal = gsap.fromTo(
        cards.slice(1),
        { x: () => window.innerWidth / 2 + 140, rotate: 2.5, opacity: 0.85 },
        {
          x: 0,
          rotate: 0,
          opacity: 1,
          ease: "none",
          stagger: 0.85,
          scrollTrigger: {
            trigger: wrap,
            pin: true,
            scrub: true,
            start: "top 96px",
            end: () => "+=" + cards.length * 460,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const step = 1 / (cards.length - 1);
              const reached = Math.min(
                cards.length - 1,
                Math.max(0, Math.round(self.progress / step))
              );
              flags.fill(false);
              flags[0] = true;
              for (let i = 1; i <= reached; i += 1) flags[i] = true;
              syncTop();
            },
          },
        }
      );

      cards[0].classList.add("is-front");

      return () => {
        deal.scrollTrigger?.kill();
        deal.kill();
        cards.forEach((card) =>
          card.classList.remove("is-front", "is-dealt")
        );
      };
    });

    return () => media.revert();
  }, [webServiceTabData]);

  return (
    <Box className="wdxStackWrp">
      <Box className="wdxStack" ref={stackRef}>
        {webServiceTabData.map((webTabItem, index) => (
          <Box
            className="wdxStack__card"
            key={webTabItem.id}
            ref={(el) => (cardRefs.current[index] = el)}
            style={{ "--stack-accent": webTabItem.bgColor || "#2E5E53" }}
          >
            <span className="wdxStack__glow" aria-hidden="true" />

            <Grid container spacing={{ xs: 2, md: 4 }} alignItems="center">
              <Grid item xs={12} md={6}>
                <motion.div
                  className="wdxStack__media"
                  initial={{ y: 70, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.9, ease: EASE }}
                >
                  <NextImage
                    src={webTabItem.featuredImg}
                    alt={webTabItem.title}
                    fill
                    sizes="(max-width: 1023px) 92vw, 40vw"
                    className="wdxStack__img"
                  />
                  <span className="wdxStack__tint" aria-hidden="true" />
                </motion.div>
              </Grid>

              <Grid item xs={12} md={6}>
                <div className="wdxStack__panel">
                  <span className="wdxStack__idx" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <motion.h3
                    className="wdxStack__title"
                    initial={{ y: 60, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.85, ease: EASE }}
                  >
                    {webTabItem.title}
                  </motion.h3>
                  <motion.div
                    className="wdxStack__desc"
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.9, delay: 0.08, ease: EASE }}
                    dangerouslySetInnerHTML={{ __html: webTabItem.Description }}
                  />
                </div>
              </Grid>
            </Grid>

            <span className="wdxStack__rule" aria-hidden="true" />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default WebServiceTab;
