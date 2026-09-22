"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function NavigationLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [pathname]);

  useEffect(() => {
    const start = () => setLoading(true);
    const onClick = (event) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target.closest?.("a[href]");
      if (!link || link.hasAttribute("download") || (link.target && link.target !== "_self")) return;

      const destination = new URL(link.href, window.location.href);
      if (destination.origin !== window.location.origin || destination.pathname === window.location.pathname) return;
      start();
    };

    const onPopState = () => {
      if (window.location.pathname !== pathname) start();
    };

    document.addEventListener("click", onClick);
    window.addEventListener("app:navigation-start", start);
    window.addEventListener("popstate", onPopState);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("app:navigation-start", start);
      window.removeEventListener("popstate", onPopState);
    };
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="menu-navigation-loader" role="status" aria-live="polite">
      <span className="menu-navigation-loader__spinner" aria-hidden="true" />
      <span>Loading...</span>
    </div>
  );
}
