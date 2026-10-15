"use server";

import { z } from "zod";
import { planLabels, services } from "@/content/corporate";
import { getSupabase } from "@/lib/supabase";

export type QuoteField = "company" | "name" | "email" | "phone" | "service" | "plan" | "people" | "date" | "message";

export type QuoteState = {
  status: "idle" | "error" | "success";
  message?: string;
  errors?: Partial<Record<QuoteField, string>>;
  values?: Partial<Record<QuoteField, string>>;
  /** Resumen listo para enviar por WhatsApp */
  summary?: string;
  /** `false` si no se pudo registrar en el sistema (sin Supabase): hay que confirmar por WhatsApp */
  delivered?: boolean;
};

const fields: QuoteField[] = ["company", "name", "email", "phone", "service", "plan", "people", "date", "message"];
const serviceIds = [...services.map((s) => s.id), "otro"] as const;

const schema = z.object({
  company: z.string().trim().min(2, "Escribe el nombre de tu empresa.").max(120),
  name: z.string().trim().min(2, "¿Con quién hablamos?").max(120),
  email: z.string().trim().pipe(z.email("Revisa el correo electrónico.")),
  phone: z.string().trim().min(7, "Necesitamos un teléfono de contacto.").max(20, "Teléfono demasiado largo."),
  service: z.enum(serviceIds, "Elige un servicio."),
  plan: z.enum(["semanal", "mensual", "evento"], "Elige un plan."),
  people: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.coerce
      .number("Indica cuántas personas, aproximadamente.")
      .int("Usa un número entero.")
      .min(1, "Indica al menos 1 persona.")
      .max(10000, "Escríbenos directamente para grupos tan grandes."),
  ),
  date: z.union([z.literal(""), z.iso.date("Fecha no válida.")]),
  message: z.string().trim().max(1000, "Máximo 1000 caracteres."),
});

/**
 * Recibe la solicitud de convenio / cotización empresarial y la registra
 * en el sistema de gestión (tabla `agreement_requests`).
 */
export async function requestQuote(_prev: QuoteState, formData: FormData): Promise<QuoteState> {
  const values = Object.fromEntries(fields.map((field) => [field, String(formData.get(field) ?? "")])) as Record<QuoteField, string>;

  // Campo trampa para bots: los humanos no lo ven.
  if (formData.get("website")) {
    return { status: "success", message: "¡Gracias! Te contactaremos muy pronto.", delivered: true };
  }

  const parsed = schema.safeParse(values);
  if (!parsed.success) {
    const { fieldErrors } = z.flattenError(parsed.error);
    const errors = Object.fromEntries(Object.entries(fieldErrors).map(([key, list]) => [key, list?.[0]])) as QuoteState["errors"];
    return { status: "error", message: "Revisa los campos marcados.", errors, values };
  }

  const data = parsed.data;
  const serviceLabel = services.find((s) => s.id === data.service)?.title ?? "un servicio a medida";
  const summary = [
    `Hola, soy ${data.name} de ${data.company}.`,
    `Quiero cotizar ${serviceLabel.toLowerCase()} (${planLabels[data.plan].toLowerCase()}) para ${data.people} personas aprox.`,
    data.date ? `Fecha estimada: ${data.date}.` : null,
    data.message ? `Detalle: ${data.message}` : null,
  ]
    .filter(Boolean)
    .join(" ");

  const supabase = getSupabase();
  if (!supabase) {
    return {
      status: "success",
      delivered: false,
      message: "Envíanos el resumen por WhatsApp para terminar tu solicitud.",
      summary,
    };
  }

  const { error } = await supabase.from("agreement_requests").insert({
    company: data.company,
    contact_name: data.name,
    email: data.email,
    phone: data.phone,
    service: data.service,
    plan: data.plan,
    people: data.people,
    start_date: data.date || null,
    message: data.message || null,
  });
  if (error) {
    console.error("[convenios] no se pudo registrar la solicitud:", error.message);
    return {
      status: "error",
      message: "No pudimos enviar tu solicitud. Intenta de nuevo o escríbenos por WhatsApp.",
      values,
      summary,
    };
  }

  return {
    status: "success",
    delivered: true,
    message: `¡Gracias, ${data.name.split(" ")[0]}! Recibimos tu solicitud y te contactaremos muy pronto.`,
    summary,
  };
}
