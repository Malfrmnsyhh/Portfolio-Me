"use client";

import { motion } from "framer-motion";
import { Code2, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { projects } from "@/data/projects";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

// Color palette for thumbnail placeholders
const colors = [
  ["#002A35", "#00A3AD"],
  ["#001E28", "#007A8F"],
  ["#003040", "#00BCC8"],
  ["#001825", "#005066"],
  ["#002535", "#009AA3"],
  ["#001A22", "#006B80"],
];

export function Projects() {
  return (
    <section id="projects" className="py-24 lg:py-32">
      {/* Subtle section divider */}
      <div
        className="absolute left-0 right-0 h-px opacity-20"
        style={{ background: "linear-gradient(90deg, transparent, var(--accent), transparent)" }}
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
            Things I&apos;ve{" "}
            <span className="text-[var(--accent)]">built</span>
          </h2>
          <a
            href="https://github.com/malfrmnsyah"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors flex items-center gap-1.5 shrink-0"
          >
            <Code2 size={14} />
            See all on GitHub
          </a>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {projects.map((project, idx) => {
            const [bg, accent] = colors[idx % colors.length];
            return (
              <motion.article
                key={project.id}
                variants={cardVariants}
                className="group flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden hover:border-[var(--accent)] transition-all duration-300 hover:shadow-[0_8px_32px_var(--shadow-accent)]"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                {/* Thumbnail */}
                <div
                  className="h-44 flex items-center justify-center relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${bg} 0%, ${bg}CC 100%)` }}
                >
                  {/* Decorative grid */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `linear-gradient(${accent} 1px, transparent 1px), linear-gradient(90deg, ${accent} 1px, transparent 1px)`,
                      backgroundSize: "24px 24px",
                    }}
                  />
                  {/* Center icon */}
                  <div
                    className="relative z-10 h-14 w-14 rounded-2xl flex items-center justify-center text-xl font-extrabold font-heading transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `${accent}22`,
                      border: `1px solid ${accent}44`,
                      color: accent,
                    }}
                  >
                    {project.title.charAt(0)}
                  </div>
                  {/* Featured badge */}
                  {project.featured && (
                    <div
                      className="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{
                        background: `${accent}22`,
                        border: `1px solid ${accent}44`,
                        color: accent,
                      }}
                    >
                      Featured
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5 gap-3">
                  <h3 className="font-heading text-base font-semibold text-[var(--text-primary)]">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed flex-1">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <Badge key={t} variant="outline" className="text-[10px] px-2 py-0.5">
                        {t}
                      </Badge>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3 pt-1">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                    >
                      <Code2 size={13} />
                      GitHub
                    </a>
                    {project.demo !== "#" && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                      >
                        <ExternalLink size={13} />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
