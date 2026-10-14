import Image from "next/image";
import { cn } from "@/lib/utils";

const wisps = [
  { d: "M30 92 C 18 76, 42 66, 30 50 S 18 22, 30 8", delay: "0s" },
  { d: "M50 96 C 38 78, 62 68, 50 50 S 38 20, 50 2", delay: "1.1s" },
  { d: "M70 92 C 58 76, 82 66, 70 50 S 58 22, 70 8", delay: "2.2s" },
];

/** La taza del logo con vapor animado. */
export function SteamingBowl({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("relative", className)}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        className="absolute bottom-[78%] left-1/2 w-[62%] -translate-x-1/2 overflow-visible text-cream-50"
      >
        {wisps.map((wisp) => (
          <path
            key={wisp.d}
            d={wisp.d}
            pathLength={100}
            stroke="currentColor"
            strokeWidth={6}
            strokeLinecap="round"
            className="steam-path"
            style={{ animationDelay: wisp.delay }}
          />
        ))}
      </svg>
      <Image src="/brand/bowl-body.png" alt="" width={201} height={165} className="relative w-full" />
    </div>
  );
}
