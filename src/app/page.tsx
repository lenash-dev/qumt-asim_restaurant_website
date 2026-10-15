import { getCatalog, getPromotions } from "@/lib/data";
import { PageTransition } from "@/components/layout/page-transition";
import { Hero } from "@/components/home/hero";
import { Essence } from "@/components/home/essence";
import { CorporateBand, DishMarquee, PromotionsPreview, SignatureDishes } from "@/components/home/home-sections";

export default async function HomePage() {
  const [catalog, promotions] = await Promise.all([getCatalog(), getPromotions()]);

  return (
    <PageTransition>
      <Hero recommended={catalog.featured[0]} />
      <DishMarquee names={catalog.names} />
      <Essence dishCount={catalog.count} promotionCount={promotions.length} />
      <SignatureDishes dishes={catalog.featured} total={catalog.count} />
      <PromotionsPreview promotions={promotions} />
      <CorporateBand />
    </PageTransition>
  );
}
