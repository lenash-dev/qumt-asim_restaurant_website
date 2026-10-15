"use client";

import { useActionState, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CalendarCheck, ChevronDown, LoaderCircle } from "lucide-react";
import { requestReservation, type ReservationField, type ReservationState } from "@/app/reservas/actions";
import { MAX_DAYS_AHEAD, MAX_PARTY_SIZE, addDaysIso, firstAvailableDate, nowInLaPaz, reservationSlots } from "@/lib/reservation-slots";
import { cn, whatsappLink } from "@/lib/utils";
import { Button, ButtonLink } from "@/components/ui/button";
import { Field, inputClasses } from "@/components/ui/form-field";
import { WhatsAppIcon } from "@/components/ui/icons";
import { easeOutExpo } from "@/components/motion/reveal";

const initialState: ReservationState = { status: "idle" };

// Hora de La Paz solo en el navegador (con Cache Components no se lee la hora en el prerender)
const subscribe = (onChange: () => void) => {
  const id = window.setInterval(onChange, 60_000);
  return () => window.clearInterval(id);
};
const readNow = () => {
  const { date, minutes } = nowInLaPaz();
  return `${date}|${minutes}`;
};
function useLaPazNow() {
  const snapshot = useSyncExternalStore(subscribe, readNow, () => null);
  if (!snapshot) return null;
  const [date, minutes] = snapshot.split("|");
  return { date, minutes: Number(minutes) };
}

/** Se reinicia con `key` al pedir otra reserva. */
export function ReservationForm() {
  const [formKey, setFormKey] = useState(0);
  return <ReservationFormInner key={formKey} onReset={() => setFormKey((k) => k + 1)} />;
}

function ReservationFormInner({ onReset }: { onReset: () => void }) {
  const [state, formAction, pending] = useActionState(requestReservation, initialState);
  const now = useLaPazNow();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const error = (field: ReservationField) => (state.status === "error" ? state.errors?.[field] : undefined);
  const value = (field: ReservationField) => state.values?.[field];

  const selectedDate = date || value("date") || (now ? firstAvailableDate(now) : "");
  const slots = selectedDate && now ? reservationSlots(selectedDate, now) : [];
  // Cerrado ese día vs. ya no quedan horarios hoy
  const closedThatDay = selectedDate !== "" && reservationSlots(selectedDate).length === 0;
  const selectedTime = slots.includes(time) ? time : slots.includes(value("time") ?? "") ? value("time")! : "";

  return (
    <div className="glass-strong relative overflow-hidden rounded-[2rem] p-6 sm:p-10">
      <AnimatePresence mode="wait" initial={false}>
        {state.status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
            className="flex min-h-[28rem] flex-col items-center justify-center text-center"
            role="status"
          >
            <span className="grid size-20 place-items-center rounded-full bg-gold-400/15 text-gold-300 ring-1 ring-gold-400/30">
              <CalendarCheck className="size-9" strokeWidth={1.5} aria-hidden />
            </span>
            <p className="mt-6 font-display text-4xl uppercase">{state.delivered === false ? "Casi listo" : "¡Reserva recibida!"}</p>
            <p className="mt-3 max-w-sm text-cream-200/80">{state.message}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {state.summary && (
                <ButtonLink href={whatsappLink(state.summary)} variant={state.delivered === false ? "solid" : "glass"}>
                  <WhatsAppIcon className="size-5" />
                  {state.delivered === false ? "Enviar por WhatsApp" : "Escribir por WhatsApp"}
                </ButtonLink>
              )}
              <Button variant="glass" onClick={onReset}>
                Hacer otra reserva
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            action={formAction}
            noValidate
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.5, ease: easeOutExpo }}
            className="grid gap-5 sm:grid-cols-2"
          >
            <Field label="Nombre" name="name" error={error("name")}>
              <input id="name" name="name" autoComplete="name" placeholder="¿A nombre de quién?" defaultValue={value("name")} aria-invalid={!!error("name")} className={inputClasses} />
            </Field>
            <Field label="Teléfono / WhatsApp" name="phone" error={error("phone")}>
              <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+591 7…" defaultValue={value("phone")} aria-invalid={!!error("phone")} className={inputClasses} />
            </Field>

            <Field label="Fecha" name="date" error={error("date")}>
              <input
                id="date"
                name="date"
                type="date"
                value={selectedDate}
                min={now?.date}
                max={now ? addDaysIso(now.date, MAX_DAYS_AHEAD) : undefined}
                onChange={(event) => {
                  setDate(event.target.value);
                  setTime("");
                }}
                aria-invalid={!!error("date")}
                className={inputClasses}
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Hora" name="time" error={error("time")}>
                <div className="relative">
                  <select
                    id="time"
                    name="time"
                    value={selectedTime}
                    onChange={(event) => setTime(event.target.value)}
                    disabled={slots.length === 0}
                    aria-invalid={!!error("time")}
                    className={cn(inputClasses, "appearance-none pr-9 disabled:opacity-60 [&>option]:bg-wine-900")}
                  >
                    <option value="" disabled>
                      {!now ? "…" : closedThatDay ? "Cerrado" : slots.length === 0 ? "Sin horarios" : "Elegir"}
                    </option>
                    {slots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                  <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-cream-300" />
                </div>
              </Field>
              <Field label="Personas" name="people" error={error("people")}>
                <div className="relative">
                  <select id="people" name="people" defaultValue={value("people") || "2"} className={cn(inputClasses, "appearance-none pr-9 [&>option]:bg-wine-900")}>
                    {Array.from({ length: MAX_PARTY_SIZE }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                  <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-cream-300" />
                </div>
              </Field>
            </div>

            {now && slots.length === 0 && (
              <p className="-mt-2 text-sm text-gold-300 sm:col-span-2">
                {closedThatDay ? "Ese día no atendemos." : "Ya no quedan horarios para hoy."} Elige otra fecha.
              </p>
            )}
            <Field label="Correo" name="email" error={error("email")} optional className="sm:col-span-2">
              <input id="email" name="email" type="email" autoComplete="email" placeholder="Para enviarte la confirmación" defaultValue={value("email")} aria-invalid={!!error("email")} className={inputClasses} />
            </Field>
            <Field label="Comentarios" name="notes" error={error("notes")} optional className="sm:col-span-2">
              <textarea
                id="notes"
                name="notes"
                rows={3}
                maxLength={500}
                placeholder="Cumpleaños, silla para bebé, una mesa tranquila…"
                defaultValue={value("notes")}
                className={cn(inputClasses, "h-auto resize-none py-3")}
              />
            </Field>

            {/* Campo trampa anti-spam */}
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

            <div className="flex flex-col-reverse items-start gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
              <AnimatePresence>
                {state.status === "error" && (
                  <motion.p role="alert" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="text-sm font-semibold text-[#ff9dbb]">
                    {state.message}
                  </motion.p>
                )}
              </AnimatePresence>
              <Button type="submit" size="lg" disabled={pending} className="sm:ml-auto">
                {pending ? <LoaderCircle className="size-5 animate-spin" aria-hidden /> : <CalendarCheck className="size-5" aria-hidden />}
                {pending ? "Reservando…" : "Reservar mesa"}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
