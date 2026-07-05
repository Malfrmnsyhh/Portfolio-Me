"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import SplitText from "@/components/ui/SplitText";

const stats = [
  { label: "Projects Built", value: 12, suffix: "+" },
  { label: "Tech Stacks Learned", value: 6, suffix: "+" },
  { label: "Years of Learning", value: 3, suffix: "+" },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

export function About() {
  return (
    <section id="about" className="py-24 lg:py-32">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-10">
          <div className="flex flex-col items-center gap-4">
            {/* Section label */}
            <motion.div
              className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-1.5"
              {...fadeUp}
              transition={{ duration: 0.4 }}
            >
              <span className="text-sm font-semibold tracking-widest text-[var(--accent)] uppercase">
                About Me
              </span>
            </motion.div>

            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight flex flex-wrap justify-center gap-x-2 gap-y-1">
              <SplitText
                text="Turning ideas into"
                className="text-[var(--text-primary)]"
                delay={25}
                duration={1}
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
              />
              <SplitText
                text="meaningful experiences"
                className="text-[var(--accent)]"
                delay={25}
                duration={1}
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
              />
            </h2>
          </div>

          <motion.div
            className="flex flex-col gap-6 text-base md:text-lg text-[var(--text-secondary)] leading-relaxed text-left"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p>
              I&apos;m a Computer Science student who learns best by building —
              most of what I know in web development came from shipping real
              projects rather than just following a curriculum. I work across
              the full stack, from{" "}
              <strong className="text-[var(--text-primary)] font-semibold">
                React/Next.js
              </strong>{" "}
              interfaces to{" "}
              <strong className="text-[var(--text-primary)] font-semibold">
                Laravel
              </strong>{" "}
              and PHP-based backends, and I've also explored machine learning by
              building a backpropagation neural network with scikit-learn to
              predict rice price fluctuations in East Java.
            </p>
            <p>
              What pulled me into software in the first place was practical, not
              theoretical: helping digitalize my family's traditional herbal
              medicine (jamu) business. That experience still shapes how I build
              — I care less about using the &quot;trendiest&quot; tech, and more
              about whether the software actually solves someone's real problem.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-3 gap-4 md:gap-8 w-full pt-8 border-t border-[var(--border)]/50"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center p-4"
              >
                <p className="font-heading text-3xl md:text-4xl font-extrabold text-[var(--accent)]">
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-sm md:text-base text-[var(--text-muted)] mt-2 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
