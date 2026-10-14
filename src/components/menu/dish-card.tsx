import Image from "next/image";
import { Croissant, CupSoda, IceCreamBowl, Soup, UtensilsCrossed, type LucideIcon } from "lucide-react";
import { tagLabels, type CategoryId, type Dish } from "@/content/menu";
import { cn, formatPrice } from "@/lib/utils";
import { SpotlightCard } from "@/components/ui/spotlight-card";

export const categoryIcons: Record<CategoryId, LucideIcon> = {
  entradas: Croissant,
  sopas: Soup,
  segundos: UtensilsCrossed,
  bebidas: CupSoda,
  postres: IceCreamBowl,
};

/**
 * Ilustración de "plato" mientras no haya fotografías: aro con patrón andino
 * y el ícono de la categoría. Si el plato tiene `image`, se muestra la foto.
 */
export function DishVisual({ dish, className }: { dish: Dish; className?: string }) {
  const Icon = categoryIcons[dish.category];
  if (dish.image) {
    return (
      <div className={cn("relative aspect-square overflow-hidden rounded-full ring-1 ring-cream-50/15", className)}>
        <Image src={dish.image} alt={dish.name} fill sizes="240px" className="object-cover" />
      </div>
    );
  }
  return (
    <div aria-hidden className={cn("relative aspect-square rounded-full", className)}>
      <div className="absolute inset-0 rounded-full border border-cream-50/15 bg-wine-800/60" />
      <div className="bg-andean absolute inset-[6%] rounded-full opacity-25 [mask-image:radial-gradient(circle,transparent_52%,#000_54%)]" />
      <div className="absolute inset-[22%] grid place-items-center rounded-full bg-[radial-gradient(circle_at_35%_30%,var(--color-wine-600),var(--color-wine-800))] shadow-[inset_0_2px_0_rgb(255_255_255/0.12),0_18px_30px_-12px_rgb(0_0_0/0.6)] ring-1 ring-cream-50/15 transition-transform duration-700 ease-out group-hover/spot:rotate-[-8deg] group-hover/spot:scale-105">
        <Icon className="size-[42%] text-gold-300" strokeWidth={1.4} />
      </div>
    </div>
  );
}

export function DishTags({ dish, className }: { dish: Dish; className?: string }) {
  if (!dish.tags?.length) return null;
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)}>
      {dish.tags.map((tag) => (
        <li
          key={tag}
          className={cn(
            "rounded-full px-2.5 py-1 text-[0.65rem] font-bold tracking-wider uppercase ring-1",
            tag === "picante" && "bg-aguayo-rose/15 text-[#ff9dbb] ring-aguayo-rose/30",
            tag === "vegetariano" && "bg-aguayo-green/15 text-[#8fe0b9] ring-aguayo-green/30",
            (tag === "popular" || tag === "de-la-casa") && "bg-gold-400/15 text-gold-300 ring-gold-400/30",
            tag === "para-compartir" && "bg-cream-50/10 text-cream-100 ring-cream-50/20",
          )}
        >
          {tagLabels[tag]}
        </li>
      ))}
    </ul>
  );
}

/** Tarjeta destacada (inicio) */
export function FeaturedDishCard({ dish, index }: { dish: Dish; index: number }) {
  return (
    <SpotlightCard className="glass flex h-full flex-col rounded-[2rem] p-7 sm:p-8">
      <div className="flex items-start justify-between">
        <span className="font-display text-6xl leading-none text-cream-50/15">{String(index + 1).padStart(2, "0")}</span>
        <DishTags dish={dish} className="justify-end" />
      </div>
      <DishVisual dish={dish} className="mx-auto my-8 w-[62%]" />
      <h3 className="font-display text-4xl leading-none uppercase">{dish.name}</h3>
      <p className="mt-3 flex-1 text-sm/relaxed text-cream-200/75">{dish.description}</p>
      <div className="mt-7 flex items-center gap-4">
        <span className="h-px flex-1 bg-gradient-to-r from-cream-50/25 to-transparent" />
        <span className="font-display text-3xl text-gold-300">{formatPrice(dish.price)}</span>
      </div>
    </SpotlightCard>
  );
}

/** Fila de carta compacta (página de menú) */
export function DishCard({ dish }: { dish: Dish }) {
  return (
    <SpotlightCard className="glass flex h-full gap-5 rounded-[1.75rem] p-5 sm:p-6">
      <DishVisual dish={dish} className="w-16 shrink-0 self-start sm:w-24" />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="min-w-0 font-display text-2xl leading-tight uppercase">{dish.name}</h3>
          <span aria-hidden className="mb-1.5 hidden min-w-4 flex-1 border-b border-dotted border-cream-50/25 sm:block" />
          <span className="shrink-0 font-display text-xl whitespace-nowrap text-gold-300">{formatPrice(dish.price)}</span>
        </div>
        <p className="mt-1.5 text-sm/relaxed text-cream-200/75">{dish.description}</p>
        <DishTags dish={dish} className="mt-3" />
      </div>
    </SpotlightCard>
  );
}
