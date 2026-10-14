"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { faqs } from "@/content/corporate";
import { cn } from "@/lib/utils";
import { easeOutExpo } from "@/components/motion/reveal";

export function FaqList() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => {
        const isOpen = open === index;
        return (
          <div key={faq.q} className={cn("glass rounded-3xl transition-colors duration-500", isOpen && "border-cream-50/30")}>
            <h3>
              <button
                type="button"
                id={`faq-q-${index}`}
                aria-expanded={isOpen}
                aria-controls={`faq-a-${index}`}
                onClick={() => setOpen(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left font-semibold text-cream-50"
              >
                {faq.q}
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.4, ease: easeOutExpo }}
                  className={cn(
                    "grid size-9 shrink-0 place-items-center rounded-full ring-1 transition-colors",
                    isOpen ? "bg-gold-400 text-wine-900 ring-gold-400" : "text-cream-100 ring-cream-50/20",
                  )}
                >
                  <Plus className="size-4" aria-hidden />
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-a-${index}`}
                  role="region"
                  aria-labelledby={`faq-q-${index}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: easeOutExpo }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-sm/relaxed text-cream-200/80">{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
