"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "../../../components/SectionHeading";
import NextImage from "../../../components/NextImage";
import img1 from "../../../images/services/service/1.png";
import img2 from "../../../images/services/service/2.png";
import img3 from "../../../images/services/service/3.png";
import img4 from "../../../images/services/service/4.png";
import img5 from "../../../images/services/service/5.png";
import img6 from "../../../images/services/service/6.png";
import img7 from "../../../images/services/service/7.png";
import img8 from "../../../images/services/service/8.png";
import img9 from "../../../images/services/service/9.png";
import img10 from "../../../images/services/service/10.png";
import img11 from "../../../images/services/service/11.png";
import img12 from "../../../images/services/service/12.png";
import img13 from "../../../images/services/service/13.png";
import img14 from "../../../images/services/service/14.png";
import img15 from "../../../images/services/service/15.png";
import img16 from "../../../images/services/service/16.png";

const capabilities = [
  "Specialized Design Enhancement Protocol",
  "Over 200 Websites in the SME Sector",
  "Exquisite Visual Optimization",
];

const strip = [
  img1, img2, img3, img4, img5, img6, img7, img8,
  img9, img10, img11, img12, img13, img14, img15, img16,
];

const ease = [0.22, 1, 0.36, 1];

const WelcomeService = ({ services = [] }) => {
  const [hovered, setHovered] = useState(null);

  const jumpTo = (event, index) => {
    const target = document.getElementById(`sv-deck-${index + 1}`);
    if (!target) return;
    event.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "center",
    });
  };

  return (
    <section className="serviceWelcomeSec" id="sv-top">
      <div className="svHero__inner">
        <div className="svHero__copy">
          <SectionHeading
            subtitle="ReBrand Gurus"
            title="Six Ways We Grow Brands"
            titleFontSize="clamp(40px, 5vw, 82px)"
            margin="14px 0 18px"
            description="Brand systems, websites and campaigns — designed, built and shipped in-house by a team that treats your growth like our own."
          />

          <div className="svCaps">
            {capabilities.map((text, index) => (
              <motion.div
                className="svCap"
                key={text}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: index * 0.1, ease }}
              >
                <span className="svCap__num" aria-hidden="true">
                  {`0${index + 1}`}
                </span>
                <span className="svCap__text">{text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <nav
          className="svIndex"
          aria-label="Services index"
          onMouseLeave={() => setHovered(null)}
        >
          {services.map((service, index) => (
            <a
              className={`svIndex__row${hovered === index ? " is-hot" : ""}`}
              key={service.id}
              href={`#sv-deck-${index + 1}`}
              onClick={(event) => jumpTo(event, index)}
              onMouseEnter={() => setHovered(index)}
            >
              <span className="svIndex__num">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="svIndex__name">{service.title}</span>
              <span className="svIndex__arrow" aria-hidden="true">
                →
              </span>
            </a>
          ))}
        </nav>
      </div>

      <div className="svStrip" aria-hidden="true">
        <div className="svStrip__track">
          {[...strip, ...strip].map((src, index) => (
            <span className="svStrip__tile" key={index}>
              <NextImage
                src={src}
                alt=""
                fill
                sizes="220px"
                className="svStrip__img"
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WelcomeService;
