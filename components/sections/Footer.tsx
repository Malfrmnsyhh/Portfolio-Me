import { Code2, Globe, Mail, AtSign } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { id: "footer-github", label: "GitHub", icon: Code2, href: "https://github.com/malfrmnsyah" },
  { id: "footer-linkedin", label: "LinkedIn", icon: Globe, href: "https://linkedin.com/in/malfrmnsyah" },
  { id: "footer-email", label: "Email", icon: Mail, href: "mailto:akmal@example.com" },
  { id: "footer-instagram", label: "Instagram", icon: AtSign, href: "https://instagram.com/malfrmnsyah" },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-10">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Left: Logo + copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <span className="font-heading font-bold text-sm text-[var(--text-primary)]">
              <span className="text-[var(--accent)]">M</span>AF
            </span>
            <span className="hidden sm:block h-4 w-px bg-[var(--border)]" />
            <p className="text-xs text-[var(--text-muted)]">
              © {new Date().getFullYear()} Muhammad Akmal Firmansyah
            </p>
          </div>

          {/* Center: Nav links */}
          <nav>
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="px-3 py-1.5 text-xs font-medium text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors rounded-lg hover:bg-[var(--accent-subtle)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right: Social icons */}
          <div className="flex items-center gap-2">
            {socials.map((social) => (
              <a
                key={social.id}
                id={social.id}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-muted)] hover:text-[var(--accent)] hover:bg-[var(--accent-subtle)] transition-all duration-150"
              >
                <social.icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
