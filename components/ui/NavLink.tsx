"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  label: string;
  isActive: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function NavLink({ href, label, isActive, onClick }: NavLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] cursor-pointer select-none",
        isActive
          ? "text-[var(--accent)] font-semibold"
          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
      )}
    >
      <span>{label}</span>
      {isActive && (
        <motion.span
          layoutId="activeSectionIndicator"
          className="absolute inset-x-4 bottom-0 h-[2px] bg-[var(--accent)]"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}
    </a>
  );
}
