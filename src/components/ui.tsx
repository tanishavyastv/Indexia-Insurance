import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/* Shared design tokens used across the site */

export const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500";

export const btnGhost =
  "inline-flex items-center justify-center gap-2 rounded-full border border-brand-200 bg-white/80 px-4 py-2 text-sm font-semibold text-steel-700 transition-colors hover:border-brand-300 hover:bg-brand-50";

export const topLink =
  "rounded-md px-3 py-2 text-sm font-medium text-ash-600 transition-colors hover:bg-ash-100 hover:text-ash-900";

export const cardBase =
  "rounded-2xl border border-ash-200 bg-white shadow-[0_1px_2px_rgba(14,35,48,0.04)] transition-all duration-200";

/* Quote-form styles, as Tailwind utilities */

export const quoteField =
  "block h-10 w-full rounded-xl border border-input bg-white px-3.5 text-sm text-ash-900 transition-colors placeholder:text-ash-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15 focus:outline-none";

export const quoteError = "mt-1 text-xs font-medium text-red-600";

export const stepBadge: Record<"done" | "current" | "todo", string> = {
  done: "border-brand-500 bg-brand-500 text-white",
  current: "border-brand-500 bg-white text-brand-500",
  todo: "border-ash-300 bg-white text-ash-500",
};

export const stepLabel: Record<"done" | "current" | "todo", string> = {
  done: "text-brand-700",
  current: "text-brand-600",
  todo: "text-ash-500",
};

export function Logo() {
  return (
    <Link href="/#top" aria-label="Indexia Insurance — home" className="flex shrink-0 items-center">
      <img
        src="/logo.png"
        alt="Indexia Insurance Logo"
        className="h-15 w-auto object-contain"
      />
    </Link>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  light?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <p className="text-xs font-bold tracking-[0.2em] text-brand-600 uppercase">{eyebrow}</p>
      <h2
        className={cn(
          "mt-1.5 font-display text-2xl font-bold tracking-tight sm:text-3xl",
          light ? "text-white" : "text-ash-900",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className={cn("mt-2 text-sm leading-relaxed", light ? "text-ash-300" : "text-ash-500")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}


export function IconTile({ icon: Icon, className }: { icon: LucideIcon; className?: string }) {
  return (
    <span
      className={cn(
        "flex size-9 items-center justify-center rounded-xl bg-linear-to-br from-brand-50 to-ocean-50 text-brand-600",
        className,
      )}
    >
      <Icon className="size-4" aria-hidden="true" />
    </span>
  );
}
