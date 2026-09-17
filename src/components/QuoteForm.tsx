import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, ShieldCheck, UserRound } from "lucide-react";
import { productById, type ProductId } from "../data";
import { SectionHeading } from "./ui";

type Step = 0 | 1 | 2 | 3;
const stepMeta = [
  { label: "Plan", icon: ShieldCheck },
  { label: "Your details", icon: UserRound },
  { label: "Family & health", icon: Check },
  { label: "Review", icon: ArrowRight },
] as const;

const annualIncomes = ["Below ₹5 L", "₹5–10 L", "₹10–25 L", "₹25 L+"];
const coverOptions: Partial<Record<ProductId, string[]>> = {
  term: ["₹50 L", "₹1 Cr", "₹2 Cr", "₹5 Cr"],
  health: ["₹5 L", "₹10 L", "₹25 L", "₹50 L"],
  critical: ["₹10 L", "₹25 L", "₹50 L", "₹1 Cr"],
  car: ["IDV-based", "Zero-dep", "Third-party"],
  bike: ["IDV-based", "Zero-dep", "Third-party"],
  travel: ["Domestic", "Worldwide excl. US/Canada", "Worldwide incl. US/Canada"],
  home: ["₹25 L", "₹50 L", "₹1 Cr", "₹2 Cr"],
  savings: ["Guaranteed income", "ULIP (market-linked)", "Endowment"],
  retirement: ["Deferred annuity", "Immediate annuity"],
  child: ["₹10 L", "₹25 L", "₹50 L", "₹1 Cr"],
};

type Form = {
  productId: ProductId | "";
  cover: string;
  tenure: string;
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  gender: "" | "male" | "female" | "other";
  income: string;
  city: string;
  pincode: string;
  smoker: "" | "yes" | "no";
  preExisting: "" | "yes" | "no";
  members: string;
  nominee: string;
  nomineeRelation: string;
  consent: boolean;
};

const initialForm: Form = {
  productId: "",
  cover: "",
  tenure: "",
  fullName: "",
  email: "",
  phone: "",
  dob: "",
  gender: "",
  income: "",
  city: "",
  pincode: "",
  smoker: "",
  preExisting: "",
  members: "1",
  nominee: "",
  nomineeRelation: "",
  consent: false,
};

const inputBase =
  "h-11 w-full rounded-xl border border-input bg-white px-3.5 text-sm text-ash-900 placeholder:text-ash-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15 focus:outline-none";

function Field({
  label,
  htmlFor,
  error,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-ash-700">
        {label}
        {hint ? <span className="ml-1 text-xs font-normal text-ash-400">{hint}</span> : null}
      </label>
      {children}
      {error ? <p className="mt-1 text-xs font-medium text-destructive">{error}</p> : null}
    </div>
  );
}

