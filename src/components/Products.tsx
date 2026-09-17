import { ArrowUpRight } from "lucide-react";
import { categoryLabel, products, type Category } from "../data";
import { SectionHeading, cardBase } from "./ui";
import { cn } from "../../lib/utils";

const categories: Category[] = ["life", "health", "motor", "travel", "home"];

export default function Products() {
  return (
    <section id="products" className="bg-ash-100/60 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Products"
          title="Every cover your life needs, in one place"
          description="From protecting your family's income to insuring your first bike — pick a category and compare plans side by side."
        />

        <div className="mt-12 space-y-10">
          {categories.map((category) => {
            const items = products.filter((product) => product.category === category);
            if (items.length === 0) return null;
            return (
              <div key={category}>
                <div className="mb-4 flex items-center gap-4">
                  <h3 className="text-lg font-bold text-ash-900">{categoryLabel[category]}</h3>
                  <div className="h-px flex-1 bg-ash-200" />
                  <span className="text-xs font-medium text-ash-500">
                    {items.length} plan{items.length > 1 ? "s" : ""}
                  </span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {items.map((product) => {
                    const Icon = product.icon;
                    return (
                      <a
                        key={product.id}
                        href="#apply"
                        className={cn(cardBase, "group p-5 hover:border-brand-300 hover:shadow-md hover:shadow-brand-500/10")}
                      >
                        <div className="flex items-start justify-between">
                          <span className="flex size-11 items-center justify-center rounded-xl bg-linear-to-br from-brand-50 to-ocean-50 text-brand-600">
                            <Icon className="size-5" aria-hidden="true" />
                          </span>
                          {product.popular ? (
                            <span className="rounded-full bg-sun-400/40 px-2 py-0.5 text-[10px] font-bold text-ash-700">
                              Popular
                            </span>
                          ) : null}
                        </div>
                        <h4 className="mt-4 text-base font-bold text-ash-900">{product.name}</h4>
                        <p className="mt-1 text-sm leading-relaxed text-ash-500">{product.tagline}</p>
                        <div className="mt-4 flex items-center justify-between">
                          <p className="text-sm">
                            <span className="font-bold text-ocean-600">{product.price}</span>
                            <span className="text-ash-400"> · </span>
                            <span className="text-xs text-ash-500">from</span>
                          </p>
                          <ArrowUpRight className="size-4 text-ash-300 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-500" />
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
