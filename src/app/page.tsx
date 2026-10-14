import { PageTransition } from "@/components/layout/page-transition";
import { Hero } from "@/components/home/hero";
import { Essence } from "@/components/home/essence";
import { CorporateBand, DishMarquee, PromotionsPreview, SignatureDishes } from "@/components/home/home-sections";

export default function HomePage() {
  return (
    <PageTransition>
      <Hero />
      <DishMarquee />
      <Essence />
      <SignatureDishes />
      <PromotionsPreview />
      <CorporateBand />
    </PageTransition>
  );
}
