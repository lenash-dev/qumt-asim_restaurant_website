import { BriefcaseBusiness, Coffee, HeartHandshake, UtensilsCrossed, type LucideIcon } from "lucide-react";
import type { ServiceId } from "@/content/corporate";

export const serviceIcons: Record<ServiceId, LucideIcon> = {
  almuerzos: UtensilsCrossed,
  catering: HeartHandshake,
  "coffee-break": Coffee,
  convenios: BriefcaseBusiness,
};
