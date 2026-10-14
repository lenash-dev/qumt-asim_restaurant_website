/**
 * Servicios empresariales (contenido de ejemplo).
 */
export type ServiceId = "almuerzos" | "catering" | "coffee-break" | "convenios";

export const services: {
  id: ServiceId;
  title: string;
  description: string;
  points: string[];
}[] = [
  {
    id: "almuerzos",
    title: "Almuerzos corporativos",
    description: "Menú diario para tu equipo, en nuestro local o entregado en tu oficina.",
    points: ["Menú rotativo semanal", "Opciones vegetarianas", "Entrega puntual"],
  },
  {
    id: "catering",
    title: "Catering para eventos",
    description: "Aniversarios, lanzamientos y reuniones con lo mejor de la cocina andina.",
    points: ["Buffet o servido a la mesa", "Personal de atención", "Montaje y vajilla"],
  },
  {
    id: "coffee-break",
    title: "Coffee break andino",
    description: "Api, salteñas, humintas y mates para talleres, capacitaciones y reuniones.",
    points: ["Dulce y salado", "Bebidas calientes y frías", "Para grupos pequeños o grandes"],
  },
  {
    id: "convenios",
    title: "Convenios y cuentas",
    description: "Cuenta corporativa con condiciones preferenciales para tu personal.",
    points: ["Facturación mensual", "Descuentos por volumen", "Reportes de consumo"],
  },
];

export const modalities = [
  {
    title: "Evento único",
    description: "Para una fecha puntual: un aniversario, un taller o una reunión importante.",
    features: ["Propuesta a medida", "Catering o coffee break", "Para grupos de todo tamaño"],
  },
  {
    title: "Plan mensual",
    description: "Almuerzos para tu equipo todos los días hábiles con un precio fijo por persona.",
    features: ["Menú rotativo", "Entrega o consumo en local", "Facturación mensual"],
    highlight: true,
  },
  {
    title: "Convenio corporativo",
    description: "Tu personal consume en Qumt'asim con condiciones especiales y una sola factura.",
    features: ["Tarifas preferenciales", "Cuenta corporativa", "Reporte de consumo"],
  },
];

export const steps = [
  { title: "Cuéntanos", description: "Llena el formulario o escríbenos con lo que necesita tu empresa." },
  { title: "Propuesta", description: "Preparamos un menú y una cotización a la medida de tu equipo." },
  { title: "Contrato", description: "Definimos fechas, condiciones y facturación en un contrato claro." },
  { title: "A la mesa", description: "Servimos con puntualidad y el sabor de siempre." },
];

export const faqs = [
  {
    q: "¿Hay un mínimo de personas?",
    a: "Adaptamos la propuesta al tamaño de tu equipo. Escríbenos con el número aproximado de personas y lo vemos juntos.",
  },
  {
    q: "¿Emiten factura?",
    a: "Sí. Todos los servicios empresariales se facturan a nombre de tu empresa, por evento o de forma mensual.",
  },
  {
    q: "¿Se puede personalizar el menú?",
    a: "Claro. Incluimos opciones vegetarianas y ajustamos el menú a preferencias o restricciones de tu equipo.",
  },
  {
    q: "¿Con cuánta anticipación debo solicitar un evento?",
    a: "Mientras antes, mejor. Para eventos grandes recomendamos escribirnos con al menos una semana de anticipación.",
  },
];
