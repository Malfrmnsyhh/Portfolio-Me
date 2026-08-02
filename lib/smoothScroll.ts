"use client";

import { animate, type AnimationPlaybackControls } from "framer-motion";

const HEADER_OFFSET = 80;

let activeAnimation: AnimationPlaybackControls | null = null;

function getMaxScroll() {
  return document.documentElement.scrollHeight - window.innerHeight;
}

/**
 * Scrolls the window with a custom eased animation instead of relying on
 * the browser's native (fixed-curve) smooth scroll, which reads as stiff.
 */
export function smoothScrollTo(target: number | string, offset = HEADER_OFFSET) {
  let targetY: number;

  if (typeof target === "string") {
    const el = document.getElementById(target.replace("#", ""));
    if (!el) return;
    targetY = el.getBoundingClientRect().top + window.scrollY - offset;
  } else {
    targetY = target;
  }

  targetY = Math.max(0, Math.min(targetY, getMaxScroll()));

  activeAnimation?.stop();
  activeAnimation = animate(window.scrollY, targetY, {
    duration: 0.8,
    ease: [0.22, 1, 0.36, 1],
    onUpdate: (value) => window.scrollTo(0, value),
  });
}
