import type { Metadata } from "next";
import { site } from "@/content/site";
import { getTodayMenu } from "@/lib/data";
import { whatsappLink } from "@/lib/utils";
import { PageTransition } from "@/components/layout/page-transition";
import { PageHero } from "@/components/layout/page-hero";
import { DailyMenu } from "@/components/menu/daily-menu";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Menú del día",
  description: "El menú de hoy en Qumt'asim: almuerzo ejecutivo, opciones saludables y platos extras de la cocina boliviana.",
};

const longDate = (iso: string) =>
  new Intl.DateTimeFormat("es-BO", { timeZone: "UTC", weekday: "long", day: "numeric", month: "long" }).format(new Date(`${iso}T00:00:00Z`));

export default async function MenuPage() {
  const menu = await getTodayMenu();
  const today = longDate(menu.date);

  return (
    <PageTransition>
      <PageHero
        eyebrow={`Menú de hoy · ${today}`}
        title="Nuestro menú"
        accent="cambia cada día"
        ghost="Menú"
        description="Lo que preparamos hoy, con recetas de siempre. Elige desayuno, almuerzo o cena y busca tu antojo."
      />
      <DailyMenu menu={menu} />
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
