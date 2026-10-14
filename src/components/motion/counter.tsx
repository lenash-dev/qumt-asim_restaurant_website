"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useTransform } from "motion/react";
import { easeOutExpo } from "./reveal";

/** Número que cuenta hacia arriba al entrar en pantalla. */
export function Counter({ to, suffix = "", className }: { to: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { amount: 0.6 });
  const value = useMotionValue(0);
  const text = useTransform(value, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    const controls = animate(value, inView ? to : 0, { duration: inView ? 1.8 : 0.3, ease: easeOutExpo });
    return () => controls.stop();
  }, [inView, to, value]);

  return (
    <motion.span ref={ref} className={className} aria-label={`${to}${suffix}`}>
      {text}
    </motion.span>
  );
}
