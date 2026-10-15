"use client";

import Image from "next/image";
import { useRef, type PointerEvent } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import type { Dish } from "@/content/menu";
import { formatPrice } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { Diamond } from "@/components/ui/eyebrow";
import { OpenStatus } from "@/components/layout/open-status";
import { SteamingBowl } from "@/components/brand/steaming-bowl";
import { Reveal, easeOutExpo } from "@/components/motion/reveal";
import { RiseLine } from "@/components/motion/rise-line";

const highlights = ["Platos típicos", "Almuerzo ejecutivo", "Catering para empresas"];

export function Hero({ recommended }: { recommended?: Dish }) {
  const ref = useRef<HTMLElement>(null);

  // Al hacer scroll, el texto sube y se desvanece, la ilustración se queda atrás.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  // Paralaje sutil con el cursor
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 70, damping: 18 });
  const springY = useSpring(pointerY, { stiffness: 70, damping: 18 });
  const figureX = useTransform(springX, (v) => v * 16);
  const figureY = useTransform(springY, (v) => v * 10);
  const nearX = useTransform(springX, (v) => v * -34);
  const nearY = useTransform(springY, (v) => v * -24);

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <section
      ref={ref}
      onPointerMove={handlePointerMove}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28 pb-24 sm:pt-32"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:gap-6">
        <motion.div style={{ y: textY, opacity: fade }} className="relative z-10 lg:col-span-7">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.8 }}>
            <OpenStatus />
          </motion.div>

          <h1 className="mt-7 font-display text-[clamp(4.1rem,12.5vw,10.5rem)] leading-[0.84] uppercase">
            <RiseLine delay={0.15}>Tradición</RiseLine>
            <RiseLine
              delay={0.28}
              className="pl-[0.06em] font-serif text-[0.8em] leading-[0.98] tracking-tight normal-case italic text-gold-300"
            >
              con actitud
            </RiseLine>
          </h1>

          <Reveal delay={0.45} y={24}>
            <p className="mt-8 max-w-xl text-lg/relaxed text-cream-200/85">
              Recetas de la abuela, sabor andino y un servicio con estilo propio. Ven por un plato típico y quédate por la
              sobremesa.
            </p>
          </Reveal>

          <Reveal delay={0.55} y={24}>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/menu" size="lg" arrow>
                Ver el menú
              </ButtonLink>
              <ButtonLink href="/empresas" variant="glass" size="lg">
                Servicios para empresas
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.65} y={16}>
            <ul className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm font-medium text-cream-200/75">
              {highlights.map((item, index) => (
                <li key={item} className="flex items-center gap-5">
                  {index > 0 && <Diamond className="bg-cream-50/30" />}
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </motion.div>

        <motion.div style={{ y: visualY }} className="relative px-6 sm:px-10 lg:col-span-5 lg:px-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: easeOutExpo, delay: 0.2 }}
            className="relative mx-auto aspect-square w-full max-w-[540px]"
          >
            <div className="absolute inset-[6%] rounded-full bg-[radial-gradient(circle,rgb(240_181_77/0.34),rgb(146_40_40/0.3)_45%,transparent_70%)] blur-2xl" />
            <div className="absolute inset-0 rounded-full border border-cream-50/10" />
            <div className="absolute inset-[9%] rounded-full border border-dashed border-cream-50/15" />
            <RotatingText className="animate-spin-slow absolute -inset-[3%]" />

            <motion.div style={{ x: figureX, y: figureY }} className="absolute inset-x-[11%] top-[5%] bottom-[9%]">
              <Image
                src="/brand/cholita.png"
                alt="Ilustración de la cholita de Qumt'asim con sombrero bombín y lentes de sol"
                fill
                priority
                sizes="(min-width: 1024px) 420px, 75vw"
                className="object-contain object-bottom drop-shadow-[0_30px_40px_rgb(0_0_0/0.45)] [mask-image:linear-gradient(to_bottom,#000_80%,transparent)]"
              />
            </motion.div>

            {/* Taza con vapor */}
            <motion.div style={{ x: nearX, y: nearY }} className="absolute bottom-[12%] -left-[6%] sm:-left-[10%]">
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.9, duration: 1.1, ease: easeOutExpo }}
              >
                <div className="glass animate-float rounded-[1.75rem] px-4 pt-12 pb-4">
                  <SteamingBowl className="w-20 sm:w-24" />
                </div>
              </motion.div>
            </motion.div>

            {/* Recomendado */}
            {recommended && (
              <motion.div style={{ x: nearX, y: nearY }} className="absolute -right-[4%] bottom-[1%] sm:-right-[8%]">
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 1.1, duration: 1.1, ease: easeOutExpo }}
                >
                  <div className="glass animate-float rounded-2xl px-5 py-4 [animation-delay:-3.5s]">
                    <p className="text-[0.6rem] font-bold tracking-[0.3em] text-cream-300 uppercase">Recomendado de la casa</p>
                    <p className="mt-1.5 flex items-baseline gap-4">
                      <span className="font-display text-2xl uppercase">{recommended.name}</span>
                      <span className="font-display text-xl text-gold-300">{formatPrice(recommended.price)}</span>
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Sello */}
            <motion.div
              initial={{ opacity: 0, rotate: -40, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 12, scale: 1 }}
              transition={{ delay: 1.35, type: "spring", bounce: 0.45, duration: 1 }}
              className="absolute top-[6%] right-[4%]"
            >
              <div className="grid size-20 place-items-center rounded-full bg-gold-400 text-center font-display text-[0.95rem] leading-[1.05] text-wine-900 uppercase shadow-[0_16px_30px_-10px_rgb(0_0_0/0.6)] ring-4 ring-gold-400/25 sm:size-24 sm:text-lg">
                Sabor
                <br />
                de casa
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex"
      >
        <span className="text-[0.6rem] font-bold tracking-[0.4em] text-cream-300 uppercase">Desliza</span>
        <span className="relative h-12 w-px overflow-hidden bg-cream-50/15">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-gold-400"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}

function RotatingText({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden className={className}>
      <defs>
        <path id="hero-circle" d="M100,100 m-92,0 a92,92 0 1,1 184,0 a92,92 0 1,1 -184,0" />
      </defs>
      <text className="fill-cream-50/50 text-[7px] font-bold tracking-[0.4em] uppercase">
        <textPath href="#hero-circle" textLength="574" lengthAdjust="spacing">
          Sabor de casa ◆ Recetas de la abuela ◆ Tradición con actitud ◆
        </textPath>
      </text>
    </svg>
  );
}
