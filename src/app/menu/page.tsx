import type { Metadata } from "next";
import { site } from "@/content/site";
import { whatsappLink } from "@/lib/utils";
import { PageTransition } from "@/components/layout/page-transition";
import { PageHero } from "@/components/layout/page-hero";
import { MenuExplorer } from "@/components/menu/menu-explorer";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Menú",
  description: "La carta de Qumt'asim: sopas, platos de fondo, antojitos, bebidas y postres de la cocina boliviana.",
};

export default function MenuPage() {
  return (
    <PageTransition>
      <PageHero
        eyebrow="La carta"
        title="Nuestro menú"
        accent="hecho en casa"
        ghost="Menú"
        description="Platos típicos preparados cada día con recetas de siempre. Elige una categoría o busca tu antojo."
      />
      <MenuExplorer />
      <Reveal className="mx-auto max-w-7xl px-5 pb-12 sm:px-8">
        <div className="glass flex flex-col items-start justify-between gap-6 rounded-[2rem] p-8 sm:flex-row sm:items-center">
          <p className="max-w-xl text-sm/relaxed text-cream-200/80">
            Precios en bolivianos ({site.currency}), sujetos a cambio. ¿Alguna alergia o restricción? Avísanos al pedir y
            adaptamos tu plato.
          </p>
          <ButtonLink href={whatsappLink("Hola, tengo una consulta sobre el menú.")} variant="glass" arrow>
            Consultar por WhatsApp
          </ButtonLink>
        </div>
      </Reveal>
    </PageTransition>
  );
}
