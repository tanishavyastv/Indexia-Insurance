import { ShieldCheck } from "lucide-react";
import { cn } from "../../lib/utils";

/* Shared design tokens used across the page */

export const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500";

export const btnGhost =
  "inline-flex items-center justify-center gap-2 rounded-full border border-brand-200 bg-white/80 px-5 py-2.5 text-sm font-semibold text-steel-700 transition-colors hover:border-brand-300 hover:bg-brand-50";

export const topLink =
  "rounded-md px-3 py-2 text-sm font-medium text-ash-600 transition-colors hover:bg-ash-100 hover:text-ash-900";

export const cardBase =
  "rounded-2xl border border-ash-200 bg-white shadow-[0_1px_2px_rgba(14,35,48,0.04)] transition-all duration-200";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className="flex items-center gap-2.5">
      <span
        className={cn(
          "flex size-9 items-center justify-center rounded-xl text-white shadow-sm",
          "bg-linear-to-br from-brand-400 to-ocean-500",
        )}
      >
        <ShieldCheck className="size-5" aria-hidden="true" />
      </span>
      <span className="font-display text-lg font-bold tracking-tight">
        <span className={light ? "text-white" : "text-ash-900"}>Indexia</span>
        <span className="text-brand-500"> Insurance</span>
      </span>
    </a>
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
          "mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl",
          light ? "text-white" : "text-ash-900",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className={cn("mt-3 text-base leading-relaxed", light ? "text-ash-300" : "text-ash-500")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

/* Deliberate image slot: renders with no src, so the browser displays the alt
   text — which is the prompt to hand to an image generator later. Pass `src`
   when the real asset is ready. */
export function ImageSlot({
  prompt,
  src,
  className,
}: {
  prompt: string;
  src?: string;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt={prompt}
      className={cn(
        "flex items-center justify-center bg-ash-100 object-cover p-6 text-center text-xs leading-relaxed text-ash-400",
        className,
      )}
    />
  );
}
