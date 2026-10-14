"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { nav } from "@/content/site";
import { cn, isActivePath, whatsappLink } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { easeOutExpo } from "@/components/motion/reveal";
import { MobileMenu } from "./mobile-menu";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useMotionValueEvent(scrollY, "change", (value) => setScrolled(value > 24));

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
        <motion.div
          initial={{ y: -32, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.1, ease: easeOutExpo, delay: 0.15 }}
          // El nombre ancla el header durante las transiciones de página.
          // Va en este elemento (no en <header>) para no romper su backdrop-filter.
          style={{ viewTransitionName: "site-header" }}
          className={cn(
            "mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 rounded-full pr-2 pl-2 transition-[background-color,box-shadow,height] duration-500",
            scrolled || menuOpen ? "glass-strong" : "glass",
          )}
        >
          <Link href="/" aria-label="Qumt'asim, ir al inicio" className="group flex items-center gap-3 rounded-full pr-2">
            <span className="relative block size-12 shrink-0 overflow-hidden rounded-full bg-wine-800 ring-1 ring-cream-50/20 transition-transform duration-500 group-hover:rotate-[-6deg]">
              <Image
                src="/brand/cholita.png"
                alt=""
                width={443}
                height={469}
                priority
                className="absolute top-[8%] left-[-4%] w-[118%] max-w-none"
              />
            </span>
            <Image src="/brand/wordmark.png" alt="Qumt'asim" width={924} height={194} priority className="h-[22px] w-auto sm:h-6" />
          </Link>

          <nav aria-label="Principal" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative block rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300",
                        active ? "text-cream-50" : "text-cream-200/75 hover:text-cream-50",
                      )}
                    >
                      {active && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-full bg-cream-50/12 ring-1 ring-cream-50/20"
                          transition={{ type: "spring", bounce: 0.22, duration: 0.6 }}
                        />
                      )}
                      <span className="relative">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <ButtonLink href={whatsappLink("¡Hola Qumt'asim! Quisiera reservar una mesa.")} size="sm" arrow>
                Reservar
              </ButtonLink>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              className="glass relative grid size-12 place-items-center rounded-full md:hidden"
            >
              <span className="relative block h-3.5 w-5">
                <motion.span
                  className="absolute left-0 block h-0.5 w-5 rounded-full bg-cream-50"
                  animate={menuOpen ? { top: "50%", y: "-50%", rotate: 45 } : { top: "0%", y: "0%", rotate: 0 }}
                  transition={{ duration: 0.45, ease: easeOutExpo }}
                />
                <motion.span
                  className="absolute left-0 block h-0.5 w-5 rounded-full bg-cream-50"
                  animate={menuOpen ? { top: "50%", y: "-50%", rotate: -45 } : { top: "100%", y: "-100%", rotate: 0 }}
                  transition={{ duration: 0.45, ease: easeOutExpo }}
                />
              </span>
            </button>
          </div>
        </motion.div>
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} pathname={pathname} />
    </>
  );
}
