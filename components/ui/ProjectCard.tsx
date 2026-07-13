import { motion } from "framer-motion";
import { Code2, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Project } from "@/data/projects";
import { Icon } from "@iconify/react";

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

interface ProjectCardProps {
  project: Project;
  idx?: number;
}

export function ProjectCard({ project, idx = 0 }: ProjectCardProps) {
  const fallbackColors = [
    ["#002A35", "#00A3AD"],
    ["#001E28", "#007A8F"],
    ["#003040", "#00BCC8"],
    ["#001825", "#005066"],
    ["#002535", "#009AA3"],
    ["#001A22", "#006B80"],
  ];
  const [bg, accent] = fallbackColors[idx % fallbackColors.length];

  const visibleTech = project.techStack.slice(0, 4);
  const remainingTech = project.techStack.length - 4;

  return (
    <motion.article
      variants={cardVariants}
      className="group flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden hover:border-[var(--accent)] hover:border-opacity-50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    >
      {/* Thumbnail */}
      <div className="relative h-48 w-full overflow-hidden flex items-center justify-center bg-[var(--background)]">
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${bg} 0%, ${bg}CC 100%)`,
            }}
          >
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `linear-gradient(${accent} 1px, transparent 1px), linear-gradient(90deg, ${accent} 1px, transparent 1px)`,
                backgroundSize: "24px 24px",
              }}
            />
            <div
              className="relative z-10 h-14 w-14 rounded-2xl flex items-center justify-center text-xl font-extrabold font-heading"
              style={{
                background: `${accent}22`,
                border: `1px solid ${accent}44`,
                color: accent,
              }}
            >
              {project.name.charAt(0)}
            </div>
          </div>
        )}

        {/* Gradient Overlay for smooth transition to card content */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent opacity-80" />

        {/* Featured badge */}
        {project.featured && (
          <div
            className="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-md"
            style={{
              background: `color-mix(in srgb, var(--accent) 20%, transparent)`,
              color: `var(--accent)`,
            }}
          >
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-4">
        <div>
          <h3 className="font-heading text-lg font-bold text-[var(--text-primary)]">
            {project.name}
          </h3>
          <p className="mt-1 text-sm text-[var(--text-secondary)] line-clamp-3 leading-relaxed flex-1">
            {project.description}
          </p>
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mt-auto cursor-default">
          {visibleTech.map((t) => (
            <span
              key={t}
              className="text-[11px] font-medium px-2.5 py-1 rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)]"
            >
              {t}
            </span>
          ))}
          {remainingTech > 0 && (
            <span className="text-[11px] font-medium px-2.5 py-1 rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)]">
              +{remainingTech}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex gap-4 pt-3 mt-1 border-t border-[var(--border)]/50">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
          >
            <Icon icon="simple-icons:github" width="14" height="14" />
            GitHub
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
            >
              <ArrowUpRight size={14} />
              View Project
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
