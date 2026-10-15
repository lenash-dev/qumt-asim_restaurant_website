# Qumt'asim · Sitio web

Sitio público del Restaurante Qumt'asim: inicio, menú del día, promociones, reservas en línea y servicios para empresas.

El menú, las promociones, las reservas y las solicitudes de convenio se manejan desde el **sistema de gestión** (`../sg_qumtasin_restaurant`) a través de Supabase.

## Stack

| Pieza | Uso |
| --- | --- |
| **Next.js 16** (App Router, Turbopack, Cache Components) | Páginas prerenderizadas como estáticas, metadatos, OG, sitemap |
| **React 19.3** `<ViewTransition>` | Transiciones de entrada/salida entre páginas (ver `globals.css`) |
| **Tailwind CSS 4** | Tokens de marca y utilidades `glass`, `sheen`, `bg-andean`, `aguayo-stripe`, `ticket-notch` |
| **Motion** (`motion/react`) | Animaciones de entrada/salida al hacer scroll, menú móvil, pestañas, formularios |
| **Lenis** | Scroll suave (se desactiva con "reducir movimiento") |
| **Supabase** (`@supabase/supabase-js`) | Lee el menú publicado y las promociones; guarda reservas y solicitudes |
| **Zod** | Validación de los formularios (Server Actions) |
| **lucide-react** | Íconos |

## Comandos

```bash
pnpm install    # instalar dependencias (npm está bloqueado: solo pnpm)
pnpm dev        # desarrollo en http://localhost:3000
pnpm build      # build de producción
pnpm start      # servir el build
pnpm lint
```

## Estructura

```
src/
  app/                  rutas: / · /menu · /promociones · /reservas · /empresas
    reservas/actions.ts Server Action de reservas → tabla reservations
    empresas/actions.ts Server Action de convenios → tabla agreement_requests
    api/revalidate      el sistema avisa aquí cuando cambia el menú o las promos
  content/              ← CONTENIDO EDITABLE (datos del local, servicios) y datos de ejemplo
  components/
    layout/             header glass, menú móvil, footer, fondo, transición de página
    home/ menu/ promos/ corporate/   secciones por página
    motion/             Reveal, RiseLine, Counter (animaciones reutilizables)
    ui/                 botones, encabezados, tarjetas
  lib/
    data.ts             menú de hoy, catálogo y promociones (con caché por etiquetas)
    supabase.ts         cliente con la clave pública
    reservation-slots.ts horarios disponibles para reservar según site.schedule
public/brand/           logo separado en piezas PNG transparentes
```

## Datos y sistema de gestión

- **Menú del día, platos y promociones**: se editan en el sistema de gestión. La web muestra el menú **publicado** de hoy para desayuno, almuerzo y cena, con las categorías que el restaurante habilitó ese día; un servicio sin menú publicado aparece como **"No disponible hoy"**.
- **Reservas** (`/reservas`) y **solicitudes de empresas** (`/empresas`) se guardan en Supabase como pendientes/nuevas y se gestionan en el sistema.
- **Actualización**: los datos se guardan en caché y se refrescan como máximo cada minuto; además el sistema llama a `/api/revalidate` y la web se actualiza al instante.
- **Sin Supabase configurado** la web funciona con los datos de ejemplo de `src/content/` y los formularios ofrecen enviar la reserva o la solicitud por WhatsApp.

### Variables de entorno

Copia `.env.example` como `.env.local` (y configúralas también en Vercel → Settings → Environment Variables):

| Variable | Valor |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | URL del proyecto de Supabase |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Clave pública del proyecto |
| `REVALIDATE_SECRET` | El mismo valor configurado en el sistema de gestión |

### Contenido que sigue en archivos

- `src/content/site.ts`: nombre, dirección, teléfono, WhatsApp, horarios (también definen los horarios para reservar), redes y dominio. **Los valores actuales son de ejemplo.**
- `src/content/corporate.ts`: servicios, modalidades, pasos y preguntas frecuentes de la página de empresas.

## Pendiente

- [ ] Reemplazar los datos de ejemplo de `site.ts`.
- [ ] Conectar Supabase (ver el README del sistema de gestión) y configurar las variables en Vercel.
- [ ] Fotografías reales de los platos (se cargan desde el sistema).

## Notas técnicas

- **Gestor de paquetes: pnpm** (versión fijada en `packageManager` de `package.json`). `scripts/only-pnpm.mjs` corre en `preinstall` y detiene `npm install` o `yarn`. La configuración de pnpm está en `pnpm-workspace.yaml` (scripts de instalación permitidos y excepciones de antigüedad mínima de versiones).
- El desenfoque de `glass` usa `@apply backdrop-blur-* backdrop-saturate-*`. No escribir `backdrop-filter` a mano: al minificar para producción, Lightning CSS deja solo `-webkit-backdrop-filter` y el glass desaparece en Chrome (en `pnpm dev` no se nota; revisar siempre con `pnpm build && pnpm start`).
- Con Cache Components no se puede leer la hora (`new Date()`) durante el prerender: los componentes que la necesitan usan `useSyncExternalStore` y se resuelven en el cliente (`lib/clock.ts`, `current-year.tsx`).
- El header lleva `view-transition-name` en la barra (no en `<header>`) para quedar fijo durante las transiciones sin romper su `backdrop-filter`.
