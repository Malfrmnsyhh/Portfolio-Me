"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { Plug } from "lucide-react";
import { skills } from "@/data/skills";
import LogoLoop, { LogoItem } from "@/components/ui/LogoLoop";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

export function Skills() {
  // Split categories into two groups for two loops
  const group1 = skills.slice(0, 3).flatMap((cat) => cat.items);
  const group2 = skills.slice(3, 6).flatMap((cat) => cat.items);

  const formatLogoItem = (item: { name: string; icon: string }): LogoItem => ({
    node: (
      <div className="flex items-center gap-3 px-6 py-3 rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] hover:bg-[var(--accent-subtle)] transition-all cursor-default hover:shadow-md">
        {item.icon === "lucide:plug" ? (
          <Plug className="w-6 h-6 text-[var(--accent)]" />
        ) : (
          <Icon icon={item.icon} className="w-6 h-6" />
        )}
        <span className="text-sm font-medium">{item.name}</span>
      </div>
    ),
    title: item.name,
  });

  const logos1 = group1.map(formatLogoItem);
  const logos2 = group2.map(formatLogoItem);

  return (
    <section id="skills" className="py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8 mb-12 flex flex-col items-center text-center">
        <motion.p
          className="text-sm font-semibold tracking-widest text-[var(--accent)] uppercase mb-3"
          {...fadeUp}
          transition={{ duration: 0.4 }}
        >
          Skills
        </motion.p>

        <motion.h2
          className="font-heading text-3xl lg:text-4xl font-bold text-[var(--text-primary)] leading-tight max-w-md"
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          My <span className="text-[var(--accent)]">tech stack</span>
        </motion.h2>
      </div>

      <div className="flex flex-col gap-10">
        <LogoLoop
          logos={logos1}
          speed={40}
          direction="left"
          gap={24}
          logoHeight={60}
          fadeOut
          fadeOutColor="var(--background)"
          pauseOnHover
        />
        <LogoLoop
          logos={logos2}
          speed={40}
          direction="right"
          gap={24}
          logoHeight={60}
          fadeOut
          fadeOutColor="var(--background)"
          pauseOnHover
        />
      </div>
    </section>
  );
}
