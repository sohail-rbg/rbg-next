"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import NextImage from "./NextImage";
const items = [
  { id: 1, img: "https://picsum.photos/seed/a/400/600", title: "Item 1", detail: "Details about Item 1" },
  { id: 2, img: "https://picsum.photos/seed/b/400/600", title: "Item 2", detail: "Details about Item 2" },
  { id: 3, img: "https://picsum.photos/seed/c/400/600", title: "Item 3", detail: "Details about Item 3" },
  { id: 4, img: "https://picsum.photos/seed/d/400/600", title: "Item 4", detail: "Details about Item 4" },
  { id: 5, img: "https://picsum.photos/seed/e/400/600", title: "Item 5", detail: "Details about Item 5" },
  { id: 6, img: "https://picsum.photos/seed/f/400/600", title: "Item 6", detail: "Details about Item 6" },
  { id: 7, img: "https://picsum.photos/seed/g/400/600", title: "Item 7", detail: "Details about Item 7" },
];

const OVERLAP = 0.25;
const ROTATION = 45;
const DELAY = 0.25; // seconds for gsap
const SCALE = 1.7;
const SWIPE = 75; // min pixels for swipe

const AddressCrousel = () => {
  const [currentIndex, setCurrentIndex] = useState(Math.floor(items.length / 2));
  const [selectedIndex, setSelectedIndex] = useState(null);
  const contentRefs = useRef([]);

  // Refactored flow function with useCallback
  const flow = useCallback(() => {
    contentRefs.current.forEach((el, i) => {
      if (!el) return;

      const offset = el.clientWidth * OVERLAP;
      let transform = "";
      let zIndex = "";

      if (i < currentIndex) {
        transform = `translateX(-${offset * (currentIndex - i)}%) rotateY(${ROTATION}deg)`;
        zIndex = i;
      } else if (i === currentIndex) {
        transform = "rotateY(0deg) translateZ(140px)";
        zIndex = items.length;
      } else {
        transform = `translateX(${offset * (i - currentIndex)}%) rotateY(-${ROTATION}deg)`;
        zIndex = items.length - i;
      }

      gsap.to(el, { transform, zIndex, duration: DELAY, ease: "power2.out" });
      el.classList.toggle("current", i === currentIndex);
    });
  }, [currentIndex]);

  const flip = (show) => {
    const el = contentRefs.current[currentIndex];
    if (!el) return;

    if (show && selectedIndex !== currentIndex) {
      setSelectedIndex(currentIndex);
      gsap.to(el, {
        transform: `rotateY(180deg) rotateZ(90deg) scale(${SCALE})`,
        duration: DELAY,
        ease: "power2.out",
      });
    } else if (!show && selectedIndex !== null) {
      gsap.to(el, {
        transform: "rotateY(0deg)",
        duration: DELAY,
        ease: "power2.out",
        onComplete: () => setSelectedIndex(null),
      });
    }
  };

  const handleKeyDown = useCallback((e) => {
    const { key } = e;
    if (key === "ArrowLeft") {
      flip(false) || movePrev();
    } else if (key === "ArrowRight") {
      flip(false) || moveNext();
    } else if (key === "Enter") {
      flip(true);
    } else if (key === "Backspace" || key === "Escape") {
      flip(false);
    }
  }, [currentIndex, selectedIndex]);

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const moveNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleSelect = (i) => {
    if (i === currentIndex) {
      flip(true);
    } else {
      flip(false);
      setCurrentIndex(i);
    }
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("coverflow")) {
      flip(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mouseup", handleOutsideClick);
    flow();
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mouseup", handleOutsideClick);
    };
  }, [currentIndex, handleKeyDown, flow]);

  // Swipe support
  useEffect(() => {
    let touchStart = 0;

    const handleTouchStart = (e) => {
      touchStart = e.changedTouches[0].screenX;
    };
    const handleTouchEnd = (e) => {
      const moved = touchStart - e.changedTouches[0].screenX;
      if (moved > SWIPE) moveNext();
      if (moved < -SWIPE) movePrev();
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <div className="coverflow">
      {items.map((item, i) => (
        <div
          key={item.id}
          className={`content ${currentIndex === i ? "current" : ""} ${selectedIndex === i ? "selected" : ""}`}
          ref={(el) => (contentRefs.current[i] = el)}
          onClick={() => handleSelect(i)}
        >
          <div className="front">
            <NextImage src={item.img} alt={item.title} width={400} height={600} />
            <div className="info">
              <p>{item.title}</p>
            </div>
          </div>
          <div className="back">
            <h2>{item.detail}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddressCrousel;
