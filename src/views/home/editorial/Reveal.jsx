"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Small scroll-reveal wrapper. Honours prefers-reduced-motion by rendering
 * plain markup (no transform, no opacity animation) for those readers.
 */
export default function Reveal({
  as = "div",
  children,
  className,
  delay = 0,
  y = 22,
  ...rest
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    const Plain = as;
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    );
  }

  const Tag = motion[as] || motion.div;

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
