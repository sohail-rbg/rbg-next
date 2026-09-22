"use client";

import React from "react";

const AboutNavigation = () => {
  const handlePress = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute("href")?.split("#")[1];
    if (targetId) {
      const targetElement = window.document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <ul className="navigation_link-wrapper">
      <li className="active">
        <a onClick={handlePress} href="#rbgEra">
          <div data-to-scrollspy-id="rbgEra" className="ss-item">
            The RBG Era
          </div>
        </a>
      </li>
     
      <li>
        <a onClick={handlePress} href="#ourvision">
          <div data-to-scrollspy-id="ourvision" className="ss-item">
            Our Vision
          </div>
        </a>
      </li>
      <li>
        <a onClick={handlePress} href="#testimonialSec">
          <div data-to-scrollspy-id="testimonialSec" className="ss-item">
            Testimonial
          </div>
        </a>
      </li>
      <li>
        <a onClick={handlePress} href="#buildwithrbg">
          <div data-to-scrollspy-id="buildwithrbg" className="ss-item">
            Build with RBG
          </div>
        </a>
      </li>
    </ul>
  );
};

export default AboutNavigation;
