import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Bike,
  Briefcase,
  Car,
  HeartPulse,
  Home,
  PiggyBank,
  Plane,
  ShieldCheck,
  Stethoscope,
  Users,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Protect cards — hero entry point ("What do you want to protect?")   */
/* ------------------------------------------------------------------ */

export type ProtectCard = {
  id: string;
  label: string;
  blurb: string;
  icon: LucideIcon;
};

export const protectCards: ProtectCard[] = [
  { id: "health", label: "Health", blurb: "Cover medical expenses", icon: HeartPulse },
  { id: "family", label: "Family", blurb: "Protect your family's future", icon: Users },
  { id: "car", label: "Car", blurb: "Protect your car", icon: Car },
  { id: "bike", label: "Bike", blurb: "Protect your bike", icon: Bike },
  { id: "travel", label: "Travel", blurb: "Stay protected while travelling", icon: Plane },
  { id: "home", label: "Home", blurb: "Protect your home & belongings", icon: Home },
  { id: "business", label: "Business", blurb: "Protect your business", icon: Briefcase },
];

/* ------------------------------------------------------------------ */
/* All insurances — the Explore section + quote form plan picker       */
/* ------------------------------------------------------------------ */

export type InsuranceId =
  | "health"
  | "life"
  | "term"
  | "car"
  | "bike"
  | "travel"
  | "home"
  | "accident"
  | "critical"
  | "business";

export type InsuranceType = {
  id: InsuranceId;
  name: string;
  icon: LucideIcon;
  tagline: string;
  options: string[];
  popular?: boolean;
};

export const insuranceTypes: InsuranceType[] = [
  {
    id: "health",
    name: "Health Insurance",
    icon: HeartPulse,
    tagline: "Cover medical expenses for you and your family.",
    options: ["₹5 L", "₹10 L", "₹25 L", "₹50 L"],
    popular: true,
  },
  {
    id: "term",
    name: "Term Insurance",
    icon: ShieldCheck,
    tagline: "A large life cover at an affordable premium.",
    options: ["₹50 L", "₹1 Cr", "₹2 Cr", "₹5 Cr"],
    popular: true,
  },
  {
    id: "life",
    name: "Life & Savings",
    icon: PiggyBank,
    tagline: "Life cover with savings, retirement and child plans.",
    options: ["₹2,000/month", "₹5,000/month", "₹10,000/month", "₹25,000/month"],
  },
  {
    id: "car",
    name: "Car Insurance",
    icon: Car,
    tagline: "Third-party, comprehensive and own-damage cover.",
    options: ["IDV-based", "Zero-dep", "Third-party"],
    popular: true,
  },
  {
    id: "bike",
    name: "Bike Insurance",
    icon: Bike,
    tagline: "Instant policies for bikes and scooters.",
    options: ["IDV-based", "Zero-dep", "Third-party"],
  },
  {
    id: "travel",
    name: "Travel Insurance",
    icon: Plane,
    tagline: "Medical emergencies, baggage and trip disruptions.",
    options: ["Domestic", "Asia", "Worldwide excl. US/Canada", "Worldwide incl. US/Canada"],
  },
  {
    id: "home",
    name: "Home Insurance",
    icon: Home,
    tagline: "Your house, belongings and valuables — covered.",
    options: ["₹25 L", "₹50 L", "₹1 Cr", "₹2 Cr"],
  },
  {
    id: "accident",
    name: "Personal Accident",
    icon: Activity,
    tagline: "Financial protection after covered accidents.",
    options: ["₹10 L", "₹25 L", "₹50 L", "₹1 Cr"],
  },
  {
    id: "critical",
    name: "Critical Illness",
    icon: Stethoscope,
    tagline: "A lump sum on covered serious diagnoses.",
    options: ["₹10 L", "₹25 L", "₹50 L", "₹1 Cr"],
  },
  {
    id: "business",
    name: "Business Insurance",
    icon: Briefcase,
    tagline: "Shops, offices, employees and specialized risks.",
    options: ["Shop", "Office", "MSME", "Group cover"],
  },
];

export const insuranceById = Object.fromEntries(
  insuranceTypes.map((t) => [t.id, t]),
) as Record<InsuranceId, InsuranceType>;

/* Nav anchor groups — top-level labels only, no 30-link menus */
export const navGroups: { label: string; ids: InsuranceId[] }[] = [
  { label: "Personal", ids: ["health", "term", "life", "accident", "critical"] },
  { label: "Vehicles", ids: ["car", "bike"] },
  { label: "Travel", ids: ["travel"] },
  { label: "Home", ids: ["home"] },
  { label: "Business", ids: ["business"] },
];

/* ------------------------------------------------------------------ */
/* Why Indexia                                                         */
/* ------------------------------------------------------------------ */

export const whyIndexia = [
  { title: "Compare multiple plans", text: "See available insurance options in one place." },
  { title: "Understand before you buy", text: "We explain insurance in simple language." },
  { title: "Get help when you need it", text: "Assistance during purchase, renewal and claims." },
  { title: "Manage everything in one place", text: "Keep your policies together through your Indexia account." },
];

/* ------------------------------------------------------------------ */
/* Quote form shared data                                              */
/* ------------------------------------------------------------------ */

export const annualIncomes = ["Below ₹5 L", "₹5–10 L", "₹10–25 L", "₹25 L+"];

export const tenureOptions = [
  "1 year",
  "5 years",
  "10 years",
  "Up to age 60",
  "Up to age 80",
];
