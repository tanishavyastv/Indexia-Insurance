import { motion } from "framer-motion";
import { ClipboardCheck, Headset, LineChart, ShieldCheck, Users } from "lucide-react";
import { ImageSlot, SectionHeading } from "./ui";

const features = [
  {
    icon: LineChart,
    title: "Unbiased comparison",
    text: "See real premiums from 40+ insurers side by side — we earn the same either way.",
  },
  {
    icon: Headset,
    title: "Free expert advice",
    text: "IRDAI-certified advisors help you choose cover that actually fits your life.",
  },
  {
    icon: ClipboardCheck,
    title: "100% digital journey",
    text: "Fill one smart form, upload KYC once, e-sign and you're covered. No paperwork.",
  },
  {
    icon: ShieldCheck,
    title: "Claims support that stays",
    text: "A dedicated claims specialist guides your family through every step, end to end.",
  },
];

export default function WhyIndexia() {
  return (
    <section id="why" className="overflow-hidden bg-ash-900 py-16 text-white lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why Indexia"
          title="Insurance is complex. We make it feel simple."
          description="Backed by Indexia Group, we combine technology with human advice so you never overbuy or underinsure."
          light
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <ImageSlot
            prompt="Indian insurance advisor in teal branded shirt explaining policy documents to a young couple at a modern office table, warm professional atmosphere, candid corporate photography"
            className="min-h-72 rounded-3xl border border-white/10"
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: index * 0.07 }}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
                >
                  <Icon className="size-6 text-sun-400" aria-hidden="true" />
                  <h3 className="mt-3 text-base font-bold">{feature.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ash-300">{feature.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-linear-to-r from-ocean-500/20 to-brand-500/20 px-6 py-5">
          <div className="flex items-center gap-3">
            <Users className="size-5 text-sun-400" aria-hidden="true" />
            <p className="text-sm text-ash-200">
              <span className="font-bold text-white">Indexia Group</span> — one family of companies for
              finance, realty and insurance.
            </p>
          </div>
          <a
            href="#apply"
            className="rounded-full bg-sun-400 px-5 py-2 text-sm font-bold text-ash-900 transition-colors hover:bg-sun-300"
          >
            Become a customer
          </a>
        </div>
      </div>
    </section>
  );
}
