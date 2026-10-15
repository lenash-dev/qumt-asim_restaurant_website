"use server";

import { z } from "zod";
import { getSupabase } from "@/lib/supabase";
import { MAX_DAYS_AHEAD, MAX_PARTY_SIZE, addDaysIso, nowInLaPaz, reservationSlots } from "@/lib/reservation-slots";

export type ReservationField = "name" | "phone" | "email" | "date" | "time" | "people" | "notes";

export type ReservationState = {
  status: "idle" | "error" | "success";
  message?: string;
  errors?: Partial<Record<ReservationField, string>>;
  values?: Partial<Record<ReservationField, string>>;
  summary?: string;
  /** `false` si no se pudo registrar en el sistema (sin Supabase): hay que confirmar por WhatsApp */
  delivered?: boolean;
};

const fields: ReservationField[] = ["name", "phone", "email", "date", "time", "people", "notes"];

const schema = z.object({
  name: z.string().trim().min(2, "Escribe tu nombre.").max(120),
  phone: z.string().trim().min(7, "Necesitamos un teléfono para confirmar.").max(20, "Teléfono demasiado largo."),
  email: z.union([z.literal(""), z.email("Revisa el correo electrónico.")]),
  date: z.iso.date("Elige la fecha."),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Elige la hora."),
  people: z.coerce.number("Indica cuántas personas.").int().min(1, "Mínimo 1 persona.").max(MAX_PARTY_SIZE, `Para más de ${MAX_PARTY_SIZE} personas escríbenos.`),
  notes: z.string().trim().max(500, "Máximo 500 caracteres."),
});

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("es-BO", { timeZone: "UTC", weekday: "long", day: "numeric", month: "long" }).format(new Date(`${iso}T00:00:00Z`));

/** Registra una reserva "pendiente" en el sistema de gestión. */
export async function requestReservation(_prev: ReservationState, formData: FormData): Promise<ReservationState> {
  const values = Object.fromEntries(fields.map((field) => [field, String(formData.get(field) ?? "")])) as Record<ReservationField, string>;

  // Campo trampa para bots
  if (formData.get("website")) return { status: "success", delivered: true, message: "¡Gracias! Te confirmaremos pronto." };

  const parsed = schema.safeParse(values);
  const errors: ReservationState["errors"] = {};
  if (!parsed.success) {
    for (const issue of parsed.error.issues) errors[issue.path[0] as ReservationField] ??= issue.message;
  } else {
    // Reglas de calendario: no en el pasado, dentro del horario y con anticipación razonable
    const now = nowInLaPaz();
    const { date, time } = parsed.data;
    if (date < now.date) errors.date = "Elige una fecha desde hoy.";
    else if (date > addDaysIso(now.date, MAX_DAYS_AHEAD)) errors.date = `Puedes reservar hasta ${MAX_DAYS_AHEAD} días antes.`;
    else if (reservationSlots(date).length === 0) errors.date = "Ese día no atendemos.";
    else if (!reservationSlots(date, now).includes(time)) errors.time = "Elige uno de los horarios disponibles.";
  }
  if (!parsed.success || Object.keys(errors).length > 0) {
    return { status: "error", message: "Revisa los campos marcados.", errors, values };
  }

  const data = parsed.data;
  const summary = `Hola, soy ${data.name}. Quiero reservar una mesa para ${data.people} ${data.people === 1 ? "persona" : "personas"} el ${formatDate(data.date)} a las ${data.time}.${data.notes ? ` ${data.notes}` : ""}`;

  const supabase = getSupabase();
  if (!supabase) {
    return { status: "success", delivered: false, message: "Envíanos tu reserva por WhatsApp para confirmarla.", summary };
  }

  const { error } = await supabase.from("reservations").insert({
    customer_name: data.name,
    phone: data.phone,
    email: data.email || null,
    reservation_date: data.date,
    reservation_time: data.time,
    party_size: data.people,
    notes: data.notes || null,
  });
  if (error) {
    console.error("[reservas] no se pudo registrar:", error.message);
    return { status: "error", message: "No pudimos registrar tu reserva. Intenta de nuevo o escríbenos por WhatsApp.", values, summary };
  }

  return {
    status: "success",
    delivered: true,
    message: `¡Gracias, ${data.name.split(" ")[0]}! Recibimos tu reserva para el ${formatDate(data.date)} a las ${data.time}. Te confirmaremos por llamada o WhatsApp.`,
    summary,
  };
}
