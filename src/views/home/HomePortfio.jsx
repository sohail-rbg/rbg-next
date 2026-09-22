"use client";

import React, { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import NextImage from '../../components/NextImage';
const HomePortfolio = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let cards = gsap.utils.toArray(".card");
    let stackHeight = window.innerHeight * 0.25;

    cards.forEach((card, i) => {
      gsap.fromTo(card.querySelector("img"), {
        scale: 1,
        transformOrigin: "center top",
        filter: "blur(0px)",
      }, {
        y: gsap.utils.mapRange(1, cards.length, -20, -stackHeight + 20, cards.length - i),
        scale: gsap.utils.mapRange(1, cards.length, 0.4, 0.9, i),
        filter: "blur(" + gsap.utils.mapRange(1, cards.length, 4, 25, cards.length - i) + "px)",
        scrollTrigger: {
          trigger: card,
          scrub: true,
          start: "top " + stackHeight,
          end: "+=" + window.innerHeight * 2,
          invalidateOnRefresh: true
        }
      });
      ScrollTrigger.create({
        trigger: card,
        pin: true,
        start: "top " + stackHeight,
        endTrigger: ".following-content", 
        end: "top " + (stackHeight + 100),
        pinSpacing: false,
        invalidateOnRefresh: true
      });
    });
  }, []); 

  return (
    <>
      <div className="spacer"></div>
      <div className="container">
        <div className="cards">
          <div className="card">
            <NextImage src="https://placekitten.com/g/1920/1080" alt="Kitten" width={1920} height={1080} />
          </div>
          <div className="card">
            <NextImage src="https://placekitten.com/g/1920/1080" alt="Kitten" width={1920} height={1080} />
          </div>
          <div className="card">
            <NextImage src="https://placekitten.com/g/1920/1080" alt="Kitten" width={1920} height={1080} />
          </div>
          <div className="card">
            <NextImage src="https://placekitten.com/g/1920/1080" alt="Kitten" width={1920} height={1080} />
          </div>
          <div className="card">
            <NextImage src="https://placekitten.com/g/1920/1080" alt="Kitten" width={1920} height={1080} />
          </div>
        </div>
      </div>
      <div className="following-content">
        More content her
      </div>
      <div className="spacer black"></div>
      <div className="spacer black"></div>
      <div className="spacer black"></div> 
    </>
  );
}

export default HomePortfolio;
