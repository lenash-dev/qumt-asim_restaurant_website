/**
 * Datos generales del restaurante.
 * TODO: reemplazar los valores marcados como "ejemplo" con los datos reales.
 */
export const site = {
  name: "Qumt'asim",
  legalName: "Restaurante Qumt'asim",
  tagline: "Tradición andina con actitud",
  description:
    "Restaurante Qumt'asim: cocina boliviana de tradición, servida con actitud. Menú de platos típicos, promociones y servicios de alimentación para empresas.",
  // Dominio de ejemplo — se usa para metadatos y sitemap.
  url: "https://qumtasim.com",
  locale: "es_BO",
  timeZone: "America/La_Paz",
  currency: "Bs",

  contact: {
    // Datos de ejemplo
    address: "Av. Ejemplo 1234, Zona Central",
    city: "La Paz, Bolivia",
    phone: "+591 700 00000",
    whatsapp: "59170000000",
    email: "contacto@qumtasim.com",
    mapsQuery: "Restaurante Qumt'asim La Paz",
  },

  /** Horario por día de la semana (0 = domingo). `null` = cerrado. Ejemplo. */
  schedule: [
    { open: "11:30", close: "16:00" },
    { open: "11:30", close: "22:00" },
    { open: "11:30", close: "22:00" },
    { open: "11:30", close: "22:00" },
    { open: "11:30", close: "22:00" },
    { open: "11:30", close: "23:00" },
    { open: "11:30", close: "23:00" },
  ] as ({ open: string; close: string } | null)[],

  /** Horario resumido para mostrar */
  hoursSummary: [
    { days: "Lunes a jueves", hours: "11:30 – 22:00" },
    { days: "Viernes y sábado", hours: "11:30 – 23:00" },
    { days: "Domingo", hours: "11:30 – 16:00" },
  ],

  socials: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    tiktok: "https://tiktok.com/",
  },
} as const;

export const nav = [
  { href: "/", label: "Inicio" },
  { href: "/menu", label: "Menú" },
  { href: "/promociones", label: "Promociones" },
  { href: "/empresas", label: "Empresas" },
] as const;

export const weekdays = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"] as const;
