"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { steps } from "@/content/corporate";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";

/** Pasos del proceso con una línea que se dibuja al hacer scroll. */
export function ProcessSteps() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <div ref={ref} className="relative mt-16">
      <div aria-hidden className="absolute top-7 right-[12%] left-[12%] hidden h-px bg-cream-50/10 lg:block">
        <motion.div style={{ scaleX: progress }} className="aguayo-stripe h-full origin-left" />
      </div>
      <div aria-hidden className="absolute top-0 bottom-0 left-7 w-px bg-cream-50/10 lg:hidden">
        <motion.div style={{ scaleY: progress }} className="h-full origin-top bg-gradient-to-b from-gold-400 to-aguayo-rose" />
      </div>

      <RevealGroup as="ol" className="relative grid gap-12 lg:grid-cols-4 lg:gap-6">
        {steps.map((step, index) => (
          <RevealItem as="li" key={step.title} className="relative pl-20 lg:pl-0 lg:text-center">
            <span className="glass-strong absolute top-0 left-0 grid size-14 place-items-center rounded-full font-display text-2xl text-gold-300 lg:relative lg:mx-auto">
              {index + 1}
            </span>
            <h3 className="pt-2.5 font-display text-3xl uppercase lg:mt-6 lg:pt-0">{step.title}</h3>
            <p className="mt-2 text-sm/relaxed text-cream-200/75 lg:mx-auto lg:max-w-[15rem]">{step.description}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
