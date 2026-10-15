import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { site } from "@/content/site";
import {
  sampleDishes,
  sampleLunch,
  type Dish,
  type DishTag,
  type MealService,
  type MenuSection,
  type ServiceMenu,
  type TodayMenu,
} from "@/content/menu";
import { samplePromotions, type Promotion } from "@/content/promotions";
import { getSupabase } from "./supabase";

/*
 * Datos que vienen del sistema de gestión.
 *
 * Caché: cada función guarda su resultado y lo refresca como máximo cada
 * minuto (`cacheLife("minutes")`). Además, cuando el personal cambia el
 * menú o las promociones, el sistema llama a /api/revalidate y la web se
 * actualiza al instante (`cacheTag`).
 */

const todayInLaPaz = () =>
  new Intl.DateTimeFormat("en-CA", { timeZone: site.timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());

const byPosition = <T extends { position: number }>(a: T, b: T) => a.position - b.position;

type DishRow = {
  id: string;
  name: string;
  description: string;
  price: number;
  tags: string[];
  featured: boolean;
  image_url: string | null;
};

type MenuRow = {
  service: MealService;
  notes: string | null;
  sections: {
    id: string;
    price: number | null;
    note: string | null;
    position: number;
    category: { name: string; description: string | null } | null;
    items: {
      id: string;
      price: number | null;
      sold_out: boolean;
      position: number;
      dish: Omit<DishRow, "featured"> | null;
    }[];
  }[];
};

const toTags = (tags: string[]) => tags.filter((t): t is DishTag => t in { popular: 1, picante: 1, vegetariano: 1, "para-compartir": 1, "de-la-casa": 1 });

/** Menú publicado de hoy para desayuno, almuerzo y cena. */
export async function getTodayMenu(): Promise<TodayMenu> {
  "use cache";
  cacheTag("menu");
  cacheLife("minutes");

  const date = todayInLaPaz();
  const empty: TodayMenu["services"] = { desayuno: null, almuerzo: null, cena: null };
  const supabase = getSupabase();
  if (!supabase) return { date, services: { ...empty, almuerzo: sampleLunch } };

  const { data, error } = await supabase
    .from("daily_menus")
    .select(
      `service, notes,
       sections:daily_menu_sections (
         id, price, note, position,
         category:menu_categories ( name, description ),
         items:daily_menu_items (
           id, price, sold_out, position,
           dish:dishes ( id, name, description, price, tags, image_url )
         )
       )`,
    )
    .eq("menu_date", date)
    .eq("published", true);

  if (error) {
    console.error("[menu] no se pudo leer el menú de hoy:", error.message);
    return { date, services: empty };
  }

  const services = { ...empty };
  for (const menu of data as unknown as MenuRow[]) {
    const sections: MenuSection[] = [...menu.sections].sort(byPosition).flatMap((section) => {
      const items = [...section.items]
        .sort(byPosition)
        .filter((item) => item.dish)
        .map((item) => ({
          id: item.id,
          name: item.dish!.name,
          description: item.dish!.description,
          tags: toTags(item.dish!.tags),
          image: item.dish!.image_url,
          soldOut: item.sold_out,
          // Precio del día > incluido en el combo > precio de carta
          price: item.price ?? (section.price !== null ? null : item.dish!.price),
        }));
      if (items.length === 0) return [];
      return [
        {
          id: section.id,
          name: section.category?.name ?? "Del día",
          description: section.category?.description ?? null,
          price: section.price,
          note: section.note,
          items,
        },
      ];
    });
    services[menu.service] = sections.length > 0 ? ({ notes: menu.notes, sections } satisfies ServiceMenu) : null;
  }
  return { date, services };
}

/** Platos activos del catálogo: destacados para la portada y nombres para la cinta. */
export async function getCatalog(): Promise<{ featured: Dish[]; names: string[]; count: number }> {
  "use cache";
  cacheTag("menu");
  cacheLife("minutes");

  const supabase = getSupabase();
  if (!supabase) {
    return { featured: sampleDishes.filter((d) => d.featured), names: sampleDishes.map((d) => d.name), count: sampleDishes.length };
  }

  const { data, error } = await supabase
    .from("dishes")
    .select("id, name, description, price, tags, featured, image_url")
    .eq("active", true)
    .order("name");
  if (error) {
    console.error("[menu] no se pudo leer el catálogo:", error.message);
    return { featured: [], names: [], count: 0 };
  }

  const dishes: Dish[] = (data as DishRow[]).map((row) => ({
    id: row.id,
    name: row.name,
    description: row.description,
    price: Number(row.price),
    tags: toTags(row.tags),
    featured: row.featured,
    image: row.image_url,
  }));
  return { featured: dishes.filter((d) => d.featured).slice(0, 6), names: dishes.map((d) => d.name), count: dishes.length };
}

type PromotionRow = {
  id: string;
  title: string;
  kicker: string;
  description: string;
  price: number | null;
  price_label: string | null;
  days: number[] | null;
  time_label: string | null;
  includes: string[];
  terms: string | null;
  highlight: boolean;
};

/** Promociones activas y vigentes (la base de datos filtra por fecha). */
export async function getPromotions(): Promise<Promotion[]> {
  "use cache";
  cacheTag("promotions");
  cacheLife("minutes");

  const supabase = getSupabase();
  if (!supabase) return samplePromotions;

  const { data, error } = await supabase
    .from("promotions")
    .select("id, title, kicker, description, price, price_label, days, time_label, includes, terms, highlight")
    .order("position")
    .order("created_at");
  if (error) {
    console.error("[promociones] no se pudieron leer:", error.message);
    return [];
  }

  return (data as PromotionRow[]).map((row) => ({
    id: row.id,
    title: row.title,
    kicker: row.kicker,
    description: row.description,
    price: row.price ?? undefined,
    priceLabel: row.price_label ?? undefined,
    days: row.days ?? undefined,
    time: row.time_label ?? undefined,
    includes: row.includes.length > 0 ? row.includes : undefined,
    terms: row.terms ?? undefined,
    highlight: row.highlight,
  }));
}
