"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { contactSchema, ContactFormData } from "@/lib/validations/contact";

export function ContactForm() {
  const [submitState, setSubmitState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      nickname: "",
      fullName: "",
      email: "",
      subject: "",
      message: "",
      honeypot: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitState("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to send message");
      }

      setSubmitState("success");
      reset();
    } catch (error: any) {
      setSubmitState("error");
      setErrorMessage(
        error.message || "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-12 bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 md:p-8 relative overflow-hidden">
      <AnimatePresence mode="wait">
        {submitState === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center text-center py-12"
          >
            <div className="w-16 h-16 rounded-full bg-[var(--accent)]/10 flex items-center justify-center mb-6">
              <CheckCircle2 size={32} className="text-[var(--accent)]" />
            </div>
            <h3 className="text-2xl font-bold font-heading text-[var(--text-primary)] mb-2">
              Message Sent!
            </h3>
            <p className="text-[var(--text-secondary)] mb-8 max-w-sm mx-auto">
              Thanks for reaching out! I&apos;ll get back to you as soon as
              possible.
            </p>
            <button
              onClick={() => setSubmitState("idle")}
              className="px-6 py-2.5 rounded-xl border border-[var(--border)] text-sm font-medium hover:border-[var(--accent)] transition-colors"
            >
              Send Another Message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 text-left"
          >
            {/* Honeypot field (hidden from users) */}
            <input
              type="text"
              {...register("honeypot")}
              className="hidden"
              aria-hidden="true"
              tabIndex={-1}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="nickname"
                  className="text-sm font-medium text-[var(--text-secondary)]"
                >
                  Name <span className="text-[var(--accent)]">*</span>
                </label>
                <input
                  id="nickname"
                  type="text"
                  placeholder="Nama Panggilan"
                  {...register("nickname")}
                  className={`w-full bg-[var(--background)] border ${
                    errors.nickname
                      ? "border-red-400"
                      : "border-[var(--border)]"
                  } rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all`}
                />
                {errors.nickname && (
                  <p className="text-xs text-red-400 font-medium">
                    {errors.nickname.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="fullName"
                  className="text-sm font-medium text-[var(--text-secondary)]"
                >
                  Full Name <span className="text-[var(--accent)]">*</span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Muhammad Akmal Firmansyah"
                  {...register("fullName")}
                  className={`w-full bg-[var(--background)] border ${
                    errors.fullName
                      ? "border-red-400"
                      : "border-[var(--border)]"
                  } rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all`}
                />
                {errors.fullName && (
                  <p className="text-xs text-red-400 font-medium">
                    {errors.fullName.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-[var(--text-secondary)]"
              >
                Email Address <span className="text-[var(--accent)]">*</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="youremail@email.com"
                {...register("email")}
                className={`w-full bg-[var(--background)] border ${
                  errors.email ? "border-red-400" : "border-[var(--border)]"
                } rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all`}
              />
              {errors.email && (
                <p className="text-xs text-red-400 font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="subject"
                className="text-sm font-medium text-[var(--text-secondary)]"
              >
                Subject <span className="text-[var(--accent)]">*</span>
              </label>
              <input
                id="subject"
                type="text"
                placeholder="Your Message Title"
                {...register("subject")}
                className={`w-full bg-[var(--background)] border ${
                  errors.subject ? "border-red-400" : "border-[var(--border)]"
                } rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all`}
              />
              {errors.subject && (
                <p className="text-xs text-red-400 font-medium">
                  {errors.subject.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="message"
                className="text-sm font-medium text-[var(--text-secondary)]"
              >
                Message <span className="text-[var(--accent)]">*</span>
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Write your message here...."
                {...register("message")}
                className={`w-full bg-[var(--background)] border ${
                  errors.message ? "border-red-400" : "border-[var(--border)]"
                } rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all resize-y`}
              />
              {errors.message && (
                <p className="text-xs text-red-400 font-medium">
                  {errors.message.message}
                </p>
              )}
            </div>

            {submitState === "error" && (
              <div className="flex items-start gap-2 p-3 rounded-lg bg-red-400/10 border border-red-400/20 text-red-400 text-sm">
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                <p>{errorMessage}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={submitState === "loading"}
              className="mt-2 w-full sm:w-auto self-end flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-8 py-3 text-sm font-bold text-white transition-all hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {submitState === "loading" ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
