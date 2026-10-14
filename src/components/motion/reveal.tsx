"use client";

import { motion, stagger, type Variants } from "motion/react";
import type { ReactNode } from "react";

export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Desplazamiento vertical inicial en px */
  y?: number;
  /** Desenfoque de entrada. Evitarlo en contenedores con tarjetas glass. */
  blur?: boolean;
  /** `false` = también anima la salida al abandonar el viewport */
  once?: boolean;
  amount?: number;
};

/**
 * Aparece al entrar en pantalla y se desvanece al salir.
 */
export function Reveal({ children, className, delay = 0, y = 36, blur = false, once = false, amount = 0.25 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, ...(blur && { filter: "blur(10px)" }) }}
      whileInView={{ opacity: 1, y: 0, ...(blur && { filter: "blur(0px)" }) }}
      viewport={{ once, amount }}
      transition={{ duration: 1, ease: easeOutExpo, delay }}
    >
      {children}
    </motion.div>
  );
}

const groupVariants: Variants = {
  hidden: { transition: { delayChildren: stagger(0.05, { from: "last" }) } },
  shown: { transition: { delayChildren: stagger(0.09) } },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easeOutExpo } },
};

/** Contenedor que escalona la entrada (y salida) de sus `RevealItem`. */
export function RevealGroup({
  children,
  className,
  once = false,
  amount = 0.15,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  once?: boolean;
  amount?: number;
  as?: "div" | "ul" | "ol";
}) {
  const Component = motion[as];
  return (
    <Component className={className} variants={groupVariants} initial="hidden" whileInView="shown" viewport={{ once, amount }}>
      {children}
    </Component>
  );
}

export function RevealItem({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: "div" | "li" | "article" }) {
  const Component = motion[as];
  return (
    <Component className={className} variants={itemVariants}>
      {children}
    </Component>
  );
}
