"use client";

export default function PageClient({ component: Component, ...props }) {
  return <Component {...props} />;
}
