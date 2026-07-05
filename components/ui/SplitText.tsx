"use client";

import { useSprings, animated } from "@react-spring/web";
import { useEffect, useRef, useState } from "react";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: "chars" | "words" | "lines";
  from?: Record<string, any>;
  to?: Record<string, any>;
  threshold?: number;
  rootMargin?: string;
  textAlign?: "left" | "center" | "right" | "justify" | "start" | "end";
  onLetterAnimationComplete?: () => void;
  showCallback?: boolean;
}

export default function SplitText({
  text,
  className = "",
  delay = 25,
  duration = 1,
  ease = "easeOut",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  onLetterAnimationComplete,
  showCallback = false,
}: SplitTextProps) {
  const letters = text.split("");
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const animatedCount = useRef(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current!);
        }
      },
      { threshold, rootMargin },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const springs = useSprings(
    letters.length,
    letters.map((_, i) => ({
      from,
      to: inView
        ? async (next: any) => {
            await next(to);
            animatedCount.current += 1;
            if (
              animatedCount.current === letters.length &&
              onLetterAnimationComplete &&
              showCallback
            ) {
              onLetterAnimationComplete();
            }
          }
        : from,
      delay: i * delay,
      config: { duration: duration * 400 },
    })),
  );

  return (
    <div
      ref={ref}
      className={`inline-block ${className}`}
      style={{
        textAlign,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: textAlign === "center" ? "center" : "flex-start",
      }}
    >
      {text.split(" ").map((word, wordIndex) => {
        const wordStartIndex =
          text.split(" ").slice(0, wordIndex).join(" ").length +
          (wordIndex > 0 ? 1 : 0);
        return (
          <span
            key={wordIndex}
            style={{ display: "inline-block", whiteSpace: "pre" }}
          >
            {word.split("").map((letter, letterIndex) => {
              const index = wordStartIndex + letterIndex;
              return (
                <animated.span
                  key={index}
                  style={{
                    ...springs[index],
                    display: "inline-block",
                    willChange: "transform, opacity",
                  }}
                >
                  {letter}
                </animated.span>
              );
            })}
            <span style={{ display: "inline-block", width: "0.25em" }}>
              &nbsp;
            </span>
          </span>
        );
      })}
    </div>
  );
}
