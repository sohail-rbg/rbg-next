"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap/all';
const GalleryWork = () => {
  const elementsWorks = useRef([]);
  const slidePicWorks = useRef(null);
  const slidePicsWorks = useRef(null);

  useEffect(() => {
    gsap.set(slidePicWorks.current, { autoAlpha: 0 });

    elementsWorks.current.forEach((element, index) => {
      element.addEventListener("mouseenter", () => {
        gsap.to(slidePicsWorks.current, {
          marginTop: `-${280 * index}px`,
          duration: 0.2,
          ease: "power1"
        });
      });

      element.addEventListener("mouseleave", () => {
        gsap.to(element, { color: "initial", duration: 0.2, ease: "power1" });
      });
    });

    const handleMouseMove = (e) => {
      gsap.to(slidePicWorks.current, {
        top: `${e.clientY}px`,
        left: `${e.clientX}px`,
        xPercent: -20,
        yPercent: -45,
        duration: 0.2,
        ease: "power1"
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    const itemsWorks = document.querySelector(".items-works");
    itemsWorks.addEventListener("mouseenter", () => {
      gsap.to(slidePicWorks.current, {
        autoAlpha: 1,
        duration: 0.2,
        ease: "power1"
      });
    });

    itemsWorks.addEventListener("mouseleave", () => {
      gsap.to(slidePicWorks.current, {
        autoAlpha: 0,
        duration: 0.2,
        ease: "power1"
      });
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="works">
      <div className="container-works">
        <div className="content-works">
          <div className="header-works">
            <h3>Recent Work</h3>
          </div>

          <div id="gallery-work">
            <div id="work-images" ref={slidePicsWorks}>
              <div className="work-image" style={{
                backgroundImage: "url('https://images.pexels.com/photos/14696910/pexels-photo-14696910.jpeg')"
              }}></div>
              <div className="work-image" style={{
                backgroundImage: "url('https://images.pexels.com/photos/8969179/pexels-photo-8969179.jpeg')"
              }}></div>
              <div className="work-image" style={{
                backgroundImage: "url('https://images.pexels.com/photos/16677943/pexels-photo-16677943.jpeg')"
              }}></div>
            </div>
          </div>

          <div className="items-works" ref={slidePicWorks}>
            <div className="grid-works" ref={(el) => (elementsWorks.current[0] = el)}>
              <div className="item-work">
                <div className="title">
                  <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h4>
                </div>
              </div>
            </div>

            <div className="grid-works" ref={(el) => (elementsWorks.current[1] = el)}>
              <div className="item-work">
                <div className="title">
                  <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h4>
                </div>
              </div>
            </div>

            <div className="grid-works" ref={(el) => (elementsWorks.current[2] = el)}>
              <div className="item-work">
                <div className="title">
                  <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GalleryWork;
