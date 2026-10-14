"use server";

import { z } from "zod";
import { services } from "@/content/corporate";

export type QuoteField = "company" | "name" | "email" | "phone" | "service" | "people" | "date" | "message";

export type QuoteState = {
  status: "idle" | "error" | "success";
  message?: string;
  errors?: Partial<Record<QuoteField, string>>;
  values?: Partial<Record<QuoteField, string>>;
  /** Resumen listo para enviar por WhatsApp */
  summary?: string;
};

const fields: QuoteField[] = ["company", "name", "email", "phone", "service", "people", "date", "message"];
const serviceIds = [...services.map((s) => s.id), "otro"] as const;

const schema = z.object({
  company: z.string().trim().min(2, "Escribe el nombre de tu empresa."),
  name: z.string().trim().min(2, "¿Con quién hablamos?"),
  email: z.string().trim().pipe(z.email("Revisa el correo electrónico.")),
  phone: z.string().trim().min(7, "Necesitamos un teléfono de contacto.").max(20, "Teléfono demasiado largo."),
  service: z.enum(serviceIds, "Elige un servicio."),
  people: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.coerce
      .number("Indica cuántas personas, aproximadamente.")
      .int("Usa un número entero.")
      .min(1, "Indica al menos 1 persona.")
      .max(10000, "Escríbenos directamente para grupos tan grandes."),
  ),
  date: z.string().trim().optional(),
  message: z.string().trim().max(1000, "Máximo 1000 caracteres.").optional(),
});

/**
 * Recibe la solicitud de cotización empresarial.
 *
 * TODO: conectar con el sistema del restaurante (o un servicio de correo)
 * para registrar la solicitud. Por ahora solo se valida y se registra en el
 * log del servidor; el cliente ofrece enviar el resumen por WhatsApp.
 */
export async function requestQuote(_prev: QuoteState, formData: FormData): Promise<QuoteState> {
  const values = Object.fromEntries(fields.map((field) => [field, String(formData.get(field) ?? "")])) as Record<QuoteField, string>;

  // Campo trampa para bots: los humanos no lo ven.
  if (formData.get("website")) {
    return { status: "success", message: "¡Gracias! Te contactaremos muy pronto." };
  }

  const parsed = schema.safeParse(values);
  if (!parsed.success) {
    const { fieldErrors } = z.flattenError(parsed.error);
    const errors = Object.fromEntries(Object.entries(fieldErrors).map(([key, list]) => [key, list?.[0]])) as QuoteState["errors"];
    return { status: "error", message: "Revisa los campos marcados.", errors, values };
  }

  const data = parsed.data;
  const serviceLabel = services.find((s) => s.id === data.service)?.title ?? "un servicio a medida";

  console.info("[cotización empresarial]", data);

  const summary = [
    `Hola, soy ${data.name} de ${data.company}.`,
    `Solicité una cotización de ${serviceLabel.toLowerCase()} para ${data.people} personas aprox.`,
    data.date ? `Fecha estimada: ${data.date}.` : null,
    data.message ? `Detalle: ${data.message}` : null,
  ]
    .filter(Boolean)
    .join(" ");

  return {
    status: "success",
    message: `¡Gracias, ${data.name.split(" ")[0]}! Recibimos tu solicitud y te contactaremos muy pronto.`,
    summary,
  };
}
