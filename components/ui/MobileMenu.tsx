"use client";

import { useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: { label: string; href: string }[];
  activeSection: string;
  onNavClick: (href: string) => void;
}

export function MobileMenu({
  isOpen,
  onClose,
  navLinks,
  activeSection,
  onNavClick,
}: MobileMenuProps) {
  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Framer Motion variants
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.08,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        ease: "easeInOut",
        duration: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25 } },
  };

  return (
    <div className="fixed inset-0 z-40 lg:hidden">
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Drawer Overlay */}
      <motion.div
        className="absolute top-[80px] left-4 right-4 max-h-[calc(100vh-120px)] overflow-y-auto rounded-3xl border border-[var(--border)] bg-[var(--surface)]/95 p-6 shadow-2xl backdrop-blur-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="flex flex-col gap-6">
          {/* Navigation Links */}
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <motion.li key={link.href} variants={itemVariants}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavClick(link.href);
                    }}
                    className={cn(
                      "block rounded-2xl px-4 py-3 text-lg font-medium transition-all duration-200 cursor-pointer select-none",
                      isActive
                        ? "bg-[var(--accent-subtle)] text-[var(--accent)] font-semibold"
                        : "text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
                    )}
                  >
                    {link.label}
                  </a>
                </motion.li>
              );
            })}
          </ul>

          {/* Action Row */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-4 border-t border-[var(--border)] pt-6"
          >
            <div className="flex items-center justify-between px-2">
              <span className="text-sm font-medium text-[var(--text-secondary)]">
                Switch Theme
              </span>
              <ThemeToggle className="h-10 w-10 border-[var(--border)]" />
            </div>

            <button
              onClick={() => onNavClick("#contact")}
              className="w-full rounded-full bg-[var(--accent)] py-3 text-center text-base font-semibold text-white transition-all duration-200 hover:bg-[var(--accent-hover)] hover:scale-[1.01] active:scale-95 shadow-lg shadow-[var(--shadow-accent)] cursor-pointer"
            >
              Contact Me
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
