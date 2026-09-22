"use client";

import * as React from "react";
import { useEffect, useState, useRef } from "react";
// import { render } from "react-dom";
import { motion, useAnimation } from "framer-motion";
import { mix, distance, wrap } from "@popmotion/popcorn";
import {
  colors,
  center,
  powerOut4,
  generateSize,
  useAnimationLoop
} from "./utils";
import { Box } from "@mui/material";
import NextImage from "../../../components/NextImage";




const ImagePlaceholder = ({ position, color }) => {
    const controls = useAnimation();
  
    useEffect(() => {
      if (!position) return;
      const { xOrigin, x, yOrigin, y } = position;
      controls.start({
        x: [xOrigin, x, x],
        y: [yOrigin, y, y],
        opacity: [1, 1, 0],
        scale: [0.1, 1, 1.5],
        translateY:[1, 1, 500],
        transition: {
          duration: 1.4,
          ease: ["easeOut", powerOut4, powerOut4],
          times: [0, 0.7, 1]
        }
      });
    }, [position, controls]);
  
    const style = position ? position.style : {};
  
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={controls}
        transformTemplate={center}
        style={{  ...style }}
        className="placeholder"
      >
        <NextImage
            src={color}
            className="img-fluid"
            alt=""
        />
      </motion.div>
    );
  };
  
  const TrailImages = ({ distanceThreshold = 100 }) => {
    const mouseInfo = useRef({
      now: { x: 0, y: 0 },
      prev: { x: 0, y: 0 },
      prevImage: { x: 0, y: 0 }
    }).current;
  
    const imagePositions = useRef([]);
  
    const [index, setIndex] = useState(0);
  
    useAnimationLoop(() => {
      const mouseDistance = distance(mouseInfo.now, mouseInfo.prevImage);
  
      mouseInfo.prev = {
        x: mix(mouseInfo.prev.x || mouseInfo.now.x, mouseInfo.now.x, 0.1),
        y: mix(mouseInfo.prev.y || mouseInfo.now.y, mouseInfo.now.y, 0.1)
      };
  
      if (mouseDistance > distanceThreshold) {
        const newIndex = index + 1;
        const imageIndex = wrap(0, colors.length - 1, newIndex);
  
        imagePositions.current[imageIndex] = {
          xOrigin: mouseInfo.prev.x,
          yOrigin: mouseInfo.prev.y,
          x: mouseInfo.now.x,
          y: mouseInfo.now.y,
          style: {
            ...generateSize(),
            zIndex: imageIndex
          }
        };
  
        mouseInfo.prevImage = mouseInfo.now;
  
        setIndex(newIndex);
      }
    });
  
    return (
      <div
        className="containerBox"
        onMouseMove={e => (mouseInfo.now = { x: e.pageX, y: e.pageY })}
      >
        {colors.map((color, i) => (
          <ImagePlaceholder
            position={imagePositions.current[i]}
            color={color}
            key={i}
          />
        ))}
      </div>
    );
  };


  export default TrailImages;
