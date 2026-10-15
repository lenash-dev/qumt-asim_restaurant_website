import { site } from "@/content/site";

/** Las reservas se aceptan hasta una hora antes del cierre, cada 30 minutos. */
const LAST_CALL_MINUTES = 60;
const STEP_MINUTES = 30;
export const MAX_PARTY_SIZE = 20;
export const MAX_DAYS_AHEAD = 60;

const toMinutes = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};
const toTime = (minutes: number) => `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;

/** 0 = domingo … 6 = sábado, para una fecha "AAAA-MM-DD" */
export const weekdayOf = (isoDate: string) => new Date(`${isoDate}T00:00:00Z`).getUTCDay();

/**
 * Horarios disponibles para reservar en una fecha. Si es hoy, solo los que
 * faltan (con al menos 30 minutos de anticipación). Vacío = cerrado.
 */
export function reservationSlots(isoDate: string, now?: { date: string; minutes: number }) {
  const schedule = site.schedule[weekdayOf(isoDate)];
  if (!schedule) return [];
  const first = toMinutes(schedule.open);
  const last = toMinutes(schedule.close) - LAST_CALL_MINUTES;
  const earliest = now && now.date === isoDate ? now.minutes + 30 : 0;

  const slots: string[] = [];
  for (let t = first; t <= last; t += STEP_MINUTES) {
    if (t >= earliest) slots.push(toTime(t));
  }
  return slots;
}

/** Primer día (desde hoy) que todavía tiene horarios para reservar */
export function firstAvailableDate(now: { date: string; minutes: number }) {
  for (let i = 0; i <= 14; i++) {
    const date = addDaysIso(now.date, i);
    if (reservationSlots(date, now).length > 0) return date;
  }
  return now.date;
}

export function addDaysIso(isoDate: string, days: number) {
  const date = new Date(`${isoDate}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

/** Fecha y minutos actuales en La Paz */
export function nowInLaPaz(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: site.timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "00";
  return { date: `${get("year")}-${get("month")}-${get("day")}`, minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}
