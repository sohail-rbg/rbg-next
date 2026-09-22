"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WelcomeService from "./services/servicePage/WelcomeService";
import Testimonials from "./services/Testimonials";
import { Box, Container } from "@mui/material";
import ServiceCard from "./services/servicePage/ServiceCard";

import { ServicesPageData } from "../Data";
gsap.registerPlugin(ScrollTrigger);

const ServicePage = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    const media = gsap.matchMedia();

    media.add("(min-width: 768px)", () => {
      const cards = cardsRef.current.filter(Boolean);
      if (!cards.length) return undefined;

      const stickDistance = 0;
      const triggers = [];
      const tweens = [];

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
          })
        );
      });

      return () => {
        triggers.forEach((trigger) => trigger.kill());
        tweens.forEach((tween) => tween.kill());
      };
    });

    return () => media.revert();
  }, []);

  return (
    <>
      <WelcomeService />
      <Box component={"section"} bgcolor={"#1c1d1c"} className="cardStacking">
        <Container>
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="cardStacking__cards">
                <div
                  className="stackCard"
                  ref={(el) => (cardsRef.current[0] = el)}
                >
                  <ServiceCard data={ServicesPageData.services[0]} />
                </div>

                <div
                  className="stackCard"
                  ref={(el) => (cardsRef.current[1] = el)}
                >
                  <ServiceCard data={ServicesPageData.services[1]} />
                </div>

                <div
                  className="stackCard"
                  ref={(el) => (cardsRef.current[2] = el)}
                >
                  <ServiceCard data={ServicesPageData.services[2]} />
                </div>
                <div
                  className="stackCard"
                  ref={(el) => (cardsRef.current[3] = el)}
                >
                  <ServiceCard data={ServicesPageData.services[3]} />
                </div>
                <div
                  className="stackCard"
                  ref={(el) => (cardsRef.current[4] = el)}
                >
                  <ServiceCard data={ServicesPageData.services[4]} />
                </div>
                <div
                  className="stackCard"
                  ref={(el) => (cardsRef.current[5] = el)}
                >
                  <ServiceCard data={ServicesPageData.services[5]} />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Box>
      <section className="spacer"></section>

      <Container>
        <Testimonials />
      </Container>
    </>
  );
};

export default ServicePage;
