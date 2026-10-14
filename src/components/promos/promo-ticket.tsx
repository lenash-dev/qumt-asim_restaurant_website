import type { CSSProperties } from "react";
import { Clock } from "lucide-react";
import type { Promotion } from "@/content/promotions";
import { cn, formatPrice } from "@/lib/utils";
import { Diamond } from "@/components/ui/eyebrow";
import { TodayBadge } from "./today-badge";

const dayInitials = ["D", "L", "M", "M", "J", "V", "S"];
// Semana empezando en lunes
const weekOrder = [1, 2, 3, 4, 5, 6, 0];

/**
 * Promoción con forma de boleto: muescas laterales y talón con los días.
 */
export function PromoTicket({ promo, size = "md", className }: { promo: Promotion; size?: "md" | "lg"; className?: string }) {
  const large = size === "lg";
  return (
    <article
      className={cn(
        "group glass ticket-notch relative flex h-full flex-col rounded-[1.75rem] transition-transform duration-500 ease-out hover:-translate-y-1.5",
        promo.highlight && "ring-1 ring-gold-400/35",
        className,
      )}
      style={{ "--notch-y": "calc(100% - 5.5rem)" } as CSSProperties}
    >
      <TodayBadge days={promo.days} className="absolute top-5 right-5" />

      <div className={cn("flex flex-1 flex-col p-7", large && "sm:p-10")}>
        <p className="flex items-center gap-2.5 text-[0.68rem] font-bold tracking-[0.3em] text-cream-300 uppercase">
          <Diamond />
          {promo.kicker}
        </p>
        <h3 className={cn("mt-4 pr-16 font-display leading-[0.95] uppercase", large ? "text-5xl sm:text-6xl" : "text-3xl sm:text-4xl")}>
          {promo.title}
        </h3>
        <p className={cn("mt-3 text-cream-200/80", large ? "max-w-md text-base/relaxed" : "text-sm/relaxed")}>{promo.description}</p>

        {promo.includes && (
          <ul className={cn("mt-6 grid gap-2 text-sm text-cream-100", large && "sm:grid-cols-2")}>
            {promo.includes.map((line) => (
              <li key={line} className="flex items-center gap-2.5">
                <span aria-hidden className="size-1.5 rotate-45 bg-gold-400/80" />
                {line}
              </li>
            ))}
          </ul>
        )}
        {promo.terms && <p className="mt-5 text-xs text-cream-300/80">{promo.terms}</p>}
      </div>

      {/* Talón */}
      <div className="flex h-[5.5rem] items-center justify-between gap-4 border-t-2 border-dashed border-cream-50/15 px-7">
        <div className="flex flex-col gap-1.5">
          <ul className="flex gap-1" aria-label="Días disponibles">
            {weekOrder.map((day) => {
              const active = !promo.days || promo.days.includes(day);
              return (
                <li
                  key={day}
                  aria-hidden={!active}
                  className={cn(
                    "grid size-6 place-items-center rounded-full text-[0.6rem] font-bold",
                    active ? "bg-cream-50/15 text-cream-50" : "text-cream-50/25",
                  )}
                >
                  {dayInitials[day]}
                </li>
              );
            })}
          </ul>
          {promo.time && (
            <span className="flex items-center gap-1.5 text-xs text-cream-300">
              <Clock className="size-3.5" aria-hidden />
              {promo.time}
            </span>
          )}
        </div>
        <p className="text-right font-display leading-none text-gold-300">
          {promo.price !== undefined ? (
            <span className={large ? "text-5xl" : "text-4xl"}>{formatPrice(promo.price)}</span>
          ) : (
            <span className="text-2xl uppercase">{promo.priceLabel}</span>
          )}
        </p>
      </div>
    </article>
  );
}
