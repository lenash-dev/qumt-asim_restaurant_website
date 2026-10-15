"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";

/** Estilo de los campos de los formularios públicos (empresas, reservas) */
export const inputClasses =
  "h-12 w-full rounded-2xl bg-wine-950/45 px-4 text-sm text-cream-50 ring-1 ring-cream-50/12 outline-none transition " +
  "placeholder:text-cream-300/55 focus:bg-wine-950/70 focus:ring-2 focus:ring-gold-400/70 aria-invalid:ring-aguayo-rose/70";

/** Etiqueta + campo + mensaje de error animado. El campo debe tener `id={name}`. */
export function Field({
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
