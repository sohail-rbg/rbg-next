"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Box, Grid } from "@mui/material";
import SectionHeading from "../../../components/SectionHeading";
import NextImage from "../../../components/NextImage";

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.22, 1, 0.36, 1];

/**
 * The services deal.
 *
 * The stacking itself is CSS `position: sticky` — no ScrollTrigger pins, so the
 * page never locks up and the compositor keeps it smooth. GSAP only scrubs the
 * incoming card (x / y / opacity) and reports which card is on top.
 */
const WebServiceTab = (props) => {
  const { webServiceTabData } = props;
  const wrapRef = useRef(null);
  const cardRefs = useRef([]);
  const tickRefs = useRef([]);

  useEffect(() => {
    if (!webServiceTabData?.length) return undefined;

    const media = gsap.matchMedia();

    media.add("(min-width: 1024px)", () => {
      const wrap = wrapRef.current;
      const cards = cardRefs.current.filter(Boolean);
      if (!wrap || cards.length < 2) return undefined;

      const deal = cards.slice(1);
      gsap.set(cards, { willChange: "transform, opacity" });

      const ticks = tickRefs.current.filter(Boolean);

      const onUpdate = (progress) => {
        const top = Math.min(cards.length - 1, Math.round(progress * (cards.length - 1)));
        cards.forEach((card, index) => {
          card.classList.toggle("is-front", index === top);
          card.classList.toggle("is-dealt", index < top);
        });
        ticks.forEach((tick, index) => {
          tick.classList.toggle("is-on", index === top);
          tick.classList.toggle("is-done", index < top);
        });
      };

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: "bottom 85%",
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => onUpdate(self.progress),
        },
      });

      deal.forEach((card, index) => {
        const from = (index + 1) % 2 ? 14 : -14;
        tl.fromTo(
          card,
          { xPercent: from, yPercent: 5, opacity: 0 },
          { xPercent: 0, yPercent: 0, opacity: 1, duration: 1 },
          index
        );
      });

      onUpdate(0);

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        gsap.set(cards, { clearProps: "willChange,transform,opacity" });
        cards.forEach((card) => card.classList.remove("is-front", "is-dealt"));
        tickRefs.current.filter(Boolean).forEach((tick) =>
          tick.classList.remove("is-on", "is-done")
        );
      };
    });

    return () => media.revert();
  }, [webServiceTabData]);

  return (
    <Box className="wdxStackWrp">
      <div className="wdxStack__head">
        <SectionHeading
          subtitle="Services"
          title="What We Build"
          titleFontSize="clamp(30px, 3.4vw, 58px)"
          margin="12px 0 14px"
          align="center"
          description="Five disciplines that carry a project from the first sketch to launch day. Follow the numbers."
        />
      </div>

      <Box
        className="wdxStack"
        ref={wrapRef}
        style={{ "--deck": webServiceTabData.length }}
      >
        <div className="wdxStack__index" aria-hidden="true">
          {webServiceTabData.map((item, index) => (
            <span
              className="wdxStack__tick"
              key={`tick-${item.id}`}
              ref={(el) => (tickRefs.current[index] = el)}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          ))}
        </div>

        {webServiceTabData.map((webTabItem, index) => (
          <Box
            className={`wdxStack__card${index % 2 ? " is-flip" : ""}`}
            key={webTabItem.id}
            ref={(el) => (cardRefs.current[index] = el)}
            data-wd-spot
            style={{ "--stack-accent": webTabItem.bgColor || "var(--primary)" }}
          >
            <span className="wdxStack__glow" aria-hidden="true" />
            <span className="wdxStack__spot" aria-hidden="true" />
            <span className="wdxStack__bigNum" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>

            <Grid container spacing={{ xs: 2, md: 4 }} alignItems="center">
              <Grid item xs={12} md={6} className="wdxStack__mediaCell">
                <motion.div
                  className="wdxStack__media"
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, ease: EASE }}
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

              <Grid item xs={12} md={6} className="wdxStack__copyCell">
                <div className="wdxStack__panel">
                  <span className="wdxStack__idx" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                    <em>/{String(webServiceTabData.length).padStart(2, "0")}</em>
                  </span>
                  <h3 className="wdxStack__title">{webTabItem.title}</h3>
                  <div
                    className="wdxStack__desc"
                    dangerouslySetInnerHTML={{ __html: webTabItem.Description }}
                  />
                </div>
              </Grid>
            </Grid>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default WebServiceTab;
