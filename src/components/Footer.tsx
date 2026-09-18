import { Mail, MapPin, Phone } from "lucide-react";
import { insuranceTypes } from "@/lib/data";
import { Logo } from "./ui";

const companyLinks = [
  { label: "Why Indexia", href: "#why" },
  { label: "Explore Insurance", href: "#" },
  { label: "Get a Quote", href: "#apply" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Use", href: "#" },
  { label: "Regulatory", href: "#" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-ocean-900 text-ash-300">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ash-400">
              Indexia Insurance is a subsidiary of Indexia Group — one place to compare, understand,
              buy and manage insurance.
            </p>
          </div>
          <div>
            <p className="text-sm font-bold text-white">Insurance</p>
            <ul className="mt-3 space-y-2 text-sm">
              {insuranceTypes.map((type) => (
                <li key={type.id}>
                  <a
                    href="#apply"
                    className="transition-colors hover:text-brand-300"
                  >
                    {type.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-bold text-white">Company</p>
            <ul className="mt-3 space-y-2 text-sm">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="transition-colors hover:text-brand-300">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm font-bold text-white">Legal</p>
            <ul className="mt-3 space-y-2 text-sm">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="transition-colors hover:text-brand-300">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-bold text-white">Contact</p>
            <ul className="mt-3 space-y-2.5 text-sm">
              <li className="flex items-start gap-2.5">
                <span>
                  <Phone className="mt-0.5 size-4 text-brand-300" aria-hidden="true" />
                </span>
                <span>73026 47817</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span>
                  <Mail className="mt-0.5 size-4 text-brand-300" aria-hidden="true" />
                </span>
                <span>contactus@indexiainsurance.com</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span>
                  <MapPin className="mt-0.5 size-4 text-brand-300" aria-hidden="true" />
                </span>
                <span>213, Second Floor, Imperial Tower, Near Gurudwara, C Block Commercial Complex, Naraina Vihar, New Delhi - 110028</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-3.5 text-xs leading-relaxed text-ash-400">
          Disclaimer: Insurance is the subject matter of solicitation. Indexia Insurance is a
          placeholder brand of Indexia Group; figures shown are illustrative. The exact products
          Indexia can offer, compare and service depend on its regulatory status, insurer
          partnerships and applicable IRDAI rules — product information, premiums and features vary
          by insurer, and all coverage is subject to policy terms and exclusions.
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-5 text-xs text-ash-500 sm:flex-row">
          <p>© {year} Indexia Group. All rights reserved.</p>
          <p>This website is under development.</p>
        </div>
      </div>
    </footer>
  );
}
