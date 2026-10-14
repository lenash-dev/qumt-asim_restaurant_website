/**
 * Fondo fijo: degradado vino, luces cálidas que se desplazan lentamente,
 * patrón andino tenue y grano tipo lino (como el logo).
 * Da profundidad para que el glassmorphism se lea bien.
 */
export function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,var(--color-wine-800)_0%,var(--color-wine-900)_55%,var(--color-wine-950)_100%)]" />

      <div className="ambient-blob absolute -top-[20%] -left-[10%] size-[60vmax] bg-[radial-gradient(circle,rgb(240_181_77/0.16),transparent_62%)] [animation-duration:26s]" />
      <div className="ambient-blob absolute top-[30%] -right-[20%] size-[55vmax] bg-[radial-gradient(circle,rgb(146_40_40/0.55),transparent_62%)] [animation-delay:-8s] [animation-duration:32s]" />
      <div className="ambient-blob absolute -bottom-[30%] left-[15%] size-[50vmax] bg-[radial-gradient(circle,rgb(226_71_122/0.10),transparent_60%)] [animation-delay:-16s] [animation-duration:38s]" />

      <div className="bg-andean absolute inset-0 opacity-[0.035] [mask-image:radial-gradient(70%_60%_at_50%_40%,#000,transparent)]" />
      <div className="grain absolute inset-0 opacity-[0.07] mix-blend-overlay" />
    </div>
  );
}
