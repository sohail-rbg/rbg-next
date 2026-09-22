"use client";

import Image from "next/image";
import { forwardRef } from "react";

const NextImage = forwardRef(function NextImage(
  {
    alt = "",
    width,
    height,
    loading = "lazy",
    sizes,
    priority = false,
    quality = 75,
    unoptimized = false,
    fill = false,
    ...props
  },
  ref
) {
  const resolvedWidth = width || 1200;
  const resolvedHeight = height || 800;
  const resolvedSizes =
    sizes ||
    (fill
      ? "100vw"
      : width
      ? `(max-width: ${resolvedWidth}px) 100vw, ${resolvedWidth}px`
      : "(max-width: 767px) 100vw, 50vw");
  const dimensions = fill
    ? { fill: true }
    : { width: resolvedWidth, height: resolvedHeight };

  return (
    <Image
      {...props}
      {...dimensions}
      ref={ref}
      alt={alt}
      sizes={resolvedSizes}
      quality={quality}
      priority={priority}
      loading={priority ? undefined : loading}
      decoding="async"
      unoptimized={unoptimized}
    />
  );
});

export default NextImage;
