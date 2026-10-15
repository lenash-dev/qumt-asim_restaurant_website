# Qumt'asim · Sitio web

Sitio público del Restaurante Qumt'asim: inicio, menú, promociones y servicios para empresas (con formulario de cotización).

## Stack

| Pieza | Uso |
| --- | --- |
| **Next.js 16** (App Router, Turbopack, Cache Components) | Páginas prerenderizadas como estáticas, metadatos, OG, sitemap |
| **React 19.3** `<ViewTransition>` | Transiciones de entrada/salida entre páginas (ver `globals.css`) |
| **Tailwind CSS 4** | Tokens de marca y utilidades `glass`, `sheen`, `bg-andean`, `aguayo-stripe`, `ticket-notch` |
| **Motion** (`motion/react`) | Animaciones de entrada/salida al hacer scroll, menú móvil, pestañas, formularios |
| **Lenis** | Scroll suave (se desactiva con "reducir movimiento") |
| **Zod** | Validación del formulario de cotización (Server Action) |
| **lucide-react** | Íconos |

## Comandos

```bash
npm run dev     # desarrollo en http://localhost:3000
npm run build   # build de producción
npm run start   # servir el build
npm run lint
```

## Estructura

```
src/
  app/                  rutas: / · /menu · /promociones · /empresas
    empresas/actions.ts Server Action de cotización empresarial
  content/              ← CONTENIDO EDITABLE (datos del local, carta, promos, servicios)
  components/
    layout/             header glass, menú móvil, footer, fondo, transición de página
    home/ menu/ promos/ corporate/   secciones por página
    motion/             Reveal, RiseLine, Counter (animaciones reutilizables)
    ui/                 botones, encabezados, tarjetas
  lib/                  utilidades y reloj del restaurante (abierto/cerrado, "Hoy")
public/brand/           logo separado en piezas PNG transparentes
```

## Editar contenido

Todo el contenido vive en `src/content/`:

- `site.ts`: nombre, dirección, teléfono, WhatsApp, horarios, redes y dominio. **Los valores actuales son de ejemplo.**
- `menu.ts`: categorías y platos. Para usar una foto, colócala en `public/menu/` y añade `image: "/menu/archivo.jpg"` al plato.
- `promotions.ts`: promociones (`days`: 0 = domingo … 6 = sábado).
- `corporate.ts`: servicios, modalidades, pasos y preguntas frecuentes.

## Pendiente

- [ ] Reemplazar los datos de ejemplo (`site.ts`, precios y textos).
- [ ] Fotografías reales de los platos.
- [ ] Conectar `requestQuote` (`src/app/empresas/actions.ts`) al sistema del restaurante o a un servicio de correo. Hoy solo valida y registra en el log del servidor; el usuario puede enviar el resumen por WhatsApp.
- [ ] Reservas en línea. Se harán junto con el sistema de gestión (pedidos, facturación); mientras tanto, los botones "Reservar" abren WhatsApp.
- [ ] Cuando exista la API del sistema, reemplazar `src/content/*.ts` por consultas que devuelvan los mismos tipos.

## Notas técnicas

- El desenfoque de `glass` usa `@apply backdrop-blur-* backdrop-saturate-*`. No escribir `backdrop-filter` a mano: al minificar para producción, Lightning CSS deja solo `-webkit-backdrop-filter` y el glass desaparece en Chrome (en `npm run dev` no se nota; revisar siempre con `npm run build && npm run start`).
- Con Cache Components no se puede leer la hora (`new Date()`) durante el prerender: los componentes que la necesitan usan `useSyncExternalStore` y se resuelven en el cliente (`lib/clock.ts`, `current-year.tsx`).
- El header lleva `view-transition-name` en la barra (no en `<header>`) para quedar fijo durante las transiciones sin romper su `backdrop-filter`.
