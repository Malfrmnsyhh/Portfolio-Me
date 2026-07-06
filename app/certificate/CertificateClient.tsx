"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { certificates, certificateCategories } from "@/data/certificates";
import { CertificateCard } from "@/components/ui/CertificateCard";

export default function CertificateClient() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredCertificates = useMemo(() => {
    if (activeCategory === "All") return certificates;
    return certificates.filter((c) => c.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen pt-12 pb-20 px-6 md:px-8">
      <div className="mx-auto max-w-[1200px]">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors mb-6 group"
          >
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-1"
            />
            Back to Home
          </Link>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
            My <span className="text-[var(--accent)]">Certificates</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl">
            A collection of certifications and courses I have completed to expand my knowledge and skills in software development.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-hide">
          {certificateCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                activeCategory === category
                  ? "bg-[var(--accent)] text-white shadow-md shadow-[var(--accent)]/20"
                  : "bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--text-primary)]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredCertificates.map((cert, idx) => (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <CertificateCard certificate={cert} idx={idx} />
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredCertificates.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-20 text-center flex flex-col items-center justify-center"
            >
              <div className="w-16 h-16 rounded-full bg-[var(--surface)] flex items-center justify-center mb-4 text-[var(--text-muted)] border border-[var(--border)]">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">
                No certificates found
              </h3>
              <p className="text-[var(--text-secondary)]">
                Try selecting a different category.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
