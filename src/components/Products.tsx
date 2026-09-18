import { ArrowUpRight } from "lucide-react";
import { insuranceTypes } from "@/lib/data";
import { IconTile, SectionHeading, cardBase } from "./ui";
import { cn } from "@/lib/utils";

export default function Products() {
  return (
    <section id="products" className="bg-white py-10 lg:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Explore Insurance"
          title="Every cover your life needs, in one place"
          description="Health | Life | Motor | Travel | Home | Personal | Business — pick one to get a quote."
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {insuranceTypes.map((type) => {
            return (
              <a
                key={type.id}
                href="#apply"
                className={cn(
                  cardBase,
                  "group p-5 hover:border-brand-300 hover:shadow-md hover:shadow-brand-500/10",
                )}
              >
                <div className="flex items-center justify-between">
                  <IconTile icon={type.icon} />
                  {type.popular ? (
                    <span className="rounded-full bg-sun-400/40 px-2 py-0.5 text-[10px] font-bold text-ash-700">
                      Popular
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-3 text-base font-bold text-ash-900">{type.name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ash-500">{type.tagline}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
                  Get a quote
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
