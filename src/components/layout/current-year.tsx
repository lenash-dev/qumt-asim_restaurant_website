"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * El año se lee solo en el navegador: con Cache Components no se puede usar
 * `new Date()` durante el prerender.
 */
export function CurrentYear() {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => null,
  );
  return <>{year}</>;
}
