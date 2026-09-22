"use client";

import React, { useEffect, useState } from "react";

export default function CursorLayer() {
  const [Cursor, setCursor] = useState(null);

  useEffect(() => {
    const canUseCursor =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!canUseCursor) return undefined;

    let cancelled = false;
    const loadCursor = () => {
      import("react-animated-cursor").then((module) => {
        if (!cancelled) {
          setCursor(() => module.default);
        }
      });
    };

    const idleId =
      "requestIdleCallback" in window
        ? window.requestIdleCallback(loadCursor, { timeout: 2500 })
        : window.setTimeout(loadCursor, 1200);

    return () => {
      cancelled = true;
      if ("cancelIdleCallback" in window && typeof idleId === "number") {
        window.cancelIdleCallback(idleId);
      } else {
        window.clearTimeout(idleId);
      }
    };
  }, []);

  if (!Cursor) return null;

  return (
    <Cursor
      innerSize={8}
      outerSize={35}
      innerScale={1}
      outerScale={2}
      outerAlpha={0}
      hasBlendMode={true}
      innerStyle={{
        backgroundColor: "var(--cursor-color)",
        zIndex: 10000,
      }}
      outerStyle={{
        border: "3px solid var(--cursor-color)",
        zIndex: 10000,
      }}
    />
  );
}
