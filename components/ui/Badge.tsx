import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "outline";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  const variantClasses = {
    default:
      "bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)]",
    accent:
      "bg-[var(--accent-subtle)] border border-[var(--accent)] border-opacity-30 text-[var(--accent)]",
    outline:
      "border border-[var(--border)] text-[var(--text-muted)] bg-transparent",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
