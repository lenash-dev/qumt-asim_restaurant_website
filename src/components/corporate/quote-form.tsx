"use client";

import { useActionState, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, LoaderCircle, Send } from "lucide-react";
import { requestQuote, type QuoteField, type QuoteState } from "@/app/empresas/actions";
import { services } from "@/content/corporate";
import { cn, whatsappLink } from "@/lib/utils";
import { Button, ButtonLink } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { easeOutExpo } from "@/components/motion/reveal";

const initialState: QuoteState = { status: "idle" };

const inputClasses =
  "h-12 w-full rounded-2xl bg-wine-950/45 px-4 text-sm text-cream-50 ring-1 ring-cream-50/12 outline-none transition " +
  "placeholder:text-cream-300/55 focus:bg-wine-950/70 focus:ring-2 focus:ring-gold-400/70 aria-invalid:ring-aguayo-rose/70";

/** Formulario de cotización; se reinicia con `key` al pedir otra solicitud. */
export function QuoteForm() {
  const [formKey, setFormKey] = useState(0);
  return <QuoteFormInner key={formKey} onReset={() => setFormKey((k) => k + 1)} />;
}

function QuoteFormInner({ onReset }: { onReset: () => void }) {
  const [state, formAction, pending] = useActionState(requestQuote, initialState);
  const error = (field: QuoteField) => (state.status === "error" ? state.errors?.[field] : undefined);
  const value = (field: QuoteField) => state.values?.[field];

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
            <svg viewBox="0 0 52 52" className="size-20 text-gold-300" aria-hidden>
              <motion.circle
                cx="26"
                cy="26"
                r="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, ease: easeOutExpo }}
              />
              <motion.path
                d="M15 27l7 7 15-16"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.5, ease: easeOutExpo }}
              />
            </svg>
            <p className="mt-6 font-display text-4xl uppercase">Solicitud enviada</p>
            <p className="mt-3 max-w-sm text-cream-200/80">{state.message}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {state.summary && (
                <ButtonLink href={whatsappLink(state.summary)}>
                  <WhatsAppIcon className="size-5" />
                  Agilizar por WhatsApp
                </ButtonLink>
              )}
              <Button variant="glass" onClick={onReset}>
                Enviar otra solicitud
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
            <Field label="Empresa" name="company" error={error("company")}>
              <input id="company" name="company" autoComplete="organization" placeholder="Nombre de tu empresa" defaultValue={value("company")} aria-invalid={!!error("company")} aria-describedby={error("company") ? "company-error" : undefined} className={inputClasses} />
            </Field>
            <Field label="Nombre de contacto" name="name" error={error("name")}>
              <input id="name" name="name" autoComplete="name" placeholder="¿Con quién hablamos?" defaultValue={value("name")} aria-invalid={!!error("name")} aria-describedby={error("name") ? "name-error" : undefined} className={inputClasses} />
            </Field>
            <Field label="Correo" name="email" error={error("email")}>
              <input id="email" name="email" type="email" autoComplete="email" placeholder="nombre@empresa.com" defaultValue={value("email")} aria-invalid={!!error("email")} aria-describedby={error("email") ? "email-error" : undefined} className={inputClasses} />
            </Field>
            <Field label="Teléfono" name="phone" error={error("phone")}>
              <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+591 7…" defaultValue={value("phone")} aria-invalid={!!error("phone")} aria-describedby={error("phone") ? "phone-error" : undefined} className={inputClasses} />
            </Field>
            <Field label="Servicio" name="service" error={error("service")}>
              <div className="relative">
                <select id="service" name="service" defaultValue={value("service") ?? ""} aria-invalid={!!error("service")} aria-describedby={error("service") ? "service-error" : undefined} className={cn(inputClasses, "appearance-none pr-10 [&>option]:bg-wine-900")}>
                  <option value="" disabled>
                    Elige un servicio
                  </option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.title}
                    </option>
                  ))}
                  <option value="otro">Otro / a medida</option>
                </select>
                <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-cream-300" />
              </div>
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Personas" name="people" error={error("people")}>
                <input id="people" name="people" type="number" min={1} inputMode="numeric" placeholder="Aprox." defaultValue={value("people")} aria-invalid={!!error("people")} aria-describedby={error("people") ? "people-error" : undefined} className={inputClasses} />
              </Field>
              <Field label="Fecha" name="date" optional>
                <input id="date" name="date" type="date" defaultValue={value("date")} className={inputClasses} />
              </Field>
            </div>
            <Field label="Cuéntanos más" name="message" error={error("message")} optional className="sm:col-span-2">
              <textarea id="message" name="message" rows={4} placeholder="Horarios, tipo de evento, preferencias del menú…" defaultValue={value("message")} aria-invalid={!!error("message")} aria-describedby={error("message") ? "message-error" : undefined} className={cn(inputClasses, "h-auto resize-none py-3")} />
            </Field>

            {/* Campo trampa anti-spam */}
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

            <div className="flex flex-col-reverse items-start gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
              <AnimatePresence>
                {state.status === "error" && (
                  <motion.p
                    role="alert"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-sm font-semibold text-[#ff9dbb]"
                  >
                    {state.message}
                  </motion.p>
                )}
              </AnimatePresence>
              <Button type="submit" size="lg" disabled={pending} className="sm:ml-auto">
                {pending ? <LoaderCircle className="size-5 animate-spin" aria-hidden /> : <Send className="size-4" aria-hidden />}
                {pending ? "Enviando…" : "Solicitar cotización"}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  name,
  error,
  optional,
  className,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  optional?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-2 flex items-baseline justify-between text-xs font-bold tracking-[0.18em] text-cream-200 uppercase">
        {label}
        {optional && <span className="text-[0.65rem] font-semibold tracking-normal text-cream-300/70 normal-case">Opcional</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${name}-error`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 text-xs font-medium text-[#ff9dbb]"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
