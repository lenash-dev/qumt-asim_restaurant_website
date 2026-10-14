import { Fragment, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

/** Cinta de texto infinita (CSS puro). */
export function Marquee({
  items,
  reverse = false,
  outline = false,
  duration = 40,
  className,
}: {
  items: string[];
  reverse?: boolean;
  outline?: boolean;
  duration?: number;
  className?: string;
}) {
  const track = (hidden: boolean) => (
    <div aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-10 pr-10">
      {items.map((item) => (
        <Fragment key={item}>
          <span className={cn("font-display text-[clamp(2.5rem,6vw,4.75rem)] leading-none whitespace-nowrap uppercase", outline && "text-outline")}>
            {item}
          </span>
          <span aria-hidden className="size-3 shrink-0 rotate-45 bg-gold-400" />
        </Fragment>
      ))}
    </div>
  );

  return (
    <div className={cn("mask-fade-x flex overflow-hidden", className)}>
      <div
        className={cn("flex w-max hover:[animation-play-state:paused]", reverse ? "animate-marquee-reverse" : "animate-marquee")}
        style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
      >
        {track(false)}
        {track(true)}
      </div>
    </div>
  );
}
