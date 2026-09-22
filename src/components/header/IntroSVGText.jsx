"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
// import WebFont from 'webfontloader';
const Intro = () => {
  const circlesRef = useRef(null);
  const frameRef = useRef(null);
  const contentRef = useRef(null);
  const enterCtrlRef = useRef(null);
  const enterBackgroundRef = useRef(null);

  useEffect(() => {
  

    // Random number generator
    // const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

    // Intro animation setup
    const setupIntro = () => {
      gsap.set([circlesRef.current, contentRef.current.children, frameRef.current.children], { opacity: 0 });
      gsap.set(enterCtrlRef.current, { pointerEvents: 'none' });
    };

    // Initialize intro events
    const initIntroEvents = () => {
      const enterMouseEnterEv = () => {
        gsap.killTweensOf([enterBackgroundRef.current, circlesRef.current]);

        gsap.to(enterBackgroundRef.current, {
          duration: 1.3,
          ease: 'expo',
          scale: 1.4
        });

        gsap.to(circlesRef.current, {
          duration: 0.5,
          ease: 'expo',
          rotation: '+=120',
          scale: 0.5,
          opacity: 0.2,
          stagger: {
            amount: -0.15
          }
        });
      };

      const enterMouseLeaveEv = () => {
        gsap.to(enterBackgroundRef.current, {
          duration: 2,
          ease: 'elastic.out(1, 0.4)',
          scale: 1
        });

        gsap.to(circlesRef.current, {
          duration: 2,
          ease: 'elastic.out(1, 0.4)',
          scale: 1,
          rotation: '-=120',
          opacity: 1,
          stagger: {
            amount: 0.15
          }
        });
      };

      enterCtrlRef.current.addEventListener('mouseenter', enterMouseEnterEv);
      enterCtrlRef.current.addEventListener('mouseleave', enterMouseLeaveEv);

      const enterClickEv = () => enter();
      enterCtrlRef.current.addEventListener('click', enterClickEv);
    };

    // Start intro animation
    const startIntro = () => {
      gsap.timeline()
        .addLabel('start', 0)
        .to(circlesRef.current, {
          duration: 3,
          ease: 'expo.inOut',
          rotation: 90,
          stagger: {
            amount: 0.4
          }
        }, 'start')
        .to([circlesRef.current, enterCtrlRef.current], {
          duration: 3,
          ease: 'expo.inOut',
          startAt: { opacity: 0, scale: 0.8 },
          scale: 1,
          opacity: 1,
          stagger: {
            amount: 0.4
          }
        }, 'start')
        .add(() => {
          gsap.set(enterCtrlRef.current, { pointerEvents: 'auto' });
        }, 'start+=2');
    };

    // Enter animation
    const enter = () => {
      gsap.timeline()
        .addLabel('start', 0)
        .to(enterCtrlRef.current, {
          duration: 0.6,
          ease: 'back.in',
          scale: 0.2,
          opacity: 0
        }, 'start')
        .to(circlesRef.current, {
          duration: 0.8,
          ease: 'back.in',
          scale: 1.6,
          opacity: 0,
          rotation: '-=20',
          stagger: {
            amount: 0.3
          }
        }, 'start')
        .to([contentRef.current.children, frameRef.current.children], {
          duration: 0.8,
          ease: 'back.out',
          startAt: { opacity: 0, scale: 0.8 },
          scale: 1,
          opacity: 1,
          stagger: {
            amount: 0.2
          }
        }, 'start+=1');
    };

    // Main setup
    setupIntro();
    initIntroEvents();
    startIntro();
  }, []);

  return (
    <main className='introMain'>
      <svg ref={circlesRef} className="circles" width="100%" height="100%" viewBox="0 0 1400 1400">
        <defs>
          <path id="circle-1" d="M250,700.5A450.5,450.5 0 1 11151,700.5A450.5,450.5 0 1 1250,700.5" />
          <path id="circle-2" d="M382,700.5A318.5,318.5 0 1 11019,700.5A318.5,318.5 0 1 1382,700.5" />
          <path id="circle-3" d="M487,700.5A213.5,213.5 0 1 1914,700.5A213.5,213.5 0 1 1487,700.5" />
          <path id="circle-4" d="M567.5,700.5A133,133 0 1 1833.5,700.5A133,133 0 1 1567.5,700.5" />
        </defs>
        <text className="circles__text circles__text--1">
          <textPath className="circles__text-path" xlinkHref="#circle-1" aria-label="" textLength="2830">Let life begin I've cleansed all my sins&nbsp;</textPath>
        </text>
        <text className="circles__text circles__text--2">
          <textPath className="circles__text-path" xlinkHref="#circle-2" aria-label="" textLength="2001">Burn all the money absolve all the lies&nbsp;</textPath>
        </text>
        <text className="circles__text circles__text--3">
          <textPath className="circles__text-path" xlinkHref="#circle-3" aria-label="" textLength="1341">We are caged in simulations&nbsp;</textPath>
        </text>
        <text className="circles__text circles__text--4">
          <textPath className="circles__text-path" xlinkHref="#circle-4" aria-label="" textLength="836">But something has changed in us&nbsp;</textPath>
        </text>
      </svg>
      <div ref={frameRef} className="frame">
        <h1 className="frame__title">sa</h1>
        
      </div>
      <div ref={contentRef} className="content">
        <p>Wdnnovations.</p>
      </div>
      <button ref={enterCtrlRef} className="enter">
        <div ref={enterBackgroundRef} className="enter__bg"></div>
        <span className="enter__text">Enter</span>
      </button>
    </main>
  );
};

export default Intro;
