"use client";

import { useEffect, useRef, useCallback } from "react";

/* ── GSAP dynamic loader — GSAP is loaded at runtime, not bundled ── */

let gsapInstance: any = null;
let ScrollTriggerInstance: any = null;

async function loadGSAP() {
  if (gsapInstance) return { gsap: gsapInstance, ScrollTrigger: ScrollTriggerInstance };

  try {
    const gsapModule = await import("gsap");
    gsapInstance = gsapModule.default;

    try {
      const stModule = await import("gsap/ScrollTrigger");
      ScrollTriggerInstance = stModule.default;
      gsapInstance.registerPlugin(ScrollTriggerInstance);
    } catch {
      // ScrollTrigger not available — proceed without it
    }

    return { gsap: gsapInstance, ScrollTrigger: ScrollTriggerInstance };
  } catch {
    console.warn("GSAP failed to load — animations will not run");
    return { gsap: null, ScrollTrigger: null };
  }
}

export type GsapVars = Record<string, unknown>;

/* ── Default animation configs ── */
export const ANIMATION_CONFIG = {
  fadeIn: { opacity: 0, y: 30, duration: 0.8, ease: "power3.out" },
  fadeInUp: { opacity: 0, y: 50, duration: 1, ease: "power4.out" },
  scaleIn: { opacity: 0, scale: 0.9, duration: 0.6, ease: "back.out(1.7)" },
  staggerChildren: { stagger: 0.1, duration: 0.6, ease: "power3.out" },
  goldReveal: {
    clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
    duration: 1.2,
    ease: "power4.inOut",
  },
};

/* ── React hook for GSAP animations ── */
export function useGSAPAnimation() {
  const ref = useRef<HTMLDivElement | null>(null);

  const animate = useCallback(async (config: GsapVars = {}) => {
    const { gsap } = await loadGSAP();
    if (gsap && ref.current) {
      gsap.to(ref.current, config);
    }
  }, []);

  return { ref, animate };
}

/* ── Scroll-triggered fade in ── */
export function useScrollReveal(options?: {
  trigger?: string;
  start?: string;
  end?: string;
  stagger?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    (async () => {
      const { gsap, ScrollTrigger } = await loadGSAP();

      if (!ref.current || !gsap) return;

      const elements = ref.current.children;

      const ctx = gsap.context(() => {
        gsap.from(elements, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          stagger: options?.stagger ?? 0.1,
          ease: "power3.out",
          scrollTrigger: ScrollTrigger
            ? {
                trigger: options?.trigger
                  ? document.querySelector(options.trigger)
                  : ref.current,
                start: options?.start ?? "top bottom-=100",
                end: options?.end ?? "top center",
                toggleActions: "play none none reverse",
              }
            : undefined,
        });
      });

      cleanup = () => ctx?.();
    })();

    return () => cleanup?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options?.trigger, options?.start, options?.end, options?.stagger]);

  return ref;
}

export default loadGSAP;
