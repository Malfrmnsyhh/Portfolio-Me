"use client";

import { motion } from "framer-motion";
import { Code2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Icon } from "@iconify/react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

export function Projects() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <section id="projects" className="py-24 lg:py-5 relative">
      {/* Subtle section divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-20"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--accent), transparent)",
        }}
      />

      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        <motion.p
          className="text-sm font-semibold tracking-widest text-[var(--accent)] uppercase mb-3"
          {...fadeUp}
          transition={{ duration: 0.4 }}
        >
          Projects
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-[var(--text-primary)] leading-tight max-w-sm">
            Things I&apos;ve <span className="text-[var(--accent)]">built</span>
          </h2>
          <div className="flex items-center gap-4 shrink-0">
            <a
              href="https://github.com/Malfrmnsyhh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors flex items-center gap-1.5"
            >
              <Icon icon="mdi:github" width="16" height="16" />
              See all on GitHub
            </a>
            <div className="w-px h-4 bg-[var(--border)] hidden sm:block" />
            <Link
              href="/projects"
              className="text-sm font-semibold text-[var(--accent)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1.5 group"
            >
              View All Projects
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {featuredProjects.map((project, idx) => (
            <ProjectCard key={project.slug} project={project} idx={idx} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
