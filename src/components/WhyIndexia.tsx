"use client";

import { motion } from "framer-motion";
import { ClipboardCheck, Headset, LayoutList, Wallet } from "lucide-react";
import { whyIndexia } from "@/lib/data";
import { SectionHeading } from "./ui";

const icons = [LayoutList, Headset, ClipboardCheck, Wallet];

export default function WhyIndexia() {
  return (
    <section id="why" className="bg-ash-100/60 py-10 lg:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why Indexia"
          title="Simple, transparent insurance"
          description="No jargon, no walls of text — just the information you need to choose well."
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {whyIndexia.map((item, index) => {
            const Icon = icons[index] ?? LayoutList;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
                className="rounded-2xl border border-ash-200 bg-white p-5"
              >
                <Icon className="size-6 text-brand-600" aria-hidden="true" />
                <h3 className="mt-3 text-base font-bold text-ash-900">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ash-500">{item.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
