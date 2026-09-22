"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/**
 * SmoothMotion — page-scoped scroll polish for the Website Redesign Services page.
 *
 * Adds, only inside `.servicePageWrp--wd` and only when motion is welcome:
 *  - inertial smooth scrolling (Lenis, wired into the GSAP ticker + ScrollTrigger)
 *  - a section rail that glides to each block on click
 *  - word-by-word masked heading reveals
 *  - scroll-linked parallax on the plain (non-animated) stage pieces
 *  - a ribbon whose speed and direction follow the scroll velocity
 *  - counting-up skill percentages
 *  - pointer spotlights on the service + work cards
 *
 * Everything is additive: without JS (or under prefers-reduced-motion) the page
 * renders exactly as before, and every listener/animation is torn down on unmount.
 */

const SECTIONS = [
  { selector: ".wdxHero", label: "Intro" },
  { selector: ".wdxIntro", label: "Overview" },
  { selector: ".wdxStackWrp", label: "Services" },
  { selector: ".wdxSkills", label: "Skills" },
  { selector: ".wdxProcess", label: "Process" },
  { selector: ".wdxWork", label: "Work" },
  { selector: ".testimonial-slider", label: "Reviews" },
  { selector: ".serviceFaqSection", label: "FAQs" },
];

const PARALLAX = [
  {
    selector: ".wdxHero__stage",
    trigger: ".wdxHero",
    start: "top top",
    from: { yPercent: 0, scale: 1 },
    to: { yPercent: 9, scale: 0.975 },
  },
  {
    selector: ".wdxProcess__rotor",
    trigger: ".wdxProcess",
    from: { yPercent: -7 },
    to: { yPercent: 7 },
  },
];

const splitHeading = (el) => {
  if (el.dataset.wdSplit === "1") return null;
  const words = el.textContent.trim().split(/\s+/);
  if (words.length < 2) return null;

  el.textContent = "";
  const frag = document.createDocumentFragment();
  words.forEach((word) => {
    const mask = document.createElement("span");
    const inner = document.createElement("span");
    mask.className = "wdSplit";
    inner.className = "wdSplit__in";
    inner.textContent = word;
    mask.appendChild(inner);
    frag.appendChild(mask);
    frag.appendChild(document.createTextNode(" "));
  });
  el.appendChild(frag);
  el.dataset.wdSplit = "1";
  return el.querySelectorAll(".wdSplit__in");
};

