import Image from "next/image";
import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { nav, site } from "@/content/site";
import { mapsLink, whatsappLink } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FacebookIcon, InstagramIcon, TikTokIcon, WhatsAppIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/motion/reveal";
import { RiseLine } from "@/components/motion/rise-line";
import { CurrentYear } from "./current-year";
import { OpenStatus } from "./open-status";

const socials = [
  { href: site.socials.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: site.socials.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: site.socials.tiktok, label: "TikTok", Icon: TikTokIcon },
];

export function Footer() {
  return (
    <footer id="contacto" className="relative mt-16 overflow-hidden border-t border-cream-50/10 bg-wine-950/40">
      <div aria-hidden className="aguayo-stripe h-1.5 w-full opacity-90" />

      <div className="mx-auto max-w-7xl px-5 pt-20 pb-10 sm:px-8 sm:pt-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal y={16}>
              <Eyebrow>Visítanos</Eyebrow>
            </Reveal>
            <h2 className="mt-5 font-display text-[clamp(3rem,7vw,5rem)] leading-[0.9] uppercase">
              <RiseLine>Te esperamos</RiseLine>
              <RiseLine delay={0.08} className="font-serif text-[1.08em] tracking-tight normal-case italic text-gold-300">
                con la mesa servida
              </RiseLine>
            </h2>
            <Reveal delay={0.15} y={20}>
              <p className="mt-6 max-w-md text-cream-200/80">
                Reserva tu mesa en línea en un minuto o, si prefieres, escríbenos por WhatsApp.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/reservas" size="lg" arrow>
                  Reservar mesa
                </ButtonLink>
                <ButtonLink href={whatsappLink("¡Hola Qumt'asim! Quisiera reservar una mesa.")} variant="glass" size="lg">
                  <WhatsAppIcon className="size-5" />
                  WhatsApp
                </ButtonLink>
                <ButtonLink href={mapsLink()} variant="glass" size="lg" arrow>
                  Cómo llegar
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <Reveal className="grid gap-10 sm:grid-cols-3 lg:col-span-7 lg:pl-10" delay={0.1}>
            <div>
              <h3 className="text-xs font-bold tracking-[0.3em] text-cream-300 uppercase">Dónde</h3>
              <ul className="mt-5 space-y-4 text-sm text-cream-100">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-gold-400" aria-hidden />
                  <span>
                    {site.contact.address}
                    <br />
                    <span className="text-cream-300">{site.contact.city}</span>
                  </span>
                </li>
                <li>
                  <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className="flex gap-3 hover:text-gold-300">
                    <Phone className="mt-0.5 size-4 shrink-0 text-gold-400" aria-hidden />
                    {site.contact.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${site.contact.email}`} className="flex gap-3 break-all hover:text-gold-300">
                    <Mail className="mt-0.5 size-4 shrink-0 text-gold-400" aria-hidden />
                    {site.contact.email}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold tracking-[0.3em] text-cream-300 uppercase">Horario</h3>
              <ul className="mt-5 space-y-3 text-sm">
                {site.hoursSummary.map((row) => (
                  <li key={row.days} className="flex gap-3">
                    <Clock className="mt-0.5 size-4 shrink-0 text-gold-400" aria-hidden />
                    <span>
                      <span className="block text-cream-100">{row.days}</span>
                      <span className="text-cream-300">{row.hours}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <OpenStatus className="mt-5" />
            </div>

            <div>
              <h3 className="text-xs font-bold tracking-[0.3em] text-cream-300 uppercase">Explora</h3>
              <ul className="mt-5 space-y-2.5 text-sm">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-cream-100 transition-colors hover:text-gold-300">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex gap-2">
                {socials.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="glass grid size-10 place-items-center rounded-full text-cream-50 transition-colors hover:text-gold-300"
                  >
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal y={60} className="relative mt-20 sm:mt-28" amount={0.4}>
          <Image src="/brand/wordmark.png" alt="" width={924} height={194} className="w-full opacity-[0.08]" />
        </Reveal>

        <div className="mt-10 flex flex-col gap-3 border-t border-cream-50/10 pt-6 text-xs text-cream-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CurrentYear /> {site.legalName}. Todos los derechos reservados.
          </p>
          <p>Tradición andina con actitud · {site.contact.city}</p>
        </div>
      </div>
    </footer>
  );
}
