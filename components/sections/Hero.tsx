"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { DotGrid } from "@/components/ui/DotGrid";
import ProfileCard from "@/components/ui/ProfileCard";

const roles = [
  "Informatics Student",
  "Full Stack Developer",
  "ML & AI Enthusiast",
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export function Hero() {
  const { scrollY } = useScroll();
  const backgroundOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background decorations */}
      <motion.div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ opacity: backgroundOpacity }}
      >
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

        {/* Interactive Dot Grid Background */}
        <DotGrid
          dotSize={4}
          gap={15}
          proximity={120}
          shockRadius={180}
          shockStrength={15}
        />
      </motion.div>

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
                Available for Intership / Freelance
              </Badge>
            </motion.div>

            {/* Heading */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            >
              <h1 className="font-heading text-5xl sm:text-6xl font-extrabold leading-[1.1] tracking-tight text-[var(--text-primary)] cursor-default">
                Muhammad{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, var(--accent), var(--accent-hover))",
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
                  className="text-base font-medium text-[var(--text-secondary)] flex items-center gap-2 cursor-default"
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
              className="text-base leading-relaxed text-[var(--text-secondary)] max-w-md cursor-default"
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
            >
              I design and build modern web applications with clean UI, scalable
              backend architecture, and practical AI integration. Focused on
              creating products that solve real problems, not just completing
              projects.
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

          {/* Right: Profile Card Visual */}
          <motion.div
            className="hidden lg:flex items-center justify-end"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          >
            <div className="relative flex items-center justify-end w-[360px] h-[500px]">
              <ProfileCard
                name="Muhammad Akmal"
                title="Full Stack Web Developer & AI Enthusiast"
                handle="Malfrmnsyhh"
                status="Open To Work"
                avatarUrl="/photo.jpeg"
                iconUrl="/code-pattern.svg"
                behindGlowEnabled={true}
                behindGlowColor="rgba(0, 163, 173, 0.45)"
                behindGlowSize="70%"
                enableTilt={true}
                innerGradient="linear-gradient(145deg, rgba(0, 163, 173, 0.1) 0%, rgba(0, 32, 41, 0.65) 100%)"
                onContactClick={() => {
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
