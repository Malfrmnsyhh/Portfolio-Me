import { Mail, Download } from "lucide-react";
import { Icon } from "@iconify/react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Certificates", href: "#certificates" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  {
    id: "footer-github",
    label: "GitHub",
    icon: (props: any) => (
      <Icon
        icon="simple-icons:github"
        width={props.size}
        height={props.size}
        className={props.className}
      />
    ),
    href: "https://github.com/Malfrmnsyhh",
  },
  {
    id: "footer-linkedin",
    label: "LinkedIn",
    icon: (props: any) => (
      <Icon
        icon="simple-icons:linkedin"
        width={props.size}
        height={props.size}
        className={props.className}
      />
    ),
    href: "https://www.linkedin.com/in/akmal-firmansyah-912b34329",
  },
  {
    id: "footer-email",
    label: "Email",
    icon: Mail,
    href: "mailto:akmalhard21@gmail.com",
  },
  {
    id: "footer-instagram",
    label: "Instagram",
    icon: (props: any) => (
      <Icon
        icon="simple-icons:instagram"
        width={props.size}
        height={props.size}
        className={props.className}
      />
    ),
    href: "https://instagram.com/malfrmnsyy",
  },
  {
    id: "footer-cv",
    label: "Download CV",
    icon: Download,
    href: "/certificates/cv/cv-Muhammad-Akmal-F.pdf",
    download: true,
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] pt-10 pb-25 md:pb-10">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Left: Logo + copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <p className="text-xs text-[var(--text-muted)]">
              © {new Date().getFullYear()} Muhammad Akmal Firmansyah | All
              rights reserved.
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
                target={social.download ? undefined : "_blank"}
                rel={social.download ? undefined : "noopener noreferrer"}
                download={social.download ? true : undefined}
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
