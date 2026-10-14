"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, stagger, type Variants } from "motion/react";
import { useLenis } from "lenis/react";
import { Search, X } from "lucide-react";
import { categories, dishes, type CategoryId } from "@/content/menu";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { easeOutExpo } from "@/components/motion/reveal";
import { DishCard } from "./dish-card";

type Filter = CategoryId | "todo";

const tabs: { id: Filter; label: string }[] = [{ id: "todo", label: "Todo" }, ...categories];

const container: Variants = {
  hidden: {},
  shown: { transition: { delayChildren: stagger(0.045) } },
  exit: { opacity: 0, y: 24, filter: "blur(6px)", transition: { duration: 0.28, ease: "easeIn" } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 32 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOutExpo } },
};

const normalize = (text: string) =>
  text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

export function MenuExplorer() {
  const [active, setActive] = useState<Filter>("todo");
  const [query, setQuery] = useState("");
  const resultsRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  const term = normalize(query.trim());
  const groups = useMemo(
    () =>
      categories
        .filter((category) => active === "todo" || category.id === active)
        .map((category) => ({
          ...category,
          items: dishes.filter(
            (dish) => dish.category === category.id && (!term || normalize(`${dish.name} ${dish.description}`).includes(term)),
          ),
        }))
        .filter((group) => group.items.length > 0),
    [active, term],
  );

  function selectTab(id: Filter) {
    setActive(id);
    const results = resultsRef.current;
    if (results && results.getBoundingClientRect().top < 0) {
      if (lenis) lenis.scrollTo(results, { offset: -190 });
      else results.scrollIntoView({ behavior: "smooth" });
    }
  }

  const searchInput = (
    <label className="relative block sm:w-64">
      <span className="sr-only">Buscar en el menú</span>
      <Search aria-hidden className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-cream-300" />
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Buscar un plato…"
        className="h-11 w-full rounded-full bg-wine-950/50 pr-4 pl-11 text-sm text-cream-50 ring-1 ring-cream-50/10 outline-none placeholder:text-cream-300/70 focus:ring-2 focus:ring-gold-400/60"
      />
    </label>
  );

  return (
    <section aria-label="Carta" className="relative pb-16">
      <div className="mx-auto mb-3 max-w-7xl px-5 sm:hidden">{searchInput}</div>

      <div className="sticky top-[5.6rem] z-30 mx-auto max-w-7xl px-3 sm:top-24 sm:px-8">
        <div className="glass-strong flex items-center gap-2 rounded-full p-1.5">
          <div role="tablist" aria-label="Categorías" className="flex min-w-0 flex-1 gap-1 overflow-x-auto [scrollbar-width:none]">
            {tabs.map((tab) => {
              const isActive = active === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => selectTab(tab.id)}
                  className={cn(
                    "relative shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors duration-300",
                    isActive ? "text-wine-900" : "text-cream-200/80 hover:text-cream-50",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="menu-tab"
                      className="absolute inset-0 rounded-full bg-cream-50"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative">{tab.label}</span>
                </button>
              );
            })}
          </div>
          <div className="hidden sm:block">{searchInput}</div>
        </div>
      </div>

      {/* Altura mínima: evita que la página "salte" al filtrar categorías cortas */}
      <div ref={resultsRef} className="mx-auto mt-14 min-h-[75svh] max-w-7xl px-5 sm:px-8">
        <AnimatePresence mode="wait">
          <motion.div key={active} variants={container} initial="hidden" animate="shown" exit="exit" className="space-y-20">
            {groups.map((group) => (
              <section key={group.id} aria-labelledby={`categoria-${group.id}`}>
                <motion.div variants={item} className="flex items-end justify-between gap-6 border-b border-cream-50/10 pb-5">
                  <div>
                    <h2 id={`categoria-${group.id}`} className="font-display text-4xl uppercase sm:text-5xl">
                      {group.label}
                    </h2>
                    <p className="mt-1 text-cream-300">{group.blurb}</p>
                  </div>
                  <span aria-hidden className="font-display text-6xl leading-none text-cream-50/10 sm:text-7xl">
                    {String(group.items.length).padStart(2, "0")}
                  </span>
                </motion.div>

                <ul className="mt-8 grid gap-4 md:grid-cols-2">
                  <AnimatePresence mode="popLayout">
                    {group.items.map((dish) => (
                      <motion.li
                        key={dish.id}
                        layout
                        variants={item}
                        exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.25 } }}
                      >
                        <DishCard dish={dish} />
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              </section>
            ))}

            {groups.length === 0 && (
              <motion.div variants={item} className="glass rounded-[2rem] px-6 py-16 text-center">
                <p className="font-display text-3xl uppercase">Ese plato no está en la carta</p>
                <p className="mt-2 text-cream-300">No encontramos resultados para «{query}».</p>
                <Button variant="glass" size="sm" className="mt-6" onClick={() => setQuery("")}>
                  <X className="size-4" aria-hidden />
                  Limpiar búsqueda
                </Button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
