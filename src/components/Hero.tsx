"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { protectCards } from "@/lib/data";
import { btnGhost } from "./ui";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-white">
      {/* decorative brand wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_26rem_at_85%_-10%,rgba(38,174,144,0.14),transparent),radial-gradient(50rem_22rem_at_100%_70%,rgba(6,106,156,0.10),transparent)]"
      />

      <div className="relative mx-auto max-w-7xl px-4 pt-10 pb-12 text-center sm:px-6 lg:px-8 lg:pt-14">
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
          className="mx-auto mt-3 max-w-3xl font-display text-3xl leading-[1.1] font-extrabold tracking-tight text-ash-900 sm:text-5xl"
        >
          Compare. Understand.{" "}
          <span className="bg-linear-to-r from-brand-500 to-ocean-500 bg-clip-text text-transparent">
            Protect what matters.
          </span>
        </motion.h1>

        <motion.p
          {...fadeUp}
          transition={{ duration: 0.45, delay: 0.12 }}
          className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ash-600"
        >
          Compare plans, understand your coverage, and choose protection that fits your life — with
          plain-language explanations at every step.
        </motion.p>

        {/* "What do you want to protect?" — selecting a card scrolls to the form */}
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.45, delay: 0.18 }}
          className="mt-8 font-display text-lg font-bold text-ash-900"
        >
          What do you want to protect?
        </motion.p>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.45, delay: 0.24 }}
          className="mx-auto mt-4 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7"
        >
          {protectCards.map((card) => {
            const Icon = card.icon;
            return (
              <a
                key={card.id}
                href="#apply"
                className="group flex flex-col items-center gap-1.5 rounded-2xl border border-ash-200 bg-white p-4 text-center shadow-[0_1px_2px_rgba(14,35,48,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md hover:shadow-brand-500/10"
              >
                <span className="flex size-10 items-center justify-center rounded-xl bg-linear-to-br from-brand-50 to-ocean-50 text-brand-600 transition-colors group-hover:from-brand-100">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="text-sm font-bold text-ash-900">{card.label}</span>
                <span className="text-[11px] leading-snug text-ash-500">{card.blurb}</span>
                <span className="mt-auto inline-flex items-center gap-1 pt-1.5 text-xs font-bold text-brand-600">
                  Apply
                  <ArrowRight
                    className="size-3.5 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </a>
            );
          })}
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.45, delay: 0.3 }}
          className="mt-6"
        >
          <a href="#products" className={btnGhost}>
            Explore insurance
          </a>
        </motion.div>
      </div>
    </section>
  );
}
