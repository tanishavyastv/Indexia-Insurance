import { Mail, MapPin, Phone } from "lucide-react";
import { productById } from "../data";
import { Logo } from "./ui";

const companyLinks = [
  { label: "About Indexia", href: "#footer" },
  { label: "Careers", href: "#footer" },
  { label: "Partner with us", href: "#footer" },
  { label: "Contact", href: "#footer" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Use", href: "#" },
  { label: "Sitemap", href: "#" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-ash-900 text-ash-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Logo light />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ash-400">
              Indexia Insurance is a subsidiary of Indexia Group, offering life, health and general
              insurance comparison and advisory.
            </p>
          </div>
          <div>
            <p className="text-sm font-bold text-white">Insurance</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {Object.values(productById).map((product) => (
                <li key={product.id}>
                  <a href="#products" className="transition-colors hover:text-brand-300">
                    {product.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-bold text-white">Company</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="transition-colors hover:text-brand-300">{link.label}</a>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm font-bold text-white">Legal</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="transition-colors hover:text-brand-300">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-bold text-white">Contact</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 size-4 text-brand-300" aria-hidden="true" />
                <span>1800-000-000 (toll-free, 9 AM–9 PM)</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 size-4 text-brand-300" aria-hidden="true" />
                <span>care@indexia-insurance.com</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 text-brand-300" aria-hidden="true" />
                <span>Indexia House, Business Bay, Mumbai 400001</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 rounded-xl border border-white/10 bg-white/5 p-4 text-xs leading-relaxed text-ash-400">
          Disclaimer: Insurance is the subject matter of solicitation. Indexia Insurance is a
          placeholder brand of Indexia Group; figures shown are illustrative. Product information,
          premiums and features vary by insurer — read the sales brochure carefully before
          concluding a sale. IRDAI registration details: placeholder, to be updated before launch.
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-ash-500 sm:flex-row">
          <p>© {year} Indexia Group. All rights reserved.</p>
          <p>Made with shields up in India</p>
        </div>
      </div>
    </footer>
  );
}
