"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const roles = [
  "Computer Science Student",
  "Full Stack Web Developer",
  "Machine Learning Enthusiast",
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Large radial glow */}
        <div
          className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full opacity-[0.06]"
          style={{
            background:
              "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-60 -left-20 h-[500px] w-[500px] rounded-full opacity-[0.04]"
          style={{
            background:
              "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
          }}
        />

        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1200px] w-full px-6 md:px-8 pt-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text */}
          <div className="flex flex-col gap-6">
            {/* Available badge */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Badge variant="accent" className="w-fit">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" />
                </span>
                Available for Freelance
              </Badge>
            </motion.div>

            {/* Heading */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            >
              <h1 className="font-heading text-5xl sm:text-6xl font-extrabold leading-[1.1] tracking-tight text-[var(--text-primary)]">
                Muhammad{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, var(--accent), var(--accent-hover))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Akmal
                </span>{" "}
                Firmansyah
              </h1>
            </motion.div>

            {/* Roles */}
            <motion.div
              className="flex flex-col gap-1"
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            >
              {roles.map((role, i) => (
                <motion.p
                  key={role}
                  className="text-base font-medium text-[var(--text-secondary)] flex items-center gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                >
                  <span className="h-px w-6 bg-[var(--accent)] inline-block" />
                  {role}
                </motion.p>
              ))}
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-base leading-relaxed text-[var(--text-secondary)] max-w-md"
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
            >
              I build modern web applications and continuously explore AI,
              backend development, and scalable software engineering.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-3 pt-2"
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
            >
              <Button
                variant="primary"
                size="lg"
                href="#projects"
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault();
                  document
                    .querySelector("#projects")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                View Projects
                <ArrowRight size={16} />
              </Button>
              <Button
                variant="ghost"
                size="lg"
                href="#contact"
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault();
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <Mail size={16} />
                Contact Me
              </Button>
            </motion.div>
          </div>

          {/* Right: Abstract Visual */}
          <motion.div
            className="hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          >
            <div className="relative w-[420px] h-[420px]">
              {/* Outer ring */}
              <motion.div
                className="absolute inset-0 rounded-full border border-[var(--border)]"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              />
              {/* Middle ring */}
              <motion.div
                className="absolute inset-8 rounded-full border border-[var(--dark-teal-2)]"
                style={{ borderColor: "var(--border)" }}
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />

              {/* Center card */}
              <div className="absolute inset-16 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass)] backdrop-blur-sm flex flex-col items-center justify-center gap-4 p-6">
                <div
                  className="h-14 w-14 rounded-2xl flex items-center justify-center text-2xl font-extrabold font-heading"
                  style={{
                    background: "linear-gradient(135deg, var(--accent), var(--accent-hover))",
                    color: "white",
                  }}
                >
                  M
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    Full Stack Dev
                  </p>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">
                    &amp; ML Enthusiast
                  </p>
                </div>
                <div className="flex gap-1.5">
                  {["#00A3AD", "#004052", "#00303D"].map((c) => (
                    <div
                      key={c}
                      className="h-2 w-2 rounded-full"
                      style={{ background: c }}
                    />
                  ))}
                </div>
              </div>

              {/* Floating skill pills */}
              {[
                { label: "React", angle: 0, r: 190 },
                { label: "Next.js", angle: 72, r: 190 },
                { label: "Python", angle: 144, r: 190 },
                { label: "TypeScript", angle: 216, r: 190 },
                { label: "Docker", angle: 288, r: 190 },
              ].map(({ label, angle, r }) => {
                const rad = (angle * Math.PI) / 180;
                const x = Math.round(r * Math.cos(rad));
                const y = Math.round(r * Math.sin(rad));
                return (
                  <motion.div
                    key={label}
                    className="absolute text-xs font-semibold px-3 py-1.5 rounded-full border border-[var(--glass-border)] bg-[var(--glass)] text-[var(--text-secondary)] backdrop-blur-sm whitespace-nowrap"
                    style={{
                      left: "50%",
                      top: "50%",
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    }}
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: 3 + angle * 0.01,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: angle * 0.005,
                    }}
                  >
                    {label}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
