"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/skills";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" as const } },
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

export function Skills() {
  return (
    <section id="skills" className="py-24 lg:py-32">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        <motion.p
          className="text-sm font-semibold tracking-widest text-[var(--accent)] uppercase mb-3"
          {...fadeUp}
          transition={{ duration: 0.4 }}
        >
          Skills
        </motion.p>

        <motion.h2
          className="font-heading text-3xl lg:text-4xl font-bold text-[var(--text-primary)] leading-tight mb-12 max-w-sm"
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          My <span className="text-[var(--accent)]">tech stack</span>
        </motion.h2>

        <div className="flex flex-col gap-10">
          {skills.map((category, catIdx) => (
            <motion.div
              key={category.category}
              {...fadeUp}
              transition={{ duration: 0.4, delay: catIdx * 0.06 }}
            >
              {/* Category label */}
              <div className="flex items-center gap-3 mb-4">
                <p className="text-sm font-semibold text-[var(--text-secondary)]">
                  {category.category}
                </p>
                <div className="flex-1 h-px bg-[var(--border)]" />
              </div>

              {/* Skill cards */}
              <motion.div
                className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
              >
                {category.items.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={itemVariants}
                    className="group flex flex-col items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3 cursor-default hover:border-[var(--accent)] hover:bg-[var(--accent-subtle)] transition-all duration-200"
                    whileHover={{ scale: 1.04, y: -2 }}
                    transition={{ duration: 0.15 }}
                  >
                    <span className="text-2xl leading-none">{skill.icon}</span>
                    <span className="text-[11px] font-medium text-[var(--text-secondary)] text-center leading-tight group-hover:text-[var(--accent)] transition-colors">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
