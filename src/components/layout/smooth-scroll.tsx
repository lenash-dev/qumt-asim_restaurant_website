"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";

/** Scroll suave global (se desactiva con "reducir movimiento"). */
export function SmoothScroll() {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.11,
        anchors: { offset: -110 },
        stopInertiaOnNavigate: true,
      }}
    />
  );
}
