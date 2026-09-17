import { motion } from "framer-motion";
import { BadgeCheck, ShieldCheck, Star, TrendingDown } from "lucide-react";
import { ImageSlot, btnGhost, btnPrimary } from "./ui";

const stats = [
  { value: "1.2 Cr+", label: "Policies served" },
  { value: "₹4,200 Cr", label: "Claims settled" },
  { value: "40+", label: "Insurer partners" },
  { value: "4.8 / 5", label: "Advisor rating" },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-white">
      {/* decorative brand wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_30rem_at_85%_-10%,rgba(38,174,144,0.14),transparent),radial-gradient(50rem_26rem_at_100%_60%,rgba(6,106,156,0.10),transparent)]"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pt-14 pb-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pt-20">
        <div>
          <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
            <p className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
              <BadgeCheck className="size-3.5" aria-hidden="true" />
              A proud subsidiary of Indexia Group
            </p>
          </motion.div>

          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="mt-5 font-display text-4xl leading-[1.08] font-extrabold tracking-tight text-ash-900 sm:text-5xl lg:text-[3.4rem]"
          >
            Smart insurance,{" "}
            <span className="bg-linear-to-r from-brand-500 to-ocean-500 bg-clip-text text-transparent">
              simplified.
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="mt-5 max-w-xl text-lg leading-relaxed text-ash-600"
          >
            Compare India's top insurers in one place, get honest advice, and buy
            the right cover in minutes — from term and health to motor and travel.
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a href="#apply" className={btnPrimary}>
              Get Free Quote <TrendingDown className="size-4" aria-hidden="true" />
            </a>
            <a href="#products" className={btnGhost}>
              Explore Plans
            </a>
            <span className="flex items-center gap-1.5 pl-2 text-sm text-ash-500">
              <Star className="size-4 fill-sun-400 text-sun-400" aria-hidden="true" />
              4.8 rated by 92,000+ customers
            </span>
          </motion.div>

          <motion.dl
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="mt-10 grid max-w-lg grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4 sm:max-w-none"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-xl font-bold text-ash-900">{stat.value}</dd>
                <dd className="text-xs text-ash-500">{stat.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative"
        >
          <ImageSlot
            prompt="Happy Indian family of four smiling together in a bright modern living room, soft natural light, professional lifestyle photography, teal and blue accents in decor"
            className="aspect-4/3 rounded-3xl border border-ash-200 shadow-xl"
          />
          <div className="absolute -bottom-6 -left-4 hidden w-64 rounded-2xl border border-ash-200 bg-white p-4 shadow-lg sm:block">
            <div className="flex items-center gap-2 text-sm font-semibold text-ash-900">
              <ShieldCheck className="size-4 text-brand-500" aria-hidden="true" />
              Claims settled in 48 hrs
            </div>
            <ImageSlot
              prompt="Close-up of a claim approval notification on a smartphone screen, clean minimal UI, teal accent color"
              className="mt-3 aspect-16/7 rounded-xl"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
