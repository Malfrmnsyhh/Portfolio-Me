"use client";

import { useEffect, useRef } from "react";
import "./DotGrid.css";

interface DotGridProps {
  dotSize?: number;
  gap?: number;
  proximity?: number;
  shockRadius?: number;
  shockStrength?: number;
  className?: string;
  style?: React.CSSProperties;
}

interface Dot {
  cx: number;
  cy: number;
  px: number; // current x
  py: number; // current y
  vx: number; // velocity x
  vy: number; // velocity y
}

export function DotGrid({
  dotSize = 6,
  gap = 24,
  proximity = 120,
  shockRadius = 180,
  shockStrength = 15,
  className = "",
  style,
}: DotGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const pointerRef = useRef({ x: -1000, y: -1000, active: false });

  // Spring constants
  const k = 0.08; // stiffness
  const damping = 0.85; // drag/friction

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Build the grid of dots
    const buildGrid = () => {
      width = container.offsetWidth;
      height = container.offsetHeight;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      const cell = dotSize + gap;
      const cols = Math.floor((width + gap) / cell);
      const rows = Math.floor((height + gap) / cell);

      const gridW = cell * cols - gap;
      const gridH = cell * rows - gap;

      const startX = (width - gridW) / 2 + dotSize / 2;
      const startY = (height - gridH) / 2 + dotSize / 2;

      const dots: Dot[] = [];
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const cx = startX + x * cell;
          const cy = startY + y * cell;
          dots.push({
            cx,
            cy,
            px: cx,
            py: cy,
            vx: 0,
            vy: 0,
          });
        }
      }
      dotsRef.current = dots;
    };

    buildGrid();

    let ro: any = null;
    if (typeof window !== "undefined" && (window as any).ResizeObserver) {
      ro = new (window as any).ResizeObserver(buildGrid);
      ro.observe(container);
    } else {
      window.addEventListener("resize", buildGrid);
    }

    // Pointer events
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      pointerRef.current.active = false;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Apply shockwave force to dots
      dotsRef.current.forEach((dot) => {
        const dx = dot.px - clickX;
        const dy = dot.py - clickY;
        const dist = Math.hypot(dx, dy);

        if (dist < shockRadius && dist > 0) {
          const falloff = 1 - dist / shockRadius;
          const force = falloff * shockStrength;
          dot.vx += (dx / dist) * force;
          dot.vy += (dy / dist) * force;
        }
      });
    };

    // Listen to mouse events on the closest section (Hero) or window
    const eventTarget = container.closest("section") || window;
    eventTarget.addEventListener("mousemove", handleMouseMove as EventListener, { passive: true });
    eventTarget.addEventListener("mouseleave", handleMouseLeave as EventListener, { passive: true });
    eventTarget.addEventListener("click", handleClick as EventListener, { passive: true });

    // Color conversion helpers
    const hexToRgb = (hex: string) => {
      const cleaned = hex.trim().replace("#", "");
      if (cleaned.length === 3) {
        const r = parseInt(cleaned[0] + cleaned[0], 16);
        const g = parseInt(cleaned[1] + cleaned[1], 16);
        const b = parseInt(cleaned[2] + cleaned[2], 16);
        return { r, g, b };
      }
      if (cleaned.length === 6) {
        const r = parseInt(cleaned.substring(0, 2), 16);
        const g = parseInt(cleaned.substring(2, 4), 16);
        const b = parseInt(cleaned.substring(4, 6), 16);
        return { r, g, b };
      }
      return { r: 0, g: 163, b: 173 }; // default active color cyan
    };

    // Render loop
    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, width, height);

      // Get theme colors from document variables dynamically
      const computed = getComputedStyle(document.documentElement);
      const isDark = document.documentElement.classList.contains("dark");
      const baseHex = isDark ? "#00485c" : "#CCE5E5"; // Hex adjusted for better dark mode visibility
      const activeHex = computed.getPropertyValue("--accent").trim() || "#00A3AD";

      const baseRgb = hexToRgb(baseHex);
      const activeRgb = hexToRgb(activeHex);

      const pr = pointerRef.current;
      const proxSq = proximity * proximity;

      dotsRef.current.forEach((dot) => {
        // 1. Spring physics back to original center
        const ax = -k * (dot.px - dot.cx);
        const ay = -k * (dot.py - dot.cy);

        dot.vx = (dot.vx + ax) * damping;
        dot.vy = (dot.vy + ay) * damping;

        // 2. Mouse push interaction
        if (pr.active) {
          const mdx = dot.px - pr.x;
          const mdy = dot.py - pr.y;
          const distSq = mdx * mdx + mdy * mdy;

          if (distSq < proxSq && distSq > 0) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / proximity) * 1.5; // push strength
            dot.vx += (mdx / dist) * force;
            dot.vy += (mdy / dist) * force;
          }
        }

        // Update position
        dot.px += dot.vx;
        dot.py += dot.vy;

        // 3. Draw dot with dynamic color interpolation based on mouse distance
        const dx = dot.cx - pr.x;
        const dy = dot.cy - pr.y;
        const dsq = dx * dx + dy * dy;

        let style = `rgb(${baseRgb.r},${baseRgb.g},${baseRgb.b})`;
        if (pr.active && dsq <= proxSq) {
          const dist = Math.sqrt(dsq);
          const t = 1 - dist / proximity;
          const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t);
          const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t);
          const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t);
          style = `rgb(${r},${g},${b})`;
        }

        ctx.beginPath();
        ctx.arc(dot.px, dot.py, dotSize / 2, 0, Math.PI * 2);
        ctx.fillStyle = style;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", buildGrid);

      if (parent) {
        parent.removeEventListener("mousemove", handleMouseMove);
        parent.removeEventListener("mouseleave", handleMouseLeave);
        parent.removeEventListener("click", handleClick);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [dotSize, gap, proximity, shockRadius, shockStrength]);

  return (
    <div ref={containerRef} className={`dot-grid ${className}`} style={style}>
      <canvas ref={canvasRef} className="dot-grid__canvas" />
    </div>
  );
}
