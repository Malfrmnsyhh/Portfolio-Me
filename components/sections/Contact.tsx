"use client";

import { motion } from "framer-motion";
import { Code2, Globe, Mail, AtSign } from "lucide-react";
import { ContactForm } from "@/components/ui/ContactForm";

const socials = [
  {
    id: "contact-github",
    label: "GitHub",
    icon: Code2,
    href: "https://github.com/malfrmnsyah",
  },
  {
    id: "contact-linkedin",
    label: "LinkedIn",
    icon: Globe,
    href: "https://linkedin.com/in/malfrmnsyah",
  },
  {
    id: "contact-email",
    label: "Email",
    icon: Mail,
    href: "mailto:akmal@example.com",
  },
  {
    id: "contact-instagram",
    label: "Instagram",
    icon: AtSign,
    href: "https://instagram.com/malfrmnsyah",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

export function Contact() {
  return (
    <section id="contact" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background accent glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(0,163,173,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1200px] px-6 md:px-8 text-center">
        <motion.p
          className="text-sm font-semibold tracking-widest text-[var(--accent)] uppercase mb-3"
          {...fadeUp}
          transition={{ duration: 0.4 }}
        >
          Contact
        </motion.p>

        <motion.h2
          className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--text-primary)] leading-tight mb-4"
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          Let&apos;s Work{" "}
          <span className="text-[var(--accent)]">Together</span>
        </motion.h2>

        <motion.p
          className="text-base text-[var(--text-secondary)] leading-relaxed max-w-md mx-auto mb-10"
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Have a project in mind? I&apos;d love to hear about it. Reach out
          through any of the channels below or fill out the form.
        </motion.p>

        {/* Social icons */}
        <motion.div
          className="flex items-center justify-center gap-4 flex-wrap"
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {socials.map((social) => (
            <motion.a
              key={social.id}
              id={social.id}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="group flex items-center gap-2.5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-sm font-medium text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)] hover:bg-[var(--accent-subtle)] transition-all duration-200"
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.15 }}
            >
              <social.icon
                size={16}
                className="text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors"
              />
              {social.label}
            </motion.a>
          ))}
        </motion.div>

        {/* Contact Form */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ContactForm />
        </motion.div>

        {/* Divider decoration */}
        <motion.div
          className="mt-16 flex items-center justify-center gap-4 text-[var(--text-muted)]"
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <div className="h-px w-24 bg-[var(--border)]" />
          <span className="text-xs font-medium tracking-widest uppercase">
            Open to opportunities
          </span>
          <div className="h-px w-24 bg-[var(--border)]" />
        </motion.div>
      </div>
    </section>
  );
}
