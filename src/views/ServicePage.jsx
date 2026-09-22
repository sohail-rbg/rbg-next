"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EastIcon from "@mui/icons-material/East";
import WelcomeService from "./services/servicePage/WelcomeService";
import Testimonials from "./services/Testimonials";
import SectionHeading from "../components/SectionHeading";
import CustomButton from "../components/CustomButton";
import ServiceCard from "./services/servicePage/ServiceCard";

import { ServicesPageData } from "../Data";
gsap.registerPlugin(ScrollTrigger);

const deckServices = ServicesPageData.services.slice(0, 6);
const totalLabel = String(deckServices.length).padStart(2, "0");

const ServicePage = () => {
  const cardsRef = useRef([]);
  const deckRef = useRef(null);
  const hudRef = useRef(null);
  const hudFillRef = useRef(null);
  const hudDotsRef = useRef([]);

  useEffect(() => {
    const media = gsap.matchMedia();

    media.add("(min-width: 768px)", () => {
      const cards = cardsRef.current.filter(Boolean);
      if (!cards.length) return undefined;

      const hud = hudRef.current;
      const dots = hudDotsRef.current.filter(Boolean);
      const activeFlags = new Array(cards.length).fill(false);
      const stickDistance = 0;
      const triggers = [];
      const tweens = [];

      // Keeps the "top of the deck" card and the side rail in sync with the pin.
      const syncDeckState = () => {
        let current = -1;
        activeFlags.forEach((isOn, i) => {
          if (isOn) current = Math.max(current, i);
        });

        cards.forEach((card, i) => {
          card.classList.toggle("is-top", i === current);
          card.classList.toggle("is-back", current > -1 && i < current);
        });

        dots.forEach((dot, i) => {
          dot.classList.toggle("is-on", i === current);
          dot.classList.toggle("is-done", current > -1 && i < current);
        });
      };

      const lastCardST = ScrollTrigger.create({
        trigger: cards[cards.length - 1],
        start: "center center",
      });
      triggers.push(lastCardST);

      cards.forEach((card, index) => {
        const scale = 1 - (cards.length - index) * 0.005;
        const translateX = index * 20;
        const scaleDown = gsap.to(card, {
          scale,
          x: translateX,
          transformOrigin: "50% 50%",
        });

        tweens.push(scaleDown);
        triggers.push(
          ScrollTrigger.create({
            trigger: card,
            start: "center center",
            end: () => lastCardST.start + stickDistance,
            pin: true,
            pinSpacing: false,
            ease: "none",
            animation: scaleDown,
            toggleActions: "restart none none reverse",
            onToggle: (self) => {
              activeFlags[index] = self.isActive;
              syncDeckState();
            },
          })
        );
      });

      // Drives the fixed deck rail: fade in with the section, fill with progress.
      if (deckRef.current) {
        triggers.push(
          ScrollTrigger.create({
            trigger: deckRef.current,
            start: "top 72%",
            end: "bottom 32%",
            onToggle: (self) => {
              if (hud) hud.classList.toggle("is-live", self.isActive);
            },
            onUpdate: (self) => {
              if (hudFillRef.current) {
                hudFillRef.current.style.transform = `scaleY(${Math.max(
                  0.02,
                  self.progress
                ).toFixed(3)})`;
              }
            },
          })
        );
      }

      return () => {
        triggers.forEach((trigger) => trigger.kill());
        tweens.forEach((tween) => tween.kill());
        cards.forEach((card) => card.classList.remove("is-top", "is-back"));
        dots.forEach((dot) => dot.classList.remove("is-on", "is-done"));
        if (hud) hud.classList.remove("is-live");
        if (hudFillRef.current) hudFillRef.current.style.transform = "";
      };
    });

    return () => media.revert();
  }, []);

  return (
    <>
      <WelcomeService />

      <section className="cardStacking deckSection" id="service-deck" ref={deckRef}>
        <span className="deckSection__aurora" aria-hidden="true" />
        <span className="deckSection__grain" aria-hidden="true" />

        <div className="deckSection__head">
          <SectionHeading
            subtitle="Our Services"
            title="The Service Deck"
            titleFontSize="clamp(38px, 4.6vw, 74px)"
            margin="12px 0 16px"
            align="center"
            description="Six disciplines, one team. Scroll to deal through everything we build."
          />
        </div>

        <div className="deckWrap">
          <div className="deckHud" ref={hudRef} aria-hidden="true">
            <div className="deckHud__track">
              <span className="deckHud__fill" ref={hudFillRef} />
            </div>
            <ul className="deckHud__list">
              {deckServices.map((service, index) => (
                <li
                  key={service.id}
                  className="deckHud__item"
                  ref={(el) => (hudDotsRef.current[index] = el)}
                >
                  <span className="deckHud__dot" />
                  <span className="deckHud__num">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="deckHud__label">{service.title}</span>
                </li>
              ))}
            </ul>
            <span className="deckHud__total">{`${totalLabel} Services`}</span>
          </div>

          <div className="cardStacking__cards">
            {deckServices.map((service, index) => (
              <div
                key={service.id}
                className="stackCard"
                data-deck-index={index + 1}
                ref={(el) => (cardsRef.current[index] = el)}
              >
                <ServiceCard
                  data={service}
                  index={index + 1}
                  total={deckServices.length}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="deckCta">
        <span className="deckCta__glow" aria-hidden="true" />
        <div className="deckCta__inner">
          <SectionHeading
            subtitle="Request A Quote"
            title="Grow Your Brand Online With ReBrand Gurus"
            titleFontSize="clamp(32px, 3.6vw, 58px)"
            margin="12px 0 8px"
            align="center"
          />
          <CustomButton
            component="a"
            link="/contact-us"
            margin="22px 0 0"
            endIcon={<EastIcon />}
          >
            Request a Quote
          </CustomButton>
        </div>
      </section>

      <section className="deckWords">
        <div className="deckWords__inner">
          <SectionHeading
            subtitle="Testimonials"
            title="What Our Clients Say"
            titleFontSize="clamp(32px, 3.4vw, 56px)"
            margin="12px 0 18px"
            align="center"
          />
          <Testimonials />
        </div>
      </section>
    </>
  );
};

export default ServicePage;
