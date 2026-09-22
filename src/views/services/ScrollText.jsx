"use client";

// ScrollText.js
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

const ScrollText = () => {
  const containerRef = useRef(null);
  const [textItems, setTextItems] = useState(['Your scrolling text goes here.']);

  useEffect(() => {
    const container = containerRef.current;

    const duplicateText = () => {
      setTextItems((prevItems) => [...prevItems, `Another text item ${prevItems.length + 1}.`]);
    };

    const updateAnimation = () => {
      const texts = document.querySelectorAll('.scroll-text');
      const totalHeight = texts[0].offsetHeight * texts.length;

      gsap.to(container, {
        height: totalHeight,
        ease: 'none',
        duration: 0.5,
      });

      gsap.fromTo(
        texts,
        { y: '0%' },
        {
          y: `-${totalHeight}px`,
          ease: 'linear',
          duration: 5, // Adjust the duration of the animation
          repeat: -1, // Infinite repeat
          scrollTrigger: {
            trigger: container,
            start: 'top center',
            end: 'bottom center',
            scrub: true,
            onEnter: duplicateText,
          },
        }
      );
    };

    updateAnimation();

    window.addEventListener('resize', updateAnimation);

    return () => {
      window.removeEventListener('resize', updateAnimation);
    };
  }, [textItems]);

  return (
    <div className="scroll-text-container" ref={containerRef}>
      {textItems.map((text, index) => (
        <div key={index} className="scroll-text">
          <p>{text}</p>
        </div>
      ))}
    </div>
  );
};

export default ScrollText;