const SmoothMotion = () => {
  useEffect(() => {
    const root = document.querySelector(".servicePageWrp--wd");
    if (!root) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const triggers = [];
    const tweens = [];
    const cleanups = [];
    let ribbonTween = null;

    /* ---- inertial smooth scrolling --------------------------------------- */
    const lenis = new Lenis({
      lerp: 0.12,
      wheelMultiplier: 1,
      smoothWheel: true,
      syncTouch: false,
      autoRaf: false,
    });

    const onScroll = ({ velocity }) => {
      ScrollTrigger.update();
      if (!ribbonTween) return;
      const speed = Math.min(3, 1 + Math.abs(velocity) * 0.007);
      ribbonTween.timeScale((velocity < 0 ? -1 : 1) * speed);
    };
    lenis.on("scroll", onScroll);

    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // hold the glide while the site menu has the page locked
    const syncLock = () => {
      if (document.documentElement.classList.contains("rbg-menu-open")) {
        lenis.stop();
      } else {
        lenis.start();
      }
    };
    const lockObserver = new MutationObserver(syncLock);
    lockObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    syncLock();

    root.classList.add("wdSmooth");

    /* ---- ribbon rides the scroll velocity -------------------------------- */
    const ribbonTrack = root.querySelector(".wdxRibbon__track");
    if (ribbonTrack) {
      ribbonTween = gsap.to(ribbonTrack, {
        xPercent: -50,
        duration: 34,
        ease: "none",
        repeat: -1,
      });
    }

    /* ---- section rail ---------------------------------------------------- */
    const railTargets = SECTIONS.map((section) => ({
      ...section,
      el: root.querySelector(section.selector),
    })).filter((section) => section.el);

    if (railTargets.length > 2) {
      const rail = document.createElement("nav");
      rail.className = "wdxRail";
      rail.setAttribute("aria-label", "Page sections");

      railTargets.forEach((section) => {
        const button = document.createElement("button");
        const dot = document.createElement("span");
        const label = document.createElement("span");
        button.type = "button";
        button.className = "wdxRail__item";
        dot.className = "wdxRail__dot";
        label.className = "wdxRail__label";
        label.textContent = section.label;
        button.append(dot, label);
        button.addEventListener("click", () => {
          lenis.scrollTo(section.el, { offset: -78, duration: 1.15 });
        });
        rail.appendChild(button);

        triggers.push(
          ScrollTrigger.create({
            trigger: section.el,
            start: "top 55%",
            end: "bottom 45%",
            onToggle: (self) => button.classList.toggle("is-on", self.isActive),
          })
        );
      });

      root.appendChild(rail);
      cleanups.push(() => rail.remove());
    }

    /* ---- word reveals ---------------------------------------------------- */
    root.querySelectorAll(".sec_title").forEach((title) => {
      const words = splitHeading(title);
      if (!words) return;
      tweens.push(
        gsap.fromTo(
          words,
          { yPercent: 118, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.95,
            ease: "power3.out",
            stagger: 0.055,
            scrollTrigger: { trigger: title, start: "top 90%", once: true },
          }
        )
      );
    });

    /* ---- parallax -------------------------------------------------------- */
    PARALLAX.forEach(({ selector, trigger, start, from, to }) => {
      const el = root.querySelector(selector);
      if (!el) return;
      const triggerEl = (trigger && root.querySelector(trigger)) ||
        el.closest("section") ||
        el;
      tweens.push(
        gsap.fromTo(el, from, {
          ...to,
          ease: "none",
          scrollTrigger: {
            trigger: triggerEl,
            start: start || "top bottom",
            end: "bottom top",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        })
      );
    });

    /* ---- skill counters -------------------------------------------------- */
    root.querySelectorAll("[data-wd-count]").forEach((el) => {
      const target = Number(el.dataset.wdCount);
      if (Number.isNaN(target)) return;
      const counter = { value: target };
      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: "top 92%",
          once: true,
          onEnter: () => {
            counter.value = 0;
            gsap.to(counter, {
              value: target,
              duration: 1.5,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = `${Math.round(counter.value)}%`;
              },
            });
          },
        })
      );
    });

    /* ---- pointer spotlights ---------------------------------------------- */
    root.querySelectorAll("[data-wd-spot]").forEach((card) => {
      const move = (event) => {
        const bounds = card.getBoundingClientRect();
        card.style.setProperty(
          "--wd-spot-x",
          `${(event.clientX - bounds.left).toFixed(1)}px`
        );
        card.style.setProperty(
          "--wd-spot-y",
          `${(event.clientY - bounds.top).toFixed(1)}px`
        );
      };
      card.addEventListener("pointermove", move);
      cleanups.push(() => card.removeEventListener("pointermove", move));
    });

    // one refresh once fonts/images have settled, so sticky offsets stay honest
    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts?.ready) document.fonts.ready.then(refresh).catch(() => {});
    window.addEventListener("load", refresh);
    cleanups.push(() => window.removeEventListener("load", refresh));

    ScrollTrigger.config({ ignoreMobileResize: true });
    ScrollTrigger.refresh();

    return () => {
      cleanups.forEach((fn) => fn());
      tweens.forEach((tween) => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });
      triggers.forEach((trigger) => trigger.kill());
      lockObserver.disconnect();
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33); // restore the GSAP default
      lenis.destroy();
      root.classList.remove("wdSmooth");
      root.querySelectorAll("[data-wd-split]").forEach((el) => {
        delete el.dataset.wdSplit;
      });
    };
  }, []);

  return null;
};

export default SmoothMotion;
