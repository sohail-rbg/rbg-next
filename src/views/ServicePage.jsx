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
  const hudItemsRef = useRef([]);

  useEffect(() => {
    const media = gsap.matchMedia();

    media.add("(min-width: 768px)", () => {
      const cards = cardsRef.current.filter(Boolean);
      if (!cards.length) return undefined;

      const hud = hudRef.current;
      const items = hudItemsRef.current.filter(Boolean);
      const activeFlags = new Array(cards.length).fill(false);
      const triggers = [];
      const tweens = [];

      // top-of-deck card + index rail follow the pin position
      const syncDeckState = () => {
        let current = -1;
        activeFlags.forEach((isOn, i) => {
          if (isOn) current = Math.max(current, i);
        });

        cards.forEach((card, i) => {
          card.classList.toggle("is-top", i === current);
          card.classList.toggle("is-back", current > -1 && i < current);
        });

        items.forEach((item, i) => {
          item.classList.toggle("is-on", i === current);
          item.classList.toggle("is-done", current > -1 && i < current);
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
            end: () => lastCardST.start,
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

      if (deckRef.current) {
        triggers.push(
          ScrollTrigger.create({
            trigger: deckRef.current,
            start: "top 74%",
            end: "bottom 30%",
            onToggle: (self) => {
              if (hud) hud.classList.toggle("is-live", self.isActive);
            },
          })
        );
      }

      return () => {
        triggers.forEach((trigger) => trigger.kill());
        tweens.forEach((tween) => tween.kill());
        cards.forEach((card) => card.classList.remove("is-top", "is-back"));
        items.forEach((item) => item.classList.remove("is-on", "is-done"));
        if (hud) hud.classList.remove("is-live");
      };
    });

    return () => media.revert();
  }, []);

  return (
    <>
      <WelcomeService services={deckServices} />

      <section className="cardStacking" id="service-deck" ref={deckRef}>
        <div className="deckHead">
          <SectionHeading
            subtitle="The Deck"
            title="Service by Service"
            titleFontSize="clamp(32px, 3.6vw, 62px)"
            margin="12px 0 14px"
            align="center"
            description="Six disciplines, one team. Scroll to deal through everything we build — or jump in from the index above."
          />
        </div>

        <div className="deckWrap">
          <div className="cardStacking__cards">
            {deckServices.map((service, index) => (
              <div
                className="stackCard"
                key={service.id}
                id={`sv-deck-${index + 1}`}
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

        <div className="deckHud" ref={hudRef} aria-hidden="true">
          <span className="deckHud__label">Index</span>
          <ul className="deckHud__list">
            {deckServices.map((service, index) => (
              <li
                className="deckHud__item"
                key={service.id}
                ref={(el) => (hudItemsRef.current[index] = el)}
              >
                <span className="deckHud__num">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="deckHud__name">{service.title}</span>
                <span className="deckHud__dot" />
              </li>
            ))}
          </ul>
          <span className="deckHud__total">{`${totalLabel} Services`}</span>
        </div>
      </section>

      <section className="svCta">
        <div className="svCta__inner">
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

      <section className="svWords">
        <div className="svWords__head">
          <SectionHeading
            subtitle="Testimonials"
            title="What Our Clients Say"
            titleFontSize="clamp(32px, 3.4vw, 56px)"
            margin="12px 0 18px"
            align="center"
          />
        </div>
        <div className="svWords__inner">
          <Testimonials />
        </div>
      </section>
    </>
  );
};

export default ServicePage;
