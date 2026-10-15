import type { Metadata } from "next";
import { Clock, MapPin, Users } from "lucide-react";
import { site } from "@/content/site";
import { mapsLink, whatsappLink } from "@/lib/utils";
import { MAX_PARTY_SIZE } from "@/lib/reservation-slots";
import { PageTransition } from "@/components/layout/page-transition";
import { PageHero } from "@/components/layout/page-hero";
import { OpenStatus } from "@/components/layout/open-status";
import { ReservationForm } from "@/components/reservations/reservation-form";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Reservas",
  description: "Reserva tu mesa en Qumt'asim: elige el día, la hora y cuántas personas vienen.",
};

export default function ReservationsPage() {
  return (
    <PageTransition>
      <PageHero
        eyebrow="Reservas"
        title="Reserva tu mesa"
        accent="te guardamos el lugar"
        ghost="Mesa"
        description="Elige el día, la hora y cuántos vienen. Te confirmamos la reserva por llamada o WhatsApp."
      />

      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-24 sm:px-8 lg:grid-cols-12">
        <Reveal className="space-y-4 lg:col-span-4" y={30}>
          <div className="glass rounded-[1.75rem] p-6">
            <p className="flex items-center gap-2 text-xs font-bold tracking-[0.25em] text-cream-300 uppercase">
              <Clock className="size-4 text-gold-400" aria-hidden />
              Horario
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {site.hoursSummary.map((row) => (
                <li key={row.days} className="flex justify-between gap-4">
                  <span className="text-cream-100">{row.days}</span>
                  <span className="text-cream-300">{row.hours}</span>
                </li>
              ))}
            </ul>
            <OpenStatus className="mt-5" />
          </div>
          <a href={mapsLink()} target="_blank" rel="noopener noreferrer" className="glass sheen flex gap-3 rounded-[1.75rem] p-6 transition-colors hover:border-cream-50/30">
            <MapPin className="mt-0.5 size-5 shrink-0 text-gold-400" aria-hidden />
            <span className="text-sm">
              <span className="block text-cream-100">{site.contact.address}</span>
              <span className="text-cream-300">{site.contact.city} · Cómo llegar</span>
            </span>
          </a>
          <a
            href={whatsappLink("Hola, quisiera reservar para un grupo grande o un evento.")}
            target="_blank"
            rel="noopener noreferrer"
            className="glass sheen flex gap-3 rounded-[1.75rem] p-6 transition-colors hover:border-cream-50/30"
          >
            <Users className="mt-0.5 size-5 shrink-0 text-gold-400" aria-hidden />
            <span className="text-sm">
              <span className="block text-cream-100">¿Más de {MAX_PARTY_SIZE} personas o un evento?</span>
              <span className="inline-flex items-center gap-1.5 text-cream-300">
                <WhatsAppIcon className="size-4" /> Escríbenos y lo organizamos
              </span>
            </span>
          </a>
        </Reveal>
        <Reveal className="lg:col-span-8" delay={0.1} y={40}>
          <ReservationForm />
        </Reveal>
      </section>
    </PageTransition>
  );
}
