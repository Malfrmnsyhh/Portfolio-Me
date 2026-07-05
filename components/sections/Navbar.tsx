"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, User, Code2, Cpu, Mail } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";
import PillNav from "@/components/PillNav";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const mobileLinks = [
  { label: "Home", href: "#hero", icon: Home },
  { label: "About", href: "#about", icon: User },
  { label: "Projects", href: "#projects", icon: Code2 },
  { label: "Skills", href: "#skills", icon: Cpu },
  { label: "Contact", href: "#contact", icon: Mail },
];

const sectionIds = ["hero", "about", "projects", "skills", "contact"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const targetId = href.replace("#", "");
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Top Header (Desktop & Mobile) */}
      <header
        className={cn(
          "fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] rounded-full transition-all duration-300 ease-out border flex items-center justify-between",
          scrolled
            ? "max-w-4xl bg-[var(--surface)]/75 backdrop-blur-md border-[var(--border)] shadow-lg shadow-black/5 py-2 px-6"
            : "max-w-5xl bg-transparent border-transparent py-4 px-6"
        )}
      >
        {/* Logo */}
        <motion.a
          href="#"
          className="font-heading text-lg font-bold tracking-tight text-[var(--text-primary)] cursor-pointer select-none"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <span className="text-[var(--accent)]">P</span>ortfolio
        </motion.a>

        {/* Desktop Nav Links with React Bits PillNav */}
        <nav className="hidden lg:block">
          <PillNav
            items={navLinks}
            activeHref={`#${activeSection}`}
            hideLogo={true}
            hideMobile={true}
            baseColor="var(--accent)"
            pillColor="transparent"
            pillTextColor="var(--text-secondary)"
            hoveredPillTextColor="#ffffff"
            initialLoadAnimation={false}
          />
        </nav>

        {/* Right side: Theme Toggle */}
        <div className="flex items-center gap-3">
          <ThemeToggle className="h-9 w-9 border-none bg-transparent hover:bg-[var(--surface-hover)] hover:text-[var(--accent)] rounded-full" />
        </div>
      </header>

      {/* Sticky Bottom Navigation for Mobile */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md rounded-full border border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur-lg px-4 py-2 flex items-center justify-around shadow-lg shadow-black/10 lg:hidden">
        {mobileLinks.map((link) => {
          const isActive =
            activeSection === link.href.replace("#", "") ||
            (link.href === "#hero" && activeSection === "hero");
          const Icon = link.icon;
          return (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="relative flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors duration-200 cursor-pointer select-none"
            >
              <Icon
                size={20}
                className={cn(
                  "transition-colors duration-200",
                  isActive ? "text-[var(--accent)]" : "text-[var(--text-secondary)]"
                )}
              />
              <span
                className={cn(
                  "text-[10px] font-semibold transition-colors duration-200",
                  isActive ? "text-[var(--accent)]" : "text-[var(--text-muted)]"
                )}
              >
                {link.label}
              </span>
              {isActive && (
                <motion.span
                  layoutId="activeSectionIndicatorMobile"
                  className="absolute bottom-0 h-1 w-1 rounded-full bg-[var(--accent)]"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </a>
          );
        })}
      </nav>
    </>
  );
}
