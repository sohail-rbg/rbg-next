"use client";

import NextLink from "next/link";
import { usePathname, useParams as useNextParams, useRouter } from "next/navigation";
import React from "react";

const isExternalHref = (href = "") =>
  /^(https?:)?\/\//.test(href) ||
  href.startsWith("mailto:") ||
  href.startsWith("tel:") ||
  href.startsWith("#");

export const Link = React.forwardRef(function Link(
  { to, href, children, replace, target, rel, ...props },
  ref
) {
  const finalHref = href || to || "#";

  if (isExternalHref(finalHref)) {
    return (
      <a
        ref={ref}
        href={finalHref}
        target={target}
        rel={target === "_blank" && !rel ? "noreferrer" : rel}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink
      ref={ref}
      href={finalHref}
      replace={replace}
      target={target}
      rel={rel}
      {...props}
    >
      {children}
    </NextLink>
  );
});

export const NavLink = Link;

export function useNavigate() {
  const router = useRouter();
  return (to, options = {}) => {
    const href = to === "*" ? "/404" : to;
    if (new URL(href, window.location.href).pathname !== window.location.pathname) {
      window.dispatchEvent(new Event("app:navigation-start"));
    }
    if (options.replace) {
      router.replace(href);
    } else {
      router.push(href);
    }
  };
}

export function useLocation() {
  const pathname = usePathname();
  return { pathname };
}

export function useParams() {
  return useNextParams();
}

export function BrowserRouter({ children }) {
  return children;
}

export function Routes({ children }) {
  return children;
}

export function Route() {
  return null;
}
