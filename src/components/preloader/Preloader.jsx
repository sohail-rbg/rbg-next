"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  PRELOADER_ACTIVE_CLASS,
  PRELOADER_MOUNT_ATTR,
  PRELOADER_REVEAL_CLASS,
  PRELOADER_SKIP_CLASS,
  PRELOADER_VISIT_ATTR,
} from "./preloaderBoot";
import "./preloader.css";

/* ---- timing -------------------------------------------------------------- */
const FIRST_PLAY_MS = 1900; // full intro for a fresh visit
const REPEAT_PLAY_MS = 1200; // quick pass on reloads inside the same session
const REDUCED_PLAY_MS = 650; // motion-sensitive users
const SNEAK_TO = 93; // counter coasts up to here while assets stream in
const FINISH_MS = 460; // smooth pull from the sneak value to 100
const READY_GRACE_MS = 900; // extra patience for the real window load event
const HARD_FINISH_MS = 5400; // never hold the site hostage
const COMPLETE_HOLD_MS = 580; // beat at 100% before the shutter moves
const SHUTTER_MS = 1000; // panel travel time (keep in sync with preloader.css)
const REVEAL_OFFSET_MS = 160; // page starts fading in as the panels part
const UNMOUNT_PAD_MS = 140;

/* ---- copy ---------------------------------------------------------------- */
const ROLES = [
  "Loading craft",
  "Loading strategy",
  "Loading typefaces",
  "Loading the portfolio",
  "Loading the studio",
];

const STATUS_STEPS = [
  { at: 0, label: "Booting experience" },
  { at: 18, label: "Loading assets" },
  { at: 42, label: "Composing layouts" },
  { at: 64, label: "Polishing details" },
  { at: 86, label: "Almost there" },
  { at: 100, label: "Welcome" },
];

const statusFor = (value) => {
  let label = STATUS_STEPS[0].label;
  for (let i = 0; i < STATUS_STEPS.length; i += 1) {
    if (value >= STATUS_STEPS[i].at) label = STATUS_STEPS[i].label;
  }
  return label;
};

const pad = (value) => String(Math.min(100, Math.max(0, value))).padStart(3, "0");

/**
 * ReBrand Gurus preloader.
 *
 * Counter climbs while the page loads, brass rail tracks it, the wordmark
 * lifts away at 100% and the two emerald panels part like a shutter to reveal
 * the site underneath.
 */
