"use client";

import Link from "next/link";
import { useEffect, type MouseEvent } from "react";
import { AnimatePresence, motion, stagger, type Variants } from "motion/react";
import { useLenis } from "lenis/react";
import { nav, site } from "@/content/site";
import { cn, isActivePath, whatsappLink } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { Diamond } from "@/components/ui/eyebrow";
import { InstagramIcon, FacebookIcon, TikTokIcon, WhatsAppIcon } from "@/components/ui/icons";
import { easeOutExpo } from "@/components/motion/reveal";

const panel: Variants = {
  closed: { clipPath: "circle(0% at calc(100% - 3rem) 2.75rem)", transition: { duration: 0.6, ease: [0.7, 0, 0.84, 0], delay: 0.15 } },
  open: { clipPath: "circle(150% at calc(100% - 3rem) 2.75rem)", transition: { duration: 0.9, ease: easeOutExpo } },
};

const list: Variants = {
  closed: { transition: { delayChildren: stagger(0.04, { from: "last" }) } },
  open: { transition: { delayChildren: stagger(0.07, { startDelay: 0.2 }) } },
};

const item: Variants = {
  closed: { y: "110%", opacity: 0, transition: { duration: 0.35, ease: [0.7, 0, 0.84, 0] } },
  open: { y: "0%", opacity: 1, transition: { duration: 0.9, ease: easeOutExpo } },
};

export function MobileMenu({ open, onClose, pathname }: { open: boolean; onClose: () => void; pathname: string }) {
  const lenis = useLenis();

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, lenis, onClose]);

  function goToContact(event: MouseEvent<HTMLAnchorElement>) {
    // Lenis está detenido mientras el menú está abierto: forzamos el scroll.
    event.preventDefault();
    onClose();
    const target = document.getElementById("contacto");
    if (!target) return;
    if (lenis) lenis.scrollTo(target, { offset: -110, force: true });
    else target.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
          className="fixed inset-0 z-40 md:hidden"
          initial="closed"
          animate="open"
          exit="closed"
        >
          <motion.div variants={panel} className="absolute inset-0 bg-wine-950/80 backdrop-blur-2xl">
            <div className="bg-andean absolute inset-0 opacity-[0.05]" />
            <div className="absolute -right-1/3 -bottom-1/4 size-[120vw] rounded-full bg-[radial-gradient(circle,rgb(240_181_77/0.18),transparent_60%)]" />
          </motion.div>

          <div className="relative flex h-full flex-col justify-between overflow-y-auto px-6 pt-28 pb-10">
            <motion.ul variants={list} className="space-y-1">
              {nav.map((link, index) => {
                const active = isActivePath(pathname, link.href);
                return (
                  <li key={link.href} className="overflow-hidden">
                    <motion.div variants={item}>
                      <Link
                        href={link.href}
                        onClick={onClose}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex items-baseline gap-4 py-1 font-display text-[clamp(3rem,15vw,4.5rem)] leading-none uppercase transition-colors",
                          active ? "text-gold-300" : "text-cream-50",
                        )}
                      >
                        <span className="font-sans text-xs font-bold tracking-widest text-cream-300">0{index + 1}</span>
                        {link.label}
                      </Link>
                    </motion.div>
                  </li>
                );
              })}
            </motion.ul>

            <motion.div variants={list} className="mt-12 space-y-6">
              <motion.div variants={item}>
                <ButtonLink href={whatsappLink("¡Hola Qumt'asim! Quisiera reservar una mesa.")} size="lg" className="w-full">
                  <WhatsAppIcon className="size-5" />
                  Reservar por WhatsApp
                </ButtonLink>
              </motion.div>
              <motion.div variants={item} className="flex items-center justify-between text-sm text-cream-200/80">
                <a href="#contacto" onClick={goToContact} className="flex items-center gap-2 hover:text-cream-50">
                  <Diamond /> Contacto y horarios
                </a>
                <div className="flex gap-2">
                  {[
                    { href: site.socials.instagram, label: "Instagram", Icon: InstagramIcon },
                    { href: site.socials.facebook, label: "Facebook", Icon: FacebookIcon },
                    { href: site.socials.tiktok, label: "TikTok", Icon: TikTokIcon },
                  ].map(({ href, label, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="glass grid size-10 place-items-center rounded-full text-cream-50"
                    >
                      <Icon className="size-4" />
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
