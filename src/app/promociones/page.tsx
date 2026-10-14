import type { Metadata } from "next";
import { whatsappLink } from "@/lib/utils";
import { PageTransition } from "@/components/layout/page-transition";
import { PageHero } from "@/components/layout/page-hero";
import { PromotionsBoard } from "@/components/promos/promotions-board";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Promociones",
  description: "Almuerzo ejecutivo, combos para compartir y promociones de la semana en Qumt'asim.",
};

export default function PromotionsPage() {
  return (
    <PageTransition>
      <PageHero
        eyebrow="Promociones"
        title="Para antojarse"
        accent="toda la semana"
        ghost="Promo"
        description="Almuerzos, combos para compartir y detalles de la casa. Filtra por día y aprovecha las que aplican hoy."
      />
      <PromotionsBoard />
      <Reveal className="mx-auto max-w-7xl px-5 pb-12 sm:px-8">
        <p className="max-w-2xl text-sm text-cream-300">
          Promociones válidas en el local, no acumulables entre sí y sujetas a disponibilidad. ¿Quieres una promoción para
          tu empresa?{" "}
          <a
            href={whatsappLink("Hola, quisiera saber más sobre las promociones.")}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-cream-100 underline underline-offset-4 hover:text-gold-300"
          >
            Escríbenos
          </a>
        </p>
      </Reveal>
    </PageTransition>
  );
}