export default function Preloader() {
  const [phase, setPhase] = useState("loading"); // loading -> complete -> opening -> done
  const [value, setValue] = useState(0);
  const [tick, setTick] = useState(0);

  const railFillRef = useRef(null);
  const railHeadRef = useRef(null);
  const progressRef = useRef(0);
  const readyRef = useRef(false);
  const readyAtRef = useRef(0);
  const valueAtReadyRef = useRef(0);
  const finishedRef = useRef(false);
  const timersRef = useRef([]);
  const rafRef = useRef(0);

  useEffect(() => {
    const html = document.documentElement;
    const timers = timersRef.current;

    const later = (fn, ms) => {
      const id = window.setTimeout(fn, ms);
      timers.push(id);
      return id;
    };

    // Explicitly skipped (?preloader=0) — release the page immediately.
    if (html.classList.contains(PRELOADER_SKIP_CLASS)) {
      html.classList.remove(PRELOADER_ACTIVE_CLASS);
      html.removeAttribute(PRELOADER_MOUNT_ATTR);
      setPhase("done");
      return undefined;
    }

    html.setAttribute(PRELOADER_MOUNT_ATTR, "mounted");

    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const repeated = html.getAttribute(PRELOADER_VISIT_ATTR) === "1";

    const duration = reduced
      ? REDUCED_PLAY_MS
      : repeated
      ? REPEAT_PLAY_MS
      : FIRST_PLAY_MS;
    const minPlay = reduced ? 300 : repeated ? 900 : 1400;

    const start = performance.now();

    const paint = (v) => {
      progressRef.current = v;
      if (railFillRef.current) {
        railFillRef.current.style.transform = `scaleX(${v / 100})`;
      }
      if (railHeadRef.current) {
        railHeadRef.current.style.left = `${v}%`;
      }
    };

    const finish = () => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      window.cancelAnimationFrame(rafRef.current);
      paint(100);
      setValue(100);
      setPhase("complete");

      later(() => setPhase("opening"), COMPLETE_HOLD_MS);
      later(() => {
        // Hand the page back while the panels are still travelling.
        html.classList.remove(PRELOADER_ACTIVE_CLASS);
        html.classList.remove(PRELOADER_SKIP_CLASS);
        html.classList.add(PRELOADER_REVEAL_CLASS);
      }, COMPLETE_HOLD_MS + REVEAL_OFFSET_MS);
      later(() => {
        setPhase("done");
        html.removeAttribute(PRELOADER_MOUNT_ATTR);
      }, COMPLETE_HOLD_MS + SHUTTER_MS + UNMOUNT_PAD_MS);
      // Let the page fade-in animation finish before dropping the reveal class.
      later(
        () => html.classList.remove(PRELOADER_REVEAL_CLASS),
        COMPLETE_HOLD_MS + SHUTTER_MS + UNMOUNT_PAD_MS + 650
      );
    };

    const beginFinish = () => {
      readyAtRef.current = performance.now();
      valueAtReadyRef.current = progressRef.current;
    };

    const markReady = () => {
      if (readyRef.current) return;
      readyRef.current = true;
      const wait = Math.max(0, minPlay - (performance.now() - start));
      if (wait > 0) later(beginFinish, wait);
      else beginFinish();
    };

    if (document.readyState === "complete") {
      later(markReady, 120);
    } else {
      window.addEventListener("load", markReady, { once: true });
      // Grace: the real load event may never fire (slow third-party assets).
      later(markReady, duration + READY_GRACE_MS);
    }
    later(markReady, HARD_FINISH_MS);

    const frame = (now) => {
      if (finishedRef.current) return;

      const elapsed = Math.max(0, now - start);
      const t = Math.min(1, elapsed / duration);
      let v = SNEAK_TO * (1 - Math.pow(1 - t, 2.2));

      if (readyRef.current && readyAtRef.current) {
        const ft = Math.min(1, (now - readyAtRef.current) / FINISH_MS);
        if (ft > 0) {
          const from = valueAtReadyRef.current;
          v = Math.max(v, from + (100 - from) * (1 - Math.pow(1 - ft, 3)));
        }
      }

      const shown = v >= 99.85 ? 100 : v;
      paint(shown);

      const rounded = Math.round(shown);
      setValue((prev) => (prev === rounded ? prev : rounded));

      if (shown >= 100) {
        finish();
        return;
      }

      rafRef.current = window.requestAnimationFrame(frame);
    };

    rafRef.current = window.requestAnimationFrame(frame);
    paint(0);

    return () => {
      window.removeEventListener("load", markReady);
      window.cancelAnimationFrame(rafRef.current);
      timers.forEach((id) => window.clearTimeout(id));
      timersRef.current = [];
      // Never leave the site locked behind the overlay.
      html.classList.remove(PRELOADER_ACTIVE_CLASS);
      html.classList.remove(PRELOADER_REVEAL_CLASS);
      html.removeAttribute(PRELOADER_MOUNT_ATTR);
    };
  }, []);

  // Rotating role words (only while the counter is running).
  useEffect(() => {
    if (phase !== "loading") return undefined;
    const id = window.setInterval(() => setTick((t) => t + 1), 620);
    return () => window.clearInterval(id);
  }, [phase]);

  if (phase === "done") return null;

  const digits = pad(value);
  const status = statusFor(value);
  const activeRole = tick % ROLES.length;
  const pastRole = (tick - 1 + ROLES.length) % ROLES.length;

  return (
    <div
      className="rbg-preloader"
      data-phase={phase}
      data-progress={value}
      role="progressbar"
      aria-label="Loading ReBrand Gurus"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
      aria-valuetext={`${value} percent loaded`}
    >
      <div className="rbg-preloader__gates" aria-hidden="true">
        <div className="rbg-preloader__gate rbg-preloader__gate--top" />
        <div className="rbg-preloader__gate rbg-preloader__gate--bottom" />
      </div>

      <div className="rbg-preloader__stage" aria-hidden="true">
        <div className="rbg-preloader__aura" />
        <div className="rbg-preloader__grid" />
        <div className="rbg-preloader__grain" />
        <div className="rbg-preloader__vignette" />
        <div className="rbg-preloader__sweep" />

        <header className="rbg-preloader__meta rbg-preloader__meta--top">
          <span className="rbg-preloader__mark">
            <span className="rbg-preloader__mark-dot" />
            ReBrand Gurus
          </span>
          <span className="rbg-preloader__status" key={status}>
            {status}
          </span>
        </header>

        <div className="rbg-preloader__core">
          <span className="rbg-preloader__ghost">{digits}</span>

          <h1 className="rbg-preloader__word">
            <span className="rbg-preloader__mask">
              <span className="rbg-preloader__tile" style={{ "--i": 0 }}>
                ReBrand
              </span>
            </span>
            <span className="rbg-preloader__mask">
              <span
                className="rbg-preloader__tile rbg-preloader__tile--strong"
                style={{ "--i": 1 }}
              >
                Gurus
              </span>
              <span className="rbg-preloader__period" />
            </span>
          </h1>

          <p className="rbg-preloader__tagline">
            We build brands that matter in culture
          </p>

          <div className="rbg-preloader__rail">
            <span className="rbg-preloader__rail-fill" ref={railFillRef} />
            <span className="rbg-preloader__rail-head" ref={railHeadRef} />
          </div>
        </div>

        <footer className="rbg-preloader__meta rbg-preloader__meta--bottom">
          <span className="rbg-preloader__roles">
            {ROLES.map((role, index) => (
              <span
                key={role}
                className={
                  index === activeRole
                    ? "is-active"
                    : index === pastRole
                    ? "is-past"
                    : undefined
                }
              >
                {role}
              </span>
            ))}
          </span>

          <span className="rbg-preloader__counter">
            <span className="rbg-preloader__counter-num">{digits}</span>
            <span className="rbg-preloader__counter-pct">%</span>
          </span>
        </footer>
      </div>
    </div>
  );
}
