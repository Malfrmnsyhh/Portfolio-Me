import { motion } from "framer-motion";

export const categories = [
  { id: "all", label: "All Projects" },
  { id: "web", label: "Web Development" },
  { id: "ml", label: "Machine Learning" },
  { id: "desktop", label: "Desktop Apps" },
  { id: "design", label: "UI/UX Design" },
];

interface CategoryFilterProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export function CategoryFilter({ activeCategory, setActiveCategory }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-10">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => setActiveCategory(category.id)}
          className={`relative px-5 py-2 text-sm font-medium rounded-full transition-colors ${
            activeCategory === category.id
              ? "text-[var(--background)]"
              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)]"
          }`}
        >
          {activeCategory === category.id && (
            <motion.div
              layoutId="activeCategory"
              className="absolute inset-0 bg-[var(--accent)] rounded-full"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{category.label}</span>
        </button>
      ))}
    </div>
  );
}
