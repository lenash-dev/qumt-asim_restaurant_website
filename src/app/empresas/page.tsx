import type { Metadata } from "next";
import { Check, Mail, Phone } from "lucide-react";
import { modalities, services } from "@/content/corporate";
import { site } from "@/content/site";
import { cn, whatsappLink } from "@/lib/utils";
import { PageTransition } from "@/components/layout/page-transition";
import { PageHero } from "@/components/layout/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { WhatsAppIcon } from "@/components/ui/icons";
import { serviceIcons } from "@/components/corporate/service-icons";
import { ProcessSteps } from "@/components/corporate/process-steps";
import { FaqList } from "@/components/corporate/faq-list";
import { QuoteForm } from "@/components/corporate/quote-form";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Servicios para empresas",
  description:
    "Almuerzos corporativos, catering para eventos, coffee break andino y convenios con facturación. Cotiza un contrato con Qumt'asim.",
};

export default function CorporatePage() {
  return (
    <PageTransition>
      <PageHero
        eyebrow="Qumt'asim para empresas"
        title="Sabor que trabaja"
        accent="para tu equipo"
        ghost="Empresas"
        description="Alimentamos equipos con la cocina de siempre: almuerzos diarios, eventos y convenios con contrato y facturación a nombre de tu empresa."
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="#cotizar" size="lg" arrow>
            Solicitar cotización
          </ButtonLink>
          <ButtonLink href={whatsappLink("Hola, quisiera información sobre los servicios para empresas.")} variant="glass" size="lg">
            <WhatsAppIcon className="size-5" />
            Hablar por WhatsApp
          </ButtonLink>
        </div>
      </PageHero>

      {/* Servicios */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <RevealGroup className="grid gap-5 md:grid-cols-2">
          {services.map((service, index) => {
            const Icon = serviceIcons[service.id];
            return (
              <RevealItem key={service.id}>
                <SpotlightCard className="glass h-full rounded-[2rem] p-8 sm:p-10">
                  <div className="flex items-start justify-between">
                    <span className="grid size-14 place-items-center rounded-2xl bg-gold-400/15 text-gold-300 ring-1 ring-gold-400/25">
                      <Icon className="size-7" strokeWidth={1.5} />
                    </span>
                    <span className="font-display text-5xl leading-none text-cream-50/10">0{index + 1}</span>
                  </div>
                  <h2 className="mt-8 font-display text-4xl leading-none uppercase">{service.title}</h2>
                  <p className="mt-3 text-cream-200/80">{service.description}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-center gap-1.5 rounded-full bg-cream-50/8 px-3 py-1.5 text-xs font-semibold text-cream-100 ring-1 ring-cream-50/12">
                        <Check className="size-3.5 text-gold-300" aria-hidden />
                        {point}
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </section>

      {/* Modalidades */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <SectionHeading eyebrow="Modalidades" title="Elige cómo" accent="trabajamos juntos" align="center" />
        <RevealGroup className="mt-16 grid gap-5 lg:grid-cols-3 lg:items-center">
          {modalities.map((modality) => (
            <RevealItem key={modality.title}>
              <div
                className={cn(
                  "glass relative flex h-full flex-col rounded-[2rem] p-8",
                  modality.highlight && "shadow-[0_0_70px_-24px_rgb(240_181_77/0.55)] ring-1 ring-gold-400/60 lg:py-12",
                )}
              >
                {modality.highlight && (
                  <span className="absolute -top-3 left-8 rounded-full bg-gold-400 px-3 py-1 text-[0.65rem] font-extrabold tracking-[0.2em] text-wine-900 uppercase">
                    Recomendado
                  </span>
                )}
                <h3 className="font-display text-3xl uppercase">{modality.title}</h3>
                <p className="mt-3 text-sm/relaxed text-cream-200/80">{modality.description}</p>
                <ul className="mt-6 space-y-2.5 text-sm text-cream-100">
                  {modality.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5">
                      <Check className="size-4 text-gold-300" aria-hidden />
                      {feature}
                    </li>
                  ))}
                </ul>
                <ButtonLink href="#cotizar" variant={modality.highlight ? "solid" : "glass"} className="mt-8 self-start" arrow>
                  Cotizar
                </ButtonLink>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Proceso */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <SectionHeading eyebrow="Cómo funciona" title="Del primer mensaje" accent="a la mesa servida" align="center" />
        <ProcessSteps />
      </section>

      {/* Cotización */}
      <section id="cotizar" className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Cotiza"
              title="Hablemos"
              accent="de tu próximo contrato"
              description="Cuéntanos qué necesita tu equipo y te enviamos una propuesta a medida."
            />
            <Reveal delay={0.2} y={20}>
              <ul className="mt-10 space-y-3">
                <li>
                  <a href={whatsappLink("Hola, quisiera cotizar un servicio para empresas.")} target="_blank" rel="noopener noreferrer" className="glass sheen flex items-center gap-4 rounded-2xl p-4 transition-colors hover:border-cream-50/30">
                    <WhatsAppIcon className="size-6 text-gold-300" />
                    <span>
                      <span className="block text-xs font-bold tracking-[0.2em] text-cream-300 uppercase">WhatsApp</span>
                      <span className="text-cream-50">{site.contact.phone}</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a href={`mailto:${site.contact.email}`} className="glass sheen flex items-center gap-4 rounded-2xl p-4 transition-colors hover:border-cream-50/30">
                    <Mail className="size-6 text-gold-300" aria-hidden />
                    <span>
                      <span className="block text-xs font-bold tracking-[0.2em] text-cream-300 uppercase">Correo</span>
                      <span className="text-cream-50">{site.contact.email}</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className="glass sheen flex items-center gap-4 rounded-2xl p-4 transition-colors hover:border-cream-50/30">
                    <Phone className="size-6 text-gold-300" aria-hidden />
                    <span>
                      <span className="block text-xs font-bold tracking-[0.2em] text-cream-300 uppercase">Teléfono</span>
                      <span className="text-cream-50">{site.contact.phone}</span>
                    </span>
                  </a>
                </li>
              </ul>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-7" delay={0.1} y={40}>
            <QuoteForm />
          </Reveal>
        </div>
      </section>

      {/* Preguntas frecuentes */}
      <section className="mx-auto max-w-4xl px-5 py-24 sm:px-8">
        <SectionHeading eyebrow="Preguntas frecuentes" title="Lo que suelen" accent="preguntarnos" align="center" />
        <Reveal className="mt-14" delay={0.1}>
          <FaqList />
        </Reveal>
      </section>
    </PageTransition>
  );
}
