"use client";

import { useSyncExternalStore } from "react";
import { site, weekdays } from "@/content/site";

type Clock = { day: number; minutes: number };

const weekdayIndex = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function readClock(): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: site.timeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "0";
  const day = weekdayIndex.indexOf(get("weekday"));
  const minutes = Number(get("hour")) * 60 + Number(get("minute"));
  // Primitivo para que React compare snapshots por valor
  return `${day}:${minutes}`;
}

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 30_000);
  return () => window.clearInterval(id);
}

/**
 * Hora actual en la zona horaria del restaurante.
 * Devuelve `null` en el servidor y durante la hidratación.
 */
export function useRestaurantClock(): Clock | null {
  const snapshot = useSyncExternalStore(subscribe, readClock, () => null);
  if (!snapshot) return null;
  const [day, minutes] = snapshot.split(":").map(Number);
  return { day, minutes };
}

const toMinutes = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

export function getOpenStatus({ day, minutes }: Clock) {
  const today = site.schedule[day];
  if (today) {
    if (minutes >= toMinutes(today.open) && minutes < toMinutes(today.close)) {
      return { open: true, label: `Abierto · hasta las ${today.close}` };
    }
    if (minutes < toMinutes(today.open)) {
      return { open: false, label: `Abrimos hoy a las ${today.open}` };
    }
  }
  for (let i = 1; i <= 7; i++) {
    const next = (day + i) % 7;
    const slot = site.schedule[next];
    if (slot) {
      const when = i === 1 ? "mañana" : `el ${weekdays[next].toLowerCase()}`;
      return { open: false, label: `Abrimos ${when} a las ${slot.open}` };
    }
  }
  return { open: false, label: "Cerrado" };
}
