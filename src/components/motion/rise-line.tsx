"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { easeOutExpo } from "./reveal";

const line: Variants = {
  hidden: { y: "112%", rotate: 2 },
  shown: { y: "0%", rotate: 0 },
};

/**
 * Línea de texto que sube desde una máscara al entrar en pantalla
 * y vuelve a ocultarse al salir.
 *
 * Se observa la máscara (no el texto): el texto oculto queda recortado por
 * `overflow: hidden` y el IntersectionObserver nunca lo vería.
 */
export function RiseLine({
  children,
  className,
  delay = 0,
  once = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}) {
  return (
    <motion.span
      // El padding superior deja espacio a las tildes (Ó, Í) con interlineado ajustado.
      className="-mt-[0.18em] -mb-[0.06em] block overflow-hidden pt-[0.18em] pb-[0.06em]"
      initial="hidden"
      whileInView="shown"
      viewport={{ once, amount: 0.5 }}
    >
      <motion.span
        className={cn("block will-change-transform", className)}
        variants={line}
        transition={{ duration: 1.1, ease: easeOutExpo, delay }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}
