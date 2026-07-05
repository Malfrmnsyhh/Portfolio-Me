"use client";

import { useEffect, useState } from "react";

interface TextTypeProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  showCursor?: boolean;
  cursorCharacter?: string;
  cursorBlinkDuration?: number;
  className?: string;
}

export function TextType({
  texts = ["Akmal"],
  typingSpeed = 60,
  deletingSpeed = 60,
  pauseDuration = 2000,
  showCursor = true,
  cursorCharacter = "|",
  cursorBlinkDuration = 0.8,
  className = "",
}: TextTypeProps) {
  const [currentText, setCurrentText] = useState(texts[0]);
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    let timer: NodeJS.Timeout;
    const fullText = texts[textIndex % texts.length];

    if (isDeleting) {
      // Deleting phase
      timer = setTimeout(() => {
        setCurrentText((prev) => prev.slice(0, -1));
      }, deletingSpeed);
    } else {
      // Typing phase
      timer = setTimeout(() => {
        setCurrentText((prev) => fullText.slice(0, prev.length + 1));
      }, typingSpeed);
    }

    // If fully typed, pause and then start deleting
    if (!isDeleting && currentText === fullText) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, pauseDuration);
    }

    // If fully deleted, move to the next text and start typing
    if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setTextIndex((prev) => prev + 1);
    }

    return () => clearTimeout(timer);
  }, [
    currentText,
    isDeleting,
    textIndex,
    texts,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    mounted,
  ]);

  // Prevent SSR hydration mismatch
  if (!mounted) {
    return <span className={className}>{texts[0]}</span>;
  }

  return (
    <span className={className}>
      {currentText}
      {showCursor && (
        <span
          className="inline-block animate-pulse ml-0.5"
          style={{
            animationDuration: `${cursorBlinkDuration}s`,
            opacity: 0.9,
            color: "var(--accent)",
            WebkitTextFillColor: "var(--accent)",
          }}
        >
          {cursorCharacter}
        </span>
      )}
    </span>
  );
}
export default TextType;
