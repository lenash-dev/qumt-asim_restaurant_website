import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { RiseLine } from "@/components/motion/rise-line";

export function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  align = "left",
  className,
  as: Heading = "h2",
}: {
  eyebrow?: string;
  title: string;
  accent?: string;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
}) {
  const centered = align === "center";
  return (
    <div className={cn("max-w-3xl", centered && "mx-auto text-center", className)}>
      {eyebrow && (
        <Reveal y={16}>
          <Eyebrow className={cn(centered && "justify-center")}>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <Heading className="mt-5 font-display text-[clamp(2.9rem,7vw,5.5rem)] leading-[0.9] uppercase">
        <RiseLine>{title}</RiseLine>
        {accent && (
          <RiseLine delay={0.08} className="font-serif text-[1.08em] leading-[0.95] tracking-tight normal-case italic text-gold-300">
            {accent}
          </RiseLine>
        )}
      </Heading>
      {description && (
        <Reveal delay={0.15} y={20}>
          <p className={cn("mt-6 max-w-xl text-base/relaxed text-cream-200/80 sm:text-lg/relaxed", centered && "mx-auto")}>
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
