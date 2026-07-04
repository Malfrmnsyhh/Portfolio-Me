"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Lightbulb, BookOpen, Cpu, Globe } from "lucide-react";

const highlights = [
  {
    icon: Lightbulb,
    title: "Passion for Technology",
    desc: "Driven by curiosity and a love for problem-solving through code.",
  },
  {
    icon: BookOpen,
    title: "Continuous Learning",
    desc: "Staying up-to-date with the latest trends in web and AI development.",
  },
  {
    icon: Cpu,
    title: "Problem Solving",
    desc: "Breaking down complex challenges into elegant, maintainable solutions.",
  },
  {
    icon: Globe,
    title: "Impactful Software",
    desc: "Building tools that make a real difference in people's daily lives.",
  },
];

const stats = [
  { label: "Projects Completed", value: 20, suffix: "+" },
  { label: "Technologies Learned", value: 30, suffix: "+" },
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
        {/* Section label */}
        <motion.p
          className="text-sm font-semibold tracking-widest text-[var(--accent)] uppercase mb-3"
          {...fadeUp}
          transition={{ duration: 0.4 }}
        >
          About Me
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Profile text */}
          <div className="flex flex-col gap-8">
            <motion.h2
              className="font-heading text-3xl lg:text-4xl font-bold text-[var(--text-primary)] leading-tight"
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              Turning ideas into{" "}
              <span className="text-[var(--accent)]">
                meaningful experiences
              </span>
            </motion.h2>

            <motion.div
              className="flex flex-col gap-4 text-[var(--text-secondary)] leading-relaxed"
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <p>
                I&apos;m a Computer Science student with a deep passion for
                building scalable web applications. I specialize in the full
                stack — from crafting intuitive React interfaces to designing
                robust Node.js backends.
              </p>
              <p>
                Beyond web development, I actively explore the intersection of
                AI and software engineering, working with TensorFlow and
                scikit-learn to build intelligent systems that solve real-world
                problems.
              </p>
              <p>
                I believe great software is born from a combination of technical
                rigor, clean design thinking, and empathy for the end user.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-4"
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 text-center"
                >
                  <p className="font-heading text-2xl font-extrabold text-[var(--accent)]">
                    <CountUp target={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-xs text-[var(--text-muted)] mt-1 leading-snug">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Highlight points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                className="group rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 hover:border-[var(--accent)] hover:bg-[var(--accent-subtle)] transition-all duration-200"
                {...fadeUp}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-subtle)] text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-white transition-all duration-200">
                  <item.icon size={18} />
                </div>
                <h3 className="font-heading text-sm font-semibold text-[var(--text-primary)] mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
