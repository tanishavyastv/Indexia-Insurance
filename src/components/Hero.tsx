"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { insuranceTypes } from "@/lib/data";
import { btnGhost, btnPrimary } from "./ui";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

/* Compact labels for the 5-column hero grid */
const SHORT_NAMES: Partial<Record<(typeof insuranceTypes)[number]["id"], string>> = {
  life: "Life",
  accident: "Accident",
  critical: "Critical",
};

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-white">
      {/* decorative brand wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_26rem_at_85%_-10%,rgba(38,174,144,0.14),transparent),radial-gradient(50rem_22rem_at_100%_70%,rgba(6,106,156,0.10),transparent)]"
      />

      {/* fills exactly one viewport under the sticky navbar, content centered */}
      <div className="relative mx-auto flex max-w-7xl flex-col justify-center px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left column — heading, description, actions */}
          <div className="text-center lg:text-left">
            <motion.p
              {...fadeUp}
              transition={{ duration: 0.45 }}
              className="text-xs font-bold tracking-[0.25em] text-brand-600 uppercase"
            >
              Insurance made simple
            </motion.p>

            <motion.h1
              {...fadeUp}
              transition={{ duration: 0.45, delay: 0.06 }}
              className="mt-3 font-display text-3xl leading-[1.1] font-extrabold tracking-tight text-ash-900 sm:text-4xl xl:text-5xl"
            >
              <span className="bg-linear-to-r from-sun-600 to-brand-500 bg-clip-text text-transparent">
              Compare. Understand.
              </span>
              <br />
              <span className="bg-linear-to-r from-brand-500 to-ocean-500 bg-clip-text text-transparent">
                Protect what matters.
              </span>
            </motion.h1>

            <motion.p
              {...fadeUp}
              transition={{ duration: 0.45, delay: 0.12 }}
              className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-ash-600 sm:text-base lg:mx-0"
            >
              Compare plans, understand your coverage, and choose protection that fits your life —
              with plain-language explanations at every step.
            </motion.p>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.45, delay: 0.18 }}
              className="mt-5 flex flex-wrap justify-center gap-3 lg:justify-start"
            >
              <a href="#apply" className={btnPrimary}>
                Get a quote
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
              <a href="#footer" className={btnGhost}>
                Contact us
              </a>
            </motion.div>
          </div>

          {/* Right column — all insurance types, 5 per row */}
          <div>
            <motion.p
              {...fadeUp}
              transition={{ duration: 0.45, delay: 0.18 }}
              className="text-center font-display text-base font-bold text-ash-900 sm:text-lg lg:text-left"
            >
              What do you want to protect?
            </motion.p>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.45, delay: 0.24 }}
              className="mt-3 grid grid-cols-5 gap-2"
            >
              {insuranceTypes.map((type) => {
                const Icon = type.icon;
                const shortName = SHORT_NAMES[type.id] ?? type.name.replace(" Insurance", "");
                return (
                  <a
                    key={type.id}
                    href="#apply"
                    className="group flex flex-col items-center gap-1 rounded-xl border border-ash-200 bg-white p-2 text-center shadow-[0_1px_2px_rgba(14,35,48,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md hover:shadow-brand-500/10 sm:p-2.5"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-brand-50 to-ocean-50 text-brand-600 transition-colors group-hover:from-brand-100">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    <span className="w-full truncate text-[11px] leading-tight font-bold text-ash-900 sm:text-xs">
                      {shortName}
                    </span>
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-brand-600 sm:text-[11px]">
                      Apply
                      <ArrowRight
                        className="size-3 transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </a>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
