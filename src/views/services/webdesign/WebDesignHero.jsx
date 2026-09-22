"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import EastIcon from "@mui/icons-material/East";
import CustomButton from "../../../components/CustomButton";
import NextImage from "../../../components/NextImage";

const EASE = [0.22, 1, 0.36, 1];

const WebDesignHero = ({ service }) => {
  const slides = (service?.sliderImage || []).filter(Boolean);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return undefined;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="wdxHero">
      <span className="wdxHero__aurora" aria-hidden="true" />
      <span className="wdxHero__grid" aria-hidden="true" />
      <span className="wdxHero__vignette" aria-hidden="true" />

      <div className="wdxHero__inner">
        <motion.div
          className="wdxHero__copy"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <span className="wdxHero__eyebrow">
            <i aria-hidden="true" />
            Service
          </span>
          <h1 className="wdxHero__title">{service?.mainHeading}</h1>
          <div className="wdxHero__brief" data-lenis-prevent>
            <p>{service?.description}</p>
          </div>
          <div className="wdxHero__actions">
            <CustomButton endIcon={<EastIcon />} margin="0">
              Get a Quote
            </CustomButton>
          </div>
        </motion.div>

        <div className="wdxHero__stage">
          <div className="wdxHero__frames">
            {slides.map((src, index) => (
              <div
                className={`wdxHero__frame${index === active ? " is-active" : ""}`}
                key={`frame-${index}`}
                style={{ "--wdx-delay": `${index * 0.6}s` }}
              >
                <NextImage
                  src={src}
                  alt={index === 0 ? service?.mainHeading || "" : ""}
                  fill
                  sizes="(max-width: 1023px) 92vw, 46vw"
                  priority={index === 0}
                  className="wdxHero__img"
                />
                <span className="wdxHero__frameTint" aria-hidden="true" />
              </div>
            ))}
            <span className="wdxHero__scan" aria-hidden="true" />
          </div>

          {slides.length > 1 && (
            <div className="wdxHero__chips">
              {slides.map((src, index) => (
                <button
                  type="button"
                  key={`chip-${index}`}
                  className={`wdxHero__chip${index === active ? " is-active" : ""}`}
                  onClick={() => setActive(index)}
                  aria-label={`Show image ${index + 1}`}
                  aria-pressed={index === active}
                >
                  <NextImage
                    src={src}
                    alt=""
                    fill
                    sizes="140px"
                    className="wdxHero__chipImg"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default WebDesignHero;
