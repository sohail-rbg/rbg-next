"use client";

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

const reelTop = [img1, img2, img3, img4, img5, img6, img7, img8];
const reelBottom = [img9, img10, img11, img12, img13, img14, img15, img16];

const ReelColumn = ({ images, tone }) => (
  <div className={`svReel__col svReel__col--${tone}`}>
    <div className="svReel__strip">
      {[...images, ...images].map((src, index) => (
        <div className="svReel__tile" key={`${tone}-${index}`}>
          <NextImage
            alt=""
            src={src}
            fill
            sizes="(max-width: 767px) 42vw, 20vw"
            className="svReel__img"
          />
        </div>
      ))}
    </div>
  </div>
);

const WelcomeService = () => (
  <section className="serviceWelcomeSec svHero">
    <span className="svHero__aurora" aria-hidden="true" />
    <span className="svHero__grid" aria-hidden="true" />
    <span className="svHero__vignette" aria-hidden="true" />

    <div className="svHero__inner">
      <div className="svHero__copy">
        <SectionHeading
          subtitle="ReBrand Gurus"
          title="High Quality Projects"
          titleFontSize="clamp(42px, 5.2vw, 84px)"
          margin="14px 0 16px"
          description="Brand systems, websites and campaigns — designed, built and shipped in-house by a team that treats your growth like our own."
        />

        <div className="sv-inner__service-list-wrap">
          {capabilities.map((text, index) => (
            <motion.div
              key={text}
              className={`svCap svCap--${index + 1}`}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.75,
                delay: index * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className="svCap__idx" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="svCap__text">{text}</span>
              <span className="svCap__sweep" aria-hidden="true" />
            </motion.div>
          ))}
        </div>

        <a className="svHero__cue" href="#service-deck">
          <span className="svHero__cueLine" aria-hidden="true" />
          <span>Scroll the deck</span>
        </a>
      </div>

      <div className="svHero__reel service_top_marquee_box" aria-hidden="true">
        <ReelColumn images={reelTop} tone="up" />
        <ReelColumn images={reelBottom} tone="down" />
      </div>
    </div>
  </section>
);

export default WelcomeService;
