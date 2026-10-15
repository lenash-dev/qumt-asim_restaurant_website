/**
 * Modelo del menú del día (el mismo del sistema de gestión) y datos de
 * ejemplo. Los datos reales vienen de Supabase (ver src/lib/data.ts);
 * estos solo se usan mientras Supabase no esté configurado y son los
 * mismos de `supabase/seed.sql` del sistema.
 */

export type MealService = "desayuno" | "almuerzo" | "cena";
export type DishTag = "popular" | "picante" | "vegetariano" | "para-compartir" | "de-la-casa";

export const mealServices: { id: MealService; label: string }[] = [
  { id: "desayuno", label: "Desayuno" },
  { id: "almuerzo", label: "Almuerzo" },
  { id: "cena", label: "Cena" },
];

export const tagLabels: Record<DishTag, string> = {
  popular: "Popular",
  picante: "Picante",
  vegetariano: "Vegetariano",
  "para-compartir": "Para compartir",
  "de-la-casa": "De la casa",
};

/** Plato del catálogo */
export type Dish = {
  id: string;
  name: string;
  description: string;
  price: number;
  tags: DishTag[];
  featured?: boolean;
  image?: string | null;
};

/** Plato dentro del menú de un día. `price` nulo = incluido en el precio del combo. */
export type MenuItem = Omit<Dish, "price" | "featured"> & { price: number | null; soldOut: boolean };

/** Categoría que el restaurante habilitó ese día (ej. "Almuerzo ejecutivo") */
export type MenuSection = {
  id: string;
  name: string;
  description: string | null;
  /** Precio del combo, si la categoría se vende como combo */
  price: number | null;
  note: string | null;
  items: MenuItem[];
};

export type ServiceMenu = { notes: string | null; sections: MenuSection[] };

/** Menú de hoy por servicio. `null` = no disponible hoy. */
export type TodayMenu = {
  date: string;
  services: Record<MealService, ServiceMenu | null>;
};

// ─── Datos de ejemplo ──────────────────────────────────────────

export const sampleDishes: Dish[] = [
  { id: "sopa-de-mani", name: "Sopa de maní", description: "Caldo cremoso de maní con papas fritas al hilo, carne tierna y perejil.", price: 25, tags: ["popular", "de-la-casa"], featured: true },
  { id: "chairo", name: "Chairo paceño", description: "Sopa tradicional con chuño, mote, carne y un toque de hierbabuena.", price: 28, tags: [] },
  { id: "silpancho", name: "Silpancho", description: "Carne apanada sobre arroz y papa, coronada con huevo y ensalada fresca.", price: 42, tags: ["popular"] },
  { id: "picante-de-pollo", name: "Picante de pollo", description: "Pollo en salsa de ají colorado con chuño phuti, arroz y sarza.", price: 45, tags: ["picante"] },
  { id: "fricase", name: "Fricasé", description: "Cerdo en caldo de ají amarillo con mote y chuño. Ideal para el frío.", price: 45, tags: ["picante", "popular"], featured: true },
  { id: "ensalada-de-quinua", name: "Ensalada de quinua", description: "Quinua real, palta, tomate, choclo y queso fresco con aliño de limón.", price: 30, tags: ["vegetariano"] },
  { id: "sopa-de-quinua", name: "Sopa de quinua", description: "Quinua real con verduras de temporada y queso fresco.", price: 22, tags: ["vegetariano"] },
  { id: "pollo-a-la-plancha", name: "Pollo a la plancha", description: "Pechuga a la plancha con verduras salteadas y papa nativa.", price: 38, tags: [] },
  { id: "pique-macho", name: "Pique macho", description: "Carne, salchicha, papas fritas, locoto, cebolla y huevo. Para compartir (o no).", price: 75, tags: ["picante", "para-compartir"], featured: true },
  { id: "chicharron", name: "Chicharrón de cerdo", description: "Dorado en su propia grasa, con mote, papa y llajua.", price: 55, tags: ["para-compartir"] },
  { id: "anticuchos", name: "Anticuchos", description: "Brochetas de corazón de res a la parrilla con papa y salsa de maní.", price: 30, tags: ["picante"] },
  { id: "saltenas", name: "Salteñas", description: "Jugosas, horneadas cada mañana, con relleno de carne o pollo.", price: 10, tags: ["popular"] },
  { id: "api", name: "Api morado con pastel", description: "Bebida caliente de maíz morado con canela y un pastel recién frito.", price: 15, tags: ["de-la-casa"] },
  { id: "mocochinchi", name: "Mocochinchi", description: "Refresco de durazno deshidratado con canela y clavo de olor.", price: 8, tags: [] },
  { id: "bunuelos", name: "Buñuelos con miel", description: "Crujientes por fuera, suaves por dentro, bañados en miel de caña.", price: 15, tags: ["popular"] },
];

const pick = (id: string, inCombo = false): MenuItem => {
  const dish = sampleDishes.find((d) => d.id === id)!;
  return { id: dish.id, name: dish.name, description: dish.description, tags: dish.tags, price: inCombo ? null : dish.price, soldOut: false };
};

export const sampleLunch: ServiceMenu = {
  notes: "Servimos de 12:00 a 15:00.",
  sections: [
    {
      id: "almuerzo-ejecutivo",
      name: "Almuerzo ejecutivo",
      description: "El almuerzo completo del día.",
      price: 35,
      note: "Incluye sopa, segundo a elección, refresco y postre.",
      items: ["sopa-de-mani", "silpancho", "picante-de-pollo", "fricase"].map((id) => pick(id, true)),
    },
    {
      id: "saludables",
      name: "Saludables",
      description: "Opciones ligeras y nutritivas.",
      price: null,
      note: null,
      items: ["ensalada-de-quinua", "sopa-de-quinua", "pollo-a-la-plancha"].map((id) => pick(id)),
    },
    {
      id: "platos-extras",
      name: "Platos extras",
      description: "Para quien quiere algo más.",
      price: null,
      note: null,
      items: ["pique-macho", "chicharron", "anticuchos", "api"].map((id) => pick(id)),
    },
  ],
};
