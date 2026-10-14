import { Glasses, HeartHandshake, ScrollText, Wheat } from "lucide-react";
import { dishes } from "@/content/menu";
import { promotions } from "@/content/promotions";
import { services } from "@/content/corporate";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Counter } from "@/components/motion/counter";

const values = [
  {
    icon: ScrollText,
    title: "Recetas heredadas",
    text: "Cada plato nace de recetas que pasaron de generación en generación.",
  },
  {
    icon: Wheat,
    title: "Sabor de los Andes",
    text: "Papa, chuño, maíz, quinua y ají: lo mejor de nuestra tierra en cada plato.",
  },
  {
    icon: Glasses,
    title: "Con actitud",
    text: "Respetamos la tradición sin tomarnos tan en serio. Como la abuela con lentes de sol.",
  },
  {
    icon: HeartHandshake,
    title: "Hecho con cariño",
    text: "Porciones generosas y atención de casa, para que vuelvas siempre.",
  },
];

const stats = [
  { value: dishes.length, label: "platos en carta" },
  { value: promotions.length, label: "promociones" },
  { value: services.length, label: "servicios para empresas" },
];

export function Essence() {
  return (
    <section className="relative py-28 sm:py-36">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6 lg:pr-6">
          <SectionHeading
            eyebrow="Nuestra esencia"
            title="De la olla de la abuela"
            accent="a tu mesa"
            description="Qumt'asim es la cocina de siempre con la frente en alto: platos típicos preparados como en casa, servidos con orgullo y un poquito de estilo."
          />
          <Reveal delay={0.2} y={24}>
            <dl className="mt-12 grid grid-cols-3 gap-4 border-t border-cream-50/10 pt-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <Counter to={stat.value} className="block font-display text-5xl text-gold-300 sm:text-6xl" />
                    <span className="mt-2 block text-xs font-semibold tracking-wide text-cream-300 uppercase">{stat.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:col-span-6">
          {values.map(({ icon: Icon, title, text }, index) => (
            <RevealItem key={title} className={index % 2 === 1 ? "sm:translate-y-14" : undefined}>
              <SpotlightCard className="glass h-full rounded-[1.75rem] p-7">
                <span className="grid size-12 place-items-center rounded-2xl bg-gold-400/15 text-gold-300 ring-1 ring-gold-400/25">
                  <Icon className="size-6" strokeWidth={1.6} />
                </span>
                <h3 className="mt-6 font-display text-2xl uppercase">{title}</h3>
                <p className="mt-2 text-sm/relaxed text-cream-200/75">{text}</p>
              </SpotlightCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
