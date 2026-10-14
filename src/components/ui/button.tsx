import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "solid" | "glass" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group sheen inline-flex shrink-0 items-center justify-center gap-2.5 rounded-full font-semibold tracking-wide whitespace-nowrap select-none " +
  "transition-[transform,background-color,border-color,color,box-shadow] duration-300 ease-out active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  solid:
    "bg-cream-50 text-wine-900 shadow-[0_12px_32px_-12px_rgb(240_181_77/0.65)] hover:bg-gold-300 hover:shadow-[0_16px_40px_-12px_rgb(240_181_77/0.85)]",
  glass: "glass text-cream-50 hover:border-cream-50/35 hover:bg-cream-50/10",
  ghost: "text-cream-100 hover:text-gold-300",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-[0.8rem]",
  md: "h-12 px-6 text-sm",
  lg: "h-14 px-8 text-[0.95rem]",
};

export function buttonClasses({ variant = "solid", size = "md", className }: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

/** Icono de flecha que se desplaza al pasar el cursor */
export function ButtonArrow({ className }: { className?: string }) {
  return (
    <ArrowUpRight
      aria-hidden
      className={cn("size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5", className)}
    />
  );
}

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  arrow?: boolean;
} & Omit<ComponentProps<"a">, "href" | "className" | "children">;

/**
 * Enlace con estilo de botón. Usa `next/link` para rutas internas y
 * `<a>` para anclas, enlaces externos, `tel:` y `mailto:`.
 */
export function ButtonLink({ href, variant, size, className, children, arrow, ...rest }: ButtonLinkProps) {
  const classes = buttonClasses({ variant, size, className });
  const content = (
    <>
      {children}
      {arrow && <ButtonArrow />}
    </>
  );

  const isExternal = /^https?:\/\//.test(href);
  if (isExternal || href.startsWith("#") || href.startsWith("tel:") || href.startsWith("mailto:")) {
    return (
      <a href={href} className={classes} {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {content}
    </Link>
  );
}

export function Button({
  variant,
  size,
  className,
  ...props
}: { variant?: Variant; size?: Size } & ComponentProps<"button">) {
  return <button className={buttonClasses({ variant, size, className })} {...props} />;
}
