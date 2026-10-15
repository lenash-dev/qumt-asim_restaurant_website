import Link from "next/link";
import type { Dish } from "@/content/menu";
import type { Promotion } from "@/content/promotions";
import { services } from "@/content/corporate";
import { whatsappLink } from "@/lib/utils";
import { ButtonArrow, ButtonLink } from "@/components/ui/button";
import { Marquee } from "@/components/ui/marquee";
import { SectionHeading } from "@/components/ui/section-heading";
import { FeaturedDishCard } from "@/components/menu/dish-card";
import { PromoTicket } from "@/components/promos/promo-ticket";
import { serviceIcons } from "@/components/corporate/service-icons";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";

/** Cintas inclinadas con los nombres de los platos */
export function DishMarquee({ names }: { names: string[] }) {
  if (names.length < 2) return null;
  const half = Math.ceil(names.length / 2);
  return (
    <section aria-label="Algunos de nuestros platos" className="relative py-10">
      <div className="relative -rotate-2 border-y border-cream-50/10 bg-wine-800/70 py-6 backdrop-blur-sm sm:-mx-4">
        <div aria-hidden className="aguayo-stripe absolute inset-x-0 -top-px h-1 opacity-80" />
        <Marquee items={names.slice(0, half)} duration={45} />
        <Marquee items={names.slice(half)} reverse outline duration={55} className="mt-4" />
        <div aria-hidden className="aguayo-stripe absolute inset-x-0 -bottom-px h-1 opacity-80" />
      </div>
    </section>
  );
}

export function SignatureDishes({ dishes, total }: { dishes: Dish[]; total: number }) {
  if (dishes.length === 0) return null;
  return (
    <section className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="La carta"
            title="Lo más pedido"
            accent="los favoritos de la casa"
            description={`Una selección de los ${total} platos de nuestra carta. El menú cambia cada día: míralo completo.`}
          />
          <Reveal y={20} delay={0.2}>
            <ButtonLink href="/menu" variant="glass" arrow>
              Ver menú de hoy
            </ButtonLink>
          </Reveal>
        </div>

        <RevealGroup className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {dishes.slice(0, 3).map((dish, index) => (
            <RevealItem key={dish.id} className={index === 1 ? "lg:translate-y-10" : undefined}>
              <FeaturedDishCard dish={dish} index={index} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

export function PromotionsPreview({ promotions }: { promotions: Promotion[] }) {
  if (promotions.length === 0) return null;
  const [main, ...rest] = [...promotions].sort((a, b) => Number(Boolean(b.highlight)) - Number(Boolean(a.highlight)));
  return (
    <section className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Promociones"
            title="Para antojarse"
            accent="toda la semana"
            description="Combos, almuerzos y detalles de la casa. Las promociones marcadas con «Hoy» aplican el día de hoy."
          />
          <Reveal y={20} delay={0.2}>
            <ButtonLink href="/promociones" variant="glass" arrow>
              Ver todas
            </ButtonLink>
          </Reveal>
        </div>

        <RevealGroup className="mt-16 grid gap-5 lg:grid-cols-2">
          <RevealItem className="lg:row-span-2">
            <PromoTicket promo={main} size="lg" />
          </RevealItem>
          {rest.slice(0, 2).map((promo) => (
            <RevealItem key={promo.id}>
              <PromoTicket promo={promo} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

export function CorporateBand() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-3 sm:px-8">
        <Reveal y={60} amount={0.15}>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-cream-50/10 bg-wine-800/80 px-6 py-16 sm:px-14 sm:py-20">
            <div aria-hidden className="bg-andean absolute inset-0 opacity-[0.05]" />
            <div aria-hidden className="absolute -top-1/2 -right-1/4 size-[70%] rounded-full bg-[radial-gradient(circle,rgb(240_181_77/0.22),transparent_65%)]" />

            <div className="relative grid gap-14 lg:grid-cols-2 lg:items-center">
              <div>
                <SectionHeading
                  eyebrow="Para empresas"
                  title="Sabor que trabaja"
                  accent="para tu equipo"
                  description="Almuerzos corporativos, catering y convenios con contrato y facturación. Tu equipo come rico; tú te olvidas de la logística."
                />
                <Reveal delay={0.2} y={20}>
                  <div className="mt-10 flex flex-wrap gap-3">
                    <ButtonLink href="/empresas#cotizar" size="lg" arrow>
                      Solicitar cotización
                    </ButtonLink>
                    <ButtonLink
                      href={whatsappLink("Hola, quisiera información sobre los servicios para empresas.")}
                      variant="glass"
                      size="lg"
                    >
                      Hablar por WhatsApp
                    </ButtonLink>
                  </div>
                </Reveal>
              </div>

              <RevealGroup className="grid gap-3 sm:grid-cols-2">
                {services.map((service) => {
                  const Icon = serviceIcons[service.id];
                  return (
                    <RevealItem key={service.id}>
                      <Link
                        href="/empresas"
                        className="group glass sheen flex h-full flex-col rounded-3xl p-6 transition-colors hover:border-cream-50/30"
                      >
                        <span className="flex items-center justify-between">
                          <Icon className="size-7 text-gold-300" strokeWidth={1.5} />
                          <ButtonArrow className="text-cream-300 group-hover:text-cream-50" />
                        </span>
                        <span className="mt-5 font-display text-xl uppercase">{service.title}</span>
                        <span className="mt-1.5 text-sm/relaxed text-cream-200/70">{service.description}</span>
                      </Link>
                    </RevealItem>
                  );
                })}
              </RevealGroup>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
