"use client";

import { useEffect, useRef, useState } from "react";

type ScrollDirection = "up" | "down";

export function useScrollDirection(threshold = 8) {
  const [direction, setDirection] = useState<ScrollDirection | null>(null);
  const prevScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;

        if (currentScrollY <= 0) {
          setDirection(null);
        } else {
          const diff = currentScrollY - prevScrollY.current;

          if (Math.abs(diff) >= threshold) {
            setDirection(diff > 0 ? "down" : "up");
          }
        }

        prevScrollY.current = currentScrollY;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return direction;
}
