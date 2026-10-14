/**
 * Carta del restaurante (contenido de ejemplo).
 *
 * Cuando exista el sistema de gestión del restaurante, este archivo se
 * reemplaza por una consulta a su API manteniendo los mismos tipos.
 */

export type DishTag = "popular" | "picante" | "vegetariano" | "para-compartir" | "de-la-casa";

export type Dish = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: CategoryId;
  tags?: DishTag[];
  /** Destacado en la página de inicio */
  featured?: boolean;
  /** Ruta en /public, p. ej. "/menu/sopa-de-mani.jpg" */
  image?: string;
};

export type CategoryId = "entradas" | "sopas" | "segundos" | "bebidas" | "postres";

export const categories: { id: CategoryId; label: string; blurb: string }[] = [
  { id: "entradas", label: "Para empezar", blurb: "Antojitos para abrir el apetito." },
  { id: "sopas", label: "Sopas", blurb: "Calientitas, como en casa de la abuela." },
  { id: "segundos", label: "Platos de fondo", blurb: "Los clásicos que nunca fallan." },
  { id: "bebidas", label: "Bebidas", blurb: "Refrescos de la casa y mates." },
  { id: "postres", label: "Postres", blurb: "El final dulce." },
];

export const tagLabels: Record<DishTag, string> = {
  popular: "Popular",
  picante: "Picante",
  vegetariano: "Vegetariano",
  "para-compartir": "Para compartir",
  "de-la-casa": "De la casa",
};

export const dishes: Dish[] = [
  // Para empezar
  {
    id: "saltenas",
    name: "Salteñas",
    description: "Jugosas, horneadas cada mañana, con relleno de carne o pollo.",
    price: 10,
    category: "entradas",
    tags: ["popular"],
  },
  {
    id: "anticuchos",
    name: "Anticuchos",
    description: "Brochetas de corazón de res a la parrilla con papa y salsa de maní.",
    price: 30,
    category: "entradas",
    tags: ["picante"],
  },
  {
    id: "humintas",
    name: "Humintas al horno",
    description: "Choclo molido con queso y anís, horneado en chala.",
    price: 12,
    category: "entradas",
    tags: ["vegetariano"],
  },
  {
    id: "tucumanas",
    name: "Tucumanas",
    description: "Empanadas fritas con salsas de la casa para acompañar.",
    price: 9,
    category: "entradas",
  },

  // Sopas
  {
    id: "sopa-de-mani",
    name: "Sopa de maní",
    description: "Caldo cremoso de maní con papas fritas al hilo, carne tierna y perejil.",
    price: 25,
    category: "sopas",
    tags: ["popular", "de-la-casa"],
    featured: true,
  },
  {
    id: "chairo",
    name: "Chairo paceño",
    description: "Sopa tradicional con chuño, mote, carne y un toque de hierbabuena.",
    price: 28,
    category: "sopas",
  },
  {
    id: "sopa-de-quinua",
    name: "Sopa de quinua",
    description: "Quinua real con verduras de temporada y queso fresco.",
    price: 22,
    category: "sopas",
    tags: ["vegetariano"],
  },

  // Platos de fondo
  {
    id: "fricase",
    name: "Fricasé",
    description: "Cerdo en caldo de ají amarillo con mote y chuño. Ideal para el frío.",
    price: 45,
    category: "segundos",
    tags: ["picante", "popular"],
    featured: true,
  },
  {
    id: "silpancho",
    name: "Silpancho",
    description: "Carne apanada sobre arroz y papa, coronada con huevo y ensalada fresca.",
    price: 42,
    category: "segundos",
    tags: ["popular"],
  },
  {
    id: "pique-macho",
    name: "Pique macho",
    description: "Carne, salchicha, papas fritas, locoto, cebolla y huevo. Para compartir (o no).",
    price: 75,
    category: "segundos",
    tags: ["picante", "para-compartir"],
    featured: true,
  },
  {
    id: "plato-paceno",
    name: "Plato paceño",
    description: "Choclo, habas, papa, queso frito y carne asada. Sencillo y perfecto.",
    price: 48,
    category: "segundos",
  },
  {
    id: "picante-de-pollo",
    name: "Picante de pollo",
    description: "Pollo en salsa de ají colorado con chuño phuti, arroz y sarza.",
    price: 45,
    category: "segundos",
    tags: ["picante"],
  },
  {
    id: "chicharron",
    name: "Chicharrón de cerdo",
    description: "Dorado en su propia grasa, con mote, papa y llajua.",
    price: 55,
    category: "segundos",
    tags: ["para-compartir"],
  },

  // Bebidas
  {
    id: "api",
    name: "Api morado con pastel",
    description: "Bebida caliente de maíz morado con canela y un pastel recién frito.",
    price: 15,
    category: "bebidas",
    tags: ["de-la-casa"],
  },
  {
    id: "mocochinchi",
    name: "Mocochinchi",
    description: "Refresco de durazno deshidratado con canela y clavo de olor.",
    price: 8,
    category: "bebidas",
  },
  {
    id: "somo",
    name: "Somó",
    description: "Refresco tradicional de maíz blanco, dulce y refrescante.",
    price: 8,
    category: "bebidas",
  },
  {
    id: "mate-de-coca",
    name: "Mate andino",
    description: "Infusión de coca, manzanilla o anís para cerrar la comida.",
    price: 7,
    category: "bebidas",
    tags: ["vegetariano"],
  },

  // Postres
  {
    id: "bunuelos",
    name: "Buñuelos con miel",
    description: "Crujientes por fuera, suaves por dentro, bañados en miel de caña.",
    price: 15,
    category: "postres",
    tags: ["popular"],
  },
  {
    id: "helado-de-canela",
    name: "Helado de canela",
    description: "Sorbete de canela y clavo, receta de la calle de siempre.",
    price: 12,
    category: "postres",
  },
  {
    id: "arroz-con-leche",
    name: "Arroz con leche",
    description: "Cremoso, con canela y pasas.",
    price: 12,
    category: "postres",
    tags: ["vegetariano"],
  },
];

export const featuredDishes = dishes.filter((d) => d.featured);
