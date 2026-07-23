"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { certificates } from "@/data/certificates";
import { CertificateCard } from "@/components/ui/CertificateCard";
import BorderGlow from "@/components/ui/BorderGlow";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

export function Certificates() {
  const featuredCertificates = certificates.filter((c) => c.featured).slice(0, 3);

  return (
    <section id="certificates" className="py-24 lg:py-5 relative">
      {/* Subtle section divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-20"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--accent), transparent)",
        }}
      />

      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        <motion.div
          className="mb-3 w-fit"
          {...fadeUp}
          transition={{ duration: 0.4 }}
        >
          <BorderGlow
            animated={true}
            edgeSensitivity={30}
            glowColor="180 80 80"
            backgroundColor="var(--surface)"
            borderRadius={9999}
            glowRadius={30}
            glowIntensity={1.2}
            coneSpread={30}
            colors={["#00a3ad", "#38bdf8", "#c084fc"]}
            className="px-4 py-1.5 border border-[var(--border)] shadow-sm cursor-default"
          >
            <span className="text-sm font-semibold tracking-widest text-[var(--accent)] uppercase">
              Certificates
            </span>
          </BorderGlow>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-[var(--text-primary)] leading-tight max-w-sm">
            Milestones <span className="text-[var(--accent)]">&</span> Achievements
          </h2>
          <div className="flex items-center gap-4 shrink-0">
            <Link
              href="/certificate"
              className="text-sm font-semibold text-[var(--accent)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1.5 group"
            >
              View All Certificates
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {featuredCertificates.map((cert, idx) => (
            <CertificateCard key={cert.id} certificate={cert} idx={idx} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
