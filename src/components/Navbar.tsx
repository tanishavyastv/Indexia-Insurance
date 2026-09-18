"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { insuranceById, navGroups } from "@/lib/data";
import { Logo, btnPrimary, topLink } from "./ui";

const anchors = [
  { label: "Claims", href: "#footer" },
  { label: "Renew", href: "#apply" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ash-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {navGroups.map((group) => (
            <a key={group.label} href="#products" className={topLink}>
              {group.label}
            </a>
          ))}
          {anchors.map((link) => (
            <a key={link.label} href={link.href} className={topLink}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="tel:+917302647817"
            className="flex items-center gap-1.5 text-sm font-semibold text-steel-600 hover:text-steel-800"
          >
            <Phone className="size-4" aria-hidden="true" /> 73026 47817
          </a>
          <a href="#apply" className={btnPrimary}>
            Get a Quote
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className="flex size-10 items-center justify-center rounded-lg text-ash-700 hover:bg-ash-100 lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-ash-200 bg-white lg:hidden"
            aria-label="Mobile navigation"
          >
            <div className="space-y-3 px-4 py-4">
              <ul className="grid grid-cols-2 gap-x-3 gap-y-1">
                {navGroups.flatMap((g) => g.ids).map((id) => {
                  const product = insuranceById[id];
                  const Icon = product.icon;
                  return (
                    <li key={id}>
                      <a
                        href="#products"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-ash-700 hover:bg-brand-50"
                      >
                        <Icon className="size-4 text-brand-600" aria-hidden="true" />
                        {product.name.replace(" Insurance", "")}
                      </a>
                    </li>
                  );
                })}
              </ul>
              <a href="#apply" onClick={() => setMobileOpen(false)} className={btnPrimary + " block w-full text-center"}>
                Get a Quote
              </a>
            </div>
            <div className="px-4 pb-4">
              <p className="text-xs text-ash-500">
                Helpline: 73026 47817 · 9 AM–9 PM
              </p>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