export default function QuoteForm() {
  const [step, setStep] = useState<Step>(0);
  const [form, setForm] = useState<Form>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});

  const product = form.productId ? productById[form.productId] : undefined;
  const covers = useMemo(
    () => (form.productId ? coverOptions[form.productId] ?? [] : []),
    [form.productId],
  );

  const set = <K extends keyof Form>(key: K, value: Form[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (
    target: Step,
    withConsent: boolean,
  ): Partial<Record<keyof Form, string>> => {
    const e: Partial<Record<keyof Form, string>> = {};
    if (target > 0) {
      if (!form.productId) e.productId = "Select a plan to continue";
      if (!form.cover) e.cover = "Choose a cover amount";
      if (!form.tenure) e.tenure = "Choose a policy term";
    }
    if (target > 1) {
      if (form.fullName.trim().length < 3) e.fullName = "Enter your full name";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
      if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = "Enter a valid 10-digit mobile";
      if (!form.dob) e.dob = "Date of birth is required";
      if (!form.gender) e.gender = "Select gender";
      if (!form.income) e.income = "Select income range";
      if (!form.city.trim()) e.city = "City is required";
      if (!/^\d{6}$/.test(form.pincode)) e.pincode = "Enter a 6-digit PIN code";
    }
    if (withConsent && !form.consent) e.consent = "Please accept the declaration to submit";
    return e;
  };

  const goNext = () => {
    const e = validate((step + 1) as Step, false);
    setErrors(e);
    if (Object.keys(e).length === 0) setStep((s) => (s + 1) as Step);
  };

  const goBack = () => setStep((s) => (s - 1) as Step);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const e = validate(3, true);
    setErrors(e);
    if (Object.keys(e).length === 0) setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="apply" className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl border border-brand-200 bg-brand-50 p-10 text-center"
          >
            <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-brand-500 text-white">
              <Check className="size-8" aria-hidden="true" />
            </span>
            <h3 className="mt-5 font-display text-2xl font-bold text-ash-900">
              Application received!
            </h3>
            <p className="mx-auto mt-2 max-w-md text-ash-600">
              Thanks {form.fullName.split(" ")[0]} — our advisor will call you within 24 hours on{" "}
              <strong>{form.phone}</strong> about your <strong>{product?.name}</strong> application.
            </p>
            <button
              type="button"
              onClick={() => {
                setForm(initialForm);
                setStep(0);
                setSubmitted(false);
                setErrors({});
              }}
              className="mt-6 rounded-full bg-brand-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-600"
            >
              Start a new application
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="apply" className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Get Started"
          title="Apply for insurance in 4 easy steps"
          description="One smart form, honest advice, and a callback from a certified advisor — no spam, ever."
        />

        <div className="mt-10 rounded-3xl border border-ash-200 bg-ash-100/50 p-5 sm:p-8">
          {/* Stepper */}
          <ol className="mb-8 grid grid-cols-4 gap-2">
            {stepMeta.map((meta, index) => {
              const Icon = meta.icon;
              const state = index < step ? "done" : index === step ? "current" : "todo";
              return (
                <li key={meta.label} className="flex flex-col items-center gap-1.5 text-center">
                  <span
                    className={
                      "flex size-9 items-center justify-center rounded-full border-2 transition-colors " +
                      (state === "done"
                        ? "border-brand-500 bg-brand-500 text-white"
                        : state === "current"
                          ? "border-brand-500 bg-white text-brand-600"
                          : "border-ash-300 bg-white text-ash-400")
                    }
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <span
                    className={
                      "text-[11px] font-semibold sm:text-xs " +
                      (state === "todo" ? "text-ash-400" : "text-ash-900")
                    }
                  >
                    {meta.label}
                  </span>
                </li>
              );
            })}
          </ol>

          <form onSubmit={submit} noValidate>
            {step === 0 && (
              <div className="space-y-6">
                <Field label="Which insurance do you need?" htmlFor="productId" error={errors.productId}>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {Object.values(productById).map((p) => {
                      const Icon = p.icon;
                      const active = form.productId === p.id;
                      return (
                        <button
                          type="button"
                          key={p.id}
                          onClick={() => set("productId", p.id)}
                          aria-pressed={active}
                          className={
                            "flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-sm font-medium transition-colors " +
                            (active
                              ? "border-brand-500 bg-brand-50 text-brand-700"
                              : "border-ash-200 bg-white text-ash-700 hover:border-brand-300")
                          }
                        >
                          <Icon className="size-4 shrink-0" aria-hidden="true" />
                          <span className="truncate">{p.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </Field>

                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Cover amount" htmlFor="cover" error={errors.cover} hint="(sum assured)">
                    <select
                      id="cover"
                      className={inputBase}
                      value={form.cover}
                      onChange={(e) => set("cover", e.target.value)}
                    >
                      <option value="">Select cover</option>
                      {covers.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Policy term" htmlFor="tenure" error={errors.tenure}>
                    <select
                      id="tenure"
                      className={inputBase}
                      value={form.tenure}
                      onChange={(e) => set("tenure", e.target.value)}
                    >
                      <option value="">Select term</option>
                      <option value="1 year">1 year</option>
                      <option value="5 years">5 years</option>
                      <option value="10 years">10 years</option>
                      <option value="Up to age 60">Up to age 60</option>
                      <option value="Up to age 80">Up to age 80</option>
                    </select>
                  </Field>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Full name" htmlFor="fullName" error={errors.fullName}>
                  <input
                    id="fullName"
                    className={inputBase}
                    placeholder="As per government ID"
                    value={form.fullName}
                    onChange={(e) => set("fullName", e.target.value)}
                  />
                </Field>
                <Field label="Email address" htmlFor="email" error={errors.email}>
                  <input
                    id="email"
                    type="email"
                    className={inputBase}
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                  />
                </Field>
                <Field label="Mobile number" htmlFor="phone" error={errors.phone} hint="(Indian number)">
                  <input
                    id="phone"
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    className={inputBase}
                    placeholder="10-digit mobile"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value.replace(/\D/g, ""))}
                  />
                </Field>
                <Field label="Date of birth" htmlFor="dob" error={errors.dob}>
                  <input
                    id="dob"
                    type="date"
                    className={inputBase}
                    value={form.dob}
                    onChange={(e) => set("dob", e.target.value)}
                  />
                </Field>
                <Field label="Gender" htmlFor="gender" error={errors.gender}>
                  <select
                    id="gender"
                    className={inputBase}
                    value={form.gender}
                    onChange={(e) => set("gender", e.target.value as Form["gender"])}
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </Field>
                <Field label="Annual income" htmlFor="income" error={errors.income}>
                  <select
                    id="income"
                    className={inputBase}
                    value={form.income}
                    onChange={(e) => set("income", e.target.value)}
                  >
                    <option value="">Select range</option>
                    {annualIncomes.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </Field>
                <Field label="City" htmlFor="city" error={errors.city}>
                  <input
                    id="city"
                    className={inputBase}
                    placeholder="e.g. Mumbai"
                    value={form.city}
                    onChange={(e) => set("city", e.target.value)}
                  />
                </Field>
                <Field label="PIN code" htmlFor="pincode" error={errors.pincode}>
                  <input
                    id="pincode"
                    inputMode="numeric"
                    maxLength={6}
                    className={inputBase}
                    placeholder="6-digit PIN"
                    value={form.pincode}
                    onChange={(e) => set("pincode", e.target.value.replace(/\D/g, ""))}
                  />
                </Field>
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Members to be insured" htmlFor="members">
                  <select
                    id="members"
                    className={inputBase}
                    value={form.members}
                    onChange={(e) => set("members", e.target.value)}
                  >
                    <option value="1">Self</option>
                    <option value="2">Self + Spouse</option>
                    <option value="3">Self + Spouse + 1 Child</option>
                    <option value="4">Family (2 adults + 2 children)</option>
                  </select>
                </Field>
                <Field label="Do you smoke or use tobacco?" htmlFor="smoker">
                  <select
                    id="smoker"
                    className={inputBase}
                    value={form.smoker}
                    onChange={(e) => set("smoker", e.target.value as Form["smoker"])}
                  >
                    <option value="">Select</option>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </Field>
                <Field
                  label="Any pre-existing conditions?"
                  htmlFor="preExisting"
                  hint="(diabetes, hypertension, etc.)"
                >
                  <select
                    id="preExisting"
                    className={inputBase}
                    value={form.preExisting}
                    onChange={(e) => set("preExisting", e.target.value as Form["preExisting"])}
                  >
                    <option value="">Select</option>
                    <option value="no">None</option>
                    <option value="yes">Yes — advisor will discuss</option>
                  </select>
                </Field>
                <Field label="Nominee name" htmlFor="nominee">
                  <input
                    id="nominee"
                    className={inputBase}
                    placeholder="Who should receive the benefit?"
                    value={form.nominee}
                    onChange={(e) => set("nominee", e.target.value)}
                  />
                </Field>
                <Field label="Nominee relationship" htmlFor="nomineeRelation">
                  <select
                    id="nomineeRelation"
                    className={inputBase}
                    value={form.nomineeRelation}
                    onChange={(e) => set("nomineeRelation", e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="spouse">Spouse</option>
                    <option value="son">Son</option>
                    <option value="daughter">Daughter</option>
                    <option value="mother">Mother</option>
                    <option value="father">Father</option>
                    <option value="other">Other</option>
                  </select>
                </Field>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="grid gap-3 rounded-2xl border border-ash-200 bg-white p-5 text-sm sm:grid-cols-2">
                  <p><span className="text-ash-500">Plan:</span> <strong>{product?.name}</strong></p>
                  <p><span className="text-ash-500">Cover:</span> <strong>{form.cover}</strong></p>
                  <p><span className="text-ash-500">Term:</span> <strong>{form.tenure}</strong></p>
                  <p><span className="text-ash-500">Name:</span> <strong>{form.fullName}</strong></p>
                  <p><span className="text-ash-500">Email:</span> <strong>{form.email}</strong></p>
                  <p><span className="text-ash-500">Mobile:</span> <strong>{form.phone}</strong></p>
                  <p><span className="text-ash-500">City:</span> <strong>{form.city} {form.pincode}</strong></p>
                  <p><span className="text-ash-500">Income:</span> <strong>{form.income}</strong></p>
                  <p><span className="text-ash-500">Insured members:</span> <strong>{form.members}</strong></p>
                  <p><span className="text-ash-500">Nominee:</span> <strong>{form.nominee || "—"} {form.nomineeRelation ? `(${form.nomineeRelation})` : ""}</strong></p>
                </div>
                <label className="flex items-start gap-3 rounded-2xl border border-ash-200 bg-white p-4 text-sm text-ash-600">
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => set("consent", e.target.checked)}
                    className="mt-0.5 size-4 accent-brand-500"
                  />
                  <span>
                    I authorize Indexia Insurance and its partners to contact me via call, SMS, email
                    and WhatsApp regarding my application, even if I am registered on DND. I agree to
                    the terms of use and privacy policy.
                  </span>
                </label>
                {errors.consent ? (
                  <p className="text-xs font-medium text-destructive">{errors.consent}</p>
                ) : null}
              </div>
            )}

            {/* Actions */}
            <div className="mt-8 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={goBack}
                disabled={step === 0}
                className="inline-flex items-center gap-2 rounded-full border border-ash-300 px-5 py-2.5 text-sm font-semibold text-ash-700 transition-colors hover:bg-white disabled:invisible"
              >
                <ArrowLeft className="size-4" aria-hidden="true" /> Back
              </button>
              {step < 3 ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-600"
                >
                  Continue <ArrowRight className="size-4" aria-hidden="true" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-600"
                >
                  Submit application <ArrowRight className="size-4" aria-hidden="true" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
