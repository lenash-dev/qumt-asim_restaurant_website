import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { RiseLine } from "@/components/motion/rise-line";

/** Cabecera de las páginas internas, con una palabra gigante de fondo. */
export function PageHero({
  eyebrow,
  title,
  accent,
  description,
  ghost,
  children,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  description?: ReactNode;
  /** Palabra calada gigante detrás del título */
  ghost?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-40 pb-16 sm:pt-48 sm:pb-20">
      {ghost && (
        <div
          aria-hidden
          className="text-outline pointer-events-none absolute top-24 -right-[4vw] font-display text-[clamp(8rem,26vw,24rem)] leading-none uppercase opacity-40 select-none"
        >
          <Reveal y={80}>{ghost}</Reveal>
        </div>
      )}
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal y={16}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <h1 className="mt-6 font-display text-[clamp(3.6rem,10vw,8.5rem)] leading-[0.86] uppercase">
          <RiseLine delay={0.05}>{title}</RiseLine>
          {accent && (
            <RiseLine delay={0.15} className="font-serif text-[0.82em] leading-[0.98] tracking-tight normal-case italic text-gold-300">
              {accent}
            </RiseLine>
          )}
        </h1>
        {description && (
          <Reveal delay={0.25} y={20}>
            <p className="mt-8 max-w-2xl text-lg/relaxed text-cream-200/85">{description}</p>
          </Reveal>
        )}
        {children && (
          <Reveal delay={0.35} y={20}>
            <div className="mt-10">{children}</div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
