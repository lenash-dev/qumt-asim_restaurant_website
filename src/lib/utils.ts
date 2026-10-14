import { site } from "@/content/site";

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/** Espacio no separable para que "Bs" y el número nunca queden en líneas distintas. */
const NBSP = " ";

export function formatPrice(value: number) {
  return `${site.currency}${NBSP}${value.toLocaleString("es-BO")}`;
}

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function mapsLink() {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.contact.mapsQuery)}`;
}

export function isActivePath(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}
