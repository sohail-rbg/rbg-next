"use client";

import * as React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { mix, distance, wrap } from "@popmotion/popcorn";
import { colors, center, powerOut4, generateSize } from "./utils";
import NextImage from "../../../components/NextImage";

/**
 * Cursor image trail.
 *
 * Performance notes (this component used to run a framesync loop on every
 * frame for the lifetime of the page, and re-rendered all 28 tiles whenever a
 * new image spawned):
 *  - the update loop is a requestAnimationFrame loop that *stops itself* after
 *    a short idle period and restarts on pointer movement;
 *  - tiles are memoised, and positions keep object identity per index, so only
 *    the tile that actually spawned re-renders;
 *  - the whole effect is skipped on touch devices and for users who ask for
 *    reduced motion.
 */

const ImagePlaceholder = React.memo(function ImagePlaceholder({ position, color }) {
  const controls = useAnimation();

  useEffect(() => {
    if (!position) return;
    const { xOrigin, x, yOrigin, y } = position;
    controls.start({
      x: [xOrigin, x, x],
      y: [yOrigin, y, y],
      opacity: [1, 1, 0],
      scale: [0.1, 1, 1.5],
      translateY: [1, 1, 500],
      transition: {
        duration: 1.4,
        ease: ["easeOut", powerOut4, powerOut4],
        times: [0, 0.7, 1],
      },
    });
  }, [position, controls]);

  const style = position ? position.style : {};

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={controls}
      transformTemplate={center}
      style={{ ...style }}
      className="placeholder"
    >
      <NextImage src={color} className="img-fluid" alt="" />
    </motion.div>
  );
});

const IDLE_MS = 900;

const TrailImages = ({ distanceThreshold = 120 }) => {
  const containerRef = useRef(null);
  const mouseInfo = useRef({
    now: { x: 0, y: 0 },
    prev: { x: 0, y: 0 },
    prevImage: { x: 0, y: 0 },
  }).current;

  const imagePositions = useRef([]);
  const [, setSpawnTick] = useState(0);
  const [enabled, setEnabled] = useState(false);

  /* only run on fine pointers, and never against a reduced-motion request */
  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (fine && !reduce) setEnabled(true);
  }, []);

  useEffect(() => {
    const node = containerRef.current;
    if (!enabled || !node) return undefined;

    let frame = null;
    let idleTimer = null;
    let latestIndex = 0;

    const stop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = null;
    };

    const tick = () => {
      frame = requestAnimationFrame(tick);

      const mouseDistance = distance(mouseInfo.now, mouseInfo.prevImage);

      mouseInfo.prev = {
        x: mix(mouseInfo.prev.x || mouseInfo.now.x, mouseInfo.now.x, 0.1),
        y: mix(mouseInfo.prev.y || mouseInfo.now.y, mouseInfo.now.y, 0.1),
      };

      if (mouseDistance > distanceThreshold) {
        latestIndex += 1;
        const imageIndex = wrap(0, colors.length - 1, latestIndex);

        imagePositions.current[imageIndex] = {
          xOrigin: mouseInfo.prev.x,
          yOrigin: mouseInfo.prev.y,
          x: mouseInfo.now.x,
          y: mouseInfo.now.y,
          style: { ...generateSize(), zIndex: imageIndex },
        };

        mouseInfo.prevImage = mouseInfo.now;
        setSpawnTick(latestIndex);
      }
    };

    const scheduleIdleStop = () => {
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(stop, IDLE_MS);
    };

    const handleMove = (event) => {
      mouseInfo.now = { x: event.pageX, y: event.pageY };
      if (!frame) frame = requestAnimationFrame(tick);
      scheduleIdleStop();
    };

    node.addEventListener("mousemove", handleMove, { passive: true });

    return () => {
      node.removeEventListener("mousemove", handleMove);
      stop();
      if (idleTimer) clearTimeout(idleTimer);
    };
  }, [enabled, distanceThreshold, mouseInfo]);

  const tiles = useMemo(
    () => colors.map((color, i) => ({ color, key: i })),
    []
  );

  if (!enabled) return null;

  return (
    <div className="containerBox" ref={containerRef}>
      {tiles.map(({ color, key }) => (
        <ImagePlaceholder
          key={key}
          color={color}
          position={imagePositions.current[key]}
        />
      ))}
    </div>
  );
};

export default TrailImages;
