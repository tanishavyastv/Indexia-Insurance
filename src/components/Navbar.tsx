import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, Phone, X } from "lucide-react";
import {
  MotionNavigationMenu,
  MotionNavigationMenuContent,
  MotionNavigationMenuItem,
  MotionNavigationMenuList,
  MotionNavigationMenuTrigger,
} from "./unlumen-ui/motion-navigation-menu";
import { productById, productGroups } from "../data";
import { Logo, btnPrimary, topLink } from "./ui";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ash-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        <MotionNavigationMenu className="hidden lg:flex">
          <MotionNavigationMenuList>
            <MotionNavigationMenuItem value="insurances">
              <MotionNavigationMenuTrigger>All Insurances</MotionNavigationMenuTrigger>
              <MotionNavigationMenuContent className="w-160">
                <div className="grid grid-cols-2 gap-x-6 gap-y-4 p-3">
                  {productGroups.map((group) => (
                    <div key={group.label} className="col-span-1">
                      <p className="px-3 pb-1 text-[11px] font-bold tracking-wider text-ash-400 uppercase">
                        {group.label}
                      </p>
                      <ul>
                        {group.ids.map((id) => {
                          const product = productById[id];
                          const Icon = product.icon;
                          return (
                            <li key={id}>
                              <a
                                href="#products"
                                className="flex items-start gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-brand-50"
                              >
                                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                                  <Icon className="size-4" aria-hidden="true" />
                                </span>
                                <span className="min-w-0">
                                  <span className="flex items-center gap-2 text-sm font-semibold text-ash-900">
                                    {product.name}
                                    {product.popular ? (
                                      <span className="rounded-full bg-sun-400/40 px-1.5 py-0.5 text-[10px] font-bold text-ash-700">
                                        Popular
                                      </span>
                                    ) : null}
                                  </span>
                                  <span className="block truncate text-xs text-ash-500">
                                    {product.tagline}
                                  </span>
                                </span>
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between gap-4 rounded-xl bg-linear-to-r from-ocean-500 to-brand-500 px-5 py-3.5 text-white">
                  <p className="text-sm font-medium">
                    Not sure what you need? Our advisors compare 40+ insurers for free.
                  </p>
                  <a
                    href="#apply"
                    className="flex shrink-0 items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold text-ocean-600 transition-colors hover:bg-sun-300"
                  >
                    Talk to an expert <ArrowRight className="size-3.5" aria-hidden="true" />
                  </a>
                </div>
              </MotionNavigationMenuContent>
            </MotionNavigationMenuItem>
            <MotionNavigationMenuItem value="renew">
              <a href="#products" className={topLink}>
                Renew Policy
              </a>
            </MotionNavigationMenuItem>
            <MotionNavigationMenuItem value="claims">
              <a href="#why" className={topLink}>
                Claims
              </a>
            </MotionNavigationMenuItem>
            <MotionNavigationMenuItem value="about">
              <a href="#footer" className={topLink}>
                About Us
              </a>
            </MotionNavigationMenuItem>
          </MotionNavigationMenuList>
        </MotionNavigationMenu>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="tel:1800-000-000"
            className="flex items-center gap-1.5 text-sm font-semibold text-steel-600 hover:text-steel-800"
          >
            <Phone className="size-4" aria-hidden="true" /> 1800-000-000
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
            <div className="space-y-4 px-4 py-5">
              <div>
                <p className="pb-1 text-[11px] font-bold tracking-wider text-ash-400 uppercase">
                  All Insurances
                </p>
                <ul className="grid grid-cols-2 gap-x-3 gap-y-1">
                  {Object.values(productById).map((product) => {
                    const Icon = product.icon;
                    return (
                      <li key={product.id}>
                        <a
                          href="#products"
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-ash-700 hover:bg-brand-50"
                        >
                          <Icon className="size-4 text-brand-600" aria-hidden="true" />
                          {product.name}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
              {(["Renew Policy", "Claims", "About Us"] as const).map((label) => (
                <a
                  key={label}
                  href={label === "Claims" ? "#why" : label === "About Us" ? "#footer" : "#products"}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-2 py-2 text-sm font-semibold text-ash-700 hover:bg-ash-100"
                >
                  {label}
                </a>
              ))}
              <a href="#apply" onClick={() => setMobileOpen(false)} className={btnPrimary + " w-full"}>
                Get a Quote
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
