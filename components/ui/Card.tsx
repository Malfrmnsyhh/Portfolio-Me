"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
  if (hover) {
    return (
      <motion.div
        className={cn(
          "rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6",
          "shadow-[0_4px_24px_var(--shadow)]",
          className
        )}
        whileHover={{
          y: -4,
          boxShadow: "0 12px 40px var(--shadow), 0 0 0 1px var(--glass-border)",
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6",
        "shadow-[0_4px_24px_var(--shadow)]",
        className
      )}
    >
      {children}
    </div>
  );
}
