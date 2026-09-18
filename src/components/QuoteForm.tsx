"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, ShieldCheck, UserRound } from "lucide-react";
import { annualIncomes, insuranceById, insuranceTypes, tenureOptions } from "@/lib/data";
import { SectionHeading, quoteField, quoteError, stepBadge, stepLabel } from "./ui";
import { cn } from "@/lib/utils";

type Step = 0 | 1 | 2 | 3;
const stepMeta = [
  { label: "Plan", icon: ShieldCheck },
  { label: "Your details", icon: UserRound },
  { label: "Family & health", icon: Check },
  { label: "Review", icon: ArrowRight },
] as const;

type Form = {
  productId: string;
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
      {error ? <p className={quoteError}>{error}</p> : null}
    </div>
  );
}

export default function QuoteForm() {
  const [step, setStep] = useState<Step>(0);
  const [form, setForm] = useState<Form>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});

  const product = form.productId ? insuranceById[form.productId as keyof typeof insuranceById] : undefined;
  const covers = useMemo(
    () => (product ? product.options : []),
    [product],
  );

  const set = <K extends keyof Form>(key: K, value: Form[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (target: Step, withConsent: boolean): Partial<Record<keyof Form, string>> => {
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

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const e = validate(3, true);
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    // Honeypot: silently drop bot submissions (FormSubmit's _honey field)
    const honeypot = event.currentTarget.elements.namedItem("_honey") as HTMLInputElement | null;
    if (honeypot?.value) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      // FormSubmit.co AJAX endpoint — delivers the submission as an email to
      // contactus@indexiainsurance.com. `_captcha: false` skips their captcha
      // (the honeypot field already stops bots); `_template: table` renders the
      // submission as a readable table in the inbox.
      const res = await fetch("https://formsubmit.co/ajax/contactus@indexiainsurance.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `New ${form.productId} insurance quote request — ${form.fullName}`,
          _template: "table",
          _captcha: "false",
          _replyto: form.email,
          Name: form.fullName,
          Email: form.email,
          Mobile: form.phone,
          Plan: form.productId,
          "Cover amount": form.cover,
          "Policy term": form.tenure,
          "Date of birth": form.dob,
          Gender: form.gender,
          "Annual income": form.income,
          City: form.city,
          "PIN code": form.pincode,
          "Smoker/tobacco": form.smoker,
          "Pre-existing conditions": form.preExisting,
          "Members to insure": form.members,
          Nominee: form.nominee || "—",
          "Nominee relationship": form.nomineeRelation || "—",
          "Honey": "",
        }),
      });
      const result = (await res.json().catch(() => ({}))) as {
        success?: boolean | string;
        message?: string;
      };
      if (res.ok && (result.success === true || result.success === "true")) {
        setSubmitted(true);
      } else {
        setSubmitError(result.message ?? "Submission failed. Please try again.");
      }
    } catch {
      setSubmitError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section id="apply" className="bg-white py-10 lg:py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl border border-brand-200 bg-brand-50 p-8 text-center"
          >
            <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-brand-500 text-white">
              <Check className="size-6" aria-hidden="true" />
            </span>
            <h3 className="mt-4 font-display text-xl font-bold text-ash-900">
              Application received!
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-ash-600">
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
              className="mt-5 rounded-full bg-brand-500 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-600"
            >
              Start a new application
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="apply" className="bg-white py-10 lg:py-14">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Get Started"
          title="Apply for insurance in 4 easy steps"
          description="One smart form, honest advice, and a callback from a certified advisor — no spam, ever."
        />

        <div className="mt-6 rounded-3xl border border-ash-200 bg-ash-100/50 p-4 sm:p-6">
          {/* Stepper */}
          <ol className="mb-6 grid grid-cols-4 gap-2">
            {stepMeta.map((meta, index) => {
              const Icon = meta.icon;
              const state = index < step ? "done" : index === step ? "current" : "todo";
              return (
                <li key={meta.label} className="flex flex-col items-center gap-1.5 text-center">
                  <span
                    className={cn(
                      "flex size-9 items-center justify-center rounded-full border-2 transition-colors",
                      stepBadge[state],
                    )}
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <span className={cn("text-xs font-semibold", stepLabel[state])}>
                    {meta.label}
                  </span>
                </li>
              );
            })}
          </ol>

          <form onSubmit={submit} noValidate>
            {/* Honeypot — hidden from humans, catches bots (FormSubmit _honey) */}
            <div className="hidden" aria-hidden="true">
              <label>
                Don't fill this out: <input name="_honey" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            {step === 0 && (
              <div className="space-y-5">
                <Field label="Which insurance do you need?" htmlFor="productId" error={errors.productId}>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {insuranceTypes.map((p) => {
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
                          <span className="truncate">{p.name.replace(" Insurance", "")}</span>
                        </button>
                      );
                    })}
                  </div>
                </Field>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Cover amount" htmlFor="cover" error={errors.cover}>
                    <select
                      id="cover"
                      className={quoteField}
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
                      className={quoteField}
                      value={form.tenure}
                      onChange={(e) => set("tenure", e.target.value)}
                    >
                      <option value="">Select term</option>
                      {tenureOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </Field>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full name" htmlFor="fullName" error={errors.fullName}>
                  <input
                    id="fullName"
                    className={quoteField}
                    placeholder="As per government ID"
                    value={form.fullName}
                    onChange={(e) => set("fullName", e.target.value)}
                  />
                </Field>
                <Field label="Email address" htmlFor="email" error={errors.email}>
                  <input
                    id="email"
                    type="email"
                    className={quoteField}
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
                    className={quoteField}
                    placeholder="10-digit mobile"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value.replace(/\D/g, ""))}
                  />
                </Field>
                <Field label="Date of birth" htmlFor="dob" error={errors.dob}>
                  <input
                    id="dob"
                    type="date"
                    className={quoteField}
                    value={form.dob}
                    onChange={(e) => set("dob", e.target.value)}
                  />
                </Field>
                <Field label="Gender" htmlFor="gender" error={errors.gender}>
                  <select
                    id="gender"
                    className={quoteField}
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
                    className={quoteField}
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
                    className={quoteField}
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
                    className={quoteField}
                    placeholder="6-digit PIN"
                    value={form.pincode}
                    onChange={(e) => set("pincode", e.target.value.replace(/\D/g, ""))}
                  />
                </Field>
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Members to be insured" htmlFor="members">
                  <select
                    id="members"
                    className={quoteField}
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
                    className={quoteField}
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
                    className={quoteField}
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
                    className={quoteField}
                    placeholder="Who should receive the benefit?"
                    value={form.nominee}
                    onChange={(e) => set("nominee", e.target.value)}
                  />
                </Field>
                <Field label="Nominee relationship" htmlFor="nomineeRelation">
                  <select
                    id="nomineeRelation"
                    className={quoteField}
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
                <div className="grid gap-3 rounded-2xl border border-ash-200 bg-white p-4 text-sm sm:grid-cols-2">
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
                <label className="flex items-start gap-3 rounded-2xl border border-ash-200 bg-white p-3.5 text-sm text-ash-600">
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
                  <p className={quoteError}>{errors.consent}</p>
                ) : null}
              </div>
            )}

            {/* Actions */}
            <div className="mt-6 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={goBack}
                disabled={step === 0}
                className="inline-flex items-center gap-2 rounded-full border border-ash-300 px-5 py-2 text-sm font-semibold text-ash-700 transition-colors hover:bg-white disabled:invisible"
              >
                <ArrowLeft className="size-4" aria-hidden="true" /> Back
              </button>
              {step < 3 ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-600"
                >
                  Continue <ArrowRight className="size-4" aria-hidden="true" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-600 disabled:opacity-60"
                >
                  {submitting ? "Submitting…" : ("Submit application")}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </button>
              )}
            </div>
            {submitError ? (
              <p className="mt-3 text-sm font-medium text-red-600">{submitError}</p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}
