"use client";

import gsap from "gsap";

// OPEN MENU
export const staggerReveal = (node1, node2) => {
  const targets = [node1, node2].filter(Boolean);
  gsap.killTweensOf(targets);

  return gsap.fromTo(targets, {
    height: 0,
    skewY: 2,
  }, {
    duration: 0.8,
    height: "100%",
    skewY: 0,
    transformOrigin: "right top",
    ease: "power3.inOut",
    stagger: {
      amount: 0.1
    }
  });
};

// CLOSE MENU
export const staggerRevealClose = (node1, node2, onComplete) => {
  const targets = [node1, node2].filter(Boolean);
  gsap.killTweensOf(targets);

  return gsap.to(targets, {
    duration: 0.8,
    height: 0,
    ease: "power3.inOut",
    stagger: {
      amount: 0.07
    },
    onComplete,
  });
};

// STAGGER THE LINKS TO APPEAR
export const staggerText = (...nodes) => {
  const targets = nodes.flat().filter(Boolean);
  gsap.killTweensOf(targets);

  return gsap.fromTo(targets, {
    y: 100,
    opacity: 0,
  }, {
    duration: 0.8,
    y: 0,
    opacity: 1,
    delay: 0.1,
    ease: "power3.inOut",
    stagger: {
      amount: 0.3
    }
  });
};

// Fade up for the additonal info on our menu
export const fadeInUp = node => {
  gsap.fromTo(node, {
    y: 60,
    opacity: 0,
  }, {
    y: 0,
    opacity: 1,
    duration: 1,
    delay: 0.2,
    ease: "power3.inOut"
  });
};
export const fadeInDown = node => {
  gsap.fromTo(node, {
    y: -100,
    opacity: 0,
  }, {
    y: 0,
    opacity: 1,
    duration: 1,
    delay: 0.2,
    ease: "power3.inOut"
  });
};

// Hover on the link
export const handleHover = e => {
  gsap.to(e.currentTarget, {
    duration: 0.3,
    y: 3,
    skewX: 4,
    ease: "power1.inOut",
    overwrite: "auto"
  });
};

// Hover off the link
export const handleHoverExit = e => {
  gsap.to(e.currentTarget, {
    duration: 0.3,
    y: 0,
    skewX: 0,
    ease: "power1.inOut",
    overwrite: "auto"
  });
};

// adds city image once you hover on
export const handleCity = (city, target) => {
  gsap.to(target, {
    duration: 0,
    background: `url(${city}) center center`
  });
  gsap.to(target, {
    duration: 0.4,
    opacity: 1,
    ease: "power3.inOut"
  });
  gsap.from(target, {
    duration: 0.4,
    skewY: 2,
    transformOrigin: "right top"
  });
};

// Removes the city image once you hover off
export const handleCityReturn = target => {
  gsap.to(target, {
    duration: 0,
    skewY: 0
  });
  gsap.to(target, {
    duration: 0.4,
    opacity: 0,
    skewY: 0
  });
};
