"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MessageSquare, X, Download } from "lucide-react";
import { Icon } from "@iconify/react";
import { ContactForm } from "@/components/ui/ContactForm";
import BorderGlow from "@/components/ui/BorderGlow";

const socialLinks = [
  {
    icon: <Icon icon="simple-icons:github" width={22} height={22} />,
    label: "GitHub",
    href: "https://github.com/Malfrmnsyhh",
    target: "_blank",
    rel: "noopener noreferrer",
    backColor: "hsl(220, 18%, 20%)",
  },
  {
    icon: <Icon icon="simple-icons:linkedin" width={22} height={22} />,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/akmal-firmansyah-912b34329",
    target: "_blank",
    rel: "noopener noreferrer",
    backColor: "hsl(210, 90%, 40%)",
  },
  {
    icon: <Mail size={22} />,
    label: "Email",
    href: "mailto:akmalhard21@gmail.com",
    backColor: "hsl(28, 90%, 45%)",
  },
  {
    icon: <Icon icon="simple-icons:instagram" width={22} height={22} />,
    label: "Instagram",
    href: "https://instagram.com/malfrmnsyy",
    target: "_blank",
    rel: "noopener noreferrer",
    backColor: "linear-gradient(135deg, hsl(330, 90%, 45%), hsl(15, 90%, 50%))",
  },
  {
    icon: <Download size={22} />,
    label: "Download CV",
    href: "/certificates/cv/cv-Muhammad-Akmal-F.pdf",
    download: true,
    backColor: "hsl(182, 90%, 32%)",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

function SocialCard({
  item,
  index,
}: {
  item: (typeof socialLinks)[number];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: 0.12 + index * 0.07 }}
      className="relative flex flex-col items-center"
      style={{ perspective: "24em" }}
    >
      {/* Tooltip label above card */}
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.9 }}
            transition={{ duration: 0.18 }}
            className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg px-2.5 py-1 text-[0.7rem] font-semibold tracking-wide text-white bg-[var(--surface)]/70 backdrop-blur-md border border-[var(--border)] shadow-sm pointer-events-none z-20"
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Wrapper for 3D stacking */}
      <motion.div
        className="relative w-[52px] h-[52px]"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: "spring", stiffness: 380, damping: 22 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Back layer — brand color, tilted */}
        <motion.span
          className="absolute inset-0 rounded-2xl block"
          style={{
            background: item.backColor,
            transform: hovered
              ? "rotate(25deg) translate3d(-4px, -4px, 0)"
              : "rotate(15deg)",
            transformOrigin: "100% 100%",
            boxShadow: "4px -4px 6px hsla(223,10%,10%,0.2)",
            transition: "transform 0.3s cubic-bezier(0.83,0,0.17,1)",
            zIndex: 1,
          }}
        />

        {/* Front glass card */}
        <motion.a
          href={item.href}
          target={"target" in item ? (item as { target?: string }).target : undefined}
          rel={"rel" in item ? (item as { rel?: string }).rel : undefined}
          download={item.download ? true : undefined}
          aria-label={item.label}
          className="absolute inset-0 flex items-center justify-center rounded-2xl text-white cursor-pointer"
          style={{
            background: "hsla(0,0%,100%,0.15)",
            boxShadow: "0 0 0 1.5px hsla(0,0%,100%,0.25) inset",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            transform: hovered ? "translate3d(0,0,8px)" : "translate3d(0,0,0)",
            transition: "transform 0.3s cubic-bezier(0.83,0,0.17,1)",
            zIndex: 2,
          }}
        >
          {item.icon}
        </motion.a>
      </motion.div>
    </motion.div>
  );
}

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

      <div className="relative mx-auto max-w-[1200px] px-6 md:px-8 text-center flex flex-col items-center">
        <motion.div
          className="mb-3"
          {...fadeUp}
          transition={{ duration: 0.4 }}
        >
          <BorderGlow
            animated={true}
            edgeSensitivity={30}
            glowColor="180 80 80"
            backgroundColor="var(--surface)"
            borderRadius={9999}
            glowRadius={30}
            glowIntensity={1.2}
            coneSpread={30}
            colors={["#00a3ad", "#38bdf8", "#c084fc"]}
            className="px-4 py-1.5 border border-[var(--border)] shadow-sm cursor-default"
          >
            <span className="text-sm font-semibold tracking-widest text-[var(--accent)] uppercase">
              Contact
            </span>
          </BorderGlow>
        </motion.div>

        <motion.h2
          className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--text-primary)] leading-tight mb-4"
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          Let&apos;s Work <span className="text-[var(--accent)]">Together</span>
        </motion.h2>

        <motion.p
          className="text-base text-[var(--text-secondary)] leading-relaxed max-w-md mx-auto mb-12"
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Have a project in mind? I&apos;d love to hear about it. Reach out
          through any of the channels below or fill out the form.
        </motion.p>

        {/* Glass social icon cards */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 mb-2 pt-4"
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {socialLinks.map((item, i) => (
            <SocialCard key={i} item={item} index={i} />
          ))}
        </motion.div>

        {/* Toggle Form Button */}
        <motion.div
          className="mt-10 flex justify-center"
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
