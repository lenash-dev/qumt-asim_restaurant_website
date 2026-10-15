/**
 * Promociones. Las reales se arman en el sistema de gestión y llegan desde
 * Supabase (ver src/lib/data.ts); estas son de ejemplo, solo para cuando
 * Supabase no está configurado.
 * `days` usa 0 = domingo … 6 = sábado. Sin `days` = todos los días.
 */
export type Promotion = {
  id: string;
  title: string;
  kicker: string;
  description: string;
  price?: number;
  /** Texto alternativo al precio, p. ej. "2x1" o "Gratis" */
  priceLabel?: string;
  days?: number[];
  time?: string;
  includes?: string[];
  terms?: string;
  highlight?: boolean;
};

export const samplePromotions: Promotion[] = [
  {
    id: "almuerzo-ejecutivo",
    title: "Almuerzo ejecutivo",
    kicker: "De lunes a viernes",
    description: "El almuerzo completo para tu día de trabajo, servido rápido y con sabor de casa.",
    price: 35,
    days: [1, 2, 3, 4, 5],
    time: "12:00 – 15:00",
    includes: ["Sopa del día", "Segundo a elección", "Refresco de la casa", "Postre"],
    highlight: true,
  },
  {
    id: "sabado-de-pique",
    title: "Sábado de pique",
    kicker: "Para dos",
    description: "Un pique macho para compartir con dos refrescos de la casa.",
    price: 85,
    days: [6],
    includes: ["Pique macho para 2", "2 refrescos"],
  },
  {
    id: "domingo-familiar",
    title: "Domingo familiar",
    kicker: "Para cuatro",
    description: "Cuatro platos paceños y una jarra de mocochinchi para la mesa grande.",
    price: 180,
    days: [0],
    includes: ["4 platos paceños", "Jarra de mocochinchi"],
  },
  {
    id: "hora-del-api",
    title: "La hora del api",
    kicker: "Media tarde",
    description: "Api morado con pastel a precio especial para la tarde fría.",
    price: 12,
    days: [1, 2, 3, 4, 5, 6],
    time: "16:00 – 18:00",
  },
  {
    id: "cumpleanero",
    title: "Cumpleañero",
    kicker: "Todos los días",
    description: "Si celebras tu cumpleaños con nosotros, el postre corre por cuenta de la casa.",
    priceLabel: "Postre gratis",
    terms: "Presentando tu carnet el día de tu cumpleaños.",
  },
];
