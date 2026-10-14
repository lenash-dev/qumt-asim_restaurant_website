import { ViewTransition, type ReactNode } from "react";

/**
 * Envuelve el contenido de cada página para animar la salida de la página
 * anterior y la entrada de la nueva (ver estilos en globals.css).
 * Va en cada `page.tsx` y no en el layout: el layout persiste entre
 * navegaciones y no dispararía enter/exit.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
