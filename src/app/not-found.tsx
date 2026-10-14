import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PageTransition } from "@/components/layout/page-transition";

export default function NotFound() {
  return (
    <PageTransition>
      <section className="mx-auto flex min-h-[90svh] max-w-3xl flex-col items-center justify-center px-5 pt-32 pb-16 text-center">
        <Image src="/brand/cholita.png" alt="" width={443} height={469} className="w-44 opacity-90 [mask-image:linear-gradient(to_bottom,#000_75%,transparent)]" />
        <Eyebrow className="mt-8 justify-center">Error 404</Eyebrow>
        <h1 className="mt-5 font-display text-[clamp(3rem,9vw,6rem)] leading-[0.9] uppercase">
          Este plato
          <span className="block font-serif text-[0.85em] tracking-tight normal-case italic text-gold-300">no está en la carta</span>
        </h1>
        <p className="mt-6 max-w-md text-cream-200/80">La página que buscas no existe o cambió de lugar. Mejor vuelve a la mesa principal.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" size="lg" arrow>
            Volver al inicio
          </ButtonLink>
          <ButtonLink href="/menu" variant="glass" size="lg">
            Ver el menú
          </ButtonLink>
        </div>
      </section>
    </PageTransition>
  );
}
