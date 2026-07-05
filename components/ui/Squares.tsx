"use client";

import { useEffect, useRef } from "react";

interface SquaresProps {
  speed?: number;
  squareSize?: number;
  borderColor?: string;
  hoverIntensity?: number;
}

export function Squares({
  speed = 0.5,
  squareSize = 40,
  borderColor = "rgba(0, 163, 173, 0.08)",
  hoverIntensity = 0.2,
}: SquaresProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hoverPos = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      hoverPos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      hoverPos.current = null;
    };

    // Listen to mousemove on the parent container (Hero section)
    const parent = canvas.parentElement?.parentElement;
    if (parent) {
      parent.addEventListener("mousemove", handleMouseMove);
      parent.addEventListener("mouseleave", handleMouseLeave);
    }

    let offset = 0;
    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / squareSize) + 1;
      const rows = Math.ceil(height / squareSize) + 1;

      offset += speed;
      if (offset >= squareSize) {
        offset = 0;
      }

      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 1;

      for (let i = -1; i < cols; i++) {
        for (let j = -1; j < rows; j++) {
          const x = i * squareSize + offset;
          const y = j * squareSize + offset;

          ctx.strokeRect(x, y, squareSize, squareSize);

          // Interactive hover highlight
          if (hoverPos.current) {
            const dx = hoverPos.current.x - (x + squareSize / 2);
            const dy = hoverPos.current.y - (y + squareSize / 2);
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 180) {
              const alpha = (1 - dist / 180) * hoverIntensity;
              // Fill with accent color opacity
              ctx.fillStyle = `rgba(0, 163, 173, ${alpha})`;
              ctx.fillRect(x + 1, y + 1, squareSize - 2, squareSize - 2);
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (parent) {
        parent.removeEventListener("mousemove", handleMouseMove);
        parent.removeEventListener("mouseleave", handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [speed, squareSize, borderColor, hoverIntensity]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full pointer-events-none opacity-50"
    />
  );
}
