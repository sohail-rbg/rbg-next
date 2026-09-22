"use client";

import { Box, Grid, Typography } from "@mui/material";
import { motion, useAnimationControls } from "framer-motion";
import { memo, useEffect, useMemo, useState } from "react";
import ReactCountdown from "react-countdown";

// StaticCard component
const StaticCard = ({ position, unit }) => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "50%",
        overflow: "hidden",
        alignItems: position === "upper" ? "flex-end" : "flex-start",
        borderTopLeftRadius: position === "upper" ? 6 : 0,
        borderTopRightRadius: position === "upper" ? 6 : 0,
        backgroundColor: position === "upper" ? "transparent" : "#181c22",
        borderBottom: position === "upper" ? "1px solid #0E1116" : "none",
        borderTop: position === "lower" ? "1px solid #0E1116" : "none",
      }}
    >
      <Typography
        variant="h4"
        fontWeight="normal"
        sx={{ transform: position === "upper" ? "translateY(50%)" : "translateY(-50%)", color: "white" }}
      >
        {unit}
      </Typography>
    </Box>
  );
};

const MotionBox = motion(Box);

// AnimatedCard component
const AnimatedCard = memo(({ current, previous }) => {
  const [displayUnit, setDisplayUnit] = useState(previous);
  const controls = useAnimationControls();

  useEffect(() => {
    controls.start({
      rotateX: [0, -180],
      transition: { duration: 0.6, ease: "easeInOut" },
    }).then(() => {
      setDisplayUnit(current); // Update after the animation completes
      controls.set({ rotateX: 0 }); // Reset to the initial state
    });
  }, [previous]);

  return (
    <MotionBox
      id="animated-card"
      animate={controls}
      sx={{
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        left: 0,
        width: "100%",
        height: "50%",
        overflow: "hidden",
        transformStyle: "preserve-3d",
        top: 0,
        alignItems: "flex-end",
        transformOrigin: "50% 100%",
        backgroundColor: "#12161C",
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        borderBottom: "1px solid #0E1116",
      }}
    >
      <Typography
        variant="h4"
        fontWeight="normal"
        sx={{ transform: "translateY(50%)", color: "white" }}
      >
        {displayUnit}
      </Typography>
    </MotionBox>
  );
});

// AnimatedCardBottom component
const AnimatedCardBottom = ({ unit }) => {
  const [displayUnit, setDisplayUnit] = useState(unit);
  const controls = useAnimationControls();

  useEffect(() => {
    controls.start({
      rotateX: [180, 0],
      transition: { duration: 0.6, ease: "easeInOut" },
    }).then(() => {
      setDisplayUnit(unit); // Update after the animation completes
      controls.set({ rotateX: 0 }); // Reset to the initial state
    });
  }, [unit]);

  return (
    <MotionBox
      id="animated-card"
      animate={controls}
      sx={{
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        left: 0,
        width: "100%",
        height: "50%",
        overflow: "hidden",
        transformStyle: "preserve-3d",
        top: "50%",
        alignItems: "flex-start",
        transformOrigin: "50% 0%",
        backgroundColor: "#181c22",
        borderTop: "1px solid #0E1116",
      }}
    >
      <Typography
        variant="h4"
        fontWeight="normal"
        sx={{ transform: "translateY(-50%)", color: "white" }}
      >
        {displayUnit}
      </Typography>
    </MotionBox>
  );
};

// FlipContainer component
const FlipContainer = ({ number, title }) => {
  const { current, previous } = useMemo(() => {
    const currentDigit = number;
    const previousDigit = currentDigit + 1;

    const current = currentDigit < 10 ? `0${currentDigit}` : currentDigit;
    const previous = previousDigit < 10 ? `0${previousDigit}` : previousDigit;

    return { current, previous };
  }, [number]);

  return (
    <Box sx={{ boxShadow: "0px 10px 10px -10px black", borderBottomLeftRadius: 6, borderBottomRightRadius: 6 }}>
      <Box
        sx={{
          position: "relative",
          display: "block",
          width: "140px",
          height: "120px",
          backgroundColor: "#12161C",
          borderRadius: 6,
          perspective: "300px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        <StaticCard position="upper" unit={current} />
        <StaticCard position="lower" unit={previous} />
        <AnimatedCard current={current} previous={previous} />
        <AnimatedCardBottom unit={current} />
      </Box>
      <Box sx={{ py: 2, backgroundColor: "#1d2127", textAlign: "center" }}>
        <Typography variant="body2" fontWeight="light" sx={{ textTransform: "uppercase", color: "white" }}>
          {title}
        </Typography>
      </Box>
    </Box>
  );
};

// Renderer function for the countdown
const renderer = ({ hours, minutes, seconds, completed, days }) => {
  if (completed) return null;
  return (
    <Grid container justifyContent="center" spacing={1}>
      <Grid item>
        <FlipContainer number={days} title="days" />
      </Grid>
      <Grid item>
        <FlipContainer number={hours} title="hours" />
      </Grid>
      <Grid item>
        <FlipContainer number={minutes} title="mins" />
      </Grid>
      <Grid item>
        <FlipContainer number={seconds} title="secs" />
      </Grid>
    </Grid>
  );
};

// Countdown component
export const Countdown = ({ date }) => {
  return <ReactCountdown date={date} renderer={renderer} />;
};
