import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Baby,
  Bike,
  Car,
  HeartPulse,
  Home,
  PiggyBank,
  Plane,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

export type ProductId =
  | "term"
  | "savings"
  | "retirement"
  | "child"
  | "health"
  | "critical"
  | "car"
  | "bike"
  | "travel"
  | "home";

export type Category = "life" | "health" | "motor" | "travel" | "home";

export type Product = {
  id: ProductId;
  name: string;
  tagline: string;
  price: string;
  icon: LucideIcon;
  category: Category;
  popular?: boolean;
};

export const products: Product[] = [
  {
    id: "term",
    name: "Term Insurance",
    tagline: "Pure protection for your family's future",
    price: "₹499/month",
    icon: ShieldCheck,
    category: "life",
    popular: true,
  },
  {
    id: "savings",
    name: "Savings & Investment Plans",
    tagline: "ULIPs and guaranteed-return plans",
    price: "₹1,500/month",
    icon: TrendingUp,
    category: "life",
  },
  {
    id: "retirement",
    name: "Retirement Plans",
    tagline: "Pension income for your golden years",
    price: "₹1,000/month",
    icon: PiggyBank,
    category: "life",
  },
  {
    id: "child",
    name: "Child Plans",
    tagline: "Education fund, secured against life's risks",
    price: "₹900/month",
    icon: Baby,
    category: "life",
  },
  {
    id: "health",
    name: "Health Insurance",
    tagline: "Cashless treatment at 12,000+ hospitals",
    price: "₹540/month",
    icon: HeartPulse,
    category: "health",
    popular: true,
  },
  {
    id: "critical",
    name: "Critical Illness Cover",
    tagline: "Lump-sum payout on major diagnoses",
    price: "₹320/month",
    icon: Activity,
    category: "health",
  },
  {
    id: "car",
    name: "Car Insurance",
    tagline: "Comprehensive cover renewed in 3 minutes",
    price: "₹2,094/year",
    icon: Car,
    category: "motor",
    popular: true,
  },
  {
    id: "bike",
    name: "Two-Wheeler Insurance",
    tagline: "Instant policies for bikes and scooters",
    price: "₹707/year",
    icon: Bike,
    category: "motor",
  },
  {
    id: "travel",
    name: "Travel Insurance",
    tagline: "Trip delays, lost baggage, medical abroad",
    price: "₹45/day",
    icon: Plane,
    category: "travel",
  },
  {
    id: "home",
    name: "Home Insurance",
    tagline: "Protect your home and everything in it",
    price: "₹1,200/year",
    icon: Home,
    category: "home",
  },
];

export const productById = Object.fromEntries(
  products.map((p) => [p.id, p]),
) as Record<ProductId, Product>;

export const categoryLabel: Record<Category, string> = {
  life: "Life Insurance",
  health: "Health Insurance",
  motor: "Motor Insurance",
  travel: "Travel Insurance",
  home: "Home Insurance",
};

export const productGroups: { label: string; ids: ProductId[] }[] = [
  { label: "Life Insurance", ids: ["term", "savings", "retirement", "child"] },
  { label: "Health Insurance", ids: ["health", "critical"] },
  { label: "General Insurance", ids: ["car", "bike", "travel", "home"] },
];
