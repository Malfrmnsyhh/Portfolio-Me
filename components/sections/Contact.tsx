"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MessageSquare, X } from "lucide-react";
import { Icon } from "@iconify/react";
import { ContactForm } from "@/components/ui/ContactForm";

const socials = [
  {
    id: "contact-github",
    label: "GitHub",
    icon: (props: any) => <Icon icon="simple-icons:github" width={props.size} height={props.size} className={props.className} />,
    href: "https://github.com/Malfrmnsyhh",
  },
  {
    id: "contact-linkedin",
    label: "LinkedIn",
    icon: (props: any) => <Icon icon="simple-icons:linkedin" width={props.size} height={props.size} className={props.className} />,
    href: "https://www.linkedin.com/in/akmal-firmansyah-912b34329",
  },
  {
    id: "contact-email",
    label: "Email",
    icon: Mail,
    href: "mailto:akmalhard21@gmail.com",
  },
  {
    id: "contact-instagram",
    label: "Instagram",
    icon: (props: any) => <Icon icon="simple-icons:instagram" width={props.size} height={props.size} className={props.className} />,
    href: "https://instagram.com/malfrmnsyy",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

export function Contact() {
  const [isFormOpen, setIsFormOpen] = useState(false);

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
          Let&apos;s Work <span className="text-[var(--accent)]">Together</span>
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

        {/* Toggle Form Button */}
        <motion.div
          className="mt-8 flex justify-center"
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
              isFormOpen
                ? "bg-transparent border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                : "bg-[var(--accent)] text-white border border-transparent hover:opacity-90"
            }`}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={isFormOpen ? "cancel" : "send"}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2"
              >
                {isFormOpen ? (
                  <>
                    <X size={18} /> Cancel
                  </>
                ) : (
                  <>
                    <MessageSquare size={18} /> Send a Message
                  </>
                )}
              </motion.span>
            </AnimatePresence>
          </button>
        </motion.div>

        {/* Contact Form */}
        <AnimatePresence>
          {isFormOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-2 pb-2">
                <ContactForm />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
